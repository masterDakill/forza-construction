// Mobile Optimizations pour Forza Construction Inc.
// Système d'optimisation mobile avancé avec détection de device et adaptations

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

// === DÉTECTION MOBILE ET CONFIGURATION ===
class MobileDetector {
    constructor() {
        this.isMobile = false;
        this.isTablet = false;
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.touchDevice = false;
        this.orientation = 'portrait';
        
        this.init();
    }
    
    init() {
        this.screenWidth = wixWindow.viewMode === 'mobile' ? 375 : 1200; // Approximation Wix
        this.isMobile = wixWindow.viewMode === 'mobile';
        this.isTablet = wixWindow.viewMode === 'tablet';
        this.touchDevice = 'ontouchstart' in window;
        
        // Listener pour changement d'orientation
        this.setupOrientationListener();
        
        console.log('Mobile Detection:', {
            isMobile: this.isMobile,
            isTablet: this.isTablet,
            touchDevice: this.touchDevice,
            viewMode: wixWindow.viewMode
        });
    }
    
    setupOrientationListener() {
        // Dans Wix, on utilise les événements de redimensionnement
        wixWindow.onResize(() => {
            this.handleOrientationChange();
        });
    }
    
    handleOrientationChange() {
        const newOrientation = this.screenWidth > this.screenHeight ? 'landscape' : 'portrait';
        if (newOrientation !== this.orientation) {
            this.orientation = newOrientation;
            this.onOrientationChange(newOrientation);
        }
    }
    
    onOrientationChange(orientation) {
        // Callback pour les changements d'orientation
        console.log('Orientation changed to:', orientation);
        
        // Ajuster les éléments selon orientation
        if (this.isMobile) {
            this.adjustForOrientation(orientation);
        }
    }
    
    adjustForOrientation(orientation) {
        if (orientation === 'landscape') {
            // Mode paysage - ajuster navigation et contenu
            this.enableLandscapeMode();
        } else {
            // Mode portrait - configuration normale
            this.enablePortraitMode();
        }
    }
    
    enableLandscapeMode() {
        // Réduire la hauteur des sections hero
        if ($w('#heroSection')) {
            $w('#heroSection').style.height = '60vh';
        }
        
        // Ajuster les marges
        const sections = ['#servicesSection', '#portfolioSection', '#contactSection'];
        sections.forEach(section => {
            if ($w(section)) {
                $w(section).style.paddingTop = '20px';
                $w(section).style.paddingBottom = '20px';
            }
        });
    }
    
    enablePortraitMode() {
        // Restaurer hauteurs normales
        if ($w('#heroSection')) {
            $w('#heroSection').style.height = '100vh';
        }
        
        // Restaurer marges normales
        const sections = ['#servicesSection', '#portfolioSection', '#contactSection'];
        sections.forEach(section => {
            if ($w(section)) {
                $w(section).style.paddingTop = '40px';
                $w(section).style.paddingBottom = '40px';
            }
        });
    }
}

// === GESTION TACTILE AVANCÉE ===
class TouchManager {
    constructor() {
        this.swipeThreshold = 50;
        this.tapThreshold = 300;
        this.longPressThreshold = 500;
        
        this.startX = 0;
        this.startY = 0;
        this.startTime = 0;
        
        this.init();
    }
    
    init() {
        if (!('ontouchstart' in window)) return;
        
        // Ajouter support tactile aux éléments principaux
        this.setupSwipeNavigation();
        this.setupTouchFeedback();
        this.setupPinchZoom();
    }
    
    setupSwipeNavigation() {
        // Swipe entre sections sur mobile
        if ($w('#portfolioContainer')) {
            this.addSwipeToElement('#portfolioContainer', {
                onSwipeLeft: () => this.nextPortfolioItem(),
                onSwipeRight: () => this.prevPortfolioItem()
            });
        }
        
        // Swipe sur témoignages
        if ($w('#testimonialsContainer')) {
            this.addSwipeToElement('#testimonialsContainer', {
                onSwipeLeft: () => this.nextTestimonial(),
                onSwipeRight: () => this.prevTestimonial()
            });
        }
    }
    
