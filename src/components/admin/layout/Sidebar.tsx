

import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  FolderOpen,
  Code2,
  Briefcase,
  Server,
  Users,
  User,
  Palette,
  Search,
  Settings,
  LogOut,
} from 'lucide-react';
import { NavItem } from './NavItem';
import { useAuth } from '@/hooks/use-auth';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projets', icon: FolderOpen },
  { href: '/dashboard/skills', label: 'Compétences', icon: Code2 },
  { href: '/dashboard/experience', label: 'Expérience', icon: Briefcase },
  { href: '/dashboard/services', label: 'Services', icon: Server },
  { href: '/dashboard/testimonials', label: 'Témoignages', icon: Users },
  { href: '/dashboard/about', label: 'À propos', icon: User },
  { href: '/dashboard/appearance', label: 'Apparence', icon: Palette },
  { href: '/dashboard/seo', label: 'SEO', icon: Search },
  { href: '/dashboard/media', label: 'Médias', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-border bg-surface">
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="font-heading text-xl font-bold text-primary">
          Admin<span className="text-foreground">.</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Portfolio OS</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}