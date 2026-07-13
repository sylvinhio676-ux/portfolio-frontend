import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { settingService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { SettingInput } from '@/core/types';

/**
 * Lecture des paramètres globaux (vue Admin, tous les champs).
 */
export function useAdminSettings() {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: settingService.adminGet,
  });
}

/**
 * Mise à jour des paramètres globaux, avec invalidation du cache admin + public.
 */
export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: SettingInput) => settingService.update(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Paramètres mis à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour des paramètres.'),
  });
}
