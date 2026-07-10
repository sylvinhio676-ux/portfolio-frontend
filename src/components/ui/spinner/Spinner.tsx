import { cn } from '@/core/helpers';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  /** Texte pour lecteurs d'écran — le spinner seul n'est pas explicite. */
  label?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
};

/**
 * Spinner minimal en CSS pur (pas de dépendance SVG externe).
 * Utilisé pour les états loading des hooks React Query (isLoading).
 */
export function Spinner({ size = 'md', className, label = 'Chargement…' }: SpinnerProps) {
  return (
    <div role="status" className={cn('inline-flex items-center justify-center', className)}>
      <div
        className={cn(
          'rounded-full border-border border-t-primary animate-spin',
          sizeMap[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}