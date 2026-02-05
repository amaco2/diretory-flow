# 💻 EXEMPLES D'UTILISATION - CODE

## 📌 1. Importer le Footer dans un Composant

### Exemple 1: Simple
```jsx
import Footer from './Ui/Connexion/ComponentStyledForm/Footer';

export default function Page() {
  return (
    <>
      <header>Ma page</header>
      <main>Contenu</main>
      <Footer />
    </>
  );
}
```

### Exemple 2: Avec flexbox
```jsx
import styled from 'styled-components';
import Footer from './Ui/Connexion/ComponentStyledForm/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 40px 20px;
`;

export default function Page() {
  return (
    <Container>
      <Main>Votre contenu ici</Main>
      <Footer />
    </Container>
  );
}
```

### Exemple 3: Avec thème personnalisé
```jsx
import styled from 'styled-components';
import Footer from './Ui/Connexion/ComponentStyledForm/Footer';

const StyledFooter = styled(Footer)`
  background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%);
`;

export default function Page() {
  return (
    <>
      <main>Contenu</main>
      <StyledFooter />
    </>
  );
}
```

---

## 📌 2. Utiliser FormInscription

### Dans App.tsx/App.jsx
```jsx
import FormInscription from './Ui/Connexion/FormInscription';
import FromConnexion from './Ui/Connexion/FromConnexion';

export default function App() {
  return (
    <Routes>
      <Route path="inscription" element={<FormInscription />} />
      <Route path="connexion" element={<FromConnexion />} />
      {/* autres routes */}
    </Routes>
  );
}
```

### URLs
```
http://localhost:5173/inscription  → FormInscription
http://localhost:5173/connexion    → FromConnexion
```

---

## 📌 3. Personnaliser le Footer

### Ajouter un lien personnalisé
```jsx
// Dans Footer.jsx, ajouter dans la section Produit:

<FooterLink to="/custom-page">
  🚀 Ma Page Custom
</FooterLink>
```

### Changer les couleurs
```jsx
// Dans Footer.jsx:

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%);
  // Remplace le blue par red-orange
`;
```

### Ajouter une nouvelle section
```jsx
// Dans Footer.jsx, ajouter avant FooterBottom:

<FooterSection>
  <h3>Partenaires</h3>
  <FooterLink to="/partners">Devenir partenaire</FooterLink>
  <FooterLink to="/affiliates">Programme affilié</FooterLink>
</FooterSection>
```

---

## 📌 4. Ouvrir la Modal Politique Manuellement

### Depuis un autre composant
```jsx
import { useState } from 'react';
import PolitiqueConfidentialiteModal from './Ui/Connexion/ComponentStyledForm/PolitiqueConfidentialiteModal';

export default function MonComposant() {
  const [isPolitiqueOpen, setIsPolitiqueOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsPolitiqueOpen(true)}>
        Lire la politique
      </button>

      <PolitiqueConfidentialiteModal
        isOpen={isPolitiqueOpen}
        onClose={() => setIsPolitiqueOpen(false)}
      />
    </div>
  );
}
```

### Avec lien dans footer custom
```jsx
// Dans Footer ou custom footer:

<FooterLink as="button" onClick={() => setIsPolitiqueOpen(true)}>
  Politique de Confidentialité
</FooterLink>
```

---

## 📌 5. Modifier le Contenu de la Politique

### Ajouter une section
```jsx
// Dans PolitiqueConfidentialiteModal.jsx, dans ModalBody:

<h3>10. Cookies & Technologies Similaires</h3>
<p>
  Nous utilisons des cookies pour améliorer votre expérience.
</p>
<ul>
  <li>Cookies essentiels (session)</li>
  <li>Cookies analytiques (Google Analytics)</li>
  <li>Cookies marketing</li>
</ul>
```

### Personnaliser le titre
```jsx
<ModalTitle id="politique-title">
  Mes Conditions & Politique
</ModalTitle>
```

