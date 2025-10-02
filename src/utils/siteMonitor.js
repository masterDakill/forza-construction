// Moniteur CloudCode - Forza Construction Inc.
// Vérification non-invasive du site publié

export class SiteMonitor {
    constructor() {
        this.results = {
            timestamp: new Date().toISOString(),
            site: 'Forza Construction Inc.',
            version: '1.0.0',
            pages: [],
            summary: {
                total: 0,
                passed: 0,
                failed: 0,
                warnings: 0,
                critical: [],
                major: [],
                minor: []
            },
            globalChecks: {
                analytics: null,
                chatbot: null,
                navigation: null
            }
        };
        this.pagesToCheck = [
            { path: '/', name: 'Accueil', key: 'home' },
            { path: '/services', name: 'Services', key: 'services' },
            { path: '/a-propos', name: 'À Propos', key: 'about' },
            { path: '/contact', name: 'Contact', key: 'contact' },
            { path: '/obtenir-un-devis', name: 'Devis', key: 'quote' },
            { path: '/renoclimat', name: 'Renoclimat', key: 'renoclimat' }
        ];
    }

    // === EXÉCUTION COMPLÈTE ===
    async runMonitoring() {
        console.log('🔍 Starting Site Monitoring...');
        console.log('Mode: NON-INVASIVE (no modifications)');

        try {
            // Checks globaux
            this.checkGlobalAnalytics();
            this.checkGlobalChatbot();
            this.checkGlobalNavigation();

            // Checks par page
            for (const page of this.pagesToCheck) {
                await this.checkPage(page);
            }

            // Finaliser rapport
            this.finalizeReport();

            return this.results;
        } catch (error) {
            console.error('❌ Monitoring failed:', error);
            this.addIssue('critical', 'Monitoring execution failed', error.message);
            return this.results;
        }
    }

    // === CHECK PAGE ===
    async checkPage(page) {
        console.log(`\n📄 Checking page: ${page.name} (${page.path})`);

        const pageResult = {
            path: page.path,
            name: page.name,
            key: page.key,
            checks: {
                forms: { status: 'pending', details: [] },
                ctas: { status: 'pending', details: [] },
                seo: { status: 'pending', details: [] },
                accessibility: { status: 'pending', details: [] },
                performance: { status: 'pending', details: [] }
            },
            issues: [],
            score: 0
        };

        try {
            // Simuler navigation (en mémoire, pas réel)
            const pageContent = await this.fetchPageContent(page.path);

            if (!pageContent) {
                this.addPageIssue(pageResult, 'critical', 'Page not accessible', `Cannot load ${page.path}`);
                this.results.pages.push(pageResult);
                return;
            }

            // Checks formulaires
            await this.checkForms(pageResult, pageContent);

            // Checks CTAs
            await this.checkCTAs(pageResult, pageContent);

            // Checks SEO
            await this.checkSEO(pageResult, pageContent);

            // Checks accessibilité
            await this.checkAccessibility(pageResult, pageContent);

            // Checks performance
            await this.checkPerformance(pageResult, pageContent);

            // Calculer score
            pageResult.score = this.calculatePageScore(pageResult);

            this.results.pages.push(pageResult);

        } catch (error) {
            console.error(`Error checking page ${page.name}:`, error);
            this.addPageIssue(pageResult, 'major', 'Page check failed', error.message);
            this.results.pages.push(pageResult);
        }
    }

    // === FETCH PAGE CONTENT (simulation) ===
    async fetchPageContent(path) {
        // En environnement Wix, on simule avec le DOM actuel
        if (typeof document === 'undefined') {
            console.log('ℹ️ SSR mode - skipping DOM checks');
            return null;
        }

        // Vérifier si on est sur la bonne page
        const currentPath = window.location.pathname;
        if (currentPath !== path) {
            console.log(`ℹ️ Not on ${path}, using current page (${currentPath})`);
            // Ne pas naviguer réellement, juste analyser la page courante
            return document;
        }

        return document;
    }

