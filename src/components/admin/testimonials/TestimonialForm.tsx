import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/ui';
import { testimonialSchema, type TestimonialFormValues } from '@/core/schemas';

const EMPTY_VALUES: TestimonialFormValues = {
  name: '',
  role: '',
  content: '',
  avatar_url: '',
  rating: 5,
  is_visible: true,
  sort_order: 0,
};

const textareaClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

interface TestimonialFormProps {
  defaultValues?: Partial<TestimonialFormValues>;
  onSubmit: (values: TestimonialFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function TestimonialForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Enregistrer',
}: TestimonialFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { ...EMPTY_VALUES, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Nom" error={errors.name?.message} {...register('name')} />
        <Input label="Rôle / société" error={errors.role?.message} {...register('role')} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Témoignage</label>
        <textarea rows={4} className={textareaClass} {...register('content')} />
        {errors.content && <span className="text-sm text-red-500">{errors.content.message}</span>}
      </div>
      <Input label="Avatar (URL)" error={errors.avatar_url?.message} {...register('avatar_url')} />
      <div className="grid grid-cols-3 items-center gap-4">
        <Input
          label="Note (1-5)"
          type="number"
          error={errors.rating?.message}
          {...register('rating', { valueAsNumber: true })}
        />
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
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
