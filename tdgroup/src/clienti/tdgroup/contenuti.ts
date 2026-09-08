/**
 * Contenuti dei blocchi aggiunti alla Vetrina.
 *
 * Le risposte alle domande frequenti sono **anteprime scritte da noi**: dicono
 * cose plausibili ma non verificate. Ogni voce marcata `daConfermare` compare
 * nella pagina con un segno visibile, così in riunione si vede subito cosa
 * TD Group deve confermare o correggere. Nessuna diventa definitiva da sola.
 */

export const COME_LAVORIAMO = [
  {
    n: '01',
    titolo: 'Sopralluogo gratuito',
    testo:
      'Veniamo a vedere il lavoro senza impegno e senza costi. Misuriamo, fotografiamo e diciamo subito se è nelle nostre corde e quando potremmo partire.',
  },
  {
    n: '02',
    titolo: 'Preventivo dettagliato',
    testo:
      'Voce per voce, con i materiali indicati per nome. Niente “a corpo” generico: sapete cosa state pagando e cosa succede se qualcosa cambia in corso d’opera.',
  },
  {
    n: '03',
    titolo: 'Un solo referente',
    testo:
      'Come General Contractor coordiniamo noi muratori, idraulici, elettricisti e posatori. Voi avete un numero solo da chiamare, non sei ditte da rincorrere.',
  },
  {
    n: '04',
    titolo: 'Consegna e conformità',
    testo:
      'A fine lavori consegniamo pulito e rilasciamo le dichiarazioni di conformità degli impianti installati.',
  },
] as const;

export type Faq = {
  domanda: string;
  risposta: string;
  /** true finché TD Group non conferma o corregge la risposta. */
  daConfermare: boolean;
};

export const FAQ: Faq[] = [
  {
    domanda: 'Quanto dura una ristrutturazione completa?',
    risposta:
      'Dipende dai metri quadri e da quanti impianti si rifanno. Per un appartamento di taglio medio si va da poche settimane a qualche mese. La data la mettiamo nel preventivo, non a voce.',
    daConfermare: true,
  },
  {
    domanda: 'Chi mi segue durante i lavori?',
    risposta:
      'Un solo referente per tutto il cantiere. È lui che coordina le squadre e a cui scrivete se avete un dubbio, anche a lavori iniziati.',
    daConfermare: false,
  },
  {
    domanda: 'Lavorate anche fuori da Molinella?',
    risposta:
      'Sì, operiamo in tutta l’Emilia-Romagna. Con tre squadre attive seguiamo più cantieri in parallelo.',
    daConfermare: false,
  },
  {
    domanda: 'Che garanzie ho sui lavori?',
    risposta:
      'Valgono le garanzie di legge sulle opere edili, più quelle dei produttori sui materiali installati. Le dichiarazioni di conformità degli impianti ve le consegniamo a fine lavori.',
    daConfermare: true,
  },
  {
    domanda: 'Vi occupate anche delle pratiche per i bonus fiscali?',
    risposta:
      'Vi indirizziamo al tecnico giusto e prepariamo la documentazione tecnica che serve. Le pratiche fiscali vere e proprie le segue un professionista abilitato.',
    daConfermare: true,
  },
  {
    domanda: 'Come funzionano i pagamenti?',
    risposta:
      'A stati di avanzamento concordati nel preventivo, con un acconto alla partenza. Fatturiamo ogni fase, così sapete sempre a che punto siete.',
    daConfermare: true,
  },
  {
    domanda: 'Devo lasciare casa durante i lavori?',
    risposta:
      'Non sempre. Per interventi su un singolo ambiente, come il bagno, proteggiamo le zone di passaggio e si può restare. Per una ristrutturazione completa di solito conviene spostarsi.',
    daConfermare: true,
  },
  {
    domanda: 'Smaltite voi i materiali di risulta?',
    risposta:
      'Sì, macerie e materiali di risulta sono a nostro carico, con smaltimento certificato. Per l’amianto ci appoggiamo a ditte specializzate autorizzate.',
    daConfermare: false,
  },
];

/**
 * Il paragrafo di apertura del blocco "Chi siamo".
 *
 * Stava scritto dentro Statistiche.tsx: e' il pezzo di prosa piu' specifico
 * dell'azienda che ci sia, quindi il componente non e' il posto giusto.
 * Ogni cliente riscrive questo, non il componente.
 */
export const CHI_SIAMO =
  'opera come General Contractor: pianificazione, direzione dei lavori e ' +
  'consegna chiavi in mano. Nata nel 2016 dall’unione di artigiani che ' +
  'collaboravano da decenni con la storica TD di Triberti Domenico.';


/**
 * Le intestazioni dei blocchi.
 *
 * Stavano scritte dentro i componenti, e dicevano cose su TD Group: "nove
 * lavorazioni gestite da tre squadre interne", "sono tutte fotografie
 * scattate sui nostri cantieri". Su un altro cliente diventano affermazioni
 * false — e "foto nostre" sopra immagini generate e' esattamente la bugia che
 * il progetto esiste per non dire (CLAUDE.md §7).
 *
 * Quindi stanno qui, e ogni cliente scrive le sue.
 */
export const INTESTAZIONI = {
  servizi: {
    testo:
      'Nove lavorazioni gestite da tre squadre interne. Nessun subappalto scoordinato: il cantiere resta uno solo, con un solo referente.',
  },
  comeLavoriamo: {
    titolo: 'Dal sopralluogo alle chiavi.',
    testo: 'Un cantiere solo, un referente solo. Voi non coordinate nessuno.',
  },
  portfolio: {
    titolo: 'Cantieri veri, foto nostre.',
    testo:
      'Nessuna immagine di catalogo: sono tutte fotografie scattate sui nostri cantieri in Emilia-Romagna.',
  },
  zone: {
    titolo: 'cantiere per cantiere.',
    testo:
      'La sede è a {comune} ({provincia}), ma con tre squadre attive seguiamo più cantieri in parallelo in tutta la regione. Se il vostro immobile è qui intorno, veniamo a vederlo.',
    avviso:
      'Qui va l’elenco dei comuni dove lavorate davvero: è la parte che vi fa trovare da chi cerca “impresa edile” più il nome del suo paese. Servono i vostri, non un elenco preso dalla cartina.',
    coda:
      'Non trovate il vostro comune? Scriveteci lo stesso: fuori zona valutiamo caso per caso, in base al tipo di lavoro.',
  },
} as const;

/**
 * Blocchi che questo cliente non monta, qualunque livello scelga.
 *
 * Per TD Group nessuno: i livelli in src/data/livelli.ts sono stati scritti
 * sul loro mestiere.
 */
export const BLOCCHI_ESCLUSI: readonly string[] = [];


/**
 * L'immagine di apertura della homepage. Stava scritta dentro Hero.tsx:
 * quale immagine apre il sito è una scelta del cliente, non del componente.
 * Villa con copertura rifatta, cantiere Galletti — l'originale da 2048 px è
 * l'unico formato adatto a coprire tutto lo schermo.
 */
export const FOTO_APERTURA = {
  slug: 'tetti-rifacimento-del-tetto-05',
  ripiego: 'tetti',
} as const;
