import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { seoService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { SeoFormValues } from '@/core/schemas';

export function useSeoByPage(page: string) {
  return useQuery({
    queryKey: ['seo', page],
    queryFn: () => seoService.getByPage(page),
    enabled: !!page,
  });
}

export function useUpdateSeo() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ page, values }: { page: string; values: SeoFormValues }) =>
      seoService.update(page, values),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['seo', variables.page] });
      toast.success('Paramètres SEO mis à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour.'),
  });
}
