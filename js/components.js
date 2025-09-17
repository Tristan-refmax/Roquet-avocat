/* ========================================
   COMPONENTS JAVASCRIPT - UI Components
   ======================================== */

// Particle Effects
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles-container');
        this.particles = [];
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                opacity: 0.1;
                left: ${Math.random() * 100}vw;
                animation: floatParticle ${15 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    animate() {
        // Particles are animated via CSS
        // This method can be extended for more complex animations
    }
}

// Parallax Effects
class ParallaxController {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.page-home .hero');
        
        if (hero) {
            // Reduced parallax effect to prevent overlap
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
}

// Micro-interactions
class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.bindCardHovers();
        this.bindButtonHovers();
        this.bindIconHovers();
    }

    bindCardHovers() {
        document.querySelectorAll('.interactive-element').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    bindButtonHovers() {
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    bindIconHovers() {
        document.querySelectorAll('.micro-interaction').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Remove loading class when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                this.fadeInContent();
            }, 500);
        });
    }

    fadeInContent() {
        const hero = document.querySelector('.page-home .hero');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                hero.style.transition = 'all 0.8s ease';
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 100);
        }
    }
}

// WhatsApp Button
class WhatsAppButton {
    constructor() {
        this.init();
    }

    init() {
        const whatsappBtn = document.querySelector('.whatsapp-button');
        if (whatsappBtn) {
            // Add pulse animation
            whatsappBtn.style.animation = 'pulse 2s infinite';
            
            // Add hover effects
            whatsappBtn.addEventListener('mouseenter', () => {
                whatsappBtn.style.transform = 'scale(1.1)';
                whatsappBtn.style.animation = 'none';
            });

            whatsappBtn.addEventListener('mouseleave', () => {
                whatsappBtn.style.transform = 'scale(1)';
                whatsappBtn.style.animation = 'pulse 2s infinite';
            });
        }
    }
}

// Header Scroll Effects
class HeaderScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class for styling
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new ParallaxController();
    new MicroInteractions();
    new LoadingAnimation();
    new WhatsAppButton();
    new HeaderScrollEffects();
});
