// src/components/layout/public/PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/public/layout/Header';
import { Footer } from '@/components/public/layout/Footer';
import { MaintenancePage } from '@/pages/MaintenancePage';
import { useSettings } from '@/hooks/public/use-settings';
import { useAuthStore } from '@/store/auth.store';

export function PublicLayout() {
  const { data: settings } = useSettings();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Mode maintenance : on bloque uniquement les visiteurs non connectés.
  // Tant que les settings ne sont pas chargés, on affiche le site normalement
  // pour éviter un flash de l'écran de maintenance.
  if (settings?.maintenance_mode && !isAuthenticated) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}