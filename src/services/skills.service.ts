import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, Skill } from '@/core/types';
import type { SkillFormValues } from '@/core/schemas';

export const skillsService = {
  // Liste publique des compétences (toutes catégories confondues).
  getAll: async (): Promise<Skill[]> => {
    const { data } = await apiClient.get<ApiResponse<Skill[]>>(API_ROUTES.SKILLS.LIST);
    return data.data;
  },

  // --- Admin ---
  adminList: async (): Promise<Skill[]> => {
    const { data } = await apiClient.get<ApiResponse<Skill[]>>(API_ROUTES.SKILLS.ADMIN_LIST);
    return data.data;
  },

  create: async (values: SkillFormValues): Promise<Skill> => {
    const { data } = await apiClient.post<ApiResponse<Skill>>(
      API_ROUTES.SKILLS.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  update: async (id: number, values: SkillFormValues): Promise<Skill> => {
    const { data } = await apiClient.put<ApiResponse<Skill>>(
      API_ROUTES.SKILLS.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.SKILLS.ADMIN_DELETE(id));
  },
};
