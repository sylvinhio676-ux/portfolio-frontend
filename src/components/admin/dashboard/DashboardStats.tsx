import type { ReactNode } from 'react';
import { FolderOpen, Code2, Briefcase, Users } from 'lucide-react';
import { Card } from '@/components/ui';
import { useAdminProjects } from '@/hooks/admin';
import { useSkills } from '@/hooks/public/use-skills';
import { useExperience } from '@/hooks/public/use-experience';
import { useTestimonials } from '@/hooks/public/use-testimonials';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
        <div>
          <p className="text-2xl font-bold text-text">{value}</p>
          <p className="text-sm text-muted">{label}</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Cartes de statistiques du tableau de bord, dérivées des données réelles.
 */
export function DashboardStats() {
  const { data: projects } = useAdminProjects();
  const { groups } = useSkills();
  const { data: experience } = useExperience();
  const { data: testimonials } = useTestimonials();

  const skillsCount = groups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard icon={<FolderOpen className="h-5 w-5" />} label="Projets" value={projects?.length ?? 0} />
      <StatCard icon={<Code2 className="h-5 w-5" />} label="Compétences" value={skillsCount} />
      <StatCard icon={<Briefcase className="h-5 w-5" />} label="Expériences" value={experience?.length ?? 0} />
      <StatCard icon={<Users className="h-5 w-5" />} label="Témoignages" value={testimonials?.length ?? 0} />
    </div>
  );
}
