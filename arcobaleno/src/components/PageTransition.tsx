'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

/**
 * Velo scuro che cala e risale al cambio rotta.
 *
 * Il contenuto non viene mai messo in dissolvenza: se l'animazione non parte
 * — JavaScript lento, scheda in background, rAF sospeso dal browser — la
 * pagina resta comunque leggibile. Il velo parte già ritirato (scaleY 0) per
 * lo stesso motivo: al primo disegno non deve coprire nulla.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const percorso = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={percorso}
          className="pointer-events-none fixed inset-0 z-[60] origin-top bg-ink"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: [0, 1, 1], transformOrigin: ['top', 'top', 'bottom'] }}
          transition={{ duration: 0.6, ease: EASE }}
          aria-hidden
        />
      </AnimatePresence>
      {children}
    </>
  );
}
