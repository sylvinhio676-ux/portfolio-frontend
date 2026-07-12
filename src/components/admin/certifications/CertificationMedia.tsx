import { useRef, useState } from 'react';
import { ExternalLink, FileText, Trash2, Upload } from 'lucide-react';
import { Badge, Button, Card, Select, Skeleton } from '@/components/ui';
import { buildCloudinaryUrl } from '@/core/helpers';
import { useCertificationDetail } from '@/hooks/public/use-certification-detail';
import {
  useAddCertificationDocument,
  useDeleteCertificationDocument,
  useUploadCertificationBadge,
} from '@/hooks/admin';

interface CertificationMediaProps {
  certificationId: number;
}

const DOCUMENT_TYPE_OPTIONS = [
  { value: 'certificate', label: 'Certificat' },
  { value: 'qr', label: 'QR code' },
  { value: 'autre', label: 'Autre' },
];

/**
 * Gestion des médias d'une certification (page d'édition) : badge unique,
 * documents PDF/images typés, et raccourci de vérification.
 */
export function CertificationMedia({ certificationId }: CertificationMediaProps) {
  const { data: detail, isLoading } = useCertificationDetail(certificationId);
  const uploadBadge = useUploadCertificationBadge();
  const addDocument = useAddCertificationDocument();
  const deleteDocument = useDeleteCertificationDocument();

  const badgeInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('certificate');

  const handleBadgeChange = (file: File | undefined) => {
    if (!file) return;
    uploadBadge.mutate(
      { id: certificationId, file },
      {
        onSuccess: () => {
          if (badgeInputRef.current) badgeInputRef.current.value = '';
        },
      }
    );
  };

  const handleAddDocument = () => {
    if (!documentFile) return;
    addDocument.mutate(
      { id: certificationId, file: documentFile, type: documentType, name: documentFile.name },
      {
        onSuccess: () => {
          setDocumentFile(null);
          if (documentInputRef.current) documentInputRef.current.value = '';
        },
      }
    );
  };

  if (isLoading || !detail) {
    return <Skeleton height="16rem" />;
  }

  return (
    <div className="flex flex-col gap-6">
      {detail.links.verification && (
        <div className="flex justify-end">
          <Button href={detail.links.verification} target="_blank" rel="noreferrer" variant="secondary">
            <ExternalLink className="h-4 w-4" />
            Vérifier la certification
          </Button>
        </div>
      )}

      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Badge</h3>
        <div className="flex flex-wrap items-center gap-4">
          {detail.badge ? (
            <img
              src={buildCloudinaryUrl(detail.badge, { width: 160 })}
              alt="Badge de la certification"
              className="h-20 w-20 rounded-theme border border-border object-contain"
            />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-theme border border-dashed border-border text-sm text-faint">
              Aucun
            </span>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={badgeInputRef}
              type="file"
              accept="image/*"
              onChange={(event) => handleBadgeChange(event.target.files?.[0])}
              className="text-sm text-muted file:mr-3 file:rounded-theme file:border-0 file:bg-surface file:px-3 file:py-1.5 file:text-text"
            />
            {uploadBadge.isPending && <span className="text-sm text-muted">Téléversement…</span>}
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-text">Documents</h3>

        <div className="flex flex-col gap-2">
          {detail.documents.length === 0 ? (
            <p className="text-sm text-faint">Aucun document pour le moment.</p>
          ) : (
            detail.documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center gap-3 rounded-theme border border-border bg-surface px-3 py-2"
              >
                <FileText className="h-4 w-4 shrink-0 text-faint" />
                <a
                  href={document.url}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 flex-1 truncate text-sm text-text hover:text-primary"
                >
                  {document.name ?? document.url}
                </a>
                <Badge variant="outline">{document.type}</Badge>
                <button
                  type="button"
                  onClick={() =>
                    deleteDocument.mutate({ certificationId, documentId: document.id })
                  }
                  aria-label="Supprimer le document"
                  className="text-faint transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="w-40">
            <Select
              label="Type"
              options={DOCUMENT_TYPE_OPTIONS}
              value={documentType}
              onChange={setDocumentType}
            />
          </div>
          <input
            ref={documentInputRef}
            type="file"
            accept="application/pdf,image/*"
            onChange={(event) => setDocumentFile(event.target.files?.[0] ?? null)}
            className="text-sm text-muted file:mr-3 file:rounded-theme file:border-0 file:bg-surface file:px-3 file:py-1.5 file:text-text"
          />
          <Button
            type="button"
            onClick={handleAddDocument}
            isLoading={addDocument.isPending}
            disabled={!documentFile}
          >
            <Upload className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </Card>
    </div>
  );
}
