import { TestimonialsTable } from '@/components/admin/testimonials/TestimonialsTable';

export function DashboardTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">Témoignages</h2>
        <p className="text-sm text-muted">Gérez les témoignages affichés sur votre portfolio.</p>
      </div>
      <TestimonialsTable />
    </div>
  );
}
