import { useQuery } from '@tanstack/react-query';
import { socialsService } from '@/services';

export function useSocials() {
  return useQuery({
    queryKey: ['socials'],
    queryFn: socialsService.getAll,
  });
}