import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { experienceService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { ExperienceFormValues } from '@/core/schemas';

const EXPERIENCE_KEY = ['experience'];

function useInvalidateExperience() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: EXPERIENCE_KEY });
}

export function useAdminExperience() {
  return useQuery({ queryKey: EXPERIENCE_KEY, queryFn: experienceService.getAll });
}

export function useCreateExperience() {
  const invalidate = useInvalidateExperience();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: ExperienceFormValues) => experienceService.create(values),
    onSuccess: () => {
      invalidate();
      toast.success('Expérience créée.');
    },
    onError: () => toast.error('Échec de la création.'),
  });
}

export function useUpdateExperience() {
  const invalidate = useInvalidateExperience();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: ExperienceFormValues }) =>
      experienceService.update(id, values),
    onSuccess: () => {
      invalidate();
      toast.success('Expérience mise à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour.'),
  });
}

export function useDeleteExperience() {
  const invalidate = useInvalidateExperience();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => experienceService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success('Expérience supprimée.');
    },
    onError: () => toast.error('Échec de la suppression.'),
  });
}
