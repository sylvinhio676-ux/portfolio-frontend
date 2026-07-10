import { useQuery } from '@tanstack/react-query';
import { skillCategoriesService } from '@/services';

export function useSkillCategories() {
  return useQuery({
    queryKey: ['skill-categories'],
    queryFn: skillCategoriesService.getAll,
  });
}