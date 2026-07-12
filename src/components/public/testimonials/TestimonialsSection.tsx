import { Skeleton } from '@/components/ui';
import { useTestimonials } from '@/hooks/public/use-testimonials';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { TestimonialsHeader } from './TestimonialsHeader';

export function TestimonialsSection() {
  const { data, isLoading } = useTestimonials();
  const testimonials = (data ?? []).filter((testimonial) => testimonial.is_visible);

  // Section masquée s'il n'y a aucun témoignage à afficher.
  if (!isLoading && testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="bg-background py-24">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <>
            {/* Pendant le chargement : en-tête sans flèches + cartes fantômes. */}
            <TestimonialsHeader />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} height="14rem" />
              ))}
            </div>
          </>
        ) : (
          <TestimonialsCarousel testimonials={testimonials} />
        )}
      </div>
    </section>
  );
}
