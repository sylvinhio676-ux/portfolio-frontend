import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select } from '@/components/ui';
import { skillSchema, type SkillFormValues } from '@/core/schemas';
import type { SkillCategory } from '@/core/types';

interface SkillFormProps {
  categories: SkillCategory[];
  defaultValues?: Partial<SkillFormValues>;
  onSubmit: (values: SkillFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function SkillForm({
  categories,
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
}: SkillFormProps) {
  const emptyValues: SkillFormValues = {
    category_id: categories[0]?.id ?? 0,
    name: '',
    logo_url: '',
    level: 80,
    color: '',
    is_visible: true,
    sort_order: 0,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: { ...emptyValues, ...defaultValues },
  });

  const options = categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="category_id"
        render={({ field }) => (
          <Select
            label="Catégorie"
            options={options}
            value={String(field.value)}
            onChange={(value) => field.onChange(Number(value))}
            error={errors.category_id?.message}
          />
        )}
      />
      <Input label="Nom" error={errors.name?.message} {...register('name')} />
      <Input label="Logo (URL)" error={errors.logo_url?.message} {...register('logo_url')} />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Niveau (0-100)"
          type="number"
          error={errors.level?.message}
          {...register('level', { valueAsNumber: true })}
        />
        <Input label="Couleur (#hex)" error={errors.color?.message} {...register('color')} />
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <Input
          label="Ordre"
          type="number"
          error={errors.sort_order?.message}
          {...register('sort_order', { valueAsNumber: true })}
        />
        <label className="flex items-center gap-2 py-2 text-sm text-dim">
          <input type="checkbox" className="h-4 w-4 accent-primary" {...register('is_visible')} />
          Visible sur le site
        </label>
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
