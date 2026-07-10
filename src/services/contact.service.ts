import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse } from '@/core/types';
import type { ContactFormValues } from '@/core/schemas';

export const contactService = {
  send: async (payload: ContactFormValues): Promise<void> => {
    await apiClient.post<ApiResponse<null>>(API_ROUTES.CONTACT.SEND, payload);
  },
};