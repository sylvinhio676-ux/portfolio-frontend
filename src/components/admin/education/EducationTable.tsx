import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Eye, EyeOff, GripVertical, Pencil, Star, Trash2 } from 'lucide-react';
import { Badge, Button, Card, Modal } from '@/components/ui';
import { buildCloudinaryUrl, formatExperienceDate } from '@/core/helpers';
import { useDeleteEducation } from '@/hooks/admin/use-admin-education';
import type { Education } from '@/core/types';
import { EDUCATION_ROUTES } from './education.constants';

interface EducationTableProps {
  items: Education[];
  canReorder: boolean;
  onReorder: (activeId: number, overId: number) => void;
  onRequestDelete: (education: Education) => void;
}

/** Ligne triable (dnd) du tableau des formations. */
function SortableRow({
  education,
  canReorder,
  onRequestDelete,
}: {
  education: Education;
  canReorder: boolean;
  onRequestDelete: (education: Education) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: education.id,
    disabled: !canReorder,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-border last:border-0 bg-card"
    >
      <td className="p-4">
        <button
          type="button"
          className="cursor-grab text-faint transition-colors hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!canReorder}
          aria-label="Réordonner"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          {education.school_logo ? (
            <img
              src={buildCloudinaryUrl(education.school_logo, { width: 80 })}
              alt=""
              className="h-10 w-10 rounded object-contain"
            />
          ) : (
            <div className="h-10 w-10 rounded bg-surface" />
          )}
          <div className="flex flex-col">
            <span className="flex items-center gap-1 font-medium text-text">
              {education.school_name}
              {education.featured && <Star className="h-3 w-3 fill-primary text-primary" />}
            </span>
            <span className="text-faint">{education.field_of_study}</span>
          </div>
        </div>
      </td>
      <td className="p-4 text-muted">{education.diploma}</td>
      <td className="p-4 text-muted">
        {formatExperienceDate(education.start_date, education.end_date, education.is_current)}
      </td>
      <td className="p-4">
        <Badge variant={education.is_current ? 'warning' : 'success'}>
          {education.is_current ? 'En cours' : 'Terminée'}
        </Badge>
      </td>
      <td className="p-4">
        {education.is_visible ? (
          <Eye className="h-4 w-4 text-primary" />
        ) : (
          <EyeOff className="h-4 w-4 text-faint" />
        )}
      </td>
      <td className="p-4">
        <div className="flex justify-end gap-2">
          <Button
            to={EDUCATION_ROUTES.edit(education.id)}
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
            onClick={() => onRequestDelete(education)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

/**
 * Vue tableau des formations avec réordonnancement dnd. Calque ProjectsTable
 * (colonnes : logo/établissement, diplôme, période, statut, visible, actions).
 */
export function EducationTable({
  items,
  canReorder,
  onReorder,
  onRequestDelete,
}: EducationTableProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(Number(active.id), Number(over.id));
    }
  };

  return (
    <Card className="overflow-x-auto p-0">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-faint">
            <tr>
              <th className="w-10 p-4" />
              <th className="p-4 font-medium">Établissement</th>
              <th className="p-4 font-medium">Diplôme</th>
              <th className="p-4 font-medium">Période</th>
              <th className="p-4 font-medium">Statut</th>
              <th className="p-4 font-medium">Visible</th>
              <th className="p-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((education) => (
                <SortableRow
                  key={education.id}
                  education={education}
                  canReorder={canReorder}
                  onRequestDelete={onRequestDelete}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </Card>
  );
}

interface DeleteEducationModalProps {
  education: Education | null;
  onClose: () => void;
}

/** Modal de confirmation de suppression, partagée par le tableau et la grille. */
export function DeleteEducationModal({ education, onClose }: DeleteEducationModalProps) {
  const deleteEducation = useDeleteEducation();

  return (
    <Modal isOpen={!!education} onClose={onClose} title="Supprimer la formation ?">
      <p className="text-muted">
        Cette action est irréversible. La formation « {education?.diploma} » à «{' '}
        {education?.school_name} » sera définitivement supprimée.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button
          variant="danger"
          isLoading={deleteEducation.isPending}
          onClick={() => {
            if (education) {
              deleteEducation.mutate(education.id, { onSuccess: onClose });
            }
          }}
        >
          Supprimer
        </Button>
      </div>
    </Modal>
  );
}
