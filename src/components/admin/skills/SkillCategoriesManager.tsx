import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button, Card, Modal } from '@/components/ui';
import {
  useAdminSkillCategories,
  useCreateSkillCategory,
  useUpdateSkillCategory,
  useDeleteSkillCategory,
} from '@/hooks/admin';
import { SkillCategoryForm } from './SkillCategoryForm';
import type { SkillCategory } from '@/core/types';
import type { SkillCategoryFormValues } from '@/core/schemas';

function categoryToForm(category: SkillCategory): SkillCategoryFormValues {
  return {
    name: category.name,
    slug: category.slug,
    description: category.description ?? '',
    icon: category.icon ?? '',
    sort_order: category.sort_order,
  };
}

export function SkillCategoriesManager() {
  const { data: categories } = useAdminSkillCategories();
  const createCategory = useCreateSkillCategory();
  const updateCategory = useUpdateSkillCategory();
  const deleteCategory = useDeleteSkillCategory();

  const [editing, setEditing] = useState<SkillCategory | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<SkillCategory | null>(null);

  const closeForm = () => setEditing(null);
  const submit = (values: SkillCategoryFormValues) => {
    if (editing === 'new') {
      createCategory.mutate(values, { onSuccess: closeForm });
    } else if (editing) {
      // Mise à jour sans le slug (contrainte unique backend).
      updateCategory.mutate(
        {
          id: editing.id,
          values: {
            name: values.name,
            description: values.description,
            icon: values.icon,
            sort_order: values.sort_order,
          },
        },
        { onSuccess: closeForm }
      );
    }
  };

  const list = categories ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-text">Catégories</h3>
        <Button size="sm" onClick={() => setEditing('new')}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <Card className="p-0">
        <ul>
          {list.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between border-b border-border p-3 last:border-0"
            >
              <span className="text-text">
                {category.name} <span className="text-xs text-faint">/{category.slug}</span>
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  aria-label="Modifier"
                  onClick={() => setEditing(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="text-red-500"
                  aria-label="Supprimer"
                  onClick={() => setToDelete(category)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
          {list.length === 0 && <li className="p-3 text-muted">Aucune catégorie.</li>}
        </ul>
      </Card>

      <Modal
        isOpen={editing !== null}
        onClose={closeForm}
        title={editing === 'new' ? 'Nouvelle catégorie' : 'Modifier la catégorie'}
      >
        <SkillCategoryForm
          key={editing === 'new' ? 'new' : editing?.id}
          isEdit={editing !== 'new' && editing !== null}
          defaultValues={editing && editing !== 'new' ? categoryToForm(editing) : undefined}
          onSubmit={submit}
          isSubmitting={createCategory.isPending || updateCategory.isPending}
          submitLabel={editing === 'new' ? 'Créer' : 'Enregistrer'}
        />
      </Modal>

      <Modal isOpen={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer la catégorie ?">
        <p className="text-muted">
          « {toDelete?.name} » sera supprimée. Les compétences associées peuvent être affectées.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={deleteCategory.isPending}
            onClick={() => {
              if (toDelete) deleteCategory.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
