// admin/super-admin.js - Super admin functionality

document.addEventListener('DOMContentLoaded', function() {
    loadSystemOverview();
    loadDepartmentStats();
    loadOfficersList();
    initializeAdminActions();
});

function loadSystemOverview() {
    const stats = {
        totalComplaints: 1245,
        pendingComplaints: 342,
        inProgress: 567,
        resolved: 336,
        totalOfficers: 45,
        activeOfficers: 38,
        departments: 8,
        avgResolutionTime: '4.2 days'
    };
    
    document.getElementById('totalComplaints').textContent = stats.totalComplaints;
    document.getElementById('pendingComplaints').textContent = stats.pendingComplaints;
    document.getElementById('inProgressComplaints').textContent = stats.inProgress;
    document.getElementById('resolvedComplaints').textContent = stats.resolved;
    document.getElementById('totalOfficers').textContent = stats.totalOfficers;
    document.getElementById('activeOfficers').textContent = stats.activeOfficers;
}

function loadDepartmentStats() {
    const departments = [
        { name: 'PWD', complaints: 342, resolved: 210, avgTime: '5.2d', efficiency: 78 },
        { name: 'Water Supply', complaints: 256, resolved: 189, avgTime: '3.8d', efficiency: 85 },
        { name: 'Electricity', complaints: 389, resolved: 245, avgTime: '4.1d', efficiency: 82 },
        { name: 'Municipal Corp', complaints: 198, resolved: 112, avgTime: '6.3d', efficiency: 71 },
        { name: 'Police Dept', complaints: 60, resolved: 45, avgTime: '2.9d', efficiency: 90 }
    ];
    
    const tbody = document.getElementById('deptStatsBody');
    if (!tbody) return;
    
    const rowsHTML = departments.map(dept => `
        <tr>
            <td><strong>${dept.name}</strong></td>
            <td>${dept.complaints}</td>
            <td>${dept.resolved}</td>
            <td>${dept.avgTime}</td>
            <td>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${dept.efficiency}%;"></div>
                </div>
                <small>${dept.efficiency}%</small>
            </td>
            <td>
                <button class="btn-small btn-outline" onclick="viewDeptDetails('${dept.name}')">
                    View
                </button>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = rowsHTML;
}

function loadOfficersList() {
    const officers = [
        { id: 'OFF001', name: 'Rajesh Patil', dept: 'PWD', complaints: 12, resolved: 8, status: 'active' },
        { id: 'OFF002', name: 'Suresh Kumar', dept: 'Water Supply', complaints: 15, resolved: 12, status: 'active' },
        { id: 'OFF003', name: 'Priya Sharma', dept: 'Municipal Corp', complaints: 8, resolved: 5, status: 'active' },
        { id: 'OFF004', name: 'Anita Desai', dept: 'Electricity', complaints: 10, resolved: 9, status: 'active' },
        { id: 'OFF005', name: 'Vikram Singh', dept: 'PWD', complaints: 14, resolved: 10, status: 'inactive' },
        { id: 'OFF006', name: 'Meera Nair', dept: 'Police', complaints: 5, resolved: 5, status: 'active' }
    ];
    
    const tbody = document.getElementById('officersTableBody');
    if (!tbody) return;
    
    const rowsHTML = officers.map(officer => `
        <tr>
            <td>${officer.id}</td>
            <td>${officer.name}</td>
            <td>${officer.dept}</td>
            <td>${officer.complaints}</td>
            <td>${officer.resolved}</td>
            <td>
                <span class="officer-status status-${officer.status}">
                    ${officer.status === 'active' ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <button class="btn-small btn-primary" onclick="editOfficer('${officer.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-danger" onclick="deleteOfficer('${officer.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = rowsHTML;
}

function initializeAdminActions() {
    const addOfficerBtn = document.getElementById('addOfficerBtn');
    const exportBtn = document.getElementById('exportDataBtn');
    const bulkUpdateBtn = document.getElementById('bulkUpdateBtn');
    
    if (addOfficerBtn) {
        addOfficerBtn.addEventListener('click', function() {
            showAddOfficerModal();
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportSystemData();
        });
    }
    
    if (bulkUpdateBtn) {
        bulkUpdateBtn.addEventListener('click', function() {
            showBulkUpdateModal();
        });
    }
}

function showAddOfficerModal() {
    const modal = document.getElementById('adminModal');
    const modalBody = document.getElementById('adminModalBody');
    
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Employee ID</label>
            <input type="text" class="form-control" id="empId" placeholder="e.g., OFF007">
        </div>
        <div class="form-group">
            <label>Full Name</label>
            <input type="text" class="form-control" id="empName" placeholder="Enter officer name">
        </div>
        <div class="form-group">
            <label>Department</label>
            <select class="form-control" id="empDept">
                <option value="">Select Department</option>
                <option value="pwd">PWD</option>
                <option value="water">Water Supply</option>
                <option value="electricity">Electricity</option>
                <option value="municipal">Municipal Corp</option>
                <option value="police">Police</option>
            </select>
        </div>
        <div class="form-group">
            <label>Designation</label>
            <input type="text" class="form-control" id="empDesignation" placeholder="e.g., Junior Engineer">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" id="empEmail" placeholder="officer@department.gov.in">
        </div>
        <div class="form-group">
            <label>Phone</label>
            <input type="tel" class="form-control" id="empPhone" placeholder="9876543210">
        </div>
        <div class="form-group">
            <label>Max Load</label>
            <input type="number" class="form-control" id="empMaxLoad" value="10" min="1" max="20">
        </div>
    `;
    
    modal.classList.add('show');
    
    // Change modal footer buttons
    const modalFooter = document.querySelector('#adminModal .modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button class="btn-outline" onclick="closeAdminModal()">Cancel</button>
            <button class="btn-primary" onclick="saveNewOfficer()">Add Officer</button>
        `;
    }
}

function exportSystemData() {
    const format = prompt('Export format? (csv/excel)', 'csv');
    if (format) {
        showToast(`Exporting data as ${format}...`, 'info');
        setTimeout(() => {
            showToast('Export completed', 'success');
        }, 2000);
    }
}

function showBulkUpdateModal() {
    const modal = document.getElementById('adminModal');
    const modalBody = document.getElementById('adminModalBody');
    
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Select Department</label>
            <select class="form-control" id="bulkDept">
                <option value="">All Departments</option>
                <option value="pwd">PWD</option>
                <option value="water">Water Supply</option>
                <option value="electricity">Electricity</option>
                <option value="municipal">Municipal Corp</option>
            </select>
        </div>
        <div class="form-group">
            <label>Select Status</label>
            <select class="form-control" id="bulkStatus">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
            </select>
        </div>
        <div class="form-group">
            <label>Update Note</label>
            <textarea class="form-control" rows="3" placeholder="Enter update message for all selected complaints"></textarea>
        </div>
        <div class="alert alert-warning">
            <i class="fas fa-exclamation-triangle"></i>
            This will update 100+ complaints. This action cannot be undone.
        </div>
    `;
    
    modal.classList.add('show');
    
    const modalFooter = document.querySelector('#adminModal .modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button class="btn-outline" onclick="closeAdminModal()">Cancel</button>
            <button class="btn-danger" onclick="confirmBulkUpdate()">Update All</button>
        `;
    }
}

