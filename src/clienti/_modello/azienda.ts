/**
 * MODELLO — copiare la cartella, non modificarla.
 *
 *   cp -r src/clienti/_modello src/clienti/rossi-edile
 *
 * Anagrafica e recapiti del cliente. È uno dei due soli file che si scrivono
 * a mano: servizi.ts, foto.ts e redirects.json li generano gli script.
 *
 * I valori fra doppie graffe sono segnaposto volutamente visibili. Mai
 * sostituirli con un valore plausibile ma inventato: il footer del sito li
 * intercetta e segnala da solo che manca qualcosa. Vedi INTAKE.md §5.
 */

export const DA_FORNIRE = {
  piva: '{{P_IVA_DA_FORNIRE}}',
  rea: '{{REA_DA_FORNIRE}}',
  indirizzo: '{{INDIRIZZO_DA_FORNIRE}}',
  orari: '{{ORARI_DA_FORNIRE}}',
  // I comuni serviti stanno qui perché è questo oggetto che alimenta l'avviso
  // del footer: un segnaposto fuori da qui resterebbe in pagina senza che
  // l'avviso lo segnali.
  comuni: '{{COMUNI_DA_FORNIRE}}',
  attivaDal: '{{ANNO_INIZIO_DA_FORNIRE}}',
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
  nome: '{{NOME_AZIENDA}}',
  ragioneSociale: '{{RAGIONE_SOCIALE}}',
  descrizione: 'Impresa edile e General Contractor',

  telefono: '{{TELEFONO}}',
  telefonoHref: 'tel:{{TELEFONO_SENZA_SPAZI}}',
  whatsapp: '{{WHATSAPP_SENZA_PIU}}',
  email: '{{EMAIL}}',

  comune: '{{COMUNE}}',
  provincia: '{{SIGLA_PROVINCIA}}',
  cap: '{{CAP}}',
  regione: '{{REGIONE}}',
  via: DA_FORNIRE.indirizzo,

  piva: DA_FORNIRE.piva,
  rea: DA_FORNIRE.rea,
  orari: DA_FORNIRE.orari,

  // Solo profili verificati, forniti dal cliente. Un link sbagliato è peggio
  // di un link assente.
  social: {
    facebook: '',
    instagram: '',
  },
} as const;

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
 * Nessuna certificazione (SOA, ISO 9001, DURC) entra qui finché il cliente
 * non manda il documento. Al loro posto scorrono dati che si possono provare.
 */
export const PROVE = [
  { valore: DA_FORNIRE.attivaDal, etichetta: 'Attiva dal' },
  { valore: '{{N_SQUADRE}}', etichetta: 'Squadre operative' },
  { valore: '{{N_LAVORAZIONI}}', etichetta: 'Lavorazioni gestite' },
  { valore: '{{REGIONE}}', etichetta: 'Area servita' },
  { valore: 'General Contractor', etichetta: 'Unico interlocutore' },
] as const;

/**
 * Marchio in filigrana dietro il blocco "Chi siamo", se il cliente ne ha uno.
 *
 * Il file va in public/loghi/<cliente>.png. Su fondo scuro serve un PNG con
 * canale alfa e tratti chiari: vedi scripts/logo-chiaro.js. Senza logo si
 * lascia null e il blocco si rende senza filigrana.
 */
export const LOGO: { src: string; w: number; h: number } | null = null;
