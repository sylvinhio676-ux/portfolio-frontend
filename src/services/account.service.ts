import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { PasswordFormValues } from '@/core/schemas';

export const accountService = {
  // --- Admin ---
  // Changement de mot de passe (current_password, password, password_confirmation).
  updatePassword: async (values: PasswordFormValues): Promise<void> => {
    await apiClient.put(API_ROUTES.ACCOUNT.UPDATE_PASSWORD, values);
  },
};
