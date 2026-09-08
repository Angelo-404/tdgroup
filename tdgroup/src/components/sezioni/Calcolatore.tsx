'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  Building2,
  Check,
  DoorOpen,
  Droplets,
  Frame,
  Home,
  Layers,
  MessageCircle,
  Paintbrush,
  Square,
  Store,
  Thermometer,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Occhiello } from '@/components/ui';
import { AZIENDA, whatsapp } from '@/data/cliente';
import {
  AVVERTENZA,
  ESCLUSIONI,
  FINITURE,
  FONTE,
  LAVORAZIONI,
  euro,
  finituraByChiave,
  lavorazioneByChiave,
  scriviQuantita,
  stima,
} from '@/data/stime';
import { EASE } from '@/lib/motion';

/**
 * Le icone stanno qui e non in `stime.ts` perché quel file è il listino: deve
 * restare leggibile a chi ci mette dentro i prezzi veri, senza import di React.
 */
const ICONE: Record<string, LucideIcon> = {
  ristrutturazione: Layers,
  bagno: Bath,
  cappotto: Thermometer,
  tetto: Home,
  pavimenti: Square,
  cartongesso: Frame,
  tinteggiatura: Paintbrush,
  serramenti: DoorOpen,
  terrazzi: Droplets,
};

const IMMOBILI = [
  { valore: 'Appartamento', icona: Building2 },
  { valore: 'Villa o casa singola', icona: Home },
  { valore: 'Negozio o ufficio', icona: Store },
  { valore: 'Condominio', icona: Layers },
];

const TEMPI = ['Il prima possibile', 'Entro tre mesi', 'Entro l’anno', 'Sto solo valutando'];

const PASSI = ['immobile', 'lavorazione', 'quantita', 'finitura', 'tempi'] as const;
type Passo = (typeof PASSI)[number];

type Scelte = {
  immobile?: string;
  lavorazione?: string;
  quantita?: number;
  finitura?: string;
  tempi?: string;
};

const DOMANDE: Record<Passo, string> = {
  immobile: 'Che immobile è?',
  lavorazione: 'Che lavoro serve?',
  quantita: 'Quanto è grande?',
  finitura: 'Con che finiture?',
  tempi: 'Entro quando?',
};

