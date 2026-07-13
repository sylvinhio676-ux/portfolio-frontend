/**
 * Toutes les routes de l'API Laravel, groupées par ressource.
 * Prefixe /api déjà inclus dans VITE_API_URL (voir lib/axios.ts).
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/admin/auth/login',
    LOGOUT: '/admin/auth/logout',
  },
  ABOUT: {
    GET: '/about',
    UPDATE: '/admin/about',
  },
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (slug: string) => `/projects/${slug}`,
    ADMIN_LIST: '/admin/projects',
    ADMIN_CREATE: '/admin/projects',
    ADMIN_UPDATE: (id: number) => `/admin/projects/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/projects/${id}`,
    ADMIN_ADD_IMAGE: (id: number) => `/admin/projects/${id}/images`,
    ADMIN_DELETE_IMAGE: (id: number, imgId: number) =>
      `/admin/projects/${id}/images/${imgId}`,
  },
  EDUCATION: {
    LIST: '/education',
    DETAIL: (id: number) => `/education/${id}`,
    ADMIN_LIST: '/admin/education',
    ADMIN_CREATE: '/admin/education',
    ADMIN_UPDATE: (id: number) => `/admin/education/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/education/${id}`,
    ADMIN_ADD_IMAGE: (id: number) => `/admin/education/${id}/images`,
    ADMIN_DELETE_IMAGE: (id: number, imgId: number) =>
      `/admin/education/${id}/images/${imgId}`,
    ADMIN_ADD_DOCUMENT: (id: number) => `/admin/education/${id}/documents`,
    ADMIN_DELETE_DOCUMENT: (id: number, docId: number) =>
      `/admin/education/${id}/documents/${docId}`,
  },
  CERTIFICATIONS: {
    LIST: '/certifications',
    DETAIL: (id: number) => `/certifications/${id}`,
    ADMIN_LIST: '/admin/certifications',
    ADMIN_CREATE: '/admin/certifications',
    ADMIN_UPDATE: (id: number) => `/admin/certifications/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/certifications/${id}`,
    ADMIN_UPLOAD_BADGE: (id: number) => `/admin/certifications/${id}/badge`,
    ADMIN_ADD_DOCUMENT: (id: number) => `/admin/certifications/${id}/documents`,
    ADMIN_DELETE_DOCUMENT: (id: number, docId: number) =>
      `/admin/certifications/${id}/documents/${docId}`,
  },
  SKILLS: {
    LIST: '/skills',
    ADMIN_LIST: '/admin/skills',
    ADMIN_CREATE: '/admin/skills',
    ADMIN_UPDATE: (id: number) => `/admin/skills/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/skills/${id}`,
  },
  SKILL_CATEGORIES: {
    LIST: '/skill-categories',
    ADMIN_LIST: '/admin/skill-categories',
    ADMIN_CREATE: '/admin/skill-categories',
    ADMIN_UPDATE: (id: number) => `/admin/skill-categories/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/skill-categories/${id}`,
  },
  WORKFLOW_STEPS: {
    LIST: '/workflow-steps',
  },
  SERVICES: {
    LIST: '/services',
    ADMIN_LIST: '/admin/services',
    ADMIN_CREATE: '/admin/services',
    ADMIN_UPDATE: (id: number) => `/admin/services/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/services/${id}`,
  },
  EXPERIENCE: {
    LIST: '/experience',
    ADMIN_CREATE: '/admin/experience',
    ADMIN_UPDATE: (id: number) => `/admin/experience/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/experience/${id}`,
  },
  TESTIMONIALS: {
    LIST: '/testimonials',
    ADMIN_LIST: '/admin/testimonials',
    ADMIN_CREATE: '/admin/testimonials',
    ADMIN_UPDATE: (id: number) => `/admin/testimonials/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/testimonials/${id}`,
  },
  SOCIALS: {
    LIST: '/socials',
    ADMIN_LIST: '/admin/socials',
    ADMIN_CREATE: '/admin/socials',
    ADMIN_UPDATE: (id: number) => `/admin/socials/${id}`,
    ADMIN_DELETE: (id: number) => `/admin/socials/${id}`,
  },
  SEO: {
    GET: (page: string) => `/seo/${page}`,
    ADMIN_UPDATE: (page: string) => `/admin/seo/${page}`,
  },
  CONTACT: {
    SEND: '/contact',
  },
  MEDIA: {
    UPLOAD: '/admin/media/upload',
    DELETE: '/admin/media/delete',
  },
  SETTINGS: {
    GET: '/settings',
    ADMIN_GET: '/admin/settings',
    ADMIN_UPDATE: '/admin/settings',
  },
  ACCOUNT: {
    UPDATE_PASSWORD: '/admin/account/password',
  },
} as const;