import type { Skill } from './skill.types';

/**
 * Image de galerie d'une formation (EducationImageResource).
 */
export interface EducationImage {
  id: number;
  url: string;
  public_id: string | null;
  alt: string | null;
  sort_order: number;
}

/**
 * Document rattaché à une formation — diplôme, relevé de notes…
 * (EducationDocumentResource). `type` est un libellé libre (ex. « diploma »).
 */
export interface EducationDocument {
  id: number;
  type: string;
  url: string;
  public_id: string | null;
  name: string | null;
  sort_order: number;
}

/**
 * Forme renvoyée par l'endpoint liste (EducationResource) — version allégée
 * sans description/documents/images.
 */
export interface Education {
  id: number;
  school_name: string;
  school_logo: string | null;
  diploma: string;
  field_of_study: string;
  academic_level: string;
  location: string | null;
  start_date: string; // ISO date
  end_date: string | null; // null = formation en cours
  is_current: boolean;
  grade: string | null;
  mention: string | null;
  is_visible: boolean;
  featured: boolean;
  sort_order: number;
  skills?: Skill[];
  created_at: string;
}

/**
 * Forme renvoyée par l'endpoint détail (EducationDetailResource) : inclut la
 * description complète, les images, les documents et les compétences liées.
 */
export interface EducationDetail {
  id: number;
  school_name: string;
  school_logo: string | null;
  diploma: string;
  field_of_study: string;
  academic_level: string;
  description: string | null;
  location: string | null;
  website: string | null;
  start_date: string; // ISO date
  end_date: string | null;
  is_current: boolean;
  grade: string | null;
  mention: string | null;
  achievements: string | null;
  images: EducationImage[];
  documents: EducationDocument[];
  skills: Skill[];
  is_visible: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Charge utile d'écriture (création/mise à jour) d'une formation.
 * Calquée sur StoreEducationRequest. `skills` = tableau d'ids de compétences.
 */
export interface EducationInput {
  school_name: string;
  school_logo: string | null;
  diploma: string;
  field_of_study: string;
  academic_level: string;
  description: string | null;
  location: string | null;
  website: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  grade: string | null;
  mention: string | null;
  achievements: string | null;
  is_visible: boolean;
  featured: boolean;
  sort_order: number;
  skills: number[];
}
