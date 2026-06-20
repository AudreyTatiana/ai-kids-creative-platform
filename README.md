# PetitsRêves — Plateforme IA de créations personnalisées

[![CI — PetitsRêves](https://github.com/AudreyTatiana/ai-kids-creative-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/AudreyTatiana/ai-kids-creative-platform/actions/workflows/ci.yml)

Plateforme e-commerce IA pour génération de contenus créatifs personnalisés à partir de photos d’enfants.

## Pipeline CI/CD

Le pipeline GitHub Actions (`ci.yml`) s’exécute sur chaque push vers `main` ou `dev` et sur chaque Pull Request :

1. **Qualité** — installation des dépendances, `npm audit`, lint frontend
2. **Build** — construction de l’image Docker backend et publication sur GHCR
3. **Sécurité** — scan Trivy (vulnérabilités HIGH/CRITICAL) avec sauvegarde des résultats en artifact

### Convention de tags
- `latest` → branche `main`
- `sha-<hash>` → chaque commit
- `v1.0.0` → releases sémantiques (git tag)
