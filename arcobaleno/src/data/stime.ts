/**
 * Fasce di costo per il calcolatore.
 *
 * ATTENZIONE — da leggere prima di toccare i numeri.
 *
 * Questi NON sono i prezzi di TD Group, e non vengono da un prezzario
 * ufficiale: sono fasce medie di mercato per l'edilizia residenziale italiana,
 * larghe di proposito, buone solo per dare un ordine di grandezza prima della
 * telefonata. Vanno fatte validare da TD Group prima della pubblicazione.
 * TD Group non ha mai pubblicato un listino: inventarne uno e attribuirglielo
 * violerebbe la regola del progetto sui dati non verificati (CLAUDE.md §7).
 *
 * Per questo:
 *   - ogni cifra mostrata è etichettata come stima di mercato, mai come
 *     preventivo né come prezzo dell'impresa;
 *   - il testo dice esplicitamente che solo il sopralluogo fa il prezzo;
 *   - `FONTE` compare in pagina, così chi legge sa da dove arrivano.
 *
 * Quando TD Group manda il proprio listino (richiesta n. 11 in
 * RICHIESTA-DATI.md) si sostituiscono `min` e `max` qui dentro e si cambia
 * `FONTE`: il resto del calcolatore non va toccato.
 *
 * Non è un miglioramento opzionale: è la condizione per andare in produzione.
 * La riga della tabella promette “sui vostri prezzi”, quindi il calcolatore
 * non va online finché queste fasce sono ancora medie di mercato. Se il
 * listino non arriva, si toglie il blocco — non si pubblica una cifra
 * attribuita a TD Group che TD Group non ha deciso.
 *
 * Tutti i valori sono in euro, IVA esclusa, per unità di misura della
 * lavorazione, a finiture standard.
 */

export const FONTE =
  'Fasce medie di mercato per lavori simili, non il listino di TD Group.';

export type Unita = 'm²' | 'bagno' | 'serramento';

/** "2 bagni", non "2 bagnoi": l'italiano non si pluralizza con una regola. */
const PLURALE: Record<Unita, string> = {
  'm²': 'm²',
  bagno: 'bagni',
  serramento: 'serramenti',
};

export type Lavorazione = {
  chiave: string;
  nome: string;
  unita: Unita;
  /** Domanda con dentro già l'unità: cambia il senso del numero chiesto. */
  domandaQuantita: string;
  /** Cosa si sta misurando: la falda, la facciata, il calpestio. */
  precisazione: string;
  /** Euro per unità, a finiture standard. */
  min: number;
  max: number;
  /** Estremi e passo del cursore della quantità. */
  quantitaMin: number;
  quantitaMax: number;
  passo: number;
  quantitaIniziale: number;
  /** Esclusione specifica di questa lavorazione, oltre a quelle comuni. */
  escluso?: string;
};

export const LAVORAZIONI: Lavorazione[] = [
  {
    chiave: 'ristrutturazione',
    nome: 'Ristrutturazione completa',
    unita: 'm²',
    domandaQuantita: 'Quanti metri quadri ha l’immobile?',
    precisazione: 'Superficie calpestabile, non quella catastale.',
    min: 600,
    max: 950,
    quantitaMin: 30,
    quantitaMax: 300,
    passo: 5,
    quantitaIniziale: 90,
    escluso: 'Arredo, elettrodomestici e spostamento di muri portanti.',
  },
  {
    chiave: 'bagno',
    nome: 'Rifacimento bagno',
    unita: 'bagno',
    domandaQuantita: 'Quanti bagni?',
    precisazione: 'Bagno completo: demolizione, impianti, rivestimenti, sanitari.',
    min: 5500,
    max: 11000,
    quantitaMin: 1,
    quantitaMax: 4,
    passo: 1,
    quantitaIniziale: 1,
  },
  {
    chiave: 'cappotto',
    nome: 'Cappotto termico',
    unita: 'm²',
    domandaQuantita: 'Quanti metri quadri di facciata?',
    precisazione: 'Superficie delle pareti esterne, finestre escluse.',
    min: 90,
    max: 150,
    quantitaMin: 50,
    quantitaMax: 1000,
    passo: 10,
    quantitaIniziale: 200,
    escluso: 'Pratiche per le detrazioni fiscali e progettazione termica.',
  },
  {
    chiave: 'tetto',
    nome: 'Rifacimento tetto',
    unita: 'm²',
    domandaQuantita: 'Quanti metri quadri di tetto?',
    precisazione: 'Superficie della falda, non del solaio sottostante.',
    min: 120,
    max: 230,
    quantitaMin: 30,
    quantitaMax: 500,
    passo: 10,
    quantitaIniziale: 120,
    escluso: 'Rifacimento della struttura portante in legno, se marcia.',
  },
  {
    chiave: 'pavimenti',
    nome: 'Pavimenti e rivestimenti',
    unita: 'm²',
    domandaQuantita: 'Quanti metri quadri da posare?',
    precisazione: 'Materiale di fascia corrente e posa comprese.',
    min: 55,
    max: 110,
    quantitaMin: 10,
    quantitaMax: 300,
    passo: 5,
    quantitaIniziale: 60,
  },
  {
    chiave: 'cartongesso',
    nome: 'Pareti e controsoffitti',
    unita: 'm²',
    domandaQuantita: 'Quanti metri quadri di cartongesso?',
    precisazione: 'Superficie delle pareti o dei soffitti da realizzare.',
    min: 40,
    max: 85,
    quantitaMin: 5,
    quantitaMax: 200,
    passo: 5,
    quantitaIniziale: 30,
  },
  {
    chiave: 'tinteggiatura',
    nome: 'Tinteggiatura',
    unita: 'm²',
    domandaQuantita: 'Quanti metri quadri da tinteggiare?',
    precisazione: 'Superficie di pareti e soffitti, non del pavimento.',
    min: 11,
    max: 22,
    quantitaMin: 20,
    quantitaMax: 600,
    passo: 10,
    quantitaIniziale: 150,
  },
  {
    chiave: 'serramenti',
    nome: 'Serramenti e infissi',
    unita: 'serramento',
    domandaQuantita: 'Quanti serramenti da sostituire?',
    precisazione: 'Finestre e portefinestre, posate e con smaltimento del vecchio.',
    min: 450,
    max: 1100,
    quantitaMin: 1,
    quantitaMax: 30,
    passo: 1,
    quantitaIniziale: 8,
    escluso: 'Tapparelle motorizzate, zanzariere e porte blindate.',
  },
  {
    chiave: 'terrazzi',
    nome: 'Terrazzi e impermeabilizzazioni',
    unita: 'm²',
    domandaQuantita: 'Quanti metri quadri di terrazzo o balcone?',
    precisazione: 'Superficie da impermeabilizzare e ripavimentare.',
    min: 70,
    max: 140,
    quantitaMin: 5,
    quantitaMax: 150,
    passo: 5,
    quantitaIniziale: 25,
  },
];

