import { z } from 'zod';

/**
 * Schéma expérience. Pas de `.coerce`/`.default()` (types entrée = sortie).
 * Le refine impose une date de fin sauf si c'est le poste actuel.
 */
export const experienceSchema = z
  .object({
    company: z.string().min(1, "Le nom de l'entreprise est requis"),
    role: z.string().min(1, 'Le poste est requis'),
    description: z.string().optional().nullable(),
    start_date: z.string().min(1, 'La date de début est requise'),
    end_date: z.string().optional().nullable().or(z.literal('')),
    is_current: z.boolean(),
    type: z.enum(['job', 'freelance', 'personal', 'academic']),
    sort_order: z.number().int(),
  })
  .refine((data) => data.is_current || !!data.end_date, {
    message: 'La date de fin est requise si ce n’est pas le poste actuel',
    path: ['end_date'],
  });

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
