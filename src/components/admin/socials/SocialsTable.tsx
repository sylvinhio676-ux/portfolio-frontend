import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Badge, Button, Card, Modal, Skeleton } from '@/components/ui';
import {
  useAdminSocials,
  useCreateSocial,
  useUpdateSocial,
  useDeleteSocial,
} from '@/hooks/admin';
import { SocialForm } from './SocialForm';
import type { Social } from '@/core/types';
import type { SocialFormValues } from '@/core/schemas';

function socialToForm(social: Social): SocialFormValues {
  return {
    platform: social.platform,
    url: social.url,
    icon: social.icon ?? '',
    label: social.label ?? '',
    is_visible: social.is_visible,
    sort_order: social.sort_order,
  };
}

export function SocialsTable() {
  const { data: socials, isLoading } = useAdminSocials();
  const createSocial = useCreateSocial();
  const updateSocial = useUpdateSocial();
  const deleteSocial = useDeleteSocial();

  const [editing, setEditing] = useState<Social | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<Social | null>(null);

  const closeForm = () => setEditing(null);
  const submit = (values: SocialFormValues) => {
    if (editing === 'new') createSocial.mutate(values, { onSuccess: closeForm });
    else if (editing) updateSocial.mutate({ id: editing.id, values }, { onSuccess: closeForm });
  };

  const list = [...(socials ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing('new')}>
          <Plus className="h-4 w-4" />
          Nouveau lien
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
          <p className="text-muted">Aucun réseau social pour le moment.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-faint">
              <tr>
                <th className="p-3 font-medium">Plateforme</th>
                <th className="p-3 font-medium">URL</th>
                <th className="p-3 font-medium">Visible</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((social) => (
                <tr key={social.id} className="border-b border-border last:border-0">
                  <td className="p-3 font-medium capitalize text-text">{social.platform}</td>
                  <td className="max-w-xs truncate p-3 text-muted">{social.url}</td>
                  <td className="p-3">
                    {social.is_visible ? <Badge variant="success">Oui</Badge> : <Badge>Non</Badge>}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        aria-label="Modifier"
                        onClick={() => setEditing(social)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-red-500"
                        aria-label="Supprimer"
                        onClick={() => setToDelete(social)}
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
        title={editing === 'new' ? 'Nouveau réseau social' : 'Modifier le lien'}
      >
        <SocialForm
          key={editing === 'new' ? 'new' : editing?.id}
          defaultValues={editing && editing !== 'new' ? socialToForm(editing) : undefined}
          onSubmit={submit}
          isSubmitting={createSocial.isPending || updateSocial.isPending}
          submitLabel={editing === 'new' ? 'Créer' : 'Enregistrer'}
        />
      </Modal>

      <Modal isOpen={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer le lien ?">
        <p className="text-muted">Le lien « {toDelete?.platform} » sera supprimé.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={deleteSocial.isPending}
            onClick={() => {
              if (toDelete) deleteSocial.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
