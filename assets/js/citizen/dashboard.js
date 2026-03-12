// dashboard.js - Citizen dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    loadCitizenComplaints();
    initializeDashboardFilters();
    initializeNotificationBell();
});

function loadCitizenComplaints() {
    const complaintList = document.getElementById('complaintList');
    if (!complaintList) return;
    
    // Get complaints from storage or use mock data
    let complaints = storage.get('complaints') || [];
    
    // If no complaints, use mock data
    if (complaints.length === 0) {
        complaints = getMockComplaints();
    }
    
    displayComplaints(complaints);
    updateDashboardStats(complaints);
}

function getMockComplaints() {
    return [
        {
            id: 'JAN24873',
            description: 'Road broken near the market, large pothole',
            category: 'Roads',
            status: 'in-progress',
            date: '2024-01-15T10:30:00',
            priority: 'High',
            location: 'Ward 5, Market Area'
        },
        {
            id: 'JAN24101',
            description: 'Water leakage from main pipeline',
            category: 'Water',
            status: 'resolved',
            date: '2024-01-14T08:15:00',
            priority: 'Critical',
            location: 'Street No. 12, Gandhi Nagar'
        },
        {
            id: 'JAN24782',
            description: 'Street light not working for 3 days',
            category: 'Electricity',
            status: 'assigned',
            date: '2024-01-16T18:30:00',
            priority: 'Medium',
            location: 'Park Street, Ward 3'
        },
        {
            id: 'JAN24156',
            description: 'Garbage not collected for a week',
            category: 'Sanitation',
            status: 'submitted',
            date: '2024-01-17T09:00:00',
            priority: 'High',
            location: 'Sector 7, Housing Colony'
        }
    ];
}

function displayComplaints(complaints) {
    const complaintList = document.getElementById('complaintList');
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    
    // Filter complaints
    let filteredComplaints = complaints;
    if (statusFilter !== 'all') {
        filteredComplaints = complaints.filter(c => c.status === statusFilter);
    }
    
    if (filteredComplaints.length === 0) {
        complaintList.innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i> No complaints found
            </div>
        `;
        return;
    }
    
    // Sort by date (newest first)
    filteredComplaints.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const complaintsHTML = filteredComplaints.map(complaint => `
        <div class="complaint-card ${complaint.status}" onclick="viewComplaint('${complaint.id}')">
            <div class="complaint-header">
                <span class="complaint-id">${complaint.id}</span>
                <span class="complaint-status">
                    <span class="badge badge-${getStatusBadgeClass(complaint.status)}">
                        ${getStatusText(complaint.status)}
                    </span>
                </span>
            </div>
            <div class="complaint-body">
                <div class="complaint-category">
                    <i class="fas fa-tag"></i> ${complaint.category}
                    <span class="priority-badge priority-${complaint.priority.toLowerCase()}">
                        ${complaint.priority}
                    </span>
                </div>
                <div class="complaint-description">
                    ${complaint.description}
                </div>
            </div>
            <div class="complaint-footer">
                <div class="complaint-date">
                    <i class="fas fa-calendar"></i> ${formatDate(complaint.date, true)}
                </div>
                <div class="complaint-location">
                    <i class="fas fa-map-marker-alt"></i> ${complaint.location}
                </div>
            </div>
        </div>
    `).join('');
    
    complaintList.innerHTML = complaintsHTML;
}

function getStatusBadgeClass(status) {
    const map = {
        'submitted': 'warning',
        'assigned': 'info',
        'in-progress': 'primary',
        'resolved': 'success'
    };
    return map[status] || 'secondary';
}

function getStatusText(status) {
    const map = {
        'submitted': 'Submitted',
        'assigned': 'Assigned',
        'in-progress': 'In Progress',
        'resolved': 'Resolved'
    };
    return map[status] || status;
}

function updateDashboardStats(complaints) {
    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => ['submitted', 'assigned'].includes(c.status)).length,
        inProgress: complaints.filter(c => c.status === 'in-progress').length,
        resolved: complaints.filter(c => c.status === 'resolved').length
    };
    
    document.getElementById('totalComplaints').textContent = stats.total;
    document.getElementById('pendingComplaints').textContent = stats.pending;
    document.getElementById('inProgressComplaints').textContent = stats.inProgress;
    document.getElementById('resolvedComplaints').textContent = stats.resolved;
}

function initializeDashboardFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchComplaint');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            loadCitizenComplaints();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            // Implement search functionality
            console.log('Searching:', this.value);
        }, 500));
    }
}

function initializeNotificationBell() {
    const notificationBell = document.getElementById('notificationBell');
    if (notificationBell) {
        // Check for new notifications
        const notifications = getMockNotifications();
        const count = notifications.length;
        
        if (count > 0) {
            const badge = document.createElement('span');
            badge.className = 'badge badge-danger';
            badge.style.position = 'absolute';
            badge.style.top = '-5px';
            badge.style.right = '-5px';
            badge.style.padding = '2px 6px';
            badge.style.fontSize = '0.7rem';
            badge.textContent = count;
            
            notificationBell.style.position = 'relative';
            notificationBell.appendChild(badge);
        }
        
        notificationBell.addEventListener('click', function() {
            showNotifications();
        });
    }
}

function getMockNotifications() {
    return [
        {
            id: 1,
            title: 'Status Update',
            message: 'Complaint JAN24873 is now In Progress',
            time: '5 min ago',
            read: false
        },
        {
            id: 2,
            title: 'Complaint Assigned',
            message: 'Complaint JAN24782 assigned to Officer Patil',
            time: '1 hour ago',
            read: false
        }
    ];
}

function showNotifications() {
    const notifications = getMockNotifications();
    
    let notificationHTML = notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}" onclick="markAsRead(${n.id})">
            <div class="notification-title">${n.title}</div>
            <div class="notification-message">${n.message}</div>
            <div class="notification-time">${n.time}</div>
        </div>
    `).join('');
    
    if (notifications.length === 0) {
        notificationHTML = '<div class="notification-item">No new notifications</div>';
    }
    
    // Create modal or dropdown
    showToast('Notifications updated', 'info');
}

window.viewComplaint = function(id) {
    window.location.href = `track-complaint.html?id=${id}`;
};

window.markAsRead = function(id) {
    console.log('Mark as read:', id);
};

window.reopenComplaint = function(id) {
    if (confirm('Are you sure you want to reopen this complaint?')) {
        showToast('Complaint reopened', 'success');
        // Update complaint status
    }
};