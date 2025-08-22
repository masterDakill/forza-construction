// Sections Mobiles Avancées - Forza Construction Inc.
// Sections spécialement optimisées pour l'engagement mobile

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixData from 'wix-data';

// === SECTIONS MOBILES INTERACTIVES ===
class MobileSectionsManager {
    constructor() {
        this.currentSection = 0;
        this.sections = [];
        
        this.init();
    }
    
    init() {
        if (!window.mobileDetector?.isMobile) return;
        
        this.createMobileSections();
        this.setupSectionNavigation();
        this.initializeInteractiveElements();
    }
    
    createMobileSections() {
        // 1. Section Quick Actions (Sticky)
        this.createQuickActionsSection();
        
        // 2. Section Projets Before/After
        this.createBeforeAfterSection();
        
        // 3. Section Devis Express
        this.createExpressQuoteSection();
        
        // 4. Section Témoignages Video
        this.createVideoTestimonialsSection();
        
        // 5. Section Prix Transparents
        this.createPricingSection();
        
        // 6. Section Processus Étapes
        this.createProcessStepsSection();
        
        // 7. Section Contact Urgent
        this.createUrgentContactSection();
        
        // 8. Section Garanties
        this.createWarrantySection();
    }
    
    // === SECTION 1: ACTIONS RAPIDES STICKY ===
    createQuickActionsSection() {
        if ($w('#htmlQuickActionsSticky')) {
            const quickActionsHTML = `
                <div id="mobileQuickActions" style="
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                    padding: 12px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
                    z-index: 999;
                    backdrop-filter: blur(10px);
                ">
                    <button id="quickCallAction" style="
                        background: rgba(255,255,255,0.2);
                        border: 1px solid rgba(255,255,255,0.3);
                        color: white;
                        padding: 12px;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">📞</button>
                    
                    <button id="quickQuoteAction" style="
                        background: rgba(255,255,255,0.9);
                        color: #ff6b35;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 25px;
                        font-weight: bold;
                        font-size: 14px;
                        flex: 1;
                        margin: 0 15px;
                        cursor: pointer;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    ">💰 DEVIS GRATUIT</button>
                    
                    <button id="quickWhatsAppAction" style="
                        background: #25d366;
                        border: none;
                        color: white;
                        padding: 12px;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">💬</button>
                </div>
            `;
            
            $w('#htmlQuickActionsSticky').html = quickActionsHTML;
            
            this.setupQuickActions();
        }
    }
    
    setupQuickActions() {
        setTimeout(() => {
            // Appel direct
            document.getElementById('quickCallAction')?.addEventListener('click', () => {
                this.trackMobileAction('quick_call_sticky');
                wixLocation.to('tel:4181234567');
            });
            
            // Devis rapide
            document.getElementById('quickQuoteAction')?.addEventListener('click', () => {
                this.trackMobileAction('quick_quote_sticky');
                this.openExpressQuote();
            });
            
            // WhatsApp
            document.getElementById('quickWhatsAppAction')?.addEventListener('click', () => {
                this.trackMobileAction('quick_whatsapp_sticky');
                const message = encodeURIComponent('Bonjour! Je souhaite un devis pour mon projet de construction.');
                wixLocation.to(`https://wa.me/14181234567?text=${message}`);
            });
        }, 100);
    }
    
    // === SECTION 2: AVANT/APRÈS PROJETS ===
    createBeforeAfterSection() {
        if ($w('#htmlBeforeAfterSection')) {
            const beforeAfterHTML = `
                <div class="mobile-section before-after-section" style="
                    padding: 30px 20px;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                ">
                    <h2 style="
                        text-align: center;
                        margin-bottom: 25px;
                        color: #2c3e50;
                        font-size: 24px;
                        font-weight: bold;
                    ">🏗️ Transformations Réalisées</h2>
                    
                    <div id="beforeAfterSlider" style="
                        position: relative;
                        margin-bottom: 20px;
                        border-radius: 15px;
                        overflow: hidden;
                        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                    ">
                        <div class="slider-container" style="
                            display: flex;
                            transition: transform 0.3s ease;
                        " id="sliderContainer">
                            <!-- Les images seront ajoutées dynamiquement -->
                        </div>
                        
                        <div class="slider-controls" style="
                            position: absolute;
                            bottom: 15px;
                            left: 50%;
                            transform: translateX(-50%);
                            display: flex;
                            gap: 8px;
                        " id="sliderDots">
                            <!-- Dots navigation -->
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <p style="
                            color: #6c757d;
                            margin-bottom: 20px;
                            font-size: 14px;
                        ">👈 Glissez pour voir plus de transformations 👉</p>
                        
                        <button id="viewAllProjects" style="
                            background: linear-gradient(135deg, #ff6b35, #f7931e);
                            color: white;
                            border: none;
                            padding: 12px 30px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                        ">Voir Tous Nos Projets</button>
                    </div>
                </div>
            `;
            
            $w('#htmlBeforeAfterSection').html = beforeAfterHTML;
            
            this.setupBeforeAfterSlider();
        }
    }
    
