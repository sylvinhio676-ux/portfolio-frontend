import { apiClient } from '../lib/axios';
import { API_ROUTES } from '../core/constants/api.constants';
import type { ApiResponse, Project, ProjectDetail, ProjectFilters } from '../core/types';
import type { ProjectFormValues } from '../core/schemas';

export const projectsService = {
  // --- Public ---
  getAll: async (filters?: ProjectFilters): Promise<Project[]> => {
    const { data } = await apiClient.get<ApiResponse<Project[]>>(
      API_ROUTES.PROJECTS.LIST,
      { params: filters }
    );
    return data.data;
  },

  getBySlug: async (slug: string): Promise<ProjectDetail> => {
    const { data } = await apiClient.get<ApiResponse<ProjectDetail>>(
      API_ROUTES.PROJECTS.DETAIL(slug)
    );
    return data.data;
  },

  // --- Admin (protégé par token Sanctum) ---
  adminList: async (): Promise<Project[]> => {
    const { data } = await apiClient.get<ApiResponse<Project[]>>(
      API_ROUTES.PROJECTS.ADMIN_LIST
    );
    return data.data;
  },

  create: async (values: ProjectFormValues): Promise<ProjectDetail> => {
    const { data } = await apiClient.post<ApiResponse<ProjectDetail>>(
      API_ROUTES.PROJECTS.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  update: async (id: number, values: ProjectFormValues): Promise<ProjectDetail> => {
    const { data } = await apiClient.put<ApiResponse<ProjectDetail>>(
      API_ROUTES.PROJECTS.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.PROJECTS.ADMIN_DELETE(id));
  },

  // Ajout d'images de galerie (upload multipart).
  addImages: async (id: number, files: File[], alts: string[] = []): Promise<void> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images[]', file));
    alts.forEach((alt) => formData.append('alts[]', alt));
    await apiClient.post(API_ROUTES.PROJECTS.ADMIN_ADD_IMAGE(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteImage: async (projectId: number, imageId: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.PROJECTS.ADMIN_DELETE_IMAGE(projectId, imageId));
  },
};
