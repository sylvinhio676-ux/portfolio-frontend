import { z } from 'zod';

/**
 * Schéma de changement de mot de passe (cf. UpdatePasswordRequest).
 * `password_confirmation` doit être identique à `password` (règle `confirmed`).
 */
export const passwordSchema = z
  .object({
    current_password: z.string().min(1, 'Le mot de passe actuel est requis'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    password_confirmation: z.string().min(1, 'La confirmation est requise'),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['password_confirmation'],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
