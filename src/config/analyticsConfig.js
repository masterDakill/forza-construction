// Configuration Analytics GA4 - Forza Construction Inc.
// Tracking complet des conversions et Core Web Vitals

export const ANALYTICS_CONFIG = {
    // === GOOGLE ANALYTICS 4 ===
    ga4: {
        measurementId: 'G-1T8PTVET9T', // ID GA4 Forza Construction
        enabled: true,
        debug: false // Mettre à true pour debugging
    },

    // === EVENTS PERSONNALISÉS ===
    events: {
        // CTA Clicks
        cta_click: {
            category: 'engagement',
            action: 'cta_click',
            params: ['cta_location', 'cta_text', 'page_path']
        },

        // Formulaires
        form_start: {
            category: 'forms',
            action: 'form_start',
            params: ['form_type', 'page_path']
        },
        form_submit: {
            category: 'forms',
            action: 'form_submit',
            params: ['form_type', 'page_path', 'form_data']
        },
        form_error: {
            category: 'forms',
            action: 'form_error',
            params: ['form_type', 'error_field', 'error_message']
        },

        // Téléphone
        phone_click: {
            category: 'contact',
            action: 'phone_click',
            params: ['phone_number', 'location']
        },

        // Email
        email_click: {
            category: 'contact',
            action: 'email_click',
            params: ['location']
        },

        // Calculateur
        calculator_use: {
            category: 'tools',
            action: 'calculator_use',
            params: ['service_type', 'estimated_price', 'surface']
        },

        // Services
        service_view: {
            category: 'services',
            action: 'service_view',
            params: ['service_id', 'service_name']
        },
        service_interest: {
            category: 'services',
            action: 'service_interest',
            params: ['service_id', 'action_type']
        },

        // Chat (si disponible)
        chat_open: {
            category: 'chat',
            action: 'chat_open',
            params: ['page_path']
        },
        chat_intent: {
            category: 'chat',
            action: 'chat_intent',
            params: ['intent_type', 'message']
        },
        chat_handoff: {
            category: 'chat',
            action: 'chat_handoff',
            params: ['reason']
        },

        // Navigation
        scroll_depth: {
            category: 'engagement',
            action: 'scroll_depth',
            params: ['depth_percentage', 'page_path']
        },
        page_view: {
            category: 'navigation',
            action: 'page_view',
            params: ['page_path', 'page_title', 'referrer']
        },

        // Conversions principales
        quote_requested: {
            category: 'conversion',
            action: 'quote_requested',
            params: ['service_type', 'estimated_value']
        },
        contact_submitted: {
            category: 'conversion',
            action: 'contact_submitted',
            params: ['contact_reason']
        }
    },

    // === CORE WEB VITALS ===
    webVitals: {
        enabled: true,
        reportAllChanges: false, // true pour debug
        metrics: ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP']
    },

    // === USER PROPERTIES ===
    userProperties: {
        device_type: true,
        user_language: true,
        viewport_size: true,
        connection_type: true
    }
};

// === CLASSE ANALYTICS MANAGER ===
class AnalyticsManager {
    constructor() {
        this.initialized = false;
        this.queue = [];
        this.webVitalsReported = new Set();
    }

