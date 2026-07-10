import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/core/constants';

export function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.auth.login} replace />;
  }

  return <Outlet />;
}