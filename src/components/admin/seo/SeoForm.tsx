import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/ui';
import { seoSchema, type SeoFormValues } from '@/core/schemas';

const textareaClass =
  'rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint focus:border-primary focus:outline-none transition-colors';

interface SeoFormProps {
  defaultValues: SeoFormValues;
  onSubmit: (values: SeoFormValues) => void;
  isSubmitting?: boolean;
}

export function SeoForm({ defaultValues, onSubmit, isSubmitting }: SeoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SeoFormValues>({
    resolver: zodResolver(seoSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Titre (balise title)" error={errors.title?.message} {...register('title')} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">Meta description</label>
        <textarea rows={3} className={textareaClass} {...register('description')} />
        {errors.description && (
          <span className="text-sm text-red-500">{errors.description.message}</span>
        )}
      </div>

      <Input label="Mots-clés (keywords)" error={errors.keywords?.message} {...register('keywords')} />

      <Input label="OG title" error={errors.og_title?.message} {...register('og_title')} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-dim">OG description</label>
        <textarea rows={2} className={textareaClass} {...register('og_description')} />
      </div>

      <Input label="OG image (URL)" error={errors.og_image?.message} {...register('og_image')} />

      <Input label="Robots" error={errors.robots?.message} {...register('robots')} />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
