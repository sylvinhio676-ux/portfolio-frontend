import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import type { ProjectFormValues } from '@/core/schemas';

interface ProjectTechInputProps {
  control: Control<ProjectFormValues>;
  register: UseFormRegister<ProjectFormValues>;
}

const fieldClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

/**
 * Édition de la liste des technologies d'un projet (nom + couleur HEX).
 */
export function ProjectTechInput({ control, register }: ProjectTechInputProps) {
  const { fields, append, remove } = useFieldArray({ control, name: 'technologies' });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-dim">Technologies</label>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => append({ name: '', color: '' })}
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-faint">Aucune technologie ajoutée.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <input
            {...register(`technologies.${index}.name`)}
            placeholder="Nom (ex : Laravel)"
            className={`flex-1 ${fieldClass}`}
          />
          <input
            {...register(`technologies.${index}.color`)}
            placeholder="#FF2D20"
            className={`w-28 ${fieldClass}`}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            aria-label="Supprimer la technologie"
            className="p-2 text-faint transition-colors hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
