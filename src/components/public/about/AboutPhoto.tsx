import { MapPin, Mail, CircleCheck } from 'lucide-react';
import { buildCloudinaryUrl } from '@/core/helpers';

interface AboutPhotoProps {
  photoUrl: string | null;
  name: string;
  title: string;
  location: string | null;
  email: string | null;
  availability: string | null;
}

/**
 * En-tête de la carte profil : photo, identité et coordonnées
 * (localisation, disponibilité, email).
 */
export function AboutPhoto({
  photoUrl,
  name,
  title,
  location,
  email,
  availability,
}: AboutPhotoProps) {
  const photo = buildCloudinaryUrl(photoUrl, { width: 200, format: 'auto' });

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border">
          {photo ? (
            <img src={photo} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface font-heading text-xl font-bold text-primary">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="font-heading text-lg font-bold text-text">{name}</p>
          <p className="text-sm text-muted">{title}</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm">
        {location && (
          <li className="flex items-center gap-2 text-muted">
            <MapPin className="h-4 w-4 text-faint" />
            {location}
          </li>
        )}
        {availability && (
          <li className="flex items-center gap-2 text-primary">
            <CircleCheck className="h-4 w-4" />
            {availability}
          </li>
        )}
        {email && (
          <li className="flex items-center gap-2 text-muted">
            <Mail className="h-4 w-4 text-faint" />
            <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
              {email}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
