import { useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui';
import { useProjects } from '@/hooks/public/use-projects';
import { ProjectCard } from '@/components/public/projects/ProjectCard';
import { ProjectFilter, ALL_FILTER } from '@/components/public/projects/ProjectFilter';

/**
 * Page « Projets » — liste complète des projets publiés + filtre par techno.
 */
export function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const [active, setActive] = useState(ALL_FILTER);

  // Technologies distinctes présentes sur les projets.
  const technologies = useMemo(() => {
    const set = new Set<string>();
    (projects ?? []).forEach((project) =>
      (project.technologies ?? []).forEach((tech) => set.add(tech.name))
    );
    return Array.from(set);
  }, [projects]);

  const filtered = useMemo(() => {
    if (!projects) return [];
    if (active === ALL_FILTER) return projects;
    return projects.filter((project) =>
      (project.technologies ?? []).some((tech) => tech.name === active)
    );
  }, [projects, active]);

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Portfolio
          </span>
          <h1 className="font-heading text-4xl font-bold text-text md:text-5xl">
            Mes projets
          </h1>
          <p className="max-w-2xl text-muted">
            Une sélection de projets que j'ai conçus et développés, du besoin métier
            à la mise en production.
          </p>
        </div>

        <div className="mb-8">
          <ProjectFilter technologies={technologies} active={active} onChange={setActive} />
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height="18rem" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-muted">Aucun projet pour ce filtre.</p>
        )}
      </div>
    </section>
  );
}
