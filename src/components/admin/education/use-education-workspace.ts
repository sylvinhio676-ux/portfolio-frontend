import { useEffect, useMemo, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useAdminEducation, useUpdateEducation } from '@/hooks/admin/use-admin-education';
import type { Education } from '@/core/types';
import { mapRowToInput } from './education.constants';

export type EducationView = 'grid' | 'table';
export type EducationStatusFilter = 'all' | 'current' | 'finished';
export type EducationSort = 'sort_order' | 'recent' | 'name';

export interface EducationKpiData {
  total: number;
  current: number;
  finished: number;
  skills: number;
}

/**
 * Logique du workspace formations : chargement, dérivation des KPI, recherche,
 * filtres, tri, bascule de vue et persistance du réordonnancement (dnd).
 * Garde DashboardEducationPage purement déclarative (JSX only).
 */
export function useEducationWorkspace() {
  const { data, isLoading, isError } = useAdminEducation();
  const updateEducation = useUpdateEducation();

  const [ordered, setOrdered] = useState<Education[]>([]);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<EducationStatusFilter>('all');
  const [sortBy, setSortBy] = useState<EducationSort>('sort_order');
  const [view, setView] = useState<EducationView>('table');

  // Synchronise l'ordre local avec la source serveur (ordre par sort_order).
  useEffect(() => {
    if (!data) return;
    setOrdered([...data].sort((a, b) => a.sort_order - b.sort_order));
  }, [data]);

  // KPI calculées depuis la liste chargée.
  const kpis = useMemo<EducationKpiData>(() => {
    const distinctSkills = new Set<number>();
    for (const item of ordered) {
      item.skills?.forEach((skill) => distinctSkills.add(skill.id));
    }
    return {
      total: ordered.length,
      current: ordered.filter((item) => item.is_current).length,
      finished: ordered.filter((item) => !item.is_current).length,
      skills: distinctSkills.size,
    };
  }, [ordered]);

  // Niveaux académiques distincts présents (pour le filtre).
  const levelOptions = useMemo(() => {
    const levels = new Set(ordered.map((item) => item.academic_level).filter(Boolean));
    return Array.from(levels).sort();
  }, [ordered]);

  // Vue filtrée + triée.
  const items = useMemo(() => {
    const query = search.trim().toLowerCase();
    let list = ordered.filter((item) => {
      const matchesSearch =
        query === '' ||
        item.school_name.toLowerCase().includes(query) ||
        item.diploma.toLowerCase().includes(query) ||
        item.field_of_study.toLowerCase().includes(query);
      const matchesLevel = levelFilter === 'all' || item.academic_level === levelFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'current' ? item.is_current : !item.is_current);
      return matchesSearch && matchesLevel && matchesStatus;
    });

    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.school_name.localeCompare(b.school_name));
    } else if (sortBy === 'recent') {
      list = [...list].sort(
        (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
    }
    // sort_order : on conserve l'ordre local (déjà trié).
    return list;
  }, [ordered, search, levelFilter, statusFilter, sortBy]);

  // Le dnd n'a de sens qu'en tri manuel sans filtre actif.
  const canReorder =
    sortBy === 'sort_order' &&
    search.trim() === '' &&
    levelFilter === 'all' &&
    statusFilter === 'all';

  /**
   * Réordonne localement puis persiste le nouveau sort_order des éléments
   * déplacés via la mutation update (batch limité aux positions modifiées).
   */
  const reorder = (activeId: number, overId: number) => {
    if (activeId === overId) return;
    const oldIndex = ordered.findIndex((item) => item.id === activeId);
    const newIndex = ordered.findIndex((item) => item.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const next = arrayMove(ordered, oldIndex, newIndex);
    setOrdered(next);

    // Persiste uniquement les lignes dont le sort_order change réellement.
    next.forEach((item, index) => {
      if (item.sort_order !== index) {
        updateEducation.mutate({ id: item.id, values: mapRowToInput(item, index) });
      }
    });
  };

  return {
    isLoading,
    isError,
    items,
    kpis,
    levelOptions,
    search,
    setSearch,
    levelFilter,
    setLevelFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    view,
    setView,
    canReorder,
    reorder,
    isReordering: updateEducation.isPending,
  };
}
