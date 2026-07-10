import { HeroSection } from '@/components/public/hero/HeroSection';
import { AboutSection } from '@/components/public/about/AboutSection';
import { SkillsSection } from '@/components/public/skills/SkillsSection';
import { MethodSection } from '@/components/public/method/MethodSection';
import { ProjectsSection } from '@/components/public/projects/ProjectsSection';
import { ServicesSection } from '@/components/public/services/ServicesSection';
import { ExperienceSection } from '@/components/public/experience/ExperienceSection';
import { TestimonialsSection } from '@/components/public/testimonials/TestimonialsSection';
import { CTABanner } from '@/components/public/cta/CTABanner';
import { ContactSection } from '@/components/public/contact/ContactSection';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <MethodSection />
      <ProjectsSection />
      <ServicesSection />
      <ExperienceSection />
      <TestimonialsSection />
      <CTABanner />
      <ContactSection />
    </main>
  );
}
