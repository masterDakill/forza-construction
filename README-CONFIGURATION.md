# Configuration Forza Construction - Guide complet

## 🚀 Installation effectuée

### 1. Scripts optimisés installés:
- ✅ **Accueil.rg6ha.js** - Page d'accueil avec tracking et animations
- ✅ **Services.svhfm.js** - Calculateur de prix dynamique
- ✅ **Contact.anc3u.js** - Formulaire intelligent avec validations
- ✅ **integrations.js** - Backend avec toutes les automatisations

### 2. Fonctionnalités ajoutées:

#### Analytics & Tracking
- Google Analytics 4
- Facebook Pixel
- Conversion tracking
- Event tracking personnalisé

#### Automatisations
- Make.com webhooks
- Airtable sync
- Slack notifications
- Email automation (SendGrid)
- CRM integration (HubSpot)
- Trello project management
- Google Calendar sync

#### Expérience utilisateur
- Animations au scroll
- Formulaires intelligents
- Calculateur de devis
- Chat widget
- Témoignages rotatifs

## 📝 Configuration requise

### Variables d'environnement Wix (Secrets Manager):
```
MAKE_WEBHOOK_URL=https://hook.make.com/xxxxx
AIRTABLE_API_KEY=keyxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxx
SLACK_WEBHOOK_URL=https://hooks.slack.com/xxxxx
SENDGRID_API_KEY=SG.xxxxxxxxx
HUBSPOT_API_KEY=xxxxx-xxxxx-xxxxx
TRELLO_API_KEY=xxxxxxxxx
TRELLO_TOKEN=xxxxxxxxx
TRELLO_LIST_ID=xxxxxxxxx
GOOGLE_CALENDAR_ID=xxxxx@group.calendar.google.com
GOOGLE_API_KEY=AIzaxxxxxxxxx
```

## 🔧 Commandes utiles

### Développement local:
```bash
cd ~/Desktop/forza-construction
wix dev  # Lance l'éditeur local
```

### Synchronisation:
```bash
./sync.sh  # Script automatique
# OU manuellement:
git pull
git add .
git commit -m "message"
git push origin main
```

### Publication:
```bash
wix publish --yes
```

## 📊 Prochaines étapes

### 1. Configuration Wix Editor:
1. Ouvrez Wix Editor
2. Allez dans Dev Mode
3. Les scripts sont automatiquement synchronisés
4. Configurez les éléments visuels avec les IDs mentionnés dans le code

### 2. IDs des éléments à créer dans Wix:

#### Page Accueil:
- `#heroSection` - Section hero principale
- `#btnDevisGratuit` - Bouton CTA principal
- `#btnAppelezNous` - Bouton appel
- `#formContactRapide` - Formulaire rapide
- `#repeaterPortfolio` - Galerie projets
- `#repeaterTestimonials` - Témoignages
- `#boxChat` - Widget chat

#### Page Services:
- `#repeaterServices` - Liste services
- `#inputSurface` - Champ surface
- `#dropdownProjet` - Type de projet
- `#checkboxDemolition` - Options
- `#textEstimation` - Affichage prix
- `#btnDevisDetaille` - CTA devis

#### Page Contact:
- `#inputNom`, `#inputEmail`, `#inputPhone` - Champs formulaire
- `#inputMessage` - Message
- `#btnSubmitContact` - Bouton envoi
- `#htmlMap` - Carte Google
- `#repeaterHours` - Horaires

### 3. Intégrations à finaliser:

1. **Make.com**:
   - Créer webhook
   - Configurer scénario (Wix → Airtable → Slack → Email)

2. **Airtable**:
   - Créer base "Forza Construction"
   - Tables: Leads, Projects, Clients, Invoices

3. **Google Analytics**:
   - Installer code tracking
   - Configurer conversions

4. **Chat Widget**:
   - Choisir: Intercom, Crisp, ou Tawk.to
   - Installer code

## 🎯 Checklist de lancement

- [ ] Configurer tous les secrets dans Wix
- [ ] Mapper les éléments visuels avec les IDs
- [ ] Tester formulaires
- [ ] Configurer domaine personnalisé
- [ ] SSL activé
- [ ] Backup configuré
- [ ] Test mobile responsive
- [ ] SEO meta tags
- [ ] Sitemap XML
- [ ] Robots.txt

## 💡 Tips d'optimisation

1. **Performance**:
   - Compresser images < 200kb
   - Lazy loading activé
   - Minifier CSS/JS

2. **SEO**:
   - Meta descriptions uniques
   - Schema.org markup
   - Alt text images

3. **Conversions**:
   - A/B testing boutons CTA
   - Heatmaps avec Hotjar
   - Exit intent popups

## 🆘 Support

- Documentation Wix: https://support.wix.com/
- Make.com: https://www.make.com/en/help
- Airtable: https://support.airtable.com/

---

Configuration effectuée par Claude pour Mathieu Chamberland
Forza Construction Inc. - 2025
