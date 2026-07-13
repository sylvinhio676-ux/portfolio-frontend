// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/providers/ToastProvider';
import { AppRouter } from '@/routes/AppRouter';
import { SettingsEffects } from '@/components/SettingsEffects';
import { queryClient } from '@/lib/query-client';

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        {/* Effets globaux pilotés par les paramètres publics (couleur, thème, GA). */}
        <SettingsEffects />
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