    addSwipeToElement(elementId, callbacks) {
        const element = $w(elementId);
        if (!element) return;
        
        let startX, startY, startTime;
        
        element.onTouchStart = (event) => {
            const touch = event.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        };
        
        element.onTouchEnd = (event) => {
            const touch = event.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            const deltaTime = Date.now() - startTime;
            
            // Vérifier si c'est un swipe valide
            if (Math.abs(deltaX) > this.swipeThreshold && deltaTime < 300) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX > 0 && callbacks.onSwipeRight) {
                        callbacks.onSwipeRight();
                    } else if (deltaX < 0 && callbacks.onSwipeLeft) {
                        callbacks.onSwipeLeft();
                    }
                }
            }
        };
    }
    
    setupTouchFeedback() {
        // Ajouter feedback tactile aux boutons
        const buttons = [
            '#btnDevisGratuit',
            '#btnAppelezNous',
            '#btnSubmitContact',
            '#btnCallNow'
        ];
        
        buttons.forEach(buttonId => {
            if ($w(buttonId)) {
                this.addTouchFeedback(buttonId);
            }
        });
    }
    
    addTouchFeedback(elementId) {
        const element = $w(elementId);
        if (!element) return;
        
        element.onTouchStart = () => {
            element.style.transform = 'scale(0.95)';
            element.style.opacity = '0.8';
            
            // Vibration si supportée
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        };
        
        element.onTouchEnd = () => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        };
    }
    
    setupPinchZoom() {
        // Désactiver le zoom sur certains éléments
        const noZoomElements = ['#formContact', '#headerSection'];
        
        noZoomElements.forEach(elementId => {
            if ($w(elementId)) {
                $w(elementId).style.touchAction = 'pan-x pan-y';
            }
        });
    }
    
    nextPortfolioItem() {
        // Navigation portfolio tactile
        if ($w('#btnNextPortfolio')) {
            $w('#btnNextPortfolio').click();
        }
    }
    
    prevPortfolioItem() {
        if ($w('#btnPrevPortfolio')) {
            $w('#btnPrevPortfolio').click();
        }
    }
    
    nextTestimonial() {
        // Navigation témoignages tactile
        if (window.testimonialIndex !== undefined) {
            window.testimonialIndex = (window.testimonialIndex + 1) % window.totalTestimonials;
            window.updateTestimonial(window.testimonials[window.testimonialIndex]);
        }
    }
    
    prevTestimonial() {
        if (window.testimonialIndex !== undefined) {
            window.testimonialIndex = window.testimonialIndex === 0 ? 
                window.totalTestimonials - 1 : 
                window.testimonialIndex - 1;
            window.updateTestimonial(window.testimonials[window.testimonialIndex]);
        }
    }
}

