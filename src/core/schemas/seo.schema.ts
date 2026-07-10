import { z } from 'zod';

/**
 * Valeurs éditables des réglages SEO d'une page (la clé `page` passe par
 * l'URL, pas par le corps de la requête).
 */
export const seoSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(255),
  description: z.string().min(1, 'La description est requise').max(500),
  keywords: z.string().optional().nullable(),
  og_title: z.string().max(255).optional().nullable(),
  og_description: z.string().max(500).optional().nullable(),
  og_image: z.string().url().optional().nullable().or(z.literal('')),
  robots: z.string(),
});

export type SeoFormValues = z.infer<typeof seoSchema>;
