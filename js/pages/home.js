/* ========================================
   HOME PAGE JAVASCRIPT - Page-specific functionality
   ======================================== */

// Home Page Initialization
class HomePage {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeroAnimations();
        this.setupServiceCards();
        this.setupTestimonialCards();
        this.setupBlogCards();
        this.setupContactForm();
        this.setupLogoCarousel();
    }

    setupHeroAnimations() {
        const hero = document.querySelector('.page-home .hero');
        if (!hero) return;

        // Staggered animation for hero elements
        const elements = hero.querySelectorAll('.fade-in-up');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
        });
    }

    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.page-home .service-card');
        
        serviceCards.forEach(card => {
            const icon = card.querySelector('.service-icon');
            
            if (icon) {
                card.addEventListener('mouseenter', () => {
                    icon.style.transform = 'rotate(10deg) scale(1.1)';
                    icon.style.background = 'var(--accent-hover)';
                });

                card.addEventListener('mouseleave', () => {
                    icon.style.transform = 'rotate(0deg) scale(1)';
                    icon.style.background = 'var(--accent)';
                });
            }
        });
    }

    setupTestimonialCards() {
        const testimonialCards = document.querySelectorAll('.page-home .testimonial-card');
        
        testimonialCards.forEach(card => {
            const avatar = card.querySelector('.author-avatar');
            
            if (avatar) {
                card.addEventListener('mouseenter', () => {
                    avatar.style.transform = 'scale(1.1) rotate(5deg)';
                });

                card.addEventListener('mouseleave', () => {
                    avatar.style.transform = 'scale(1) rotate(0deg)';
                });
            }
        });
    }

    setupBlogCards() {
        const blogCards = document.querySelectorAll('.page-home .blog-card');
        
        blogCards.forEach(card => {
            const image = card.querySelector('.blog-image img');
            const link = card.querySelector('.blog-link');
            
            if (image) {
                card.addEventListener('mouseenter', () => {
                    image.style.transform = 'scale(1.1) rotate(2deg)';
                });

                card.addEventListener('mouseleave', () => {
                    image.style.transform = 'scale(1) rotate(0deg)';
                });
            }

            if (link) {
                link.addEventListener('mouseenter', () => {
                    const arrow = link.querySelector('i');
                    if (arrow) {
                        arrow.style.transform = 'translateX(4px)';
                    }
                });

                link.addEventListener('mouseleave', () => {
                    const arrow = link.querySelector('i');
                    if (arrow) {
                        arrow.style.transform = 'translateX(0)';
                    }
                });
            }
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        // Enhanced form validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });

        // Form submission with enhanced feedback
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(contactForm)) {
                this.submitForm(contactForm);
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer un numéro de téléphone valide';
            }
        }

        // Update field appearance
        if (isValid) {
            field.classList.remove('error');
            this.removeErrorMessage(field);
        } else {
            field.classList.add('error');
            this.showErrorMessage(field, errorMessage);
        }

        return isValid;
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    showErrorMessage(field, message) {
        this.removeErrorMessage(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e53e3e;
            font-size: 14px;
            margin-top: 4px;
            display: block;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }

    removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Simulate API call
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
            submitBtn.classList.remove('loading');
            
            // Remove any error states
            form.querySelectorAll('.error').forEach(field => {
                field.classList.remove('error');
                this.removeErrorMessage(field);
            });

        }, 2000);
    }

    setupLogoCarousel() {
        const logoItems = document.querySelectorAll('.page-home .logo-item');
        
        logoItems.forEach((item, index) => {
            // Staggered animation on scroll
            item.style.animationDelay = `${index * 0.2}s`;
            
            // Enhanced hover effects
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px) scale(1.05)';
                item.style.boxShadow = '0 16px 40px rgba(229, 114, 40, 0.2)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '0 8px 25px var(--shadow)';
            });
        });
    }
}

// Initialize home page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the home page
    if (document.querySelector('.page-home')) {
        new HomePage();
    }
});
