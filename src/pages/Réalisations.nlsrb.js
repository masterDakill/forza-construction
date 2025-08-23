// Page Réalisations - Forza Construction Inc.
// Portfolio interactif avec filtres, galerie et témoignages clients
// ATTENTION: Cette page doit fonctionner de manière autonome

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    console.log('📸 Page Réalisations Loading...');
    
    // === INITIALISATION SIMPLE ET EFFICACE ===
    initializePortfolio();
    setupFilters();
    setupProjectGallery();
    setupTestimonials();
    
    console.log('✅ Page Réalisations loaded successfully');
    
    // === DONNÉES PORTFOLIO ===
    const portfolioProjects = [
        {
            id: 'cuisine-moderne-sainte-foy',
            title: 'Cuisine Moderne - Sainte-Foy',
            category: 'cuisine',
            client: 'Famille Dubois',
            year: '2024',
            duration: '3 semaines',
            budget: '28,500$',
            surface: '180 pi²',
            description: 'Transformation complète d\'une cuisine des années 80 en espace moderne et fonctionnel.',
            longDescription: 'Ce projet a consisté en une rénovation complète incluant la démolition des anciens éléments, l\'installation d\'armoires sur mesure, comptoirs en quartz, électroménagers haut de gamme et nouvel éclairage LED. Le défi était de maximiser l\'espace tout en créant une ambiance chaleureuse.',
            images: [
                { type: 'before', url: '/images/portfolio/cuisine-sainte-foy-before.jpg', caption: 'Avant: cuisine datée des années 80' },
                { type: 'after', url: '/images/portfolio/cuisine-sainte-foy-after.jpg', caption: 'Après: design moderne et épuré' },
                { type: 'detail', url: '/images/portfolio/cuisine-sainte-foy-detail1.jpg', caption: 'Détail: îlot central avec rangement' },
                { type: 'detail', url: '/images/portfolio/cuisine-sainte-foy-detail2.jpg', caption: 'Détail: éclairage sous-armoire LED' }
            ],
            features: [
                'Armoires sur mesure en érable blanc',
                'Comptoirs en quartz Caesarstone',
                'Électroménagers ENERGY STAR',
                'Îlot central multifonctionnel',
                'Éclairage LED programmable',
                'Plancher en bois d\'ingénierie'
            ],
            testimonial: {
                text: 'Forza Construction a transformé notre vision en réalité. Leur professionnalisme et attention aux détails sont exceptionnels.',
                author: 'Marie-Claire Dubois',
                rating: 5
            },
            tags: ['cuisine', 'moderne', 'quartz', 'sur-mesure'],
            featured: true
        },
        {
            id: 'salle-bain-spa-quebec',
            title: 'Salle de Bain Spa - Québec',
            category: 'salle-de-bain',
            client: 'Couple Tremblay',
            year: '2024',
            duration: '2 semaines',
            budget: '18,900$',
            surface: '95 pi²',
            description: 'Création d\'un espace spa relaxant avec douche à l\'italienne et baignoire autoportante.',
            longDescription: 'Transformation d\'une salle de bain standard en véritable oasis de détente. Le projet incluait la plomberie complète, carrelage haut de gamme, éclairage d\'ambiance et système de chauffage radiant au sol.',
            images: [
                { type: 'before', url: '/images/portfolio/sdb-quebec-before.jpg', caption: 'Avant: salle de bain standard' },
                { type: 'after', url: '/images/portfolio/sdb-quebec-after.jpg', caption: 'Après: ambiance spa luxueuse' },
                { type: 'detail', url: '/images/portfolio/sdb-quebec-detail1.jpg', caption: 'Douche à l\'italienne avec banc' },
                { type: 'detail', url: '/images/portfolio/sdb-quebec-detail2.jpg', caption: 'Baignoire autoportante design' }
            ],
            features: [
                'Douche à l\'italienne 4\'x6\'',
                'Baignoire autoportante Kohler',
                'Carrelage porcelaine grand format',
                'Plancher chauffant radiant',
                'Vanité suspendue double lavabo',
                'Éclairage LED dimmable'
            ],
            testimonial: {
                text: 'Notre salle de bain est maintenant notre refuge quotidien. Qualité impeccable et respect des délais.',
                author: 'Jean Tremblay',
                rating: 5
            },
            tags: ['salle-de-bain', 'spa', 'luxe', 'plancher-chauffant'],
            featured: true
        },
        {
            id: 'agrandissement-levis',
            title: 'Agrandissement Familial - Lévis',
            category: 'agrandissement',
            client: 'Famille Gagnon',
            year: '2024',
            duration: '8 semaines',
            budget: '95,000$',
            surface: '450 pi²',
            description: 'Extension de 450 pi² incluant nouvelle chambre maître et salle familiale.',
            longDescription: 'Projet d\'agrandissement majeur avec fondations, structure, isolation haute performance, finition intérieure complète et intégration harmonieuse avec l\'architecture existante.',
            images: [
                { type: 'before', url: '/images/portfolio/agrandissement-levis-before.jpg', caption: 'Avant: maison originale' },
                { type: 'progress', url: '/images/portfolio/agrandissement-levis-progress.jpg', caption: 'En cours: structure et toiture' },
                { type: 'after', url: '/images/portfolio/agrandissement-levis-after.jpg', caption: 'Après: extension harmonieuse' },
                { type: 'detail', url: '/images/portfolio/agrandissement-levis-detail1.jpg', caption: 'Chambre maître avec walk-in' }
            ],
            features: [
                'Fondations avec drain français',
                'Structure 2x6 isolée R24',
                'Toiture bardeaux GAF 30 ans',
                'Fenêtres triple vitrage',
                'Plancher bois franc chêne',
                'Système électrique 200A'
            ],
            testimonial: {
                text: 'L\'agrandissement s\'intègre parfaitement. On dirait que c\'était là depuis toujours!',
                author: 'Sylvie Gagnon',
                rating: 5
            },
            tags: ['agrandissement', 'famille', 'structure', 'integration'],
            featured: true
        },
        {
            id: 'renovation-sous-sol-charlesbourg',
            title: 'Sous-sol Multifonctionnel - Charlesbourg',
            category: 'sous-sol',
            client: 'Famille Bouchard',
            year: '2023',
            duration: '4 semaines',
            budget: '35,000$',
            surface: '800 pi²',
            description: 'Aménagement complet du sous-sol en espace familial avec salle de jeu et bureau.',
            longDescription: 'Transformation d\'un sous-sol non fini en espace de vie familial incluant isolation, cloisons, électricité, plomberie pour salle d\'eau, revêtements et éclairage moderne.',
            images: [
                { type: 'before', url: '/images/portfolio/sous-sol-charlesbourg-before.jpg', caption: 'Avant: sous-sol non fini' },
                { type: 'after', url: '/images/portfolio/sous-sol-charlesbourg-after.jpg', caption: 'Après: espace familial chaleureux' },
                { type: 'detail', url: '/images/portfolio/sous-sol-charlesbourg-detail1.jpg', caption: 'Coin bureau intégré' },
                { type: 'detail', url: '/images/portfolio/sous-sol-charlesbourg-detail2.jpg', caption: 'Salle de jeu pour enfants' }
            ],
            features: [
                'Isolation R20 murs et plafond',
                'Plancher flottant antihumidité',
                'Éclairage encastré LED',
                'Salle d\'eau 3 pièces',
                'Bar avec mini-frigo intégré',
                'Système son surround'
            ],
            testimonial: {
                text: 'Maintenant on vit vraiment dans toute la maison. Les enfants adorent leur nouvel espace!',
                author: 'Marc Bouchard',
                rating: 5
            },
            tags: ['sous-sol', 'famille', 'bureau', 'salle-jeu'],
            featured: false
        }
    ];
    
    // === INITIALISATION PORTFOLIO ===
    function initializePortfolio() {
        loadFeaturedProjects();
        setupProjectCounter();
        initializeScrollEffects();
    }
    
    function loadFeaturedProjects() {
        if ($w('#repeaterPortfolio')) {
            // Charger projets featured d'abord
            const featuredProjects = portfolioProjects.filter(p => p.featured);
            displayProjects(featuredProjects);
        }
    }
    
    function displayProjects(projects) {
        $w('#repeaterPortfolio').data = projects;
        
        $w('#repeaterPortfolio').onItemReady(($item, project) => {
            // Informations de base
            $item('#textTitle').text = project.title;
            $item('#textDescription').text = project.description;
            $item('#textClient').text = project.client;
            $item('#textYear').text = project.year;
            $item('#textDuration').text = project.duration;
            $item('#textBudget').text = project.budget;
            $item('#textSurface').text = project.surface;
            
            // Image principale (après)
            if (project.images && project.images.length > 0) {
                const mainImage = project.images.find(img => img.type === 'after') || project.images[0];
                $item('#imageProject').src = mainImage.url;
                $item('#imageProject').alt = project.title;
            }
            
            // Tags/catégorie
            if ($item('#textCategory')) {
                $item('#textCategory').text = project.category.replace('-', ' ').toUpperCase();
            }
            
            // Rating stars
            if (project.testimonial && $item('#textRating')) {
                const stars = '⭐'.repeat(project.testimonial.rating);
                $item('#textRating').text = stars;
            }
            
            // Boutons d'action
            $item('#btnVoirProjet').onClick(() => {
                openProjectDetails(project);
                trackProjectView(project.id);
            });
            
            if ($item('#btnAvantApres')) {
                $item('#btnAvantApres').onClick(() => {
                    openBeforeAfterView(project);
                });
            }
            
            if ($item('#btnDevisSimulaire')) {
                $item('#btnDevisSimulaire').onClick(() => {
                    initiateQuoteFromProject(project);
                });
            }
            
            // Animation hover
            setupProjectHoverEffects($item);
        });
        
        updateProjectCounter(projects.length);
    }
    
    // === SYSTÈME DE FILTRES ===
    function setupFilters() {
        const filterButtons = [
            { id: '#btnFiltreAll', category: 'all', label: 'Tous les projets' },
            { id: '#btnFiltreCuisine', category: 'cuisine', label: 'Cuisines' },
            { id: '#btnFiltreSalleBain', category: 'salle-de-bain', label: 'Salles de bain' },
            { id: '#btnFiltreAgrandissement', category: 'agrandissement', label: 'Agrandissements' },
            { id: '#btnFiltreSousSol', category: 'sous-sol', label: 'Sous-sols' }
        ];
        
        filterButtons.forEach(filter => {
            if ($w(filter.id)) {
                $w(filter.id).onClick(() => {
                    filterProjects(filter.category);
                    updateFilterUI(filter.id);
                    trackFilterUsage(filter.category);
                });
            }
        });
        
        // Tri par date, prix, etc.
        if ($w('#dropdownTri')) {
            $w('#dropdownTri').onChange((event) => {
                sortProjects(event.target.value);
            });
        }
    }
    
    function filterProjects(category) {
        let filtered = portfolioProjects;
        
        if (category !== 'all') {
            filtered = portfolioProjects.filter(p => p.category === category);
        }
        
        displayProjects(filtered);
        
        // Animation de transition
        if ($w('#repeaterPortfolio')) {
            $w('#repeaterPortfolio').hide().then(() => {
                $w('#repeaterPortfolio').show('fade', { duration: 600 });
            });
        }
    }
    
    function sortProjects(sortBy) {
        let sorted = [...($w('#repeaterPortfolio').data || [])];
        
        switch(sortBy) {
            case 'date-desc':
                sorted.sort((a, b) => new Date(b.year) - new Date(a.year));
                break;
            case 'date-asc':
                sorted.sort((a, b) => new Date(a.year) - new Date(b.year));
                break;
            case 'budget-desc':
                sorted.sort((a, b) => parseFloat(b.budget.replace(/[^0-9]/g, '')) - parseFloat(a.budget.replace(/[^0-9]/g, '')));
                break;
            case 'budget-asc':
                sorted.sort((a, b) => parseFloat(a.budget.replace(/[^0-9]/g, '')) - parseFloat(b.budget.replace(/[^0-9]/g, '')));
                break;
            case 'surface-desc':
                sorted.sort((a, b) => parseFloat(b.surface) - parseFloat(a.surface));
                break;
        }
        
        $w('#repeaterPortfolio').data = sorted;
    }
    
    // === GALERIE INTERACTIVE ===
    function setupProjectGallery() {
        // Configuration de la galerie de projets
        console.log('Setting up project gallery...');
        
        // S'assurer que les images sont bien affichées
        if ($w('#repeaterPortfolio')) {
            // La gestion est déjà dans displayProjects() et onItemReady()
            console.log('Portfolio repeater found and configured');
        } else {
            console.warn('Portfolio repeater not found - check Wix element IDs');
        }
    }
    
    function openProjectDetails(project) {
        // Afficher détails du projet de manière simple
        console.log('Opening project details for:', project.title);
        
        // Option 1: Utiliser lightbox si disponible
        if (wixWindow.openLightbox) {
            const detailsData = {
                title: project.title,
                longDescription: project.longDescription,
                features: project.features,
                images: project.images,
                testimonial: project.testimonial,
                specs: {
                    client: project.client,
                    year: project.year,
                    duration: project.duration,
                    budget: project.budget,
                    surface: project.surface
                }
            };
            
            try {
                wixWindow.openLightbox('ProjectDetails', detailsData);
            } catch (error) {
                console.log('Lightbox not available, using alternative method');
                showProjectDetailsInline(project);
            }
        } else {
            // Option 2: Affichage inline si pas de lightbox
            showProjectDetailsInline(project);
        }
    }
    
    function showProjectDetailsInline(project) {
        // Afficher les détails dans une section dédiée
        if ($w('#projectDetailsSection')) {
            // Remplir les détails
            if ($w('#textProjectTitle')) {
                $w('#textProjectTitle').text = project.title;
            }
            if ($w('#textProjectDescription')) {
                $w('#textProjectDescription').text = project.longDescription;
            }
            if ($w('#textProjectSpecs')) {
                $w('#textProjectSpecs').text = `Client: ${project.client} | Durée: ${project.duration} | Budget: ${project.budget}`;
            }
            
            // Afficher la section
            $w('#projectDetailsSection').show('slide', { duration: 500, direction: 'bottom' });
            
            // Scroll vers la section
            $w('#projectDetailsSection').scrollTo();
        } else {
            // Fallback: alert simple
            alert(`Projet: ${project.title}\n\n${project.longDescription}\n\nBudget: ${project.budget}\nDurée: ${project.duration}`);
        }
    }
    
    function openBeforeAfterView(project) {
        const beforeAfterImages = project.images.filter(img => 
            img.type === 'before' || img.type === 'after'
        );
        
        if (wixWindow.openLightbox) {
            wixWindow.openLightbox('BeforeAfterSlider', { images: beforeAfterImages, project });
        }
    }
    
    // === TÉMOIGNAGES ROTATIFS ===
    function setupTestimonials() {
        const testimonials = portfolioProjects
            .filter(p => p.testimonial)
            .map(p => ({
                ...p.testimonial,
                project: p.title,
                projectId: p.id
            }));
        
        if ($w('#repeaterTestimonials')) {
            $w('#repeaterTestimonials').data = testimonials;
            
            $w('#repeaterTestimonials').onItemReady(($item, testimonial) => {
                $item('#textTestimonial').text = testimonial.text;
                $item('#textAuthor').text = testimonial.author;
                $item('#textProject').text = `Projet: ${testimonial.project}`;
                
                // Rating stars
                if ($item('#textStars')) {
                    $item('#textStars').text = '⭐'.repeat(testimonial.rating);
                }
                
                $item('#btnVoirProjet').onClick(() => {
                    const project = portfolioProjects.find(p => p.id === testimonial.projectId);
                    if (project) {
                        openProjectDetails(project);
                    }
                });
            });
            
            // Auto-rotation des témoignages
            startTestimonialRotation();
        }
    }
    
    function startTestimonialRotation() {
        let currentIndex = 0;
        const testimonialData = $w('#repeaterTestimonials').data;
        
        setInterval(() => {
            if (testimonialData.length > 1) {
                currentIndex = (currentIndex + 1) % testimonialData.length;
                
                // Smooth transition
                $w('#repeaterTestimonials').hide('slide', {
                    duration: 300,
                    direction: 'left'
                }).then(() => {
                    // Mettre en avant le témoignage actuel
                    highlightTestimonial(currentIndex);
                    $w('#repeaterTestimonials').show('slide', {
                        duration: 300,
                        direction: 'right'
                    });
                });
            }
        }, 8000); // Rotation toutes les 8 secondes
    }
    
    function highlightTestimonial(index) {
        // Logic pour mettre en évidence un témoignage spécifique
        // Peut être implémenté selon la structure Wix
    }
    
    // === OPTIMISATION DU SCROLL ===
    function setupScrollOptimization() {
        let ticking = false;
        
        $w('#page').onScroll = (event) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll(event.target.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }
    
    function handleScroll(scrollY) {
        // Parallax léger sur hero
        if ($w('#heroSection')) {
            const parallaxSpeed = 0.3;
            $w('#heroSection').style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
        
        // Animation des éléments au scroll
        animateOnScroll(scrollY);
        
        // Header sticky behavior
        if (scrollY > 100) {
            if ($w('#headerPortfolio')) {
                $w('#headerPortfolio').style.position = 'sticky';
                $w('#headerPortfolio').style.top = '0';
                $w('#headerPortfolio').style.zIndex = '1000';
                $w('#headerPortfolio').style.backgroundColor = 'rgba(255,255,255,0.95)';
                $w('#headerPortfolio').style.backdropFilter = 'blur(10px)';
            }
        }
    }
    
    function animateOnScroll(scrollY) {
        const elements = [
            { id: '#statsSection', trigger: 200 },
            { id: '#processSection', trigger: 400 },
            { id: '#testimonialsSection', trigger: 600 },
            { id: '#ctaSection', trigger: 800 }
        ];
        
        elements.forEach(element => {
            if (scrollY > element.trigger && $w(element.id)) {
                if (!$w(element.id).hasClass('animated')) {
                    $w(element.id).show('slide', {
                        duration: 800,
                        direction: 'bottom'
                    });
                    $w(element.id).addClass('animated');
                }
            }
        });
    }
    
    function initializeScrollEffects() {
        // Intersection Observer pour performances
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Note: Wix ne supporte pas IntersectionObserver directement
        // Utilisation du scroll optimisé à la place
    }
    
    // === FONCTIONS UTILITAIRES ===
    function setupProjectCounter() {
        if ($w('#textProjectCount')) {
            $w('#textProjectCount').text = `${portfolioProjects.length} projets réalisés`;
        }
        
        if ($w('#textFeaturedCount')) {
            const featuredCount = portfolioProjects.filter(p => p.featured).length;
            $w('#textFeaturedCount').text = `${featuredCount} projets vedettes`;
        }
    }
    
    function updateProjectCounter(count) {
        if ($w('#textVisibleCount')) {
            $w('#textVisibleCount').text = `${count} projet(s) affiché(s)`;
        }
    }
    
    function setupProjectHoverEffects($item) {
        $item('#imageProject').onMouseIn = () => {
            $item('#imageProject').style.transform = 'scale(1.05)';
            $item('#imageProject').style.transition = 'transform 0.3s ease';
        };
        
        $item('#imageProject').onMouseOut = () => {
            $item('#imageProject').style.transform = 'scale(1)';
        };
    }
    
    function updateFilterUI(activeButtonId) {
        // Reset tous les boutons de filtre
        const filterButtons = [
            '#btnFiltreAll', '#btnFiltreCuisine', '#btnFiltreSalleBain', 
            '#btnFiltreAgrandissement', '#btnFiltreSousSol'
        ];
        
        filterButtons.forEach(id => {
            if ($w(id)) {
                $w(id).style.backgroundColor = '#f8f9fa';
                $w(id).style.color = '#495057';
                $w(id).style.border = '1px solid #dee2e6';
            }
        });
        
        // Activer le bouton sélectionné
        if ($w(activeButtonId)) {
            $w(activeButtonId).style.backgroundColor = '#007bff';
            $w(activeButtonId).style.color = '#ffffff';
            $w(activeButtonId).style.border = '1px solid #007bff';
        }
    }
    
    function initiateQuoteFromProject(project) {
        // Préparer données pour formulaire de devis
        const quoteData = {
            projectType: project.category,
            referenceProject: project.title,
            estimatedSurface: project.surface,
            inspirationBudget: project.budget,
            features: project.features
        };
        
        // Sauvegarder dans session storage
        if (wixStorage.session) {
            wixStorage.session.setItem('quoteReference', JSON.stringify(quoteData));
        }
        
        // Rediriger vers page de devis
        wixLocation.to('/obtenir-un-devis?ref=' + project.id);
        
        // Track conversion
        trackConversionEvent('quote_from_portfolio', {
            project_id: project.id,
            project_category: project.category
        });
    }
    
    // === ANALYTICS & TRACKING ===
    function trackProjectView(projectId) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'portfolio_project_view', {
                project_id: projectId,
                page: 'realisations'
            });
        }
    }
    
    function trackFilterUsage(category) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'portfolio_filter_use', {
                filter_category: category,
                page: 'realisations'
            });
        }
    }
    
    function trackConversionEvent(event, data) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID',
                'event_category': 'lead_generation',
                'event_label': event,
                ...data
            });
        }
        
        console.log('Conversion tracked:', event, data);
    }
    
    // === FUNCTIONS D'INITIALISATION AVANCÉES ===
    
    // Stats animées
    if ($w('#textTotalProjects')) {
        animateNumber($w('#textTotalProjects'), portfolioProjects.length, 'projets');
    }
    
    if ($w('#textTotalClients')) {
        animateNumber($w('#textTotalClients'), 150, 'clients satisfaits');
    }
    
    if ($w('#textYearsExperience')) {
        animateNumber($w('#textYearsExperience'), 15, 'ans d\'expérience');
    }
    
    function animateNumber(element, targetNumber, suffix) {
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                element.text = `${targetNumber}+ ${suffix}`;
                clearInterval(timer);
            } else {
                element.text = `${Math.floor(currentNumber)}+ ${suffix}`;
            }
        }, 50);
    }
    
    // CTA dynamiques basés sur les projets vus
    let viewedProjects = [];
    
    function updateDynamicCTA() {
        if (viewedProjects.length >= 3) {
            if ($w('#textDynamicCTA')) {
                $w('#textDynamicCTA').text = "Vous avez vu plusieurs projets qui vous intéressent ?";
            }
            if ($w('#btnDynamicCTA')) {
                $w('#btnDynamicCTA').label = "Discutons de votre projet";
                $w('#btnDynamicCTA').show('fade');
            }
        }
    }
    
    console.log('Portfolio Réalisations initialized with', portfolioProjects.length, 'projects');
});