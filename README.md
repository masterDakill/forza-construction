# Git Integration & Wix CLI <img align="left" src="https://user-images.githubusercontent.com/89579857/185785022-cab37bf5-26be-4f11-85f0-1fac63c07d3b.png">

This repo is part of Git Integration & Wix CLI, a set of tools that allows you to write, test, and publish code for your Wix site locally on your computer. 

Connect your site to GitHub, develop in your favorite IDE, test your code in real time, and publish your site from the command line.

## Set up this repository in your IDE
This repo is connected to a Wix site. That site tracks this repo's default branch. Any code committed and pushed to that branch from your local IDE appears on the site.

Before getting started, make sure you have the following things installed:
* [Git](https://git-scm.com/download)
* [Node](https://nodejs.org/en/download/), version 14.8 or later.
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [yarn](https://yarnpkg.com/getting-started/install)
* An SSH key [added to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

To set up your local environment and start coding locally, do the following:

1. Open your terminal and navigate to where you want to store the repo.
1. Clone the repo by running `git clone <your-repository-url>`.
1. Navigate to the repo's directory by running `cd <directory-name>`.
1. Install the repo's dependencies by running `npm install` or `yarn install`.
1. Install the Wix CLI by running `npm install -g @wix/cli` or `yarn global add @wix/cli`.  
   Once you've installed the CLI globally, you can use it with any Wix site's repo.

For more information, see [Setting up Git Integration & Wix CLI](https://support.wix.com/en/article/velo-setting-up-git-integration-wix-cli-beta).

## Write Velo code in your IDE
Once your repo is set up, you can write code in it as you would in any other non-Wix project. The repo's file structure matches the [public](https://support.wix.com/en/article/velo-working-with-the-velo-sidebar#public), [backend](https://support.wix.com/en/article/velo-working-with-the-velo-sidebar#backend), and [page code](https://support.wix.com/en/article/velo-working-with-the-velo-sidebar#page-code) sections in Editor X.

Learn more about [this repo's file structure](https://support.wix.com/en/article/velo-understanding-your-sites-github-repository-beta).

## Test your code with the Local Editor
The Local Editor allows you test changes made to your site in real time. The code in your local IDE is synced with the Local Editor, so you can test your changes before committing them to your repo. You can also change the site design in the Local Editor and sync it with your IDE.

Start the Local Editor by navigating to this repo's directory in your terminal and running `wix dev`.

For more information, see [Working with the Local Editor](https://support.wix.com/en/article/velo-working-with-the-local-editor-beta).

## Preview and publish with the Wix CLI
The Wix CLI is a tool that allows you to work with your site locally from your computer's terminal. You can use it to build a preview version of your site and publish it. You can also use the CLI to install [approved npm packages](https://support.wix.com/en/article/velo-working-with-npm-packages) to your site.

Learn more about [working with the Wix CLI](https://support.wix.com/en/article/velo-working-with-the-wix-cli-beta).

## Invite contributors to work with you
Git Integration & Wix CLI extends Editor X's [concurrent editing](https://support.wix.com/en/article/editor-x-about-concurrent-editing) capabilities. Invite other developers as collaborators on your [site](https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site) and your [GitHub repo](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository). Multiple developers can work on a site's code at once.

## Validate the Construction Forza site connection / Valider la connexion du site Construction Forza

Use the dedicated checklist to confirm that this repository is linked to the correct Wix site before editing in Git:

1. ✅ **Check `wix.config.json`** – confirm the `siteId` matches the Construction Forza property in Wix.
2. ✅ **Authenticate with Wix CLI** – run `wix login` followed by `wix status` to make sure the CLI is bound to the same site.
3. ✅ **Sync and test locally** – run `wix pull` (if you need Wix-side changes) and `wix dev` to preview the site locally.
4. ✅ **Run quality gates** – execute `npm run lint` before committing to keep the code compatible with Wix' runtime.
5. ✅ **Commit & push via branch** – work from `codex/<feature>-<date>` branches and open a PR once checks pass.
6. ✅ **Tester le message de confirmation** – soumettre un devis test et vérifier que le message "Merci <Nom>" affiche bien le nom saisi.

For a bilingual, step-by-step guide covering troubleshooting and security tips, read [`docs/SITE_VALIDATION_GUIDE.md`](docs/SITE_VALIDATION_GUIDE.md).

For a real-time status view of the orchestration rollout, blockers, and validation backlog, consult the [`docs/ORCHESTRATION_VALIDATION_PLAN.md`](docs/ORCHESTRATION_VALIDATION_PLAN.md) checklist before starting new work.

## Local development quickstart / Démarrage rapide local

Keep a terminal open in the project root and follow the bilingual workflow cheat sheet when you start collaborating:

1. 🔐 **Login & status / Connexion & statut** – `wix login` then `wix status` to ensure the CLI session targets Construction Forza.
2. 🌱 **Branching standard / Convention de branche** – create `git checkout -b codex/<feature>-<date>` before editing.
3. 📦 **Fetch PRs / Récupérer les PR** – use `gh pr list` to inspect reviews and `gh pr checkout <number>` to test a change locally.
4. 🧪 **Run quality gates / Exécuter les tests** – run `npm run lint` and the manual quote confirmation check prior to committing.
5. 🚀 **Launch the local editor / Démarrer l'éditeur local** – run `wix dev` from the repo root to validate UI/UX before pushing.

The detailed checklist lives in [`docs/LOCAL_DEV_WORKFLOW.md`](docs/LOCAL_DEV_WORKFLOW.md) for quick copy/paste access.

**Verification log / Journal de vérification.** Consultez [`docs/VERIFICATION_LOG_2025-10-02.md`](docs/VERIFICATION_LOG_2025-10-02.md) pour suivre les contrôles automatisés exécutés (ex. `npm run lint`) et planifier les validations manuelles restantes avant publication.
