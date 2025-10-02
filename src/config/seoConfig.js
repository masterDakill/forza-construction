// Configuration SEO complète - Forza Construction Inc.
// Préserve toutes les optimisations existantes

export const SEO_CONFIG = {
    // === SITE GLOBAL ===
    site: {
        name: 'Forza Construction Inc.',
        url: 'https://www.forza-construction.com',
        logo: '/images/logo-forza.png',
        phone: '(418) 123-4567',
        email: 'constructionforzainc@gmail.com',
        address: {
            street: '123 Boulevard Construction',
            city: 'Québec',
            region: 'QC',
            postalCode: 'G1V 0A1',
            country: 'CA'
        },
        social: {
            facebook: 'https://facebook.com/forzaconstruction',
            instagram: 'https://instagram.com/forzaconstruction',
            linkedin: 'https://linkedin.com/company/forzaconstruction'
        }
    },

    // === META TAGS PAR PAGE ===
    pages: {
        home: {
            title: 'Forza Construction | Rénovation & Construction au Québec',
            description: 'Expert en rénovation résidentielle et construction neuve au Québec. Plus de 2000 projets réalisés avec succès. Devis gratuit en 24h. Garantie complète incluse.',
            keywords: 'rénovation québec, construction résidentielle, entrepreneur général, rénovation cuisine salle de bain, agrandissement maison, construction neuve',
            canonical: '/',
            ogImage: '/images/og-home.jpg'
        },
        services: {
            title: 'Nos Services de Construction et Rénovation | Forza Construction',
            description: 'Rénovation résidentielle, construction commerciale, agrandissement, sous-sol. Calculateur de prix instantané. 15 ans d\'expérience. Garantie 5-10 ans.',
            keywords: 'services rénovation, construction commerciale, agrandissement maison, rénovation sous-sol, rénovation cuisine, rénovation salle de bain',
            canonical: '/services',
            ogImage: '/images/og-services.jpg'
        },
        contact: {
            title: 'Contactez-Nous | Devis Gratuit 24h | Forza Construction',
            description: 'Contactez nos experts en construction. Réponse garantie en 24h. Disponible par téléphone, email ou formulaire. Service d\'urgence 24/7 disponible.',
            keywords: 'contact entrepreneur, devis gratuit rénovation, urgence construction, estimation gratuite',
            canonical: '/contact',
            ogImage: '/images/og-contact.jpg'
        },
        about: {
            title: 'À Propos | 15 Ans d\'Excellence | Forza Construction',
            description: 'Fondée en 2009, Forza Construction compte 2000+ projets réalisés, 98% de satisfaction client. Équipe de 25 experts certifiés. Certifications APCHQ, RBQ, GCR.',
            keywords: 'à propos forza, entrepreneur certifié québec, licence rbq, apchq, équipe construction',
            canonical: '/a-propos',
            ogImage: '/images/og-about.jpg'
        },
        quote: {
            title: 'Obtenir un Devis Gratuit en 3 Minutes | Forza Construction',
            description: 'Formulaire intelligent avec estimation instantanée. Réponse détaillée en 24h. 100% gratuit et sans engagement. Calculateur de prix en temps réel.',
            keywords: 'devis gratuit construction, estimation rénovation, prix rénovation, calculateur construction',
            canonical: '/obtenir-un-devis',
            ogImage: '/images/og-quote.jpg'
        }
    },

    // === STRUCTURED DATA (JSON-LD) ===
    structuredData: {
        organization: {
            '@context': 'https://schema.org',
            '@type': 'GeneralContractor',
            'name': 'Forza Construction Inc.',
            'url': 'https://www.forza-construction.com',
            'logo': 'https://www.forza-construction.com/images/logo-forza.png',
            'image': 'https://www.forza-construction.com/images/og-home.jpg',
            'description': 'Expert en rénovation résidentielle et construction au Québec depuis 2009.',
            'telephone': '+14181234567',
            'email': 'constructionforzainc@gmail.com',
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': '123 Boulevard Construction',
                'addressLocality': 'Québec',
                'addressRegion': 'QC',
                'postalCode': 'G1V 0A1',
                'addressCountry': 'CA'
            },
            'geo': {
                '@type': 'GeoCoordinates',
                'latitude': '46.8139',
                'longitude': '-71.2080'
            },
            'openingHoursSpecification': [
                {
                    '@type': 'OpeningHoursSpecification',
                    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    'opens': '07:00',
                    'closes': '18:00'
                },
                {
                    '@type': 'OpeningHoursSpecification',
                    'dayOfWeek': 'Saturday',
                    'opens': '08:00',
                    'closes': '16:00'
                }
            ],
            'priceRange': '$$',
            'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': '4.9',
                'reviewCount': '487',
                'bestRating': '5',
                'worstRating': '1'
            },
            'sameAs': [
                'https://facebook.com/forzaconstruction',
                'https://instagram.com/forzaconstruction',
                'https://linkedin.com/company/forzaconstruction'
            ],
            'hasOfferCatalog': {
                '@type': 'OfferCatalog',
                'name': 'Services de Construction',
                'itemListElement': [
                    {
                        '@type': 'Offer',
                        'itemOffered': {
                            '@type': 'Service',
                            'name': 'Rénovation Résidentielle',
                            'description': 'Cuisine, salle de bain, sous-sol, agrandissement'
                        }
                    },
                    {
                        '@type': 'Offer',
                        'itemOffered': {
                            '@type': 'Service',
                            'name': 'Construction Commerciale',
                            'description': 'Bureaux, entrepôts, commerces de détail'
                        }
                    },
                    {
                        '@type': 'Offer',
                        'itemOffered': {
                            '@type': 'Service',
                            'name': 'Construction Neuve',
                            'description': 'Maisons unifamiliales, condos, multiplex'
                        }
                    }
                ]
            }
        },

        localBusiness: {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Forza Construction Inc.',
            'image': 'https://www.forza-construction.com/images/logo-forza.png',
            'priceRange': '$$',
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': '123 Boulevard Construction',
                'addressLocality': 'Québec',
                'addressRegion': 'QC',
                'postalCode': 'G1V 0A1',
                'addressCountry': 'CA'
            },
            'telephone': '+14181234567'
        },

        breadcrumb: (items) => ({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': items.map((item, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'name': item.name,
                'item': `https://www.forza-construction.com${item.url}`
            }))
        })
    },

    // === CORE WEB VITALS TARGETS ===
    webVitals: {
        targets: {
            LCP: 2500,  // Largest Contentful Paint < 2.5s
            FID: 100,   // First Input Delay < 100ms
            INP: 200,   // Interaction to Next Paint < 200ms
            CLS: 0.1,   // Cumulative Layout Shift < 0.1
            FCP: 1800,  // First Contentful Paint < 1.8s
            TTFB: 600   // Time to First Byte < 600ms
        },
        thresholds: {
            good: 0.75,    // 75% des visites doivent être "good"
            needsImprovement: 0.90
        }
    },

    // === ROBOTS & SITEMAP ===
    robots: {
        allow: [
            '/',
            '/services',
            '/contact',
            '/a-propos',
            '/obtenir-un-devis',
            '/realisations'
        ],
        disallow: [
            '/admin',
            '/api',
            '/backend'
        ],
        sitemap: 'https://www.forza-construction.com/sitemap.xml'
    }
};

