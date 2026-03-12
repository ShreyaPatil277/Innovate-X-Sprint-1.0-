// officer/dashboard.js - Officer dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    loadOfficerDashboard();
    initializeOfficerFilters();
    checkOfficerAuth();
});

function checkOfficerAuth() {
    // In real app, check if officer is logged in
    const user = storage.get('currentUser');
    if (!user || user.role !== 'officer') {
        // Redirect to login
        // window.location.href = 'login.html';
    }
}

function loadOfficerDashboard() {
    loadOfficerStats();
    loadAssignedComplaints();
    loadSLAAlerts();
}

function loadOfficerStats() {
    const stats = {
        total: 24,
        pending: 8,
        inProgress: 12,
        resolved: 4,
        overdue: 3
    };
    
    document.getElementById('totalAssigned').textContent = stats.total;
    document.getElementById('pendingComplaints').textContent = stats.pending;
    document.getElementById('inProgressComplaints').textContent = stats.inProgress;
    document.getElementById('resolvedComplaints').textContent = stats.resolved;
    document.getElementById('overdueCount').textContent = stats.overdue;
    
    // Update trend indicators
    updateTrends();
}

function updateTrends() {
    // Mock trend data
    const trends = {
        total: '+12%',
        pending: '-5%',
        inProgress: '+8%',
        resolved: '+15%'
    };
    
    document.querySelectorAll('.trend-value').forEach(el => {
        const type = el.dataset.trend;
        if (trends[type]) {
            el.textContent = trends[type];
            el.className = `trend-value ${trends[type].startsWith('+') ? 'trend-up' : 'trend-down'}`;
        }
    });
}

function loadAssignedComplaints() {
    const complaints = getMockOfficerComplaints();
    displayComplaintsTable(complaints);
}

function getMockOfficerComplaints() {
    return [
        {
            id: 'JAN24873',
            citizen: 'Ramesh Patel',
            description: 'Large pothole on main road near market',
            category: 'Roads',
            location: 'Ward 5, Market Area',
            priority: 'High',
            status: 'in-progress',
            assignedDate: '2024-01-15T10:30:00',
            sla: '2024-01-22T18:00:00',
            citizenPhone: '9876543210'
        },
        {
            id: 'JAN24101',
            citizen: 'Sita Sharma',
            description: 'Water leakage from main pipeline',
            category: 'Water',
            location: 'Street No. 12, Gandhi Nagar',
            priority: 'Critical',
            status: 'assigned',
            assignedDate: '2024-01-16T09:15:00',
            sla: '2024-01-23T18:00:00',
            citizenPhone: '9876543211'
        },
        {
            id: 'JAN24782',
            citizen: 'Mohammad Khan',
            description: 'Street light not working for 3 days',
            category: 'Electricity',
            location: 'Park Street, Ward 3',
            priority: 'Medium',
            status: 'in-progress',
            assignedDate: '2024-01-14T14:20:00',
            sla: '2024-01-21T18:00:00',
            citizenPhone: '9876543212'
        },
        {
            id: 'JAN24156',
            citizen: 'Lakshmi Iyer',
            description: 'Garbage not collected for a week',
            category: 'Sanitation',
            location: 'Sector 7, Housing Colony',
            priority: 'High',
            status: 'pending',
            assignedDate: '2024-01-17T11:00:00',
            sla: '2024-01-24T18:00:00',
            citizenPhone: '9876543213'
        },
        {
            id: 'JAN24901',
            citizen: 'David Thomas',
            description: 'Noise pollution from construction site',
            category: 'Noise',
            location: 'Commercial Street, Ward 2',
            priority: 'Low',
            status: 'resolved',
            assignedDate: '2024-01-10T08:30:00',
            resolvedDate: '2024-01-12T16:45:00',
            sla: '2024-01-17T18:00:00',
            citizenPhone: '9876543214'
        }
    ];
}

