import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroTitleProps {
  name: string;
  title: string;
}

// Respecte la préférence système « réduire les animations ».
function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Titre du Hero : accroche + nom coloré, puis le poste affiché avec un
 * effet machine à écrire et un curseur clignotant (comme la maquette).
 */
export function HeroTitle({ name, title }: HeroTitleProps) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(title);
      return;
    }

    setTyped('');
    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setTyped(title.slice(0, index));
      if (index >= title.length) {
        window.clearInterval(intervalId);
      }
    }, 55);

    return () => window.clearInterval(intervalId);
  }, [title]);

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-heading text-4xl md:text-6xl font-bold text-text leading-tight"
      >
        Bonjour,
        <br />
        Je suis <span className="text-primary">{name}</span>
      </motion.h1>

      <p className="mt-4 font-heading text-xl md:text-2xl text-text">
        {typed}
        <span className="ml-0.5 inline-block animate-pulse text-primary">|</span>
      </p>
    </div>
  );
}
