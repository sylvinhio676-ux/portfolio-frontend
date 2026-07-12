import { describe, it, expect } from 'vitest';
import { projectSchema } from '@/core/schemas/project.schema';

const validProject = {
  slug: 'mon-projet',
  title: 'Mon Projet',
  tagline: '',
  description: 'Une description suffisamment longue.',
  problem: '',
  solution: '',
  challenge: '',
  result: '',
  architecture: '',
  github_url: '',
  demo_url: '',
  video_url: '',
  cover_image: '',
  is_featured: false,
  status: 'draft' as const,
  sort_order: 0,
  technologies: [],
};

describe('projectSchema', () => {
  it('accepte un projet valide', () => {
    expect(projectSchema.safeParse(validProject).success).toBe(true);
  });

  it('rejette un slug invalide (majuscules / espaces)', () => {
    expect(projectSchema.safeParse({ ...validProject, slug: 'Mon Projet' }).success).toBe(false);
  });

  it('rejette une description trop courte', () => {
    expect(projectSchema.safeParse({ ...validProject, description: 'court' }).success).toBe(false);
  });
});
