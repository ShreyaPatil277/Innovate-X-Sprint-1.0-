// tracking.js - Handle complaint tracking

document.addEventListener('DOMContentLoaded', function() {
    initializeTracking();
    checkURLForID();
});

function initializeTracking() {
    const trackBtn = document.getElementById('trackBtn');
    const trackInput = document.getElementById('trackId');
    
    if (trackBtn && trackInput) {
        trackBtn.addEventListener('click', function() {
            const complaintId = trackInput.value.trim();
            if (complaintId) {
                trackComplaint(complaintId);
            } else {
                showToast('Please enter a complaint ID', 'warning');
            }
        });
        
        trackInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                trackBtn.click();
            }
        });
    }
}

function checkURLForID() {
    const urlParams = new URLSearchParams(window.location.search);
    const complaintId = urlParams.get('id');
    
    if (complaintId) {
        document.getElementById('trackId').value = complaintId;
        trackComplaint(complaintId);
    }
}

function trackComplaint(complaintId) {
    // Show loading
    const detailsDiv = document.getElementById('complaintDetails');
    detailsDiv.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
    
    // Simulate API call
    setTimeout(() => {
        // Mock complaint data
        const complaint = getMockComplaint(complaintId);
        
        if (complaint) {
            displayComplaintDetails(complaint);
        } else {
            detailsDiv.innerHTML = '<div class="alert alert-danger">Complaint not found</div>';
        }
    }, 1000);
}

function getMockComplaint(id) {
    // Mock database
    const complaints = {
        'JAN24873': {
            id: 'JAN24873',
            description: 'Road broken near the market, large pothole causing accidents',
            language: 'मराठी',
            category: 'Roads',
            location: 'Ward 5, Market Area, 442001',
            date: '2024-01-15T10:30:00',
            status: 'in-progress',
            priority: 'High',
            department: 'Public Works Dept',
            officer: {
                name: 'Rajesh Patil',
                designation: 'Junior Engineer',
                contact: '9876543210'
            },
            timeline: [
                { status: 'submitted', date: '2024-01-15T10:30:00', note: 'Complaint registered' },
                { status: 'assigned', date: '2024-01-15T14:20:00', note: 'Assigned to Rajesh Patil' },
                { status: 'in-progress', date: '2024-01-16T09:15:00', note: 'Team visited site' },
                { status: 'resolved', date: null, note: 'Pending' }
            ],
            estimatedResolution: '2024-01-22T18:00:00',
            notes: [
                { date: '2024-01-16T09:15:00', text: 'Site inspection done. Material ordered.' },
                { date: '2024-01-17T11:30:00', text: 'Work to start tomorrow.' }
            ]
        },
        'JAN24101': {
            id: 'JAN24101',
            description: 'Water leakage from main pipeline',
            language: 'English',
            category: 'Water',
            location: 'Street No. 12, Gandhi Nagar',
            date: '2024-01-14T08:15:00',
            status: 'resolved',
            priority: 'Critical',
            department: 'Water Supply Dept',
            officer: {
                name: 'Suresh Kumar',
                designation: 'Water Engineer',
                contact: '9876543211'
            },
            timeline: [
                { status: 'submitted', date: '2024-01-14T08:15:00', note: 'Complaint registered' },
                { status: 'assigned', date: '2024-01-14T09:30:00', note: 'Assigned to Suresh Kumar' },
                { status: 'in-progress', date: '2024-01-14T10:00:00', note: 'Team dispatched' },
                { status: 'resolved', date: '2024-01-14T15:45:00', note: 'Leakage repaired' }
            ],
            estimatedResolution: '2024-01-14T18:00:00',
            notes: [
                { date: '2024-01-14T10:00:00', text: 'Team reached site' },
                { date: '2024-01-14T15:45:00', text: 'Repair completed successfully' }
            ],
            resolutionProof: 'proof-101.jpg'
        }
    };
    
    return complaints[id] || complaints['JAN24873'];
}

