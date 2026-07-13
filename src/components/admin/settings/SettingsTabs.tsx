import { cn } from '@/core/helpers';

/**
 * Identifiants des onglets du workspace Paramètres.
 */
export type SettingsTabId = 'account' | 'general' | 'appearance' | 'seo';

interface SettingsTab {
  id: SettingsTabId;
  label: string;
}

const TABS: SettingsTab[] = [
  { id: 'account', label: 'Compte' },
  { id: 'general', label: 'Général' },
  { id: 'appearance', label: 'Apparence' },
  { id: 'seo', label: 'SEO / Analytics' },
];

interface SettingsTabsProps {
  active: SettingsTabId;
  onChange: (id: SettingsTabId) => void;
}

/**
 * Barre d'onglets du workspace Paramètres.
 * Purement présentationnel : l'état actif est piloté par le parent.
 */
export function SettingsTabs({ active, onChange }: SettingsTabsProps) {
  return (
    <div role="tablist" className="flex flex-wrap gap-1 border-b border-border">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors',
            active === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-text'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
