import { SocialsTable } from '@/components/admin/socials/SocialsTable';

export function DashboardSocialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">Réseaux sociaux</h2>
        <p className="text-sm text-muted">Gérez vos liens de contact et réseaux sociaux.</p>
      </div>
      <SocialsTable />
    </div>
  );
}
