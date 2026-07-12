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
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Eye, EyeOff, GripVertical, Pencil, Star, Trash2 } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import { buildCloudinaryUrl, formatExperienceDate } from '@/core/helpers';
import type { Education } from '@/core/types';
import { EDUCATION_ROUTES } from './education.constants';

interface EducationGridProps {
  items: Education[];
  canReorder: boolean;
  onReorder: (activeId: number, overId: number) => void;
  onRequestDelete: (education: Education) => void;
}

/** Carte formation triable (dnd). */
function SortableCard({
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
    <div ref={setNodeRef} style={style}>
      <Card className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {education.school_logo ? (
              <img
                src={buildCloudinaryUrl(education.school_logo, { width: 96 })}
                alt=""
                className="h-12 w-12 rounded object-contain"
              />
            ) : (
              <div className="h-12 w-12 rounded bg-surface" />
            )}
            <div className="flex flex-col">
              <span className="flex items-center gap-1 font-medium text-text">
                {education.school_name}
                {education.featured && <Star className="h-3 w-3 fill-primary text-primary" />}
              </span>
              <span className="text-xs text-faint">{education.academic_level}</span>
            </div>
          </div>
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
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium text-text">{education.diploma}</span>
          <span className="text-sm text-muted">{education.field_of_study}</span>
          <span className="text-sm text-faint">
            {formatExperienceDate(education.start_date, education.end_date, education.is_current)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={education.is_current ? 'warning' : 'success'}>
              {education.is_current ? 'En cours' : 'Terminée'}
            </Badge>
            {education.is_visible ? (
              <Eye className="h-4 w-4 text-primary" />
            ) : (
              <EyeOff className="h-4 w-4 text-faint" />
            )}
          </div>
          <div className="flex gap-2">
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
        </div>
      </Card>
    </div>
  );
}

/** Vue grille des formations (cartes) avec réordonnancement dnd. */
export function EducationGrid({
  items,
  canReorder,
  onReorder,
  onRequestDelete,
}: EducationGridProps) {
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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((education) => (
            <SortableCard
              key={education.id}
              education={education}
              canReorder={canReorder}
              onRequestDelete={onRequestDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
