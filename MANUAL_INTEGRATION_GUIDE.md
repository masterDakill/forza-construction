# 🔧 Guide d'Intégration Manuelle Wix

## 🚨 Si Git Integration ne fonctionne pas

Voici comment intégrer manuellement les optimisations mobiles dans Wix :

## 📋 **Étape 1: Code à Copier dans Wix Editor**

### **masterPage.js - Code à remplacer :**

Ouvrez votre masterPage.js dans Wix Editor et remplacez tout le contenu par :

```javascript
// MasterPage - Forza Construction Inc.
// Optimisations globales et intégration des systèmes mobiles avancés

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    console.log('🚀 Forza Construction - Mobile Optimized Loading...');
    
    // Détection mobile immédiate
    const isMobile = wixWindow.viewMode === 'mobile';
    
    if (isMobile) {
        console.log('📱 Mobile device detected - Loading optimizations...');
        
        // Initialiser optimisations mobiles
        setTimeout(() => {
            initMobileOptimizations();
        }, 500);
    }
    
    // Configuration globale
    setupGlobalSystems();
    
    function setupGlobalSystems() {
        // Gestion erreurs
        window.addEventListener('error', (event) => {
            console.error('Error:', event.error);
        });
        
        // Système notifications
        window.showNotification = function(message, type = 'info', duration = 5000) {
            console.log(`${type.toUpperCase()}: ${message}`);
        };
        
        // Links externes
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.includes(window.location.hostname)) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
    }
    
    function initMobileOptimizations() {
        if (!isMobile) return;
        
        // 1. Créer barre actions rapides
        createQuickActions();
        
        // 2. Créer sections interactives
        setTimeout(() => {
            createMobileSections();
        }, 1000);
        
        // 3. Optimiser tactile
        setupTouchOptimizations();
    }
    
    function createQuickActions() {
        // Injecter barre actions sticky
        const actionsHTML = `
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
            ">
                <button onclick="window.location.href='tel:4181234567'" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 12px;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    font-size: 18px;
                    cursor: pointer;
                ">📞</button>
                
                <button onclick="openExpressQuote()" style="
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
                ">💰 DEVIS GRATUIT</button>
                
                <button onclick="openWhatsApp()" style="
                    background: #25d366;
                    border: none;
                    color: white;
                    padding: 12px;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    font-size: 18px;
                    cursor: pointer;
                ">💬</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', actionsHTML);
        
        // Fonctions globales pour boutons
        window.openExpressQuote = function() {
            console.log('Opening express quote...');
            if (window.showNotification) {
                window.showNotification('Devis express en préparation...', 'info');
            }
        };
        
        window.openWhatsApp = function() {
            const message = encodeURIComponent('Bonjour! Je souhaite un devis pour mon projet de construction.');
            window.open(`https://wa.me/14181234567?text=${message}`, '_blank');
        };
    }
    
    function createMobileSections() {
        // Chercher conteneur principal
        const mainContainer = document.querySelector('#SITE_ROOT') || document.body;
        
        // Section Avant/Après
        const beforeAfterHTML = `
            <div class="mobile-section" style="
                padding: 30px 20px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                margin: 20px 0;
            ">
                <h2 style="text-align: center; margin-bottom: 25px; color: #2c3e50; font-size: 24px;">
                    🏗️ Transformations Réalisées
                </h2>
                
                <div style="
                    background: white;
                    border-radius: 15px;
                    padding: 20px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                    text-align: center;
                    margin-bottom: 20px;
                ">
                    <div style="
                        height: 200px;
                        background: linear-gradient(45deg, #ff6b35, #f7931e);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 15px;
                    ">
                        AVANT ⇄ APRÈS<br>
                        <small style="font-size: 14px; opacity: 0.8;">Projets Réalisés</small>
                    </div>
                    <h3 style="margin: 0 0 5px 0; color: #2c3e50;">Rénovation Cuisine Complète</h3>
                    <p style="margin: 0; color: #6c757d; font-size: 12px;">3 semaines • Budget respecté</p>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="window.location.href='/realisations'" style="
                        background: linear-gradient(135deg, #ff6b35, #f7931e);
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 25px;
                        font-weight: bold;
                        cursor: pointer;
                    ">Voir Tous Nos Projets</button>
                </div>
            </div>
        `;
        
        // Section Prix Transparents
        const pricingHTML = `
            <div class="mobile-section" style="
                padding: 30px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                margin: 20px 0;
            ">
                <h2 style="text-align: center; margin-bottom: 25px; font-size: 22px;">
                    💰 Prix Transparents
                </h2>
                
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div style="
                        background: rgba(255,255,255,0.1);
                        border-radius: 15px;
                        padding: 20px;
                        text-align: center;
                    ">
                        <div style="font-size: 30px; margin-bottom: 10px;">🍳</div>
                        <h3 style="margin: 0 0 10px 0;">Rénovation Cuisine</h3>
                        <div style="font-size: 24px; font-weight: bold; color: #ffd700; margin-bottom: 10px;">
                            À partir de 15 000$
                        </div>
                        <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                            Armoires • Comptoir • Électroménagers
                        </p>
                    </div>
                    
                    <div style="
                        background: rgba(255,255,255,0.1);
                        border-radius: 15px;
                        padding: 20px;
                        text-align: center;
                    ">
                        <div style="font-size: 30px; margin-bottom: 10px;">🚿</div>
                        <h3 style="margin: 0 0 10px 0;">Salle de Bain</h3>
                        <div style="font-size: 24px; font-weight: bold; color: #ffd700; margin-bottom: 10px;">
                            À partir de 8 000$
                        </div>
                        <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                            Douche • Vanité • Céramique
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 25px;">
                    <button onclick="openExpressQuote()" style="
                        background: rgba(255,255,255,0.9);
                        color: #667eea;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 25px;
                        font-weight: bold;
                        cursor: pointer;
                    ">Mon Prix Personnalisé</button>
                </div>
            </div>
        `;
        
        // Section Garanties
        const warrantyHTML = `
            <div class="mobile-section" style="
                padding: 30px 20px;
                background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                color: white;
                margin: 20px 0;
            ">
                <h2 style="text-align: center; margin-bottom: 25px; font-size: 22px;">
                    ✅ Nos Garanties
                </h2>
                
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div style="
                        background: rgba(255,255,255,0.1);
                        border-radius: 12px;
                        padding: 20px;
                        display: flex;
                        align-items: center;
                    ">
                        <div style="font-size: 30px; margin-right: 15px;">🛡️</div>
                        <div>
                            <h3 style="margin: 0 0 5px 0;">Garantie 10 ans</h3>
                            <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                                Matériaux et main d'œuvre couverts
                            </p>
                        </div>
                    </div>
                    
                    <div style="
                        background: rgba(255,255,255,0.1);
                        border-radius: 12px;
                        padding: 20px;
                        display: flex;
                        align-items: center;
                    ">
                        <div style="font-size: 30px; margin-right: 15px;">💰</div>
                        <div>
                            <h3 style="margin: 0 0 5px 0;">Satisfaction 100%</h3>
                            <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                                Pas satisfait? On refait à nos frais
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Injecter toutes les sections
        mainContainer.insertAdjacentHTML('beforeend', beforeAfterHTML);
        mainContainer.insertAdjacentHTML('beforeend', pricingHTML);
        mainContainer.insertAdjacentHTML('beforeend', warrantyHTML);
    }
    
    function setupTouchOptimizations() {
        // Optimiser éléments tactiles
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-tap-highlight-color: rgba(255, 107, 53, 0.2);
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                user-select: none;
            }
            
            input, textarea {
                -webkit-user-select: text;
                user-select: text;
            }
            
            button {
                min-height: 44px;
                min-width: 44px;
                touch-action: manipulation;
            }
            
            body {
                font-size: 16px; /* Éviter zoom iOS */
            }
        `;
        document.head.appendChild(style);
        
        // Éviter zoom double-tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
});
```

## 📋 **Étape 2: Instructions Wix Editor**

### **1. Remplacer masterPage.js :**
- Ouvrez Wix Editor
- Allez dans "Code" → "Page Code" → "masterPage.js"  
- Sélectionnez tout le contenu (Ctrl+A)
- Collez le nouveau code ci-dessus
- Sauvegardez (Ctrl+S)

### **2. Publier le site :**
- Cliquez "Publier" en haut à droite
- Attendez la publication
- Testez sur mobile

## 🎯 **Étape 3: Vérification**

### **Ce qui devrait apparaître sur mobile :**
1. **Barre sticky en bas** avec 3 boutons (📞 💰 💬)
2. **Section Avant/Après** avec projets
3. **Section Prix** avec tarifs cuisine/salle de bain  
4. **Section Garanties** verte avec icônes

### **Test des fonctionnalités :**
- Cliquez bouton téléphone → doit composer
- Cliquez WhatsApp → doit ouvrir WhatsApp
- Boutons "Devis" → doit afficher notification

## 🔧 **Étape 4: Si ça ne fonctionne pas**

### **Vérifiez :**
1. **Console navigateur** (F12) pour erreurs
2. **Mode mobile** activé dans navigateur
3. **Cache navigateur** vidé (Ctrl+F5)
4. **Publication Wix** terminée

### **Alternative simple :**
Si le code JavaScript semble compliqué, on peut aussi juste ajouter des éléments HTML simples dans l'éditeur Wix avec les boutons de base.

**Voulez-vous que je vous guide étape par étape pour une version plus simple ?**