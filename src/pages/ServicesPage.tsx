import { ServicesSection } from '@/components/public/services/ServicesSection';
import { CTABanner } from '@/components/public/cta/CTABanner';

/**
 * Page « Services » — réutilise la section services + le bandeau CTA.
 */
export function ServicesPage() {
  return (
    <>
      <ServicesSection />
      <CTABanner />
    </>
  );
}
