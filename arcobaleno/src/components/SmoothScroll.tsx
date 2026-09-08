'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { registraLenis } from '@/lib/scroll';

/**
 * Scorrimento inerziale globale. Montato una sola volta nel layout radice.
 * Chi ha chiesto meno animazioni al sistema operativo non lo riceve.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    registraLenis(lenis);

    let frame = 0;
    const loop = (tempo: number) => {
      lenis.raf(tempo);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      registraLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
