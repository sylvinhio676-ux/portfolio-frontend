import { useRef, useState } from 'react';
import { cn } from '@/core/helpers';
import { useClickOutside } from '@/hooks';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
}

/**
 * Select custom (pattern listbox) — nécessaire car le menu déroulant
 * d'un <select> natif ne peut pas être stylé de façon cohérente entre
 * navigateurs. Pas de recherche clavier complète : les listes concernées
 * (statut projet, catégorie skill, type expérience) sont courtes.
 */
export function Select({
  options,
  value,
  onChange,
  label,
  error,
  placeholder = 'Sélectionner…',
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-dim">{label}</label>}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            'w-full flex items-center justify-between bg-surface border border-border rounded-theme',
            'px-3 py-2 text-left text-text focus:outline-none focus:border-primary transition-colors',
            error && 'border-red-500'
          )}
        >
          <span className={cn(!selected && 'text-faint')}>
            {selected?.label ?? placeholder}
          </span>
          <span className={cn('transition-transform', open && 'rotate-180')}>▾</span>
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-70 mt-1 w-full max-h-60 overflow-y-auto rounded-theme border border-border bg-card shadow-lg py-1"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  'px-3 py-2 text-sm cursor-pointer hover:bg-surface transition-colors',
                  option.value === value ? 'text-primary' : 'text-muted'
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}