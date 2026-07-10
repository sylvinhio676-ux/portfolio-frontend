import { useUIStore } from '../store/ui.store';

/**
 * API ergonomique par-dessus le store — évite d'appeler addToast()
 * avec un objet littéral partout dans les composants.
 */
export function useToast() {
  const addToast = useUIStore((s) => s.addToast);

  return {
    success: (message: string, duration?: number) =>
      addToast({ message, variant: 'success', duration }),
    error: (message: string, duration?: number) =>
      addToast({ message, variant: 'error', duration }),
    info: (message: string, duration?: number) =>
      addToast({ message, variant: 'info', duration }),
    warning: (message: string, duration?: number) =>
      addToast({ message, variant: 'warning', duration }),
  };
}