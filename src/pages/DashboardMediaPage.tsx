import { useState } from 'react';
import { MediaUploader } from '@/components/admin/media/MediaUploader';
import { MediaGrid } from '@/components/admin/media/MediaGrid';
import { useDeleteMedia } from '@/hooks/admin';
import type { UploadedMedia } from '@/core/types';

export function DashboardMediaPage() {
  const [items, setItems] = useState<UploadedMedia[]>([]);
  const deleteMedia = useDeleteMedia();

  const handleDelete = (publicId: string) => {
    const media = items.find((item) => item.public_id === publicId);
    const resourceType = media?.width !== undefined ? 'image' : 'raw';
    deleteMedia.mutate(
      { publicId, resourceType },
      { onSuccess: () => setItems((prev) => prev.filter((item) => item.public_id !== publicId)) }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">Médias</h2>
        <p className="text-sm text-muted">
          Uploadez des fichiers (Cloudinary) et copiez leur URL pour les réutiliser dans vos contenus.
        </p>
      </div>

      <MediaUploader onUploaded={(media) => setItems((prev) => [media, ...prev])} />
      <MediaGrid items={items} onDelete={handleDelete} />

      <p className="text-xs text-faint">
        Note : la bibliothèque n'affiche que les fichiers uploadés durant cette session (pas de
        stockage en base de données).
      </p>
    </div>
  );
}
