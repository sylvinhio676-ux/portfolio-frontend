import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui';
import { useServices } from '@/hooks/public/use-services';
import { ServiceCard } from './ServiceCard';

export function ServicesSection() {
  const { data, isLoading } = useServices();
  const services = (data ?? [])
    .filter((service) => service.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);

  if (!isLoading && services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="bg-surface py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-3"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Services
          </span>
          <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
            Ce que je propose
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} height="12rem" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
