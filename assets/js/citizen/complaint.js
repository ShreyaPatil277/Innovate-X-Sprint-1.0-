// complaint.js - Handle complaint submission

document.addEventListener('DOMContentLoaded', function() {
    initializeLanguageSelector();
    initializeVoiceInput();
    initializeFileUpload();
    initializeLocationPicker();
    initializeComplaintForm();
    initializeAIPreview();
});

// Language selector
function initializeLanguageSelector() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const complaintText = document.getElementById('complaintText');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const lang = this.textContent.trim();
            updateLanguage(lang);
            
            // Update voice recognition language
            if (window.recognition) {
                updateVoiceLanguage(lang);
            }
            
            // Show toast
            showToast(`Language changed to ${lang}`, 'info');
        });
    });
}

function updateLanguage(lang) {
    const langMap = {
        'English': 'en-IN',
        'हिन्दी': 'hi-IN',
        'मराठी': 'mr-IN',
        'தமிழ்': 'ta-IN',
        'తెలుగు': 'te-IN',
        'বাংলা': 'bn-IN'
    };
    
    const placeholderMap = {
        'English': 'Type your complaint here...',
        'हिन्दी': 'अपनी शिकायत यहाँ लिखें...',
        'मराठी': 'तक्रार येथे टाइप करा...',
        'தமிழ்': 'உங்கள் புகாரை இங்கே தட்டச்சு செய்யவும்...',
        'తెలుగు': 'మీ ఫిర్యాదును ఇక్కడ టైప్ చేయండి...',
        'বাংলা': 'আপনার অভিযোগ এখানে টাইপ করুন...'
    };
    
    const complaintText = document.getElementById('complaintText');
    if (complaintText) {
        complaintText.placeholder = placeholderMap[lang] || placeholderMap['English'];
    }
    
    // Store selected language
    localStorage.setItem('selectedLanguage', lang);
}

// Voice input
function initializeVoiceInput() {
    const voiceBtn = document.getElementById('voiceBtn');
    const complaintText = document.getElementById('complaintText');
    
    if (!voiceBtn || !complaintText) return;
    
    if (!('webkitSpeechRecognition' in window)) {
        voiceBtn.style.display = 'none';
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    window.recognition = recognition;
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    // Set initial language
    const savedLang = localStorage.getItem('selectedLanguage') || 'English';
    updateVoiceLanguage(savedLang);
    
    let finalTranscript = '';
    
    voiceBtn.addEventListener('click', function() {
        if (this.classList.contains('recording')) {
            recognition.stop();
            this.classList.remove('recording');
            this.innerHTML = '<i class="fas fa-microphone"></i>';
        } else {
            finalTranscript = '';
            recognition.start();
            this.classList.add('recording');
            this.innerHTML = '<i class="fas fa-stop"></i>';
            
            // Show recording indicator
            showToast('Listening... Speak now', 'info');
        }
    });
    
    recognition.onresult = function(event) {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        
        complaintText.value = finalTranscript + interimTranscript;
    };
    
    recognition.onerror = function(event) {
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        
        let errorMessage = 'Voice recognition failed';
        if (event.error === 'no-speech') {
            errorMessage = 'No speech detected';
        } else if (event.error === 'audio-capture') {
            errorMessage = 'Microphone not available';
        } else if (event.error === 'not-allowed') {
            errorMessage = 'Microphone access denied';
        }
        
        showToast(errorMessage, 'error');
    };
    
    recognition.onend = function() {
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    };
}

function updateVoiceLanguage(lang) {
    if (!window.recognition) return;
    
    const langMap = {
        'English': 'en-IN',
        'हिन्दी': 'hi-IN',
        'मराठी': 'mr-IN',
        'தமிழ்': 'ta-IN',
        'తెలుగు': 'te-IN',
        'বাংলা': 'bn-IN'
    };
    
    window.recognition.lang = langMap[lang] || 'en-IN';
}

// File upload
function initializeFileUpload() {
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = document.getElementById('fileInput');
    
    if (!fileUpload || !fileInput) return;
    
    fileUpload.addEventListener('click', () => fileInput.click());
    
    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = 'var(--primary)';
        fileUpload.style.background = 'var(--primary-light)';
    });
    
    fileUpload.addEventListener('dragleave', () => {
        fileUpload.style.borderColor = '';
        fileUpload.style.background = '';
    });
    
    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = '';
        fileUpload.style.background = '';
        
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });
}

