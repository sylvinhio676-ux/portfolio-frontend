import { useState } from 'react';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { Button, Card, Input, Select, Skeleton } from '@/components/ui';
import { cn } from '@/core/helpers';
import {
  DeleteEducationModal,
  EducationGrid,
  EducationKpis,
  EducationTable,
  EDUCATION_ROUTES,
  useEducationWorkspace,
} from '@/components/admin/education';
import type { Education } from '@/core/types';
import type { EducationSort, EducationStatusFilter } from '@/components/admin/education';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'current', label: 'En cours' },
  { value: 'finished', label: 'Terminées' },
];

const SORT_OPTIONS = [
  { value: 'sort_order', label: 'Ordre manuel' },
  { value: 'recent', label: 'Plus récentes' },
  { value: 'name', label: 'Nom (A-Z)' },
];

/**
 * Workspace admin des formations : en-tête, KPI, toolbar (recherche, filtres,
 * tri, bascule de vue) puis vue tableau ou grille avec réordonnancement dnd.
 */
export function DashboardEducationPage() {
  const workspace = useEducationWorkspace();
  const [toDelete, setToDelete] = useState<Education | null>(null);

  const levelSelectOptions = [
    { value: 'all', label: 'Tous les niveaux' },
    ...workspace.levelOptions.map((level) => ({ value: level, label: level })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-text">Formations</h2>
          <p className="text-sm text-muted">
            Gérez votre parcours académique affiché sur le portfolio.
          </p>
        </div>
        <Button to={EDUCATION_ROUTES.new}>
          <Plus className="h-4 w-4" />
          Nouvelle formation
        </Button>
      </div>

      <EducationKpis data={workspace.kpis} />

      <Card className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:flex-wrap">
          <div className="flex-1 sm:min-w-[16rem]">
            <Input
              label="Recherche"
              placeholder="Établissement, diplôme, domaine…"
              value={workspace.search}
              onChange={(event) => workspace.setSearch(event.target.value)}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              label="Niveau"
              options={levelSelectOptions}
              value={workspace.levelFilter}
              onChange={workspace.setLevelFilter}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              label="Statut"
              options={STATUS_OPTIONS}
              value={workspace.statusFilter}
              onChange={(value) => workspace.setStatusFilter(value as EducationStatusFilter)}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              label="Tri"
              options={SORT_OPTIONS}
              value={workspace.sortBy}
              onChange={(value) => workspace.setSortBy(value as EducationSort)}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-theme border border-border p-1">
          <button
            type="button"
            onClick={() => workspace.setView('table')}
            aria-label="Vue tableau"
            aria-pressed={workspace.view === 'table'}
            className={cn(
              'rounded-theme p-2 transition-colors',
              workspace.view === 'table' ? 'bg-primary/15 text-primary' : 'text-faint hover:text-text'
            )}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => workspace.setView('grid')}
            aria-label="Vue grille"
            aria-pressed={workspace.view === 'grid'}
            className={cn(
              'rounded-theme p-2 transition-colors',
              workspace.view === 'grid' ? 'bg-primary/15 text-primary' : 'text-faint hover:text-text'
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </Card>

      {workspace.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height="4rem" />
          ))}
        </div>
      ) : workspace.isError ? (
        <Card>
          <p className="text-red-500">Impossible de charger les formations. Réessayez.</p>
        </Card>
      ) : workspace.items.length === 0 ? (
        <Card>
          <p className="text-muted">Aucune formation ne correspond. Créez-en une.</p>
        </Card>
      ) : workspace.view === 'table' ? (
        <EducationTable
          items={workspace.items}
          canReorder={workspace.canReorder}
          onReorder={workspace.reorder}
          onRequestDelete={setToDelete}
        />
      ) : (
        <EducationGrid
          items={workspace.items}
          canReorder={workspace.canReorder}
          onReorder={workspace.reorder}
          onRequestDelete={setToDelete}
        />
      )}

      <DeleteEducationModal education={toDelete} onClose={() => setToDelete(null)} />
    </div>
  );
}
