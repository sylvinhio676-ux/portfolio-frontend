import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Badge, Button, Card, Modal, Skeleton } from '@/components/ui';
import {
  useAdminServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from '@/hooks/admin';
import { ServiceForm } from './ServiceForm';
import type { Service } from '@/core/types';
import type { ServiceFormValues } from '@/core/schemas';

function serviceToForm(service: Service): ServiceFormValues {
  return {
    title: service.title,
    description: service.description,
    icon: service.icon ?? '',
    is_visible: service.is_visible,
    sort_order: service.sort_order,
  };
}

export function ServicesTable() {
  const { data: services, isLoading } = useAdminServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [editing, setEditing] = useState<Service | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<Service | null>(null);

  const closeForm = () => setEditing(null);
  const submit = (values: ServiceFormValues) => {
    if (editing === 'new') createService.mutate(values, { onSuccess: closeForm });
    else if (editing) updateService.mutate({ id: editing.id, values }, { onSuccess: closeForm });
  };

  const list = [...(services ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing('new')}>
          <Plus className="h-4 w-4" />
          Nouveau service
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
          <p className="text-muted">Aucun service pour le moment.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-faint">
              <tr>
                <th className="p-3 font-medium">Titre</th>
                <th className="p-3 font-medium">Visible</th>
                <th className="p-3 font-medium">Ordre</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((service) => (
                <tr key={service.id} className="border-b border-border last:border-0">
                  <td className="p-3 font-medium text-text">{service.title}</td>
                  <td className="p-3">
                    {service.is_visible ? <Badge variant="success">Oui</Badge> : <Badge>Non</Badge>}
                  </td>
                  <td className="p-3 text-muted">{service.sort_order}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        aria-label="Modifier"
                        onClick={() => setEditing(service)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-red-500"
                        aria-label="Supprimer"
                        onClick={() => setToDelete(service)}
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
        title={editing === 'new' ? 'Nouveau service' : 'Modifier le service'}
      >
        <ServiceForm
          key={editing === 'new' ? 'new' : editing?.id}
          defaultValues={editing && editing !== 'new' ? serviceToForm(editing) : undefined}
          onSubmit={submit}
          isSubmitting={createService.isPending || updateService.isPending}
          submitLabel={editing === 'new' ? 'Créer' : 'Enregistrer'}
        />
      </Modal>

      <Modal isOpen={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer le service ?">
        <p className="text-muted">« {toDelete?.title} » sera définitivement supprimé.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={deleteService.isPending}
            onClick={() => {
              if (toDelete) deleteService.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
