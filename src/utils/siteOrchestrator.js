// Orchestrateur CloudCode - Forza Construction Inc.
// Système central qui coordonne SEO, Analytics, Navigation, Performance

import { injectSEO, injectStructuredData } from '../config/seoConfig';
import { analytics } from '../config/analyticsConfig';
import { navigationSystem } from './navigationSystem';
import { performanceOptimizer } from './performanceOptimizer';
import { deploymentChecker } from './deploymentChecker';

export class SiteOrchestrator {
    constructor() {
        this.initialized = false;
        this.pageKey = null;
        this.config = {
            enableSEO: true,
            enableAnalytics: true,
            enableNavigation: true,
            enablePerformance: true,
            enableChecks: true, // Checks de déploiement
            debug: false
        };
    }

    // === INITIALISATION COMPLÈTE ===
    async init(pageKey = 'home', options = {}) {
        if (this.initialized) {
            console.warn('⚠️ Orchestrator already initialized');
            return;
        }

        console.log('🚀 Initializing Site Orchestrator...');
        this.pageKey = pageKey;
        this.config = { ...this.config, ...options };

        try {
            // 1. SEO (priorité haute - avant render)
            if (this.config.enableSEO) {
                this.initSEO();
            }

            // 2. Analytics (dès que possible)
            if (this.config.enableAnalytics) {
                this.initAnalytics();
            }

            // 3. Navigation (après DOM ready)
            if (this.config.enableNavigation) {
                this.initNavigation();
            }

            // 4. Performance (après page load)
            if (this.config.enablePerformance) {
                await this.initPerformance();
            }

            // 5. Checks de déploiement (si activé)
            if (this.config.enableChecks && this.config.debug) {
                await this.runDeploymentChecks();
            }

            this.initialized = true;
            console.log('✅ Site Orchestrator initialized successfully');

            // Event pour confirmer init
            this.dispatchInitEvent();

        } catch (error) {
            console.error('❌ Orchestrator initialization failed:', error);
        }
    }

    // === INITIALISATION SEO ===
    initSEO() {
        console.log('🔍 Initializing SEO...');

        try {
            // Injecter meta tags selon la page
            injectSEO(this.pageKey);

            // Injecter structured data
            injectStructuredData('organization');
            injectStructuredData('localBusiness');

            // Breadcrumbs (si pas homepage)
            if (this.pageKey !== 'home') {
                const breadcrumbItems = this.getBreadcrumbItems();
                if (breadcrumbItems.length > 0) {
                    injectStructuredData('breadcrumb', breadcrumbItems);
                }
            }

            console.log('✅ SEO initialized');
        } catch (error) {
            console.error('❌ SEO initialization failed:', error);
        }
    }

