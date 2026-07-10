import { useAuthStore } from '@/store';
import { authService } from '@/services';
import { useNavigate } from 'react-router-dom';
import type { LoginCredentials } from '@/core/types';

export function useAuth() {
  const navigate = useNavigate();
  const { token, isAuthenticated, setToken, clearToken } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    setToken(response.token, response.user);
    navigate('/dashboard');
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignorer les erreurs de logout
    } finally {
      clearToken();
      navigate('/login');
    }
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}