import { useQuery } from '@tanstack/react-query';
import { seoService } from '@/services';

export function useSeo(page: string) {
  return useQuery({
    queryKey: ['seo', page],
    queryFn: () => seoService.getByPage(page),
  });
}