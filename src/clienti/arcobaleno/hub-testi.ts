import type { SezioneHub, VisualeBozza } from '@/data/hub';

/**
 * I testi dell'hub, per Arcobaleno S.r.l.
 *
 * L'hub è la pagina con cui vendo le tre bozze, quindi qui parlo io e parlo a
 * loro. Gli argomenti sono diversi da quelli usati con TD Group per un motivo
 * strutturale: TD Group un sito ce l'ha, pieno di foto mai pubblicate.
 * Arcobaleno non ha niente. Non è una versione più debole dello stesso
 * discorso, è un discorso diverso — e a conti fatti più semplice da fare.
 *
 * FONTE DEI NUMERI — verificati il 7 settembre 2026, non stimati:
 *   0  -> galleria foto vuota sulla scheda PagineGialle
 *   2  -> categorie merceologiche su PagineGialle (impianti di irrigazione,
 *         scavi e demolizioni) contro le 8 lavorazioni che erogano davvero
 * Nessun altro numero: quanti ettari facciano, da quando lavorino e quante
 * squadre abbiano non lo sappiamo, e finché non lo dicono loro non si scrive.
 */

/**
 * La riga finale dell'H1 dell'hub, dopo "Costruisco siti".
 *
 * Non "per l'edilizia": Arcobaleno non è un'impresa edile, e aprire la pagina
 * dicendogli che faccio siti per un altro mestiere è il modo più rapido di
 * far pensare che il sito sia un modello riadattato.
 */
export const MESTIERE_HERO = 'per chi lavora la terra.';

/** Il paragrafo di presentazione accanto al titolo. */
export const PRESENTAZIONE =
  'Ho dieci anni di produzione e controllo qualità industriale alle spalle. Li uso, insieme all’intelligenza artificiale, per costruire strumenti digitali che reggono il lavoro vero, quello che si fa fuori.';

/** L'introduzione della griglia con le tre bozze. */
export const INTRO_BOZZE =
  'Stessi contenuti, stesse lavorazioni. Cambia quanto lontano volete spingervi — e ogni livello contiene per intero quello sotto.';

/**
 * Le foto di copertina delle tre schede in griglia.
 *
 * In questa bozza sono i segnaposto generati: le foto vere degli interventi
 * non ce le hanno ancora date. Quando arrivano, qui si mettono gli slug di
 * quelle giuste e il resto non si tocca.
 */
export const VISUALI: Record<string, VisualeBozza> = {
  portale: { slug: 'drenaggio-tubolare-01', ripiego: 'drenaggio-tubolare' },
  completo: { slug: 'livellamento-laser-01', ripiego: 'livellamento-laser' },
  vetrina: { slug: 'rilevazione-altimetrica-01', ripiego: 'rilevazione-altimetrica' },
};

/**
 * Perché un sito, prima ancora di quale dei tre livelli.
 *
 * Quattro benefici, tutti rivolti in avanti. Nessun rimprovero per non avere
 * un sito: un'impresa che lavora a passaparola da vent'anni non ha sbagliato
 * niente, ha solo un canale in meno.
 */
export const PERCHE: SezioneHub = {
  occhiello: 'Perché un sito',
  titolo: 'Cosa cambia, in pratica.',
  intro:
    'Un sito non serve a essere su internet. Serve a farvi trovare da chi ha il problema che risolvete e non sa che esistete — e a rispondergli prima che vi chiami. Queste sono le quattro cose che cambiano dal giorno dopo la messa online.',
  punti: [
    {
      n: '01',
      dato: '8',
      didascalia: 'lavorazioni, ognuna cercata per conto suo',
      titolo: 'Vi trova anche chi non vi conosce',
      testo:
        'Chi ha un campo che d’inverno resta sott’acqua non cerca “Arcobaleno”: cerca il lavoro che gli serve, nella sua zona. Il passaparola vi porta chi vi conosce già, e funziona. Le pagine delle lavorazioni portano tutti gli altri, quelli che oggi chiamano un altro numero.',
    },
    {
      n: '02',
      dato: null,
      didascalia: null,
      titolo: 'Il lavoro si spiega da solo',
      testo:
        'Rilievo, livellamento, interasse dei dreni, filtro: sono cose che oggi spiegate al telefono ogni volta da capo. Scritte una volta, le spiegano al posto vostro anche di domenica sera, che è quando un agricoltore ci pensa.',
    },
    {
      n: '03',
      dato: null,
      didascalia: null,
      titolo: 'Chi chiama ha già deciso',
      testo:
        'Se prima della telefonata ha visto come lavorate, in che stagione si interviene e cosa serve preparare, non chiama per informarsi: chiama per fissare il sopralluogo. In un mestiere dove la finestra buona dura poche settimane, i giri a vuoto costano più dei soldi.',
    },
    {
      n: '04',
      dato: null,
      didascalia: null,
      titolo: 'Tutto quello che c’è scritto è verificabile',
      testo:
        'Partita IVA, REA, anni di attività ed ettari trattati li scrivo quando me li date, e fino ad allora restano segnaposto gialli in pagina. Nessun numero plausibile messo lì per riempire: quello che promettete online è quello che poi dovete mantenere in campo.',
    },
  ],
};