// === OPTIMISATIONS FORMULAIRES MOBILES ===
class MobileFormOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeFormFields();
        this.setupMobileValidation();
        this.addMobileKeyboard();
        this.setupAutoScroll();
    }
    
    optimizeFormFields() {
        // Ajuster tailles des champs pour mobile
        const formFields = [
            '#inputNom',
            '#inputEmail', 
            '#inputPhone',
            '#inputMessage',
            '#inputEntreprise'
        ];
        
        formFields.forEach(fieldId => {
            if ($w(fieldId)) {
                this.optimizeField(fieldId);
            }
        });
    }
    
    optimizeField(fieldId) {
        const field = $w(fieldId);
        
        // Ajuster hauteur pour mobile
        if (window.mobileDetector && window.mobileDetector.isMobile) {
            field.style.height = '50px';
            field.style.fontSize = '16px'; // Éviter zoom iOS
            field.style.paddingLeft = '15px';
            field.style.paddingRight = '15px';
        }
        
        // Placeholder plus court sur mobile
        if (fieldId === '#inputMessage') {
            field.placeholder = window.mobileDetector?.isMobile ? 
                'Décrivez votre projet...' : 
                'Décrivez votre projet de construction en détail...';
        }
    }
    
    setupMobileValidation() {
        // Validation en temps réel optimisée pour mobile
        const fields = ['#inputEmail', '#inputPhone'];
        
        fields.forEach(fieldId => {
            if ($w(fieldId)) {
                $w(fieldId).onInput = (event) => {
                    this.validateFieldMobile(fieldId, event.target.value);
                };
            }
        });
    }
    
    validateFieldMobile(fieldId, value) {
        const field = $w(fieldId);
        let isValid = true;
        
        if (fieldId === '#inputEmail') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else if (fieldId === '#inputPhone') {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            isValid = phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
        }
        
        // Feedback visuel mobile
        if (value.length > 0) {
            field.style.borderColor = isValid ? '#28a745' : '#dc3545';
            field.style.borderWidth = '2px';
        } else {
            field.style.borderColor = '#cccccc';
            field.style.borderWidth = '1px';
        }
    }
    
    addMobileKeyboard() {
        // Types de clavier appropriés
        if ($w('#inputEmail')) {
            $w('#inputEmail').inputType = 'email';
        }
        
        if ($w('#inputPhone')) {
            $w('#inputPhone').inputType = 'tel';
        }
        
        // Attributs HTML5 pour mobile
        const fields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
        fields.forEach(field => {
            field.setAttribute('autocomplete', 'on');
            field.setAttribute('autocorrect', 'off');
            field.setAttribute('autocapitalize', 'words');
        });
    }
    
    setupAutoScroll() {
        // Auto-scroll vers champs en focus sur mobile
        const formFields = [
            '#inputNom', '#inputEmail', '#inputPhone', 
            '#inputMessage', '#inputEntreprise'
        ];
        
        formFields.forEach(fieldId => {
            if ($w(fieldId)) {
                $w(fieldId).onFocus = () => {
                    if (window.mobileDetector?.isMobile) {
                        setTimeout(() => {
                            $w(fieldId).scrollTo();
                        }, 300); // Délai pour animation clavier
                    }
                };
            }
        });
    }
}

