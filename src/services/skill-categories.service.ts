import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, SkillCategory } from '@/core/types';
import type { SkillCategoryFormValues } from '@/core/schemas';

export const skillCategoriesService = {
  getAll: async (): Promise<SkillCategory[]> => {
    const { data } = await apiClient.get<ApiResponse<SkillCategory[]>>(
      API_ROUTES.SKILL_CATEGORIES.LIST
    );
    return data.data;
  },

  // --- Admin ---
  create: async (values: SkillCategoryFormValues): Promise<SkillCategory> => {
    const { data } = await apiClient.post<ApiResponse<SkillCategory>>(
      API_ROUTES.SKILL_CATEGORIES.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  // On omet `slug` à la mise à jour : la règle backend `unique` ne tolère
  // pas le renvoi du slug courant. Le slug reste fixé à la création.
  update: async (
    id: number,
    values: Omit<SkillCategoryFormValues, 'slug'>
  ): Promise<SkillCategory> => {
    const { data } = await apiClient.put<ApiResponse<SkillCategory>>(
      API_ROUTES.SKILL_CATEGORIES.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.SKILL_CATEGORIES.ADMIN_DELETE(id));
  },
};
