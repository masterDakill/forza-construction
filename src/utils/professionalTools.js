// Professional Tools & Features - Forza Construction Inc.
// Outils professionnels essentiels pour un site web de construction moderne

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

// === SYSTÈME DE LEADS AVANCÉ ===
export const leadManagement = {
    // Capturer et qualifier les leads automatiquement
    async captureLeadData(formData, source = 'website') {
        const leadData = {
            ...formData,
            source: source,
            timestamp: new Date(),
            deviceInfo: this.getDeviceInfo(),
            pageInfo: this.getPageInfo(),
            utmParams: this.getUTMParameters(),
            leadScore: this.calculateLeadScore(formData),
            status: 'nouveau',
            priority: this.determinePriority(formData)
        };

        try {
            // Sauvegarder dans Wix Data
            const result = await wixData.save('Leads', leadData);

            // Déclencher workflows automatisés
            await this.triggerLeadWorkflow(result);

            // Notifier l'équipe si priorité élevée
            if (leadData.priority === 'haute') {
                await this.sendUrgentNotification(result);
            }

            return result;
        } catch (error) {
            console.error('Erreur capture lead:', error);
            // Fallback: envoyer par email
            await this.sendEmailFallback(leadData);
        }
    },

    // Calculer score de qualification du lead
    calculateLeadScore(formData) {
        let score = 0;

        // Points pour budget
        if (formData.budget) {
            if (formData.budget >= 50000) score += 30;
            else if (formData.budget >= 25000) score += 20;
            else if (formData.budget >= 10000) score += 10;
        }

        // Points pour urgence
        if (formData.timeframe) {
            if (formData.timeframe === 'immediate') score += 25;
            else if (formData.timeframe === '1-3-months') score += 15;
            else if (formData.timeframe === '3-6-months') score += 10;
        }

        // Points pour type de projet
        if (formData.projectType) {
            if (['kitchen', 'bathroom', 'basement'].includes(formData.projectType)) {
                score += 15;
            }
        }

        // Points pour informations complètes
        const requiredFields = ['name', 'email', 'phone', 'projectType'];
        const completedFields = requiredFields.filter(field => formData[field]);
        score += (completedFields.length / requiredFields.length) * 20;

        return Math.min(score, 100);
    },

    // Déterminer priorité du lead
    determinePriority(formData) {
        const score = this.calculateLeadScore(formData);

        if (score >= 70) return 'haute';
        if (score >= 40) return 'moyenne';
        return 'basse';
    },

    // Workflow automatisé pour nouveaux leads
    async triggerLeadWorkflow(leadData) {
        // Email de confirmation au client
        await this.sendConfirmationEmail(leadData);

        // Notification à l'équipe
        await this.notifyTeam(leadData);

        // Programmer follow-up automatique
        await this.scheduleFollowUp(leadData);

        // Ajouter à séquence email marketing
        await this.addToEmailSequence(leadData);
    },

    // Obtenir informations device
    getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            isMobile: wixWindow.viewMode === 'mobile',
            isTablet: wixWindow.viewMode === 'tablet',
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    },

    // Obtenir informations de page
    getPageInfo() {
        return {
            url: wixLocation.url,
            referrer: document.referrer,
            title: document.title,
            scrollDepth: this.getScrollDepth()
        };
    },

    // Paramètres UTM pour tracking
    getUTMParameters() {
        const urlParams = new URLSearchParams(wixLocation.query);
        return {
            source: urlParams.get('utm_source'),
            medium: urlParams.get('utm_medium'),
            campaign: urlParams.get('utm_campaign'),
            term: urlParams.get('utm_term'),
            content: urlParams.get('utm_content')
        };
    }
};

