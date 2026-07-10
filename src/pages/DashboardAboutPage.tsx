import { Skeleton } from '@/components/ui';
import { AboutForm } from '@/components/admin/about/AboutForm';
import { useAdminAbout, useUpdateAbout } from '@/hooks/admin';
import type { About } from '@/core/types';
import type { AboutFormValues } from '@/core/schemas';

function mapAboutToForm(about: About): AboutFormValues {
  return {
    name: about.name,
    title: about.title,
    location: about.location ?? '',
    email: about.email ?? '',
    availability: about.availability ?? '',
    tagline: about.tagline ?? '',
    bio: about.bio,
    philosophy: about.philosophy ?? '',
    photo_url: about.photo_url ?? '',
    cv_url: about.cv_url ?? '',
    stat_projects: about.stat_projects,
    stat_years: about.stat_years,
    stat_techs: about.stat_techs,
    stat_clients: about.stat_clients,
    hero_cta1_label: about.hero_cta1_label ?? '',
    hero_cta1_url: about.hero_cta1_url ?? '',
    hero_cta2_label: about.hero_cta2_label ?? '',
    hero_cta2_url: about.hero_cta2_url ?? '',
  };
}

export function DashboardAboutPage() {
  const { data: about, isLoading } = useAdminAbout();
  const updateAbout = useUpdateAbout();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">À propos</h2>
        <p className="text-sm text-muted">
          Modifiez votre identité, biographie, statistiques et boutons du Hero.
        </p>
      </div>

      {isLoading || !about ? (
        <Skeleton height="24rem" />
      ) : (
        <AboutForm
          defaultValues={mapAboutToForm(about)}
          isSubmitting={updateAbout.isPending}
          onSubmit={(values) => updateAbout.mutate(values)}
        />
      )}
    </div>
  );
}
