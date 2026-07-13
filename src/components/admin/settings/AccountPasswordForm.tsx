import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Button, Card, Input } from '@/components/ui';
import { passwordSchema, type PasswordFormValues } from '@/core/schemas';
import { useUpdatePassword } from '@/hooks/admin';

/**
 * Forme d'une réponse de validation Laravel (statut 422).
 */
interface LaravelValidationError {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Extrait le message d'erreur backend lié au mot de passe actuel
 * (ex: « Le mot de passe actuel est incorrect. »).
 */
function extractBackendMessage(error: unknown): string | null {
  if (isAxiosError(error)) {
    const data = error.response?.data as LaravelValidationError | undefined;
    return data?.errors?.current_password?.[0] ?? data?.message ?? null;
  }
  return null;
}

/**
 * Onglet « Compte » : changement du mot de passe de l'administrateur.
 * Affiche les erreurs de validation (Zod) et l'erreur backend renvoyée
 * quand le mot de passe actuel est incorrect.
 */
export function AccountPasswordForm() {
  const updatePassword = useUpdatePassword();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = (values: PasswordFormValues) => {
    updatePassword.mutate(values, {
      onSuccess: () => reset(),
      onError: (error) => {
        // On rattache l'erreur backend au champ « mot de passe actuel ».
        setError('current_password', {
          message: extractBackendMessage(error) ?? 'Le mot de passe actuel est incorrect.',
        });
      },
    });
  };

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h3 className="font-heading font-semibold text-text">Mot de passe</h3>
        <p className="text-sm text-muted">
          Choisissez un mot de passe d'au moins 8 caractères.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="password"
          label="Mot de passe actuel"
          error={errors.current_password?.message}
          {...register('current_password')}
        />
        <Input
          type="password"
          label="Nouveau mot de passe"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          type="password"
          label="Confirmer le nouveau mot de passe"
          error={errors.password_confirmation?.message}
          {...register('password_confirmation')}
        />

        <div className="flex justify-end">
          <Button type="submit" isLoading={updatePassword.isPending}>
            Mettre à jour le mot de passe
          </Button>
        </div>
      </form>
    </Card>
  );
}
