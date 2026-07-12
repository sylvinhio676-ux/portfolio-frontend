import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select } from '@/components/ui';
import { educationSchema, type EducationFormValues } from '@/core/schemas/education.schema';
import type { EducationInput } from '@/core/types';
import { EducationSkillsInput } from './EducationSkillsInput';
import { ACADEMIC_LEVEL_OPTIONS, EMPTY_EDUCATION_VALUES, mapFormToInput } from './education.constants';

const textareaClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

interface EducationFormProps {
  defaultValues?: Partial<EducationFormValues>;
  onSubmit: (values: EducationInput) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

/**
 * Formulaire de création / édition d'une formation (RHF + Zod).
 * Émet directement une charge utile EducationInput (mapping form → API).
 */
export function EducationForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
}: EducationFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: { ...EMPTY_EDUCATION_VALUES, ...defaultValues },
  });

  const isCurrent = watch('is_current');

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(mapFormToInput(values)))}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Établissement"
          error={errors.school_name?.message}
          {...register('school_name')}
        />
        <Input
          label="Logo de l'établissement (URL)"
          error={errors.school_logo?.message}
          {...register('school_logo')}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Diplôme" error={errors.diploma?.message} {...register('diploma')} />
        <Input
          label="Domaine d'études"
          error={errors.field_of_study?.message}
          {...register('field_of_study')}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="academic_level"
          render={({ field }) => (
            <Select
              label="Niveau académique"
              options={[...ACADEMIC_LEVEL_OPTIONS]}
              value={field.value}
              onChange={field.onChange}
              error={errors.academic_level?.message}
            />
          )}
        />
        <Input label="Lieu" error={errors.location?.message} {...register('location')} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Description</label>
        <textarea rows={3} className={textareaClass} {...register('description')} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Date de début"
          type="date"
          error={errors.start_date?.message}
          {...register('start_date')}
        />
        <Input
          label="Date de fin"
          type="date"
          disabled={isCurrent}
          error={errors.end_date?.message}
          {...register('end_date')}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-dim">
        <input type="checkbox" className="h-4 w-4 accent-primary" {...register('is_current')} />
        Formation en cours (désactive la date de fin)
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Note / Moyenne" error={errors.grade?.message} {...register('grade')} />
        <Input label="Mention" error={errors.mention?.message} {...register('mention')} />
        <Input label="Site web (URL)" error={errors.website?.message} {...register('website')} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Réalisations / Projets marquants</label>
        <textarea rows={2} className={textareaClass} {...register('achievements')} />
      </div>

      <div className="grid items-end gap-4 md:grid-cols-3">
        <Input
          label="Ordre d'affichage"
          type="number"
          error={errors.sort_order?.message}
          {...register('sort_order', { valueAsNumber: true })}
        />
        <label className="flex items-center gap-2 py-2 text-sm text-dim">
          <input type="checkbox" className="h-4 w-4 accent-primary" {...register('is_visible')} />
          Visible
        </label>
        <label className="flex items-center gap-2 py-2 text-sm text-dim">
          <input type="checkbox" className="h-4 w-4 accent-primary" {...register('featured')} />
          Mise en avant
        </label>
      </div>

      <Controller
        control={control}
        name="skills"
        render={({ field }) => (
          <EducationSkillsInput
            value={field.value}
            onChange={field.onChange}
            error={errors.skills?.message}
          />
        )}
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
