import { MockAIService } from './ai-service.js';

class JusticePlatform {
    constructor() {
        this.currentMode = 'citizen';
        this.isDarkMode = true;
        this.notifications = [];
        this.voiceSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        this.aiService = new MockAIService();
        this.init();
    }

    async init() {
        this.initBackground();
        this.initUI();
        this.initEventListeners();
        this.loadPreferences();

        setTimeout(() => {
            this.showNotification('مرحباً بك في رواق العدل', 'المنصة الذكية الشاملة للخدمات القضائية', 'info');
        }, 1000);

        // Add sample notifications
        this.addSampleNotifications();
    }

    // ===== Background Engine =====
    initBackground() {
        const canvas = document.getElementById('bgCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor(isDarkMode) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = isDarkMode
                    ? `rgba(${Math.random() * 50 + 10}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.3 + 0.1})`
                    : `rgba(${Math.random() * 50 + 10}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.1 + 0.05})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;

                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(this.isDarkMode));
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = this.isDarkMode
                            ? `rgba(10, 113, 110, ${0.1 * (1 - distance/100)})`
                            : `rgba(10, 113, 110, ${0.05 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // ===== Mode Switching =====
    switchMode(mode, button) {
        this.currentMode = mode;

        // Update buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Update view
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });

        const viewSection = document.getElementById(`${mode}-view`);
        if (viewSection) {
            viewSection.classList.add('active');
            // Add animation class
            viewSection.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                viewSection.classList.remove('animate__animated', 'animate__fadeIn');
            }, 500);
        }

        // Show notification
        const messages = {
            'citizen': { title: 'واجهة المواطن', message: 'خدمات قضائية شاملة للمواطنين' },
            'judge': { title: 'واجهة القاضي', message: 'أدوات متقدمة للقضاة والمعاونين' },
            'lawyer': { title: 'واجهة المحامي', message: 'منصة متكاملة للمحامين والمستشارين' },
            'blind': { title: 'واجهة المكفوفين', message: 'منصة صوتية متكاملة للمكفوفين' }
        };

        if (messages[mode]) {
            this.showNotification(messages[mode].title, messages[mode].message, 'info');
        }

        // Save preference
        this.savePreferences();
    }

    // ===== AI Functions =====
    async runCitizenAI() {
        const question = document.getElementById('citizenQuestion').value.trim();
        const resultArea = document.getElementById('citizenAiResult');
        const btn = document.querySelector('#citizen-view .btn-primary');

        if (!question) {
            this.showNotification('تنبيه', 'يرجى كتابة سؤال أو وصف المشكلة', 'warning');
            return;
        }

        this.setLoadingState(btn, resultArea, 'جاري تحليل سؤالك...');

        try {
            const analysis = await this.aiService.generateCitizenAnalysis(question);
            resultArea.innerHTML = analysis;
            this.showNotification('اكتمل التحليل', 'تم تحليل سؤالك بنجاح', 'success');
        } catch (error) {
            this.showNotification('خطأ', 'حدث خطأ أثناء التحليل', 'error');
        } finally {
            this.resetLoadingState(btn, '<i class="fas fa-brain"></i> <span>تحليل ذكي</span>');
        }
    }

    async runJudgeAI() {
        const text = document.getElementById('judgeText').value.trim();
        const resultArea = document.getElementById('judgeAiResult');
        const btn = document.querySelector('#judge-view .btn-primary');

        if (!text) {
            this.showNotification('تنبيه', 'يرجى إدخال نص وقائع القضية', 'warning');
            return;
        }

        this.setLoadingState(btn, resultArea, 'جاري التحليل القانوني المتقدم...');

        try {
            const analysis = await this.aiService.generateJudgeAnalysis(text);
            resultArea.innerHTML = analysis;
            this.showNotification('اكتمل التحليل', 'تم تحليل القضية بنجاح', 'success');
        } catch (error) {
            this.showNotification('خطأ', 'حدث خطأ أثناء التحليل', 'error');
        } finally {
            this.resetLoadingState(btn, '<i class="fas fa-gavel"></i> <span>تحليل قانوني متقدم</span>');
        }
    }

