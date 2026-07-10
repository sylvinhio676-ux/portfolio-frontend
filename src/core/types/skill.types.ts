export interface SkillCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

export interface Skill {
  id: number;
  category_id: number;
  category?: SkillCategory;
  name: string;
  logo_url: string | null;
  level: number; // 0-100
  color: string | null;
  is_visible: boolean;
  sort_order: number;
}