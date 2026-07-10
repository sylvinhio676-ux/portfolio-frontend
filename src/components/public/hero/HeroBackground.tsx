import { motion } from 'framer-motion';
import { buildCloudinaryUrl } from '@/core/helpers';

export interface OrbitTech {
  name: string;
  logoUrl: string | null;
  categoryName: string;
}

interface HeroBackgroundProps {
  photoUrl: string | null;
  name: string;
  techs: OrbitTech[];
}

/**
 * Emplacements fixes des puces techno autour de la photo (classes Tailwind,
 * pas de style inline). L'ordre suit approximativement la maquette :
 * haut, coins hauts, côtés, bas.
 */
const ORBIT_SLOTS = [
  'top-0 left-1/2 -translate-x-1/2',
  'top-[18%] left-0',
  'top-[18%] right-0',
  'top-1/2 -left-2 -translate-y-1/2',
  'top-1/2 -right-2 -translate-y-1/2',
  'bottom-[16%] left-[6%]',
  'bottom-0 left-1/2 -translate-x-1/2',
];

// Repli visuel quand un logo Cloudinary est absent : l'initiale de la techno.
function TechLogo({ tech }: { tech: OrbitTech }) {
  const src = buildCloudinaryUrl(tech.logoUrl, { width: 64, format: 'auto' });

  if (!src) {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 font-heading text-sm font-bold text-primary">
        {tech.name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={tech.name}
      loading="lazy"
      className="h-8 w-8 rounded-md object-contain"
    />
  );
}

/**
 * Visuel de droite du Hero : photo circulaire avec halo, entourée d'anneaux
 * décoratifs et des puces technos flottantes (alimentées par l'API skills).
 */
export function HeroBackground({ photoUrl, name, techs }: HeroBackgroundProps) {
  const photo = buildCloudinaryUrl(photoUrl, { width: 600, format: 'auto' });
  const items = techs.slice(0, ORBIT_SLOTS.length);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Anneaux décoratifs subtils */}
      <div className="absolute inset-[8%] rounded-full border border-border/60" />
      <div className="absolute inset-[20%] rounded-full border border-border/40" />

      {/* Halo lumineux derrière la photo */}
      <div className="absolute inset-[26%] rounded-full bg-primary/20 blur-2xl" />

      {/* Photo de profil */}
      <div className="absolute inset-[26%] overflow-hidden rounded-full border-2 border-primary/50 shadow-glow">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-card font-heading text-4xl font-bold text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Puces technos en orbite */}
      {items.map((tech, index) => (
        <motion.div
          key={tech.name}
          className={`absolute ${ORBIT_SLOTS[index]}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.4, delay: 0.3 + index * 0.1 },
            scale: { duration: 0.4, delay: 0.3 + index * 0.1 },
            y: {
              duration: 3 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-glow">
            <TechLogo tech={tech} />
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-none text-text">
                {tech.name}
              </p>
              <p className="mt-0.5 text-xs leading-none text-faint">
                {tech.categoryName}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
