# 🚀 INTÉGRATION RAPIDE - 15 Minutes

## ✅ Vous êtes connecté à Wix!
Email: constructionforzainc@gmail.com

---

## 🎯 OPTION A: Mode Développement Local (Recommandé)

### Étape 1: Lancer l'éditeur local
```bash
cd /Users/Mathieu/Forza-construction
wix dev
```

Cela va:
- Ouvrir l'éditeur Wix dans votre navigateur
- Connecter vos fichiers locaux
- Permettre de voir les changements en temps réel

### Étape 2: Dans l'éditeur qui s'ouvre
1. Les fichiers `src/` sont automatiquement synchronisés
2. Vous pouvez éditer visuellement dans Wix
3. Le code local est déjà intégré

---

## 🎯 OPTION B: Intégration Manuelle (Plus de contrôle)

### ÉTAPE 1: Ouvrir l'Éditeur Wix
1. Aller sur https://manage.wix.com
2. Ouvrir votre site Forza Construction
3. Cliquer "Edit Site" (Modifier le site)

### ÉTAPE 2: Activer Dev Mode
1. Cliquer sur "Dev Mode" en haut à gauche (icône `</>`)
2. Ou Outils → Developer Tools → Enable Dev Mode

### ÉTAPE 3: Ouvrir le Code Editor
- Raccourci: `Cmd + Shift + K` (Mac) ou `Ctrl + Shift + K` (Windows)
- Ou cliquer sur l'icône `</>` dans le panneau gauche

---

## 📁 FICHIERS À COPIER (Dans l'ordre)

### 1️⃣ Structure des Dossiers (Créer d'abord)
Dans le Code Editor Wix, créer:
```
Public & Backend/
└── public/
    ├── content/
    ├── config/
    ├── utils/
    └── styles/
```

### 2️⃣ Fichiers de Contenu (Copier en premier)

**A. Créer:** `public/content/optimizedContent.js`
```bash
# Ouvrir ce fichier local et copier TOUT:
src/content/optimizedContent.js
```

**B. Créer:** `public/content/premiumMarketingCopy.js`
```bash
# Copier TOUT le contenu de:
src/content/premiumMarketingCopy.js
```

**C. Créer:** `public/config/navigationConfig.js`
```bash
# Copier TOUT le contenu de:
src/config/navigationConfig.js
```

**D. Créer:** `public/utils/scrollOptimization.js`
```bash
# Copier TOUT le contenu de:
src/utils/scrollOptimization.js
```

### 3️⃣ Fichiers des Pages

Pour chaque page, dans Wix:
1. Aller dans "Pages" (panneau gauche)
2. Sélectionner la page (ex: Home)
3. Cliquer sur l'icône Code `{}`
4. Copier-coller le code correspondant

**Pages à configurer:**

| Page Wix | Fichier Local | Status |
|----------|--------------|--------|
| Home | `src/pages/Home.c1dmp.js` | ⭐ NOUVEAU |
| Services | `src/pages/Services.svhfm.js` | ✅ Existe |
| Réalisations | `src/pages/Réalisations.nlsrb.js` | ✅ Existe |
| À propos | `src/pages/À propos.c9awj.js` | ✅ Existe |
| Contact | `src/pages/Contact.anc3u.js` | ✅ Existe |
| Obtenir un devis | `src/pages/Obtenir un devis.c4omm.js` | ✅ Existe |

### 4️⃣ Master Page
1. Dans Wix: Site Structure → Master Page
2. Cliquer sur Code `{}`
3. Copier TOUT le contenu de: `src/pages/masterPage.js`

### 5️⃣ CSS Global
**Méthode 1 (Recommandée):**
1. Dans Wix: Settings ⚙️ → Advanced → Custom Code
2. Add Custom Code
3. Nom: "Forza Global Styles"
4. Type: CSS
5. Location: Head (all pages)
6. Copier TOUT le contenu de: `src/styles/global.css`

**Méthode 2 (Alternative):**
Ajouter dans le `<head>` de chaque page via Custom Code

---

## 🎨 CRÉER LES ÉLÉMENTS WIX

### Pour la Homepage (NOUVEAU)

Vous devez créer ces éléments dans l'éditeur visuel Wix:

#### Hero Section
- Ajouter un **Text** → ID: `textHeroTitle`
- Ajouter un **Text** → ID: `textHeroSubtitle`
- Ajouter un **Text** → ID: `textHeroDescription`
- Ajouter un **Button** → ID: `btnHeroPrimary`
- Ajouter un **Button** → ID: `btnHeroSecondary`
- Ajouter un **Text** → ID: `textHeroUrgency`
- Ajouter un **Repeater** → ID: `repeaterTrustBadges`
  - Dans le repeater: Text → ID: `textBadge`

