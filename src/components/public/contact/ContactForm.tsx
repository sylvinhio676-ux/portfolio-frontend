import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/ui';
import { contactSchema, type ContactFormValues } from '@/core/schemas';
import { useContactForm } from '@/hooks/public/use-contact-form';
import { useToast } from '@/hooks/use-toast';

/**
 * Formulaire de contact : validation Zod (RHF) + envoi via l'API Laravel.
 */
export function ContactForm() {
  const toast = useToast();
  const mutation = useContactForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success('Message envoyé, merci !');
        reset();
      },
      onError: () => toast.error("L'envoi a échoué, réessayez."),
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        label="Nom"
        placeholder="Votre nom"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="Email"
        type="email"
        placeholder="vous@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Sujet"
        placeholder="Sujet du message"
        error={errors.subject?.message}
        {...register('subject')}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm text-dim">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Votre message…"
          className="rounded-theme border border-border bg-surface px-3 py-2 text-text transition-colors placeholder:text-faint focus:border-primary focus:outline-none"
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <span className="text-sm text-red-500">{errors.message.message}</span>
        )}
      </div>

      <Button type="submit" isLoading={mutation.isPending} className="w-full">
        Envoyer le message
      </Button>
    </form>
  );
}