// === ANALYTICS ET CONVERSION TRACKING ===
export const analyticsManager = {
    // Tracker événements de conversion
    trackConversion(eventName, eventData = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'Conversion',
                event_label: eventData.label || '',
                value: eventData.value || 0,
                custom_parameter_1: eventData.projectType || '',
                custom_parameter_2: eventData.leadSource || ''
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, eventData);
        }

        // Wix Analytics
        if (typeof wixAnalytics !== 'undefined') {
            wixAnalytics.track(eventName, eventData);
        }

        console.log(`Conversion tracked: ${eventName}`, eventData);
    },

    // Tracker engagement utilisateur
    trackUserEngagement() {
        let startTime = Date.now();
        let maxScroll = 0;
        let interactions = 0;

        // Tracker scroll depth
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            maxScroll = Math.max(maxScroll, scrollDepth);
        });

        // Tracker interactions
        ['click', 'focus', 'input'].forEach(event => {
            document.addEventListener(event, () => {
                interactions++;
            });
        });

        // Envoyer données avant fermeture page
        window.addEventListener('beforeunload', () => {
            const engagementData = {
                timeOnPage: Date.now() - startTime,
                maxScrollDepth: maxScroll,
                interactions: interactions,
                pageUrl: window.location.href
            };

            this.trackConversion('user_engagement', engagementData);
        });
    },

    // Tracker performance de page
    trackPagePerformance() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];

                this.trackConversion('page_performance', {
                    loadTime: perfData.loadEventEnd - perfData.fetchStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                    firstContentfulPaint: this.getFCP(),
                    largestContentfulPaint: this.getLCP()
                });
            }, 1000);
        });
    },

    // Obtenir First Contentful Paint
    getFCP() {
        const perfEntries = performance.getEntriesByType('paint');
        const fcpEntry = perfEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcpEntry ? fcpEntry.startTime : 0;
    },

    // Obtenir Largest Contentful Paint
    getLCP() {
        let lcp = 0;
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            lcp = lastEntry.startTime;
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        return lcp;
    }
};

