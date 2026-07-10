/**
 * Le thème n'est plus piloté par le backend (décision de ton côté :
 * la config couleurs a été retirée de Laravel). Ce type ne représente
 * donc plus une ressource API mais l'état géré par theme.store.ts,
 * persisté localement.
 */
export interface Theme {
  primaryColor: string;
  background: string;
  surface: string;
  card: string;
  borderColor: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: string;
  animationsOn: boolean;
}