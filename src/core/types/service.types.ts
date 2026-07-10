export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  is_visible: boolean;
  sort_order: number;
}