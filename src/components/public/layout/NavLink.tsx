

import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/core/helpers';

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, label, className, onClick }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href || (href !== '/' && location.pathname.startsWith(href));

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'relative text-sm font-medium transition-colors hover:text-primary',
        isActive ? 'text-primary' : 'text-muted-foreground',
        className
      )}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}