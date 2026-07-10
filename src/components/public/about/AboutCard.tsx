import { Download } from 'lucide-react';
import { Button, Card } from '@/components/ui';
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
 * Carte profil de la section À propos : identité + coordonnées, barres de
 * compétences, statistiques et bouton de téléchargement du CV.
 */
export function AboutCard({ about, groups }: AboutCardProps) {
  return (
    <Card className="p-6 shadow-glow md:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <AboutPhoto
          photoUrl={about.photo_url}
          name={about.name}
          title={about.title}
          location={about.location}
          email={about.email}
          availability={about.availability}
        />
        <AboutSkills groups={groups} />
      </div>

      {about.cv_url && (
        <Button
          href={about.cv_url}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
          className="mt-6"
        >
          <Download className="h-4 w-4" />
          Télécharger mon CV
        </Button>
      )}

      <div className="mt-6">
        <AboutStats
          projects={about.stat_projects}
          techs={about.stat_techs}
          years={about.stat_years}
          clients={about.stat_clients}
        />
      </div>
    </Card>
  );
}
