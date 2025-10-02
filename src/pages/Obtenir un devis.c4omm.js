// Page Obtenir un Devis - Forza Construction Inc.
// Formulaire intelligent avec calcul instantané et workflow automatisé

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixStorage from 'wix-storage';

$w.onReady(function () {
    // === INITIALISATION ===
    initializeQuoteForm();
    setupPriceCalculator();
    setupFormValidation();
    setupProgressSteps();
    loadReferenceData();
    
    // === DONNÉES DE RÉFÉRENCE ===
    const serviceCategories = {
        'renovation-cuisine': {
            name: 'Rénovation Cuisine',
            basePrice: 150,
            icon: '🍳',
            options: [
                { id: 'armoires-sur-mesure', name: 'Armoires sur mesure', multiplier: 1.3 },
                { id: 'comptoir-quartz', name: 'Comptoir en quartz', multiplier: 1.2 },
                { id: 'electromenagers-haut-gamme', name: 'Électroménagers haut de gamme', multiplier: 1.4 },
                { id: 'ilot-central', name: 'Îlot central', multiplier: 1.25 },
                { id: 'eclairage-led', name: 'Éclairage LED complet', multiplier: 1.1 }
            ]
        },
        'renovation-sdb': {
            name: 'Rénovation Salle de Bain',
            basePrice: 120,
            icon: '🚿',
            options: [
                { id: 'douche-italienne', name: 'Douche à l\'italienne', multiplier: 1.3 },
                { id: 'baignoire-autoportante', name: 'Baignoire autoportante', multiplier: 1.4 },
                { id: 'plancher-chauffant', name: 'Plancher chauffant', multiplier: 1.2 },
                { id: 'vanite-double', name: 'Vanité double lavabo', multiplier: 1.25 },
                { id: 'ceramique-haut-gamme', name: 'Céramique haut de gamme', multiplier: 1.15 }
            ]
        },
        'agrandissement': {
            name: 'Agrandissement',
            basePrice: 250,
            icon: '🏗️',
            options: [
                { id: 'fondations-completes', name: 'Fondations complètes', multiplier: 1.2 },
                { id: 'isolation-superieure', name: 'Isolation supérieure R24+', multiplier: 1.15 },
                { id: 'fenetres-triple-vitrage', name: 'Fenêtres triple vitrage', multiplier: 1.1 },
                { id: 'plancher-radiant', name: 'Plancher radiant', multiplier: 1.3 },
                { id: 'finition-premium', name: 'Finition premium', multiplier: 1.25 }
            ]
        },
        'sous-sol': {
            name: 'Aménagement Sous-sol',
            basePrice: 80,
            icon: '🏠',
            options: [
                { id: 'salle-eau-complete', name: 'Salle d\'eau complète', multiplier: 1.4 },
                { id: 'bar-integre', name: 'Bar intégré', multiplier: 1.3 },
                { id: 'cinema-maison', name: 'Cinéma maison', multiplier: 1.5 },
                { id: 'bureau-integre', name: 'Bureau intégré', multiplier: 1.2 },
                { id: 'isolation-acoustique', name: 'Isolation acoustique', multiplier: 1.15 }
            ]
        },
        'commercial': {
            name: 'Projet Commercial',
            basePrice: 180,
            icon: '🏢',
            options: [
                { id: 'systeme-climatisation', name: 'Système climatisation', multiplier: 1.25 },
                { id: 'electricite-industrielle', name: 'Électricité industrielle', multiplier: 1.3 },
                { id: 'acces-handicapes', name: 'Accès handicapés', multiplier: 1.1 },
                { id: 'systeme-securite', name: 'Système sécurité', multiplier: 1.15 },
                { id: 'parking-asphalte', name: 'Stationnement asphalté', multiplier: 1.2 }
            ]
        }
    };
    
    const urgencyLevels = {
        'standard': { name: 'Standard (4-6 semaines)', multiplier: 1.0 },
        'prioritaire': { name: 'Prioritaire (2-3 semaines)', multiplier: 1.15 },
        'urgent': { name: 'Urgent (1-2 semaines)', multiplier: 1.3 },
        'express': { name: 'Express (moins d\'1 semaine)', multiplier: 1.5 }
    };
    
    let currentQuote = {
        serviceType: '',
        surface: 0,
        options: [],
        urgency: 'standard',
        estimatedPrice: 0,
        clientInfo: {},
        step: 1
    };
    
    // === INITIALISATION FORMULAIRE ===
    function initializeQuoteForm() {
        setupServiceSelection();
        loadExistingData();
        updateProgressBar();
    }
    
    function setupServiceSelection() {
        if ($w('#repeaterServices')) {
            const servicesData = Object.keys(serviceCategories).map(key => ({
                id: key,
                ...serviceCategories[key]
            }));
            
            $w('#repeaterServices').data = servicesData;
            
            $w('#repeaterServices').onItemReady(($item, service) => {
                $item('#iconService').text = service.icon;
                $item('#nameService').text = service.name;
                $item('#basePriceService').text = `À partir de ${service.basePrice}$/pi²`;
                
                $item('#btnSelectService').onClick(() => {
                    selectService(service.id);
                    updateProgressBar();
                    goToStep(2);
                });
                
                // Animation hover
                $item('#boxService').onMouseIn = () => {
                    $item('#boxService').style.transform = 'scale(1.02)';
                    $item('#boxService').style.transition = 'transform 0.2s ease';
                    $item('#boxService').style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                };
                
                $item('#boxService').onMouseOut = () => {
                    $item('#boxService').style.transform = 'scale(1)';
                    $item('#boxService').style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                };
            });
        }
    }
    
    function selectService(serviceId) {
        currentQuote.serviceType = serviceId;
        currentQuote.options = []; // Reset options
        
        // Mettre à jour l'affichage
        if ($w('#textSelectedService')) {
            $w('#textSelectedService').text = serviceCategories[serviceId].name;
        }
        
        // Charger les options spécifiques
        loadServiceOptions(serviceId);
        
        // Track selection
        trackServiceSelection(serviceId);
    }
    
    function loadServiceOptions(serviceId) {
        const service = serviceCategories[serviceId];
        
        if ($w('#repeaterOptions')) {
            $w('#repeaterOptions').data = service.options;
            
            $w('#repeaterOptions').onItemReady(($item, option) => {
                $item('#nameOption').text = option.name;
                $item('#multiplierOption').text = `+${Math.round((option.multiplier - 1) * 100)}%`;
                
                $item('#checkboxOption').onChange(() => {
                    toggleOption(option.id, $item('#checkboxOption').checked);
                    calculateEstimate();
                });
            });
        }
    }
    
    // === CALCULATEUR DE PRIX ===
    function setupPriceCalculator() {
        // Surface
        if ($w('#inputSurface')) {
            $w('#inputSurface').onChange(() => {
                currentQuote.surface = Number($w('#inputSurface').value) || 0;
                calculateEstimate();
                
                // Validation en temps réel
                if (currentQuote.surface > 0) {
                    $w('#inputSurface').style.borderColor = '#28a745';
                } else {
                    $w('#inputSurface').style.borderColor = '#dc3545';
                }
            });
        }
        
        // Urgence
        if ($w('#dropdownUrgency')) {
            const urgencyOptions = Object.keys(urgencyLevels).map(key => ({
                label: urgencyLevels[key].name,
                value: key
            }));
            
            $w('#dropdownUrgency').options = urgencyOptions;
            
            $w('#dropdownUrgency').onChange(() => {
                currentQuote.urgency = $w('#dropdownUrgency').value;
                calculateEstimate();
            });
        }
        
        // Calculer estimation initiale
        calculateEstimate();
    }
    
    function toggleOption(optionId, isSelected) {
        if (isSelected) {
            if (!currentQuote.options.includes(optionId)) {
                currentQuote.options.push(optionId);
            }
        } else {
            currentQuote.options = currentQuote.options.filter(id => id !== optionId);
        }
    }
    
    function calculateEstimate() {
        if (!currentQuote.serviceType || !currentQuote.surface) {
            updatePriceDisplay(0);
            return;
        }
        
        const service = serviceCategories[currentQuote.serviceType];
        let basePrice = service.basePrice * currentQuote.surface;
        
        // Appliquer les options
        currentQuote.options.forEach(optionId => {
            const option = service.options.find(opt => opt.id === optionId);
            if (option) {
                basePrice *= option.multiplier;
            }
        });
        
        // Appliquer l'urgence
        const urgencyMultiplier = urgencyLevels[currentQuote.urgency].multiplier;
        const finalPrice = basePrice * urgencyMultiplier;
        
        currentQuote.estimatedPrice = Math.round(finalPrice);
        updatePriceDisplay(currentQuote.estimatedPrice);
        
        // Afficher détails du calcul
        showCalculationDetails();
    }
    
    function updatePriceDisplay(price) {
        if ($w('#textEstimatedPrice')) {
            const formattedPrice = new Intl.NumberFormat('fr-CA', {
                style: 'currency',
                currency: 'CAD'
            }).format(price);
            
            $w('#textEstimatedPrice').text = formattedPrice;
            
            // Animation du prix
            $w('#textEstimatedPrice').style.transform = 'scale(1.1)';
            setTimeout(() => {
                $w('#textEstimatedPrice').style.transform = 'scale(1)';
            }, 200);
        }
        
        // Mise à jour du bouton CTA
        if ($w('#btnGetDetailedQuote')) {
            if (price > 0) {
                $w('#btnGetDetailedQuote').label = `Obtenir un devis détaillé pour ${new Intl.NumberFormat('fr-CA', {
                    style: 'currency',
                    currency: 'CAD'
                }).format(price)}`;
                $w('#btnGetDetailedQuote').enable();
            } else {
                $w('#btnGetDetailedQuote').label = 'Complétez les informations';
                $w('#btnGetDetailedQuote').disable();
            }
        }
    }
    
    function showCalculationDetails() {
        if (!$w('#boxCalculationDetails')) return;
        
        const service = serviceCategories[currentQuote.serviceType];
        let detailsHTML = `
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; margin: 10px 0;">
                <h4>Détails du calcul:</h4>
                <p><strong>Service:</strong> ${service.name}</p>
                <p><strong>Surface:</strong> ${currentQuote.surface} pi²</p>
                <p><strong>Prix de base:</strong> ${service.basePrice}$/pi² = ${new Intl.NumberFormat('fr-CA', {
                    style: 'currency',
                    currency: 'CAD'
                }).format(service.basePrice * currentQuote.surface)}</p>
        `;
        
        if (currentQuote.options.length > 0) {
            detailsHTML += '<p><strong>Options sélectionnées:</strong></p><ul>';
            currentQuote.options.forEach(optionId => {
                const option = service.options.find(opt => opt.id === optionId);
                if (option) {
                    detailsHTML += `<li>${option.name} (+${Math.round((option.multiplier - 1) * 100)}%)</li>`;
                }
            });
            detailsHTML += '</ul>';
        }
        
        detailsHTML += `
                <p><strong>Urgence:</strong> ${urgencyLevels[currentQuote.urgency].name}</p>
                <hr>
                <p><strong>Estimation totale:</strong> ${new Intl.NumberFormat('fr-CA', {
                    style: 'currency',
                    currency: 'CAD'
                }).format(currentQuote.estimatedPrice)}</p>
                <small>* Prix approximatif. Un devis détaillé sera fourni après évaluation sur place.</small>
            </div>
        `;
        
        if ($w('#htmlCalculationDetails')) {
            $w('#htmlCalculationDetails').html = detailsHTML;
        }
    }
    
    // === GESTION DES ÉTAPES ===
    function setupProgressSteps() {
        const steps = [
            { number: 1, title: 'Type de projet', icon: '🏗️' },
            { number: 2, title: 'Détails & Options', icon: '⚙️' },
            { number: 3, title: 'Informations contact', icon: '📝' },
            { number: 4, title: 'Confirmation', icon: '✅' }
        ];
        
        if ($w('#repeaterSteps')) {
            $w('#repeaterSteps').data = steps;
            
            $w('#repeaterSteps').onItemReady(($item, step) => {
                $item('#numberStep').text = step.number;
                $item('#iconStep').text = step.icon;
                $item('#titleStep').text = step.title;
                
                // Style selon l'étape actuelle
                if (step.number === currentQuote.step) {
                    $item('#boxStep').style.backgroundColor = '#007bff';
                    $item('#boxStep').style.color = '#ffffff';
                } else if (step.number < currentQuote.step) {
                    $item('#boxStep').style.backgroundColor = '#28a745';
                    $item('#boxStep').style.color = '#ffffff';
                } else {
                    $item('#boxStep').style.backgroundColor = '#e9ecef';
                    $item('#boxStep').style.color = '#6c757d';
                }
            });
        }
    }
    
    function goToStep(stepNumber) {
        currentQuote.step = stepNumber;
        updateProgressBar();
        showStep(stepNumber);
        
        // Scroll vers le haut
        $w('#page').scrollTo();
    }
    
    function showStep(stepNumber) {
        // Masquer toutes les sections
        const sections = ['#sectionStep1', '#sectionStep2', '#sectionStep3', '#sectionStep4'];
        sections.forEach(section => {
            if ($w(section)) {
                $w(section).hide();
            }
        });
        
        // Afficher la section active
        if ($w(`#sectionStep${stepNumber}`)) {
            $w(`#sectionStep${stepNumber}`).show('fade', { duration: 500 });
        }
    }
    
    function updateProgressBar() {
        const progressPercent = (currentQuote.step - 1) * 33.33;
        
        if ($w('#barProgress')) {
            $w('#barProgress').style.width = `${progressPercent}%`;
        }
        
        if ($w('#textProgressPercent')) {
            $w('#textProgressPercent').text = `${Math.round(progressPercent)}% complété`;
        }
        
        setupProgressSteps(); // Réactualiser les étapes
    }
    
    // === VALIDATION FORMULAIRE ===
    function setupFormValidation() {
        // Validation des champs obligatoires
        const requiredFields = [
            { id: '#inputName', name: 'Nom' },
            { id: '#inputEmail', name: 'Email' },
            { id: '#inputPhone', name: 'Téléphone' },
            { id: '#inputAddress', name: 'Adresse' }
        ];
        
        requiredFields.forEach(field => {
            if ($w(field.id)) {
                $w(field.id).onBlur(() => {
                    validateField(field.id, field.name);
                });
            }
        });
        
        // Validation email
        if ($w('#inputEmail')) {
            $w('#inputEmail').onBlur(() => {
                validateEmail($w('#inputEmail').value);
            });
        }
        
        // Validation téléphone
        if ($w('#inputPhone')) {
            $w('#inputPhone').onBlur(() => {
                validatePhone($w('#inputPhone').value);
            });
        }
    }
    
    function validateField(fieldId, fieldName) {
        const value = $w(fieldId).value.trim();
        
        if (!value) {
            showFieldError(fieldId, `${fieldName} est requis`);
            return false;
        } else {
            showFieldSuccess(fieldId);
            return true;
        }
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showFieldError('#inputEmail', 'Email invalide');
            return false;
        } else {
            showFieldSuccess('#inputEmail');
            return true;
        }
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        
        if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
            showFieldError('#inputPhone', 'Téléphone invalide');
            return false;
        } else {
            showFieldSuccess('#inputPhone');
            return true;
        }
    }
    
    function showFieldError(fieldId, message) {
        $w(fieldId).style.borderColor = '#dc3545';
        
        // Afficher message d'erreur
        const errorId = fieldId + 'Error';
        if ($w(errorId)) {
            $w(errorId).text = message;
            $w(errorId).style.color = '#dc3545';
            $w(errorId).show();
        }
    }
    
    function showFieldSuccess(fieldId) {
        $w(fieldId).style.borderColor = '#28a745';
        
        // Masquer message d'erreur
        const errorId = fieldId + 'Error';
        if ($w(errorId)) {
            $w(errorId).hide();
        }
    }
    
    // === DONNÉES DE RÉFÉRENCE ===
    function loadReferenceData() {
        // Charger données depuis URL ou storage
        const urlParams = wixLocation.query;
        
        if (urlParams.service) {
            selectService(urlParams.service);
        }
        
        if (urlParams.ref) {
            loadProjectReference(urlParams.ref);
        }
        
        // Charger données de session si disponibles
        if (wixStorage.session) {
            const savedData = wixStorage.session.getItem('quoteData');
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    prefillForm(parsedData);
                } catch (error) {
                    console.log('Error loading saved data:', error);
                }
            }
        }
    }
    
    function loadProjectReference(projectId) {
        // Charger données du projet de référence
        if (wixStorage.session) {
            const referenceData = wixStorage.session.getItem('quoteReference');
            if (referenceData) {
                try {
                    const parsed = JSON.parse(referenceData);
                    prefillFromReference(parsed);
                } catch (error) {
                    console.log('Error loading reference data:', error);
                }
            }
        }
    }
    
    function prefillFromReference(referenceData) {
        if (referenceData.projectType) {
            selectService(referenceData.projectType);
        }
        
        if (referenceData.estimatedSurface && $w('#inputSurface')) {
            const surface = parseInt(referenceData.estimatedSurface.replace(/\D/g, ''));
            $w('#inputSurface').value = surface.toString();
            currentQuote.surface = surface;
        }
        
        // Afficher référence
        if ($w('#textReference') && referenceData.referenceProject) {
            $w('#textReference').text = `Inspiré de: ${referenceData.referenceProject}`;
            $w('#textReference').show();
        }
    }
    
    function prefillForm(data) {
        Object.keys(data).forEach(key => {
            if ($w(`#input${key.charAt(0).toUpperCase() + key.slice(1)}`)) {
                $w(`#input${key.charAt(0).toUpperCase() + key.slice(1)}`).value = data[key];
            }
        });
    }
    
    // === SOUMISSION FORMULAIRE ===
    if ($w('#btnSubmitQuote')) {
        $w('#btnSubmitQuote').onClick(() => {
            submitQuoteRequest();
        });
    }
    
    function submitQuoteRequest() {
        // Valider formulaire complet
        if (!validateCompleteForm()) {
            showError('Veuillez corriger les erreurs avant de continuer.');
            return;
        }
        
        // Collecter données complètes
        const quoteData = {
            ...currentQuote,
            clientInfo: {
                name: $w('#inputName').value,
                email: $w('#inputEmail').value,
                phone: $w('#inputPhone').value,
                address: $w('#inputAddress').value,
                preferredContact: $w('#dropdownPreferredContact').value,
                message: $w('#textAreaMessage').value
            },
            timestamp: new Date().toISOString(),
            source: 'Website Form'
        };
        
        // Afficher loader
        showSubmissionLoader();
        
        // Envoyer données
        sendQuoteRequest(quoteData)
            .then(() => {
                // Succès
                goToStep(4);
                showSuccessMessage();
                trackConversion('quote_submitted');
            })
            .catch((error) => {
                // Erreur
                hideSubmissionLoader();
                showError('Erreur lors de l\'envoi. Veuillez réessayer.');
                console.error('Quote submission error:', error);
            });
    }
    
    function validateCompleteForm() {
        let isValid = true;
        
        // Valider étape 1
        if (!currentQuote.serviceType) {
            isValid = false;
        }
        
        // Valider étape 2
        if (!currentQuote.surface || currentQuote.surface <= 0) {
            isValid = false;
        }
        
        // Valider étape 3
        const requiredFields = ['#inputName', '#inputEmail', '#inputPhone', '#inputAddress'];
        requiredFields.forEach(fieldId => {
            if (!$w(fieldId).value.trim()) {
                isValid = false;
                showFieldError(fieldId, 'Champ requis');
            }
        });
        
        if (!validateEmail($w('#inputEmail').value)) {
            isValid = false;
        }
        
        if (!validatePhone($w('#inputPhone').value)) {
            isValid = false;
        }
        
        return isValid;
    }
    
    async function sendQuoteRequest(data) {
        // Webhook vers Make.com ou système CRM
        const webhookUrl = 'https://hook.make.com/forza-construction-quotes';
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Sauvegarder dans Wix Data comme backup
            return await wixData.save('QuoteRequests', {
                ...data,
                status: 'nouveau',
                priority: data.urgency === 'express' || data.urgency === 'urgent' ? 'haute' : 'normale'
            });
            
        } catch (error) {
            console.error('Error sending quote request:', error);
            throw error;
        }
    }
    
    function showSubmissionLoader() {
        if ($w('#btnSubmitQuote')) {
            $w('#btnSubmitQuote').label = 'Envoi en cours...';
            $w('#btnSubmitQuote').disable();
        }
        
        if ($w('#iconLoader')) {
            $w('#iconLoader').show();
        }
    }
    
    function hideSubmissionLoader() {
        if ($w('#btnSubmitQuote')) {
            $w('#btnSubmitQuote').label = 'Envoyer ma demande';
            $w('#btnSubmitQuote').enable();
        }
        
        if ($w('#iconLoader')) {
            $w('#iconLoader').hide();
        }
    }
    
    function showSuccessMessage() {
        if ($w('#textSuccessMessage')) {
            $w('#textSuccessMessage').text = `Merci ${currentQuote.clientInfo.name}! Votre demande de devis a été envoyée avec succès. Nous vous contacterons dans les 24 heures.`;
        }
        
        if ($w('#textEstimationRecap')) {
            $w('#textEstimationRecap').text = `Estimation: ${new Intl.NumberFormat('fr-CA', {
                style: 'currency',
                currency: 'CAD'
            }).format(currentQuote.estimatedPrice)}`;
        }
        
        // Boutons de suivi
        if ($w('#btnScheduleVisit')) {
            $w('#btnScheduleVisit').onClick(() => {
                wixLocation.to('/contact?action=schedule&quote=' + Date.now());
            });
        }
        
        if ($w('#btnViewPortfolio')) {
            $w('#btnViewPortfolio').onClick(() => {
                wixLocation.to('/realisations');
            });
        }
    }
    
    function showError(message) {
        if ($w('#textErrorMessage')) {
            $w('#textErrorMessage').text = message;
            $w('#textErrorMessage').show('fade');
            
            setTimeout(() => {
                $w('#textErrorMessage').hide('fade');
            }, 5000);
        }
    }
    
    // === BOUTONS DE NAVIGATION ===
    if ($w('#btnNextStep2')) {
        $w('#btnNextStep2').onClick(() => {
            if (currentQuote.serviceType) {
                goToStep(2);
            } else {
                showError('Veuillez sélectionner un type de projet.');
            }
        });
    }
    
    if ($w('#btnNextStep3')) {
        $w('#btnNextStep3').onClick(() => {
            if (currentQuote.surface > 0) {
                goToStep(3);
            } else {
                showError('Veuillez indiquer la surface de votre projet.');
            }
        });
    }
    
    if ($w('#btnBackStep1')) {
        $w('#btnBackStep1').onClick(() => goToStep(1));
    }
    
    if ($w('#btnBackStep2')) {
        $w('#btnBackStep2').onClick(() => goToStep(2));
    }
    
    // === FONCTIONS UTILITAIRES ===
    function trackServiceSelection(serviceId) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'quote_service_selected', {
                service_type: serviceId,
                page: 'quote_form'
            });
        }
    }
    
    function trackConversion(event) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID',
                'event_category': 'lead_generation',
                'event_label': event,
                'value': currentQuote.estimatedPrice
            });
        }
        
        // Facebook Pixel
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'Lead', {
                value: currentQuote.estimatedPrice,
                currency: 'CAD',
                content_category: currentQuote.serviceType
            });
        }
    }
    
    // === SAUVEGARDE AUTOMATIQUE ===
    setInterval(() => {
        if (wixStorage.session && currentQuote.step > 1) {
            wixStorage.session.setItem('quoteData', JSON.stringify(currentQuote));
        }
    }, 30000); // Sauvegarde toutes les 30 secondes
    
    console.log('Quote form initialized with', Object.keys(serviceCategories).length, 'service categories');
});
