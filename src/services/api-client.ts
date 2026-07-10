import { API_ROUTES } from '@/core/constants';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  const token = getToken();

  // Utiliser VITE_API_URL depuis .env, pas de /api/v1 prefix
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  // 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('admin_token');
      window.dispatchEvent(new Event('unauthorized'));
    }
    throw new Error(json.message ?? `Erreur HTTP ${response.status}`);
  }

  return json as T;
}

async function upload<T>(endpoint: string, formData: FormData): Promise<T> {
  const token = getToken();
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message ?? `Erreur upload HTTP ${response.status}`);
  }

  return json as T;
}

export const apiClient = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body }),

  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),

  upload,
};

// Export des routes pour les services
export { API_ROUTES };