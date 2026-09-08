import type { Dettaglio, GruppoExtra } from '@/data/livelli';

/**
 * I testi di vendita dei tre livelli, per Arcobaleno S.r.l.
 *
 * Chi legge l'hub è Arcobaleno, e Arcobaleno fa drenaggio agricolo: rilievi
 * altimetrici, livellamento laser, posa di dreni. Il suo cliente è
 * un'azienda agricola, non un proprietario di casa.
 *
 * Quindi qui non si parla mai di cantieri, appartamenti, bagni o bonus
 * fiscali: gli argomenti sono la stagione, il campo, lo scarico, gli ettari.
 * Gli esempi di ricerca su Google sono quelli che digita un agricoltore.
 *
 * Come per il resto dell’anteprima, nessun numero e nessuna referenza:
 * quante squadre abbiano, quanti ettari abbiano fatto e da quando lavorino
 * non ce lo ha detto nessuno.
 */

/** A chi serve ogni livello, in una frase. */
export const PER_CHI: Record<string, string> = {
  vetrina:
    'Serve a chi vi cerca su Google e deve capire in dieci secondi cosa fate e come chiamarvi. Oggi in rete di voi c’è una riga su PagineGialle: chi cerca “drenaggio terreni” non vi trova.',
  completo:
    'Serve quando il lavoro si vince facendo vedere gli interventi già fatti, e quando volete uscire su Google sulla singola lavorazione — “livellamento laser”, “posa dreni” — invece che solo sul nome.',
  portale:
    'Serve quando gli interventi in parallelo sono tanti e la stagione è corta. Il committente vede a che punto è il suo campo, le foto e i documenti, senza chiamare in ufficio.',
};

/** Titoli della copertina delle demo, uno per livello. */
export const TITOLI_HERO: Record<string, { titolo: string; accento: string }> = {
  vetrina: { titolo: 'Il campo', accento: 'scola come deve.' },
  completo: { titolo: 'Prima il rilievo.', accento: 'Poi si scava.' },
  portale: { titolo: 'Non un sito.', accento: 'Uno strumento.' },
};

/** Cosa cambia nella giornata, tre punti per livello. */
export const DETTAGLI: Record<string, Dettaglio> = {
  vetrina: {
    claim: 'Risponde alle domande che oggi fate al telefono.',
    punti: [
      {
        titolo: 'Dieci secondi per capire cosa fate',
        testo:
          'Drenaggio, livellamento, subirrigazione: un agricoltore che non vi conosce capisce subito se il suo problema è dei vostri. Una pagina sola, senza menù da esplorare.',
      },
      {
        titolo: 'Le domande di sempre, già risposte',
        testo:
          'In che stagione si interviene, quanto dura un impianto, se serve l’autorizzazione allo scarico, se si può fare su un fondo in affitto. Scritte una volta, rispondono anche di domenica.',
      },
      {
        titolo: 'La chiamata a un dito di distanza',
        testo:
          'Numero in chiaro in ogni sezione, con l’oggetto della richiesta già scritto. Nessun form da compilare, nessuna mail che resta ferma in una casella.',
      },
    ],
  },
  completo: {
    claim: 'Porta telefonate da chi non vi conosce ancora.',
    punti: [
      {
        titolo: 'Otto lavorazioni, otto indirizzi',
        testo:
          'Chi ha un campo che ristagna non cerca “Arcobaleno”: cerca “drenaggio terreni agricoli Bologna”. Ogni lavorazione ha una pagina sua, ed è quella che si presenta a quella ricerca.',
      },
      {
        titolo: 'I campi fatti vendono i prossimi',
        testo:
          'Le foto degli interventi, filtrabili per lavorazione. Un livellamento si vende facendo vedere il campo prima e dopo, non raccontandolo: qui si vede prima della telefonata.',
      },
      {
        titolo: 'Decidete voi cosa si vede',
        testo:
          'Entrate, aprite l’archivio delle vostre foto, spuntate quelle da pubblicare e scegliete l’ordine. Senza chiamarmi, senza aspettare e senza pagare una modifica.',
      },
    ],
  },
  portale: {
    claim: 'Non un sito più grande: un altro modo di lavorare.',
    punti: [
      {
        titolo: 'Prima dell’intervento',
        testo:
          'Il committente vede la data prevista e cosa serve preparare — campo libero, accessi, punto di scarico verificato. Meno telefonate per concordare quando si entra.',
      },
      {
        titolo: 'Mentre si lavora',
        testo:
          'Entra nella sua area e vede a che punto è il suo campo, le foto della giornata e i metri di dreno già posati. Le foto le carica l’operatore dal telefono a fine turno.',
      },
      {
        titolo: 'Dopo la consegna',
        testo:
          'La pianta di quello che è stato posato resta lì, con le sue quote. Fra dieci anni, quando serve sapere dove passano i dreni prima di scavare, non è in un cassetto: è nella sua area.',
      },
    ],
    coda: 'Ed è la base su cui si innestano gli strumenti veri: calendario dei sopralluoghi legato alla stagione, firma digitale del preventivo, archivio delle planimetrie per fondo, area per i terzisti che lavorano con voi.',
  },
};

