import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicLayout } from '@/components/layout/public/PublicLayout';
import { AdminLayout } from '@/components/layout/admin/AdminLayout';
import { ROUTES } from '@/core/constants';

// Pages publiques
import {
  HomePage,
  ProjectsPage,
  ProjectDetailPage,
  AboutPage,
  ServicesPage,
  ContactPage,
} from '@/pages';

// Pages admin
import {
  LoginPage,
  DashboardPage,
  DashboardProjectsPage,
  DashboardProjectNewPage,
  DashboardProjectEditPage,
  DashboardSkillsPage,
  DashboardExperiencePage,
  DashboardServicesPage,
  DashboardTestimonialsPage,
  DashboardSocialsPage,
  DashboardAboutPage,
  DashboardSeoPage,
  DashboardMediaPage,
  // DashboardAppearancePage,
} from '@/pages';

export function AppRouter() {
  return (
    <Routes>
      {/* Routes publiques avec layout public */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.public.home} element={<HomePage />} />
        <Route path={ROUTES.public.projects} element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path={ROUTES.public.about} element={<AboutPage />} />
        <Route path={ROUTES.public.services} element={<ServicesPage />} />
        <Route path={ROUTES.public.contact} element={<ContactPage />} />
      </Route>

      {/* Login (sans layout) */}
      <Route path={ROUTES.auth.login} element={<LoginPage />} />

      {/* Routes admin protégées avec layout admin */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.admin.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.admin.projects} element={<DashboardProjectsPage />} />
          <Route path={ROUTES.admin.projectNew} element={<DashboardProjectNewPage />} />
          <Route path="/dashboard/projects/:id" element={<DashboardProjectEditPage />} />
          <Route path={ROUTES.admin.skills} element={<DashboardSkillsPage />} />
          <Route path={ROUTES.admin.experience} element={<DashboardExperiencePage />} />
          <Route path={ROUTES.admin.services} element={<DashboardServicesPage />} />
          <Route path={ROUTES.admin.testimonials} element={<DashboardTestimonialsPage />} />
          <Route path={ROUTES.admin.socials} element={<DashboardSocialsPage />} />
          <Route path={ROUTES.admin.about} element={<DashboardAboutPage />} />
          <Route path={ROUTES.admin.seo} element={<DashboardSeoPage />} />
          <Route path={ROUTES.admin.media} element={<DashboardMediaPage />} />
        </Route>
        {/* Apparence : géré côté frontend (thème), pas de CRUD backend.
        <Route path={ROUTES.admin.appearance} element={<DashboardAppearancePage />} /> */}
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to={ROUTES.public.home} replace />} />
    </Routes>
  );
}