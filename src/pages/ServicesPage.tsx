import { ServicesSection } from '@/components/public/services/ServicesSection';
import { CTABanner } from '@/components/public/cta/CTABanner';
import { PageSeo } from '@/components/public/seo';

/**
 * Page « Services » — réutilise la section services + le bandeau CTA.
 */
export function ServicesPage() {
  return (
    <>
      <PageSeo page="services" />
      <ServicesSection />
      <CTABanner />
    </>
  );
}
