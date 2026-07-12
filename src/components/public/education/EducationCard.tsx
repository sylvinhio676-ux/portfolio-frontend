import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { Badge, Card } from '@/components/ui';
import type { Education } from '@/core/types';
import { buildCloudinaryUrl } from '@/core/helpers';

interface EducationCardProps {
  education: Education;
  index: number;
}

/**
 * Formate la période d'une formation.
 * end_date null ou is_current → « En cours ».
 */
function formatEducationPeriod(
  startDate: string,
  endDate: string | null,
  isCurrent: boolean
): string {
  const start = new Date(startDate).getFullYear();
  if (isCurrent || !endDate) return `${start} — En cours`;
  const end = new Date(endDate).getFullYear();
  return start === end ? `${start}` : `${start} — ${end}`;
}

/**
 * Carte d'une formation dans la timeline : logo de l'établissement (avec repli
 * sur l'initiale), diplôme, domaine d'étude, période, mention et compétences.
 */
export function EducationCard({ education, index }: EducationCardProps) {
  const logoUrl = buildCloudinaryUrl(education.school_logo, {
    width: 96,
    format: 'auto',
  });

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative pl-16 md:pl-20"
    >
      {/* Nœud de la timeline : logo de l'établissement (ou initiale en repli) */}
      <span className="absolute left-0 top-0 flex h-12 w-12 -translate-x-[1px] items-center justify-center overflow-hidden rounded-full border border-border bg-surface md:h-14 md:w-14">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={education.school_name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-heading text-lg font-bold text-primary">
            {education.school_name.charAt(0).toUpperCase()}
          </span>
        )}
      </span>

      <Card className="transition-colors hover:border-primary/40">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-lg font-semibold text-text">
            {education.diploma}
          </h3>
          {education.academic_level && (
            <Badge variant="outline">{education.academic_level}</Badge>
          )}
          {education.is_current && <Badge variant="success">En cours</Badge>}
        </div>

        <p className="mt-1 text-sm font-medium text-primary">
          {education.school_name}
        </p>
        <p className="text-sm text-muted">{education.field_of_study}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-faint">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatEducationPeriod(
              education.start_date,
              education.end_date,
              education.is_current
            )}
          </span>
          {education.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {education.location}
            </span>
          )}
        </div>

        {(education.mention || education.grade) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {education.mention && (
              <Badge variant="success">Mention {education.mention}</Badge>
            )}
            {education.grade && <Badge variant="default">{education.grade}</Badge>}
          </div>
        )}

        {/* Compétences acquises pendant la formation */}
        {education.skills && education.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {education.skills.map((skill) => (
              <Badge key={skill.id} color={skill.color}>
                {skill.name}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    </motion.li>
  );
}
