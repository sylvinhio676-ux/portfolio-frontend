import type { Education } from '@/core/types';
import { EducationCard } from './EducationCard';

interface EducationTimelineProps {
  educations: Education[];
}

/**
 * Timeline verticale moderne des formations : ligne continue reliant les logos
 * des établissements, chaque nœud portant une carte détaillée.
 */
export function EducationTimeline({ educations }: EducationTimelineProps) {
  return (
    <ol className="relative space-y-8">
      {/* Ligne verticale passant au centre des logos (h-12 → 1.5rem, h-14 md → 1.75rem) */}
      <span
        aria-hidden
        className="absolute left-6 top-6 bottom-6 w-px bg-border md:left-7 md:top-7"
      />
      {educations.map((education, index) => (
        <EducationCard key={education.id} education={education} index={index} />
      ))}
    </ol>
  );
}
