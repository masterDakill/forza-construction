// Navigation Mobile Avancée - Forza Construction Inc.
// Menu hamburger intelligent et navigation optimisée mobile

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

// === MENU MOBILE HAMBURGER AVANCÉ ===
class AdvancedMobileMenu {
    constructor() {
        this.isOpen = false;
        this.isAnimating = false;
        this.swipeThreshold = 50;
        this.menuItems = [];
        
        this.init();
    }
    
    init() {
        if (!window.mobileDetector?.isMobile) return;
        
        this.createAdvancedMenu();
        this.setupGestureNavigation();
        this.setupQuickActions();
        this.setupContextualMenu();
    }
    
    createAdvancedMenu() {
        if ($w('#htmlAdvancedMobileMenu')) {
            const menuHTML = `
                <div id="mobileMenuOverlay" class="mobile-overlay" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 9998;
                    display: none;
                    backdrop-filter: blur(5px);
                "></div>
                
                <div id="advancedMobileMenu" class="advanced-mobile-menu" style="
                    position: fixed;
                    top: 0;
                    right: -320px;
                    width: 320px;
                    height: 100%;
                    background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
                    z-index: 9999;
                    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
                    overflow-y: auto;
                ">
                    <!-- Header Menu -->
                    <div class="menu-header" style="
                        padding: 20px;
                        background: linear-gradient(135deg, #ff6b35, #f7931e);
                        color: white;
                        text-align: center;
                        position: relative;
                    ">
                        <button id="closeMenuBtn" style="
                            position: absolute;
                            top: 15px;
                            right: 15px;
                            background: none;
                            border: none;
                            color: white;
                            font-size: 24px;
                            cursor: pointer;
                        ">×</button>
                        
                        <div class="company-logo" style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-bottom: 5px;
                        ">FORZA CONSTRUCTION</div>
                        
                        <div class="company-tagline" style="
                            font-size: 12px;
                            opacity: 0.9;
                        ">Excellence • Qualité • Confiance</div>
                    </div>
                    
                    <!-- Quick Contact -->
                    <div class="quick-contact" style="
                        padding: 15px 20px;
                        background: rgba(255, 255, 255, 0.1);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <button id="quickCallMenu" class="quick-btn" style="
                                background: #27ae60;
                                color: white;
                                border: none;
                                padding: 10px 15px;
                                border-radius: 20px;
                                font-size: 12px;
                                font-weight: bold;
                                flex: 1;
                                margin-right: 10px;
                            ">📞 APPELER</button>
                            
                            <button id="quickDevisMenu" class="quick-btn" style="
                                background: #e74c3c;
                                color: white;
                                border: none;
                                padding: 10px 15px;
                                border-radius: 20px;
                                font-size: 12px;
                                font-weight: bold;
                                flex: 1;
                            ">💰 DEVIS</button>
                        </div>
                        
                        <div id="openStatus" style="
                            text-align: center;
                            margin-top: 10px;
                            font-size: 11px;
                            color: rgba(255, 255, 255, 0.8);
                        "></div>
                    </div>
                    
                    <!-- Navigation principale -->
                    <div class="main-navigation" style="
                        padding: 0;
                    ">
                        <div class="nav-item" data-page="/" style="
                            padding: 15px 20px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                            color: white;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            transition: background 0.2s;
                        ">
                            <span style="margin-right: 15px; font-size: 18px;">🏠</span>
                            <span style="font-weight: 500;">Accueil</span>
                            <span style="margin-left: auto; opacity: 0.5;">→</span>
                        </div>
                        
                        <div class="nav-item" data-page="/services" style="
                            padding: 15px 20px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                            color: white;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            transition: background 0.2s;
                        ">
                            <span style="margin-right: 15px; font-size: 18px;">🔧</span>
                            <span style="font-weight: 500;">Services</span>
                            <span style="margin-left: auto; opacity: 0.5;">→</span>
                        </div>
                        
                        <div class="nav-item" data-page="/realisations" style="
                            padding: 15px 20px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                            color: white;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            transition: background 0.2s;
                        ">
                            <span style="margin-right: 15px; font-size: 18px;">🏗️</span>
                            <span style="font-weight: 500;">Réalisations</span>
                            <span style="margin-left: auto; opacity: 0.5;">→</span>
                        </div>
                        
                        <div class="nav-item" data-page="/contact" style="
                            padding: 15px 20px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                            color: white;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            transition: background 0.2s;
                        ">
                            <span style="margin-right: 15px; font-size: 18px;">📧</span>
                            <span style="font-weight: 500;">Contact</span>
                            <span style="margin-left: auto; opacity: 0.5;">→</span>
                        </div>
                    </div>
                    
                    <!-- Services rapides -->
                    <div class="quick-services" style="
                        padding: 20px;
                        background: rgba(255, 255, 255, 0.05);
                    ">
                        <div style="
                            color: rgba(255, 255, 255, 0.8);
                            font-size: 12px;
                            font-weight: bold;
                            margin-bottom: 15px;
                            text-transform: uppercase;
                        ">Services Populaires</div>
                        
                        <div class="service-quick" data-service="renovation-cuisine" style="
                            padding: 8px 0;
                            color: rgba(255, 255, 255, 0.9);
                            font-size: 14px;
                            cursor: pointer;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        ">🍳 Rénovation de cuisine</div>
                        
                        <div class="service-quick" data-service="salle-de-bain" style="
                            padding: 8px 0;
                            color: rgba(255, 255, 255, 0.9);
                            font-size: 14px;
                            cursor: pointer;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        ">🚿 Salle de bain</div>
                        
                        <div class="service-quick" data-service="toiture" style="
                            padding: 8px 0;
                            color: rgba(255, 255, 255, 0.9);
                            font-size: 14px;
                            cursor: pointer;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        ">🏠 Réfection de toiture</div>
                        
                        <div class="service-quick" data-service="extension" style="
                            padding: 8px 0;
                            color: rgba(255, 255, 255, 0.9);
                            font-size: 14px;
                            cursor: pointer;
                        ">📐 Agrandissement</div>
                    </div>
                    
                    <!-- Informations de contact -->
                    <div class="contact-info" style="
                        padding: 20px;
                        background: rgba(255, 255, 255, 0.1);
                        margin-top: auto;
                    ">
                        <div style="
                            color: rgba(255, 255, 255, 0.8);
                            font-size: 12px;
                            font-weight: bold;
                            margin-bottom: 10px;
                        ">CONTACT</div>
                        
                        <div style="color: white; font-size: 14px; margin-bottom: 5px;">
                            📞 (418) 123-4567
                        </div>
                        <div style="color: white; font-size: 14px; margin-bottom: 5px;">
                            ✉️ info@forzaconstruction.ca
                        </div>
                        <div style="color: rgba(255, 255, 255, 0.8); font-size: 12px;">
                            📍 Région de Québec
                        </div>
                    </div>
                </div>
                
                <!-- Bouton Hamburger -->
                <button id="hamburgerBtn" class="hamburger-btn" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 107, 53, 0.9);
                    border: none;
                    border-radius: 25px;
                    z-index: 10000;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
                    transition: all 0.3s ease;
                ">
                    <span class="hamburger-line" style="
                        width: 20px;
                        height: 2px;
                        background: white;
                        margin: 2px 0;
                        transition: all 0.3s ease;
                        transform-origin: center;
                    "></span>
                    <span class="hamburger-line" style="
                        width: 20px;
                        height: 2px;
                        background: white;
                        margin: 2px 0;
                        transition: all 0.3s ease;
                        transform-origin: center;
                    "></span>
                    <span class="hamburger-line" style="
                        width: 20px;
                        height: 2px;
                        background: white;
                        margin: 2px 0;
                        transition: all 0.3s ease;
                        transform-origin: center;
                    "></span>
                </button>
                
                <style>
                .nav-item:hover, .service-quick:hover {
                    background: rgba(255, 255, 255, 0.1) !important;
                }
                
                .hamburger-btn.active .hamburger-line:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }
                .hamburger-btn.active .hamburger-line:nth-child(2) {
                    opacity: 0;
                }
                .hamburger-btn.active .hamburger-line:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }
                
                .advanced-mobile-menu.open {
                    right: 0 !important;
                }
                </style>
            `;
            
            $w('#htmlAdvancedMobileMenu').html = menuHTML;
            
            // Setup event listeners
            setTimeout(() => this.setupEventListeners(), 100);
        }
    }
    
