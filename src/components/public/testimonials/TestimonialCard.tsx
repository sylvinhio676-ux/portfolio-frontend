import { Quote, Star } from 'lucide-react';
import { Card } from '@/components/ui';
import type { Testimonial } from '@/core/types';
import { buildCloudinaryUrl, cn } from '@/core/helpers';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Carte d'un témoignage : citation, note en étoiles, auteur et rôle.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const avatar = buildCloudinaryUrl(testimonial.avatar_url, { width: 96, format: 'auto' });

  return (
    <Card className="flex h-full flex-col">
      <Quote className="h-6 w-6 text-primary/40" />

      <p className="mt-4 flex-1 text-sm italic text-muted">
        « {testimonial.content} »
      </p>

      <div className="mt-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              'h-4 w-4',
              index < testimonial.rating
                ? 'fill-primary text-primary'
                : 'text-border'
            )}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
          {avatar ? (
            <img src={avatar} alt={testimonial.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface text-sm font-bold text-primary">
              {testimonial.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-text">{testimonial.name}</p>
          {testimonial.role && (
            <p className="text-xs text-faint">{testimonial.role}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
