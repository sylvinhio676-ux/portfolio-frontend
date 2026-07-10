interface AboutStatsProps {
  projects: number;
  techs: number;
  years: number;
  clients: number;
}

/**
 * Rangée de statistiques clés affichée dans la carte profil.
 */
export function AboutStats({ projects, techs, years, clients }: AboutStatsProps) {
  const stats = [
    { value: `${projects}+`, label: 'Projets' },
    { value: `${techs}+`, label: 'Technologies' },
    { value: `${years}+`, label: 'Années' },
    { value: `${clients}+`, label: 'Clients' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 border-t border-border pt-5">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-heading text-xl font-bold text-primary">{stat.value}</p>
          <p className="text-xs text-faint">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
