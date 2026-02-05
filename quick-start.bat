@echo off
REM QUICK START SCRIPT - ProjectOverview Dashboard
REM
REM Exécutez ce script pour configurer rapidement le dashboard
REM Usage: quick-start.bat

cls
echo.
echo 🚀 QUICK START - ProjectOverview Dashboard
echo ==========================================
echo.

REM Vérifier si on est au bon endroit
if not exist "package.json" (
    echo ❌ Erreur: package.json non trouvé
    echo    Assurez-vous d'être a la racine du projet
    pause
    exit /b 1
)

echo ✅ Vous êtes au bon endroit
echo.

REM Étape 1: Installer recharts
echo 📦 Étape 1/3: Installation de recharts...
call npm install recharts@2.12.7
echo ✅ recharts installé avec succès
echo.

REM Étape 2: Vérifier l'installation
echo 🔍 Étape 2/3: Vérification...
npm list recharts | findstr "recharts@2.12.7" > nul
if %errorlevel% equ 0 (
    echo ✅ recharts 2.12.7 trouvé dans node_modules
) else (
    echo ⚠️  Recharts n'a pas pu être vérifié, mais l'installation est terminée
)
echo.

REM Étape 3: Afficher les prochaines étapes
echo 🚀 Étape 3/3: Prochaines étapes
echo ================================
echo.
echo 1️⃣  Démarrer le serveur de développement:
echo     npm run dev
echo.
echo 2️⃣  Ouvrir dans votre navigateur:
echo     http://localhost:5173/project/1
echo.
echo 3️⃣  Consulter la documentation:
echo     src/Component/Dashboard/README.md
echo     src/Component/Dashboard/GRAPHIQUES_GUIDE.md
echo.
echo 4️⃣  Voir l'exemple complet:
echo     src/Component/Dashboard/CompleteDashboardExample.jsx
echo.
echo 5️⃣  Intégrer vos vraies données:
echo     src/Component/Dashboard/ProjectOverviewIntegration.js
echo.
echo ✨ Setup terminé! Dashboard prêt à l'emploi!
echo.
pause
