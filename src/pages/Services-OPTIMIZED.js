// Page Services ULTRA-OPTIMISÉE - Forza Construction Inc.
// Design premium, calculateur intelligent, textes percutants

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixStorage from 'wix-storage';
import FORZA_DESIGN_GUIDE, { generateGlobalCSS } from '../styles/designGuide';

$w.onReady(function () {
    console.log('⚙️ Page Services - Loading optimized version...');

    // Appliquer le design system
    applyDesignSystem();

    // Charger services optimisés
    loadOptimizedServices();

    // Calculateur amélioré
    setupSmartCalculator();

    // Sections additionnelles
    setupProcessSection();
    setupGuaranteesSection();
    setupCTASection();

    console.log('✅ Services page optimized');

    // === DESIGN SYSTEM ===
    function applyDesignSystem() {
        const style = document.createElement('style');
        style.textContent = generateGlobalCSS();
        document.head.appendChild(style);

        const isMobile = wixWindow.viewMode === 'mobile';

        // Hero section
        if ($w('#servicesHero')) {
            $w('#servicesHero').style.background = FORZA_DESIGN_GUIDE.colors.secondary.gradient;
            $w('#servicesHero').style.padding = isMobile ?
                `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`;
            $w('#servicesHero').style.textAlign = 'center';
        }

        // Titre page
        if ($w('#textServicesTitle')) {
            $w('#textServicesTitle').text = "Nos Services d'Excellence";
            $w('#textServicesTitle').style.fontSize = isMobile ?
                FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1 :
                FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1;
            $w('#textServicesTitle').style.color = FORZA_DESIGN_GUIDE.colors.neutral.white;
            $w('#textServicesTitle').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.bold;
        }

        // Sous-titre
        if ($w('#textServicesSubtitle')) {
            $w('#textServicesSubtitle').text = "Solutions complètes pour tous vos projets de rénovation et construction";
            $w('#textServicesSubtitle').style.fontSize = isMobile ?
                FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h4 :
                FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h4;
            $w('#textServicesSubtitle').style.color = FORZA_DESIGN_GUIDE.colors.neutral.gray[200];
        }
    }

    // === SERVICES OPTIMISÉS ===
    function loadOptimizedServices() {
        const services = [
            {
                id: 'cuisine',
                icon: '🍳',
                title: 'Rénovation de Cuisine',
                tagline: 'Cuisine de rêve sur mesure',
                description: 'Transformez votre cuisine en espace moderne et fonctionnel avec armoires sur mesure, comptoirs premium et électroménagers haut de gamme.',
                price: 'À partir de 25,000$',
                pricePerSqFt: '150$/pi²',
                duration: '3-4 semaines',
                features: [
                    '✓ Design 3D personnalisé inclus',
                    '✓ Armoires sur mesure premium',
                    '✓ Comptoirs quartz ou granite',
                    '✓ Électroménagers ENERGY STAR',
                    '✓ Éclairage LED intégré',
                    '✓ Garantie 10 ans'
                ],
                popular: true
            },
            {
                id: 'salle-bain',
                icon: '🚿',
                title: 'Rénovation Salle de Bain',
                tagline: 'Votre oasis personnelle',
                description: 'Créez une salle de bain spa avec douche italienne, baignoire autoportante, plancher chauffant et finitions luxueuses.',
                price: 'À partir de 18,000$',
                pricePerSqFt: '120$/pi²',
                duration: '2-3 semaines',
                features: [
                    '✓ Plomberie complète certifiée',
                    '✓ Douche à l\'italienne',
                    '✓ Plancher chauffant radiant',
                    '✓ Céramique haut de gamme',
                    '✓ Vanité sur mesure',
                    '✓ Garantie 10 ans'
                ],
                popular: true
            },
            {
                id: 'agrandissement',
                icon: '🏗️',
                title: 'Agrandissement',
                tagline: 'Plus d\'espace pour votre famille',
                description: 'Ajoutez chambres, salles de bain ou espaces de vie avec structure complète, isolation supérieure et finitions professionnelles.',
                price: 'À partir de 85,000$',
                pricePerSqFt: '250$/pi²',
                duration: '8-12 semaines',
                features: [
                    '✓ Plans architecturaux inclus',
                    '✓ Fondations et structure complètes',
                    '✓ Isolation R24+ premium',
                    '✓ Fenêtres triple vitrage',
                    '✓ Finition intérieure complète',
                    '✓ Garantie 10 ans'
                ],
                popular: false
            },
            {
                id: 'sous-sol',
                icon: '🏠',
                title: 'Aménagement Sous-sol',
                tagline: 'Maximisez votre espace',
                description: 'Transformez votre sous-sol en espace familial avec chambres, salle de jeu, cinéma maison ou bureau.',
                price: 'À partir de 35,000$',
                pricePerSqFt: '80$/pi²',
                duration: '4-5 semaines',
                features: [
                    '✓ Isolation anti-humidité R20',
                    '✓ Plomberie pour salle d\'eau',
                    '✓ Électricité complète',
                    '✓ Plancher flottant premium',
                    '✓ Éclairage encastré LED',
                    '✓ Garantie 10 ans'
                ],
                popular: false
            }
        ];

        if ($w('#repeaterServices')) {
            $w('#repeaterServices').data = services;

            $w('#repeaterServices').onItemReady(($item, service) => {
                const isMobile = wixWindow.viewMode === 'mobile';

                // Icon
                if ($item('#iconService')) {
                    $item('#iconService').text = service.icon;
                    $item('#iconService').style.fontSize = '48px';
                }

                // Badge "Populaire"
                if (service.popular && $item('#badgePopular')) {
                    $item('#badgePopular').text = '⭐ POPULAIRE';
                    $item('#badgePopular').style.background = FORZA_DESIGN_GUIDE.colors.primary.main;
                    $item('#badgePopular').style.color = FORZA_DESIGN_GUIDE.colors.neutral.white;
                    $item('#badgePopular').style.padding = '4px 12px';
                    $item('#badgePopular').style.borderRadius = FORZA_DESIGN_GUIDE.effects.borderRadius.full;
                    $item('#badgePopular').style.fontSize = '12px';
                    $item('#badgePopular').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.bold;
                    $item('#badgePopular').show();
                }

                // Titre
                if ($item('#textServiceTitle')) {
                    $item('#textServiceTitle').text = service.title;
                    $item('#textServiceTitle').style.fontSize = isMobile ?
                        FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h4 :
                        FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h4;
                    $item('#textServiceTitle').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.bold;
                    $item('#textServiceTitle').style.color = FORZA_DESIGN_GUIDE.colors.secondary.main;
                }

                // Tagline
                if ($item('#textServiceTagline')) {
                    $item('#textServiceTagline').text = service.tagline;
                    $item('#textServiceTagline').style.color = FORZA_DESIGN_GUIDE.colors.primary.main;
                    $item('#textServiceTagline').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.medium;
                }

                // Description
                if ($item('#textServiceDescription')) {
                    $item('#textServiceDescription').text = service.description;
                    $item('#textServiceDescription').style.lineHeight = FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed;
                }

                // Prix
                if ($item('#textServicePrice')) {
                    $item('#textServicePrice').text = service.price;
                    $item('#textServicePrice').style.fontSize = FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h4;
                    $item('#textServicePrice').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.bold;
                    $item('#textServicePrice').style.color = FORZA_DESIGN_GUIDE.colors.primary.main;
                }

                // Durée
                if ($item('#textServiceDuration')) {
                    $item('#textServiceDuration').text = `⏱️ ${service.duration}`;
                }

                // Features
                if ($item('#textServiceFeatures')) {
                    $item('#textServiceFeatures').text = service.features.join('\n');
                    $item('#textServiceFeatures').style.lineHeight = '1.8';
                }

                // Bouton CTA
                if ($item('#btnServiceDevis')) {
                    $item('#btnServiceDevis').label = 'Obtenir un Devis';
                    $item('#btnServiceDevis').style.background = FORZA_DESIGN_GUIDE.colors.primary.gradient;
                    $item('#btnServiceDevis').style.color = FORZA_DESIGN_GUIDE.colors.neutral.white;
                    $item('#btnServiceDevis').style.borderRadius = FORZA_DESIGN_GUIDE.effects.borderRadius.lg;
                    $item('#btnServiceDevis').style.padding = FORZA_DESIGN_GUIDE.components.button.sizes.medium.padding;
                    $item('#btnServiceDevis').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.semibold;
                    $item('#btnServiceDevis').style.boxShadow = FORZA_DESIGN_GUIDE.effects.boxShadow.primary;

                    if (isMobile) {
                        $item('#btnServiceDevis').style.width = '100%';
                    }

                    $item('#btnServiceDevis').onClick(() => {
                        wixLocation.to(`/obtenir-un-devis?service=${service.id}`);
                    });
                }

                // Card styling
                if ($item('#boxService')) {
                    $item('#boxService').style.background = FORZA_DESIGN_GUIDE.colors.neutral.white;
                    $item('#boxService').style.padding = FORZA_DESIGN_GUIDE.spacing.xl;
                    $item('#boxService').style.borderRadius = FORZA_DESIGN_GUIDE.effects.borderRadius.xl;
                    $item('#boxService').style.boxShadow = FORZA_DESIGN_GUIDE.effects.boxShadow.lg;
                    $item('#boxService').style.transition = 'all 0.3s ease';
                }
            });
        }
    }

    // === CALCULATEUR INTELLIGENT ===
    function setupSmartCalculator() {
        if ($w('#calculatorSection')) {
            $w('#calculatorSection').style.background = FORZA_DESIGN_GUIDE.colors.neutral.gray[50];
            $w('#calculatorSection').style.padding = FORZA_DESIGN_GUIDE.spacing['3xl'];
            $w('#calculatorSection').style.borderRadius = FORZA_DESIGN_GUIDE.effects.borderRadius['2xl'];
        }

        // Titre calculateur
        if ($w('#textCalculatorTitle')) {
            $w('#textCalculatorTitle').text = '🧮 Calculateur de Prix Instantané';
            $w('#textCalculatorTitle').style.fontSize = FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h2;
            $w('#textCalculatorTitle').style.textAlign = 'center';
        }

        // Input surface
        if ($w('#inputSurface')) {
            $w('#inputSurface').placeholder = 'Entrez la surface (pi²)';
            $w('#inputSurface').onChange(() => calculatePrice());
        }

        // Dropdown type de projet
        if ($w('#dropdownProjectType')) {
            $w('#dropdownProjectType').options = [
                { label: 'Cuisine', value: '150' },
                { label: 'Salle de bain', value: '120' },
                { label: 'Agrandissement', value: '250' },
                { label: 'Sous-sol', value: '80' }
            ];
            $w('#dropdownProjectType').onChange(() => calculatePrice());
        }

        // Options checkboxes
        const options = ['#checkPremium', '#checkUrgent', '#checkDesign'];
        options.forEach(opt => {
            if ($w(opt)) {
                $w(opt).onChange(() => calculatePrice());
            }
        });

        function calculatePrice() {
            const surface = parseFloat($w('#inputSurface').value) || 0;
            const pricePerSqFt = parseFloat($w('#dropdownProjectType').value) || 0;

            let total = surface * pricePerSqFt;

            // Options
            if ($w('#checkPremium')?.checked) total *= 1.25;
            if ($w('#checkUrgent')?.checked) total *= 1.15;
            if ($w('#checkDesign')?.checked) total += 2000;

            // Afficher le résultat
            if ($w('#textEstimatedPrice')) {
                $w('#textEstimatedPrice').text = total > 0 ?
                    `${total.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}` :
                    '---';
                $w('#textEstimatedPrice').style.fontSize = '48px';
                $w('#textEstimatedPrice').style.fontWeight = FORZA_DESIGN_GUIDE.typography.fontWeight.bold;
                $w('#textEstimatedPrice').style.color = FORZA_DESIGN_GUIDE.colors.primary.main;
            }

            if ($w('#textEstimateNote')) {
                $w('#textEstimateNote').text = '* Estimation approximative. Un devis détaillé sera fourni après évaluation.';
                $w('#textEstimateNote').style.fontSize = FORZA_DESIGN_GUIDE.typography.fontSize.desktop.small;
                $w('#textEstimateNote').style.color = FORZA_DESIGN_GUIDE.colors.neutral.gray[600];
            }
        }
    }

    // === PROCESSUS ===
    function setupProcessSection() {
        const processSteps = [
            { number: '1', title: 'Consultation', description: 'Rencontre gratuite pour comprendre vos besoins' },
            { number: '2', title: 'Devis Détaillé', description: 'Estimation précise sous 24-48h' },
            { number: '3', title: 'Planification', description: 'Design 3D et calendrier détaillé' },
            { number: '4', title: 'Réalisation', description: 'Travaux professionnels et suivi quotidien' },
            { number: '5', title: 'Livraison', description: 'Inspection finale et garantie 10 ans' }
        ];

        if ($w('#repeaterProcess')) {
            $w('#repeaterProcess').data = processSteps;
        }
    }

    // === GARANTIES ===
    function setupGuaranteesSection() {
        if ($w('#textGuaranteesTitle')) {
            $w('#textGuaranteesTitle').text = '🛡️ Nos Garanties';
        }

        const guarantees = [
            { icon: '✅', title: 'Garantie 10 ans', text: 'Matériaux et main d\'œuvre' },
            { icon: '📅', title: 'Respect des délais', text: '96% de projets dans les temps' },
            { icon: '💰', title: 'Prix garantis', text: 'Aucune surprise au budget' },
            { icon: '🏆', title: 'Qualité certifiée', text: 'RBQ et APCHQ certifiés' }
        ];

        if ($w('#repeaterGuarantees')) {
            $w('#repeaterGuarantees').data = guarantees;
        }
    }

    // === CTA SECTION ===
    function setupCTASection() {
        if ($w('#btnServicesCTA')) {
            $w('#btnServicesCTA').label = 'OBTENIR MON DEVIS GRATUIT';
            $w('#btnServicesCTA').style.background = FORZA_DESIGN_GUIDE.colors.primary.gradient;
            $w('#btnServicesCTA').style.padding = FORZA_DESIGN_GUIDE.components.button.sizes.large.padding;
            $w('#btnServicesCTA').onClick(() => {
                wixLocation.to('/obtenir-un-devis');
            });
        }
    }
});
