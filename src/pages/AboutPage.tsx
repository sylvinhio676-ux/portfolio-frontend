import { AboutSection } from '@/components/public/about/AboutSection';
import { SkillsSection } from '@/components/public/skills/SkillsSection';
import { ExperienceSection } from '@/components/public/experience/ExperienceSection';
import { MethodSection } from '@/components/public/method/MethodSection';

/**
 * Page « À propos » — compose les sections d'accueil dédiées au parcours.
 */
export function AboutPage() {
  return (
    <>
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <MethodSection />
    </>
  );
}
