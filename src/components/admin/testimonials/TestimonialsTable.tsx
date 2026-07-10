import { useState } from 'react';
import { Pencil, Trash2, Plus, Star } from 'lucide-react';
import { Badge, Button, Card, Modal, Skeleton } from '@/components/ui';
import {
  useAdminTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
} from '@/hooks/admin';
import { TestimonialForm } from './TestimonialForm';
import type { Testimonial } from '@/core/types';
import type { TestimonialFormValues } from '@/core/schemas';

function testimonialToForm(testimonial: Testimonial): TestimonialFormValues {
  return {
    name: testimonial.name,
    role: testimonial.role ?? '',
    content: testimonial.content,
    avatar_url: testimonial.avatar_url ?? '',
    rating: testimonial.rating,
    is_visible: testimonial.is_visible,
    sort_order: testimonial.sort_order,
  };
}

export function TestimonialsTable() {
  const { data: testimonials, isLoading } = useAdminTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [editing, setEditing] = useState<Testimonial | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<Testimonial | null>(null);

  const closeForm = () => setEditing(null);
  const submit = (values: TestimonialFormValues) => {
    if (editing === 'new') createTestimonial.mutate(values, { onSuccess: closeForm });
    else if (editing)
      updateTestimonial.mutate({ id: editing.id, values }, { onSuccess: closeForm });
  };

  const list = [...(testimonials ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing('new')}>
          <Plus className="h-4 w-4" />
          Nouveau témoignage
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height="3.5rem" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <Card>
          <p className="text-muted">Aucun témoignage pour le moment.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-faint">
              <tr>
                <th className="p-3 font-medium">Auteur</th>
                <th className="p-3 font-medium">Note</th>
                <th className="p-3 font-medium">Visible</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((testimonial) => (
                <tr key={testimonial.id} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <span className="font-medium text-text">{testimonial.name}</span>
                    {testimonial.role && (
                      <span className="text-faint"> · {testimonial.role}</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-muted">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      {testimonial.rating}/5
                    </span>
                  </td>
                  <td className="p-3">
                    {testimonial.is_visible ? (
                      <Badge variant="success">Oui</Badge>
                    ) : (
                      <Badge>Non</Badge>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        aria-label="Modifier"
                        onClick={() => setEditing(testimonial)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-red-500"
                        aria-label="Supprimer"
                        onClick={() => setToDelete(testimonial)}
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
        title={editing === 'new' ? 'Nouveau témoignage' : 'Modifier le témoignage'}
      >
        <TestimonialForm
          key={editing === 'new' ? 'new' : editing?.id}
          defaultValues={editing && editing !== 'new' ? testimonialToForm(editing) : undefined}
          onSubmit={submit}
          isSubmitting={createTestimonial.isPending || updateTestimonial.isPending}
          submitLabel={editing === 'new' ? 'Créer' : 'Enregistrer'}
        />
      </Modal>

      <Modal isOpen={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer le témoignage ?">
        <p className="text-muted">Le témoignage de « {toDelete?.name} » sera supprimé.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={deleteTestimonial.isPending}
            onClick={() => {
              if (toDelete)
                deleteTestimonial.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
