import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, Experience } from '@/core/types';
import type { ExperienceFormValues } from '@/core/schemas';

export const experienceService = {
  // Liste (publique) — renvoie toutes les expériences, utilisée aussi côté admin.
  getAll: async (): Promise<Experience[]> => {
    const { data } = await apiClient.get<ApiResponse<Experience[]>>(
      API_ROUTES.EXPERIENCE.LIST
    );
    return data.data;
  },

  // --- Admin ---
  create: async (values: ExperienceFormValues): Promise<Experience> => {
    const { data } = await apiClient.post<ApiResponse<Experience>>(
      API_ROUTES.EXPERIENCE.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  update: async (id: number, values: ExperienceFormValues): Promise<Experience> => {
    const { data } = await apiClient.put<ApiResponse<Experience>>(
      API_ROUTES.EXPERIENCE.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.EXPERIENCE.ADMIN_DELETE(id));
  },
};
