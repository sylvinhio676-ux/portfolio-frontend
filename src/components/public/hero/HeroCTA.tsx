import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui';
import { ROUTES } from '@/core/constants';

interface HeroCTAProps {
  /** Libellé du bouton principal (défaut : « Découvrir mes projets »). */
  primaryLabel?: string | null;
  /** Cible du bouton principal : route interne par défaut. */
  primaryUrl?: string | null;
  /** Lien du CV (Cloudinary). Le bouton est masqué si absent. */
  cvUrl?: string | null;
}

/**
 * Boutons d'appel à l'action du Hero. Le principal renvoie vers les projets
 * (ou une URL configurée depuis le dashboard), le secondaire télécharge le CV.
 */
export function HeroCTA({ primaryLabel, primaryUrl, cvUrl }: HeroCTAProps) {
  const label = primaryLabel || 'Découvrir mes projets';
  const target = primaryUrl || ROUTES.public.projects;
  const isExternalPrimary = target.startsWith('http');

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {isExternalPrimary ? (
        <Button href={target} target="_blank" rel="noopener noreferrer" size="lg">
          {label}
          <ArrowRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button to={target} size="lg">
          {label}
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      {cvUrl && (
        <Button
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="lg"
        >
          Télécharger mon CV
          <Download className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
