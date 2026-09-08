import type { Transition, Variants } from 'framer-motion';

/** Curva unica del progetto: partenza decisa, arrivo lungo. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const transizione: Transition = { duration: 0.8, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transizione },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transizione },
};

export const stagger = (ritardo = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: ritardo, delayChildren: 0.05 } },
});

/** Rivelazione parola per parola, per i titoli cinematici. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/** Impostazioni comuni per whileInView: si attiva una volta sola. */
export const inView = { once: true, amount: 0.25 } as const;
