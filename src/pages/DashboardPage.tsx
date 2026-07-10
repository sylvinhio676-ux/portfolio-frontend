import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold">Tableau de bord</h2>
        <p className="text-muted-foreground text-sm">
          Bienvenue dans l'administration de votre portfolio
        </p>
      </div>

      <DashboardStats />
    </div>
  );
}