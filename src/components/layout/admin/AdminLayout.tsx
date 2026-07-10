import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/admin/layout/Sidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/core/constants';

export function AdminLayout() {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);

  // Sur token expiré/invalide (401 émis par l'intercepteur axios),
  // on vide l'état d'auth et on redirige vers la page de connexion.
  useEffect(() => {
    const handleUnauthorized = () => {
      clearToken();
      navigate(ROUTES.auth.login, { replace: true });
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [clearToken, navigate]);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}