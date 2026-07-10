export interface SeoSettings {
  id: number;
  page: string; // 'home' | 'about' | 'projects' | ...
  title: string;
  description: string;
  og_image: string | null;
  keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  robots: string;
}