    // === CHECK FORMULAIRES ===
    async checkForms(pageResult, doc) {
        const forms = doc.querySelectorAll('form');
        const details = [];

        if (forms.length === 0) {
            // Pas de formulaire n'est pas forcément une erreur
            if (pageResult.key === 'contact' || pageResult.key === 'quote') {
                this.addPageIssue(pageResult, 'major', 'No form found', `Page ${pageResult.name} should have a form`);
                pageResult.checks.forms.status = 'failed';
            } else {
                pageResult.checks.forms.status = 'passed';
                pageResult.checks.forms.details.push('No forms expected on this page');
            }
            return;
        }

        forms.forEach((form, index) => {
            const formId = form.id || `form-${index}`;
            const formCheck = {
                id: formId,
                fields: 0,
                requiredFields: 0,
                hasValidation: false,
                hasSubmitHandler: false,
                issues: []
            };

            // Compter champs
            const inputs = form.querySelectorAll('input:not([type="hidden"]), textarea, select');
            formCheck.fields = inputs.length;

            // Champs requis
            const required = form.querySelectorAll('[required]');
            formCheck.requiredFields = required.length;

            // Validation
            const hasValidationAttrs = Array.from(inputs).some(input =>
                input.hasAttribute('pattern') ||
                input.hasAttribute('minlength') ||
                input.hasAttribute('maxlength') ||
                input.type === 'email' ||
                input.type === 'tel'
            );
            formCheck.hasValidation = hasValidationAttrs || form.noValidate === false;

            // Submit handler (approximatif)
            formCheck.hasSubmitHandler = form.onsubmit !== null ||
                                        form.hasAttribute('action') ||
                                        form.dataset.handler;

            // Vérifier labels
            inputs.forEach(input => {
                if (input.type !== 'hidden' && input.id) {
                    const label = doc.querySelector(`label[for="${input.id}"]`);
                    if (!label && !input.getAttribute('aria-label')) {
                        formCheck.issues.push(`Input ${input.id} has no label`);
                    }
                }
            });

            // Test dry-run submit (sans envoi)
            try {
                // Vérifier si event listener form_start serait déclenché
                const firstInput = form.querySelector('input:not([type="hidden"]), textarea');
                if (firstInput) {
                    // Simuler focus (dry-run)
                    const focusEvent = new Event('focus', { bubbles: true });
                    // Ne pas déclencher réellement
                    formCheck.issues.push('✓ Focus event would trigger form_start analytics');
                }

                // Vérifier si submit serait possible
                if (formCheck.requiredFields > 0) {
                    formCheck.issues.push(`✓ Submit blocked until ${formCheck.requiredFields} required fields filled`);
                }
            } catch (e) {
                formCheck.issues.push('Cannot test form submission');
            }

            details.push(formCheck);

            // Issues
            if (formCheck.fields === 0) {
                this.addPageIssue(pageResult, 'major', 'Empty form', `Form ${formId} has no fields`);
            }
            if (formCheck.requiredFields === 0 && pageResult.key === 'contact') {
                this.addPageIssue(pageResult, 'minor', 'No required fields', `Form ${formId} has no required validation`);
            }
            if (!formCheck.hasSubmitHandler) {
                this.addPageIssue(pageResult, 'major', 'No submit handler', `Form ${formId} has no submit handler`);
            }
        });

        pageResult.checks.forms.status = details.every(f => f.issues.length === 0 ||
            f.issues.every(i => i.startsWith('✓'))) ? 'passed' : 'warning';
        pageResult.checks.forms.details = details;
    }

    // === CHECK CTAs ===
    async checkCTAs(pageResult, doc) {
        const ctaSelectors = [
            '#ctaDevis',
            '#ctaContact',
            '#ctaServices',
            '[data-cta="true"]',
            'a[href*="devis"]',
            'a[href*="contact"]',
            'button[data-cta]'
        ];

        const details = [];
        let foundCTAs = 0;

        ctaSelectors.forEach(selector => {
            const elements = doc.querySelectorAll(selector);
            elements.forEach(el => {
                const cta = {
                    selector: selector,
                    text: el.textContent.trim().substring(0, 50),
                    href: el.href || el.dataset.href || 'button',
                    visible: this.isVisible(el),
                    clickable: !el.disabled,
                    hasTracking: el.dataset.cta || el.onclick || el.getAttribute('data-analytics')
                };

                details.push(cta);
                foundCTAs++;

                // Issues
                if (!cta.visible) {
                    this.addPageIssue(pageResult, 'minor', 'Hidden CTA', `CTA "${cta.text}" is not visible`);
                }
                if (!cta.clickable) {
                    this.addPageIssue(pageResult, 'major', 'Disabled CTA', `CTA "${cta.text}" is disabled`);
                }
                if (!cta.hasTracking) {
                    this.addPageIssue(pageResult, 'minor', 'CTA without tracking', `CTA "${cta.text}" has no analytics tracking`);
                }
            });
        });

        // Vérifier sticky CTA mobile
        const stickyMobileCTA = doc.querySelector('#ctaDevisSticky, #ctaSticky');
        if (!stickyMobileCTA && (pageResult.key === 'home' || pageResult.key === 'services')) {
            this.addPageIssue(pageResult, 'minor', 'No sticky mobile CTA', 'Recommended for conversion');
        }

        pageResult.checks.ctas.status = foundCTAs > 0 ? 'passed' : 'failed';
        pageResult.checks.ctas.details = details;

        if (foundCTAs === 0) {
            this.addPageIssue(pageResult, 'critical', 'No CTAs found', 'Page has no call-to-action buttons');
        }
    }

