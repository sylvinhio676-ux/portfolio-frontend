export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  content: string;
  avatar_url: string | null;
  rating: number; // 1-5
  is_visible: boolean;
  sort_order: number;
}