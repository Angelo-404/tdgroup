import { Plus } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Occhiello } from '@/components/ui';
import { EXTRA } from '@/data/livelli';

/**
 * Quello che non sta in nessuno dei tre livelli.
 *
 * Sta subito sotto la tabella di confronto perché è la domanda successiva:
 * visto cosa c'è nei pacchetti, cosa si può aggiungere. Legge da EXTRA in
 * src/data/livelli.ts, stessa fonte dei livelli.
 *
 * Niente prezzi neanche qui: si quotano a voce, voce per voce.
 */
export default function Extra() {
  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Occhiello>Fuori preventivo</Occhiello>
        <h2 className="titolo mt-4 max-w-3xl text-5xl sm:text-7xl">
          Quello che posso fare dopo.
        </h2>
        <p className="mt-6 max-w-prosa text-lg leading-relaxed text-ink/60">
          Questo elenco serve a farvi vedere fin dove si può arrivare, non a
          vendervelo adesso. Non serve niente di tutto questo perché il sito
          funzioni.
        </p>

        {/*
          Il cartiglio è l'unica cosa che separa questa sezione dal listino
          vero: senza, trentadue voci sotto una tabella di prezzi sembrano
          altrettante righe del preventivo.
        */}
        <div className="mt-8 max-w-prosa rounded-2xl border border-cantiere bg-cantiere/15 p-5">
          <p className="font-medium text-ink">
            Niente di quello che segue è compreso nel prezzo qui sopra.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">
            Sono voci separate, ognuna con il suo costo, da decidere una alla
            volta e anche a distanza di mesi. Il sito parte e funziona senza.
          </p>
        </div>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {EXTRA.map((g) => (
            <div
              key={g.gruppo}
              className="grid gap-x-12 gap-y-8 border-t border-ink/15 pt-10 lg:grid-cols-[minmax(0,18rem)_1fr]"
            >
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <h3 className="titolo text-2xl leading-tight sm:text-3xl">
                    {g.gruppo}
                  </h3>
                  <p className="mt-4 max-w-prosa text-sm leading-relaxed text-ink/55">
                    {g.intro}
                  </p>
                </div>
              </Reveal>

              <RevealGroup
                className="grid gap-x-10 gap-y-9 sm:grid-cols-2"
                ritardo={0.06}
              >
                {g.voci.map((v) => (
                  <RevealItem key={v.nome}>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/45">
                        <Plus size={13} strokeWidth={3} />
                      </span>
                      <div>
                        <h4 className="font-medium leading-snug">{v.nome}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                          {v.testo}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
