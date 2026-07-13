import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, PublicSetting, Setting, SettingInput } from '@/core/types';

export const settingService = {
  // Sous-ensemble public des paramètres.
  getPublic: async (): Promise<PublicSetting> => {
    const { data } = await apiClient.get<ApiResponse<PublicSetting>>(
      API_ROUTES.SETTINGS.GET
    );
    return data.data;
  },

  // --- Admin ---
  adminGet: async (): Promise<Setting> => {
    const { data } = await apiClient.get<ApiResponse<Setting>>(
      API_ROUTES.SETTINGS.ADMIN_GET
    );
    return data.data;
  },

  update: async (input: SettingInput): Promise<Setting> => {
    const { data } = await apiClient.put<ApiResponse<Setting>>(
      API_ROUTES.SETTINGS.ADMIN_UPDATE,
      input
    );
    return data.data;
  },
};
