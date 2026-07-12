import type { Skill } from './skill.types';

/**
 * Image de galerie d'une certification (CertificationImageResource).
 */
export interface CertificationImage {
  id: number;
  url: string;
  public_id: string | null;
  alt: string | null;
  sort_order: number;
}

/**
 * Document rattaché à une certification (CertificationDocumentResource).
 * `type` est un libellé libre (ex. « certificate »).
 */
export interface CertificationDocument {
  id: number;
  type: string;
  url: string;
  public_id: string | null;
  name: string | null;
  sort_order: number;
}

/**
 * Forme renvoyée par l'endpoint liste (CertificationResource) — version
 * allégée sans description/documents/images/liens.
 */
export interface Certification {
  id: number;
  title: string;
  provider: string;
  provider_logo: string | null;
  category: string | null;
  issue_date: string; // ISO date
  expiration_date: string | null;
  never_expire: boolean;
  badge: string | null;
  level: string | null;
  featured: boolean;
  is_visible: boolean;
  sort_order: number;
  skills?: Skill[];
  created_at: string;
}

/**
 * Forme renvoyée par l'endpoint détail (CertificationDetailResource) : les
 * liens de vérification/certificat sont regroupés dans `links`, et les
 * images/documents/compétences sont chargés.
 */
export interface CertificationDetail {
  id: number;
  title: string;
  provider: string;
  provider_logo: string | null;
  category: string | null;
  credential_id: string | null;
  issue_date: string; // ISO date
  expiration_date: string | null;
  never_expire: boolean;
  links: {
    verification: string | null;
    certificate: string | null;
  };
  badge: string | null;
  description: string | null;
  duration_hours: number | null;
  score: string | null;
  language: string | null;
  level: string | null;
  images: CertificationImage[];
  documents: CertificationDocument[];
  skills: Skill[];
  featured: boolean;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Charge utile d'écriture (création/mise à jour) d'une certification.
 * Calquée sur StoreCertificationRequest. Les liens sont fournis à plat
 * (`verification_url`/`certificate_url`), pas dans `links`.
 * `skills` = tableau d'ids de compétences.
 */
export interface CertificationInput {
  title: string;
  provider: string;
  provider_logo: string | null;
  category: string | null;
  credential_id: string | null;
  issue_date: string;
  expiration_date: string | null;
  never_expire: boolean;
  verification_url: string | null;
  certificate_url: string | null;
  badge: string | null;
  description: string | null;
  duration_hours: number | null;
  score: string | null;
  language: string | null;
  level: string | null;
  featured: boolean;
  is_visible: boolean;
  sort_order: number;
  skills: number[];
}
