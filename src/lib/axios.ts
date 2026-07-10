import axios, { type AxiosError } from 'axios';

// Clé de persistance du store d'auth zustand (source unique du token).
const AUTH_STORAGE_KEY = 'auth-storage';

/**
 * Lit le token directement depuis le state persisté du store d'auth
 * (zustand persist, clé `auth-storage`). On lit le localStorage plutôt
 * que le store lui-même pour éviter une dépendance circulaire
 * (axios ← services ← hooks ← store). C'est la SEULE source de vérité.
 */
export function getAuthToken(): string | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { token?: string | null } };
    return parsed.state?.token ?? null;
  } catch {
    return null;
  }
}

/**
 * Purge le token persisté (utilisé sur 401). Le store d'auth réagit
 * ensuite à l'évènement `auth:unauthorized` pour vider son état complet.
 */
export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Instance Axios pour l'API Laravel.
 * Le token Sanctum est injecté manuellement en Authorization header
 * (le backend renvoie un token dans le body, pas un cookie HTTP-Only).
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Intercepteur de réponse : gère l'expiration/invalidité du token (401).
 * On nettoie le token stocké et on émet un évènement que le store d'auth
 * (Phase 4) écoutera pour vider son état et rediriger vers /admin/login.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);