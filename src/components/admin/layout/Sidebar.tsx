import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, Code2, Briefcase, Server,
  Users, User, Search, Settings, LogOut, X, GraduationCap, Award, SlidersHorizontal, Share2,
} from 'lucide-react';
import { cn } from '@/core/helpers';
import { NavItem } from './NavItem';
import { useAuth } from '@/hooks/use-auth';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projets', icon: FolderOpen },
  { href: '/dashboard/skills', label: 'Compétences', icon: Code2 },
  { href: '/dashboard/experience', label: 'Expérience', icon: Briefcase },
  { href: '/dashboard/education', label: 'Formations', icon: GraduationCap },
  { href: '/dashboard/certifications', label: 'Certifications', icon: Award },
  { href: '/dashboard/services', label: 'Services', icon: Server },
  { href: '/dashboard/testimonials', label: 'Témoignages', icon: Users },
  { href: '/dashboard/about', label: 'À propos', icon: User },
  { href: '/dashboard/socials', label: 'Réseaux', icon: Share2 },
  { href: '/dashboard/seo', label: 'SEO', icon: Search },
  { href: '/dashboard/media', label: 'Médias', icon: Settings },
  { href: '/dashboard/settings', label: 'Paramètres', icon: SlidersHorizontal },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} aria-hidden />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform duration-300 md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-6">
          <Link to="/dashboard" onClick={onClose} className="font-heading text-xl font-bold text-primary">
            Admin<span className="text-text">.</span>
          </Link>
          <button onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-background md:hidden" aria-label="Fermer le menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.href} onClick={onClose}>
              <NavItem
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)}
              />
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
