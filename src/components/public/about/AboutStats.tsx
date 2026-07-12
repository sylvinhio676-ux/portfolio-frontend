interface AboutStatsProps {
  projects: number;
  techs: number;
  years: number;
  clients: number;
}

/**
 * Rangée de statistiques clés affichée dans la carte profil.
 * Grille 2×2 sur mobile, 4 colonnes sur desktop.
 */
export function AboutStats({ projects, techs, years, clients }: AboutStatsProps) {
  const stats = [
    { value: `${projects}+`, label: 'Projets' },
    { value: `${techs}+`, label: 'Technologies' },
    { value: `${years}+`, label: 'Années' },
    { value: `${clients}+`, label: 'Clients' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center transition-transform duration-200 hover:-translate-y-1"
        >
          <p className="font-heading text-2xl font-bold leading-none text-text sm:text-[2rem]">
            {stat.value}
          </p>
          <p className="mt-1.5 text-sm text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
