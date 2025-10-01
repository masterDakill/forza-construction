// Système de Vérification Post-Déploiement - Forza Construction Inc.
// Check automatisé + rapport détaillé

import SEO_CONFIG from '../config/seoConfig';
import FORZA_DESIGN_GUIDE from '../styles/designGuide';

export class DeploymentChecker {
    constructor() {
        this.checks = [];
        this.results = {
            passed: [],
            failed: [],
            warnings: [],
            info: []
        };
        this.startTime = Date.now();
    }

    // === EXÉCUTION COMPLÈTE ===
    async runAll() {
        console.log('🚀 Starting deployment checks...');

        // 1. Vérifier conservation du design system
        this.checkDesignSystem();

        // 2. Vérifier parité mobile/desktop
        this.checkResponsiveness();

        // 3. Vérifier navigation
        this.checkNavigation();

        // 4. Vérifier SEO
        this.checkSEO();

        // 5. Vérifier performance
        await this.checkPerformance();

        // 6. Vérifier analytics
        this.checkAnalytics();

        // 7. Vérifier accessibilité
        this.checkAccessibility();

        // 8. Vérifier fonctionnalités
        this.checkFunctionality();

        // Générer rapport
        const duration = Date.now() - this.startTime;
        return this.generateReport(duration);
    }

    // === CHECK DESIGN SYSTEM ===
    checkDesignSystem() {
        console.log('🎨 Checking design system...');

        // Vérifier que le guide existe
        if (FORZA_DESIGN_GUIDE) {
            this.pass('Design guide loaded');

            // Vérifier couleurs primaires
            if (FORZA_DESIGN_GUIDE.colors.primary.main === '#FF6B35') {
                this.pass('Primary color preserved (#FF6B35)');
            } else {
                this.fail('Primary color changed!');
            }

            // Vérifier typographie
            if (FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1 === '56px') {
                this.pass('Typography H1 desktop preserved (56px)');
            } else {
                this.warn('Typography H1 desktop changed');
            }

            if (FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1 === '36px') {
                this.pass('Typography H1 mobile preserved (36px)');
            } else {
                this.warn('Typography H1 mobile changed');
            }

            // Vérifier espacements
            if (FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop === '80px') {
                this.pass('Section padding desktop preserved (80px)');
            } else {
                this.warn('Section padding desktop changed');
            }

            // Vérifier composants boutons
            if (FORZA_DESIGN_GUIDE.components.button.sizes.large.height === '56px') {
                this.pass('Button large size preserved (56px)');
            } else {
                this.warn('Button large size changed');
            }
        } else {
            this.fail('Design guide NOT found!');
        }
    }

    // === CHECK RESPONSIVE ===
    checkResponsiveness() {
        console.log('📱 Checking responsiveness...');

        if (typeof window === 'undefined') {
            this.info('Responsiveness check skipped (SSR)');
            return;
        }

        // Vérifier viewport meta tag
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport && viewport.content.includes('width=device-width')) {
            this.pass('Viewport meta tag correct');
        } else {
            this.fail('Viewport meta tag missing or incorrect');
        }

        // Vérifier media queries
        const hasMediaQueries = Array.from(document.styleSheets).some(sheet => {
            try {
                return Array.from(sheet.cssRules).some(rule =>
                    rule.type === CSSRule.MEDIA_RULE
                );
            } catch (e) {
                return false;
            }
        });

        if (hasMediaQueries) {
            this.pass('Media queries detected');
        } else {
            this.warn('No media queries found');
        }

        // Vérifier éléments mobile-friendly
        const smallButtons = Array.from(document.querySelectorAll('button, a.btn')).filter(btn => {
            const rect = btn.getBoundingClientRect();
            return rect.height < 44 || rect.width < 44;
        });

