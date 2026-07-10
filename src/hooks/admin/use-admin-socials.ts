import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { socialsService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { SocialFormValues } from '@/core/schemas';

const ADMIN_KEY = ['admin', 'socials'];

function useInvalidate() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_KEY });
    queryClient.invalidateQueries({ queryKey: ['socials'] });
  };
}

export function useAdminSocials() {
  return useQuery({ queryKey: ADMIN_KEY, queryFn: socialsService.adminList });
}

export function useCreateSocial() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: SocialFormValues) => socialsService.create(values),
    onSuccess: () => {
      invalidate();
      toast.success('Réseau social créé.');
    },
    onError: () => toast.error('Échec de la création.'),
  });
}

export function useUpdateSocial() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: SocialFormValues }) =>
      socialsService.update(id, values),
    onSuccess: () => {
      invalidate();
      toast.success('Réseau social mis à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour.'),
  });
}

export function useDeleteSocial() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => socialsService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success('Réseau social supprimé.');
    },
    onError: () => toast.error('Échec de la suppression.'),
  });
}
