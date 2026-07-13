import { z } from 'zod';

// Autorise une valeur vide, un chemin interne (ex. /projects) ou une URL externe (https://…).
const heroLinkSchema = z
  .string()
  .max(500)
  .refine((v) => v === '' || v.startsWith('/') || /^https?:\/\//i.test(v), {
    message: 'Chemin interne (ex. /projects) ou URL complète (https://…)',
  })
  .optional()
  .nullable();

export const aboutSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  title: z.string().min(2, 'Le titre est requis'),
  location: z.string().max(255).optional().nullable(),
  email: z.string().email('Email invalide').optional().nullable().or(z.literal('')),
  availability: z.string().max(255).optional().nullable(),
  tagline: z.string().max(500).optional().nullable(),
  bio: z.string().min(10, 'La biographie est requise'),
  philosophy: z.string().optional().nullable(),
  photo_url: z.string().url().optional().nullable().or(z.literal('')),
  cv_url: z.string().url().optional().nullable().or(z.literal('')),
  stat_projects: z.number().int().min(0),
  stat_years: z.number().int().min(0),
  stat_techs: z.number().int().min(0),
  stat_clients: z.number().int().min(0),
  hero_cta1_label: z.string().max(100).optional().nullable(),
  hero_cta1_url: heroLinkSchema,
  hero_cta2_label: z.string().max(100).optional().nullable(),
  hero_cta2_url: heroLinkSchema,
});

export type AboutFormValues = z.infer<typeof aboutSchema>;