    async runLawyerAI() {
        const question = document.getElementById('lawyerQuestion').value.trim();
        const resultArea = document.getElementById('lawyerAiResult');
        const btn = document.querySelector('#lawyer-view .btn-primary');

        if (!question) {
            this.showNotification('تنبيه', 'يرجى كتابة سؤال أو طلب المساعدة', 'warning');
            return;
        }

        this.setLoadingState(btn, resultArea, 'جاري تحليل طلبك...');

        try {
            const analysis = await this.aiService.generateLawyerAnalysis(question);
            resultArea.innerHTML = analysis;
            this.showNotification('اكتمل التحليل', 'تم تحليل طلبك بنجاح', 'success');
        } catch (error) {
            this.showNotification('خطأ', 'حدث خطأ أثناء التحليل', 'error');
        } finally {
            this.resetLoadingState(btn, '<i class="fas fa-brain"></i> <span>استشارة ذكية</span>');
        }
    }

    // ===== Helper Functions for AI UI =====
    setLoadingState(btn, resultArea, message) {
        if(btn) {
            btn.dataset.originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري التحليل...</span>';
            btn.disabled = true;
        }
        resultArea.classList.add('show');
        resultArea.innerHTML = this.createLoaderHTML(message);
    }

    resetLoadingState(btn, originalHTML) {
        if(btn) {
            btn.innerHTML = originalHTML || btn.dataset.originalText;
            btn.disabled = false;
        }
    }

    // ===== Voice Input =====
    voiceInput(textareaId) {
        if (!this.voiceSupported) {
            this.showNotification('عذراً', 'المتصفح لا يدعم التعرف على الصوت', 'error');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-SA';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        this.showNotification('جاري الاستماع', 'يرجى التحدث الآن...', 'info');

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById(textareaId).value = transcript;
            this.showNotification('تم', 'تم تحويل الصوت إلى نص بنجاح', 'success');
        };

        recognition.onerror = (event) => {
            this.showNotification('خطأ', 'حدث خطأ في التعرف على الصوت', 'error');
        };
    }

    // ===== Blind Interface Functions =====
    async processBlindInput() {
        const input = document.getElementById('blindInput').value.trim();
        const resultArea = document.getElementById('blindResult');

        if (!input) {
            this.showNotification('تنبيه', 'يرجى كتابة رسالة أو استخدام الإدخال الصوتي', 'warning');
            return;
        }

        resultArea.classList.add('show');
        resultArea.innerHTML = this.createLoaderHTML('جاري معالجة طلبك...');

        try {
            const response = await this.aiService.generateBlindResponse(input);
            resultArea.innerHTML = response;

            // Speak the response (strip HTML tags)
            this.speakText({
                closest: () => ({ nextElementSibling: { innerText: response.replace(/<[^>]*>/g, ' ') } })
            }, response.replace(/<[^>]*>/g, ' ')); // Pass text directly as fallback/override

            this.showNotification('تم', 'تم معالجة طلبك بنجاح', 'success');
        } catch (error) {
            console.error(error);
            this.showNotification('خطأ', 'حدث خطأ أثناء المعالجة', 'error');
        }
    }

    speakText(buttonOrMock, directText) {
        let text = directText;
        if (!text && buttonOrMock) {
            // Find text content relative to button if not provided directly
            // In the HTML structure: .result-header -> .result-content
            const header = buttonOrMock.closest('.result-header');
            if (header && header.nextElementSibling) {
                text = header.nextElementSibling.innerText;
            }
        }

        if (text && 'speechSynthesis' in window) {
            // Cancel any ongoing speech
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 1;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
        }
    }

