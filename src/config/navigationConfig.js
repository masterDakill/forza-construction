// Configuration de navigation - Forza Construction Inc.
// Centralisation des liens et navigation entre pages

// === CONFIGURATION DES ROUTES ===
export const routes = {
    home: '/',
    services: '/services',
    realisations: '/realisations',
    about: '/a-propos', 
    quote: '/obtenir-un-devis',
    contact: '/contact',
    blog: '/blog',
    payment: '/paiement'
};

// === NAVIGATION HELPER ===
export const navigationHelper = {
    // Navigation sécurisée
    navigateTo: function(route, params = {}) {
        let url = routes[route] || route;
        
        // Ajouter paramètres si nécessaires
        if (Object.keys(params).length > 0) {
            const queryString = Object.keys(params)
                .map(key => `${key}=${encodeURIComponent(params[key])}`)
                .join('&');
            url += `?${queryString}`;
        }
        
        // Navigation Wix sécurisée
        if (typeof wixLocation !== 'undefined') {
            wixLocation.to(url);
        } else {
            window.location.href = url;
        }
        
        console.log(`Navigating to: ${url}`);
    },
    
    // Navigation vers devis avec service pré-sélectionné
    goToQuoteWithService: function(serviceType) {
        this.navigateTo('quote', { service: serviceType });
    },
    
    // Navigation vers réalisations avec filtre
    goToPortfolioWithFilter: function(category) {
        this.navigateTo('realisations', { filter: category });
    },
    
    // Navigation vers contact avec contexte
    goToContactWithContext: function(context, reference = '') {
        const params = { from: context };
        if (reference) {
            params.ref = reference;
        }
        this.navigateTo('contact', params);
    }
};

// === CONFIGURATION DES PAGES ===
export const pagesConfig = {
    homepage: {
        sections: ['hero', 'services-overview', 'testimonials', 'stats', 'cta'],
        showPortfolio: false, // PAS de photos détaillées sur homepage
        showFullServices: false, // Juste aperçu des services
        maxTestimonials: 3 // Limite témoignages
    },
    
    realisations: {
        sections: ['hero', 'filters', 'portfolio-grid', 'testimonials', 'cta'],
        showAllProjects: true, // Toutes les photos ici
        enableFilters: true,
        enableLightbox: true,
        projectsPerPage: 12
    },
    
    services: {
        sections: ['hero', 'services-detailed', 'calculator', 'process', 'cta'],
        showPriceCalculator: true,
        showDetailedFeatures: true,
        enableComparison: true
    },
    
    about: {
        sections: ['hero', 'story', 'team', 'timeline', 'values', 'certifications'],
        showTeamPhotos: true,
        enableTimelineAnimation: true,
        showFullHistory: true
    },
    
    quote: {
        sections: ['hero', 'calculator', 'form', 'confirmation'],
        enableRealTimeCalculation: true,
        multiStepForm: true,
        saveProgress: true
    }
};

// === ÉLÉMENTS WIXÀ VÉRIFIER ===
export const wixElementIds = {
    // Page d'accueil
    homepage: {
        hero: {
            title: '#textHeroTitle',
            subtitle: '#textHeroSubtitle', 
            description: '#textHeroDescription',
            ctaPrimary: '#btnDevisGratuit',
            ctaSecondary: '#btnVoirRealisations'
        },
        services: {
            repeater: '#repeaterServices',
            title: '#textServicesTitle'
        },
        testimonials: {
            repeater: '#repeaterTestimonials'
        },
        stats: {
            repeater: '#repeaterStats'
        }
    },
    
    // Page réalisations
    realisations: {
        portfolio: {
            repeater: '#repeaterPortfolio',
            filters: '#filterButtons'
        },
        details: {
            section: '#projectDetailsSection',
            title: '#textProjectTitle',
            description: '#textProjectDescription'
        }
    },
    
    // Navigation générale
    navigation: {
        header: '#header',
        menu: '#menu',
        footer: '#footer'
    }
};

// === VALIDATION DES ÉLÉMENTS ===
export function validatePageElements(pageName) {
    const config = wixElementIds[pageName];
    if (!config) {
        console.warn(`No configuration found for page: ${pageName}`);
        return false;
    }
    
    const missing = [];
    
    function checkElements(obj, path = '') {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const currentPath = path ? `${path}.${key}` : key;
            
            if (typeof value === 'string' && value.startsWith('#')) {
                // C'est un ID d'élément
                if (!$w(value)) {
                    missing.push(`${currentPath}: ${value}`);
                }
            } else if (typeof value === 'object' && value !== null) {
                checkElements(value, currentPath);
            }
        });
    }
    
    checkElements(config);
    
    if (missing.length > 0) {
        console.warn(`Missing elements on ${pageName}:`, missing);
        return false;
    }
    
    console.log(`✅ All elements validated for ${pageName}`);
    return true;
}

// Export par défaut
export default {
    routes,
    navigationHelper,
    pagesConfig,
    wixElementIds,
    validatePageElements
};