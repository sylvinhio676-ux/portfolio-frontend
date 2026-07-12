import { Award, GripVertical, Pencil, Star, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge, Button, Card } from '@/components/ui';
import { buildCloudinaryUrl, formatDateFr } from '@/core/helpers';
import type { Certification } from '@/core/types';
import { CERT_ROUTES, getCertificationStatus } from './certification.utils';

interface CertificationsGridProps {
  certifications: Certification[];
  sortable: boolean;
  onDelete: (cert: Certification) => void;
}

/**
 * Vue cartes des certifications, avec réordonnancement par glisser-déposer
 * quand `sortable` est actif.
 */
export function CertificationsGrid({ certifications, sortable, onDelete }: CertificationsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {certifications.map((cert) => (
        <CertificationCard key={cert.id} cert={cert} sortable={sortable} onDelete={onDelete} />
      ))}
    </div>
  );
}

interface CertificationCardProps {
  cert: Certification;
  sortable: boolean;
  onDelete: (cert: Certification) => void;
}

function CertificationCard({ cert, sortable, onDelete }: CertificationCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: cert.id,
    disabled: !sortable,
  });
  const status = getCertificationStatus(cert);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      data-dragging={isDragging}
    >
      <Card className="flex h-full flex-col gap-4 p-4">
        <div className="flex items-start gap-3">
        {cert.badge ? (
          <img
            src={buildCloudinaryUrl(cert.badge, { width: 96 })}
            alt=""
            className="h-12 w-12 rounded object-contain"
          />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded bg-surface text-faint">
            <Award className="h-6 w-6" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 font-medium text-text">
            <span className="truncate">{cert.title}</span>
            {cert.featured && <Star className="h-3 w-3 shrink-0 fill-primary text-primary" />}
          </p>
          <p className="truncate text-sm text-muted">{cert.provider}</p>
        </div>
        {sortable && (
          <button
            type="button"
            className="cursor-grab text-faint hover:text-text active:cursor-grabbing"
            aria-label="Réordonner"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <span>{formatDateFr(cert.issue_date)}</span>
        {cert.level && <Badge variant="outline">{cert.level}</Badge>}
        {status === 'active' ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Badge variant="danger">Expirée</Badge>
        )}
      </div>

      <div className="mt-auto flex justify-end gap-2">
        <Button to={CERT_ROUTES.edit(cert.id)} size="sm" variant="secondary" aria-label="Modifier">
          <Pencil className="h-4 w-4" />
        </Button>
          <Button
            size="sm"
            variant="secondary"
            className="text-red-500"
            aria-label="Supprimer"
            onClick={() => onDelete(cert)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