function displayComplaintDetails(complaint) {
    const detailsDiv = document.getElementById('complaintDetails');
    
    const statusIndex = {
        'submitted': 0,
        'assigned': 1,
        'in-progress': 2,
        'resolved': 3
    };
    
    const currentStatusIndex = statusIndex[complaint.status] || 0;
    
    // Generate timeline HTML
    const timelineHTML = complaint.timeline.map((item, index) => {
        const isCompleted = item.date !== null;
        const isActive = index === currentStatusIndex && !isCompleted;
        
        return `
            <div class="timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
                <div class="timeline-dot">
                    ${isCompleted ? '<i class="fas fa-check"></i>' : index + 1}
                </div>
                <div class="timeline-label">${capitalizeFirst(item.status.replace('-', ' '))}</div>
                <div class="timeline-date">${item.date ? formatDate(item.date) : 'Pending'}</div>
                <small>${item.note}</small>
            </div>
        `;
    }).join('');
    
    // Generate notes HTML
    const notesHTML = complaint.notes.map(note => `
        <div class="note-item">
            <small class="text-muted">${formatDate(note.date)}</small>
            <p>${note.text}</p>
        </div>
    `).join('');
    
    detailsDiv.innerHTML = `
        <div class="complaint-details">
            <div class="detail-row">
                <span class="detail-label">Complaint ID:</span>
                <span class="detail-value"><strong>${complaint.id}</strong></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Description:</span>
                <span class="detail-value">${complaint.description}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Language:</span>
                <span class="detail-value">${complaint.language}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Category:</span>
                <span class="detail-value">
                    <span class="badge badge-primary">${complaint.category}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Priority:</span>
                <span class="detail-value">
                    <span class="priority-badge priority-${complaint.priority.toLowerCase()}">${complaint.priority}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Location:</span>
                <span class="detail-value"><i class="fas fa-map-marker-alt"></i> ${complaint.location}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Submitted on:</span>
                <span class="detail-value">${formatDate(complaint.date, true)}</span>
            </div>
            
            <h4 style="margin: 20px 0 10px;">Status Timeline</h4>
            <div class="timeline">
                ${timelineHTML}
            </div>
            
            <div class="officer-details">
                <div class="officer-avatar">
                    <i class="fas fa-user-tie"></i>
                </div>
                <div class="officer-info">
                    <h4>${complaint.officer.name}</h4>
                    <p><i class="fas fa-briefcase"></i> ${complaint.officer.designation}</p>
                    <p><i class="fas fa-phone"></i> ${complaint.officer.contact}</p>
                </div>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Department:</span>
                <span class="detail-value">${complaint.department}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Estimated Resolution:</span>
                <span class="detail-value">
                    <strong>${formatDate(complaint.estimatedResolution, true)}</strong>
                    <span class="sla-timer sla-${getSLAClass(complaint.estimatedResolution)}">
                        ${getSLAText(complaint.estimatedResolution)}
                    </span>
                </span>
            </div>
            
            ${complaint.notes.length > 0 ? `
                <h4 style="margin: 20px 0 10px;">Officer Notes</h4>
                <div class="notes-list">
                    ${notesHTML}
                </div>
            ` : ''}
            
            ${complaint.resolutionProof ? `
                <div class="detail-row">
                    <span class="detail-label">Resolution Proof:</span>
                    <span class="detail-value">
                        <i class="fas fa-file-image"></i> 
                        <a href="#" onclick="viewProof('${complaint.resolutionProof}')">View Document</a>
                    </span>
                </div>
            ` : ''}
            
            <div class="share-options">
                <button class="share-btn" onclick="shareComplaint('${complaint.id}')">
                    <i class="fas fa-share-alt"></i> Share
                </button>
                <button class="share-btn" onclick="generateQR('${complaint.id}')">
                    <i class="fas fa-qrcode"></i> QR Code
                </button>
                <button class="share-btn" onclick="downloadComplaint('${complaint.id}')">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
            
            <div id="qrContainer" style="display: none; text-align: center; margin-top: 20px;">
                <div class="qr-code">
                    <i class="fas fa-qrcode"></i>
                </div>
                <p class="qr-label">Scan to track complaint ${complaint.id}</p>
                <button class="btn-small" onclick="hideQR()">Close</button>
            </div>
        </div>
    `;
}

function getSLAClass(estimatedDate) {
    if (!estimatedDate) return 'normal';
    
    const now = new Date();
    const est = new Date(estimatedDate);
    const diffDays = Math.ceil((est - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'critical';
    if (diffDays < 2) return 'warning';
    return 'normal';
}

function getSLAText(estimatedDate) {
    if (!estimatedDate) return 'No SLA';
    
    const now = new Date();
    const est = new Date(estimatedDate);
    const diffDays = Math.ceil((est - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'OVERDUE';
    if (diffDays === 0) return 'Due Today';
    return `${diffDays} days left`;
}

window.shareComplaint = function(id) {
    const url = `${window.location.origin}/pages/citizen/track-complaint.html?id=${id}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Complaint Status',
            text: `Track complaint ${id}`,
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard', 'success');
    }
};

window.generateQR = function(id) {
    const qrContainer = document.getElementById('qrContainer');
    if (qrContainer) {
        qrContainer.style.display = 'block';
    }
};

window.hideQR = function() {
    const qrContainer = document.getElementById('qrContainer');
    if (qrContainer) {
        qrContainer.style.display = 'none';
    }
};

window.viewProof = function(proofId) {
    showToast('Opening proof document...', 'info');
    // In real app, would open the actual file
};

window.downloadComplaint = function(id) {
    const complaint = getMockComplaint(id);
    const dataStr = JSON.stringify(complaint, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `complaint-${id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Complaint details downloaded', 'success');
};