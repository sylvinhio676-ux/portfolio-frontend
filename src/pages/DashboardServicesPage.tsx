import { ServicesTable } from '@/components/admin/services/ServicesTable';

export function DashboardServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">Services</h2>
        <p className="text-sm text-muted">Gérez les services proposés sur votre portfolio.</p>
      </div>
      <ServicesTable />
    </div>
  );
}
