/**
 * L'offerta economica: prezzi, tempi e passi successivi.
 *
 * Sta fuori da livelli.ts perché è roba diversa: lì c'è *cosa* contiene ogni
 * livello, qui *quanto costa* e *cosa succede dopo il sì*. I blocchi li decido
 * io, le cifre le decide chi vende.
 *
 * I valori fra doppie graffe seguono la regola di CLAUDE.md §7: mai un numero
 * plausibile ma inventato. Un prezzo sbagliato su una pagina che TD Group può
 * girare al commercialista è peggio di un buco giallo che si vede.
 */

/*
  Niente prezzi in pagina, per scelta: la cifra si fa a voce.

  Un numero scritto sull'hub si legge, si confronta con un preventivo trovato
  online e si scarta senza che nessuno chiami. Detto al telefono, invece, apre
  la conversazione — che è l'unica cosa che questa pagina deve ottenere.

  I tempi restano: quelli non sono una trattativa, sono un'informazione che
  serve a TD Group per decidere quando partire.
*/

/**
 * Tempi di consegna, in giorni di calendario e già larghi.
 *
 * Quattro ore al giorno, cinque giorni a settimana, partendo dalle bozze già
 * fatte — che è il punto: il grosso del lavoro visibile è finito.
 *
 * Vetrina: mancano schema LocalBusiness, sitemap, robots, le pagine privacy e
 * cookie, l'uscita dalla modalità bozza (oggi vive sotto /demo con l'header
 * delle bozze) e la messa online. Sei-otto mezze giornate. I redirect dai
 * vecchi slug sono già in next.config.mjs. Niente banner cookie: i font sono
 * self-hosted e non c'è nulla di terze parti — se arriva Analytics, torna.
 *
 * Completo: sopra alla Vetrina, l'admin vero — login, database, la scelta
 * delle foto che resta salvata, la rigenerazione della pagina. Le 193 foto
 * già preparate bastano: le altre 414 della libreria non servono a nessuno
 * dei due livelli.
 *
 * Portale: è un'applicazione, non un sito. Area cliente con accessi separati
 * per committente, documenti con i permessi giusti, caricamento con
 * conversione lato server. Qui il margine resta largo apposta: è la sola
 * parte del progetto dove un errore fa danno vero, e va fatta lenta.
 *
 * Comprendono i tempi morti che non dipendono da me: attesa dei dati di TD
 * Group, propagazione DNS, giri di revisione. La verifica della scheda Google
 * Business arriva per posta e può prendere settimane, ma non blocca il sito.
 */
export const TEMPI: Record<string, string> = {
  vetrina: '2 settimane',
  completo: '5 settimane',
  portale: '2-3 mesi',
};

export const mancante = (v: string) => v.includes('{{');

export const tempiIncompleti = Object.values(TEMPI).some(mancante);

/**
 * Cosa succede dopo il sì. Quattro passi, nessuno dei quali chiede a TD Group
 * di fare cose che non sa fare: scegliere, mandare dei dati, aspettare.
 */
export const PASSI = [
  {
    n: '01',
    titolo: 'Scegliete il livello',
    testo:
      'Aprite le tre bozze con calma, anche dal telefono, e ditemi dove volete fermarvi. Si può salire dopo: i livelli si sommano, non si rifà niente da capo.',
  },
  {
    n: '02',
    titolo: 'Mi mandate quello che manca',
    testo:
      'Partita IVA, numero REA, sede legale, orari di apertura e l’elenco dei comuni dove lavorate davvero: sono i segnaposto gialli in fondo alle bozze, e senza quelli il sito non può andare online, è la legge. Serve anche sapere da quando siete attivi: oggi il vostro sito dice “oltre vent’anni” in una pagina e “nasce nel 2016” in un’altra, e una delle due va corretta.',
  },
  {
    n: '03',
    titolo: 'Monto il sito vero',
    testo:
      'Stessi contenuti, foto definitive, i vostri dati al posto dei segnaposto. Le bozze restano online finché non le sostituisce il sito completo, così potete confrontare.',
  },
  {
    n: '04',
    titolo: 'Va online sul vostro dominio',
    testo:
      'Il sito nuovo prende il posto del vecchio senza che Google perda le pagine che ha già in elenco. Il sito di adesso resta acceso fino all’ultimo minuto: non c’è un solo giorno in cui non vi si trova.',
  },
];
