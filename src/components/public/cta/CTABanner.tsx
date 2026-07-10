import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { ROUTES } from '@/core/constants';

/**
 * Bandeau d'appel à l'action affiché avant le footer.
 */
export function CTABanner() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="flex flex-col gap-6 p-8 shadow-glow md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 className="font-heading text-2xl font-bold text-text md:text-3xl">
                Vous avez un projet en tête ?
              </h2>
              <p className="mt-2 text-muted">
                Discutons de votre idée et construisons quelque chose d'exceptionnel ensemble.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button to={ROUTES.public.contact}>
                Me contacter
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to={ROUTES.public.services} variant="secondary">
                Voir mes services
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
