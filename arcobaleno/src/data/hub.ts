/**
 * I tipi delle sezioni dell'hub.
 *
 * L'hub è la pagina con cui vendo le tre anteprime, e parla al cliente che devo
 * acquisire. Gli argomenti che usa dipendono da chi ho davanti: a TD Group
 * parlo di 583 foto di cantiere mai pubblicate, ad Arcobaleno del fatto che
 * in rete di loro c'è una riga su PagineGialle.
 *
 * Quindi qui stanno solo le forme; i testi stanno in
 * `src/clienti/<cliente>/hub-testi.ts` e i componenti li leggono da
 * `@/data/cliente`.
 */

/**
 * Un punto argomentativo, con il suo numero grande facoltativo.
 *
 * `dato` esiste **solo dove c'è una cifra vera e contata**. Dove non c'è, sta
 * a null e il titolo sale al suo posto: la griglia non è allineata in basso ed
 * è voluto. Meglio un vuoto che una cifra inventata per riempire.
 */
export type PuntoHub = {
  n: string;
  dato: string | null;
  didascalia: string | null;
  titolo: string;
  testo: string;
};

/** Una sezione dell'hub fatta di intestazione più punti numerati. */
export type SezioneHub = {
  occhiello: string;
  titolo: string;
  intro: string;
  punti: PuntoHub[];
};

/** La foto di copertina di una delle tre schede in griglia. */
export type VisualeBozza = {
  /** Slug della foto, e servizio su cui ripiegare se quello slug non c'è. */
  slug: string;
  ripiego: string;
};
