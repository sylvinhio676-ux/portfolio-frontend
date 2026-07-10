import { useRef, useState } from 'react';
import { Trash2, Upload } from 'lucide-react';
import { Button, Card, Skeleton } from '@/components/ui';
import { buildCloudinaryUrl } from '@/core/helpers';
import { useProjectDetail } from '@/hooks/public/use-project-detail';
import { useAddProjectImages, useDeleteProjectImage } from '@/hooks/admin';

interface ProjectImagesUploadProps {
  projectId: number;
  slug: string;
}

/**
 * Gestion de la galerie d'un projet : upload de nouvelles images + suppression.
 */
export function ProjectImagesUpload({ projectId, slug }: ProjectImagesUploadProps) {
  const { data: project, isLoading } = useProjectDetail(slug);
  const addImages = useAddProjectImages();
  const deleteImage = useDeleteProjectImage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = () => {
    if (files.length === 0) return;
    addImages.mutate(
      { id: projectId, files },
      {
        onSuccess: () => {
          setFiles([]);
          if (inputRef.current) inputRef.current.value = '';
        },
      }
    );
  };

  return (
    <Card className="flex flex-col gap-4">
      <h3 className="font-heading font-semibold text-text">Galerie d'images</h3>

      {isLoading ? (
        <Skeleton height="6rem" />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(project?.images ?? []).map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-theme border border-border"
            >
              <img
                src={buildCloudinaryUrl(image.url, { width: 300 })}
                alt={image.alt ?? ''}
                className="h-24 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => deleteImage.mutate({ projectId, imageId: image.id })}
                aria-label="Supprimer l'image"
                className="absolute right-1 top-1 rounded bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
          {(project?.images ?? []).length === 0 && (
            <p className="text-sm text-faint">Aucune image dans la galerie.</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          className="text-sm text-muted file:mr-3 file:rounded-theme file:border-0 file:bg-surface file:px-3 file:py-1.5 file:text-text"
        />
        <Button
          type="button"
          onClick={handleUpload}
          isLoading={addImages.isPending}
          disabled={files.length === 0}
        >
          <Upload className="h-4 w-4" />
          Uploader
        </Button>
      </div>
    </Card>
  );
}
