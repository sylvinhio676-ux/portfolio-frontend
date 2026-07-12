import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { CertificationForm, CERT_ROUTES } from '@/components/admin/certifications';
import { useCreateCertification } from '@/hooks/admin/use-admin-certifications';

export function DashboardCertificationNewPage() {
  const navigate = useNavigate();
  const createCertification = useCreateCertification();

  return (
    <div className="max-w-3xl space-y-6">
      <Button to={CERT_ROUTES.list} variant="ghost" size="sm" className="-ml-3">
        <ArrowLeft className="h-4 w-4" />
        Retour aux certifications
      </Button>
      <h2 className="font-heading text-2xl font-semibold text-text">Nouvelle certification</h2>
      <CertificationForm
        submitLabel="Créer la certification"
        isSubmitting={createCertification.isPending}
        onSubmit={(values) =>
          createCertification.mutate(values, {
            // Redirection vers l'édition pour ajouter le badge et les documents.
            onSuccess: (certification) => navigate(CERT_ROUTES.edit(certification.id)),
          })
        }
      />
    </div>
  );
}
