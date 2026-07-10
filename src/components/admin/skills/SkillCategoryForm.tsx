import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/ui';
import { skillCategorySchema, type SkillCategoryFormValues } from '@/core/schemas';

const EMPTY_VALUES: SkillCategoryFormValues = {
  name: '',
  slug: '',
  description: '',
  icon: '',
  sort_order: 0,
};

interface SkillCategoryFormProps {
  defaultValues?: Partial<SkillCategoryFormValues>;
  onSubmit: (values: SkillCategoryFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  /** En édition, le slug n'est pas modifiable (contrainte unique backend). */
  isEdit?: boolean;
}

export function SkillCategoryForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
  isEdit,
}: SkillCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillCategoryFormValues>({
    resolver: zodResolver(skillCategorySchema),
    defaultValues: { ...EMPTY_VALUES, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Nom" error={errors.name?.message} {...register('name')} />
      <Input
        label="Slug"
        readOnly={isEdit}
        error={errors.slug?.message}
        {...register('slug')}
      />
      <Input label="Icône (nom Lucide, optionnel)" error={errors.icon?.message} {...register('icon')} />
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
