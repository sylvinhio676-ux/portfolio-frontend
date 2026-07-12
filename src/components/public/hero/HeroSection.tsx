import { motion } from 'framer-motion';
import { Briefcase, Code, Clock, Heart, ChevronDown, type LucideIcon } from 'lucide-react';
import { Card, Skeleton } from '@/components/ui';
import { useAbout } from '@/hooks/public/use-about';
import { useSkills } from '@/hooks/public/use-skills';
import { HeroTitle } from './HeroTitle';
import { HeroCTA } from './HeroCTA';
import { HeroBackground, type OrbitTech } from './HeroBackground';

interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function HeroSection() {
  const { data: about, isLoading, isError } = useAbout();
  const { groups } = useSkills();

  // Aplatit les compétences visibles (déjà filtrées/triées par le hook)
  // pour alimenter l'orbite ; on garde le nom de catégorie en sous-libellé.
  const techs: OrbitTech[] = groups.flatMap((group) =>
    group.skills.map((skill) => ({
      name: skill.name,
      logoUrl: skill.logo_url,
      categoryName: group.category.name,
    }))
  );

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-background">
        <Skeleton shape="circle" width="10rem" height="10rem" />
      </section>
    );
  }

  // Repli résilient : le Hero ne doit jamais être vide même si l'API échoue.
  const name = about?.name ?? 'Negoue Tamo Sylvinhio';
  const title = about?.title ?? 'Full Stack Software Engineer & Mobile Developer';
  const tagline =
    about?.tagline ??
    'Je conçois des applications web et mobiles modernes, performantes et évolutives qui résolvent de véritables problèmes métier.';

  const stats: HeroStat[] = [
    { icon: Briefcase, value: `${about?.stat_projects ?? 0}+`, label: 'Projets réalisés' },
    { icon: Code, value: `${about?.stat_techs ?? 0}+`, label: 'Technologies' },
    { icon: Clock, value: `${about?.stat_years ?? 0}+`, label: "Années d'expérience" },
    { icon: Heart, value: '100%', label: 'Passion' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-24 pb-16">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
        {/* Colonne gauche : contenu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.15 }}
          className="flex flex-col gap-8"
        >
          {/* Badge de disponibilité */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Disponible pour de nouveaux projets
          </span>

          <HeroTitle name={name} title={title} />

          <p className="max-w-xl text-lg text-muted">{tagline}</p>

          <HeroCTA
            primaryLabel={about?.hero_cta1_label}
            primaryUrl={about?.hero_cta1_url}
            secondaryLabel={about?.hero_cta2_label}
            secondaryUrl={about?.hero_cta2_url}
            cvUrl={about?.cv_url}
          />

          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-4">
                <stat.icon className="mb-2 h-5 w-5 text-primary" />
                <p className="font-heading text-2xl font-bold text-text">{stat.value}</p>
                <p className="text-xs text-faint">{stat.label}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Colonne droite : visuel photo + orbite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroBackground photoUrl={about?.photo_url ?? null} name={name} techs={techs} />
        </motion.div>
      </div>

      {isError && (
        <p className="mt-8 text-center text-sm text-faint">
          Certaines informations n'ont pas pu être chargées.
        </p>
      )}

      {/* Indicateur de scroll animé (va-et-vient vertical en boucle). */}
      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-primary sm:block"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