/**
 * Cosa c'è online adesso.
 *
 * Per TD Group questa sezione è l'audit del sito esistente. Arcobaleno un
 * sito non ce l'ha, e la tentazione sarebbe togliere la sezione: sarebbe uno
 * spreco, perché l'assenza è di per sé l'argomento più forte che ho.
 *
 * Stessa regola di tono di TD Group, per la stessa ragione: nessun rimprovero.
 * Non avere un sito non è un errore, e chi lavora bene a passaparola da
 * vent'anni non ha bisogno che glielo si spieghi. Il soggetto delle frasi è
 * quello che succede in rete, non loro.
 */
export const STATO: SezioneHub | null = {
  occhiello: 'Quello che c’è adesso',
  titolo: 'Cosa succede se resta così.',
  intro:
    'Il 7 settembre ho cercato Arcobaleno come vi cercherebbe un agricoltore che non vi conosce. Quello che segue è quello che ho trovato: non è un giudizio, è il punto di partenza. Il vantaggio di non avere un sito è che non c’è niente da correggere — si parte puliti.',
  punti: [
    {
      n: '01',
      dato: null,
      didascalia: null,
      titolo: 'Chi vi cerca trova una riga di elenco',
      testo:
        'Non c’è un sito. Ci sono schede su PagineGialle, PagineBianche e su un paio di elenchi di imprese, compilate da loro e non da voi. Dicono nome, indirizzo e telefono, e si copiano a vicenda: l’anno di fondazione che compare su una non compare sulle altre. Chi arriva lì non ha modo di capire cosa sapete fare.',
    },
    {
      n: '02',
      dato: '0',
      didascalia: 'foto nella galleria della vostra scheda',
      titolo: 'Del vostro lavoro non si vede niente',
      testo:
        'La scheda ha uno spazio per le fotografie ed è vuoto. Un campo livellato, una trincea con il dreno posato, l’acqua che se ne va da dove prima restava ferma: sono le uniche cose che spiegano il vostro lavoro a chi non è del mestiere, e in rete non ne esiste una.',
    },
    {
      n: '03',
      dato: '2',
      didascalia: 'categorie in elenco, contro otto lavorazioni',
      titolo: 'Metà di quello che fate non è cercabile',
      testo:
        'Sugli elenchi risultate sotto “impianti di irrigazione” e “scavi e demolizioni”. Rilievo altimetrico, livellamento laser, subirrigazione, bonifiche: chi cerca esattamente quelle parole non vi trova, perché da nessuna parte è scritto che le fate.',
    },
    {
      n: '04',
      dato: null,
      didascalia: null,
      titolo: 'Non c’è un modo di scrivervi',
      testo:
        'Sugli elenchi c’è il fisso e basta: nessuna email, nessun cellulare, nessun WhatsApp. Chi vi cerca la sera o mentre è in campo non ha modo di lasciare un messaggio, e quasi nessuno richiama il giorno dopo.',
    },
    {
      n: '05',
      dato: null,
      didascalia: null,
      titolo: 'Google non sa dire dove siete',
      testo:
        'C’è una scheda di Google dove si scrivono indirizzo, telefono, orari, foto e zone servite: è quella che fa comparire un’impresa nel riquadro con la mappa quando qualcuno cerca un lavoro “vicino a me”. Non ne ho trovata una vostra. Per chi lavora su un territorio preciso è la cosa che pesa di più, e non costa niente aprirla.',
    },
  ],
};
