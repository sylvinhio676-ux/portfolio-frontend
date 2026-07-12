import { motion } from 'framer-motion';
import { buildCloudinaryUrl } from '@/core/helpers';

/** Une techno affichée en orbite autour de la photo. */
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
 * Position d'une carte techno sur le pourtour du cercle + sa visibilité
 * responsive (l'orbite est allégée sur les petits écrans).
 */
interface OrbitSlot {
  position: string;
  visibility: string;
}

// Six emplacements répartis autour de la photo (haut, bas et 4 angles).
// Visibles à tous les breakpoints : sur mobile les cartes se réduisent à une
// pastille-logo (voir plus bas), ce qui évite tout débordement.
const ORBIT_SLOTS: OrbitSlot[] = [
  { position: 'top-0 left-1/2 -translate-x-1/2', visibility: 'block' },
  { position: 'bottom-0 left-1/2 -translate-x-1/2', visibility: 'block' },
  { position: 'top-[14%] left-0', visibility: 'block' },
  { position: 'top-[14%] right-0', visibility: 'block' },
  { position: 'bottom-[14%] left-0', visibility: 'block' },
  { position: 'bottom-[14%] right-0', visibility: 'block' },
];

/** Petits points de la constellation décorative (coordonnées en %). */
const CONSTELLATION_DOTS = [
  { cx: 50, cy: 4 },
  { cx: 88, cy: 26 },
  { cx: 88, cy: 74 },
  { cx: 50, cy: 96 },
  { cx: 12, cy: 74 },
  { cx: 12, cy: 26 },
];

/**
 * Visuel de droite du Hero : photo circulaire avec un halo turquoise discret,
 * entourée d'une orbite de technos et d'une fine constellation. Les cartes
 * flottent doucement et apparaissent en fondu au montage.
 */
export function HeroBackground({ photoUrl, name, techs }: HeroBackgroundProps) {
  const photo = buildCloudinaryUrl(photoUrl, { width: 600, format: 'auto' });
  const orbitTechs = techs.slice(0, ORBIT_SLOTS.length);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Constellation décorative : points reliés, très discrète. */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points={CONSTELLATION_DOTS.map((d) => `${d.cx},${d.cy}`).join(' ')}
          className="stroke-primary/15"
          strokeWidth="0.4"
          fill="none"
        />
        {CONSTELLATION_DOTS.map((dot) => (
          <circle
            key={`${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r="1"
            className="fill-primary/40"
          />
        ))}
      </svg>

      {/* Anneau fin autour de la photo. */}
      <div className="absolute inset-[22%] rounded-full border border-primary/25" />

      {/* Photo de profil au centre. */}
      <div className="absolute inset-[26%] overflow-hidden rounded-full border-2 border-primary/40">
        {photo ? (
          <img src={photo} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-card font-heading text-4xl font-bold text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Orbite de technos. */}
      {orbitTechs.map((tech, index) => {
        const slot = ORBIT_SLOTS[index];
        const logo = buildCloudinaryUrl(tech.logoUrl, { width: 64, format: 'auto' });

        return (
          <div key={tech.name} className={`absolute ${slot.position} ${slot.visibility}`}>
            {/* Fondu au montage + léger va-et-vient vertical décalé. */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.3 + index * 0.12, duration: 0.5 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.4,
                },
              }}
              className="flex items-center gap-2 rounded-theme border border-border bg-card px-2 py-1.5 shadow-sm sm:px-3 sm:py-2"
            >
              {/* Logo toujours visible (seul élément affiché sur mobile). */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface sm:h-8 sm:w-8">
                {logo ? (
                  <img src={logo} alt={tech.name} className="h-full w-full object-contain p-1" />
                ) : (
                  <span className="font-heading text-sm font-bold text-primary">
                    {tech.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {/* Texte masqué sur mobile pour rester compact, visible dès sm. */}
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-text">{tech.name}</p>
                <p className="text-[10px] text-faint">{tech.categoryName}</p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
