import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { EducationForm, EDUCATION_ROUTES } from '@/components/admin/education';
import { useCreateEducation } from '@/hooks/admin/use-admin-education';

export function DashboardEducationNewPage() {
  const navigate = useNavigate();
  const createEducation = useCreateEducation();

  return (
    <div className="max-w-3xl space-y-6">
      <Button to={EDUCATION_ROUTES.list} variant="ghost" size="sm" className="-ml-3">
        <ArrowLeft className="h-4 w-4" />
        Retour aux formations
      </Button>
      <h2 className="font-heading text-2xl font-semibold text-text">Nouvelle formation</h2>
      <EducationForm
        submitLabel="Créer la formation"
        isSubmitting={createEducation.isPending}
        onSubmit={(values) =>
          createEducation.mutate(values, {
            // Redirection vers l'édition pour ajouter images et documents.
            onSuccess: (education) => navigate(EDUCATION_ROUTES.edit(education.id)),
          })
        }
      />
    </div>
  );
}
