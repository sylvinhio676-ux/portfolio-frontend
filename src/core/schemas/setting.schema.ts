import { z } from 'zod';

/**
 * Schéma de validation des paramètres globaux.
 * Tous les champs sont optionnels/nullable pour permettre une mise à jour
 * partielle, en cohérence avec les règles `nullable` du backend.
 */
export const settingSchema = z.object({
  // Général
  site_name: z.string().max(255).optional().nullable(),
  logo_url: z.string().max(500).optional().nullable(),
  favicon_url: z.string().max(500).optional().nullable(),
  contact_email: z
    .string()
    .email('Email invalide')
    .max(255)
    .optional()
    .nullable()
    .or(z.literal('')),
  contact_phone: z.string().max(255).optional().nullable(),
  contact_location: z.string().max(255).optional().nullable(),
  is_available: z.boolean().optional(),
  availability_message: z.string().max(255).optional().nullable(),
  maintenance_mode: z.boolean().optional(),
  // Apparence
  theme_default: z.enum(['dark', 'light', 'system']).optional().nullable(),
  primary_color: z.string().max(50).optional().nullable(),
  font_heading: z.string().max(100).optional().nullable(),
  font_body: z.string().max(100).optional().nullable(),
  border_radius: z.string().max(50).optional().nullable(),
  // SEO / Analytics
  analytics_id: z.string().max(255).optional().nullable(),
  search_console_verification: z.string().max(255).optional().nullable(),
  default_og_image: z.string().max(500).optional().nullable(),
  default_robots: z.string().max(255).optional().nullable(),
  sitemap_enabled: z.boolean().optional(),
});

export type SettingFormValues = z.infer<typeof settingSchema>;
