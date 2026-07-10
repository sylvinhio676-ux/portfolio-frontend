

import { useEffect } from 'react';
import { NavLink } from './NavLink';
import type { NavItem } from './nav-items';

interface MobileMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Fond cliquable pour fermer */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panneau latéral */}
      <nav className="absolute right-0 top-0 flex h-full w-64 flex-col gap-6 border-l border-border bg-surface p-6 shadow-xl">
        <button
          type="button"
          className="self-end text-text"
          onClick={onClose}
          aria-label="Fermer le menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {items.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            onClick={onClose}
            className="text-base"
          />
        ))}
      </nav>
    </div>
  );
}