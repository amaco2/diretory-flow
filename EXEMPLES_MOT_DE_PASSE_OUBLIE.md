# 📚 Exemples d'Utilisation - Mot de Passe Oublié

## 1️⃣ ForgotPasswordRequest.jsx - Exemples

### Exemple 1: Flux Complet d'une Demande d'Email

```jsx
// Composant mounted
<ForgotPasswordRequest />

// User input:
// 1. Entre email: "john@example.com"
// 2. Clique [Envoyer l'email]

// Processus:
const handleSubmit = (event) => {
  event.preventDefault();
  
  // Validation 1: Email non vide
  if (!email) {
    setErrorMessage('Veuillez entrer votre adresse email');
    return; // ❌ Affiche erreur
  }
  
  // Validation 2: Format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setErrorMessage('Veuillez entrer une adresse email valide');
    return; // ❌ Affiche erreur
  }
  
  // Tout OK, envoyer
  setIsLoading(true); // ✅ Bouton désactivé, loader visible
  
  // Simuler API call (1500ms)
  setTimeout(() => {
    setSuccessMessage(`Un email de réinitialisation a été envoyé à ${email}`);
    setIsRequestSent(true);
    setIsLoading(false);
    
    // Redirection auto après 3 secondes
    setTimeout(() => {
      navigate('/connexion');
    }, 3000);
  }, 1500);
};

// Result:
// ✅ Message vert: "Un email de réinitialisation a été envoyé à john@example.com"
// ✅ Inputs désactivés
// ✅ Redirection vers /connexion après 3s
```

### Exemple 2: Validation Email - Différents Cas

```jsx
// CAS 1: Email vide
input.value = ''
onClick([Envoyer l'email])
// ❌ Erreur: "Veuillez entrer votre adresse email"

// CAS 2: Email sans @
input.value = 'john.example.com'
onClick([Envoyer l'email])
// ❌ Erreur: "Veuillez entrer une adresse email valide"

// CAS 3: Email sans domaine
input.value = 'john@'
onClick([Envoyer l'email])
// ❌ Erreur: "Veuillez entrer une adresse email valide"

// CAS 4: Email valide
input.value = 'john@example.com'
onClick([Envoyer l'email])
// ✅ Succès: "Un email de réinitialisation a été envoyé à john@example.com"
```

### Exemple 3: Message d'Information

```jsx
<InfoMessage>
  💡 Entrez votre adresse email. Nous vous enverrons un lien pour
  réinitialiser votre mot de passe.
</InfoMessage>

// Style: Background bleu clair, icône info
// Non-dismissable (info importante)
```

### Exemple 4: Lien de Retour à Connexion

```jsx
<LinkConnexion to="/connexion">
  <span style={{ color: '#181616ff', fontWeight: 'bold' }}>
    Vous vous souvenez?
  </span>
  {' '}Se connecter.
</LinkConnexion>

// Style: Texte bleu (#2f08f4ff), clikable
// Hover: Underline
// Focus: Outline visible
```

---

## 2️⃣ ResetPassword.jsx - Exemples

### Exemple 1: Créer un Nouveau Mot de Passe

```jsx
// URL: /reset-password?token=abc123xyz
// Token extrait: const token = searchParams.get('token')

// User inputs:
// 1. Nouveau mot de passe: "MyPass123!"
// 2. Confirmer: "MyPass123!"
// 3. Clique [Réinitialiser le mot de passe]

// Validation:
const password = "MyPass123!";
const confirmPassword = "MyPass123!";

const hasMinLength = password.length >= 8;           // ✅ 10 chars
const hasUpperCase = /[A-Z]/.test(password);        // ✅ M
const hasLowerCase = /[a-z]/.test(password);        // ✅ yPass
const hasNumber = /[0-9]/.test(password);           // ✅ 123
const hasSpecialChar = /[!@#$%^&*]/.test(password); // ✅ !
const passwordsMatch = password === confirmPassword; // ✅ Match

// Tous true = Bouton ENABLED ✅

// API Call:
handleSubmit(event) {
  event.preventDefault();
  
  if (!hasMinLength) {
    setErrorMessage('Le mot de passe doit contenir au moins 8 caractères');
    return; // ❌
  }
  
  if (!passwordsMatch) {
    setErrorMessage('Les mots de passe ne correspondent pas');
    return; // ❌
  }
  
  setIsLoading(true);
  
  // POST /api/auth/reset-password
  // { token: 'abc123xyz', newPassword: 'MyPass123!' }
  
  // Réponse SUCCESS:
  setSuccessMessage('Votre mot de passe a été réinitialisé avec succès!');
  
  // Redirection après 2s:
  setTimeout(() => {
    navigate('/connexion');
  }, 2000);
  
  // User peut maintenant se connecter avec:
  // Email: john@example.com
  // Password: MyPass123!
}

// Result:
// ✅ Message vert: "Votre mot de passe a été réinitialisé avec succès!"
// ✅ Redirection vers /connexion après 2s
```