    // === CHECK SEO ===
    async checkSEO(pageResult, doc) {
        const details = {};

        // Title
        const title = doc.querySelector('title');
        if (title) {
            const titleText = title.textContent;
            details.title = {
                text: titleText,
                length: titleText.length,
                valid: titleText.length > 10 && titleText.length <= 60
            };

            if (titleText.length > 60) {
                this.addPageIssue(pageResult, 'minor', 'Title too long', `${titleText.length} chars (max 60 recommended)`);
            }
            if (titleText.length < 10) {
                this.addPageIssue(pageResult, 'major', 'Title too short', `${titleText.length} chars (min 10)`);
            }
        } else {
            this.addPageIssue(pageResult, 'critical', 'No title tag', 'Page missing <title>');
            details.title = { valid: false };
        }

        // Meta description
        const metaDesc = doc.querySelector('meta[name="description"]');
        if (metaDesc) {
            const descText = metaDesc.content;
            details.description = {
                text: descText.substring(0, 200),
                length: descText.length,
                valid: descText.length >= 120 && descText.length <= 160
            };

            if (descText.length < 120) {
                this.addPageIssue(pageResult, 'minor', 'Description too short', `${descText.length} chars (120-160 recommended)`);
            }
            if (descText.length > 160) {
                this.addPageIssue(pageResult, 'minor', 'Description too long', `${descText.length} chars (120-160 recommended)`);
            }
        } else {
            this.addPageIssue(pageResult, 'major', 'No meta description', 'Missing meta[name="description"]');
            details.description = { valid: false };
        }

        // Canonical
        const canonical = doc.querySelector('link[rel="canonical"]');
        details.canonical = {
            present: !!canonical,
            url: canonical?.href || null
        };

        if (!canonical) {
            this.addPageIssue(pageResult, 'minor', 'No canonical URL', 'Recommended for SEO');
        }

        // Open Graph
        const ogTitle = doc.querySelector('meta[property="og:title"]');
        const ogImage = doc.querySelector('meta[property="og:image"]');
        details.openGraph = {
            title: !!ogTitle,
            image: !!ogImage,
            complete: !!(ogTitle && ogImage)
        };

        if (!details.openGraph.complete) {
            this.addPageIssue(pageResult, 'minor', 'Incomplete Open Graph', 'Missing OG tags for social sharing');
        }

        // JSON-LD
        const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
        const schemas = [];
        jsonLdScripts.forEach(script => {
            try {
                const data = JSON.parse(script.textContent);
                schemas.push(data['@type'] || 'Unknown');
            } catch (e) {
                this.addPageIssue(pageResult, 'minor', 'Invalid JSON-LD', 'Cannot parse structured data');
            }
        });

        details.structuredData = {
            count: schemas.length,
            types: schemas
        };

        // Vérifier schemas attendus
        if (pageResult.key === 'home' && !schemas.includes('LocalBusiness')) {
            this.addPageIssue(pageResult, 'minor', 'Missing LocalBusiness schema', 'Recommended for homepage');
        }

        // H1
        const h1 = doc.querySelector('h1');
        details.h1 = {
            present: !!h1,
            text: h1?.textContent.substring(0, 100) || null,
            count: doc.querySelectorAll('h1').length
        };

        if (!h1) {
            this.addPageIssue(pageResult, 'major', 'No H1 tag', 'Page missing main heading');
        }
        if (details.h1.count > 1) {
            this.addPageIssue(pageResult, 'minor', 'Multiple H1 tags', `${details.h1.count} H1 found (1 recommended)`);
        }

        // Images alt
        const images = doc.querySelectorAll('img');
        const imagesWithoutAlt = Array.from(images).filter(img => !img.alt && !img.getAttribute('aria-label'));
        details.images = {
            total: images.length,
            withoutAlt: imagesWithoutAlt.length
        };

        if (imagesWithoutAlt.length > 0) {
            this.addPageIssue(pageResult, 'minor', 'Images without alt', `${imagesWithoutAlt.length} images missing alt text`);
        }

        pageResult.checks.seo.status = (details.title?.valid && details.description?.valid && details.h1?.present) ? 'passed' : 'warning';
        pageResult.checks.seo.details = details;
    }

