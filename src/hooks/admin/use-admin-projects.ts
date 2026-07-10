import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectsService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import type { ProjectFormValues } from '@/core/schemas';

const ADMIN_PROJECTS_KEY = ['admin', 'projects'];

/** Liste admin des projets. */
export function useAdminProjects() {
  return useQuery({
    queryKey: ADMIN_PROJECTS_KEY,
    queryFn: projectsService.adminList,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (values: ProjectFormValues) => projectsService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PROJECTS_KEY });
      toast.success('Projet créé.');
    },
    onError: () => toast.error('Échec de la création du projet.'),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: ProjectFormValues }) =>
      projectsService.update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PROJECTS_KEY });
      toast.success('Projet mis à jour.');
    },
    onError: () => toast.error('Échec de la mise à jour du projet.'),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => projectsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PROJECTS_KEY });
      toast.success('Projet supprimé.');
    },
    onError: () => toast.error('Échec de la suppression du projet.'),
  });
}

export function useAddProjectImages() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, files, alts }: { id: number; files: File[]; alts?: string[] }) =>
      projectsService.addImages(id, files, alts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toast.success('Images ajoutées.');
    },
    onError: () => toast.error("Échec de l'ajout des images."),
  });
}

export function useDeleteProjectImage() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ projectId, imageId }: { projectId: number; imageId: number }) =>
      projectsService.deleteImage(projectId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toast.success('Image supprimée.');
    },
    onError: () => toast.error("Échec de la suppression de l'image."),
  });
}
