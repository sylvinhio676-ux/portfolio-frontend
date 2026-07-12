// src/components/public/layout/Footer.tsx
import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';
import { NAV_ITEMS } from './nav-items';
import { ROUTES } from '@/core/constants';
import { useSocials } from '@/hooks/public/use-socials';
import { useAbout } from '@/hooks/public/use-about';
import { getSocialIcon } from '@/components/public/social/social-icons';

// Liste statique des services (pas de source dédiée côté footer)
const FOOTER_SERVICES = [
  'Développement Web',
  'Développement Mobile',
  'API & Backend',
  'UI/UX Design',
  'Conseil & Architecture',
];

// Replis statiques quand la table about n'est pas encore renseignée
const FALLBACK_LOCATION = 'Yaoundé, Cameroun';
const FALLBACK_EMAIL = 'sylvinhio676@gmail.com';

export function Footer() {
  const { data: socialsData } = useSocials();
  const { data: about } = useAbout();

  const socials = (socialsData ?? []).filter((social) => social.is_visible);
  const location = about?.location ?? FALLBACK_LOCATION;
  const email = about?.email ?? FALLBACK_EMAIL;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonne large : marque + description + réseaux sociaux */}
          <div className="col-span-1 md:col-span-2">
            {/* Logo "NT." — lettres neutres + point vert en --primary (comme le Header) */}
            <h3 className="font-heading text-xl font-bold text-text mb-3">
              NT<span className="text-primary">.</span>
            </h3>
            <p className="text-muted text-sm max-w-md mb-4">
              Full Stack Software Engineer & Mobile Developer.
              Je conçois des applications web et mobiles modernes, performantes et évolutives.
            </p>

            {/* Réseaux sociaux (données du dashboard) */}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Icon = getSocialIcon(social.platform);
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-card border border-border rounded-lg text-muted hover:text-primary hover:border-primary transition-colors"
                      aria-label={social.label ?? social.platform}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Colonne Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-text mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne Services */}
          <div>
            <h4 className="font-heading font-semibold text-text mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    to={ROUTES.public.services}
                    className="text-muted hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne Contact */}
          <div>
            <h4 className="font-heading font-semibold text-text mb-3">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>{location}</span>
              </li>
              <li className="flex items-start gap-2 text-muted">
                <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary transition-colors break-all"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>&copy; 2026 Negoue Tamo Sylvinhio. Tous droits réservés.</p>
          <p>
            Conçu avec <span className="text-primary">&hearts;</span> et React
          </p>
        </div>
      </div>
    </footer>
  );
}
