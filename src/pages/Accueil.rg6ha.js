// Page d'accueil optimisée - Forza Construction Inc.
// Configuration professionnelle avec design premium sombre + optimisations mobile

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixData from 'wix-data';
import { initMobileOptimizations } from './mobileOptimizations';
import { initMobileSections } from './mobileSections';
import { premiumMarketingCopy, conversionContent } from '../content/premiumMarketingCopy';

$w.onReady(function () {
    // === INITIALISATION PREMIUM ===
    initializePremiumDesign();
    initializeAnalytics();
    setupAnimations();
    setupConversionTracking();
    
    // === OPTIMISATIONS MOBILE ===
    initMobileOptimizations();
    setupMobileSpecificFeatures();
    
    // === SECTIONS MOBILES INTERACTIVES ===
    initMobileSections();
    
    // === DESIGN SYSTEM PREMIUM ===
    function initializePremiumDesign() {
        // Charger le système de design premium
        loadPremiumStyles();
        updateContentWithPremiumCopy();
        setupPremiumAnimations();
        
        console.log('Premium design system initialized');
    }
    
    function loadPremiumStyles() {
        // Injecter les styles premium dans la page
        if ($w('#htmlPremiumStyles')) {
            const premiumStylesLink = `
                <link rel="stylesheet" href="/src/styles/premiumDesignSystem.css">
                <style>
                    /* Page-specific premium overrides */
                    body {
                        background: linear-gradient(135deg, #0A0F1C 0%, #1A2332 50%, #2C3E5C 100%);
                        min-height: 100vh;
                    }
                    
                    .hero-section {
                        background: linear-gradient(135deg, rgba(10, 15, 28, 0.95) 0%, rgba(26, 35, 50, 0.9) 100%),
                                   url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(139,157,195,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                        color: #F8FAFC;
                        text-align: center;
                        padding: 4rem 0;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .premium-cta {
                        background: linear-gradient(135deg, #D4A574 0%, #B5754D 100%);
                        color: #1A202C;
                        padding: 1rem 2rem;
                        border-radius: 12px;
                        font-weight: 600;
                        box-shadow: 0 8px 32px rgba(212, 165, 116, 0.2);
                        transition: all 0.3s ease;
                    }
                    
                    .premium-cta:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 12px 40px rgba(212, 165, 116, 0.3);
                    }
                    
                    .premium-card {
                        background: #15212E;
                        border: 1px solid rgba(139, 157, 195, 0.1);
                        border-radius: 16px;
                        padding: 2rem;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
                        transition: all 0.3s ease;
                    }
                    
                    .premium-card:hover {
                        transform: translateY(-4px);
                        border-color: rgba(212, 165, 116, 0.2);
                        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
                    }
                    
                    .text-premium-gold {
                        color: #D4A574;
                        font-weight: 600;
                    }
                    
                    .gradient-text {
                        background: linear-gradient(135deg, #F8FAFC 0%, #D4A574 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                </style>
            `;
            $w('#htmlPremiumStyles').html = premiumStylesLink;
        }
    }
    
    function updateContentWithPremiumCopy() {
        // Mettre à jour le contenu avec le copy premium
        const copy = premiumMarketingCopy;
        
        // Hero section
        if ($w('#textHeroTitle')) {
            $w('#textHeroTitle').text = copy.hero.headline;
        }
        
        if ($w('#textHeroSubtitle')) {
            $w('#textHeroSubtitle').text = copy.hero.subheadline;
        }
        
        if ($w('#btnDevisGratuit')) {
            $w('#btnDevisGratuit').label = copy.hero.primaryCTA;
        }
        
        if ($w('#btnVoirRealisations')) {
            $w('#btnVoirRealisations').label = copy.hero.secondaryCTA;
        }
        
        // Services section
        if ($w('#textServicesTitle')) {
            $w('#textServicesTitle').text = copy.services.sectionTitle;
        }
        
        if ($w('#textServicesSubtitle')) {
            $w('#textServicesSubtitle').text = copy.services.sectionSubtitle;
        }
        
        // CTA section
        if ($w('#textCtaHeadline')) {
            $w('#textCtaHeadline').text = copy.cta.primary.headline;
        }
        
        if ($w('#textCtaSubheadline')) {
            $w('#textCtaSubheadline').text = copy.cta.primary.subheadline;
        }
        
        // Trust indicators
        const trustIndicators = copy.hero.trustIndicators;
        trustIndicators.forEach((indicator, index) => {
            if ($w(`#textTrust${index + 1}`)) {
                $w(`#textTrust${index + 1}`).text = indicator;
            }
        });
        
        console.log('Premium content updated');
    }
    
    function setupPremiumAnimations() {
        // Animations premium sophistiquées
        const animationSequence = [
            { element: '#heroSection', delay: 0, animation: 'fadeInUp' },
            { element: '#servicesSection', delay: 200, animation: 'fadeInLeft' },
            { element: '#portfolioSection', delay: 400, animation: 'fadeInRight' },
            { element: '#testimonialsSection', delay: 600, animation: 'fadeInUp' },
            { element: '#ctaSection', delay: 800, animation: 'fadeInUp' }
        ];
        
        animationSequence.forEach(item => {
            if ($w(item.element)) {
                setTimeout(() => {
                    $w(item.element).show('fade', {
                        duration: 800,
                        easing: 'ease-out'
                    });
                }, item.delay);
            }
        });
        
        // Animation parallax pour le hero
        $w('#page').onScroll = (event) => {
            const scrollY = event.target.scrollY;
            if ($w('#heroSection')) {
                const parallaxSpeed = 0.5;
                $w('#heroSection').style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
            }
        };
    }
    
    // === CONFIGURATION CONVERSION TRACKING ===
    function setupConversionTracking() {
        // Configuration du tracking de conversion
        console.log('Conversion tracking initialized');
        
        // Tracker les événements de conversion importants
        trackConversionEvents();
    }
    
    function trackConversionEvents() {
        // Événements de conversion à tracker
        const conversionElements = [
            { id: '#btnDevisGratuit', event: 'quote_request' },
            { id: '#btnAppelezNous', event: 'phone_call' },
            { id: '#formContactRapide', event: 'contact_form' }
        ];
        
        conversionElements.forEach(item => {
            if ($w(item.id)) {
                $w(item.id).onClick(() => {
                    trackConversion(item.event, {
                        element_id: item.id,
                        page: 'homepage'
                    });
                });
            }
        });
    }
    
    function trackConversion(event, data = {}) {
        // Google Analytics conversion tracking
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID',
                'event_category': 'conversion',
                'event_label': event,
                ...data
            });
        }
        
        console.log('Conversion tracked:', event, data);
    }
    
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
        const testimonials = premiumMarketingCopy.testimonials.reviews;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial(testimonials[currentIndex]);
        }, 6000); // Rotation plus lente pour les témoignages premium
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
        // Google Analytics 4 - vérification sécurisée
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel - vérification sécurisée
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', eventName, parameters);
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
        if ($w('#textTestimonial')) {
            $w('#textTestimonial').text = testimonial.content;
        }
        
        if ($w('#textAuthor')) {
            $w('#textAuthor').text = `${testimonial.name} - ${testimonial.title}`;
        }
        
        if ($w('#textProject')) {
            $w('#textProject').text = testimonial.project;
        }
        
        // Mettre à jour les étoiles avec animation
        updateStarRating(testimonial.rating);
    }
    
    function updateStarRating(rating) {
        for (let i = 1; i <= 5; i++) {
            if ($w(`#star${i}`)) {
                $w(`#star${i}`).style.color = i <= rating ? '#D4A574' : '#4A5568';
                $w(`#star${i}`).style.transform = 'scale(1.1)';
                setTimeout(() => {
                    $w(`#star${i}`).style.transform = 'scale(1)';
                }, 100 * i);
            }
        }
    }
    
    function openChatWidget() {
        // Implémentation du chat
        wixWindow.openLightbox('ChatSupport');
    }
    
    // === FONCTIONNALITÉS SPÉCIFIQUES MOBILES ===
    function setupMobileSpecificFeatures() {
        if (!window.mobileDetector?.isMobile) return;
        
        // 1. Bouton d'appel flottant sur mobile
        setupFloatingCallButton();
        
        // 2. Swipe navigation pour portfolio
        setupMobilePortfolioSwipe();
        
        // 3. Touch feedback amélioré
        setupMobileTouchFeedback();
        
        // 4. Auto-masquer header au scroll
        setupMobileHeaderHide();
        
        // 5. Optimiser CTA mobile
        optimizeMobileCTA();
    }
    
    function setupFloatingCallButton() {
        // Créer bouton d'appel flottant
        if ($w('#htmlFloatingCall')) {
            const floatingCallHTML = `
                <div id="floatingCallBtn" style="
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #D4A574, #B5754D);
                    border-radius: 50%;
                    box-shadow: 0 4px 20px rgba(212, 165, 116, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 1000;
                    animation: pulse 2s infinite;
                ">
                    <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                </div>
                <style>
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                </style>
            `;
            $w('#htmlFloatingCall').html = floatingCallHTML;
            
            // Event listener via HTML
            setTimeout(() => {
                const btn = document.getElementById('floatingCallBtn');
                if (btn) {
                    btn.onclick = () => {
                        trackEvent('floating_call_click', {
                            source: 'mobile_homepage'
                        });
                        wixLocation.to('tel:4181234567');
                    };
                }
            }, 100);
        }
    }
    
    function setupMobilePortfolioSwipe() {
        if ($w('#repeaterPortfolio')) {
            let currentPortfolioIndex = 0;
            const portfolioItems = $w('#repeaterPortfolio').data || [];
            
            // Ajouter indicateurs de swipe
            if ($w('#htmlSwipeIndicator')) {
                const indicatorHTML = `
                    <div style="text-align: center; padding: 10px; color: #666;">
                        👈 Glissez pour voir plus de projets 👉
                    </div>
                `;
                $w('#htmlSwipeIndicator').html = indicatorHTML;
            }
        }
    }
    
    function setupMobileTouchFeedback() {
        // Feedback tactile pour tous les éléments interactifs
        const interactiveElements = [
            '#btnDevisGratuit',
            '#btnAppelezNous', 
            '#repeaterPortfolio',
            '#repeaterTestimonials'
        ];
        
        interactiveElements.forEach(elementId => {
            if ($w(elementId)) {
                addRippleEffect(elementId);
            }
        });
    }
    
    function addRippleEffect(elementId) {
        const element = $w(elementId);
        
        element.onTouchStart = (event) => {
            // Créer effet ripple
            if ($w('#htmlRippleEffect')) {
                const rippleHTML = `
                    <div class="ripple" style="
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: scale(0);
                        animation: ripple-animation 0.6s linear;
                        width: 20px;
                        height: 20px;
                        left: ${event.touches[0].clientX - 10}px;
                        top: ${event.touches[0].clientY - 10}px;
                    ">
                    </div>
                    <style>
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    </style>
                `;
                $w('#htmlRippleEffect').html = rippleHTML;
            }
        };
    }
    
    function setupMobileHeaderHide() {
        let lastScrollY = 0;
        let scrollTimeout;
        
        $w('#page').onScroll = (event) => {
            const currentScrollY = event.target.scrollY;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scroll vers le bas - masquer header
                    if ($w('#header')) {
                        $w('#header').hide('slide', {
                            duration: 300,
                            direction: 'top'
                        });
                    }
                } else if (currentScrollY < lastScrollY) {
                    // Scroll vers le haut - afficher header
                    if ($w('#header')) {
                        $w('#header').show('slide', {
                            duration: 300,
                            direction: 'top'
                        });
                    }
                }
                lastScrollY = currentScrollY;
            }, 100);
        };
    }
    
    function optimizeMobileCTA() {
        // Boutons CTA plus visibles sur mobile
        const ctaButtons = ['#btnDevisGratuit', '#btnAppelezNous'];
        
        ctaButtons.forEach(buttonId => {
            if ($w(buttonId)) {
                const button = $w(buttonId);
                
                // Styles mobile optimisés
                button.style.width = '100%';
                button.style.maxWidth = '300px';
                button.style.height = '50px';
                button.style.fontSize = '18px';
                button.style.fontWeight = 'bold';
                button.style.margin = '10px auto';
                
                // Animation attention sur mobile
                setInterval(() => {
                    button.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 200);
                }, 5000);
            }
        });
        
        // Message d'urgence mobile avec copy premium
        if ($w('#textMobileUrgency')) {
            const urgencyMessages = conversionContent.urgencyMessages;
            const randomMessage = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];
            $w('#textMobileUrgency').text = randomMessage;
            $w('#textMobileUrgency').show('fade');
        }
        
        // Social proof mobile
        if ($w('#textMobileSocialProof')) {
            const socialProofMessages = conversionContent.socialProof;
            const randomProof = socialProofMessages[Math.floor(Math.random() * socialProofMessages.length)];
            $w('#textMobileSocialProof').text = randomProof;
            $w('#textMobileSocialProof').show('fade');
        }
    }
});
