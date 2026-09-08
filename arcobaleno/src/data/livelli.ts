import {
  CONFRONTO_TESTI,
  DETTAGLI,
  EXTRA_TESTI,
  PER_CHI,
  TITOLI_HERO,
} from '@/data/cliente';

/**
 * I tre livelli di offerta: cosa contiene ciascuno.
 *
 * Questo file è l'unica fonte di verità sulla **struttura** dell'offerta —
 * quali blocchi monta ogni livello, quali righe ha la tabella di confronto e
 * in quali livelli stanno. Sia la tabella sull'hub sia le pagine demo leggono
 * da qui: non possono divergere.
 *
 * I livelli sono **cumulativi**: Completo contiene tutto Vetrina, Portale
 * contiene tutto Completo. Un cliente che scende di livello vede esattamente
 * cosa perde.
 *
 * I tre motivi per salire, uno per livello:
 *   Vetrina  — un sito che si spiega da solo
 *   Completo — profondità (URL indicizzabili) e autonomia (caricano loro)
 *   Portale  — strumenti che tolgono lavoro all'ufficio
 *
 * ------------------------------------------------------------------------
 * STRUTTURA QUI, TESTI NEL CLIENTE — decisione del 7 settembre 2026.
 *
 * Fino a oggi qui dentro c'erano anche i testi di vendita, e parlavano tutti
 * di edilizia: «chi ha una perdita dal tetto cerca "rifacimento tetto
 * Molinella"», «solo i tetti, solo i bagni, solo i cappotti», un gruppo di
 * extra intitolato "Su misura per l'edilizia". Montando il secondo cliente —
 * un'impresa di drenaggio agricolo — quei testi sono diventati sbagliati
 * riga per riga.
 *
 * Ora la struttura sta qui e i testi stanno in
 * `src/clienti/<cliente>/livelli-testi.ts`. Il merge lo fa questo file, così
 * i componenti dell'hub non sanno che sia successo niente.
 *
 * Restano qui i nomi dei livelli e i loro sottotitoli: quelli descrivono il
 * *mio* prodotto, non il mestiere di chi lo compra, e sono uguali per tutti.
 * ------------------------------------------------------------------------
 */

/** Blocchi montabili in una pagina demo, nell'ordine in cui compaiono. */
export const ORDINE_BLOCCHI = [
  'hero',
  'ticker',
  'statistiche',
  'servizi',
  'comeLavoriamo',
  'portfolio',
  'zone',
  'faq',
  'admin',
  'calcolatore',
  'areaCliente',
  'chiusura',
] as const;

export type Blocco = (typeof ORDINE_BLOCCHI)[number];

export type PuntoDettaglio = { titolo: string; testo: string };

/**
 * Il dettaglio di un livello, in tre punti.
 *
 * `claim` è un verbo, non un aggettivo: i tre livelli si leggono in fila come
 * una progressione (risponde, porta, cambia mestiere). `coda` esiste solo dove
 * il livello apre a qualcosa che sta fuori dal prezzo.
 */
export type Dettaglio = {
  claim: string;
  punti: PuntoDettaglio[];
  coda?: string;
};

export type Livello = {
  slug: string;
  numero: string;
  nome: string;
  sottotitolo: string;
  /** Frase da dire al cliente per spiegare a chi serve. Dal pacchetto testi. */
  perChi: string;
  /** Il motivo per salire a questo livello, in una riga. */
  vendi: string;
  /**
   * Cosa comprende il livello, spiegato al cliente. Mostrato sull'hub sotto la
   * tabella di confronto: la tabella dice *cosa c'è*, questo dice *cosa cambia
   * nella giornata*. Dal pacchetto testi del cliente.
   */
  dettaglio: Dettaglio;
  titoloHero: string;
  titoloHeroAccento: string;
  blocchi: Blocco[];
  /** Le pagine servizio dedicate esistono solo dai livelli intermedi in su. */
  pagineServizio: boolean;
  /**
   * Caricamento di foto nuove dal telefono, oltre alla scelta fra quelle già
   * in archivio. La scelta c'è dal Completo, il caricamento solo nel Portale:
   * sono due righe distinte della tabella di confronto.
   */
  caricamentoFoto: boolean;
};

// La Vetrina è un sito completo, non il Portale meno le cose belle: deve
// convincere da sola, perché la compra chi ha il budget più stretto.
const VETRINA: Blocco[] = [
  'hero',
  'ticker',
  'statistiche',
  'servizi',
  'comeLavoriamo',
  'zone',
  'faq',
  'chiusura',
];

const COMPLETO: Blocco[] = [
  'hero',
  'ticker',
  'statistiche',
  'servizi',
  'comeLavoriamo',
  'portfolio',
  'zone',
  'faq',
  'admin',
  'chiusura',
];

const PORTALE: Blocco[] = [
  'hero',
  'ticker',
  'statistiche',
  'servizi',
  'comeLavoriamo',
  'portfolio',
  'zone',
  'faq',
  'admin',
  'calcolatore',
  'areaCliente',
  'chiusura',
];

