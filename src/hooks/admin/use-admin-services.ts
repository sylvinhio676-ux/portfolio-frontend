import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { servicesService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { ServiceFormValues } from '@/core/schemas';

const ADMIN_KEY = ['admin', 'services'];

function useInvalidate() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_KEY });
    queryClient.invalidateQueries({ queryKey: ['services'] });
  };
}

export function useAdminServices() {
  return useQuery({ queryKey: ADMIN_KEY, queryFn: servicesService.adminList });
}

export function useCreateService() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: ServiceFormValues) => servicesService.create(values),
    onSuccess: () => {
      invalidate();
      toast.success('Service créé.');
    },
    onError: () => toast.error('Échec de la création.'),
  });
}

export function useUpdateService() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: ServiceFormValues }) =>
      servicesService.update(id, values),
    onSuccess: () => {
      invalidate();
      toast.success('Service mis à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour.'),
  });
}

export function useDeleteService() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => servicesService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success('Service supprimé.');
    },
    onError: () => toast.error('Échec de la suppression.'),
  });
}
