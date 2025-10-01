// Page Obtenir un Devis - Forza Construction Inc.
// Version temporaire simplifiée pour résoudre erreurs de build

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { initForzaSite } from '../utils/siteOrchestrator';

$w.onReady(function () {
    console.log('🚀 Devis Page - Loading...');

    // === ORCHESTRATEUR ===
    initForzaSite('quote', {
        enableSEO: true,
        enableAnalytics: true,
        enableNavigation: true,
        enablePerformance: true
    });

    // Message temporaire
    console.log('✅ Page Devis chargée - Version simplifiée temporaire');
    console.log('Note: Formulaire de devis fonctionnel via éditeur Wix');
});
