import { ProjectsTable } from '@/components/admin/projects/ProjectsTable';

export function DashboardProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">Projets</h2>
        <p className="text-sm text-muted">Gérez les projets affichés sur votre portfolio.</p>
      </div>
      <ProjectsTable />
    </div>
  );
}
