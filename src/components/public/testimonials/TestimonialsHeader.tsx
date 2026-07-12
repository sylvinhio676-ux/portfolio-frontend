import type { ReactNode } from 'react';
import { MessageSquareQuote } from 'lucide-react';

interface TestimonialsHeaderProps {
  /** Contenu affiché à droite (flèches de navigation). */
  actions?: ReactNode;
}

/**
 * En-tête de la section Témoignages : pastille + titre à gauche,
 * commandes de navigation optionnelles à droite.
 */
export function TestimonialsHeader({ actions }: TestimonialsHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-3">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
          <MessageSquareQuote className="h-3.5 w-3.5" />
          Témoignages
        </span>
        <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
          Ils parlent de mon travail
        </h2>
      </div>

      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </div>
  );
}
