import { useQuery } from '@tanstack/react-query';
import { educationService } from '@/services';

/** Détail public d'une formation. */
export function useEducationDetail(id: number) {
  return useQuery({
    queryKey: ['education', id],
    queryFn: () => educationService.getById(id),
    enabled: !!id,
  });
}
