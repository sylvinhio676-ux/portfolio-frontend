import { useMemo, useState } from 'react';
import { ArrowRight, FolderGit2 } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { useProjects } from '@/hooks/public/use-projects';
import { ROUTES } from '@/core/constants';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter, ALL_FILTER, type ProjectFilterValue } from './ProjectFilter';

export function ProjectsSection() {
  const { data: projects, isLoading } = useProjects();
  const [active, setActive] = useState<ProjectFilterValue>(ALL_FILTER);

  const filtered = useMemo(() => {
    if (!projects) return [];
    if (active === ALL_FILTER) return projects;
    return projects.filter((project) => project.category === active);
  }, [projects, active]);

  return (
    <section id="projects" className="bg-background py-24">
      <div className="container mx-auto px-4">
        {/* En-tête + filtres */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <FolderGit2 className="h-3.5 w-3.5" />
              Projets sélectionnés
            </span>
            <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
              Quelques projets récents
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ProjectFilter active={active} onChange={setActive} />
            <Button to={ROUTES.public.projects} variant="secondary" size="sm">
              Voir tous les projets
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grille de projets */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height="18rem" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Aucun projet pour ce filtre.</p>
        )}
      </div>
    </section>
  );
}