/** La struttura dei tre livelli. I testi arrivano dal cliente montato. */
const STRUTTURA = [
  {
    slug: 'vetrina',
    numero: '01',
    nome: 'Vetrina',
    sottotitolo: 'Un sito che si spiega da solo',
    vendi: 'Un sito completo che si spiega da solo',
    blocchi: VETRINA,
    pagineServizio: false,
    caricamentoFoto: false,
  },
  {
    slug: 'completo',
    numero: '02',
    nome: 'Completo',
    sottotitolo: 'Tutto Vetrina, più i lavori',
    vendi: 'Profondità su Google e autonomia sui contenuti',
    blocchi: COMPLETO,
    pagineServizio: true,
    caricamentoFoto: false,
  },
  {
    slug: 'portale',
    numero: '03',
    nome: 'Portale',
    sottotitolo: 'Tutto Completo, più gli strumenti',
    vendi: 'Strumenti che tolgono lavoro all’ufficio',
    blocchi: PORTALE,
    pagineServizio: true,
    caricamentoFoto: true,
  },
] as const;

export const LIVELLI: Livello[] = STRUTTURA.map((l) => ({
  slug: l.slug,
  numero: l.numero,
  nome: l.nome,
  sottotitolo: l.sottotitolo,
  vendi: l.vendi,
  blocchi: [...l.blocchi],
  pagineServizio: l.pagineServizio,
  caricamentoFoto: l.caricamentoFoto,
  perChi: PER_CHI[l.slug],
  dettaglio: DETTAGLI[l.slug],
  titoloHero: TITOLI_HERO[l.slug].titolo,
  titoloHeroAccento: TITOLI_HERO[l.slug].accento,
}));

export const livelloBySlug = (slug: string): Livello | undefined =>
  LIVELLI.find((l) => l.slug === slug);

/* ------------------------------------------------------ tabella di confronto */

export type Riga = {
  /** Chiave stabile: il testo sta nel pacchetto del cliente, sotto questo id. */
  id: string;
  voce: string;
  /** Cosa cambia per il cliente. Serve a chi legge la tabella senza contesto. */
  nota: string;
  /** Slug dei livelli che la includono. */
  in: string[];
};

const TUTTI = ['vetrina', 'completo', 'portale'];

/**
 * Le righe della tabella e in quali livelli stanno. Solo struttura.
 *
 * L'ordine è quello di lettura e conta: prima quello che c'è ovunque, poi
 * quello che si aggiunge salendo. Il testo di ogni riga sta in
 * `src/clienti/<cliente>/livelli-testi.ts`, sotto lo stesso id.
 */
const RIGHE: { id: string; in: string[] }[] = [
  { id: 'copertina', in: TUTTI },
  { id: 'chi-siamo', in: TUTTI },
  { id: 'servizi', in: TUTTI },
  { id: 'come-lavoriamo', in: TUTTI },
  { id: 'zone', in: TUTTI },
  { id: 'faq', in: TUTTI },
  { id: 'contatti', in: TUTTI },
  { id: 'dati-societari', in: TUTTI },
  { id: 'google', in: TUTTI },
  { id: 'dominio', in: TUTTI },
  { id: 'google-business', in: TUTTI },
  { id: 'migrazione', in: TUTTI },
  { id: 'pagine-servizio', in: ['completo', 'portale'] },
  { id: 'portfolio', in: ['completo', 'portale'] },
  { id: 'scelta-foto', in: ['completo', 'portale'] },
  { id: 'caricamento-foto', in: ['portale'] },
  { id: 'calcolatore', in: ['portale'] },
  { id: 'area-cliente', in: ['portale'] },
  { id: 'documenti-cliente', in: ['portale'] },
];

/**
 * Una riga senza testo nel pacchetto del cliente **non compare**.
 *
 * Non è una svista da riempire: è il modo di togliere una riga che a quel
 * cliente non si applica. "Passaggio dal sito attuale" non ha senso per chi
 * un sito non ce l'ha mai avuto, e prometterglielo sarebbe vendere aria.
 */
export const CONFRONTO: Riga[] = RIGHE.filter((r) => CONFRONTO_TESTI[r.id]).map(
  (r) => ({ id: r.id, in: r.in, ...CONFRONTO_TESTI[r.id] }),
);

/* -------------------------------------------------------------------- extra */

export type VoceExtra = { nome: string; testo: string };
export type GruppoExtra = { gruppo: string; intro: string; voci: VoceExtra[] };

/**
 * Servizi fuori dai tre livelli, quotati a parte. Mostrati sull'hub, sotto la
 * tabella di confronto (src/components/hub/Extra.tsx).
 *
 * Vengono interamente dal cliente: gli extra sono la parte dell'offerta più
 * legata al mestiere di chi compra. L'ultimo gruppo di TD Group si chiama
 * "Su misura per l'edilizia" e contiene il calcolo del risparmio col cappotto:
 * per un'impresa di drenaggio agricolo non è una riga da riscrivere, è un
 * gruppo intero da rifare.
 */
export const EXTRA: GruppoExtra[] = EXTRA_TESTI;
