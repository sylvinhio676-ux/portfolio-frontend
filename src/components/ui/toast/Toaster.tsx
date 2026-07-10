import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { useUIStore } from '../../../store/ui.store';

/**
 * À monter une seule fois (dans ToastProvider). Portal vers document.body
 * pour échapper à tout overflow:hidden d'un layout parent.
 */
export function Toaster() {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-100 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>,
    document.body
  );
}