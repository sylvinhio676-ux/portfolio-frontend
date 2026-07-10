

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '@/core/helpers';
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
        'fixed top-0  border-b border-b-gray-100 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-xl font-bold text-primary hover:text-primary-hover transition-colors"
        >
          Sylviniho<span className="text-foreground">.</span>
        </Link>

        {/* Navigation desktop + Theme toggle */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          {/* Bouton thème */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface transition-colors"
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Boutons mobile : menu + theme */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Bouton thème mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface transition-colors"
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>

          {/* Bouton menu mobile */}
          <button
            className="p-2 hover:bg-surface rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
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