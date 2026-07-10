import type { Experience } from '@/core/types';
import { ExperienceItem } from './ExperienceItem';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

/**
 * Timeline verticale des expériences (ligne + points).
 */
export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <ol className="relative space-y-8">
      <span aria-hidden className="absolute left-2 top-1 bottom-1 w-px bg-border" />
      {experiences.map((experience, index) => (
        <ExperienceItem key={experience.id} experience={experience} index={index} />
      ))}
    </ol>
  );
}
