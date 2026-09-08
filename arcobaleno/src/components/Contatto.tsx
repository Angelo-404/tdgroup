import { Calculator, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { AZIENDA, type Contatto, whatsapp } from '@/data/cliente';

/**
 * Un recapito WhatsApp che non esiste ancora.
 *
 * Non tutti i clienti hanno un cellulare: chi lavora con un fisso in ufficio
 * non ce l'ha, e il numero resta un segnaposto {{...}} finche' non lo danno.
 * In quel caso il pulsante non va mostrato affatto — un bottone che apre una
 * chat verso un numero inesistente e' peggio di un bottone assente, perche'
 * il difetto si scopre solo dopo averlo premuto.
 *
 * Il telefono resta, e resta il primo recapito: e' quello vero.
 */
const senzaNumero = (n: string) => !n || n.includes('{{');

/**
 * Blocco di contatto. Nessun form: solo telefono e WhatsApp.
 * Il messaggio WhatsApp è precompilato in base alla pagina.
 *
 * `preventivoHref` aggiunge un terzo pulsante verso il calcolatore online.
 * Va passato solo dove il calcolatore esiste davvero: la Vetrina non lo monta,
 * quindi lì il pulsante non deve comparire.
 */
export function BottoniContatto({
  messaggio,
  preventivoHref,
  contatto = AZIENDA,
  etichettaWhatsapp = 'Scrivici su WhatsApp',
  scuro = false,
  className = '',
}: {
  messaggio?: string;
  preventivoHref?: string;
  /** Chi risponde. Sull'hub è il fornitore, dentro le demo è TD Group. */
  contatto?: Contatto;
  /** Le demo parlano al plurale, sull'hub parla una persona sola. */
  etichettaWhatsapp?: string;
  scuro?: boolean;
  className?: string;
}) {
  const bordo = scuro ? 'border-bone/25 text-bone hover:bg-bone/10' : 'border-ink/20 text-ink hover:bg-ink/5';
  const soloTelefono = senzaNumero(contatto.whatsapp);

  // Senza WhatsApp il telefono prende il posto d'onore: pieno, non bordato.
  const pieno =
    'inline-flex items-center gap-2.5 rounded-full bg-cantiere px-6 py-3.5 font-medium text-ink transition-transform duration-300 ease-morbida hover:scale-[1.03] active:scale-95';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {!soloTelefono && (
        <a
          href={whatsapp(messaggio, contatto.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className={pieno}
        >
          <MessageCircle size={18} strokeWidth={2.2} />
          {etichettaWhatsapp}
        </a>
      )}
      <a
        href={contatto.telefonoHref}
        className={
          soloTelefono
            ? pieno
            : `inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 font-medium transition-colors duration-300 ${bordo}`
        }
      >
        <Phone size={18} strokeWidth={2.2} />
        {contatto.telefono}
      </a>
      {preventivoHref && (
        <Link
          href={preventivoHref}
          className={`inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 font-medium transition-colors duration-300 ${bordo}`}
        >
          <Calculator size={18} strokeWidth={2.2} />
          Calcola online
        </Link>
      )}
    </div>
  );
}

/** Pulsante WhatsApp flottante, sempre presente. */
export function WhatsAppFlottante({
  messaggio,
  contatto = AZIENDA,
  etichetta = 'Scrivici su WhatsApp',
}: {
  messaggio?: string;
  contatto?: Contatto;
  /** Letta dai lettori di schermo: deve seguire la voce della pagina. */
  etichetta?: string;
}) {
  // Senza numero non si mostra nulla: non ha senso un pulsante flottante che
  // porta a una chat che non esiste. Il telefono resta nei blocchi di contatto.
  if (senzaNumero(contatto.whatsapp)) return null;

  return (
    <a
      href={whatsapp(messaggio, contatto.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={etichetta}
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cantiere text-ink shadow-lg shadow-ink/20 transition-transform duration-300 ease-morbida hover:scale-110 active:scale-95"
    >
      <MessageCircle size={24} strokeWidth={2.2} />
    </a>
  );
}
