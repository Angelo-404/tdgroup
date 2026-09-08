'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BottoniContatto } from '@/components/Contatto';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Occhiello, ValoreProva } from '@/components/ui';
import { AZIENDA, CHI_SIAMO, LOGO, PROVE } from '@/data/cliente';

/**
 * Chi è TD Group, con i numeri in evidenza. Dal livello Completo in su.
 *
 * Al posto della foto di cantiere che stava qui c'è il marchio, trattato come
 * la foto dell'hero: sta sotto al testo, non accanto, e scorre più lento della
 * pagina. Una foto di cappotto in questo punto raccontava un lavoro, non
 * l'azienda; il marchio invece è esattamente ciò di cui parla il paragrafo.
 *
 * Il file arriva da `LOGO` nei dati del cliente ed è generato da
 * `scripts/logo-chiaro.js` a
 * partire dall'originale. L'originale è nero e giallo su bianco pieno: qui
 * servirebbe trasparente (o si vedrebbe il rettangolo bianco) e con i tratti
 * schiariti (o il nero sparirebbe sul fondo scuro). Il giallo del marchio è
 * rimasto quello.
 *
 * Il velo a sinistra non è decorativo: il marchio arriva sotto la colonna di
 * testo e senza quella sfumatura le lettere del titolo cadrebbero sopra i
 * tratti chiari del logo, illeggibili.
 */
export default function Statistiche() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const scala = useTransform(scrollYProgress, [0, 1], [1.08, 0.98]);

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
      className="dark-section relative overflow-hidden bg-ink px-5 py-24 text-bone sm:px-8 sm:py-32"
    >
      {/*
        Il marchio in filigrana c'e' solo se il cliente ce l'ha dato. Senza,
        la sezione si rende pulita: prima il percorso del file era scritto qui
        dentro, e il logo di TD Group finiva addosso a ogni altro cliente.
      */}
      {LOGO && (
      <motion.div
        style={ridotto ? undefined : { y, scale: scala }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex h-[68%] items-end justify-center px-5 pb-8 sm:items-center sm:justify-end sm:px-8 sm:pb-0"
      >
        {/*
          `<picture>` senza `<source>`: il WebP di questo file pesa 33 KB
          contro i 23 KB del PNG con palette, perché il marchio è a due colori
          piatti e la palette lo comprime meglio di qualunque codec fotografico.
          L'involucro resta perché è quello che rende lecito l'`<img>` diretto
          invece di `next/image`, che qui non serve: il file è già alla misura
          giusta e non ha varianti da servire.
        */}
        <picture>
          <img
            src={LOGO.src}
            alt=""
            width={LOGO.w}
            height={LOGO.h}
            loading="lazy"
            decoding="async"
            className="h-auto max-h-[34%] w-auto max-w-[76%] object-contain opacity-[0.45] sm:max-h-[58%] sm:max-w-[48%] sm:opacity-[0.4] lg:max-w-[40%] lg:opacity-[0.55]"
          />
        </picture>
      </motion.div>
      )}

      {/*
        Due veli, non uno, perché il marchio cambia posto col formato dello
        schermo e il velo deve seguirlo.

        Da 640px in su il marchio sta a destra, dietro alla colonna di testo:
        serve una sfumatura orizzontale che scurisca la parte sinistra, o le
        lettere del titolo cadono sopra i tratti chiari del logo.

        Sotto i 640px quello spazio laterale non esiste: il marchio scende
        sotto ai pulsanti, dove la colonna è finita. Lì la sfumatura giusta è
        verticale — scura in alto dov'è il testo, trasparente in basso dov'è
        il marchio. Con la sfumatura orizzontale su schermo stretto il velo
        copriva tutta la larghezza e mangiava anche il logo: era il motivo
        per cui su telefono non si vedeva niente.
      */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-transparent sm:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/80 to-transparent sm:block lg:via-ink/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <Occhiello scuro>
          {AZIENDA.comune} ({AZIENDA.provincia}) · {AZIENDA.regione}
        </Occhiello>

        <Reveal className="mt-8">
          <h2 className="titolo text-5xl sm:text-6xl">Chi siamo.</h2>
          <p className="mt-6 max-w-prosa text-lg leading-relaxed text-bone/70">
            {AZIENDA.ragioneSociale} {CHI_SIAMO}
          </p>
          <BottoniContatto
            scuro
            className="mt-9"
            messaggio={`Salve, vorrei parlare di un lavoro con ${AZIENDA.nome}.`}
          />
        </Reveal>

        <RevealGroup
          className="mt-24 grid gap-8 border-t border-bone/10 pt-10 sm:grid-cols-3 lg:grid-cols-5"
          ritardo={0.07}
        >
          {PROVE.map((p) => (
            <RevealItem key={p.etichetta}>
              <p>
                <ValoreProva
                  valore={p.valore}
                  className="titolo text-3xl text-cantiere sm:text-4xl"
                />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-bone/40">
                {p.etichetta}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
