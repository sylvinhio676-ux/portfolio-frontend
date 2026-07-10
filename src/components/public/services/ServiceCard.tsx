import {
  Code,
  Code2,
  Smartphone,
  Server,
  Palette,
  Globe,
  Database,
  Cpu,
  Rocket,
  PenTool,
  Layers,
  Cloud,
  Building,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui';
import type { Service } from '@/core/types';

interface ServiceCardProps {
  service: Service;
}

// Mapping nom d'icône Lucide (champ service.icon) → composant, avec fallback.
const ICONS: Record<string, LucideIcon> = {
  Code,
  Code2,
  Smartphone,
  Server,
  Palette,
  Globe,
  Database,
  Cpu,
  Rocket,
  PenTool,
  Layers,
  Cloud,
  Building,
  ShieldCheck,
};

/**
 * Carte d'un service : icône Lucide, titre et description.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = (service.icon && ICONS[service.icon]) || Sparkles;

  return (
    <Card hoverable className="flex flex-col gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-theme bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-text">{service.title}</h3>
      <p className="text-sm text-muted">{service.description}</p>
    </Card>
  );
}
