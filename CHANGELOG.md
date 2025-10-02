# Changelog

## [2025-10-02] Verification log & workflow quickstart
- Captured the latest lint execution in `docs/VERIFICATION_LOG_2025-10-02.md` to provide a traceable verification history.
- Linked the README quickstart to the verification log so contributors can review completed checks before editing Wix pages.

## [2025-10-02] Local workflow quickstart doc
- Added `docs/LOCAL_DEV_WORKFLOW.md` with bilingual terminal commands covering Wix CLI login, `gh pr checkout`, and branch conventions.
- Extended the README with a bilingual quickstart section pointing to the new workflow cheat sheet.

## [2024-06-10] Quote confirmation fix
- Synced the local quote state with submitted client info so the confirmation message thanks visitors by name on `Obtenir un devis.c4omm.js`.
- Documented the manual validation step in the README to re-test the confirmation message after future edits.

## [2025-09-29] Validation workflow hardening
- Fix legacy escaped newline sequences in key page scripts to restore ESLint compatibility (`src/pages/Obtenir un devis.c4omm.js`, `src/pages/À propos.c9awj.js`, `src/utils/scrollOptimization.js`).
- Document the end-to-end Wix site validation workflow in `docs/SITE_VALIDATION_GUIDE.md` (FR/EN) and summarise it in the main README.
- Ensured the scroll/stat animation handler syntax matches Wix event APIs to prevent runtime syntax errors.

## [2024-06-09] Orchestration follow-up checklist
- Added `docs/ORCHESTRATION_VALIDATION_PLAN.md` to centralise the Claude audit findings, blocking issues, and validation backlog.
- Updated `README.md` to point contributors to the orchestration status checklist before starting new changes.
