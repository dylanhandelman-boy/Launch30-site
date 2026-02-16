// ========================================
// LAUNCH 30 - RETRO-FUTURISTIC INTERACTIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // SMOOTH SCROLL WITH OFFSET
    // ========================================

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ========================================

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delays
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and elements for fade-in animation
    const animatedElements = document.querySelectorAll(
        '.solution-card, .customer-card, .step-item, .benefit-item'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        fadeInObserver.observe(el);
    });

    // ========================================
    // TERMINAL TYPING ANIMATION
    // ========================================

    const terminalLines = document.querySelectorAll('.terminal-line');

    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';

        setTimeout(() => {
            line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 300 + 500);
    });

    // ========================================
    // GLOWING CARD EFFECT ON MOUSE MOVE
    // ========================================

    const customerCards = document.querySelectorAll('.customer-card');

    customerCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)`;
            }
        });
    });

    // ========================================
    // NUMBER ANIMATION FOR STATS
    // ========================================

    const statNumbers = document.querySelectorAll('.stat-number');

    const animateNumber = (element, target, duration = 2000) => {
        if (target === '∞') return; // Skip infinity symbol

        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const targetValue = parseInt(number.textContent);
                if (!isNaN(targetValue)) {
                    number.textContent = '0';
                    animateNumber(number, targetValue, 1500);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ========================================
    // PARALLAX EFFECT ON GRID BACKGROUND
    // ========================================

    const gridBackground = document.querySelector('.grid-background');

    if (gridBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            gridBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // ========================================
    // SOLUTION CARDS CORNER ACCENT ANIMATION
    // ========================================

    const solutionCards = document.querySelectorAll('.solution-card');

    solutionCards.forEach((card, index) => {
        // Stagger initial appearance
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 80);

        // Animated scan line effect on hover
        card.addEventListener('mouseenter', function() {
            const scanLine = document.createElement('div');
            scanLine.style.position = 'absolute';
            scanLine.style.top = '0';
            scanLine.style.left = '0';
            scanLine.style.width = '100%';
            scanLine.style.height = '2px';
            scanLine.style.background = 'linear-gradient(90deg, transparent, var(--color-neon-cyan), transparent)';
            scanLine.style.animation = 'scanDown 0.6s ease-out';

            const style = document.createElement('style');
            style.textContent = `
                @keyframes scanDown {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(${card.offsetHeight}px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);

            card.appendChild(scanLine);

            setTimeout(() => {
                scanLine.remove();
                style.remove();
            }, 600);
        });
    });

    // ========================================
    // BUTTON SHINE EFFECT ENHANCEMENT
    // ========================================

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ========================================
    // STEP PULSE ANIMATION TRIGGERS
    // ========================================

    const stepItems = document.querySelectorAll('.step-item');

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pulse = entry.target.querySelector('.step-pulse');
                if (pulse) {
                    // Add delay based on step number
                    const stepNum = entry.target.querySelector('.step-number').textContent;
                    pulse.style.animationDelay = `${parseInt(stepNum) * 0.2}s`;
                }
                stepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stepItems.forEach(step => stepObserver.observe(step));

    // ========================================
    // HERO TITLE GLITCH EFFECT (SUBTLE)
    // ========================================

    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
        let glitchInterval;

        const createGlitch = () => {
            if (Math.random() > 0.98) { // 2% chance per check
                heroTitle.style.textShadow = `
                    2px 2px 0 var(--color-neon-cyan),
                    -2px -2px 0 var(--color-neon-pink)
                `;

                setTimeout(() => {
                    heroTitle.style.textShadow = 'none';
                }, 50);
            }
        };

        glitchInterval = setInterval(createGlitch, 3000);
    }

    // ========================================
    // CALENDLY WIDGET SCROLL TRIGGER
    // ========================================

    const calendlyWidget = document.querySelector('.calendly-inline-widget');

    if (calendlyWidget) {
        const calendlyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    calendlyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        calendlyWidget.style.opacity = '0';
        calendlyWidget.style.transform = 'translateY(30px)';
        calendlyWidget.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        calendlyObserver.observe(calendlyWidget);
    }

    // ========================================
    // SECTION NUMBER HIGHLIGHT ON SCROLL
    // ========================================

    const sections = document.querySelectorAll('.section[id]');
    const sectionNumbers = document.querySelectorAll('.section-number');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionNumber = entry.target.querySelector('.section-number');
                if (sectionNumber) {
                    sectionNumber.style.color = 'var(--color-neon-lime)';
                    sectionNumber.style.textShadow = '0 0 10px var(--color-neon-lime)';

                    setTimeout(() => {
                        sectionNumber.style.color = 'var(--color-neon-cyan)';
                        sectionNumber.style.textShadow = 'none';
                    }, 1000);
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));

    // ========================================
    // GRID BACKGROUND INTENSITY ON SCROLL
    // ========================================

    let scrollIntensity = 0.5;

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
        scrollIntensity = 0.3 + (scrollPercent * 0.4); // Range from 0.3 to 0.7

        if (gridBackground) {
            gridBackground.style.opacity = scrollIntensity;
        }
    });

    // ========================================
    // CUSTOM CURSOR EFFECT (Optional Enhancement)
    // ========================================

    const createCursorEffect = () => {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.border = '2px solid var(--color-neon-cyan)';
        cursor.style.borderRadius = '50%';
        cursor.style.position = 'fixed';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transition = 'transform 0.15s ease';
        cursor.style.display = 'none';

        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = (e.clientX - 10) + 'px';
            cursor.style.top = (e.clientY - 10) + 'px';
        });

        // Scale on button hover
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'var(--color-neon-lime)';
            });

            btn.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--color-neon-cyan)';
            });
        });
    };

    // Only enable custom cursor on desktop
    if (window.innerWidth > 1024) {
        createCursorEffect();
    }

    // ========================================
    // PERFORMANCE MONITORING
    // ========================================

    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

        console.log('%c[LAUNCH 30]', 'font-family: monospace; font-size: 16px; color: #00ffff; font-weight: bold;');
        console.log('%cRetro-Futuristic Design System Loaded', 'font-family: monospace; color: #00ff88;');
        console.log(`%cLoad Time: ${loadTime}ms`, 'font-family: monospace; color: #8b96a5;');

        if (loadTime < 3000) {
            console.log('%c✓ Performance: Optimal', 'font-family: monospace; color: #00ff88;');
        } else {
            console.log('%c⚠ Performance: Consider optimization', 'font-family: monospace; color: #ffbd2e;');
        }
    });

    // ========================================
    // KEYBOARD NAVIGATION ENHANCEMENT
    // ========================================

    document.addEventListener('keydown', function(e) {
        // Allow keyboard users to activate cards with Enter/Space
        if (e.key === 'Enter' || e.key === ' ') {
            if (document.activeElement.classList.contains('solution-card') ||
                document.activeElement.classList.contains('customer-card')) {
                document.activeElement.click();
            }
        }
    });

    // ========================================
    // EASTER EGG: KONAMI CODE
    // ========================================

    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);

        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Activate matrix effect
            document.body.style.animation = 'matrixGlitch 0.5s ease';
            console.log('%cSECRET UNLOCKED: You found the developer easter egg!', 'font-family: monospace; color: #00ff88; font-size: 20px;');

            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);

            konamiCode = [];
        }
    });

    // Add matrix glitch animation
    const matrixStyle = document.createElement('style');
    matrixStyle.textContent = `
        @keyframes matrixGlitch {
            0%, 100% { filter: none; }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
        }
    `;
    document.head.appendChild(matrixStyle);

});
