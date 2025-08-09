#!/bin/bash
# Script de synchronisation automatique Forza Construction
# À exécuter pour synchroniser GitHub <-> Wix

echo "🔄 Synchronisation Forza Construction..."

# Navigation vers le répertoire
cd ~/Desktop/forza-construction

# Pull des dernières modifications
echo "📥 Récupération des changements depuis GitHub..."
git pull origin main

# Affichage du statut
echo "📊 Statut actuel:"
git status

# Demande de confirmation pour push
read -p "Voulez-vous pousser les modifications locales? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Add tous les fichiers
    git add .
    
    # Commit avec message
    echo "💬 Entrez votre message de commit:"
    read commit_message
    git commit -m "$commit_message"
    
    # Push vers GitHub
    echo "📤 Envoi vers GitHub..."
    git push origin main
    
    echo "✅ Synchronisation terminée!"
    
    # Option de publier sur Wix
    read -p "Publier sur Wix Production? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        wix publish --yes
        echo "🚀 Site publié en production!"
    fi
else
    echo "❌ Push annulé"
fi

# Notification
osascript -e 'display notification "Synchronisation Forza terminée" with title "GitHub Sync"'
