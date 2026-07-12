import { Button } from '@/components/ui';
import type { ProjectCategory } from '@/core/types';

/** Filtre actif : 'all' (Tous) ou une catégorie de projet. */
export type ProjectFilterValue = 'all' | ProjectCategory;

export const ALL_FILTER: ProjectFilterValue = 'all';

interface ProjectFilterProps {
  /** Filtre actif. */
  active: ProjectFilterValue;
  onChange: (value: ProjectFilterValue) => void;
}

// Onglets fixes alignés sur la colonne `category` du backend.
const TABS: { value: ProjectFilterValue; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'api', label: 'API' },
];

/**
 * Onglets de filtrage des projets par catégorie (Tous / Web / Mobile / API).
 */
export function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <Button
          key={tab.value}
          size="sm"
          variant={active === tab.value ? 'primary' : 'secondary'}
          className="rounded-full"
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
