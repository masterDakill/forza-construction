# ✅ Validation du site Wix « Construction Forza » / Wix Site Validation

## TL;DR
- Vérifier que `wix.config.json` contient le bon `siteId` et qu'il correspond au site Wix visé.
- Se connecter avec `wix login`, puis valider l'accès au site via `wix status`.
- Utiliser `wix dev` pour tester localement et confirmer la synchronisation des sections publiques, backend et page code.
- Avant de pousser, exécuter `npm run lint` et valider le diff Git.
- Commiter sur une branche dédiée (`codex/<feature>-<date>`) puis pousser vers GitHub.

---

## 1. Pré-requis / Prerequisites
- Node.js ≥ 14.8 et npm installés (`node -v`, `npm -v`).
- Wix CLI global : `npm install -g @wix/cli`.
- Accès au repo GitHub associé au site Wix (clé SSH ou token HTTPS).
- Connexion Wix ayant les droits « Développeur » sur le site Construction Forza.

## 2. Vérifier la configuration locale / Check the local configuration
```bash
cat wix.config.json
```
- `siteId` doit correspondre à l'identifiant du site Wix (UI → Paramètres avancés → Git).
- `uiVersion` indique la version de l'éditeur ; ne pas modifier manuellement.

## 3. Authentification Wix CLI / Wix CLI authentication
```bash
wix login
wix status
```
- `wix login` ouvre un navigateur pour valider l'accès.
- `wix status` doit afficher le même `siteId` que le fichier de configuration et confirmer « Connected ».

## 4. Synchronisation du code / Code synchronisation
- Pour récupérer les dernières modifications Wix → local : `wix pull`.
- Pour envoyer les changements locaux vers Wix (après commit) : `wix push` ou `npm run deploy`.
- Utiliser `wix dev` pour lancer l'éditeur local et vérifier en direct les changements.

## 5. Cycle de développement recommandé / Recommended workflow
1. Créer une branche : `git checkout -b codex/<feature>-<date>`.
2. Implémenter les changements dans `src/` (public, backend, pages).
3. Lancer les validations :
   ```bash
   npm install    # première fois uniquement
   npm run lint
   ```
4. Vérifier le diff : `git status`, `git diff`.
5. Commiter avec un message Conventional Commit (`feat:`, `fix:`, `docs:`…).
6. Pousser vers GitHub (`git push origin ...`).
7. Ouvrir une Pull Request et déclencher `wix publish --yes` uniquement après revue.

## 6. Dépannage courant / Common troubleshooting
| Problème | Résolution rapide |
|----------|-------------------|
| `wix status` ne montre pas le bon site | Relancer `wix login`, vérifier les permissions Wix. |
| Lint échoue (`Parsing error` ou accents) | S'assurer que les fichiers sont encodés UTF-8 et ne contiennent pas de séquences `\n` littérales. |
| Conflits Git entre Wix et local | Utiliser `wix pull --force` puis régénérer la branche en résolvant manuellement les conflits. |
| Modifications invisibles dans l'éditeur | Relancer `wix dev`, vider le cache du navigateur, vérifier les identifiants de composants (`$w('#id')`). |

## 7. Sécurité & bonnes pratiques / Security & best practices
- Ne jamais commiter d'identifiants ou secrets ; utiliser `Secrets Manager` Wix ou variables d'environnement.
- Limiter les logs sensibles (`console.log`) et privilégier des messages d'erreur clairs pour l'utilisateur final.
- Toujours tester sur `wix dev` avant `wix publish` pour éviter les régressions.

---

> Dernière mise à jour : 2025-09-29.
