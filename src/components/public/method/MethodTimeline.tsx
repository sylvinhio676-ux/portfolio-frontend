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
 * Timeline des étapes de la méthode de travail (grille numérotée).
 */
export function MethodTimeline({ steps }: MethodTimelineProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = (step.icon && ICONS[step.icon]) || Circle;
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card hoverable className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-theme bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-heading text-lg font-bold text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-text">{step.title}</h3>
              {step.description && (
                <p className="text-sm text-muted">{step.description}</p>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