function displayComplaintsTable(complaints) {
    const tableBody = document.getElementById('complaintsTableBody');
    if (!tableBody) return;
    
    const rowsHTML = complaints.map(complaint => {
        const slaClass = getSLAClass(complaint.sla);
        const slaText = getSLAText(complaint.sla);
        
        return `
            <tr onclick="viewComplaintDetail('${complaint.id}')">
                <td><strong>${complaint.id}</strong></td>
                <td>${complaint.citizen}</td>
                <td>${complaint.category}</td>
                <td>
                    <span class="priority-badge priority-${complaint.priority.toLowerCase()}">
                        ${complaint.priority}
                    </span>
                </td>
                <td>
                    <span class="badge badge-${getStatusBadge(complaint.status)}">
                        ${getStatusText(complaint.status)}
                    </span>
                </td>
                <td>
                    <span class="sla-timer sla-${slaClass}">${slaText}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        ${complaint.status === 'pending' ? `
                            <button class="action-btn accept-btn" onclick="acceptComplaint('${complaint.id}', event)">
                                <i class="fas fa-check"></i> Accept
                            </button>
                            <button class="action-btn reject-btn" onclick="rejectComplaint('${complaint.id}', event)">
                                <i class="fas fa-times"></i> Reject
                            </button>
                        ` : ''}
                        ${complaint.status === 'in-progress' ? `
                            <button class="action-btn view-btn" onclick="updateStatus('${complaint.id}', event)">
                                <i class="fas fa-sync"></i> Update
                            </button>
                        ` : ''}
                        ${complaint.status === 'resolved' ? `
                            <span class="badge badge-success">Completed</span>
                        ` : ''}
                        <button class="action-btn view-btn" onclick="viewDetails('${complaint.id}', event)">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    tableBody.innerHTML = rowsHTML;
}

function getStatusBadge(status) {
    const map = {
        'pending': 'warning',
        'assigned': 'info',
        'in-progress': 'primary',
        'resolved': 'success'
    };
    return map[status] || 'secondary';
}

function getStatusText(status) {
    const map = {
        'pending': 'Pending',
        'assigned': 'Assigned',
        'in-progress': 'In Progress',
        'resolved': 'Resolved'
    };
    return map[status] || status;
}

function initializeOfficerFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    const searchInput = document.getElementById('searchComplaint');
    const applyFiltersBtn = document.getElementById('applyFilters');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            applyFilters();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
}

function applyFilters() {
    const status = document.getElementById('statusFilter')?.value || 'all';
    const priority = document.getElementById('priorityFilter')?.value || 'all';
    const search = document.getElementById('searchComplaint')?.value || '';
    
    showToast('Applying filters...', 'info');
    
    // In real app, would filter data
    setTimeout(() => {
        showToast('Filters applied', 'success');
    }, 500);
}

function loadSLAAlerts() {
    const alerts = [
        { id: 'JAN24782', time: '2 hours left', priority: 'critical' },
        { id: 'JAN24873', time: '1 day left', priority: 'warning' }
    ];
    
    const alertsList = document.getElementById('slaAlertsList');
    if (!alertsList) return;
    
    const alertsHTML = alerts.map(alert => `
        <div class="alert-item alert-${alert.priority}">
            <i class="fas fa-clock"></i>
            <span>Complaint ${alert.id}: ${alert.time}</span>
            <button onclick="viewComplaint('${alert.id}')">View</button>
        </div>
    `).join('');
    
    alertsList.innerHTML = alertsHTML;
}

window.viewComplaintDetail = function(id) {
    openComplaintModal(id);
};

window.acceptComplaint = function(id, event) {
    event.stopPropagation();
    if (confirm('Accept this complaint?')) {
        showToast(`Complaint ${id} accepted`, 'success');
        // Update status
    }
};

window.rejectComplaint = function(id, event) {
    event.stopPropagation();
    const reason = prompt('Please provide reason for rejection:');
    if (reason) {
        showToast(`Complaint ${id} rejected`, 'warning');
    }
};

window.updateStatus = function(id, event) {
    event.stopPropagation();
    openStatusModal(id);
};

window.viewDetails = function(id, event) {
    event.stopPropagation();
    openComplaintModal(id);
};

function openComplaintModal(id) {
    const complaint = getMockOfficerComplaints().find(c => c.id === id);
    if (!complaint) return;
    
    const modal = document.getElementById('complaintModal');
    const modalBody = document.getElementById('complaintModalBody');
    
    modalBody.innerHTML = `
        <div class="complaint-info">
            <div class="info-group">
                <label>Complaint ID</label>
                <div class="info-value">${complaint.id}</div>
            </div>
            <div class="info-group">
                <label>Citizen</label>
                <div class="info-value">${complaint.citizen} (${complaint.citizenPhone})</div>
            </div>
            <div class="info-group">
                <label>Description</label>
                <div class="info-value">${complaint.description}</div>
            </div>
            <div class="info-group">
                <label>Location</label>
                <div class="info-value">${complaint.location}</div>
            </div>
            <div class="info-group">
                <label>Category</label>
                <div class="info-value">${complaint.category}</div>
            </div>
            <div class="info-group">
                <label>Priority</label>
                <div class="info-value">
                    <span class="priority-badge priority-${complaint.priority.toLowerCase()}">
                        ${complaint.priority}
                    </span>
                </div>
            </div>
            <div class="info-group">
                <label>Status</label>
                <div class="info-value">
                    <span class="badge badge-${getStatusBadge(complaint.status)}">
                        ${getStatusText(complaint.status)}
                    </span>
                </div>
            </div>
            <div class="info-group">
                <label>SLA Deadline</label>
                <div class="info-value">
                    ${formatDate(complaint.sla, true)}
                    <span class="sla-timer sla-${getSLAClass(complaint.sla)}">
                        ${getSLAText(complaint.sla)}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function openStatusModal(id) {
    const complaint = getMockOfficerComplaints().find(c => c.id === id);
    if (!complaint) return;
    
    const modal = document.getElementById('statusModal');
    const modalBody = document.getElementById('statusModalBody');
    
    modalBody.innerHTML = `
        <div class="status-update-section">
            <h4>Update Status for ${complaint.id}</h4>
            
            <div class="form-group">
                <label>Current Status</label>
                <div>${getStatusText(complaint.status)}</div>
            </div>
            
            <div class="form-group">
                <label>New Status</label>
                <select class="form-control" id="newStatus">
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Update Notes</label>
                <textarea class="form-control" rows="3" id="statusNotes" 
                    placeholder="Add details about the update..."></textarea>
            </div>
            
            <div class="form-group" id="proofSection" style="display: none;">
                <label>Upload Resolution Proof</label>
                <div class="file-upload" id="proofUpload">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Click to upload proof (photo/document)</p>
                </div>
                <input type="file" id="proofInput" style="display:none;">
            </div>
            
            <div class="modal-footer">
                <button class="btn-outline" onclick="closeStatusModal()">Cancel</button>
                <button class="btn-primary" onclick="submitStatusUpdate('${complaint.id}')">
                    Update Status
                </button>
            </div>
        </div>
    `;
    
    // Show proof section if resolving
    document.getElementById('newStatus').addEventListener('change', function() {
        const proofSection = document.getElementById('proofSection');
        proofSection.style.display = this.value === 'resolved' ? 'block' : 'none';
    });
    
    modal.classList.add('show');
}

window.closeComplaintModal = function() {
    document.getElementById('complaintModal').classList.remove('show');
};

window.closeStatusModal = function() {
    document.getElementById('statusModal').classList.remove('show');
};

window.submitStatusUpdate = function(id) {
    const newStatus = document.getElementById('newStatus')?.value;
    const notes = document.getElementById('statusNotes')?.value;
    
    if (!notes) {
        showToast('Please add update notes', 'warning');
        return;
    }
    
    showToast(`Status updated for ${id}`, 'success');
    closeStatusModal();
    
    // Reload complaints
    setTimeout(() => {
        loadAssignedComplaints();
    }, 1000);
};