import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { ROUTES } from '@/core/constants';
import { useAbout } from '@/hooks/public/use-about';
import { useSkills } from '@/hooks/public/use-skills';
import { AboutCard } from './AboutCard';

/**
 * Section « À propos » — 2 colonnes (présentation 45% / carte profil 55%),
 * espacées de 64px sur desktop, resserrées sur tablette, empilées sur mobile.
 */
export function AboutSection() {
  const { data: about, isLoading } = useAbout();
  const { groups } = useSkills();

  if (isLoading) {
    return (
      <section id="about" className="border-t border-border bg-background py-24">
        <div className="container mx-auto grid gap-16 px-4 lg:grid-cols-[45fr_55fr]">
          <Skeleton height="12rem" />
          <Skeleton height="20rem" />
        </div>
      </section>
    );
  }

  // Texte descriptif : la philosophie si renseignée, sinon la bio.
  const description = about?.philosophy ?? about?.bio ?? '';

  return (
    <section id="about" className="border-t border-border bg-background py-24">
      <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 md:gap-12 lg:grid-cols-[45fr_55fr] lg:gap-16">
        {/* Colonne gauche : présentation (contenu limité à 550px) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-[550px] flex-col"
        >
          {/* Badge discret */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-xs font-medium uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            À propos
          </span>

          {/* Titre (max 520px, interligne serré) */}
          <h2 className="mt-6 max-w-[520px] font-heading text-3xl font-extrabold leading-[1.1] text-text md:text-5xl">
            Je transforme des idées en produits numériques{' '}
            <span className="text-primary">modernes</span> et{' '}
            <span className="text-primary">évolutifs</span>.
          </h2>

          {/* Description (max 500px, interligne aéré) */}
          {description && (
            <p className="mt-7 max-w-[500px] whitespace-pre-line text-base leading-[1.8] text-muted">
              {description}
            </p>
          )}

          {/* Bouton outline (fond transparent → surface au survol) */}
          <Button
            to={ROUTES.public.about}
            variant="ghost"
            className="mt-8 w-fit border border-border transition-colors duration-200 hover:border-primary hover:bg-surface hover:text-text"
          >
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
