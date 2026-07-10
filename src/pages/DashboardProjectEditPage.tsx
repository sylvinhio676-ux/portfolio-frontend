import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui';
import { ProjectForm } from '@/components/admin/projects/ProjectForm';
import { ProjectImagesUpload } from '@/components/admin/projects/ProjectImagesUpload';
import { useAdminProjects, useUpdateProject } from '@/hooks/admin';
import { useProjectDetail } from '@/hooks/public/use-project-detail';
import type { ProjectDetail } from '@/core/types';
import type { ProjectFormValues } from '@/core/schemas';

// Mappe la forme « détail » (links imbriqués) vers les valeurs du formulaire.
function mapDetailToForm(project: ProjectDetail): ProjectFormValues {
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline ?? '',
    description: project.description,
    problem: project.problem ?? '',
    solution: project.solution ?? '',
    challenge: project.challenge ?? '',
    result: project.result ?? '',
    architecture: project.architecture ?? '',
    github_url: project.links.github ?? '',
    demo_url: project.links.demo ?? '',
    video_url: project.links.video ?? '',
    cover_image: project.cover_image ?? '',
    is_featured: project.is_featured,
    status: project.status,
    sort_order: project.sort_order,
    technologies: project.technologies.map((tech) => ({
      name: tech.name,
      color: tech.color ?? '',
    })),
  };
}

export function DashboardProjectEditPage() {
  const { id = '' } = useParams();
  const projectId = Number(id);

  // On récupère le slug depuis la liste admin (en cache) pour charger le détail.
  const { data: list } = useAdminProjects();
  const row = list?.find((project) => project.id === projectId);
  const { data: detail, isLoading } = useProjectDetail(row?.slug ?? '');
  const updateProject = useUpdateProject();

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
      <h2 className="font-heading text-2xl font-semibold text-text">
        Modifier : {detail.title}
      </h2>
      <ProjectForm
        defaultValues={mapDetailToForm(detail)}
        submitLabel="Enregistrer les modifications"
        isSubmitting={updateProject.isPending}
        onSubmit={(values) => updateProject.mutate({ id: projectId, values })}
      />
      <ProjectImagesUpload projectId={projectId} slug={detail.slug} />
    </div>
  );
}
