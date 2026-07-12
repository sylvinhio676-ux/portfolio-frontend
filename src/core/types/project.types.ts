export type ProjectStatus = 'draft' | 'published' | 'archived';

export type ProjectCategory = 'web' | 'mobile' | 'api';

export interface ProjectImage {
  id: number;
  project_id: number;
  url: string;
  alt: string | null;
  sort_order: number;
}

export interface ProjectTechnology {
  id: number;
  project_id: number;
  name: string;
  color: string | null;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  problem: string | null;
  solution: string | null;
  challenge: string | null;
  result: string | null;
  architecture: string | null;
  github_url: string | null;
  demo_url: string | null;
  video_url: string | null;
  cover_image: string | null;
  category: ProjectCategory | null;
  is_featured: boolean;
  status: ProjectStatus;
  sort_order: number;
  images?: ProjectImage[];
  technologies?: ProjectTechnology[];
  created_at: string;
  updated_at: string;
}

export interface ProjectFilters {
  technology?: string;
}

/**
 * Forme renvoyée par l'endpoint détail (ProjectDetailResource) : les liens
 * sont regroupés dans `links` et les images sont toujours chargées.
 */
export interface ProjectDetail {
  id: number;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  problem: string | null;
  solution: string | null;
  challenge: string | null;
  result: string | null;
  architecture: string | null;
  links: {
    github: string | null;
    demo: string | null;
    video: string | null;
  };
  cover_image: string | null;
  category: ProjectCategory | null;
  images: ProjectImage[];
  technologies: ProjectTechnology[];
  is_featured: boolean;
  status: ProjectStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}