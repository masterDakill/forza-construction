// Système de Navigation Optimisé - Forza Construction Inc.
// Header sticky, Menu mobile, Breadcrumbs, CTA visible

import FORZA_DESIGN_GUIDE from '../styles/designGuide';

export class NavigationSystem {
    constructor() {
        this.headerSticky = false;
        this.mobileMenuOpen = false;
        this.scrollPosition = 0;
        this.lastScrollPosition = 0;
    }

    // === INITIALISATION COMPLÈTE ===
    init() {
        this.setupStickyHeader();
        this.setupMobileMenu();
        this.setupCTAVisibility();
        this.setupBreadcrumbs();
        this.setupScrollBehavior();
        console.log('✅ Navigation system initialized');
    }

    // === HEADER STICKY ===
    setupStickyHeader() {
        if (typeof window === 'undefined') return;

        const header = document.querySelector('#header') || document.querySelector('header');
        if (!header) return;

        // Style initial
        header.style.position = 'sticky';
        header.style.top = '0';
        header.style.zIndex = '1000';
        header.style.transition = 'all 0.3s ease';
        header.style.background = 'transparent';

        // Scroll listener avec optimisation
        let ticking = false;
        window.addEventListener('scroll', () => {
            this.scrollPosition = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateStickyHeader(header);
                    ticking = false;
                });
                ticking = true;
            }
        });

        console.log('✅ Sticky header enabled');
    }

    updateStickyHeader(header) {
        const scrollThreshold = 50;

        if (this.scrollPosition > scrollThreshold) {
            // Header sticky activé
            if (!this.headerSticky) {
                header.style.background = FORZA_DESIGN_GUIDE.colors.neutral.white;
                header.style.boxShadow = FORZA_DESIGN_GUIDE.effects.boxShadow.md;
                header.style.backdropFilter = 'blur(10px)';
                this.headerSticky = true;
            }

            // Auto-hide sur scroll down (optionnel)
            if (this.scrollPosition > this.lastScrollPosition && this.scrollPosition > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            // Header transparent
            if (this.headerSticky) {
                header.style.background = 'transparent';
                header.style.boxShadow = 'none';
                header.style.transform = 'translateY(0)';
                this.headerSticky = false;
            }
        }

        this.lastScrollPosition = this.scrollPosition;
    }

    // === MENU MOBILE ===
    setupMobileMenu() {
        if (typeof window === 'undefined') return;

        // Bouton hamburger
        const menuButton = document.querySelector('#menuButton') ||
                          document.querySelector('[data-menu-button]');

        const mobileMenu = document.querySelector('#mobileMenu') ||
                          document.querySelector('[data-mobile-menu]');

        if (!menuButton || !mobileMenu) {
            this.createMobileMenu();
            return;
        }

        // Style du menu mobile
        this.styleMobileMenu(mobileMenu);

        // Toggle menu
        menuButton.addEventListener('click', () => {
            this.toggleMobileMenu(mobileMenu);
        });

        // Fermer sur click outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenuOpen &&
                !mobileMenu.contains(e.target) &&
                !menuButton.contains(e.target)) {
                this.closeMobileMenu(mobileMenu);
            }
        });

        // Fermer sur ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu(mobileMenu);
            }
        });

        console.log('✅ Mobile menu enabled');
    }

    createMobileMenu() {
        // Créer le menu si n'existe pas
        const menu = document.createElement('div');
        menu.id = 'mobileMenu';
        menu.innerHTML = `
            <nav class="mobile-nav">
                <a href="/" class="mobile-nav-item">Accueil</a>
                <a href="/services" class="mobile-nav-item">Services</a>
                <a href="/a-propos" class="mobile-nav-item">À Propos</a>
                <a href="/contact" class="mobile-nav-item">Contact</a>
                <a href="/obtenir-un-devis" class="mobile-nav-cta">Devis Gratuit</a>
            </nav>
        `;
        document.body.appendChild(menu);
        this.styleMobileMenu(menu);
    }

    styleMobileMenu(menu) {
        menu.style.cssText = `
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: ${FORZA_DESIGN_GUIDE.colors.neutral.white};
            box-shadow: ${FORZA_DESIGN_GUIDE.effects.boxShadow.xl};
            transition: right 0.3s ease;
            z-index: 999;
            overflow-y: auto;
            padding: ${FORZA_DESIGN_GUIDE.spacing.xl};
        `;

        // Style des liens
        const links = menu.querySelectorAll('.mobile-nav-item');
        links.forEach(link => {
            link.style.cssText = `
                display: block;
                padding: ${FORZA_DESIGN_GUIDE.spacing.md};
                margin: ${FORZA_DESIGN_GUIDE.spacing.sm} 0;
                color: ${FORZA_DESIGN_GUIDE.colors.secondary.main};
                text-decoration: none;
                font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.body};
                font-weight: ${FORZA_DESIGN_GUIDE.typography.fontWeight.medium};
                border-radius: ${FORZA_DESIGN_GUIDE.effects.borderRadius.md};
                transition: all 0.3s ease;
            `;

            link.addEventListener('mouseenter', () => {
                link.style.background = FORZA_DESIGN_GUIDE.colors.neutral.gray[100];
                link.style.transform = 'translateX(8px)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.background = 'transparent';
                link.style.transform = 'translateX(0)';
            });
        });

        // Style CTA spécial
        const cta = menu.querySelector('.mobile-nav-cta');
        if (cta) {
            cta.style.cssText = `
                display: block;
                padding: ${FORZA_DESIGN_GUIDE.spacing.md};
                margin: ${FORZA_DESIGN_GUIDE.spacing.xl} 0;
                background: ${FORZA_DESIGN_GUIDE.colors.primary.gradient};
                color: ${FORZA_DESIGN_GUIDE.colors.neutral.white};
                text-decoration: none;
                font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.body};
                font-weight: ${FORZA_DESIGN_GUIDE.typography.fontWeight.bold};
                border-radius: ${FORZA_DESIGN_GUIDE.effects.borderRadius.lg};
                text-align: center;
                box-shadow: ${FORZA_DESIGN_GUIDE.effects.boxShadow.primary};
            `;
        }
    }

    toggleMobileMenu(menu) {
        if (this.mobileMenuOpen) {
            this.closeMobileMenu(menu);
        } else {
            this.openMobileMenu(menu);
        }
    }

    openMobileMenu(menu) {
        menu.style.right = '0';
        this.mobileMenuOpen = true;
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    closeMobileMenu(menu) {
        menu.style.right = '-100%';
        this.mobileMenuOpen = false;
        document.body.style.overflow = ''; // Restore scroll
    }

    // === CTA STICKY MOBILE ===
    setupCTAVisibility() {
        if (typeof window === 'undefined') return;
        if (window.innerWidth > 768) return; // Desktop only

        // Créer CTA sticky mobile
        const ctaSticky = document.createElement('div');
        ctaSticky.id = 'ctaSticky';
        ctaSticky.innerHTML = `
            <a href="/obtenir-un-devis" class="cta-sticky-link">
                📞 DEVIS GRATUIT
            </a>
        `;
        document.body.appendChild(ctaSticky);

        // Style
        ctaSticky.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 998;
            padding: ${FORZA_DESIGN_GUIDE.spacing.md};
            background: ${FORZA_DESIGN_GUIDE.colors.neutral.white};
            box-shadow: ${FORZA_DESIGN_GUIDE.effects.boxShadow.xl};
            transform: translateY(0);
            transition: transform 0.3s ease;
        `;

        const link = ctaSticky.querySelector('.cta-sticky-link');
        link.style.cssText = `
            display: block;
            padding: ${FORZA_DESIGN_GUIDE.spacing.md};
            background: ${FORZA_DESIGN_GUIDE.colors.primary.gradient};
            color: ${FORZA_DESIGN_GUIDE.colors.neutral.white};
            text-align: center;
            text-decoration: none;
            font-weight: ${FORZA_DESIGN_GUIDE.typography.fontWeight.bold};
            font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.body};
            border-radius: ${FORZA_DESIGN_GUIDE.effects.borderRadius.lg};
            box-shadow: ${FORZA_DESIGN_GUIDE.effects.boxShadow.primary};
        `;

        // Auto-hide on scroll down
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll && currentScroll > 100) {
                ctaSticky.style.transform = 'translateY(100%)';
            } else {
                ctaSticky.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });

        console.log('✅ CTA sticky mobile enabled');
    }

    // === BREADCRUMBS ===
    setupBreadcrumbs() {
        if (typeof window === 'undefined') return;

        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s);

        if (segments.length === 0) return; // Homepage, pas de breadcrumb

        // Créer breadcrumb
        const breadcrumbContainer = document.querySelector('#breadcrumb') ||
                                   this.createBreadcrumbContainer();

        const breadcrumbs = this.generateBreadcrumbs(segments);
        breadcrumbContainer.innerHTML = breadcrumbs;

        this.styleBreadcrumbs(breadcrumbContainer);

        console.log('✅ Breadcrumbs enabled');
    }

    createBreadcrumbContainer() {
        const container = document.createElement('nav');
        container.id = 'breadcrumb';
        container.setAttribute('aria-label', 'Breadcrumb');

        // Insérer après le header
        const header = document.querySelector('header') || document.querySelector('#header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(container, header.nextSibling);
        } else {
            document.body.insertBefore(container, document.body.firstChild);
        }

        return container;
    }

    generateBreadcrumbs(segments) {
        const breadcrumbMap = {
            'services': 'Services',
            'contact': 'Contact',
            'a-propos': 'À Propos',
            'obtenir-un-devis': 'Devis Gratuit',
            'realisations': 'Réalisations'
        };

        let html = '<ol class="breadcrumb-list">';
        html += '<li class="breadcrumb-item"><a href="/">Accueil</a></li>';

        let path = '';
        segments.forEach((segment, index) => {
            path += '/' + segment;
            const label = breadcrumbMap[segment] || segment;
            const isLast = index === segments.length - 1;

            if (isLast) {
                html += `<li class="breadcrumb-item active" aria-current="page">${label}</li>`;
            } else {
                html += `<li class="breadcrumb-item"><a href="${path}">${label}</a></li>`;
            }
        });

        html += '</ol>';
        return html;
    }

    styleBreadcrumbs(container) {
        container.style.cssText = `
            padding: ${FORZA_DESIGN_GUIDE.spacing.md} ${FORZA_DESIGN_GUIDE.spacing.xl};
            background: ${FORZA_DESIGN_GUIDE.colors.neutral.gray[50]};
            border-bottom: 1px solid ${FORZA_DESIGN_GUIDE.colors.neutral.gray[200]};
        `;

        const list = container.querySelector('.breadcrumb-list');
        if (list) {
            list.style.cssText = `
                display: flex;
                align-items: center;
                list-style: none;
                margin: 0;
                padding: 0;
                font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.desktop.small};
            `;
        }

        const items = container.querySelectorAll('.breadcrumb-item');
        items.forEach((item, index) => {
            item.style.cssText = `
                display: flex;
                align-items: center;
            `;

            if (index > 0) {
                // Ajouter séparateur
                const separator = document.createElement('span');
                separator.textContent = ' / ';
                separator.style.cssText = `
                    margin: 0 ${FORZA_DESIGN_GUIDE.spacing.sm};
                    color: ${FORZA_DESIGN_GUIDE.colors.neutral.gray[400]};
                `;
                item.insertBefore(separator, item.firstChild);
            }

            const link = item.querySelector('a');
            if (link) {
                link.style.cssText = `
                    color: ${FORZA_DESIGN_GUIDE.colors.primary.main};
                    text-decoration: none;
                    transition: color 0.3s ease;
                `;
                link.addEventListener('mouseenter', () => {
                    link.style.textDecoration = 'underline';
                });
                link.addEventListener('mouseleave', () => {
                    link.style.textDecoration = 'none';
                });
            }

            if (item.classList.contains('active')) {
                item.style.color = FORZA_DESIGN_GUIDE.colors.neutral.gray[600];
            }
        });
    }

    // === SMOOTH SCROLL ===
    setupScrollBehavior() {
        if (typeof document === 'undefined') return;

        // Smooth scroll pour tous les liens anchor
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Header height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        console.log('✅ Smooth scroll enabled');
    }

    // === SCROLL TO TOP ===
    addScrollToTop() {
        if (typeof window === 'undefined') return;

        const btn = document.createElement('button');
        btn.id = 'scrollToTop';
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', 'Retour en haut');
        document.body.appendChild(btn);

        // Style
        btn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: ${FORZA_DESIGN_GUIDE.spacing.xl};
            width: 50px;
            height: 50px;
            background: ${FORZA_DESIGN_GUIDE.colors.primary.gradient};
            color: ${FORZA_DESIGN_GUIDE.colors.neutral.white};
            border: none;
            border-radius: ${FORZA_DESIGN_GUIDE.effects.borderRadius.full};
            box-shadow: ${FORZA_DESIGN_GUIDE.effects.boxShadow.primary};
            cursor: pointer;
            font-size: 24px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 997;
        `;

        // Show/hide based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }
        });

        // Click handler
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        console.log('✅ Scroll to top button added');
    }
}

// Instance globale
export const navigationSystem = new NavigationSystem();

export default navigationSystem;
