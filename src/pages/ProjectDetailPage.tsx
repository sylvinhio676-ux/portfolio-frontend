import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button, Card, Skeleton } from '@/components/ui';
import { ROUTES } from '@/core/constants';
import type { ProjectDetail } from '@/core/types';
import { useProjectDetail } from '@/hooks/public/use-project-detail';
import { ProjectDetailHero } from '@/components/public/projects/ProjectDetailHero';
import { ProjectGallery } from '@/components/public/projects/ProjectGallery';

// Sections « case study » affichées si le champ est renseigné.
const CASE_STUDY: Array<{ key: keyof ProjectDetail; label: string }> = [
  { key: 'problem', label: 'Le problème' },
  { key: 'solution', label: 'La solution' },
  { key: 'challenge', label: 'Le défi technique' },
  { key: 'result', label: 'Le résultat' },
  { key: 'architecture', label: 'Architecture' },
];

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const { data: project, isLoading, isError } = useProjectDetail(slug);

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <Button to={ROUTES.public.projects} variant="ghost" size="sm" className="mb-8">
          <ArrowLeft className="h-4 w-4" />
          Retour aux projets
        </Button>

        {isLoading ? (
          <div className="space-y-6">
            <Skeleton height="3rem" />
            <Skeleton height="20rem" />
          </div>
        ) : isError || !project ? (
          <div className="flex flex-col items-start gap-4">
            <p className="text-muted">Ce projet est introuvable.</p>
            <Button to={ROUTES.public.projects} variant="secondary">
              Voir tous les projets
            </Button>
          </div>
        ) : (
          <article className="flex flex-col gap-12">
            <ProjectDetailHero project={project} />

            {project.description && (
              <p className="text-lg text-muted">{project.description}</p>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {CASE_STUDY.map(({ key, label }) => {
                const value = project[key];
                if (!value || typeof value !== 'string') return null;
                return (
                  <Card key={key}>
                    <h2 className="mb-2 font-heading font-semibold text-text">{label}</h2>
                    <p className="whitespace-pre-line text-sm text-muted">{value}</p>
                  </Card>
                );
              })}
            </div>

            <ProjectGallery images={project.images} />
          </article>
        )}
      </div>
    </section>
  );
}
