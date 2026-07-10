import { type HTMLAttributes } from 'react';
import { cn } from '@/core/helpers';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-theme p-6',
        'transition-transform duration-300',
        hoverable && 'hover:-translate-y-1.5 hover:shadow-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}