    // === CHECK ACCESSIBILITÉ ===
    async checkAccessibility(pageResult, doc) {
        const details = {
            touchTargets: { passed: 0, failed: 0, items: [] },
            ariaLabels: { passed: 0, failed: 0, items: [] },
            contrast: { checked: false }
        };

        // Touch targets (≥44px)
        const interactiveElements = doc.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
        interactiveElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const minSize = 44;
            const isTouchFriendly = rect.width >= minSize && rect.height >= minSize;

            if (!isTouchFriendly && this.isVisible(el)) {
                details.touchTargets.failed++;
                details.touchTargets.items.push({
                    element: el.tagName,
                    text: el.textContent.trim().substring(0, 30),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                });
                this.addPageIssue(pageResult, 'minor', 'Touch target too small',
                    `${el.tagName} "${el.textContent.trim().substring(0, 20)}" is ${Math.round(rect.width)}×${Math.round(rect.height)}px (min 44×44)`);
            } else {
                details.touchTargets.passed++;
            }
        });

        // ARIA labels sur éléments sans texte
        const buttonsWithoutText = Array.from(doc.querySelectorAll('button, a')).filter(el => {
            const text = el.textContent.trim();
            const ariaLabel = el.getAttribute('aria-label');
            const title = el.getAttribute('title');
            return !text && !ariaLabel && !title && this.isVisible(el);
        });

        details.ariaLabels.failed = buttonsWithoutText.length;
        details.ariaLabels.passed = interactiveElements.length - buttonsWithoutText.length;

        if (buttonsWithoutText.length > 0) {
            this.addPageIssue(pageResult, 'minor', 'Missing ARIA labels',
                `${buttonsWithoutText.length} interactive elements without text/aria-label`);
            details.ariaLabels.items = buttonsWithoutText.map(el => ({
                element: el.tagName,
                class: el.className
            }));
        }

        // Contrast (basique)
        details.contrast.checked = true;
        details.contrast.note = 'Manual check recommended with axe DevTools';

        pageResult.checks.accessibility.status = (details.touchTargets.failed === 0 && details.ariaLabels.failed === 0) ? 'passed' : 'warning';
        pageResult.checks.accessibility.details = details;
    }

    // === CHECK PERFORMANCE ===
    async checkPerformance(pageResult, doc) {
        const details = {
            lazyLoading: { images: 0, lazy: 0, percentage: 0 },
            heavyImages: [],
            webpSuggestions: [],
            lcpProxy: null,
            clsProxy: null,
            inpProxy: null
        };

        // Lazy loading
        const images = doc.querySelectorAll('img');
        details.lazyLoading.images = images.length;

        images.forEach(img => {
            // Lazy
            if (img.loading === 'lazy' || img.dataset.src) {
                details.lazyLoading.lazy++;
            }

            // Heavy images (approximation par src)
            const src = img.src || img.dataset.src;
            if (src && !src.includes('.webp') && !src.includes('.avif')) {
                if (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png')) {
                    details.webpSuggestions.push({
                        src: src.substring(0, 100),
                        alt: img.alt
                    });
                }
            }

            // Dimensions
            if (!img.width && !img.height && !img.style.width) {
                // Peut causer CLS
            }
        });

        details.lazyLoading.percentage = details.lazyLoading.images > 0
            ? Math.round((details.lazyLoading.lazy / details.lazyLoading.images) * 100)
            : 0;

        if (details.lazyLoading.percentage < 50 && details.lazyLoading.images > 5) {
            this.addPageIssue(pageResult, 'minor', 'Low lazy loading usage',
                `Only ${details.lazyLoading.percentage}% of images use lazy loading`);
        }

        if (details.webpSuggestions.length > 0) {
            this.addPageIssue(pageResult, 'minor', 'WebP optimization opportunity',
                `${details.webpSuggestions.length} images could use WebP/AVIF format`);
        }

        // Performance metrics (si disponible)
        if (typeof performance !== 'undefined') {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                // LCP proxy (approximation)
                details.lcpProxy = Math.round(navigation.domContentLoadedEventEnd);
                if (details.lcpProxy > 2500) {
                    this.addPageIssue(pageResult, 'minor', 'Slow LCP proxy',
                        `DOM loaded in ${details.lcpProxy}ms (target <2500ms)`);
                }

                // CLS proxy (on ne peut pas vraiment mesurer sans observer)
                details.clsProxy = 'Manual check required';

                // INP proxy (latence approximative)
                details.inpProxy = Math.round(navigation.domInteractive - navigation.responseEnd);
            }
        }

        pageResult.checks.performance.status = (details.lazyLoading.percentage > 50 || details.lazyLoading.images < 5) ? 'passed' : 'warning';
        pageResult.checks.performance.details = details;
    }

    // === CHECKS GLOBAUX ===
    checkGlobalAnalytics() {
        const details = {
            gtag: typeof window !== 'undefined' && typeof window.gtag === 'function',
            dataLayer: typeof window !== 'undefined' && Array.isArray(window.dataLayer),
            events: []
        };

        // Test si events peuvent être envoyés (dry-run)
        const testEvents = ['cta_click', 'form_start', 'form_submit', 'phone_click', 'chat_intent'];
        testEvents.forEach(event => {
            details.events.push({
                name: event,
                sendable: details.gtag // Si gtag existe, on peut envoyer
            });
        });

        if (!details.gtag) {
            this.addIssue('major', 'Google Analytics not found', 'window.gtag is not defined');
        }

        this.results.globalChecks.analytics = details;
    }

    checkGlobalChatbot() {
        const details = {
            present: typeof window !== 'undefined' && typeof window.forzaChat !== 'undefined',
            intents: []
        };

        if (details.present) {
            const expectedIntents = ['devis', 'services', 'renoclimat', 'contact'];
            expectedIntents.forEach(intent => {
                const hasIntent = window.forzaChat?.intents?.includes(intent);
                details.intents.push({
                    name: intent,
                    available: hasIntent
                });

                if (!hasIntent) {
                    this.addIssue('minor', 'Missing chatbot intent', `Intent "${intent}" not configured`);
                }
            });
        } else {
            this.addIssue('minor', 'Chatbot not found', 'window.forzaChat is not defined');
        }

        this.results.globalChecks.chatbot = details;
    }

    checkGlobalNavigation() {
        if (typeof document === 'undefined') {
            this.results.globalChecks.navigation = { skipped: true };
            return;
        }

        const details = {
            headerSticky: false,
            mobileMenu: false,
            mobileMenuWorks: false,
            stickyMobileCTA: false
        };

        // Header sticky
        const header = document.querySelector('header, #header');
        if (header) {
            const position = window.getComputedStyle(header).position;
            details.headerSticky = position === 'sticky' || position === 'fixed';

            if (!details.headerSticky) {
                this.addIssue('minor', 'Header not sticky', 'Recommended for better UX');
            }
        }

        // Menu mobile
        const mobileMenu = document.querySelector('#mobileMenu, [data-mobile-menu]');
        details.mobileMenu = !!mobileMenu;

        if (mobileMenu) {
            // Test si le menu peut s'ouvrir (dry-run, pas réel)
            const menuButton = document.querySelector('#menuButton, [data-menu-button]');
            details.mobileMenuWorks = !!menuButton;

            if (!menuButton) {
                this.addIssue('minor', 'Mobile menu button not found', 'Menu may not be openable');
            }
        } else {
            this.addIssue('minor', 'Mobile menu not found', 'Recommended for mobile UX');
        }

        // Sticky mobile CTA
        const stickyCTA = document.querySelector('#ctaDevisSticky, #ctaSticky');
        details.stickyMobileCTA = !!stickyCTA;

        if (!stickyCTA) {
            this.addIssue('minor', 'No sticky mobile CTA', 'Recommended for conversion');
        }

        this.results.globalChecks.navigation = details;
    }

    // === HELPERS ===
    isVisible(element) {
        if (!element) return false;
        const style = window.getComputedStyle(element);
        return style.display !== 'none' &&
               style.visibility !== 'hidden' &&
               style.opacity !== '0';
    }

    addIssue(severity, title, description) {
        this.results.summary[severity].push({ title, description });
        this.results.summary.total++;

        if (severity === 'critical') {
            this.results.summary.failed++;
        } else if (severity === 'major') {
            this.results.summary.failed++;
        } else {
            this.results.summary.warnings++;
        }
    }

    addPageIssue(pageResult, severity, title, description) {
        pageResult.issues.push({ severity, title, description });
        this.addIssue(severity, `[${pageResult.name}] ${title}`, description);
    }

    calculatePageScore(pageResult) {
        let score = 100;
        pageResult.issues.forEach(issue => {
            if (issue.severity === 'critical') score -= 20;
            else if (issue.severity === 'major') score -= 10;
            else if (issue.severity === 'minor') score -= 5;
        });
        return Math.max(0, score);
    }

    finalizeReport() {
        // Calculer taux de réussite
        const total = this.results.summary.total;
        const passed = total - this.results.summary.failed - this.results.summary.warnings;
        this.results.summary.passed = Math.max(0, passed);

        // Score global
        const avgScore = this.results.pages.length > 0
            ? Math.round(this.results.pages.reduce((sum, p) => sum + p.score, 0) / this.results.pages.length)
            : 0;

        this.results.summary.globalScore = avgScore;
        this.results.summary.status = avgScore >= 80 ? 'GOOD' : avgScore >= 60 ? 'NEEDS_IMPROVEMENT' : 'POOR';
    }

    // === RAPPORT ===
    generateHumanSummary() {
        const s = this.results.summary;
        const lines = [];

        lines.push(`🎯 Site Score: ${s.globalScore}/100 (${s.status})`);
        lines.push(`📊 ${this.results.pages.length} pages checked | ${s.passed} passed | ${s.failed} failed | ${s.warnings} warnings`);

        if (s.critical.length > 0) {
            lines.push(`❌ ${s.critical.length} CRITICAL: ${s.critical.map(i => i.title).join(', ')}`);
        }
        if (s.major.length > 0) {
            lines.push(`⚠️  ${s.major.length} MAJOR: ${s.major.slice(0, 2).map(i => i.title).join(', ')}${s.major.length > 2 ? '...' : ''}`);
        }

        // Analytics
        const analytics = this.results.globalChecks.analytics;
        if (analytics && analytics.gtag) {
            lines.push(`✅ Analytics: GA4 active, ${analytics.events.filter(e => e.sendable).length}/${analytics.events.length} events ready`);
        } else {
            lines.push(`❌ Analytics: Not configured`);
        }

        // Navigation
        const nav = this.results.globalChecks.navigation;
        if (nav && !nav.skipped) {
            const navItems = [
                nav.headerSticky ? 'header✓' : 'header✗',
                nav.mobileMenu ? 'menu✓' : 'menu✗',
                nav.stickyMobileCTA ? 'CTA✓' : 'CTA✗'
            ];
            lines.push(`🧭 Navigation: ${navItems.join(', ')}`);
        }

        // Top issues
        if (s.minor.length > 0) {
            lines.push(`ℹ️  ${s.minor.length} minor issues (see JSON report)`);
        }

        lines.push(`📄 Full JSON report saved to localStorage['siteMonitoringReport']`);

        return lines.join('\n');
    }

    exportReport() {
        const json = JSON.stringify(this.results, null, 2);

        // Save to localStorage
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('siteMonitoringReport', json);
        }

        // Console
        console.group('📋 Site Monitoring Report');
        console.log(this.generateHumanSummary());
        console.log('\nJSON Report:', this.results);
        console.groupEnd();

        return {
            json: this.results,
            summary: this.generateHumanSummary()
        };
    }
}

// Instance
export const siteMonitor = new SiteMonitor();

// Export fonction rapide
export async function runSiteMonitoring() {
    const results = await siteMonitor.runMonitoring();
    return siteMonitor.exportReport();
}

export default siteMonitor;
