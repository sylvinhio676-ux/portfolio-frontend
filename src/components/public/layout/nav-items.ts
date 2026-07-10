export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Accueil' },
  { href: '/projects', label: 'Projets' },
  { href: '/about', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];