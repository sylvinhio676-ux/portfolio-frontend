/**
 * Formate une période d'expérience professionnelle.
 * end_date null → poste actuel.
 */
export function formatExperienceDate(
  startDate: string,
  endDate: string | null,
  isCurrent: boolean
): string {
  const start = new Date(startDate).getFullYear();
  if (isCurrent || !endDate) return `${start} — Présent`;
  const end = new Date(endDate).getFullYear();
  return start === end ? `${start}` : `${start} — ${end}`;
}

export function formatDateFr(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}