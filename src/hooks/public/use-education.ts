import { useQuery } from '@tanstack/react-query';
import { educationService } from '@/services';

/** Liste publique des formations. */
export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: educationService.getAll,
  });
}