    setupEventListeners() {
        // Toggle menu
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const closeBtn = document.getElementById('closeMenuBtn');
        const overlay = document.getElementById('mobileMenuOverlay');
        
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => this.toggleMenu());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeMenu());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.closeMenu());
        }
        
        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });
        
        // Quick services
        document.querySelectorAll('.service-quick').forEach(item => {
            item.addEventListener('click', () => {
                const service = item.getAttribute('data-service');
                this.navigateToService(service);
            });
        });
        
        // Quick actions
        const quickCall = document.getElementById('quickCallMenu');
        const quickDevis = document.getElementById('quickDevisMenu');
        
        if (quickCall) {
            quickCall.addEventListener('click', () => {
                this.trackMenuAction('quick_call');
                wixLocation.to('tel:4181234567');
            });
        }
        
        if (quickDevis) {
            quickDevis.addEventListener('click', () => {
                this.trackMenuAction('quick_devis');
                this.closeMenu();
                setTimeout(() => wixLocation.to('/obtenir-un-devis'), 300);
            });
        }
        
        // Update business status
        this.updateBusinessStatus();
    }
    
    toggleMenu() {
        if (this.isAnimating) return;
        
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isAnimating = true;
        this.isOpen = true;
        
        const menu = document.getElementById('advancedMobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        const hamburger = document.getElementById('hamburgerBtn');
        
        if (overlay) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.style.opacity = '1', 10);
        }
        
        if (menu) {
            menu.classList.add('open');
        }
        
        if (hamburger) {
            hamburger.classList.add('active');
        }
        
        // Bloquer scroll
        document.body.style.overflow = 'hidden';
        
        // Vibration feedback
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
        
        this.trackMenuAction('menu_opened');
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 300);
    }
    
    closeMenu() {
        if (!this.isOpen) return;
        
        this.isAnimating = true;
        this.isOpen = false;
        
        const menu = document.getElementById('advancedMobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        const hamburger = document.getElementById('hamburgerBtn');
        
        if (menu) {
            menu.classList.remove('open');
        }
        
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
        
        // Restaurer scroll
        document.body.style.overflow = 'auto';
        
        this.trackMenuAction('menu_closed');
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 300);
    }
    
    navigateToPage(page) {
        this.trackMenuAction('page_navigation', { page });
        this.closeMenu();
        
        setTimeout(() => {
            wixLocation.to(page);
        }, 300);
    }
    
    navigateToService(service) {
        this.trackMenuAction('service_navigation', { service });
        this.closeMenu();
        
        setTimeout(() => {
            wixLocation.to(`/services?category=${service}`);
        }, 300);
    }
    
    updateBusinessStatus() {
        const statusElement = document.getElementById('openStatus');
        if (!statusElement) return;
        
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        
        let isOpen = false;
        let message = '';
        
        if (day >= 1 && day <= 5 && hour >= 7 && hour < 17) {
            isOpen = true;
            message = '🟢 Ouvert maintenant';
        } else if (day === 6 && hour >= 8 && hour < 12) {
            isOpen = true;
            message = '🟢 Ouvert (samedi matin)';
        } else {
            message = '🔴 Fermé - Urgences: 1-800-FORZA';
        }
        
        statusElement.textContent = message;
        statusElement.style.color = isOpen ? '#27ae60' : '#e74c3c';
    }
    
    setupGestureNavigation() {
        // Navigation par gestes
        let startX, startY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Swipe from right edge to open menu
            if (startX > window.innerWidth - 50 && deltaX < -this.swipeThreshold && Math.abs(deltaY) < 100) {
                if (!this.isOpen) {
                    this.openMenu();
                }
            }
            
            // Swipe left to close menu
            if (this.isOpen && deltaX < -this.swipeThreshold && Math.abs(deltaY) < 100) {
                this.closeMenu();
            }
        });
    }
    
    setupQuickActions() {
        // Actions rapides contextuelles selon la page
        const currentPage = wixLocation.pathname;
        this.addContextualActions(currentPage);
    }
    
    addContextualActions(page) {
        // Ajouter actions spécifiques selon la page
        const contextActions = {
            '/': ['Voir nos services', 'Portfolio', 'Témoignages'],
            '/services': ['Demander un devis', 'Voir portfolio', 'Contactez-nous'],
            '/contact': ['Appeler maintenant', 'Géolocalisation', 'WhatsApp'],
            '/realisations': ['Nouveau projet', 'Devis gratuit', 'Partager']
        };
        
        const actions = contextActions[page] || [];
        
        // TODO: Implémenter affichage des actions contextuelles
    }
    
    setupContextualMenu() {
        // Menu contextuel basé sur l'heure et la localisation
        this.addTimeBasedSuggestions();
        this.addLocationBasedServices();
    }
    
    addTimeBasedSuggestions() {
        const hour = new Date().getHours();
        
        if (hour >= 18 || hour < 7) {
            // Heures fermées - proposer formulaire ou urgences
            this.addUrgencyOptions();
        } else {
            // Heures ouvertes - proposer appel direct
            this.highlightCallOption();
        }
    }
    
    addUrgencyOptions() {
        // Ajouter options d'urgence dans le menu
        const urgencyHTML = `
            <div class="urgency-section" style="
                background: rgba(231, 76, 60, 0.2);
                border: 1px solid rgba(231, 76, 60, 0.3);
                margin: 15px 20px;
                padding: 15px;
                border-radius: 8px;
            ">
                <div style="color: #e74c3c; font-weight: bold; margin-bottom: 10px;">
                    🚨 Service d'urgence 24h
                </div>
                <div style="color: rgba(255, 255, 255, 0.9); font-size: 12px; margin-bottom: 10px;">
                    Problème urgent? Nous sommes là pour vous aider.
                </div>
                <button onclick="window.location.href='tel:18004672'" style="
                    background: #e74c3c;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: bold;
                    width: 100%;
                ">📞 URGENCE: 1-800-FORZA</button>
            </div>
        `;
        
        // Injecter dans le menu
        const menu = document.getElementById('advancedMobileMenu');
        if (menu) {
            const contactInfo = menu.querySelector('.contact-info');
            if (contactInfo) {
                contactInfo.insertAdjacentHTML('beforebegin', urgencyHTML);
            }
        }
    }
    
    highlightCallOption() {
        // Mettre en évidence l'option d'appel pendant les heures ouvrables
        const quickCall = document.getElementById('quickCallMenu');
        if (quickCall) {
            quickCall.style.animation = 'pulse 2s infinite';
            quickCall.style.boxShadow = '0 0 15px rgba(39, 174, 96, 0.5)';
        }
    }
    
    addLocationBasedServices() {
        // Services suggérés selon la géolocalisation (si disponible)
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // TODO: Implémenter suggestions basées sur localisation
                    console.log('Location detected for contextual services');
                },
                (error) => {
                    console.log('Geolocation not available');
                }
            );
        }
    }
    
    trackMenuAction(action, data = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'mobile_menu',
                'event_label': 'advanced_mobile_navigation',
                ...data
            });
        }
        
        console.log('Mobile menu action:', action, data);
    }
}

