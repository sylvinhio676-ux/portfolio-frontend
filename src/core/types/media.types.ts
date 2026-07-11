export type MediaType = 'image' | 'raw';

/** Résultat d'un upload Cloudinary (renvoyé par /admin/media/upload). */
export interface UploadedMedia {
  url: string;
  public_id: string;
  width?: number;
  height?: number;
}
