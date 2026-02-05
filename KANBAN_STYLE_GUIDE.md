# 🎨 Guide de Style Kanban - Design Trello

## Résumé des modifications

Le style Kanban a été complètement refondu pour correspondre à celui de **Trello** tout en conservant la logique fonctionnelle existante.

### ✅ Changements effectués

1. **Suppression** : Ancien fichier `Kanban.css` supprimé
2. **Création** : Nouveau fichier `Kanban.scss` avec architecture SASS/SCSS
3. **Installation** : Dépendance `sass` ajoutée à `package.json`
4. **Mise à jour** : Import mis à jour dans `KanbanBoard.tsx`

---

## 📐 Architecture SASS

### Variables principales

```scss
// Palette de couleurs Trello
$colors: (
    'primary': #0079bf,         // Bleu Trello
    'primary-dark': #0051a3,    // Bleu foncé
    'bg-light': #f8f9fa,        // Fond clair
    'card-bg': #ffffff,         // Fond des cartes
    'text-dark': #172b4d,       // Texte principal
    'text-light': #626f86,      // Texte secondaire
)
```

### Breakpoints responsifs

- **Mobile**: 480px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Wide**: 1440px

---

## 🎯 Caractéristiques

### Design Trello

✨ **Couleurs épurées** - Palette minimaliste et professionnelle  
📱 **Responsive** - Adapté sur tous les appareils (mobile, tablette, desktop)  
♿ **Accessible** - Focus styles, outline visibles, contraste optimisé  
🚀 **Performance** - SCSS compilé, transitions fluides  
📋 **SEO** - Structure HTML sémantique avec `<header>`, `<section>`, `<article>`

### Éléments visuels

**Colonnes**
- Fond gris léger (#ebecf0)
- Coin arrondi (3px) comme Trello
- Ombre subtile au survol
- Responsive sur mobile

**Cartes (Tasks)**
- Fond blanc (#ffffff)
- Ombre Trello-like (0 1px 0 et 0 4px 8px)
- Bordure gauche au survol
- Badge de priorité stylisé

**Badges de priorité**
- 🔴 **High** : Rouge (#ae2a19)
- 🟠 **Medium** : Orange (#974f0c)
- 🟢 **Low** : Vert (#216e4e)

---

## 📱 Responsive Design

### Mobile (< 480px)
- Board passe en colonne verticale
- Colonnes prennent 100% de la largeur
- Scroll vertical au lieu d'horizontal

### Tablet (768px - 1024px)
- Layout horizontal conservé
- Colonnes réduites à 260px
- Padding ajusté

### Desktop (1024px+)
- Layout complet Trello
- Colonnes 272px
- Scroll horizontal si nécessaire

---

## 🎨 Personnalisation

### Modifier les couleurs

```scss
$colors: (
    'primary': #0079bf,  // Changer ici
    ...
);
```

### Modifier l'espacement

```scss
$spacing: (
    'md': 1rem,  // Ajuster ici
    ...
);
```

### Modifier les animations

```scss
$transitions: (
    'base': 200ms ease-in-out,  // Vitesse par défaut
    ...
);
```

---

## 🔄 Migration depuis l'ancien style

| Ancien (CSS) | Nouveau (SCSS) |
|---|---|
| Inline styles | Variables SCSS |
| Magic numbers | Mapped values |
| CSS pur | Mixins réutilisables |
| Pas de responsivité | Breakpoints structurés |

---

## 📋 Fichiers affectés

- ✅ `src/styles/Kanban.scss` (nouveau)
- ✅ `src/pages/KanbanBoard.tsx` (import mis à jour)
- ✅ `src/Component/KanbanTask.tsx` (inchangé - logique préservée)
- ✅ `src/Component/KanbanColumn.tsx` (inchangé - logique préservée)
- ❌ `src/styles/Kanban.css` (supprimé)

---

## 🚀 Comment démarrer

```bash
# Les styles sont automatiquement compilés par Vite
npm run dev

# Build production
npm run build
```

---

## ♿ Accessibilité

- ✅ Contraste WCAG AA minimum
- ✅ Focus states visibles (outline)
- ✅ Sémantique HTML correcte (`<header>`, `<section>`, `<article>`)
- ✅ Support du clavier (drag & drop via @dnd-kit/core)
- ✅ Print styles pour impression

---

## 🔍 SEO

La structure HTML est entièrement sémantique :

```html
<header class="seo-header">
  <h1>Titre du projet</h1>
  <p>Description</p>
</header>

<main class="kanban-board">
  <section class="kanban-column">
    <header class="column-header">
      <h2>Nom colonne</h2>
    </header>
    <div class="column-body">
      <article class="kanban-task">
        <h3>Titre tâche</h3>
        <p>Description</p>
      </article>
    </div>
  </section>
</main>
```

---

## 📝 Notes

- La logique drag & drop (@dnd-kit) n'a pas été modifiée
- Les props des composants restent inchangées
- Les animations de transition sont fluides (300ms max)
- Le code SCSS est bien structuré avec des sections commentées

