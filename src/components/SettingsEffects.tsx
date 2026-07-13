import { useEffect } from 'react';
import { useSettings } from '@/hooks/public/use-settings';
import { useThemeStore } from '@/store';

/**
 * Composant d'effets globaux : ne rend rien (`return null`).
 * Applique les paramètres publics au document — couleur primaire, rayon de
 * bordure, thème par défaut et injection de Google Analytics — dès que les
 * settings sont chargés. Monté une seule fois, tout en haut de l'app.
 */
export function SettingsEffects() {
  const { data: settings } = useSettings();
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    if (!settings) return;

    const root = document.documentElement;

    // Couleur primaire personnalisée (surcharge inline prioritaire sur :root).
    if (settings.primary_color) {
      root.style.setProperty('--primary', settings.primary_color);
    }

    // Rayon de bordure global (variable --radius définie dans index.css).
    if (settings.border_radius) {
      root.style.setProperty('--radius', settings.border_radius);
    }

    // Thème par défaut : appliqué uniquement si l'utilisateur n'a pas encore
    // de préférence persistée (clé zustand `theme-storage` absente), afin de
    // ne jamais écraser un choix manuel via le toggle clair/sombre.
    if (settings.theme_default && !localStorage.getItem('theme-storage')) {
      const resolved =
        settings.theme_default === 'system'
          ? window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark'
          : settings.theme_default;
      setTheme(resolved);
    }

    // Google Analytics (gtag) : injection des 2 balises standard, sans doublon.
    const analyticsId = settings.analytics_id;
    if (analyticsId && !document.getElementById(`ga-gtag-${analyticsId}`)) {
      const loader = document.createElement('script');
      loader.id = `ga-gtag-${analyticsId}`;
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      document.head.appendChild(loader);

      const inline = document.createElement('script');
      inline.id = `ga-inline-${analyticsId}`;
      inline.text = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${analyticsId}');`;
      document.head.appendChild(inline);
    }
  }, [settings, setTheme]);

  return null;
}
