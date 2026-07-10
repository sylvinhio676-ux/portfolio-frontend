import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/core/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Input contrôlé, pensé pour react-hook-form (register() spread via ...props).
 * Affiche l'erreur de validation Zod sous le champ si error est fourni.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm text-dim">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'bg-surface border border-border rounded-theme',
            'px-3 py-2 text-text placeholder:text-faint',
            'focus:outline-none focus:border-primary transition-colors',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className="text-sm text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';