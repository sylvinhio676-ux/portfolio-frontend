import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui';
import { useSkills } from '@/hooks/public/use-skills';
import { SkillCard } from './SkillCard';
import { SkillCategoryTab } from './SkillCategoryTab';

export function SkillsSection() {
  const { groups, isLoading } = useSkills();
  const [activeId, setActiveId] = useState<number | null>(null);

  // Catégorie active : celle sélectionnée, sinon la première.
  const active = groups.find((group) => group.category.id === activeId) ?? groups[0];

  return (
    <section id="skills" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-3"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Expertise
          </span>
          <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
            Mes compétences
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height="4.5rem" />
            ))}
          </div>
        ) : groups.length === 0 ? (
          <p className="text-muted">Aucune compétence à afficher pour le moment.</p>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap gap-2">
              {groups.map((group) => (
                <SkillCategoryTab
                  key={group.category.id}
                  label={group.category.name}
                  active={active?.category.id === group.category.id}
                  onClick={() => setActiveId(group.category.id)}
                />
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {active?.skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
