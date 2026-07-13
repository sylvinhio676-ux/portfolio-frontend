import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/core/helpers';
import { Button, Card, Input, Select } from '@/components/ui';
import { settingSchema, type SettingFormValues } from '@/core/schemas';
import type { Setting, ThemeDefault } from '@/core/types';
import { useUpdateSettings } from '@/hooks/admin';

/**
 * Sections pilotées par les onglets (le compte a son propre formulaire).
 */
export type SettingsSection = 'general' | 'appearance' | 'seo';

const THEME_OPTIONS = [
  { value: 'dark', label: 'Sombre' },
  { value: 'light', label: 'Clair' },
  { value: 'system', label: 'Système' },
];

// Classe partagée des cases à cocher (aspect toggle discret).
const checkboxLabelClass = 'flex items-center gap-2 py-2 text-sm text-dim';

/**
 * Convertit les paramètres (API) en valeurs de formulaire.
 * Les champs texte `null` deviennent des chaînes vides pour les inputs contrôlés.
 */
function mapSettingToForm(setting: Setting): SettingFormValues {
  return {
    // Général
    site_name: setting.site_name ?? '',
    logo_url: setting.logo_url ?? '',
    favicon_url: setting.favicon_url ?? '',
    contact_email: setting.contact_email ?? '',
    contact_phone: setting.contact_phone ?? '',
    contact_location: setting.contact_location ?? '',
    is_available: setting.is_available,
    availability_message: setting.availability_message ?? '',
    maintenance_mode: setting.maintenance_mode,
    // Apparence
    theme_default: setting.theme_default ?? 'system',
    primary_color: setting.primary_color ?? '#00E5C3',
    font_heading: setting.font_heading ?? '',
    font_body: setting.font_body ?? '',
    border_radius: setting.border_radius ?? '',
    // SEO / Analytics
    analytics_id: setting.analytics_id ?? '',
    search_console_verification: setting.search_console_verification ?? '',
    default_og_image: setting.default_og_image ?? '',
    default_robots: setting.default_robots ?? '',
    sitemap_enabled: setting.sitemap_enabled,
  };
}

interface SettingsFormProps {
  setting: Setting;
  section: SettingsSection;
}

/**
 * Formulaire unique des paramètres du site. Les champs sont regroupés par
 * section ; seule la section active est visible (les autres sont masquées
 * mais restent montées) afin qu'un seul bouton « Enregistrer » envoie
 * l'intégralité des valeurs, quel que soit l'onglet consulté.
 */
export function SettingsForm({ setting, section }: SettingsFormProps) {
  const updateSettings = useUpdateSettings();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SettingFormValues>({
    resolver: zodResolver(settingSchema),
    defaultValues: mapSettingToForm(setting),
  });

  const onSubmit = (values: SettingFormValues) => updateSettings.mutate(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Général */}
      <Card className={cn('flex flex-col gap-4', section !== 'general' && 'hidden')}>
        <h3 className="font-heading font-semibold text-text">Général</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Nom du site" error={errors.site_name?.message} {...register('site_name')} />
          <Input label="Logo (URL)" error={errors.logo_url?.message} {...register('logo_url')} />
          <Input
            label="Favicon (URL)"
            error={errors.favicon_url?.message}
            {...register('favicon_url')}
          />
          <Input
            label="Email de contact"
            error={errors.contact_email?.message}
            {...register('contact_email')}
          />
          <Input
            label="Téléphone de contact"
            error={errors.contact_phone?.message}
            {...register('contact_phone')}
          />
          <Input
            label="Localisation"
            error={errors.contact_location?.message}
            {...register('contact_location')}
          />
        </div>
        <Input
          label="Message de disponibilité"
          error={errors.availability_message?.message}
          {...register('availability_message')}
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <label className={checkboxLabelClass}>
            <input type="checkbox" className="h-4 w-4 accent-primary" {...register('is_available')} />
            Disponible pour de nouveaux projets
          </label>
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              {...register('maintenance_mode')}
            />
            Mode maintenance
          </label>
        </div>
      </Card>

      {/* Apparence */}
      <Card className={cn('flex flex-col gap-4', section !== 'appearance' && 'hidden')}>
        <h3 className="font-heading font-semibold text-text">Apparence</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Controller
            control={control}
            name="theme_default"
            render={({ field }) => (
              <Select
                label="Thème par défaut"
                options={THEME_OPTIONS}
                value={field.value ?? 'system'}
                onChange={(value) => field.onChange(value as ThemeDefault)}
                error={errors.theme_default?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="primary_color"
            render={({ field }) => (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-dim">Couleur primaire</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={field.value ?? '#00E5C3'}
                    onChange={(event) => field.onChange(event.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-theme border border-border bg-surface"
                    aria-label="Sélecteur de couleur primaire"
                  />
                  <input
                    type="text"
                    value={field.value ?? ''}
                    onChange={(event) => field.onChange(event.target.value)}
                    placeholder="#00E5C3"
                    className="flex-1 rounded-theme border border-border bg-surface px-3 py-2 text-text placeholder:text-faint transition-colors focus:border-primary focus:outline-none"
                  />
                </div>
                {errors.primary_color && (
                  <span className="text-sm text-red-500">{errors.primary_color.message}</span>
                )}
              </div>
            )}
          />

          <Input
            label="Police des titres"
            error={errors.font_heading?.message}
            {...register('font_heading')}
          />
          <Input
            label="Police du corps"
            error={errors.font_body?.message}
            {...register('font_body')}
          />
          <Input
            label="Rayon des bordures"
            error={errors.border_radius?.message}
            {...register('border_radius')}
          />
        </div>
      </Card>

      {/* SEO / Analytics */}
      <Card className={cn('flex flex-col gap-4', section !== 'seo' && 'hidden')}>
        <h3 className="font-heading font-semibold text-text">SEO / Analytics</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="ID Analytics"
            error={errors.analytics_id?.message}
            {...register('analytics_id')}
          />
          <Input
            label="Vérification Search Console"
            error={errors.search_console_verification?.message}
            {...register('search_console_verification')}
          />
          <Input
            label="Image OG par défaut (URL)"
            error={errors.default_og_image?.message}
            {...register('default_og_image')}
          />
          <Input
            label="Robots par défaut"
            error={errors.default_robots?.message}
            {...register('default_robots')}
          />
        </div>
        <label className={checkboxLabelClass}>
          <input
            type="checkbox"
            className="h-4 w-4 accent-primary"
            {...register('sitemap_enabled')}
          />
          Sitemap activé
        </label>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" isLoading={updateSettings.isPending}>
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
