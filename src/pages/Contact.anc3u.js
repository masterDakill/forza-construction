// Page Contact - Forza Construction Inc.
// Formulaire intelligent avec validation et automatisation + optimisations mobile - VERSION OPTIMISÉE

import wixLocation from 'wix-location';
import wixData from 'wix-data';
import wixStorage from 'wix-storage';
import wixWindow from 'wix-window';
import { initMobileOptimizations } from './mobileOptimizations';
import FORZA_DESIGN_GUIDE, { generateGlobalCSS } from '../styles/designGuide';
import { initForzaSite } from '../utils/siteOrchestrator';

$w.onReady(function () {
    console.log('🚀 Contact Page - Optimisation Premium Loading...');

    // === ORCHESTRATEUR ===
    initForzaSite('contact', { enableSEO: true, enableAnalytics: true, enableNavigation: true, enablePerformance: true });

    // === INITIALISATION PREMIUM ===
    applyModernDesign();
    setupContactForm();
    displayContactInfo();
    setupMap();
    setupBusinessHours();
    applyFormStyles();

    // === OPTIMISATIONS MOBILE ===
    initMobileOptimizations();
    setupMobileContactFeatures();

    console.log('✅ Contact page optimisée et chargée');

    // === DESIGN MODERNE ===
    function applyModernDesign() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Injecter CSS global
        const style = document.createElement('style');
        style.id = 'forza-contact-design';
        style.textContent = generateGlobalCSS();
        document.head.appendChild(style);

        // Hero Section - Contact
        if ($w('#heroContact')) {
            $w('#heroContact').style = {
                background: FORZA_DESIGN_GUIDE.colors.secondary.gradient,
                padding: isMobile ?
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`,
                textAlign: 'center'
            };
        }

        // Titre principal
        if ($w('#titleContactPage')) {
            $w('#titleContactPage').text = isMobile ?
                "Contactez-Nous" :
                "Parlons de Votre Projet de Construction";
            $w('#titleContactPage').style = {
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
        if ($w('#subtitleContactPage')) {
            $w('#subtitleContactPage').text = isMobile ?
                "Réponse garantie en 24h" :
                "Notre équipe d'experts est prête à répondre à toutes vos questions • Réponse garantie en moins de 24 heures";
            $w('#subtitleContactPage').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.body :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h5,
                color: FORZA_DESIGN_GUIDE.colors.neutral.gray[300],
                lineHeight: FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed
            };
        }
    }

    function applyFormStyles() {
        const isMobile = wixWindow.viewMode === 'mobile';

        // Container du formulaire
        if ($w('#formContact')) {
            $w('#formContact').style = {
                background: FORZA_DESIGN_GUIDE.colors.neutral.white,
                padding: isMobile ? FORZA_DESIGN_GUIDE.spacing.xl : FORZA_DESIGN_GUIDE.spacing['2xl'],
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.xl,
                boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.xl
            };
        }

        // Titre du formulaire
        if ($w('#titleForm')) {
            $w('#titleForm').text = "Décrivez-nous votre projet";
            $w('#titleForm').style = {
                fontSize: isMobile ?
                    FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h3 :
                    FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h3,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                color: FORZA_DESIGN_GUIDE.colors.secondary.main,
                marginBottom: FORZA_DESIGN_GUIDE.spacing.xl
            };
        }

        // Style des inputs
        const inputFields = [
            '#inputNom', '#inputEmail', '#inputPhone',
            '#inputEntreprise', '#inputMessage'
        ];

        inputFields.forEach(fieldId => {
            if ($w(fieldId)) {
                $w(fieldId).style = {
                    padding: FORZA_DESIGN_GUIDE.components.input.padding,
                    fontSize: FORZA_DESIGN_GUIDE.components.input.fontSize,
                    background: FORZA_DESIGN_GUIDE.components.input.background,
                    border: FORZA_DESIGN_GUIDE.components.input.border,
                    borderRadius: FORZA_DESIGN_GUIDE.components.input.borderRadius,
                    transition: FORZA_DESIGN_GUIDE.components.input.transition
                };
            }
        });

        // Dropdown
        if ($w('#dropdownSujet')) {
            $w('#dropdownSujet').style = {
                padding: FORZA_DESIGN_GUIDE.components.input.padding,
                fontSize: FORZA_DESIGN_GUIDE.components.input.fontSize,
                border: FORZA_DESIGN_GUIDE.components.input.border,
                borderRadius: FORZA_DESIGN_GUIDE.components.input.borderRadius
            };
        }

        // Bouton submit avec style premium
        if ($w('#btnSubmitContact')) {
            $w('#btnSubmitContact').label = isMobile ?
                "ENVOYER MA DEMANDE" :
                "ENVOYER MA DEMANDE ET OBTENIR UNE RÉPONSE RAPIDE →";
            $w('#btnSubmitContact').style = {
                background: FORZA_DESIGN_GUIDE.colors.primary.gradient,
                color: FORZA_DESIGN_GUIDE.colors.neutral.white,
                padding: FORZA_DESIGN_GUIDE.components.button.sizes.large.padding,
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.lg,
                boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.primary,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                marginTop: FORZA_DESIGN_GUIDE.spacing.xl
            };
        }

        // Section info de contact
        if ($w('#contactInfoSection')) {
            $w('#contactInfoSection').style = {
                background: FORZA_DESIGN_GUIDE.colors.neutral.gray[50],
                padding: isMobile ?
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile}` :
                    `${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop}`,
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.xl
            };
        }
    }
    
    // === FORMULAIRE DE CONTACT AVANCÉ ===
    function setupContactForm() {
        // Pré-remplissage si données de session
        prefillForm();
        
        // Validation en temps réel
        setupFieldValidation();
        
        // Soumission du formulaire
        $w('#btnSubmitContact').onClick(async () => {
            if (await validateForm()) {
                submitForm();
            }
        });
    }
    
    function prefillForm() {
        // Récupérer données de session (depuis Services ou autre page)
        if (wixStorage.session) {
            const estimateData = wixStorage.session.getItem('estimateData');
            if (estimateData) {
                const data = JSON.parse(estimateData);
                $w('#inputMessage').value = `Projet: ${data.projectType}\nSurface: ${data.surface} pi²\nEstimation: ${data.estimatedPrice}$`;
            }
        }
        
        // Pré-remplir selon source
        const source = wixLocation.query.source;
        if (source) {
            $w('#dropdownSujet').value = source;
        }
    }
    
    function setupFieldValidation() {
        // Validation email
        $w('#inputEmail').onCustomValidation((value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "Veuillez entrer un email valide";
            }
        });
        
        // Validation téléphone
        $w('#inputPhone').onCustomValidation((value) => {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            const cleanPhone = value.replace(/\D/g, '');
            if (!phoneRegex.test(value) || cleanPhone.length < 10) {
                return "Numéro de téléphone invalide (10 chiffres minimum)";
            }
        });
        
        // Format automatique du téléphone
        $w('#inputPhone').onChange((event) => {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length === 10) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                $w('#inputPhone').value = value;
            }
        });
    }
    
    async function validateForm() {
        const requiredFields = [
            { id: '#inputNom', name: 'Nom' },
            { id: '#inputEmail', name: 'Email' },
            { id: '#inputPhone', name: 'Téléphone' },
            { id: '#inputMessage', name: 'Message' }
        ];
        
        let isValid = true;
        let errors = [];
        
        requiredFields.forEach(field => {
            const value = $w(field.id).value;
            if (!value || value.trim() === '') {
                errors.push(`${field.name} est requis`);
                $w(field.id).style.borderColor = '#ff0000';
                isValid = false;
            } else {
                $w(field.id).style.borderColor = '#cccccc';
            }
        });
        
        if (!isValid) {
            showErrors(errors);
        }
        
        return isValid;
    }
    
    async function submitForm() {
        // Afficher loader
        $w('#btnSubmitContact').disable();
        $w('#btnSubmitContact').label = "Envoi en cours...";
        
        const formData = {
            nom: $w('#inputNom').value,
            email: $w('#inputEmail').value,
            phone: $w('#inputPhone').value,
            entreprise: $w('#inputEntreprise').value || '',
            sujet: $w('#dropdownSujet').value,
            message: $w('#inputMessage').value,
            urgence: $w('#checkboxUrgent').checked,
            newsletter: $w('#checkboxNewsletter').checked,
            timestamp: new Date().toISOString(),
            source: 'Contact Form',
            ip: await getUserIP()
        };
        
        try {
            // 1. Sauvegarder dans Wix Data
            await wixData.insert('ContactSubmissions', formData);
            
            // 2. Envoyer vers Make.com/Zapier
            await sendToAutomation(formData);
            
            // 3. Notification email
            await sendEmailNotification(formData);
            
            // 4. Tracking conversion
            trackConversion('contact_form', formData);
            
            // 5. Message de succès
            showSuccess();
            
            // 6. Redirection après 3 secondes
            setTimeout(() => {
                wixLocation.to('/merci');
            }, 3000);
            
        } catch (error) {
            console.error('Erreur soumission:', error);
            showError("Une erreur est survenue. Veuillez réessayer.");
            $w('#btnSubmitContact').enable();
            $w('#btnSubmitContact').label = "Envoyer";
        }
    }
    
    async function sendToAutomation(data) {
        // Webhook Make.com
        const webhookUrl = 'https://hook.make.com/your-forza-webhook';
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Webhook failed');
        }
    }
    
    async function sendEmailNotification(data) {
        // Email immédiat au propriétaire si urgent
        if (data.urgence) {
            // Trigger email urgent
            await wixData.insert('UrgentNotifications', {
                ...data,
                priority: 'HIGH'
            });
        }
    }
    
    // === INFORMATIONS DE CONTACT ===
    function displayContactInfo() {
        const isMobile = wixWindow.viewMode === 'mobile';

        const contactInfo = {
            phone: '(418) 123-4567',
            email: 'constructionforzainc@gmail.com',
            address: '123 Boulevard Construction, Québec, QC G1V 0A1',
            urgence: '1-800-FORZA-24',
            hours: 'Lun-Ven: 7h-18h | Sam: 8h-16h'
        };

        // Affichage avec style
        if ($w('#textPhone')) {
            $w('#textPhone').text = `📞 ${contactInfo.phone}`;
            $w('#textPhone').style = {
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h4,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                color: FORZA_DESIGN_GUIDE.colors.primary.main
            };
        }

        if ($w('#textEmail')) {
            $w('#textEmail').text = `✉️ ${contactInfo.email}`;
            $w('#textEmail').style = {
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                color: FORZA_DESIGN_GUIDE.colors.neutral.gray[700]
            };
        }

        if ($w('#textAddress')) {
            $w('#textAddress').text = `📍 ${contactInfo.address}`;
            $w('#textAddress').style = {
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                color: FORZA_DESIGN_GUIDE.colors.neutral.gray[700],
                lineHeight: FORZA_DESIGN_GUIDE.typography.lineHeight.relaxed
            };
        }

        if ($w('#textHours')) {
            $w('#textHours').text = `🕐 ${contactInfo.hours}`;
            $w('#textHours').style = {
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body,
                color: FORZA_DESIGN_GUIDE.colors.neutral.gray[700]
            };
        }

        if ($w('#textUrgence')) {
            $w('#textUrgence').text = `🚨 Urgence 24/7: ${contactInfo.urgence}`;
            $w('#textUrgence').style = {
                fontSize: FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h5,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.bold,
                color: FORZA_DESIGN_GUIDE.colors.status.error,
                background: FORZA_DESIGN_GUIDE.colors.neutral.gray[100],
                padding: FORZA_DESIGN_GUIDE.spacing.md,
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.md,
                marginTop: FORZA_DESIGN_GUIDE.spacing.lg
            };
        }

        // Liens cliquables avec style
        if ($w('#btnCallNow')) {
            $w('#btnCallNow').label = isMobile ? "APPELER" : "APPELER MAINTENANT";
            $w('#btnCallNow').style = {
                background: FORZA_DESIGN_GUIDE.colors.primary.gradient,
                color: FORZA_DESIGN_GUIDE.colors.neutral.white,
                padding: FORZA_DESIGN_GUIDE.components.button.sizes.medium.padding,
                borderRadius: FORZA_DESIGN_GUIDE.effects.borderRadius.lg,
                boxShadow: FORZA_DESIGN_GUIDE.effects.boxShadow.primary,
                fontWeight: FORZA_DESIGN_GUIDE.typography.fontWeight.semibold,
                border: 'none',
                cursor: 'pointer',
                width: isMobile ? '100%' : 'auto'
            };
            $w('#btnCallNow').onClick(() => {
                wixLocation.to(`tel:${contactInfo.phone.replace(/\D/g, '')}`);
            trackAction('phone_click');
        });
        
        $w('#btnEmailUs').onClick(() => {
            wixLocation.to(`mailto:${contactInfo.email}`);
            trackAction('email_click');
        });
        
        $w('#btnDirections').onClick(() => {
            const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`;
            wixLocation.to(mapsUrl);
            trackAction('directions_click');
        });
    }
    
    // === CARTE GOOGLE MAPS ===
    function setupMap() {
        if ($w('#htmlMap')) {
            const mapHTML = `
                <iframe 
                    width="100%" 
                    height="400" 
                    frameborder="0" 
                    style="border:0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.7309520833974!2d-71.24846768436956!3d46.82844897914054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQ5JzQyLjQiTiA3McKwMTQnNTQuNCJX!5e0!3m2!1sfr!2sca!4v1234567890"
                    allowfullscreen>
                </iframe>
            `;
            $w('#htmlMap').html = mapHTML;
        }
    }
    
    // === HEURES D'OUVERTURE ===
    function setupBusinessHours() {
        const hours = [
            { day: 'Lundi', hours: '7h00 - 17h00', open: true },
            { day: 'Mardi', hours: '7h00 - 17h00', open: true },
            { day: 'Mercredi', hours: '7h00 - 17h00', open: true },
            { day: 'Jeudi', hours: '7h00 - 17h00', open: true },
            { day: 'Vendredi', hours: '7h00 - 17h00', open: true },
            { day: 'Samedi', hours: '8h00 - 12h00', open: true },
            { day: 'Dimanche', hours: 'Urgences seulement', open: false }
        ];
        
        // Vérifier si ouvert maintenant
        const now = new Date();
        const dayIndex = now.getDay();
        const currentHour = now.getHours();
        
        let isOpen = false;
        if (dayIndex >= 1 && dayIndex <= 5) { // Lun-Ven
            isOpen = currentHour >= 7 && currentHour < 17;
        } else if (dayIndex === 6) { // Sam
            isOpen = currentHour >= 8 && currentHour < 12;
        }
        
        // Affichage statut
        if (isOpen) {
            $w('#textStatus').text = "🟢 Nous sommes OUVERTS";
            $w('#textStatus').style.color = "#28a745";
        } else {
            $w('#textStatus').text = "🔴 Nous sommes FERMÉS";
            $w('#textStatus').style.color = "#dc3545";
            $w('#textUrgence').show();
            $w('#textUrgence').text = "Pour urgences: 1-800-FORZA-24";
        }
        
        // Afficher horaire
        if ($w('#repeaterHours')) {
            $w('#repeaterHours').data = hours;
            $w('#repeaterHours').onItemReady(($item, hour) => {
                $item('#textDay').text = hour.day;
                $item('#textHours').text = hour.hours;
                
                // Highlight aujourd'hui
                const todayName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][dayIndex];
                if (hour.day === todayName) {
                    $item('#boxDay').style.backgroundColor = "#f8f9fa";
                }
            });
        }
    }
    
    // === FONCTIONS UTILITAIRES ===
    function showErrors(errors) {
        $w('#textErrors').text = errors.join('\n');
        $w('#boxErrors').show('fade');
    }
    
    function showSuccess() {
        $w('#boxSuccess').show('fade');
        $w('#textSuccess').text = "Message envoyé avec succès! Nous vous contacterons dans les 24h.";
        $w('#formContact').hide('fade');
    }
    
    function showError(message) {
        if ($w('#textError')) {
            $w('#textError').text = message;
            $w('#textError').style.color = '#E74C3C';
            $w('#textError').style.background = 'rgba(231, 76, 60, 0.1)';
            $w('#textError').style.padding = '1rem';
            $w('#textError').style.borderRadius = '8px';
            $w('#textError').style.border = '1px solid rgba(231, 76, 60, 0.2)';
        }
        if ($w('#boxError')) {
            $w('#boxError').show('fade');
        }
    }
    
    function trackConversion(type, data) {
        // Google Analytics - vérification sécurisée
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                'value': 1.0,
                'currency': 'CAD',
                'transaction_id': data.timestamp
            });
        }
        
        // Facebook Pixel - vérification sécurisée
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'Lead', {
                value: 0.00,
                currency: 'CAD',
                content_name: type
            });
        }
    }
    
    function trackAction(action) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', action, {
                'event_category': 'engagement',
                'event_label': 'contact_page'
            });
        }
    }
    
    async function getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch {
            return 'unknown';
        }
    }
    
    // === FONCTIONNALITÉS MOBILES SPÉCIFIQUES ===
    function setupMobileContactFeatures() {
        if (!window.mobileDetector?.isMobile) return;
        
        // 1. Quick Actions mobiles
        setupMobileQuickActions();
        
        // 2. Formulaire mobile optimisé
        setupMobileFormEnhancements();
        
        // 3. Géolocalisation intelligente
        setupMobileLocation();
        
        // 4. Contact rapide par voix
        setupVoiceInput();
        
        // 5. Partage de localisation
        setupLocationSharing();
    }
    
    function setupMobileQuickActions() {
        // Barre d'actions rapides mobile
        if ($w('#htmlMobileActions')) {
            const actionsHTML = `
                <div class="mobile-quick-actions" style="
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #2c3e50, #34495e);
                    padding: 15px;
                    display: flex;
                    justify-content: space-around;
                    box-shadow: 0 -2px 20px rgba(0,0,0,0.3);
                    z-index: 999;
                ">
                    <button id="quickCall" class="action-btn" style="
                        background: #27ae60;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 25px;
                        font-weight: bold;
                        flex: 1;
                        margin: 0 5px;
                        font-size: 14px;
                    ">
                        📞 Appeler
                    </button>
                    <button id="quickWhatsApp" class="action-btn" style="
                        background: #25d366;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 25px;
                        font-weight: bold;
                        flex: 1;
                        margin: 0 5px;
                        font-size: 14px;
                    ">
                        💬 WhatsApp
                    </button>
                    <button id="quickEmail" class="action-btn" style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 25px;
                        font-weight: bold;
                        flex: 1;
                        margin: 0 5px;
                        font-size: 14px;
                    ">
                        ✉️ Email
                    </button>
                </div>
            `;
            $w('#htmlMobileActions').html = actionsHTML;
            
            // Event listeners
            setTimeout(() => {
                document.getElementById('quickCall')?.addEventListener('click', () => {
                    trackAction('quick_call_mobile');
                    wixLocation.to('tel:4181234567');
                });
                
                document.getElementById('quickWhatsApp')?.addEventListener('click', () => {
                    trackAction('quick_whatsapp_mobile');
                    const message = encodeURIComponent('Bonjour! Je souhaite obtenir un devis pour mon projet de construction.');
                    wixLocation.to(`https://wa.me/14181234567?text=${message}`);
                });
                
                document.getElementById('quickEmail')?.addEventListener('click', () => {
                    trackAction('quick_email_mobile');
                    wixLocation.to('mailto:constructionforzainc@gmail.com?subject=Demande de devis');
                });
            }, 100);
        }
    }
    
    function setupMobileFormEnhancements() {
        // Auto-complétion intelligente mobile
        setupSmartAutocomplete();
        
        // Validation visuelle améliorée
        setupEnhancedValidation();
        
        // Sauvegarde automatique
        setupAutoSave();
        
        // Soumission optimisée
        setupOptimizedSubmission();
    }
    
    function setupSmartAutocomplete() {
        // Suggestions basées sur localisation
        if ($w('#inputVille')) {
            const villesQuebec = [
                'Québec', 'Lévis', 'Beauport', 'Sainte-Foy', 'Charlesbourg',
                'Ancienne-Lorette', 'Saint-Augustin-de-Desmaures'
            ];
            
            $w('#inputVille').onInput = (event) => {
                const value = event.target.value.toLowerCase();
                const suggestions = villesQuebec.filter(ville => 
                    ville.toLowerCase().includes(value)
                );
                
                if (suggestions.length > 0 && value.length > 2) {
                    showCitySuggestions(suggestions);
                }
            };
        }
        
        // Auto-détection du type de projet
        if ($w('#inputMessage')) {
            $w('#inputMessage').onInput = (event) => {
                const message = event.target.value.toLowerCase();
                const projectTypes = {
                    'cuisine': 'Rénovation de cuisine',
                    'salle de bain': 'Rénovation de salle de bain',
                    'toiture': 'Réfection de toiture',
                    'fondation': 'Réparation de fondation',
                    'extension': 'Agrandissement'
                };
                
                Object.keys(projectTypes).forEach(keyword => {
                    if (message.includes(keyword) && $w('#dropdownSujet')) {
                        $w('#dropdownSujet').value = projectTypes[keyword];
                    }
                });
            };
        }
    }
    
    function setupEnhancedValidation() {
        // Validation en temps réel avec indicateurs visuels
        const fields = [
            { id: '#inputNom', type: 'name' },
            { id: '#inputEmail', type: 'email' },
            { id: '#inputPhone', type: 'phone' }
        ];
        
        fields.forEach(field => {
            if ($w(field.id)) {
                addValidationIndicator(field.id, field.type);
            }
        });
    }
    
    function addValidationIndicator(fieldId, type) {
        $w(fieldId).onInput = (event) => {
            const value = event.target.value;
            const isValid = validateFieldType(value, type);
            
            // Indicateur visuel mobile
            const indicator = isValid ? '✅' : '❌';
            const color = isValid ? '#27ae60' : '#e74c3c';
            
            // Ajouter indicateur (simulé avec border et couleur)
            $w(fieldId).style.borderColor = color;
            $w(fieldId).style.borderWidth = '2px';
            
            // Feedback haptique
            if (!isValid && navigator.vibrate) {
                navigator.vibrate(50);
            }
        };
    }
    
    function validateFieldType(value, type) {
        switch (type) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'phone':
                return /^[\d\s\-\(\)\+]+$/.test(value) && value.replace(/\D/g, '').length >= 10;
            case 'name':
                return value.length >= 2;
            default:
                return true;
        }
    }
    
    function setupAutoSave() {
        // Sauvegarde automatique des données de formulaire
        const formFields = ['#inputNom', '#inputEmail', '#inputPhone', '#inputMessage'];
        
        formFields.forEach(fieldId => {
            if ($w(fieldId)) {
                $w(fieldId).onInput = (event) => {
                    saveFormData(fieldId, event.target.value);
                };
            }
        });
        
        // Restaurer données sauvegardées
        restoreFormData();
    }
    
    function saveFormData(fieldId, value) {
        if (typeof Storage !== 'undefined') {
            const formData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
            formData[fieldId] = value;
            formData.timestamp = Date.now();
            localStorage.setItem('contactFormData', JSON.stringify(formData));
        }
    }
    
    function restoreFormData() {
        if (typeof Storage !== 'undefined') {
            const formData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
            const maxAge = 24 * 60 * 60 * 1000; // 24 heures
            
            if (formData.timestamp && (Date.now() - formData.timestamp) < maxAge) {
                Object.keys(formData).forEach(fieldId => {
                    if (fieldId !== 'timestamp' && $w(fieldId)) {
                        $w(fieldId).value = formData[fieldId];
                    }
                });
                
                // Afficher message de restauration
                if ($w('#textAutoSaveRestore')) {
                    $w('#textAutoSaveRestore').text = "📝 Données précédentes restaurées";
                    $w('#textAutoSaveRestore').show('fade');
                    setTimeout(() => $w('#textAutoSaveRestore').hide('fade'), 3000);
                }
            }
        }
    }
    
    function setupOptimizedSubmission() {
        // Soumission optimisée avec retry et offline support
        if ($w('#btnSubmitContact')) {
            $w('#btnSubmitContact').onClick(async () => {
                if (!navigator.onLine) {
                    handleOfflineSubmission();
                    return;
                }
                
                // Soumission normale avec retry
                await submitWithRetry();
            });
        }
    }
    
    function handleOfflineSubmission() {
        // Sauvegarder pour soumission ultérieure
        const formData = collectFormData();
        
        if (typeof Storage !== 'undefined') {
            const pendingSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
            pendingSubmissions.push({
                ...formData,
                timestamp: Date.now(),
                attempts: 0
            });
            localStorage.setItem('pendingSubmissions', JSON.stringify(pendingSubmissions));
        }
        
        showOfflineMessage();
        
        // Écouter reconnexion
        window.addEventListener('online', processPendingSubmissions);
    }
    
    function showOfflineMessage() {
        if ($w('#textOfflineMessage')) {
            $w('#textOfflineMessage').text = "📱 Mode hors ligne - Votre message sera envoyé dès la reconnexion";
            $w('#textOfflineMessage').show('fade');
        }
    }
    
    function processPendingSubmissions() {
        if (typeof Storage === 'undefined') return;
        
        const pendingSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
        
        pendingSubmissions.forEach(async (submission, index) => {
            try {
                await sendToAutomation(submission);
                // Supprimer de la liste des en attente
                pendingSubmissions.splice(index, 1);
                localStorage.setItem('pendingSubmissions', JSON.stringify(pendingSubmissions));
                
                showReconnectionSuccess();
            } catch (error) {
                console.error('Failed to send pending submission:', error);
            }
        });
    }
    
    function showReconnectionSuccess() {
        if ($w('#textReconnectionSuccess')) {
            $w('#textReconnectionSuccess').text = "✅ Messages en attente envoyés avec succès!";
            $w('#textReconnectionSuccess').show('fade');
            setTimeout(() => $w('#textReconnectionSuccess').hide('fade'), 5000);
        }
    }
    
    function setupMobileLocation() {
        // Géolocalisation pour pré-remplir adresse
        if ($w('#btnDetectLocation') && 'geolocation' in navigator) {
            $w('#btnDetectLocation').onClick(() => {
                $w('#btnDetectLocation').label = "Localisation...";
                $w('#btnDetectLocation').disable();
                
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        reverseGeocode(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                        $w('#btnDetectLocation').label = "Localiser";
                        $w('#btnDetectLocation').enable();
                        showLocationError();
                    }
                );
            });
        }
    }
    
    async function reverseGeocode(lat, lng) {
        try {
            // Utiliser service de géocodage inversé
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=fr`);
            const data = await response.json();
            
            if (data && data.city) {
                if ($w('#inputVille')) {
                    $w('#inputVille').value = data.city;
                }
                if ($w('#inputCodePostal')) {
                    $w('#inputCodePostal').value = data.postcode || '';
                }
                
                showLocationSuccess(data.city);
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
        }
        
        $w('#btnDetectLocation').label = "Localiser";
        $w('#btnDetectLocation').enable();
    }
    
    function showLocationSuccess(city) {
        if ($w('#textLocationSuccess')) {
            $w('#textLocationSuccess').text = `📍 Localisation détectée: ${city}`;
            $w('#textLocationSuccess').show('fade');
            setTimeout(() => $w('#textLocationSuccess').hide('fade'), 3000);
        }
    }
    
    function showLocationError() {
        if ($w('#textLocationError')) {
            $w('#textLocationError').text = "❌ Impossible de détecter votre localisation";
            $w('#textLocationError').show('fade');
            setTimeout(() => $w('#textLocationError').hide('fade'), 3000);
        }
    }
    
    function setupVoiceInput() {
        // Input vocal pour le message (si supporté)
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition && $w('#btnVoiceInput')) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'fr-CA';
            
            $w('#btnVoiceInput').onClick(() => {
                startVoiceRecognition(recognition);
            });
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if ($w('#inputMessage')) {
                    $w('#inputMessage').value += (($w('#inputMessage').value ? ' ' : '') + transcript);
                }
                
                trackAction('voice_input_used');
            };
            
            recognition.onerror = (event) => {
                console.error('Voice recognition error:', event.error);
                showVoiceError();
            };
        } else if ($w('#btnVoiceInput')) {
            $w('#btnVoiceInput').hide(); // Masquer si non supporté
        }
    }
    
    function startVoiceRecognition(recognition) {
        $w('#btnVoiceInput').label = "🎤 Écoute...";
        $w('#btnVoiceInput').disable();
        
        recognition.start();
        
        setTimeout(() => {
            recognition.stop();
            $w('#btnVoiceInput').label = "🎤 Vocal";
            $w('#btnVoiceInput').enable();
        }, 5000);
    }
    
    function showVoiceError() {
        if ($w('#textVoiceError')) {
            $w('#textVoiceError').text = "❌ Erreur de reconnaissance vocale";
            $w('#textVoiceError').show('fade');
            setTimeout(() => $w('#textVoiceError').hide('fade'), 3000);
        }
    }
    
    function setupLocationSharing() {
        // Partage de localisation pour devis sur site
        if ($w('#btnShareLocation') && 'geolocation' in navigator) {
            $w('#btnShareLocation').onClick(() => {
                shareCurrentLocation();
            });
        }
    }
    
    function shareCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
                
                // Ajouter aux données de formulaire
                if ($w('#inputMessage')) {
                    const currentMessage = $w('#inputMessage').value;
                    $w('#inputMessage').value = currentMessage + 
                        `\n\n📍 Ma localisation: ${mapsLink}`;
                }
                
                showLocationShared();
                trackAction('location_shared');
            },
            (error) => {
                console.error('Location sharing error:', error);
                showLocationShareError();
            }
        );
    }
    
    function showLocationShared() {
        if ($w('#textLocationShared')) {
            $w('#textLocationShared').text = "📍 Localisation ajoutée au message";
            $w('#textLocationShared').show('fade');
            setTimeout(() => $w('#textLocationShared').hide('fade'), 3000);
        }
    }
    
    function showLocationShareError() {
        if ($w('#textLocationShareError')) {
            $w('#textLocationShareError').text = "❌ Impossible de partager la localisation";
            $w('#textLocationShareError').show('fade');
            setTimeout(() => $w('#textLocationShareError').hide('fade'), 3000);
        }
    }
    
    function collectFormData() {
        return {
            nom: $w('#inputNom')?.value || '',
            email: $w('#inputEmail')?.value || '',
            phone: $w('#inputPhone')?.value || '',
            entreprise: $w('#inputEntreprise')?.value || '',
            sujet: $w('#dropdownSujet')?.value || '',
            message: $w('#inputMessage')?.value || '',
            ville: $w('#inputVille')?.value || '',
            codePostal: $w('#inputCodePostal')?.value || '',
            urgence: $w('#checkboxUrgent')?.checked || false,
            newsletter: $w('#checkboxNewsletter')?.checked || false
        };
    }
    
    async function submitWithRetry(maxRetries = 3) {
        let attempts = 0;
        
        while (attempts < maxRetries) {
            try {
                const formData = collectFormData();
                await sendToAutomation(formData);
                
                // Succès - nettoyer données sauvegardées
                if (typeof Storage !== 'undefined') {
                    localStorage.removeItem('contactFormData');
                }
                
                showSuccess();
                return;
                
            } catch (error) {
                attempts++;
                console.error(`Submission attempt ${attempts} failed:`, error);
                
                if (attempts >= maxRetries) {
                    showSubmissionError();
                    return;
                }
                
                // Attendre avant nouvel essai
                await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
            }
        }
    }
    
    function showSubmissionError() {
        if ($w('#textSubmissionError')) {
            $w('#textSubmissionError').text = "❌ Erreur d'envoi. Veuillez réessayer ou nous appeler.";
            $w('#textSubmissionError').show('fade');
        }
    }
    
    function showCitySuggestions(suggestions) {
        // Afficher suggestions de villes (simulé)
        if ($w('#textCitySuggestions')) {
            $w('#textCitySuggestions').text = `💡 Suggestions: ${suggestions.slice(0, 3).join(', ')}`;
            $w('#textCitySuggestions').show('fade');
            setTimeout(() => $w('#textCitySuggestions').hide('fade'), 5000);
        }
    }
});
