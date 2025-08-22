// MasterPage - Forza Construction Inc.
// Optimisations globales et intégration des systèmes mobiles avancés

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { initMobileOptimizations } from './mobileOptimizations.js';
import { initAdvancedMobileNavigation } from './mobileNavigation.js';
import { initMobilePerformanceOptimizations } from './mobilePerformance.js';

$w.onReady(function () {
    // === INITIALISATION GLOBALE ===
    console.log('🚀 Forza Construction - MasterPage Loading...');
    
    // 1. Initialiser détection et optimisations de base
    initializeCoreOptimizations();
    
    // 2. Configurer systèmes globaux
    setupGlobalSystems();
    
    // 3. Initialiser optimisations mobiles
    initializeMobileEnhancements();
    
    // 4. Configurer analytics et tracking
    setupGlobalAnalytics();
    
    // 5. Initialiser fonctionnalités communes
    setupCommonFeatures();
    
    console.log('✅ MasterPage fully loaded and optimized');
    
    // === FONCTIONS D'INITIALISATION ===
    
    function initializeCoreOptimizations() {
        // Détection précoce du device
        detectDeviceCapabilities();
        
        // Configuration responsive de base
        setupResponsiveBase();
        
        // Optimisations critiques précoces
        applyCriticalOptimizations();
    }
    
    function detectDeviceCapabilities() {
        // Détection avancée des capacités device
        const capabilities = {
            isMobile: wixWindow.viewMode === 'mobile',
            isTablet: wixWindow.viewMode === 'tablet',
            isDesktop: wixWindow.viewMode === 'desktop',
            touchSupport: 'ontouchstart' in window,
            retina: window.devicePixelRatio > 1,
            webGL: !!window.WebGLRenderingContext,
            webP: checkWebPSupport(),
            serviceWorker: 'serviceWorker' in navigator,
            geolocation: 'geolocation' in navigator,
            battery: 'getBattery' in navigator,
            connection: 'connection' in navigator
        };
        
        // Stocker globalement
        window.deviceCapabilities = capabilities;
        
        console.log('📱 Device capabilities:', capabilities);
        
        // Appliquer optimisations selon capacités
        if (capabilities.isMobile) {
            document.body.classList.add('mobile-device');
        }
        
        if (capabilities.retina) {
            document.body.classList.add('retina-display');
        }
    }
    
    function checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    
    function setupResponsiveBase() {
        // Configuration responsive globale
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.setAttribute('content', 
                'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover'
            );
        }
        
        // Styles CSS globaux pour mobile
        addGlobalMobileStyles();
    }
    
    function addGlobalMobileStyles() {
        const style = document.createElement('style');
        style.id = 'global-mobile-styles';
        style.textContent = `
            /* Optimisations globales mobile */
            * {
                -webkit-tap-highlight-color: rgba(255, 107, 53, 0.2);
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                user-select: none;
            }
            
            input, textarea, [contenteditable] {
                -webkit-user-select: text;
                user-select: text;
            }
            
            body.mobile-device {
                font-size: 16px; /* Éviter zoom iOS */
                line-height: 1.4;
            }
            
            /* Améliorer performance scroll */
            .scrollable {
                -webkit-overflow-scrolling: touch;
                overflow-scrolling: touch;
            }
            
            /* Optimiser rendu */
            .gpu-accelerated {
                transform: translateZ(0);
                will-change: transform;
            }
            
            /* Touch targets optimaux */
            button, [role="button"], .clickable {
                min-height: 44px;
                min-width: 44px;
                touch-action: manipulation;
            }
            
            /* Réduire animations sur mobile lent */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
            
            /* Optimisations rétina */
            body.retina-display img {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: optimize-contrast;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    function applyCriticalOptimizations() {
        // Optimisations critiques à appliquer immédiatement
        
        // 1. Préconnexion aux domaines critiques
        preconnectCriticalDomains();
        
        // 2. Optimisation des polices
        optimizeFontLoading();
        
        // 3. Lazy loading images globalement
        enableGlobalLazyLoading();
    }
    
    function preconnectCriticalDomains() {
        const criticalDomains = [
            'static.wixstatic.com',
            'fonts.googleapis.com',
            'fonts.gstatic.com',
            'www.google-analytics.com'
        ];
        
        criticalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = `https://${domain}`;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    function optimizeFontLoading() {
        // Optimiser affichage des polices
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-display: swap; /* Améliorer affichage initial */
            }
        `;
        document.head.appendChild(style);
    }
    
    function enableGlobalLazyLoading() {
        // Activer lazy loading pour toutes les images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
        });
        
        // Observer pour images ajoutées dynamiquement
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === 'IMG' && !node.loading) {
                        node.loading = 'lazy';
                    }
                    if (node.querySelectorAll) {
                        const newImages = node.querySelectorAll('img:not([loading])');
                        newImages.forEach(img => img.loading = 'lazy');
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    function setupGlobalSystems() {
        // Configuration des systèmes globaux
        
        // 1. Gestionnaire d'erreurs global
        setupGlobalErrorHandling();
        
        // 2. Système de notifications
        setupGlobalNotifications();
        
        // 3. Cache intelligent global
        setupGlobalCaching();
    }
    
    function setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            
            // Reporter erreurs critiques
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    'description': event.error.message,
                    'fatal': false
                });
            }
        });
    }
    
    function setupGlobalNotifications() {
        // Système de notifications global
        window.showNotification = function(message, type = 'info', duration = 5000) {
            const notification = document.createElement('div');
            notification.className = `global-notification ${type}`;
            notification.textContent = message;
            
            const styles = {
                info: { bg: '#3498db', color: '#fff' },
                success: { bg: '#27ae60', color: '#fff' },
                warning: { bg: '#f39c12', color: '#fff' },
                error: { bg: '#e74c3c', color: '#fff' }
            };
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${styles[type].bg};
                color: ${styles[type].color};
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 10000;
                max-width: 300px;
                font-size: 14px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        };
    }
    
    function setupGlobalCaching() {
        // Cache intelligent pour données communes
        window.globalCache = {
            set: function(key, value, ttl = 3600000) {
                if (typeof Storage !== 'undefined') {
                    const item = {
                        value: value,
                        timestamp: Date.now(),
                        ttl: ttl
                    };
                    localStorage.setItem('forza_' + key, JSON.stringify(item));
                }
            },
            
            get: function(key) {
                if (typeof Storage !== 'undefined') {
                    const item = localStorage.getItem('forza_' + key);
                    if (item) {
                        const parsed = JSON.parse(item);
                        if (Date.now() - parsed.timestamp < parsed.ttl) {
                            return parsed.value;
                        } else {
                            localStorage.removeItem('forza_' + key);
                        }
                    }
                }
                return null;
            }
        };
    }
    
    function initializeMobileEnhancements() {
        // Initialiser les systèmes mobiles dans l'ordre optimal
        
        if (window.deviceCapabilities?.isMobile) {
            console.log('📱 Initializing mobile enhancements...');
            
            // 1. Optimisations de base (synchrone)
            setTimeout(() => {
                initMobileOptimizations();
            }, 100);
            
            // 2. Navigation avancée (après base)
            setTimeout(() => {
                initAdvancedMobileNavigation();
            }, 300);
            
            // 3. Optimisations de performance (en dernier)
            setTimeout(() => {
                initMobilePerformanceOptimizations();
            }, 500);
            
            // 4. Fonctionnalités spécifiques mobile
            setTimeout(() => {
                setupMobileSpecificFeatures();
            }, 700);
        }
    }
    
    function setupMobileSpecificFeatures() {
        // Fonctionnalités spécifiques aux mobiles
        
        // 1. Orientation handling
        setupOrientationHandling();
        
        // 2. Keyboard handling
        setupMobileKeyboardHandling();
        
        // 3. App-like behavior
        setupAppLikeBehavior();
    }
    
    function setupOrientationHandling() {
        // Gestion changement d'orientation
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Recalculer layouts
                window.dispatchEvent(new Event('resize'));
                
                // Réajuster éléments critiques
                adjustForOrientation();
            }, 100);
        });
    }
    
    function adjustForOrientation() {
        const isLandscape = window.orientation === 90 || window.orientation === -90;
        
        if (isLandscape) {
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
        } else {
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        }
    }
    
    function setupMobileKeyboardHandling() {
        // Gestion clavier mobile
        let initialViewHeight = window.innerHeight;
        
        window.addEventListener('resize', () => {
            const currentHeight = window.innerHeight;
            const heightDifference = initialViewHeight - currentHeight;
            
            if (heightDifference > 150) {
                // Clavier probablement ouvert
                document.body.classList.add('keyboard-open');
            } else {
                // Clavier fermé
                document.body.classList.remove('keyboard-open');
            }
        });
    }
    
    function setupAppLikeBehavior() {
        // Comportement app-like
        
        // 1. Désactiver sélection sur éléments UI
        document.addEventListener('selectstart', (e) => {
            if (e.target.closest('button, .ui-element, nav')) {
                e.preventDefault();
            }
        });
        
        // 2. Éviter zoom double-tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // 3. Status bar handling pour PWA
        if (window.navigator.standalone) {
            document.body.classList.add('standalone-app');
        }
    }
    
    function setupGlobalAnalytics() {
        // Configuration analytics globale
        if (typeof gtag !== 'undefined') {
            // Tracking device info
            gtag('event', 'page_view', {
                'device_type': window.deviceCapabilities?.isMobile ? 'mobile' : 'desktop'
            });
        }
    }
    
    function setupCommonFeatures() {
        // Fonctionnalités communes à toutes les pages
        
        // 1. Liens externes
        setupExternalLinks();
        
        // 2. Chat widget global
        setupGlobalChat();
    }
    
    function setupExternalLinks() {
        // Ouvrir liens externes dans nouvel onglet
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.includes(window.location.hostname)) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                
                // Tracker liens externes
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'outbound',
                        'event_label': link.href
                    });
                }
            }
        });
    }
    
    function setupGlobalChat() {
        // Chat widget global
        window.openChat = function() {
            console.log('Opening chat widget...');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'chat_opened', {
                    'event_category': 'engagement'
                });
            }
        };
    }
});