import type { ProjectDetail } from '@/core/types';
import { buildCloudinaryUrl } from '@/core/helpers';
import { ProjectTechBadge } from './ProjectTechBadge';
import { ProjectLinks } from './ProjectLinks';

interface ProjectDetailHeroProps {
  project: ProjectDetail;
}

/**
 * En-tête de la page détail d'un projet : titre, tagline, technos, liens, cover.
 */
export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const cover = buildCloudinaryUrl(project.cover_image, { width: 1200, format: 'auto' });

  return (
    <header className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-text md:text-5xl">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="mt-3 text-lg text-muted">{project.tagline}</p>
        )}
      </div>

      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <ProjectTechBadge key={tech.id} tech={tech} />
          ))}
        </div>
      )}

      <ProjectLinks links={project.links} />

      {cover && (
        <div className="overflow-hidden rounded-theme border border-border">
          <img src={cover} alt={project.title} className="w-full object-cover" />
        </div>
      )}
    </header>
  );
}
