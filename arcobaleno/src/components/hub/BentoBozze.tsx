'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Foto from '@/components/Foto';
import { RevealGroup } from '@/components/Reveal';
import { INTRO_BOZZE, VISUALI, foto } from '@/data/cliente';
import { LIVELLI } from '@/data/livelli';
import { fadeUp } from '@/lib/motion';

/**
 * Le tre bozze in griglia asimmetrica, dal livello più alto al più basso:
 * il primo box che si vede è quello che vale di più.
 */
/*
  Le foto di copertina arrivano dal cliente: gli slug di TD Group non esistono
  in un altro archivio, e prima erano scritti qui dentro.
*/
const VISUALE: Record<string, { foto: ReturnType<typeof foto>; area: string; alto: boolean }> = {
  portale: {
    foto: foto(VISUALI.portale.slug, VISUALI.portale.ripiego),
    area: 'sm:col-span-2 sm:row-span-2',
    alto: true,
  },
  completo: {
    foto: foto(VISUALI.completo.slug, VISUALI.completo.ripiego),
    area: 'sm:col-span-2',
    alto: false,
  },
  vetrina: {
    foto: foto(VISUALI.vetrina.slug, VISUALI.vetrina.ripiego),
    area: 'sm:col-span-2',
    alto: false,
  },
};

const ORDINE = ['portale', 'completo', 'vetrina'];

export default function BentoBozze() {
  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="titolo max-w-3xl text-5xl sm:text-7xl">Tre livelli.</h2>
        <p className="mt-6 max-w-prosa text-lg leading-relaxed text-ink/70">
          {INTRO_BOZZE}
        </p>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-4" ritardo={0.1}>
          {ORDINE.map((slug) => {
            const livello = LIVELLI.find((l) => l.slug === slug);
            const v = VISUALE[slug];
            if (!livello || !v) return null;

            return (
              <motion.div key={slug} variants={fadeUp} className={v.area}>
                <Link
                  href={`/demo/${slug}`}
                  className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-ink text-bone"
                >
                  <div
                    className={`absolute inset-0 ${
                      v.alto ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-[16/9]'
                    }`}
                  >
                    <Foto
                      foto={v.foto}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="h-full w-full object-cover opacity-75 transition-all duration-700 ease-morbida group-hover:scale-105 group-hover:opacity-55"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />

                  <div
                    className={`relative flex flex-col justify-end p-7 ${
                      v.alto ? 'min-h-[26rem]' : ''
                    }`}
                  >
                    <span className="font-display text-xs tracking-widest text-cantiere">
                      {livello.numero}
                    </span>
                    <h3 className="titolo mt-2 flex items-center gap-2 text-3xl sm:text-4xl">
                      {livello.nome}
                      <ArrowUpRight
                        size={22}
                        className="transition-transform duration-500 ease-morbida group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </h3>
                    <p className="mt-1 text-sm text-bone/50">{livello.sottotitolo}</p>

                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-morbida group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-4 text-sm leading-relaxed text-bone/70">
                          {livello.perChi}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
