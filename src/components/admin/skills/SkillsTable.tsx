import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Badge, Button, Card, Modal, Skeleton } from '@/components/ui';
import {
  useAdminSkills,
  useAdminSkillCategories,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
} from '@/hooks/admin';
import { SkillForm } from './SkillForm';
import type { Skill } from '@/core/types';
import type { SkillFormValues } from '@/core/schemas';

function skillToForm(skill: Skill): SkillFormValues {
  return {
    category_id: skill.category_id,
    name: skill.name,
    logo_url: skill.logo_url ?? '',
    level: skill.level,
    color: skill.color ?? '',
    is_visible: skill.is_visible,
    sort_order: skill.sort_order,
  };
}

export function SkillsTable() {
  const { data: skills, isLoading } = useAdminSkills();
  const { data: categories } = useAdminSkillCategories();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [editing, setEditing] = useState<Skill | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<Skill | null>(null);

  const cats = categories ?? [];
  const categoryName = (id: number) => cats.find((c) => c.id === id)?.name ?? '—';

  const closeForm = () => setEditing(null);
  const submit = (values: SkillFormValues) => {
    if (editing === 'new') {
      createSkill.mutate(values, { onSuccess: closeForm });
    } else if (editing) {
      updateSkill.mutate({ id: editing.id, values }, { onSuccess: closeForm });
    }
  };

  const list = skills ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-text">Compétences</h3>
        <Button size="sm" onClick={() => setEditing('new')}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height="3rem" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <Card>
          <p className="text-muted">Aucune compétence pour le moment.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-faint">
              <tr>
                <th className="p-3 font-medium">Nom</th>
                <th className="p-3 font-medium">Catégorie</th>
                <th className="p-3 font-medium">Niveau</th>
                <th className="p-3 font-medium">Visible</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((skill) => (
                <tr key={skill.id} className="border-b border-border last:border-0">
                  <td className="p-3 font-medium text-text">{skill.name}</td>
                  <td className="p-3 text-muted">{categoryName(skill.category_id)}</td>
                  <td className="p-3 text-muted">{skill.level}%</td>
                  <td className="p-3">
                    {skill.is_visible ? <Badge variant="success">Oui</Badge> : <Badge>Non</Badge>}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        aria-label="Modifier"
                        onClick={() => setEditing(skill)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-red-500"
                        aria-label="Supprimer"
                        onClick={() => setToDelete(skill)}
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
        title={editing === 'new' ? 'Nouvelle compétence' : 'Modifier la compétence'}
      >
        <SkillForm
          key={editing === 'new' ? 'new' : editing?.id}
          categories={cats}
          defaultValues={editing && editing !== 'new' ? skillToForm(editing) : undefined}
          onSubmit={submit}
          isSubmitting={createSkill.isPending || updateSkill.isPending}
          submitLabel={editing === 'new' ? 'Créer' : 'Enregistrer'}
        />
      </Modal>

      <Modal isOpen={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer la compétence ?">
        <p className="text-muted">« {toDelete?.name} » sera définitivement supprimée.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={deleteSkill.isPending}
            onClick={() => {
              if (toDelete) deleteSkill.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
