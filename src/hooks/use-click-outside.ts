import { useEffect, type RefObject } from 'react';

/**
 * Ferme un menu/dropdown/select quand on clique en dehors de son conteneur.
 * Utilisé par Dropdown et Select.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutsideClick: () => void
): void {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onOutsideClick]);
}