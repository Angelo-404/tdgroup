import { Check, Minus } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Occhiello } from '@/components/ui';
import { CONFRONTO, LIVELLI } from '@/data/livelli';
import { TEMPI, mancante } from '@/data/offerta';

/** La cifra, oppure un segnaposto giallo finché non è stata decisa. */
function Cifra({ valore }: { valore: string }) {
  if (mancante(valore)) {
    return (
      <span className="rounded bg-cantiere/20 px-2 py-0.5 text-sm font-normal text-bone/80">
        da definire
      </span>
    );
  }
  return <>{valore}</>;
}

/**
 * Tabella di confronto fra i tre livelli.
 *
 * Legge da src/data/livelli.ts, lo stesso file che decide quali blocchi monta
 * ogni pagina demo: quello che la tabella promette è quello che la demo mostra.
 *
 * Due forme, non una rimpicciolita. Sotto i 1024px la tabella diventa un elenco
 * di schede: una tabella a quattro colonne larga 46rem obbliga a scorrere di
 * lato, e chi legge perde di vista il nome della funzione mentre cerca le
 * spunte. Con lo zoom indietro il testo diventa illeggibile.
 *
 * La soglia è 1024 e non 768 perché la tabella non ci sta nemmeno su un tablet
 * in verticale: 46rem sono 736px, più i margini della sezione sfora già a
 * 768px. Fra 768 e 816px restava lo scorrimento manuale, che è il difetto che
 * si voleva togliere.
 */
