import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, Send } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { ROUTES } from '@/core/constants';

/**
 * Bandeau d'appel à l'action affiché avant le footer.
 * À gauche : pastille d'icône + titre + sous-texte.
 * À droite : boutons « Me contacter » et « Voir mes services ».
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
          <Card className="flex flex-col items-center gap-8 rounded-3xl p-8 text-center shadow-glow md:flex-row md:items-center md:justify-between md:p-12 md:text-left">
            {/* Bloc gauche : pastille d'icône + textes */}
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center md:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Send className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-text md:text-3xl">
                  Vous avez un projet en tête ?
                </h2>
                <p className="mt-2 text-muted">
                  Discutons de votre idée et construisons quelque chose d'exceptionnel ensemble.
                </p>
              </div>
            </div>

            {/* Bloc droit : appels à l'action */}
            <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto md:shrink-0">
              <Button to={ROUTES.public.contact} className="w-full sm:w-auto">
                Me contacter
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                to={ROUTES.public.services}
                variant="secondary"
                className="w-full sm:w-auto"
              >
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
