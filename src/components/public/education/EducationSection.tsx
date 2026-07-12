import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Skeleton } from '@/components/ui';
import type { Education } from '@/core/types';
import { useEducation } from '@/hooks/public/use-education';
import { EducationTimeline } from './EducationTimeline';

interface EducationSectionProps {
  /**
   * « home » (défaut) : section d'accueil avec titre h2 et ancre #education.
   * « page » : variante page complète avec titre h1 et intro élargie.
   */
  variant?: 'home' | 'page';
}

/**
 * Trie les formations visibles : sort_order croissant, puis date de début
 * décroissante (la plus récente d'abord) en cas d'égalité.
 */
function sortEducations(educations: Education[]): Education[] {
  return [...educations]
    .filter((education) => education.is_visible)
    .sort((a, b) => {
      if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
      return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
    });
}

/**
 * Section « Formations » — timeline verticale du parcours académique.
 * Réutilisée telle quelle sur la page d'accueil et la page dédiée /education.
 */
export function EducationSection({ variant = 'home' }: EducationSectionProps) {
  const { data, isLoading } = useEducation();
  const educations = sortEducations(data ?? []);

  // Rien à afficher : on n'occupe pas d'espace sur la page.
  if (!isLoading && educations.length === 0) {
    return null;
  }

  const isPage = variant === 'page';

  return (
    <section id="education" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-3"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            <GraduationCap className="h-4 w-4" />
            Formations
          </span>
          {isPage ? (
            <h1 className="font-heading text-4xl font-bold text-text md:text-5xl">
              Mon parcours académique
            </h1>
          ) : (
            <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
              Mon parcours académique
            </h2>
          )}
          <p className="max-w-2xl text-muted">
            Les diplômes et formations qui ont façonné mon expertise, du socle
            académique aux compétences les plus récentes.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="max-w-3xl space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} height="8rem" />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl">
            <EducationTimeline educations={educations} />
          </div>
        )}
      </div>
    </section>
  );
}
