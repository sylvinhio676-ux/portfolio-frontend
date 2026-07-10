import { Skeleton } from '@/components/ui';
import { useTestimonials } from '@/hooks/public/use-testimonials';
import { TestimonialsCarousel } from './TestimonialsCarousel';

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
        <div className="mb-10 flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Témoignages
          </span>
          <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
            Ils parlent de mon travail
          </h2>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} height="14rem" />
            ))}
          </div>
        ) : (
          <TestimonialsCarousel testimonials={testimonials} />
        )}
      </div>
    </section>
  );
}
