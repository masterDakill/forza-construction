// Page À Propos - Forza Construction Inc.
// Histoire de l'entreprise, équipe, valeurs et expertise - VERSION OPTIMISÉE

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import FORZA_DESIGN_GUIDE, { generateGlobalCSS } from '../styles/designGuide';
import { initForzaSite } from '../utils/siteOrchestrator';

$w.onReady(function () {
    console.log('🚀 À Propos Page - Optimisation Premium Loading...');

    // === ORCHESTRATEUR ===
    initForzaSite('about', { enableSEO: true, enableAnalytics: true, enableNavigation: true, enablePerformance: true });

    // === INITIALISATION PREMIUM ===
    applyModernDesign();
    initializeAboutPage();
    setupTeamSection();
    setupTimelineAnimation();
    setupStatsAnimation();
    setupScrollOptimization();

    console.log('✅ À Propos page optimisée et chargée');

    // === DESIGN MODERNE ===
    function applyModernDesign() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Injecter CSS global
        const style = document.createElement('style');
        style.id = 'forza-about-design';
        style.textContent = generateGlobalCSS();
        document.head.appendChild(style);

        // Hero Section - À Propos
        if ($w('#heroAbout')) {
            $w('#heroAbout').style = {
                background: FORZA_DESIGN_GUIDE.colors.secondary.gradient,
                padding: isMobile ?
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`,
                textAlign: 'center'
            };
        }

        // Titre principal
        if ($w('#titleAboutPage')) {
            $w('#titleAboutPage').text = isMobile ?
                "Notre Histoire" :
                "Forza Construction: 15 Ans d'Excellence et d'Innovation";
            $w('#titleAboutPage').style = {
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
        if ($w('#subtitleAboutPage')) {
            $w('#subtitleAboutPage').text = isMobile ?
                "Passion • Qualité • Confiance" :
                "Bâtir l'avenir du Québec, un projet à la fois • Fondée en 2009 • Plus de 2000 projets réalisés";
            $w('#subtitleAboutPage').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.body :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h5,
                color: FORZA_DESIGN_GUIDE.colors.neutral.gray[300],
                lineHeight: FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed
            };
        }

        // Section Mission/Vision
        if ($w('#missionSection')) {
            $w('#missionSection').style = {
                background: FORZA_DESIGN_GUIDE.colors.neutral.white,
                padding: isMobile ?
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`
            };
        }

        // Stats Cards
        if ($w('#statsSection')) {
            $w('#statsSection').style = {
                background: FORZA_DESIGN_GUIDE.colors.neutral.gray[50],
                padding: isMobile ?
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`
            };
        }
    }
    
    // === DONNÉES ENTREPRISE ===
    const companyInfo = {
        founded: 2009,
        employees: 25,
        projectsCompleted: 2000,
        clientSatisfaction: 98,
        yearsExperience: new Date().getFullYear() - 2009,
        certifications: [
            'Licence RBQ: 5678-1234-01',
            'APCHQ membre certifié',
            'CNESST formation sécurité',
            'Garantie GCR qualifiée',
            'CAA Québec recommandé'
        ]
    };
    
    const teamMembers = [
        {
            name: 'Michel Fortin',
            title: 'Président-Fondateur',
            experience: '15 ans',
            specialty: 'Gestion de projet et relations clients',
            description: 'Entrepreneur passionné avec une vision claire: transformer chaque projet en réussite exceptionnelle.',
            image: '/images/team/michel-fortin.jpg',
            achievements: [
                'Entrepreneur de l\'année 2022',
                'Plus de 500 projets supervisés',
                'Certification gestion de projet PMP'
            ]
        },
        {
            name: 'Sarah Dubois',
            title: 'Architecte d\'intérieur',
            experience: '12 ans',
            specialty: 'Design résidentiel et commercial',
            description: 'Créatrice d\'espaces fonctionnels et esthétiques qui reflètent la personnalité de nos clients.',
            image: '/images/team/sarah-dubois.jpg',
            achievements: [
                'Diplôme UQAM Design d\'intérieur',
                'Prix Design Québec 2023',
                'Spécialiste feng shui certifiée'
            ]
        },
        {
            name: 'Jean-Marc Tremblay',
            title: 'Contremaître principal',
            experience: '20 ans',
            specialty: 'Construction et rénovation',
            description: 'Expert technique qui assure la qualité et le respect des délais sur chaque chantier.',
            image: '/images/team/jean-marc-tremblay.jpg',
            achievements: [
                'Compagnon charpentier-menuisier',
                'Formation continue sécurité',
                '1000+ projets dirigés sans accident'
            ]
        },
        {
            name: 'Amélie Gagnon',
            title: 'Coordonnatrice projets',
            experience: '8 ans',
            specialty: 'Planification et suivi clientèle',
            description: 'L\'organisatrice qui s\'assure que tout se déroule parfaitement, de la conception à la livraison.',
            image: '/images/team/amelie-gagnon.jpg',
            achievements: [
                'Baccalauréat gestion de projet',
                'Certification Lean Six Sigma',
                'Satisfaction client 99.2%'
            ]
        }
    ];
    
    const companyTimeline = [
        {
            year: '2009',
            title: 'Fondation',
            description: 'Michel Fortin fonde Forza Construction avec une vision: révolutionner la construction résidentielle au Québec.',
            icon: '🏗️'
        },
        {
            year: '2012',
            title: 'Première expansion',
            description: 'Ouverture du bureau de Québec et embauche de la première équipe d\'architectes.',
            icon: '📈'
        },
        {
            year: '2015',
            title: 'Certification APCHQ',
            description: 'Obtention de la certification APCHQ et lancement des services commerciaux.',
            icon: '🏆'
        },
        {
            year: '2018',
            title: '1000 projets',
            description: 'Célébration du 1000e projet réalisé avec inauguration du nouveau showroom.',
            icon: '🎉'
        },
        {
            year: '2021',
            title: 'Innovation technologique',
            description: 'Intégration de la réalité virtuelle et des technologies 3D dans nos processus.',
            icon: '💡'
        },
        {
            year: '2024',
            title: 'Leadership régional',
            description: 'Reconnaissance comme leader de l\'industrie avec 2000+ projets et équipe de 25 experts.',
            icon: '👑'
        }
    ];
    
    // === INITIALISATION DE LA PAGE ===
    function initializeAboutPage() {
        loadCompanyInfo();
        updateCompanyStats();
        setupMissionSection();
    }
    
    function loadCompanyInfo() {
        // Informations générales
        if ($w('#textFoundedYear')) {
            $w('#textFoundedYear').text = `Fondée en ${companyInfo.founded}`;
        }
        
        if ($w('#textYearsInBusiness')) {
            $w('#textYearsInBusiness').text = `${companyInfo.yearsExperience} ans d'excellence`;
        }
        
        if ($w('#textEmployeeCount')) {
            $w('#textEmployeeCount').text = `${companyInfo.employees} experts à votre service`;
        }
        
        // Certifications
        if ($w('#repeaterCertifications')) {
            const certificationData = companyInfo.certifications.map((cert, index) => ({
                id: `cert-${index}`,
                certification: cert
            }));
            
            $w('#repeaterCertifications').data = certificationData;
            $w('#repeaterCertifications').onItemReady(($item, certData) => {
                $item('#textCertification').text = certData.certification;
            });
        }
    }
    
    function updateCompanyStats() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Stats avec animation et style premium
        if ($w('#statProjectsCompleted')) {
            animateNumber($w('#statProjectsCompleted'), companyInfo.projectsCompleted, '+');
            $w('#statProjectsCompleted').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1 :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.extrabold,
                color: FORZA_DESIGN_GUIDE.colors.primary.main
            };
        }

        if ($w('#statClientSatisfaction')) {
            animateNumber($w('#statClientSatisfaction'), companyInfo.clientSatisfaction, '%');
            $w('#statClientSatisfaction').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1 :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.extrabold,
                color: FORZA_DESIGN_GUIDE.colors.status.success
            };
        }

        if ($w('#statYearsExperience')) {
            animateNumber($w('#statYearsExperience'), companyInfo.yearsExperience, ' ans');
            $w('#statYearsExperience').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1 :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.extrabold,
                color: FORZA_DESIGN_GUIDE.colors.secondary.main
            };
        }

        if ($w('#statTeamSize')) {
            animateNumber($w('#statTeamSize'), companyInfo.employees, ' experts');
            $w('#statTeamSize').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1 :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.extrabold,
                color: FORZA_DESIGN_GUIDE.colors.primary.main
            };
        }

        // Labels des stats
        const statLabels = ['#labelProjects', '#labelSatisfaction', '#labelYears', '#labelTeam'];
        statLabels.forEach(labelId => {
            if ($w(labelId)) {
                $w(labelId).style = {
                    fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.small,
                    color: FORZA_DESIGN_GUIDE.colors.neutral.gray[600],
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                };
            }
        });
    }
    
    function setupMissionSection() {
        const missionContent = {
            mission: "Transformer vos rêves en réalité à travers des projets de construction et rénovation exceptionnels, en dépassant vos attentes à chaque étape.",
            vision: "Devenir la référence incontournable en construction résidentielle au Québec, reconnue pour son innovation, sa qualité et son service client incomparable.",
            values: [
                {
                    title: "Excellence",
                    description: "Nous visons la perfection dans chaque détail, chaque finition, chaque interaction.",
                    icon: "⭐"
                },
                {
                    title: "Transparence", 
                    description: "Communication claire, prix justes, pas de surprises - vous savez toujours ou vous en etes.",
                    icon: "👁️"
                },
                {
                    title: "Innovation",
                    description: "Techniques modernes, matériaux écologiques, technologies de pointe pour votre confort.",
                    icon: "💡"
                },
                {
                    title: "Respect",
                    description: "De votre maison, votre temps, votre budget - nous traitons chaque projet comme le nôtre.",
                    icon: "🤝"
                }
            ]
        };
        
        if ($w('#textMission')) {
            $w('#textMission').text = missionContent.mission;
        }
        
        if ($w('#textVision')) {
            $w('#textVision').text = missionContent.vision;
        }
        
        if ($w('#repeaterValues')) {
            $w('#repeaterValues').data = missionContent.values;
            $w('#repeaterValues').onItemReady(($item, value) => {
                $item('#iconValue').text = value.icon;
                $item('#titleValue').text = value.title;
                $item('#descriptionValue').text = value.description;
            });
        }
    }
    
    // === SECTION ÉQUIPE ===
    function setupTeamSection() {
        if ($w('#repeaterTeam')) {
            $w('#repeaterTeam').data = teamMembers;
            
            $w('#repeaterTeam').onItemReady(($item, member) => {
                $item('#imageMember').src = member.image;
                $item('#imageMember').alt = member.name;
                $item('#textName').text = member.name;
                $item('#textTitle').text = member.title;
                $item('#textExperience').text = member.experience;
                $item('#textSpecialty').text = member.specialty;
                $item('#textDescription').text = member.description;
                
                // Réalisations/achievements
                if (member.achievements && $item('#textAchievements')) {
                    $item('#textAchievements').text = member.achievements.join(' • ');
                }
                
                // Bouton contact direct
                if ($item('#btnContactMember')) {
                    $item('#btnContactMember').onClick(() => {
                        contactTeamMember(member);
                    });
                }
                
                // Animation hover sur photo
                $item('#imageMember').onMouseIn = () => {
                    $item('#imageMember').style.transform = 'scale(1.05)';
                    $item('#imageMember').style.transition = 'transform 0.3s ease';
                };
                
                $item('#imageMember').onMouseOut = () => {
                    $item('#imageMember').style.transform = 'scale(1)';
                };
            });
        }
    }
    
    function contactTeamMember(member) {
        const contactData = {
            memberName: member.name,
            memberTitle: member.title,
            requestType: 'Consultation spécialisée'
        };
        
        // Ouvrir formulaire de contact spécialisé
        if (wixWindow.openLightbox) {
            wixWindow.openLightbox('TeamMemberContact', contactData);
        } else {
            // Redirection vers page contact avec paramètres
            wixLocation.to(`/contact?team=${member.name.replace(' ', '-').toLowerCase()}`);
        }
        
        // Track interaction équipe
        trackTeamInteraction(member.name);
    }
    
    // === TIMELINE DE L'ENTREPRISE ===
    function setupTimelineAnimation() {
        if ($w('#repeaterTimeline')) {
            $w('#repeaterTimeline').data = companyTimeline;
            
            $w('#repeaterTimeline').onItemReady(($item, timelineItem) => {
                $item('#textYear').text = timelineItem.year;
                $item('#textTimelineTitle').text = timelineItem.title;
                $item('#textTimelineDescription').text = timelineItem.description;
                $item('#iconTimeline').text = timelineItem.icon;
                
                // Animation d'apparition séquentielle
                const index = companyTimeline.indexOf(timelineItem);
                setTimeout(() => {
                    $item('#boxTimelineItem').show('slide', {
                        duration: 600,
                        direction: index % 2 === 0 ? 'left' : 'right'
                    });
                }, index * 200);
            });
        }
    }
    
    // === ANIMATIONS DES STATISTIQUES ===
    function setupStatsAnimation() {
        // Observer le défilement pour déclencher animations
        let statsAnimated = false;
        
        $w('#page').onScroll = (event) => {
            if (!statsAnimated && event.target.scrollY > 300) {
                animateAllStats();
                statsAnimated = true;
            }
        };
    }
    
    function animateAllStats() {
        // Animation simultanée de toutes les stats
        const stats = [
            { element: '#statProjectsCompleted', value: companyInfo.projectsCompleted, suffix: '+' },
            { element: '#statClientSatisfaction', value: companyInfo.clientSatisfaction, suffix: '%' },
            { element: '#statYearsExperience', value: companyInfo.yearsExperience, suffix: ' ans' },
            { element: '#statTeamSize', value: companyInfo.employees, suffix: ' experts' }
        ];
        
        stats.forEach((stat, index) => {
            if ($w(stat.element)) {
                setTimeout(() => {
                    animateNumber($w(stat.element), stat.value, stat.suffix);
                }, index * 100);
            }
        });
    }
    
    function animateNumber(element, targetNumber, suffix) {
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                element.text = `${targetNumber}${suffix}`;
                clearInterval(timer);
            } else {
                element.text = `${Math.floor(currentNumber)}${suffix}`;
            }
        }, 40);
    }
    
    // === OPTIMISATION DU SCROLL ===
    function setupScrollOptimization() {
        let ticking = false;
        
        $w('#page').onScroll = (event) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScrollEffects(event.target.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }
    
    function handleScrollEffects(scrollY) {
        // Parallax sur hero
        if ($w('#heroAbout')) {
            const parallaxSpeed = 0.2;
            $w('#heroAbout').style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
        
        // Animation des sections au scroll
        const sections = [
            { id: '#missionSection', trigger: 200 },
            { id: '#teamSection', trigger: 400 },
            { id: '#timelineSection', trigger: 600 },
            { id: '#valuesSection', trigger: 800 },
            { id: '#certificationsSection', trigger: 1000 }
        ];
        
        sections.forEach(section => {
            if (scrollY > section.trigger && $w(section.id)) {
                if (!$w(section.id).hasClass('animated')) {
                    $w(section.id).show('slide', {
                        duration: 800,
                        direction: 'bottom'
                    });
                    $w(section.id).addClass('animated');
                }
            }
        });
        
        // Header sticky avec fond
        if (scrollY > 100) {
            if ($w('#headerAbout')) {
                $w('#headerAbout').style.backgroundColor = 'rgba(255,255,255,0.95)';
                $w('#headerAbout').style.backdropFilter = 'blur(10px)';
                $w('#headerAbout').style.borderBottom = '1px solid rgba(0,0,0,0.1)';
            }
        } else {
            if ($w('#headerAbout')) {
                $w('#headerAbout').style.backgroundColor = 'transparent';
                $w('#headerAbout').style.backdropFilter = 'none';
                $w('#headerAbout').style.borderBottom = 'none';
            }
        }
    }
    
    // === TÉMOIGNAGES CLIENTS ===
    if ($w('#repeaterClientTestimonials')) {
        const clientTestimonials = [
            {
                text: "Forza Construction a dépassé toutes nos attentes. Professionnalisme exemplaire du début à la fin.",
                author: "Marie-Claude Dubois",
                project: "Rénovation cuisine complète",
                rating: 5,
                location: "Sainte-Foy"
            },
            {
                text: "Équipe fantastique, délais respectés, budget respecté. Je les recommande sans hésitation!",
                author: "Jean Tremblay", 
                project: "Agrandissement familial",
                rating: 5,
                location: "Lévis"
            },
            {
                text: "Transformation incroyable de notre sous-sol. Les enfants adorent leur nouvel espace!",
                author: "Famille Bouchard",
                project: "Aménagement sous-sol",
                rating: 5,
                location: "Charlesbourg"
            }
        ];
        
        $w('#repeaterClientTestimonials').data = clientTestimonials;
        $w('#repeaterClientTestimonials').onItemReady(($item, testimonial) => {
            $item('#textTestimonial').text = `"${testimonial.text}"`;
            $item('#textTestimonialAuthor').text = testimonial.author;
            $item('#textTestimonialProject').text = testimonial.project;
            $item('#textTestimonialLocation').text = testimonial.location;
            
            // Rating stars
            if ($item('#textTestimonialRating')) {
                $item('#textTestimonialRating').text = '⭐'.repeat(testimonial.rating);
            }
        });
    }
    
    // === SECTION POURQUOI NOUS CHOISIR ===
    if ($w('#repeaterWhyChooseUs')) {
        const whyChooseUs = [
            {
                icon: "🎯",
                title: "Expertise Reconnue",
                description: "15 ans d'expérience et plus de 2000 projets réussis dans la région de Québec."
            },
            {
                icon: "⏰",
                title: "Respect des Délais",
                description: "96% de nos projets livrés dans les temps grâce à notre planification rigoureuse."
            },
            {
                icon: "💰",
                title: "Prix Transparents",
                description: "Devis détaillés, aucune surprise, respect du budget convenu dès le départ."
            },
            {
                icon: "🛡️",
                title: "Garantie 10 ans",
                description: "Couverture complète matériaux et main d'œuvre pour votre tranquillité d'esprit."
            },
            {
                icon: "👥",
                title: "Équipe Certifiée",
                description: "Tous nos artisans sont certifiés, assurés et formés aux dernières techniques."
            },
            {
                icon: "🌱",
                title: "Éco-responsable",
                description: "Matériaux durables, techniques écoénergétiques, respect de l'environnement."
            }
        ];
        
        $w('#repeaterWhyChooseUs').data = whyChooseUs;
        $w('#repeaterWhyChooseUs').onItemReady(($item, reason) => {
            $item('#iconReason').text = reason.icon;
            $item('#titleReason').text = reason.title;
            $item('#descriptionReason').text = reason.description;
            
            // Animation hover
            $item('#boxReason').onMouseIn = () => {
                $item('#boxReason').style.transform = 'translateY(-5px)';
                $item('#boxReason').style.transition = 'transform 0.3s ease';
                $item('#boxReason').style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            };
            
            $item('#boxReason').onMouseOut = () => {
                $item('#boxReason').style.transform = 'translateY(0)';
                $item('#boxReason').style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            };
        });
    }
    
    // === BOUTONS CTA ===
    if ($w('#btnGetQuoteAbout')) {
        $w('#btnGetQuoteAbout').onClick(() => {
            wixLocation.to('/obtenir-un-devis?from=about');
            trackConversion('quote_from_about');
        });
    }
    
    if ($w('#btnViewPortfolio')) {
        $w('#btnViewPortfolio').onClick(() => {
            wixLocation.to('/realisations');
            trackPageNavigation('about_to_portfolio');
        });
    }
    
    if ($w('#btnContactUs')) {
        $w('#btnContactUs').onClick(() => {
            wixLocation.to('/contact?from=about');
            trackPageNavigation('about_to_contact');
        });
    }
    
    // === FONCTIONS UTILITAIRES ===
    function trackTeamInteraction(memberName) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'team_member_contact', {
                member_name: memberName,
                page: 'about'
            });
        }
    }
    
    function trackConversion(event) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID',
                'event_category': 'lead_generation',
                'event_label': event
            });
        }
    }
    
    function trackPageNavigation(path) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'page_navigation', {
                navigation_path: path,
                source_page: 'about'
            });
        }
    }
    
    console.log('À Propos page initialized with', teamMembers.length, 'team members and', companyTimeline.length, 'timeline events');
});
