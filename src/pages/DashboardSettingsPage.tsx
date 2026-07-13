import { useState } from 'react';
import { Skeleton } from '@/components/ui';
import { useAdminSettings } from '@/hooks/admin';
import {
  AccountPasswordForm,
  SettingsForm,
  SettingsTabs,
  type SettingsTabId,
} from '@/components/admin/settings';

/**
 * Workspace admin « Paramètres » : une page à onglets
 * (Compte · Général · Apparence · SEO/Analytics).
 * L'onglet Compte a son propre formulaire ; les trois autres partagent
 * un unique formulaire de paramètres avec un seul bouton « Enregistrer ».
 */
export function DashboardSettingsPage() {
  const [tab, setTab] = useState<SettingsTabId>('account');
  const { data: setting, isLoading } = useAdminSettings();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text">Paramètres</h2>
        <p className="text-sm text-muted">
          Compte, informations générales, apparence et SEO / Analytics.
        </p>
      </div>

      <SettingsTabs active={tab} onChange={setTab} />

      {tab === 'account' ? (
        <AccountPasswordForm />
      ) : isLoading || !setting ? (
        <Skeleton height="24rem" />
      ) : (
        <SettingsForm setting={setting} section={tab} />
      )}
    </div>
  );
}
