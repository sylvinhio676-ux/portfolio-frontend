import { GripVertical, Pencil, Trash2, Star, Award } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge, Button } from '@/components/ui';
import { buildCloudinaryUrl, formatDateFr } from '@/core/helpers';
import type { Certification } from '@/core/types';
import { CERT_ROUTES, getCertificationStatus } from './certification.utils';

interface CertificationsTableProps {
  certifications: Certification[];
  sortable: boolean;
  onDelete: (cert: Certification) => void;
}

/**
 * Vue tableau des certifications (calque ProjectsTable) avec lignes
 * réordonnables par glisser-déposer quand `sortable` est actif.
 */
export function CertificationsTable({ certifications, sortable, onDelete }: CertificationsTableProps) {
  return (
    <div className="overflow-x-auto rounded-theme border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border text-left text-faint">
          <tr>
            {sortable && <th className="w-8 p-4" aria-hidden />}
            <th className="p-4 font-medium">Certification</th>
            <th className="p-4 font-medium">Organisme</th>
            <th className="p-4 font-medium">Émission</th>
            <th className="p-4 font-medium">Niveau</th>
            <th className="p-4 font-medium">Statut</th>
            <th className="p-4 font-medium">Visible</th>
            <th className="p-4 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert) => (
            <CertificationRow
              key={cert.id}
              cert={cert}
              sortable={sortable}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface CertificationRowProps {
  cert: Certification;
  sortable: boolean;
  onDelete: (cert: Certification) => void;
}

function CertificationRow({ cert, sortable, onDelete }: CertificationRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: cert.id,
    disabled: !sortable,
  });
  const status = getCertificationStatus(cert);

  return (
    <tr
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="border-b border-border last:border-0"
      data-dragging={isDragging}
    >
      {sortable && (
        <td className="p-4">
          <button
            type="button"
            className="cursor-grab text-faint hover:text-text active:cursor-grabbing"
            aria-label="Réordonner"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
        </td>
      )}
      <td className="p-4">
        <div className="flex items-center gap-3">
          {cert.badge ? (
            <img
              src={buildCloudinaryUrl(cert.badge, { width: 80 })}
              alt=""
              className="h-10 w-10 rounded object-contain"
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded bg-surface text-faint">
              <Award className="h-5 w-5" />
            </span>
          )}
          <span className="flex items-center gap-1 font-medium text-text">
            {cert.title}
            {cert.featured && <Star className="h-3 w-3 fill-primary text-primary" />}
          </span>
        </div>
      </td>
      <td className="p-4 text-muted">
        <div className="flex items-center gap-2">
          {cert.provider_logo && (
            <img
              src={buildCloudinaryUrl(cert.provider_logo, { width: 48 })}
              alt=""
              className="h-5 w-5 rounded object-contain"
            />
          )}
          {cert.provider}
        </div>
      </td>
      <td className="p-4 text-muted">{formatDateFr(cert.issue_date)}</td>
      <td className="p-4 text-muted">{cert.level ?? '—'}</td>
      <td className="p-4">
        {status === 'active' ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Badge variant="danger">Expirée</Badge>
        )}
      </td>
      <td className="p-4">
        <Badge variant={cert.is_visible ? 'default' : 'outline'}>
          {cert.is_visible ? 'Oui' : 'Non'}
        </Badge>
      </td>
      <td className="p-4">
        <div className="flex justify-end gap-2">
          <Button
            to={CERT_ROUTES.edit(cert.id)}
            size="sm"
            variant="secondary"
            aria-label="Modifier"
          >
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
      </td>
    </tr>
  );
}
