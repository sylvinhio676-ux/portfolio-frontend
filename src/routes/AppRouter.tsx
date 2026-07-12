import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicLayout } from '@/components/layout/public/PublicLayout';
import { ROUTES } from '@/core/constants';
import { Spinner } from '@/components/ui';

// Pages fréquentes chargées immédiatement (accueil + connexion).
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';

// --- Chargement à la demande (code-splitting) ---
// Layout admin
const AdminLayout = lazy(() =>
  import('@/components/layout/admin/AdminLayout').then((m) => ({ default: m.AdminLayout }))
);

// Pages publiques secondaires
const ProjectsPage = lazy(() =>
  import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
);
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
);
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() =>
  import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

// Pages admin (dashboard)
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const DashboardProjectsPage = lazy(() =>
  import('@/pages/DashboardProjectsPage').then((m) => ({ default: m.DashboardProjectsPage }))
);
const DashboardProjectNewPage = lazy(() =>
  import('@/pages/DashboardProjectNewPage').then((m) => ({ default: m.DashboardProjectNewPage }))
);
const DashboardProjectEditPage = lazy(() =>
  import('@/pages/DashboardProjectEditPage').then((m) => ({ default: m.DashboardProjectEditPage }))
);
const DashboardSkillsPage = lazy(() =>
  import('@/pages/DashboardSkillsPage').then((m) => ({ default: m.DashboardSkillsPage }))
);
const DashboardExperiencePage = lazy(() =>
  import('@/pages/DashboardExperiencePage').then((m) => ({ default: m.DashboardExperiencePage }))
);
const DashboardServicesPage = lazy(() =>
  import('@/pages/DashboardServicesPage').then((m) => ({ default: m.DashboardServicesPage }))
);
const DashboardTestimonialsPage = lazy(() =>
  import('@/pages/DashboardTestimonialsPage').then((m) => ({ default: m.DashboardTestimonialsPage }))
);
const DashboardSocialsPage = lazy(() =>
  import('@/pages/DashboardSocialsPage').then((m) => ({ default: m.DashboardSocialsPage }))
);
const DashboardAboutPage = lazy(() =>
  import('@/pages/DashboardAboutPage').then((m) => ({ default: m.DashboardAboutPage }))
);
const DashboardSeoPage = lazy(() =>
  import('@/pages/DashboardSeoPage').then((m) => ({ default: m.DashboardSeoPage }))
);
const DashboardMediaPage = lazy(() =>
  import('@/pages/DashboardMediaPage').then((m) => ({ default: m.DashboardMediaPage }))
);

// Écran de chargement pendant le fetch d'un chunk de route.
function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
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
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to={ROUTES.public.home} replace />} />
      </Routes>
    </Suspense>
  );
}
