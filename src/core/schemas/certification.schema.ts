import { z } from 'zod';

/**
 * Schéma du formulaire certification. Comme pour le schéma projet, on évite
 * `.default()` et `.coerce` afin que les types d'entrée et de sortie restent
 * identiques (sinon le resolver react-hook-form diverge). Les champs nullables
 * du backend sont représentés côté formulaire par une chaîne vide, puis
 * reconvertis en `null` au moment de l'envoi (voir certification.utils).
 */
export const certificationSchema = z.object({
  title: z.string().min(2, 'Le titre est requis'),
  provider: z.string().min(2, "L'organisme est requis"),
  provider_logo: z.string().url('URL invalide').optional().nullable().or(z.literal('')),
  category: z.string().max(120).optional().nullable(),
  credential_id: z.string().max(191).optional().nullable(),
  issue_date: z.string().min(1, "La date d'émission est requise"),
  expiration_date: z.string().optional().nullable(),
  never_expire: z.boolean(),
  verification_url: z.string().url('URL invalide').optional().nullable().or(z.literal('')),
  certificate_url: z.string().url('URL invalide').optional().nullable().or(z.literal('')),
  badge: z.string().url('URL invalide').optional().nullable().or(z.literal('')),
  description: z.string().max(5000).optional().nullable(),
  duration_hours: z.number().int().nonnegative('Doit être positif').nullable(),
  score: z.string().max(120).optional().nullable(),
  language: z.string().max(120).optional().nullable(),
  level: z.string().max(120).optional().nullable(),
  featured: z.boolean(),
  is_visible: z.boolean(),
  sort_order: z.number().int(),
  skills: z.array(z.number().int()),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;
