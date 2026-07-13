import { useMutation } from '@tanstack/react-query';
import { accountService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { PasswordFormValues } from '@/core/schemas';

/**
 * Changement de mot de passe du compte admin.
 */
export function useUpdatePassword() {
  const toast = useToast();
  return useMutation({
    mutationFn: (values: PasswordFormValues) => accountService.updatePassword(values),
    onSuccess: () => toast.success('Mot de passe mis à jour.'),
    onError: () => toast.error('Échec du changement de mot de passe.'),
  });
}
