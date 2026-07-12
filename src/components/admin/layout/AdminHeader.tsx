import { Bell, Sun, Moon, Menu } from 'lucide-react';
import { useThemeStore } from '@/store';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition-colors hover:bg-surface md:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-heading text-xl font-semibold text-text">Dashboard</h1>
            <p className="hidden text-sm text-muted sm:block">Gérez le contenu de votre portfolio</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="rounded-lg p-2 transition-colors hover:bg-surface" aria-label="Changer le thème">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="relative rounded-lg p-2 transition-colors hover:bg-surface" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