    setupBeforeAfterSlider() {
        const projects = [
            {
                before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                after: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
                title: 'Rénovation Cuisine Complète',
                description: '3 semaines • Budget respecté'
            },
            {
                before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
                after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400',
                title: 'Transformation Salle de Bain',
                description: '2 semaines • Garantie 10 ans'
            },
            {
                before: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
                after: 'https://images.unsplash.com/photo-1560448075-bb485b067938?w=400',
                title: 'Extension Maison',
                description: '6 semaines • +40% valeur'
            }
        ];
        
        this.loadProjectSlider(projects);
    }
    
    loadProjectSlider(projects) {
        const container = document.getElementById('sliderContainer');
        const dotsContainer = document.getElementById('sliderDots');
        
        if (!container || !dotsContainer) return;
        
        let currentSlide = 0;
        
        // Créer les slides
        projects.forEach((project, index) => {
            const slide = document.createElement('div');
            slide.className = 'project-slide';
            slide.style.cssText = `
                min-width: 100%;
                position: relative;
                background: white;
            `;
            
            slide.innerHTML = `
                <div style="position: relative; height: 200px;">
                    <div class="before-image" style="
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 50%;
                        height: 100%;
                        background-image: url('${project.before}');
                        background-size: cover;
                        background-position: center;
                    ">
                        <div style="
                            position: absolute;
                            top: 10px;
                            left: 10px;
                            background: rgba(220, 53, 69, 0.9);
                            color: white;
                            padding: 4px 8px;
                            border-radius: 4px;
                            font-size: 10px;
                            font-weight: bold;
                        ">AVANT</div>
                    </div>
                    
                    <div class="after-image" style="
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 50%;
                        height: 100%;
                        background-image: url('${project.after}');
                        background-size: cover;
                        background-position: center;
                    ">
                        <div style="
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            background: rgba(40, 167, 69, 0.9);
                            color: white;
                            padding: 4px 8px;
                            border-radius: 4px;
                            font-size: 10px;
                            font-weight: bold;
                        ">APRÈS</div>
                    </div>
                    
                    <div style="
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(255, 255, 255, 0.9);
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    ">⇄</div>
                </div>
                
                <div style="padding: 15px; text-align: center;">
                    <h3 style="
                        margin: 0 0 5px 0;
                        color: #2c3e50;
                        font-size: 16px;
                        font-weight: bold;
                    ">${project.title}</h3>
                    <p style="
                        margin: 0;
                        color: #6c757d;
                        font-size: 12px;
                    ">${project.description}</p>
                </div>
            `;
            
            container.appendChild(slide);
            
            // Créer dot navigation
            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: ${index === 0 ? '#ff6b35' : 'rgba(255,255,255,0.5)'};
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            dot.onclick = () => {
                currentSlide = index;
                updateSlider();
            };
            
            dotsContainer.appendChild(dot);
        });
        
        // Swipe navigation
        let startX = 0;
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        container.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentSlide < projects.length - 1) {
                    currentSlide++;
                } else if (diff < 0 && currentSlide > 0) {
                    currentSlide--;
                }
                updateSlider();
            }
        });
        
        function updateSlider() {
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            const dots = dotsContainer.children;
            for (let i = 0; i < dots.length; i++) {
                dots[i].style.background = i === currentSlide ? '#ff6b35' : 'rgba(255,255,255,0.5)';
            }
        }
        
        // Auto-slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % projects.length;
            updateSlider();
        }, 5000);
    }
    
    // === SECTION 3: DEVIS EXPRESS ===
    createExpressQuoteSection() {
        if ($w('#htmlExpressQuoteSection')) {
            const expressQuoteHTML = `
                <div class="mobile-section express-quote-section" style="
                    padding: 30px 20px;
                    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                    color: white;
                ">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="
                            margin-bottom: 10px;
                            font-size: 22px;
                            font-weight: bold;
                        ">⚡ Devis Express en 60 Secondes</h2>
                        <p style="
                            margin: 0;
                            opacity: 0.9;
                            font-size: 14px;
                        ">Réponse immédiate • Sans engagement • 100% gratuit</p>
                    </div>
                    
                    <div id="expressQuoteWizard" style="
                        background: rgba(255,255,255,0.1);
                        border-radius: 15px;
                        padding: 20px;
                        backdrop-filter: blur(10px);
                    ">
                        <!-- Étape 1: Type de projet -->
                        <div id="step1" class="wizard-step">
                            <p style="margin-bottom: 15px; font-weight: bold; text-align: center;">
                                1️⃣ Quel type de projet?
                            </p>
                            <div class="project-types" style="
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 10px;
                            ">
                                <button class="project-type-btn" data-type="cuisine" style="
                                    background: rgba(255,255,255,0.1);
                                    border: 2px solid rgba(255,255,255,0.2);
                                    color: white;
                                    padding: 15px 10px;
                                    border-radius: 10px;
                                    cursor: pointer;
                                    text-align: center;
                                    font-size: 12px;
                                    transition: all 0.3s ease;
                                ">
                                    🍳<br>Cuisine
                                </button>
                                <button class="project-type-btn" data-type="salle-bain" style="
                                    background: rgba(255,255,255,0.1);
                                    border: 2px solid rgba(255,255,255,0.2);
                                    color: white;
                                    padding: 15px 10px;
                                    border-radius: 10px;
                                    cursor: pointer;
                                    text-align: center;
                                    font-size: 12px;
                                    transition: all 0.3s ease;
                                ">
                                    🚿<br>Salle de Bain
                                </button>
                                <button class="project-type-btn" data-type="toiture" style="
                                    background: rgba(255,255,255,0.1);
                                    border: 2px solid rgba(255,255,255,0.2);
                                    color: white;
                                    padding: 15px 10px;
                                    border-radius: 10px;
                                    cursor: pointer;
                                    text-align: center;
                                    font-size: 12px;
                                    transition: all 0.3s ease;
                                ">
                                    🏠<br>Toiture
                                </button>
                                <button class="project-type-btn" data-type="extension" style="
                                    background: rgba(255,255,255,0.1);
                                    border: 2px solid rgba(255,255,255,0.2);
                                    color: white;
                                    padding: 15px 10px;
                                    border-radius: 10px;
                                    cursor: pointer;
                                    text-align: center;
                                    font-size: 12px;
                                    transition: all 0.3s ease;
                                ">
                                    📐<br>Extension
                                </button>
                            </div>
                        </div>
                        
                        <!-- Les autres étapes seront ajoutées dynamiquement -->
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="
                            font-size: 12px;
                            opacity: 0.8;
                            margin: 0;
                        ">🔒 Vos informations sont protégées et confidentielles</p>
                    </div>
                </div>
            `;
            
            $w('#htmlExpressQuoteSection').html = expressQuoteHTML;
            
            this.setupExpressQuoteWizard();
        }
    }
    
    setupExpressQuoteWizard() {
        let currentStep = 1;
        let quoteData = {};
        
        // Setup project type selection
        setTimeout(() => {
            const projectBtns = document.querySelectorAll('.project-type-btn');
            projectBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Deselect all
                    projectBtns.forEach(b => {
                        b.style.background = 'rgba(255,255,255,0.1)';
                        b.style.borderColor = 'rgba(255,255,255,0.2)';
                    });
                    
                    // Select clicked
                    btn.style.background = 'rgba(255,107,53,0.3)';
                    btn.style.borderColor = '#ff6b35';
                    
                    quoteData.projectType = btn.dataset.type;
                    
                    // Go to next step
                    setTimeout(() => {
                        this.showQuoteStep2();
                    }, 500);
                });
            });
        }, 100);
    }
    
    showQuoteStep2() {
        const wizard = document.getElementById('expressQuoteWizard');
        if (!wizard) return;
        
        wizard.innerHTML = `
            <div id="step2" class="wizard-step">
                <p style="margin-bottom: 15px; font-weight: bold; text-align: center;">
                    2️⃣ Quelle est la surface approximative?
                </p>
                <div style="margin-bottom: 20px;">
                    <input type="range" id="surfaceRange" min="10" max="500" value="100" style="
                        width: 100%;
                        margin-bottom: 10px;
                    ">
                    <div style="text-align: center;">
                        <span id="surfaceValue" style="
                            font-size: 24px;
                            font-weight: bold;
                            color: #ff6b35;
                        ">100</span>
                        <span style="font-size: 14px;"> pieds carrés</span>
                    </div>
                </div>
                <button id="continueStep3" style="
                    width: 100%;
                    background: linear-gradient(135deg, #ff6b35, #f7931e);
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 10px;
                    font-weight: bold;
                    cursor: pointer;
                ">Continuer →</button>
            </div>
        `;
        
        // Setup range slider
        const rangeSlider = document.getElementById('surfaceRange');
        const valueDisplay = document.getElementById('surfaceValue');
        const continueBtn = document.getElementById('continueStep3');
        
        rangeSlider?.addEventListener('input', (e) => {
            valueDisplay.textContent = e.target.value;
        });
        
        continueBtn?.addEventListener('click', () => {
            this.quoteData.surface = rangeSlider.value;
            this.showQuoteStep3();
        });
    }
    
    showQuoteStep3() {
        const wizard = document.getElementById('expressQuoteWizard');
        if (!wizard) return;
        
        // Calculate estimate
        const estimate = this.calculateEstimate();
        
        wizard.innerHTML = `
            <div id="step3" class="wizard-step" style="text-align: center;">
                <p style="margin-bottom: 20px; font-weight: bold;">
                    3️⃣ Votre estimation
                </p>
                
                <div style="
                    background: rgba(255,107,53,0.1);
                    border: 2px solid #ff6b35;
                    border-radius: 15px;
                    padding: 20px;
                    margin-bottom: 20px;
                ">
                    <div style="font-size: 32px; font-weight: bold; color: #ff6b35; margin-bottom: 5px;">
                        ${estimate.min}$ - ${estimate.max}$
                    </div>
                    <div style="font-size: 12px; opacity: 0.8;">
                        *Estimation basée sur vos spécifications
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <input type="tel" id="phoneInput" placeholder="Votre téléphone" style="
                        width: 100%;
                        padding: 15px;
                        border: none;
                        border-radius: 10px;
                        background: rgba(255,255,255,0.1);
                        color: white;
                        font-size: 16px;
                        margin-bottom: 10px;
                        box-sizing: border-box;
                    ">
                    <input type="email" id="emailInput" placeholder="Votre email" style="
                        width: 100%;
                        padding: 15px;
                        border: none;
                        border-radius: 10px;
                        background: rgba(255,255,255,0.1);
                        color: white;
                        font-size: 16px;
                        box-sizing: border-box;
                    ">
                </div>
                
                <button id="getDetailedQuote" style="
                    width: 100%;
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 10px;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 16px;
                ">📧 Recevoir le Devis Détaillé</button>
            </div>
        `;
        
        // Setup final submit
        document.getElementById('getDetailedQuote')?.addEventListener('click', () => {
            this.submitExpressQuote();
        });
    }
    
    calculateEstimate() {
        const { projectType, surface } = this.quoteData || {};
        
        const baseRates = {
            'cuisine': { min: 150, max: 300 },
            'salle-bain': { min: 200, max: 400 },
            'toiture': { min: 8, max: 15 },
            'extension': { min: 120, max: 250 }
        };
        
        const rate = baseRates[projectType] || { min: 100, max: 200 };
        
        return {
            min: Math.round(rate.min * (surface || 100)),
            max: Math.round(rate.max * (surface || 100))
        };
    }
    
    // === SECTION 4: TÉMOIGNAGES VIDÉO ===
    createVideoTestimonialsSection() {
        if ($w('#htmlVideoTestimonialsSection')) {
            const videoTestimonialsHTML = `
                <div class="mobile-section video-testimonials-section" style="
                    padding: 30px 20px;
                    background: #f8f9fa;
                ">
                    <h2 style="
                        text-align: center;
                        margin-bottom: 25px;
                        color: #2c3e50;
                        font-size: 22px;
                        font-weight: bold;
                    ">🎥 Nos Clients Témoignent</h2>
                    
                    <div id="videoTestimonials" style="
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                    ">
                        <!-- Videos will be loaded here -->
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px;">
                        <button id="viewMoreTestimonials" style="
                            background: transparent;
                            color: #ff6b35;
                            border: 2px solid #ff6b35;
                            padding: 12px 25px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                        ">Voir Plus de Témoignages</button>
                    </div>
                </div>
            `;
            
            $w('#htmlVideoTestimonialsSection').html = videoTestimonialsHTML;
            
            this.loadVideoTestimonials();
        }
    }
    
    loadVideoTestimonials() {
        const testimonials = [
            {
                name: 'Marie-Claude Tremblay',
                project: 'Rénovation cuisine complète',
                rating: 5,
                text: 'Service exceptionnel! L\'équipe de Forza a transformé notre cuisine en un espace magnifique. Travail professionnel et dans les délais.',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                duration: '1:32'
            },
            {
                name: 'Jean-François Dubois',
                project: 'Réfection toiture',
                rating: 5,
                text: 'Très satisfait du travail accompli. Prix compétitif et qualité au rendez-vous. Je recommande fortement Forza Construction!',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                duration: '2:15'
            }
        ];
        
        const container = document.getElementById('videoTestimonials');
        if (!container) return;
        
        testimonials.forEach((testimonial, index) => {
            const videoCard = document.createElement('div');
            videoCard.style.cssText = `
                background: white;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                position: relative;
            `;
            
            videoCard.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                ">
                    <img src="${testimonial.image}" style="
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-right: 15px;
                        object-fit: cover;
                    ">
                    <div style="flex: 1;">
                        <div style="
                            font-weight: bold;
                            color: #2c3e50;
                            margin-bottom: 2px;
                            font-size: 14px;
                        ">${testimonial.name}</div>
                        <div style="
                            color: #6c757d;
                            font-size: 12px;
                        ">${testimonial.project}</div>
                    </div>
                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    ">
                        ${'⭐'.repeat(testimonial.rating)}
                    </div>
                </div>
                
                <div class="video-placeholder" style="
                    position: relative;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 10px;
                    height: 120px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                    cursor: pointer;
                " data-video-id="${index}">
                    <div style="
                        background: rgba(255,255,255,0.9);
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                    ">▶️</div>
                    
                    <div style="
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                        background: rgba(0,0,0,0.7);
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                    ">${testimonial.duration}</div>
                </div>
                
                <p style="
                    margin: 0;
                    color: #495057;
                    font-size: 14px;
                    line-height: 1.5;
                ">"${testimonial.text}"</p>
            `;
            
            // Add click handler for video
            const videoPlaceholder = videoCard.querySelector('.video-placeholder');
            videoPlaceholder?.addEventListener('click', () => {
                this.playTestimonialVideo(index);
            });
            
            container.appendChild(videoCard);
        });
    }
    
    playTestimonialVideo(index) {
        // Simulate video playback
        this.trackMobileAction('testimonial_video_play', { video_index: index });
        
        // In a real implementation, you would open a video player
        if (window.showNotification) {
            window.showNotification('Vidéo en cours de chargement...', 'info', 2000);
        }
    }
    
    // === SECTION 5: PRIX TRANSPARENTS ===
    createPricingSection() {
        if ($w('#htmlPricingSection')) {
            const pricingHTML = `
                <div class="mobile-section pricing-section" style="
                    padding: 30px 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                ">
                    <h2 style="
                        text-align: center;
                        margin-bottom: 10px;
                        font-size: 22px;
                        font-weight: bold;
                    ">💰 Prix Transparents</h2>
                    <p style="
                        text-align: center;
                        margin-bottom: 25px;
                        opacity: 0.9;
                        font-size: 14px;
                    ">Pas de surprises • Devis détaillé • Garantie prix</p>
                    
                    <div class="pricing-cards" style="
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    ">
                        <div class="pricing-card" style="
                            background: rgba(255,255,255,0.1);
                            border-radius: 15px;
                            padding: 20px;
                            text-align: center;
                            backdrop-filter: blur(10px);
                        ">
                            <div style="font-size: 30px; margin-bottom: 10px;">🍳</div>
                            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Rénovation Cuisine</h3>
                            <div style="
                                font-size: 24px;
                                font-weight: bold;
                                color: #ffd700;
                                margin-bottom: 10px;
                            ">À partir de 15 000$</div>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                                Armoires • Comptoir • Électroménagers • Installation
                            </p>
                        </div>
                        
                        <div class="pricing-card" style="
                            background: rgba(255,255,255,0.1);
                            border-radius: 15px;
                            padding: 20px;
                            text-align: center;
                            backdrop-filter: blur(10px);
                        ">
                            <div style="font-size: 30px; margin-bottom: 10px;">🚿</div>
                            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Salle de Bain</h3>
                            <div style="
                                font-size: 24px;
                                font-weight: bold;
                                color: #ffd700;
                                margin-bottom: 10px;
                            ">À partir de 8 000$</div>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                                Douche • Vanité • Céramique • Plomberie
                            </p>
                        </div>
                        
                        <div class="pricing-card" style="
                            background: rgba(255,255,255,0.1);
                            border-radius: 15px;
                            padding: 20px;
                            text-align: center;
                            backdrop-filter: blur(10px);
                        ">
                            <div style="font-size: 30px; margin-bottom: 10px;">🏠</div>
                            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Toiture</h3>
                            <div style="
                                font-size: 24px;
                                font-weight: bold;
                                color: #ffd700;
                                margin-bottom: 10px;
                            ">À partir de 8$/pi²</div>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                                Bardeaux • Membrane • Gouttières • Garantie
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px;">
                        <button id="getCustomQuote" style="
                            background: rgba(255,255,255,0.9);
                            color: #667eea;
                            border: none;
                            padding: 15px 30px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 14px;
                        ">Obtenir Mon Prix Personnalisé</button>
                    </div>
                </div>
            `;
            
            $w('#htmlPricingSection').html = pricingHTML;
            
            // Setup custom quote button
            setTimeout(() => {
                document.getElementById('getCustomQuote')?.addEventListener('click', () => {
                    this.trackMobileAction('custom_quote_request');
                    this.openExpressQuote();
                });
            }, 100);
        }
    }
    
    // === FONCTIONS UTILITAIRES ===
    
    openExpressQuote() {
        // Scroll to express quote section or open modal
        const quoteSection = document.querySelector('.express-quote-section');
        if (quoteSection) {
            quoteSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    trackMobileAction(action, data = {}) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', action, {
                'event_category': 'mobile_sections',
                'event_label': 'interactive_sections',
                ...data
            });
        }
        
        console.log('Mobile section action:', action, data);
    }
    
    submitExpressQuote() {
        const phone = document.getElementById('phoneInput')?.value;
        const email = document.getElementById('emailInput')?.value;
        
        if (!phone || !email) {
            if (window.showNotification) {
                window.showNotification('Veuillez remplir tous les champs', 'error');
            }
            return;
        }
        
        const quoteData = {
            ...this.quoteData,
            phone,
            email,
            timestamp: new Date().toISOString(),
            source: 'Mobile Express Quote'
        };
        
        // Track conversion
        this.trackMobileAction('express_quote_submitted', quoteData);
        
        // Show success
        const wizard = document.getElementById('expressQuoteWizard');
        if (wizard) {
            wizard.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 50px; margin-bottom: 15px;">✅</div>
                    <h3 style="margin-bottom: 15px; color: #27ae60;">Devis Envoyé!</h3>
                    <p style="margin-bottom: 20px; font-size: 14px;">
                        Nous vous contacterons dans les prochaines heures avec votre devis détaillé.
                    </p>
                    <button onclick="window.location.reload()" style="
                        background: #27ae60;
                        color: white;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 25px;
                        cursor: pointer;
                    ">Nouveau Devis</button>
                </div>
            `;
        }
        
        // Save to database (if wixData is available)
        if (typeof wixData !== 'undefined') {
            wixData.insert('ExpressQuotes', quoteData)
                .catch(error => console.error('Error saving quote:', error));
        }
    }
    
    // === SECTION 6: PROCESSUS EN ÉTAPES ===
    createProcessStepsSection() {
        if ($w('#htmlProcessStepsSection')) {
            const processHTML = `
                <div class="mobile-section process-steps-section" style="
                    padding: 30px 20px;
                    background: #f8f9fa;
                ">
                    <h2 style="
                        text-align: center;
                        margin-bottom: 25px;
                        color: #2c3e50;
                        font-size: 22px;
                        font-weight: bold;
                    ">📋 Notre Processus en 5 Étapes</h2>
                    
                    <div class="process-steps" style="
                        position: relative;
                    ">
                        <div style="
                            position: absolute;
                            left: 25px;
                            top: 25px;
                            bottom: 25px;
                            width: 2px;
                            background: linear-gradient(to bottom, #ff6b35, #f7931e);
                            z-index: 1;
                        "></div>
                        
                        <div class="step" style="
                            display: flex;
                            align-items: flex-start;
                            margin-bottom: 30px;
                            position: relative;
                            z-index: 2;
                        ">
                            <div style="
                                width: 50px;
                                height: 50px;
                                background: linear-gradient(135deg, #ff6b35, #f7931e);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-weight: bold;
                                font-size: 18px;
                                margin-right: 20px;
                                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                            ">1</div>
                            <div style="flex: 1; padding-top: 5px;">
                                <h3 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">Consultation Gratuite</h3>
                                <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                                    Visite à domicile • Évaluation des besoins • Conseils d'expert
                                </p>
                            </div>
                        </div>
                        
                        <div class="step" style="
                            display: flex;
                            align-items: flex-start;
                            margin-bottom: 30px;
                            position: relative;
                            z-index: 2;
                        ">
                            <div style="
                                width: 50px;
                                height: 50px;
                                background: linear-gradient(135deg, #ff6b35, #f7931e);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-weight: bold;
                                font-size: 18px;
                                margin-right: 20px;
                                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                            ">2</div>
                            <div style="flex: 1; padding-top: 5px;">
                                <h3 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">Devis Détaillé</h3>
                                <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                                    Prix transparent • Matériaux spécifiés • Échéancier de travaux
                                </p>
                            </div>
                        </div>
                        
                        <div class="step" style="
                            display: flex;
                            align-items: flex-start;
                            margin-bottom: 30px;
                            position: relative;
                            z-index: 2;
                        ">
                            <div style="
                                width: 50px;
                                height: 50px;
                                background: linear-gradient(135deg, #ff6b35, #f7931e);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-weight: bold;
                                font-size: 18px;
                                margin-right: 20px;
                                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                            ">3</div>
                            <div style="flex: 1; padding-top: 5px;">
                                <h3 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">Planification</h3>
                                <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                                    Permis • Commande matériaux • Coordination équipes
                                </p>
                            </div>
                        </div>
                        
                        <div class="step" style="
                            display: flex;
                            align-items: flex-start;
                            margin-bottom: 30px;
                            position: relative;
                            z-index: 2;
                        ">
                            <div style="
                                width: 50px;
                                height: 50px;
                                background: linear-gradient(135deg, #ff6b35, #f7931e);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-weight: bold;
                                font-size: 18px;
                                margin-right: 20px;
                                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                            ">4</div>
                            <div style="flex: 1; padding-top: 5px;">
                                <h3 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">Réalisation</h3>
                                <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                                    Travaux selon plan • Suivi quotidien • Communication continue
                                </p>
                            </div>
                        </div>
                        
                        <div class="step" style="
                            display: flex;
                            align-items: flex-start;
                            margin-bottom: 10px;
                            position: relative;
                            z-index: 2;
                        ">
                            <div style="
                                width: 50px;
                                height: 50px;
                                background: linear-gradient(135deg, #27ae60, #2ecc71);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-weight: bold;
                                font-size: 18px;
                                margin-right: 20px;
                                box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
                            ">✓</div>
                            <div style="flex: 1; padding-top: 5px;">
                                <h3 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">Livraison & Garantie</h3>
                                <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                                    Inspection finale • Nettoyage complet • Garantie 10 ans
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px;">
                        <button id="startProcess" style="
                            background: linear-gradient(135deg, #ff6b35, #f7931e);
                            color: white;
                            border: none;
                            padding: 15px 30px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 14px;
                            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                        ">🚀 Commencer Mon Projet</button>
                    </div>
                </div>
            `;
            
            $w('#htmlProcessStepsSection').html = processHTML;
            
            setTimeout(() => {
                document.getElementById('startProcess')?.addEventListener('click', () => {
                    this.trackMobileAction('start_process_clicked');
                    this.openExpressQuote();
                });
            }, 100);
        }
    }
    
    // === SECTION 7: CONTACT URGENT ===
    createUrgentContactSection() {
        if ($w('#htmlUrgentContactSection')) {
            const urgentHTML = `
                <div class="mobile-section urgent-contact-section" style="
                    padding: 25px 20px;
                    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                    color: white;
                    border-top: 3px solid #ffd700;
                    border-bottom: 3px solid #ffd700;
                ">
                    <div style="text-align: center;">
                        <div style="
                            font-size: 40px;
                            margin-bottom: 15px;
                            animation: pulse 2s infinite;
                        ">🚨</div>
                        
                        <h2 style="
                            margin-bottom: 15px;
                            font-size: 20px;
                            font-weight: bold;
                        ">Urgence Construction?</h2>
                        
                        <p style="
                            margin-bottom: 20px;
                            font-size: 14px;
                            opacity: 0.95;
                        ">
                            Dégât d'eau • Toiture endommagée • Structure compromise<br>
                            <strong>Service d'urgence disponible 24h/7j</strong>
                        </p>
                        
                        <div style="
                            display: flex;
                            gap: 10px;
                            justify-content: center;
                            margin-bottom: 15px;
                        ">
                            <button id="urgentCall" style="
                                background: #ffd700;
                                color: #dc3545;
                                border: none;
                                padding: 12px 20px;
                                border-radius: 25px;
                                font-weight: bold;
                                cursor: pointer;
                                flex: 1;
                                max-width: 150px;
                                font-size: 14px;
                                animation: bounce 2s infinite;
                            ">📞 URGENCE</button>
                            
                            <button id="urgentWhatsApp" style="
                                background: #25d366;
                                color: white;
                                border: none;
                                padding: 12px 20px;
                                border-radius: 25px;
                                font-weight: bold;
                                cursor: pointer;
                                flex: 1;
                                max-width: 150px;
                                font-size: 14px;
                            ">💬 WhatsApp</button>
                        </div>
                        
                        <div style="
                            background: rgba(255,255,255,0.1);
                            border-radius: 10px;
                            padding: 15px;
                            margin-top: 15px;
                        ">
                            <p style="
                                margin: 0;
                                font-size: 12px;
                                opacity: 0.9;
                            ">
                                ⏰ <strong>Temps de réponse moyen: 15 minutes</strong><br>
                                📍 Intervention dans un rayon de 50km de Québec<br>
                                💰 Estimation urgence gratuite par téléphone
                            </p>
                        </div>
                    </div>
                </div>
                
                <style>
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
                </style>
            `;
            
            $w('#htmlUrgentContactSection').html = urgentHTML;
            
            setTimeout(() => {
                document.getElementById('urgentCall')?.addEventListener('click', () => {
                    this.trackMobileAction('urgent_call_clicked');
                    wixLocation.to('tel:18004672');
                });
                
                document.getElementById('urgentWhatsApp')?.addEventListener('click', () => {
                    this.trackMobileAction('urgent_whatsapp_clicked');
                    const urgentMessage = encodeURIComponent('🚨 URGENCE CONSTRUCTION - J\'ai besoin d\'une intervention rapide. Merci de me contacter immédiatement.');
                    wixLocation.to(`https://wa.me/14181234567?text=${urgentMessage}`);
                });
            }, 100);
        }
    }
    
    // === SECTION 8: GARANTIES ===
    createWarrantySection() {
        if ($w('#htmlWarrantySection')) {
            const warrantyHTML = `
                <div class="mobile-section warranty-section" style="
                    padding: 30px 20px;
                    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                    color: white;
                ">
                    <h2 style="
                        text-align: center;
                        margin-bottom: 25px;
                        font-size: 22px;
                        font-weight: bold;
                    ">✅ Nos Garanties</h2>
                    
                    <div class="warranty-items" style="
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    ">
                        <div class="warranty-item" style="
                            background: rgba(255,255,255,0.1);
                            border-radius: 12px;
                            padding: 20px;
                            display: flex;
                            align-items: center;
                            backdrop-filter: blur(10px);
                        ">
                            <div style="
                                font-size: 30px;
                                margin-right: 15px;
                                min-width: 50px;
                                text-align: center;
                            ">🛡️</div>
                            <div>
                                <h3 style="margin: 0 0 5px 0; font-size: 16px;">Garantie 10 ans</h3>
                                <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                                    Matériaux et main d'œuvre couverts
                                </p>
                            </div>
                        </div>
                        
                        <div class="warranty-item" style="
                            background: rgba(255,255,255,0.1);
                            border-radius: 12px;
                            padding: 20px;
                            display: flex;
                            align-items: center;
                            backdrop-filter: blur(10px);
                        ">
                            <div style="
                                font-size: 30px;
                                margin-right: 15px;
                                min-width: 50px;
                                text-align: center;
                            ">💰</div>
                            <div>
                                <h3 style="margin: 0 0 5px 0; font-size: 16px;">Satisfaction 100%</h3>
                                <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                                    Pas satisfait? On refait à nos frais
                                </p>
                            </div>
                        </div>
                        
                        <div class="warranty-item" style="
                            background: rgba(255,255,255,0.1);
                            border-radius: 12px;
                            padding: 20px;
                            display: flex;
                            align-items: center;
                            backdrop-filter: blur(10px);
                        ">
                            <div style="
                                font-size: 30px;
                                margin-right: 15px;
                                min-width: 50px;
                                text-align: center;
                            ">⏰</div>
                            <div>
                                <h3 style="margin: 0 0 5px 0; font-size: 16px;">Délais Respectés</h3>
                                <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                                    Pénalité de 100$/jour si retard de notre faute
                                </p>
                            </div>
                        </div>
                        
                        <div class="warranty-item" style="
                            background: rgba(255,255,255,0.1);
                            border-radius: 12px;
                            padding: 20px;
                            display: flex;
                            align-items: center;
                            backdrop-filter: blur(10px);
                        ">
                            <div style="
                                font-size: 30px;
                                margin-right: 15px;
                                min-width: 50px;
                                text-align: center;
                            ">🏆</div>
                            <div>
                                <h3 style="margin: 0 0 5px 0; font-size: 16px;">Entrepreneurs Certifiés</h3>
                                <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                                    RBQ • Assurances • Formation continue
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="
                        text-align: center;
                        margin-top: 25px;
                        padding-top: 20px;
                        border-top: 1px solid rgba(255,255,255,0.3);
                    ">
                        <p style="
                            margin: 0 0 15px 0;
                            font-size: 14px;
                            opacity: 0.9;
                        ">🏅 Membre de l'Association des Entrepreneurs en Construction du Québec</p>
                        
                        <button id="viewCertifications" style="
                            background: rgba(255,255,255,0.2);
                            color: white;
                            border: 1px solid rgba(255,255,255,0.3);
                            padding: 10px 20px;
                            border-radius: 20px;
                            font-size: 12px;
                            cursor: pointer;
                        ">Voir Nos Certifications</button>
                    </div>
                </div>
            `;
            
            $w('#htmlWarrantySection').html = warrantyHTML;
            
            setTimeout(() => {
                document.getElementById('viewCertifications')?.addEventListener('click', () => {
                    this.trackMobileAction('view_certifications');
                    this.showCertifications();
                });
            }, 100);
        }
    }
    
    showCertifications() {
        if (window.showNotification) {
            window.showNotification('Certifications RBQ • APCHQ • CCQ • Assurance responsabilité 2M$', 'info', 4000);
        }
    }
}

// === INITIALISATION ===
export function initMobileSections() {
    if (!window.mobileDetector?.isMobile) return;
    
    window.mobileSectionsManager = new MobileSectionsManager();
    console.log('✅ Mobile sections initialized');
}

// Auto-initialization
if (typeof $w !== 'undefined') {
    $w.onReady(() => {
        setTimeout(() => {
            initMobileSections();
        }, 1000);
    });
}