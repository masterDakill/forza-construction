// Page Services - Forza Construction Inc.
// Système de devis dynamique et présentation interactive - VERSION OPTIMISÉE

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixStorage from 'wix-storage';
import FORZA_DESIGN_GUIDE, { generateGlobalCSS } from '../styles/designGuide';
import { initForzaSite } from '../utils/siteOrchestrator';

$w.onReady(function () {
    console.log('🚀 Services Page - Optimisation Premium Loading...');

    // === ORCHESTRATEUR (SEO, Analytics, Navigation, Performance) ===
    initForzaSite('services', { enableSEO: true, enableAnalytics: true, enableNavigation: true, enablePerformance: true });

    // === INITIALISATION PREMIUM ===
    applyModernDesign();
    loadServices();
    setupCalculator();
    setupFilters();
    applyModernStyles();

    console.log('✅ Services page optimisée et chargée');
    
    // === DESIGN MODERNE ===
    function applyModernDesign() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Injecter CSS global
        const style = document.createElement('style');
        style.id = 'forza-services-design';
        style.textContent = generateGlobalCSS();
        document.head.appendChild(style);

        // Hero Section - Services
        if ($w('#heroServices')) {
            $w('#heroServices').style = {
                background: FORZA_DESIGN_GUIDE.colors.secondary.gradient,
                padding: isMobile ?
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`,
                textAlign: 'center'
            };
        }

        // Titre principal
        if ($w('#titleServicesPage')) {
            $w('#titleServicesPage').text = isMobile ?
                "Nos Services d'Excellence" :
                "Services de Construction et Rénovation Premium";
            $w('#titleServicesPage').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1 :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                color: FORZA_DESIGN_GUIDE.colors.neutral.white,
                lineHeight: FORZA_DESIGN_GUIDE.typography.lineHeight.tight,
                marginBottom: FORZA_DESIGN_GUIDE.spacing.lg
            };
        }

        // Sous-titre
        if ($w('#subtitleServicesPage')) {
            $w('#subtitleServicesPage').text = isMobile ?
                "Qualité garantie • 15 ans d'expérience" :
                "Plus de 2000 projets réalisés avec succès au Québec • Garantie complète incluse";
            $w('#subtitleServicesPage').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.body :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h5,
                color: FORZA_DESIGN_GUIDE.colors.neutral.gray[300],
                lineHeight: FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed
            };
        }
    }

    // === STYLES MODERNES POUR COMPOSANTS ===
    function applyModernStyles() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Cards de services
        if ($w('#repeaterServices')) {
            $w('#repeaterServices').style = {
                gap: isMobile ?
                    FORZA_DESIGN_GUIDE.spacing.section.gap.mobile :
                    FORZA_DESIGN_GUIDE.spacing.section.gap.desktop
            };
        }

        // Section calculateur
        if ($w('#calculatorSection')) {
            $w('#calculatorSection').style = {
                background: FORZA_DESIGN_GUIDE.colors.neutral.gray[50],
                padding: isMobile ?
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`,
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.xl,
                boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.lg
            };
        }

        // Titre calculateur
        if ($w('#titleCalculateur')) {
            $w('#titleCalculateur').text = "Calculateur de Prix Instantané";
            $w('#titleCalculateur').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h3 :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h2,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                color: FORZA_DESIGN_GUIDE.colors.secondary.main,
                textAlign: 'center',
                marginBottom: FORZA_DESIGN_GUIDE.spacing.xl
            };
        }

        // Boutons premium
        applyPremiumButtonStyles();
    }

    function applyPremiumButtonStyles() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Boutons CTA principaux
        const primaryButtons = ['#btnDevisDetaille', '#btnContactServices'];
        primaryButtons.forEach(btnId => {
            if ($w(btnId)) {
                $w(btnId).style = {
                    background: FORZA_DESIGN_GUIDE.colors.primary.gradient,
                    color: FORZA_DESIGN_GUIDE.colors.neutral.white,
                    padding: FORZA_DESIGN_GUIDE.components.button.sizes.large.padding,
                    borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.lg,
                    boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.primary,
                    fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.semibold,
                    fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: isMobile ? '100%' : 'auto'
                };
            }
        });

        // Boutons filtres
        const filterButtons = ['#btnTous', '#btnResidentiel', '#btnCommercial', '#btnUrgence'];
        filterButtons.forEach(btnId => {
            if ($w(btnId)) {
                $w(btnId).style = {
                    background: FORZA_DESIGN_GUIDE.colors.neutral.white,
                    color: FORZA_DESIGN_GUIDE.colors.primary.main,
                    border: `2px solid ${FORZA_DESIGN_GUIDE.colors.primary.main}`,
                    borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.full,
                    padding: '12px 24px',
                    fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.semibold,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                };
            }
        });
    }

    // === CHARGEMENT DES SERVICES ===
    function loadServices() {
        const services = [
            {
                id: 'renovation',
                title: 'Rénovation Résidentielle Premium',
                description: 'Transformez votre maison en espace moderne et fonctionnel avec nos experts certifiés',
                price: 'À partir de 25 000$',
                priceDetail: '75$ - 150$/pi²',
                image: '/images/renovation.jpg',
                icon: '🏠',
                category: 'residential',
                features: [
                    '✓ Cuisine et salle de bain haut de gamme',
                    '✓ Sous-sol aménagé et agrandissement',
                    '✓ Revêtement extérieur (brique, pierre, vinyle)',
                    '✓ Toiture, portes et fenêtres écoénergétiques',
                    '✓ Garantie 5 ans sur tous les travaux'
                ],
                deliveryTime: '4-12 semaines',
                warranty: '5 ans'
            },
            {
                id: 'commercial',
                title: 'Construction Commerciale Clé en Main',
                description: 'Projets commerciaux et industriels gérés de A à Z par notre équipe dédiée',
                price: 'Sur devis personnalisé',
                priceDetail: '150$ - 250$/pi²',
                image: '/images/commercial.jpg',
                icon: '🏢',
                category: 'commercial',
                features: [
                    '✓ Bureaux et espaces commerciaux modernes',
                    '✓ Entrepôts et bâtiments industriels',
                    '✓ Restaurants et commerces de détail',
                    '✓ Gestion de projet complète avec plan 3D',
                    '✓ Respect des normes commerciales et délais'
                ],
                deliveryTime: '3-9 mois',
                warranty: '10 ans'
            },
            {
                id: 'neuf',
                title: 'Construction Neuve sur Mesure',
                description: 'Réalisez la maison de vos rêves avec notre équipe d\'architectes et constructeurs',
                price: 'À partir de 350$/pi²',
                priceDetail: '350$ - 500$/pi²',
                image: '/images/neuf.jpg',
                icon: '🏗️',
                category: 'residential',
                features: [
                    '✓ Maisons unifamiliales personnalisées',
                    '✓ Condos et multiplex modernes',
                    '✓ Projets écoénergétiques (LEED, Novoclimat)',
                    '✓ Plans 3D et visites virtuelles inclus',
                    '✓ Garantie GCR et APCHQ incluse'
                ],
                deliveryTime: '9-18 mois',
                warranty: 'GCR 5 ans'
            },
            {
                id: 'urgence',
                title: 'Services d\'Urgence 24/7',
                description: 'Intervention rapide pour tous vos besoins urgents - Disponible jour et nuit',
                price: '95$/heure + matériaux',
                priceDetail: 'Tarif horaire + déplacement',
                image: '/images/urgence.jpg',
                icon: '🚨',
                category: 'emergency',
                features: [
                    '✓ Dégât d\'eau et inondations',
                    '✓ Réparations structurales urgentes',
                    '✓ Sécurisation de bâtiment endommagé',
                    '✓ Service disponible 24h/24, 7j/7',
                    '✓ Intervention en moins de 2 heures'
                ],
                deliveryTime: '< 2 heures',
                warranty: '1 an'
            }
        ];
        
        displayServices(services);
    }
    
    function displayServices(services) {
        const isMobile = wixWindow.viewMode === 'mobile';

        if ($w('#repeaterServices')) {
            $w('#repeaterServices').data = services;

            $w('#repeaterServices').onItemReady(($item, service) => {
                // Titre avec icône
                if ($item('#serviceTitle')) {
                    $item('#serviceTitle').text = `${service.icon} ${service.title}`;
                    $item('#serviceTitle').style = {
                        fontSize: isMobile ?
                            FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h4 :
                            FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h4,
                        fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                        color: FORZA_DESIGN_GUIDE.colors.secondary.main,
                        marginBottom: FORZA_DESIGN_GUIDE.spacing.md
                    };
                }

                // Description optimisée
                if ($item('#serviceDescription')) {
                    $item('#serviceDescription').text = service.description;
                    $item('#serviceDescription').style = {
                        fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                        color: FORZA_DESIGN_GUIDE.colors.neutral.gray[700],
                        lineHeight: FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed,
                        marginBottom: FORZA_DESIGN_GUIDE.spacing.lg
                    };
                }

                // Prix avec détails
                if ($item('#servicePrice')) {
                    $item('#servicePrice').text = service.price;
                    $item('#servicePrice').style = {
                        fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h3,
                        fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                        color: FORZA_DESIGN_GUIDE.colors.primary.main,
                        marginBottom: FORZA_DESIGN_GUIDE.spacing.sm
                    };
                }

                // Détail du prix
                if ($item('#servicePriceDetail')) {
                    $item('#servicePriceDetail').text = service.priceDetail;
                    $item('#servicePriceDetail').style = {
                        fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.small,
                        color: FORZA_DESIGN_GUIDE.colors.neutral.gray[500]
                    };
                }

                // Image
                if ($item('#serviceImage')) {
                    $item('#serviceImage').src = service.image;
                    $item('#serviceImage').style = {
                        borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.xl,
                        boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.md
                    };
                }

                // Features list avec style
                if (service.features && $item('#textFeatures')) {
                    $item('#textFeatures').text = service.features.join('\n');
                    $item('#textFeatures').style = {
                        fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                        color: FORZA_DESIGN_GUIDE.colors.neutral.gray[700],
                        lineHeight: FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed,
                        marginTop: FORZA_DESIGN_GUIDE.spacing.lg
                    };
                }

                // Badges de garantie et délai
                if ($item('#textDeliveryTime')) {
                    $item('#textDeliveryTime').text = `⏱️ Délai: ${service.deliveryTime}`;
                    $item('#textDeliveryTime').style = {
                        fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.small,
                        color: FORZA_DESIGN_GUIDE.colors.neutral.gray[600],
                        background: FORZA_DESIGN_GUIDE.colors.neutral.gray[100],
                        padding: '8px 12px',
                        borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.md,
                        display: 'inline-block'
                    };
                }

                if ($item('#textWarranty')) {
                    $item('#textWarranty').text = `🛡️ Garantie: ${service.warranty}`;
                    $item('#textWarranty').style = {
                        fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.small,
                        color: FORZA_DESIGN_GUIDE.colors.status.success,
                        background: FORZA_DESIGN_GUIDE.colors.neutral.gray[100],
                        padding: '8px 12px',
                        borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.md,
                        display: 'inline-block'
                    };
                }

                // CTA Buttons avec style premium
                if ($item('#btnDevisService')) {
                    $item('#btnDevisService').label = isMobile ?
                        "DEVIS GRATUIT" :
                        "OBTENIR UN DEVIS GRATUIT →";
                    $item('#btnDevisService').style = {
                        background: FORZA_DESIGN_GUIDE.colors.primary.gradient,
                        color: FORZA_DESIGN_GUIDE.colors.neutral.white,
                        padding: FORZA_DESIGN_GUIDE.components.button.sizes.medium.padding,
                        borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.lg,
                        boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.primary,
                        fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.semibold,
                        border: 'none',
                        cursor: 'pointer',
                        width: isMobile ? '100%' : 'auto'
                    };
                    $item('#btnDevisService').onClick(() => {
                        trackServiceClick(service.id);
                        wixLocation.to(`/obtenir-un-devis?service=${service.id}`);
                    });
                }

                if ($item('#btnDetailsService')) {
                    $item('#btnDetailsService').label = "En savoir plus";
                    $item('#btnDetailsService').style = {
                        background: FORZA_DESIGN_GUIDE.colors.neutral.white,
                        color: FORZA_DESIGN_GUIDE.colors.primary.main,
                        border: `2px solid ${FORZA_DESIGN_GUIDE.colors.primary.main}`,
                        padding: FORZA_DESIGN_GUIDE.components.button.sizes.medium.padding,
                        borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.lg,
                        fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.semibold,
                        cursor: 'pointer',
                        width: isMobile ? '100%' : 'auto',
                        marginTop: isMobile ? FORZA_DESIGN_GUIDE.spacing.md : '0'
                    };
                    $item('#btnDetailsService').onClick(() => {
                        showServiceDetails(service);
                    });
                }

                // Style de la card complète
                if ($item('#serviceCard')) {
                    $item('#serviceCard').style = {
                        background: FORZA_DESIGN_GUIDE.colors.neutral.white,
                        padding: FORZA_DESIGN_GUIDE.components.card.padding,
                        borderRadius: FORZA_DESIGN_GUIDE.components.card.borderRadius,
                        boxShadow: FORZA_DESIGN_GUIDE.components.card.boxShadow,
                        transition: 'all 0.3s ease'
                    };
                }
            });
        }
    }
    
    // === CALCULATEUR DE PRIX ===
    function setupCalculator() {
        if (!$w('#calculatorSection')) return;
        
        // Surface en pieds carrés
        $w('#inputSurface').onChange((event) => {
            calculateEstimate();
        });
        
        // Type de projet
        $w('#dropdownProjet').onChange((event) => {
            calculateEstimate();
        });
        
        // Options additionnelles
        const options = [
            '#checkboxDemolition',
            '#checkboxElectrique',
            '#checkboxPlomberie',
            '#checkboxFinitionHautGamme'
        ];
        
        options.forEach(option => {
            if ($w(option)) {
                $w(option).onChange(() => calculateEstimate());
            }
        });
    }
    
    function calculateEstimate() {
        const isMobile = wixWindow.viewMode === 'mobile';
        let basePrice = 0;
        const surface = Number($w('#inputSurface').value) || 0;
        const projectType = $w('#dropdownProjet').value;

        if (surface === 0) {
            if ($w('#textEstimation')) {
                $w('#textEstimation').text = "Entrez la surface pour voir l'estimation";
                $w('#textEstimation').style = {
                    fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                    color: FORZA_DESIGN_GUIDE.colors.neutral.gray[500]
                };
            }
            return;
        }

        // Prix de base selon le type avec textes optimisés
        const pricePerSqFt = {
            'renovation_simple': { rate: 75, label: 'Rénovation Simple' },
            'renovation_complete': { rate: 150, label: 'Rénovation Complète' },
            'construction_neuve': { rate: 350, label: 'Construction Neuve' },
            'commercial': { rate: 200, label: 'Projet Commercial' }
        };

        const selectedType = pricePerSqFt[projectType] || { rate: 100, label: 'Standard' };
        basePrice = surface * selectedType.rate;

        // Ajout des options avec affichage détaillé
        let optionsText = [];
        if ($w('#checkboxDemolition') && $w('#checkboxDemolition').checked) {
            basePrice *= 1.15;
            optionsText.push('+ Démolition (15%)');
        }
        if ($w('#checkboxElectrique') && $w('#checkboxElectrique').checked) {
            basePrice *= 1.20;
            optionsText.push('+ Électricité complète (20%)');
        }
        if ($w('#checkboxPlomberie') && $w('#checkboxPlomberie').checked) {
            basePrice *= 1.25;
            optionsText.push('+ Plomberie complète (25%)');
        }
        if ($w('#checkboxFinitionHautGamme') && $w('#checkboxFinitionHautGamme').checked) {
            basePrice *= 1.40;
            optionsText.push('+ Finitions haut de gamme (40%)');
        }

        // Affichage du résultat avec style premium
        const formattedPrice = new Intl.NumberFormat('fr-CA', {
            style: 'currency',
            currency: 'CAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(basePrice);

        if ($w('#textEstimation')) {
            $w('#textEstimation').text = formattedPrice;
            $w('#textEstimation').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h2 :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.extrabold,
                color: FORZA_DESIGN_GUIDE.colors.primary.main,
                textAlign: 'center',
                marginTop: FORZA_DESIGN_GUIDE.spacing.xl,
                marginBottom: FORZA_DESIGN_GUIDE.spacing.sm
            };
        }

        // Détails du calcul
        if ($w('#textCalculDetails')) {
            $w('#textCalculDetails').text = `${surface} pi² × ${selectedType.rate}$/pi² (${selectedType.label})${optionsText.length > 0 ? '\n' + optionsText.join('\n') : ''}`;
            $w('#textCalculDetails').style = {
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.small,
                color: FORZA_DESIGN_GUIDE.colors.neutral.gray[600],
                textAlign: 'center',
                lineHeight: FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed
            };
        }

        // Disclaimer optimisé
        if ($w('#textDisclaimer')) {
            $w('#textDisclaimer').text = "💡 Estimation approximative basée sur des moyennes. Un devis détaillé gratuit vous sera fourni après inspection.";
            $w('#textDisclaimer').style = {
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.tiny,
                color: FORZA_DESIGN_GUIDE.colors.neutral.gray[500],
                fontStyle: 'italic',
                textAlign: 'center',
                marginTop: FORZA_DESIGN_GUIDE.spacing.md,
                background: FORZA_DESIGN_GUIDE.colors.neutral.gray[100],
                padding: FORZA_DESIGN_GUIDE.spacing.md,
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.md
            };
        }

        // Bouton de conversion avec style premium
        if ($w('#btnDevisDetaille')) {
            $w('#btnDevisDetaille').label = isMobile ?
                `DEVIS POUR ${formattedPrice}` :
                `OBTENIR UN DEVIS GRATUIT POUR ${formattedPrice} →`;
            $w('#btnDevisDetaille').style = {
                background: FORZA_DESIGN_GUIDE.colors.primary.gradient,
                color: FORZA_DESIGN_GUIDE.colors.neutral.white,
                padding: FORZA_DESIGN_GUIDE.components.button.sizes.large.padding,
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.lg,
                boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.primary,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                border: 'none',
                cursor: 'pointer',
                marginTop: FORZA_DESIGN_GUIDE.spacing.xl,
                width: isMobile ? '100%' : 'auto'
            };
            $w('#btnDevisDetaille').onClick(() => {
                saveEstimateData({
                    surface,
                    projectType,
                    estimatedPrice: basePrice,
                    formattedPrice,
                    options: getSelectedOptions()
                });
                wixLocation.to('/obtenir-un-devis');
            });
        }
    }
    
    // === FILTRES DE SERVICES ===
    function setupFilters() {
        const filterButtons = [
            { id: '#btnTous', category: 'all' },
            { id: '#btnResidentiel', category: 'residential' },
            { id: '#btnCommercial', category: 'commercial' },
            { id: '#btnUrgence', category: 'emergency' }
        ];
        
        filterButtons.forEach(button => {
            if ($w(button.id)) {
                $w(button.id).onClick(() => {
                    filterServices(button.category);
                    updateFilterUI(button.id);
                });
            }
        });
    }
    
    function filterServices(category) {
        if (category === 'all') {
            $w('#repeaterServices').data = $w('#repeaterServices').data;
        } else {
            const filtered = $w('#repeaterServices').data.filter(service => 
                service.category === category
            );
            $w('#repeaterServices').data = filtered;
        }
    }
    
    // === FONCTIONS UTILITAIRES ===
    function showServiceDetails(service) {
        // Ouvrir lightbox avec détails
        wixWindow.openLightbox('ServiceDetails', service);
    }
    
    function trackServiceClick(serviceId) {
        // Analytics - vérification sécurisée
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'service_interest', {
                service_id: serviceId,
                page: 'services'
            });
        }
    }
    
    function saveEstimateData(data) {
        // Sauvegarder les données d'estimation
        try {
            if (typeof wixStorage !== 'undefined' && wixStorage.session) {
                wixStorage.session.setItem('estimateData', JSON.stringify(data));
            }
        } catch (error) {
            console.log('Storage not available:', error);
        }
    }
    
    function getSelectedOptions() {
        const options = [];
        if ($w('#checkboxDemolition').checked) options.push('demolition');
        if ($w('#checkboxElectrique').checked) options.push('electrique');
        if ($w('#checkboxPlomberie').checked) options.push('plomberie');
        if ($w('#checkboxFinitionHautGamme').checked) options.push('finition_premium');
        return options;
    }
    
    function updateFilterUI(activeButtonId) {
        // Reset tous les boutons avec style moderne
        ['#btnTous', '#btnResidentiel', '#btnCommercial', '#btnUrgence'].forEach(id => {
            if ($w(id)) {
                $w(id).style = {
                    background: FORZA_DESIGN_GUIDE.colors.neutral.white,
                    color: FORZA_DESIGN_GUIDE.colors.primary.main,
                    border: `2px solid ${FORZA_DESIGN_GUIDE.colors.primary.main}`,
                    borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.full,
                    padding: '12px 24px',
                    fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.semibold,
                    transition: 'all 0.3s ease'
                };
            }
        });

        // Activer le bouton sélectionné avec style premium
        if ($w(activeButtonId)) {
            $w(activeButtonId).style = {
                background: FORZA_DESIGN_GUIDE.colors.primary.gradient,
                color: FORZA_DESIGN_GUIDE.colors.neutral.white,
                border: `2px solid ${FORZA_DESIGN_GUIDE.colors.primary.main}`,
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.full,
                padding: '12px 24px',
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.primary,
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease'
            };
        }
    }
    
    // === COMPARATEUR DE SERVICES ===
    let selectedServices = [];
    
    if ($w('#btnComparer')) {
        $w('#btnComparer').onClick(() => {
            if (selectedServices.length >= 2) {
                openComparison(selectedServices);
            } else {
                showMessage("Sélectionnez au moins 2 services à comparer");
            }
        });
    }
    
    function openComparison(services) {
        wixWindow.openLightbox('ServiceComparison', { services });
    }
    
    function showMessage(message) {
        $w('#textMessage').text = message;
        $w('#textMessage').show('fade');
        setTimeout(() => $w('#textMessage').hide('fade'), 3000);
    }
});