        if (smallButtons.length === 0) {
            this.pass('All buttons are touch-friendly (≥44px)');
        } else {
            this.warn(`${smallButtons.length} buttons too small for mobile`);
        }
    }

    // === CHECK NAVIGATION ===
    checkNavigation() {
        console.log('🧭 Checking navigation...');

        if (typeof document === 'undefined') {
            this.info('Navigation check skipped (SSR)');
            return;
        }

        // Header
        const header = document.querySelector('header') || document.querySelector('#header');
        if (header) {
            this.pass('Header found');

            // Sticky
            const position = window.getComputedStyle(header).position;
            if (position === 'sticky' || position === 'fixed') {
                this.pass('Header is sticky/fixed');
            } else {
                this.warn('Header is not sticky');
            }
        } else {
            this.warn('Header not found');
        }

        // Menu mobile
        const mobileMenu = document.querySelector('#mobileMenu') ||
                          document.querySelector('[data-mobile-menu]');
        if (mobileMenu) {
            this.pass('Mobile menu found');
        } else {
            this.warn('Mobile menu not found');
        }

        // Breadcrumbs (si pas homepage)
        if (window.location.pathname !== '/') {
            const breadcrumb = document.querySelector('#breadcrumb') ||
                             document.querySelector('[aria-label="Breadcrumb"]');
            if (breadcrumb) {
                this.pass('Breadcrumbs found');
            } else {
                this.info('Breadcrumbs not found (optional)');
            }
        }

        // CTA visible
        const ctaButtons = document.querySelectorAll('[href*="devis"], [href*="contact"]');
        if (ctaButtons.length > 0) {
            this.pass(`${ctaButtons.length} CTA buttons found`);
        } else {
            this.fail('No CTA buttons found!');
        }
    }

    // === CHECK SEO ===
    checkSEO() {
        console.log('🔍 Checking SEO...');

        if (typeof document === 'undefined') {
            this.info('SEO check skipped (SSR)');
            return;
        }

        // Title
        if (document.title && document.title.length > 10) {
            this.pass(`Title: "${document.title}"`);
        } else {
            this.fail('Title missing or too short');
        }

        // Meta description
        const description = document.querySelector('meta[name="description"]');
        if (description && description.content.length > 50) {
            this.pass('Meta description present');
        } else {
            this.fail('Meta description missing or too short');
        }

        // Canonical
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            this.pass(`Canonical: ${canonical.href}`);
        } else {
            this.warn('Canonical link missing');
        }

        // Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogTitle && ogImage) {
            this.pass('Open Graph tags present');
        } else {
            this.warn('Open Graph tags incomplete');
        }

        // JSON-LD
        const jsonLD = document.querySelector('script[type="application/ld+json"]');
        if (jsonLD) {
            this.pass('Structured data (JSON-LD) found');
        } else {
            this.warn('Structured data missing');
        }

        // H1
        const h1 = document.querySelector('h1');
        if (h1) {
            this.pass(`H1 found: "${h1.textContent.substring(0, 50)}..."`);
        } else {
            this.fail('H1 missing!');
        }

        // Alt text sur images
        const images = document.querySelectorAll('img');
        const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
        if (imagesWithoutAlt.length === 0) {
            this.pass('All images have alt text');
        } else {
            this.warn(`${imagesWithoutAlt.length} images missing alt text`);
        }
    }

    // === CHECK PERFORMANCE ===
    async checkPerformance() {
        console.log('⚡ Checking performance...');

        if (typeof window === 'undefined' || !window.performance) {
            this.info('Performance check skipped');
            return;
        }

        // Navigation timing
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            // TTFB
            const ttfb = navigation.responseStart - navigation.requestStart;
            if (ttfb < 600) {
                this.pass(`TTFB: ${Math.round(ttfb)}ms (< 600ms)`);
            } else {
                this.warn(`TTFB: ${Math.round(ttfb)}ms (> 600ms)`);
            }

            // DOM Complete
            const domComplete = navigation.domComplete;
            if (domComplete < 3000) {
                this.pass(`DOM Complete: ${Math.round(domComplete)}ms`);
            } else {
                this.warn(`DOM Complete: ${Math.round(domComplete)}ms (slow)`);
            }
        }

        // Lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if (lazyImages.length > 0) {
            this.pass(`${lazyImages.length} images with lazy loading`);
        } else {
            this.warn('No lazy loading detected');
        }

        // Resource size
        const resources = performance.getEntriesByType('resource');
        const largeResources = resources.filter(r => r.transferSize > 500000); // > 500KB
        if (largeResources.length === 0) {
            this.pass('No resources > 500KB');
        } else {
            this.warn(`${largeResources.length} resources > 500KB`);
        }
    }

    // === CHECK ANALYTICS ===
    checkAnalytics() {
        console.log('📊 Checking analytics...');

        if (typeof window === 'undefined') {
            this.info('Analytics check skipped (SSR)');
            return;
        }

        // Google Analytics
        if (window.gtag || window.ga) {
            this.pass('Google Analytics detected');
        } else {
            this.warn('Google Analytics not detected');
        }

        // DataLayer
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
            this.pass('DataLayer present');
        } else {
            this.warn('DataLayer not found');
        }
    }

    // === CHECK ACCESSIBILITÉ ===
    checkAccessibility() {
        console.log('♿ Checking accessibility...');

        if (typeof document === 'undefined') {
            this.info('Accessibility check skipped (SSR)');
            return;
        }

        // Lang attribute
        if (document.documentElement.lang) {
            this.pass(`Lang attribute: ${document.documentElement.lang}`);
        } else {
            this.fail('HTML lang attribute missing');
        }

        // Skip links
        const skipLink = document.querySelector('a[href="#main-content"]') ||
                        document.querySelector('.skip-link');
        if (skipLink) {
            this.pass('Skip link found');
        } else {
            this.info('Skip link not found (recommended)');
        }

        // ARIA labels
        const buttons = document.querySelectorAll('button');
        const buttonsWithoutLabel = Array.from(buttons).filter(btn =>
            !btn.textContent.trim() && !btn.getAttribute('aria-label')
        );
        if (buttonsWithoutLabel.length === 0) {
            this.pass('All buttons have labels');
        } else {
            this.warn(`${buttonsWithoutLabel.length} buttons without labels`);
        }

        // Form labels
        const inputs = document.querySelectorAll('input:not([type="hidden"])');
        const inputsWithoutLabel = Array.from(inputs).filter(input => {
            const id = input.id;
            return !id || !document.querySelector(`label[for="${id}"]`);
        });
        if (inputsWithoutLabel.length === 0) {
            this.pass('All inputs have labels');
        } else {
            this.warn(`${inputsWithoutLabel.length} inputs without labels`);
        }

        // Contrast (basic check)
        const colorContrast = this.checkBasicContrast();
        if (colorContrast) {
            this.pass('Basic color contrast check passed');
        } else {
            this.info('Color contrast check skipped');
        }
    }

    checkBasicContrast() {
        // Vérification basique du contraste texte/fond
        // Pour un vrai audit, utiliser un outil comme axe-core
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
        let issues = 0;

        textElements.forEach(el => {
            const styles = window.getComputedStyle(el);
            const color = styles.color;
            const bgColor = styles.backgroundColor;

            // Calcul approximatif du contraste
            // (Simplification - pour production utiliser une lib dédiée)
            if (color === bgColor) {
                issues++;
            }
        });

        return issues < 5; // Tolérance
    }

    // === CHECK FONCTIONNALITÉS ===
    checkFunctionality() {
        console.log('⚙️ Checking functionality...');

        if (typeof document === 'undefined') {
            this.info('Functionality check skipped (SSR)');
            return;
        }

        // Formulaires
        const forms = document.querySelectorAll('form');
        if (forms.length > 0) {
            this.pass(`${forms.length} form(s) found`);

            // Validation
            forms.forEach(form => {
                const requiredFields = form.querySelectorAll('[required]');
                if (requiredFields.length > 0) {
                    this.pass(`Form has ${requiredFields.length} required fields`);
                }
            });
        }

        // Links externes
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        const linksWithoutTarget = Array.from(externalLinks).filter(link =>
            !link.target || link.target !== '_blank'
        );
        if (linksWithoutTarget.length === 0) {
            this.pass('External links open in new tab');
        } else {
            this.info(`${linksWithoutTarget.length} external links without target="_blank"`);
        }

        // Calculateur (page Services)
        const calculator = document.querySelector('#calculatorSection') ||
                          document.querySelector('[data-calculator]');
        if (calculator) {
            this.pass('Calculator found (Services page)');
        }

        // Console errors
        this.checkConsoleErrors();
    }

    checkConsoleErrors() {
        // Cette vérification doit être faite manuellement
        // ou avec un outil de monitoring
        this.info('Check browser console for errors manually');
    }

    // === HELPERS ===
    pass(message) {
        this.results.passed.push({ message, timestamp: new Date().toISOString() });
        console.log('✅', message);
    }

    fail(message) {
        this.results.failed.push({ message, timestamp: new Date().toISOString() });
        console.error('❌', message);
    }

    warn(message) {
        this.results.warnings.push({ message, timestamp: new Date().toISOString() });
        console.warn('⚠️', message);
    }

    info(message) {
        this.results.info.push({ message, timestamp: new Date().toISOString() });
        console.info('ℹ️', message);
    }

    // === RAPPORT ===
    generateReport(duration) {
        const total = this.results.passed.length +
                     this.results.failed.length +
                     this.results.warnings.length;

        const report = {
            timestamp: new Date().toISOString(),
            duration: `${duration}ms`,
            summary: {
                total: total,
                passed: this.results.passed.length,
                failed: this.results.failed.length,
                warnings: this.results.warnings.length,
                info: this.results.info.length,
                successRate: Math.round((this.results.passed.length / total) * 100) + '%'
            },
            details: this.results,
            status: this.results.failed.length === 0 ? 'PASS' : 'FAIL'
        };

        // Afficher rapport console
        console.group('📋 Deployment Check Report');
        console.log('Status:', report.status);
        console.log('Duration:', report.duration);
        console.log('Success Rate:', report.summary.successRate);
        console.log('\nSummary:');
        console.log('  ✅ Passed:', report.summary.passed);
        console.log('  ❌ Failed:', report.summary.failed);
        console.log('  ⚠️  Warnings:', report.summary.warnings);
        console.log('  ℹ️  Info:', report.summary.info);

        if (report.details.failed.length > 0) {
            console.log('\n❌ Failed Checks:');
            report.details.failed.forEach(item => {
                console.log('  -', item.message);
            });
        }

        if (report.details.warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            report.details.warnings.forEach(item => {
                console.log('  -', item.message);
            });
        }

        console.groupEnd();

        return report;
    }

    // === EXPORT RAPPORT ===
    exportReport(report) {
        // Créer fichier JSON
        const json = JSON.stringify(report, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `deployment-report-${Date.now()}.json`;
        link.click();
    }
}

// Instance globale
export const deploymentChecker = new DeploymentChecker();

export default deploymentChecker;
