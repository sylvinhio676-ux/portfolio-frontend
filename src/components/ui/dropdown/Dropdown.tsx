import { useRef, useState, type ReactNode } from 'react';
import { cn } from '@/core/helpers';
import { useClickOutside } from '@/hooks';

export interface DropdownItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

/**
 * Menu contextuel générique — ex: actions "⋮" sur une ligne de ProjectsTable
 * (Phase 6 : éditer / supprimer / changer statut).
 */
export function Dropdown({ trigger, items, align = 'right' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={() => setOpen((o) => !o)} className="cursor-pointer">
        {trigger}
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-70 mt-2 min-w-40 rounded-theme border border-border bg-card shadow-lg py-1',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, i) => (
            <button
              key={i}
              role="menuitem"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={cn(
                'block w-full text-left px-3 py-2 text-sm hover:bg-surface transition-colors',
                item.danger ? 'text-red-400' : 'text-muted'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}