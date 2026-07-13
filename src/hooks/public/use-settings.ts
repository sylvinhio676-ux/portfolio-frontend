import { useQuery } from '@tanstack/react-query';
import { settingService } from '@/services';

/**
 * Récupère le sous-ensemble public des paramètres globaux.
 */
export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: settingService.getPublic,
  });
}
