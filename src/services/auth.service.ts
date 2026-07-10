import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, LoginCredentials, LoginResponse } from '@/core/types';

export const authService = {
  // Le backend enveloppe la réponse dans { status, message, data } → on désenveloppe.
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ROUTES.AUTH.LOGIN,
      credentials
    );
    return data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ROUTES.AUTH.LOGOUT, {});
  },
};
