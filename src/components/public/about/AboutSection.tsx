import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { ROUTES } from '@/core/constants';
import { useAbout } from '@/hooks/public/use-about';
import { useSkills } from '@/hooks/public/use-skills';
import { AboutCard } from './AboutCard';

export function AboutSection() {
  const { data: about, isLoading } = useAbout();
  const { groups } = useSkills();

  if (isLoading) {
    return (
      <section id="about" className="bg-surface py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
          <Skeleton height="12rem" />
          <Skeleton height="18rem" />
        </div>
      </section>
    );
  }

  // Texte descriptif : la philosophie si renseignée, sinon la bio.
  const description = about?.philosophy ?? about?.bio ?? '';

  return (
    <section id="about" className="bg-surface py-24">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
        {/* Colonne gauche : accroche + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            À propos
          </span>

          <h2 className="font-heading text-3xl font-bold leading-tight text-text md:text-4xl">
            Je transforme des idées en produits numériques{' '}
            <span className="text-primary">fiables</span> et{' '}
            <span className="text-primary">évolutifs</span>.
          </h2>

          {description && (
            <p className="max-w-xl whitespace-pre-line text-muted">{description}</p>
          )}

          <Button to={ROUTES.public.about} variant="secondary" className="w-fit">
            En savoir plus sur mon parcours
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Colonne droite : carte profil */}
        {about && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <AboutCard about={about} groups={groups} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
