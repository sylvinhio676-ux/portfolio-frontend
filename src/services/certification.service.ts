import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type {
  ApiResponse,
  Certification,
  CertificationDetail,
  CertificationDocument,
  CertificationInput,
} from '@/core/types';

export const certificationService = {
  // --- Public ---
  getAll: async (): Promise<Certification[]> => {
    const { data } = await apiClient.get<ApiResponse<Certification[]>>(
      API_ROUTES.CERTIFICATIONS.LIST
    );
    return data.data;
  },

  getById: async (id: number): Promise<CertificationDetail> => {
    const { data } = await apiClient.get<ApiResponse<CertificationDetail>>(
      API_ROUTES.CERTIFICATIONS.DETAIL(id)
    );
    return data.data;
  },

  // --- Admin (protégé par token Sanctum) ---
  adminList: async (): Promise<Certification[]> => {
    const { data } = await apiClient.get<ApiResponse<Certification[]>>(
      API_ROUTES.CERTIFICATIONS.ADMIN_LIST
    );
    return data.data;
  },

  create: async (values: CertificationInput): Promise<CertificationDetail> => {
    const { data } = await apiClient.post<ApiResponse<CertificationDetail>>(
      API_ROUTES.CERTIFICATIONS.ADMIN_CREATE,
      values
    );
    return data.data;
  },

  update: async (
    id: number,
    values: CertificationInput
  ): Promise<CertificationDetail> => {
    const { data } = await apiClient.put<ApiResponse<CertificationDetail>>(
      API_ROUTES.CERTIFICATIONS.ADMIN_UPDATE(id),
      values
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(API_ROUTES.CERTIFICATIONS.ADMIN_DELETE(id));
  },

  // Téléversement du badge (upload multipart : champ `badge`). Renvoie le détail à jour.
  uploadBadge: async (id: number, file: File): Promise<CertificationDetail> => {
    const formData = new FormData();
    formData.append('badge', file);
    const { data } = await apiClient.post<ApiResponse<CertificationDetail>>(
      API_ROUTES.CERTIFICATIONS.ADMIN_UPLOAD_BADGE(id),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data.data;
  },

  // Ajout d'un document (upload multipart : champs `document`, `type`, `name`).
  addDocument: async (
    id: number,
    file: File,
    type: string,
    name = ''
  ): Promise<CertificationDocument> => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);
    formData.append('name', name);
    const { data } = await apiClient.post<ApiResponse<CertificationDocument>>(
      API_ROUTES.CERTIFICATIONS.ADMIN_ADD_DOCUMENT(id),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data.data;
  },

  deleteDocument: async (
    certificationId: number,
    documentId: number
  ): Promise<void> => {
    await apiClient.delete(
      API_ROUTES.CERTIFICATIONS.ADMIN_DELETE_DOCUMENT(certificationId, documentId)
    );
  },
};
