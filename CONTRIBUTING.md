# Contributing Guide — AI Kids Creative Platform

## Stratégie de branches (GitHub Flow)

Ce projet suit **GitHub Flow**, une stratégie simple et efficace :

```
main
 └── feature/nom-de-la-fonctionnalite
 └── fix/nom-du-bug
 └── chore/nom-de-la-tache
```

### Règles
- `main` est la branche stable — on n'y pousse **jamais directement**
- Chaque fonctionnalité = une branche courte (moins d'une semaine)
- Toute modification passe par une **Pull Request** avec au moins 1 review
- Les branches sont supprimées après merge

---

## Convention de nommage des branches

| Type | Format | Exemple |
|------|--------|---------|
| Fonctionnalité | `feature/nom` | `feature/backend-auth-ai` |
| Correction | `fix/nom` | `fix/upload-middleware` |
| Tâche technique | `chore/nom` | `chore/update-gitignore` |

---

## Conventional Commits

Tous les commits doivent suivre ce format :

```
type: description courte en anglais
```

### Types autorisés

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `chore` | Tâche technique (config, dépendances) |
| `docs` | Documentation |
| `refactor` | Refactoring sans nouvelle fonctionnalité |
| `test` | Ajout ou modification de tests |
| `style` | Formatage, espaces (pas de logique) |

### Exemples valides
```
feat: add JWT authentication middleware
fix: correct db import path in authController
chore: remove uploaded images from tracking
docs: update README with installation steps
```

### Exemples invalides ❌
```
update code
fixed bug
WIP
```

---

## Processus de contribution

1. Crée ta branche depuis `main` :
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/ma-fonctionnalite
   ```

2. Code et commite régulièrement en respectant les Conventional Commits

3. Pousse ta branche :
   ```bash
   git push -u origin feature/ma-fonctionnalite
   ```

4. Ouvre une **Pull Request** sur GitHub avec le template fourni

5. Attends la review d'un binôme avant de merger

6. Merge via **Squash and Merge** ou **Merge Commit** selon la convention d'équipe

7. Supprime la branche après merge

---

## Structure du projet

```
ai-kids-creative-platform/
├── backend/
│   └── src/
│       ├── config/        # Configuration (DB, etc.)
│       ├── controllers/   # Logique métier (MVC)
│       ├── middlewares/   # Middlewares Express
│       ├── models/        # Modèles de données
│       ├── routes/        # Définition des routes
│       ├── services/      # Services externes (IA, email)
│       └── utils/         # Utilitaires
└── frontend/
    └── src/
        ├── components/    # Composants réutilisables
        ├── context/       # Contextes React
        └── pages/         # Pages de l'application
```

---

## Variables d'environnement

Ne jamais commiter le fichier `.env`. Utilise `.env.example` comme référence :

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=petitsreves
JWT_SECRET=
OPENAI_API_KEY=
```
