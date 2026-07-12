import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { educationService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { EducationInput } from '@/core/types';

const ADMIN_EDUCATION_KEY = ['admin', 'education'];

/** Liste admin des formations. */
export function useAdminEducation() {
  return useQuery({
    queryKey: ADMIN_EDUCATION_KEY,
    queryFn: educationService.adminList,
  });
}

export function useCreateEducation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: EducationInput) => educationService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_EDUCATION_KEY });
      toast.success('Formation créée.');
    },
    onError: () => toast.error('Échec de la création de la formation.'),
  });
}

export function useUpdateEducation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: EducationInput }) =>
      educationService.update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_EDUCATION_KEY });
      toast.success('Formation mise à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour de la formation.'),
  });
}

export function useDeleteEducation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => educationService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_EDUCATION_KEY });
      toast.success('Formation supprimée.');
    },
    onError: () => toast.error('Échec de la suppression de la formation.'),
  });
}

export function useAddEducationImages() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, files, alts }: { id: number; files: File[]; alts?: string[] }) =>
      educationService.addImages(id, files, alts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
      toast.success('Images ajoutées.');
    },
    onError: () => toast.error("Échec de l'ajout des images."),
  });
}

export function useDeleteEducationImage() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ educationId, imageId }: { educationId: number; imageId: number }) =>
      educationService.deleteImage(educationId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
      toast.success('Image supprimée.');
    },
    onError: () => toast.error("Échec de la suppression de l'image."),
  });
}

export function useAddEducationDocuments() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({
      id,
      files,
      types,
      names,
    }: {
      id: number;
      files: File[];
      types?: string[];
      names?: string[];
    }) => educationService.addDocuments(id, files, types, names),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
      toast.success('Documents ajoutés.');
    },
    onError: () => toast.error("Échec de l'ajout des documents."),
  });
}

export function useDeleteEducationDocument() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ educationId, documentId }: { educationId: number; documentId: number }) =>
      educationService.deleteDocument(educationId, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
      toast.success('Document supprimé.');
    },
    onError: () => toast.error('Échec de la suppression du document.'),
  });
}
