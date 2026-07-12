import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select } from '@/components/ui';
import { projectSchema, type ProjectFormValues } from '@/core/schemas';
import { ProjectTechInput } from './ProjectTechInput';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'published', label: 'Publié' },
  { value: 'archived', label: 'Archivé' },
];

// La valeur vide correspond à « non catégorisé » (null côté API).
const CATEGORY_OPTIONS = [
  { value: '', label: 'Non catégorisé' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'api', label: 'API' },
];

const CASE_STUDY_FIELDS = [
  ['problem', 'Problème'],
  ['solution', 'Solution'],
  ['challenge', 'Défi technique'],
  ['result', 'Résultat'],
] as const;

const textareaClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

// Valeurs par défaut d'un formulaire vierge (création).
const EMPTY_VALUES: ProjectFormValues = {
  slug: '',
  title: '',
  tagline: '',
  description: '',
  problem: '',
  solution: '',
  challenge: '',
  result: '',
  architecture: '',
  github_url: '',
  demo_url: '',
  video_url: '',
  cover_image: '',
  category: null,
  is_featured: false,
  status: 'draft',
  sort_order: 0,
  technologies: [],
};

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  onSubmit: (values: ProjectFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

/**
 * Formulaire de création / édition d'un projet (RHF + Zod).
 */
export function ProjectForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
}: ProjectFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { ...EMPTY_VALUES, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Titre" error={errors.title?.message} {...register('title')} />
        <Input label="Slug" error={errors.slug?.message} {...register('slug')} />
      </div>

      <Input label="Tagline" error={errors.tagline?.message} {...register('tagline')} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Description</label>
        <textarea rows={3} className={textareaClass} {...register('description')} />
        {errors.description && (
          <span className="text-sm text-red-500">{errors.description.message}</span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CASE_STUDY_FIELDS.map(([key, label]) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-sm text-dim">{label}</label>
            <textarea rows={2} className={textareaClass} {...register(key)} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Architecture</label>
        <textarea rows={2} className={textareaClass} {...register('architecture')} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Input label="GitHub URL" error={errors.github_url?.message} {...register('github_url')} />
        <Input label="Démo URL" error={errors.demo_url?.message} {...register('demo_url')} />
        <Input label="Vidéo URL" error={errors.video_url?.message} {...register('video_url')} />
      </div>

      <Input
        label="Image de couverture (URL)"
        error={errors.cover_image?.message}
        {...register('cover_image')}
      />

      <div className="grid items-end gap-4 md:grid-cols-3">
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              label="Catégorie"
              options={CATEGORY_OPTIONS}
              value={field.value ?? ''}
              onChange={(value) => field.onChange(value === '' ? null : value)}
              error={errors.category?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              label="Statut"
              options={STATUS_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.status?.message}
            />
          )}
        />
        <Input
          label="Ordre d'affichage"
          type="number"
          error={errors.sort_order?.message}
          {...register('sort_order', { valueAsNumber: true })}
        />
        <label className="flex items-center gap-2 py-2 text-sm text-dim">
          <input
            type="checkbox"
            className="h-4 w-4 accent-primary"
            {...register('is_featured')}
          />
          Mis en avant
        </label>
      </div>

      <ProjectTechInput control={control} register={register} />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