### Exemple 2: Toggle Visibilité - Premier Champ

```jsx
// État initial:
const [isSeePassword, setIsSeePassword] = useState(true);

// HTML initial (password masqué):
<InputPassword
  type={true ? 'password' : 'text'}  // type = "password" (masqué)
/>
<EyeButton>
  <EyeOff size={20} /> // ⊗ Icon "oeil barré"
</EyeButton>

// USER CLICK sur EyeButton:
onClick={() => setIsSeePassword(!isSeePassword)}
// state: true → false

// HTML après click (password visible):
<InputPassword
  type={false ? 'password' : 'text'}  // type = "text" (visible)
/>
<EyeButton>
  <Eye size={20} /> // ○ Icon "oeil ouvert"
</EyeButton>

// USER CLICK again:
// state: false → true (back to masked)
```

### Exemple 3: Toggle Visibilité - Confirmation Indépendante

```jsx
// États SÉPARÉS:
const [isSeePassword, setIsSeePassword] = useState(true);
const [isSeeConfirmPassword, setIsSeeConfirmPassword] = useState(true);

// Premier input:
<InputPassword
  type={isSeePassword ? 'password' : 'text'}
  onChange={(e) => setPassword(e.target.value)}
/>
<EyeButton
  onClick={() => setIsSeePassword(!isSeePassword)}
>
  {isSeePassword ? <Eye size={20} /> : <EyeOff size={20} />}
</EyeButton>

// Deuxième input:
<InputPassword
  type={isSeeConfirmPassword ? 'password' : 'text'}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>
<EyeButton
  onClick={() => setIsSeeConfirmPassword(!isSeeConfirmPassword)}
>
  {isSeeConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
</EyeButton>

// SCENARIO: User veut voir premier password mais pas le deuxième
// Click Eye sur le premier:
//   isSeePassword: true → false (VISIBLE)
//   isSeeConfirmPassword: true (masked)
// Result: "MyPass123!" visible, confirmation encore masquée ✅
```

### Exemple 4: Critères de Mot de Passe - Progression

```jsx
// User tape: "M"
const password = "M";
const hasMinLength = password.length >= 8;           // ❌ (1 char)
const hasUpperCase = /[A-Z]/.test(password);        // ✅ M
const hasLowerCase = /[a-z]/.test(password);        // ❌
const hasNumber = /[0-9]/.test(password);           // ❌
const hasSpecialChar = /[!@#$%^&*]/.test(password); // ❌
const passwordsMatch = ... // ❌ (confirmation empty)

// Affichage des critères:
<PasswordRequirements>
  <li className={false ? 'valid' : 'invalid'}>
    ✗ Au moins 8 caractères  {/* RED */}
  </li>
  <li className={true ? 'valid' : 'invalid'}>
    ✓ Au moins une majuscule {/* GREEN */}
  </li>
  <li className={false ? 'valid' : 'invalid'}>
    ✗ Au moins une minuscule {/* RED */}
  </li>
  {/* ... etc */}
</PasswordRequirements>

// User continue: "MyPass123!"
// Tous critères ✅ GREEN

// Bouton submit:
<SubmitButton
  disabled={isLoading || !passwordsMatch || !hasMinLength}
  // disabled = false ✅ ENABLED
/>
```

### Exemple 5: Validation Complète - Cas Échec

