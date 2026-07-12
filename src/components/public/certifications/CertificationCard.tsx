import { motion } from 'framer-motion';
import { Award, BadgeCheck, Building2, Calendar, Download } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import type { Certification } from '@/core/types';
import { buildCloudinaryUrl, formatDateFr } from '@/core/helpers';

interface CertificationCardProps {
  certification: Certification;
  /** Rang de la carte dans la grille — sert au délai d'animation en cascade. */
  index?: number;
}

// Nombre maximum de compétences affichées sous forme de badges.
const MAX_SKILLS = 4;

/**
 * Carte d'une certification : badge visuel (ou icône de repli), titre,
 * organisme émetteur, date d'obtention, niveau et compétences associées.
 * Un bouton « Télécharger » apparaît quand un badge téléchargeable existe.
 */
export function CertificationCard({ certification, index = 0 }: CertificationCardProps) {
  const badge = buildCloudinaryUrl(certification.badge, { width: 240, format: 'auto' });
  const providerLogo = buildCloudinaryUrl(certification.provider_logo, {
    width: 64,
    format: 'auto',
  });
  const skills = certification.skills ?? [];
  const extraSkills = Math.max(skills.length - MAX_SKILLS, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Card hoverable className="group flex h-full flex-col gap-4">
        {/* En-tête : badge visuel + niveau */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-theme bg-primary/10 text-primary">
            {badge ? (
              <img
                src={badge}
                alt={`Badge ${certification.title}`}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <Award className="h-8 w-8" />
            )}
          </div>

          {certification.level && (
            <Badge variant="outline" className="shrink-0">
              <BadgeCheck className="h-3.5 w-3.5" />
              {certification.level}
            </Badge>
          )}
        </div>

        {/* Titre + organisme */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-lg font-semibold text-text">
            {certification.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted">
            {providerLogo ? (
              <img
                src={providerLogo}
                alt={certification.provider}
                loading="lazy"
                className="h-5 w-5 rounded object-contain"
              />
            ) : (
              <Building2 className="h-4 w-4 text-faint" />
            )}
            <span>{certification.provider}</span>
          </div>
        </div>

        {/* Date d'obtention */}
        <div className="flex items-center gap-2 text-xs text-faint">
          <Calendar className="h-3.5 w-3.5" />
          <span>Obtenue le {formatDateFr(certification.issue_date)}</span>
        </div>

        {/* Compétences associées */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, MAX_SKILLS).map((skill) => (
              <Badge key={skill.id} color={skill.color}>
                {skill.name}
              </Badge>
            ))}
            {extraSkills > 0 && <Badge variant="outline">+{extraSkills}</Badge>}
          </div>
        )}

        {/* Action : téléchargement du badge quand il est disponible */}
        {badge && (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            <Button
              href={badge}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
