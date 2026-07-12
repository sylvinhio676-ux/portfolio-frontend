import { ContactSection } from '@/components/public/contact/ContactSection';
import { PageSeo } from '@/components/public/seo';

/**
 * Page « Contact » — réutilise la section contact (formulaire + réseaux).
 */
export function ContactPage() {
  return (
    <>
      <PageSeo page="contact" />
      <ContactSection />
    </>
  );
}
