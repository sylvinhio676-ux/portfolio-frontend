import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  icon: z.string().optional().nullable(),
  is_visible: z.boolean(),
  sort_order: z.number().int(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
