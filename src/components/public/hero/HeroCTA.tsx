import type { ReactNode } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui';
import { ROUTES } from '@/core/constants';

interface HeroCTAProps {
  /** Libellé du bouton principal (défaut : « Découvrir mes projets »). */
  primaryLabel?: string | null;
  /** Cible du bouton principal : route interne par défaut. */
  primaryUrl?: string | null;
  /** Libellé du 2e bouton (configurable depuis le dashboard). */
  secondaryLabel?: string | null;
  /** Cible du 2e bouton. Le bouton n'apparaît que si libellé + URL présents. */
  secondaryUrl?: string | null;
  /** Lien du CV (Cloudinary). Le bouton est masqué si absent. */
  cvUrl?: string | null;
}

/** Bouton pointant vers une URL interne (route) ou externe (http). */
function LinkButton({
  target,
  variant,
  children,
}: {
  target: string;
  variant: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}) {
  const isExternal = target.startsWith('http');
  return isExternal ? (
    <Button href={target} target="_blank" rel="noopener noreferrer" size="lg" variant={variant}>
      {children}
    </Button>
  ) : (
    <Button to={target} size="lg" variant={variant}>
      {children}
    </Button>
  );
}

/**
 * Boutons d'appel à l'action du Hero : deux CTA configurables depuis le
 * dashboard (about.hero_cta1_* / hero_cta2_*) + le téléchargement du CV.
 */
export function HeroCTA({
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  cvUrl,
}: HeroCTAProps) {
  const primaryTarget = primaryUrl || ROUTES.public.projects;
  const hasSecondary = Boolean(secondaryLabel && secondaryUrl);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <LinkButton target={primaryTarget} variant="primary">
        {primaryLabel || 'Découvrir mes projets'}
        <ArrowRight className="h-4 w-4" />
      </LinkButton>

      {hasSecondary && (
        <LinkButton target={secondaryUrl as string} variant="secondary">
          {secondaryLabel}
        </LinkButton>
      )}

      {cvUrl && (
        <Button
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="lg"
        >
          Télécharger mon CV
          <Download className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
