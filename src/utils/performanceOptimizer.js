// Optimiseur de Performance - Forza Construction Inc.
// Lazy loading, WebP/AVIF, Scripts différés, Core Web Vitals

export class PerformanceOptimizer {
    constructor() {
        this.lazyLoadObserver = null;
        this.performanceMetrics = {};
    }

    // === INITIALISATION ===
    init() {
        this.setupLazyLoading();
        this.optimizeImages();
        this.deferNonCriticalScripts();
        this.setupResourceHints();
        this.monitorPerformance();
        console.log('✅ Performance optimizer initialized');
    }

    // === LAZY LOADING ===
    setupLazyLoading() {
        if (typeof window === 'undefined') return;

        // Intersection Observer pour images
        this.lazyLoadObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        this.loadElement(element);
                        observer.unobserve(element);
                    }
                });
            },
            {
                rootMargin: '50px 0px', // Start loading 50px before viewport
                threshold: 0.01
            }
        );

        // Observer toutes les images avec data-src
        this.observeLazyElements();

        console.log('✅ Lazy loading enabled');
    }

    observeLazyElements() {
        // Images
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.lazyLoadObserver.observe(img);
        });

        // Backgrounds
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        lazyBackgrounds.forEach(el => {
            this.lazyLoadObserver.observe(el);
        });

        // Iframes (videos, maps)
        const lazyIframes = document.querySelectorAll('iframe[data-src]');
        lazyIframes.forEach(iframe => {
            this.lazyLoadObserver.observe(iframe);
        });
    }

    loadElement(element) {
        // Image
        if (element.tagName === 'IMG' && element.dataset.src) {
            element.src = element.dataset.src;
            if (element.dataset.srcset) {
                element.srcset = element.dataset.srcset;
            }
            element.classList.add('loaded');
        }

        // Background image
        if (element.dataset.bg) {
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            element.classList.add('loaded');
        }

        // Iframe
        if (element.tagName === 'IFRAME' && element.dataset.src) {
            element.src = element.dataset.src;
        }
    }

    // === OPTIMISATION IMAGES ===
    optimizeImages() {
        if (typeof window === 'undefined') return;

        const images = document.querySelectorAll('img:not([data-optimized])');
        images.forEach(img => {
            // Ajouter loading="lazy" natif
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }

            // Ajouter fetchpriority pour images above-the-fold
            if (this.isAboveFold(img)) {
                img.fetchPriority = 'high';
                img.loading = 'eager';
            }

            // Détecter support WebP/AVIF
            if (this.supportsModernFormats()) {
                this.convertToModernFormat(img);
            }

            // Ajouter dimensions si manquantes (éviter CLS)
            if (!img.width || !img.height) {
                this.addImageDimensions(img);
            }

            img.dataset.optimized = 'true';
        });

        console.log('✅ Images optimized');
    }

    isAboveFold(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight;
    }

    supportsModernFormats() {
        if (typeof window === 'undefined') return false;

        // Check WebP
        const canvas = document.createElement('canvas');
        if (canvas.getContext && canvas.getContext('2d')) {
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    }

    convertToModernFormat(img) {
        const src = img.src || img.dataset.src;
        if (!src) return;

        // Convertir .jpg/.png en .webp si disponible
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

        // Créer picture element si n'existe pas déjà
        if (img.parentElement.tagName !== 'PICTURE') {
            const picture = document.createElement('picture');
            const source = document.createElement('source');
            source.srcset = webpSrc;
            source.type = 'image/webp';

            img.parentNode.insertBefore(picture, img);
            picture.appendChild(source);
            picture.appendChild(img);
        }
    }

    addImageDimensions(img) {
        // Essayer de détecter les dimensions naturelles
        if (img.naturalWidth && img.naturalHeight) {
            if (!img.width) img.width = img.naturalWidth;
            if (!img.height) img.height = img.naturalHeight;
        } else {
            // Ratio par défaut 16:9
            img.addEventListener('load', function() {
                if (!this.width) this.width = this.naturalWidth;
                if (!this.height) this.height = this.naturalHeight;
            });
        }
    }

    // === SCRIPTS DIFFÉRÉS ===
    deferNonCriticalScripts() {
        if (typeof document === 'undefined') return;

        // Scripts à différer après load
        const nonCriticalScripts = [
            // Analytics (déjà géré par GA4)
            // Social widgets
            // Chat widgets
            // Maps
        ];

        // Attendre que la page soit chargée
        if (document.readyState === 'complete') {
            this.loadDeferredScripts();
        } else {
            window.addEventListener('load', () => {
                this.loadDeferredScripts();
            });
        }

        console.log('✅ Script deferral configured');
    }

    loadDeferredScripts() {
        // Charger scripts non-critiques après un délai
        setTimeout(() => {
            // Exemple: Chat widget
            this.loadChatWidget();

            // Google Maps (si besoin)
            this.loadMapsAPI();
        }, 2000); // 2 secondes après page load
    }

    loadChatWidget() {
        // Placeholder pour chat widget
        // À implémenter selon le service choisi (Tawk.to, Intercom, etc.)
        console.log('📢 Chat widget deferred loading');
    }

    loadMapsAPI() {
        // Charger Google Maps uniquement si nécessaire
        const mapContainer = document.querySelector('[data-google-map]');
        if (mapContainer && !window.google) {
            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
    }

    // === RESOURCE HINTS ===
    setupResourceHints() {
        if (typeof document === 'undefined') return;

        // DNS Prefetch pour domaines externes
        this.addDNSPrefetch([
            'https://www.google-analytics.com',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ]);

        // Preconnect pour domaines critiques
        this.addPreconnect([
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ]);

        // Preload pour ressources critiques
        this.addPreload([
            { href: '/fonts/Poppins-Bold.woff2', as: 'font', type: 'font/woff2' },
            { href: '/images/logo-forza.png', as: 'image' }
        ]);

        console.log('✅ Resource hints configured');
    }

    addDNSPrefetch(domains) {
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    addPreconnect(domains) {
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    addPreload(resources) {
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.type) link.type = resource.type;
            if (resource.as === 'font') link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    // === MONITORING PERFORMANCE ===
    monitorPerformance() {
        if (typeof window === 'undefined') return;
        if (!window.PerformanceObserver) return;

        // Monitor long tasks (> 50ms)
        try {
            const longTaskObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn('⚠️ Long task detected:', {
                            duration: Math.round(entry.duration),
                            startTime: Math.round(entry.startTime)
                        });
                    }
                }
            });
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // Long Task API pas supporté
        }

        // Monitor resource timing
        const resourceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // Détecter ressources lentes (> 1s)
                if (entry.duration > 1000) {
                    console.warn('⚠️ Slow resource:', {
                        name: entry.name,
                        duration: Math.round(entry.duration),
                        type: entry.initiatorType
                    });
                }
            }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });

        console.log('✅ Performance monitoring enabled');
    }

    // === COMPRESSION & MINIFICATION ===
    checkCompression() {
        if (typeof window === 'undefined') return;

        // Vérifier si les ressources sont compressées (gzip/brotli)
        const resources = performance.getEntriesByType('resource');
        const uncompressed = [];

        resources.forEach(resource => {
            const contentEncoding = resource.responseHeaders?.['content-encoding'];
            if (!contentEncoding && resource.transferSize > 10000) {
                uncompressed.push({
                    url: resource.name,
                    size: Math.round(resource.transferSize / 1024) + 'KB'
                });
            }
        });

        if (uncompressed.length > 0) {
            console.warn('⚠️ Uncompressed resources detected:', uncompressed);
        }
    }

    // === CACHE OPTIMIZATION ===
    setupCaching() {
        if (typeof navigator === 'undefined' || !navigator.serviceWorker) return;

        // Service Worker pour caching avancé
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // === MÉTRIQUES PERFORMANCE ===
    getPerformanceMetrics() {
        if (typeof window === 'undefined') return {};

        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');

        return {
            // Navigation timing
            dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
            tcp: Math.round(navigation.connectEnd - navigation.connectStart),
            ttfb: Math.round(navigation.responseStart - navigation.requestStart),
            download: Math.round(navigation.responseEnd - navigation.responseStart),
            domInteractive: Math.round(navigation.domInteractive),
            domComplete: Math.round(navigation.domComplete),
            loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),

            // Paint timing
            fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,

            // Total page load
            totalLoad: Math.round(navigation.loadEventEnd),

            // Page size
            transferSize: Math.round(navigation.transferSize / 1024) + 'KB',
            encodedSize: Math.round(navigation.encodedBodySize / 1024) + 'KB',
            decodedSize: Math.round(navigation.decodedBodySize / 1024) + 'KB'
        };
    }

    // === RAPPORT PERFORMANCE ===
    generatePerformanceReport() {
        const metrics = this.getPerformanceMetrics();

        console.group('📊 Performance Report');
        console.log('DNS Lookup:', metrics.dns + 'ms');
        console.log('TCP Connection:', metrics.tcp + 'ms');
        console.log('TTFB:', metrics.ttfb + 'ms');
        console.log('Download:', metrics.download + 'ms');
        console.log('DOM Interactive:', metrics.domInteractive + 'ms');
        console.log('DOM Complete:', metrics.domComplete + 'ms');
        console.log('FCP:', Math.round(metrics.fcp) + 'ms');
        console.log('Total Load:', metrics.totalLoad + 'ms');
        console.log('Transfer Size:', metrics.transferSize);
        console.log('Encoded Size:', metrics.encodedSize);
        console.log('Decoded Size:', metrics.decodedSize);
        console.groupEnd();

        return metrics;
    }
}

// Instance globale
export const performanceOptimizer = new PerformanceOptimizer();

export default performanceOptimizer;
