

import { Bell, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store';

export function AdminHeader() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3">
        <div>
          <h1 className="font-heading text-xl font-semibold">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Gérez le contenu de votre portfolio
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}