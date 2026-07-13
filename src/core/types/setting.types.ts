/**
 * Thème par défaut du site (aligné sur la règle backend `in:dark,light,system`).
 */
export type ThemeDefault = 'dark' | 'light' | 'system';

/**
 * Paramètres globaux — vue Admin (tous les champs, cf. SettingResource).
 */
export interface Setting {
  id: number;
  // Général
  site_name: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_location: string | null;
  is_available: boolean;
  availability_message: string | null;
  maintenance_mode: boolean;
  // Apparence
  theme_default: ThemeDefault | null;
  primary_color: string | null;
  font_heading: string | null;
  font_body: string | null;
  border_radius: string | null;
  // SEO / Analytics
  analytics_id: string | null;
  search_console_verification: string | null;
  default_og_image: string | null;
  default_robots: string | null;
  sitemap_enabled: boolean;
  updated_at: string;
}

/**
 * Paramètres globaux — sous-ensemble public (cf. PublicSettingResource).
 * Exclut id, sitemap_enabled et updated_at, réservés à l'administration.
 */
export interface PublicSetting {
  // Général
  site_name: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_location: string | null;
  is_available: boolean;
  availability_message: string | null;
  maintenance_mode: boolean;
  // Apparence
  theme_default: ThemeDefault | null;
  primary_color: string | null;
  font_heading: string | null;
  font_body: string | null;
  border_radius: string | null;
  // SEO / Analytics (publics)
  analytics_id: string | null;
  search_console_verification: string | null;
  default_og_image: string | null;
  default_robots: string | null;
}

/**
 * Charge utile de mise à jour des paramètres (cf. UpdateSettingRequest).
 * Tous les champs sont optionnels : mise à jour partielle possible.
 */
export interface SettingInput {
  // Général
  site_name?: string | null;
  logo_url?: string | null;
  favicon_url?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  contact_location?: string | null;
  is_available?: boolean;
  availability_message?: string | null;
  maintenance_mode?: boolean;
  // Apparence
  theme_default?: ThemeDefault | null;
  primary_color?: string | null;
  font_heading?: string | null;
  font_body?: string | null;
  border_radius?: string | null;
  // SEO / Analytics
  analytics_id?: string | null;
  search_console_verification?: string | null;
  default_og_image?: string | null;
  default_robots?: string | null;
  sitemap_enabled?: boolean;
}
