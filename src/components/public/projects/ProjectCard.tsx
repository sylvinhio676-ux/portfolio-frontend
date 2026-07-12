import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui';
import type { Project } from '@/core/types';
import { ROUTES } from '@/core/constants';
import { buildCloudinaryUrl } from '@/core/helpers';
import { ProjectTechBadge } from './ProjectTechBadge';

interface ProjectCardProps {
  project: Project;
}

/**
 * Carte projet : couverture, titre, description courte et technologies.
 * Le clic sur l'image ou le titre mène au détail du projet.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const cover = buildCloudinaryUrl(project.cover_image, { width: 800, format: 'auto' });
  const externalUrl = project.demo_url ?? project.github_url;
  const detailPath = ROUTES.public.projectDetail(project.slug);

  return (
    <Card className="group flex flex-col overflow-hidden p-0 transition-all duration-200 hover:-translate-y-1 hover:border-primary">
      <Link to={detailPath} className="block aspect-video overflow-hidden bg-surface">
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-heading text-3xl font-bold text-primary">
            {project.title.charAt(0)}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link
            to={detailPath}
            className="font-heading text-lg font-semibold text-text transition-colors hover:text-primary"
          >
            {project.title}
          </Link>
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ouvrir ${project.title}`}
              className="shrink-0 text-faint transition-colors hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted">
          {project.tagline ?? project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {(project.technologies ?? []).slice(0, 4).map((tech) => (
            <ProjectTechBadge key={tech.id} tech={tech} />
          ))}
        </div>
      </div>
    </Card>
  );
}
