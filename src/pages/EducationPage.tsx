import { Helmet } from 'react-helmet-async';
import { EducationSection } from '@/components/public/education';
import { PageSeo } from '@/components/public/seo';
import { useEducation } from '@/hooks/public/use-education';

const PAGE_TITLE = 'Formations — Negoue Tamo Sylvinhio';
const PAGE_DESCRIPTION =
  'Mon parcours académique : diplômes, établissements et formations qui ont bâti mon expertise en ingénierie logicielle et développement mobile.';

/**
 * Page publique « Formations » — présente l'intégralité du parcours académique
 * via la timeline réutilisable, avec balises SEO et données structurées JSON-LD.
 */
export function EducationPage() {
  const { data } = useEducation();
  const educations = (data ?? []).filter((education) => education.is_visible);

  // Données structurées : liste ordonnée de diplômes rattachés à leur établissement.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Formations de Negoue Tamo Sylvinhio',
    itemListElement: educations.map((education, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EducationalOccupationalCredential',
        name: education.diploma,
        credentialCategory: education.academic_level,
        about: education.field_of_study,
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: education.school_name,
        },
      },
    })),
  };

  return (
    <>
      <PageSeo
        page="education"
        titleOverride={PAGE_TITLE}
        descriptionOverride={PAGE_DESCRIPTION}
      />
      {educations.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
      )}
      <EducationSection variant="page" />
    </>
  );
}
