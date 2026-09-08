import type { SezioneHub, VisualeBozza } from '@/data/hub';

/**
 * I testi dell'hub, per TD Group.
 *
 * Stavano dentro i componenti in src/components/hub/. Sono identici a
 * com'erano: lo spostamento non cambia una parola.
 *
 * Ogni numero è contato sui file scaricati in `scraped/`, mai stimato. La
 * fonte di ognuno è AUDIT.md, rilevazione del 4 settembre 2026:
 *   3     -> AUDIT 2.1 / 2.3 (P.IVA, REA, sede: assenti in 21 pagine)
 *   Kyle  -> AUDIT 3.1 / 3.2 (pagine dimostrative del tema mai rimosse)
 *   340   -> AUDIT 4.5 (alt text uguale al nome del file, su 583 foto)
 *   155   -> AUDIT 5 (110 KB CSS + 45 KB JS inline per pagina)
 *   05    -> AUDIT 4.7 (nessuno schema LocalBusiness / GeneralContractor)
 * Se AUDIT.md cambia, questi vanno rifatti: non sono decorazione.
 */

/** La riga finale dell'H1 dell'hub, dopo "Costruisco siti". */
export const MESTIERE_HERO = "per l'edilizia.";

/** Il paragrafo di presentazione accanto al titolo. */
export const PRESENTAZIONE =
  'Ho dieci anni di produzione e controllo qualità industriale alle spalle. Li uso, insieme all’intelligenza artificiale, per costruire strumenti digitali che reggono il cantiere vero.';

/** L'introduzione della griglia con le tre bozze. */
export const INTRO_BOZZE =
  'Stessi contenuti, stesse foto dei vostri cantieri. Cambia quanto lontano volete spingervi — e ogni livello contiene per intero quello sotto.';

/** Le foto di copertina delle tre schede in griglia. */
export const VISUALI: Record<string, VisualeBozza> = {
  portale: {
    slug: 'cartongesso-pareti-e-soffitti-in-cartongesso-10',
    ripiego: 'ristrutturazioni',
  },
  completo: { slug: 'tinteggiatura-loft-01', ripiego: 'pitture-di-interior-design' },
  vetrina: { slug: 'tetti-rifacimento-del-tetto-01', ripiego: 'tetti' },
};

/**
 * Perché un sito fatto bene, prima ancora di quale dei tre livelli.
 *
 * Quattro benefici, tutti rivolti in avanti. Nessun confronto con il sito
 * attuale: può averlo fatto qualcuno di famiglia, e un cliente da acquisire
 * non si convince dicendogli che ha sbagliato. Si convince mostrandogli cosa
 * guadagna.
 */
export const PERCHE: SezioneHub = {
  occhiello: 'Perché un sito nuovo',
  titolo: 'Cosa cambia, in pratica.',
  intro:
    'Un sito non serve a essere su internet: ci siete già. Serve a far arrivare il lavoro giusto e a togliere il resto di mezzo. Queste sono le quattro cose che cambiano dal giorno dopo la messa online.',
  punti: [
    {
      n: '01',
      dato: '370',
      didascalia: 'foto di cantieri mai pubblicate',
      titolo: 'I lavori già fatti tornano a vendere',
      testo:
        'Nella vostra libreria ci sono 583 foto di cantieri veri, e 370 non sono mai finite online. Sono lavori già fatti e già pagati: pubblicati, ognuno porta il prossimo. È l’unico capitale che avete già in casa e che oggi non rende niente.',
    },
    {
      n: '02',
      dato: '9',
      didascalia: 'lavorazioni, ognuna cercata per conto suo',
      titolo: 'Vi trova anche chi non vi conosce',
      testo:
        'Chi ha una perdita dal tetto non cerca un’impresa per nome: cerca il lavoro che gli serve, nel suo paese. Il passaparola vi porta chi vi conosce già. Le pagine dei servizi vi portano tutti gli altri, quelli che oggi chiamano un altro numero.',
    },
    {
      n: '03',
      dato: null,
      didascalia: null,
      titolo: 'Chi chiama ha già deciso',
      testo:
        'Se prima della telefonata ha visto i cantieri finiti, i comuni dove andate e come lavorate, non chiama per informarsi: chiama per fissare il sopralluogo. Meno giri a vuoto il sabato, trattativa più corta, meno spazio a chi tira sul prezzo.',
    },
    {
      n: '04',
      dato: null,
      didascalia: null,
      titolo: 'Tutto quello che c’è scritto è verificabile',
      testo:
        'Partita IVA, REA, certificazioni e comuni serviti li scrivo quando me li date, e fino ad allora restano segnaposto gialli in pagina. Nessun numero plausibile messo lì per riempire: quello che promettete online è quello che poi dovete mantenere in cantiere.',
    },
  ],
};

