import type { Dettaglio, GruppoExtra } from '@/data/livelli';

/**
 * I testi di vendita dei tre livelli, per TD Group.
 *
 * Stavano dentro src/data/livelli.ts insieme alla struttura dell'offerta.
 * Sono identici a com'erano: questo spostamento non cambia una parola di
 * quello che si legge sull'hub. Cambia solo che ora un altro cliente può
 * averne di suoi invece di ereditare i tetti e i cappotti.
 *
 * La struttura — quali livelli esistono, quali righe ha la tabella, in quali
 * livelli stanno — resta in src/data/livelli.ts ed è uguale per tutti.
 */

/** A chi serve ogni livello, in una frase. */
export const PER_CHI: Record<string, string> = {
  vetrina:
    'Serve a chi vi cerca su Google e deve capire in dieci secondi chi siete, cosa fate e come chiamarvi. Tutto su una pagina sola, niente da gestire.',
  completo:
    'Serve quando il preventivo si vince facendo vedere i cantieri già fatti, e quando volete comparire su Google sulla singola lavorazione invece che solo sul nome.',
  portale:
    'Serve quando i cantieri in parallelo sono tanti e il telefono squilla troppo. Il cliente controlla il suo cantiere, i documenti e le foto della settimana senza chiamare.',
};

/** Titoli della copertina delle demo, uno per livello. */
export const TITOLI_HERO: Record<string, { titolo: string; accento: string }> = {
  vetrina: { titolo: 'Ristrutturiamo', accento: 'chiavi in mano.' },
  completo: { titolo: 'Un cantiere.', accento: 'Un interlocutore.' },
  portale: { titolo: 'Non un sito.', accento: 'Uno strumento.' },
};

/** Cosa cambia nella giornata, tre punti per livello. */
export const DETTAGLI: Record<string, Dettaglio> = {
  vetrina: {
    claim: 'Risponde alle domande che oggi fate a voce.',
    punti: [
      {
        titolo: 'Dieci secondi per capire chi siete',
        testo:
          'Chi vi cerca su Google arriva, scorre e ha capito: cosa fate, da quanto, in che paesi. Una pagina sola, nessun menù da esplorare per trovare la cosa che serviva.',
      },
      {
        titolo: 'Le domande di sempre, già risposte',
        testo:
          'Quanto ci vuole, che garanzie date, come si paga, quali bonus si possono usare, e i comuni dove venite davvero. Scritte una volta, rispondono anche alle undici di sera.',
      },
      {
        titolo: 'La chiamata a un dito di distanza',
        testo:
          'Numero in chiaro e WhatsApp con il messaggio già scritto in ogni sezione, diverso per servizio. Nessun form da compilare, nessuna mail che resta ferma in una casella.',
      },
    ],
  },
  completo: {
    claim: 'Porta telefonate da chi non vi conosce ancora.',
    punti: [
      {
        titolo: 'Nove lavorazioni, nove indirizzi',
        testo:
          'Chi ha una perdita dal tetto non cerca “TD Group”: cerca “rifacimento tetto Molinella”. Ogni servizio ha una pagina sua, ed è quella che si presenta a quella ricerca.',
      },
      {
        titolo: 'I cantieri chiusi vendono i prossimi',
        testo:
          'Il portfolio filtrabile per lavorazione. Un preventivo si vince facendo vedere il lavoro già finito, non raccontandolo: qui il cliente lo vede prima di chiamarvi.',
      },
      {
        titolo: 'Decidete voi cosa si vede',
        testo:
          'Entrate, aprite l’archivio delle vostre foto, spuntate quelle da pubblicare e scegliete l’ordine. Senza chiamarmi, senza aspettare e senza pagare una modifica.',
      },
    ],
  },
  portale: {
    claim: 'Non un sito più grande: un altro mestiere.',
    punti: [
      {
        titolo: 'Prima della firma',
        testo:
          'Il calcolatore di spesa parte dal vostro listino, non da fasce prese in giro per il web. Chi vi chiama ha già in testa una cifra decisa da voi, e la trattativa comincia da lì invece che dal preventivo del concorrente.',
      },
      {
        titolo: 'Mentre il cantiere è aperto',
        testo:
          'Il committente entra nella sua area e vede a che punto è il lavoro, le foto della settimana, le fatture e le planimetrie. Le foto le carica il capocantiere dal telefono a fine giornata, e il sito se le ridimensiona da solo.',
      },
      {
        titolo: 'Dopo la consegna',
        testo:
          'Le segnalazioni in garanzia arrivano con la foto e restano tracciate, con la loro data. Non si perdono in una chat fra centoventi messaggi di un altro cantiere.',
      },
    ],
    coda: 'Ed è la base su cui si innestano gli strumenti veri: calendario dei sopralluoghi, firma digitale del preventivo, POS, DURC e PiMUS raccolti per cantiere e pronti quando arriva il controllo, area per i subappaltatori.',
  },
};

