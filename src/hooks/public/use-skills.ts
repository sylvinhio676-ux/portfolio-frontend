import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { skillsService } from '@/services';
import { skillCategoriesService } from '@/services';
import type { Skill, SkillCategory } from '@/core/types';

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

/**
 * Combine deux ressources (skills + skill-categories) pour reconstituer
 * le regroupement par catégorie nommée, puisque GET /skills ne renvoie
 * que category_id (pas l'objet catégorie imbriqué).
 */
function groupByCategory(skills: Skill[], categories: SkillCategory[]): SkillGroup[] {
  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const groups = new Map<number, SkillGroup>();

  for (const skill of skills) {
    if (!skill.is_visible) continue;
    const category = categoryMap.get(skill.category_id);
    if (!category) continue; // catégorie inconnue/supprimée : skill ignoré à l'affichage

    const existing = groups.get(skill.category_id);
    if (existing) {
      existing.skills.push(skill);
    } else {
      groups.set(skill.category_id, { category, skills: [skill] });
    }
  }

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      skills: group.skills.sort((a, b) => a.sort_order - b.sort_order),
    }))
    .sort((a, b) => a.category.sort_order - b.category.sort_order);
}

export function useSkills() {
  const skillsQuery = useQuery({
    queryKey: ['skills'],
    queryFn: skillsService.getAll,
  });

  const categoriesQuery = useQuery({
    queryKey: ['skill-categories'],
    queryFn: skillCategoriesService.getAll,
  });

  const groups = useMemo(() => {
    if (!skillsQuery.data || !categoriesQuery.data) return [];
    return groupByCategory(skillsQuery.data, categoriesQuery.data);
  }, [skillsQuery.data, categoriesQuery.data]);

  return {
    groups,
    isLoading: skillsQuery.isLoading || categoriesQuery.isLoading,
    isError: skillsQuery.isError || categoriesQuery.isError,
    error: skillsQuery.error ?? categoriesQuery.error,
  };
}