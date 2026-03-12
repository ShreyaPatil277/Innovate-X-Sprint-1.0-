// officer/assignment.js - Complaint assignment system

document.addEventListener('DOMContentLoaded', function() {
    loadUnassignedComplaints();
    loadDepartmentOfficers();
    initializeAssignmentEvents();
});

function loadUnassignedComplaints() {
    const complaints = getMockUnassignedComplaints();
    displayUnassignedList(complaints);
}

function getMockUnassignedComplaints() {
    return [
        {
            id: 'JAN24999',
            description: 'Broken street light at corner',
            category: 'Electricity',
            location: 'Ward 3, North Corner',
            priority: 'Medium',
            submittedDate: '2024-01-18T09:30:00',
            department: 'Electricity Board'
        },
        {
            id: 'JAN25000',
            description: 'Water pipe burst',
            category: 'Water',
            location: 'Ward 5, Market Road',
            priority: 'Critical',
            submittedDate: '2024-01-18T10:15:00',
            department: 'Water Supply'
        },
        {
            id: 'JAN25001',
            description: 'Garbage pile up',
            category: 'Sanitation',
            location: 'Ward 2, Back Lane',
            priority: 'High',
            submittedDate: '2024-01-18T11:00:00',
            department: 'Municipal Corp'
        }
    ];
}

function displayUnassignedList(complaints) {
    const list = document.getElementById('unassignedList');
    if (!list) return;
    
    const itemsHTML = complaints.map(complaint => `
        <div class="assignment-item" onclick="selectComplaint('${complaint.id}')">
            <div class="assignment-item-header">
                <span class="assignment-id">${complaint.id}</span>
                <span class="assignment-priority priority-badge priority-${complaint.priority.toLowerCase()}">
                    ${complaint.priority}
                </span>
            </div>
            <div class="assignment-details">
                <p><i class="fas fa-tag"></i> ${complaint.category}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${complaint.location}</p>
                <p><i class="fas fa-calendar"></i> ${formatDate(complaint.submittedDate)}</p>
                <p class="text-muted">${complaint.description.substring(0, 50)}...</p>
            </div>
        </div>
    `).join('');
    
    list.innerHTML = itemsHTML;
}

function loadDepartmentOfficers() {
    const officers = getMockOfficers();
    displayOfficersList(officers);
}

function getMockOfficers() {
    return [
        {
            id: 'OFF001',
            name: 'Rajesh Patil',
            designation: 'Junior Engineer',
            department: 'PWD',
            load: 5,
            maxLoad: 10,
            available: true,
            phone: '9876543210',
            email: 'rajesh.p@department.gov.in'
        },
        {
            id: 'OFF002',
            name: 'Suresh Kumar',
            designation: 'Water Engineer',
            department: 'Water Supply',
            load: 8,
            maxLoad: 10,
            available: true,
            phone: '9876543211',
            email: 'suresh.k@department.gov.in'
        },
        {
            id: 'OFF003',
            name: 'Priya Sharma',
            designation: 'Sanitation Officer',
            department: 'Municipal Corp',
            load: 10,
            maxLoad: 10,
            available: false,
            phone: '9876543212',
            email: 'priya.s@department.gov.in'
        },
        {
            id: 'OFF004',
            name: 'Anita Desai',
            designation: 'Electrical Engineer',
            department: 'Electricity Board',
            load: 3,
            maxLoad: 10,
            available: true,
            phone: '9876543213',
            email: 'anita.d@department.gov.in'
        },
        {
            id: 'OFF005',
            name: 'Vikram Singh',
            designation: 'Junior Engineer',
            department: 'PWD',
            load: 7,
            maxLoad: 10,
            available: true,
            phone: '9876543214',
            email: 'vikram.s@department.gov.in'
        }
    ];
}

function displayOfficersList(officers) {
    const list = document.getElementById('officersList');
    if (!list) return;
    
    const itemsHTML = officers.map(officer => {
        const loadPercentage = (officer.load / officer.maxLoad) * 100;
        let loadClass = 'normal';
        if (loadPercentage >= 90) loadClass = 'critical';
        else if (loadPercentage >= 70) loadClass = 'warning';
        
        return `
            <div class="officer-card" onclick="selectOfficer('${officer.id}')">
                <div class="officer-avatar">
                    ${officer.name.charAt(0)}
                </div>
                <div class="officer-info">
                    <div class="officer-name">${officer.name}</div>
                    <div class="officer-dept">${officer.designation} - ${officer.department}</div>
                    <div class="officer-load">
                        <span>Current Load: ${officer.load}/${officer.maxLoad}</span>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${loadPercentage}%; 
                                background: ${loadClass === 'critical' ? 'var(--danger)' : 
                                           loadClass === 'warning' ? 'var(--warning)' : 'var(--secondary)'};">
                            </div>
                        </div>
                    </div>
                </div>
                ${!officer.available ? '<span class="badge badge-warning">At Max Load</span>' : ''}
            </div>
        `;
    }).join('');
    
    list.innerHTML = itemsHTML;
}

