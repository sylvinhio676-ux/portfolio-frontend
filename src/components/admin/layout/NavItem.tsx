// src/components/admin/layout/NavItem.tsx


import { Link } from 'react-router-dom';
import { cn } from '@/core/helpers';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
}

export function NavItem({ href, label, icon: Icon, isActive }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}