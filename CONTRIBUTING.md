# Conventions du projet

## Commits — Conventional Commits

Format : `type(scope): description` (impératif, en anglais).

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `refactor` | Refactoring sans changement de comportement |
| `perf` | Amélioration de performance |
| `style` | Style/formatage (pas de logique) |
| `docs` | Documentation |
| `test` | Tests |
| `chore` | Outillage, config, maintenance |

Exemples : `feat(projects): add technology filter`, `fix(seo): read settings without overwriting`.

## Branches

| Branche | Rôle |
|---|---|
| `main` | Production / releases (taggées SemVer) |
| `develop` | Intégration continue |
| `feature/<nom>` | Une fonctionnalité = une branche, partant de `develop` |

Flux : `feature/*` → `develop` → release taggée sur `main`.

## Versionnement — SemVer

`vMAJOR.MINOR.PATCH`, tag annoté par release + entrée dans le [CHANGELOG](./CHANGELOG.md).

## Règles de code

- TypeScript strict, **aucun `any`**.
- Séparation : page (JSX) → hook (logique) → service (API) → types.
- Pas de style inline — Tailwind uniquement ; réutiliser le kit `components/ui`.
- Commentaires en français, code (variables/fonctions) en anglais.
