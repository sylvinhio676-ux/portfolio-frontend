import type { Theme } from '../types/appearance.types';
/**
 * Applique un objet Theme comme variables CSS sur :root.
 * Appelé par ThemeProvider (Phase 4) au montage et à chaque changement
 * dans theme.store.ts.
 */
export function applyThemeToDocument(theme: Theme): void {
  const root = document.documentElement;
  root.style.setProperty('--primary', theme.primaryColor);
  root.style.setProperty('--background', theme.background);
  root.style.setProperty('--surface', theme.surface);
  root.style.setProperty('--card', theme.card);
  root.style.setProperty('--border', theme.borderColor);
  root.style.setProperty('--radius', theme.borderRadius);
  root.style.setProperty('--font-heading', theme.fontHeading);
  root.style.setProperty('--font-body', theme.fontBody);
}

export const DEFAULT_THEME: Theme = {
  primaryColor: '#00E5C3',
  background: '#09090B',
  surface: '#111827',
  card: '#18181B',
  borderColor: '#27272A',
  fontHeading: 'Space Grotesk',
  fontBody: 'Inter',
  borderRadius: '8px',
  animationsOn: true,
};