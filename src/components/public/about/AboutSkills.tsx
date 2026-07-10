import { motion } from 'framer-motion';
import type { SkillGroup } from '@/hooks/public/use-skills';

interface AboutSkillsProps {
  groups: SkillGroup[];
}

// Niveau moyen (0-100) d'une catégorie à partir de ses compétences.
function averageLevel(group: SkillGroup): number {
  if (group.skills.length === 0) return 0;
  const total = group.skills.reduce((sum, skill) => sum + skill.level, 0);
  return Math.round(total / group.skills.length);
}

/**
 * Barres de progression par catégorie de compétences (affichées dans la
 * carte profil), animées à l'entrée dans le viewport.
 */
export function AboutSkills({ groups }: AboutSkillsProps) {
  const bars = groups.map((group) => ({
    name: group.category.name,
    level: averageLevel(group),
  }));

  return (
    <div>
      <p className="mb-4 font-heading text-sm font-semibold text-text">Compétences</p>
      <div className="space-y-4">
        {bars.map((bar) => (
          <div key={bar.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted">{bar.name}</span>
              <span className="text-faint">{bar.level}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: `${bar.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
