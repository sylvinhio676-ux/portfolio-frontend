import { GraduationCap, Loader, CheckCircle2, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui';
import type { EducationKpiData } from './use-education-workspace';

interface EducationKpisProps {
  data: EducationKpiData;
}

interface KpiItem {
  label: string;
  value: number;
  icon: LucideIcon;
}

/**
 * Rangée de cartes KPI du workspace formations (valeurs pré-calculées par le
 * hook workspace). Réutilise Card du kit UI.
 */
export function EducationKpis({ data }: EducationKpisProps) {
  const items: KpiItem[] = [
    { label: 'Total formations', value: data.total, icon: GraduationCap },
    { label: 'En cours', value: data.current, icon: Loader },
    { label: 'Terminées', value: data.finished, icon: CheckCircle2 },
    { label: 'Compétences associées', value: data.skills, icon: Sparkles },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-theme bg-primary/10 text-primary">
            <item.icon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-semibold text-text">{item.value}</span>
            <span className="text-sm text-muted">{item.label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
