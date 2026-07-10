# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versionnement [SemVer](https://semver.org/lang/fr/).

## [1.0.0] — Dashboard admin
### Ajouté
- Dashboard d'administration (CMS) : CRUD Projets (+ upload d'images), Compétences (+ catégories), Expérience, Services, Témoignages, Réseaux sociaux, À propos, SEO par page.
- Authentification par token (Sanctum), layout admin, routes protégées.
### Corrigé
- Unification du token d'auth (source unique), route de login.
- Réglages SEO lus sans écrasement.

## [0.4.0] — Optimisations & thème
### Ajouté
- Thème clair/sombre fonctionnel, kit UI (Button polymorphe), animations.

## [0.3.0] — Pages secondaires
### Ajouté
- Liste des projets, détail projet (case study + galerie), pages À propos / Services / Contact.

## [0.2.0] — Sections d'accueil
### Ajouté
- Accueil piloté par l'API : Hero, À propos, Compétences, Méthode, Projets, Services, Expérience, Témoignages, CTA, Contact.

## [0.1.0] — Structure initiale
### Ajouté
- Initialisation React + Vite + Tailwind + TypeScript, kit UI, routage, providers.
