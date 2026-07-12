import { describe, it, expect } from 'vitest';
import { formatExperienceDate } from '@/core/helpers/date.helpers';

describe('formatExperienceDate', () => {
  it('affiche « Présent » pour un poste actuel', () => {
    expect(formatExperienceDate('2022-01-01', null, true)).toBe('2022 — Présent');
  });

  it('affiche une seule année si début et fin sont la même année', () => {
    expect(formatExperienceDate('2022-01-01', '2022-12-31', false)).toBe('2022');
  });

  it('affiche une plage pour des années différentes', () => {
    expect(formatExperienceDate('2020-01-01', '2022-06-01', false)).toBe('2020 — 2022');
  });
});
