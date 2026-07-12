import { useSocials } from '@/hooks/public/use-socials';
import { getSocialIcon } from '@/components/public/social/social-icons';

/**
 * Coordonnées et liens réseaux sociaux de la section Contact (données API).
 */
export function ContactSocials() {
  const { data } = useSocials();
  const socials = (data ?? []).filter((social) => social.is_visible);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-heading text-lg font-semibold text-text">Restons en contact</h3>
        <p className="mt-2 text-muted">
          Une question, un projet ? Écrivez-moi ou retrouvez-moi sur mes réseaux.
        </p>
      </div>

      {socials.length > 0 && (
        <ul className="flex flex-col gap-3">
          {socials.map((social) => {
            const Icon = getSocialIcon(social.platform);
            return (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-theme border border-border bg-card px-4 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-text"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {social.label ?? social.platform}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
