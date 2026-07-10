import type { ProjectImage } from '@/core/types';
import { buildCloudinaryUrl } from '@/core/helpers';

interface ProjectGalleryProps {
  images: ProjectImage[];
}

/**
 * Galerie d'images d'un projet (rien si aucune image).
 */
export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 font-heading text-xl font-bold text-text">Galerie</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => {
          const src = buildCloudinaryUrl(image.url, { width: 800, format: 'auto' });
          return (
            <div
              key={image.id}
              className="overflow-hidden rounded-theme border border-border"
            >
              <img
                src={src}
                alt={image.alt ?? ''}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
