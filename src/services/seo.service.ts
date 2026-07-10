import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, SeoSettings } from '@/core/types';
import type { SeoFormValues } from '@/core/schemas';

export const seoService = {
  getByPage: async (page: string): Promise<SeoSettings> => {
    const { data } = await apiClient.get<ApiResponse<SeoSettings>>(API_ROUTES.SEO.GET(page));
    return data.data;
  },

  // --- Admin ---
  update: async (page: string, values: SeoFormValues): Promise<SeoSettings> => {
    const { data } = await apiClient.put<ApiResponse<SeoSettings>>(
      API_ROUTES.SEO.ADMIN_UPDATE(page),
      values
    );
    return data.data;
  },
};
