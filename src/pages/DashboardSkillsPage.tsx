import { SkillCategoriesManager } from '@/components/admin/skills/SkillCategoriesManager';
import { SkillsTable } from '@/components/admin/skills/SkillsTable';

export function DashboardSkillsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">Compétences</h2>
        <p className="text-sm text-muted">Gérez vos catégories et vos compétences.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <SkillCategoriesManager />
        <SkillsTable />
      </div>
    </div>
  );
}
