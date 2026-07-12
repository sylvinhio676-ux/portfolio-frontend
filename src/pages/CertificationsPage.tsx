import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Award } from 'lucide-react';
import { Skeleton } from '@/components/ui';
import { PageSeo } from '@/components/public/seo';
import { CertificationCard } from '@/components/public/certifications';
import { useCertifications } from '@/hooks/public/use-certifications';
import type { Certification } from '@/core/types';

const PAGE_TITLE = 'Certifications — Negoue Tamo Sylvinhio';
const PAGE_DESCRIPTION =
  'L\'ensemble de mes certifications professionnelles : organismes émetteurs, compétences validées et dates d\'obtention.';

/**
 * Construit le JSON-LD (ItemList de EducationalOccupationalCredential) décrivant
 * les certifications visibles, pour un balisage structuré exploitable par les
 * moteurs de recherche.
 */
function buildJsonLd(certifications: Certification[]): string {
  const itemListElement = certifications.map((certification, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'EducationalOccupationalCredential',
      name: certification.title,
      ...(certification.category
        ? { credentialCategory: certification.category }
        : {}),
      recognizedBy: {
        '@type': 'Organization',
        name: certification.provider,
      },
      dateCreated: certification.issue_date,
      ...(certification.expiration_date
        ? { expires: certification.expiration_date }
        : {}),
    },
  }));

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Certifications',
    itemListElement,
  });
}

/**
 * Page publique « Certifications » : liste complète des certifications visibles,
 * avec balises SEO et données structurées JSON-LD.
 */
export function CertificationsPage() {
  const { data, isLoading } = useCertifications();

  const certifications = useMemo(
    () =>
      (data ?? [])
        .filter((certification) => certification.is_visible)
        .sort((a, b) => a.sort_order - b.sort_order),
    [data]
  );

  const jsonLd = useMemo(() => buildJsonLd(certifications), [certifications]);

  return (
    <section className="bg-background py-24">
      <PageSeo
        page="certifications"
        titleOverride={PAGE_TITLE}
        descriptionOverride={PAGE_DESCRIPTION}
      />
      {certifications.length > 0 && (
        <Helmet>
          <script type="application/ld+json">{jsonLd}</script>
        </Helmet>
      )}

      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="mb-10 flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            <Award className="h-4 w-4" />
            Certifications
          </span>
          <h1 className="font-heading text-4xl font-bold text-text md:text-5xl">
            Mes certifications
          </h1>
          <p className="max-w-2xl text-muted">
            Les certifications qui attestent de mes compétences, obtenues auprès
            d'organismes reconnus.
          </p>
        </div>

        {/* Grille */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height="16rem" />
            ))}
          </div>
        ) : certifications.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification, index) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted">Aucune certification pour le moment.</p>
        )}
      </div>
    </section>
  );
}