// === NAVIGATION BREADCRUMB MOBILE ===
class MobileBreadcrumb {
    constructor() {
        this.init();
    }
    
    init() {
        if (!window.mobileDetector?.isMobile) return;
        
        this.createMobileBreadcrumb();
        this.updateBreadcrumb();
    }
    
    createMobileBreadcrumb() {
        if ($w('#htmlMobileBreadcrumb')) {
            const breadcrumbHTML = `
                <div id="mobileBreadcrumb" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    padding: 10px 20px;
                    font-size: 12px;
                    color: #666;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    z-index: 999;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                ">
                    <div id="breadcrumbPath" style="
                        display: flex;
                        align-items: center;
                    ">
                        <span>🏠</span>
                        <span style="margin: 0 5px;">›</span>
                        <span id="currentPageName">Accueil</span>
                    </div>
                    
                    <button id="backBtn" style="
                        background: none;
                        border: none;
                        color: #ff6b35;
                        font-size: 14px;
                        cursor: pointer;
                        display: none;
                    ">← Retour</button>
                </div>
            `;
            
            $w('#htmlMobileBreadcrumb').html = breadcrumbHTML;
            
            // Setup back button
            setTimeout(() => {
                const backBtn = document.getElementById('backBtn');
                if (backBtn) {
                    backBtn.addEventListener('click', () => {
                        window.history.back();
                    });
                }
            }, 100);
        }
    }
    
