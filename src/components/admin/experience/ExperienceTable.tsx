import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Badge, Button, Card, Modal, Skeleton } from '@/components/ui';
import { formatExperienceDate } from '@/core/helpers';
import {
  useAdminExperience,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from '@/hooks/admin';
import { ExperienceForm } from './ExperienceForm';
import type { Experience } from '@/core/types';
import type { ExperienceFormValues } from '@/core/schemas';

const TYPE_LABEL: Record<Experience['type'], string> = {
  job: 'Emploi',
  freelance: 'Freelance',
  personal: 'Projet',
  academic: 'Formation',
};

function experienceToForm(experience: Experience): ExperienceFormValues {
  return {
    company: experience.company,
    role: experience.role,
    description: experience.description ?? '',
    start_date: experience.start_date,
    end_date: experience.end_date ?? '',
    is_current: experience.is_current,
    type: experience.type,
    sort_order: experience.sort_order,
  };
}

export function ExperienceTable() {
  const { data: experiences, isLoading } = useAdminExperience();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();

  const [editing, setEditing] = useState<Experience | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<Experience | null>(null);

  const closeForm = () => setEditing(null);
  const submit = (values: ExperienceFormValues) => {
    if (editing === 'new') {
      createExperience.mutate(values, { onSuccess: closeForm });
    } else if (editing) {
      updateExperience.mutate({ id: editing.id, values }, { onSuccess: closeForm });
    }
  };

  const list = [...(experiences ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing('new')}>
          <Plus className="h-4 w-4" />
          Nouvelle expérience
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height="4rem" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <Card>
          <p className="text-muted">Aucune expérience pour le moment.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-faint">
              <tr>
                <th className="p-3 font-medium">Poste</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Période</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((experience) => (
                <tr key={experience.id} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <span className="font-medium text-text">{experience.role}</span>
                    <span className="text-faint"> · {experience.company}</span>
                  </td>
                  <td className="p-3">
                    <Badge>{TYPE_LABEL[experience.type]}</Badge>
                  </td>
                  <td className="p-3 text-muted">
                    {formatExperienceDate(
                      experience.start_date,
                      experience.end_date,
                      experience.is_current
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        aria-label="Modifier"
                        onClick={() => setEditing(experience)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-red-500"
                        aria-label="Supprimer"
                        onClick={() => setToDelete(experience)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Modal
        isOpen={editing !== null}
        onClose={closeForm}
        title={editing === 'new' ? 'Nouvelle expérience' : "Modifier l'expérience"}
      >
        <ExperienceForm
          key={editing === 'new' ? 'new' : editing?.id}
          defaultValues={editing && editing !== 'new' ? experienceToForm(editing) : undefined}
          onSubmit={submit}
          isSubmitting={createExperience.isPending || updateExperience.isPending}
          submitLabel={editing === 'new' ? 'Créer' : 'Enregistrer'}
        />
      </Modal>

      <Modal isOpen={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer l'expérience ?">
        <p className="text-muted">
          « {toDelete?.role} · {toDelete?.company} » sera définitivement supprimée.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={deleteExperience.isPending}
            onClick={() => {
              if (toDelete)
                deleteExperience.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
