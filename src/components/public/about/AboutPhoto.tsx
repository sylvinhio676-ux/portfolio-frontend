import { MapPin, Mail, Download } from 'lucide-react';
import { buildCloudinaryUrl } from '@/core/helpers';
import { Button } from '@/components/ui';

interface AboutPhotoProps {
  photoUrl: string | null;
  name: string;
  title: string;
  location: string | null;
  email: string | null;
  availability: string | null;
  cvUrl: string | null;
}

/**
 * Bloc profil horizontal : photo à gauche, identité et coordonnées à droite
 * (métier, disponibilité, localisation, email, bouton CV).
 */
export function AboutPhoto({
  photoUrl,
  name,
  title,
  location,
  email,
  availability,
  cvUrl,
}: AboutPhotoProps) {
  const photo = buildCloudinaryUrl(photoUrl, { width: 200, format: 'auto' });

  return (
    <div className="flex items-start gap-4">
      {/* Photo carrée 96×96 */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[18px] border border-border">
        {photo ? (
          <img src={photo} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface font-heading text-2xl font-bold text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Colonne d'informations (min-w-0 : autorise le rétrécissement sur écran étroit) */}
      <div className="flex min-w-0 flex-col gap-2 text-sm">
        {/* Nom + métier */}
        <div>
          <p className="font-heading text-lg font-bold leading-tight text-text">{name}</p>
          <p className="text-sm text-muted">{title}</p>
        </div>

        {availability && (
          <span className="inline-flex items-center gap-2 text-primary">
            {/* Pastille verte animée de disponibilité */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            {availability}
          </span>
        )}

        {location && (
          <span className="inline-flex items-center gap-2 text-muted">
            <MapPin className="h-4 w-4 shrink-0 text-faint" />
            {location}
          </span>
        )}

        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4 shrink-0 text-faint" />
            <span className="break-all">{email}</span>
          </a>
        )}

        {cvUrl && (
          <Button
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            className="mt-1 h-10 w-fit rounded-xl"
          >
            <Download className="h-4 w-4 shrink-0" />
            Télécharger mon CV
          </Button>
        )}
      </div>
    </div>
  );
}
