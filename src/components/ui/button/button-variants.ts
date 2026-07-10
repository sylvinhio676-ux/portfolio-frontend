import { cn } from '@/core/helpers';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-black hover:bg-primary-hover hover:shadow-glow',
  secondary: 'bg-surface text-text border border-border hover:border-primary',
  ghost: 'bg-transparent text-muted hover:text-text',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Source unique du style des boutons — réutilisable sur un vrai <button>
 * comme sur un lien stylé en bouton. Isolée de Button.tsx pour respecter
 * la règle react-refresh (un fichier de composant n'exporte que des composants).
 */
export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-theme font-medium transition-all duration-200',
    'hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    variantStyles[variant],
    sizeStyles[size],
    className
  );
}
