// src/components/public/layout/Footer.tsx
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from './nav-items';
import { useSocials } from '@/hooks/public/use-socials';
import { getSocialIcon } from '@/components/public/social/social-icons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data } = useSocials();
  const socials = (data ?? []).filter((social) => social.is_visible);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading text-xl font-bold text-primary mb-2">
              Sylvinhio<span className="text-foreground">.</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Full Stack Software Engineer & Mobile Developer.
              Je conçois des applications web et mobiles modernes, performantes et évolutives.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux (données du dashboard) */}
          {socials.length > 0 && (
            <div>
              <h4 className="font-heading font-semibold mb-3">Me suivre</h4>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Icon = getSocialIcon(social.platform);
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-card border border-border rounded-lg hover:border-primary transition-colors"
                      aria-label={social.label ?? social.platform}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Negoue Tamo Sylvinhio. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
