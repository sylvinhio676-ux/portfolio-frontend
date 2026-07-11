import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, MediaType, UploadedMedia } from '@/core/types';

export const mediaService = {
  // Upload multipart vers Cloudinary via l'API Laravel.
  upload: async (
    file: File,
    folder = 'general',
    type: MediaType = 'image'
  ): Promise<UploadedMedia> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('type', type);

    const { data } = await apiClient.post<ApiResponse<UploadedMedia>>(
      API_ROUTES.MEDIA.UPLOAD,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data.data;
  },

  // Suppression Cloudinary (le body part dans `data` pour une requête DELETE).
  remove: async (publicId: string, resourceType: MediaType = 'image'): Promise<void> => {
    await apiClient.delete(API_ROUTES.MEDIA.DELETE, {
      data: { public_id: publicId, resource_type: resourceType },
    });
  },
};
