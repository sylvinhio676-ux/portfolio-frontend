import { Button } from '@/components/ui';

interface SkillCategoryTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

/**
 * Onglet de catégorie de compétences (réutilise le Button du kit UI).
 */
export function SkillCategoryTab({ label, active, onClick }: SkillCategoryTabProps) {
  return (
    <Button
      size="sm"
      variant={active ? 'primary' : 'secondary'}
      className="rounded-full"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
