import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Occhiello } from '@/components/ui';
import { STATO } from '@/data/cliente';

/**
 * Cosa c'e' online adesso, con i numeri.
 *
 * Sta subito prima del footer, cioe' subito prima della decisione: e' la
 * risposta alla domanda che TD Group si fa per ultima, "e se lasciassimo tutto
 * com'e'?".
 *
 * Regola di tono, non negoziabile: il soggetto di ogni frase e' il software,
 * mai TD Group. Il sito attuale puo' averlo messo su qualcuno di famiglia, e
 * un cliente da acquisire non si convince dicendogli che ha sbagliato. Astra
 * e' arrivato con dentro le sue pagine dimostrative ed Elementor stampa il suo
 * codice per conto suo: sono cose che quei programmi fanno da soli. Il
 * rimprovero non c'e' perche' non serve, e perche' sarebbe rivolto alla
 * persona sbagliata.
 *
 * Ogni numero e' contato sui file scaricati in `scraped/`, mai stimato. La
 * fonte di ognuno e' AUDIT.md, rilevazione del 4 settembre 2026:
 *   3     -> AUDIT 2.1 / 2.3 (P.IVA, REA, sede: assenti in 21 pagine)
 *   Kyle  -> AUDIT 3.1 / 3.2 (pagine dimostrative del tema mai rimosse)
 *   340   -> AUDIT 4.5 (alt text uguale al nome del file, su 583 foto)
 *   155   -> AUDIT 5 (110 KB CSS + 45 KB JS inline per pagina)
 *   05    -> AUDIT 4.7 (nessuno schema LocalBusiness / GeneralContractor)
 * Se AUDIT.md cambia, questi vanno rifatti: non sono decorazione.
 */
// Il cliente senza sito puo' avere STATO a null: allora la sezione non si rende.
const SEZIONE = STATO;

export default function Stato() {
  if (!SEZIONE) return null;
  const { occhiello, titolo, intro, punti: RILIEVI } = SEZIONE;

  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Occhiello>{occhiello}</Occhiello>
          <h2 className="titolo mt-4 max-w-4xl text-5xl sm:text-7xl">{titolo}</h2>
          <p className="mt-6 max-w-prosa text-lg leading-relaxed text-ink/70">
            {intro}
          </p>
        </Reveal>

        <RevealGroup className="mt-20 grid gap-x-12 gap-y-16 sm:grid-cols-2" ritardo={0.1}>
          {RILIEVI.map((r) => (
            <RevealItem key={r.n}>
              <span className="font-display text-xs tracking-widest text-ink/35">
                {r.n}
              </span>

              {/*
                Come in Perche.tsx: la cifra grande esiste solo dove c'e' un
                numero contato. Il punto 02 non ne ha uno onesto ("una pagina
                dimostrativa" non e' una statistica) e allora non ne mette.
              */}
              {r.dato ? (
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="titolo text-5xl text-ink sm:text-6xl">
                    {r.dato}
                  </span>
                  <span className="max-w-[13rem] text-sm leading-snug text-ink/50">
                    {r.didascalia}
                  </span>
                </p>
              ) : null}

              <h3 className={`titolo text-2xl sm:text-3xl ${r.dato ? 'mt-6' : 'mt-4'}`}>
                {r.titolo}
              </h3>
              <p className="mt-4 max-w-prosa leading-relaxed text-ink/60">
                {r.testo}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/*
          La chiusura ammette che meta' dei rilievi si chiude senza comprare
          niente. Toglie forza alla vendita e la restituisce alla fiducia: chi
          legge capisce che i numeri qui sopra sono stati messi per informarlo,
          non per spaventarlo. E il confine fra le due meta' e' vero.
        */}
        <Reveal className="mt-20 max-w-3xl border-l-2 border-cantiere pl-6">
          <p className="text-lg leading-relaxed text-ink/70">
            I primi due si sistemano anche senza rifare niente: sono un
            pomeriggio di lavoro sul sito che avete già, e ve lo dico perché è
            vero. Il quinto pure, ma solo dopo aver messo i dati del primo. Il
            terzo e il quarto no: non dipendono da una svista, dipendono da
            come il sito è costruito sotto, e si chiudono solo cambiando
            quello.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
