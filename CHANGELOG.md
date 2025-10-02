# Changelog

## [2025-09-29] Validation workflow hardening
- Fix legacy escaped newline sequences in key page scripts to restore ESLint compatibility (`src/pages/Obtenir un devis.c4omm.js`, `src/pages/À propos.c9awj.js`, `src/utils/scrollOptimization.js`).
- Document the end-to-end Wix site validation workflow in `docs/SITE_VALIDATION_GUIDE.md` (FR/EN) and summarise it in the main README.
- Ensured the scroll/stat animation handler syntax matches Wix event APIs to prevent runtime syntax errors.

## [2024-06-09] Orchestration follow-up checklist
- Added `docs/ORCHESTRATION_VALIDATION_PLAN.md` to centralise the Claude audit findings, blocking issues, and validation backlog.
- Updated `README.md` to point contributors to the orchestration status checklist before starting new changes.