    updateBreadcrumb() {
        const currentPath = wixLocation.pathname;
        const pageNames = {
            '/': 'Accueil',
            '/services': 'Services',
            '/realisations': 'Réalisations',
            '/contact': 'Contact',
            '/obtenir-un-devis': 'Obtenir un devis',
            '/a-propos': 'À propos'
        };
        
        const currentPageElement = document.getElementById('currentPageName');
        const backBtn = document.getElementById('backBtn');
        
        if (currentPageElement) {
            currentPageElement.textContent = pageNames[currentPath] || 'Page';
        }
        
        if (backBtn) {
            // Afficher bouton retour si pas sur l'accueil
            backBtn.style.display = currentPath !== '/' ? 'block' : 'none';
        }
    }
}

// === NAVIGATION TACTILE GLOBALE ===
class TouchNavigationManager {
    constructor() {
        this.swipeThreshold = 75;
        this.timeThreshold = 300;
        
        this.init();
    }
    
    init() {
        if (!window.mobileDetector?.isMobile) return;
        
        this.setupGlobalSwipeNavigation();
        this.setupTouchFeedback();
        this.setupPullToRefresh();
    }
    
    setupGlobalSwipeNavigation() {
        let startX, startY, startTime;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const deltaTime = endTime - startTime;
            
            if (deltaTime > this.timeThreshold) return;
            
            // Navigation horizontale entre pages
            if (Math.abs(deltaX) > this.swipeThreshold && Math.abs(deltaY) < 50) {
                if (deltaX > 0) {
                    // Swipe right - page précédente
                    this.navigateToPreviousPage();
                } else {
                    // Swipe left - page suivante
                    this.navigateToNextPage();
                }
            }
        });
    }
    
    navigateToPreviousPage() {
        // Navigation logique entre les pages
        const pageFlow = ['/', '/services', '/realisations', '/contact'];
        const currentPath = wixLocation.pathname;
        const currentIndex = pageFlow.indexOf(currentPath);
        
        if (currentIndex > 0) {
            const previousPage = pageFlow[currentIndex - 1];
            this.trackSwipeNavigation('previous', previousPage);
            wixLocation.to(previousPage);
        } else {
            // Retour dans l'historique
            window.history.back();
        }
    }
    
    navigateToNextPage() {
        const pageFlow = ['/', '/services', '/realisations', '/contact'];
        const currentPath = wixLocation.pathname;
        const currentIndex = pageFlow.indexOf(currentPath);
        
        if (currentIndex >= 0 && currentIndex < pageFlow.length - 1) {
            const nextPage = pageFlow[currentIndex + 1];
            this.trackSwipeNavigation('next', nextPage);
            wixLocation.to(nextPage);
        }
    }
    
    setupTouchFeedback() {
        // Feedback haptique pour les interactions importantes
        document.addEventListener('click', (e) => {
            const element = e.target;
            
            // Vibration pour boutons CTA
            if (element.classList.contains('cta-button') || 
                element.id.includes('btn') || 
                element.textContent.includes('Devis') ||
                element.textContent.includes('Appeler')) {
                
                if (navigator.vibrate) {
                    navigator.vibrate(15);
                }
            }
        });
    }
    
    setupPullToRefresh() {
        let startY, pullDistance = 0;
        const threshold = 100;
        
        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (startY && window.scrollY === 0) {
                pullDistance = e.touches[0].clientY - startY;
                
                if (pullDistance > 0) {
                    // Afficher indicateur de pull to refresh
                    this.showPullToRefreshIndicator(pullDistance);
                }
            }
        });
        
        document.addEventListener('touchend', (e) => {
            if (pullDistance > threshold) {
                this.triggerPageRefresh();
            }
            
            this.hidePullToRefreshIndicator();
            startY = null;
            pullDistance = 0;
        });
    }
    
    showPullToRefreshIndicator(distance) {
        if (!document.getElementById('pullToRefreshIndicator')) {
            const indicator = document.createElement('div');
            indicator.id = 'pullToRefreshIndicator';
            indicator.innerHTML = '🔄 Tirez pour actualiser';
            indicator.style.cssText = `
                position: fixed;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 107, 53, 0.9);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 12px;
                z-index: 10001;
                transition: top 0.3s ease;
            `;
            document.body.appendChild(indicator);
        }
        
        const indicator = document.getElementById('pullToRefreshIndicator');
        const progress = Math.min(distance / 100, 1);
        indicator.style.top = (progress * 30 - 50) + 'px';
    }
    
    hidePullToRefreshIndicator() {
        const indicator = document.getElementById('pullToRefreshIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    triggerPageRefresh() {
        // Animation de refresh
        this.showRefreshAnimation();
        
        // Actualiser la page après animation
        setTimeout(() => {
            wixLocation.reload();
        }, 1000);
        
        this.trackSwipeNavigation('pull_to_refresh');
    }
    
    showRefreshAnimation() {
        const animation = document.createElement('div');
        animation.innerHTML = '🔄';
        animation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 30px;
            z-index: 10002;
            animation: spin 1s linear infinite;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(animation);
        
        setTimeout(() => {
            animation.remove();
            style.remove();
        }, 1000);
    }
    
    trackSwipeNavigation(action, page = null) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'swipe_navigation', {
                'event_category': 'mobile_navigation',
                'action': action,
                'page': page
            });
        }
    }
}

// === INITIALISATION ===
export function initAdvancedMobileNavigation() {
    if (!window.mobileDetector?.isMobile) return;
    
    // Créer instances des composants de navigation
    window.advancedMobileMenu = new AdvancedMobileMenu();
    window.mobileBreadcrumb = new MobileBreadcrumb();
    window.touchNavigationManager = new TouchNavigationManager();
    
    console.log('✅ Advanced mobile navigation initialized');
}

// Auto-initialisation
if (typeof $w !== 'undefined') {
    $w.onReady(() => {
        // Attendre que les optimisations mobiles de base soient chargées
        setTimeout(() => {
            initAdvancedMobileNavigation();
        }, 500);
    });
}