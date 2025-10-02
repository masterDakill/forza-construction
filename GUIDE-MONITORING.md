# 🔍 Guide Monitoring Forza Construction

## Vue d'ensemble

Le système de monitoring Forza Construction permet de vérifier de manière **non-invasive** la qualité et la conformité du site sur 6 pages principales, sans jamais modifier le contenu publié.

---

## 📁 Fichiers du système

### 1. `/public/forzaMonitor.js` (Moniteur principal)
- **900+ lignes** de checks exhaustifs
- **Non-invasif:** Utilise des iframes pour tester sans navigation
- **Dry-run:** Simule les événements sans les déclencher
- **Graceful failure:** Retourne toujours un rapport même en cas d'erreur

### 2. `/public/monitor-test.html` (Interface de test)
- Interface HTML pour lancer le monitoring facilement
- Console de statut en temps réel
- Instructions d'utilisation

### 3. `/src/utils/siteMonitor.js` (Moniteur alternatif)
- Version alternative pour environnement Wix Velo
- Même logique de checks
- Intégration directe dans les pages

---

## 🚀 Utilisation

### Option 1: Interface HTML (Recommandé pour tests)

1. **Ouvrir le site en preview Wix:**
   ```bash
   wix preview
   ```

2. **Naviguer vers l'interface de test:**
   ```
   https://votre-site.wixsite.com/forza-construction/monitor-test
   ```

3. **Ouvrir la console développeur:**
   - Chrome/Edge: `F12` ou `Cmd+Option+I` (Mac)
   - Firefox: `F12` ou `Cmd+Option+K` (Mac)

4. **Cliquer sur "Lancer le monitoring"**

5. **Attendre 30-60 secondes**

6. **Consulter les résultats:**
   - Tableau détaillé dans la console
   - Score global affiché
   - Rapport JSON sauvegardé dans `localStorage`

### Option 2: Console développeur

```javascript
// Import du module
import { runForzaMonitor } from './forzaMonitor.js';

// Lancer avec pages par défaut
const report = await runForzaMonitor();

// Lancer avec pages personnalisées
const report = await runForzaMonitor([
  '/',
  '/services',
  '/a-propos'
]);

// Récupérer le rapport depuis localStorage
const saved = JSON.parse(localStorage.getItem('forzaMonitoringReport'));
console.log(saved);
```

### Option 3: Intégration dans une page Wix

```javascript
// Dans n'importe quelle page .js
import { runForzaMonitor } from 'public/forzaMonitor.js';

$w.onReady(async function() {
  // Ajouter un bouton dans l'éditeur Wix avec ID #btnMonitor
  $w('#btnMonitor').onClick(async () => {
    console.log('🔍 Démarrage monitoring...');
    const report = await runForzaMonitor();
    console.log('✅ Terminé! Score:', report.globalScore);
  });
});
```

---

## 📊 Checks effectués

### 🎯 SEO (Search Engine Optimization)

| Check | Sévérité | Critère |
|-------|----------|---------|
| Title présent | ❌ Critique | Obligatoire |
| Title longueur | ⚠️ Mineur | 10-60 caractères |
| Meta description | 🔴 Majeur | Présente |
| Meta description longueur | ⚠️ Mineur | 120-160 caractères |
| JSON-LD LocalBusiness | 🔴 Majeur | Sur homepage uniquement |
| Open Graph tags | ⚠️ Mineur | og:title, og:image, og:description |
| H1 présent | 🔴 Majeur | Exactement 1 par page |
| H1 count | ⚠️ Mineur | Pas plus de 1 |
| Images alt text | ⚠️ Mineur | Toutes les images |

### 🧭 Navigation & CTAs

