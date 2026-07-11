import { useMutation } from '@tanstack/react-query';
import { mediaService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { MediaType } from '@/core/types';

export function useUploadMedia() {
  const toast = useToast();
  return useMutation({
    mutationFn: ({ file, folder, type }: { file: File; folder?: string; type?: MediaType }) =>
      mediaService.upload(file, folder, type),
    onSuccess: () => toast.success('Fichier uploadé.'),
    onError: () => toast.error("Échec de l'upload (vérifie la config Cloudinary)."),
  });
}

export function useDeleteMedia() {
  const toast = useToast();
  return useMutation({
    mutationFn: ({ publicId, resourceType }: { publicId: string; resourceType?: MediaType }) =>
      mediaService.remove(publicId, resourceType),
    onSuccess: () => toast.success('Fichier supprimé.'),
    onError: () => toast.error('Échec de la suppression.'),
  });
}