    // Initialisation GA4
    init() {
        if (this.initialized || !ANALYTICS_CONFIG.ga4.enabled) return;

        // Vérifier si gtag existe (ajouté par Wix ou manuellement)
        if (typeof window !== 'undefined') {
            // Créer gtag si n'existe pas
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
                window.dataLayer.push(arguments);
            };

            // Config GA4
            window.gtag('js', new Date());
            window.gtag('config', ANALYTICS_CONFIG.ga4.measurementId, {
                send_page_view: true,
                debug_mode: ANALYTICS_CONFIG.ga4.debug
            });

            this.initialized = true;

            // Traiter la queue
            this.processQueue();

            // Setup Web Vitals
            if (ANALYTICS_CONFIG.webVitals.enabled) {
                this.setupWebVitals();
            }

            // Setup scroll tracking
            this.setupScrollTracking();

            console.log('✅ Analytics initialized');
        }
    }

    // Track event
    trackEvent(eventName, params = {}) {
        if (!this.initialized) {
            this.queue.push({ eventName, params });
            return;
        }

        const eventConfig = ANALYTICS_CONFIG.events[eventName];
        if (!eventConfig) {
            console.warn(`Event ${eventName} not configured`);
            return;
        }

        // Filtrer les paramètres autorisés
        const allowedParams = {};
        if (eventConfig.params) {
            eventConfig.params.forEach(param => {
                if (params[param] !== undefined) {
                    allowedParams[param] = params[param];
                }
            });
        }

        // Ajouter metadata
        allowedParams.timestamp = new Date().toISOString();
        allowedParams.event_category = eventConfig.category;

        // Envoyer à GA4
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventConfig.action, allowedParams);
        }

        if (ANALYTICS_CONFIG.ga4.debug) {
            console.log('📊 Analytics event:', eventName, allowedParams);
        }
    }

    // Process queued events
    processQueue() {
        while (this.queue.length > 0) {
            const { eventName, params } = this.queue.shift();
            this.trackEvent(eventName, params);
        }
    }

    // Setup Web Vitals tracking
    setupWebVitals() {
        if (typeof window === 'undefined') return;

        // CLS - Cumulative Layout Shift
        this.observeCLS();

        // LCP - Largest Contentful Paint
        this.observeLCP();

        // FID - First Input Delay
        this.observeFID();

        // INP - Interaction to Next Paint
        this.observeINP();

        // FCP - First Contentful Paint
        this.observeFCP();

        // TTFB - Time to First Byte
        this.observeTTFB();
    }

    observeCLS() {
        let clsValue = 0;
        let clsEntries = [];

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    clsEntries.push(entry);
                }
            }
        });

        observer.observe({ type: 'layout-shift', buffered: true });

        // Report au unload
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.reportWebVital('CLS', clsValue);
            }
        });
    }

    observeLCP() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.reportWebVital('LCP', lastEntry.renderTime || lastEntry.loadTime);
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });
    }

    observeFID() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.reportWebVital('FID', entry.processingStart - entry.startTime);
            }
        });

        observer.observe({ type: 'first-input', buffered: true });
    }

    observeINP() {
        // INP nécessite Event Timing API
        if ('PerformanceEventTiming' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                let maxDuration = 0;

                entries.forEach(entry => {
                    if (entry.duration > maxDuration) {
                        maxDuration = entry.duration;
                    }
                });

                if (maxDuration > 0) {
                    this.reportWebVital('INP', maxDuration);
                }
            });

            observer.observe({ type: 'event', buffered: true, durationThreshold: 16 });
        }
    }

    observeFCP() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    this.reportWebVital('FCP', entry.startTime);
                }
            }
        });

        observer.observe({ type: 'paint', buffered: true });
    }

    observeTTFB() {
        const navigationEntry = performance.getEntriesByType('navigation')[0];
        if (navigationEntry) {
            const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            this.reportWebVital('TTFB', ttfb);
        }
    }

    reportWebVital(name, value) {
        // Éviter les doublons
        if (this.webVitalsReported.has(name)) return;
        this.webVitalsReported.add(name);

        const roundedValue = Math.round(name === 'CLS' ? value * 1000 : value);

        // Envoyer à GA4
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: name,
                value: roundedValue,
                non_interaction: true,
                metric_name: name,
                metric_value: roundedValue,
                metric_delta: roundedValue
            });
        }

        console.log(`📊 Web Vital - ${name}: ${roundedValue}ms`);
    }

    // Setup scroll depth tracking
    setupScrollTracking() {
        if (typeof window === 'undefined') return;

        const thresholds = [25, 50, 75, 90, 100];
        const reported = new Set();

        const checkScroll = () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            thresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !reported.has(threshold)) {
                    reported.add(threshold);
                    this.trackEvent('scroll_depth', {
                        depth_percentage: threshold,
                        page_path: window.location.pathname
                    });
                }
            });
        };

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    checkScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Helpers pour tracking rapide
    trackCTA(ctaText, location) {
        this.trackEvent('cta_click', {
            cta_text: ctaText,
            cta_location: location,
            page_path: window.location.pathname
        });
    }

    trackFormStart(formType) {
        this.trackEvent('form_start', {
            form_type: formType,
            page_path: window.location.pathname
        });
    }

    trackFormSubmit(formType, formData = {}) {
        this.trackEvent('form_submit', {
            form_type: formType,
            page_path: window.location.pathname,
            form_data: JSON.stringify(formData)
        });
    }

    trackPhoneClick(phoneNumber, location) {
        this.trackEvent('phone_click', {
            phone_number: phoneNumber,
            location: location
        });
    }

    trackCalculator(serviceType, estimatedPrice, surface) {
        this.trackEvent('calculator_use', {
            service_type: serviceType,
            estimated_price: estimatedPrice,
            surface: surface
        });
    }

    trackServiceInterest(serviceId, serviceName) {
        this.trackEvent('service_interest', {
            service_id: serviceId,
            action_type: 'view_details'
        });
    }
}

// Instance globale
export const analytics = new AnalyticsManager();

// Export pour usage direct
export default analytics;
