import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, Social } from '@/core/types';
import type { SocialFormValues } from '@/core/schemas';

export const socialsService = {
  // Liste publique des réseaux sociaux visibles.
  getAll: async (): Promise<Social[]> => {
    const { data } = await apiClient.get<ApiResponse<Social[]>>(API_ROUTES.SOCIALS.LIST);
    return data.data;
  },

  // --- Admin (inclut les liens masqués) ---
  adminList: async (): Promise<Social[]> => {
    const { data } = await apiClient.get<ApiResponse<Social[]>>(API_ROUTES.SOCIALS.ADMIN_LIST);
    return data.data;
  },

  create: async (values: SocialFormValues): Promise<Social> => {
    const { data } = await apiClient.post<ApiResponse<Social>>(
      API_ROUTES.SOCIALS.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  update: async (id: number, values: SocialFormValues): Promise<Social> => {
    const { data } = await apiClient.put<ApiResponse<Social>>(
      API_ROUTES.SOCIALS.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.SOCIALS.ADMIN_DELETE(id));
  },
};
