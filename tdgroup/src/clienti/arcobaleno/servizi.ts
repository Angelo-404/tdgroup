// Generato da scripts/intake-servizi.mjs — non modificare a mano.
// Cliente: arcobaleno. Sorgente: src/clienti/arcobaleno/intake/testi.json

export type Blocco = { tipo: 'h' | 'p'; testo: string };

export type Servizio = {
  slug: string;
  slugVecchio: string | null;
  nome: string;
  titolo: string;
  intro: string;
  corpo: Blocco[];
  cta: string;
  ctaWhatsapp: string;
  chiaveFoto: string;
};

export const SERVIZI: Servizio[] = [
 {
  "slug": "rilevazione-altimetrica",
  "slugVecchio": null,
  "nome": "Rilevazione altimetrica",
  "titolo": "Rilievo altimetrico dei terreni",
  "intro": "Prima di muovere un metro cubo di terra bisogna sapere dove va l'acqua. Rileviamo le quote del campo con strumentazione laser, elaboriamo i dati al computer e restituiamo la mappa reale delle pendenze: è da lì che si capisce dove ristagna e perché.",
  "corpo": [
   {
    "tipo": "p",
    "testo": "Il rilievo si esegue su tutta la superficie con una griglia di punti quotati, fitta abbastanza da leggere anche le depressioni che a occhio non si vedono. I dati vengono elaborati in ufficio e restituiti come piano quotato e carta delle pendenze, con l'indicazione dei punti di ristagno e delle linee di deflusso naturale."
   },
   {
    "tipo": "h",
    "testo": "Serve a decidere, non a fare bella figura"
   },
   {
    "tipo": "p",
    "testo": "Sullo stesso rilievo si progettano poi il livellamento e la rete di drenaggio: quanto scavare, dove far correre i dreni, a che distanza e con quale pendenza. Senza il rilievo si lavora a sentimento, e un dreno posato in contropendenza è un dreno buttato."
   },
   {
    "tipo": "p",
    "testo": "Il rilievo resta al proprietario e vale negli anni: se in futuro si aggiunge un lotto o si cambia ordinamento colturale, si riparte da quello invece di rifare tutto."
   }
  ],
  "cta": "Facciamo un sopralluogo e vediamo cosa dice il terreno.",
  "ctaWhatsapp": "Salve, vorrei far rilevare le quote di un terreno.",
  "chiaveFoto": "rilevazione-altimetrica"
 },
 {
  "slug": "livellamento-laser",
  "slugVecchio": null,
  "nome": "Livellamento laser",
  "titolo": "Livellamento del terreno con controllo laser",
  "intro": "Un campo che non ha una pendenza regolare trattiene l'acqua nelle depressioni e la perde nei punti alti. Il livellamento con controllo laser dà alla superficie una pendenza costante e voluta, decisa sul rilievo altimetrico.",
  "corpo": [
   {
    "tipo": "p",
    "testo": "La livellatrice lavora guidata da un piano laser: la lama si alza e si abbassa da sola per inseguire la quota di progetto, con una precisione che a occhio e stadia non si ottiene. Il risultato è una superficie che scola dove deve scolare, senza avvallamenti residui."
   },
   {
    "tipo": "h",
    "testo": "Cosa cambia dopo"
   },
   {
    "tipo": "p",
    "testo": "Sparisce il ristagno superficiale, e con lui la parte di campo che ogni anno si semina due volte o si perde. L'acqua di irrigazione si distribuisce in modo uniforme invece di raccogliersi in fondo, e si può entrare in campo prima dopo una pioggia."
   },
   {
    "tipo": "p",
    "testo": "Il livellamento si fa una volta e dura, a patto che le lavorazioni successive non lo disfino. Dove il terreno è molto irregolare conviene lavorare per stralci in annate diverse, per non spostare troppo suolo fertile in un colpo solo."
   }
  ],
  "cta": "Chiedici una valutazione sul vostro appezzamento.",
  "ctaWhatsapp": "Salve, vorrei informazioni sul livellamento laser di un terreno.",
  "chiaveFoto": "livellamento-laser"
 },
 {
  "slug": "drenaggio-tubolare",
  "slugVecchio": null,
  "nome": "Drenaggio tubolare",
  "titolo": "Impianti di drenaggio tubolare sotterraneo",
  "intro": "Il drenaggio tubolare toglie dal terreno l'acqua in eccesso che le scoline non riescono a portare via. Una rete di tubi drenanti interrati raccoglie l'acqua alla profondità delle radici e la scarica al collettore, senza togliere superficie coltivabile.",
  "corpo": [
   {
    "tipo": "p",
    "testo": "I dreni sono tubi corrugati microfessurati, posati a profondità e interasse decisi sul rilievo e sulla tessitura del terreno: più il suolo è argilloso, più i dreni vanno ravvicinati. La posa avviene con drenatrice a controllo laser, che mantiene la pendenza costante per tutta la lunghezza della linea."
   },
   {
    "tipo": "h",
    "testo": "Filtro, collettore, scarico"
   },
   {
    "tipo": "p",
    "testo": "Attorno al tubo va il filtro — ghiaietto o rivestimento sintetico, secondo il terreno — che impedisce alle particelle fini di intasare le fessure. Le linee confluiscono in un collettore e da lì allo scarico, che va sempre verificato: un impianto perfetto che scarica in un fosso più alto non funziona."
   },
   {
    "tipo": "h",
    "testo": "Cosa si guadagna"
   },
   {
    "tipo": "p",
    "testo": "Si entra in campo prima in primavera e dopo le piogge, le radici non vanno in asfissia, la struttura del terreno regge meglio il passaggio delle macchine. Su terreni pesanti è spesso l'intervento che decide se una coltura è possibile o no."
   }
  ],
  "cta": "Parliamo del vostro terreno e di come drena oggi.",
  "ctaWhatsapp": "Salve, vorrei un preventivo per un impianto di drenaggio.",
  "chiaveFoto": "drenaggio-tubolare"
 },
 {
  "slug": "subirrigazione",
  "slugVecchio": null,
  "nome": "Subirrigazione",
  "titolo": "Impianti di subirrigazione",
  "intro": "La subirrigazione porta l'acqua direttamente alla profondità delle radici, attraverso ali gocciolanti interrate. Niente acqua sulle foglie, niente evaporazione dalla superficie, niente bagnatura degli interfilari.",
  "corpo": [
   {
    "tipo": "p",
    "testo": "Le linee interrate distribuiscono l'acqua in modo uniforme lungo tutto il campo, con portate basse e continue. Rispetto all'irrigazione per aspersione si riduce il volume impiegato a parità di acqua utile per la pianta, perché non si perde per evaporazione e non si bagna dove non serve."
   },
   {
    "tipo": "h",
    "testo": "Dove ha più senso"
   },
   {
    "tipo": "p",
    "testo": "Su colture di pieno campo a ciclo lungo e su terreni dove l'aspersione crea crosta o dove il vento rende la distribuzione irregolare. Il fatto che l'impianto stia sotto vuol dire anche che non ostacola le lavorazioni e non va montato e smontato ogni stagione."
   },
   {
    "tipo": "p",
    "testo": "In alcune situazioni la stessa rete può lavorare nei due sensi — drenare quando c'è troppa acqua, irrigare quando ne manca. È una scelta che si fa in progetto, non dopo: cambia diametri, pendenze e posizione del collettore."
   }
  ],
  "cta": "Valutiamo insieme se è la soluzione giusta per la vostra coltura.",
  "ctaWhatsapp": "Salve, vorrei informazioni su un impianto di subirrigazione.",
  "chiaveFoto": "subirrigazione"
 },
 {
  "slug": "movimento-terra",
  "slugVecchio": null,
  "nome": "Movimento terra",
  "titolo": "Movimento terra e sistemazioni idraulico-agrarie",
  "intro": "Sbancamenti, riporti, formazione e ripristino di scoline e capezzagne, invasi per la raccolta dell'acqua irrigua. Il movimento terra è quasi sempre la conseguenza di un problema di acqua, e va progettato come tale.",
  "corpo": [
   {
    "tipo": "p",
    "testo": "Interveniamo con mezzi propri sulla sistemazione superficiale del terreno: rifacimento della baulatura, riprofilatura delle scoline, formazione di capezzagne transitabili, riporti dove il piano di campagna è troppo basso rispetto allo scarico."
   },
   {
    "tipo": "h",
    "testo": "Invasi e laghetti irrigui"
   },
   {
    "tipo": "p",
    "testo": "Scavo, sagomatura delle sponde e sistemazione degli argini per bacini di accumulo dell'acqua irrigua. Il dimensionamento si fa sul fabbisogno della coltura e sulla disponibilità di ricarica, non a occhio sullo spazio che avanza."
   },
   {
    "tipo": "p",
    "testo": "Ogni intervento va coordinato con la rete di scolo esistente e con quella consortile: uno scarico che non ha dove andare sposta il problema, non lo risolve."
   }
  ],
  "cta": "Raccontateci il problema, veniamo a vederlo.",
  "ctaWhatsapp": "Salve, avrei bisogno di un intervento di movimento terra.",
  "chiaveFoto": "movimento-terra"
 },
 {
  "slug": "bonifiche",
  "slugVecchio": null,
  "nome": "Bonifiche",
  "titolo": "Bonifica e recupero di terreni agricoli",
  "intro": "Recupero alla coltivazione di terreni che oggi non rendono: aree con ristagno cronico, appezzamenti abbandonati, superfici da riprofilare dopo anni di lavorazioni disordinate.",
  "corpo": [
   {
    "tipo": "p",
    "testo": "La bonifica di un terreno agricolo mette insieme più lavorazioni: rilievo delle quote, livellamento, rete di drenaggio, riordino delle scoline e degli accessi. Fatte separatamente costano di più e si ostacolano a vicenda; fatte come un unico intervento hanno un senso idraulico compiuto."
   },
   {
    "tipo": "h",
    "testo": "Si parte dall'acqua, sempre"
   },
   {
    "tipo": "p",
    "testo": "Prima di decidere qualsiasi cosa si guarda dove l'acqua arriva, dove ristagna e dove può uscire. È la sequenza che determina l'ordine dei lavori: livellare un campo che poi non ha scarico non serve a niente."
   },
   {
    "tipo": "p",
    "testo": "Il risultato è una superficie di nuovo lavorabile con regolarità, con tempi di ritorno in campo prevedibili e senza le zone che ogni anno si perdono."
   }
  ],
  "cta": "Veniamo a vedere il terreno e vi diciamo cosa si può recuperare.",
  "ctaWhatsapp": "Salve, avrei un terreno da bonificare e vorrei un parere.",
  "chiaveFoto": "bonifiche"
 },
 {
  "slug": "scavi-e-demolizioni",
  "slugVecchio": null,
  "nome": "Scavi e demolizioni",
  "titolo": "Scavi e demolizioni",
  "intro": "Scavi di sbancamento e a sezione obbligata, splateamenti, demolizione di manufatti e fabbricati rurali dismessi, con rimozione e smaltimento del materiale di risulta.",
  "corpo": [
   {
    "tipo": "p",
    "testo": "Eseguiamo scavi per fondazioni, sottoservizi e posa di condotte, oltre agli scavi legati alle sistemazioni idrauliche. Sui fabbricati rurali interveniamo con demolizioni selettive quando il materiale va separato e recuperato, integrali quando non c'è nulla da salvare."
   },
   {
    "tipo": "p",
    "testo": "Il materiale di risulta viene rimosso e conferito secondo normativa. Dove serve, il terreno viene riportato in quota e risistemato in modo che l'area torni utilizzabile subito."
   }
  ],
  "cta": "Chiamateci per un sopralluogo senza impegno.",
  "ctaWhatsapp": "Salve, vorrei un preventivo per uno scavo.",
  "chiaveFoto": "scavi-e-demolizioni"
 },
 {
  "slug": "tubi-irrigazione-edilizia",
  "slugVecchio": null,
  "nome": "Tubi e materiali",
  "titolo": "Tubi per irrigazione ed edilizia",
  "intro": "Vendita di tubazioni e raccorderia per irrigazione, drenaggio ed edilizia, anche a chi i lavori li fa in proprio.",
  "corpo": [
   {
    "tipo": "p",
    "testo": "Tubi drenanti corrugati microfessurati, tubazioni in polietilene e PVC per adduzione e scarico, raccorderia, pozzetti e materiale per la posa. Le stesse cose che usiamo nei nostri cantieri."
   },
   {
    "tipo": "p",
    "testo": "Chi porta il progetto o le misure trova qui anche l'indicazione su diametri e classi di pressione: sbagliare un diametro in adduzione si paga per tutta la vita dell'impianto."
   }
  ],
  "cta": "Passate in sede o chiamateci per una disponibilità.",
  "ctaWhatsapp": "Salve, vorrei sapere se avete disponibile del tubo drenante.",
  "chiaveFoto": "tubi-irrigazione-edilizia"
 }
];

export const servizioBySlug = (slug: string): Servizio | undefined =>
  SERVIZI.find((s) => s.slug === slug);
