import { Link } from 'react-router-dom';
import { ExternalLink, Star, TrendingUp } from 'lucide-react';
import { Badge, Card } from '@/components/ui';
import type { Project, ProjectCategory } from '@/core/types';
import { ROUTES } from '@/core/constants';
import { buildCloudinaryUrl } from '@/core/helpers';
import { ProjectTechBadge } from './ProjectTechBadge';

interface ProjectCardProps {
  project: Project;
}

// Nombre de technologies affichées avant de basculer sur un compteur « +N »
const MAX_VISIBLE_TECHS = 4;

// Libellés lisibles pour chaque catégorie de projet
const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  web: 'Web',
  mobile: 'Mobile',
  api: 'API',
};

/**
 * Carte projet : couverture, titre, description courte et technologies.
 * Le clic sur l'image ou le titre mène au détail du projet.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const cover = buildCloudinaryUrl(project.cover_image, { width: 800, format: 'auto' });
  const externalUrl = project.demo_url ?? project.github_url;
  const detailPath = ROUTES.public.projectDetail(project.slug);

  const technologies = project.technologies ?? [];
  const visibleTechs = technologies.slice(0, MAX_VISIBLE_TECHS);
  const remainingTechs = technologies.length - MAX_VISIBLE_TECHS;

  return (
    <Card className="group flex flex-col overflow-hidden p-0 transition-all duration-200 hover:-translate-y-1 hover:border-primary">
      <Link to={detailPath} className="relative block aspect-video overflow-hidden bg-surface">
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

        {/* Pastille catégorie en overlay, coin haut-gauche */}
        {project.category && (
          <span className="absolute left-3 top-3 rounded-theme bg-background/80 px-2 py-1 text-xs font-medium text-primary backdrop-blur">
            {CATEGORY_LABELS[project.category]}
          </span>
        )}

        {/* Pastille « en vedette » en overlay, coin haut-droite */}
        {project.is_featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-theme bg-background/80 px-2 py-1 text-xs font-medium text-primary backdrop-blur">
            <Star className="h-3 w-3 fill-primary text-primary" />
            Vedette
          </span>
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

        <p className="mb-2 line-clamp-2 text-sm text-muted">
          {project.tagline ?? project.description}
        </p>

        {/* Ligne d'impact : résultat clé du projet, mis en avant */}
        {project.result && (
          <p className="mb-4 flex items-center gap-1.5 text-sm font-medium text-text">
            <TrendingUp className="h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{project.result}</span>
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-2">
          {visibleTechs.map((tech) => (
            <ProjectTechBadge key={tech.id} tech={tech} />
          ))}
          {/* Compteur des technologies non affichées */}
          {remainingTechs > 0 && <Badge variant="outline">+{remainingTechs}</Badge>}
        </div>
      </div>
    </Card>
  );
}
