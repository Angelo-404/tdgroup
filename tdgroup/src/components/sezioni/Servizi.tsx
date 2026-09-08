'use client';

import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { ReactNode } from 'react';
import Foto from '@/components/Foto';
import { Occhiello } from '@/components/ui';
import { FOTO, INTESTAZIONI, SERVIZI } from '@/data/cliente';
import { portaInVista } from '@/lib/scroll';

/**
 * Titolo fisso a sinistra, foto enormi che scorrono e si impilano a destra.
 * Ogni scheda è sticky con un offset crescente: sovrapponendosi lasciano
 * vedere il bordo superiore di quella sotto.
 *
 * Due modi, ed è la differenza che si vende fra Vetrina e Completo:
 *
 * - senza `livello` (Vetrina): il testo completo si apre dentro la scheda.
 *   Il lettore ha tutto, ma esiste una URL sola.
 * - con `livello` (Completo, Portale): ogni scheda porta alla sua pagina.
 *   Al lettore cambia poco, a Google cambia tutto.
 *
 * L'impilamento e la lettura sono in conflitto, e va risolto in favore della
 * lettura. Una scheda coperta mostra solo i 24px di bordo superiore: tutto
 * quello che sta più in basso — un bottone in fondo alla scheda, il testo
 * aperto — sparisce appena si aggancia la scheda seguente. Perciò il comando
 * sta nella fascia della foto, in alto insieme al titolo, e l'impilamento si
 * scioglie del tutto finché una scheda resta aperta.
 *
 * Sotto i 640px l'impilamento non c'è proprio: su un telefono la scheda
 * riempie già lo schermo, sovrapporle non si vede e l'unico effetto che resta
 * è il comando che passa via in un colpo di pollice. Il `top` in linea non dà
 * fastidio, una scheda non incollata lo ignora.
 */
export default function Servizi({ livello }: { livello?: string }) {
  const conPagine = Boolean(livello);
  const [aperto, setAperto] = useState<string | null>(null);
  const qualcunoAperto = aperto !== null;

  const alterna = (slug: string, scheda: HTMLElement | null) => {
    setAperto((corrente) => (corrente === slug ? null : slug));
    // Le schede perdono l'incollaggio quando una si apre e riprendono quota
    // quando si chiude: senza riportare la scheda sotto l'intestazione, il
    // lettore si ritroverebbe di colpo a metà di un testo che non ha aperto.
    // Va chiesto a Lenis: uno scrollIntoView nativo verrebbe sovrascritto
    // dal suo ciclo di animazione al frame successivo.
    requestAnimationFrame(() => portaInVista(scheda));
  };

  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <Occhiello>Cosa facciamo</Occhiello>
          <h2 className="titolo mt-4 text-5xl sm:text-6xl">I nostri servizi.</h2>
          <p className="mt-6 max-w-prosa leading-relaxed text-ink/70">
            {INTESTAZIONI.servizi.testo}
          </p>
          <p className="mt-4 max-w-prosa text-sm text-ink/50">
            {conPagine
              ? 'Ogni servizio ha la sua pagina: è così che vi trova chi cerca la singola lavorazione.'
              : 'Apri una scheda per leggere tutto il servizio.'}
          </p>
        </div>

        <ul className="space-y-6">
          {SERVIZI.map((servizio, i) => {
            const immagine =
              FOTO.filter((f) => f.servizio === servizio.chiaveFoto)[0] ?? FOTO[0];
            const espanso = aperto === servizio.slug;

            /*
             * La foto sta sotto, in posizione assoluta; il testo sta nel
             * flusso. Così su schermo stretto, dove titolo e occhiello vanno
             * a capo, la fascia cresce e il riquadro con lei: un testo in
             * `absolute` sarebbe uscito dall'alto e la scheda, che ritaglia,
             * lo avrebbe decapitato.
             */
            const copertina = (comando?: ReactNode) => (
              <div className="sm:relative sm:flex sm:aspect-[16/10] sm:items-end">
                {/*
                  Sul telefono la foto sta sopra il testo, non sotto: il testo
                  del servizio e lungo, la scheda cresce ben oltre il 4:3 e la
                  foto finiva stirata sotto un velo quasi opaco: si vendono
                  cantieri e non se ne vedeva nessuno. Da sm in su torna la
                  sovrapposizione, dove il testo occupa una fascia bassa.
                */}
                <div className="relative aspect-[4/3] w-full sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
                  <Foto
                    foto={immagine}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-morbida group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent sm:via-ink/60" />
                </div>
                <div className="relative w-full p-6 sm:p-8">
                  <span className="font-display text-xs tracking-widest text-cantiere">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/*
                    La freccia e in linea, non un elemento flex: con il titolo
                    su due righe restava agganciata al bordo destro, staccata
                    dalle parole, come un segno grafico a caso.
                  */}
                  <h3 className="titolo mt-2 text-3xl sm:text-4xl">
                    {servizio.titolo}
                    {conPagine && (
                      <ArrowUpRight
                        size={24}
                        className="ml-2 inline-block align-baseline transition-transform duration-500 ease-morbida group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    )}
                  </h3>
                  <p className="mt-3 max-w-prosa text-sm leading-relaxed text-bone/70">
                    {servizio.intro}
                  </p>
                  {comando}
                </div>
              </div>
            );

            return (
              <li
                key={servizio.slug}
                className={`scroll-mt-24 overflow-hidden rounded-3xl bg-ink text-bone ${
                  qualcunoAperto ? '' : 'sm:sticky'
                }`}
                style={qualcunoAperto ? undefined : { top: `${6 + i * 1.5}rem` }}
              >
                {conPagine ? (
                  <Link
                    href={`/demo/${livello}/servizi/${servizio.slug}`}
                    className="group block"
                  >
                    {copertina()}
                  </Link>
                ) : (
                  <>
                    <div className="group">
                      {copertina(
                        <button
                          type="button"
                          onClick={(e) =>
                            alterna(servizio.slug, e.currentTarget.closest('li'))
                          }
                          aria-expanded={espanso}
                          aria-controls={`servizio-${servizio.slug}`}
                          // min-h-11 sono 44px: la misura sotto la quale un
                          // bersaglio diventa difficile da centrare col pollice.
                          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-bone/30 bg-ink/50 px-5 text-sm text-bone backdrop-blur transition-colors duration-300 hover:bg-bone hover:text-ink"
                        >
                          {espanso ? 'Chiudi' : 'Leggi tutto il servizio'}
                          <ChevronDown
                            size={16}
                            className={`shrink-0 transition-transform duration-500 ease-morbida ${
                              espanso ? 'rotate-180' : ''
                            }`}
                          />
                        </button>,
                      )}
                    </div>

                    <div
                      id={`servizio-${servizio.slug}`}
                      className={`grid transition-[grid-template-rows] duration-500 ease-morbida ${
                        espanso ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-7 pt-7 sm:px-8">
                          {servizio.corpo.map((blocco) =>
                            blocco.tipo === 'h' ? (
                              <h4
                                key={blocco.testo}
                                className="titolo mt-7 text-xl first:mt-0"
                              >
                                {blocco.testo}
                              </h4>
                            ) : (
                              <p
                                key={blocco.testo}
                                className="mt-4 max-w-prosa leading-relaxed text-bone/65"
                              >
                                {blocco.testo}
                              </p>
                            ),
                          )}
                          <p className="mt-7 text-cantiere">{servizio.cta}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