export default function Confronto() {
  return (
    <section className="dark-section bg-ink px-5 py-24 text-bone sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Occhiello scuro>Confronto</Occhiello>
        <h2 className="titolo mt-4 max-w-3xl text-5xl sm:text-7xl">
          Cosa c&apos;è in ognuna.
        </h2>
        <p className="mt-6 max-w-prosa text-lg leading-relaxed text-bone/70">
          I livelli si sommano: <strong className="font-semibold">Completo</strong>{' '}
          contiene tutta la <strong className="font-semibold">Vetrina</strong>,{' '}
          <strong className="font-semibold">Portale</strong> contiene tutto il
          Completo. Non sono tre gusti diversi, è una scala. Si parte da un
          livello e si sale dopo, senza rifare niente da capo.
        </p>

        {/* Da desktop in su: la tabella, che regge il confronto a colpo d'occhio. */}
        <Reveal className="mt-12 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-bone/20">
                <th scope="col" className="w-2/5 pb-5 pr-6 align-bottom">
                  <span className="text-xs uppercase tracking-widest text-bone/40">
                    Funzione
                  </span>
                </th>
                {LIVELLI.map((l) => (
                  <th key={l.slug} scope="col" className="pb-5 pr-4 align-bottom">
                    <span className="font-display text-xs tracking-widest text-bone/35">
                      {l.numero}
                    </span>
                    <Link
                      href={`/demo/${l.slug}`}
                      className="mt-1 block font-display text-2xl tracking-tight underline decoration-cantiere decoration-2 underline-offset-4 transition-colors hover:text-cantiere"
                    >
                      {l.nome}
                    </Link>
                    <span className="mt-1 block text-xs font-normal text-bone/45">
                      {l.sottotitolo}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONFRONTO.map((r) => (
                <tr key={r.voce} className="border-b border-bone/15 align-top">
                  <th scope="row" className="py-4 pr-6 font-normal">
                    <span className="block font-medium">{r.voce}</span>
                    <span className="mt-1 block text-sm text-bone/50">{r.nota}</span>
                  </th>
                  {LIVELLI.map((l) => {
                    const incluso = r.in.includes(l.slug);
                    return (
                      <td key={l.slug} className="py-4 pr-4">
                        {incluso ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cantiere text-ink">
                            <Check size={15} strokeWidth={3} />
                            <span className="sr-only">incluso in {l.nome}</span>
                          </span>
                        ) : (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bone/10 text-bone/25">
                            <Minus size={15} strokeWidth={3} />
                            <span className="sr-only">non incluso in {l.nome}</span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            {/*
              Il prezzo sta in fondo e non in cima: prima si vede cosa si
              prende, poi quanto costa. Al contrario si sceglie la colonna più
              a sinistra prima di sapere cosa perde.
            */}
            <tfoot>
              <tr className="border-t-2 border-bone/25 align-top">
                <th scope="row" className="py-6 pr-6 font-normal">
                  <span className="block font-medium">Quanto ci vuole</span>
                  <span className="mt-1 block text-sm text-bone/50">
                    Dal vostro sì al sito online, revisioni comprese.
                  </span>
                </th>
                {LIVELLI.map((l) => (
                  <td key={l.slug} className="py-6 pr-4">
                    <span className="font-display text-2xl tracking-tight">
                      <Cifra valore={TEMPI[l.slug] ?? ''} />
                    </span>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </Reveal>

        {/* Sotto i 1024px: prezzi in cima, poi una scheda per funzione. */}
        <div className="mt-12 lg:hidden">
          <ul className="grid gap-3 sm:grid-cols-3">
            {LIVELLI.map((l) => (
              <li
                key={l.slug}
                className="rounded-2xl border border-bone/15 p-4"
              >
                <p className="font-display text-xs tracking-widest text-cantiere">
                  {l.numero}
                </p>
                <Link
                  href={`/demo/${l.slug}`}
                  className="titolo mt-1 block text-2xl underline decoration-cantiere decoration-2 underline-offset-4"
                >
                  {l.nome}
                </Link>
                <p className="mt-2 font-display text-xl tracking-tight">
                  <Cifra valore={TEMPI[l.slug] ?? ''} />
                </p>
                <p className="mt-1 text-sm text-bone/50">dal vostro sì</p>
              </li>
            ))}
          </ul>

          {/*
            La legenda evita di ripetere Vetrina/Completo/Portale su ognuna
            delle diciannove voci: con i nomi per esteso l'elenco diventava
            due volte più lungo dello schermo.
          */}
          <p className="mt-8 text-xs uppercase tracking-widest text-bone/40">
            {LIVELLI.map((l) => `${l.numero} ${l.nome}`).join(' · ')}
          </p>

          <ul className="mt-4 divide-y divide-bone/15 border-t border-bone/15">
            {CONFRONTO.map((r) => (
              <li key={r.voce} className="py-5">
                <p className="font-medium leading-snug">{r.voce}</p>
                <p className="mt-1 text-sm leading-relaxed text-bone/50">{r.nota}</p>
                <ul className="mt-3 flex gap-2">
                  {LIVELLI.map((l) => {
                    const incluso = r.in.includes(l.slug);
                    return (
                      <li key={l.slug}>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-xs tracking-widest ${
                            incluso
                              ? 'bg-cantiere text-ink'
                              : 'bg-bone/10 text-bone/30'
                          }`}
                        >
                          {l.numero}
                          {incluso ? (
                            <Check size={11} strokeWidth={3} />
                          ) : (
                            <Minus size={11} strokeWidth={3} />
                          )}
                          <span className="sr-only">
                            {incluso ? `incluso in ${l.nome}` : `non incluso in ${l.nome}`}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-prosa text-sm leading-relaxed text-bone/50">
          In ogni livello c&apos;è tutto quello che serve per stare online:
          l&apos;indirizzo del sito e lo spazio dove sta acceso per il primo anno,
          la scheda Google Business e il passaggio dal sito di adesso senza
          perdere le pagine che Google ha già in elenco. Dal secondo anno
          indirizzo e spazio si rinnovano a parte: è l&apos;unica spesa che torna
          ogni anno.
        </p>
        <p className="mt-4 max-w-prosa text-sm leading-relaxed text-bone/50">
          Il preventivo non è scritto qui: dipende da quali extra volete e da
          quanto materiale mi date già pronto. Ditemi il livello e ve lo faccio
          al telefono, in dieci minuti.
        </p>

        {/*
          Cosa comprende ogni livello, per esteso. La tabella qui sopra dice
          *cosa c'è*; queste schede dicono *cosa cambia nella giornata*, che è
          la domanda che il cliente si fa davvero davanti a una tabella di
          spunte.

          La griglia è volutamente asimmetrica: Vetrina e Completo affiancati,
          Portale a piena larghezza sotto. Il Portale non è un sito più grande
          ma uno strumento di gestione, e comprimerlo in un terzo di riga lo
          fa sembrare l'ultima colonna di un listino. La forma dice la taglia
          senza doverla scrivere.
        */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {LIVELLI.map((l) => {
            const grande = Boolean(l.dettaglio.coda);
            return (
              <Reveal
                key={l.slug}
                className={`rounded-3xl border p-7 sm:p-9 ${
                  grande
                    ? 'border-bone/20 bg-bone text-ink lg:col-span-2'
                    : 'border-bone/15 bg-bone/[0.04]'
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-xs tracking-widest text-cantiere">
                    {l.numero}
                  </span>
                  <h3 className="titolo text-3xl sm:text-4xl">{l.nome}</h3>
                  <span
                    className={`text-sm ${grande ? 'text-ink/45' : 'text-bone/45'}`}
                  >
                    {l.sottotitolo}
                  </span>
                </div>

                <p
                  className={`titolo mt-5 max-w-3xl text-2xl sm:text-3xl ${
                    grande ? 'text-ink' : 'text-bone'
                  }`}
                >
                  {l.dettaglio.claim}
                </p>

                <p
                  className={`mt-4 max-w-prosa leading-relaxed ${
                    grande ? 'text-ink/60' : 'text-bone/60'
                  }`}
                >
                  {l.perChi}
                </p>

                <ul
                  className={`mt-8 grid gap-x-10 gap-y-7 border-t pt-8 ${
                    grande
                      ? 'border-ink/15 lg:grid-cols-3'
                      : 'border-bone/15'
                  }`}
                >
                  {l.dettaglio.punti.map((punto) => (
                    <li key={punto.titolo}>
                      <h4
                        className={`font-medium leading-snug ${
                          grande ? 'text-ink' : 'text-bone'
                        }`}
                      >
                        {punto.titolo}
                      </h4>
                      <p
                        className={`mt-2 max-w-prosa text-sm leading-relaxed ${
                          grande ? 'text-ink/55' : 'text-bone/55'
                        }`}
                      >
                        {punto.testo}
                      </p>
                    </li>
                  ))}
                </ul>

                {/*
                  Solo il Portale ha la coda: fa doppio lavoro, mostra la
                  taglia reale del livello e apre agli extra della sezione
                  successiva, che sono il ricorrente.
                */}
                {l.dettaglio.coda ? (
                  <p className="mt-8 max-w-4xl border-l-2 border-cantiere pl-5 text-sm leading-relaxed text-ink/60">
                    {l.dettaglio.coda}
                  </p>
                ) : null}

                <Link
                  href={`/demo/${l.slug}`}
                  className={`mt-8 inline-block text-sm underline underline-offset-4 transition-colors hover:decoration-cantiere ${
                    grande ? 'decoration-ink/30' : 'decoration-bone/25'
                  }`}
                >
                  Apri l’anteprima {l.nome}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
