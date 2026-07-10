export type ExperienceType = 'job' | 'freelance' | 'personal' | 'academic';

export interface Experience {
  id: number;
  company: string;
  role: string;
  description: string | null;
  start_date: string; // ISO date
  end_date: string | null; // null = poste actuel
  is_current: boolean;
  type: ExperienceType;
  sort_order: number;
}