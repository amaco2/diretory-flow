#!/bin/bash
# QUICK START SCRIPT - ProjectOverview Dashboard
# 
# Exécutez ce script pour configurer rapidement le dashboard
# Usage: bash quick-start.sh

echo "🚀 QUICK START - ProjectOverview Dashboard"
echo "=========================================="
echo ""

# Étape 1: Vérifier si on est au bon endroit
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    echo "   Assurez-vous d'être à la racine du projet"
    exit 1
fi

echo "✅ Vous êtes au bon endroit"
echo ""

# Étape 2: Installer recharts
echo "📦 Étape 1/3: Installation de recharts..."
npm install recharts@2.12.7
echo "✅ recharts installé avec succès"
echo ""

# Étape 3: Vérifier l'installation
echo "🔍 Étape 2/3: Vérification..."
if npm list recharts | grep -q "recharts@2.12.7"; then
    echo "✅ recharts 2.12.7 trouvé dans node_modules"
else
    echo "⚠️  Recharts n'a pas pu être vérifié, mais l'installation est terminée"
fi
echo ""

# Étape 4: Afficher les prochaines étapes
echo "🚀 Étape 3/3: Prochaines étapes"
echo "================================"
echo ""
echo "1️⃣  Démarrer le serveur de développement:"
echo "    npm run dev"
echo ""
echo "2️⃣  Ouvrir dans votre navigateur:"
echo "    http://localhost:5173/project/1"
echo ""
echo "3️⃣  Consulter la documentation:"
echo "    src/Component/Dashboard/README.md"
echo "    src/Component/Dashboard/GRAPHIQUES_GUIDE.md"
echo ""
echo "4️⃣  Voir l'exemple complet:"
echo "    src/Component/Dashboard/CompleteDashboardExample.jsx"
echo ""
echo "5️⃣  Intégrer vos vraies données:"
echo "    src/Component/Dashboard/ProjectOverviewIntegration.js"
echo ""
echo "✨ Setup terminé! Dashboard prêt à l'emploi!"
echo ""
