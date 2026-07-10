import { ExperienceTable } from '@/components/admin/experience/ExperienceTable';

export function DashboardExperiencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">Expérience</h2>
        <p className="text-sm text-muted">Gérez votre parcours professionnel.</p>
      </div>
      <ExperienceTable />
    </div>
  );
}
