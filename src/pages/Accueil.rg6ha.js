// Page d'accueil optimisée - Forza Construction Inc.
// Configuration professionnelle avec tracking et conversions

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixData from 'wix-data';

$w.onReady(function () {
    // === INITIALISATION ===
    initializeAnalytics();
    setupAnimations();
    setupConversionTracking();
    
    // === ANIMATIONS D'ENTRÉE ===
    function setupAnimations() {
        // Hero section fade-in
        if ($w('#heroSection')) {
            $w('#heroSection').show('fade', {duration: 1000});
        }
        
        // Animation des éléments au scroll
        const elements = [
            '#servicesSection',
            '#portfolioSection', 
            '#testimonialsSection',
            '#ctaSection'
        ];
        
        elements.forEach((element, index) => {
            if ($w(element)) {
                setTimeout(() => {
                    $w(element).show('slide', {
                        duration: 800,
                        delay: index * 200,
                        direction: 'bottom'
                    });
                }, 100);
            }
        });
    }
    
    // === TRACKING & ANALYTICS ===
    function initializeAnalytics() {
        // Google Analytics 4
        if (wixWindow.trackingParameters) {
            console.log('Source:', wixWindow.trackingParameters.source);
            console.log('Medium:', wixWindow.trackingParameters.medium);
        }
        
        // Track page view
        trackEvent('page_view', {
            page_title: 'Accueil',
            page_location: wixLocation.url
        });
    }
    
    // === BOUTONS CTA OPTIMISÉS ===
    if ($w('#btnDevisGratuit')) {
        $w('#btnDevisGratuit').onClick(() => {
            trackEvent('click_cta', {
                button_name: 'Devis Gratuit',
                location: 'hero'
            });
            wixLocation.to('/obtenir-un-devis');
        });
    }
    
    if ($w('#btnAppelezNous')) {
        $w('#btnAppelezNous').onClick(() => {
            trackEvent('click_call', {
                button_name: 'Appelez-nous',
                phone: '418-123-4567'
            });
            wixLocation.to('tel:4181234567');
        });
    }
    
    // === FORMULAIRE DE CONTACT RAPIDE ===
    if ($w('#formContactRapide')) {
        $w('#formContactRapide').onWixFormSubmit((event) => {
            const formData = event.fields;
            
            // Validation personnalisée
            if (validateForm(formData)) {
                // Tracking de conversion
                trackEvent('form_submit', {
                    form_name: 'Contact Rapide',
                    form_location: 'homepage'
                });
                
                // Envoi vers Airtable/Make.com
                sendToAutomation(formData);
                
                // Message de confirmation
                $w('#textConfirmation').text = "Merci! Nous vous contacterons dans les 24h.";
                $w('#textConfirmation').show('fade');
            }
        });
    }
    
    // === PORTFOLIO DYNAMIQUE ===
    if ($w('#repeaterPortfolio')) {
        loadPortfolioItems();
    }
    
    async function loadPortfolioItems() {
        try {
            const results = await wixData.query('Portfolio')
                .eq('featured', true)
                .limit(6)
                .find();
                
            $w('#repeaterPortfolio').data = results.items;
            
            $w('#repeaterPortfolio').onItemReady(($item, itemData) => {
                $item('#imagePortfolio').src = itemData.image;
                $item('#textTitre').text = itemData.title;
                $item('#textDescription').text = itemData.description;
                
                $item('#btnVoirProjet').onClick(() => {
                    trackEvent('portfolio_click', {
                        project_name: itemData.title
                    });
                    wixLocation.to(`/realisations/${itemData.slug}`);
                });
            });
        } catch (error) {
            console.error('Erreur chargement portfolio:', error);
        }
    }
    
    // === TÉMOIGNAGES ROTATIFS ===
    if ($w('#repeaterTestimonials')) {
        startTestimonialRotation();
    }
    
    function startTestimonialRotation() {
        let currentIndex = 0;
        const testimonials = [
            {
                text: "Service exceptionnel! Projet livré à temps et dans le budget.",
                author: "Marie-Claude L.",
                rating: 5
            },
            {
                text: "Équipe professionnelle et résultats impeccables.",
                author: "Jean-François D.",
                rating: 5
            },
            {
                text: "Je recommande fortement Forza Construction!",
                author: "Sophie B.",
                rating: 5
            }
        ];
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial(testimonials[currentIndex]);
        }, 5000);
    }
    
    // === CHAT WIDGET ===
    setTimeout(() => {
        if ($w('#boxChat')) {
            $w('#boxChat').show('fade');
            
            $w('#btnChat').onClick(() => {
                trackEvent('chat_opened', {
                    page: 'homepage'
                });
                // Intégration Intercom/Crisp/Tawk.to
                openChatWidget();
            });
        }
    }, 3000);
    
    // === FUNCTIONS UTILITAIRES ===
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        
        if (!data.email || !emailRegex.test(data.email)) {
            showError("Email invalide");
            return false;
        }
        
        if (!data.phone || !phoneRegex.test(data.phone)) {
            showError("Téléphone invalide");
            return false;
        }
        
        return true;
    }
    
    function trackEvent(eventName, parameters) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, parameters);
        }
        
        console.log('Event tracked:', eventName, parameters);
    }
    
    function sendToAutomation(data) {
        // Webhook vers Make.com
        const webhookUrl = 'https://hook.make.com/your-webhook-url';
        
        fetch(webhookUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...data,
                source: 'Website - Homepage',
                timestamp: new Date().toISOString()
            })
        });
    }
    
    function showError(message) {
        $w('#textError').text = message;
        $w('#textError').show('fade');
        setTimeout(() => $w('#textError').hide('fade'), 3000);
    }
    
    function updateTestimonial(testimonial) {
        $w('#textTestimonial').text = testimonial.text;
        $w('#textAuthor').text = testimonial.author;
        // Mettre à jour les étoiles
    }
    
    function openChatWidget() {
        // Implémentation du chat
        wixWindow.openLightbox('ChatSupport');
    }
});