// === MENU MOBILE HAMBURGER ===
class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.menuItems = [];
        
        this.init();
    }
    
    init() {
        this.createMobileMenu();
        this.setupMenuToggle();
        this.setupMenuAnimation();
    }
    
    createMobileMenu() {
        // Créer menu hamburger si pas existant
        if (!$w('#mobileMenuToggle') && window.mobileDetector?.isMobile) {
            this.createHamburgerButton();
            this.createMobileMenuOverlay();
        }
    }
    
    createHamburgerButton() {
        // Dans Wix, nous devons utiliser les éléments existants
        // ou créer via HTML component
        if ($w('#htmlMobileMenu')) {
            const hamburgerHTML = `
                <div id="mobileMenuToggle" class="hamburger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <style>
                .hamburger-menu {
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    padding: 10px;
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    background: rgba(255,255,255,0.9);
                    border-radius: 5px;
                }
                .hamburger-menu span {
                    width: 25px;
                    height: 3px;
                    background: #333;
                    margin: 3px 0;
                    transition: 0.3s;
                }
                .hamburger-menu.active span:nth-child(1) {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }
                .hamburger-menu.active span:nth-child(2) {
                    opacity: 0;
                }
                .hamburger-menu.active span:nth-child(3) {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
                </style>
            `;
            
            $w('#htmlMobileMenu').html = hamburgerHTML;
        }
    }
    
    setupMenuToggle() {
        if ($w('#mobileMenuToggle')) {
            $w('#mobileMenuToggle').onClick = () => {
                this.toggleMenu();
            };
        }
        
        // Toggle avec bouton menu existant
        if ($w('#btnMobileMenu')) {
            $w('#btnMobileMenu').onClick = () => {
                this.toggleMenu();
            };
        }
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
    }
    
    openMenu() {
        // Afficher overlay menu mobile
        if ($w('#mobileMenuOverlay')) {
            $w('#mobileMenuOverlay').show('slide', {
                duration: 300,
                direction: 'right'
            });
        }
        
        // Bloquer scroll du body
        document.body.style.overflow = 'hidden';
        
        // Animation hamburger
        if ($w('#mobileMenuToggle')) {
            $w('#mobileMenuToggle').addClass('active');
        }
    }
    
    closeMenu() {
        if ($w('#mobileMenuOverlay')) {
            $w('#mobileMenuOverlay').hide('slide', {
                duration: 300,
                direction: 'right'
            });
        }
        
        // Restaurer scroll
        document.body.style.overflow = 'auto';
        
        // Animation hamburger
        if ($w('#mobileMenuToggle')) {
            $w('#mobileMenuToggle').removeClass('active');
        }
    }
    
    setupMenuAnimation() {
        // Animation d'entrée des éléments menu
        const menuItems = [
            '#menuAccueil',
            '#menuServices', 
            '#menuRealisations',
            '#menuContact'
        ];
        
        menuItems.forEach((item, index) => {
            if ($w(item)) {
                $w(item).onClick = (event) => {
                    // Track click
                    this.trackMenuClick(item);
                    
                    // Fermer menu
                    this.closeMenu();
                    
                    // Navigation
                    const page = this.getPageFromMenuItem(item);
                    if (page) {
                        setTimeout(() => {
                            wixLocation.to(page);
                        }, 300);
                    }
                };
            }
        });
    }
    
    getPageFromMenuItem(menuItem) {
        const menuMap = {
            '#menuAccueil': '/',
            '#menuServices': '/services',
            '#menuRealisations': '/realisations', 
            '#menuContact': '/contact'
        };
        
        return menuMap[menuItem];
    }
    
    trackMenuClick(menuItem) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'mobile_menu_click', {
                'menu_item': menuItem,
                'device_type': 'mobile'
            });
        }
    }
}

// === OPTIMISATIONS PERFORMANCE MOBILE ===
class MobilePerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeImages();
        this.lazyLoadContent();
        this.optimizeAnimations();
        this.reduceBandwidthUsage();
    }
    
    optimizeImages() {
        // Utiliser images plus petites sur mobile
        if (window.mobileDetector?.isMobile) {
            const images = [
                '#heroImage',
                '#aboutImage',
                '#serviceImage1',
                '#serviceImage2'
            ];
            
            images.forEach(imageId => {
                if ($w(imageId)) {
                    this.optimizeImage(imageId);
                }
            });
        }
    }
    
    optimizeImage(imageId) {
        const image = $w(imageId);
        
        // Réduire qualité pour mobile
        if (image.src) {
            // Dans Wix, utiliser les paramètres d'URL pour optimiser
            const optimizedSrc = image.src.includes('?') ? 
                image.src + '&w=400&q=80' : 
                image.src + '?w=400&q=80';
            
            image.src = optimizedSrc;
        }
    }
    
    lazyLoadContent() {
        // Chargement paresseux des sections non critiques
        const lazyElements = [
            '#testimonialsSection',
            '#portfolioSection',
            '#blogSection'
        ];
        
        // Observer intersection pour mobile
        lazyElements.forEach(elementId => {
            if ($w(elementId)) {
                this.setupLazyLoad(elementId);
            }
        });
    }
    
    setupLazyLoad(elementId) {
        const element = $w(elementId);
        
        // Masquer initialement
        element.hide();
        
        // Simuler intersection observer avec scroll
        let loaded = false;
        $w('#page').onScroll = () => {
            if (!loaded && this.isElementInViewport(elementId)) {
                element.show('fade', { duration: 600 });
                loaded = true;
            }
        };
    }
    
    isElementInViewport(elementId) {
        // Approximation pour Wix
        const scrollY = $w('#page').scrollY || 0;
        const windowHeight = wixWindow.viewportHeight || 600;
        
        // Simple heuristique basée sur position
        return scrollY > 200; // Ajuster selon layout
    }
    
    optimizeAnimations() {
        // Réduire animations sur mobile pour performance
        if (window.mobileDetector?.isMobile) {
            // Désactiver parallax sur mobile
            this.disableParallax();
            
            // Simplifier animations
            this.simplifyAnimations();
        }
    }
    
    disableParallax() {
        const parallaxElements = ['#heroBackground', '#aboutBackground'];
        
        parallaxElements.forEach(elementId => {
            if ($w(elementId)) {
                $w(elementId).style.transform = 'none';
                $w(elementId).style.willChange = 'auto';
            }
        });
    }
    
    simplifyAnimations() {
        // Réduire durée des animations
        const animatedElements = [
            '#servicesSection',
            '#portfolioSection'
        ];
        
        animatedElements.forEach(elementId => {
            if ($w(elementId)) {
                // Réduire durée animation
                $w(elementId).style.transitionDuration = '0.3s';
            }
        });
    }
    
    reduceBandwidthUsage() {
        // Préloader seulement le contenu critique sur mobile
        if (window.mobileDetector?.isMobile) {
            // Désactiver autoplay vidéo
            const videos = ['#heroVideo', '#aboutVideo'];
            videos.forEach(videoId => {
                if ($w(videoId)) {
                    $w(videoId).pause();
                    $w(videoId).src = ''; // Économiser bande passante
                }
            });
            
            // Réduire nombre témoignages chargés
            if (window.testimonials && window.testimonials.length > 3) {
                window.testimonials = window.testimonials.slice(0, 3);
            }
        }
    }
}

