import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui';
import { useWorkflowSteps } from '@/hooks/public/use-workflow-steps';
import { MethodTimeline } from './MethodTimeline';

export function MethodSection() {
  const { data, isLoading } = useWorkflowSteps();
  const steps = [...(data ?? [])]
    .filter((step) => step.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);

  if (!isLoading && steps.length === 0) {
    return null;
  }

  return (
    <section id="method" className="bg-surface py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-3"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Ma méthode de travail
          </span>
          <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
            Comment je travaille
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height="10rem" />
            ))}
          </div>
        ) : (
          <MethodTimeline steps={steps} />
        )}
      </div>
    </section>
  );
}
