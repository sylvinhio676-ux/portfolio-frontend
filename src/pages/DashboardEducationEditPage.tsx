import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { EducationForm, EducationMediaUpload, EDUCATION_ROUTES } from '@/components/admin/education';
import { useUpdateEducation } from '@/hooks/admin/use-admin-education';
import { useEducationDetail } from '@/hooks/public/use-education-detail';
import type { EducationDetail } from '@/core/types';
import type { EducationFormValues } from '@/core/schemas/education.schema';

// Mappe la forme « détail » vers les valeurs du formulaire.
function mapDetailToForm(education: EducationDetail): EducationFormValues {
  return {
    school_name: education.school_name,
    school_logo: education.school_logo ?? '',
    diploma: education.diploma,
    field_of_study: education.field_of_study,
    academic_level: education.academic_level,
    description: education.description ?? '',
    location: education.location ?? '',
    website: education.website ?? '',
    start_date: education.start_date.slice(0, 10),
    end_date: education.end_date ? education.end_date.slice(0, 10) : '',
    is_current: education.is_current,
    grade: education.grade ?? '',
    mention: education.mention ?? '',
    achievements: education.achievements ?? '',
    is_visible: education.is_visible,
    featured: education.featured,
    sort_order: education.sort_order,
    skills: education.skills.map((skill) => skill.id),
  };
}

export function DashboardEducationEditPage() {
  const { id = '' } = useParams();
  const educationId = Number(id);

  const { data: detail, isLoading } = useEducationDetail(educationId);
  const updateEducation = useUpdateEducation();

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
      <Button to={EDUCATION_ROUTES.list} variant="ghost" size="sm" className="-ml-3">
        <ArrowLeft className="h-4 w-4" />
        Retour aux formations
      </Button>
      <h2 className="font-heading text-2xl font-semibold text-text">
        Modifier : {detail.diploma}
      </h2>
      <EducationForm
        defaultValues={mapDetailToForm(detail)}
        submitLabel="Enregistrer les modifications"
        isSubmitting={updateEducation.isPending}
        onSubmit={(values) => updateEducation.mutate({ id: educationId, values })}
      />
      <EducationMediaUpload educationId={educationId} />
    </div>
  );
}
