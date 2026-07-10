export interface Social {
  id: number;
  platform: string; // 'github' | 'linkedin' | 'whatsapp' | 'email' | ...
  url: string;
  icon: string | null;
  label: string | null;
  is_visible: boolean;
  sort_order: number;
}