---

## 📌 6. Utiliser les Infos SaaS

### Standalone
```jsx
import InfosConnexionSaas from './Ui/Connexion/ComponentStyledForm/InfosConnexionSaas';

export default function Marketing() {
  return (
    <div>
      <h1>Bienvenue sur DirectoryFlow</h1>
      <InfosConnexionSaas />
    </div>
  );
}
```

### Modifier les features
```jsx
// Dans InfosConnexionSaas.jsx:

<FeatureItem>
  <IconWrapper>
    <MyIcon size={16} />
  </IconWrapper>
  <FeatureText>
    <strong>Ma Feature</strong>
    <span>Description</span>
  </FeatureText>
</FeatureItem>
```

---

## 📌 7. Créer un Layout Complet

### Exemple Page Profile
```jsx
import styled from 'styled-components';
import Footer from './Ui/Connexion/ComponentStyledForm/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
  color: white;
  padding: 20px;
  text-align: center;
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export default function ProfilePage() {
  return (
    <PageContainer>
      <Header>
        <h1>Mon Profil</h1>
      </Header>

      <Main>
        {/* Contenu du profil */}
        <h2>Bienvenue!</h2>
        <p>Votre contenu ici...</p>
      </Main>

      <Footer />
    </PageContainer>
  );
}
```

---

## 📌 8. Validation Personnalisée FormInscription

### Ajouter une validation custom
```jsx
// Dans FormInscription.jsx, handleSubmit:

const handleSubmit = (event) => {
  // ... validations existantes ...

  // Validation custom: pas de numéros dans le nom
  if (/\d/.test(name) || /\d/.test(fullName)) {
    setErrorMessage('Le nom ne peut pas contenir de chiffres');
    return;
  }

  // Validation custom: domaine email professionnel
  const domain = email.split('@')[1];
  if (domain === 'gmail.com' || domain === 'hotmail.com') {
    setErrorMessage('Veuillez utiliser une adresse email professionnelle');
    return;
  }

  registerUser(...);
};
```

---

## 📌 9. Ajouter un Loading Spinner Custom

### Remplacer le Loader
```jsx
// Dans FormInscription.jsx:

import CustomLoader from './CustomLoader';

<BtnInscription>
  {isLoading ? <CustomLoader /> : 'Créer mon compte'}
</BtnInscription>
```

### Créer CustomLoader.jsx
```jsx
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s linear infinite;
`;

export default function CustomLoader() {
  return <Spinner />;
}
```

---

## 📌 10. Intégrer avec Votre Backend

### Exemple RegisterUser.js modifié
```jsx
// Remplacer l'appel mock par votre API

