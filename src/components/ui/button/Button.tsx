import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { buttonVariants, type ButtonSize, type ButtonVariant } from './button-variants';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}

/** Lien interne (react-router) rendu comme un bouton. */
type ButtonAsLink = ButtonBaseProps & { to: string } & Omit<
    LinkProps,
    'to' | 'className'
  >;

/** Lien externe (ancre) rendu comme un bouton. */
type ButtonAsAnchor = ButtonBaseProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className'
  >;

/** Bouton natif. */
type ButtonAsButton = ButtonBaseProps & { isLoading?: boolean } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className'
  >;

type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

/**
 * Bouton polymorphe : `<button>` par défaut, `<Link to>` pour la navigation
 * interne, `<a href>` pour un lien externe. Même style dans tous les cas
 * (voir button-variants.ts).
 */
export function Button(props: ButtonProps) {
  if ('to' in props) {
    const { to, variant, size, className, children, ...rest } = props;
    return (
      <Link to={to} className={buttonVariants({ variant, size, className })} {...rest}>
        {children}
      </Link>
    );
  }

  if ('href' in props) {
    const { href, variant, size, className, children, ...rest } = props;
    return (
      <a href={href} className={buttonVariants({ variant, size, className })} {...rest}>
        {children}
      </a>
    );
  }

  const { variant, size, className, children, isLoading, disabled, ...rest } = props;
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? 'Chargement…' : children}
    </button>
  );
}
