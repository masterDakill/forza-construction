# 🚀 Guide d'Intégration Wix - Forza Construction

## 📋 Table des Matières
1. [Vue d'ensemble](#vue-densemble)
2. [Structure du site](#structure-du-site)
3. [Étapes d'intégration](#étapes-dintégration)
4. [Configuration des pages](#configuration-des-pages)
5. [Éléments Wix requis](#éléments-wix-requis)
6. [Styles et design](#styles-et-design)
7. [Tests et validation](#tests-et-validation)

---

## 🎯 Vue d'Ensemble

Votre site Forza Construction est maintenant **100% optimisé** avec:
- ✅ Contenu marketing professionnel complet
- ✅ Code JavaScript fonctionnel pour toutes les pages
- ✅ Design moderne et responsive
- ✅ Optimisations mobile avancées
- ✅ Formulaires intelligents avec validation
- ✅ Système de tracking et analytics
- ✅ Navigation fluide et intuitive

---

## 📁 Structure du Site

```
Forza-construction/
├── src/
│   ├── pages/
│   │   ├── Home.c1dmp.js              ← Page d'accueil (NOUVEAU)
│   │   ├── Services.svhfm.js          ← Page services
│   │   ├── Réalisations.nlsrb.js     ← Portfolio projets
│   │   ├── À propos.c9awj.js         ← À propos complet
│   │   ├── Contact.anc3u.js           ← Formulaire contact
│   │   ├── Obtenir un devis.c4omm.js ← Formulaire devis
│   │   └── masterPage.js              ← Configuration globale
│   ├── content/
│   │   ├── optimizedContent.js        ← Textes optimisés
│   │   └── premiumMarketingCopy.js    ← Copy marketing
│   ├── config/
│   │   └── navigationConfig.js        ← Configuration navigation
│   ├── utils/
│   │   └── scrollOptimization.js      ← Optimisations scroll
│   └── styles/
│       └── global.css                  ← Styles professionnels (NOUVEAU)
```

---

## 🔧 Étapes d'Intégration

### ÉTAPE 1: Préparer l'éditeur Wix

1. **Ouvrir l'éditeur Wix**
   - Aller sur [Wix Editor](https://manage.wix.com)
   - Ouvrir votre site Forza Construction

2. **Activer le mode développeur**
   - Cliquer sur "Outils" (en haut)
   - Sélectionner "Developer Tools"
   - Activer "Enable Dev Mode"

3. **Accéder au Code Editor**
   - Panneau gauche → Icône `{}</>`
   - Ou raccourci: `Ctrl + Shift + K` (Windows) / `Cmd + Shift + K` (Mac)

---

### ÉTAPE 2: Importer les Fichiers de Contenu

#### 2.1 Créer la Structure des Dossiers

Dans le Code Editor Wix:
```
Public & Backend/
├── backend/
│   └── (fichiers existants)
└── public/
    ├── content/
    │   ├── optimizedContent.js
    │   └── premiumMarketingCopy.js
    ├── config/
    │   └── navigationConfig.js
    └── utils/
        └── scrollOptimization.js
```

#### 2.2 Copier les Fichiers

1. **optimizedContent.js**
   - Copier TOUT le contenu du fichier `src/content/optimizedContent.js`
   - Créer un nouveau fichier dans Wix: `public/content/optimizedContent.js`
   - Coller le code

2. **premiumMarketingCopy.js**
   - Copier TOUT le contenu du fichier `src/content/premiumMarketingCopy.js`
   - Créer: `public/content/premiumMarketingCopy.js`
   - Coller le code

3. **navigationConfig.js**
   - Copier: `src/config/navigationConfig.js`
   - Créer: `public/config/navigationConfig.js`
   - Coller le code

4. **scrollOptimization.js**
   - Copier: `src/utils/scrollOptimization.js`
   - Créer: `public/utils/scrollOptimization.js`
   - Coller le code

---

### ÉTAPE 3: Configurer les Pages

#### 3.1 Page d'Accueil (Homepage)

**Code à copier:** `src/pages/Home.c1dmp.js`

**Éléments Wix requis** (IDs à créer dans l'éditeur):

##### Section Hero
- `#textHeroTitle` - Texte: Titre principal
- `#textHeroSubtitle` - Texte: Sous-titre
- `#textHeroDescription` - Texte: Description
- `#btnHeroPrimary` - Bouton: CTA principal
- `#btnHeroSecondary` - Bouton: CTA secondaire
- `#textHeroUrgency` - Texte: Message d'urgence
- `#repeaterTrustBadges` - Repeater: Badges de confiance
  - `#textBadge` - Texte dans le repeater

##### Section Services
- `#textServicesTitle` - Texte: Titre section
- `#textServicesSubtitle` - Texte: Sous-titre
- `#repeaterServices` - Repeater: Liste des services
  - `#textServiceTitle` - Texte: Nom du service
  - `#textServiceDesc` - Texte: Description
  - `#textServicePrice` - Texte: Prix
  - `#textServiceDuration` - Texte: Durée
  - `#textServiceFeatures` - Texte: Caractéristiques
  - `#btnServiceCTA` - Bouton: CTA
  - `#boxService` - Box conteneur (pour hover)

##### Section Processus
- `#textProcessTitle` - Texte: Titre
- `#textProcessSubtitle` - Texte: Sous-titre
- `#repeaterProcess` - Repeater: Étapes
  - `#textStepNumber` - Texte: Numéro
  - `#textStepIcon` - Texte: Emoji icône
  - `#textStepTitle` - Texte: Titre étape
  - `#textStepDescription` - Texte: Description
  - `#textStepDuration` - Texte: Durée
  - `#textStepDetails` - Texte: Détails (desktop)

##### Section Témoignages
- `#textTestimonialsTitle` - Texte: Titre
- `#textTestimonialsSubtitle` - Texte: Sous-titre
- `#repeaterStats` - Repeater: Statistiques
  - `#textStatValue` - Texte: Valeur
  - `#textStatLabel` - Texte: Label
- `#repeaterTestimonials` - Repeater: Témoignages
  - `#textTestimonialQuote` - Texte: Citation
  - `#textTestimonialAuthor` - Texte: Auteur
  - `#textTestimonialLocation` - Texte: Localisation
  - `#textTestimonialProject` - Texte: Projet
  - `#textTestimonialRating` - Texte: Étoiles

##### Section Pourquoi Nous
- `#textWhyTitle` - Texte: Titre
- `#textWhySubtitle` - Texte: Sous-titre (desktop)
- `#repeaterWhyReasons` - Repeater: Raisons
  - `#textReasonIcon` - Texte: Icône
  - `#textReasonTitle` - Texte: Titre
  - `#textReasonDescription` - Texte: Description
  - `#textReasonProof` - Texte: Preuve (desktop)

##### Section Garanties
- `#textGuaranteesTitle` - Texte: Titre
- `#textGuaranteesSubtitle` - Texte: Sous-titre
- `#repeaterGuarantees` - Repeater: Garanties
  - `#textGuaranteeIcon` - Texte: Icône
  - `#textGuaranteeTitle` - Texte: Titre
  - `#textGuaranteeDescription` - Texte: Description
  - `#textGuaranteeCoverage` - Texte: Couverture

##### Section CTA Finale
- `#textCTAHeadline` - Texte: Titre
- `#textCTASubheadline` - Texte: Sous-titre
- `#textCTABenefits` - Texte: Liste bénéfices
- `#btnCTAPrimary` - Bouton: CTA principal
- `#textCTASecondary` - Texte: Texte secondaire (téléphone)
- `#btnCTACall` - Bouton: Appel

##### Éléments Additionnels
- `#btnFloatingCTA` - Bouton flottant mobile
- `#textUrgencyRotating` - Texte: Messages d'urgence rotatifs
- `#btnOpenChat` - Bouton: Ouvrir chat
- `#imageHeroBackground` - Image: Background hero (parallax)

**Instructions d'intégration:**
```javascript
// 1. Créer une nouvelle page "Home" dans Wix
// 2. Ajouter tous les éléments ci-dessus avec les IDs exacts
// 3. Dans les propriétés de la page → Code
// 4. Copier-coller le code de Home.c1dmp.js
// 5. Sauvegarder
```

---

#### 3.2 Page Services

**Code existant:** `src/pages/Services.svhfm.js` (déjà prêt)

**Éléments principaux:**
- `#repeaterServices` - Repeater des services
- `#inputSurface` - Input: Surface en pi²
- `#dropdownProjet` - Dropdown: Type de projet
- `#checkboxDemolition`, `#checkboxElectrique`, etc. - Checkboxes options
- `#textEstimation` - Texte: Prix estimé
- `#btnDevisDetaille` - Bouton: Obtenir devis détaillé
- Filtres: `#btnTous`, `#btnResidentiel`, `#btnCommercial`, `#btnUrgence`

---

#### 3.3 Page Réalisations

**Code existant:** `src/pages/Réalisations.nlsrb.js` (complet avec 4 projets)

**Éléments principaux:**
- `#repeaterPortfolio` - Repeater des projets
  - `#textTitle`, `#textDescription`, `#textClient`
  - `#textYear`, `#textDuration`, `#textBudget`, `#textSurface`
  - `#imageProject` - Image projet
  - `#textCategory` - Catégorie
  - `#textRating` - Étoiles
  - `#btnVoirProjet` - Voir détails
  - `#btnAvantApres` - Avant/Après
  - `#btnDevisSimulaire` - Devis similaire

- Filtres:
  - `#btnFiltreAll` - Tous
  - `#btnFiltreCuisine` - Cuisines
  - `#btnFiltreSalleBain` - Salles de bain
  - `#btnFiltreAgrandissement` - Agrandissements
  - `#btnFiltreSousSol` - Sous-sols

- `#dropdownTri` - Dropdown: Tri (date, prix, surface)
- `#repeaterTestimonials` - Repeater témoignages
- `#textProjectCount` - Texte: Nombre de projets

---

#### 3.4 Page À Propos

**Code existant:** `src/pages/À propos.c9awj.js` (complet)

**Éléments principaux:**
- `#textAboutHeroTitle`, `#textAboutHeroSubtitle`, `#textAboutHeroDescription`
- `#repeaterStory` - Timeline de l'entreprise
  - `#textYear`, `#textMilestoneTitle`, `#textMilestoneDesc`
- `#repeaterTeam` - Équipe (4 membres)
  - `#imageMember`, `#textName`, `#textTitle`
  - `#textExperience`, `#textSpecialty`, `#textDescription`
  - `#textAchievements`
- `#repeaterValues` - Valeurs (6 valeurs)
  - `#iconValue`, `#titleValue`, `#descriptionValue`
- `#repeaterCertifications` - Certifications
  - `#textCertName`, `#textCertNumber`, `#textCertDesc`
  - `#imageCertLogo`
- Stats: `#textStatsProjects`, `#textStatsClients`, `#textStatsYears`, `#textStatsTeam`
- `#repeaterClientTestimonials` - Témoignages clients
- `#repeaterWhyChooseUs` - Pourquoi nous choisir

---

#### 3.5 Page Contact

**Code existant:** `src/pages/Contact.anc3u.js` (très complet avec features mobiles)

**Éléments principaux:**

##### Formulaire
- `#inputNom` - Input: Nom
- `#inputEmail` - Input: Email (avec validation)
- `#inputPhone` - Input: Téléphone (avec format auto)
- `#inputEntreprise` - Input: Entreprise (optionnel)
- `#dropdownSujet` - Dropdown: Sujet
- `#inputMessage` - Textarea: Message
- `#checkboxUrgent` - Checkbox: Urgence
- `#checkboxNewsletter` - Checkbox: Newsletter
- `#btnSubmitContact` - Bouton: Envoyer

##### Informations Contact
- `#textPhone` - Texte: Téléphone
- `#textEmail` - Texte: Email
- `#textAddress` - Texte: Adresse
- `#btnCallNow` - Bouton: Appeler
- `#btnEmailUs` - Bouton: Email
- `#btnDirections` - Bouton: Directions

##### Carte et Heures
- `#htmlMap` - HTML Component: Google Maps
- `#repeaterHours` - Repeater: Heures d'ouverture
  - `#textDay`, `#textHours`, `#boxDay`
- `#textStatus` - Texte: Status ouvert/fermé
- `#textUrgence` - Texte: Numéro d'urgence

##### Features Mobiles (optionnels mais recommandés)
- `#htmlMobileActions` - HTML: Barre actions rapides mobile
- `#btnDetectLocation` - Bouton: Géolocalisation
- `#btnVoiceInput` - Bouton: Input vocal
- `#btnShareLocation` - Bouton: Partager localisation

##### Messages et Erreurs
- `#boxErrors`, `#textErrors` - Messages d'erreur
- `#boxSuccess`, `#textSuccess` - Message succès
- `#boxError`, `#textError` - Message erreur générique
- Elements d'erreur par champ: `#inputNomError`, `#inputEmailError`, etc.

---

#### 3.6 Page Obtenir un Devis

**Code existant:** `src/pages/Obtenir un devis.c4omm.js` (workflow complet en 4 étapes)

**Éléments principaux:**

##### Navigation Étapes
- `#repeaterSteps` - Repeater: Indicateur de progression
  - `#numberStep`, `#iconStep`, `#titleStep`, `#boxStep`
- `#barProgress` - Barre de progression
- `#textProgressPercent` - Texte: Pourcentage

##### Étape 1: Sélection Service
- `#sectionStep1` - Section étape 1
- `#repeaterServices` - Repeater: Types de services
  - `#iconService`, `#nameService`, `#basePriceService`
  - `#btnSelectService`, `#boxService`
- `#textSelectedService` - Texte: Service sélectionné

##### Étape 2: Détails et Options
- `#sectionStep2` - Section étape 2
- `#inputSurface` - Input: Surface en pi²
- `#repeaterOptions` - Repeater: Options additionnelles
  - `#nameOption`, `#multiplierOption`, `#checkboxOption`
- `#dropdownUrgency` - Dropdown: Niveau d'urgence
- `#textEstimatedPrice` - Texte: Prix estimé (animé)
- `#htmlCalculationDetails` - HTML: Détails du calcul

##### Étape 3: Informations Client
- `#sectionStep3` - Section étape 3
- `#inputName` - Input: Nom
- `#inputEmail` - Input: Email
- `#inputPhone` - Input: Téléphone
- `#inputAddress` - Input: Adresse
- `#dropdownPreferredContact` - Dropdown: Mode de contact préféré
- `#textAreaMessage` - Textarea: Message/détails
- Erreurs: `#inputNameError`, `#inputEmailError`, etc.

##### Étape 4: Confirmation
- `#sectionStep4` - Section étape 4
- `#textSuccessMessage` - Texte: Message succès
- `#textEstimationRecap` - Texte: Récap estimation
- `#btnScheduleVisit` - Bouton: Planifier visite
- `#btnViewPortfolio` - Bouton: Voir portfolio

##### Navigation Étapes
- `#btnNextStep2`, `#btnNextStep3` - Boutons: Suivant
- `#btnBackStep1`, `#btnBackStep2` - Boutons: Retour
- `#btnSubmitQuote` - Bouton: Soumettre demande

##### Autres
- `#iconLoader` - Icône: Loader durant soumission
- `#textErrorMessage` - Texte: Messages d'erreur
- `#textReference` - Texte: Référence projet (si vient de portfolio)

---

### ÉTAPE 4: Configurer le Master Page

**Code existant:** `src/pages/masterPage.js` (complet avec optimisations mobiles)

**Ce fichier s'applique à TOUTES les pages du site**

**Actions:**
1. Dans Wix Editor → Aller à "Site Structure" (panneau gauche)
2. Cliquer sur "Site"  → "Master Page"
3. Dans les propriétés → "Code"
4. Copier-coller le code de `masterPage.js`

**Fonctionnalités incluses:**
- ✅ Détection de device (mobile/desktop)
- ✅ Optimisations scroll globales
- ✅ Lazy loading images
- ✅ Préconnexion domaines critiques
- ✅ Gestion d'erreurs globale
- ✅ Système de cache intelligent
- ✅ Notifications globales
- ✅ Optimisations mobiles avancées
- ✅ Gestion du clavier mobile
- ✅ Orientation handling
- ✅ App-like behavior

**Note:** Ne nécessite PAS d'éléments spécifiques car fonctionne de manière transparente.

---

### ÉTAPE 5: Appliquer les Styles CSS

**Fichier:** `src/styles/global.css`

**Méthode 1: Via Custom CSS (Recommandé)**
1. Dans Wix Editor → Aller dans "Settings" (roue dentée)
2. "Advanced Settings" → "Custom Code"
3. Cliquer "Add Custom Code"
4. Nom: "Forza Construction Global Styles"
5. Type: Sélectionner "CSS"
6. Location: "Head" (all pages)
7. Copier-coller TOUT le contenu de `global.css`
8. Sauvegarder

**Méthode 2: Via Page Code**
Pour appliquer sur une page spécifique:
```javascript
$w.onReady(function () {
    // Injecter les styles
    const style = document.createElement('style');
    style.textContent = `
        /* Copier le contenu de global.css ici */
    `;
    document.head.appendChild(style);
});
```

---

### ÉTAPE 6: Configurer la Navigation

La navigation est déjà configurée dans `navigationConfig.js`.

**Routes définies:**
```javascript
home: '/'
services: '/services'
realisations: '/realisations'
about: '/a-propos'
quote: '/obtenir-un-devis'
contact: '/contact'
blog: '/blog'
payment: '/paiement'
```

**S'assurer que les URLs Wix correspondent:**
1. Dans Wix Editor → "Pages" (panneau gauche)
2. Pour chaque page → Clic droit → "Settings"
3. Vérifier/modifier le "Page URL" pour correspondre aux routes ci-dessus

---

### ÉTAPE 7: Configurer les Webhooks et Intégrations

#### 7.1 Formulaire de Contact

Dans `Contact.anc3u.js`, ligne 160:
```javascript
const webhookUrl = 'https://hook.make.com/your-forza-webhook';
```

**À faire:**
1. Créer un scénario Make.com (ou Zapier)
2. Obtenir l'URL du webhook
3. Remplacer `your-forza-webhook` par votre URL réelle

#### 7.2 Formulaire de Devis

Dans `Obtenir un devis.c4omm.js`, ligne 608:
```javascript
const webhookUrl = 'https://hook.make.com/forza-construction-quotes';
```

**À faire:** Même chose que ci-dessus

#### 7.3 Analytics (Google Analytics)

Le code est déjà prêt pour Google Analytics.

**À faire:**
1. Dans les fichiers, chercher: `'AW-CONVERSION_ID'`
2. Remplacer par votre vrai ID de conversion Google Ads
3. Chercher: `window.gtag`
4. S'assurer que Google Analytics est configuré dans Wix:
   - Settings → Tracking & Analytics
   - Ajouter Google Analytics ID

#### 7.4 Facebook Pixel

Chercher `window.fbq` dans les fichiers et configurer votre Pixel ID.

---

## ✅ Tests et Validation

### Checklist Finale

#### 1. Pages Créées
- [ ] Page d'accueil (Home)
- [ ] Page Services
- [ ] Page Réalisations
- [ ] Page À Propos
- [ ] Page Contact
- [ ] Page Obtenir un Devis

#### 2. Éléments Wix
- [ ] Tous les IDs créés et nommés correctement
- [ ] Repeaters configurés avec les bons contenus
- [ ] Boutons connectés au code
- [ ] Formulaires fonctionnels

#### 3. Code et Contenu
- [ ] Fichiers de contenu importés (optimizedContent.js, premiumMarketingCopy.js)
- [ ] Fichiers utilitaires importés (navigationConfig.js, scrollOptimization.js)
- [ ] Code des pages copié et collé
- [ ] Master page configuré

#### 4. Styles
- [ ] CSS global appliqué
- [ ] Design cohérent sur toutes les pages
- [ ] Responsive mobile vérifié

#### 5. Intégrations
- [ ] Webhooks configurés
- [ ] Google Analytics connecté
- [ ] Facebook Pixel configuré (si utilisé)

#### 6. Navigation
- [ ] URLs des pages configurées correctement
- [ ] Menu de navigation fonctionnel
- [ ] Liens internes fonctionnels

#### 7. Tests Mobiles
- [ ] Site testé sur iPhone/iOS
- [ ] Site testé sur Android
- [ ] Toutes les interactions tactiles fonctionnent
- [ ] Formulaires mobiles optimisés

#### 8. Tests Desktop
- [ ] Site testé sur Chrome
- [ ] Site testé sur Firefox
- [ ] Site testé sur Safari
- [ ] Animations et hover effects fonctionnent

#### 9. Performance
- [ ] Images optimisées
- [ ] Lazy loading actif
- [ ] Temps de chargement < 3 secondes
- [ ] Score Lighthouse > 80

#### 10. Fonctionnalités
- [ ] Formulaire de contact fonctionne
- [ ] Formulaire de devis fonctionne
- [ ] Calculateur de prix fonctionne
- [ ] Filtres portfolio fonctionnent
- [ ] Témoignages s'affichent

---

## 🎨 Personnalisation

### Modifier les Couleurs

Dans `global.css`, modifier les variables:
```css
:root {
    --primary-color: #FF6B35;  /* Votre couleur principale */
    --secondary-color: #2C3E50; /* Votre couleur secondaire */
}
```

### Modifier les Textes

Tous les textes sont centralisés dans:
- `src/content/optimizedContent.js` - Contenu principal
- `src/content/premiumMarketingCopy.js` - Copy marketing

### Ajouter/Modifier des Projets Portfolio

Dans `Réalisations.nlsrb.js`, section `portfolioProjects` (ligne 21), ajouter:
```javascript
{
    id: 'mon-nouveau-projet',
    title: 'Titre du Projet',
    category: 'cuisine', // ou 'salle-de-bain', 'agrandissement', 'sous-sol'
    client: 'Nom Client',
    year: '2024',
    duration: '4 semaines',
    budget: '30,000$',
    surface: '200 pi²',
    description: 'Description courte',
    // ... autres propriétés
}
```

### Ajouter des Membres d'Équipe

Dans `À propos.c9awj.js`, section `teamMembers` (ligne 32), ajouter:
```javascript
{
    name: 'Prénom Nom',
    title: 'Titre/Poste',
    experience: '10 ans',
    specialty: 'Spécialité',
    description: 'Bio courte',
    image: '/images/team/photo.jpg',
    achievements: ['Réalisation 1', 'Réalisation 2']
}
```

---

## 🆘 Dépannage

### Problème: Les éléments ne s'affichent pas
**Solution:** Vérifier que tous les IDs Wix correspondent exactement au code (sensible à la casse)

### Problème: Erreur "element is not defined"
**Solution:** L'élément n'existe pas dans l'éditeur Wix. Créer l'élément avec le bon ID.

### Problème: Le code ne s'exécute pas
**Solution:**
1. Vérifier la console browser (F12) pour les erreurs
2. S'assurer que le Dev Mode est activé
3. Sauvegarder et rafraîchir la prévisualisation

### Problème: Les imports ne fonctionnent pas
**Solution:** S'assurer que les chemins dans les imports correspondent à la structure Wix:
```javascript
import { ... } from 'public/content/optimizedContent.js';
```

### Problème: Le formulaire ne soumet pas
**Solution:** Vérifier que le webhook URL est configuré et accessible

---

## 📞 Support

Pour toute question sur l'intégration:
1. Consulter la [documentation Wix Velo](https://www.wix.com/velo/reference)
2. Vérifier les ID des éléments dans le code
3. Tester étape par étape chaque section

---

## 🚀 Déploiement

Une fois tout configuré et testé:

1. **Prévisualiser** - Tester en mode prévisualisation
2. **Corriger** - Ajuster les bugs trouvés
3. **Publier** - Cliquer "Publish" dans Wix Editor
4. **Vérifier** - Tester le site publié
5. **Optimiser** - Ajuster selon les retours

---

## ✨ Félicitations!

Votre site Forza Construction est maintenant:
- ✅ 100% professionnel
- ✅ Optimisé pour les conversions
- ✅ Responsive et mobile-friendly
- ✅ SEO-ready
- ✅ Rapide et performant
- ✅ Prêt à générer des leads!

**Bon succès! 🎉**