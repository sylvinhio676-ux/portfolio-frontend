import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Input } from '@/components/ui';
import { aboutSchema, type AboutFormValues } from '@/core/schemas';

const textareaClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

interface AboutFormProps {
  defaultValues: AboutFormValues;
  onSubmit: (values: AboutFormValues) => void;
  isSubmitting?: boolean;
}

export function AboutForm({ defaultValues, onSubmit, isSubmitting }: AboutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Identité */}
      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Identité</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Nom" error={errors.name?.message} {...register('name')} />
          <Input label="Titre / poste" error={errors.title?.message} {...register('title')} />
          <Input label="Localisation" error={errors.location?.message} {...register('location')} />
          <Input label="Email" error={errors.email?.message} {...register('email')} />
          <Input
            label="Disponibilité"
            error={errors.availability?.message}
            {...register('availability')}
          />
        </div>
      </Card>

      {/* Contenu */}
      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Contenu</h3>
        <Input label="Tagline" error={errors.tagline?.message} {...register('tagline')} />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-dim">Biographie</label>
          <textarea rows={5} className={textareaClass} {...register('bio')} />
          {errors.bio && <span className="text-sm text-red-500">{errors.bio.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-dim">Philosophie (section À propos)</label>
          <textarea rows={3} className={textareaClass} {...register('philosophy')} />
        </div>
      </Card>

      {/* Médias */}
      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Médias</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Photo (URL)" error={errors.photo_url?.message} {...register('photo_url')} />
          <Input label="CV (URL)" error={errors.cv_url?.message} {...register('cv_url')} />
        </div>
      </Card>

      {/* Statistiques */}
      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Statistiques</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label="Projets"
            type="number"
            error={errors.stat_projects?.message}
            {...register('stat_projects', { valueAsNumber: true })}
          />
          <Input
            label="Années"
            type="number"
            error={errors.stat_years?.message}
            {...register('stat_years', { valueAsNumber: true })}
          />
          <Input
            label="Technologies"
            type="number"
            error={errors.stat_techs?.message}
            {...register('stat_techs', { valueAsNumber: true })}
          />
          <Input
            label="Clients"
            type="number"
            error={errors.stat_clients?.message}
            {...register('stat_clients', { valueAsNumber: true })}
          />
        </div>
      </Card>

      {/* Boutons du Hero */}
      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Boutons du Hero</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="CTA 1 — libellé"
            error={errors.hero_cta1_label?.message}
            {...register('hero_cta1_label')}
          />
          <Input
            label="CTA 1 — lien"
            error={errors.hero_cta1_url?.message}
            {...register('hero_cta1_url')}
          />
          <Input
            label="CTA 2 — libellé"
            error={errors.hero_cta2_label?.message}
            {...register('hero_cta2_label')}
          />
          <Input
            label="CTA 2 — lien"
            error={errors.hero_cta2_url?.message}
            {...register('hero_cta2_url')}
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          Enregistrer les modifications
        </Button>
      </div>
    </form>
  );
}