#### Services Section
- Ajouter **Text** → ID: `textServicesTitle`
- Ajouter **Text** → ID: `textServicesSubtitle`
- Ajouter **Repeater** → ID: `repeaterServices`
  - Dans le repeater:
    - Text → `textServiceTitle`
    - Text → `textServiceDesc`
    - Text → `textServicePrice`
    - Text → `textServiceDuration`
    - Text → `textServiceFeatures`
    - Button → `btnServiceCTA`
    - Box → `boxService`

**ASTUCE:** Pour voir TOUS les IDs requis, consulter:
```
GUIDE_INTEGRATION_WIX.md
(Section: Configuration des pages)
```

---

## ⚡ MÉTHODE ULTRA-RAPIDE (5 minutes)

Si vous voulez juste tester rapidement:

### 1. Lancer le mode dev
```bash
cd /Users/Mathieu/Forza-construction
wix dev
```

### 2. Dans l'éditeur qui s'ouvre
- Vos fichiers sont déjà synchronisés
- Commencez par créer les éléments visuels
- Le code fonctionnera automatiquement

### 3. Publier
```bash
wix publish --yes
```

---

## 🔧 CONFIGURATION IMPORTANTE

### Webhooks à Configurer

**A. Formulaire Contact** (`src/pages/Contact.anc3u.js` ligne 160)
```javascript
const webhookUrl = 'https://hook.make.com/your-forza-webhook';
```
→ Remplacer par votre URL Make.com réelle

**B. Formulaire Devis** (`src/pages/Obtenir un devis.c4omm.js` ligne 608)
```javascript
const webhookUrl = 'https://hook.make.com/forza-construction-quotes';
```
→ Remplacer par votre URL Make.com réelle

### Analytics à Configurer

Dans les fichiers, chercher et remplacer:
- `'AW-CONVERSION_ID'` → Votre ID Google Ads
- Configurer Google Analytics dans: Settings → Tracking & Analytics

---

## 📋 CHECKLIST RAPIDE

### Avant de Commencer
- [ ] Wix CLI installé (✅ Fait)
- [ ] Connecté à Wix (✅ Fait - constructionforzainc@gmail.com)
- [ ] Tous les fichiers locaux prêts (✅ Fait)

### Intégration
- [ ] Mode dev lancé OU éditeur manuel ouvert
- [ ] Dossiers créés (content, config, utils, styles)
- [ ] Fichiers de contenu copiés (4 fichiers)
- [ ] Code des 6 pages copié
- [ ] Master page configuré
- [ ] CSS global appliqué

### Éléments Wix (Homepage minimum)
- [ ] Hero: 7 éléments créés avec IDs
- [ ] Services: Repeater + éléments
- [ ] Processus: Repeater + éléments
- [ ] Témoignages: 2 Repeaters
- [ ] Garanties: Repeater
- [ ] CTA finale: 5 éléments

### Configuration
- [ ] Webhooks configurés (2)
- [ ] Analytics configuré
- [ ] Coordonnées mises à jour

### Tests
- [ ] Prévisualisation fonctionne
- [ ] Formulaires testés
- [ ] Navigation testée
- [ ] Mobile testé

### Publication
- [ ] Derniers tests OK
- [ ] `wix publish --yes`
- [ ] Site en ligne vérifié

---

## 🆘 BESOIN D'AIDE?

### Commandes Wix CLI Utiles
```bash
# Voir votre compte
wix whoami

# Mode développement
wix dev

# Prévisualiser avant publication
wix preview

# Publier en production
wix publish --yes

# Se déconnecter
wix logout
```

### Ressources
- Guide complet: `GUIDE_INTEGRATION_WIX.md`
- Documentation Wix Velo: https://www.wix.com/velo/reference
- Wix CLI Docs: https://wix.to/YASTRGa

---

## 🎉 C'EST PARTI!

**Recommandation:**
1. Commencez par `wix dev` pour voir l'éditeur
2. Créez les éléments visuels pour la Homepage
3. Le code est déjà intégré via le CLI
4. Testez en prévisualisation
5. Publiez quand prêt

**Temps estimé:**
- Mode dev + création éléments: 15-30 min
- Configuration complète: 1-2 heures
- Tout parfait et testé: 2-4 heures

**Bon courage! Vous avez tout ce qu'il faut! 🚀**