// === SYSTÈME DE CHAT PROFESSIONNEL ===
export const chatSystem = {
    // Initialiser chat widget
    initializeChatWidget() {
        const chatWidget = this.createChatWidget();
        document.body.appendChild(chatWidget);

        // Auto-ouvrir après délai si pas d'interaction
        setTimeout(() => {
            if (!this.hasUserInteracted()) {
                this.showProactiveMessage();
            }
        }, 30000);
    },

    // Créer widget de chat
    createChatWidget() {
        const widget = document.createElement('div');
        widget.id = 'forza-chat-widget';
        widget.innerHTML = `
            <div class="chat-trigger" onclick="forzaChat.openChat()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                <span class="chat-notification">💬</span>
            </div>

            <div class="chat-window" id="chat-window" style="display: none;">
                <div class="chat-header">
                    <h3>Chat avec Forza Construction</h3>
                    <button onclick="forzaChat.closeChat()">×</button>
                </div>
                <div class="chat-messages" id="chat-messages">
                    <div class="bot-message">
                        👋 Bonjour! Comment puis-je vous aider avec votre projet de rénovation?
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" id="chat-input" placeholder="Tapez votre message...">
                    <button onclick="forzaChat.sendMessage()">Envoyer</button>
                </div>
            </div>
        `;

        widget.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            font-family: inherit;
        `;

        return widget;
    },

    // Messages proactifs intelligents
    showProactiveMessage() {
        const messages = [
            "🏠 Une question sur la rénovation de cuisine?",
            "💡 Besoin d'aide pour planifier votre projet?",
            "📋 Voulez-vous un devis gratuit?",
            "⚡ Nos experts sont disponibles maintenant!"
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.addBotMessage(randomMessage);
        this.showChatNotification();
    },

    // Ajouter message bot
    addBotMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.innerHTML = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    // Réponses automatiques intelligentes
    getAutomaticResponse(userMessage) {
        const message = userMessage.toLowerCase();

        if (message.includes('prix') || message.includes('coût') || message.includes('tarif')) {
            return "💰 Nos tarifs varient selon le projet. Pour un devis précis, cliquez ici: [DEVIS GRATUIT]";
        }

        if (message.includes('cuisine')) {
            return "🍳 Spécialistes en rénovation de cuisine! Nous offrons design, installation et garantie 10 ans. Voulez-vous voir nos réalisations?";
        }

        if (message.includes('salle de bain')) {
            return "🛁 Expert en salle de bain moderne! De la conception à l'installation. Consultation gratuite disponible.";
        }

        if (message.includes('délai') || message.includes('temps')) {
            return "⏰ Nos projets sont généralement terminés en 2-4 semaines selon l'envergure. Parlons de votre projet!";
        }

        return "Merci pour votre message! Un expert vous répondra sous peu. Pour une réponse immédiate, appelez-nous au (418) 123-4567";
    }
};

// === SYSTÈME DE RÉSERVATION ===
export const bookingSystem = {
    // Calendrier de consultation
    async initializeBookingCalendar() {
        const availableSlots = await this.getAvailableSlots();
        this.renderCalendar(availableSlots);
    },

    // Obtenir créneaux disponibles
    async getAvailableSlots() {
        try {
            const bookings = await wixData.query('Consultations')
                .ge('date', new Date())
                .limit(100)
                .find();

            return this.calculateAvailableSlots(bookings.items);
        } catch (error) {
            console.error('Erreur calendrier:', error);
            return this.getDefaultSlots();
        }
    },

    // Réserver consultation
    async bookConsultation(consultationData) {
        try {
            const booking = {
                ...consultationData,
                status: 'confirmée',
                createdDate: new Date(),
                confirmationCode: this.generateConfirmationCode()
            };

            const result = await wixData.save('Consultations', booking);

            // Envoyer confirmations
            await this.sendBookingConfirmation(result);
            await this.notifyTeamBooking(result);

            // Bloquer le créneau
            await this.blockTimeSlot(consultationData.date, consultationData.time);

            return result;
        } catch (error) {
            console.error('Erreur réservation:', error);
            throw new Error('Impossible de réserver la consultation');
        }
    },

    // Générer code de confirmation
    generateConfirmationCode() {
        return 'FC' + Date.now().toString(36).toUpperCase();
    }
};

// === SEO ET PERFORMANCE ===
export const seoOptimization = {
    // Optimiser SEO de page
    optimizePageSEO(pageData) {
        // Métadonnées dynamiques
        this.updateMetaTags(pageData);

        // Schema markup
        this.addStructuredData(pageData);

        // Open Graph
        this.updateOpenGraph(pageData);

        // Performance
        this.optimizeImages();
        this.preloadCriticalResources();
    },

    // Métadonnées dynamiques
    updateMetaTags(pageData) {
        document.title = pageData.title || 'Forza Construction - Expert en Rénovation';

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content',
                pageData.description || 'Spécialiste en rénovation résidentielle. Cuisine, salle de bain, sous-sol. Devis gratuit, garantie 10 ans.'
            );
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content',
                pageData.keywords || 'rénovation, construction, cuisine, salle de bain, entrepreneur, Québec'
            );
        }
    },

    // Schema markup pour SEO
    addStructuredData(pageData) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Forza Construction Inc.",
            "description": "Expert en rénovation résidentielle et construction",
            "url": "https://forza-construction.com",
            "telephone": "+1-418-123-4567",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Rue Construction",
                "addressLocality": "Québec",
                "postalCode": "G1A 1A1",
                "addressCountry": "CA"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "46.8139",
                "longitude": "-71.2080"
            },
            "openingHours": "Mo-Fr 08:00-17:00, Sa 09:00-15:00",
            "priceRange": "$$-$$$",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "200"
            },
            "service": [
                {
                    "@type": "Service",
                    "name": "Rénovation de cuisine",
                    "description": "Design et installation de cuisine sur mesure"
                },
                {
                    "@type": "Service",
                    "name": "Rénovation de salle de bain",
                    "description": "Transformation complète de salle de bain"
                }
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
};

// === EXPORT GLOBAL ===
window.forzaProfessionalTools = {
    leadManagement,
    analyticsManager,
    chatSystem,
    bookingSystem,
    seoOptimization
};

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    analyticsManager.trackUserEngagement();
    analyticsManager.trackPagePerformance();
    chatSystem.initializeChatWidget();
    seoOptimization.optimizePageSEO({});
});

export default {
    leadManagement,
    analyticsManager,
    chatSystem,
    bookingSystem,
    seoOptimization
};