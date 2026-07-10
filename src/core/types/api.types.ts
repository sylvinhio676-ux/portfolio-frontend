/**
 * Enveloppe standard de toutes les réponses de l'API Laravel.
 */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

/**
 * Forme d'une erreur de validation Laravel (422).
 */
export interface ApiErrorResponse {
  status: 'error';
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Utilisateur admin — un seul compte existe .
 */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponseData {
  user: AuthUser;
  token: string;
}