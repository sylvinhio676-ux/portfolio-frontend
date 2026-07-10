import { useEffect } from 'react';
import { cn } from '@/core/helpers';
import type { ToastItem } from '@/store';

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const variantStyles: Record<ToastItem['variant'], string> = {
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  error: 'border-red-500/40 bg-red-500/10 text-red-400',
  warning: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  info: 'border-border bg-surface text-text',
};

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(() => onDismiss(toast.id), toast.duration ?? 4000);
    return () => clearTimeout(timeout);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      role="alert"
      className={cn(
        'flex items-center justify-between gap-3 rounded-theme border px-4 py-3 shadow-lg',
        'min-w-70 max-w-sm animate-[fadeInUp_0.2s_ease-out]',
        variantStyles[toast.variant]
      )}
    >
      <span className="text-sm">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Fermer la notification"
        className="text-current opacity-60 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}