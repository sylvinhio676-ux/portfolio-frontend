import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import {
  CertificationForm,
  CertificationMedia,
  CERT_ROUTES,
  detailToForm,
} from '@/components/admin/certifications';
import { useUpdateCertification } from '@/hooks/admin/use-admin-certifications';
import { useCertificationDetail } from '@/hooks/public/use-certification-detail';

export function DashboardCertificationEditPage() {
  const { id = '' } = useParams();
  const certificationId = Number(id);

  const { data: detail, isLoading } = useCertificationDetail(certificationId);
  const updateCertification = useUpdateCertification();

  if (isLoading || !detail) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton height="2rem" />
        <Skeleton height="20rem" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <Button to={CERT_ROUTES.list} variant="ghost" size="sm" className="-ml-3">
        <ArrowLeft className="h-4 w-4" />
        Retour aux certifications
      </Button>
      <h2 className="font-heading text-2xl font-semibold text-text">
        Modifier : {detail.title}
      </h2>
      <CertificationForm
        defaultValues={detailToForm(detail)}
        submitLabel="Enregistrer les modifications"
        isSubmitting={updateCertification.isPending}
        onSubmit={(values) => updateCertification.mutate({ id: certificationId, values })}
      />
      <CertificationMedia certificationId={certificationId} />
    </div>
  );
}
