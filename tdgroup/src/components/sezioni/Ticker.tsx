import { Marquee, ValoreProva } from '@/components/ui';
import { PROVE } from '@/data/cliente';

/**
 * Banda scorrevole sotto la copertina.
 *
 * Al posto dei loghi SOA / ISO 9001 / DURC scorrono i dati verificabili:
 * le certificazioni entrano solo dopo conferma di TD Group (AUDIT.md §8).
 */
export default function Ticker() {
  return (
    <div className="dark-section border-y border-bone/10 bg-ink py-6 text-bone">
      <Marquee durata={38}>
        {PROVE.map((p) => (
          <span key={p.etichetta} className="flex items-baseline gap-3 whitespace-nowrap">
            <ValoreProva valore={p.valore} className="titolo text-2xl text-cantiere" />
            <span className="text-sm uppercase tracking-widest text-bone/45">
              {p.etichetta}
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
