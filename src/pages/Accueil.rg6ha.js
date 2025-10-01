// Page d'accueil ULTRA-OPTIMISÉE - Forza Construction Inc.
// Design moderne, conversion maximale, esthétique professionnelle

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixData from 'wix-data';
import { initMobileOptimizations } from './mobileOptimizations';
import { initMobileSections } from './mobileSections';
import { premiumMarketingCopy, conversionContent } from '../content/premiumMarketingCopy';
import { modernDesignSystem, designComponents, cssUtilities } from '../styles/modernDesignSystem';
import { leadManagement, analyticsManager, chatSystem, bookingSystem } from '../utils/professionalTools';
import FORZA_DESIGN_GUIDE, { generateGlobalCSS } from '../styles/designGuide';
import { initForzaSite } from '../utils/siteOrchestrator';

$w.onReady(function () {
    // === INITIALISATION PREMIUM ===
    console.log('🚀 Forza Construction - Homepage Premium Loading...');

    // 0. Initialiser orchestrateur (SEO, Analytics, Navigation, Performance)
    initForzaSite('home', {
        enableSEO: true,
        enableAnalytics: true,
        enableNavigation: true,
        enablePerformance: true,
        debug: false
    });

    // 1. Initialiser systèmes professionnels
    initializeProfessionalSystems();

    // 2. Appliquer design moderne
    applyModernDesign();

    // 3. Configurer page d'accueil optimisée
    initializeHomepage();

    // 4. Setup navigation et interactions
    setupNavigationButtons();
    setupAdvancedAnimations();

    // 5. Optimisations mobiles
    setupMobileOptimizations();

    // 6. Systèmes de conversion
    initializeConversionSystems();
    
    // === CONFIGURATION PAGE D'ACCUEIL ===
    function initializeHomepage() {
        console.log('🏠 Homepage Forza Construction Loading...');
        
        // Contenu héro optimisé
        setupHeroSection();
        
        // Services en aperçu (sans photos détaillées)
        setupServicesOverview();
        
        // Témoignages rapides
        setupQuickTestimonials();
        
        // CTA principal
        setupMainCTA();
        
        console.log('✅ Homepage optimized and loaded');
    }
    
    // === NOUVELLES FONCTIONS PREMIUM ===

    function initializeProfessionalSystems() {
        // 1. Initialiser analytics avancés
        analyticsManager.trackUserEngagement();
        analyticsManager.trackPagePerformance();

        // 2. Système de chat professionnel
        chatSystem.initializeChatWidget();

        // 3. SEO dynamique
        window.forzaProfessionalTools?.seoOptimization.optimizePageSEO({
            title: "Forza Construction - Expert en Rénovation Résidentielle au Québec",
            description: "Spécialiste en rénovation de cuisine, salle de bain et sous-sol. Devis gratuit, garantie 10 ans. Plus de 2,000 projets réalisés.",
            keywords: "rénovation Québec, cuisine sur mesure, salle de bain, entrepreneur certifié, devis gratuit"
        });

        console.log('✅ Systèmes professionnels initialisés');
    }

    function applyModernDesign() {
        // Injecter le système de design CSS COMPLET
        const style = document.createElement('style');
        style.id = 'forza-ultra-design';
        style.textContent = generateGlobalCSS();
        document.head.appendChild(style);

        const isMobile = wixWindow.viewMode === 'mobile';

        // Hero Section - Design Premium
        if ($w('#heroSection')) {
            $w('#heroSection').style.background = FORZA_DESIGN_GUIDE.colors.secondary.gradient;
            $w('#heroSection').style.padding = isMobile ?
                `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`;
            $w('#heroSection').style.position = 'relative';
            $w('#heroSection').style.overflow = 'hidden';
        }

        // Titre Hero - Taille optimale
        if ($w('#textHeroTitle')) {
            $w('#textHeroTitle').style.fontSize = isMobile ?
                FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1 :
                FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1;
            $w('#textHeroTitle').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.bold;
            $w('#textHeroTitle').style.lineHeight = FORZA_DESIGN_GUIDE.typography.lineHeight.tight;
            $w('#textHeroTitle').style.color = FORZA_DESIGN_GUIDE.colors.neutral.white;
            $w('#textHeroTitle').style.marginBottom = FORZA_DESIGN_GUIDE.spacing.lg;
        }

        // Sous-titre Hero
        if ($w('#textHeroSubtitle')) {
            $w('#textHeroSubtitle').style.fontSize = isMobile ?
                FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h4 :
                FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h4;
            $w('#textHeroSubtitle').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.medium;
            $w('#textHeroSubtitle').style.color = FORZA_DESIGN_GUIDE.colors.neutral.gray[200];
            $w('#textHeroSubtitle').style.lineHeight = FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed;
            $w('#textHeroSubtitle').style.marginBottom = FORZA_DESIGN_GUIDE.spacing.xl;
        }

        // Améliorer TOUS les boutons avec le nouveau design
        applyModernButtonStyles();

        // Appliquer le design aux sections
        applyModernSectionStyles();

        console.log('✅ Design ultra-moderne appliqué avec succès');
    }

    function applyModernSectionStyles() {
        const isMobile = wixWindow.viewMode === 'mobile';
        const sections = ['#servicesSection', '#testimonialsSection', '#statsSection', '#ctaSection'];

        sections.forEach(sectionId => {
            if ($w(sectionId)) {
                $w(sectionId).style.padding = isMobile ?
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`;
            }
        });
    }

    function applyModernButtonStyles() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Boutons CTA principaux - Style Premium
        const primaryButtons = $w('Button').filter(btn =>
            btn.label && (btn.label.includes('DEVIS') || btn.label.includes('CONTACT') || btn.label.includes('GRATUIT'))
        );

        primaryButtons.forEach(button => {
            button.style.background = FORZA_DESIGN_GUIDE.colors.primary.gradient;
            button.style.color = FORZA_DESIGN_GUIDE.colors.neutral.white;
            button.style.borderRadius = FORZA_DESIGN_GUIDE.effects.borderRadius.lg;
            button.style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.semibold;
            button.style.fontSize = isMobile ?
                FORZA_DESIGN_GUIDE.typography.fontSize.mobile.body :
                FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body;
            button.style.padding = isMobile ?
                FORZA_DESIGN_GUIDE.components.button.sizes.medium.padding :
                FORZA_DESIGN_GUIDE.components.button.sizes.large.padding;
            button.style.boxShadow = FORZA_DESIGN_GUIDE.effects.boxShadow.primary;
            button.style.transition = `all ${FORZA_DESIGN_GUIDE.animations.duration.normal} ${FORZA_DESIGN_GUIDE.animations.easing.easeOut}`;
            button.style.border = 'none';
            button.style.cursor = 'pointer';

            // Largeur pleine sur mobile
            if (isMobile) {
                button.style.width = '100%';
            }
        });

        // Boutons secondaires - Style Outline
        const secondaryButtons = $w('Button').filter(btn =>
            btn.label && (btn.label.includes('VOIR') || btn.label.includes('PROPOS') || btn.label.includes('PORTFOLIO'))
        );

        secondaryButtons.forEach(button => {
            button.style.background = FORZA_DESIGN_GUIDE.colors.neutral.white;
            button.style.color = FORZA_DESIGN_GUIDE.colors.primary.main;
            button.style.border = `2px solid ${FORZA_DESIGN_GUIDE.colors.primary.main}`;
            button.style.borderRadius = FORZA_DESIGN_GUIDE.effects.borderRadius.lg;
            button.style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.semibold;
            button.style.padding = isMobile ?
                FORZA_DESIGN_GUIDE.components.button.sizes.medium.padding :
                FORZA_DESIGN_GUIDE.components.button.sizes.large.padding;
            button.style.transition = `all ${FORZA_DESIGN_GUIDE.animations.duration.normal}`;

            if (isMobile) {
                button.style.width = '100%';
                button.style.marginTop = FORZA_DESIGN_GUIDE.spacing.sm;
            }
        });
    }

    function setupHeroSection() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Titre Hero - Texte optimisé et percutant
        if ($w('#textHeroTitle')) {
            $w('#textHeroTitle').text = isMobile ?
                "Rénovation Expert Québec" :
                "Transformez Votre Maison en Chef-d'Œuvre";
            $w('#textHeroTitle').style.textAlign = 'center';
        }

        // Sous-titre - Proposition de valeur claire
        if ($w('#textHeroSubtitle')) {
            $w('#textHeroSubtitle').text = isMobile ?
                "15 ans d'excellence • 2000+ projets réalisés" :
                "Experts en rénovation résidentielle depuis 15 ans • Plus de 2,000 projets réalisés avec succès";
            $w('#textHeroSubtitle').style.textAlign = 'center';
        }

        // Description - Bénéfices clairs
        if ($w('#textHeroDescription')) {
            $w('#textHeroDescription').text = isMobile ?
                "Cuisine, salle de bain, agrandissement • Devis gratuit en 24h • Garantie 10 ans" :
                "Cuisine sur mesure, salle de bain spa, agrandissement, sous-sol • Devis personnalisé gratuit en moins de 24h • Garantie complète 10 ans";
            $w('#textHeroDescription').style.textAlign = 'center';
            $w('#textHeroDescription').style.fontSize = isMobile ?
                FORZA_DESIGN_GUIDE.typography.fontSize.mobile.body :
                FORZA_DESIGN_GUIDE.typography.fontSize.desktop.lg;
            $w('#textHeroDescription').style.color = FORZA_DESIGN_GUIDE.colors.neutral.gray[300];
            $w('#textHeroDescription').style.lineHeight = FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed;
            $w('#textHeroDescription').style.marginBottom = FORZA_DESIGN_GUIDE.spacing.xl;
        }

        // Indicateurs de confiance
        setupTrustIndicators();

        // Boutons d'action - Labels optimisés
        if ($w('#btnDevisGratuit')) {
            $w('#btnDevisGratuit').label = isMobile ?
                "DEVIS GRATUIT 24H" :
                "OBTENIR MON DEVIS GRATUIT →";
        }

        if ($w('#btnVoirRealisations')) {
            $w('#btnVoirRealisations').label = isMobile ?
                "Portfolio" :
                "Voir Nos Réalisations";
        }

        // Badge d'urgence
        if ($w('#textUrgencyBadge')) {
            $w('#textUrgencyBadge').text = "🔥 Disponible maintenant • Réponse en 24h";
            $w('#textUrgencyBadge').style.background = 'rgba(255, 107, 53, 0.1)';
            $w('#textUrgencyBadge').style.padding = FORZA_DESIGN_GUIDE.spacing.sm + ' ' + FORZA_DESIGN_GUIDE.spacing.md;
            $w('#textUrgencyBadge').style.borderRadius = FORZA_DESIGN_GUIDE.effects.borderRadius.full;
            $w('#textUrgencyBadge').style.color = FORZA_DESIGN_GUIDE.colors.primary.main;
            $w('#textUrgencyBadge').style.fontSize = FORZA_DESIGN_GUIDE.typography.fontSize.desktop.small;
            $w('#textUrgencyBadge').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.semibold;
            $w('#textUrgencyBadge').style.display = 'inline-block';
            $w('#textUrgencyBadge').style.marginBottom = FORZA_DESIGN_GUIDE.spacing.lg;
        }
    }
    
    function setupServicesOverview() {
        // Services en aperçu SANS photos détaillées
        const servicesOverview = [
            {
                title: "Rénovation Cuisine",
                description: "Cuisine moderne et fonctionnelle sur mesure",
                price: "À partir de 25,000$",
                icon: "🍳",
                duration: "3-4 semaines"
            },
            {
                title: "Salle de Bain Spa", 
                description: "Oasis de détente avec finitions luxueuses",
                price: "À partir de 18,000$",
                icon: "🚿",
                duration: "2-3 semaines"
            },
            {
                title: "Agrandissement",
                description: "Plus d'espace pour votre famille",
                price: "À partir de 85,000$", 
                icon: "🏗️",
                duration: "8-12 semaines"
            },
            {
                title: "Aménagement Sous-sol",
                description: "Espace de vie moderne et chaleureux",
                price: "À partir de 35,000$",
                icon: "🏠",
                duration: "4-5 semaines"
            }
        ];
        
        if ($w('#repeaterServices')) {
            $w('#repeaterServices').data = servicesOverview;
            
            $w('#repeaterServices').onItemReady(($item, service) => {
                $item('#textServiceTitle').text = service.title;
                $item('#textServiceDescription').text = service.description;
                $item('#textServicePrice').text = service.price;
                $item('#textServiceDuration').text = service.duration;
                
                if ($item('#iconService')) {
                    $item('#iconService').text = service.icon;
                }
                
                // Bouton pour aller au devis avec ce service
                if ($item('#btnServiceDevis')) {
                    $item('#btnServiceDevis').onClick(() => {
                        const serviceParam = service.title.toLowerCase().replace(/\s+/g, '-');
                        wixLocation.to(`/obtenir-un-devis?service=${serviceParam}`);
                    });
                }
                
                // PAS de photos détaillées ici - juste aperçu
            });
        }
    }
    
    function setupQuickTestimonials() {
        // Témoignages courts et impactants
        const quickTestimonials = [
            {
                text: "Résultat spectaculaire! Équipe professionnelle, délais respectés.",
                author: "Marie-Claire D.",
                location: "Sainte-Foy",
                project: "Cuisine",
                rating: 5
            },
            {
                text: "L'agrandissement est parfait. On dirait qu'il était là depuis toujours!",
                author: "Jean T.",
                location: "Lévis",
                project: "Agrandissement",
                rating: 5
            },
            {
                text: "Service exceptionnel du début à la fin. Je recommande vivement!",
                author: "Sylvie G.",
                location: "Québec",
                project: "Salle de bain",
                rating: 5
            }
        ];
        
        if ($w('#repeaterTestimonials')) {
            $w('#repeaterTestimonials').data = quickTestimonials;
            
            $w('#repeaterTestimonials').onItemReady(($item, testimonial) => {
                $item('#textTestimonial').text = `"${testimonial.text}"`;
                $item('#textAuthor').text = testimonial.author;
                $item('#textLocation').text = testimonial.location;
                $item('#textProject').text = testimonial.project;
                
                if ($item('#textRating')) {
                    $item('#textRating').text = '⭐'.repeat(testimonial.rating);
                }
            });
            
            // Rotation automatique
            startTestimonialRotation();
        }
    }
    
    function setupMainCTA() {
        // Section CTA principale
        if ($w('#textCtaHeadline')) {
            $w('#textCtaHeadline').text = "Prêt à Transformer Votre Maison?";
        }
        
        if ($w('#textCtaSubheadline')) {
            $w('#textCtaSubheadline').text = "Obtenez votre devis personnalisé gratuit en moins de 24h";
        }
        
        // Stats impressionnantes
        const stats = [
            { value: "2000+", label: "Projets réalisés" },
            { value: "98%", label: "Clients satisfaits" },
            { value: "15", label: "Ans d'expérience" },
            { value: "10", label: "Ans de garantie" }
        ];
        
        if ($w('#repeaterStats')) {
            $w('#repeaterStats').data = stats;
            
            $w('#repeaterStats').onItemReady(($item, stat) => {
                $item('#textStatValue').text = stat.value;
                $item('#textStatLabel').text = stat.label;
                
                // Animation des chiffres
                animateNumber($item('#textStatValue'), stat.value);
            });
        }
    }
    
    // === NAVIGATION BUTTONS ===
    function setupNavigationButtons() {
        // Bouton Devis Gratuit
        if ($w('#btnDevisGratuit')) {
            $w('#btnDevisGratuit').onClick(() => {
                trackEvent('cta_click', { location: 'hero', button: 'devis' });
                wixLocation.to('/obtenir-un-devis');
            });
        }
        
        // Bouton Voir Réalisations
        if ($w('#btnVoirRealisations')) {
            $w('#btnVoirRealisations').onClick(() => {
                trackEvent('navigation', { destination: 'realisations', source: 'hero' });
                wixLocation.to('/realisations');
            });
        }
        
        // Bouton À Propos
        if ($w('#btnAPropos')) {
            $w('#btnAPropos').onClick(() => {
                trackEvent('navigation', { destination: 'about', source: 'homepage' });
                wixLocation.to('/a-propos');
            });
        }
        
        // Bouton Contact
        if ($w('#btnContact')) {
            $w('#btnContact').onClick(() => {
                trackEvent('navigation', { destination: 'contact', source: 'homepage' });
                wixLocation.to('/contact');
            });
        }
        
        // Bouton Services
        if ($w('#btnServices')) {
            $w('#btnServices').onClick(() => {
                trackEvent('navigation', { destination: 'services', source: 'homepage' });
                wixLocation.to('/services');
            });
        }
        
        // Bouton téléphone
        if ($w('#btnAppelezNous')) {
            $w('#btnAppelezNous').onClick(() => {
                trackEvent('call_click', { source: 'homepage' });
                wixLocation.to('tel:4181234567');
            });
        }
    }
    
    // === ANIMATIONS SIMPLES ===
    function setupAnimations() {
        // Animation d'entrée héro
        if ($w('#heroSection')) {
            $w('#heroSection').show('fade', {duration: 1000});
        }
        
        // Animation séquentielle des sections
        const sections = [
            '#servicesSection',
            '#testimonialsSection',
            '#statsSection',
            '#ctaSection'
        ];
        
        sections.forEach((section, index) => {
            if ($w(section)) {
                setTimeout(() => {
                    $w(section).show('slide', {
                        duration: 600,
                        direction: 'bottom'
                    });
                }, 200 * (index + 1));
            }
        });
    }
    
    function startTestimonialRotation() {
        let currentIndex = 0;
        const testimonialData = $w('#repeaterTestimonials').data;
        
        if (testimonialData && testimonialData.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialData.length;
                
                // Transition douce
                $w('#repeaterTestimonials').hide('slide', {
                    duration: 300,
                    direction: 'left'
                }).then(() => {
                    $w('#repeaterTestimonials').show('slide', {
                        duration: 300,
                        direction: 'right'
                    });
                });
            }, 6000);
        }
    }
    
    function animateNumber(element, targetValue) {
        // Animation simple des chiffres
        const numericValue = parseInt(targetValue.replace(/\D/g, '')) || 0;
        let currentValue = 0;
        const increment = numericValue / 30;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                element.text = targetValue;
                clearInterval(timer);
            } else {
                element.text = Math.floor(currentValue) + (targetValue.includes('+') ? '+' : '');
            }
        }, 50);
    }
    
    // === OPTIMISATIONS MOBILES ===
    function setupMobileOptimizations() {
        const isMobile = wixWindow.viewMode === 'mobile';
        
        if (isMobile) {
            console.log('📱 Initializing mobile optimizations...');
            
            // Initialiser optimisations mobiles
            if (typeof initMobileOptimizations === 'function') {
                initMobileOptimizations();
            }
            
            // Sections mobiles
            if (typeof initMobileSections === 'function') {
                initMobileSections();
            }
            
            // Textes adaptés mobile
            adaptTextForMobile();
        }
    }
    
    function adaptTextForMobile() {
        if ($w('#textHeroTitle')) {
            $w('#textHeroTitle').text = "Rénovation Expert Québec";
        }
        
        if ($w('#textHeroSubtitle')) {
            $w('#textHeroSubtitle').text = "15 ans • 2000+ projets • Garantie 10 ans";
        }
        
        if ($w('#textHeroDescription')) {
            $w('#textHeroDescription').text = "Cuisine, salle de bain, agrandissement. Devis gratuit 24h.";
        }
    }
    
    // === TRACKING & ANALYTICS ===
    function trackEvent(eventName, parameters) {
        // Google Analytics tracking sécurisé
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', eventName, parameters);
        }
        
        console.log('Event tracked:', eventName, parameters);
    }
    
    // === SUPPRESSION DES SECTIONS PROBLÉMATIQUES ===
    
    // SUPPRIMER: Pas de portfolio détaillé sur homepage
    // SUPPRIMER: Pas de photos de projets sur homepage  
    // SUPPRIMER: Pas de lightbox sur homepage
    // SUPPRIMER: Pas de filtres sur homepage
    
    // La homepage doit être SIMPLE et RAPIDE
    // Les détails sont sur les pages spécialisées
    
    console.log('🏠 Homepage loaded - Clean and optimized');
});