import { ExternalLink, Code2, Play } from 'lucide-react';
import { Button } from '@/components/ui';

interface ProjectLinksProps {
  links: {
    github: string | null;
    demo: string | null;
    video: string | null;
  };
}

/**
 * Boutons de liens externes d'un projet (démo, code, vidéo).
 */
export function ProjectLinks({ links }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.demo && (
        <Button href={links.demo} target="_blank" rel="noopener noreferrer">
          Voir la démo
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
      {links.github && (
        <Button href={links.github} target="_blank" rel="noopener noreferrer" variant="secondary">
          Code source
          <Code2 className="h-4 w-4" />
        </Button>
      )}
      {links.video && (
        <Button href={links.video} target="_blank" rel="noopener noreferrer" variant="secondary">
          Vidéo
          <Play className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