// === FONCTION D'INJECTION META TAGS ===
export function injectSEO(pageKey) {
    const config = SEO_CONFIG.pages[pageKey];
    if (!config) return;

    // Title
    if (typeof document !== 'undefined') {
        document.title = config.title;

        // Meta description
        setMetaTag('description', config.description);

        // Keywords
        setMetaTag('keywords', config.keywords);

        // Canonical
        setLinkTag('canonical', `${SEO_CONFIG.site.url}${config.canonical}`);

        // Open Graph
        setMetaTag('og:title', config.title, 'property');
        setMetaTag('og:description', config.description, 'property');
        setMetaTag('og:image', `${SEO_CONFIG.site.url}${config.ogImage}`, 'property');
        setMetaTag('og:url', `${SEO_CONFIG.site.url}${config.canonical}`, 'property');
        setMetaTag('og:type', 'website', 'property');
        setMetaTag('og:locale', 'fr_CA', 'property');
        setMetaTag('og:site_name', SEO_CONFIG.site.name, 'property');

        // Twitter Card
        setMetaTag('twitter:card', 'summary_large_image');
        setMetaTag('twitter:title', config.title);
        setMetaTag('twitter:description', config.description);
        setMetaTag('twitter:image', `${SEO_CONFIG.site.url}${config.ogImage}`);

        // Mobile
        setMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
        setMetaTag('theme-color', '#FF6B35');
    }
}

function setMetaTag(name, content, attribute = 'name') {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
}

function setLinkTag(rel, href) {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
    }
    link.setAttribute('href', href);
}

// === FONCTION D'INJECTION JSON-LD ===
export function injectStructuredData(type, data = null) {
    if (typeof document === 'undefined') return;

    let schema;
    if (type === 'organization') {
        schema = SEO_CONFIG.structuredData.organization;
    } else if (type === 'localBusiness') {
        schema = SEO_CONFIG.structuredData.localBusiness;
    } else if (type === 'breadcrumb' && data) {
        schema = SEO_CONFIG.structuredData.breadcrumb(data);
    }

    if (schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }
}

export default SEO_CONFIG;
