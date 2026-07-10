import { type HTMLAttributes } from 'react';
import { cn } from '@/core/helpers';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'outline';

interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  variant?: BadgeVariant;
  /**
   * Couleur custom (hex), prioritaire sur `variant`.
   * Utile pour les badges de technologie (project_technologies.color)
   * ou de compétence (skills.color) qui viennent du backend.
   */
  color?: string | null;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface text-dim border border-border',
  success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/30',
  outline: 'bg-transparent text-muted border border-border',
};

/**
 * Badge générique — sert à la fois pour :
 * - le statut d'un projet (draft/published/archived)
 * - le type d'une expérience (job/freelance/personal/academic)
 * - une technologie de projet ou une compétence, avec sa couleur propre
 */
export function Badge({ variant = 'default', color, className, style, children, ...props }: BadgeProps) {
  const customColorStyle = color
    ? {
        backgroundColor: `${color}26`, // ~15% opacity en hex
        borderColor: `${color}4D`, // ~30% opacity
        color,
      }
    : undefined;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-theme px-2.5 py-1 text-xs font-medium',
        !color && variantStyles[variant],
        color && 'border',
        className
      )}
      style={{ ...customColorStyle, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}