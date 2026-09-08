import { AlertTriangle, MapPin } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Occhiello } from '@/components/ui';
import { AZIENDA, DA_FORNIRE, INTESTAZIONI } from '@/data/cliente';

/**
 * I comuni dove il cliente lavora davvero.
 *
 * L'elenco non ci è stato dato: dal sito attuale si ricava solo Molinella e
 * "tutta l'Emilia-Romagna". Resta un segnaposto visibile, come la partita IVA:
 * un elenco di paesi inventato manderebbe fuori strada chi cerca l'impresa
 * vicino a casa.
 */
export default function Zone() {
  return (
    <section className="dark-section bg-ink px-5 py-24 text-bone sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Occhiello scuro>Dove lavoriamo</Occhiello>

        <div className="mt-4 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h2 className="titolo text-5xl sm:text-6xl">
              {AZIENDA.regione}, {INTESTAZIONI.zone.titolo}
            </h2>
            <p className="mt-6 max-w-prosa text-lg leading-relaxed text-bone/70">
              {INTESTAZIONI.zone.testo
                .replace('{comune}', AZIENDA.comune)
                .replace('{provincia}', AZIENDA.provincia)}
            </p>
          </div>

          <div className="rounded-3xl border border-cantiere/30 bg-cantiere/10 p-7">
            <p className="flex items-start gap-2.5 text-sm leading-relaxed text-cantiere">
              <AlertTriangle size={17} className="mt-0.5 shrink-0" />
              <span>
                {INTESTAZIONI.zone.avviso}
              </span>
            </p>
            <p className="mt-5 font-mono text-xs text-bone/40">
              {DA_FORNIRE.comuni}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {[AZIENDA.comune, '…', '…', '…', '…', '…'].map((c, i) => (
                <li
                  key={`${c}-${i}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm ${
                    i === 0
                      ? 'border-bone/25 text-bone'
                      : 'border-bone/10 text-bone/25'
                  }`}
                >
                  <MapPin size={13} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-14 border-t border-bone/10 pt-8">
          <p className="max-w-prosa text-bone/50">
            {INTESTAZIONI.zone.coda}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
