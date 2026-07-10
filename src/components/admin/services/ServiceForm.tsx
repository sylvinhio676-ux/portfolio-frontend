import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/ui';
import { serviceSchema, type ServiceFormValues } from '@/core/schemas';

const EMPTY_VALUES: ServiceFormValues = {
  title: '',
  description: '',
  icon: '',
  is_visible: true,
  sort_order: 0,
};

const textareaClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

interface ServiceFormProps {
  defaultValues?: Partial<ServiceFormValues>;
  onSubmit: (values: ServiceFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ServiceForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
}: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { ...EMPTY_VALUES, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Titre" error={errors.title?.message} {...register('title')} />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Description</label>
        <textarea rows={3} className={textareaClass} {...register('description')} />
        {errors.description && (
          <span className="text-sm text-red-500">{errors.description.message}</span>
        )}
      </div>
      <Input label="Icône (nom Lucide)" error={errors.icon?.message} {...register('icon')} />
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
