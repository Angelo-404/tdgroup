import { RevealGroup, RevealItem } from '@/components/Reveal';
import { Occhiello } from '@/components/ui';
import { COME_LAVORIAMO, INTESTAZIONI } from '@/data/cliente';

/**
 * I quattro passi dal primo contatto alla consegna.
 * È l'argomento "General Contractor" reso concreto: oggi sul sito di TD Group
 * la parola c'è ma non è spiegata da nessuna parte.
 */
export default function ComeLavoriamo() {
  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Occhiello>Come lavoriamo</Occhiello>
        <h2 className="titolo mt-4 max-w-3xl text-5xl sm:text-6xl">
          {INTESTAZIONI.comeLavoriamo.titolo}
        </h2>
        <p className="mt-6 max-w-prosa text-lg leading-relaxed text-ink/70">
          {INTESTAZIONI.comeLavoriamo.testo}
        </p>

        <RevealGroup
          className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
          ritardo={0.08}
        >
          {COME_LAVORIAMO.map((p) => (
            <RevealItem key={p.n}>
              <div className="border-t border-ink/15 pt-5">
                <span className="font-display text-xs tracking-widest text-cantiere">
                  {p.n}
                </span>
                <h3 className="titolo mt-3 text-2xl">{p.titolo}</h3>
                <p className="mt-3 leading-relaxed text-ink/60">{p.testo}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
