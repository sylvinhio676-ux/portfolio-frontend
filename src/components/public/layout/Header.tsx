

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/core/helpers';
import { Button } from '@/components/ui';
import { ROUTES } from '@/core/constants';
import { useThemeStore } from '@/store';
import { NAV_ITEMS } from './nav-items';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="container relative mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo "NT." — lettres neutres + point vert en --primary */}
        <Link
          to="/"
          className="font-heading text-xl font-bold text-text hover:text-primary transition-colors"
        >
          NT<span className="text-primary">.</span>
        </Link>

        {/* Navigation desktop centrée */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        {/* Actions à droite : contact + thème (+ burger mobile) */}
        <div className="flex items-center gap-2">
          {/* Bouton "Me contacter" (masqué sur très petit écran) */}
          <Button
            to={ROUTES.public.contact}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Me contacter
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Bouton bascule de thème (toujours accessible) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface transition-colors"
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-text" />
            ) : (
              <Moon className="w-5 h-5 text-text" />
            )}
          </button>

          {/* Bouton menu mobile */}
          <button
            className="p-2 hover:bg-surface rounded-lg transition-colors md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-text" />
            ) : (
              <Menu className="w-5 h-5 text-text" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <MobileMenu
        items={NAV_ITEMS}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}