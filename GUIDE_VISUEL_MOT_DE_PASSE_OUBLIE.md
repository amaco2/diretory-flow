# 🎨 Guide Visuel - Mot de Passe Oublié

## 🔄 Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    UTILISATEUR OUBLIE MOT DE PASSE               │
└─────────────────────────────────────────────────────────────────┘

          ↓

┌─────────────────────────────────────────────────────────────────┐
│              PAGE CONNEXION (FromConnexion.jsx)                  │
│                                                                  │
│  📧 Email: [                    ]                               │
│  🔒 Mot de passe: [              ] 👁️                           │
│                                                                  │
│  ┌──────────────────────────────────────────┐                   │
│  │      🔗 Mot de passe oublié?             │ ← CLIC ICI       │
│  └──────────────────────────────────────────┘                   │
│                                                                  │
│  [   Se Connecter   ]                                            │
│  Pas de compte? Créez-en un.                                    │
└─────────────────────────────────────────────────────────────────┘

          ↓ (Route: /mot-de-passe-oublie)

┌─────────────────────────────────────────────────────────────────┐
│        PAGE DEMANDE RECUPERATION (ForgotPasswordRequest.jsx)     │
│                                                                  │
│    🏠 DirectoryFlow Logo 🏠                                      │
│                                                                  │
│    💡 Entrez votre email. Un lien de réinitialisation           │
│       sera envoyé à votre adresse.                              │
│                                                                  │
│    📧 Email: [exemple@email.com      ]                          │
│                                                                  │
│    [  Envoyer l'email  ]                                        │
│                                                                  │
│    Vous vous souvenez? Se connecter.                             │
│                                                                  │
│    ✅ Email envoyé avec succès!                                 │
│       Un email a été envoyé à exemple@email.com                │
│       (Redirection vers /connexion dans 3s...)                 │
│                                                                  │
│    📄 Footer                                                    │
└─────────────────────────────────────────────────────────────────┘

          ↓ (User clique le lien dans l'email)
          ↓ (URL: /reset-password?token=xxxxx)

┌─────────────────────────────────────────────────────────────────┐
│         PAGE REINITIALISATION (ResetPassword.jsx)               │
│                                                                  │
│    🏠 DirectoryFlow Logo 🏠                                      │
│    Créer un nouveau mot de passe                                │
│                                                                  │
│    🔒 Nouveau mot de passe: [           ] 👁️                    │
│                                (toggle visibilité)              │
│                                                                  │
│    🔒 Confirmer: [           ] 👁️                               │
│                 (toggle visibilité)                             │
│                                                                  │
│    📋 Critères du mot de passe:                                 │
│    ✓ Au moins 8 caractères                                     │
│    ✓ Au moins une majuscule                                    │
│    ✓ Au moins une minuscule                                    │
│    ✓ Au moins un chiffre                                       │
│    ✓ Au moins un caractère spécial (!@#$%^&*)                 │
│    ✓ Les mots de passe correspondent                           │
│                                                                  │
│    [  Réinitialiser le mot de passe  ]                         │
│    (Bouton DESACTIVE jusqu'aux critères valides)               │
│                                                                  │
│    Retour à la connexion                                        │
│                                                                  │
│    ✅ Mot de passe réinitialisé!                               │
│       (Redirection vers /connexion dans 2s...)                 │
│                                                                  │
│    📄 Footer                                                    │
└─────────────────────────────────────────────────────────────────┘

          ↓ (Success redirect)

┌─────────────────────────────────────────────────────────────────┐
│              PAGE CONNEXION AVEC NOUVEAU MOT DE PASSE            │
│                                                                  │
│    L'utilisateur peut maintenant se connecter! ✅               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Interaction Détaillée

### 1️⃣ Cliquer sur "Mot de passe oublié?"

```
FromConnexion.jsx → Click LinkForgetPassword
                 → Route: /mot-de-passe-oublie
                 → Affiche: ForgotPasswordRequest.jsx
```

### 2️⃣ Entrer l'email et Envoyer

```
ForgotPasswordRequest.jsx:

1. User entre email: test@example.com
2. User clique [Envoyer l'email]
3. Validation:
   ├─ Email non vide? ✓
   ├─ Format valide? ✓
   └─ Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
4. API Call: POST /api/auth/forgot-password
5. Réponse:
   ├─ Success: Message vert + Redirection
   └─ Error: Message rouge + Retry
```

### 3️⃣ Réinitialiser le Mot de Passe

```
Email contient: 
  "Cliquez ici pour réinitialiser: 
   https://yoursite.com/reset-password?token=abc123xyz"

URL query param:
  ?token=abc123xyz ← récupéré via useSearchParams()

ResetPassword.jsx:
1. Valide le token (backend check)
2. User entre nouveau mot de passe
3. LIVE VALIDATION des critères:
   ├─ Length: 8+ ✓/✗
   ├─ Uppercase: [A-Z] ✓/✗
   ├─ Lowercase: [a-z] ✓/✗
   ├─ Number: [0-9] ✓/✗
   ├─ Special: [!@#$%^&*] ✓/✗
   └─ Match: password === confirmPassword ✓/✗
4. Tous valides? → Bouton ENABLE
5. Click [Réinitialiser]
6. API Call: POST /api/auth/reset-password
7. Réponse:
   ├─ Success: Message vert + Redirection vers /connexion
   └─ Error: Message rouge + Retry
```

---

## 👁️ Toggle Visibilité - Détail du Code

### ForgotPasswordRequest.jsx: Pas de toggle (email seulement)

### ResetPassword.jsx: Toggle sur 2 champs

#### State:
```jsx
const [isSeePassword, setIsSeePassword] = useState(true);
const [isSeeConfirmPassword, setIsSeeConfirmPassword] = useState(true);
```

#### Premier input (Nouveau mot de passe):
```jsx
<PasswordWrapper>
  <InputPassword
    type={isSeePassword ? 'password' : 'text'}  // Toggle type
    onChange={(e) => setPassword(e.target.value)}
  />
  <EyeButton
    onClick={() => setIsSeePassword(!isSeePassword)}  // Toggle state
    title={isSeePassword ? 'Afficher' : 'Masquer'}
  >
    {isSeePassword ? <Eye size={20} /> : <EyeOff size={20} />}
  </EyeButton>
</PasswordWrapper>
```

#### Deuxième input (Confirmation):
```jsx
<PasswordWrapper>
  <InputPassword
    type={isSeeConfirmPassword ? 'password' : 'text'}  // Separate state
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  <EyeButton
    onClick={() => setIsSeeConfirmPassword(!isSeeConfirmPassword)}
    title={isSeeConfirmPassword ? 'Afficher' : 'Masquer'}
  >
    {isSeeConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
  </EyeButton>
</PasswordWrapper>
```

#### Styled Components:
```jsx
const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const InputPassword = styled.input`
  width: 100%;
  padding: 12px 45px 12px 12px;  // Right padding pour le bouton
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  
  &:focus {
    box-shadow: 0 0 8px rgba(13, 71, 161, 0.3);
    border-color: #0d47a1;
  }
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;  // Positionné sur le input
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #0d47a1;
    background-color: rgba(13, 71, 161, 0.1);
  }
`;
```

---

## 📱 Responsive Design

### Mobile (≤768px):
```
┌───────────────────────────┐
│   DirectoryFlow Logo      │
│   Créer un nouveau        │
│   mot de passe            │
│                           │
│   🏠 (Logo accueil)       │
│                           │
│  📧 Nouveau mot de        │
│     passe:                │
│  [           ] 👁️        │
│                           │
│  🔒 Confirmer:            │
│  [           ] 👁️        │
│                           │
│  📋 Critères:             │
│  ✓ 8+ caractères         │
│  ✓ Majuscule             │
│  ✓ Minuscule             │
│  ✓ Chiffre               │
│  ✓ Caractère spécial     │
│  ✓ Correspond            │
│                           │
│  [  Réinitialiser  ]      │
│  Retour à connexion       │
└───────────────────────────┘

Padding: 25px
Font-size: 0.95em
Max-width: 100%
```

### Tablet (≤1024px):
```
Padding: 30px
Max-width: 100%
Layout: 2 colonnes si possible
```

### Desktop (>1024px):
```
Padding: 40px
Max-width: 450px (ForgotPassword)
Max-width: 450px (ResetPassword)
Centered
```

---

## 🎨 Couleurs & Thème

### Primary Colors:
- Primary Blue: `#0d47a1`
- Secondary Blue: `#1565c0`
- Text: `#000000` (dark), `#666666` (light)
- Background: `#ffffff` (white)

### Status Colors:
- Success: `#388e3c` (green)
- Error: `#d32f2f` (red)
- Info: `#1565c0` (blue)
- Warning: `#d32f2f` (red)

### Background Image:
- Image: `premium_vector-1683140945544-89a75438d4f5.png`
- Filter: `contrast(0.9)`
- Background-color: `#000000ff`
- Background-attachment: `fixed` (desktop), `scroll` (mobile)

---

## 📊 State Management

### ForgotPasswordRequest States:
```
email: string                    // Input email
isLoading: boolean               // During API call
errorMessage: string             // Validation/API error
successMessage: string           // Success message
isRequestSent: boolean           // Disable inputs after success
```

### ResetPassword States:
```
password: string                 // Input password
confirmPassword: string          // Input confirm
isSeePassword: boolean           // Toggle visibility
isSeeConfirmPassword: boolean    // Toggle visibility confirm
isLoading: boolean               // During API call
errorMessage: string             // Validation/API error
successMessage: string           // Success message
```

---

## ⚙️ Validation Logic

### ForgotPasswordRequest:
```javascript
if (!email) {
  errorMessage = 'Veuillez entrer votre adresse email';
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  errorMessage = 'Veuillez entrer une adresse email valide';
}
```

### ResetPassword:
```javascript
const hasMinLength = password.length >= 8;
const hasUpperCase = /[A-Z]/.test(password);
const hasLowerCase = /[a-z]/.test(password);
const hasNumber = /[0-9]/.test(password);
const hasSpecialChar = /[!@#$%^&*]/.test(password);
const passwordsMatch = password && confirmPassword && password === confirmPassword;

// Tous doivent être true pour enable le bouton submit
```

---

## 🔗 Route Configuration dans App.tsx

```tsx
<Routes>
  <Route path='/connexion' element={<FormConnexion />} />
  <Route path='/inscription' element={<FormInscription />} />
  <Route path='/mot-de-passe-oublie' element={<ForgotPasswordRequest />} />
  <Route path='/reset-password' element={<ResetPassword />} />
  {/* Autres routes... */}
</Routes>
```

---

## ✨ Points Clés à Retenir

✅ **Deux composants séparés:**
- ForgotPasswordRequest: Demander l'email
- ResetPassword: Réinitialiser avec nouveau mot de passe

✅ **Toggle visibilité:**
- 2 togles indépendants dans ResetPassword
- Eye/EyeOff icons de lucide-react
- Pattern identique à FromConnexion.jsx

✅ **Validation en temps réel:**
- Critères affichés avec coloration (rouge/vert)
- Bouton désactivé jusqu'à tous critères validés

✅ **UX optimale:**
- Messages clairs (succès/erreur/info)
- Redirection auto après succès
- Footer intégré
- Design responsive
- Accessibilité (labels, ARIA, focus states)

✅ **Sécurité:**
- Token validation
- Email validation RFC
- Strong password requirements
- Password confirmation required

---

**Créé:** 2024
**Version:** 1.0 - Initial Release
