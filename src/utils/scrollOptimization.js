// Système d'optimisation du scroll - Forza Construction Inc.
// Scroll fluide, animations performantes et navigation optimisée

// === CONFIGURATION DU SCROLL OPTIMISÉ ===
const scrollConfig = {
    // Paramètres de performance
    throttleDelay: 16, // 60fps = 16ms
    debounceDelay: 100,
    
    // Seuils d'animation
    animationThreshold: 0.1, // 10% de l'élément visible
    parallaxIntensity: 0.3,
    
    // Zones de déclenchement
    headerHideThreshold: 100,
    backToTopThreshold: 300,
    
    // Vitesses d'animation
    smoothScrollDuration: 800,
    fadeInDuration: 600,
    slideInDuration: 800
};

// === CLASSE PRINCIPALE D'OPTIMISATION ===
class ScrollOptimizer {
    constructor() {
        this.isScrolling = false;
        this.scrollDirection = 'down';
        this.lastScrollY = 0;
        this.animatedElements = new Set();
        this.visibilityObserver = null;
        this.activeAnimations = new Map();
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollHandlers();
        this.setupSmoothScrolling();
        this.initializeAnimatableElements();
        this.setupScrollIndicator();
    }
    
    // === INTERSECTION OBSERVER POUR PERFORMANCES ===
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.visibilityObserver = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    root: null,
                    rootMargin: '50px',
                    threshold: [0, 0.1, 0.5, 1.0]
                }
            );
            
            console.log('✅ Intersection Observer initialized');
        } else {
            // Fallback pour navigateurs non compatibles
            this.setupFallbackVisibility();
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            const elementId = element.id || element.className;
            
            if (entry.isIntersecting && entry.intersectionRatio >= scrollConfig.animationThreshold) {
                this.triggerElementAnimation(element);
            } else if (entry.intersectionRatio < 0.1) {
                this.pauseElementAnimation(element);
            }
        });
    }
    
    // === GESTIONNAIRES DE SCROLL OPTIMISÉS ===
    setupScrollHandlers() {
        let ticking = false;
        let scrollTimeout;
        
        // Gestionnaire principal avec throttling
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollState();
                    this.handleScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
            
            // Gestion de la fin de scroll avec debounce
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.onScrollEnd();
            }, scrollConfig.debounceDelay);
        };
        
        // Attachement des événements
        if ($w('#page')) {
            $w('#page').onScroll = (event) => {
                this.currentScrollY = event.target.scrollY;
                handleScroll();
            };
        } else {
            // Fallback pour scroll window
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    }
    
    updateScrollState() {
        const currentScrollY = this.currentScrollY || window.pageYOffset;
        
        // Détection direction
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        this.isScrolling = Math.abs(currentScrollY - this.lastScrollY) > 5;
        
        this.lastScrollY = currentScrollY;
    }
    
    handleScrollEffects() {
        const scrollY = this.currentScrollY || window.pageYOffset;
        
        // Header dynamique
        this.updateDynamicHeader(scrollY);
        
        // Effets parallax
        this.updateParallaxElements(scrollY);
        
        // Indicateur de progression
        this.updateScrollProgress(scrollY);
        
        // Bouton retour en haut
        this.updateBackToTop(scrollY);
        
        // Navigation sticky
        this.updateStickyNavigation(scrollY);
    }
    
    onScrollEnd() {
        this.isScrolling = false;
        
        // Optimisations lors de l'arrêt du scroll
        this.optimizeVisibleElements();
        this.updateLazyLoadedContent();
    }
    
    // === HEADER DYNAMIQUE ===
    updateDynamicHeader(scrollY) {
        const header = $w('#header') || document.querySelector('header');
        if (!header) return;
        
        if (scrollY > scrollConfig.headerHideThreshold) {
            if (this.scrollDirection === 'down') {
                // Masquer header en scrollant vers le bas
                this.animateHeader(header, 'hide');
            } else if (this.scrollDirection === 'up') {
                // Afficher header en scrollant vers le haut
                this.animateHeader(header, 'show');
            }
            
            // Ajouter fond transparent avec blur
            this.addHeaderBackdrop(header);
        } else {
            // Header transparent en haut de page
            this.removeHeaderBackdrop(header);
            this.animateHeader(header, 'show');
        }
    }
    
    animateHeader(header, action) {
        const isWixElement = header.id && $w(`#${header.id}`);
        
        if (isWixElement) {
            const wixHeader = $w(`#${header.id}`);
            
            if (action === 'hide') {
                wixHeader.hide('slide', {
                    duration: 300,
                    direction: 'top'
                });
            } else {
                wixHeader.show('slide', {
                    duration: 300,
                    direction: 'top'
                });
            }
        } else {
            // Fallback CSS
            if (action === 'hide') {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            header.style.transition = 'transform 0.3s ease';
        }
    }
    
    addHeaderBackdrop(header) {
        if (!header.classList?.contains('backdrop-active')) {
            if ($w(`#${header.id}`)) {
                $w(`#${header.id}`).style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                $w(`#${header.id}`).style.backdropFilter = 'blur(10px)';
                $w(`#${header.id}`).style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
            header.classList?.add('backdrop-active');
        }
    }
    
    removeHeaderBackdrop(header) {
        if (header.classList?.contains('backdrop-active')) {
            if ($w(`#${header.id}`)) {
                $w(`#${header.id}`).style.backgroundColor = 'transparent';
                $w(`#${header.id}`).style.backdropFilter = 'none';
                $w(`#${header.id}`).style.boxShadow = 'none';
            } else {
                header.style.backgroundColor = 'transparent';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = 'none';
            }
            header.classList?.remove('backdrop-active');
        }
    }
    
    // === EFFETS PARALLAX ===
    updateParallaxElements(scrollY) {
        const parallaxElements = [
            { id: '#heroSection', speed: 0.5 },
            { id: '#aboutSection', speed: 0.3 },
            { id: '#servicesBackground', speed: 0.2 }
        ];
        
        parallaxElements.forEach(element => {
            const el = $w(element.id);
            if (el) {
                const offset = scrollY * element.speed;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    }
    
    // === INDICATEUR DE PROGRESSION ===
    updateScrollProgress(scrollY) {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / documentHeight) * 100;
        
        // Barre de progression en haut
        const progressBar = $w('#scrollProgressBar');
        if (progressBar) {
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }
        
        // Indicateur circulaire
        const circularProgress = $w('#circularProgress');
        if (circularProgress) {
            const circumference = 2 * Math.PI * 20; // rayon 20px
            const strokeDasharray = (progress / 100) * circumference;
            circularProgress.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
        }
    }
    
    // === BOUTON RETOUR EN HAUT ===
    updateBackToTop(scrollY) {
        const backToTopBtn = $w('#backToTopBtn');
        if (!backToTopBtn) return;
        
        if (scrollY > scrollConfig.backToTopThreshold) {
            if (!backToTopBtn.isVisible) {
                backToTopBtn.show('fade', { duration: 300 });
                this.setupBackToTopClick(backToTopBtn);
            }
        } else {
            if (backToTopBtn.isVisible) {
                backToTopBtn.hide('fade', { duration: 300 });
            }
        }
    }
    
    setupBackToTopClick(button) {
        if (!button._clickHandlerSet) {
            button.onClick(() => {
                this.smoothScrollTo(0);
            });
            button._clickHandlerSet = true;
        }
    }
    
    // === SCROLL FLUIDE ===
    setupSmoothScrolling() {
        // Liens d'ancrage
        const anchorLinks = document.querySelectorAll('a[href^=\"#\"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = $w(`#${targetId}`) || document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollToElement(targetElement);
                }
            });
        });
    }
    
    smoothScrollTo(targetY) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const duration = scrollConfig.smoothScrollDuration;
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Fonction d'easing (ease-out-cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, startY + distance * easeOutCubic);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    smoothScrollToElement(element) {
        let targetY;
        
        if ($w(`#${element.id || element.className}`)) {
            // Élément Wix
            const wixElement = $w(`#${element.id || element.className}`);
            targetY = wixElement.y || 0;
        } else {
            // Élément DOM standard
            targetY = element.getBoundingClientRect().top + window.pageYOffset;
        }
        
        // Ajustement pour header fixe
        const headerHeight = this.getHeaderHeight();
        targetY -= headerHeight + 20; // 20px de marge
        
        this.smoothScrollTo(Math.max(0, targetY));
    }
    
    getHeaderHeight() {
        const header = $w('#header') || document.querySelector('header');
        if (header) {
            return header.offsetHeight || header.height || 80;
        }
        return 80; // fallback
    }
    
    // === ANIMATIONS D'ÉLÉMENTS ===
    initializeAnimatableElements() {
        const animatableSelectors = [
            '#servicesSection',
            '#aboutSection', 
            '#portfolioSection',
            '#testimonialsSection',
            '#contactSection',
            '.animate-on-scroll',
            '.fade-in-up',
            '.slide-in-left',
            '.slide-in-right'
        ];
        
        animatableSelectors.forEach(selector => {
            const elements = this.getElements(selector);
            elements.forEach(element => {
                if (this.visibilityObserver) {
                    this.visibilityObserver.observe(element);
                } else {
                    // Fallback sans Intersection Observer
                    this.setupFallbackAnimation(element);
                }
            });
        });
    }
    
    getElements(selector) {
        const elements = [];
        
        // Essayer Wix d'abord
        if (selector.startsWith('#')) {
            const wixElement = $w(selector);
            if (wixElement) {
                elements.push(wixElement);
            }
        }
        
        // Essayer DOM standard
        const domElements = document.querySelectorAll(selector);
        elements.push(...Array.from(domElements));
        
        return elements;
    }
    
    triggerElementAnimation(element) {
        if (this.animatedElements.has(element)) return;
        
        const animationType = this.getAnimationType(element);
        this.animateElement(element, animationType);
        this.animatedElements.add(element);
    }
    
    getAnimationType(element) {
        const classes = element.className || '';
        
        if (classes.includes('fade-in-up')) return 'fadeInUp';
        if (classes.includes('slide-in-left')) return 'slideInLeft';
        if (classes.includes('slide-in-right')) return 'slideInRight';
        if (classes.includes('zoom-in')) return 'zoomIn';
        
        // Animation par défaut
        return 'fadeInUp';
    }
    
    animateElement(element, animationType) {
        const isWixElement = element.id && $w(`#${element.id}`);
        
        if (isWixElement) {
            const wixEl = $w(`#${element.id}`);
            
            switch(animationType) {
                case 'fadeInUp':
                    wixEl.show('slide', {
                        duration: scrollConfig.slideInDuration,
                        direction: 'bottom'
                    });
                    break;
                    
                case 'slideInLeft':
                    wixEl.show('slide', {
                        duration: scrollConfig.slideInDuration,
                        direction: 'left'
                    });
                    break;
                    
                case 'slideInRight':
                    wixEl.show('slide', {
                        duration: scrollConfig.slideInDuration,
                        direction: 'right'
                    });
                    break;
                    
                default:
                    wixEl.show('fade', {
                        duration: scrollConfig.fadeInDuration
                    });
            }
        } else {
            // Animation CSS pour éléments DOM
            this.applyCSSAnimation(element, animationType);
        }
    }
    
    applyCSSAnimation(element, animationType) {
        element.style.opacity = '0';
        element.style.transform = this.getInitialTransform(animationType);
        element.style.transition = `all ${scrollConfig.fadeInDuration}ms ease`;
        
        // Déclencher l'animation
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0) scale(1)';
        });
    }
    
    getInitialTransform(animationType) {
        switch(animationType) {
            case 'fadeInUp': return 'translateY(30px)';
            case 'slideInLeft': return 'translateX(-30px)';
            case 'slideInRight': return 'translateX(30px)';
            case 'zoomIn': return 'scale(0.9)';
            default: return 'translateY(20px)';
        }
    }
    
    // === OPTIMISATIONS ADDITIONNELLES ===
    setupScrollIndicator() {
        // Créer indicateur de progression si non existant
        if (!$w('#scrollProgressBar')) {
            this.createScrollProgressBar();
        }
    }
    
    createScrollProgressBar() {
        const progressBarHTML = `
            <div id=\"scrollProgressBar\" style=\"
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #ff6b35, #f7931e);
                z-index: 9999;
                transition: width 0.1s linear;
                width: 0%;
            \"></div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', progressBarHTML);
    }
    
    optimizeVisibleElements() {
        // Optimisations lors de l'arrêt du scroll
        this.updateLazyImages();
        this.preloadNextSectionContent();
    }
    
    updateLazyImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            if (this.isElementVisible(img)) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
    
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    preloadNextSectionContent() {
        // Précharger le contenu de la section suivante
        // Logique spécifique selon les besoins
    }
    
    // === FALLBACKS ===
    setupFallbackVisibility() {
        // Pour navigateurs sans Intersection Observer
        setInterval(() => {
            this.checkElementsVisibility();
        }, 500);
    }
    
    checkElementsVisibility() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            if (!this.animatedElements.has(element) && this.isElementVisible(element)) {
                this.triggerElementAnimation(element);
            }
        });
    }
    
    // === UTILITAIRES ===
    pauseElementAnimation(element) {
        // Pause les animations coûteuses pour les éléments non visibles
        if (this.activeAnimations.has(element)) {
            const animation = this.activeAnimations.get(element);
            if (animation.pause) {
                animation.pause();
            }
        }
    }
    
    destroy() {
        // Nettoyage lors de la destruction
        if (this.visibilityObserver) {
            this.visibilityObserver.disconnect();
        }
        
        this.animatedElements.clear();
        this.activeAnimations.clear();
    }
}

// === FONCTION D'INITIALISATION ===
export function initializeScrollOptimization() {
    // Attendre que Wix soit prêt
    if (typeof $w !== 'undefined') {
        return new ScrollOptimizer();
    } else {
        // Fallback pour environnements non-Wix
        document.addEventListener('DOMContentLoaded', () => {
            return new ScrollOptimizer();
        });
    }
}

// === UTILITAIRES PUBLICS ===
export const scrollUtils = {
    smoothScrollTo: (targetY) => {
        const instance = new ScrollOptimizer();
        instance.smoothScrollTo(targetY);
    },
    
    scrollToElement: (elementId) => {
        const element = $w(`#${elementId}`) || document.getElementById(elementId);
        if (element) {
            const instance = new ScrollOptimizer();
            instance.smoothScrollToElement(element);
        }
    },
    
    addScrollAnimation: (elementId, animationType = 'fadeInUp') => {
        const element = $w(`#${elementId}`) || document.getElementById(elementId);
        if (element) {
            element.classList.add('animate-on-scroll', animationType.toLowerCase().replace(/([A-Z])/g, '-$1'));
        }
    }
};

// Export par défaut
export default {
    ScrollOptimizer,
    initializeScrollOptimization,
    scrollUtils,
    scrollConfig
};