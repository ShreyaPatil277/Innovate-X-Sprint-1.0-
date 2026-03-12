// auth.js - Authentication handling - NagarVaani

class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        const savedUser = storage.get('currentUser');
        if (savedUser) {
            this.currentUser = savedUser;
            this.updateUIForUser();
        }
        
        this.initializeLoginForms();
        this.initializeOTPForms();
    }
    
    initializeLoginForms() {
        const loginForms = document.querySelectorAll('.login-form');
        
        loginForms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = form.querySelector('#email')?.value;
                const phone = form.querySelector('#phone')?.value;
                const password = form.querySelector('#password')?.value;
                const role = form.dataset.role || 'citizen';
                
                if (email || phone) {
                    await this.handleLogin(email, phone, password, role, form);
                }
            });
        });
    }
    
    initializeOTPForms() {
        const otpButtons = document.querySelectorAll('.send-otp-btn');
        const verifyButtons = document.querySelectorAll('.verify-otp-btn');
        
        otpButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const phone = document.querySelector('#phone')?.value;
                
                if (phone) {
                    await this.sendOTP(phone);
                } else {
                    showToast('Please enter phone number', 'warning');
                }
            });
        });
        
        verifyButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const otp = document.querySelector('#otp')?.value;
                
                if (otp && otp.length === 6) {
                    await this.verifyOTP(otp);
                } else {
                    showToast('Please enter valid 6-digit OTP', 'warning');
                }
            });
        });
    }
    
    async handleLogin(email, phone, password, role, form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;
        
        try {
            await this.simulateAPICall();
            
            const user = {
                id: 'USR' + Math.floor(Math.random() * 10000),
                email: email,
                phone: phone,
                role: role,
                name: email ? email.split('@')[0] : 'Citizen',
                token: 'nagarvaani-jwt-' + Date.now()
            };
            
            this.setCurrentUser(user);
            showToast(`Welcome to NagarVaani!`, 'success');
            
            setTimeout(() => {
                this.redirectToDashboard(role);
            }, 1500);
            
        } catch (error) {
            showToast('Login failed. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async sendOTP(phone) {
        showToast('Sending OTP...', 'info');
        
        try {
            await this.simulateAPICall();
            
            const otpSection = document.querySelector('.otp-section');
            if (otpSection) {
                otpSection.classList.add('show');
            }
            
            showToast('OTP sent to ' + phone, 'success');
        } catch (error) {
            showToast('Failed to send OTP', 'error');
        }
    }
    
    async verifyOTP(otp) {
        if (otp === '123456') {
            showToast('OTP verified successfully!', 'success');
            
            const user = {
                id: 'USR' + Math.floor(Math.random() * 10000),
                phone: document.querySelector('#phone')?.value,
                role: 'citizen',
                name: 'Citizen',
                token: 'nagarvaani-jwt-' + Date.now()
            };
            
            this.setCurrentUser(user);
            
            setTimeout(() => {
                this.redirectToDashboard('citizen');
            }, 1500);
        } else {
            showToast('Invalid OTP. Use 123456 for demo.', 'error');
        }
    }
    
    setCurrentUser(user) {
        this.currentUser = user;
        storage.set('currentUser', user);
        this.updateUIForUser();
    }
    
    updateUIForUser() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && this.currentUser) {
            const existingUserMenu = document.querySelector('.user-menu');
            if (existingUserMenu) {
                existingUserMenu.remove();
            }
            
            const userMenu = document.createElement('div');
            userMenu.className = 'user-menu';
            userMenu.style.display = 'flex';
            userMenu.style.alignItems = 'center';
            userMenu.style.gap = '10px';
            
            userMenu.innerHTML = `
                <span class="badge badge-primary">
                    <i class="fas fa-user"></i> ${this.currentUser.name}
                </span>
                <button class="btn-outline btn-small" onclick="auth.logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            `;
            
            navLinks.appendChild(userMenu);
        }
    }
    
    logout() {
        this.currentUser = null;
        storage.remove('currentUser');
        showToast('Logged out successfully', 'success');
        
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1500);
    }
    
    redirectToDashboard(role) {
        switch(role) {
            case 'citizen':
                window.location.href = '/pages/citizen/my-dashboard.html';
                break;
            case 'officer':
                window.location.href = '/pages/officer/dashboard.html';
                break;
            case 'admin':
                window.location.href = '/pages/admin/super-admin.html';
                break;
            default:
                window.location.href = '/index.html';
        }
    }
    
    simulateAPICall() {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    isAuthenticated() {
        return !!this.currentUser;
    }
    
    getToken() {
        return this.currentUser?.token;
    }
}

// Initialize auth
const auth = new Auth();
window.auth = auth;