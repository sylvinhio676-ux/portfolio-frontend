import { z } from 'zod';

export const socialSchema = z.object({
  platform: z.string().min(1, 'La plateforme est requise'),
  url: z.string().url("L'URL n'est pas valide"),
  icon: z.string().optional().nullable(),
  label: z.string().optional().nullable(),
  is_visible: z.boolean(),
  sort_order: z.number().int(),
});

export type SocialFormValues = z.infer<typeof socialSchema>;
