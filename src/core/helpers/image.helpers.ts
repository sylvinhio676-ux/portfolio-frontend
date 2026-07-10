type CloudinaryTransform = {
  width?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp';
};

/**
 * Injecte des transformations Cloudinary dans une URL existante,
 * pour respecter l'objectif Lighthouse Performance > 95.
 * N'agit que sur des URLs Cloudinary ; renvoie l'URL telle quelle sinon.
 */
export function buildCloudinaryUrl(
  url: string | null | undefined,
  transform: CloudinaryTransform = { quality: 'auto', format: 'auto' }
): string {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com')) return url;

  const parts: string[] = [];
  if (transform.width) parts.push(`w_${transform.width}`);
  if (transform.quality) parts.push(`q_${transform.quality}`);
  if (transform.format) parts.push(`f_${transform.format}`);

  const transformString = parts.join(',');
  return url.replace('/upload/', `/upload/${transformString}/`);
}