import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import type { Skill } from '@/core/types';
import { buildCloudinaryUrl } from '@/core/helpers';

interface SkillCardProps {
  skill: Skill;
}

/**
 * Carte d'une compétence : logo, nom et barre de niveau animée.
 */
export function SkillCard({ skill }: SkillCardProps) {
  const logo = buildCloudinaryUrl(skill.logo_url, { width: 96, format: 'auto' });

  return (
    <Card hoverable className="group flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center">
          {logo ? (
            <img
              src={logo}
              alt={skill.name}
              loading="lazy"
              className="h-8 w-8 object-contain transition-transform duration-300 group-hover:rotate-6"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 font-heading text-sm font-bold text-primary">
              {skill.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <span className="font-medium text-text">{skill.name}</span>
        <span className="ml-auto text-xs text-faint">{skill.level}%</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </Card>
  );
}
