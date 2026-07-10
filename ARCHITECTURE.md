# Règles d'architecture — Portfolio OS Frontend

## Helpers vs Utils
Un seul emplacement : `src/core/helpers/`. Pas de `src/utils/`.
Règle : toute fonction pure liée au domaine (formatage de projet, dates d'expérience, etc.) va dans le helper thématique correspondant.

## Store (Zustand) vs React Query
- Zustand : uniquement du state client/UI (thème, session, filtres, état de formulaire multi-étapes).
- React Query : toute donnée qui vient du serveur (projects, skills, experience, etc.). Ne jamais dupliquer dans un store Zustand.

## Pages
- `src/pages/*.tsx` : unique couche page. Assemble layout + sections + hooks de données.
- Pas de dossier `pages` dans `components/public`.
