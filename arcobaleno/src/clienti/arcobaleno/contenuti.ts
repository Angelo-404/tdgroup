/**
 * Contenuti dei blocchi aggiunti alla Vetrina, per Arcobaleno S.r.l.
 *
 * Tutto quello che c'è qui dentro è **scritto da noi**, non fornito
 * dall'azienda: descrive come si lavora nel drenaggio agricolo, che è sapere
 * di mestiere, non un'affermazione su Arcobaleno. Ogni voce marcata
 * `daConfermare` compare in pagina con un segno visibile, così in riunione si
 * vede subito cosa devono confermare o correggere.
 *
 * Qui parte tutto da `true`: con loro non abbiamo ancora parlato, quindi non
 * c'è una sola riga che possiamo dare per verificata.
 */

export const COME_LAVORIAMO = [
  {
    n: '01',
    titolo: 'Sopralluogo e rilievo',
    testo:
      'Veniamo a vedere il campo e ne rileviamo le quote con strumentazione laser. Dal rilievo si legge dove l’acqua ristagna e dove può uscire: è il punto di partenza di qualsiasi intervento.',
  },
  {
    n: '02',
    titolo: 'Progetto e preventivo',
    testo:
      'Sui dati rilevati progettiamo pendenze, profondità e interassi, e mettiamo tutto per iscritto: metri di dreno, diametri, materiali. Nessun “a corpo” generico.',
  },
  {
    n: '03',
    titolo: 'Esecuzione con mezzi propri',
    testo:
      'Livellatrici e drenatrici a controllo laser sono nostre, e nostri sono gli operatori. Nessun subappalto significa tempi che dipendono da noi e da come sta il terreno, non da terzi.',
  },
  {
    n: '04',
    titolo: 'Verifica dello scarico',
    testo:
      'A fine lavori si controlla che l’impianto scarichi davvero, e si consegna la pianta di quello che è stato posato: fra dieci anni serve sapere dove passano i dreni.',
  },
] as const;

export type Faq = {
  domanda: string;
  risposta: string;
  /** true finché Arcobaleno non conferma o corregge la risposta. */
  daConfermare: boolean;
};

export const FAQ: Faq[] = [
  {
    domanda: 'In che periodo dell’anno si può intervenire?',
    risposta:
      'Quando il campo è libero e il terreno è asciutto abbastanza da reggere le macchine: di norma dopo la raccolta e prima delle piogge autunnali, oppure in estate. Su terreno bagnato non si posa un dreno diritto e si compatta il suolo.',
    daConfermare: true,
  },
  {
    domanda: 'Come capisco se mi serve il drenaggio o basta il livellamento?',
    risposta:
      'Dipende da dove sta l’acqua. Se ristagna in superficie nelle depressioni, spesso basta livellare. Se il terreno resta saturo in profondità anche dove è piano, il problema è sotto e si risolve con i dreni. Il rilievo altimetrico serve proprio a distinguere i due casi prima di spendere.',
    daConfermare: true,
  },
  {
    domanda: 'Quanto dura un impianto di drenaggio?',
    risposta:
      'Un impianto posato con la pendenza giusta e con il filtro adatto al terreno lavora per decenni. Quello che lo rovina non è il tempo ma l’intasamento delle fessure quando il filtro è sbagliato, e uno scarico che si ostruisce e non viene mantenuto.',
    daConfermare: true,
  },
  {
    domanda: 'Quanto tempo state in campo?',
    risposta:
      'Dipende dalla superficie e dai metri di dreno da posare. La drenatrice a controllo laser avanza in continuo, quindi il grosso del lavoro è rapido: le variabili vere sono lo stato del terreno e la sistemazione del collettore e dello scarico.',
    daConfermare: true,
  },
  {
    domanda: 'Servono autorizzazioni?',
    risposta:
      'Per lo scarico nella rete consortile sì, e va verificato prima di progettare: dove scarica l’impianto decide come si progetta l’impianto. Vi diciamo cosa serve e prepariamo i dati tecnici da allegare.',
    daConfermare: true,
  },
  {
    domanda: 'Si può fare su un terreno in affitto?',
    risposta:
      'Tecnicamente sì, ma è un investimento che resta al fondo e si ripaga in più annate: va concordato con la proprietà prima di partire. È una valutazione da fare insieme, non un dettaglio da sistemare dopo.',
    daConfermare: true,
  },
  {
    domanda: 'Il livellamento non mi porta via il terreno buono?',
    risposta:
      'Se si sposta troppo suolo in una volta sola, sì: nei punti di sterro si scopre lo strato inferiore, meno fertile. Per questo su terreni molto irregolari conviene lavorare per stralci in annate diverse, e per questo il rilievo si fa prima.',
    daConfermare: true,
  },
  {
    domanda: 'Vendete anche il solo materiale?',
    risposta:
      'Sì, tubo drenante, tubazioni per irrigazione ed edilizia e raccorderia si possono acquistare anche senza affidarci i lavori.',
    daConfermare: true,
  },
];