window.saveNewOfficer = function() {
    // Validate inputs
    const name = document.getElementById('empName')?.value;
    if (!name) {
        showToast('Please enter officer name', 'warning');
        return;
    }
    
    showToast('Officer added successfully', 'success');
    closeAdminModal();
    
    // Reload officers list
    setTimeout(() => {
        loadOfficersList();
    }, 1000);
};

window.confirmBulkUpdate = function() {
    if (confirm('Are you sure you want to bulk update complaints?')) {
        showToast('Bulk update initiated', 'success');
        closeAdminModal();
    }
};

window.editOfficer = function(id) {
    showToast(`Editing officer ${id}`, 'info');
    showAddOfficerModal(); // Reuse modal with pre-filled data
};

window.deleteOfficer = function(id) {
    if (confirm(`Are you sure you want to delete officer ${id}?`)) {
        showToast(`Officer ${id} deleted`, 'success');
        // Refresh list
        setTimeout(() => {
            loadOfficersList();
        }, 1000);
    }
};

window.viewDeptDetails = function(dept) {
    showToast(`Viewing details for ${dept}`, 'info');
};

window.closeAdminModal = function() {
    document.getElementById('adminModal').classList.remove('show');
};

window.overrideAssignment = function(id) {
    showToast(`Override assignment for complaint ${id}`, 'warning');
};