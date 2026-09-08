import { WhatsAppFlottante } from '@/components/Contatto';
import BentoBozze from '@/components/hub/BentoBozze';
import Confronto from '@/components/hub/Confronto';
import Extra from '@/components/hub/Extra';
import FooterHub from '@/components/hub/FooterHub';
import HubHero from '@/components/hub/HubHero';
import Perche from '@/components/hub/Perche';
import Stato from '@/components/hub/Stato';
import { FORNITORE } from '@/data/fornitore';

/**
 * L'hub: la pagina che vende le tre anteprime a TD Group.
 *
 * Ordine ragionato, non casuale. Prima chi sono e cosa propongo (Hero), poi le
 * tre anteprime da aprire (Bento), poi perché conviene farlo (Perché), poi cosa
 * contiene ognuna e quanto costa (Confronto), poi cosa si aggiunge fuori
 * cambia se lo fanno (Perché) e cosa succede se non lo fanno (Stato),
 * poi cosa contiene ognuna e quanto costa (Confronto), poi cosa si aggiunge
 * fuori (Extra). Il costo di restare fermi sta prima del prezzo, perché è
 * quello che il prezzo deve giustificare, e non è l’ultima cosa che si legge
 * prima del numero di telefono. I quattro passi del "come si parte" sono
 * dentro il footer, attaccati al pulsante che serve a rispondere.
 *
 * Le sezioni chiare e scure si alternano: nessuna coppia dello stesso colore
 * di fila, o il confine fra due sezioni sparisce.
 */
export default function Hub() {
  return (
    <main>
      <HubHero />
      <BentoBozze />
      <Perche />
      <Stato />
      <Confronto />
      <Extra />

      <FooterHub />
      <WhatsAppFlottante
        contatto={FORNITORE}
        etichetta="Scrivimi su WhatsApp"
        messaggio="Salve, ho visto le anteprime del sito e vorrei parlarne."
      />
    </main>
  );
}
