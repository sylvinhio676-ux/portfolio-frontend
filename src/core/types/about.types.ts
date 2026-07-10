export interface About {
  id: number;
  name: string;
  title: string;
  location: string | null;
  email: string | null;
  availability: string | null;
  tagline: string | null;
  bio: string;
  philosophy: string | null;
  photo_url: string | null;
  cv_url: string | null;
  stat_projects: number;
  stat_years: number;
  stat_techs: number;
  stat_clients: number;
  hero_cta1_label: string | null;
  hero_cta1_url: string | null;
  hero_cta2_label: string | null;
  hero_cta2_url: string | null;
  updated_at: string;
}