| Check | Sévérité | Critère |
|-------|----------|---------|
| CTAs requis (#ctaDevis, #ctaContact, #ctaServices) | 🔴 Majeur | Présents |
| Header sticky | ⚠️ Mineur | Position sticky/fixed |
| CTA sticky mobile | 🔴 Majeur | Sur homepage et /services |
| Menu mobile | ⚠️ Mineur | Présent |
| Bouton menu mobile | 🔴 Majeur | Fonctionnel |

### ♿ Accessibilité (WCAG 2.1 AA)

| Check | Sévérité | Critère |
|-------|----------|---------|
| Touch targets | 🔴 Majeur | Minimum 44×44px |
| ARIA labels | ⚠️ Mineur | Sur éléments sans texte |
| Lang attribute | ⚠️ Mineur | `<html lang="fr">` |
| Form labels | ⚠️ Mineur | Tous les inputs |

### ⚡ Performance

| Check | Sévérité | Critère |
|-------|----------|---------|
| Lazy loading | ⚠️ Mineur | ≥50% des images |
| Images WebP/AVIF | ⚠️ Mineur | Format optimisé |
| Resource hints | ⚠️ Mineur | preconnect, dns-prefetch |
| LCP proxy | 🔴 Majeur | <2500ms |
| CLS proxy | 🔴 Majeur | <0.1 |
| INP proxy | 🔴 Majeur | <200ms |

### 📈 Analytics

| Check | Sévérité | Critère |
|-------|----------|---------|
| gtag présent | 🔴 Majeur | `window.gtag` fonction |
| dataLayer présent | ⚠️ Mineur | `window.dataLayer` array |
| Événements GA4 | ℹ️ Info | Comptage |

### 💬 Chatbot

| Check | Sévérité | Critère |
|-------|----------|---------|
| Chatbot initialisé | ⚠️ Mineur | `window.forzaChat` |
| Intents configurés | ⚠️ Mineur | devis, services, renoclimat, contact |

### 📝 Formulaires

| Check | Sévérité | Critère |
|-------|----------|---------|
| Formulaire présent | 🔴 Majeur | Sur pages contact/devis |
| Formulaire non vide | 🔴 Majeur | ≥1 champ |
| Submit handler | 🔴 Majeur | Présent |
| Input labels | ⚠️ Mineur | Tous les champs |

---

## 📋 Format du rapport

### Structure JSON

```json
{
  "when": "2025-09-30T01:30:00.000Z",
  "globalScore": 85,
  "globalStatus": "✅ EXCELLENT",
  "results": [
    {
      "path": "/",
      "title": "Forza Construction | Rénovation & Construction au Québec",
      "metaDescLen": 145,
      "h1": "Expert en rénovation résidentielle",
      "h1Count": 1,
      "checks": {
        "seo": { ... },
        "navigation": { ... },
        "accessibility": { ... },
        "performance": { ... },
        "analytics": { ... },
        "chatbot": { ... },
        "forms": [ ... ],
        "webVitals": { ... }
      },
      "issues": [
        {
          "sev": "mineur",
          "msg": "Title trop long (65c, max 60)"
        }
      ],
      "summary": "Critiques:0 | Majeurs:0 | Mineurs:1",
      "score": 95
    }
    // ... autres pages
  ]
}
```

### Console Output

```
📋 RAPPORT MONITORING FORZA CONSTRUCTION
================================================================================

┌─────────┬────────────────────────┬──────────┬─────────────────────────────┐
│ page    │ sévérité               │ problème │                             │
├─────────┼────────────────────────┼──────────┼─────────────────────────────┤
│ /       │ mineur                 │ Title... │                             │
│ /services│ majeur                │ CTA...   │                             │
└─────────┴────────────────────────┴──────────┴─────────────────────────────┘

📋 Résumé par page:
✅ /: OK : aucun problème détecté (100/100)
⚠️ /services: Critiques:0 | Majeurs:1 | Mineurs:2 (80/100)
✅ /a-propos: OK : aucun problème détecté (100/100)
...

🎯 Score global: 85/100 - ✅ EXCELLENT
================================================================================
💾 Rapport sauvegardé dans localStorage["forzaMonitoringReport"]
```

---

## 🎯 Scoring

### Calcul du score

```
Score initial: 100
- Critique: -20 points
- Majeur: -10 points
- Mineur: -5 points

Score minimal: 0
```

### Interprétation

| Score | Statut | Signification |
|-------|--------|---------------|
| 80-100 | ✅ EXCELLENT | Production ready |
| 60-79 | ⚠️ ACCEPTABLE | Améliorations recommandées |
| 0-59 | ❌ NÉCESSITE AMÉLIORATION | Action requise avant publication |

---

## 🔧 Configuration

### Pages à vérifier (par défaut)

```javascript
const DEFAULT_PAGES = [
  '/',                    // Accueil
  '/services',            // Services
  '/a-propos',            // À propos
  '/contact',             // Contact
  '/obtenir-un-devis',    // Devis
  '/renoclimat'           // Renoclimat
];
```

### Personnalisation

```javascript
// Vérifier seulement certaines pages
const report = await runForzaMonitor([
  '/',
  '/services'
]);

// Ajouter une page custom
const report = await runForzaMonitor([
  ...DEFAULT_PAGES,
  '/nouvelle-page'
]);
```

---

## 🐛 Troubleshooting

### Erreur: "Timeout (>10s)"

**Cause:** La page met trop de temps à charger (>10s)

**Solution:**
- Vérifier la connexion internet
- Vérifier que la page existe et est accessible
- Augmenter le timeout dans le code si nécessaire

### Erreur: "Impossible de charger la page"

**Cause:** Problème de CORS ou iframe bloqué

**Solution:**
- Exécuter depuis le même domaine que le site
- Vérifier les headers X-Frame-Options
- Utiliser le monitoring depuis une page Wix

### Rapport incomplet

**Cause:** Certaines vérifications ont échoué

**Solution:**
- Le monitoring continue même en cas d'erreur (graceful failure)
- Consulter la console pour voir les erreurs spécifiques
- Le rapport JSON contient un champ `error` avec détails

---

## 📚 Exemples d'usage

### Test avant publication

```javascript
// Lancer le monitoring complet
const report = await runForzaMonitor();

// Vérifier le score global
if (report.globalScore < 80) {
  console.warn('⚠️ Score inférieur à 80, publication non recommandée');

  // Afficher les problèmes majeurs/critiques
  report.results.forEach(page => {
    const critical = page.issues.filter(i => i.sev === 'critique' || i.sev === 'majeur');
    if (critical.length > 0) {
      console.error(`❌ ${page.path}:`, critical);
    }
  });
} else {
  console.log('✅ Site prêt pour publication!');
}
```

### Monitoring continu (CI/CD)

```javascript
// Script à exécuter régulièrement
setInterval(async () => {
  const report = await runForzaMonitor();

  // Envoyer à un service de monitoring
  await fetch('/api/monitoring', {
    method: 'POST',
    body: JSON.stringify(report)
  });
}, 3600000); // Toutes les heures
```

### Export du rapport

```javascript
// Récupérer depuis localStorage
const report = JSON.parse(localStorage.getItem('forzaMonitoringReport'));

// Télécharger en JSON
const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `forza-monitor-${report.when}.json`;
a.click();

// Export CSV
const csv = report.results.map(r => ({
  page: r.path,
  score: r.score,
  critiques: r.issues.filter(i => i.sev === 'critique').length,
  majeurs: r.issues.filter(i => i.sev === 'majeur').length,
  mineurs: r.issues.filter(i => i.sev === 'mineur').length
}));
console.table(csv);
```

---

## 🔒 Garanties du système

### ✅ Non-invasif
- **Aucune modification** du site publié
- **Lecture seule** sur tous les éléments
- **Dry-run** sur tous les événements (forms, analytics)
- **Iframes isolés** supprimés après test

### ✅ Graceful failure
- **Toujours retourne un rapport** même en cas d'erreur
- **Timeout automatique** après 10s par page
- **Try/catch** sur toutes les vérifications
- **Messages d'erreur clairs** dans le rapport

### ✅ Conservation 100%
- **Zéro impact** sur le code existant
- **Zéro impact** sur les optimisations
- **Zéro impact** sur les performances
- **Compatible** avec tous les navigateurs modernes

---

## 📞 Support

Pour toute question ou problème:

1. Consulter ce guide
2. Vérifier la console développeur
3. Consulter le rapport JSON dans localStorage
4. Vérifier que le site est en preview/publié Wix

---

## 🎯 Checklist avant publication

- [ ] Score global ≥ 80/100
- [ ] Aucun problème **critique**
- [ ] Problèmes **majeurs** < 3
- [ ] Tous les CTAs présents et fonctionnels
- [ ] Formulaires testés (dry-run OK)
- [ ] Analytics GA4 configuré (gtag présent)
- [ ] Navigation mobile testée
- [ ] Touch targets ≥ 44×44px
- [ ] Images avec alt text
- [ ] Meta tags SEO complets
- [ ] Core Web Vitals proxies dans cibles

---

## 📅 Historique des versions

### v1.0.0 (2025-09-30)
- ✅ Monitoring complet 6 pages
- ✅ 50+ vérifications automatisées
- ✅ Rapport JSON + console
- ✅ Interface HTML de test
- ✅ Graceful failure
- ✅ Score global et par page
- ✅ localStorage persistence

---

**Système de monitoring créé par CloudCode Orchestrator**
**Conservation 100% garantie - Non-invasif - Production ready**
