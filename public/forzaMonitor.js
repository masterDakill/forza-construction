// Moniteur Forza Construction - Version iframe avec checks exhaustifs
// Conserve 100% de l'approche utilisateur, corrige les edge cases

export async function runForzaMonitor(pages = [
  '/', '/services', '/a-propos', '/contact', '/obtenir-un-devis', '/renoclimat'
]) {
  console.log('🔍 Forza Monitor - Démarrage');
  console.log(`📄 Pages à vérifier: ${pages.length}`);

  const results = [];

  for (const path of pages) {
    const url = new URL(path, location.origin).href;
    console.log(`\n📍 Checking: ${path}`);

    // Ouvre chaque page dans un iframe pour tester sans quitter
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '1280px';
    iframe.style.height = '2000px';
    iframe.loading = 'eager';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px'; // Masquer hors écran
    iframe.style.top = '0';
    document.body.appendChild(iframe);

    const report = await new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve({
          path,
          error: 'Timeout (>10s)',
          issues: [{ sev: 'critique', msg: 'Page timeout - impossible à charger' }],
          summary: 'TIMEOUT'
        });
      }, 10000);

      iframe.onload = async () => {
        clearTimeout(timeout);
        try {
          const w = iframe.contentWindow;
          const d = w.document;
          const t0 = performance.now();

          // — SEO —
          const title = d.title || '';
          const metaDescEl = d.querySelector('meta[name="description"]');
          const metaDesc = metaDescEl?.getAttribute('content') || '';

          // JSON-LD LocalBusiness (vérification améliorée)
          let hasLocalBusiness = false;
          const jsonLdScripts = d.querySelectorAll('script[type="application/ld+json"]');
          jsonLdScripts.forEach(script => {
            try {
              const data = JSON.parse(script.textContent);
              if (data['@type'] === 'LocalBusiness' || data['@type'] === 'GeneralContractor') {
                hasLocalBusiness = true;
              }
            } catch (e) {
              // JSON invalide
            }
          });

          // Open Graph
          const hasOgTitle = !!d.querySelector('meta[property="og:title"]');
          const hasOgImage = !!d.querySelector('meta[property="og:image"]');
          const hasOgDescription = !!d.querySelector('meta[property="og:description"]');

          // H1
          const h1Elements = d.querySelectorAll('h1');
          const h1Count = h1Elements.length;
          const h1Text = h1Elements[0]?.textContent?.trim() || '';

          // Images sans alt
          const imagesWithoutAlt = Array.from(d.querySelectorAll('img')).filter(
            img => !img.alt && !img.getAttribute('aria-label') && img.src
          ).length;

          // — CTAs & Nav —
          const reqCtas = ['#ctaDevis', '#ctaContact', '#ctaServices'];
          const missingCTAs = reqCtas.filter(sel => !d.querySelector(sel));

          // Sticky header (vérification améliorée)
          const hasStickyHeader = (() => {
            const header = d.querySelector('#siteHeader, header, [data-header]');
            if (!header) return false;
            const style = w.getComputedStyle(header);
            return style.position === 'sticky' || style.position === 'fixed';
          })();

          const hasStickyMobileCTA = !!d.querySelector('#ctaDevisSticky, #ctaSticky, [data-sticky-cta]');

          // Mobile menu
          const hasMobileMenu = !!d.querySelector('#mobileMenu, [data-mobile-menu]');
          const hasMobileMenuButton = !!d.querySelector('#menuButton, [data-menu-button], .hamburger');

          // — A11y (tap targets) —
          const smallTapTargets = [];
          d.querySelectorAll('a, button, [role="button"], [data-cta="true"]').forEach(el => {
            const r = el.getBoundingClientRect();
            const style = w.getComputedStyle(el);
            const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';

            if (isVisible && r.width && r.height && (r.width < 44 || r.height < 44)) {
              smallTapTargets.push({
                html: el.outerHTML.slice(0, 100),
                size: `${Math.round(r.width)}×${Math.round(r.height)}px`,
                text: el.textContent.trim().slice(0, 30)
              });
            }
          });

          // aria-label sur icônes/CTA sans texte
          const unlabeled = [];
          d.querySelectorAll('a[role="button"], button, [data-cta="true"]').forEach(el => {
            const hasText = el.textContent.trim().length > 0;
            const hasLabel = el.getAttribute('aria-label') || el.getAttribute('title');
            const style = w.getComputedStyle(el);
            const isVisible = style.display !== 'none' && style.visibility !== 'hidden';

            if (isVisible && !hasText && !hasLabel) {
              unlabeled.push({
                html: el.outerHTML.slice(0, 100),
                tag: el.tagName
              });
            }
          });

          // Lang attribute
          const hasLangAttribute = !!d.documentElement.getAttribute('lang');

          // — Performance légère —
          const allImages = d.querySelectorAll('img');
          const lazyImgs = d.querySelectorAll('img[loading="lazy"]').length;
          const totalImages = allImages.length;

          const nonOptimizedImgs = [];
          allImages.forEach(img => {
            const src = img.currentSrc || img.src || '';
            if (src && !/\.(webp|avif)($|\?)/i.test(src)) {
              const isJpgPng = /\.(jpg|jpeg|png)($|\?)/i.test(src);
              if (isJpgPng) {
                nonOptimizedImgs.push(src.slice(0, 80));
              }
            }
          });

          // Resource hints
          const hasPreconnect = !!d.querySelector('link[rel="preconnect"]');
          const hasDnsPrefetch = !!d.querySelector('link[rel="dns-prefetch"]');

          // — Analytics —
          const hasGtag = typeof w.gtag === 'function';
          const hasDataLayer = Array.isArray(w.dataLayer);
          const analyticsEvents = [];

          if (hasDataLayer && w.dataLayer) {
            w.dataLayer.forEach(item => {
              if (item.event && item.event !== 'gtm.js' && item.event !== 'gtm.dom') {
                analyticsEvents.push(item.event);
              }
            });
          }

          // — Chatbot —
          const hasChat = !!w.forzaChat;
          const intentsOk = hasChat ?
            ['devis', 'services', 'renoclimat', 'contact'].every(k =>
              w.forzaChat.quickActions?.some(q => q.key === k)
            ) : false;

          // — Formulaires (dry-run) —
          const forms = Array.from(d.querySelectorAll('form'));
          const formDetails = [];

          for (const f of forms) {
            const formId = f.id || f.name || `form-${formDetails.length}`;
            const inputs = f.querySelectorAll('input:not([type="hidden"]), textarea, select');
            const requiredFields = f.querySelectorAll('[required]');
            const hasSubmitHandler = f.onsubmit !== null || f.hasAttribute('action');

            // Labels
            const inputsWithoutLabels = Array.from(inputs).filter(input => {
              if (input.type === 'hidden') return false;
              const hasLabel = input.id && d.querySelector(`label[for="${input.id}"]`);
              const hasAriaLabel = input.getAttribute('aria-label');
              return !hasLabel && !hasAriaLabel;
            }).length;

            formDetails.push({
              id: formId,
              fields: inputs.length,
              required: requiredFields.length,
              hasSubmitHandler,
              inputsWithoutLabels
            });

            // Évite tout submit réseau (dry-run)
            f.addEventListener('submit', (e) => e.preventDefault(), { once: true });
          }

          // — Core Web Vitals proxies (estimation heuristique) —
          const lcpProxy = (() => {
            const hero = d.querySelector('#hero img, .hero img, [data-hero] img') || d.querySelector('img');
            return hero ? (hero.complete ? 800 : 1600) : 1200;
          })();

          const clsProxy = (() => {
            // Vérifier si images ont dimensions
            const imgsWithoutDimensions = Array.from(d.querySelectorAll('img')).filter(
              img => !img.width && !img.height && !img.style.width && !img.style.height
            ).length;
            return imgsWithoutDimensions > 3 ? 0.15 : 0.03;
          })();

          const inpProxy = 80; // Latence clic heuristique

          const t1 = performance.now();

          // Score/flags & sévérités
          const issues = [];

          // === SEO ===
          if (!title) issues.push({ sev: 'critique', msg: 'Title manquant' });
          else if (title.length < 10) issues.push({ sev: 'majeur', msg: `Title trop court (${title.length}c, min 10)` });
          else if (title.length > 60) issues.push({ sev: 'mineur', msg: `Title trop long (${title.length}c, max 60)` });

          if (!metaDesc) issues.push({ sev: 'majeur', msg: 'Meta description manquante' });
          else if (metaDesc.length < 120 || metaDesc.length > 160) {
            issues.push({ sev: 'mineur', msg: `Meta description hors plage (${metaDesc.length}c, recommandé 120-160)` });
          }

          if (!hasLocalBusiness && path === '/') {
            issues.push({ sev: 'majeur', msg: 'JSON-LD LocalBusiness manquant (homepage)' });
          }

          if (!hasOgTitle || !hasOgImage) {
            issues.push({ sev: 'mineur', msg: 'Open Graph incomplet (partage social)' });
          }

          if (h1Count === 0) issues.push({ sev: 'majeur', msg: 'Aucun H1 détecté' });
          else if (h1Count > 1) issues.push({ sev: 'mineur', msg: `${h1Count} H1 détectés (recommandé: 1)` });

          if (imagesWithoutAlt > 0) {
            issues.push({ sev: 'mineur', msg: `${imagesWithoutAlt} images sans attribut alt` });
          }

          // === CTAs/Nav ===
          if (missingCTAs.length) {
            issues.push({ sev: 'majeur', msg: `CTAs manquants: ${missingCTAs.join(', ')}` });
          }

          if (!hasStickyHeader) {
            issues.push({ sev: 'mineur', msg: 'Header non sticky (UX recommandée)' });
          }

          if (!hasStickyMobileCTA && (path === '/' || path === '/services')) {
            issues.push({ sev: 'majeur', msg: 'CTA Devis sticky (mobile) manquant' });
          }

          if (!hasMobileMenu) {
            issues.push({ sev: 'mineur', msg: 'Menu mobile non détecté' });
          } else if (!hasMobileMenuButton) {
            issues.push({ sev: 'majeur', msg: 'Bouton menu mobile non détecté' });
          }

          // === A11y ===
          if (smallTapTargets.length) {
            issues.push({
              sev: 'majeur',
              msg: `${smallTapTargets.length} cibles tactiles <44×44px (WCAG 2.1 AA)`,
              details: smallTapTargets.slice(0, 3)
            });
          }

          if (unlabeled.length) {
            issues.push({
              sev: 'mineur',
              msg: `${unlabeled.length} éléments interactifs sans aria-label`,
              details: unlabeled.slice(0, 3)
            });
          }

          if (!hasLangAttribute) {
            issues.push({ sev: 'mineur', msg: 'Attribut lang manquant sur <html>' });
          }

          // === Perf ===
          if (totalImages > 0) {
            const lazyPercentage = Math.round((lazyImgs / totalImages) * 100);
            if (lazyPercentage < 50 && totalImages > 5) {
              issues.push({ sev: 'mineur', msg: `Lazy loading faible (${lazyPercentage}% des ${totalImages} images)` });
            }
          }

          if (nonOptimizedImgs.length > 3) {
            issues.push({
              sev: 'mineur',
              msg: `${nonOptimizedImgs.length} images non WebP/AVIF (optimisation possible)`,
              details: nonOptimizedImgs.slice(0, 3)
            });
          }

          if (!hasPreconnect && !hasDnsPrefetch) {
            issues.push({ sev: 'mineur', msg: 'Resource hints manquants (preconnect, dns-prefetch)' });
          }

          // === Analytics ===
          if (!hasGtag) {
            issues.push({ sev: 'majeur', msg: 'gtag non détecté (GA4 inactif ou non configuré)' });
          } else if (!hasDataLayer) {
            issues.push({ sev: 'mineur', msg: 'dataLayer non détecté' });
          }

          // === Chat ===
          if (!hasChat) {
            issues.push({ sev: 'mineur', msg: 'Chatbot non initialisé (window.forzaChat)' });
          } else if (!intentsOk) {
            issues.push({ sev: 'mineur', msg: 'Intents chatbot incomplets (attendu: devis, services, renoclimat, contact)' });
          }

          // === Forms ===
          if ((path === '/contact' || path === '/obtenir-un-devis') && forms.length === 0) {
            issues.push({ sev: 'majeur', msg: 'Aucun formulaire détecté sur page contact/devis' });
          }

          formDetails.forEach(form => {
            if (form.fields === 0) {
              issues.push({ sev: 'majeur', msg: `Formulaire ${form.id} vide (0 champs)` });
            }
            if (!form.hasSubmitHandler) {
              issues.push({ sev: 'majeur', msg: `Formulaire ${form.id} sans handler submit` });
            }
            if (form.inputsWithoutLabels > 0) {
              issues.push({ sev: 'mineur', msg: `Formulaire ${form.id}: ${form.inputsWithoutLabels} champs sans label` });
            }
          });

          // === Web Vitals proxies ===
          if (lcpProxy >= 2500) {
            issues.push({ sev: 'majeur', msg: `LCP proxy élevé (${lcpProxy}ms, cible <2500ms)` });
          }
          if (clsProxy >= 0.10) {
            issues.push({ sev: 'majeur', msg: `CLS proxy élevé (${clsProxy.toFixed(2)}, cible <0.1)` });
          }
          if (inpProxy >= 200) {
            issues.push({ sev: 'majeur', msg: `INP proxy élevé (${inpProxy}ms, cible <200ms)` });
          }

          const summary = summarizeIssues(issues);

          resolve({
            path,
            title: title.slice(0, 100),
            metaDescLen: metaDesc.length,
            h1: h1Text.slice(0, 100),
            h1Count,
            checks: {
              seo: {
                hasTitle: !!title,
                titleLength: title.length,
                hasMetaDesc: !!metaDesc,
                metaDescLength: metaDesc.length,
                hasLocalBusiness,
                hasOgTags: hasOgTitle && hasOgImage,
                h1Count,
                imagesWithoutAlt
              },
              navigation: {
                missingCTAs,
                hasStickyHeader,
                hasStickyMobileCTA,
                hasMobileMenu,
                hasMobileMenuButton
              },
              accessibility: {
                smallTapTargets: smallTapTargets.length,
                unlabeled: unlabeled.length,
                hasLangAttribute
              },
              performance: {
                totalImages,
                lazyImgs,
                lazyPercentage: totalImages > 0 ? Math.round((lazyImgs / totalImages) * 100) : 0,
                nonOptimizedImgs: nonOptimizedImgs.length,
                hasResourceHints: hasPreconnect || hasDnsPrefetch
              },
              analytics: {
                hasGtag,
                hasDataLayer,
                eventsCount: analyticsEvents.length
              },
              chatbot: {
                hasChat,
                intentsOk
              },
              forms: formDetails,
              webVitals: {
                lcpProxy,
                clsProxy,
                inpProxy
              },
              elapsedMs: Math.round(t1 - t0)
            },
            issues,
            summary,
            score: calculateScore(issues)
          });
        } catch (e) {
          resolve({
            path,
            error: String(e),
            issues: [{ sev: 'critique', msg: `Exception monitoring: ${e.message}` }],
            summary: 'ERREUR MONITORING',
            score: 0
          });
        }
      };

      iframe.onerror = () => {
        clearTimeout(timeout);
        resolve({
          path,
          error: 'Failed to load iframe',
          issues: [{ sev: 'critique', msg: 'Impossible de charger la page' }],
          summary: 'ERREUR CHARGEMENT',
          score: 0
        });
      };
    });

    results.push(report);
    iframe.remove();

    // Log progress
    console.log(`  ✓ ${report.summary} (score: ${report.score}/100)`);
  }

  // Affichage console détaillé
  console.log('\n' + '='.repeat(80));
  console.log('📊 RAPPORT MONITORING FORZA CONSTRUCTION');
  console.log('='.repeat(80));

  const flat = results.flatMap(r =>
    r.issues?.map(i => ({
      page: r.path,
      sévérité: i.sev,
      problème: i.msg
    })) || []
  );

  if (flat.length > 0) {
    console.table(flat);
  } else {
    console.log('✅ Aucun problème détecté sur aucune page !');
  }

  console.log('\n📋 Résumé par page:');
  results.forEach(r => {
    const icon = r.score >= 80 ? '✅' : r.score >= 60 ? '⚠️' : '❌';
    console.log(`${icon} ${r.path}: ${r.summary} (${r.score}/100)`);
  });

  // Score global
  const globalScore = Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length);
  const globalStatus = globalScore >= 80 ? '✅ EXCELLENT' : globalScore >= 60 ? '⚠️ ACCEPTABLE' : '❌ NÉCESSITE AMÉLIORATION';

  console.log('\n🎯 Score global: ' + globalScore + '/100 - ' + globalStatus);
  console.log('='.repeat(80));

  // Sauvegarder dans localStorage
  const reportData = {
    when: new Date().toISOString(),
    globalScore,
    globalStatus,
    results
  };

  try {
    localStorage.setItem('forzaMonitoringReport', JSON.stringify(reportData, null, 2));
    console.log('💾 Rapport sauvegardé dans localStorage["forzaMonitoringReport"]');
  } catch (e) {
    console.warn('⚠️ Impossible de sauvegarder dans localStorage:', e.message);
  }

  return reportData;
}

function summarizeIssues(issues) {
  if (!issues.length) return 'OK : aucun problème détecté';
  const count = (sev) => issues.filter(i => i.sev === sev).length;
  const c = count('critique');
  const maj = count('majeur');
  const min = count('mineur');
  return `Critiques:${c} | Majeurs:${maj} | Mineurs:${min}`;
}

function calculateScore(issues) {
  let score = 100;
  issues.forEach(issue => {
    if (issue.sev === 'critique') score -= 20;
    else if (issue.sev === 'majeur') score -= 10;
    else if (issue.sev === 'mineur') score -= 5;
  });
  return Math.max(0, score);
}

// Export default pour usage direct
export default runForzaMonitor;
