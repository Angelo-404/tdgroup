'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Eye,
  Image as ImgIcon,
  LayoutDashboard,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Foto from '@/components/Foto';
import { Occhiello } from '@/components/ui';
import { FOTO } from '@/data/cliente';
import { EASE } from '@/lib/motion';

type Riga = {
  id: string;
  titolo: string;
  servizio: string;
  stato: 'Pubblicato' | 'Bozza';
  fotoSlug: string;
};

const INIZIALI: Riga[] = FOTO.filter((f) => f.cantiere)
  .slice(0, 6)
  .map((f, i) => ({
    id: f.slug,
    titolo: f.cantiere as string,
    servizio: f.servizioNome,
    stato: i % 3 === 2 ? 'Bozza' : 'Pubblicato',
    fotoSlug: f.slug,
  }));

const CANDIDATE = FOTO.filter((f) => !INIZIALI.some((r) => r.fotoSlug === f.slug));

/**
 * `caricamento` distingue i due livelli, e la differenza è reale:
 *
 *   Completo — scelgono fra le foto già in archivio: spuntano quali mostrare
 *              e in che ordine, senza caricare niente di nuovo.
 *   Portale  — caricano anche foto di cantieri appena finiti, dal telefono.
 *
 * Sono due righe distinte della tabella di confronto: la demo deve mostrare
 * la differenza, o la tabella promette una cosa e la bozza un'altra.
 */
