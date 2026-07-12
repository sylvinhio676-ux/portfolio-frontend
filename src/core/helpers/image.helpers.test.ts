import { describe, it, expect } from 'vitest';
import { buildCloudinaryUrl } from '@/core/helpers/image.helpers';

describe('buildCloudinaryUrl', () => {
  it('renvoie une chaîne vide pour null/undefined', () => {
    expect(buildCloudinaryUrl(null)).toBe('');
    expect(buildCloudinaryUrl(undefined)).toBe('');
  });

  it('renvoie les URLs non-Cloudinary inchangées', () => {
    const url = 'https://images.unsplash.com/photo-123';
    expect(buildCloudinaryUrl(url)).toBe(url);
  });

  it('injecte les transformations dans une URL Cloudinary', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/v123/sample.jpg';
    const out = buildCloudinaryUrl(url, { width: 400, quality: 'auto', format: 'auto' });
    expect(out).toContain('/upload/w_400,q_auto,f_auto/');
    expect(out).toContain('res.cloudinary.com');
  });
});
