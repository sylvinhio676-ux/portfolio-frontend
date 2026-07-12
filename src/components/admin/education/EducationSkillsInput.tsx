import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { Badge, Skeleton } from '@/components/ui';
import { cn } from '@/core/helpers';
import { useSkills } from '@/hooks/public/use-skills';

interface EducationSkillsInputProps {
  value: number[];
  onChange: (value: number[]) => void;
  error?: string;
}

/**
 * Sélecteur multiple de compétences existantes (ids). Inspiré de
 * ProjectTechInput mais ici on coche des skills du référentiel (chargées via
 * le hook public useSkills), regroupées par catégorie et filtrables.
 */
export function EducationSkillsInput({ value, onChange, error }: EducationSkillsInputProps) {
  const { groups, isLoading } = useSkills();
  const [query, setQuery] = useState('');

  const selectedSet = useMemo(() => new Set(value), [value]);

  const filteredGroups = useMemo(() => {
    const search = query.trim().toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        skills: group.skills.filter((skill) =>
          search === '' ? true : skill.name.toLowerCase().includes(search)
        ),
      }))
      .filter((group) => group.skills.length > 0);
  }, [groups, query]);

  const toggle = (id: number) => {
    if (selectedSet.has(id)) {
      onChange(value.filter((skillId) => skillId !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-dim">Compétences associées</label>
        <span className="text-xs text-faint">{value.length} sélectionnée(s)</span>
      </div>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher une compétence…"
        className="rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint transition-colors focus:border-primary focus:outline-none"
      />

      {isLoading ? (
        <Skeleton height="6rem" />
      ) : filteredGroups.length === 0 ? (
        <p className="text-sm text-faint">Aucune compétence disponible.</p>
      ) : (
        <div className="flex max-h-64 flex-col gap-4 overflow-y-auto rounded-theme border border-border bg-surface/40 p-4">
          {filteredGroups.map((group) => (
            <div key={group.category.id} className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-faint">
                {group.category.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isSelected = selectedSet.has(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggle(skill.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-theme border px-2.5 py-1 text-xs font-medium transition-colors',
                        isSelected
                          ? 'border-primary bg-primary/15 text-primary'
                          : 'border-border text-muted hover:border-primary hover:text-text'
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {groups
            .flatMap((group) => group.skills)
            .filter((skill) => selectedSet.has(skill.id))
            .map((skill) => (
              <Badge key={skill.id} color={skill.color}>
                {skill.name}
              </Badge>
            ))}
        </div>
      )}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
