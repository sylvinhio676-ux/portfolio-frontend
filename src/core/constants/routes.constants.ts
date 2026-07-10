// src/core/constants/routes.constants.ts
export const ROUTES = {
  public: {
    home: '/',
    projects: '/projects',
    projectDetail: (slug: string) => `/projects/${slug}`,
    about: '/about',
    services: '/services',
    contact: '/contact',
  },
  auth: {
    login: '/login',
  },
  admin: {
    dashboard: '/dashboard',
    projects: '/dashboard/projects',
    projectNew: '/dashboard/projects/new',
    projectEdit: (id: string | number) => `/dashboard/projects/${id}`,
    skills: '/dashboard/skills',
    experience: '/dashboard/experience',
    services: '/dashboard/services',
    testimonials: '/dashboard/testimonials',
    socials: '/dashboard/socials',
    about: '/dashboard/about',
    appearance: '/dashboard/appearance',
    seo: '/dashboard/seo',
    media: '/dashboard/media',
  },
} as const;