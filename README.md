# Portfolio OS — Frontend

Interface du portfolio personnel de **Negoue Tamo Sylvinhio** (Full Stack Software Engineer & Mobile Developer) : site public + dashboard d'administration (CMS). Le contenu (projets, compétences, expériences, services, témoignages, SEO…) est entièrement piloté depuis le dashboard, via l'API Laravel — sans jamais toucher au code.

> Backend associé : [portfolio-backend](https://github.com/sylvinhio676-ux/portfolio-backend) (API Laravel).

## ✨ Stack technique

| Domaine | Technologie |
|---|---|
| Framework | React 19 + Vite |
| Langage | TypeScript (strict, aucun `any`) |
| Styles | Tailwind CSS v4 (thème via variables CSS, clair/sombre) |
| Routage | React Router 7 |
| Données serveur | TanStack Query |
| État global | Zustand |
| Formulaires | React Hook Form + Zod |
| Animations | Framer Motion |
| Icônes | Lucide React |
| HTTP | Axios |

## 🏗️ Architecture

Séparation stricte des responsabilités : **page (JSX) → hook (logique) → service (API) → types**.

```
src/
├── components/
│   ├── ui/          # kit de composants réutilisables (Button, Card, Badge, Modal…)
│   ├── layout/      # layouts public & admin
│   ├── public/      # sections du site public (hero, about, projects, …)
│   └── admin/       # formulaires & tables du dashboard
├── pages/           # composition JSX des pages (public + dashboard)
├── hooks/
│   ├── public/      # hooks de données du site public
│   └── admin/       # hooks CRUD du dashboard (TanStack Query)
├── services/        # appels API (Axios), typés
├── core/
│   ├── types/       # interfaces TypeScript
│   ├── schemas/     # schémas Zod (source unique de validation)
│   ├── helpers/     # fonctions pures (cn, dates, images…)
│   └── constants/   # routes, endpoints API
├── store/           # stores Zustand (auth, thème, UI)
├── providers/       # Query / Theme / Toast providers
├── routes/          # AppRouter + routes protégées
└── lib/             # client Axios
```

## 🚀 Démarrage

Prérequis : **Node 20+** et le [backend](https://github.com/sylvinhio676-ux/portfolio-backend) lancé.

```bash
npm install
cp .env.example .env      # puis renseigner VITE_API_URL
npm run dev
```

## 📜 Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement (HMR) |
| `npm run build` | Build de production (`tsc -b && vite build`) |
| `npm run preview` | Prévisualisation du build |
| `npm run lint` | ESLint |

## 🔐 Variables d'environnement

| Variable | Description |
|---|---|
| `VITE_API_URL` | URL de l'API Laravel (préfixe `/api` inclus) |
| `VITE_CLOUDINARY_CLOUD_NAME` | Nom du cloud Cloudinary (transformations d'images) |

## 🧩 Fonctionnalités

**Site public** — Accueil (Hero avec orbite de technos, À propos, Compétences, Méthode, Projets filtrables, Services, Expérience, Témoignages, CTA, Contact), pages Projets / détail projet (case study + galerie) / À propos / Services / Contact, thème clair-sombre, animations.

**Dashboard admin (CMS)** — Authentification par token (Sanctum) ; CRUD Projets (+ upload d'images), Compétences (+ catégories), Expérience, Services, Témoignages, Réseaux sociaux, À propos, SEO par page.

## 🗺️ Roadmap

- [x] Site public complet
- [x] Dashboard admin (Projets → SEO)
- [ ] Module Médias (galerie Cloudinary)
- [ ] Optimisations performance & accessibilité (Lighthouse)
- [ ] Déploiement (Vercel)

## 🌿 Workflow Git

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) : Conventional Commits, branches `main` / `develop` / `feature/*`, versionnement SemVer.

## 👤 Auteur

**Negoue Tamo Sylvinhio** — sylvinhio676@gmail.com
