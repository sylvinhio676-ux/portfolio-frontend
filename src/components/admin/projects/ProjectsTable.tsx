import { useState } from 'react';
import { Pencil, Trash2, Plus, Star } from 'lucide-react';
import { Badge, Button, Card, Modal, Skeleton } from '@/components/ui';
import { ROUTES } from '@/core/constants';
import { buildCloudinaryUrl } from '@/core/helpers';
import { useAdminProjects, useDeleteProject } from '@/hooks/admin';
import type { Project, ProjectStatus } from '@/core/types';

const STATUS_VARIANT: Record<ProjectStatus, 'success' | 'warning' | 'default'> = {
  published: 'success',
  draft: 'warning',
  archived: 'default',
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  published: 'Publié',
  draft: 'Brouillon',
  archived: 'Archivé',
};

/**
 * Tableau de gestion des projets (liste + suppression + accès édition).
 */
export function ProjectsTable() {
  const { data: projects, isLoading } = useAdminProjects();
  const deleteProject = useDeleteProject();
  const [toDelete, setToDelete] = useState<Project | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} height="4rem" />
        ))}
      </div>
    );
  }

  const list = projects ?? [];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button to={ROUTES.admin.projectNew}>
          <Plus className="h-4 w-4" />
          Nouveau projet
        </Button>
      </div>

      {list.length === 0 ? (
        <Card>
          <p className="text-muted">Aucun projet pour le moment. Créez-en un.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-faint">
              <tr>
                <th className="p-4 font-medium">Projet</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium">Ordre</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((project) => (
                <tr key={project.id} className="border-b border-border last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {project.cover_image && (
                        <img
                          src={buildCloudinaryUrl(project.cover_image, { width: 96 })}
                          alt=""
                          className="h-10 w-16 rounded object-cover"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1 font-medium text-text">
                          {project.title}
                          {project.is_featured && (
                            <Star className="h-3 w-3 fill-primary text-primary" />
                          )}
                        </span>
                        <span className="text-faint">{project.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={STATUS_VARIANT[project.status]}>
                      {STATUS_LABEL[project.status]}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted">{project.sort_order}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        to={ROUTES.admin.projectEdit(project.id)}
                        size="sm"
                        variant="secondary"
                        aria-label="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-red-500"
                        aria-label="Supprimer"
                        onClick={() => setToDelete(project)}
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

      <Modal isOpen={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer le projet ?">
        <p className="text-muted">
          Cette action est irréversible. Le projet « {toDelete?.title} » sera définitivement supprimé.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={deleteProject.isPending}
            onClick={() => {
              if (toDelete) {
                deleteProject.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
              }
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
