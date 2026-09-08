'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AZIENDA } from '@/data/cliente';
import { FORNITORE } from '@/data/fornitore';
import { LIVELLI } from '@/data/livelli';
import { EASE } from '@/lib/motion';
import { bloccaScorrimento } from '@/lib/scroll';

const VOCI = [
  { href: '/', etichetta: 'Livelli' },
  ...LIVELLI.map((l) => ({ href: `/demo/${l.slug}`, etichetta: l.nome })),
];

export default function DemoHeader() {
  const percorso = usePathname();

  /*
    Il numero nel banner è sempre quello del fornitore, anche dentro le demo.
    Questa barra non fa parte del sito di TD Group: ha il badge "bozze" e le
    voci per saltare da un livello all'altro, roba che nel sito vero non
    esisterebbe. È l'involucro della presentazione, quindi parla il fornitore.
    Il recapito di TD Group resta dentro le pagine demo — hero, chiusura,
    footer, pulsante WhatsApp — che invece sono il loro sito.
  */
  const [aperto, setAperto] = useState(false);
  const [scorso, setScorso] = useState(false);

  useEffect(() => setAperto(false), [percorso]);

  useEffect(() => {
    const onScroll = () => setScorso(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /*
    Col menu a tutto schermo aperto lo sfondo non deve scorrere. Lenis scorre
    <html>: `document.body.style.overflow` non lo ferma, va fermato Lenis.
  */
  useEffect(() => {
    bloccaScorrimento(aperto);
    return () => bloccaScorrimento(false);
  }, [aperto]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-morbida ${
          scorso ? 'backdrop-blur-md bg-ink/70' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-bone"
          >
            {AZIENDA.nome}
            <span className="rounded-full border border-bone/25 px-2 py-0.5 text-[10px] font-normal uppercase tracking-wider text-bone/60">
              bozze
            </span>
            {/*
              Chi le ha fatte, accanto a per chi sono fatte. Sotto sm sparisce:
              a 375px il nome e il badge non stanno insieme all'hamburger.
            */}
            <span className="hidden border-l border-bone/20 pl-2 font-normal text-bone/50 sm:inline">
              {FORNITORE.nome}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {VOCI.map((b) => {
              const attivo = percorso === b.href;
              return (
                <Link
                  key={b.href}
                  href={b.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    attivo
                      ? 'bg-bone/15 text-bone'
                      : 'text-bone/60 hover:bg-bone/10 hover:text-bone'
                  }`}
                >
                  {b.etichetta}
                </Link>
              );
            })}
            <a
              href={FORNITORE.telefonoHref}
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-cantiere px-4 py-2 text-sm font-medium text-ink transition-transform duration-300 ease-morbida hover:scale-[1.03] active:scale-95"
            >
              <Phone size={15} strokeWidth={2.2} />
              {FORNITORE.telefono}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setAperto((v) => !v)}
            className="rounded-full p-2 text-bone md:hidden"
            aria-label={aperto ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={aperto}
          >
            {aperto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {aperto && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 overflow-y-auto bg-ink px-8 py-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {VOCI.map((b, i) => (
              <motion.div
                key={b.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, ease: EASE, duration: 0.5 }}
              >
                <Link
                  href={b.href}
                  className="block py-3 font-display text-3xl tracking-tighter text-bone"
                >
                  {b.etichetta}
                </Link>
              </motion.div>
            ))}
            <a
              href={FORNITORE.telefonoHref}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-cantiere px-6 py-3 font-medium text-ink"
            >
              <Phone size={18} strokeWidth={2.2} />
              {FORNITORE.telefono}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
