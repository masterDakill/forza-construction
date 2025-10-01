// Module d'optimisations mobiles - Forza Construction
// Gère toutes les optimisations spécifiques aux appareils mobiles

export function initMobileOptimizations() {
    console.log('📱 Initializing mobile optimizations...');

    // Détecter le type d'appareil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent.toLowerCase());

    if (!isMobile && !isTablet) {
        console.log('Desktop detected - skipping mobile optimizations');
        return;
    }

    // 1. Optimisations de performance
    setupPerformanceOptimizations();

    // 2. Touch gestures
    setupTouchGestures();

    // 3. Viewport et orientation
    setupViewportHandling();

    // 4. Lazy loading amélioré
    setupMobileLazyLoading();

    // 5. Cache mobile
    setupMobileCache();

    console.log('✅ Mobile optimizations initialized');
}

function setupPerformanceOptimizations() {
    // Désactiver hover effects sur mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            *:hover {
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Réduire les animations si batterie faible
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2) {
                document.body.style.setProperty('--animation-duration', '0.1s');
            }
        });
    }
}

function setupTouchGestures() {
    // Améliorer la réactivité tactile
    document.body.style.touchAction = 'manipulation';
    document.body.style.webkitTapHighlightColor = 'transparent';

    // Empêcher le zoom sur double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

function setupViewportHandling() {
    // Ajuster le viewport dynamiquement
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content',
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
        );
    }

    // Gérer les changements d'orientation
    window.addEventListener('orientationchange', () => {
        document.body.style.height = window.innerHeight + 'px';
    });

    // Fix pour la barre d'adresse mobile
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

function setupMobileLazyLoading() {
    // Lazy loading plus agressif sur mobile
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observer toutes les images avec data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function setupMobileCache() {
    // Cache simple pour les données mobiles
    if ('localStorage' in window) {
        try {
            // Nettoyer le cache si > 24h
            const cacheTimestamp = localStorage.getItem('mobileCache_timestamp');
            const now = Date.now();

            if (!cacheTimestamp || (now - parseInt(cacheTimestamp)) > 86400000) {
                // Nettoyer les anciennes données
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith('mobileCache_')) {
                        localStorage.removeItem(key);
                    }
                });
                localStorage.setItem('mobileCache_timestamp', now.toString());
            }
        } catch (e) {
            console.warn('Cache not available:', e);
        }
    }
}

// Fonctions utilitaires exportées
export function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isSlowConnection() {
    if (navigator.connection) {
        return navigator.connection.effectiveType === 'slow-2g' ||
               navigator.connection.effectiveType === '2g';
    }
    return false;
}

export function optimizeForMobile(element) {
    if (!element) return;

    // Appliquer optimisations à un élément spécifique
    element.style.webkitOverflowScrolling = 'touch';
    element.style.overflow = 'auto';

    // Désactiver sélection de texte si c'est un bouton
    if (element.tagName === 'BUTTON' || element.classList.contains('btn')) {
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
    }
}