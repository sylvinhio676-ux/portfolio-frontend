import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, Service } from '@/core/types';
import type { ServiceFormValues } from '@/core/schemas';

export const servicesService = {
  // Liste publique des services proposés.
  getAll: async (): Promise<Service[]> => {
    const { data } = await apiClient.get<ApiResponse<Service[]>>(API_ROUTES.SERVICES.LIST);
    return data.data;
  },

  // --- Admin (inclut les services masqués) ---
  adminList: async (): Promise<Service[]> => {
    const { data } = await apiClient.get<ApiResponse<Service[]>>(API_ROUTES.SERVICES.ADMIN_LIST);
    return data.data;
  },

  create: async (values: ServiceFormValues): Promise<Service> => {
    const { data } = await apiClient.post<ApiResponse<Service>>(
      API_ROUTES.SERVICES.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  update: async (id: number, values: ServiceFormValues): Promise<Service> => {
    const { data } = await apiClient.put<ApiResponse<Service>>(
      API_ROUTES.SERVICES.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.SERVICES.ADMIN_DELETE(id));
  },
};