/**
 * Il testo delle righe della tabella di confronto, per id.
 *
 * Gli id e i livelli in cui ogni riga compare stanno in src/data/livelli.ts.
 * Una riga assente da qui non viene mostrata: per TD Group ci sono tutte.
 */
export const CONFRONTO_TESTI: Record<string, { voce: string; nota: string }> = {
  copertina: {
    voce: 'Si apre a tutto schermo con una foto vostra',
    nota: 'La prima schermata è un vostro cantiere, non una foto di catalogo.',
  },
  'chi-siamo': {
    voce: 'Chi siamo con i numeri',
    nota: 'Squadre, lavorazioni gestite, area servita. Solo numeri verificabili: nessuna cifra inventata per riempire.',
  },
  servizi: {
    voce: 'Nove servizi con foto e testo completo',
    nota: 'Ogni lavorazione con la sua immagine e il testo che avete già scritto.',
  },
  'come-lavoriamo': {
    voce: 'Come lavoriamo, in quattro passi',
    nota: 'Sopralluogo, preventivo, referente unico, conformità. Toglie i dubbi prima della telefonata.',
  },
  zone: {
    voce: 'Zone servite',
    nota: 'L’elenco dei comuni dove lavorate, in chiaro. Toglie il dubbio “venite anche da me?” prima della telefonata.',
  },
  faq: {
    voce: 'Domande frequenti',
    nota: 'Durata, garanzie, pagamenti, bonus. Rispondono al posto vostro anche di notte.',
  },
  contatti: {
    voce: 'WhatsApp e telefono su ogni sezione',
    nota: 'Messaggio già scritto, diverso per ogni servizio. Niente moduli da riempire, niente mail che restano in attesa.',
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
    nota: 'Orari, foto, categorie, area servita. È da qui che arrivano le chiamate locali, più che dal sito.',
  },
  migrazione: {
    voce: 'Passaggio dal sito attuale',
    nota: 'Il sito nuovo prende il posto del vecchio senza che Google perda le pagine che ha già in elenco. Comprese le due che oggi hanno un errore di battitura nell’indirizzo: chi ci arriva viene portato su quella giusta.',
  },
  'pagine-servizio': {
    voce: 'Una pagina intera per ognuno dei nove servizi',
    nota: 'Nella Vetrina il testo si apre dentro la pagina unica. Qui ogni lavorazione ha una pagina tutta sua, con un indirizzo suo: è quello che serve per farvi uscire su “rifacimento tetto Molinella”.',
  },
  portfolio: {
    voce: 'I lavori fatti, divisi per tipo',
    nota: 'Le foto dei cantieri con i pulsanti per vedere solo i tetti, solo i bagni, solo i cappotti. Chi cerca il suo lavoro lo trova in due tocchi.',
  },
  'scelta-foto': {
    voce: 'Scegliete voi quali lavori mostrare',
    nota: 'Entrate, aprite l’archivio delle vostre foto già caricate, spuntate quelle da pubblicare e decidete l’ordine. Senza chiamare nessuno.',
  },
  'caricamento-foto': {
    voce: 'Caricate foto di cantieri nuovi',
    nota: 'Le foto di un cantiere appena finito, mandate dal telefono. Il sito le alleggerisce da solo, così le pagine restano rapide ad aprirsi anche con poco segnale.',
  },
  calcolatore: {
    voce: 'Calcolatore di spesa sui vostri prezzi',
    nota: 'Cinque domande, una forbice di spesa a schermo e il messaggio WhatsApp già scritto. Nella bozza gira su fasce medie di mercato; online parte dal vostro listino, così la trattativa comincia da un numero deciso da voi.',
  },
  'area-cliente': {
    voce: 'Area cliente con stato lavori',
    nota: 'Il cliente vede a che punto è il cantiere senza telefonare.',
  },
  'documenti-cliente': {
    voce: 'Documenti e foto per il cliente',
    nota: 'Fatture, planimetrie e foto della settimana, scaricabili dalla sua area. Solo quello che al committente serve vedere.',
  },
};

