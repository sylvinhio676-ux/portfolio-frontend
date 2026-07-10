import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select } from '@/components/ui';
import { experienceSchema, type ExperienceFormValues } from '@/core/schemas';

const TYPE_OPTIONS = [
  { value: 'job', label: 'Emploi' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'personal', label: 'Projet' },
  { value: 'academic', label: 'Formation' },
];

const EMPTY_VALUES: ExperienceFormValues = {
  company: '',
  role: '',
  description: '',
  start_date: '',
  end_date: '',
  is_current: false,
  type: 'job',
  sort_order: 0,
};

const textareaClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

interface ExperienceFormProps {
  defaultValues?: Partial<ExperienceFormValues>;
  onSubmit: (values: ExperienceFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ExperienceForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
}: ExperienceFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { ...EMPTY_VALUES, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Entreprise" error={errors.company?.message} {...register('company')} />
        <Input label="Poste" error={errors.role?.message} {...register('role')} />
      </div>

      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Select
            label="Type"
            options={TYPE_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={errors.type?.message}
          />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date de début"
          type="date"
          error={errors.start_date?.message}
          {...register('start_date')}
        />
        <Input
          label="Date de fin"
          type="date"
          error={errors.end_date?.message}
          {...register('end_date')}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-dim">
        <input type="checkbox" className="h-4 w-4 accent-primary" {...register('is_current')} />
        Poste actuel
      </label>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Description</label>
        <textarea rows={3} className={textareaClass} {...register('description')} />
      </div>

      <Input
        label="Ordre d'affichage"
        type="number"
        error={errors.sort_order?.message}
        {...register('sort_order', { valueAsNumber: true })}
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
