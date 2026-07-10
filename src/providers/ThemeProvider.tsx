import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '@/store';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Synchronise la classe `.light` sur <html> avec le thème du store.
 * Le sombre est le défaut (aucune classe) et active les variables :root
 * d'index.css ; la classe `.light` bascule la surcharge claire.
 * La persistance est déjà gérée par le store (clé `theme-storage`),
 * donc pas de seconde clé localStorage ici.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  return <>{children}</>;
}
