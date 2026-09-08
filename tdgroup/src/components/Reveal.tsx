'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, inView, stagger, wordReveal } from '@/lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  /** Ritardo in secondi prima dell'ingresso. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'span';
};

export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </M>
  );
}

export function RevealGroup({
  children,
  className,
  ritardo = 0.08,
  as = 'div',
}: Props & { ritardo?: number }) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={stagger(ritardo)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {children}
    </M>
  );
}

export function RevealItem({ children, className, as = 'div' }: Props) {
  const M = motion[as];
  return (
    <M className={className} variants={fadeUp}>
      {children}
    </M>
  );
}

/**
 * Titolo rivelato parola per parola.
 * Ogni parola è in un contenitore con overflow nascosto: il testo sale
 * da sotto la propria riga invece di comparire e basta.
 */
export function Words({
  testo,
  className,
  delay = 0,
}: {
  testo: string;
  className?: string;
  delay?: number;
}) {
  const parole = testo.split(' ');
  return (
    <span className={className}>
      {parole.map((parola, i) => (
        <span key={`${parola}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={wordReveal}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ delay: delay + i * 0.06 }}
          >
            {parola}
            {i < parole.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
