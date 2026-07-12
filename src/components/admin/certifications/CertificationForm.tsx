import { useForm, Controller, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, Skeleton } from '@/components/ui';
import { cn } from '@/core/helpers';
import { useAdminSkills } from '@/hooks/admin';
import { certificationSchema, type CertificationFormValues } from '@/core/schemas/certification.schema';
import type { CertificationInput } from '@/core/types';
import { CERTIFICATION_LEVEL_OPTIONS, formToInput } from './certification.utils';

const textareaClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

// Valeurs par défaut d'un formulaire vierge (création).
const EMPTY_VALUES: CertificationFormValues = {
  title: '',
  provider: '',
  provider_logo: '',
  category: '',
  credential_id: '',
  issue_date: '',
  expiration_date: '',
  never_expire: false,
  verification_url: '',
  certificate_url: '',
  badge: '',
  description: '',
  duration_hours: null,
  score: '',
  language: '',
  level: '',
  featured: false,
  is_visible: true,
  sort_order: 0,
  skills: [],
};

interface CertificationFormProps {
  defaultValues?: Partial<CertificationFormValues>;
  onSubmit: (values: CertificationInput) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

/**
 * Formulaire de création / édition d'une certification (RHF + Zod).
 */
export function CertificationForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
}: CertificationFormProps) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: { ...EMPTY_VALUES, ...defaultValues },
  });

  const neverExpire = watch('never_expire');

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(formToInput(values)))}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Titre" error={errors.title?.message} {...register('title')} />
        <Input label="Organisme" error={errors.provider?.message} {...register('provider')} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Logo organisme (URL)"
          error={errors.provider_logo?.message}
          {...register('provider_logo')}
        />
        <Input label="Catégorie" error={errors.category?.message} {...register('category')} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Identifiant du certificat"
          error={errors.credential_id?.message}
          {...register('credential_id')}
        />
        <Controller
          control={control}
          name="level"
          render={({ field }) => (
            <Select
              label="Niveau"
              options={[...CERTIFICATION_LEVEL_OPTIONS]}
              value={field.value ?? ''}
              onChange={field.onChange}
              placeholder="Choisir un niveau…"
              error={errors.level?.message}
            />
          )}
        />
      </div>

      <div className="grid items-start gap-4 md:grid-cols-3">
        <Input
          label="Date d'émission"
          type="date"
          error={errors.issue_date?.message}
          {...register('issue_date')}
        />
        <Input
          label="Date d'expiration"
          type="date"
          disabled={neverExpire}
          error={errors.expiration_date?.message}
          {...register('expiration_date')}
        />
        <label className="flex items-center gap-2 py-9 text-sm text-dim">
          <input type="checkbox" className="h-4 w-4 accent-primary" {...register('never_expire')} />
          N'expire jamais
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Description</label>
        <textarea rows={3} className={textareaClass} {...register('description')} />
        {errors.description && (
          <span className="text-sm text-red-500">{errors.description.message}</span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="URL de vérification"
          error={errors.verification_url?.message}
          {...register('verification_url')}
        />
        <Input
          label="URL du certificat"
          error={errors.certificate_url?.message}
          {...register('certificate_url')}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Input
          label="Durée (heures)"
          type="number"
          error={errors.duration_hours?.message}
          {...register('duration_hours', {
            setValueAs: (v) => (v === '' || v === null || v === undefined ? null : Number(v)),
          })}
        />
        <Input label="Score" error={errors.score?.message} {...register('score')} />
        <Input label="Langue" error={errors.language?.message} {...register('language')} />
        <Input
          label="Ordre d'affichage"
          type="number"
          error={errors.sort_order?.message}
          {...register('sort_order', { valueAsNumber: true })}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-dim">
          <input type="checkbox" className="h-4 w-4 accent-primary" {...register('featured')} />
          Mise en vedette
        </label>
        <label className="flex items-center gap-2 text-sm text-dim">
          <input type="checkbox" className="h-4 w-4 accent-primary" {...register('is_visible')} />
          Visible sur le site
        </label>
      </div>

      <SkillsMultiSelect control={control} />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

interface SkillsMultiSelectProps {
  control: Control<CertificationFormValues>;
}

/**
 * Sélecteur multiple de compétences par ids : chaque compétence est un
 * « chip » à bascule. Les données viennent de l'API admin des compétences.
 */
function SkillsMultiSelect({ control }: SkillsMultiSelectProps) {
  const { data: skills, isLoading } = useAdminSkills();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-dim">Compétences associées</label>
      {isLoading ? (
        <Skeleton height="3rem" />
      ) : (
        <Controller
          control={control}
          name="skills"
          render={({ field }) => {
            const selected = field.value;
            const toggle = (id: number) => {
              field.onChange(
                selected.includes(id)
                  ? selected.filter((value) => value !== id)
                  : [...selected, id]
              );
            };

            if (!skills || skills.length === 0) {
              return <p className="text-sm text-faint">Aucune compétence disponible.</p>;
            }

            return (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const active = selected.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggle(skill.id)}
                      className={cn(
                        'rounded-theme border px-2.5 py-1 text-xs font-medium transition-colors',
                        active
                          ? 'border-primary/40 bg-primary/15 text-primary'
                          : 'border-border bg-surface text-muted hover:text-text'
                      )}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            );
          }}
        />
      )}
    </div>
  );
}
