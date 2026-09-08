import { AlertTriangle } from 'lucide-react';
import { AZIENDA, FOTO, IMMAGINI_GENERATE } from '@/data/cliente';

/**
 * Dichiara in pagina che le immagini dell’anteprima sono generate.
 *
 * Perché esiste: un’anteprima si mostra prima di avere le foto del cliente, ma
 * il footer dell'hub promette pagine "costruite sui contenuti e sulle foto"
 * loro, "non su un template". Un'immagine inventata e non dichiarata smentisce
 * quella frase proprio davanti a chi deve comprare — e se qualcuno gira uno
 * screenshot della demo, quelle immagini passano per lavori dell'azienda.
 *
 * È la stessa regola dei segnaposto {{DA_FORNIRE}} e dei badge "da confermare"
 * sulle FAQ: quello che non è verificato si vede che non è verificato. Meglio
 * un avviso in pagina che una spiegazione a voce che nessuno ricorda.
 *
 * Sparisce da solo quando arrivano le foto vere: se IMMAGINI_GENERATE è 0 il
 * componente non rende niente, e non c'è nulla da togliere a mano.
 */
export default function AvvisoImmagini() {
  if (IMMAGINI_GENERATE === 0) return null;

  const tutte = IMMAGINI_GENERATE === FOTO.length;

  return (
    /*
      pt-20 e non py-4: l'intestazione delle demo e' fissa e alta h-16, e senza
      questo margine la prima riga dell'avviso le finisce sotto.
    */
    <aside className="border-b border-cantiere/25 bg-cantiere/10 px-5 pb-4 pt-20 sm:px-8">
      <p className="mx-auto flex max-w-7xl items-start gap-2.5 text-sm leading-relaxed text-ink/75">
        <AlertTriangle size={17} className="mt-0.5 shrink-0 text-cantiere" />
        <span>
          <strong className="font-medium text-ink">
            {tutte
              ? 'Le immagini di questa anteprima sono generate.'
              : `${IMMAGINI_GENERATE} immagini di questa anteprima su ${FOTO.length} sono generate.`}
          </strong>{' '}
          Servono a far vedere come si comporta la pagina, non a mostrare
          lavori di {AZIENDA.nome}. Alla consegna vengono sostituite dalle
          fotografie dei vostri cantieri: è quello che rende il sito vostro e
          non un modello.
        </span>
      </p>
    </aside>
  );
}
