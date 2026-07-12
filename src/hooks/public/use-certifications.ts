import { useQuery } from '@tanstack/react-query';
import { certificationService } from '@/services';

/** Liste publique des certifications. */
export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: certificationService.getAll,
  });
}
