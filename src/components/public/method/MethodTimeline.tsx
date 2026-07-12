import { motion } from 'framer-motion';
import {
  Search,
  PenTool,
  Network,
  MonitorSmartphone,
  Server,
  FlaskConical,
  Rocket,
  Wrench,
  Circle,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui';
import type { WorkflowStep } from '@/core/types';

interface MethodTimelineProps {
  steps: WorkflowStep[];
}

// Mapping nom d'icône Lucide (champ step.icon) → composant, avec fallback.
const ICONS: Record<string, LucideIcon> = {
  Search,
  PenTool,
  Network,
  MonitorSmartphone,
  Server,
  FlaskConical,
  Rocket,
  Wrench,
};

/**
 * Timeline VERTICALE des étapes de la méthode de travail : une ligne continue,
 * une pastille par étape et une carte descriptive. Chaque étape apparaît au scroll.
 */
export function MethodTimeline({ steps }: MethodTimelineProps) {
  return (
    <div className="relative">
      {/* Ligne verticale continue (masquée derrière les pastilles). */}
      <span
        className="absolute bottom-0 left-5 top-0 w-px bg-border"
        aria-hidden="true"
      />

      <ol className="flex flex-col gap-8">
        {steps.map((step, index) => {
          const Icon = (step.icon && ICONS[step.icon]) || Circle;
          return (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative flex items-start gap-5"
            >
              {/* Pastille sur la ligne (ring couleur section pour masquer le trait). */}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-surface">
                <Icon className="h-5 w-5" />
              </span>

              <Card hoverable className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading font-semibold text-text">{step.title}</h3>
                  <span className="font-heading text-sm font-bold text-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                {step.description && (
                  <p className="text-sm text-muted">{step.description}</p>
                )}
              </Card>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
