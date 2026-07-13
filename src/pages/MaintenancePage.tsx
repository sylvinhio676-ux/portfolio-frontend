// src/pages/MaintenancePage.tsx
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { useSettings } from '@/hooks/public/use-settings';

/**
 * Écran plein écran affiché aux visiteurs publics lorsque le mode
 * maintenance est activé (l'administrateur connecté n'est jamais bloqué).
 */
export function MaintenancePage() {
  const { data: settings } = useSettings();
  const siteName = settings?.site_name || 'Le site';

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex max-w-md flex-col items-center text-center"
      >
        {/* Pastille de l'icône */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <Wrench className="h-9 w-9 text-primary" />
        </div>

        <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">
          Site en maintenance
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          {siteName} est actuellement en maintenance. Nous revenons très vite.
        </p>
      </motion.div>
    </div>
  );
}