function initializeAssignmentEvents() {
    const assignBtn = document.getElementById('assignBtn');
    const escalateBtn = document.getElementById('escalateBtn');
    
    if (assignBtn) {
        assignBtn.addEventListener('click', function() {
            assignComplaint();
        });
    }
    
    if (escalateBtn) {
        escalateBtn.addEventListener('click', function() {
            showEscalationModal();
        });
    }
}

let selectedComplaintId = null;
let selectedOfficerId = null;

window.selectComplaint = function(id) {
    // Remove previous selection
    document.querySelectorAll('.assignment-item').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selection to current
    const el = event.currentTarget;
    el.classList.add('selected');
    selectedComplaintId = id;
    
    // Enable assign button if both selected
    checkAssignReady();
};

window.selectOfficer = function(id) {
    // Remove previous selection
    document.querySelectorAll('.officer-card').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selection to current
    const el = event.currentTarget;
    el.classList.add('selected');
    selectedOfficerId = id;
    
    // Check if officer is available
    const officers = getMockOfficers();
    const officer = officers.find(o => o.id === id);
    
    if (officer && officer.load >= officer.maxLoad) {
        showToast('This officer is at maximum load', 'warning');
        selectedOfficerId = null;
        el.classList.remove('selected');
    }
    
    // Enable assign button if both selected
    checkAssignReady();
};

function checkAssignReady() {
    const assignBtn = document.getElementById('assignBtn');
    if (assignBtn) {
        assignBtn.disabled = !(selectedComplaintId && selectedOfficerId);
    }
}

function assignComplaint() {
    if (!selectedComplaintId || !selectedOfficerId) {
        showToast('Please select both complaint and officer', 'warning');
        return;
    }
    
    showToast(`Assigning complaint ${selectedComplaintId}...`, 'info');
    
    // Simulate assignment
    setTimeout(() => {
        showToast('Complaint assigned successfully', 'success');
        
        // Refresh lists
        loadUnassignedComplaints();
        loadDepartmentOfficers();
        
        // Reset selection
        selectedComplaintId = null;
        selectedOfficerId = null;
        checkAssignReady();
    }, 1500);
}

function showEscalationModal() {
    const complaints = getMockOverdueComplaints();
    
    const modal = document.getElementById('escalationModal');
    const modalBody = document.getElementById('escalationModalBody');
    
    const complaintsHTML = complaints.map(complaint => `
        <div class="escalation-item">
            <div>
                <strong>${complaint.id}</strong> - ${complaint.description.substring(0, 30)}...
            </div>
            <div>
                <span class="escalation-time">Overdue by ${complaint.overdueDays} days</span>
                <button class="btn-small btn-danger" onclick="escalateComplaint('${complaint.id}')">
                    Escalate
                </button>
            </div>
        </div>
    `).join('');
    
    modalBody.innerHTML = `
        <h4>Overdue Complaints</h4>
        ${complaintsHTML || '<p>No overdue complaints</p>'}
        <div class="modal-footer">
            <button class="btn-outline" onclick="closeEscalationModal()">Close</button>
        </div>
    `;
    
    modal.classList.add('show');
}

function getMockOverdueComplaints() {
    return [
        {
            id: 'JAN24567',
            description: 'Road repair pending for 10 days',
            overdueDays: 3,
            department: 'PWD'
        },
        {
            id: 'JAN24678',
            description: 'Water supply issue',
            overdueDays: 2,
            department: 'Water Supply'
        }
    ];
}

window.escalateComplaint = function(id) {
    if (confirm(`Escalate complaint ${id} to higher authorities?`)) {
        showToast(`Complaint ${id} escalated`, 'warning');
        closeEscalationModal();
    }
};

window.closeEscalationModal = function() {
    document.getElementById('escalationModal').classList.remove('show');
};

window.reassignComplaint = function(id) {
    if (confirm('Reassign this complaint to another department?')) {
        showToast('Please select new department', 'info');
    }
};