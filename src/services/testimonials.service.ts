import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, Testimonial } from '@/core/types';
import type { TestimonialFormValues } from '@/core/schemas';

export const testimonialsService = {
  getAll: async (): Promise<Testimonial[]> => {
    const { data } = await apiClient.get<ApiResponse<Testimonial[]>>(
      API_ROUTES.TESTIMONIALS.LIST
    );
    return data.data;
  },

  // --- Admin (inclut les témoignages masqués) ---
  adminList: async (): Promise<Testimonial[]> => {
    const { data } = await apiClient.get<ApiResponse<Testimonial[]>>(
      API_ROUTES.TESTIMONIALS.ADMIN_LIST
    );
    return data.data;
  },

  create: async (values: TestimonialFormValues): Promise<Testimonial> => {
    const { data } = await apiClient.post<ApiResponse<Testimonial>>(
      API_ROUTES.TESTIMONIALS.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  update: async (id: number, values: TestimonialFormValues): Promise<Testimonial> => {
    const { data } = await apiClient.put<ApiResponse<Testimonial>>(
      API_ROUTES.TESTIMONIALS.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.TESTIMONIALS.ADMIN_DELETE(id));
  },
};
