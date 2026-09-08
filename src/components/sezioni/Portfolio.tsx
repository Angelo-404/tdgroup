'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Foto from '@/components/Foto';
import { Occhiello } from '@/components/ui';
import { FOTO, INTESTAZIONI, SERVIZI } from '@/data/cliente';
import { EASE } from '@/lib/motion';

// Griglia volutamente irregolare: ogni terza e ogni settima cella occupano
// due righe, così le colonne non si allineano mai del tutto.
const alto = (i: number) => i % 7 === 2 || i % 7 === 5;

// Ogni foto costa circa 1 KB di HTML fra <picture>, due srcset e l'alt.
// Nel livello Portale il portfolio si somma a tutto il resto, quindi il
// numero iniziale resta basso: chi vuole vedere di piu usa i filtri.
const MASSIMO = 18;

export default function PortfolioGrid() {
  const [filtro, setFiltro] = useState<string>('tutti');

  const filtri = useMemo(
    () => [
      { chiave: 'tutti', nome: 'Tutti' },
      ...SERVIZI.map((s) => ({ chiave: s.chiaveFoto, nome: s.nome })).filter((f) =>
        FOTO.some((foto) => foto.servizio === f.chiave),
      ),
    ],
    [],
  );

  /**
   * FOTO è ordinato per slug, quindi in "tutti" uscirebbero prima dodici
   * bagni di fila. Qui le lavorazioni si alternano a giro: la prima
   * schermata mostra subito di che cosa siamo capaci.
   */
  const mescolate = useMemo(() => {
    const code = new Map<string, typeof FOTO>();
    for (const f of FOTO) {
      const coda = code.get(f.servizio);
      if (coda) coda.push(f);
      else code.set(f.servizio, [f]);
    }
    const gruppi = Array.from(code.values());
    const out: typeof FOTO = [];
    for (let i = 0; out.length < FOTO.length; i += 1) {
      for (const g of gruppi) if (g[i]) out.push(g[i]);
    }
    return out;
  }, []);

  const visibili = useMemo(
    () =>
      (filtro === 'tutti' ? mescolate : FOTO.filter((f) => f.servizio === filtro)).slice(
        0,
        MASSIMO,
      ),
    [filtro, mescolate],
  );

  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Occhiello>Lavori</Occhiello>
        <h2 className="titolo mt-4 max-w-3xl text-5xl sm:text-7xl">
          {INTESTAZIONI.portfolio.titolo}
        </h2>
        <p className="mt-6 max-w-prosa text-lg leading-relaxed text-ink/70">
          {INTESTAZIONI.portfolio.testo}
        </p>

        {/*
          Su telefono i nove filtri riempivano otto righe prima di far vedere
          una foto: diventano una striscia che scorre col pollice, come le
          categorie di qualunque app. Da sm in su tornano a capo normalmente.
        */}
        <div className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {filtri.map((f) => {
            const attivo = filtro === f.chiave;
            return (
              <button
                key={f.chiave}
                type="button"
                onClick={() => setFiltro(f.chiave)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  attivo
                    ? 'border-ink bg-ink text-bone'
                    : 'border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink'
                }`}
                aria-pressed={attivo}
              >
                {f.nome}
              </button>
            );
          })}
        </div>

        <motion.ul
          layout
          className="mt-10 grid auto-rows-[13rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visibili.map((foto, i) => (
              <motion.li
                key={foto.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE, delay: (i % 8) * 0.03 }}
                className={`group relative overflow-hidden rounded-2xl bg-ink ${
                  alto(i) ? 'sm:row-span-2' : ''
                }`}
              >
                <Foto
                  foto={foto}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-morbida group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-ink/0 opacity-0 backdrop-blur-0 transition-all duration-500 ease-morbida group-hover:bg-ink/45 group-hover:opacity-100 group-hover:backdrop-blur-sm">
                  <div className="p-4">
                    <p className="font-display text-lg leading-tight tracking-tight text-bone">
                      {foto.cantiere ?? foto.servizioNome}
                    </p>
                    <p className="mt-1 text-xs text-bone/60">{foto.servizioNome}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-8 text-sm text-ink/50">
          {visibili.length} foto mostrate. In libreria ce ne sono {FOTO.length} già
          pronte, più circa 370 mai pubblicate.
        </p>
      </div>
    </section>
  );
}
