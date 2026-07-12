import { useRef, useState } from 'react';
import { FileText, Trash2, Upload } from 'lucide-react';
import { Button, Card, Select, Skeleton } from '@/components/ui';
import { buildCloudinaryUrl } from '@/core/helpers';
import { useEducationDetail } from '@/hooks/public/use-education-detail';
import {
  useAddEducationDocuments,
  useAddEducationImages,
  useDeleteEducationDocument,
  useDeleteEducationImage,
} from '@/hooks/admin/use-admin-education';

interface EducationMediaUploadProps {
  educationId: number;
}

const DOCUMENT_TYPES = [
  { value: 'diploma', label: 'Diplôme' },
  { value: 'transcript', label: 'Relevé de notes' },
  { value: 'report', label: 'Rapport' },
  { value: 'thesis', label: 'Mémoire' },
  { value: 'other', label: 'Autre' },
];

const DOCUMENT_TYPE_LABEL: Record<string, string> = Object.fromEntries(
  DOCUMENT_TYPES.map((type) => [type.value, type.label])
);

/**
 * Gestion des médias d'une formation : galerie d'images (upload multiple +
 * suppression) et documents PDF typés (mémoire/rapport/diplôme…).
 * Calque ProjectImagesUpload et l'étend aux documents.
 */
export function EducationMediaUpload({ educationId }: EducationMediaUploadProps) {
  const { data: education, isLoading } = useEducationDetail(educationId);
  const addImages = useAddEducationImages();
  const deleteImage = useDeleteEducationImage();
  const addDocuments = useAddEducationDocuments();
  const deleteDocument = useDeleteEducationDocument();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState('diploma');

  const handleImageUpload = () => {
    if (imageFiles.length === 0) return;
    addImages.mutate(
      { id: educationId, files: imageFiles },
      {
        onSuccess: () => {
          setImageFiles([]);
          if (imageInputRef.current) imageInputRef.current.value = '';
        },
      }
    );
  };

  const handleDocumentUpload = () => {
    if (documentFiles.length === 0) return;
    addDocuments.mutate(
      {
        id: educationId,
        files: documentFiles,
        types: documentFiles.map(() => documentType),
        names: documentFiles.map((file) => file.name),
      },
      {
        onSuccess: () => {
          setDocumentFiles([]);
          if (documentInputRef.current) documentInputRef.current.value = '';
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Galerie d'images */}
      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Galerie d'images</h3>

        {isLoading ? (
          <Skeleton height="6rem" />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {(education?.images ?? []).map((image) => (
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
                  onClick={() => deleteImage.mutate({ educationId, imageId: image.id })}
                  aria-label="Supprimer l'image"
                  className="absolute right-1 top-1 rounded bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {(education?.images ?? []).length === 0 && (
              <p className="text-sm text-faint">Aucune image dans la galerie.</p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => setImageFiles(Array.from(event.target.files ?? []))}
            className="text-sm text-muted file:mr-3 file:rounded-theme file:border-0 file:bg-surface file:px-3 file:py-1.5 file:text-text"
          />
          <Button
            type="button"
            onClick={handleImageUpload}
            isLoading={addImages.isPending}
            disabled={imageFiles.length === 0}
          >
            <Upload className="h-4 w-4" />
            Uploader
          </Button>
        </div>
      </Card>

      {/* Documents PDF */}
      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Documents</h3>

        {isLoading ? (
          <Skeleton height="4rem" />
        ) : (
          <div className="flex flex-col gap-2">
            {(education?.documents ?? []).map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between gap-3 rounded-theme border border-border bg-surface/40 px-3 py-2"
              >
                <a
                  href={document.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-w-0 items-center gap-2 text-sm text-text hover:text-primary"
                >
                  <FileText className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">{document.name ?? document.url}</span>
                  <span className="shrink-0 text-xs text-faint">
                    {DOCUMENT_TYPE_LABEL[document.type] ?? document.type}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => deleteDocument.mutate({ educationId, documentId: document.id })}
                  aria-label="Supprimer le document"
                  className="p-1 text-faint transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {(education?.documents ?? []).length === 0 && (
              <p className="text-sm text-faint">Aucun document rattaché.</p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-end gap-3">
          <div className="w-48">
            <Select
              label="Type de document"
              options={DOCUMENT_TYPES}
              value={documentType}
              onChange={setDocumentType}
            />
          </div>
          <input
            ref={documentInputRef}
            type="file"
            multiple
            accept="application/pdf"
            onChange={(event) => setDocumentFiles(Array.from(event.target.files ?? []))}
            className="text-sm text-muted file:mr-3 file:rounded-theme file:border-0 file:bg-surface file:px-3 file:py-1.5 file:text-text"
          />
          <Button
            type="button"
            onClick={handleDocumentUpload}
            isLoading={addDocuments.isPending}
            disabled={documentFiles.length === 0}
          >
            <Upload className="h-4 w-4" />
            Uploader
          </Button>
        </div>
      </Card>
    </div>
  );
}
