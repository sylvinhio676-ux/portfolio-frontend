import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { ProjectForm } from '@/components/admin/projects/ProjectForm';
import { ROUTES } from '@/core/constants';
import { useCreateProject } from '@/hooks/admin';

export function DashboardProjectNewPage() {
  const navigate = useNavigate();
  const createProject = useCreateProject();

  return (
    <div className="max-w-3xl space-y-6">
      <Button to={ROUTES.admin.projects} variant="ghost" size="sm" className="-ml-3">
        <ArrowLeft className="h-4 w-4" />
        Retour aux projets
      </Button>
      <h2 className="font-heading text-2xl font-semibold text-text">Nouveau projet</h2>
      <ProjectForm
        submitLabel="Créer le projet"
        isSubmitting={createProject.isPending}
        onSubmit={(values) =>
          createProject.mutate(values, {
            // Redirection vers l'édition pour ajouter la galerie d'images.
            onSuccess: (project) => navigate(ROUTES.admin.projectEdit(project.id)),
          })
        }
      />
    </div>
  );
}
