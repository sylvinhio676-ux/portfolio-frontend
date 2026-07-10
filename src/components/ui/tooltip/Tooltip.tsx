import { useState, type ReactNode } from 'react';
import { cn } from '@/core/helpers';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  children: ReactNode;
  placement?: TooltipPlacement;
}

const placementStyles: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * Tooltip léger en CSS/JS pur — pas de librairie de positionnement (Popper).
 * Suffisant tant que le déclencheur reste dans le viewport, ce qui est
 * le cas pour un portfolio/dashboard de taille modeste.
 */
export function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={cn(
            'absolute z-80 whitespace-nowrap rounded-theme border border-border bg-surface',
            'px-2 py-1 text-xs text-text shadow-lg pointer-events-none',
            placementStyles[placement]
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}