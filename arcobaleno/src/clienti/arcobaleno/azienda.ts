/**
 * Anagrafica e recapiti di Arcobaleno S.r.l., Medicina (BO).
 *
 * FONTE DEI DATI — nessuno di questi ci è stato dato dall'azienda: vengono
 * tutti da elenchi pubblici (PagineGialle, PagineBianche, ReteImprese,
 * Kompass, Europages). Gli elenchi invecchiano e si copiano fra loro, quindi
 * valgono come punto di partenza per la bozza, non come dati pubblicabili.
 * Le voci marcate qui sotto vanno confermate ad Arcobaleno prima di andare
 * online. Vedi INTAKE.md §5.
 *
 * I valori fra doppie graffe sono segnaposto volutamente visibili: mai
 * sostituirli con un valore plausibile ma inventato (CLAUDE.md §7).
 */

export const DA_FORNIRE = {
  // Presente su PagineGialle ma da far confermare: un numero di partita IVA
  // sbagliato in footer è un problema legale, non un refuso.
  piva: '02189401207',
  rea: '{{REA_DA_FORNIRE}}',
  indirizzo: 'Via Aurelio Saffi, 93',
  orari: 'Lun–Sab 8:00–13:00 · 15:00–18:00',

  /*
    I comuni serviti non li sappiamo. Un'impresa di drenaggio agricolo lavora
    per bacini e comprensori, non per quartieri: l'elenco giusto qui sono le
    zone agricole servite, e sono loro a doverlo dire.
  */
  comuni: '{{COMUNI_DA_FORNIRE}}',

  /*
    2001 compare nelle schede Kompass ed Europages, non in un documento
    dell'azienda. Resta segnaposto finché non lo confermano: "attiva dal 2001"
    scritto sotto un numero è un'affermazione, e le affermazioni si verificano.
  */
  attivaDal: '{{ANNO_INIZIO_DA_CONFERMARE}}',

  /*
    Il 051 6970070 è un fisso. Non risulta nessun cellulare, quindi non
    risulta nessun WhatsApp — e il modello di contatto del progetto è
    costruito su WhatsApp più telefono (CLAUDE.md §6).

    Finché questo resta un segnaposto i blocchi WhatsApp non vanno mostrati:
    un pulsante che apre una chat verso un numero inesistente è peggio di un
    pulsante assente. Vedi la nota in fondo al file.
  */
  cellulare: '{{CELLULARE_DA_FORNIRE}}',

  email: '{{EMAIL_DA_FORNIRE}}',
} as const;

/** true se il dato è ancora un segnaposto. */
export const mancante = (v: string) => v.includes('{{');

/** true se ci sono ancora segnaposto non risolti, di qualunque tipo. */
export const datiIncompleti = Object.values(DA_FORNIRE).some((v) => v.includes('{{'));

/**
 * I soli dati che l'art. 2250 c.c. impone di pubblicare. Orari e comuni
 * serviti servono a farsi trovare, ma la loro assenza non impedisce la
 * pubblicazione: il banner del footer distingue i due casi.
 */
const OBBLIGATORI_PER_LEGGE = ['piva', 'rea', 'indirizzo'] as const;

export const datiObbligatoriMancanti = OBBLIGATORI_PER_LEGGE.some((k) =>
  DA_FORNIRE[k].includes('{{'),
);

export const AZIENDA = {
  nome: 'Arcobaleno',
  ragioneSociale: 'Arcobaleno S.r.l.',

  /*
    Non "impresa edile e General Contractor": quello è TD Group. Arcobaleno è
    uno specialista, e il suo cliente è un'azienda agricola. La descrizione
    deve dire il mestiere, non prendere in prestito quello di un altro.
  */
  descrizione: 'Drenaggio, livellamento laser e irrigazione per l’agricoltura',

  telefono: '051 697 0070',
  telefonoHref: 'tel:+390516970070',
  whatsapp: DA_FORNIRE.cellulare,
  email: DA_FORNIRE.email,

  comune: 'Medicina',
  provincia: 'BO',
  cap: '40059',
  regione: 'Emilia-Romagna',
  via: DA_FORNIRE.indirizzo,

  piva: DA_FORNIRE.piva,
  rea: DA_FORNIRE.rea,
  orari: DA_FORNIRE.orari,

  // Nessun profilo social risulta. Meglio nessun link che un link sbagliato.
  social: {
    facebook: '',
    instagram: '',
  },
} as const;

/**
 * true finché non abbiamo un cellulare a cui puntare.
 *
 * Le pagine la leggono per decidere se mostrare i blocchi WhatsApp. Non è una
 * preferenza di stile: senza numero quei pulsanti sono link morti.
 */
export const senzaWhatsapp = mancante(DA_FORNIRE.cellulare);

/**
 * I recapiti di un interlocutore, chiunque sia.
 *
 * L'hub e le demo parlano con voci diverse e quindi mostrano recapiti
 * diversi: i componenti di contatto ricevono questo oggetto invece di leggere
 * AZIENDA. Vedi src/data/fornitore.ts.
 */
export type Contatto = {
  telefono: string;
  telefonoHref: string;
  whatsapp: string;
};

/** Link WhatsApp con messaggio precompilato diverso per pagina. */
export function whatsapp(messaggio?: string, numero: string = AZIENDA.whatsapp): string {
  const testo =
    messaggio ?? 'Salve, ho visto il vostro sito e vorrei informazioni su un lavoro.';
  return `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`;
}

/**
 * Numeri verificabili, che scorrono nella banda sotto la copertina.
 *
 * Per un'impresa di drenaggio le prove che contano sono ettari trattati,
 * metri di tubo posati e anni di attività: nessuno dei tre ci è stato dato,
 * quindi non compare nessuno dei tre. Restano le poche cose che si leggono
 * dagli elenchi pubblici e non affermano nulla di non verificato.
 */
export const PROVE = [
  { valore: DA_FORNIRE.attivaDal, etichetta: 'Attiva dal' },
  { valore: '{{ETTARI_TRATTATI_DA_FORNIRE}}', etichetta: 'Ettari trattati' },
  { valore: '8', etichetta: 'Lavorazioni gestite' },
  { valore: 'Emilia-Romagna', etichetta: 'Area servita' },
  { valore: 'Chiavi in mano', etichetta: 'Dal rilievo alla posa' },
] as const;

/**
 * Nessun logo: Arcobaleno non ce l'ha dato e in rete non ne esiste uno.
 *
 * Il blocco "Chi siamo" si rende senza filigrana. Meglio niente che il
 * marchio di un altro cliente dietro il loro testo — che e' esattamente
 * quello che succedeva quando il percorso del file era scritto nel componente.
 */
export const LOGO: { src: string; w: number; h: number } | null = null;
