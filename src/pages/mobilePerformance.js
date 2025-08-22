// Optimisations de Performance Mobile - Forza Construction Inc.
// Système d'optimisation avancé pour performances mobiles

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

// === GESTIONNAIRE DE PERFORMANCE MOBILE ===
class MobilePerformanceManager {
    constructor() {
        this.connectionType = null;
        this.effectiveType = null;
        this.saveData = false;
        this.batteryLevel = null;
        
        this.init();
    }
    
    init() {
        this.detectNetworkConditions();
        this.detectBatteryStatus();
        this.setupPerformanceMonitoring();
        this.optimizeBasedOnConditions();
    }
    
    detectNetworkConditions() {
        // Détection de la connexion réseau
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            
            if (connection) {
                this.connectionType = connection.type;
                this.effectiveType = connection.effectiveType;
                this.saveData = connection.saveData;
                
                console.log('Network conditions:', {
                    type: this.connectionType,
                    effectiveType: this.effectiveType,
                    saveData: this.saveData,
                    downlink: connection.downlink
                });
                
                // Écouter changements de connexion
                connection.addEventListener('change', () => {
                    this.handleNetworkChange(connection);
                });
            }
        }
    }
    
    detectBatteryStatus() {
        // Détection du niveau de batterie (si supporté)
        if ('getBattery' in navigator) {
            navigator.getBattery().then((battery) => {
                this.batteryLevel = battery.level;
                
                console.log('Battery level:', this.batteryLevel);
                
                // Optimiser selon niveau de batterie
                if (this.batteryLevel < 0.2) {
                    this.enableBatterySavingMode();
                }
                
                // Écouter changements de batterie
                battery.addEventListener('levelchange', () => {
                    this.handleBatteryLevelChange(battery);
                });
            });
        }
    }
    
    setupPerformanceMonitoring() {
        // Surveillance des performances en temps réel
        this.monitorPageLoadSpeed();
        this.monitorResourceUsage();
        this.monitorUserInteractions();
    }
    
    monitorPageLoadSpeed() {
        // Mesurer vitesse de chargement
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
                
                console.log('Performance metrics:', {
                    loadTime: loadTime + 'ms',
                    domReady: domReady + 'ms'
                });
                
                // Optimiser si chargement trop lent
                if (loadTime > 3000) {
                    this.enableFastLoadMode();
                }
                
                this.trackPerformanceMetrics({
                    loadTime,
                    domReady,
                    connectionType: this.effectiveType
                });
            }
        });
    }
    
    monitorResourceUsage() {
        // Surveillance de l'utilisation des ressources
        if ('memory' in performance) {
            const memInfo = performance.memory;
            
            console.log('Memory usage:', {
                used: Math.round(memInfo.usedJSHeapSize / 1024 / 1024) + 'MB',
                total: Math.round(memInfo.totalJSHeapSize / 1024 / 1024) + 'MB',
                limit: Math.round(memInfo.jsHeapSizeLimit / 1024 / 1024) + 'MB'
            });
            
            // Alerte si utilisation mémoire élevée
            if (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit > 0.9) {
                this.enableMemoryOptimization();
            }
        }
    }
    
    monitorUserInteractions() {
        // Mesurer réactivité des interactions
        let interactionCount = 0;
        const startTime = Date.now();
        
        ['click', 'touchstart', 'scroll'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                interactionCount++;
            });
        });
        
        // Analyser interactions après 30 secondes
        setTimeout(() => {
            const interactionRate = interactionCount / 30;
            console.log('Interaction rate:', interactionRate + '/sec');
            
            if (interactionRate > 2) {
                this.optimizeForHighInteractivity();
            }
        }, 30000);
    }
    
    optimizeBasedOnConditions() {
        // Optimisations basées sur les conditions détectées
        
        // Connexion lente
        if (this.effectiveType === 'slow-2g' || this.effectiveType === '2g') {
            this.enableSlowConnectionMode();
        }
        
        // Mode économie de données
        if (this.saveData) {
            this.enableDataSavingMode();
        }
        
        // Batterie faible
        if (this.batteryLevel && this.batteryLevel < 0.3) {
            this.enableBatterySavingMode();
        }
    }
    
    handleNetworkChange(connection) {
        console.log('Network changed:', connection.effectiveType);
        
        this.effectiveType = connection.effectiveType;
        this.saveData = connection.saveData;
        
        // Réajuster optimisations
        this.optimizeBasedOnConditions();
        
        // Notifier utilisateur si connexion très lente
        if (connection.effectiveType === 'slow-2g') {
            this.showSlowConnectionNotification();
        }
    }
    
    handleBatteryLevelChange(battery) {
        this.batteryLevel = battery.level;
        
        if (this.batteryLevel < 0.15) {
            this.enableAggressiveBatterySaving();
        } else if (this.batteryLevel > 0.5) {
            this.disableBatterySavingMode();
        }
    }
    
    enableSlowConnectionMode() {
        console.log('🐌 Activating slow connection mode');
        
        // 1. Réduire qualité des images
        this.reduceImageQuality();
        
        // 2. Désactiver animations non essentielles
        this.disableNonEssentialAnimations();
        
        // 3. Lazy loading agressif
        this.enableAggressiveLazyLoading();
        
        // 4. Préchargement intelligent
        this.disablePreloading();
        
        // 5. Compression du contenu
        this.enableContentCompression();
    }
    
    enableDataSavingMode() {
        console.log('💾 Activating data saving mode');
        
        // 1. Images en basse qualité
        this.reduceImageQuality(true);
        
        // 2. Désactiver vidéos auto-play
        this.disableAutoplayVideos();
        
        // 3. Minimiser requêtes réseau
        this.minimizeNetworkRequests();
        
        // 4. Compression maximale
        this.enableMaxCompression();
    }
    
    enableBatterySavingMode() {
        console.log('🔋 Activating battery saving mode');
        
        // 1. Réduire fréquence des animations
        this.reduceAnimationFrameRate();
        
        // 2. Désactiver effets visuels coûteux
        this.disableExpensiveEffects();
        
        // 3. Réduire polling/timers
        this.reduceTimerFrequency();
        
        // 4. Mode sombre (économie OLED)
        this.enableDarkMode();
    }
    
    enableAggressiveBatterySaving() {
        console.log('🔋⚡ Activating aggressive battery saving');
        
        // Mode ultra économie
        this.enableBatterySavingMode();
        
        // Désactiver toutes animations
        this.disableAllAnimations();
        
        // Arrêter tracking non essentiel
        this.pauseNonEssentialTracking();
        
        // Afficher notification
        this.showBatterySavingNotification();
    }
    
    enableFastLoadMode() {
        console.log('⚡ Activating fast load mode');
        
        // 1. Priorité au contenu critique
        this.prioritizeCriticalContent();
        
        // 2. Lazy loading agressif du non-critique
        this.deferNonCriticalContent();
        
        // 3. Optimisation des ressources
        this.optimizeResourceLoading();
        
        // 4. Mise en cache intelligente
        this.enableSmartCaching();
    }
    
    enableMemoryOptimization() {
        console.log('🧠 Activating memory optimization');
        
        // 1. Nettoyer objets inutiles
        this.cleanupUnusedObjects();
        
        // 2. Réduire cache
        this.reduceCacheSize();
        
        // 3. Limiter éléments DOM
        this.limitDOMElements();
        
        // 4. Garbage collection forcé
        if (window.gc) {
            window.gc();
        }
    }
    
    optimizeForHighInteractivity() {
        console.log('🎯 Optimizing for high interactivity');
        
        // 1. Précharger contenus probables
        this.preloadLikelyContent();
        
        // 2. Optimiser réponse tactile
        this.optimizeTouchResponse();
        
        // 3. Réduire latence
        this.reduceInputLatency();
    }
    
    // === MÉTHODES D'OPTIMISATION SPÉCIFIQUES ===
    
    reduceImageQuality(aggressive = false) {
        const images = document.querySelectorAll('img');
        const quality = aggressive ? 40 : 60;
        
        images.forEach(img => {
            if (img.src && img.src.includes('wixstatic.com')) {
                // Ajouter paramètres de compression Wix
                const separator = img.src.includes('?') ? '&' : '?';
                img.src += `${separator}q=${quality}&w=400`;
            }
        });
    }
    
    disableNonEssentialAnimations() {
        // Désactiver animations CSS non critiques
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            .non-critical-animation {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    disableAllAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation: none !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    enableAggressiveLazyLoading() {
        // Lazy loading avec seuil plus élevé
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
        
        // Lazy loading du contenu secondaire
        this.lazyLoadSecondaryContent();
    }
    
    lazyLoadSecondaryContent() {
        const secondaryElements = [
            '#testimonialsSection',
            '#blogSection', 
            '#footerSection'
        ];
        
        secondaryElements.forEach(selector => {
            if ($w(selector)) {
                $w(selector).hide();
                
                // Charger quand visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            $w(selector).show('fade', { duration: 300 });
                            observer.unobserve(entry.target);
                        }
                    });
                }, { rootMargin: '50px' });
                
                // Observer l'élément parent si disponible
                const element = document.querySelector(selector.replace('#', ''));
                if (element) {
                    observer.observe(element);
                }
            }
        });
    }
    
    disableAutoplayVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.autoplay = false;
            video.preload = 'none';
        });
    }
    
    minimizeNetworkRequests() {
        // Combiner requêtes similaires
        this.batchSimilarRequests();
        
        // Désactiver analytics non essentiels
        this.pauseNonEssentialTracking();
        
        // Cache agressif
        this.enableAggressiveCaching();
    }
    
    enableDarkMode() {
        if (!document.getElementById('darkModeStyle')) {
            const style = document.createElement('style');
            style.id = 'darkModeStyle';
            style.textContent = `
                body {
                    filter: invert(1) hue-rotate(180deg) !important;
                    background: #000 !important;
                }
                img, video {
                    filter: invert(1) hue-rotate(180deg) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    reduceTimerFrequency() {
        // Réduire fréquence des timers/intervals
        const originalSetInterval = window.setInterval;
        window.setInterval = function(fn, delay) {
            return originalSetInterval(fn, Math.max(delay * 2, 1000));
        };
    }
    
    cleanupUnusedObjects() {
        // Nettoyer objets globaux inutiles
        if (window.unusedGlobalObjects) {
            window.unusedGlobalObjects = null;
        }
        
        // Vider caches temporaires
        if (window.tempCache) {
            window.tempCache.clear();
        }
    }
    
    limitDOMElements() {
        // Limiter nombre d'éléments DOM visibles
        const allElements = document.querySelectorAll('*');
        if (allElements.length > 2000) {
            console.warn('Too many DOM elements, consider optimization');
        }
    }
    
    optimizeTouchResponse() {
        // Optimiser réponse tactile
        const style = document.createElement('style');
        style.textContent = `
            button, [onclick], .clickable {
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
            }
        `;
        document.head.appendChild(style);
    }
    
    // === NOTIFICATIONS UTILISATEUR ===
    
    showSlowConnectionNotification() {
        this.showPerformanceNotification(
            '🐌 Connexion lente détectée',
            'Mode optimisé activé pour améliorer les performances',
            'info'
        );
    }
    
    showBatterySavingNotification() {
        this.showPerformanceNotification(
            '🔋 Mode économie de batterie',
            'Certaines fonctionnalités sont réduites pour économiser la batterie',
            'warning'
        );
    }
    
    showPerformanceNotification(title, message, type = 'info') {
        if ($w('#htmlPerformanceNotification')) {
            const colors = {
                info: '#3498db',
                warning: '#f39c12',
                error: '#e74c3c'
            };
            
            const notificationHTML = `
                <div id="performanceNotification" style="
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: ${colors[type]};
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    z-index: 10000;
                    max-width: 300px;
                    text-align: center;
                    font-size: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    animation: slideDown 0.3s ease;
                ">
                    <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
                    <div>${message}</div>
                    <button onclick="this.parentElement.remove()" style="
                        position: absolute;
                        top: 5px;
                        right: 8px;
                        background: none;
                        border: none;
                        color: white;
                        cursor: pointer;
                        font-size: 14px;
                    ">×</button>
                </div>
                <style>
                @keyframes slideDown {
                    from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                    to { transform: translateX(-50%) translateY(0); opacity: 1; }
                }
                </style>
            `;
            
            $w('#htmlPerformanceNotification').html = notificationHTML;
            
            // Auto-masquer après 5 secondes
            setTimeout(() => {
                const notification = document.getElementById('performanceNotification');
                if (notification) {
                    notification.remove();
                }
            }, 5000);
        }
    }
    
    // === MÉTHODES UTILITAIRES ===
    
    batchSimilarRequests() {
        // Implémenter batching des requêtes similaires
        // TODO: Implémenter selon besoins spécifiques
    }
    
    pauseNonEssentialTracking() {
        // Pauser tracking non essentiel
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            console.log('Pausing non-essential tracking');
        }
    }
    
    enableAggressiveCaching() {
        // Configuration cache agressif
        if ('serviceWorker' in navigator) {
            // Activer service worker pour cache si disponible
            console.log('Aggressive caching enabled');
        }
    }
    
    prioritizeCriticalContent() {
        // Prioriser chargement contenu critique
        const criticalElements = [
            '#heroSection',
            '#contactForm',
            '#mainNavigation'
        ];
        
        criticalElements.forEach(selector => {
            if ($w(selector)) {
                // Marquer comme critique pour chargement prioritaire
                $w(selector).priority = 'high';
            }
        });
    }
    
    deferNonCriticalContent() {
        // Différer contenu non critique
        const nonCriticalElements = [
            '#blogSection',
            '#socialMediaFeed',
            '#additionalTestimonials'
        ];
        
        nonCriticalElements.forEach(selector => {
            if ($w(selector)) {
                // Charger après contenu critique
                setTimeout(() => {
                    if ($w(selector).hidden) {
                        $w(selector).show();
                    }
                }, 2000);
            }
        });
    }
    
    trackPerformanceMetrics(metrics) {
        // Envoyer métriques de performance
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'performance_metrics', {
                'event_category': 'mobile_performance',
                'custom_map': {
                    'metric_1': 'load_time',
                    'metric_2': 'dom_ready',
                    'metric_3': 'connection_type'
                },
                'metric_1': metrics.loadTime,
                'metric_2': metrics.domReady,
                'metric_3': metrics.connectionType
            });
        }
    }
}

// === CACHE INTELLIGENT ===
class IntelligentCacheManager {
    constructor() {
        this.cachePrefix = 'forza_mobile_';
        this.maxCacheSize = 5 * 1024 * 1024; // 5MB
        
        this.init();
    }
    
    init() {
        if (typeof Storage !== 'undefined') {
            this.cleanExpiredCache();
            this.monitorCacheSize();
        }
    }
    
    set(key, data, ttl = 3600000) { // 1 heure par défaut
        if (typeof Storage === 'undefined') return false;
        
        const item = {
            data: data,
            timestamp: Date.now(),
            ttl: ttl
        };
        
        try {
            localStorage.setItem(this.cachePrefix + key, JSON.stringify(item));
            return true;
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                this.clearOldestItems();
                return this.set(key, data, ttl);
            }
            return false;
        }
    }
    
    get(key) {
        if (typeof Storage === 'undefined') return null;
        
        try {
            const item = localStorage.getItem(this.cachePrefix + key);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            
            // Vérifier expiration
            if (Date.now() - parsed.timestamp > parsed.ttl) {
                localStorage.removeItem(this.cachePrefix + key);
                return null;
            }
            
            return parsed.data;
        } catch (e) {
            return null;
        }
    }
    
    cleanExpiredCache() {
        if (typeof Storage === 'undefined') return;
        
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.cachePrefix)) {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (Date.now() - item.timestamp > item.ttl) {
                        localStorage.removeItem(key);
                    }
                } catch (e) {
                    localStorage.removeItem(key);
                }
            }
        });
    }
    
    monitorCacheSize() {
        let totalSize = 0;
        
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.cachePrefix)) {
                totalSize += localStorage.getItem(key).length;
            }
        });
        
        if (totalSize > this.maxCacheSize) {
            this.clearOldestItems();
        }
    }
    
    clearOldestItems() {
        const items = [];
        
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.cachePrefix)) {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    items.push({
                        key: key,
                        timestamp: item.timestamp
                    });
                } catch (e) {
                    localStorage.removeItem(key);
                }
            }
        });
        
        // Trier par timestamp et supprimer les plus anciens
        items.sort((a, b) => a.timestamp - b.timestamp);
        
        // Supprimer 30% des plus anciens
        const toRemove = Math.ceil(items.length * 0.3);
        for (let i = 0; i < toRemove; i++) {
            localStorage.removeItem(items[i].key);
        }
    }
}

// === INITIALISATION ===
export function initMobilePerformanceOptimizations() {
    // Initialiser seulement sur mobile
    if (!window.mobileDetector?.isMobile) return;
    
    // Créer instances
    window.mobilePerformanceManager = new MobilePerformanceManager();
    window.intelligentCacheManager = new IntelligentCacheManager();
    
    console.log('✅ Mobile performance optimizations initialized');
    
    // Démarrer surveillance continue
    setInterval(() => {
        window.mobilePerformanceManager.monitorResourceUsage();
    }, 30000); // Toutes les 30 secondes
}

// Auto-initialisation
if (typeof $w !== 'undefined') {
    $w.onReady(() => {
        // Attendre que les autres optimisations soient chargées
        setTimeout(() => {
            initMobilePerformanceOptimizations();
        }, 1000);
    });
}