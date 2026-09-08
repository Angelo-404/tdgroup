'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { BottoniContatto } from '@/components/Contatto';
import { Occhiello } from '@/components/ui';
import { AZIENDA, FAQ } from '@/data/cliente';

/**
 * Domande frequenti.
 *
 * Le risposte marcate `daConfermare` sono anteprime scritte da noi: plausibili ma
 * non verificate. Il segno giallo le rende evidenti in riunione, così si vede
 * subito cosa TD Group deve confermare prima della pubblicazione.
 */
export default function Faq() {
  const [aperta, setAperta] = useState<number | null>(0);
  const daConfermare = FAQ.filter((f) => f.daConfermare).length;

  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <Occhiello>Domande frequenti</Occhiello>
          <h2 className="titolo mt-4 text-5xl sm:text-6xl">Ve lo diciamo prima.</h2>
          <p className="mt-6 max-w-prosa leading-relaxed text-ink/70">
            Le cose che ci chiedono tutti al telefono. Se la vostra non c’è,
            scriveteci: rispondiamo in giornata.
          </p>
          <BottoniContatto
            className="mt-8"
            messaggio="Salve, avrei una domanda su un lavoro."
          />
        </div>

        <div>
          <ul className="border-t border-ink/15">
            {FAQ.map((f, i) => {
              const apertaQui = aperta === i;
              return (
                <li key={f.domanda} className="border-b border-ink/15">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAperta(apertaQui ? null : i)}
                      aria-expanded={apertaQui}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-ink/60"
                    >
                      <span className="text-lg font-medium leading-snug">
                        {f.domanda}
                      </span>
                      <span className="mt-1 shrink-0 text-ink/40">
                        {apertaQui ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                  </h3>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-morbida ${
                      apertaQui ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-prosa pb-5 leading-relaxed text-ink/65">
                        {f.risposta}
                      </p>
                      {f.daConfermare && (
                        <p className="mb-5 inline-block rounded-full bg-cantiere/20 px-3 py-1 text-xs text-ink/70">
                          Da confermare con {AZIENDA.nome}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {daConfermare > 0 && (
            <p className="mt-6 text-sm text-ink/45">
              {daConfermare} risposte su {FAQ.length} sono nostre proposte: dicono
              cose plausibili, ma vanno confermate o corrette prima di andare
              online.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
