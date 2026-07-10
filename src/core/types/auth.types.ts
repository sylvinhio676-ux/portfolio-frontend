import type { AuthUser } from './api.types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: AuthUser;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export interface AuthActions {
  setToken: (token: string, user?: AuthUser) => void;
  clearToken: () => void;
}

export type AuthStore = AuthState & AuthActions;