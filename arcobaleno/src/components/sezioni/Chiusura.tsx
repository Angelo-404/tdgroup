import { BottoniContatto } from '@/components/Contatto';
import { Reveal } from '@/components/Reveal';

/** Ultimo blocco di ogni demo: la richiesta di contatto. */
export default function Chiusura() {
  return (
    <section className="dark-section bg-ink px-5 py-24 text-bone sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="titolo max-w-3xl text-5xl sm:text-7xl">
            Parliamone in due minuti.
          </h2>
          <p className="mt-6 max-w-prosa text-lg leading-relaxed text-bone/60">
            Un messaggio con due foto e l&apos;indirizzo basta per capire se il
            lavoro è nelle nostre corde. Il sopralluogo è gratuito.
          </p>
          <BottoniContatto
            scuro
            className="mt-10"
            messaggio="Salve, vorrei un sopralluogo gratuito per un lavoro."
          />
        </Reveal>
      </div>
    </section>
  );
}
