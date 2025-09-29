// Modern Homepage Enhancements - Forza Construction Inc.
// Fonctionnalités avancées pour page d'accueil premium

import { premiumMarketingCopy, conversionContent, mobileOptimizedContent } from '../content/premiumMarketingCopy';
import { modernDesignSystem, designComponents } from '../styles/modernDesignSystem';

// === FONCTIONS D'AMÉLIORATION AVANCÉES ===

export function setupTrustIndicators() {
    // Créer section d'indicateurs de confiance
    const trustSection = createTrustIndicatorsSection();

    // Insérer après le héro
    const heroSection = $w('#heroSection');
    if (heroSection && heroSection.parent) {
        heroSection.parent.insertAfter(trustSection, heroSection);
    }
}

export function createTrustIndicatorsSection() {
    const section = $w.Section({
        id: 'trustIndicators',
        style: {
            background: 'linear-gradient(45deg, #f97316, #ea580c)',
            padding: '40px 20px',
            textAlign: 'center'
        }
    });

    // Ajouter indicateurs
    premiumMarketingCopy.hero.trustIndicators.forEach((indicator, index) => {
        const indicatorText = $w.Text({
            text: indicator,
            style: {
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 'bold',
                margin: '10px 20px',
                display: 'inline-block'
            }
        });

        section.appendChild(indicatorText);
    });

    return section;
}

export function setupPremiumCTA() {
    // CTA principal amélioré
    if ($w('#btnDevisGratuit')) {
        const ctaButton = $w('#btnDevisGratuit');

        // Appliquer style premium
        ctaButton.style = {
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '20px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            boxShadow: '0 8px 25px rgba(249, 115, 22, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        };

        // Animation au survol
        ctaButton.onMouseIn(() => {
            ctaButton.style.transform = 'translateY(-3px)';
            ctaButton.style.boxShadow = '0 12px 35px rgba(249, 115, 22, 0.5)';
        });

        ctaButton.onMouseOut(() => {
            ctaButton.style.transform = 'translateY(0)';
            ctaButton.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.4)';
        });

        // Tracking des clics
        ctaButton.onClick(() => {
            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    event_category: 'Conversion',
                    event_label: 'Hero CTA',
                    value: 1
                });
            }

            // Redirection optimisée
            wixLocation.to('/obtenir-un-devis');
        });
    }
}

export function setupAdvancedAnimations() {
    // Animation d'entrée pour les éléments
    const animatedElements = [
        '#textHeroTitle',
        '#textHeroSubtitle',
        '#btnDevisGratuit',
        '#servicesSection',
        '#testimonialsSection'
    ];

    animatedElements.forEach((selector, index) => {
        const element = $w(selector);
        if (element) {
            // Initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';

            // Animate in with delay
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });

    // Parallax effect pour le héro
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = $w('#heroSection');

        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

export function initializeConversionSystems() {
    // 1. Exit intent popup
    setupExitIntentPopup();

    // 2. Scroll-based CTAs
    setupScrollBasedCTAs();

    // 3. Social proof notifications
    setupSocialProofNotifications();

    // 4. Urgency timers
    setupUrgencyTimers();

    console.log('✅ Systèmes de conversion activés');
}

function setupExitIntentPopup() {
    let exitIntentTriggered = false;

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentTriggered) {
            exitIntentTriggered = true;
            showExitIntentModal();
        }
    });
}

function showExitIntentModal() {
    const modal = createExitIntentModal();
    document.body.appendChild(modal);

    // Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exit_intent_shown', {
            event_category: 'Engagement',
            event_label: 'Exit Intent Popup'
        });
    }
}

