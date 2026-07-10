import { type HTMLAttributes } from 'react';
import { cn } from '@/core/helpers';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  /** 'circle' pour les avatars (ex: photo de témoignage en chargement) */
  shape?: 'rect' | 'circle';
}

/**
 * Placeholder de chargement — à utiliser dans l'état isLoading des hooks
 * publics (ex: grille de ProjectCard fantômes pendant le fetch de useProjects).
 */
export function Skeleton({
  width = '100%',
  height = '1rem',
  shape = 'rect',
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-surface animate-pulse',
        shape === 'circle' ? 'rounded-full' : 'rounded-theme',
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}