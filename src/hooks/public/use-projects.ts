import { useQuery } from '@tanstack/react-query';
import { projectsService } from '@/services';
import type { ProjectFilters } from '@/core/types';

export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => projectsService.getAll(filters),
  });
}