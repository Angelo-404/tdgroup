'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BottoniContatto } from '@/components/Contatto';
import Foto from '@/components/Foto';
import { Reveal, Words } from '@/components/Reveal';
import { AZIENDA, FOTO_APERTURA, foto } from '@/data/cliente';

// Quale immagine apre la homepage lo decide il cliente, in contenuti.ts:
// qui c'era lo slug di una foto di TD Group, e su ogni altro cliente
// l'apertura finiva scelta dal ripiego, cioè dall'ordine alfabetico.
const APERTURA = foto(FOTO_APERTURA.slug, FOTO_APERTURA.ripiego);

export default function Hero({
  titolo,
  accento,
}: {
  titolo: string;
  accento: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yFoto = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scala = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const yTesto = useTransform(scrollYProgress, [0, 1], ['0%', '55%']);

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
      className="dark-section relative flex h-[100svh] items-center justify-center overflow-hidden bg-ink text-bone"
    >
      <motion.div
        style={ridotto ? undefined : { y: yFoto, scale: scala }}
        className="absolute inset-0"
      >
        <Foto foto={APERTURA} priority sizes="100vw" className="h-full w-full object-cover" />
      </motion.div>

      {/*
        Doppio velo: uno piatto che garantisce il contrasto del titolo su
        qualunque foto, uno a gradiente che salda l'immagine alla sezione
        successiva. Con una sola sfumatura il testo restava illeggibile sui
        cieli chiari.
      */}
      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />

      <motion.div
        style={ridotto ? undefined : { y: yTesto }}
        className="relative mx-auto max-w-5xl px-5 text-center sm:px-8"
      >
        {/*
          11vw, non 13: "Ristrutturiamo" e una parola sola di 14 lettere e a
          13vw usciva di 39px dalla colonna, tagliata dal ritaglio della
          sezione. “hyphens” non aiuta, il titolo va spezzato solo dove
          decidiamo noi.
        */}
        <h1 className="titolo text-[11vw] leading-[0.92] sm:text-[9vw] sm:leading-[0.88]">
          <span className="block">
            <Words testo={titolo} />
          </span>
          <span className="block text-cantiere">
            <Words testo={accento} delay={0.15} />
          </span>
        </h1>

        <Reveal delay={0.5}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-bone/70">
            {AZIENDA.descrizione} a {AZIENDA.comune}. Un solo interlocutore dalla
            prima misura alla consegna, in tutta l&apos;{AZIENDA.regione}.
          </p>
        </Reveal>

        <Reveal delay={0.65}>
          <BottoniContatto
            scuro
            className="mt-10 justify-center"
            messaggio="Salve, vorrei un preventivo per una ristrutturazione."
          />
        </Reveal>
      </motion.div>
    </section>
  );
}
