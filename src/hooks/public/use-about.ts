import { useQuery } from '@tanstack/react-query';
import { aboutService } from '@/services';

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: aboutService.get,
  });
}