```jsx
// USER INPUTS:
// Password: "weak"
// Confirm: "weak"

// Validations:
const hasMinLength = "weak".length >= 8;            // ❌ (4 chars)
const hasUpperCase = /[A-Z]/.test("weak");         // ❌
const hasLowerCase = /[a-z]/.test("weak");         // ✅
const hasNumber = /[0-9]/.test("weak");            // ❌
const hasSpecialChar = /[!@#$%^&*]/.test("weak");  // ❌

// Bouton DISABLED ✅ (correct, password faible)

// Affichage:
<PasswordRequirements>
  <li className="invalid">✗ Au moins 8 caractères</li>
  <li className="invalid">✗ Au moins une majuscule</li>
  <li className="valid">✓ Au moins une minuscule</li>
  <li className="invalid">✗ Au moins un chiffre</li>
  <li className="invalid">✗ Au moins un caractère spécial</li>
</PasswordRequirements>

// USER CLICK FORCE SUBMIT:
// Pas possible car bouton disabled ✅

// User doit améliorer:
// "WeakPass123!"
// Maintenant:
const hasMinLength = true;        // ✅ (12 chars)
const hasUpperCase = true;        // ✅ W
const hasLowerCase = true;        // ✅ eakass
const hasNumber = true;           // ✅ 123
const hasSpecialChar = true;      // Besoin de ajouter !

// Avec: "WeakPass123!"
const hasSpecialChar = /[!@#$%^&*]/.test("WeakPass123!"); // ✅ !

// Tous true = Bouton ENABLED ✅
```

### Exemple 6: Mots de Passe Non-Correspondants

```jsx
// User inputs:
// Password: "MyPass123!"
// Confirm: "MyPass456!"

// Validation:
const password = "MyPass123!";
const confirmPassword = "MyPass456!";
const passwordsMatch = password === confirmPassword; // ❌ false

// Affichage dans critères:
<li className={false ? 'valid' : 'invalid'}>
  ✗ Les mots de passe correspondent {/* RED */}
</li>

// Bouton DISABLED ✅
// Text: "Réinitialiser le mot de passe" (gray, disabled)

// User corrige:
// Confirm: "MyPass123!"

// Validation:
const passwordsMatch = "MyPass123!" === "MyPass123!"; // ✅ true

// Bouton ENABLED ✅
// Couleur: gradient blue, clickable
```

### Exemple 7: Token Invalide/Expiré

```jsx
// URL: /reset-password (SANS token)
// const token = searchParams.get('token'); // null

// Condition de rendu:
if (!token) {
  return (
    <main>
      <DivFormConnexion>
        <DivWrapperForm>
          <ErrorMessage role="alert">
            <AlertCircle size={20} />
            Lien de réinitialisation invalide ou expiré.
            Veuillez <LinkConnexion to="/mot-de-passe-oublie">
              demander un nouveau lien
            </LinkConnexion>.
          </ErrorMessage>
        </DivWrapperForm>
      </DivFormConnexion>
      <Footer />
    </main>
  );
}

// Affichage:
// ❌ Red message: "Lien de réinitialisation invalide ou expiré"
// 🔗 Link: "demander un nouveau lien" → /mot-de-passe-oublie
```

### Exemple 8: API Error Handling

```jsx
// User clique [Réinitialiser le mot de passe]
// Token: abc123xyz
// Password: MyPass123!

setIsLoading(true);

// API Call:
POST /api/auth/reset-password
{
  "token": "abc123xyz",
  "newPassword": "MyPass123!"
}

// Response ERROR:
{
  "error": "Token expiré"
}

// Handler:
.catch((error) => {
  setErrorMessage(
    error.message || 'Erreur lors de la réinitialisation du mot de passe'
  );
  setIsLoading(false);
});

// Affichage:
// ❌ Red message: "Token expiré"
// Bouton re-enabled pour retry
```

---

## 3️⃣ Flow Complet d'un Utilisateur

### Scenario: Utilisateur John oublie son mot de passe

