import { Copy, Trash2, FileText } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { buildCloudinaryUrl } from '@/core/helpers';
import { useToast } from '@/hooks/use-toast';
import type { UploadedMedia } from '@/core/types';

interface MediaGridProps {
  items: UploadedMedia[];
  onDelete: (publicId: string) => void;
}

export function MediaGrid({ items, onDelete }: MediaGridProps) {
  const toast = useToast();

  const copyUrl = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success('URL copiée.'))
      .catch(() => toast.error('Copie impossible.'));
  };

  if (items.length === 0) {
    return (
      <Card>
        <p className="text-muted">Aucun fichier uploadé dans cette session.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        // Les images renvoient width/height ; un document (raw) non.
        const isImage = item.width !== undefined;
        return (
          <Card key={item.public_id} className="flex flex-col gap-3 p-3">
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-theme border border-border bg-surface">
              {isImage ? (
                <img
                  src={buildCloudinaryUrl(item.url, { width: 400 })}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <FileText className="h-10 w-10 text-faint" />
              )}
            </div>
            <p className="truncate text-xs text-faint" title={item.url}>
              {item.url}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="flex-1"
                onClick={() => copyUrl(item.url)}
              >
                <Copy className="h-4 w-4" />
                Copier l'URL
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="text-red-500"
                aria-label="Supprimer"
                onClick={() => onDelete(item.public_id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
