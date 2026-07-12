import { Helmet } from 'react-helmet-async';
import { useSeo } from '@/hooks/public/use-seo';
import { buildCloudinaryUrl } from '@/core/helpers';

interface PageSeoProps {
  /** Clé de la page côté API (home, about, projects, services, contact…). */
  page: string;
  /** Titre dynamique prioritaire (ex. titre d'un projet sur sa page détail). */
  titleOverride?: string;
  /** Description dynamique prioritaire. */
  descriptionOverride?: string;
  /** Image OG dynamique prioritaire (ex. couverture d'un projet). */
  imageOverride?: string | null;
}

// Valeurs de repli si l'API ne renvoie rien pour la page.
const DEFAULT_TITLE =
  'Negoue Tamo Sylvinhio — Full Stack Software Engineer & Mobile Developer';
const DEFAULT_DESCRIPTION =
  'Je conçois des applications web et mobiles modernes, performantes et évolutives qui résolvent de véritables problèmes métier.';

/**
 * Injecte les balises SEO d'une page (title, description, keywords, robots,
 * Open Graph) à partir des réglages configurés dans le dashboard (/seo/{page}).
 * Cascade de priorité : override explicite > donnée API > valeur par défaut.
 */
export function PageSeo({
  page,
  titleOverride,
  descriptionOverride,
  imageOverride,
}: PageSeoProps) {
  const { data } = useSeo(page);

  const title = titleOverride ?? data?.title ?? DEFAULT_TITLE;
  const description =
    descriptionOverride ?? data?.description ?? DEFAULT_DESCRIPTION;
  const ogTitle = data?.og_title ?? title;
  const ogDescription = data?.og_description ?? description;
  const ogImageSource = imageOverride ?? data?.og_image ?? null;
  const ogImage = ogImageSource ? buildCloudinaryUrl(ogImageSource) : null;
  const keywords = data?.keywords ?? null;
  const robots = data?.robots ?? 'index,follow';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
    </Helmet>
  );
}
