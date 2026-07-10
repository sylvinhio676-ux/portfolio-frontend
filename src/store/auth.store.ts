// src/store/auth.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthStore, AuthUser } from '@/core/types';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      token: null,
      isAuthenticated: false,
      user: null,

      // Actions
      setToken: (token: string, user?: AuthUser) =>
        set({ token, isAuthenticated: true, user: user || null }),
      clearToken: () =>
        set({ token: null, isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);