/**
 * Cosa c'è online adesso, con i numeri.
 *
 * Sta subito prima del footer, cioè subito prima della decisione: è la
 * risposta alla domanda che il cliente si fa per ultima, "e se lasciassimo
 * tutto com'è?".
 *
 * Regola di tono, non negoziabile: il soggetto di ogni frase è il software,
 * mai il cliente. Il sito attuale può averlo messo su qualcuno di famiglia, e
 * un cliente da acquisire non si convince dicendogli che ha sbagliato. Astra è
 * arrivato con dentro le sue pagine dimostrative ed Elementor stampa il suo
 * codice per conto suo: sono cose che quei programmi fanno da soli. Il
 * rimprovero non c'è perché non serve, e perché sarebbe rivolto alla persona
 * sbagliata.
 *
 * A null la sezione non viene resa: serve per i clienti che un sito non ce
 * l'hanno.
 */
export const STATO: SezioneHub | null = {
  occhiello: 'Il sito di oggi',
  titolo: 'Cosa succede se resta così.',
  intro:
    'Ho scaricato le ventuno pagine di tdgroupsrls.it il 4 settembre e ho contato una per una. Quello che segue non è un giudizio sul sito e non è una critica a chi l’ha messo su: sono cose che il programma con cui è costruito fa per conto suo, senza chiedere niente a nessuno, e che restano lì finché qualcuno non le toglie a mano.',
  punti: [
    {
      n: '01',
      dato: '3',
      didascalia: 'dati che la legge vi chiede, e non ci sono',
      titolo: 'Sul sito mancano i dati obbligatori',
      testo:
        'Partita IVA, numero REA e l’indirizzo completo della sede. Li ho cercati in tutte e ventuno le pagine, nei due PDF e nei due documenti Word che avete online: non ci sono da nessuna parte. Per una S.R.L.S. devono stare sul sito, lo dice il Codice Civile all’articolo 2250. È l’unica cosa di questo elenco che non riguarda quanti clienti vi arrivano: è un obbligo e basta.',
    },
    {
      n: '02',
      dato: null,
      didascalia: null,
      titolo: 'In homepage c’è una persona che non esiste',
      testo:
        'Il programma con cui è fatto il sito arriva con dentro delle pagine di esempio, riempite con nomi e testi inventati per far vedere come verrebbe. Una non è mai stata svuotata: in homepage, sotto la prima foto, c’è la presentazione in inglese di un arredatore inventato, scritta come se parlasse lui. Poco sotto, “Most Recent Projects” e un pulsante “View All Services”. Google la legge e la mostra come qualsiasi altra vostra pagina.',
    },
    {
      n: '03',
      dato: '340',
      didascalia: 'foto su 583 che Google non riesce a vedere',
      titolo: 'Metà delle vostre foto è invisibile',
      testo:
        'Google non sa guardare una fotografia: legge la riga di descrizione che le sta attaccata dietro, e da quella capisce cosa c’è dentro. Su 583 foto, 340 hanno come descrizione il nome del file — “immagine whatsapp 2025 09 22 ore 18.05.44”. Sono 340 cantieri veri che nessuno troverà mai cercando il lavoro che mostrano. La stessa riga è quella che viene letta ad alta voce a chi non ci vede.',
    },
    {
      n: '04',
      dato: '155',
      didascalia: 'KB caricati prima della prima parola',
      titolo: 'Le pagine si aprono lente',
      testo:
        'Prima di far comparire una sola parola, ogni pagina scarica 155 KB di istruzioni grafiche che il programma si porta dietro, comprese diciotto versioni dello stesso carattere di scrittura — anche quelle che sul sito non si usano mai. Poi tocca alle foto: 304 KB l’una in media, e 183 sono grandi il doppio di quello che serve per stare a schermo. Chi vi cerca dal cantiere, con una tacca di segnale, aspetta tutto questo prima di vedere qualcosa.',
    },
    {
      n: '05',
      dato: null,
      didascalia: null,
      titolo: 'Google non sa dire dove siete',
      testo:
        'C’è una scheda nascosta, che il sito passa a Google, dove si scrivono indirizzo, telefono, orari e i comuni dove lavorate. È quella che fa comparire un’impresa nel riquadro con la mappa quando qualcuno cerca un lavoro “vicino a me”. Sul vostro sito non c’è. Per chi lavora su un territorio preciso è la cosa che pesa di più, e non costa niente metterla.',
    },
  ],
};