export default function AdminSimulato({
  caricamento = false,
}: {
  caricamento?: boolean;
}) {
  const [vista, setVista] = useState<'sito' | 'admin'>('admin');
  const [righe, setRighe] = useState<Riga[]>(INIZIALI);
  const [archivioAperto, setArchivioAperto] = useState(false);
  const [notaCarica, setNotaCarica] = useState(false);

  const scegli = (slug: string) => {
    const f = CANDIDATE.find((c) => c.slug === slug);
    if (!f) return;
    setRighe((r) =>
      r.some((x) => x.fotoSlug === slug)
        ? r.filter((x) => x.fotoSlug !== slug)
        : [
            {
              id: `${f.slug}-${Date.now()}`,
              titolo: f.cantiere ?? f.servizioNome,
              servizio: f.servizioNome,
              stato: 'Bozza',
              fotoSlug: f.slug,
            },
            ...r,
          ],
    );
  };

  const elimina = (id: string) => setRighe((r) => r.filter((x) => x.id !== id));

  const cambiaStato = (id: string) =>
    setRighe((r) =>
      r.map((x) =>
        x.id === id
          ? { ...x, stato: x.stato === 'Pubblicato' ? 'Bozza' : 'Pubblicato' }
          : x,
      ),
    );

  const pubblicate = righe.filter((r) => r.stato === 'Pubblicato');

  return (
    <section className="dark-section bg-ink px-5 py-24 text-bone sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Occhiello scuro>Gestione</Occhiello>
        <h2 className="titolo mt-4 max-w-3xl text-5xl sm:text-7xl">
          {caricamento ? 'I lavori li caricate voi.' : 'I lavori li scegliete voi.'}
        </h2>
        <p className="mt-6 max-w-prosa text-lg leading-relaxed text-bone/60">
          {caricamento ? (
            <>
              Le {FOTO.length} foto del vostro archivio sono già qui, e da questa
              schermata caricate anche quelle dei cantieri appena finiti, dal
              telefono. Provate: aggiungete, nascondete, guardate cosa cambia sul
              sito.
            </>
          ) : (
            <>
              Le {FOTO.length} foto del vostro archivio sono già caricate.
              Da qui aprite la galleria, spuntate quali mostrare e in che ordine.
              Nessuna telefonata, nessuna attesa. Provate: aggiungete, nascondete,
              guardate cosa cambia sul sito.
            </>
          )}
        </p>

        <div className="mt-10 inline-flex rounded-full border border-bone/15 p-1">
          {(['admin', 'sito'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVista(v)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors duration-300 ${
                vista === v ? 'bg-bone text-ink' : 'text-bone/60 hover:text-bone'
              }`}
              aria-pressed={vista === v}
            >
              {v === 'admin' ? <LayoutDashboard size={15} /> : <Eye size={15} />}
              {v === 'admin' ? 'Vista admin' : 'Vista sito'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {vista === 'admin' ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-8 overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.03]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 px-5 py-4">
                <p className="text-sm text-bone/60">
                  {righe.length} lavori · {pubblicate.length} pubblicati
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {caricamento && (
                    <button
                      type="button"
                      onClick={() => setNotaCarica((v) => !v)}
                      aria-expanded={notaCarica}
                      className={`inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-sm transition-colors duration-300 ${
                        notaCarica
                          ? 'border-cantiere/60 text-cantiere'
                          : 'border-bone/25 text-bone/50 hover:border-bone/40 hover:text-bone/75'
                      }`}
                    >
                      <Upload size={15} strokeWidth={2.2} />
                      Carica dal telefono
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setArchivioAperto((v) => !v)}
                    aria-expanded={archivioAperto}
                    className="inline-flex items-center gap-2 rounded-full bg-cantiere px-4 py-2 text-sm font-medium text-ink transition-transform duration-300 ease-morbida hover:scale-[1.03] active:scale-95"
                  >
                    {archivioAperto ? (
                      <X size={15} strokeWidth={2.5} />
                    ) : (
                      <Plus size={15} strokeWidth={2.5} />
                    )}
                    {archivioAperto ? 'Chiudi archivio' : 'Scegli dall’archivio'}
                  </button>
                </div>
              </div>

              {/*
                Il caricamento è l'unica cosa che una bozza statica non può
                simulare davvero: non c'è dove mettere il file. Meglio dirlo
                al click che lasciare un pulsante che non risponde.
              */}
              <AnimatePresence initial={false}>
                {notaCarica && (
                  <motion.div
                    key="nota"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden border-b border-bone/10 bg-cantiere/[0.07]"
                  >
                    <p className="max-w-prosa px-5 py-4 text-sm leading-relaxed text-bone/70">
                      Nel Portale vero da qui si apre il rullino del telefono. La
                      foto viene ridotta e convertita da sola, così pesa poco
                      anche se arriva a piena risoluzione, e vi viene chiesta una
                      riga di descrizione: è quella che Google legge e che oggi,
                      sul vostro sito, manca in 340 foto su 583. In questa bozza
                      non c&apos;è niente da caricare — le foto dell&apos;archivio
                      si scelgono qui accanto.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {archivioAperto && (
                  <motion.div
                    key="archivio"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden border-b border-bone/10 bg-bone/[0.02]"
                  >
                    <div className="px-5 py-4">
                      <p className="text-sm text-bone/60">
                        {caricamento
                          ? 'Le foto già in archivio. Le nuove si aggiungono qui sopra, dal telefono.'
                          : 'Le foto già in archivio. Toccatene una per metterla in pagina, toccatela di nuovo per toglierla.'}
                      </p>
                      {/*
                        Solo le prime trentasei: in un archivio da centinaia di
                        foto la galleria vera avrà filtro e paginazione, ma qui
                        serve mostrare il gesto, non reggere il volume.
                      */}
                      <ul className="mt-4 grid max-h-72 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-6">
                        {CANDIDATE.slice(0, 36).map((f) => {
                          const scelta = righe.some((r) => r.fotoSlug === f.slug);
                          return (
                            <li key={f.slug}>
                              <button
                                type="button"
                                onClick={() => scegli(f.slug)}
                                aria-pressed={scelta}
                                className={`relative block aspect-square w-full overflow-hidden rounded-lg transition-all duration-300 ease-morbida hover:scale-[1.03] ${
                                  scelta ? 'ring-2 ring-cantiere' : 'opacity-70 hover:opacity-100'
                                }`}
                              >
                                <Foto
                                  foto={f}
                                  sizes="120px"
                                  className="h-full w-full object-cover"
                                />
                                {scelta && (
                                  <span className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cantiere text-ink">
                                    <Check size={12} strokeWidth={3} />
                                  </span>
                                )}
                                <span className="sr-only">{f.alt}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <ul className="divide-y divide-bone/10">
                <AnimatePresence initial={false}>
                  {righe.map((r) => {
                    const foto = FOTO.find((f) => f.slug === r.fotoSlug);
                    return (
                      <motion.li
                        key={r.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3"
                      >
                        <div className="h-11 w-16 shrink-0 overflow-hidden rounded-md bg-bone/10">
                          {foto ? (
                            <Foto
                              foto={foto}
                              sizes="64px"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImgIcon size={16} className="m-auto text-bone/30" />
                          )}
                        </div>

                        {/*
                          Sotto le 9rem di titolo i due comandi vanno a capo
                          invece di comprimere la colonna del testo: a 320px si
                          riduceva a 11px e il nome del cantiere spariva.
                        */}
                        <div className="min-w-[9rem] flex-1">
                          <p className="truncate text-sm font-medium">{r.titolo}</p>
                          <p className="truncate text-xs text-bone/45">{r.servizio}</p>
                        </div>

                        <div className="ml-auto flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => cambiaStato(r.id)}
                            className={`rounded-full px-3 py-1 text-xs transition-colors duration-300 ${
                              r.stato === 'Pubblicato'
                                ? 'bg-cantiere/20 text-cantiere hover:bg-cantiere/30'
                                : 'bg-bone/10 text-bone/50 hover:bg-bone/20'
                            }`}
                          >
                            {r.stato}
                          </button>

                          <button
                            type="button"
                            onClick={() => elimina(r.id)}
                            aria-label={`Elimina ${r.titolo}`}
                            className="rounded-full p-2 text-bone/35 transition-colors duration-300 hover:bg-bone/10 hover:text-bone"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="sito"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-8"
            >
              {pubblicate.length === 0 ? (
                <p className="rounded-2xl border border-bone/10 p-10 text-center text-bone/50">
                  Nessun lavoro pubblicato: sul sito questa sezione sparisce.
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {pubblicate.map((r) => {
                    const foto = FOTO.find((f) => f.slug === r.fotoSlug);
                    if (!foto) return null;
                    return (
                      <motion.li
                        key={r.id}
                        layout
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                      >
                        <Foto
                          foto={foto}
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4">
                          <p className="font-display tracking-tight">{r.titolo}</p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 text-xs text-bone/35">
          Questa è una dimostrazione: quello che scegliete qui resta solo
          qui e sparisce ricaricando la pagina. Nel sito vero le
          scelte si salvano e restano.
        </p>
      </div>
    </section>
  );
}