/**
 * Il paragrafo di apertura del blocco "Chi siamo".
 *
 * In pagina compare preceduto dalla ragione sociale, quindi comincia col
 * verbo. Non contiene numeri, anni né referenze: nessuno di quei dati ci è
 * stato dato da Arcobaleno, e inventarli è esattamente l'errore che il
 * progetto esiste per non ripetere (CLAUDE.md §7).
 */
export const CHI_SIAMO =
  'progetta e realizza impianti di drenaggio e irrigazione per l’agricoltura. ' +
  'Rilievo altimetrico dei terreni, elaborazione dei dati e progettazione, ' +
  'livellamento e posa dei dreni con macchine a controllo laser: dal primo ' +
  'sopralluogo alla verifica dello scarico, con mezzi e operatori propri.';


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
    /*
      Otto, non nove. E nessun numero di squadre: quante ne hanno non ce lo ha
      detto nessuno, e scriverlo sarebbe inventare.
    */
    testo:
      'Otto lavorazioni, dal rilievo delle quote alla posa dei dreni. Le macchine sono nostre e gli operatori anche: non passiamo il lavoro a terzi.',
  },
  comeLavoriamo: {
    titolo: 'Dal rilievo allo scarico.',
    testo:
      'Si parte sempre dalle quote del campo. Tutto il resto — quanto scavare, dove far correre i dreni — viene da lì.',
  },
  portfolio: {
    /*
      Non "foto nostre": in questa bozza le immagini sono generate, e dirlo
      qui evita che il blocco smentisca l'avviso in cima alla pagina. Il testo
      fa anche da promemoria per loro su quali foto servono davvero.
    */
    titolo: 'I lavori.',
    testo:
      'Qui vanno le fotografie dei vostri interventi: il rilievo in campo, la livellatrice al lavoro, la trincea con il dreno posato prima della richiusura. In questa bozza al loro posto ci sono immagini generate.',
  },
  zone: {
    /*
      Non "cantiere per cantiere" e non "immobile": qui si lavora su campi.
      E nessun numero di squadre, che non ci e' stato dato.
    */
    titolo: 'campo per campo.',
    testo:
      'La sede è a {comune} ({provincia}), e da lì raggiungiamo i terreni di tutta la regione. Se il vostro appezzamento è qui intorno, veniamo a vedere come scola.',
    avviso:
      'Qui va l’elenco delle zone dove lavorate davvero: è la parte che vi fa trovare da chi cerca “drenaggio terreni” più il nome del suo comune. Servono i vostri, non un elenco preso dalla cartina.',
    coda:
      'Non trovate la vostra zona? Chiamateci lo stesso: fuori area valutiamo caso per caso, in base al tipo di intervento.',
  },
} as const;

/**
 * Blocchi che questo cliente non monta, qualunque livello scelga.
 *
 * Il calcolatore esce. Le fasce di src/data/stime.ts sono medie di mercato
 * dell'edilizia residenziale — ristrutturazioni, bagni, cappotto — e su
 * un'impresa di drenaggio agricolo non vogliono dire niente: mostrerebbero a
 * un agricoltore il prezzo al metro quadro di un bagno.
 *
 * Non e' una mancanza da riempire prima della presentazione. Perche' il
 * blocco torni servono fasce vere per rilievo, livellamento e posa dei dreni,
 * e quelle le puo' dare solo Arcobaleno (INTAKE.md §5, voce "listino").
 */
export const BLOCCHI_ESCLUSI: readonly string[] = ['calcolatore'];


/**
 * L'immagine di apertura della homepage.
 *
 * Stava scritta dentro Hero.tsx, ed era lo slug di una foto di TD Group:
 * su un altro cliente non esiste, il ripiego di foto() prendeva la prima
 * immagine del manifest e l'apertura finiva decisa dall'ordine alfabetico
 * delle cartelle. Quale immagine apre il sito è una scelta, e le scelte di
 * un cliente stanno nella cartella di quel cliente.
 *
 * Qui è la copertina del livellamento: profilo del terreno e piano di
 * progetto, larga quanto lo schermo e quasi muta. Sotto ci va l'H1.
 */
export const FOTO_APERTURA = {
  slug: 'livellamento-laser-copertina',
  ripiego: 'livellamento-laser',
} as const;
