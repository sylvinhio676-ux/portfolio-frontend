import { Quote } from 'lucide-react';
import { Card } from '@/components/ui';
import type { Testimonial } from '@/core/types';
import { buildCloudinaryUrl } from '@/core/helpers';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Carte d'un témoignage : citation, texte, puis auteur (avatar, nom, rôle).
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const avatar = buildCloudinaryUrl(testimonial.avatar_url, { width: 96, format: 'auto' });

  return (
    <Card hoverable className="flex h-full flex-col shadow-sm">
      <Quote className="h-8 w-8 text-primary" />

      <p className="mt-5 flex-1 text-sm italic text-muted">
        « {testimonial.content} »
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
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
            <p className="text-sm text-faint">{testimonial.role}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
