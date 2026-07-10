import { useState } from 'react';
import { Select, Skeleton } from '@/components/ui';
import { SeoForm } from '@/components/admin/seo/SeoForm';
import { useSeoByPage, useUpdateSeo } from '@/hooks/admin';
import type { SeoSettings } from '@/core/types';
import type { SeoFormValues } from '@/core/schemas';

const PAGES = [
  { value: 'home', label: 'Accueil' },
  { value: 'about', label: 'À propos' },
  { value: 'projects', label: 'Projets' },
  { value: 'services', label: 'Services' },
  { value: 'contact', label: 'Contact' },
];

function mapSeoToForm(seo: SeoSettings): SeoFormValues {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ?? '',
    og_title: seo.og_title ?? '',
    og_description: seo.og_description ?? '',
    og_image: seo.og_image ?? '',
    robots: seo.robots ?? 'index,follow',
  };
}

export function DashboardSeoPage() {
  const [page, setPage] = useState('home');
  const { data: seo, isLoading } = useSeoByPage(page);
  const updateSeo = useUpdateSeo();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">SEO</h2>
        <p className="text-sm text-muted">
          Balises title, description et Open Graph, page par page.
        </p>
      </div>

      <Select label="Page" options={PAGES} value={page} onChange={setPage} />

      {isLoading || !seo ? (
        <Skeleton height="20rem" />
      ) : (
        <SeoForm
          key={page}
          defaultValues={mapSeoToForm(seo)}
          isSubmitting={updateSeo.isPending}
          onSubmit={(values) => updateSeo.mutate({ page, values })}
        />
      )}
    </div>
  );
}
