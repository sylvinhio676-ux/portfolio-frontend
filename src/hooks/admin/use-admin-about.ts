import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aboutService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { AboutFormValues } from '@/core/schemas';

export function useAdminAbout() {
  return useQuery({ queryKey: ['about'], queryFn: aboutService.get });
}

export function useUpdateAbout() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: AboutFormValues) => aboutService.update(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
      toast.success('Informations « À propos » mises à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour.'),
  });
}
