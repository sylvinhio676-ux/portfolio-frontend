import { z } from 'zod';

/**
 * Schémas compétences. On évite `.coerce`/`.default()` pour garder
 * types d'entrée = sortie (cf. project.schema). Les champs numériques
 * sont enregistrés côté formulaire avec `valueAsNumber`.
 */
export const skillSchema = z.object({
  category_id: z.number().int().positive('Choisis une catégorie'),
  name: z.string().min(1, 'Le nom est requis'),
  logo_url: z.string().url().optional().nullable().or(z.literal('')),
  level: z.number().int().min(0).max(100),
  color: z.string().optional().nullable(),
  is_visible: z.boolean(),
  sort_order: z.number().int(),
});

export type SkillFormValues = z.infer<typeof skillSchema>;

export const skillCategorySchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Uniquement lettres minuscules, chiffres et tirets'),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  sort_order: z.number().int(),
});

export type SkillCategoryFormValues = z.infer<typeof skillCategorySchema>;
