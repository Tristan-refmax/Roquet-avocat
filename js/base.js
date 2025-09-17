/* ========================================
   BASE JAVASCRIPT - Core Functionality
   ======================================== */

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeToggle();
        this.updateHeaderTheme();
    }

    updateThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const sunIcon = themeToggle?.querySelector('.sun');
        const moonIcon = themeToggle?.querySelector('.moon');
        
        if (sunIcon && moonIcon) {
            if (this.currentTheme === 'light') {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }
    }

    updateHeaderTheme() {
        const header = document.querySelector('.header');
        if (header) {
            setTimeout(() => {
                if (this.currentTheme === 'light') {
                    header.style.background = 'rgba(247, 245, 242, 0.95)';
                } else {
                    header.style.background = 'rgba(17, 26, 44, 0.95)';
                }
            }, 10);
        }
    }

    bindEvents() {
        // Theme dropdown toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeMenu = document.getElementById('theme-menu');
        const themeOptions = document.querySelectorAll('.theme-option');

        if (themeToggle && themeMenu) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                themeMenu.classList.toggle('active');
            });

            themeOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const theme = option.dataset.theme;
                    this.setTheme(theme);
                    themeMenu.classList.remove('active');
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!themeToggle.contains(e.target) && !themeMenu.contains(e.target)) {
                    themeMenu.classList.remove('active');
                }
            });
        }
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all scroll-animate elements
        document.querySelectorAll('.scroll-animate').forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    }
}

// Smooth Scrolling
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(contactForm);
            });
        }
    }

    handleSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            if (window.sonner) {
                sonner.success('Message envoyé avec succès !', {
                    description: 'Nous vous répondrons dans les plus brefs délais.',
                    duration: 4000,
                });
            }

            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// Initialize all base functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new ScrollAnimations();
    new MobileMenu();
    new SmoothScrolling();
    new FormHandler();
});