    copyResult(resultId) {
        const resultArea = document.getElementById(resultId);
        if (!resultArea) return;
        const text = resultArea.innerText;

        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('تم النسخ', 'تم نسخ النص إلى الحافظة', 'success');
        }).catch(err => {
            console.error('Failed to copy:', err);
            this.showNotification('خطأ', 'فشل نسخ النص', 'error');
        });
    }

    // ===== Utility Functions =====
    createLoaderHTML(message) {
        return `
            <div class="loading">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
    }

    showNotification(title, message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' :
                  type === 'warning' ? '<i class="fas fa-exclamation-triangle"></i>' :
                  type === 'error' ? '<i class="fas fa-times-circle"></i>' :
                  '<i class="fas fa-info-circle"></i>'}
            </div>
            <div class="notification-content">
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
            <button class="notification-close" aria-label="إغلاق">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add click listener to close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        container.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    addSampleNotifications() {
        this.showNotification('تحديث النظام', 'تم تحديث النظام لإضافة ميزات جديدة', 'info');
        this.showNotification('قضية جديدة', 'لديك قضية جديدة تحتاج المراجعة', 'warning');
        this.showNotification('موعد جلسة', 'جلسة قضائية غداً الساعة 10 صباحاً', 'success');
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('light-mode', !this.isDarkMode);
        this.showNotification('وضع العرض', this.isDarkMode ? 'تم تفعيل الوضع الداكن' : 'تم تفعيل الوضع الفاتح', 'info');
        this.savePreferences();

        // Update icon
        const icon = document.querySelector('.header-actions .icon-btn:nth-child(2) i');
        if (icon) {
            icon.className = this.isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    clearInput(textareaId) {
        const el = document.getElementById(textareaId);
        if(el) {
            el.value = '';
            this.showNotification('تم', 'تم مسح النص بنجاح', 'success');
        }
    }

    openService(service) {
        const serviceNames = {
            'new-case': 'رفع دعوى جديدة',
            'track-case': 'متابعة الدعاوى',
            'documents': 'الخدمات الإلكترونية',
            'calculator': 'الحاسبة القضائية',
            'consultation': 'استشارة قانونية',
            'appointments': 'حجز المواعيد',
            'audio-services': 'الخدمات الصوتية'
        };

        this.showNotification('فتح الخدمة', `جاري فتح خدمة ${serviceNames[service] || service}...`, 'info');
    }

    showJudgeSection(section) {
        document.querySelectorAll('.judge-sidebar .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const btn = event.currentTarget; // Safer than event.target
        if(btn) btn.classList.add('active');
        this.showNotification('القسم', `جاري تحميل قسم ${section}...`, 'info');
    }

    showLawyerSection(section) {
        document.querySelectorAll('.lawyer-sidebar .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const btn = event.currentTarget;
        if(btn) btn.classList.add('active');
        this.showNotification('القسم', `جاري تحميل قسم ${section}...`, 'info');
    }

    toggleAssistant() {
        this.showNotification('المساعد الذكي', 'جاري فتح واجهة المساعد الذكي المتقدم...', 'info');
    }

    showHelp() {
        this.showNotification('المساعدة', 'جاري فتح دليل المساعدة...', 'info');
    }

    showNotifications() {
        this.showNotification('الإشعارات', 'لديك 3 إشعارات جديدة', 'info');
    }

    startVoiceCommand() {
        this.showNotification('الأوامر الصوتية', 'جاري تفعيل نظام الأوامر الصوتية...', 'info');
    }

    readScreen() {
        const currentView = document.querySelector('.view-section.active');
        const text = currentView ? currentView.innerText : 'لا يوجد محتوى للقراءة';
        this.speakText(null, text.substring(0, 200) + '...');
    }

    // ===== Save/Load Preferences =====
    savePreferences() {
        const preferences = {
            mode: this.currentMode,
            darkMode: this.isDarkMode
        };
        localStorage.setItem('justicePlatformPrefs', JSON.stringify(preferences));
    }

    loadPreferences() {
        const saved = localStorage.getItem('justicePlatformPrefs');
        if (saved) {
            try {
                const prefs = JSON.parse(saved);
                this.currentMode = prefs.mode || 'citizen';
                this.isDarkMode = prefs.darkMode !== undefined ? prefs.darkMode : true;

                // Apply preferences
                document.body.classList.toggle('light-mode', !this.isDarkMode);

                // Update icon
                const icon = document.querySelector('.header-actions .icon-btn:nth-child(2) i');
                if (icon) {
                    icon.className = this.isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
                }

                // Switch to saved mode
                const modeBtn = document.querySelector(`.mode-btn.${this.currentMode}`);
                if (modeBtn) {
                    this.switchMode(this.currentMode, modeBtn);
                }
            } catch (e) {
                console.error('Error loading preferences:', e);
            }
        }
    }

    initUI() {
        // Add active class to first nav item in each sidebar
        document.querySelectorAll('.sidebar-nav .nav-item:first-child').forEach(item => {
            item.classList.add('active');
        });
    }

    initEventListeners() {
        // Add enter key support for textareas
        document.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                    e.preventDefault();
                    const id = textarea.id;
                    if (id.includes('citizen')) this.runCitizenAI();
                    else if (id.includes('judge')) this.runJudgeAI();
                    else if (id.includes('lawyer')) this.runLawyerAI();
                    else if (id.includes('blind')) this.processBlindInput();
                }
            });
        });
    }
}

// ===== Initialize Platform =====
document.addEventListener('DOMContentLoaded', () => {
    window.platform = new JusticePlatform();
});
