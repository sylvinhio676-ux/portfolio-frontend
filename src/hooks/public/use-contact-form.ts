import { useMutation } from '@tanstack/react-query';
import { contactService } from '@/services';
import type { ContactFormValues } from '@/core/schemas';

export function useContactForm() {
  return useMutation({
    mutationFn: (values: ContactFormValues) => contactService.send(values),
  });
}