'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import { Reveal, Words } from '@/components/Reveal';
import { AZIENDA, MESTIERE_HERO, PRESENTAZIONE } from '@/data/cliente';
import { FORNITORE } from '@/data/fornitore';

export default function HubHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacita = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /*
    Chi ha chiesto meno movimento al sistema operativo non riceve il
    parallasse. Il blocco `prefers-reduced-motion` in globals.css non basta:
    spegne animazioni e transizioni CSS, mentre queste trasformazioni le
    scrive framer-motion come `transform` inline da JavaScript e non passano
    di lì. `useReducedMotion` restituisce `false` sul server e alla prima
    resa, quindi non cambia l'HTML iniziale: l'effetto viene solo tolto dopo
    l'idratazione, a chi lo ha escluso.
  */
  const ridotto = useReducedMotion();

  return (
    <section
      ref={ref}
      className="dark-section relative flex min-h-[92svh] items-end overflow-hidden bg-ink px-5 pb-16 pt-32 text-bone sm:px-8"
    >
      <motion.div
        style={ridotto ? undefined : { y, opacity: opacita }}
        className="mx-auto w-full max-w-7xl"
      >
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h1 className="titolo text-[12vw] leading-[0.88] sm:text-[11vw] sm:leading-[0.85] lg:text-[8.5vw]">
            <span className="block">
              <Words testo="Costruisco" />
            </span>
            <span className="block text-cantiere">
              <Words testo="siti" delay={0.12} />
            </span>
            <span className="block">
              <Words testo={MESTIERE_HERO} delay={0.24} />
            </span>
          </h1>

          <Reveal delay={0.5} className="prosa">
            <p>{PRESENTAZIONE}</p>
            {/*
              "come voi" vale solo se siamo davvero dello stesso paese. Con un
              cliente di un comune vicino diventa una frase falsa detta nella
              prima schermata, che e' il posto peggiore dove dirne una.
            */}
            <p className="mt-6">
              {String(FORNITORE.comune) === String(AZIENDA.comune)
                ? `Sono di ${FORNITORE.comune}, come voi. I posti dove lavorate non li ho letti su una mappa.`
                : `Sono di ${FORNITORE.comune}, a pochi chilometri da voi. I posti dove lavorate non li ho letti su una mappa.`}
            </p>
            <p className="mt-6 text-sm uppercase tracking-widest text-bone/40">
              Tre proposte per {AZIENDA.nome}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.7} className="mt-16 flex items-center gap-3 text-sm text-bone/40">
          <ArrowDown size={16} />
          Scorri per vedere le bozze
        </Reveal>
      </motion.div>
    </section>
  );
}