/**
 * Servizi fuori dai tre livelli, quotati a parte.
 *
 * Il gruppo A è il primo perché è l'unico ricorrente: è lì che sta il valore
 * di lungo periodo, non nella vendita una tantum del sito.
 */
export const EXTRA_TESTI: GruppoExtra[] = [
  {
    gruppo: 'Mantenimento',
    intro:
      'Messa online, dominio e passaggio dal vecchio sito sono già nel prezzo. Questo è quello che si aggiunge dopo, per non restare soli davanti al sito.',
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
        nome: 'Una pagina per comune',
        testo:
          '“Ristrutturazioni a Budrio”, “rifacimento tetti a Medicina”. Una pagina per ogni paese dove lavorate davvero. Il testo è scritto da me ed è compreso nel prezzo della pagina.',
      },
      {
        nome: 'Pagine dedicate alle campagne',
        testo:
          'Una pagina fatta apposta per il singolo tema — cappotto termico, bonus fiscali — dove far atterrare gli annunci. Testo compreso, come per le pagine dei comuni.',
      },
      {
        nome: 'Prima e dopo affiancati',
        testo:
          'Il confronto che convince di più in assoluto. Serve però la coppia di foto dello stesso punto: per i cantieri già chiusi spesso manca il “prima”, e allora si parte dai lavori nuovi fotografando prima di cominciare.',
      },
    ],
  },
  {
    gruppo: 'Strumenti per il cantiere',
    intro:
      'Estensioni del Portale. Si aggiungono quando il volume di lavoro le rende necessarie, non prima.',
    voci: [
      {
        nome: 'Calendario sopralluoghi',
        testo:
          'Il cliente prenota da solo su uno slot libero. Meno telefonate per fissare un appuntamento.',
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
        nome: 'Documenti di sicurezza, per voi',
        testo:
          'POS, DURC, PiMUS raccolti per cantiere e trovabili quando arriva il controllo. Non è l’area del cliente: qui dentro il committente non entra.',
      },
      {
        nome: 'Area per i subappaltatori',
        testo:
          'Non un secondo archivio: è la porta d’ingresso a quello di sopra. Ogni ditta entra e vede solo il suo cantiere, i documenti che la riguardano e le sue scadenze. Nient’altro.',
      },
      {
        nome: 'Segnalazione guasti in garanzia',
        testo:
          'Il cliente segnala un problema post-consegna con foto. Le richieste restano tracciate invece di perdersi in chat.',
      },
      {
        nome: 'App installabile per le squadre',
        testo:
          'Caricare le foto si fa già dal sito. Questa mette il portale come icona sullo schermo del telefono dei capisquadra: si apre come una qualsiasi applicazione e ricorda già chi siete, senza dover ogni volta cercare l’indirizzo e rifare l’accesso.',
      },
    ],
  },
  {
    gruppo: 'Su misura per l’edilizia',
    intro: 'Cose che hanno senso per un’impresa edile e per quasi nessun altro.',
    voci: [
      {
        nome: 'Configuratore delle detrazioni',
        testo:
          'Non quanto costa — a quello risponde già il calcolatore del Portale — ma quanto lo Stato gliene restituisce. Il cliente capisce a che bonus ha diritto prima di chiamarvi, e arriva già informato.',
      },
      {
        nome: 'Calcolo del risparmio col cappotto',
        testo:
          'La terza domanda dopo “quanto costa” e “quanto recupero”: quanto torna indietro in bolletta ogni anno, sui metri quadri suoi. È l’argomento che chiude la vendita del cappotto.',
      },
      {
        nome: 'Mappa dei cantieri',
        testo:
          'I lavori fatti su una mappa. Chi vi cerca vede subito se lavorate dalle sue parti.',
      },
      {
        nome: 'Diario di cantiere',
        testo:
          'Una pagina per cantiere aggiornata dal telefono. Ogni cantiere diventa una pagina in più su Google.',
      },
      {
        nome: 'Lavora con noi',
        testo:
          'Pagina per le candidature, con contatto WhatsApp. In edilizia trovare gente è metà del problema.',
      },
    ],
  },
];
