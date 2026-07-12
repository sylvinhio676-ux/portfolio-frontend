import { z } from 'zod';

/**
 * Schéma du formulaire formation (education). On évite `.default()` et
 * `.coerce` pour que les types d'entrée et de sortie soient identiques
 * (sinon le Resolver react-hook-form diverge). Les valeurs initiales sont
 * fournies par le formulaire (EMPTY_VALUES / mapping depuis le détail).
 * Calqué sur project.schema.ts.
 */
export const educationSchema = z
  .object({
    school_name: z.string().min(2, "L'établissement est requis"),
    school_logo: z.string().url().optional().nullable().or(z.literal('')),
    diploma: z.string().min(2, 'Le diplôme est requis'),
    field_of_study: z.string().min(2, "Le domaine d'études est requis"),
    academic_level: z.string().min(1, 'Le niveau académique est requis'),
    description: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    website: z.string().url().optional().nullable().or(z.literal('')),
    start_date: z.string().min(1, 'La date de début est requise'),
    end_date: z.string().optional().nullable().or(z.literal('')),
    is_current: z.boolean(),
    grade: z.string().optional().nullable(),
    mention: z.string().optional().nullable(),
    achievements: z.string().optional().nullable(),
    is_visible: z.boolean(),
    featured: z.boolean(),
    sort_order: z.number().int(),
    // Compétences liées : tableau d'ids de skills existantes.
    skills: z.array(z.number().int()),
  })
  // Une formation terminée doit avoir une date de fin.
  .refine((data) => data.is_current || Boolean(data.end_date && data.end_date.length > 0), {
    message: 'La date de fin est requise pour une formation terminée',
    path: ['end_date'],
  });

export type EducationFormValues = z.infer<typeof educationSchema>;