function handleFiles(files) {
    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (file.size > maxSize) {
        showToast('File size should be less than 10MB', 'error');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showToast('Please upload an image file', 'error');
        return;
    }
    
    const fileUpload = document.getElementById('fileUpload');
    fileUpload.classList.add('has-file');
    fileUpload.innerHTML = `
        <i class="fas fa-check-circle" style="color: var(--secondary);"></i>
        <p>${file.name}</p>
        <small>${(file.size / 1024 / 1024).toFixed(2)} MB</small>
        <button type="button" class="btn-small" onclick="removeFile()">Remove</button>
    `;
    
    // Store file in memory for submission
    window.uploadedFile = file;
}

window.removeFile = function() {
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = document.getElementById('fileInput');
    
    fileUpload.classList.remove('has-file');
    fileUpload.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Click to upload or drag and drop</p>
        <small>Max file size: 10MB</small>
    `;
    
    fileInput.value = '';
    window.uploadedFile = null;
};

// Location picker
function initializeLocationPicker() {
    const detectBtn = document.getElementById('detectLocation');
    const locationInput = document.getElementById('location');
    
    if (!detectBtn || !locationInput) return;
    
    detectBtn.addEventListener('click', function() {
        if (!navigator.geolocation) {
            showToast('Geolocation not supported', 'error');
            return;
        }
        
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting...';
        this.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    // Reverse geocoding using OpenStreetMap Nominatim
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
                    );
                    const data = await response.json();
                    
                    const address = data.address;
                    const location = [
                        address.suburb || address.neighbourhood,
                        address.city || address.town,
                        address.postcode
                    ].filter(Boolean).join(', ');
                    
                    locationInput.value = location || 'Location detected';
                    showToast('Location detected successfully', 'success');
                    
                } catch (error) {
                    // Fallback to coordinates
                    locationInput.value = `Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`;
                    showToast('Location detected (coordinates)', 'success');
                }
                
                this.innerHTML = '<i class="fas fa-location-dot"></i> Detect my location';
                this.disabled = false;
            },
            (error) => {
                let errorMessage = 'Could not detect location';
                if (error.code === 1) {
                    errorMessage = 'Location access denied';
                } else if (error.code === 2) {
                    errorMessage = 'Location unavailable';
                } else if (error.code === 3) {
                    errorMessage = 'Location request timed out';
                }
                
                showToast(errorMessage, 'error');
                this.innerHTML = '<i class="fas fa-location-dot"></i> Detect my location';
                this.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// AI Preview
function initializeAIPreview() {
    const complaintText = document.getElementById('complaintText');
    const category = document.getElementById('category');
    
    if (!complaintText) return;
    
    complaintText.addEventListener('input', debounce(function() {
        const text = this.value;
        if (text.length > 10) {
            simulateAIAnalysis(text);
        }
    }, 500));
    
    if (category) {
        category.addEventListener('change', function() {
            updateAIPreview();
        });
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function simulateAIAnalysis(text) {
    // Simulate AI processing
    const detectedLang = detectLanguage(text);
    const translated = translateToEnglish(text, detectedLang);
    const priority = determinePriority(text);
    const department = determineDepartment(text, document.getElementById('category')?.value);
    const summary = generateSummary(translated);
    
    // Update UI
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = detectedLang;
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = translated.substring(0, 30) + '...';
    
    const priorityEl = document.querySelector('.stat-card:nth-child(3) .stat-number');
    priorityEl.textContent = priority;
    priorityEl.className = 'stat-number priority-' + priority.toLowerCase();
    
    document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = department;
}

function detectLanguage(text) {
    // Simple language detection based on Unicode ranges
    if (/[\u0900-\u097F]/.test(text)) return 'हिन्दी';
    if (/[\u0C00-\u0C7F]/.test(text)) return 'తెలుగు';
    if (/[\u0B80-\u0BFF]/.test(text)) return 'தமிழ்';
    if (/[\u0980-\u09FF]/.test(text)) return 'বাংলা';
    if (/[\u0900-\u097F]/.test(text) && text.includes('च')) return 'मराठी';
    return 'English';
}

function translateToEnglish(text, lang) {
    // Mock translation
    const translations = {
        'हिन्दी': 'Road is broken near the market',
        'मराठी': 'Water leakage in pipeline',
        'தமிழ்': 'Street light not working',
        'తెలుగు': 'Garbage not collected',
        'বাংলা': 'Drainage blocked'
    };
    
    return translations[lang] || text;
}

function determinePriority(text) {
    const keywords = {
        'Critical': ['leakage', 'breakdown', 'accident', 'emergency', 'danger'],
        'High': ['blocked', 'broken', 'not working', 'damage'],
        'Medium': ['repair', 'fix', 'issue'],
        'Low': ['suggestion', 'request', 'inquiry']
    };
    
    const lowerText = text.toLowerCase();
    
    for (const [priority, words] of Object.entries(keywords)) {
        if (words.some(word => lowerText.includes(word))) {
            return priority;
        }
    }
    
    return 'Medium';
}

function determineDepartment(text, selectedCategory) {
    if (selectedCategory && selectedCategory !== '') {
        const deptMap = {
            'roads': 'PWD',
            'water': 'Water Supply Dept',
            'electricity': 'Electricity Board',
            'sanitation': 'Municipal Corporation',
            'noise': 'Police Dept',
            'other': 'General Admin'
        };
        return deptMap[selectedCategory] || 'Municipal Corporation';
    }
    
    // Auto-detect based on text
    const lowerText = text.toLowerCase();
    if (lowerText.includes('road') || lowerText.includes('pothole')) return 'PWD';
    if (lowerText.includes('water') || lowerText.includes('pipe')) return 'Water Supply Dept';
    if (lowerText.includes('light') || lowerText.includes('electric')) return 'Electricity Board';
    if (lowerText.includes('garbage') || lowerText.includes('clean')) return 'Municipal Corporation';
    if (lowerText.includes('noise') || lowerText.includes('sound')) return 'Police Dept';
    
    return 'Municipal Corporation';
}

function generateSummary(text) {
    const words = text.split(' ').slice(0, 8);
    return words.join(' ') + '...';
}

function updateAIPreview() {
    simulateAIAnalysis(document.getElementById('complaintText')?.value || '');
}

// Form submission
function initializeComplaintForm() {
    const form = document.getElementById('complaintForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm(form)) {
            showToast('Please fill all required fields', 'warning');
            return;
        }
        
        // Show loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate complaint ID
            const complaintId = 'JAN' + Date.now().toString().slice(-6);
            
            // Store complaint in local storage for demo
            const complaint = {
                id: complaintId,
                text: document.getElementById('complaintText').value,
                location: document.getElementById('location').value,
                category: document.getElementById('category').value,
                language: document.querySelector('.lang-btn.active').textContent,
                priority: document.querySelector('.stat-card:nth-child(3) .stat-number').textContent,
                department: document.querySelector('.stat-card:nth-child(4) .stat-number').textContent,
                date: new Date().toISOString(),
                status: 'submitted'
            };
            
            const complaints = storage.get('complaints') || [];
            complaints.push(complaint);
            storage.set('complaints', complaints);
            
            showToast(`Complaint submitted successfully! ID: ${complaintId}`, 'success');
            
            // Redirect to tracking page
            setTimeout(() => {
                window.location.href = `track-complaint.html?id=${complaintId}`;
            }, 1500);
            
        } catch (error) {
            showToast('Submission failed. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}