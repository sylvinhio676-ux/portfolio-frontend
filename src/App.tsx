// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/providers/ToastProvider';
import { AppRouter } from '@/routes/AppRouter';
import { queryClient } from '@/lib/query-client';

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ToastProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;