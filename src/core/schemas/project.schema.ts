import { z } from 'zod';

const projectTechnologySchema = z.object({
  name: z.string().min(1),
  color: z.string().optional().nullable(),
});

/**
 * Schéma du formulaire projet. On évite `.default()` et `.coerce` pour que
 * les types d'entrée et de sortie soient identiques (sinon le Resolver
 * react-hook-form diverge). Les valeurs initiales sont fournies par le
 * formulaire (EMPTY_VALUES / mapping depuis le détail).
 */
export const projectSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Uniquement lettres minuscules, chiffres et tirets'),
  title: z.string().min(2, 'Le titre est requis'),
  tagline: z.string().max(255).optional().nullable(),
  description: z.string().min(10, 'La description est requise'),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  challenge: z.string().optional().nullable(),
  result: z.string().optional().nullable(),
  architecture: z.string().optional().nullable(),
  github_url: z.string().url().optional().nullable().or(z.literal('')),
  demo_url: z.string().url().optional().nullable().or(z.literal('')),
  video_url: z.string().url().optional().nullable().or(z.literal('')),
  cover_image: z.string().url().optional().nullable().or(z.literal('')),
  is_featured: z.boolean(),
  status: z.enum(['draft', 'published', 'archived']),
  sort_order: z.number().int(),
  technologies: z.array(projectTechnologySchema),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
