// Responsive Enhancements JavaScript

(function() {
    'use strict';

    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Responsive navigation enhancements
    function initResponsiveNav() {
        const menuButton = document.querySelector('.menu-button');
        const navMenu = document.querySelector('.nav-menu-wrapper');
        const body = document.body;

        if (menuButton && navMenu) {
            menuButton.addEventListener('click', function() {
                const isOpen = navMenu.classList.contains('w--open');
                
                if (isOpen) {
                    navMenu.classList.remove('w--open');
                    menuButton.classList.remove('w--open');
                    body.style.overflow = '';
                } else {
                    navMenu.classList.add('w--open');
                    menuButton.classList.add('w--open');
                    body.style.overflow = 'hidden';
                }
            });

            // Close menu when clicking outside
            navMenu.addEventListener('click', function(e) {
                if (e.target === navMenu) {
                    navMenu.classList.remove('w--open');
                    menuButton.classList.remove('w--open');
                    body.style.overflow = '';
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMenu.classList.contains('w--open')) {
                    navMenu.classList.remove('w--open');
                    menuButton.classList.remove('w--open');
                    body.style.overflow = '';
                }
            });
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Responsive font size adjustment
    function adjustFontSizes() {
        const viewportWidth = window.innerWidth;
        const root = document.documentElement;
        
        if (viewportWidth < 480) {
            root.style.setProperty('--base-font-size', '14px');
        } else if (viewportWidth < 768) {
            root.style.setProperty('--base-font-size', '15px');
        } else {
            root.style.setProperty('--base-font-size', '16px');
        }
    }

    // Touch device detection and optimization
    function initTouchOptimizations() {
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Add touch-friendly hover effects
            document.querySelectorAll('.cf-features-section-2-grid-cell').forEach(card => {
                card.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });
                
                card.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.classList.remove('touch-active');
                    }, 150);
                });
            });
        }
    }

    // Performance optimization for scroll events
    function initScrollOptimizations() {
        let ticking = false;
        
        function updateScrollPosition() {
            const scrolled = window.pageYOffset;
            const navbar = document.querySelector('.navbar');
            
            if (navbar) {
                if (scrolled > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        });
    }

    // Resize handler with debouncing
    function initResizeHandler() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                setViewportHeight();
                adjustFontSizes();
            }, 250);
        });
    }

    // Form enhancements for mobile
    function initFormEnhancements() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Prevent zoom on iOS when focusing inputs
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                input.addEventListener('focus', function() {
                    this.style.fontSize = '16px';
                });
                
                input.addEventListener('blur', function() {
                    this.style.fontSize = '';
                });
            }
            
            // Add floating labels effect
            if (input.type !== 'submit' && input.type !== 'button') {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // Check if input has value on load
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            }
        });
    }

    // WebP support detection
    function checkWebPSupport() {
        const webP = new Image();
        webP.onload = webP.onerror = function() {
            if (webP.height === 2) {
                document.documentElement.classList.add('webp');
            }
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    // Initialize all enhancements
    function init() {
        // Check if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initLazyLoading();
        initResponsiveNav();
        initSmoothScrolling();
        setViewportHeight();
        adjustFontSizes();
        initTouchOptimizations();
        initScrollOptimizations();
        initResizeHandler();
        initFormEnhancements();
        checkWebPSupport();

        // Add loaded class to body for CSS transitions
        document.body.classList.add('js-loaded');
    }

    // Start initialization
    init();

})();