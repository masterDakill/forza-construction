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
        
        const service = serviceCategories[currentQuote.serviceType];\n        let basePrice = service.basePrice * currentQuote.surface;\n        \n        // Appliquer les options\n        currentQuote.options.forEach(optionId => {\n            const option = service.options.find(opt => opt.id === optionId);\n            if (option) {\n                basePrice *= option.multiplier;\n            }\n        });\n        \n        // Appliquer l'urgence\n        const urgencyMultiplier = urgencyLevels[currentQuote.urgency].multiplier;\n        const finalPrice = basePrice * urgencyMultiplier;\n        \n        currentQuote.estimatedPrice = Math.round(finalPrice);\n        updatePriceDisplay(currentQuote.estimatedPrice);\n        \n        // Afficher détails du calcul\n        showCalculationDetails();\n    }\n    \n    function updatePriceDisplay(price) {\n        if ($w('#textEstimatedPrice')) {\n            const formattedPrice = new Intl.NumberFormat('fr-CA', {\n                style: 'currency',\n                currency: 'CAD'\n            }).format(price);\n            \n            $w('#textEstimatedPrice').text = formattedPrice;\n            \n            // Animation du prix\n            $w('#textEstimatedPrice').style.transform = 'scale(1.1)';\n            setTimeout(() => {\n                $w('#textEstimatedPrice').style.transform = 'scale(1)';\n            }, 200);\n        }\n        \n        // Mise à jour du bouton CTA\n        if ($w('#btnGetDetailedQuote')) {\n            if (price > 0) {\n                $w('#btnGetDetailedQuote').label = `Obtenir un devis détaillé pour ${new Intl.NumberFormat('fr-CA', {\n                    style: 'currency',\n                    currency: 'CAD'\n                }).format(price)}`;\n                $w('#btnGetDetailedQuote').enable();\n            } else {\n                $w('#btnGetDetailedQuote').label = 'Complétez les informations';\n                $w('#btnGetDetailedQuote').disable();\n            }\n        }\n    }\n    \n    function showCalculationDetails() {\n        if (!$w('#boxCalculationDetails')) return;\n        \n        const service = serviceCategories[currentQuote.serviceType];\n        let detailsHTML = `\n            <div style=\"padding: 15px; background: #f8f9fa; border-radius: 8px; margin: 10px 0;\">\n                <h4>Détails du calcul:</h4>\n                <p><strong>Service:</strong> ${service.name}</p>\n                <p><strong>Surface:</strong> ${currentQuote.surface} pi²</p>\n                <p><strong>Prix de base:</strong> ${service.basePrice}$/pi² = ${new Intl.NumberFormat('fr-CA', {\n                    style: 'currency',\n                    currency: 'CAD'\n                }).format(service.basePrice * currentQuote.surface)}</p>\n        `;\n        \n        if (currentQuote.options.length > 0) {\n            detailsHTML += '<p><strong>Options sélectionnées:</strong></p><ul>';\n            currentQuote.options.forEach(optionId => {\n                const option = service.options.find(opt => opt.id === optionId);\n                if (option) {\n                    detailsHTML += `<li>${option.name} (+${Math.round((option.multiplier - 1) * 100)}%)</li>`;\n                }\n            });\n            detailsHTML += '</ul>';\n        }\n        \n        detailsHTML += `\n                <p><strong>Urgence:</strong> ${urgencyLevels[currentQuote.urgency].name}</p>\n                <hr>\n                <p><strong>Estimation totale:</strong> ${new Intl.NumberFormat('fr-CA', {\n                    style: 'currency',\n                    currency: 'CAD'\n                }).format(currentQuote.estimatedPrice)}</p>\n                <small>* Prix approximatif. Un devis détaillé sera fourni après évaluation sur place.</small>\n            </div>\n        `;\n        \n        if ($w('#htmlCalculationDetails')) {\n            $w('#htmlCalculationDetails').html = detailsHTML;\n        }\n    }\n    \n    // === GESTION DES ÉTAPES ===\n    function setupProgressSteps() {\n        const steps = [\n            { number: 1, title: 'Type de projet', icon: '🏗️' },\n            { number: 2, title: 'Détails & Options', icon: '⚙️' },\n            { number: 3, title: 'Informations contact', icon: '📝' },\n            { number: 4, title: 'Confirmation', icon: '✅' }\n        ];\n        \n        if ($w('#repeaterSteps')) {\n            $w('#repeaterSteps').data = steps;\n            \n            $w('#repeaterSteps').onItemReady(($item, step) => {\n                $item('#numberStep').text = step.number;\n                $item('#iconStep').text = step.icon;\n                $item('#titleStep').text = step.title;\n                \n                // Style selon l'étape actuelle\n                if (step.number === currentQuote.step) {\n                    $item('#boxStep').style.backgroundColor = '#007bff';\n                    $item('#boxStep').style.color = '#ffffff';\n                } else if (step.number < currentQuote.step) {\n                    $item('#boxStep').style.backgroundColor = '#28a745';\n                    $item('#boxStep').style.color = '#ffffff';\n                } else {\n                    $item('#boxStep').style.backgroundColor = '#e9ecef';\n                    $item('#boxStep').style.color = '#6c757d';\n                }\n            });\n        }\n    }\n    \n    function goToStep(stepNumber) {\n        currentQuote.step = stepNumber;\n        updateProgressBar();\n        showStep(stepNumber);\n        \n        // Scroll vers le haut\n        $w('#page').scrollTo();\n    }\n    \n    function showStep(stepNumber) {\n        // Masquer toutes les sections\n        const sections = ['#sectionStep1', '#sectionStep2', '#sectionStep3', '#sectionStep4'];\n        sections.forEach(section => {\n            if ($w(section)) {\n                $w(section).hide();\n            }\n        });\n        \n        // Afficher la section active\n        if ($w(`#sectionStep${stepNumber}`)) {\n            $w(`#sectionStep${stepNumber}`).show('fade', { duration: 500 });\n        }\n    }\n    \n    function updateProgressBar() {\n        const progressPercent = (currentQuote.step - 1) * 33.33;\n        \n        if ($w('#barProgress')) {\n            $w('#barProgress').style.width = `${progressPercent}%`;\n        }\n        \n        if ($w('#textProgressPercent')) {\n            $w('#textProgressPercent').text = `${Math.round(progressPercent)}% complété`;\n        }\n        \n        setupProgressSteps(); // Réactualiser les étapes\n    }\n    \n    // === VALIDATION FORMULAIRE ===\n    function setupFormValidation() {\n        // Validation des champs obligatoires\n        const requiredFields = [\n            { id: '#inputName', name: 'Nom' },\n            { id: '#inputEmail', name: 'Email' },\n            { id: '#inputPhone', name: 'Téléphone' },\n            { id: '#inputAddress', name: 'Adresse' }\n        ];\n        \n        requiredFields.forEach(field => {\n            if ($w(field.id)) {\n                $w(field.id).onBlur(() => {\n                    validateField(field.id, field.name);\n                });\n            }\n        });\n        \n        // Validation email\n        if ($w('#inputEmail')) {\n            $w('#inputEmail').onBlur(() => {\n                validateEmail($w('#inputEmail').value);\n            });\n        }\n        \n        // Validation téléphone\n        if ($w('#inputPhone')) {\n            $w('#inputPhone').onBlur(() => {\n                validatePhone($w('#inputPhone').value);\n            });\n        }\n    }\n    \n    function validateField(fieldId, fieldName) {\n        const value = $w(fieldId).value.trim();\n        \n        if (!value) {\n            showFieldError(fieldId, `${fieldName} est requis`);\n            return false;\n        } else {\n            showFieldSuccess(fieldId);\n            return true;\n        }\n    }\n    \n    function validateEmail(email) {\n        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n        \n        if (!emailRegex.test(email)) {\n            showFieldError('#inputEmail', 'Email invalide');\n            return false;\n        } else {\n            showFieldSuccess('#inputEmail');\n            return true;\n        }\n    }\n    \n    function validatePhone(phone) {\n        const phoneRegex = /^[\\d\\s\\-\\(\\)\\+]+$/;\n        \n        if (!phoneRegex.test(phone) || phone.replace(/\\D/g, '').length < 10) {\n            showFieldError('#inputPhone', 'Téléphone invalide');\n            return false;\n        } else {\n            showFieldSuccess('#inputPhone');\n            return true;\n        }\n    }\n    \n    function showFieldError(fieldId, message) {\n        $w(fieldId).style.borderColor = '#dc3545';\n        \n        // Afficher message d'erreur\n        const errorId = fieldId + 'Error';\n        if ($w(errorId)) {\n            $w(errorId).text = message;\n            $w(errorId).style.color = '#dc3545';\n            $w(errorId).show();\n        }\n    }\n    \n    function showFieldSuccess(fieldId) {\n        $w(fieldId).style.borderColor = '#28a745';\n        \n        // Masquer message d'erreur\n        const errorId = fieldId + 'Error';\n        if ($w(errorId)) {\n            $w(errorId).hide();\n        }\n    }\n    \n    // === DONNÉES DE RÉFÉRENCE ===\n    function loadReferenceData() {\n        // Charger données depuis URL ou storage\n        const urlParams = wixLocation.query;\n        \n        if (urlParams.service) {\n            selectService(urlParams.service);\n        }\n        \n        if (urlParams.ref) {\n            loadProjectReference(urlParams.ref);\n        }\n        \n        // Charger données de session si disponibles\n        if (wixStorage.session) {\n            const savedData = wixStorage.session.getItem('quoteData');\n            if (savedData) {\n                try {\n                    const parsedData = JSON.parse(savedData);\n                    prefillForm(parsedData);\n                } catch (error) {\n                    console.log('Error loading saved data:', error);\n                }\n            }\n        }\n    }\n    \n    function loadProjectReference(projectId) {\n        // Charger données du projet de référence\n        if (wixStorage.session) {\n            const referenceData = wixStorage.session.getItem('quoteReference');\n            if (referenceData) {\n                try {\n                    const parsed = JSON.parse(referenceData);\n                    prefillFromReference(parsed);\n                } catch (error) {\n                    console.log('Error loading reference data:', error);\n                }\n            }\n        }\n    }\n    \n    function prefillFromReference(referenceData) {\n        if (referenceData.projectType) {\n            selectService(referenceData.projectType);\n        }\n        \n        if (referenceData.estimatedSurface && $w('#inputSurface')) {\n            const surface = parseInt(referenceData.estimatedSurface.replace(/\\D/g, ''));\n            $w('#inputSurface').value = surface.toString();\n            currentQuote.surface = surface;\n        }\n        \n        // Afficher référence\n        if ($w('#textReference') && referenceData.referenceProject) {\n            $w('#textReference').text = `Inspiré de: ${referenceData.referenceProject}`;\n            $w('#textReference').show();\n        }\n    }\n    \n    function prefillForm(data) {\n        Object.keys(data).forEach(key => {\n            if ($w(`#input${key.charAt(0).toUpperCase() + key.slice(1)}`)) {\n                $w(`#input${key.charAt(0).toUpperCase() + key.slice(1)}`).value = data[key];\n            }\n        });\n    }\n    \n    // === SOUMISSION FORMULAIRE ===\n    if ($w('#btnSubmitQuote')) {\n        $w('#btnSubmitQuote').onClick(() => {\n            submitQuoteRequest();\n        });\n    }\n    \n    function submitQuoteRequest() {\n        // Valider formulaire complet\n        if (!validateCompleteForm()) {\n            showError('Veuillez corriger les erreurs avant de continuer.');\n            return;\n        }\n        \n        // Collecter données complètes\n        const quoteData = {\n            ...currentQuote,\n            clientInfo: {\n                name: $w('#inputName').value,\n                email: $w('#inputEmail').value,\n                phone: $w('#inputPhone').value,\n                address: $w('#inputAddress').value,\n                preferredContact: $w('#dropdownPreferredContact').value,\n                message: $w('#textAreaMessage').value\n            },\n            timestamp: new Date().toISOString(),\n            source: 'Website Form'\n        };\n        \n        // Afficher loader\n        showSubmissionLoader();\n        \n        // Envoyer données\n        sendQuoteRequest(quoteData)\n            .then(() => {\n                // Succès\n                goToStep(4);\n                showSuccessMessage();\n                trackConversion('quote_submitted');\n            })\n            .catch((error) => {\n                // Erreur\n                hideSubmissionLoader();\n                showError('Erreur lors de l\\'envoi. Veuillez réessayer.');\n                console.error('Quote submission error:', error);\n            });\n    }\n    \n    function validateCompleteForm() {\n        let isValid = true;\n        \n        // Valider étape 1\n        if (!currentQuote.serviceType) {\n            isValid = false;\n        }\n        \n        // Valider étape 2\n        if (!currentQuote.surface || currentQuote.surface <= 0) {\n            isValid = false;\n        }\n        \n        // Valider étape 3\n        const requiredFields = ['#inputName', '#inputEmail', '#inputPhone', '#inputAddress'];\n        requiredFields.forEach(fieldId => {\n            if (!$w(fieldId).value.trim()) {\n                isValid = false;\n                showFieldError(fieldId, 'Champ requis');\n            }\n        });\n        \n        if (!validateEmail($w('#inputEmail').value)) {\n            isValid = false;\n        }\n        \n        if (!validatePhone($w('#inputPhone').value)) {\n            isValid = false;\n        }\n        \n        return isValid;\n    }\n    \n    async function sendQuoteRequest(data) {\n        // Webhook vers Make.com ou système CRM\n        const webhookUrl = 'https://hook.make.com/forza-construction-quotes';\n        \n        try {\n            const response = await fetch(webhookUrl, {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(data)\n            });\n            \n            if (!response.ok) {\n                throw new Error('Network response was not ok');\n            }\n            \n            // Sauvegarder dans Wix Data comme backup\n            return await wixData.save('QuoteRequests', {\n                ...data,\n                status: 'nouveau',\n                priority: data.urgency === 'express' || data.urgency === 'urgent' ? 'haute' : 'normale'\n            });\n            \n        } catch (error) {\n            console.error('Error sending quote request:', error);\n            throw error;\n        }\n    }\n    \n    function showSubmissionLoader() {\n        if ($w('#btnSubmitQuote')) {\n            $w('#btnSubmitQuote').label = 'Envoi en cours...';\n            $w('#btnSubmitQuote').disable();\n        }\n        \n        if ($w('#iconLoader')) {\n            $w('#iconLoader').show();\n        }\n    }\n    \n    function hideSubmissionLoader() {\n        if ($w('#btnSubmitQuote')) {\n            $w('#btnSubmitQuote').label = 'Envoyer ma demande';\n            $w('#btnSubmitQuote').enable();\n        }\n        \n        if ($w('#iconLoader')) {\n            $w('#iconLoader').hide();\n        }\n    }\n    \n    function showSuccessMessage() {\n        if ($w('#textSuccessMessage')) {\n            $w('#textSuccessMessage').text = `Merci ${currentQuote.clientInfo.name}! Votre demande de devis a été envoyée avec succès. Nous vous contacterons dans les 24 heures.`;\n        }\n        \n        if ($w('#textEstimationRecap')) {\n            $w('#textEstimationRecap').text = `Estimation: ${new Intl.NumberFormat('fr-CA', {\n                style: 'currency',\n                currency: 'CAD'\n            }).format(currentQuote.estimatedPrice)}`;\n        }\n        \n        // Boutons de suivi\n        if ($w('#btnScheduleVisit')) {\n            $w('#btnScheduleVisit').onClick(() => {\n                wixLocation.to('/contact?action=schedule&quote=' + Date.now());\n            });\n        }\n        \n        if ($w('#btnViewPortfolio')) {\n            $w('#btnViewPortfolio').onClick(() => {\n                wixLocation.to('/realisations');\n            });\n        }\n    }\n    \n    function showError(message) {\n        if ($w('#textErrorMessage')) {\n            $w('#textErrorMessage').text = message;\n            $w('#textErrorMessage').show('fade');\n            \n            setTimeout(() => {\n                $w('#textErrorMessage').hide('fade');\n            }, 5000);\n        }\n    }\n    \n    // === BOUTONS DE NAVIGATION ===\n    if ($w('#btnNextStep2')) {\n        $w('#btnNextStep2').onClick(() => {\n            if (currentQuote.serviceType) {\n                goToStep(2);\n            } else {\n                showError('Veuillez sélectionner un type de projet.');\n            }\n        });\n    }\n    \n    if ($w('#btnNextStep3')) {\n        $w('#btnNextStep3').onClick(() => {\n            if (currentQuote.surface > 0) {\n                goToStep(3);\n            } else {\n                showError('Veuillez indiquer la surface de votre projet.');\n            }\n        });\n    }\n    \n    if ($w('#btnBackStep1')) {\n        $w('#btnBackStep1').onClick(() => goToStep(1));\n    }\n    \n    if ($w('#btnBackStep2')) {\n        $w('#btnBackStep2').onClick(() => goToStep(2));\n    }\n    \n    // === FONCTIONS UTILITAIRES ===\n    function trackServiceSelection(serviceId) {\n        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {\n            window.gtag('event', 'quote_service_selected', {\n                service_type: serviceId,\n                page: 'quote_form'\n            });\n        }\n    }\n    \n    function trackConversion(event) {\n        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {\n            window.gtag('event', 'conversion', {\n                'send_to': 'AW-CONVERSION_ID',\n                'event_category': 'lead_generation',\n                'event_label': event,\n                'value': currentQuote.estimatedPrice\n            });\n        }\n        \n        // Facebook Pixel\n        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {\n            window.fbq('track', 'Lead', {\n                value: currentQuote.estimatedPrice,\n                currency: 'CAD',\n                content_category: currentQuote.serviceType\n            });\n        }\n    }\n    \n    // === SAUVEGARDE AUTOMATIQUE ===\n    setInterval(() => {\n        if (wixStorage.session && currentQuote.step > 1) {\n            wixStorage.session.setItem('quoteData', JSON.stringify(currentQuote));\n        }\n    }, 30000); // Sauvegarde toutes les 30 secondes\n    \n    console.log('Quote form initialized with', Object.keys(serviceCategories).length, 'service categories');\n});