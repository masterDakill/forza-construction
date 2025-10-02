# Forza Construction – Orchestration Validation Plan / Plan de validation de l'orchestration

## 1. Context / Contexte

Le commit `bd946fb` a introduit un système d'orchestration modulaire (configuration, utilitaires, monitoring, design system) afin d'améliorer la maintenabilité du site Wix Construction Forza. Plusieurs correctifs ponctuels (`b5df7f4`, `333ec6a`, `bce8456`) ont suivi pour résoudre des erreurs de build et de synchronisation. Malgré ces efforts, la publication Wix demeure bloquée et une validation complète n'a pas encore été effectuée.

This document captures the current status, known issues, and the pragmatic validation steps required before shipping further enhancements.

## 2. Work completed so far / Travaux réalisés

- ✅ Modular orchestration deployed (`src/config`, `src/utils`, `src/styles`).
- ✅ Page optimisations livrées (Accueil, Services, Contact, À propos, Obtenir un devis).
- ✅ GA4 analytics configuration ready (ID `G-1T8PTVET9T`, 15 événements personnalisés).
- ✅ SEO metadata, Schema.org, Open Graph configurés.
- ✅ Performance optimizer en place (lazy loading, cache hints).
- ✅ Navigation system, breadcrumbs, smooth scroll implémentés.
- ✅ Monitoring utilities (erreurs, performance, santé) déployés.

## 3. Blocking issues / Problèmes bloquants

| Problème | Impact | Prochaines actions |
| --- | --- | --- |
| Synchronisation Wix Editor incomplète (pages « À propos » et « Obtenir un devis »). | ❌ Publication impossible, erreurs de compilation persistantes. | 1. Masquer les pages touchées puis republier.<br>2. Copier/coller manuellement le code corrigé dans l'éditeur Wix.<br>3. Contacter le support Wix si le cache ne se purge pas sous 24h. |
| `mobileOptimizations` commenté dans `Contact.anc3u.js`. | ⚠️ Fonctions mobiles désactivées. | Décider: recréer le module ou supprimer définitivement l'appel avant publication. |
| Accents retirés de `À propos.c9awj.js`. | ⚠️ Contenu partiellement dégradé. | Vérifier l'encodage UTF-8, restaurer les accents après validation. |
| Absence de tests automatisés. | ⚠️ Régressions non détectées. | Mettre en place lint + test suite (Jest/Vitest) pour les nouveaux modules. |

## 4. Validation checklist / Liste de vérification

### 4.1 Prépublication (Wix)

1. 🔐 `wix login`
2. 🛰️ `wix status` → vérifier le `siteId` (`wix.config.json`).
3. 🧼 Masquer temporairement « À propos » et « Obtenir un devis » si la compilation échoue.
4. 🪞 Copier/coller le code mis à jour directement dans l'éditeur Wix (si besoin de forcer la sync).
5. 🚀 `wix publish --env production` dès que la compilation passe.

### 4.2 Tests fonctionnels

- ✅ Navigation multi-niveaux (desktop + mobile).
- ✅ Scroll smooth & animations (sections stats, hero).
- ✅ Formulaires (Contact, Devis) – soumission, validations, calculateur.
- ✅ CTA tracking (clics, conversions) dans GA4.
- ✅ Monitoring – vérifier que les erreurs et performances sont enregistrées.

### 4.3 Qualité & SEO

- ✅ `npm run lint`
- ✅ Vérification manuelle des Core Web Vitals (Chrome Lighthouse).
- ✅ Schema.org valides via [Rich Results Test](https://search.google.com/test/rich-results).
- ✅ Meta Open Graph avec [Meta Tags](https://metatags.io/).

## 5. Improvement backlog / Améliorations à planifier

| Horizon | Actions proposées |
| --- | --- |
| Immédiat (0-2 jours) | Forcer la synchronisation Wix, republier, valider 3 pages en production. |
| Court terme (3-7 jours) | Restaurer les pages masquées, vérifier GA4 events, mesurer Lighthouse > 90. |
| Moyen terme (7-14 jours) | Créer module `mobileOptimizations`, ajouter tests automatisés, documenter chaque utilitaire. |
| Long terme (>14 jours) | Mise en place d'un pipeline CI/CD (lint, tests), monitoring proactif, A/B testing sur CTA. |

## 6. Documentation & ownership / Documentation et responsabilités

- 🗂️ Historique des changements : `CHANGELOG.md` (mettre à jour à chaque patch).
- 📘 Guide d'intégration : `MANUAL_INTEGRATION_GUIDE.md`.
- 📑 Checklist validation (ce document) à réviser après chaque publication.
- 👥 Responsable actuel : Équipe Construction Forza (coordination GitHub ↔️ Wix CLI).

---
_Last updated: 2024-06-09_
