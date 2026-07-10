import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { skillCategoriesService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { SkillCategoryFormValues } from '@/core/schemas';

const CATEGORIES_KEY = ['skill-categories'];

function useInvalidateCategories() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
    queryClient.invalidateQueries({ queryKey: ['admin', 'skills'] });
    queryClient.invalidateQueries({ queryKey: ['skills'] });
  };
}

export function useAdminSkillCategories() {
  return useQuery({ queryKey: CATEGORIES_KEY, queryFn: skillCategoriesService.getAll });
}

export function useCreateSkillCategory() {
  const invalidate = useInvalidateCategories();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: SkillCategoryFormValues) => skillCategoriesService.create(values),
    onSuccess: () => {
      invalidate();
      toast.success('Catégorie créée.');
    },
    onError: () => toast.error('Échec de la création de la catégorie.'),
  });
}

export function useUpdateSkillCategory() {
  const invalidate = useInvalidateCategories();
  const toast = useToast();
  return useMutation({
    // On n'envoie pas le slug à la mise à jour (contrainte unique backend).
    mutationFn: ({ id, values }: { id: number; values: Omit<SkillCategoryFormValues, 'slug'> }) =>
      skillCategoriesService.update(id, values),
    onSuccess: () => {
      invalidate();
      toast.success('Catégorie mise à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour.'),
  });
}

export function useDeleteSkillCategory() {
  const invalidate = useInvalidateCategories();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => skillCategoriesService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success('Catégorie supprimée.');
    },
    onError: () => toast.error('Échec de la suppression.'),
  });
}
