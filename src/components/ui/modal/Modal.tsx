import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/core/helpers';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Modal générique — portal, verrouillage du scroll body, fermeture sur
 * Escape et clic backdrop. Focus initial posé sur le conteneur (pas de
 * focus trap complet cyclique : suffisant pour un dashboard mono-utilisateur ;
 * à renforcer si le site expose un jour des formulaires modaux publics).
 */
export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    containerRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'bg-card border border-border rounded-theme p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto',
          'focus:outline-none',
          className
        )}
      >
        {title && <h2 className="text-lg font-semibold mb-4 text-text">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body
  );
}