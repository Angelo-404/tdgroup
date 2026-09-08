/**
 * Chi vende, non chi compra.
 *
 * L'hub (`/`) e le tre demo (`/demo/*`) parlano con due voci diverse
 * (CLAUDE.md §8): sull'hub parla il fornitore a TD Group, dentro le demo parla
 * TD Group perché quelle pagine *sono* il loro sito.
 *
 * Il contatto deve seguire la voce. Un numero di TD Group sull'hub direbbe al
 * cliente di chiamare sé stesso; il numero del fornitore dentro una demo
 * mostrerebbe a TD Group un sito con il recapito di un altro.
 */

export const FORNITORE = {
  nome: 'Angelo Di Maso',
  mestiere: 'Siti web per imprese edili',
  telefono: '+39 389 9137888',
  telefonoHref: 'tel:+393899137888',
  whatsapp: '393899137888',
  email: 'angel.095@live.it',
  comune: 'Molinella',

  /*
    Niente partita IVA in footer, e non è una dimenticanza: il lavoro è una
    prestazione occasionale, che non la richiede. L'apertura è prevista per
    gennaio 2027 — da allora il numero va scritto qui e mostrato, perché a
    quel punto diventa obbligatorio.
  */
  inquadramento:
    'Prestazione occasionale, senza partita IVA. La apro dai primi di gennaio 2027.',
} as const;
