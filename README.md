# tdgroup — bozze del nuovo sito

Fase 1: tre proposte da far vedere a TD Group. Contenuti e foto sono quelli
veri, presi dal sito attuale `tdgroupsrls.it` (vedi `../AUDIT.md`).

## Avvio

```bash
npm install
npm run dev
```

| Rotta | Cosa c'è |
|---|---|
| `/` | Hub con la tabella di confronto — la pagina che vende |
| `/demo/vetrina` | Livello 01 |
| `/demo/completo` | Livello 02, contiene tutta la Vetrina |
| `/demo/portale` | Livello 03, contiene tutto il Completo |
| `/demo/{completo,portale}/servizi/[slug]` | 9 pagine servizio per livello |
| `/demo/tutto` | Catalogo dei blocchi + extra fuori pacchetto |

## I livelli sono cumulativi

`src/data/livelli.ts` è l'unica fonte di verità: dice quali blocchi monta ogni
livello **e** cosa mostra la tabella di confronto sull'hub. Pagina e tabella non
possono divergere.

Le tre demo sono la stessa pagina (`src/app/demo/[livello]/page.tsx`) montata
con blocchi diversi, presi da `src/components/sezioni/`.

Per aggiungere un blocco: crea il componente in `sezioni/`, aggiungilo a
`ORDINE_BLOCCHI`, mettilo negli array dei livelli che lo includono, aggiungi la
riga in `CONFRONTO`. La demo e la tabella si aggiornano insieme.

## Rigenerare i dati

I file in `src/data/` sono **generati**, non si modificano a mano.

```bash
node scripts/prepare-images.mjs   # foto: rinomina, AVIF+WebP, src/data/foto.ts
node scripts/build-servizi.mjs    # testi: src/data/servizi.ts + redirects.json
```

Sorgente di entrambi: la cartella `../scraped/`, prodotta dallo scraping del
sito esistente. Senza quella cartella gli script non partono.

| File | Generato da | Contiene |
|---|---|---|
| `src/data/foto.ts` | `prepare-images.mjs` | 193 foto: slug, servizio, cantiere, alt, dimensioni |
| `src/data/servizi.ts` | `build-servizi.mjs` | 9 servizi con i testi originali di TD Group |
| `src/data/redirects.json` | `build-servizi.mjs` | 20 redirect permanenti dal vecchio WordPress |
| `src/data/azienda.ts` | **scritto a mano** | contatti e dati societari |
| `src/data/livelli.ts` | **scritto a mano** | i tre livelli, i blocchi, la tabella di confronto, gli extra |

`src/data/azienda.ts` è l'unico file da modificare quando arrivano i dati
mancanti (partita IVA, sede, REA, orari). Vedi `../RICHIESTA-DATI.md`.

## Foto

`public/foto/` contiene 193 foto in AVIF e WebP, tre larghezze (480/960/1600),
52 MB in tutto contro i 173 MB degli originali. Le altre ~390 restano in
`../scraped/media/` e servono per il portfolio della Fase 2.

Il componente `Foto` serve `<picture>` con AVIF e ripiego WebP. Non usa
`next/image`: le immagini sono già ottimizzate a build time.

Foto scelte a mano per gli hero e il bento: `foto('slug', 'servizio-di-ripiego')`.
Il ripiego evita che una rinomina rompa la pagina.

## Regole non negoziabili

- **Nessun dato inventato.** Partita IVA, REA, indirizzo e orari sono
  segnaposto `{{...}}` finché TD Group non li fornisce. Il footer mostra un
  avviso giallo finché restano.
- **Nessuna certificazione non confermata.** SOA, ISO 9001 e DURC non compaiono:
  il ticker della V1 scorre con i dati verificabili.
- **Nessun form.** Solo `tel:` e `wa.me`, con messaggio precompilato per pagina.
- **Nessuna foto stock.** Le 25 immagini del tema Astra sono escluse dalla
  pipeline, insieme ai logo `km-logo*` del designer fittizio del tema.

## Scelte tecniche

- **Il contenuto non dipende dalle animazioni.** `PageTransition` anima solo un
  velo, mai l'opacità della pagina; la barra del calcolatore usa CSS, non
  Framer. Un `<noscript>` riporta visibili le rivelazioni allo scroll.
- **Peso**: Vetrina 96 KB di HTML contro i 233 KB del sito attuale. Completo
  121 KB, Portale 135 KB: il Portale somma tutti i blocchi, è il prezzo della
  cumulatività. L'hub sta a 92 KB, sotto il budget di 100 KB.
- **Costo di esercizio zero**: nessun backend, nessuna API key, nessun servizio
  a pagamento.

## Stato

Fase 1 completa. Fase 2 (il sito vero che sostituisce `tdgroupsrls.it`) parte
dopo la scelta della bozza: struttura in `../SPEC.md` Sezione 4, priorità in
`../AUDIT.md` §10.
