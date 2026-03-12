// supabase-client.js - Complete Supabase Client for NagarVaani

// Initialize Supabase client
let supabase = null;

function initSupabase() {
    if (!window.supabaseConfig) {
        console.error('❌ Supabase config not found. Make sure config.js is loaded.');
        return null;
    }

    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase library not loaded. Add the script to your HTML.');
        return null;
    }

    try {
        supabase = window.supabase.createClient(
            window.supabaseConfig.supabaseUrl,
            window.supabaseConfig.supabaseAnonKey,
            window.supabaseConfig.auth
        );
        console.log('✅ Supabase connected successfully');
        return supabase;
    } catch (error) {
        console.error('❌ Failed to connect to Supabase:', error);
        return null;
    }
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================
const auth = {
    // Sign up new user
    async signUp(email, password, userData) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: userData.full_name,
                        phone: userData.phone,
                        role: 'citizen'
                    }
                }
            });
            
            if (error) throw error;
            
            // Additional profile data
            if (data.user) {
                await this.updateProfile(data.user.id, userData);
            }
            
            return { success: true, data };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign in with email/password
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign in with phone OTP
    async signInWithPhone(phone) {
        try {
            const { data, error } = await supabase.auth.signInWithOtp({
                phone,
                options: {
                    channel: 'sms'
                }
            });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Phone sign in error:', error);
            return { success: false, error: error.message };
        }
    },

    // Verify OTP
    async verifyOTP(phone, token) {
        try {
            const { data, error } = await supabase.auth.verifyOtp({
                phone,
                token,
                type: 'sms'
            });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('OTP verification error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign out
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    },

    // Update profile
    async updateProfile(userId, profileData) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update(profileData)
                .eq('id', userId);
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get user profile
    async getProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Get profile error:', error);
            return null;
        }
    }
};

