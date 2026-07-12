import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { useCertifications } from '@/hooks/public/use-certifications';
import type { Certification } from '@/core/types';
import { CertificationCard } from './CertificationCard';

interface CertificationsSectionProps {
  /** Limite le nombre de cartes (page d'accueil). Toutes si non fourni. */
  limit?: number;
  /** Affiche le bouton « Voir toutes les certifications ». */
  showViewAll?: boolean;
}

/**
 * Trie et filtre les certifications visibles selon `sort_order`.
 */
function selectVisible(certifications: Certification[] | undefined, limit?: number) {
  const visible = (certifications ?? [])
    .filter((certification) => certification.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);
  return typeof limit === 'number' ? visible.slice(0, limit) : visible;
}

/**
 * Section d'accueil « Certifications » : pastille, titre et grille responsive
 * (1/2/3 colonnes) des certifications visibles, avec animations à l'apparition.
 */
export function CertificationsSection({ limit, showViewAll = true }: CertificationsSectionProps) {
  const { data, isLoading } = useCertifications();
  const certifications = useMemo(() => selectVisible(data, limit), [data, limit]);

  // Section masquée si aucune certification à afficher.
  if (!isLoading && certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="bg-background py-24">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <Award className="h-4 w-4" />
              Certifications
            </span>
            <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
              Mes certifications
            </h2>
          </motion.div>

          {showViewAll && (
            <Button to="/certifications" variant="secondary" size="sm">
              Voir toutes les certifications
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Grille */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} height="16rem" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification, index) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
