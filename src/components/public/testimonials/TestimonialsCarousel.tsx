import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import type { Testimonial } from '@/core/types';
import { cn } from '@/core/helpers';
import { TestimonialCard } from './TestimonialCard';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

// Nombre de cartes visibles par page (en desktop).
const PER_PAGE = 3;

/**
 * Carrousel de témoignages, paginé, avec flèches et points de navigation.
 */
export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(testimonials.length / PER_PAGE);
  const hasControls = pageCount > 1;
  const start = page * PER_PAGE;
  const visible = testimonials.slice(start, start + PER_PAGE);

  const goTo = (delta: number) =>
    setPage((current) => (current + delta + pageCount) % pageCount);

  return (
    <div>
      {hasControls && (
        <div className="mb-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full p-2"
            aria-label="Témoignages précédents"
            onClick={() => goTo(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full p-2"
            aria-label="Témoignages suivants"
            onClick={() => goTo(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>
      </AnimatePresence>

      {hasControls && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Aller à la page ${index + 1}`}
              className={cn(
                'h-2 rounded-full transition-all',
                index === page ? 'w-6 bg-primary' : 'w-2 bg-border'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