export const registerUser = async (
  fullName,
  email,
  password,
  setIsLoading,
  setErrorMessage,
  setSuccessMessage,
  navigate
) => {
  try {
    setIsLoading(true);

    // Appel à votre API
    const response = await fetch('https://api.directoryflow.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    }

    const data = await response.json();

    // Sauvegarder le token
    localStorage.setItem('token', data.token);

    setSuccessMessage('Inscription réussie! Redirection...');

    // Redirection après 2 secondes
    setTimeout(() => {
      navigate('/connexion');
    }, 2000);

  } catch (error) {
    setErrorMessage(error.message || 'Erreur lors de l\'inscription');
  } finally {
    setIsLoading(false);
  }
};
```

---

## 📌 11. Responsive Testing

### Tester sur Mobile (DevTools)
```
F12 → Toggle device toolbar (Ctrl+Shift+M)
Choisir: iPhone 12, Galaxy S20, etc.
Vérifier que tout s'affiche bien
```

### Tester sur différentes résolutions
```
Mobile: 375px (iPhone SE)
Tablet: 768px (iPad)
Desktop: 1440px (Full HD)
```

### Vérifier les breakpoints
```
// Les styles changent à:
@media (max-width: 768px)    // Mobile
@media (max-width: 1024px)   // Tablet
```

---

## 📌 12. Accessibilité Testing

### Keyboard Navigation
```
Tab → Naviguer entre inputs
Shift+Tab → Retour
Enter → Submit
Space → Toggle checkbox
Escape → Fermer modal
```

### Screen Reader (NVDA/JAWS)
```
1. Télécharger NVDA (gratuit)
2. Activer NVDA (Ctrl+Alt+N)
3. Naviguer avec Tab
4. Écouter les descriptions
5. Vérifier que tout est décrit
```

### Contrast Testing
```
https://webaim.org/resources/contrastchecker/
Vérifier ratio > 4.5:1 pour textes
```

---

## 📌 13. Déploiement

### Build Production
```bash
npm run build

# Fichiers optimisés dans dist/
```

### Déploiement Vercel
```bash
vercel
# ou
npm install -g vercel
vercel --prod
```

### Déploiement Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 📌 14. SEO Meta Tags

### Dans index.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta -->
  <meta name="description" content="DirectoryFlow - Gestion de projets audiovisuels. Inscrivez-vous pour collaborer avec votre équipe en temps réel." />
  <meta name="keywords" content="audiovisuel, gestion projet, collaboration, DirectoryFlow" />
  
  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:title" content="DirectoryFlow - Gestion de Projets Audiovisuels" />
  <meta property="og:description" content="Collaborez facilement sur vos projets audiovisuels" />
  <meta property="og:image" content="https://directoryflow.com/og-image.jpg" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="DirectoryFlow" />
  
  <title>DirectoryFlow - Inscription Gratuite</title>
</head>
```

---

## ✅ Checklist Avant Production

```
☑ Tester tous les champs et validations
☑ Tester sur mobile, tablet, desktop
☑ Tester keyboard navigation (Tab, Enter, Space)
☑ Tester avec screen reader (NVDA)
☑ Vérifier les couleurs et contraste
☑ Vérifier les animations (pas de distraction)
☑ Tester les appels API
☑ Vérifier les messages d'erreur
☑ Vérifier les redirections
☑ Vérifier les performances
☑ Minifier le CSS/JS
☑ Optimiser les images
☑ Vérifier le SEO
☑ Vérifier la sécurité HTTPS
☑ Tester avec vraies données
```

---

## 🎯 Personnalisations Courantes

### Changer la couleur primaire
```jsx
// Chercher #0d47a1 et #1565c0
// Remplacer par votre couleur
// Ex: #FF6B6B (rouge)

const buttonColor = '#FF6B6B';
const buttonHover = '#FF5252';
```

### Ajouter un logo custom
```jsx
// FormInscription.jsx
<DirectoryFlowLogo size={50} color="#FF6B6B" />
// Ou remplacer par votre logo
<img src="/logo.png" alt="Logo" width={50} />
```

### Changer les textes
```jsx
<Label htmlFor="email">
  Mon label personnalisé
</Label>
```

### Ajouter une nouvelle checkbox
```jsx
const [acceptCookies, setAcceptCookies] = useState(false);

<CheckboxWrapper>
  <CheckboxInput
    id="cookies"
    checked={acceptCookies}
    onChange={(e) => setAcceptCookies(e.target.checked)}
  />
  <CheckboxLabel htmlFor="cookies">
    Accepter les cookies
  </CheckboxLabel>
</CheckboxWrapper>
```

---

## 🚀 Prochaines Étapes

1. **Tester localement**
   ```bash
   npm run dev
   # Ouvrir http://localhost:5173/inscription
   ```

2. **Intégrer votre API**
   - Modifier RegisterUser.js
   - Modifier LoginUser.js
   - Tester avec vraies données

3. **Déployer en production**
   ```bash
   npm run build
   vercel --prod
   ```

4. **Monitorer**
   - Ajouter Google Analytics
   - Tracker les erreurs
   - Monitorer les performances

---

**Tout est prêt à l'emploi! 🚀**