/** Quantità e unità già accordate, per il riepilogo e per il messaggio. */
export function scriviQuantita(lavorazione: Lavorazione, quantita: number): string {
  const unita = quantita === 1 ? lavorazione.unita : PLURALE[lavorazione.unita];
  return `${quantita} ${unita}`;
}

export const lavorazioneByChiave = (chiave: string): Lavorazione | undefined =>
  LAVORAZIONI.find((l) => l.chiave === chiave);

export type Finitura = {
  chiave: string;
  nome: string;
  nota: string;
  /** Moltiplicatore sulla fascia standard. */
  fattore: number;
};

export const FINITURE: Finitura[] = [
  {
    chiave: 'essenziale',
    nome: 'Essenziale',
    nota: 'Materiali di serie, nessuna modifica alla distribuzione.',
    fattore: 0.8,
  },
  {
    chiave: 'standard',
    nome: 'Standard',
    nota: 'Marche note, qualche scelta personale su piastrelle e sanitari.',
    fattore: 1,
  },
  {
    chiave: 'alto',
    nome: 'Alto di gamma',
    nota: 'Materiali di fascia alta, soluzioni su misura, impianti domotici.',
    fattore: 1.35,
  },
];

export const finituraByChiave = (chiave: string): Finitura | undefined =>
  FINITURE.find((f) => f.chiave === chiave);

/**
 * Arrotondamento verso l'esterno della fascia: il minimo scende, il massimo
 * sale. Una stima che finisce con "48.317" finge una precisione che non ha, e
 * arrotondare entrambi gli estremi nello stesso verso stringerebbe o
 * gonfierebbe la forbice invece di lasciarla dov'è.
 */
function arrotonda(valore: number, verso: 'giu' | 'su'): number {
  const passo = valore >= 20000 ? 1000 : valore >= 5000 ? 500 : 100;
  const n = valore / passo;
  return (verso === 'giu' ? Math.floor(n) : Math.ceil(n)) * passo;
}

export type Stima = { min: number; max: number };

export function stima(
  lavorazione: Lavorazione,
  quantita: number,
  finitura: Finitura,
): Stima {
  return {
    min: arrotonda(lavorazione.min * quantita * finitura.fattore, 'giu'),
    max: arrotonda(lavorazione.max * quantita * finitura.fattore, 'su'),
  };
}

const EURO = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export const euro = (valore: number): string => EURO.format(valore);

/**
 * Vale per ogni lavorazione. Le voci specifiche stanno in `escluso` sulla
 * singola lavorazione e vengono mostrate in coda a queste.
 */
export const ESCLUSIONI = [
  'IVA (10% sulle ristrutturazioni, 22% in altri casi)',
  'Pratiche edilizie, progettazione e direzione lavori',
  'Sorprese che si vedono solo aprendo i muri: amianto, solai da consolidare, impianti fuori norma',
];

export const AVVERTENZA =
  'È una stima automatica su fasce di mercato, non un preventivo e non un impegno di spesa. Il numero vero esce dal sopralluogo: due appartamenti degli stessi metri quadri possono costare il doppio l’uno dell’altro.';
