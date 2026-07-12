import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/admin/layout/Sidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/core/constants';

export function AdminLayout() {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearToken();
      navigate(ROUTES.auth.login, { replace: true });
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [clearToken, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-col md:ml-64">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
