import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { skillsService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { SkillFormValues } from '@/core/schemas';

const ADMIN_SKILLS_KEY = ['admin', 'skills'];

// Rafraîchit à la fois l'admin et les données publiques (site).
function useInvalidateSkills() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_SKILLS_KEY });
    queryClient.invalidateQueries({ queryKey: ['skills'] });
  };
}

export function useAdminSkills() {
  return useQuery({ queryKey: ADMIN_SKILLS_KEY, queryFn: skillsService.adminList });
}

export function useCreateSkill() {
  const invalidate = useInvalidateSkills();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: SkillFormValues) => skillsService.create(values),
    onSuccess: () => {
      invalidate();
      toast.success('Compétence créée.');
    },
    onError: () => toast.error('Échec de la création.'),
  });
}

export function useUpdateSkill() {
  const invalidate = useInvalidateSkills();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: SkillFormValues }) =>
      skillsService.update(id, values),
    onSuccess: () => {
      invalidate();
      toast.success('Compétence mise à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour.'),
  });
}

export function useDeleteSkill() {
  const invalidate = useInvalidateSkills();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => skillsService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success('Compétence supprimée.');
    },
    onError: () => toast.error('Échec de la suppression.'),
  });
}
