import { Badge } from '@/components/ui';
import type { ProjectTechnology } from '@/core/types';

interface ProjectTechBadgeProps {
  tech: ProjectTechnology;
}

/**
 * Badge d'une technologie de projet (couleur propre issue du backend).
 */
export function ProjectTechBadge({ tech }: ProjectTechBadgeProps) {
  return <Badge color={tech.color}>{tech.name}</Badge>;
}