    getBreadcrumbItems() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s);

        const map = {
            'services': { name: 'Services', url: '/services' },
            'contact': { name: 'Contact', url: '/contact' },
            'a-propos': { name: 'À Propos', url: '/a-propos' },
            'obtenir-un-devis': { name: 'Devis Gratuit', url: '/obtenir-un-devis' }
        };

        const items = [{ name: 'Accueil', url: '/' }];

        segments.forEach(segment => {
            if (map[segment]) {
                items.push(map[segment]);
            }
        });

        return items;
    }

    // === INITIALISATION ANALYTICS ===
    initAnalytics() {
        console.log('📊 Initializing Analytics...');

        try {
            // Initialiser GA4
            analytics.init();

            // Track page view
            analytics.trackEvent('page_view', {
                page_path: window.location.pathname,
                page_title: document.title,
                referrer: document.referrer
            });

            // Setup event listeners globaux
            this.setupGlobalAnalytics();

            console.log('✅ Analytics initialized');
        } catch (error) {
            console.error('❌ Analytics initialization failed:', error);
        }
    }

    setupGlobalAnalytics() {
        // Track tous les clics CTA
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;

            // CTA buttons
            if (target.href && (
                target.href.includes('devis') ||
                target.href.includes('contact') ||
                target.classList.contains('cta') ||
                target.dataset.cta
            )) {
                analytics.trackCTA(
                    target.textContent.trim(),
                    target.dataset.location || window.location.pathname
                );
            }

            // Phone clicks
            if (target.href && target.href.startsWith('tel:')) {
                analytics.trackPhoneClick(
                    target.href.replace('tel:', ''),
                    target.dataset.location || 'unknown'
                );
            }

            // Email clicks
            if (target.href && target.href.startsWith('mailto:')) {
                analytics.trackEvent('email_click', {
                    location: window.location.pathname
                });
            }
        });

        // Track form interactions
        document.addEventListener('focus', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                const form = e.target.closest('form');
                if (form && !form.dataset.tracked) {
                    const formType = form.id || form.name || 'unknown';
                    analytics.trackFormStart(formType);
                    form.dataset.tracked = 'true';
                }
            }
        }, true);

        // Track form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName === 'FORM') {
                const formType = form.id || form.name || 'unknown';
                const formData = this.getFormData(form);
                analytics.trackFormSubmit(formType, formData);
            }
        });
    }

    getFormData(form) {
        const data = {};
        const elements = form.elements;

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.name && element.value && element.type !== 'password') {
                data[element.name] = element.value;
            }
        }

        return data;
    }

    // === INITIALISATION NAVIGATION ===
    initNavigation() {
        console.log('🧭 Initializing Navigation...');

        try {
            // Attendre DOM ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    navigationSystem.init();
                });
            } else {
                navigationSystem.init();
            }

            console.log('✅ Navigation initialized');
        } catch (error) {
            console.error('❌ Navigation initialization failed:', error);
        }
    }

    // === INITIALISATION PERFORMANCE ===
    async initPerformance() {
        console.log('⚡ Initializing Performance...');

        try {
            // Attendre page load
            if (document.readyState === 'complete') {
                performanceOptimizer.init();
            } else {
                window.addEventListener('load', () => {
                    performanceOptimizer.init();
                });
            }

            console.log('✅ Performance initialized');
        } catch (error) {
            console.error('❌ Performance initialization failed:', error);
        }
    }

    // === CHECKS DÉPLOIEMENT ===
    async runDeploymentChecks() {
        console.log('🔍 Running deployment checks...');

        try {
            // Attendre un peu que tout soit chargé
            setTimeout(async () => {
                const report = await deploymentChecker.runAll();

                // Log résumé
                console.log(`\n📋 Deployment Status: ${report.status}`);
                console.log(`✅ Passed: ${report.summary.passed}`);
                console.log(`❌ Failed: ${report.summary.failed}`);
                console.log(`⚠️  Warnings: ${report.summary.warnings}`);

                // Sauvegarder rapport en localStorage (debug)
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('lastDeploymentCheck', JSON.stringify(report));
                }

                return report;
            }, 2000);

        } catch (error) {
            console.error('❌ Deployment checks failed:', error);
        }
    }

    // === EVENT CUSTOM ===
    dispatchInitEvent() {
        const event = new CustomEvent('orchestrator:initialized', {
            detail: {
                pageKey: this.pageKey,
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
    }

    // === HELPERS PUBLICS ===

    // Track conversion personnalisée
    trackConversion(conversionType, value = null, metadata = {}) {
        analytics.trackEvent(conversionType, {
            ...metadata,
            value: value,
            timestamp: new Date().toISOString()
        });
    }

    // Update page (SPA)
    updatePage(newPageKey) {
        this.pageKey = newPageKey;

        // Re-injecter SEO
        if (this.config.enableSEO) {
            injectSEO(newPageKey);
        }

        // Track page view
        if (this.config.enableAnalytics) {
            analytics.trackEvent('page_view', {
                page_path: window.location.pathname,
                page_title: document.title
            });
        }
    }

    // Get performance metrics
    getPerformanceMetrics() {
        return performanceOptimizer.getPerformanceMetrics();
    }

    // Generate performance report
    generatePerformanceReport() {
        return performanceOptimizer.generatePerformanceReport();
    }

    // Get deployment check results
    getLastDeploymentCheck() {
        if (typeof localStorage !== 'undefined') {
            const report = localStorage.getItem('lastDeploymentCheck');
            return report ? JSON.parse(report) : null;
        }
        return null;
    }
}

// === INSTANCE GLOBALE ===
export const orchestrator = new SiteOrchestrator();

// === FONCTION D'INITIALISATION RAPIDE ===
export function initForzaSite(pageKey = 'home', options = {}) {
    return orchestrator.init(pageKey, options);
}

// Export par défaut
export default orchestrator;
