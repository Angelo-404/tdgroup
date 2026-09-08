'use client';

import type { ReactNode } from 'react';

/**
 * Banda scorrevole infinita. Il contenuto è duplicato una volta e l'animazione
 * trasla del 50%: l'anello si chiude senza salti.
 * Con prefers-reduced-motion l'animazione è disattivata dal CSS globale.
 */
export function Marquee({
  children,
  durata = 32,
  className = '',
}: {
  children: ReactNode;
  durata?: number;
  className?: string;
}) {
  return (
    <div className={`group relative flex overflow-hidden ${className}`} aria-hidden={false}>
      <div
        className="flex shrink-0 animate-[scorri_var(--durata)_linear_infinite] items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
        style={{ '--durata': `${durata}s` } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        className="flex shrink-0 animate-[scorri_var(--durata)_linear_infinite] items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
        style={{ '--durata': `${durata}s` } as React.CSSProperties}
        aria-hidden
      >
        {children}
      </div>
      <style jsx global>{`
        @keyframes scorri {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

/** Etichetta breve sopra un titolo di sezione. */
/**
 * Il valore di una prova, o un segnaposto se il dato non è confermato.
 *
 * Usato da Ticker e Statistiche, che mostrano gli stessi PROVE con due
 * dimensioni diverse: il segnaposto non può ereditare `text-4xl` della cifra,
 * o “da confermare” esce dalla colonna.
 */
export function ValoreProva({
  valore,
  className = '',
}: {
  valore: string;
  className?: string;
}) {
  if (valore.includes('{{')) {
    return (
      <span className="inline-block whitespace-nowrap rounded bg-cantiere/20 px-2 py-1 text-xs uppercase tracking-widest text-cantiere">
        da confermare
      </span>
    );
  }
  return <span className={className}>{valore}</span>;
}

export function Occhiello({ children, scuro = false }: { children: ReactNode; scuro?: boolean }) {
  return (
    <p
      className={`text-xs uppercase tracking-[0.2em] ${
        scuro ? 'text-bone/40' : 'text-ink/40'
      }`}
    >
      {children}
    </p>
  );
}
