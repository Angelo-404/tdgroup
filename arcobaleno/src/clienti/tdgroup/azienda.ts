/**
 * Dati anagrafici e di contatto di TD Group.
 *
 * I valori fra doppie graffe non sono ancora stati forniti dall'azienda.
 * Sono segnaposto volutamente visibili: mai sostituirli con un valore
 * plausibile ma inventato. Vedi RICHIESTA-DATI.md alla radice del progetto.
 */

export const DA_FORNIRE = {
  piva: '{{P_IVA_DA_FORNIRE}}',
  rea: '{{REA_DA_FORNIRE}}',
  indirizzo: '{{INDIRIZZO_DA_FORNIRE}}',
  orari: '{{ORARI_DA_FORNIRE}}',
  // I comuni serviti stanno qui e non in contenuti.ts perché è questo oggetto
  // che alimenta l'avviso del footer: un segnaposto fuori da qui resterebbe
  // in pagina senza che l'avviso lo segnali.
  comuni: '{{COMUNI_DA_FORNIRE}}',
  /*
    Segnaposto per scelta, non per un dato mancante.

    Il sito attuale affianca “oltre vent'anni di esperienza” e “nasce nel
    2016”. Sembrano in contraddizione ma non lo sono: il testo “chi siamo”
    spiega che la società nasce nel 2016 dall'unione di artigiani che
    lavoravano da decenni. Il 2016 resta infatti scritto in quel paragrafo,
    e va bene così.

    Qui però la cifra comparirebbe da sola sotto l'etichetta “Attiva dal”,
    senza la frase che la spiega, e “attiva dal 2016” da solo sottovende
    l'esperienza. Decisione del 6 settembre 2026: meglio chiederlo a TD Group
    che scegliere per loro come raccontarlo.

    Conseguenza voluta: la statistica dice “da confermare” mentre il paragrafo
    poco sopra dice 2016. È una discrepanza nota, non un bug da sistemare.
  */
  attivaDal: '{{ANNO_INIZIO_DA_CONFERMARE}}',
} as const;

/** true se il dato è ancora un segnaposto. */
export const mancante = (v: string) => v.includes('{{');

/** true se ci sono ancora segnaposto non risolti, di qualunque tipo. */
export const datiIncompleti = Object.values(DA_FORNIRE).some((v) => v.includes('{{'));

/**
 * I soli dati che l'art. 2250 c.c. impone di pubblicare. Orari e comuni serviti
 * servono a farsi trovare, ma la loro assenza non impedisce la pubblicazione:
 * il banner del footer distingue i due casi invece di gridare al reato per un
 * elenco di paesi mancante.
 */
const OBBLIGATORI_PER_LEGGE = ['piva', 'rea', 'indirizzo'] as const;

export const datiObbligatoriMancanti = OBBLIGATORI_PER_LEGGE.some((k) =>
  DA_FORNIRE[k].includes('{{'),
);

export const AZIENDA = {
  // Ragione sociale: i documenti aziendali (collage-td-group.pdf, entrambi i DOCX)
  // riportano "TD Group s.r.l.s.". La pagina "chi siamo" del sito attuale cita
  // anche una "TD Group snc di Triberti Domenico & C." — da chiarire.
  nome: 'TD Group',
  ragioneSociale: 'TD Group S.r.l.s.',
  descrizione: 'Impresa edile e General Contractor',

  /*
    Il sito da cui provengono i contenuti delle bozze. Il footer lo cita per
    dire da dove arriva il materiale: va letto da qui e non scritto a mano nei
    componenti, altrimenti finisce sul sito di un altro cliente.
  */
  sitoAttuale: 'tdgroupsrls.it',

  telefono: '+39 348 6543343',
  telefonoHref: 'tel:+393486543343',
  whatsapp: '393486543343',
  email: 'impresaedile@tdgroupsrls.com',

  comune: 'Molinella',
  provincia: 'BO',
  cap: '40062',
  regione: 'Emilia-Romagna',
  via: DA_FORNIRE.indirizzo,

  piva: DA_FORNIRE.piva,
  rea: DA_FORNIRE.rea,
  orari: DA_FORNIRE.orari,

  /*
    Profili verificati, forniti da TD Group. La pagina Facebook è intestata
    "tdgroupsnc": è la sigla vecchia, e va tenuta d'occhio insieme al nodo
    S.N.C./S.R.L.S. dei dati societari. L'indirizzo però è quello attivo, e
    cambiarlo di mia iniziativa romperebbe il collegamento.
  */
  social: {
    facebook: 'https://www.facebook.com/tdgroupsnc/',
    instagram: 'https://www.instagram.com/tdgroup_edilizia/',
  },
} as const;

/**
 * I recapiti di un interlocutore, chiunque sia.
 *
 * L'hub e le demo parlano con voci diverse e quindi mostrano recapiti diversi:
 * i componenti di contatto ricevono questo oggetto invece di leggere AZIENDA.
 * Vedi src/data/fornitore.ts.
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
 * Numeri verificabili sul sito e nei documenti esistenti.
 * Nessuna certificazione (SOA, ISO 9001, DURC) è confermata: finché TD Group
 * non risponde, al loro posto scorrono questi.
 */
export const PROVE = [
  { valore: DA_FORNIRE.attivaDal, etichetta: 'Attiva dal' },
  { valore: '3', etichetta: 'Squadre operative' },
  { valore: '11', etichetta: 'Lavorazioni gestite' },
  { valore: 'Emilia-Romagna', etichetta: 'Area servita' },
  { valore: 'General Contractor', etichetta: 'Unico interlocutore' },
] as const;

/**
 * Il marchio in filigrana dietro il blocco "Chi siamo".
 *
 * Il file e' generato da scripts/logo-chiaro.js: il logo originale e' nero e
 * giallo su bianco pieno, e su fondo scuro andava reso con alfa e tratti
 * schiariti. Sta in public/loghi/<cliente>.png e non piu' in radice, perche'
 * con piu' clienti nella stessa repo un logo in radice finisce addosso a tutti.
 */
export const LOGO: { src: string; w: number; h: number } | null = {
  src: '/loghi/tdgroup.png',
  w: 894,
  h: 809,
};
