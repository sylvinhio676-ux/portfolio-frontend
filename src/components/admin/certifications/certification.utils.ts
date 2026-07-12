import type { CertificationFormValues } from '@/core/schemas/certification.schema';
import type { Certification, CertificationDetail, CertificationInput } from '@/core/types';

/**
 * Routes du workspace certifications. Déclarées ici (et non dans
 * routes.constants) pour garder l'ajout du module confiné à son dossier ;
 * le routeur applicatif est câblé séparément.
 */
export const CERT_ROUTES = {
  list: '/dashboard/certifications',
  new: '/dashboard/certifications/new',
  edit: (id: string | number) => `/dashboard/certifications/${id}`,
} as const;

/** Niveaux proposés pour une certification. */
export const CERTIFICATION_LEVEL_OPTIONS = [
  { value: 'Débutant', label: 'Débutant' },
  { value: 'Intermédiaire', label: 'Intermédiaire' },
  { value: 'Avancé', label: 'Avancé' },
  { value: 'Expert', label: 'Expert' },
] as const;

/** Statut dérivé d'une certification. */
export type CertificationStatus = 'active' | 'expired';

/**
 * Une certification est active si elle n'expire jamais ou si sa date
 * d'expiration est dans le futur ; expirée sinon.
 */
export function getCertificationStatus(cert: Certification): CertificationStatus {
  if (cert.never_expire || !cert.expiration_date) return 'active';
  return new Date(cert.expiration_date).getTime() >= Date.now() ? 'active' : 'expired';
}

// Convertit une chaîne vide en null (les champs nullables du backend).
function orNull(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

/**
 * Transforme les valeurs du formulaire en charge utile d'écriture.
 * `expiration_date` est forcée à null quand la certification n'expire jamais.
 */
export function formToInput(values: CertificationFormValues): CertificationInput {
  return {
    title: values.title.trim(),
    provider: values.provider.trim(),
    provider_logo: orNull(values.provider_logo),
    category: orNull(values.category),
    credential_id: orNull(values.credential_id),
    issue_date: values.issue_date,
    expiration_date: values.never_expire ? null : orNull(values.expiration_date),
    never_expire: values.never_expire,
    verification_url: orNull(values.verification_url),
    certificate_url: orNull(values.certificate_url),
    badge: orNull(values.badge),
    description: orNull(values.description),
    duration_hours: values.duration_hours ?? null,
    score: orNull(values.score),
    language: orNull(values.language),
    level: orNull(values.level),
    featured: values.featured,
    is_visible: values.is_visible,
    sort_order: values.sort_order,
    skills: values.skills,
  };
}

/**
 * Mappe la forme « détail » (liens imbriqués) vers les valeurs du formulaire.
 * Les champs null sont ramenés à '' pour les inputs contrôlés.
 */
export function detailToForm(detail: CertificationDetail): CertificationFormValues {
  return {
    title: detail.title,
    provider: detail.provider,
    provider_logo: detail.provider_logo ?? '',
    category: detail.category ?? '',
    credential_id: detail.credential_id ?? '',
    issue_date: detail.issue_date,
    expiration_date: detail.expiration_date ?? '',
    never_expire: detail.never_expire,
    verification_url: detail.links.verification ?? '',
    certificate_url: detail.links.certificate ?? '',
    badge: detail.badge ?? '',
    description: detail.description ?? '',
    duration_hours: detail.duration_hours,
    score: detail.score ?? '',
    language: detail.language ?? '',
    level: detail.level ?? '',
    featured: detail.featured,
    is_visible: detail.is_visible,
    sort_order: detail.sort_order,
    skills: detail.skills.map((skill) => skill.id),
  };
}

/**
 * Construit une charge utile d'écriture complète à partir du détail — utilisé
 * pour persister un simple changement d'ordre sans écraser les autres champs.
 */
export function detailToInput(detail: CertificationDetail): CertificationInput {
  return {
    title: detail.title,
    provider: detail.provider,
    provider_logo: detail.provider_logo,
    category: detail.category,
    credential_id: detail.credential_id,
    issue_date: detail.issue_date,
    expiration_date: detail.expiration_date,
    never_expire: detail.never_expire,
    verification_url: detail.links.verification,
    certificate_url: detail.links.certificate,
    badge: detail.badge,
    description: detail.description,
    duration_hours: detail.duration_hours,
    score: detail.score,
    language: detail.language,
    level: detail.level,
    featured: detail.featured,
    is_visible: detail.is_visible,
    sort_order: detail.sort_order,
    skills: detail.skills.map((skill) => skill.id),
  };
}
