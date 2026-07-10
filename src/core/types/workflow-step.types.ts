export interface WorkflowStep {
  id: number;
  title: string;
  description: string | null;
  icon: string | null; // nom d'icône Lucide
  is_visible: boolean;
  sort_order: number;
}
