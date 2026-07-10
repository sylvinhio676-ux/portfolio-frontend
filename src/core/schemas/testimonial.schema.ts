import { z } from 'zod';

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  role: z.string().optional().nullable(),
  content: z.string().min(1, 'Le témoignage est requis'),
  avatar_url: z.string().url().optional().nullable().or(z.literal('')),
  rating: z.number().int().min(1).max(5),
  is_visible: z.boolean(),
  sort_order: z.number().int(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
