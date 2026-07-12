import type { About } from '@/core/types';
import type { SkillGroup } from '@/hooks/public/use-skills';
import { AboutPhoto } from './AboutPhoto';
import { AboutStats } from './AboutStats';
import { AboutSkills } from './AboutSkills';

interface AboutCardProps {
  about: About;
  groups: SkillGroup[];
}

/**
 * Carte profil de la section À propos. Fond card, bordure fine, coins 24px,
 * padding 32px, ombre très légère. Structure : zone haute (profil à gauche +
 * compétences à droite), séparateur, puis statistiques sur 4 colonnes.
 */
export function AboutCard({ about, groups }: AboutCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      {/* Zone haute : profil (gauche) + compétences (droite) */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <div className="w-full lg:w-1/2">
          <AboutPhoto
            photoUrl={about.photo_url}
            name={about.name}
            title={about.title}
            location={about.location}
            email={about.email}
            availability={about.availability}
            cvUrl={about.cv_url}
          />
        </div>

        {groups.length > 0 && (
          <div className="w-full lg:w-1/2">
            <AboutSkills groups={groups} />
          </div>
        )}
      </div>

      {/* Séparateur horizontal (marge verticale 28px) */}
      <div className="my-7 border-t border-border" />

      {/* Statistiques */}
      <AboutStats
        projects={about.stat_projects}
        techs={about.stat_techs}
        years={about.stat_years}
        clients={about.stat_clients}
      />
    </div>
  );
}
