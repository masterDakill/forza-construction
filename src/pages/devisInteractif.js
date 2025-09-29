// Page de Devis Interactif - Forza Construction Inc.
// Système de devis moderne avec calculateur en temps réel

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { leadManagement, analyticsManager } from '../utils/professionalTools';
import { modernDesignSystem } from '../styles/modernDesignSystem';

$w.onReady(function () {
    console.log('💰 Page Devis Interactif - Initialisation...');

    // === INITIALISATION DU SYSTÈME DE DEVIS ===
    initializeQuoteSystem();
    setupInteractiveCalculator();
    setupFormValidation();
    setupProgressTracking();
    setupRealTimeUpdates();

    console.log('✅ Système de devis interactif prêt');

    // === CONFIGURATION DU SYSTÈME DE DEVIS ===
    function initializeQuoteSystem() {
        // Données de base pour calculs
        window.quoteData = {
            projectType: '',
            roomSize: 0,
            materials: 'standard',
            timeline: 'flexible',
            budget: 0,
            features: [],
            totalEstimate: 0,
            currentStep: 1,
            maxSteps: 6
        };

        // Configuration des prix de base
        window.pricingData = {
            kitchen: {
                basePrice: 15000,
                sizeFactor: 500, // par pied carré
                materials: {
                    standard: 1.0,
                    premium: 1.5,
                    luxury: 2.2
                },
                features: {
                    island: 3500,
                    pantry: 2000,
                    customCabinets: 4000,
                    premiumCounters: 2500,
                    smartAppliances: 5000
                }
            },
            bathroom: {
                basePrice: 8000,
                sizeFactor: 300,
                materials: {
                    standard: 1.0,
                    premium: 1.4,
                    luxury: 2.0
                },
                features: {
                    freestandingTub: 2500,
                    glassShower: 1800,
                    doubleVanity: 1500,
                    heatedFloors: 2000,
                    smartMirror: 800
                }
            },
            basement: {
                basePrice: 12000,
                sizeFactor: 200,
                materials: {
                    standard: 1.0,
                    premium: 1.3,
                    luxury: 1.8
                },
                features: {
                    fullBathroom: 8000,
                    kitchenette: 6000,
                    homeTheater: 4000,
                    fireplace: 3000,
                    wetBar: 2500
                }
            }
        };

        applyModernStyling();
    }

    function applyModernStyling() {
        // Appliquer le design moderne à la page
        const pageStyle = `
            .quote-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 40px 20px;
                font-family: 'Inter', sans-serif;
            }

            .step-indicator {
                display: flex;
                justify-content: center;
                margin-bottom: 40px;
            }

            .step {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #e5e5e5;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 10px;
                font-weight: bold;
                transition: all 0.3s ease;
            }

            .step.active {
                background: linear-gradient(135deg, #f97316, #ea580c);
                color: white;
                transform: scale(1.1);
            }

            .step.completed {
                background: #22c55e;
                color: white;
            }

            .quote-card {
                background: white;
                border-radius: 16px;
                padding: 32px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                margin-bottom: 24px;
                transition: all 0.3s ease;
            }

            .quote-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            }

            .option-card {
                border: 2px solid #e5e5e5;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .option-card:hover {
                border-color: #f97316;
                background: #fff7ed;
            }

            .option-card.selected {
                border-color: #f97316;
                background: linear-gradient(135deg, #fff7ed, #ffedd5);
                box-shadow: 0 4px 20px rgba(249, 115, 22, 0.2);
            }

            .price-display {
                background: linear-gradient(135deg, #f97316, #ea580c);
                color: white;
                padding: 24px;
                border-radius: 16px;
                text-align: center;
                margin: 24px 0;
                position: sticky;
                top: 20px;
            }

            .feature-checkbox {
                margin-right: 12px;
                transform: scale(1.2);
            }

            .next-button {
                background: linear-gradient(135deg, #f97316, #ea580c);
                color: white;
                border: none;
                padding: 16px 32px;
                border-radius: 12px;
                font-weight: bold;
                font-size: 16px;
                cursor: pointer;
                width: 100%;
                margin-top: 24px;
                transition: all 0.3s ease;
            }

            .next-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
            }

            .next-button:disabled {
                background: #9ca3af;
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = pageStyle;
        document.head.appendChild(styleSheet);
    }

    function setupInteractiveCalculator() {
        // === ÉTAPE 1: TYPE DE PROJET ===
        setupProjectTypeSelection();

        // === ÉTAPE 2: DIMENSIONS ===
        setupRoomSizeInput();

        // === ÉTAPE 3: MATÉRIAUX ===
        setupMaterialsSelection();

        // === ÉTAPE 4: FONCTIONNALITÉS ===
        setupFeaturesSelection();

        // === ÉTAPE 5: TIMELINE ===
        setupTimelineSelection();

        // === ÉTAPE 6: INFORMATIONS CLIENT ===
        setupClientInfoForm();
    }

    function setupProjectTypeSelection() {
        if ($w('#projectTypeRepeater')) {
            const projectTypes = [
                {
                    type: 'kitchen',
                    title: '🍳 Cuisine',
                    description: 'Rénovation complète de cuisine',
                    priceRange: 'À partir de 15,000$',
                    features: 'Armoires • Comptoirs • Électroménagers'
                },
                {
                    type: 'bathroom',
                    title: '🛁 Salle de Bain',
                    description: 'Transformation de salle de bain',
                    priceRange: 'À partir de 8,000$',
                    features: 'Douche • Vanité • Céramique'
                },
                {
                    type: 'basement',
                    title: '🏠 Sous-Sol',
                    description: 'Aménagement de sous-sol',
                    priceRange: 'À partir de 12,000$',
                    features: 'Isolation • Finition • Éclairage'
                }
            ];

            $w('#projectTypeRepeater').data = projectTypes;

            $w('#projectTypeRepeater').onItemReady(($item, itemData) => {
                $item('#projectTitle').text = itemData.title;
                $item('#projectDescription').text = itemData.description;
                $item('#projectPrice').text = itemData.priceRange;
                $item('#projectFeatures').text = itemData.features;

                $item('#projectCard').onClick(() => {
                    selectProjectType(itemData.type);
                    updateCalculation();
                    nextStep();
                });
            });
        }
    }

    function selectProjectType(type) {
        window.quoteData.projectType = type;

        // Analytics
        analyticsManager.trackConversion('project_type_selected', {
            projectType: type,
            label: `Project Type: ${type}`
        });

        // Mettre à jour l'interface
        updateProgressIndicator();
        updatePriceDisplay();
    }

    function setupRoomSizeInput() {
        if ($w('#roomSizeSlider')) {
            $w('#roomSizeSlider').onChange(() => {
                const size = $w('#roomSizeSlider').value;
                window.quoteData.roomSize = size;

                // Affichage en temps réel
                if ($w('#sizeDisplay')) {
                    $w('#sizeDisplay').text = `${size} pieds carrés`;
                }

                updateCalculation();
                updatePriceDisplay();
            });
        }

        // Alternative: champs input
        if ($w('#lengthInput') && $w('#widthInput')) {
            [$w('#lengthInput'), $w('#widthInput')].forEach(input => {
                input.onChange(() => {
                    const length = parseFloat($w('#lengthInput').value) || 0;
                    const width = parseFloat($w('#widthInput').value) || 0;
                    const size = length * width;

                    window.quoteData.roomSize = size;

                    if ($w('#calculatedSize')) {
                        $w('#calculatedSize').text = `${size.toFixed(1)} pieds carrés`;
                    }

                    updateCalculation();
                    updatePriceDisplay();
                });
            });
        }
    }

    function setupMaterialsSelection() {
        const materials = [
            {
                id: 'standard',
                name: 'Standard',
                description: 'Matériaux de qualité, excellent rapport qualité-prix',
                multiplier: 1.0,
                examples: 'Mélamine • Stratifié • Céramique standard'
            },
            {
                id: 'premium',
                name: 'Premium',
                description: 'Matériaux haut de gamme pour un résultat exceptionnel',
                multiplier: 1.5,
                examples: 'Bois massif • Quartz • Céramique italienne'
            },
            {
                id: 'luxury',
                name: 'Luxe',
                description: 'Le summum de la qualité et de l\'élégance',
                multiplier: 2.2,
                examples: 'Bois exotique • Marbre • Carreaux designer'
            }
        ];

        materials.forEach(material => {
            const selector = `#material${material.id.charAt(0).toUpperCase() + material.id.slice(1)}`;
            if ($w(selector)) {
                $w(selector).onClick(() => {
                    selectMaterial(material.id);
                });
            }
        });
    }

    function selectMaterial(materialId) {
        window.quoteData.materials = materialId;

        // Mettre à jour l'affichage
        updateMaterialSelection(materialId);
        updateCalculation();
        updatePriceDisplay();

        // Analytics
        analyticsManager.trackConversion('material_selected', {
            material: materialId,
            label: `Material: ${materialId}`
        });
    }

    function updateMaterialSelection(selectedId) {
        ['standard', 'premium', 'luxury'].forEach(id => {
            const selector = `#material${id.charAt(0).toUpperCase() + id.slice(1)}`;
            if ($w(selector)) {
                if (id === selectedId) {
                    $w(selector).style.border = '3px solid #f97316';
                    $w(selector).style.background = '#fff7ed';
                } else {
                    $w(selector).style.border = '2px solid #e5e5e5';
                    $w(selector).style.background = '#ffffff';
                }
            }
        });
    }

    function setupFeaturesSelection() {
        // Les fonctionnalités dépendent du type de projet
        const projectType = window.quoteData.projectType;
        const features = window.pricingData[projectType]?.features || {};

        Object.entries(features).forEach(([featureId, price]) => {
            const checkbox = $w(`#feature${featureId.charAt(0).toUpperCase() + featureId.slice(1)}`);
            if (checkbox) {
                checkbox.onChange(() => {
                    toggleFeature(featureId, price, checkbox.checked);
                });
            }
        });
    }

    function toggleFeature(featureId, price, isSelected) {
        if (isSelected) {
            if (!window.quoteData.features.includes(featureId)) {
                window.quoteData.features.push(featureId);
            }
        } else {
            window.quoteData.features = window.quoteData.features.filter(f => f !== featureId);
        }

        updateCalculation();
        updatePriceDisplay();

        // Analytics
        analyticsManager.trackConversion('feature_toggled', {
            feature: featureId,
            selected: isSelected,
            price: price
        });
    }

    function updateCalculation() {
        const { projectType, roomSize, materials, features } = window.quoteData;

        if (!projectType || !window.pricingData[projectType]) {
            return;
        }

        const pricing = window.pricingData[projectType];

        // Prix de base
        let total = pricing.basePrice;

        // Facteur taille
        total += roomSize * pricing.sizeFactor;

        // Multiplicateur matériaux
        total *= pricing.materials[materials] || 1.0;

        // Fonctionnalités additionnelles
        features.forEach(featureId => {
            total += pricing.features[featureId] || 0;
        });

        // Marges d'erreur (±15%)
        const minEstimate = Math.round(total * 0.85);
        const maxEstimate = Math.round(total * 1.15);

        window.quoteData.totalEstimate = total;
        window.quoteData.estimateRange = { min: minEstimate, max: maxEstimate };

        return { total, minEstimate, maxEstimate };
    }

    function updatePriceDisplay() {
        const calculation = updateCalculation();

        if (!calculation) return;

        const { minEstimate, maxEstimate } = calculation;

        if ($w('#priceDisplay')) {
            $w('#priceDisplay').text = `${minEstimate.toLocaleString()} $ - ${maxEstimate.toLocaleString()} $`;
        }

        if ($w('#estimateDetails')) {
            $w('#estimateDetails').text = `Estimation basée sur votre sélection • Devis précis sur consultation`;
        }

        // Animation du prix
        if ($w('#priceDisplay')) {
            $w('#priceDisplay').style.animation = 'priceUpdate 0.5s ease';
        }
    }

    function setupProgressTracking() {
        updateProgressIndicator();
    }

    function updateProgressIndicator() {
        for (let i = 1; i <= window.quoteData.maxSteps; i++) {
            const step = $w(`#step${i}`);
            if (step) {
                if (i < window.quoteData.currentStep) {
                    step.style.background = '#22c55e'; // Completed
                } else if (i === window.quoteData.currentStep) {
                    step.style.background = 'linear-gradient(135deg, #f97316, #ea580c)'; // Active
                } else {
                    step.style.background = '#e5e5e5'; // Future
                }
            }
        }
    }

    function nextStep() {
        if (window.quoteData.currentStep < window.quoteData.maxSteps) {
            window.quoteData.currentStep++;
            updateProgressIndicator();
            showCurrentStep();

            // Analytics
            analyticsManager.trackConversion('quote_step_completed', {
                step: window.quoteData.currentStep - 1,
                projectType: window.quoteData.projectType
            });
        }
    }

    function showCurrentStep() {
        // Masquer toutes les étapes
        for (let i = 1; i <= window.quoteData.maxSteps; i++) {
            const stepElement = $w(`#quoteStep${i}`);
            if (stepElement) {
                stepElement.hide();
            }
        }

        // Afficher l'étape actuelle
        const currentStepElement = $w(`#quoteStep${window.quoteData.currentStep}`);
        if (currentStepElement) {
            currentStepElement.show();
            currentStepElement.scrollTo();
        }
    }

    function setupFormValidation() {
        // Validation en temps réel des champs
        const requiredFields = ['#clientName', '#clientEmail', '#clientPhone'];

        requiredFields.forEach(selector => {
            const field = $w(selector);
            if (field) {
                field.onInput(() => {
                    validateField(field);
                    updateSubmitButton();
                });
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = false;

        switch (field.id) {
            case 'clientEmail':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'clientPhone':
                isValid = /^[\d\s\-\(\)\+]{10,}$/.test(value);
                break;
            default:
                isValid = value.length >= 2;
        }

        if (isValid) {
            field.style.borderColor = '#22c55e';
        } else {
            field.style.borderColor = '#ef4444';
        }

        return isValid;
    }

    function updateSubmitButton() {
        const submitButton = $w('#submitQuote');
        if (submitButton) {
            const isFormValid = validateQuoteForm();
            submitButton.enabled = isFormValid;

            if (isFormValid) {
                submitButton.style.background = 'linear-gradient(135deg, #f97316, #ea580c)';
                submitButton.label = 'RECEVOIR MON DEVIS DÉTAILLÉ';
            } else {
                submitButton.style.background = '#9ca3af';
                submitButton.label = 'Complétez le formulaire';
            }
        }
    }

    function validateQuoteForm() {
        const { projectType, roomSize } = window.quoteData;
        const name = $w('#clientName')?.value?.trim();
        const email = $w('#clientEmail')?.value?.trim();
        const phone = $w('#clientPhone')?.value?.trim();

        return projectType && roomSize > 0 && name && email && phone &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
               /^[\d\s\-\(\)\+]{10,}$/.test(phone);
    }

    function setupRealTimeUpdates() {
        // Mise à jour continue de l'estimation
        setInterval(() => {
            if (window.quoteData.projectType && window.quoteData.roomSize > 0) {
                updatePriceDisplay();
            }
        }, 1000);
    }

    // === SOUMISSION DU DEVIS ===
    if ($w('#submitQuote')) {
        $w('#submitQuote').onClick(async () => {
            await submitQuoteRequest();
        });
    }

    async function submitQuoteRequest() {
        try {
            // Données du lead
            const leadData = {
                name: $w('#clientName').value,
                email: $w('#clientEmail').value,
                phone: $w('#clientPhone').value,
                projectType: window.quoteData.projectType,
                roomSize: window.quoteData.roomSize,
                materials: window.quoteData.materials,
                features: window.quoteData.features,
                estimatedBudget: window.quoteData.totalEstimate,
                estimateRange: window.quoteData.estimateRange,
                additionalNotes: $w('#additionalNotes')?.value || '',
                preferredContact: $w('#preferredContact')?.value || 'phone',
                source: 'quote_calculator'
            };

            // Capturer le lead avec le système professionnel
            const result = await leadManagement.captureLeadData(leadData, 'quote_calculator');

            // Analytics de conversion
            analyticsManager.trackConversion('quote_submitted', {
                projectType: leadData.projectType,
                estimatedValue: leadData.estimatedBudget,
                leadScore: result.leadScore || 0
            });

            // Redirection vers page de confirmation
            wixLocation.to(`/merci-devis?id=${result._id}`);

        } catch (error) {
            console.error('Erreur soumission devis:', error);

            // Afficher message d'erreur
            if ($w('#errorMessage')) {
                $w('#errorMessage').text = 'Une erreur est survenue. Veuillez réessayer ou nous appeler directement.';
                $w('#errorMessage').show();
            }
        }
    }
});