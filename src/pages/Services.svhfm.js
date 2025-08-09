// Page Services - Forza Construction Inc.
// Système de devis dynamique et présentation interactive

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
    // === INITIALISATION ===
    loadServices();
    setupCalculator();
    setupFilters();
    
    // === CHARGEMENT DES SERVICES ===
    async function loadServices() {
        const services = [
            {
                id: 'renovation',
                title: 'Rénovation résidentielle',
                description: 'Transformation complète de votre espace de vie',
                price: 'À partir de 25,000$',
                image: '/images/renovation.jpg',
                features: [
                    'Cuisine et salle de bain',
                    'Sous-sol et agrandissement',
                    'Revêtement extérieur',
                    'Toiture et fenêtres'
                ]
            },
            {
                id: 'commercial',
                title: 'Construction commerciale',
                description: 'Projets commerciaux clé en main',
                price: 'Sur devis',
                image: '/images/commercial.jpg',
                features: [
                    'Bureaux et espaces commerciaux',
                    'Entrepôts et bâtiments industriels',
                    'Restaurants et commerces de détail',
                    'Gestion de projet complète'
                ]
            },
            {
                id: 'neuf',
                title: 'Construction neuve',
                description: 'Réalisez votre projet de A à Z',
                price: 'À partir de 350$/pi²',
                image: '/images/neuf.jpg',
                features: [
                    'Maisons unifamiliales',
                    'Condos et multiplex',
                    'Projets écoénergétiques',
                    'Garantie GCR incluse'
                ]
            },
            {
                id: 'urgence',
                title: 'Services d\'urgence',
                description: 'Intervention rapide 24/7',
                price: 'Tarif horaire: 95$',
                image: '/images/urgence.jpg',
                features: [
                    'Dégât d\'eau',
                    'Réparations urgentes',
                    'Sécurisation de bâtiment',
                    'Service 24/7'
                ]
            }
        ];
        
        displayServices(services);
    }
    
    function displayServices(services) {
        if ($w('#repeaterServices')) {
            $w('#repeaterServices').data = services;
            
            $w('#repeaterServices').onItemReady(($item, service) => {
                $item('#serviceTitle').text = service.title;
                $item('#serviceDescription').text = service.description;
                $item('#servicePrice').text = service.price;
                $item('#serviceImage').src = service.image;
                
                // Features list
                if (service.features && $item('#textFeatures')) {
                    $item('#textFeatures').text = service.features.join('\n• ');
                }
                
                // CTA Buttons
                $item('#btnDevisService').onClick(() => {
                    trackServiceClick(service.id);
                    wixLocation.to(`/obtenir-un-devis?service=${service.id}`);
                });
                
                $item('#btnDetailsService').onClick(() => {
                    showServiceDetails(service);
                });
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
        let basePrice = 0;
        const surface = Number($w('#inputSurface').value) || 0;
        const projectType = $w('#dropdownProjet').value;
        
        // Prix de base selon le type
        const pricePerSqFt = {
            'renovation_simple': 75,
            'renovation_complete': 150,
            'construction_neuve': 350,
            'commercial': 200
        };
        
        basePrice = surface * (pricePerSqFt[projectType] || 100);
        
        // Ajout des options
        if ($w('#checkboxDemolition').checked) basePrice *= 1.15;
        if ($w('#checkboxElectrique').checked) basePrice *= 1.20;
        if ($w('#checkboxPlomberie').checked) basePrice *= 1.25;
        if ($w('#checkboxFinitionHautGamme').checked) basePrice *= 1.40;
        
        // Affichage du résultat
        const formattedPrice = new Intl.NumberFormat('fr-CA', {
            style: 'currency',
            currency: 'CAD'
        }).format(basePrice);
        
        $w('#textEstimation').text = `Estimation: ${formattedPrice}`;
        $w('#textDisclaimer').text = "* Prix approximatif. Un devis détaillé sera nécessaire.";
        
        // Bouton de conversion
        $w('#btnDevisDetaille').label = `Obtenir un devis précis pour ${formattedPrice}`;
        $w('#btnDevisDetaille').onClick(() => {
            saveEstimateData({
                surface,
                projectType,
                estimatedPrice: basePrice,
                options: getSelectedOptions()
            });
            wixLocation.to('/obtenir-un-devis');
        });
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
        // Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'service_interest', {
                service_id: serviceId,
                page: 'services'
            });
        }
    }
    
    function saveEstimateData(data) {
        // Sauvegarder dans session storage pour pré-remplir le formulaire
        if (wixStorage.session) {
            wixStorage.session.setItem('estimateData', JSON.stringify(data));
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
        // Reset tous les boutons
        ['#btnTous', '#btnResidentiel', '#btnCommercial', '#btnUrgence'].forEach(id => {
            if ($w(id)) {
                $w(id).style.backgroundColor = '#ffffff';
                $w(id).style.color = '#000000';
            }
        });
        
        // Activer le bouton sélectionné
        if ($w(activeButtonId)) {
            $w(activeButtonId).style.backgroundColor = '#007bff';
            $w(activeButtonId).style.color = '#ffffff';
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
