import type { Education, EducationInput } from '@/core/types';
import type { EducationFormValues } from '@/core/schemas/education.schema';

/**
 * Chemins du workspace formations. Définis localement (le module route
 * partagé est branché par ailleurs) pour que les pages/composants education
 * naviguent entre eux sans dépendre du barrel de constantes global.
 */
export const EDUCATION_ROUTES = {
  list: '/dashboard/education',
  new: '/dashboard/education/new',
  edit: (id: string | number) => `/dashboard/education/${id}`,
} as const;

/** Niveaux académiques proposés dans le formulaire. */
export const ACADEMIC_LEVEL_OPTIONS = [
  { value: 'Baccalauréat', label: 'Baccalauréat' },
  { value: 'BTS / DUT', label: 'BTS / DUT' },
  { value: 'Licence', label: 'Licence' },
  { value: 'Bachelor', label: 'Bachelor' },
  { value: 'Master', label: 'Master' },
  { value: 'Ingénieur', label: 'Ingénieur' },
  { value: 'Doctorat', label: 'Doctorat' },
  { value: 'Certification', label: 'Certification' },
  { value: 'Autre', label: 'Autre' },
] as const;

/** Valeurs par défaut d'un formulaire vierge (création). */
export const EMPTY_EDUCATION_VALUES: EducationFormValues = {
  school_name: '',
  school_logo: '',
  diploma: '',
  field_of_study: '',
  academic_level: '',
  description: '',
  location: '',
  website: '',
  start_date: '',
  end_date: '',
  is_current: false,
  grade: '',
  mention: '',
  achievements: '',
  is_visible: true,
  featured: false,
  sort_order: 0,
  skills: [],
};

// Convertit une chaîne vide/blanche en null (colonnes nullable du backend).
const emptyToNull = (value: string | null | undefined): string | null =>
  value && value.trim() !== '' ? value : null;

/** Mappe les valeurs du formulaire vers la charge utile d'écriture API. */
export function mapFormToInput(values: EducationFormValues): EducationInput {
  return {
    school_name: values.school_name,
    school_logo: emptyToNull(values.school_logo),
    diploma: values.diploma,
    field_of_study: values.field_of_study,
    academic_level: values.academic_level,
    description: emptyToNull(values.description),
    location: emptyToNull(values.location),
    website: emptyToNull(values.website),
    start_date: values.start_date,
    end_date: values.is_current ? null : emptyToNull(values.end_date),
    is_current: values.is_current,
    grade: emptyToNull(values.grade),
    mention: emptyToNull(values.mention),
    achievements: emptyToNull(values.achievements),
    is_visible: values.is_visible,
    featured: values.featured,
    sort_order: values.sort_order,
    skills: values.skills,
  };
}

/**
 * Reconstruit une charge utile d'écriture depuis une ligne de la liste
 * (ressource allégée) pour persister un nouvel ordre via la mutation update.
 * NB : la ressource liste ne porte pas description/website/achievements ;
 * ces champs ne sont donc pas renvoyés lors d'un simple réordonnancement.
 */
export function mapRowToInput(row: Education, sortOrder: number): EducationInput {
  return {
    school_name: row.school_name,
    school_logo: row.school_logo,
    diploma: row.diploma,
    field_of_study: row.field_of_study,
    academic_level: row.academic_level,
    description: null,
    location: row.location,
    website: null,
    start_date: row.start_date,
    end_date: row.end_date,
    is_current: row.is_current,
    grade: row.grade,
    mention: row.mention,
    achievements: null,
    is_visible: row.is_visible,
    featured: row.featured,
    sort_order: sortOrder,
    skills: row.skills?.map((skill) => skill.id) ?? [],
  };
}