/**
 * Il testo delle righe della tabella di confronto, per id.
 *
 * Gli id e i livelli in cui ogni riga compare stanno in src/data/livelli.ts.
 *
 * Mancano due righe, di proposito:
 *
 *   'migrazione' — Arcobaleno non ha un sito. Non c'è nessun posizionamento
 *   da conservare e prometterglielo sarebbe vendere aria.
 *
 *   'calcolatore' — le fasce di src/data/stime.ts sono dell'edilizia
 *   residenziale. Perché la riga torni servono fasce vere per rilievo,
 *   livellamento e posa, e quelle le può dare solo Arcobaleno. È la stessa
 *   ragione per cui il blocco è in BLOCCHI_ESCLUSI.
 *
 * Una riga assente non compare in tabella: è il modo di non promettere.
 */
export const CONFRONTO_TESTI: Record<string, { voce: string; nota: string }> = {
  copertina: {
    voce: 'Si apre a tutto schermo con una foto vostra',
    nota: 'La prima schermata è un vostro intervento, non una foto di catalogo.',
  },
  'chi-siamo': {
    voce: 'Chi siamo con i numeri',
    nota: 'Ettari trattati, lavorazioni gestite, area servita. Solo numeri verificabili: nessuna cifra inventata per riempire.',
  },
  servizi: {
    voce: 'Otto lavorazioni con foto e testo completo',
    nota: 'Dal rilievo altimetrico alla vendita dei tubi, ognuna con la sua immagine e il suo testo.',
  },
  'come-lavoriamo': {
    voce: 'Come lavoriamo, in quattro passi',
    nota: 'Rilievo, progetto, esecuzione, verifica dello scarico. Toglie i dubbi prima della telefonata.',
  },
  zone: {
    voce: 'Zone servite',
    nota: 'Le aree dove intervenite davvero, in chiaro. Toglie il dubbio “venite anche da me?” prima della telefonata.',
  },
  faq: {
    voce: 'Domande frequenti',
    nota: 'Stagione, durata dell’impianto, autorizzazioni, terreni in affitto. Rispondono al posto vostro anche di notte.',
  },
  contatti: {
    voce: 'Telefono su ogni sezione',
    nota: 'Numero in chiaro con l’oggetto della richiesta già scritto, diverso per lavorazione. Niente moduli, niente mail in attesa. Con un cellulare si aggiunge anche WhatsApp.',
  },
  'dati-societari': {
    voce: 'Dati societari e obblighi di legge',
    nota: 'Partita IVA, sede legale, numero REA e le due pagine su privacy e cookie che la legge impone di avere.',
  },
  google: {
    voce: 'Scritto in modo che Google lo capisca',
    nota: 'Ogni pagina con il suo titolo e le due righe che Google mostra nei risultati, scritte a mano da me. E sotto ogni foto, scritto cosa mostra.',
  },
  dominio: {
    voce: 'L’indirizzo del sito e lo spazio dove sta acceso',
    nota: 'Il vostro indirizzo su internet, lo spazio dove il sito vive giorno e notte e il lucchetto della connessione sicura. Primo anno compreso; dal secondo si rinnova a parte.',
  },
  'google-business': {
    voce: 'Scheda Google Business',
    nota: 'Orari, foto, categorie, area servita. Oggi non ne avete una: è da lì che arrivano le chiamate locali, spesso più che dal sito.',
  },
  'pagine-servizio': {
    voce: 'Una pagina intera per ognuna delle otto lavorazioni',
    nota: 'Nella Vetrina il testo si apre dentro la pagina unica. Qui ogni lavorazione ha una pagina tutta sua, con un indirizzo suo: è quello che serve per uscire su “livellamento laser terreni”.',
  },
  portfolio: {
    voce: 'I lavori fatti, divisi per tipo',
    nota: 'Le foto degli interventi con i pulsanti per vedere solo i drenaggi, solo i livellamenti, solo le bonifiche. Chi cerca il suo problema lo trova in due tocchi.',
  },
  'scelta-foto': {
    voce: 'Scegliete voi quali lavori mostrare',
    nota: 'Entrate, aprite l’archivio delle vostre foto già caricate, spuntate quelle da pubblicare e decidete l’ordine. Senza chiamare nessuno.',
  },
  'caricamento-foto': {
    voce: 'Caricate foto di interventi nuovi',
    nota: 'Le foto di un campo appena finito, mandate dal telefono anche dal bordo del fosso. Il sito le alleggerisce da solo, così le pagine restano rapide anche con poco segnale.',
  },
  'area-cliente': {
    voce: 'Area cliente con stato dei lavori',
    nota: 'Il committente vede a che punto è il suo campo senza telefonare.',
  },
  'documenti-cliente': {
    voce: 'Documenti e planimetrie per il cliente',
    nota: 'Fatture, piante dei dreni posati e foto dell’intervento, scaricabili dalla sua area. Solo quello che al committente serve vedere.',
  },
};