```
STEP 1: Accès à /connexion
├─ Page: FromConnexion.jsx
├─ Affiche: Login form
└─ John remarque: "Mot de passe oublié?"

STEP 2: Click sur "Mot de passe oublié?"
├─ Route: /mot-de-passe-oublie
├─ Charge: ForgotPasswordRequest.jsx
└─ Affiche: Form pour demander email

STEP 3: John entre email et clique [Envoyer l'email]
├─ Input: john@example.com
├─ Validation: ✅ Format valide
├─ API Call: POST /api/auth/forgot-password
│            { email: 'john@example.com' }
├─ Response: SUCCESS
├─ Affiche: ✅ Message vert de confirmation
└─ Redirection: /connexion (après 3s)

STEP 4: John va check son email
├─ Email reçu: "Réinitialiser votre mot de passe"
├─ Lien: https://yoursite.com/reset-password?token=xyz123abc
└─ John clique sur le lien

STEP 5: Accès à /reset-password?token=xyz123abc
├─ Route: /reset-password
├─ Charge: ResetPassword.jsx
├─ Validation token: ✅ Valid
└─ Affiche: Form pour nouveau mot de passe

STEP 6: John crée nouveau mot de passe
├─ Input 1: "NewPass456!"
│ └─ Toggle Eye: Click pour voir/masquer
├─ Input 2: "NewPass456!"
│ └─ Toggle Eye: Click pour voir/masquer
├─ Affiche critères:
│  ├─ ✓ Au moins 8 caractères
│  ├─ ✓ Au moins une majuscule
│  ├─ ✓ Au moins une minuscule
│  ├─ ✓ Au moins un chiffre
│  ├─ ✓ Au moins un caractère spécial
│  └─ ✓ Les mots de passe correspondent
└─ Bouton: [Réinitialiser le mot de passe] ✅ ENABLED

STEP 7: John clique [Réinitialiser le mot de passe]
├─ API Call: POST /api/auth/reset-password
│            { token: 'xyz123abc', newPassword: 'NewPass456!' }
├─ Response: SUCCESS
├─ Affiche: ✅ Message vert "Mot de passe réinitialisé!"
└─ Redirection: /connexion (après 2s)

STEP 8: John peut maintenant se connecter
├─ Page: FromConnexion.jsx
├─ Email: john@example.com
├─ Password: NewPass456!
├─ Click: [Se Connecter]
└─ Result: ✅ Connecté avec succès!

FIN DU FLOW ✅
```

---

## 4️⃣ Intégration avec FormConnexion.jsx

### Le lien existant:

```jsx
// Dans FromConnexion.jsx (ligne ~393)
<LinkForgetPassword to="/mot-de-passe-oublie">
  Mot de passe oublié?
</LinkForgetPassword>

// Style:
const LinkForgetPassword = styled(Link)`
  font-weight: 700;
  font-size: 1em;
  color: #2f08f4ff; // Bleu vif
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #2f08f4;
    outline-offset: 2px;
  }
`;

// Positionnement:
// Entre le champ mot de passe et le bouton submit
// Aligné à gauche/droite selon le design
```

### User Flow dans FromConnexion:

```
┌─────────────────────────────────────┐
│    📧 Email: [              ]      │
│    🔒 Password: [         ] 👁️    │
│                                    │
│    🔗 Mot de passe oublié?  ← CLIC │
│                                    │
│    [   Se Connecter   ]           │
│    Pas de compte? Créez-en un.    │
└─────────────────────────────────────┘

Click "Mot de passe oublié?"
     ↓
<Link to="/mot-de-passe-oublie">
     ↓
Route change: /connexion → /mot-de-passe-oublie
     ↓
Component change: FormConnexion → ForgotPasswordRequest
     ↓
Affiche: ForgotPasswordRequest.jsx
```

---

## 5️⃣ Testing Checklist

### Manual Testing:

- [ ] Click "Mot de passe oublié?" depuis /connexion
- [ ] Entrer email valide et envoyer
- [ ] Recevoir message de succès
- [ ] Vérifier redirection vers /connexion
- [ ] Cliquer link depuis email (simulé: /reset-password?token=test)
- [ ] Voir form de réinitialisation
- [ ] Toggle visibility sur les deux champs
- [ ] Taper password qui ne match pas tous les critères
- [ ] Voir bouton disabled
- [ ] Taper password qui match tous les critères
- [ ] Voir bouton enabled
- [ ] Taper confirmations différentes
- [ ] Voir critère "correspondent" en red
- [ ] Corriger
- [ ] Voir critère en green
- [ ] Click réinitialiser
- [ ] Voir message de succès
- [ ] Vérifier redirection vers /connexion

### Browser Testing:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Testing:

- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Ultra-wide (> 1440px)

### Accessibility Testing:

- [ ] Tab navigation works
- [ ] Focus states visible
- [ ] Labels associés aux inputs
- [ ] ARIA labels présent
- [ ] Screen reader friendly

---

**Créé:** 2024
**Version:** 1.0 - Exemples Complets