function createExitIntentModal() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        position: relative;
        animation: slideUp 0.3s ease;
    `;

    modal.innerHTML = `
        <button onclick="this.closest('[style*=\"position: fixed\"]').remove()"
                style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer;">×</button>

        <h2 style="color: #f97316; margin-bottom: 20px;">⏰ Attendez!</h2>

        <p style="font-size: 18px; margin-bottom: 25px; color: #333;">
            Obtenez votre <strong>consultation gratuite</strong> avant de partir!
        </p>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 0; color: #0369a1; font-weight: bold;">
                🎁 OFFRE SPÉCIALE: Consultation à domicile gratuite (valeur 150$)
            </p>
        </div>

        <button onclick="window.location.href='/obtenir-un-devis'"
                style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none;
                       padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;
                       cursor: pointer; width: 100%; margin-bottom: 15px;">
            OUI, JE VEUX MA CONSULTATION GRATUITE
        </button>

        <button onclick="this.closest('[style*=\"position: fixed\"]').remove()"
                style="background: none; border: none; color: #666; text-decoration: underline; cursor: pointer;">
            Non merci, je préfère payer plus cher ailleurs
        </button>
    `;

    overlay.appendChild(modal);
    return overlay;
}

function setupScrollBasedCTAs() {
    let cta50Shown = false;
    let cta80Shown = false;

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

        // CTA à 50% de scroll
        if (scrollPercent > 50 && !cta50Shown) {
            cta50Shown = true;
            showFloatingCTA('💡 Intéressé? Obtenez votre devis gratuit!');
        }

        // CTA à 80% de scroll
        if (scrollPercent > 80 && !cta80Shown) {
            cta80Shown = true;
            showFloatingCTA('🎯 Prêt à transformer votre maison?');
        }
    });
}

function showFloatingCTA(message) {
    const cta = document.createElement('div');
    cta.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f97316, #ea580c);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
        z-index: 1000;
        cursor: pointer;
        animation: slideIn 0.5s ease;
        max-width: 300px;
    `;

    cta.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">${message}</div>
        <button style="background: white; color: #f97316; border: none; padding: 8px 16px;
                       border-radius: 4px; font-weight: bold; width: 100%; cursor: pointer;">
            DEVIS GRATUIT
        </button>
    `;

    cta.onclick = () => {
        wixLocation.to('/obtenir-un-devis');
    };

    document.body.appendChild(cta);

    // Auto-remove après 10 secondes
    setTimeout(() => {
        cta.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => cta.remove(), 500);
    }, 10000);
}

function setupSocialProofNotifications() {
    const notifications = [
        "🎉 Marie-Claire vient de recevoir son devis pour une cuisine",
        "⭐ Jean-François a laissé un avis 5 étoiles",
        "🏆 Nouveau projet terminé à Sainte-Foy",
        "💬 Sophie vient de nous contacter pour sa salle de bain"
    ];

    let notificationIndex = 0;

    // Première notification après 15 secondes
    setTimeout(() => {
        showSocialProofNotification(notifications[notificationIndex]);
        notificationIndex = (notificationIndex + 1) % notifications.length;

        // Notifications suivantes toutes les 30 secondes
        setInterval(() => {
            showSocialProofNotification(notifications[notificationIndex]);
            notificationIndex = (notificationIndex + 1) % notifications.length;
        }, 30000);
    }, 15000);
}

function showSocialProofNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: white;
        border-left: 4px solid #22c55e;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInLeft 0.5s ease;
        max-width: 350px;
    `;

    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <div style="background: #22c55e; width: 8px; height: 8px; border-radius: 50%;
                        margin-right: 10px; animation: pulse 2s infinite;"></div>
            <span style="font-size: 14px; color: #333;">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutLeft 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

function setupUrgencyTimers() {
    // Timer pour offre limitée
    const urgencyMessages = conversionContent.urgencyMessages;
    const randomMessage = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];

    // Afficher après 30 secondes
    setTimeout(() => {
        showUrgencyBanner(randomMessage);
    }, 30000);
}

function showUrgencyBanner(message) {
    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(90deg, #dc2626, #ef4444);
        color: white;
        text-align: center;
        padding: 12px;
        z-index: 999;
        animation: slideDown 0.5s ease;
    `;

    banner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
            <span style="font-weight: bold;">${message}</span>
            <button onclick="wixLocation.to('/obtenir-un-devis')"
                    style="background: white; color: #dc2626; border: none; padding: 8px 16px;
                           border-radius: 4px; font-weight: bold; cursor: pointer;">
                PROFITER MAINTENANT
            </button>
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()"
                    style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">×</button>
        </div>
    `;

    document.body.appendChild(banner);

    // Ajuster le padding du body
    document.body.style.paddingTop = banner.offsetHeight + 'px';

    // Auto-remove après 15 secondes
    setTimeout(() => {
        banner.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            banner.remove();
            document.body.style.paddingTop = '0';
        }, 500);
    }, 15000);
}

// === ANIMATIONS CSS PERSONNALISÉES ===
const animationStyles = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

@keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutLeft {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-100%); opacity: 0; }
}

@keyframes slideDown {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
`;

// Injecter les animations
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Export des fonctions
export default {
    setupTrustIndicators,
    setupPremiumCTA,
    setupAdvancedAnimations,
    initializeConversionSystems
};