export default function Calcolatore() {
  const [passo, setPasso] = useState(0);
  const [scelte, setScelte] = useState<Scelte>({});
  const [verso, setVerso] = useState(1);

  const finito = passo >= PASSI.length;
  const corrente = finito ? null : PASSI[passo];

  const lavorazione = scelte.lavorazione ? lavorazioneByChiave(scelte.lavorazione) : undefined;
  const finitura = scelte.finitura ? finituraByChiave(scelte.finitura) : undefined;

  const avanti = (patch: Scelte) => {
    setScelte((s) => ({ ...s, ...patch }));
    setVerso(1);
    setPasso((p) => p + 1);
  };

  /**
   * Cambiare lavorazione azzera la quantità: 90 scelti per una
   * ristrutturazione non significano niente su "quanti bagni".
   */
  const scegliLavorazione = (chiave: string) => {
    const nuova = lavorazioneByChiave(chiave);
    avanti({ lavorazione: chiave, quantita: nuova?.quantitaIniziale });
  };

  const indietro = () => {
    setVerso(-1);
    setPasso((p) => Math.max(0, p - 1));
  };

  const riparti = () => {
    setScelte({});
    setVerso(-1);
    setPasso(0);
  };

  const quantita = scelte.quantita ?? lavorazione?.quantitaIniziale ?? 0;
  const preventivo =
    lavorazione && finitura ? stima(lavorazione, quantita, finitura) : null;

  const quantitaScritta = lavorazione ? scriviQuantita(lavorazione, quantita) : '';

  const riepilogo: { etichetta: string; valore: string }[] = [
    { etichetta: 'Immobile', valore: scelte.immobile ?? '—' },
    { etichetta: 'Lavoro', valore: lavorazione?.nome ?? '—' },
    { etichetta: 'Dimensione', valore: quantitaScritta || '—' },
    { etichetta: 'Finiture', valore: finitura?.nome ?? '—' },
    { etichetta: 'Tempi', valore: scelte.tempi ?? '—' },
  ];

  const messaggio = [
    'Salve, vorrei un preventivo.',
    scelte.immobile && `Immobile: ${scelte.immobile}.`,
    lavorazione && `Lavoro: ${lavorazione.nome}.`,
    quantitaScritta && `Dimensione: ${quantitaScritta}.`,
    finitura && `Finiture: ${finitura.nome}.`,
    scelte.tempi && `Tempi: ${scelte.tempi}.`,
    preventivo &&
      `La stima sul sito dice ${euro(preventivo.min)} – ${euro(
        preventivo.max,
      )} IVA esclusa: vorrei sapere se è realistica per il mio caso.`,
  ]
    .filter(Boolean)
    .join(' ');

  const avanzamento = Math.round((Math.min(passo, PASSI.length) / PASSI.length) * 100);

  const classeScheda =
    'group flex flex-col items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ease-morbida hover:-translate-y-0.5 active:scale-[0.98]';

  return (
    <section id="preventivo" className="scroll-mt-20 bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <Occhiello>Stima dei costi</Occhiello>
        <h2 className="titolo mt-4 text-5xl sm:text-6xl">Cinque domande, una cifra.</h2>
        <p className="mt-6 max-w-prosa leading-relaxed text-ink/70">
          Nessun campo da compilare, nessuna email richiesta. Alla fine vedete una
          forbice di spesa e un messaggio WhatsApp già scritto: lo rileggete e lo
          mandate solo se vi va.
        </p>

        <div className="mt-12 rounded-3xl border border-ink/10 bg-white p-6 sm:p-10">
          <div className="flex items-center gap-4">
            {/*
              Larghezza in CSS, non in Framer: senza uno stato iniziale la
              barra al primo disegno risulterebbe piena.
            */}
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-cantiere transition-[width] duration-500 ease-morbida"
                style={{ width: `${avanzamento}%` }}
                role="progressbar"
                aria-valuenow={avanzamento}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Avanzamento della stima"
              />
            </div>
            <span className="shrink-0 text-sm tabular-nums text-ink/40">
              {Math.min(passo + (finito ? 0 : 1), PASSI.length)} / {PASSI.length}
            </span>
          </div>

          <div className="relative mt-8 min-h-[24rem]">
            {/*
              Niente AnimatePresence qui, ed è una scelta obbligata.
              Con `mode="wait"` il passo nuovo si monta solo quando l'uscita
              del precedente ha finito, e quell'uscita restava appesa a metà
              (`opacity: 1; translateX(-25.9px)` invece di arrivare a -48):
              il contatore saliva a 2/5 ma la domanda restava la prima, e non
              si arrivava mai al messaggio WhatsApp finale.

              Basta la `key`: quando cambia, React rimonta il blocco e
              l'animazione d'ingresso riparte da sola. Nessuna transizione da
              aspettare, quindi niente da lasciare a metà. Si perde l'uscita
              in dissolvenza, che nessuno rimpiangerà: l'ingresso c'è ancora e
              `min-h-[24rem]` sul contenitore evita il salto d'altezza.
            */}
            {corrente ? (
                <motion.div
                  key={corrente}
                  initial={{ opacity: 0, x: verso * 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h3 className="titolo text-3xl">
                    {corrente === 'quantita' && lavorazione
                      ? lavorazione.domandaQuantita
                      : DOMANDE[corrente]}
                  </h3>

                  {corrente === 'immobile' && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {IMMOBILI.map((o) => {
                        const Icona = o.icona;
                        const attivo = scelte.immobile === o.valore;
                        return (
                          <button
                            key={o.valore}
                            type="button"
                            onClick={() => avanti({ immobile: o.valore })}
                            className={`${classeScheda} ${
                              attivo
                                ? 'border-cantiere bg-cantiere/10'
                                : 'border-ink/10 hover:border-ink/30'
                            }`}
                          >
                            <Icona
                              size={30}
                              strokeWidth={1.4}
                              className={attivo ? 'text-cantiere' : 'text-ink/35'}
                            />
                            <span className="font-medium leading-snug">{o.valore}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {corrente === 'lavorazione' && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {LAVORAZIONI.map((l) => {
                        const Icona = ICONE[l.chiave];
                        const attivo = scelte.lavorazione === l.chiave;
                        return (
                          <button
                            key={l.chiave}
                            type="button"
                            onClick={() => scegliLavorazione(l.chiave)}
                            className={`${classeScheda} gap-3 p-4 ${
                              attivo
                                ? 'border-cantiere bg-cantiere/10'
                                : 'border-ink/10 hover:border-ink/30'
                            }`}
                          >
                            <Icona
                              size={26}
                              strokeWidth={1.4}
                              className={attivo ? 'text-cantiere' : 'text-ink/35'}
                            />
                            <span className="text-sm font-medium leading-snug">{l.nome}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {corrente === 'quantita' && lavorazione && (
                    <div className="mt-7">
                      <p className="text-sm text-ink/50">{lavorazione.precisazione}</p>

                      <p className="mt-8 text-center">
                        <span className="titolo text-6xl tabular-nums">{quantita}</span>
                        <span className="ml-2 text-xl text-ink/45">{lavorazione.unita}</span>
                      </p>

                      <input
                        type="range"
                        min={lavorazione.quantitaMin}
                        max={lavorazione.quantitaMax}
                        step={lavorazione.passo}
                        value={quantita}
                        onChange={(e) =>
                          setScelte((s) => ({ ...s, quantita: Number(e.target.value) }))
                        }
                        aria-label={lavorazione.domandaQuantita}
                        className="mt-8 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-cantiere"
                      />
                      <div className="mt-3 flex justify-between text-xs tabular-nums text-ink/35">
                        <span>
                          {lavorazione.quantitaMin} {lavorazione.unita}
                        </span>
                        <span>
                          {lavorazione.quantitaMax} {lavorazione.unita} e oltre
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => avanti({ quantita })}
                        className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 font-medium text-bone transition-transform duration-300 ease-morbida hover:scale-[1.03] active:scale-95"
                      >
                        Continua
                        <ArrowRight size={18} strokeWidth={2.2} />
                      </button>
                    </div>
                  )}

                  {corrente === 'finitura' && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {FINITURE.map((f) => {
                        const attivo = scelte.finitura === f.chiave;
                        return (
                          <button
                            key={f.chiave}
                            type="button"
                            onClick={() => avanti({ finitura: f.chiave })}
                            className={`${classeScheda} gap-2 ${
                              attivo
                                ? 'border-cantiere bg-cantiere/10'
                                : 'border-ink/10 hover:border-ink/30'
                            }`}
                          >
                            <span className="font-medium leading-snug">{f.nome}</span>
                            <span className="text-sm leading-relaxed text-ink/50">
                              {f.nota}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {corrente === 'tempi' && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {TEMPI.map((t) => {
                        const attivo = scelte.tempi === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => avanti({ tempi: t })}
                            className={`${classeScheda} ${
                              attivo
                                ? 'border-cantiere bg-cantiere/10'
                                : 'border-ink/10 hover:border-ink/30'
                            }`}
                          >
                            <Check
                              size={26}
                              strokeWidth={1.6}
                              className={attivo ? 'text-cantiere' : 'text-ink/35'}
                            />
                            <span className="font-medium leading-snug">{t}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {passo > 0 && (
                    <button
                      type="button"
                      onClick={indietro}
                      className="mt-7 inline-flex items-center gap-2 text-sm text-ink/45 transition-colors hover:text-ink"
                    >
                      <ArrowLeft size={15} />
                      Indietro
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="fine"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Occhiello>Ordine di grandezza</Occhiello>

                  {preventivo && (
                    <p className="titolo mt-3 text-4xl leading-tight tabular-nums sm:text-5xl">
                      {euro(preventivo.min)}
                      <span className="text-ink/30"> – </span>
                      {euro(preventivo.max)}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-ink/45">IVA esclusa. {FONTE}</p>
                  {/*
                    Detto qui e non solo nella tabella: è il punto in cui il
                    visitatore guarda la cifra, ed è lì che deve sapere da dove
                    viene. Sparisce quando i prezzi diventano quelli veri.
                  */}
                  <p className="mt-3 rounded-lg bg-cantiere/15 px-3 py-2 text-sm leading-relaxed text-ink/70">
                    In questa bozza le fasce sono di mercato. Online il
                    calcolatore parte dal listino di {AZIENDA.nome}, quindi la
                    cifra che compare qui sarà la loro, non una media.
                  </p>

                  <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                    {riepilogo.map((r) => (
                      <div
                        key={r.etichetta}
                        className="py-3 sm:flex sm:justify-between sm:gap-6"
                      >
                        <dt className="text-sm text-ink/45">{r.etichetta}</dt>
                        <dd className="mt-1 text-sm font-medium sm:mt-0 sm:text-right">
                          {r.valore}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8 rounded-2xl bg-ink/[0.04] p-5">
                    <p className="text-sm font-medium">Nella cifra non c’è:</p>
                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/60">
                      {[...ESCLUSIONI, ...(lavorazione?.escluso ? [lavorazione.escluso] : [])].map(
                        (e) => (
                          <li key={e} className="flex gap-2.5">
                            <span className="mt-2 h-px w-3 shrink-0 bg-ink/25" />
                            {e}
                          </li>
                        ),
                      )}
                    </ul>
                    <p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-relaxed text-ink/60">
                      {AVVERTENZA}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={whatsapp(messaggio)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-cantiere px-6 py-3.5 font-medium text-ink transition-transform duration-300 ease-morbida hover:scale-[1.03] active:scale-95"
                    >
                      <MessageCircle size={18} strokeWidth={2.2} />
                      Fatevela confermare su WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={riparti}
                      className="rounded-full border border-ink/20 px-6 py-3.5 font-medium transition-colors duration-300 hover:bg-ink/5"
                    >
                      Ricomincia
                    </button>
                  </div>
                </motion.div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
