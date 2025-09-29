// Page d'accueil optimisée PREMIUM - Forza Construction Inc.
// Design moderne, conversion optimisée et outils professionnels

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixData from 'wix-data';
import { initMobileOptimizations } from './mobileOptimizations';
import { initMobileSections } from './mobileSections';
import { premiumMarketingCopy, conversionContent } from '../content/premiumMarketingCopy';
import { modernDesignSystem, designComponents, cssUtilities } from '../styles/modernDesignSystem';
import { leadManagement, analyticsManager, chatSystem, bookingSystem } from '../utils/professionalTools';

$w.onReady(function () {
    // === INITIALISATION PREMIUM ===
    console.log('🚀 Forza Construction - Homepage Premium Loading...');

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
        // Injecter le système de design CSS
        const style = document.createElement('style');
        style.id = 'forza-modern-design';
        style.textContent = cssUtilities;
        document.head.appendChild(style);

        // Appliquer classes modernes aux éléments existants
        if ($w('#heroSection')) {
            $w('#heroSection').style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
            $w('#heroSection').style.position = 'relative';
            $w('#heroSection').style.overflow = 'hidden';
        }

        // Améliorer les boutons existants
        applyModernButtonStyles();

        console.log('✅ Design moderne appliqué');
    }

    function applyModernButtonStyles() {
        // Boutons CTA principaux
        const primaryButtons = $w('Button').filter(btn =>
            btn.label && (btn.label.includes('DEVIS') || btn.label.includes('CONTACT'))
        );

        primaryButtons.forEach(button => {
            button.style = {
                ...button.style,
                backgroundColor: '#f97316',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
                padding: '16px 32px',
                boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)',
                transition: 'all 0.3s ease'
            };
        });
    }

    function setupHeroSection() {
        // Contenu héro premium
        if ($w('#textHeroTitle')) {
            $w('#textHeroTitle').text = premiumMarketingCopy.hero.headline;
            $w('#textHeroTitle').style.fontSize = '48px';
            $w('#textHeroTitle').style.fontWeight = 'bold';
            $w('#textHeroTitle').style.color = '#ffffff';
            $w('#textHeroTitle').style.textAlign = 'center';
            $w('#textHeroTitle').style.marginBottom = '20px';
        }

        // Sous-titre premium
        if ($w('#textHeroSubtitle')) {
            $w('#textHeroSubtitle').text = premiumMarketingCopy.hero.subheadline;
            $w('#textHeroSubtitle').style.fontSize = '20px';
            $w('#textHeroSubtitle').style.color = '#e5e5e5';
            $w('#textHeroSubtitle').style.textAlign = 'center';
            $w('#textHeroSubtitle').style.marginBottom = '30px';
        }

        // Indicateurs de confiance
        setupTrustIndicators();

        // CTA premium
        setupPremiumCTA();
        
        // Boutons d'action
        if ($w('#btnDevisGratuit')) {
            $w('#btnDevisGratuit').label = "DEVIS GRATUIT 24H";
        }
        
        if ($w('#btnVoirRealisations')) {
            $w('#btnVoirRealisations').label = "Voir Nos Réalisations";
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