# Guide de workflow local / Local workflow guide

## ✅ Préparation de l'environnement / Environment preparation
- **FR** : Installez le Wix CLI globalement : `npm install -g @wix/cli`
- **EN** : Install the Wix CLI globally: `npm install -g @wix/cli`
- **FR** : Clonez le dépôt GitHub : `git clone git@github.com:masterDakill/forza-construction.git`
- **EN** : Clone the GitHub repository: `git clone git@github.com:masterDakill/forza-construction.git`
- **FR** : Installez les dépendances : `cd forza-construction && npm install`
- **EN** : Install dependencies: `cd forza-construction && npm install`

## 🔄 Synchronisation Git / Git synchronization
- **FR** : Listez les PR disponibles : `gh pr list`
- **EN** : List available PRs: `gh pr list`
- **FR** : Récupérez une PR spécifique : `gh pr checkout <numéro>`
- **EN** : Fetch a specific PR: `gh pr checkout <number>`
- **FR** : Revenez à la branche principale après vos tests : `git checkout main`
- **EN** : Return to the main branch after testing: `git checkout main`

## 🧪 Tests et édition locale / Local testing & editing
- **FR** : Lancez l'éditeur Wix local depuis la racine du projet : `wix dev`
- **EN** : Start the Wix local editor from the project root: `wix dev`
- **FR** : Vérifiez votre connexion CLI : `wix login` puis `wix status`
- **EN** : Confirm your CLI session: `wix login` then `wix status`
- **FR** : Exécutez les linters avant de pousser : `npm run lint`
- **EN** : Run linters before pushing: `npm run lint`

## 📦 Soumission des modifications / Submitting changes
- **FR** : Créez une branche de travail : `git checkout -b codex/<feature>-<date>`
- **EN** : Create a working branch: `git checkout -b codex/<feature>-<date>`
- **FR** : Commitez avec Conventional Commits : `fix: corrige le message de confirmation`
- **EN** : Commit using Conventional Commits: `fix: correct quote confirmation message`
- **FR** : Poussez et ouvrez une PR : `git push origin <branche>` puis `gh pr create`
- **EN** : Push and open a PR: `git push origin <branch>` then `gh pr create`

> 💡 **Astuce / Tip** : conservez les identifiants Wix hors du dépôt (variables d'environnement) et nettoyez les caches locaux avant de republier si l'éditeur affiche d'anciennes versions.
