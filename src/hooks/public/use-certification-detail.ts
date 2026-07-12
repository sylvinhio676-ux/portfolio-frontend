import { useQuery } from '@tanstack/react-query';
import { certificationService } from '@/services';

/** Détail public d'une certification. */
export function useCertificationDetail(id: number) {
  return useQuery({
    queryKey: ['certification', id],
    queryFn: () => certificationService.getById(id),
    enabled: !!id,
  });
}
