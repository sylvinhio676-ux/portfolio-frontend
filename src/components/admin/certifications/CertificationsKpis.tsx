import { BadgeCheck, CalendarX, Layers, Star } from 'lucide-react';
import type { ComponentType } from 'react';
import { Card } from '@/components/ui';
import type { Certification } from '@/core/types';
import { getCertificationStatus } from './certification.utils';

interface CertificationsKpisProps {
  certifications: Certification[];
}

interface KpiItem {
  label: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  accent: string;
}

/**
 * Cartes d'indicateurs calculées depuis la liste : actives, expirées,
 * en vedette et total.
 */
export function CertificationsKpis({ certifications }: CertificationsKpisProps) {
  const active = certifications.filter((cert) => getCertificationStatus(cert) === 'active').length;
  const expired = certifications.length - active;
  const featured = certifications.filter((cert) => cert.featured).length;

  const items: KpiItem[] = [
    { label: 'Actives', value: active, icon: BadgeCheck, accent: 'text-emerald-400' },
    { label: 'Expirées', value: expired, icon: CalendarX, accent: 'text-red-400' },
    { label: 'En vedette', value: featured, icon: Star, accent: 'text-primary' },
    { label: 'Total', value: certifications.length, icon: Layers, accent: 'text-dim' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm text-muted">{item.label}</p>
            <p className="font-heading text-2xl font-semibold text-text">{item.value}</p>
          </div>
          <item.icon className={`h-6 w-6 ${item.accent}`} />
        </Card>
      ))}
    </div>
  );
}
