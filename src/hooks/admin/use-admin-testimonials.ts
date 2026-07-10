import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { testimonialsService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { TestimonialFormValues } from '@/core/schemas';

const ADMIN_KEY = ['admin', 'testimonials'];

function useInvalidate() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_KEY });
    queryClient.invalidateQueries({ queryKey: ['testimonials'] });
  };
}

export function useAdminTestimonials() {
  return useQuery({ queryKey: ADMIN_KEY, queryFn: testimonialsService.adminList });
}

export function useCreateTestimonial() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: TestimonialFormValues) => testimonialsService.create(values),
    onSuccess: () => {
      invalidate();
      toast.success('Témoignage créé.');
    },
    onError: () => toast.error('Échec de la création.'),
  });
}

export function useUpdateTestimonial() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: TestimonialFormValues }) =>
      testimonialsService.update(id, values),
    onSuccess: () => {
      invalidate();
      toast.success('Témoignage mis à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour.'),
  });
}

export function useDeleteTestimonial() {
  const invalidate = useInvalidate();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => testimonialsService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success('Témoignage supprimé.');
    },
    onError: () => toast.error('Échec de la suppression.'),
  });
}
