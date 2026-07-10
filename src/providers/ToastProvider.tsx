import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toast';

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}