import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, About } from '@/core/types';
import type { AboutFormValues } from '@/core/schemas';

export const aboutService = {
  get: async (): Promise<About> => {
    const { data } = await apiClient.get<ApiResponse<About>>(API_ROUTES.ABOUT.GET);
    return data.data;
  },

  // --- Admin ---
  update: async (values: AboutFormValues): Promise<About> => {
    const { data } = await apiClient.put<ApiResponse<About>>(API_ROUTES.ABOUT.UPDATE, values);
    return data.data;
  },
};
