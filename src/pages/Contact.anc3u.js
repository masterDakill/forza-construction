// Page Contact - Forza Construction Inc.
// Formulaire intelligent avec validation et automatisation

import wixLocation from 'wix-location';
import wixData from 'wix-data';

$w.onReady(function () {
    // === INITIALISATION ===
    setupContactForm();
    displayContactInfo();
    setupMap();
    setupBusinessHours();
    
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
        const contactInfo = {
            phone: '(418) 123-4567',
            email: 'constructionforzainc@gmail.com',
            address: '123 Boulevard Construction, Québec, QC G1V 0A1',
            urgence: '1-800-FORZA-24'
        };
        
        // Affichage
        $w('#textPhone').text = contactInfo.phone;
        $w('#textEmail').text = contactInfo.email;
        $w('#textAddress').text = contactInfo.address;
        
        // Liens cliquables
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
        $w('#textError').text = message;
        $w('#boxError').show('fade');
    }
    
    function trackConversion(type, data) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                'value': 1.0,
                'currency': 'CAD',
                'transaction_id': data.timestamp
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                value: 0.00,
                currency: 'CAD',
                content_name: type
            });
        }
    }
    
    function trackAction(action) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
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
});
