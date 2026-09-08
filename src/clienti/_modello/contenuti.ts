/**
 * MODELLO — copiare la cartella, non modificarla.
 *
 * Contenuti dei blocchi aggiunti alla Vetrina. È il secondo e ultimo file che
 * si scrive a mano.
 *
 * Le risposte alle domande frequenti qui sotto sono **buone per quasi ogni
 * impresa edile**: sono sapere di mestiere, non affermazioni su una ditta
 * specifica. Vanno rilette e adattate, non riscritte da zero.
 *
 * Ogni voce con `daConfermare: true` compare in pagina con un segno visibile,
 * così in riunione si vede subito cosa il cliente deve confermare o
 * correggere. Nessuna diventa definitiva da sola. Le poche che contengono un
 * dato specifico dell'azienda partono tutte da `true`.
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
  /** true finché il cliente non conferma o corregge la risposta. */
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
    daConfermare: true,
  },
  {
    domanda: 'Lavorate anche fuori da {{COMUNE}}?',
    risposta:
      '{{RISPOSTA_AREA_SERVITA}} — dire fin dove ci si spinge davvero, e con quante squadre.',
    daConfermare: true,
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
    daConfermare: true,
  },
];

/**
 * Il paragrafo di apertura del blocco "Chi siamo".
 *
 * Va scritto per ogni cliente: è il pezzo di prosa più specifico dell'azienda
 * che ci sia. In pagina compare preceduto dalla ragione sociale, quindi
 * comincia col verbo.
 */
export const CHI_SIAMO = '{{CHI_SIAMO_DA_SCRIVERE}}';

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
    testo: '{{INTRO_SERVIZI_DA_SCRIVERE}}',
  },
  comeLavoriamo: {
    titolo: '{{TITOLO_COME_LAVORIAMO}}',
    testo: '{{INTRO_COME_LAVORIAMO}}',
  },
  portfolio: {
    // Mai "foto nostre" finche' le immagini sono generate.
    titolo: '{{TITOLO_LAVORI}}',
    testo: '{{INTRO_LAVORI}}',
  },
  zone: {
    // Il titolo si legge dopo il nome della regione: "Emilia-Romagna, ...".
    titolo: '{{TITOLO_ZONE}}',
    // {comune} e {provincia} vengono sostituiti con i dati di azienda.ts.
    testo: '{{INTRO_ZONE}}',
    avviso: '{{AVVISO_COMUNI}}',
    coda: '{{CODA_ZONE}}',
  },
} as const;

/**
 * Blocchi che questo cliente non monta, qualunque livello scelga.
 *
 * Serve quando un blocco previsto dal livello non ha senso per il mestiere
 * del cliente. Il caso tipico e' 'calcolatore': le fasce di src/data/stime.ts
 * sono dell'edilizia residenziale e fuori da quella non dicono nulla.
 */
export const BLOCCHI_ESCLUSI: readonly string[] = [];
