import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Occhiello } from '@/components/ui';
import { PERCHE } from '@/data/cliente';

/**
 * Perche' un sito fatto bene, prima ancora di quale dei tre livelli.
 *
 * Quattro benefici, tutti rivolti in avanti. Nessun confronto con il sito
 * attuale: puo' averlo fatto qualcuno di famiglia, e un cliente da acquisire
 * non si convince dicendogli che ha sbagliato. Si convince mostrandogli cosa
 * guadagna.
 *
 * Ogni punto risponde a "e quindi cosa ci guadagno?" con una conseguenza di
 * cantiere, non con una parola da marketing. Il `dato` e' grande e giallo solo
 * dove esiste un numero vero: 583 foto contate nella loro libreria, 9 servizi
 * che erogano davvero. Dove il numero non c'e' resta una riga di testo, e la
 * griglia se ne fa una ragione: meglio un vuoto che una cifra inventata.
 */
const { occhiello, titolo, intro, punti: PUNTI } = PERCHE;

export default function Perche() {
  return (
    <section className="dark-section bg-ink px-5 py-24 text-bone sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Occhiello scuro>{occhiello}</Occhiello>
          <h2 className="titolo mt-4 max-w-4xl text-5xl sm:text-7xl">{titolo}</h2>
          <p className="mt-6 max-w-prosa text-lg leading-relaxed text-bone/60">
            {intro}
          </p>
        </Reveal>

        <RevealGroup className="mt-20 grid gap-x-12 gap-y-16 sm:grid-cols-2" ritardo={0.1}>
          {PUNTI.map((p) => (
            <RevealItem key={p.n}>
              <span className="font-display text-xs tracking-widest text-bone/35">
                {p.n}
              </span>

              {/*
                Il numero grande c'e' solo dove e' vero. Dove manca, il titolo
                sale al suo posto invece di lasciare un buco: la riga di base
                dei quattro blocchi non e' allineata, ed e' voluto.
              */}
              {p.dato ? (
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="titolo text-6xl text-cantiere sm:text-7xl">
                    {p.dato}
                  </span>
                  <span className="max-w-[12rem] text-sm leading-snug text-bone/45">
                    {p.didascalia}
                  </span>
                </p>
              ) : null}

              <h3 className={`titolo text-2xl sm:text-3xl ${p.dato ? 'mt-6' : 'mt-4'}`}>
                {p.titolo}
              </h3>
              <p className="mt-4 max-w-prosa leading-relaxed text-bone/60">
                {p.testo}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
