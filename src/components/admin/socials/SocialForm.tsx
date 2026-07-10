import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/ui';
import { socialSchema, type SocialFormValues } from '@/core/schemas';

const EMPTY_VALUES: SocialFormValues = {
  platform: '',
  url: '',
  icon: '',
  label: '',
  is_visible: true,
  sort_order: 0,
};

interface SocialFormProps {
  defaultValues?: Partial<SocialFormValues>;
  onSubmit: (values: SocialFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function SocialForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
}: SocialFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialFormValues>({
    resolver: zodResolver(socialSchema),
    defaultValues: { ...EMPTY_VALUES, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Plateforme (github, linkedin…)"
          error={errors.platform?.message}
          {...register('platform')}
        />
        <Input label="Libellé (optionnel)" error={errors.label?.message} {...register('label')} />
      </div>
      <Input label="URL" error={errors.url?.message} {...register('url')} />
      <div className="grid grid-cols-2 items-center gap-4">
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
            Visible
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
