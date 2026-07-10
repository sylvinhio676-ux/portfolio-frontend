import { useQuery } from '@tanstack/react-query';
import { projectsService } from '@/services';

export function useProjectDetail(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectsService.getBySlug(slug),
    enabled: !!slug,
  });
}