// ============================================
// COMPLAINT FUNCTIONS
// ============================================
const complaints = {
    // Create new complaint
    async create(complaintData) {
        try {
            const user = await auth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('complaints')
                .insert([{
                    user_id: user.id,
                    ...complaintData,
                    submitted_at: new Date().toISOString()
                }])
                .select()
                .single();
            
            if (error) throw error;
            
            // Create notification
            await notifications.create({
                user_id: user.id,
                complaint_id: data.complaint_id,
                type: 'status_update',
                title: 'Complaint Submitted',
                message: `Your complaint ${data.complaint_id} has been submitted successfully.`
            });
            
            return { success: true, data };
        } catch (error) {
            console.error('Create complaint error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get user's complaints
    async getUserComplaints(filters = {}) {
        try {
            const user = await auth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            let query = supabase
                .from('complaints')
                .select('*')
                .eq('user_id', user.id)
                .order('submitted_at', { ascending: false });
            
            // Apply filters
            if (filters.status) query = query.eq('status', filters.status);
            if (filters.category) query = query.eq('category', filters.category);
            if (filters.priority) query = query.eq('priority', filters.priority);
            
            const { data, error } = await query;
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get complaints error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get complaint by ID
    async getById(complaintId) {
        try {
            const { data, error } = await supabase
                .from('complaints')
                .select(`
                    *,
                    profiles!complaints_assigned_to_fkey (full_name, phone),
                    citizen_feedback (*)
                `)
                .eq('complaint_id', complaintId)
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get complaint error:', error);
            return { success: false, error: error.message };
        }
    },

    // Update complaint status (officer only)
    async updateStatus(complaintId, statusData) {
        try {
            const { data, error } = await supabase
                .from('complaints')
                .update({
                    status: statusData.status,
                    resolution_notes: statusData.notes,
                    resolved_at: statusData.status === 'resolved' ? new Date().toISOString() : null,
                    updated_at: new Date().toISOString()
                })
                .eq('complaint_id', complaintId)
                .select()
                .single();
            
            if (error) throw error;
            
            // Notify citizen
            await notifications.create({
                user_id: data.user_id,
                complaint_id: complaintId,
                type: 'status_update',
                title: `Complaint ${statusData.status}`,
                message: statusData.notes || `Your complaint status has been updated to ${statusData.status}`
            });
            
            return { success: true, data };
        } catch (error) {
            console.error('Update status error:', error);
            return { success: false, error: error.message };
        }
    },

    // Assign complaint to officer
    async assign(complaintId, officerId) {
        try {
            const { data, error } = await supabase
                .from('complaints')
                .update({
                    assigned_to: officerId,
                    status: 'assigned',
                    assigned_at: new Date().toISOString(),
                    sla_deadline: new Date(Date.now() + 7*24*60*60*1000).toISOString() // 7 days
                })
                .eq('complaint_id', complaintId)
                .select()
                .single();
            
            if (error) throw error;
            
            // Notify officer
            await notifications.create({
                user_id: officerId,
                complaint_id: complaintId,
                type: 'assignment',
                title: 'New Complaint Assigned',
                message: `Complaint ${complaintId} has been assigned to you.`
            });
            
            return { success: true, data };
        } catch (error) {
            console.error('Assign complaint error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get complaints for officer dashboard
    async getOfficerComplaints(filters = {}) {
        try {
            const user = await auth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            let query = supabase
                .from('complaints')
                .select(`
                    *,
                    profiles!complaints_user_id_fkey (full_name, phone)
                `)
                .eq('assigned_to', user.id)
                .order('sla_deadline', { ascending: true });
            
            if (filters.status) query = query.eq('status', filters.status);
            if (filters.priority) query = query.eq('priority', filters.priority);
            
            const { data, error } = await query;
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get officer complaints error:', error);
            return { success: false, error: error.message };
        }
    }
};

// ============================================
// NOTIFICATION FUNCTIONS
// ============================================
const notifications = {
    async create(notificationData) {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .insert([notificationData]);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Create notification error:', error);
            return { success: false };
        }
    },

    async getUserNotifications() {
        try {
            const user = await auth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get notifications error:', error);
            return { success: false, error: error.message };
        }
    },

    async markAsRead(notificationId) {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('id', notificationId);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Mark as read error:', error);
            return { success: false };
        }
    }
};

// ============================================
// FILE UPLOAD FUNCTIONS
// ============================================
const storage = {
    async uploadFile(bucket, file, path) {
        try {
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(path, file);
            
            if (error) throw error;
            
            const { data: urlData } = supabase.storage
                .from(bucket)
                .getPublicUrl(path);
            
            return { success: true, url: urlData.publicUrl };
        } catch (error) {
            console.error('Upload error:', error);
            return { success: false, error: error.message };
        }
    },

    async uploadComplaintAttachment(file, complaintId) {
        const path = `${complaintId}/${Date.now()}_${file.name}`;
        return this.uploadFile('complaint-attachments', file, path);
    }
};

// ============================================
// ANALYTICS FUNCTIONS
// ============================================
const analytics = {
    async getDashboardStats() {
        try {
            const [complaints, officers, resolved] = await Promise.all([
                supabase.from('complaints').select('*', { count: 'exact', head: true }),
                supabase.from('officers').select('*', { count: 'exact', head: true }),
                supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'resolved')
            ]);
            
            return {
                success: true,
                data: {
                    totalComplaints: complaints.count || 0,
                    totalOfficers: officers.count || 0,
                    resolvedComplaints: resolved.count || 0
                }
            };
        } catch (error) {
            console.error('Analytics error:', error);
            return { success: false, error: error.message };
        }
    },

    async getComplaintsByCategory() {
        try {
            const { data, error } = await supabase
                .from('complaints')
                .select('category, count');
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Category stats error:', error);
            return { success: false, error: error.message };
        }
    }
};

// ============================================
// REALTIME SUBSCRIPTIONS
// ============================================
const realtime = {
    subscribeToComplaint(complaintId, callback) {
        return supabase
            .channel(`complaint-${complaintId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'complaints',
                    filter: `complaint_id=eq.${complaintId}`
                },
                callback
            )
            .subscribe();
    },

    subscribeToNotifications(userId, callback) {
        return supabase
            .channel(`notifications-${userId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${userId}`
                },
                callback
            )
            .subscribe();
    }
};

// ============================================
// INITIALIZATION
// ============================================
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        initSupabase();
    });
}

// Export all modules
window.nagarvaani = {
    auth,
    complaints,
    notifications,
    storage,
    analytics,
    realtime,
    supabase: () => supabase
};

console.log('🚀 NagarVaani Supabase client ready');