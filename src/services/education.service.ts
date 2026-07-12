import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type {
  ApiResponse,
  Education,
  EducationDetail,
  EducationInput,
} from '@/core/types';

export const educationService = {
  // --- Public ---
  getAll: async (): Promise<Education[]> => {
    const { data } = await apiClient.get<ApiResponse<Education[]>>(
      API_ROUTES.EDUCATION.LIST
    );
    return data.data;
  },

  getById: async (id: number): Promise<EducationDetail> => {
    const { data } = await apiClient.get<ApiResponse<EducationDetail>>(
      API_ROUTES.EDUCATION.DETAIL(id)
    );
    return data.data;
  },

  // --- Admin (protégé par token Sanctum) ---
  adminList: async (): Promise<Education[]> => {
    const { data } = await apiClient.get<ApiResponse<Education[]>>(
      API_ROUTES.EDUCATION.ADMIN_LIST
    );
    return data.data;
  },

  create: async (values: EducationInput): Promise<EducationDetail> => {
    const { data } = await apiClient.post<ApiResponse<EducationDetail>>(
      API_ROUTES.EDUCATION.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  update: async (id: number, values: EducationInput): Promise<EducationDetail> => {
    const { data } = await apiClient.put<ApiResponse<EducationDetail>>(
      API_ROUTES.EDUCATION.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.EDUCATION.ADMIN_DELETE(id));
  },

  // Ajout d'images de galerie (upload multipart : champs `images[]`, `alts[]`).
  addImages: async (id: number, files: File[], alts: string[] = []): Promise<void> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images[]', file));
    alts.forEach((alt) => formData.append('alts[]', alt));
    await apiClient.post(API_ROUTES.EDUCATION.ADMIN_ADD_IMAGE(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteImage: async (educationId: number, imageId: number): Promise<void> => {
    await apiClient.delete(
      API_ROUTES.EDUCATION.ADMIN_DELETE_IMAGE(educationId, imageId)
    );
  },

  // Ajout de documents (upload multipart : champs `documents[]`, `types[]`, `names[]`).
  addDocuments: async (
    id: number,
    files: File[],
    types: string[] = [],
    names: string[] = []
  ): Promise<void> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('documents[]', file));
    types.forEach((type) => formData.append('types[]', type));
    names.forEach((name) => formData.append('names[]', name));
    await apiClient.post(API_ROUTES.EDUCATION.ADMIN_ADD_DOCUMENT(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteDocument: async (educationId: number, documentId: number): Promise<void> => {
    await apiClient.delete(
      API_ROUTES.EDUCATION.ADMIN_DELETE_DOCUMENT(educationId, documentId)
    );
  },
};
