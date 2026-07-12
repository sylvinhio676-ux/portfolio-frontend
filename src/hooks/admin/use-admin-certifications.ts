import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { certificationService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { CertificationInput } from '@/core/types';

const ADMIN_CERTIFICATIONS_KEY = ['admin', 'certifications'];

/** Liste admin des certifications. */
export function useAdminCertifications() {
  return useQuery({
    queryKey: ADMIN_CERTIFICATIONS_KEY,
    queryFn: certificationService.adminList,
  });
}

export function useCreateCertification() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: CertificationInput) => certificationService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_CERTIFICATIONS_KEY });
      toast.success('Certification créée.');
    },
    onError: () => toast.error('Échec de la création de la certification.'),
  });
}

export function useUpdateCertification() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: CertificationInput }) =>
      certificationService.update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_CERTIFICATIONS_KEY });
      toast.success('Certification mise à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour de la certification.'),
  });
}

export function useDeleteCertification() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => certificationService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_CERTIFICATIONS_KEY });
      toast.success('Certification supprimée.');
    },
    onError: () => toast.error('Échec de la suppression de la certification.'),
  });
}

export function useUploadCertificationBadge() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) =>
      certificationService.uploadBadge(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certification'] });
      queryClient.invalidateQueries({ queryKey: ADMIN_CERTIFICATIONS_KEY });
      toast.success('Badge mis à jour.');
    },
    onError: () => toast.error('Échec du téléversement du badge.'),
  });
}

export function useAddCertificationDocument() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({
      id,
      file,
      type,
      name,
    }: {
      id: number;
      file: File;
      type: string;
      name?: string;
    }) => certificationService.addDocument(id, file, type, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certification'] });
      toast.success('Document ajouté.');
    },
    onError: () => toast.error("Échec de l'ajout du document."),
  });
}

export function useDeleteCertificationDocument() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ certificationId, documentId }: { certificationId: number; documentId: number }) =>
      certificationService.deleteDocument(certificationId, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certification'] });
      toast.success('Document supprimé.');
    },
    onError: () => toast.error('Échec de la suppression du document.'),
  });
}
