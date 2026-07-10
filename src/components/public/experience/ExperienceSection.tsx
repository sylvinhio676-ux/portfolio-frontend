import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui';
import { useExperience } from '@/hooks/public/use-experience';
import { ExperienceTimeline } from './ExperienceTimeline';

export function ExperienceSection() {
  const { data, isLoading } = useExperience();
  const experiences = [...(data ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  if (!isLoading && experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-3"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Expérience
          </span>
          <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
            Mon parcours
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="max-w-3xl space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} height="5rem" />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl">
            <ExperienceTimeline experiences={experiences} />
          </div>
        )}
      </div>
    </section>
  );
}