/**
 * Servizi fuori dai tre livelli, quotati a parte.
 *
 * L'ultimo gruppo di TD Group si chiamava "Su misura per l'edilizia" e
 * conteneva il calcolo del risparmio col cappotto e il configuratore delle
 * detrazioni. Qui è rifatto da zero sul drenaggio: non è una riga da
 * riscrivere, è un gruppo intero da cambiare.
 */
export const EXTRA_TESTI: GruppoExtra[] = [
  {
    gruppo: 'Mantenimento',
    intro:
      'Messa online e dominio sono già nel prezzo. Questo è quello che si aggiunge dopo, per non restare soli davanti al sito.',
    voci: [
      {
        nome: 'Backup e aggiornamenti',
        testo: 'Copie automatiche e aggiornamenti di sicurezza, senza pensarci.',
      },
      {
        nome: 'Monitoraggio',
        testo:
          'Se il sito va giù lo so prima io di voi, e lo sistemo senza aspettare la segnalazione.',
      },
      {
        nome: 'Un monte ore di modifiche ogni mese',
        testo:
          'Le foto le mettete voi. Questo serve per il resto: cambiare i testi, aggiungere una sezione, correggere quello che non si tocca dal pannello. Senza aprire una trattativa ogni volta.',
      },
    ],
  },
  {
    gruppo: 'Pagine e sezioni in più',
    intro:
      'Il sito è la destinazione. Queste sono le pagine che ce la portano, e le sezioni che la convincono una volta arrivata.',
    voci: [
      {
        nome: 'Una pagina per zona',
        testo:
          '“Drenaggio terreni a Medicina”, “livellamento laser nel Budriese”. Una pagina per ogni area dove intervenite davvero. Il testo è scritto da me ed è compreso nel prezzo della pagina.',
      },
      {
        nome: 'Prima e dopo affiancati',
        testo:
          'Su un livellamento è il confronto che convince di più in assoluto: lo stesso campo con l’acqua ferma e poi senza. Serve la coppia di foto dallo stesso punto, quindi si parte dai lavori nuovi fotografando prima di entrare.',
      },
      {
        nome: 'Pagina per i bandi e i contributi',
        testo:
          'Le sistemazioni idraulico-agrarie rientrano spesso nelle misure dello sviluppo rurale. Una pagina che lo dice, aggiornata quando escono i bandi, intercetta chi sta decidendo proprio in quel momento.',
      },
    ],
  },
  {
    gruppo: 'Strumenti per il campo',
    intro:
      'Estensioni del Portale. Si aggiungono quando il volume di lavoro le rende necessarie, non prima.',
    voci: [
      {
        nome: 'Calendario sopralluoghi',
        testo:
          'Il cliente prenota da solo su uno slot libero. Utile soprattutto sotto stagione, quando le richieste si accavallano in poche settimane.',
      },
      {
        nome: 'Gestione contatti',
        testo:
          'Ogni richiesta con il suo stato: da chiamare, sopralluogo fatto, preventivo mandato, vinto o perso. Niente più foglietti.',
      },
      {
        nome: 'Firma digitale del preventivo',
        testo: 'Il cliente accetta dal telefono, senza stampare o passare in ufficio.',
      },
      {
        nome: 'Archivio delle planimetrie per fondo',
        testo:
          'Le piante dei dreni posati, con le loro quote, ordinate per fondo e per proprietario. Quando fra dieci anni qualcuno chiede dove passano i tubi prima di scavare, la risposta si trova in un minuto.',
      },
      {
        nome: 'Area per i terzisti',
        testo:
          'Ogni ditta che lavora con voi entra e vede solo i suoi interventi, i documenti che la riguardano e le sue scadenze. Nient’altro.',
      },
      {
        nome: 'App installabile per gli operatori',
        testo:
          'Caricare le foto si fa già dal sito. Questa mette il portale come icona sullo schermo del telefono: si apre come una qualsiasi applicazione e ricorda già chi siete, senza rifare l’accesso ogni volta.',
      },
    ],
  },
  {
    gruppo: 'Su misura per il drenaggio',
    intro:
      'Cose che hanno senso per chi lavora sui terreni agricoli e per quasi nessun altro.',
    voci: [
      {
        nome: 'Mappa degli interventi',
        testo:
          'I campi sistemati su una mappa. Chi vi cerca vede subito se lavorate dalle sue parti, e vede che nella sua zona ci siete già stati.',
      },
      {
        nome: 'Calcolo dell’interasse dei dreni',
        testo:
          'Poche domande — tessitura del terreno, profondità di posa — e una distanza indicativa fra i dreni. Non sostituisce il rilievo e lo dice: serve a far capire da cosa dipende il preventivo, e a far arrivare al telefono uno che ha già capito.',
      },
      {
        nome: 'Diario di intervento',
        testo:
          'Una pagina per campo, aggiornata dal telefono a fine giornata. Ogni intervento diventa una pagina in più su Google, con il nome della zona dentro.',
      },
      {
        nome: 'Scheda tecnica dei materiali',
        testo:
          'Diametri, classi, portate dei tubi che vendete. Chi cerca “tubo drenante 80 mm” arriva sulla scheda invece che su un catalogo di un altro.',
      },
    ],
  },
];
