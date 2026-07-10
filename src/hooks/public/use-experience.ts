import { useQuery } from '@tanstack/react-query';
import { experienceService } from '@/services';

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: experienceService.getAll,
  });
}