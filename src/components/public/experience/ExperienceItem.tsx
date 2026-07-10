import { motion } from 'framer-motion';
import { Badge } from '@/components/ui';
import type { Experience } from '@/core/types';
import { formatExperienceDate } from '@/core/helpers';

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

// Libellés français des types d'expérience.
const TYPE_LABELS: Record<Experience['type'], string> = {
  job: 'Emploi',
  freelance: 'Freelance',
  personal: 'Projet',
  academic: 'Formation',
};

/**
 * Élément de la timeline d'expérience : poste, entreprise, période, type.
 */
export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative pl-8"
    >
      <span className="absolute left-2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />

      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-heading font-semibold text-text">{experience.role}</h3>
        <Badge>{TYPE_LABELS[experience.type]}</Badge>
      </div>
      <p className="text-sm text-primary">{experience.company}</p>
      <p className="text-xs text-faint">
        {formatExperienceDate(experience.start_date, experience.end_date, experience.is_current)}
      </p>
      {experience.description && (
        <p className="mt-2 text-sm text-muted">{experience.description}</p>
      )}
    </motion.li>
  );
}
