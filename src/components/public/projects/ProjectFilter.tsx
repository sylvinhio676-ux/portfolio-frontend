import { Button } from '@/components/ui';

interface ProjectFilterProps {
  /** Technologies distinctes proposées comme filtres. */
  technologies: string[];
  /** Filtre actif ('Tous' ou un nom de technologie). */
  active: string;
  onChange: (value: string) => void;
}

export const ALL_FILTER = 'Tous';

/**
 * Onglets de filtrage des projets par technologie (cf. cahier des charges).
 */
export function ProjectFilter({ technologies, active, onChange }: ProjectFilterProps) {
  const tabs = [ALL_FILTER, ...technologies];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab}
          size="sm"
          variant={active === tab ? 'primary' : 'secondary'}
          className="rounded-full"
          onClick={() => onChange(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
