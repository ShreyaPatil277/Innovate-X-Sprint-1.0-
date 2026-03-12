// config.js - Supabase Configuration for NagarVaani
// Replace with your actual Supabase credentials

const supabaseConfig = {
    // ============================================
    // YOUR SUPABASE CREDENTIALS (REPLACE THESE)
    // ============================================
    // Get these from: Project Settings > API
    supabaseUrl: 'https://hnklzalghehnjrufzzjg.supabase.co',  // Replace with your URL
    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhua2x6YWxnaGVobmpydWZ6empnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyODI0MTIsImV4cCI6MjA4ODg1ODQxMn0.hQji3WgxRo8TqxFRPUReLPM98ELudhVi8ckdLFcZYUQ',  // Replace with your anon key
    
    // ============================================
    // Database Schema
    // ============================================
    tables: {
        complaints: 'complaints',
        users: 'users',
        officers: 'officers',
        departments: 'departments',
        notifications: 'notifications',
        feedback: 'citizen_feedback'
    },
    
    // Storage Buckets
    storage: {
        complaintAttachments: 'complaint-attachments',
        profilePictures: 'profile-pictures',
        resolutionProofs: 'resolution-proofs'
    },
    
    // Authentication Settings
    auth: {
        redirectTo: window.location.origin,
        flowType: 'pkce',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    },
    
    // Real-time Subscriptions
    realtime: {
        enabled: true,
        tables: ['complaints', 'notifications']
    }
};

// Make config available globally
window.supabaseConfig = supabaseConfig;