// === INITIALISATION GLOBALE ===
export function initMobileOptimizations() {
    // Créer instances globales
    window.mobileDetector = new MobileDetector();
    window.touchManager = new TouchManager();
    window.mobileFormOptimizer = new MobileFormOptimizer();
    window.mobileMenu = new MobileMenu();
    window.mobilePerformanceOptimizer = new MobilePerformanceOptimizer();
    
    console.log('✅ Mobile optimizations initialized');
    
    // Appliquer optimisations spécifiques selon device
    if (window.mobileDetector.isMobile) {
        applyMobileSpecificOptimizations();
    } else if (window.mobileDetector.isTablet) {
        applyTabletSpecificOptimizations();
    }
}

function applyMobileSpecificOptimizations() {
    console.log('🔧 Applying mobile-specific optimizations');
    
    // Ajuster espacement
    const sections = ['#heroSection', '#servicesSection', '#portfolioSection'];
    sections.forEach(sectionId => {
        if ($w(sectionId)) {
            $w(sectionId).style.paddingLeft = '15px';
            $w(sectionId).style.paddingRight = '15px';
        }
    });
    
    // Ajuster tailles de police
    const headings = ['#heroTitle', '#servicesTitle', '#portfolioTitle'];
    headings.forEach(headingId => {
        if ($w(headingId)) {
            $w(headingId).style.fontSize = '24px';
            $w(headingId).style.lineHeight = '1.2';
        }
    });
    
    // Optimiser boutons pour touch
    const buttons = ['#btnDevisGratuit', '#btnAppelezNous'];
    buttons.forEach(buttonId => {
        if ($w(buttonId)) {
            $w(buttonId).style.minHeight = '48px';
            $w(buttonId).style.fontSize = '16px';
            $w(buttonId).style.padding = '12px 24px';
        }
    });
}

function applyTabletSpecificOptimizations() {
    console.log('📱 Applying tablet-specific optimizations');
    
    // Configuration intermédiaire pour tablettes
    const sections = ['#heroSection', '#servicesSection'];
    sections.forEach(sectionId => {
        if ($w(sectionId)) {
            $w(sectionId).style.paddingLeft = '30px';
            $w(sectionId).style.paddingRight = '30px';
        }
    });
}

// Auto-initialisation si dans contexte Wix
if (typeof $w !== 'undefined') {
    $w.onReady(() => {
        initMobileOptimizations();
    });
}