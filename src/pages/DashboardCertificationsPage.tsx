import { useEffect, useMemo, useState } from 'react';
import { LayoutGrid, List, Plus, Search } from 'lucide-react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Card, Input, Modal, Select, Skeleton } from '@/components/ui';
import { certificationService } from '@/services';
import {
  useAdminCertifications,
  useDeleteCertification,
  useUpdateCertification,
} from '@/hooks/admin';
import type { Certification } from '@/core/types';
import {
  CERTIFICATION_LEVEL_OPTIONS,
  CERT_ROUTES,
  CertificationMedia,
  CertificationsGrid,
  CertificationsKpis,
  CertificationsTable,
  detailToInput,
  getCertificationStatus,
} from '@/components/admin/certifications';

// `CertificationMedia` n'est pas utilisé ici mais réexporté par le barrel ;
// on référence les composants réellement employés ci-dessous.
void CertificationMedia;

type ViewMode = 'table' | 'grid';
type SortKey = 'sort_order' | 'issue_date' | 'title';
type StatusFilter = '' | 'active' | 'expired';

const SORT_OPTIONS = [
  { value: 'sort_order', label: 'Ordre manuel' },
  { value: 'issue_date', label: "Date d'émission" },
  { value: 'title', label: 'Titre' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'Tous les statuts' },
  { value: 'active', label: 'Actives' },
  { value: 'expired', label: 'Expirées' },
];

/**
 * Workspace admin des certifications : KPI, barre d'outils (recherche,
 * filtres, tri, bascule tableau/cartes) et réordonnancement par drag & drop.
 */
export function DashboardCertificationsPage() {
  const { data, isLoading, isError } = useAdminCertifications();
  const deleteCertification = useDeleteCertification();
  const updateCertification = useUpdateCertification();

  // Copie locale pour un réordonnancement optimiste avant persistance.
  const [items, setItems] = useState<Certification[]>([]);
  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const [view, setView] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState<StatusFilter>('');
  const [sortKey, setSortKey] = useState<SortKey>('sort_order');
  const [toDelete, setToDelete] = useState<Certification | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Options de catégories dérivées de la liste.
  const categoryOptions = useMemo(() => {
    const unique = Array.from(
      new Set(items.map((cert) => cert.category).filter((value): value is string => !!value))
    );
    return [
      { value: '', label: 'Toutes catégories' },
      ...unique.map((value) => ({ value, label: value })),
    ];
  }, [items]);

  const levelOptions = [{ value: '', label: 'Tous niveaux' }, ...CERTIFICATION_LEVEL_OPTIONS];

  // Recherche + filtres appliqués.
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((cert) => {
      const matchesSearch =
        term === '' ||
        cert.title.toLowerCase().includes(term) ||
        cert.provider.toLowerCase().includes(term) ||
        (cert.category ?? '').toLowerCase().includes(term);
      const matchesCategory = category === '' || cert.category === category;
      const matchesLevel = level === '' || cert.level === level;
      const matchesStatus = status === '' || getCertificationStatus(cert) === status;
      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });
  }, [items, search, category, level, status]);

  // Tri de la vue.
  const displayed = useMemo(() => {
    const list = [...filtered];
    if (sortKey === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortKey === 'issue_date')
      list.sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime());
    else list.sort((a, b) => a.sort_order - b.sort_order);
    return list;
  }, [filtered, sortKey]);

  // Le drag & drop n'a de sens que sur le tri manuel, sans filtre actif.
  const isSortable =
    sortKey === 'sort_order' && search === '' && category === '' && level === '' && status === '';

  // Persiste le nouvel ordre : recharge le détail de chaque élément déplacé
  // pour ne pas écraser ses autres champs, puis met à jour sort_order.
  async function persistReorder(ordered: Certification[]) {
    await Promise.all(
      ordered.map(async (cert, index) => {
        if (cert.sort_order === index) return;
        const detail = await certificationService.getById(cert.id);
        updateCertification.mutate({
          id: cert.id,
          values: { ...detailToInput(detail), sort_order: index },
        });
      })
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!isSortable || !over || active.id === over.id) return;
    const oldIndex = displayed.findIndex((cert) => cert.id === Number(active.id));
    const newIndex = displayed.findIndex((cert) => cert.id === Number(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    const ordered = arrayMove(displayed, oldIndex, newIndex);
    setItems(ordered.map((cert, index) => ({ ...cert, sort_order: index })));
    void persistReorder(ordered);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-text">Certifications</h2>
          <p className="text-sm text-muted">
            Gérez vos certifications, leur ordre et leurs documents.
          </p>
        </div>
        <Button to={CERT_ROUTES.new}>
          <Plus className="h-4 w-4" />
          Nouvelle certification
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height="5rem" />
            ))}
          </div>
          <Skeleton height="16rem" />
        </div>
      ) : isError ? (
        <Card>
          <p className="text-red-400">Impossible de charger les certifications.</p>
        </Card>
      ) : (
        <>
          <CertificationsKpis certifications={items} />

          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[12rem]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <Input
                  className="w-full pl-9"
                  placeholder="Rechercher (titre, organisme, catégorie)…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>
            <div className="w-44">
              <Select options={categoryOptions} value={category} onChange={setCategory} />
            </div>
            <div className="w-40">
              <Select options={levelOptions} value={level} onChange={setLevel} />
            </div>
            <div className="w-40">
              <Select
                options={STATUS_OPTIONS}
                value={status}
                onChange={(value) => setStatus(value as StatusFilter)}
              />
            </div>
            <div className="w-44">
              <Select
                options={SORT_OPTIONS}
                value={sortKey}
                onChange={(value) => setSortKey(value as SortKey)}
              />
            </div>
            <div className="flex overflow-hidden rounded-theme border border-border">
              <button
                type="button"
                onClick={() => setView('table')}
                aria-label="Vue tableau"
                aria-pressed={view === 'table'}
                className={
                  view === 'table'
                    ? 'bg-primary/15 px-3 py-2 text-primary'
                    : 'px-3 py-2 text-muted hover:text-text'
                }
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView('grid')}
                aria-label="Vue cartes"
                aria-pressed={view === 'grid'}
                className={
                  view === 'grid'
                    ? 'bg-primary/15 px-3 py-2 text-primary'
                    : 'px-3 py-2 text-muted hover:text-text'
                }
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>

          {displayed.length === 0 ? (
            <Card>
              <p className="text-muted">
                {items.length === 0
                  ? 'Aucune certification pour le moment. Créez-en une.'
                  : 'Aucune certification ne correspond à votre recherche.'}
              </p>
            </Card>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={displayed.map((cert) => cert.id)}
                strategy={view === 'table' ? verticalListSortingStrategy : rectSortingStrategy}
              >
                {view === 'table' ? (
                  <CertificationsTable
                    certifications={displayed}
                    sortable={isSortable}
                    onDelete={setToDelete}
                  />
                ) : (
                  <CertificationsGrid
                    certifications={displayed}
                    sortable={isSortable}
                    onDelete={setToDelete}
                  />
                )}
              </SortableContext>
            </DndContext>
          )}
        </>
      )}

      <Modal
        isOpen={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Supprimer la certification ?"
      >
        <p className="text-muted">
          Cette action est irréversible. La certification « {toDelete?.title} » sera définitivement
          supprimée.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            isLoading={deleteCertification.isPending}
            onClick={() => {
              if (toDelete) {
                deleteCertification.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
              }
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
