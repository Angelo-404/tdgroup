/**
 * Disegni tecnici quotati, uno per lavorazione.
 *
 * Sostituisce segnaposto-visivi.mjs per i clienti di cui non abbiamo — e non
 * avremo — le fotografie. Quello script disegnava curve di livello astratte,
 * uguali per tutti i servizi: onesto (non fingeva una fotografia) ma muto.
 * In galleria erano quarantotto riquadri che non dicevano niente, cioè
 * esattamente il "sito di riempimenti astratti" che INTAKE.md §3 indica come
 * il modo di produrre il template che l'offerta promette di non essere.
 *
 * Qui il disegno dice il mestiere. Una sezione di trincea con la profondità,
 * il diametro del dreno e la pendenza scritte sopra è informazione vera: chi
 * la legge capisce che chi ha fatto il sito sa di cosa parla. E non finge di
 * essere una fotografia nemmeno per un istante, quindi non ha il problema
 * delle 25 foto stock del tema Astra né quello di un rendering fotorealistico
 * spacciato per cantiere.
 *
 *   CLIENTE=arcobaleno node scripts/disegni-tecnici.mjs
 *
 * Produce, per ogni lavorazione:
 *   00-copertina.jpg     versione muta del primo disegno, per il fondo a
 *                        tutto schermo della pagina servizio (l'H1 ci va
 *                        sopra: niente quote, niente cartiglio, tratto basso)
 *   01..03-<nome>.jpg    i tre disegni quotati
 *   04..06-dettaglio.jpg tre ritagli degli stessi, che in griglia leggono
 *                        come immagini diverse
 *   GENERATE             marca la cartella come non fotografica
 *   alt.json             descrizioni alternative scritte, non di ripiego
 *
 * L'ordine dei file conta: intake-foto.mjs legge la cartella in ordine
 * alfabetico e la pagina servizio usa foto[0] come copertina.
 *
 * Poi: CLIENTE=arcobaleno npm run intake:foto
 */

import { writeFile, readdir, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const CLIENTE = process.env.CLIENTE || 'arcobaleno';
const CARTELLA = path.join(ROOT, 'src', 'clienti', CLIENTE);
const INTAKE = path.join(CARTELLA, 'intake', 'foto');

/* ------------------------------------------------------------------ resa */

const L = 1800;
const A = 1200;

const BONE = '#f8f9fa';
const CANTIERE = '#E6B91E';

/*
  Le misure del testo sono grandi perché il disegno si guarda in griglia:
  una card del portfolio sta sui 600 px, cioè un terzo della larghezza del
  file. Una scritta da 22 px lì diventa 7 px e non si legge. Da 34 px ne
  restano 11: piccola ma leggibile, ed è il motivo per cui ogni disegno ha
  cinque o sei annotazioni e non venti.
*/
const ETICHETTA = 34;
const QUOTA = 30;
const TITOLO = 32;
const SOTTOTITOLO = 23;

const SANS = 'Helvetica, Arial, sans-serif';
const MONO = 'monospace';

const n = (v) => Number(v).toFixed(1);

/* ------------------------------------------------------------ primitive */

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function testo(x, y, s, o = {}) {
  const {
    size = ETICHETTA,
    col = BONE,
    op = 0.82,
    ancora = 'start',
    mono = false,
    ls = 0,
    peso = 400,
  } = o;
  return (
    `<text x="${n(x)}" y="${n(y)}" fill="${col}" fill-opacity="${op}" ` +
    `font-family="${mono ? MONO : SANS}" font-size="${size}" font-weight="${peso}" ` +
    `letter-spacing="${ls}" text-anchor="${ancora}">${esc(s)}</text>`
  );
}

const linea = (x1, y1, x2, y2, o = {}) => {
  const { col = BONE, op = 0.5, w = 2, dash = null } = o;
  return (
    `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" ` +
    `stroke="${col}" stroke-opacity="${op}" stroke-width="${w}"` +
    `${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
  );
};

const percorso = (d, o = {}) => {
  const { col = BONE, op = 0.5, w = 2, dash = null, riempi = 'none', opRiempi = 1 } = o;
  return (
    `<path d="${d}" fill="${riempi}" fill-opacity="${opRiempi}" stroke="${col}" ` +
    `stroke-opacity="${op}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
  );
};

const rett = (x, y, w, h, o = {}) => {
  const { riempi = 'none', col = BONE, op = 0.5, sw = 2, r = 0, opRiempi = 1 } = o;
  return (
    `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}" ` +
    `fill="${riempi}" fill-opacity="${opRiempi}" stroke="${col}" ` +
    `stroke-opacity="${op}" stroke-width="${sw}"/>`
  );
};

const cerchio = (cx, cy, r, o = {}) => {
  const { riempi = 'none', col = BONE, op = 0.5, sw = 2, opRiempi = 1 } = o;
  return (
    `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${riempi}" ` +
    `fill-opacity="${opRiempi}" stroke="${col}" stroke-opacity="${op}" stroke-width="${sw}"/>`
  );
};

/** Linea di richiamo: dall'etichetta al punto che descrive. */
function richiamo(xTesto, yTesto, xPunto, yPunto, s, o = {}) {
  const { ancora = 'start', col = BONE, op = 0.82 } = o;
  const xGomito = ancora === 'end' ? xTesto + 14 : xTesto - 14;
  return (
    linea(xGomito, yTesto - 10, xPunto, yPunto, { col, op: 0.3, w: 1.5 }) +
    cerchio(xPunto, yPunto, 4, { riempi: col, op: 0, opRiempi: 0.55 }) +
    testo(xTesto, yTesto, s, { ancora, col, op })
  );
}

/**
 * Quota verticale con le due battute. Il testo sta a fianco e orizzontale:
 * ruotarlo è la convenzione del disegno tecnico ma qui si legge in griglia,
 * e una scritta ruotata a 11 px non la legge nessuno.
 */
function quotaV(x, y1, y2, s, o = {}) {
  const { col = CANTIERE, op = 0.85, lato = 'destra', battuta = 22 } = o;
  const dx = lato === 'destra' ? 16 : -16;
  return (
    linea(x, y1, x, y2, { col, op, w: 2 }) +
    linea(x - battuta, y1, x + battuta, y1, { col, op, w: 2 }) +
    linea(x - battuta, y2, x + battuta, y2, { col, op, w: 2 }) +
    testo(x + dx, (y1 + y2) / 2 + 10, s, {
      size: QUOTA,
      col,
      op: 0.95,
      ancora: lato === 'destra' ? 'start' : 'end',
      mono: true,
    })
  );
}

function quotaH(y, x1, x2, s, o = {}) {
  const { col = CANTIERE, op = 0.85, sopra = true, battuta = 22 } = o;
  return (
    linea(x1, y, x2, y, { col, op, w: 2 }) +
    linea(x1, y - battuta, x1, y + battuta, { col, op, w: 2 }) +
    linea(x2, y - battuta, x2, y + battuta, { col, op, w: 2 }) +
    testo((x1 + x2) / 2, sopra ? y - 18 : y + 40, s, {
      size: QUOTA,
      col,
      op: 0.95,
      ancora: 'middle',
      mono: true,
    })
  );
}

/** Freccia di verso: pendenza, deflusso, senso di lavorazione. */
function freccia(x1, y1, x2, y2, o = {}) {
  const { col = BONE, op = 0.55, w = 2, punta = 16 } = o;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const a = ang + Math.PI - 0.42;
  const b = ang + Math.PI + 0.42;
  return (
    linea(x1, y1, x2, y2, { col, op, w }) +
    percorso(
      `M ${n(x2)} ${n(y2)} L ${n(x2 + Math.cos(a) * punta)} ${n(y2 + Math.sin(a) * punta)} ` +
        `M ${n(x2)} ${n(y2)} L ${n(x2 + Math.cos(b) * punta)} ${n(y2 + Math.sin(b) * punta)}`,
      { col, op, w },
    )
  );
}

/**
 * Cartiglio in basso a sinistra: che lavorazione è e che vista è.
 * Sostituisce il titolo in mezzo al disegno, che ruberebbe spazio al disegno.
 */
function cartiglio(titolo, vista) {
  const y = A - 78;
  return (
    linea(96, y - 46, 96, y + 26, { col: CANTIERE, op: 0.9, w: 4 }) +
    testo(126, y - 8, titolo.toUpperCase(), {
      size: TITOLO,
      col: BONE,
      op: 0.9,
      ls: 3.5,
      peso: 500,
    }) +
    testo(126, y + 30, vista, { size: SOTTOTITOLO, col: BONE, op: 0.45, mono: true })
  );
}

/* ------------------------------------------------------------ campiture */

/*
  Le campiture sono quelle del disegno geotecnico, semplificate: il terreno
  in posto a trattini sparsi, il materiale drenante a cerchietti, l'argilla a
  righe inclinate fitte, il calcestruzzo a punti. Non sono decorazione: sono
  il modo in cui una sezione dice di che cosa è fatta senza scriverlo.
*/
const CAMPITURE = `
<pattern id="terreno" width="46" height="46" patternUnits="userSpaceOnUse">
  <path d="M 6 12 h 14 M 26 30 h 12 M 12 38 h 9 M 32 8 h 8" stroke="${BONE}"
        stroke-opacity="0.16" stroke-width="1.6"/>
</pattern>
<pattern id="ghiaietto" width="34" height="34" patternUnits="userSpaceOnUse">
  <circle cx="9" cy="10" r="3.4" fill="${BONE}" fill-opacity="0.2"/>
  <circle cx="25" cy="21" r="2.6" fill="${BONE}" fill-opacity="0.17"/>
  <circle cx="15" cy="28" r="2.1" fill="${BONE}" fill-opacity="0.14"/>
  <circle cx="30" cy="6" r="2.3" fill="${BONE}" fill-opacity="0.15"/>
</pattern>
<pattern id="argilla" width="22" height="22" patternUnits="userSpaceOnUse"
         patternTransform="rotate(38)">
  <line x1="0" y1="0" x2="0" y2="22" stroke="${BONE}" stroke-opacity="0.14" stroke-width="1.4"/>
</pattern>
<pattern id="acqua" width="40" height="26" patternUnits="userSpaceOnUse">
  <path d="M 0 13 q 10 -7 20 0 t 20 0" fill="none" stroke="${BONE}"
        stroke-opacity="0.22" stroke-width="1.6"/>
</pattern>
<pattern id="risulta" width="28" height="28" patternUnits="userSpaceOnUse">
  <path d="M 4 4 l 8 8 M 12 4 l -8 8 M 18 16 l 7 7 M 25 16 l -7 7"
        stroke="${BONE}" stroke-opacity="0.15" stroke-width="1.4"/>
</pattern>
<linearGradient id="fondo" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stop-color="#171b22"/>
  <stop offset="100%" stop-color="#0d1015"/>
</linearGradient>
<linearGradient id="velo" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stop-color="#0d1015" stop-opacity="0.55"/>
  <stop offset="55%" stop-color="#0d1015" stop-opacity="0"/>
  <stop offset="100%" stop-color="#0d1015" stop-opacity="0.7"/>
</linearGradient>
`;

/** Reticolo di fondo, rado: dà la scala senza farsi notare. */
function reticolo(passo = 120) {
  const out = [];
  for (let x = passo; x < L; x += passo) {
    out.push(linea(x, 0, x, A, { op: 0.045, w: 1 }));
  }
  for (let y = passo; y < A; y += passo) {
    out.push(linea(0, y, L, y, { op: 0.045, w: 1 }));
  }
  return out.join('');
}

/** Terreno in posto sotto la quota indicata, con la linea di piano campagna. */
function suolo(y, o = {}) {
  const { campitura = 'terreno', fino = A } = o;
  return (
    rett(-10, y, L + 20, fino - y, { riempi: `url(#${campitura})`, op: 0, sw: 0 }) +
    linea(-10, y, L + 10, y, { op: 0.5, w: 2.5 })
  );
}

/* ------------------------------------------------------------- disegni */

/*
  Ogni funzione restituisce { base, note }.

  base  la geometria: terreno, manufatti, tubi, macchine. È quello che si
        vede nella copertina, sfumato e senza scritte.
  note  quote, etichette, cartiglio. È quello che rende il disegno un
        disegno tecnico invece di un'illustrazione.

  I ritagli di dettaglio sono riquadri in coordinate di questo spazio, in
  proporzione 3:2: rendendo lo stesso disegno con un viewBox più piccolo si
  ottiene uno zoom vero, con il tratto e le scritte che crescono insieme.
*/

/* --- rilevazione altimetrica ------------------------------------------ */

function rilievoPianta() {
  const x0 = 210;
  const y0 = 190;
  const w = 1180;
  const h = 800;
  const base = [];
  const note = [];

  base.push(rett(x0, y0, w, h, { op: 0.4, w: 2.5 }));

  /*
    Griglia dei punti quotati. Le quote sono relative e variano di pochi
    centimetri, come in pianura, e scendono avvicinandosi alla depressione:
    il punto più basso del campo deve essere quello dove l'acqua ristagna,
    altrimenti il disegno dice una cosa e la macchia gialla ne dice un'altra.
    È il genere di incoerenza che un agricoltore vede prima di leggere.
  */
  const cxRistagno = 850;
  const cyRistagno = 730;
  const quote = [];
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 7; c += 1) {
      const px = x0 + 90 + (c * (w - 180)) / 6;
      const py = y0 + 90 + (r * (h - 180)) / 4;
      const d = Math.hypot(px - cxRistagno, py - cyRistagno);
      const q = 42 + d * 0.072 + Math.sin(c * 1.7 + r * 0.9) * 4;
      quote.push({ px, py, q });
      base.push(percorso(`M ${n(px - 9)} ${n(py)} h 18 M ${n(px)} ${n(py - 9)} v 18`, {
        op: 0.35,
        w: 1.6,
      }));
    }
  }

  // Curve di livello: passano fra i punti, non sui punti.
  for (let i = 0; i < 4; i += 1) {
    const y = y0 + 210 + i * 170;
    base.push(
      percorso(
        `M ${x0} ${n(y)} C ${x0 + 300} ${n(y - 70)}, ${x0 + 720} ${n(y + 80)}, ${x0 + w} ${n(y - 30)}`,
        { op: 0.3, w: 2 },
      ),
    );
  }

  // La depressione dove ristagna: è il punto del rilievo.
  base.push(
    percorso(
      `M 690 700 C 760 640, 950 640, 1010 706 C 1060 762, 950 828, 850 820 C 762 812, 640 762, 690 700 Z`,
      { col: CANTIERE, op: 0.85, w: 3, riempi: CANTIERE, opRiempi: 0.09 },
    ),
  );

  note.push(
    ...quote
      .filter((_, i) => i % 5 === 2)
      .map((p) =>
        testo(p.px + 14, p.py - 12, `${(p.q / 100).toFixed(2)}`, {
          size: 24,
          op: 0.5,
          mono: true,
        }),
      ),
  );

  note.push(
    richiamo(1120, 690, 1010, 720, 'ristagno rilevato', { col: CANTIERE, op: 0.95 }),
    richiamo(300, 252, 420, 348, 'punto quotato, maglia 20 m', { op: 0.7 }),
    richiamo(1200, 980, 1120, 930, 'curva di livello', { op: 0.7 }),
    quotaH(y0 - 46, x0, x0 + w, 'fronte rilevato'),
    cartiglio('Rilevazione altimetrica', 'piano quotato e curve di livello'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [
      { x: 620, y: 560, w: 620, s: 'la depressione dove ristagna l’acqua' },
    ],
  };
}

function rilievoProfilo() {
  const y = 640;
  const base = [];
  const note = [];

  base.push(suolo(y + 120));

  // Profilo reale del terreno: irregolare, con due avvallamenti.
  const reale =
    `M 120 ${y + 40} C 300 ${y - 30}, 420 ${y + 130}, 560 ${y + 96} ` +
    `C 700 ${y + 62}, 780 ${y - 60}, 940 ${y - 26} ` +
    `C 1100 ${y + 8}, 1180 ${y + 150}, 1340 ${y + 104} ` +
    `C 1460 ${y + 68}, 1560 ${y + 20}, 1690 ${y + 44}`;
  base.push(percorso(reale, { op: 0.75, w: 3.5 }));

  // Retta di progetto: una pendenza sola, decisa sul rilievo.
  base.push(linea(120, y - 40, 1690, y + 120, { col: CANTIERE, op: 0.8, w: 3, dash: '16 12' }));

  note.push(
    richiamo(300, y - 130, 470, y + 60, 'profilo reale del terreno', { op: 0.8 }),
    richiamo(1180, y - 150, 1320, y + 86, 'piano di progetto', {
      col: CANTIERE,
      op: 0.95,
    }),
    quotaV(700, y - 8, y + 118, '0,14 m', { lato: 'destra' }),
    testo(120, 250, 'la differenza fra le due linee', { size: ETICHETTA, op: 0.75 }),
    testo(120, 296, 'è quanta terra si muove', { size: ETICHETTA, op: 0.5 }),
    cartiglio('Rilevazione altimetrica', 'profilo del terreno, scala verticale esagerata'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 520, y: 440, w: 620, s: 'lo scarto fra terreno e progetto' }],
  };
}

function rilievoStrumento() {
  const base = [];
  const note = [];
  const suoloY = 900;

  base.push(suolo(suoloY));

  // Treppiede con emettitore.
  const tx = 460;
  const ty = 470;
  base.push(
    percorso(
      `M ${tx} ${ty + 60} L ${tx - 110} ${suoloY} M ${tx} ${ty + 60} L ${tx + 110} ${suoloY} ` +
        `M ${tx} ${ty + 60} L ${tx + 26} ${suoloY}`,
      { op: 0.55, w: 3 },
    ),
    rett(tx - 54, ty, 108, 62, { op: 0.7, w: 3, r: 6 }),
    cerchio(tx, ty + 31, 13, { op: 0.6, w: 2.5 }),
  );

  // Piano laser: orizzontale, è il riferimento di quota.
  base.push(linea(150, ty + 31, 1680, ty + 31, { col: CANTIERE, op: 0.7, w: 2, dash: '10 14' }));

  // Asta con ricevitore, in due posizioni: due quote diverse sullo stesso piano.
  const asta = (x, hSuolo) => {
    const yBase = suoloY + hSuolo;
    return (
      linea(x, yBase, x, ty + 10, { op: 0.6, w: 3 }) +
      rett(x - 22, ty + 8, 44, 46, { op: 0.75, w: 3, r: 4, riempi: CANTIERE, opRiempi: 0.16 })
    );
  };
  base.push(asta(1080, 0), asta(1420, 48));

  // Il terreno scende leggermente a destra: si vede dalle due aste.
  base.push(
    percorso(`M 900 ${suoloY} C 1100 ${suoloY + 12}, 1250 ${suoloY + 36}, 1520 ${suoloY + 48}`, {
      op: 0.4,
      w: 2.5,
      dash: '8 10',
    }),
  );

  note.push(
    richiamo(300, 400, 448, 490, 'emettitore su treppiede', { op: 0.8 }),
    richiamo(1000, 380, 1080, ty + 34, 'ricevitore sull’asta', { ancora: 'end', op: 0.8 }),
    testo(150, ty - 22, 'piano laser di riferimento', {
      size: QUOTA,
      col: CANTIERE,
      op: 0.85,
      mono: true,
    }),
    quotaV(1620, ty + 31, suoloY + 48, '1,86 m'),
    cartiglio('Rilevazione altimetrica', 'catena di misura in campo'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 960, y: 400, w: 640, s: 'il ricevitore che legge la quota' }],
  };
}

/* --- livellamento laser ------------------------------------------------ */

function livellamentoSezione() {
  const y = 620;
  const base = [];
  const note = [];

  base.push(suolo(y + 150));

  const reale =
    `M 110 ${y + 30} C 280 ${y - 40}, 400 ${y + 120}, 560 ${y + 86} ` +
    `C 720 ${y + 52}, 800 ${y - 70}, 960 ${y - 36} ` +
    `C 1120 ${y - 2}, 1200 ${y + 140}, 1360 ${y + 96} ` +
    `C 1480 ${y + 62}, 1580 ${y + 30}, 1700 ${y + 54}`;

  const progetto = `M 110 ${y - 10} L 1700 ${y + 96}`;

  // Scavo e riporto: le due aree fra le curve, campite in modo diverso.
  base.push(
    percorso(`${reale} L 1700 ${y + 96} L 110 ${y - 10} Z`, {
      riempi: 'url(#argilla)',
      op: 0,
      opRiempi: 1,
    }),
    percorso(reale, { op: 0.7, w: 3, dash: '14 10' }),
    percorso(progetto, { col: CANTIERE, op: 0.9, w: 3.5 }),
  );

  note.push(
    richiamo(300, y - 160, 520, y + 100, 'profilo prima', { op: 0.72 }),
    richiamo(1180, y + 260, 1300, y + 132, 'piano livellato', {
      col: CANTIERE,
      op: 0.95,
    }),
    testo(700, y - 130, 'scavo', { size: QUOTA, op: 0.6, mono: true, ancora: 'middle' }),
    testo(1180, y + 20, 'riporto', { size: QUOTA, op: 0.6, mono: true, ancora: 'middle' }),
    freccia(1450, y + 190, 1660, y + 204, { col: CANTIERE, op: 0.8 }),
    testo(1450, y + 250, 'pendenza 0,2%', { size: QUOTA, col: CANTIERE, op: 0.9, mono: true }),
    cartiglio('Livellamento laser', 'sezione: prima e dopo, scala verticale esagerata'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 480, y: 420, w: 640, s: 'la zona di scavo fra profilo e progetto' }],
  };
}

function livellamentoControllo() {
  const suoloY = 820;
  const piano = 380;
  const base = [];
  const note = [];

  base.push(suolo(suoloY));

  // Emettitore su treppiede: la testa sta sul piano laser, non sotto.
  const tx = 280;
  base.push(
    percorso(
      `M ${tx} ${piano + 26} L ${tx - 82} ${suoloY} M ${tx} ${piano + 26} L ${tx + 82} ${suoloY} ` +
        `M ${tx} ${piano + 26} L ${tx + 18} ${suoloY}`,
      { op: 0.5, w: 3 },
    ),
    rett(tx - 52, piano - 26, 104, 52, { op: 0.72, w: 3, r: 6 }),
    linea(150, piano, 1720, piano, { col: CANTIERE, op: 0.7, w: 2, dash: '10 14' }),
  );

  /*
    Trattore e livellatrice: sagome, non un'illustrazione. Le ruote toccano
    terra e la cabina sta sopra il corpo — sembrano dettagli, ma una sagoma
    che non appoggia sul piano campagna fa sembrare sbagliato tutto il resto
    del disegno.
  */
  const bx = 540;
  base.push(
    rett(bx, suoloY - 200, 320, 120, { op: 0.6, w: 3, r: 10 }),
    rett(bx + 40, suoloY - 300, 160, 100, { op: 0.45, w: 2.5, r: 8 }),
    cerchio(bx + 70, suoloY - 70, 70, { op: 0.55, w: 3 }),
    cerchio(bx + 70, suoloY - 70, 26, { op: 0.3, w: 2 }),
    cerchio(bx + 268, suoloY - 48, 48, { op: 0.55, w: 3 }),
    cerchio(bx + 268, suoloY - 48, 18, { op: 0.3, w: 2 }),
  );

  // Timone, lama e asta del ricevitore.
  const lx = 1090;
  base.push(
    linea(bx + 320, suoloY - 130, lx, suoloY - 130, { op: 0.5, w: 3 }),
    percorso(`M ${lx} ${suoloY - 170} L ${lx} ${suoloY} L ${lx + 70} ${suoloY}`, {
      op: 0.8,
      w: 6,
    }),
    linea(lx, suoloY - 170, lx, piano + 22, { op: 0.55, w: 3 }),
    rett(lx - 24, piano - 24, 48, 48, { op: 0.85, w: 3, r: 4, riempi: CANTIERE, opRiempi: 0.2 }),
    // la lama insegue la quota: si alza e si abbassa
    freccia(lx - 42, suoloY - 120, lx - 42, suoloY - 176, { op: 0.45, w: 2.5, punta: 12 }),
    freccia(lx - 42, suoloY - 60, lx - 42, suoloY - 8, { op: 0.45, w: 2.5, punta: 12 }),
  );

  // Terra mossa davanti alla lama.
  base.push(
    percorso(
      `M ${lx + 70} ${suoloY} C ${lx + 150} ${suoloY - 54}, ${lx + 260} ${suoloY - 44}, ${lx + 360} ${suoloY}`,
      { op: 0.4, w: 2.5 },
    ),
  );

  note.push(
    testo(150, piano - 52, 'piano laser di riferimento', {
      size: QUOTA,
      col: CANTIERE,
      op: 0.85,
      mono: true,
    }),
    // L'etichetta sta sopra il piano laser: scritta e linea tratteggiata
    // alla stessa quota si leggono come una parola cancellata.
    richiamo(1220, piano - 90, lx + 26, piano - 12, 'il ricevitore legge lo scarto', {
      col: CANTIERE,
      op: 0.92,
    }),
    richiamo(1260, suoloY - 190, lx + 10, suoloY - 90, 'la lama si corregge da sola', {
      op: 0.8,
    }),
    cartiglio('Livellamento laser', 'catena di controllo della lama'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 940, y: 290, w: 620, s: 'il ricevitore sul piano laser' }],
  };
}

function livellamentoPassate() {
  const x0 = 230;
  const y0 = 200;
  const w = 1160;
  const h = 800;
  const base = [];
  const note = [];

  base.push(rett(x0, y0, w, h, { op: 0.4, w: 2.5 }));

  for (let i = 0; i < 11; i += 1) {
    const y = y0 + 50 + (i * (h - 100)) / 10;
    const senso = i % 2 === 0;
    base.push(
      freccia(senso ? x0 + 40 : x0 + w - 40, y, senso ? x0 + w - 40 : x0 + 40, y, {
        op: 0.28,
        w: 2,
        punta: 13,
      }),
    );
  }

  // Verso di scolo, in giallo, perpendicolare alle passate.
  base.push(freccia(x0 + w + 70, y0 + 90, x0 + w + 70, y0 + h - 60, { col: CANTIERE, op: 0.85, w: 3 }));

  note.push(
    testo(x0 + w + 96, y0 + h / 2, 'verso di scolo', {
      size: QUOTA,
      col: CANTIERE,
      op: 0.9,
      mono: true,
    }),
    richiamo(x0 + 40, y0 - 46, x0 + 300, y0 + 50, 'passate della livellatrice', { op: 0.78 }),
    quotaV(x0 - 60, y0, y0 + h, '480 m', { lato: 'sinistra' }),
    cartiglio('Livellamento laser', 'pianta: passate e verso di scolo'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 1080, y: 300, w: 600, s: 'il verso in cui il campo scola' }],
  };
}

/* --- drenaggio tubolare ------------------------------------------------ */

function drenaggioTrincea() {
  const pc = 250;
  const base = [];
  const note = [];

  base.push(suolo(pc));

  // Trincea: pareti verticali, riempimento drenante.
  const tx = 700;
  const tw = 420;
  const fondo = 1030;
  const asse = tx + tw / 2;
  const yTubo = fondo - 96;
  base.push(
    rett(tx, pc, tw, fondo - pc, { riempi: 'url(#ghiaietto)', op: 0.35, sw: 2 }),
    // tessuto non tessuto attorno al riempimento
    percorso(
      `M ${tx - 10} ${pc + 50} L ${tx - 10} ${fondo + 10} L ${tx + tw + 10} ${fondo + 10} L ${tx + tw + 10} ${pc + 50}`,
      { op: 0.55, w: 2.5, dash: '12 8' },
    ),
    // dreno corrugato
    cerchio(asse, yTubo, 86, { op: 0.85, w: 4 }),
    cerchio(asse, yTubo, 68, { op: 0.4, w: 2 }),
  );

  // Fessure del tubo: la parte che fa il lavoro.
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    const cx = asse + Math.cos(a) * 77;
    const cy = yTubo + Math.sin(a) * 77;
    base.push(
      linea(cx - Math.sin(a) * 11, cy + Math.cos(a) * 11, cx + Math.sin(a) * 11, cy - Math.cos(a) * 11, {
        col: CANTIERE,
        op: 0.8,
        w: 3.5,
      }),
    );
  }

  // Filetti d'acqua che entrano dal terreno.
  for (const [x, y] of [
    [520, 430],
    [1300, 470],
    [470, 660],
    [1350, 700],
  ]) {
    const verso = x < tx ? 1 : -1;
    base.push(
      percorso(
        `M ${x} ${y} C ${x + verso * 80} ${y + 50}, ${x + verso * 110} ${y + 110}, ${x + verso * 170} ${y + 180}`,
        { col: BONE, op: 0.28, w: 2, dash: '6 9' },
      ),
    );
  }

  note.push(
    testo(120, pc - 26, 'piano campagna', { size: QUOTA, op: 0.6, mono: true }),
    // Linee di riferimento della quota: la portano fuori dal disegno senza
    // farla sembrare sospesa nel vuoto.
    linea(tx + tw, pc, 1250, pc, { col: CANTIERE, op: 0.3, w: 1.5 }),
    linea(tx + tw, yTubo, 1250, yTubo, { col: CANTIERE, op: 0.3, w: 1.5 }),
    quotaV(1250, pc, yTubo, '1,10 m'),
    richiamo(650, 470, 790, 540, 'ghiaietto di filtro', { ancora: 'end', op: 0.8 }),
    richiamo(650, 900, 692, 940, 'tessuto non tessuto', { ancora: 'end', op: 0.78 }),
    richiamo(1180, 1120, 1000, yTubo + 60, 'dreno microfessurato ⌀ 80', {
      col: CANTIERE,
      op: 0.92,
    }),
    cartiglio('Drenaggio tubolare', 'sezione della trincea, scala 1:20'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 660, y: 740, w: 560, s: 'il dreno fessurato dentro il filtro' }],
  };
}

function drenaggioPianta() {
  const x0 = 200;
  const y0 = 180;
  const w = 1240;
  const h = 830;
  const base = [];
  const note = [];

  base.push(rett(x0, y0, w, h, { op: 0.38, w: 2.5 }));

  // Collettore: dalla testa del campo allo scarico, in basso a destra.
  const cy = y0 + h - 70;
  base.push(linea(x0 + 40, cy, x0 + w - 30, cy, { col: CANTIERE, op: 0.85, w: 6 }));

  // Dreni: obliqui, a spina di pesce, interasse costante. Restano dentro il
  // perimetro del campo: una linea che esce dal riquadro fa sembrare il
  // disegno sbagliato prima ancora che lo si legga.
  for (let i = 0; i < 11; i += 1) {
    const x = x0 + 90 + i * 100;
    base.push(linea(x, y0 + 60, x + 86, cy, { op: 0.45, w: 2.5 }));
  }

  // Pozzetto di raccolta e scarico nel fosso, fuori dal campo.
  base.push(
    rett(x0 + w - 104, cy - 34, 68, 68, { op: 0.8, w: 3, r: 4 }),
    freccia(x0 + w - 30, cy, x0 + w + 120, cy, { col: CANTIERE, op: 0.85, w: 3 }),
  );

  note.push(
    quotaH(y0 + 40, x0 + 300, x0 + 400, '12 m'),
    richiamo(x0 + 80, y0 - 40, x0 + 340, y0 + 200, 'dreni, interasse sulla tessitura', {
      op: 0.78,
    }),
    richiamo(400, cy + 120, 700, cy, 'collettore', { col: CANTIERE, op: 0.92 }),
    testo(x0 + w + 50, cy + 76, 'scarico', { size: QUOTA, col: CANTIERE, op: 0.9, mono: true, ancora: 'middle' }),
    cartiglio('Drenaggio tubolare', 'pianta della rete'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 1080, y: 640, w: 620, s: 'l’innesto nel collettore e lo scarico' }],
  };
}

function drenaggioProfilo() {
  const pc = 330;
  const base = [];
  const note = [];

  base.push(suolo(pc));

  // Il dreno scende con pendenza costante: la pendenza è esagerata per
  // vedersi, e il disegno lo dichiara nel cartiglio.
  const yA = 640;
  const yB = 880;
  base.push(
    percorso(`M 180 ${yA} L 1360 ${yB}`, { col: CANTIERE, op: 0.85, w: 6 }),
    percorso(`M 180 ${yA - 34} L 1360 ${yB - 34}`, { op: 0.3, w: 2, dash: '10 8' }),
    percorso(`M 180 ${yA + 34} L 1360 ${yB + 34}`, { op: 0.3, w: 2, dash: '10 8' }),
    // pozzetto di ispezione
    rett(1360, yB - 90, 90, 250, { op: 0.75, w: 3 }),
    // fosso di scarico con pelo libero
    percorso(`M 1450 ${yB + 40} L 1560 ${yB + 160} L 1740 ${yB + 160}`, { op: 0.6, w: 3 }),
    rett(1500, yB + 118, 240, 42, { riempi: 'url(#acqua)', op: 0, opRiempi: 1 }),
    linea(1500, yB + 118, 1740, yB + 118, { op: 0.45, w: 2 }),
  );

  note.push(
    freccia(300, 480, 620, 500, { col: CANTIERE, op: 0.85, w: 3 }),
    testo(300, 448, 'pendenza 0,3% costante', {
      size: QUOTA,
      col: CANTIERE,
      op: 0.92,
      mono: true,
    }),
    richiamo(1180, 1090, 1400, yB + 60, 'pozzetto di ispezione', { op: 0.8 }),
    richiamo(1500, yB + 230, 1620, yB + 130, 'lo scarico va verificato:', { op: 0.8 }),
    testo(1500, yB + 274, 'se è più alto, non funziona', { size: QUOTA, op: 0.55 }),
    cartiglio('Drenaggio tubolare', 'profilo longitudinale, scala verticale esagerata'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 1240, y: 660, w: 560, s: 'il pozzetto e il recapito nel fosso' }],
  };
}

/* --- subirrigazione ---------------------------------------------------- */

function subSezione() {
  const pc = 340;
  const base = [];
  const note = [];

  base.push(suolo(pc));

  // Apparato radicale, schematico.
  const rx = 900;
  for (let i = -3; i <= 3; i += 1) {
    base.push(
      percorso(
        `M ${rx} ${pc} C ${rx + i * 40} ${pc + 90}, ${rx + i * 96} ${pc + 180}, ${rx + i * 130} ${pc + 290}`,
        { op: 0.35, w: 2 },
      ),
    );
  }
  base.push(
    percorso(`M ${rx - 40} ${pc} L ${rx} ${pc - 130} L ${rx + 40} ${pc} Z`, { op: 0.4, w: 2.5 }),
  );

  // Ala gocciolante interrata e bulbo di umettamento.
  const ay = pc + 250;
  base.push(
    cerchio(rx, ay, 26, { op: 0.85, w: 4, col: CANTIERE }),
    percorso(
      `M ${rx - 210} ${ay - 20} C ${rx - 210} ${ay + 190}, ${rx + 210} ${ay + 190}, ${rx + 210} ${ay - 20} ` +
        `C ${rx + 210} ${ay - 150}, ${rx - 210} ${ay - 150}, ${rx - 210} ${ay - 20} Z`,
      { col: BONE, op: 0.35, w: 2.5, dash: '14 10', riempi: BONE, opRiempi: 0.05 },
    ),
  );

  // Altre ali, a interasse, tagliate dai bordi.
  base.push(cerchio(rx - 520, ay, 26, { op: 0.5, w: 3 }), cerchio(rx + 520, ay, 26, { op: 0.5, w: 3 }));

  note.push(
    quotaV(rx + 320, pc, ay, '0,35 m'),
    quotaH(pc - 70, rx - 520, rx, '1,60 m'),
    richiamo(420, ay + 200, rx - 190, ay + 110, 'bulbo di umettamento', { op: 0.8 }),
    richiamo(rx + 420, ay + 260, rx + 30, ay + 18, 'ala gocciolante interrata', {
      col: CANTIERE,
      op: 0.92,
    }),
    cartiglio('Subirrigazione', 'sezione: ala interrata e bulbo'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 620, y: 440, w: 620, s: 'il bulbo attorno all’ala' }],
  };
}

function subPianta() {
  const x0 = 220;
  const y0 = 190;
  const w = 1180;
  const h = 810;
  const base = [];
  const note = [];

  base.push(rett(x0, y0, w, h, { op: 0.38, w: 2.5 }));

  // Collettore di testata e ali parallele.
  base.push(linea(x0 + 60, y0 + 60, x0 + 60, y0 + h - 60, { col: CANTIERE, op: 0.85, w: 6 }));
  for (let i = 0; i < 13; i += 1) {
    const y = y0 + 70 + (i * (h - 140)) / 12;
    base.push(linea(x0 + 60, y, x0 + w - 60, y, { op: 0.4, w: 2.5 }));
  }
  // Valvola e contatore in testata.
  base.push(
    cerchio(x0 + 60, y0 + 30, 24, { op: 0.75, w: 3 }),
    linea(x0 + 36, y0 + 30, x0 + 84, y0 + 30, { op: 0.75, w: 3 }),
  );

  note.push(
    quotaV(x0 + w + 60, y0 + 70, y0 + 70 + (h - 140) / 12, '1,60 m'),
    richiamo(x0 + 200, y0 - 44, x0 + 60, y0 + 30, 'valvola e contatore', { op: 0.8 }),
    richiamo(700, y0 + h + 90, 800, y0 + h - 90, 'ali interrate, portata bassa e continua', {
      op: 0.78,
    }),
    testo(x0 + 100, y0 + h / 2, 'collettore', {
      size: QUOTA,
      col: CANTIERE,
      op: 0.9,
      mono: true,
    }),
    cartiglio('Subirrigazione', 'pianta dell’impianto'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 200, y: 180, w: 600, s: 'la testata con valvola e contatore' }],
  };
}

function subConfronto() {
  const base = [];
  const note = [];
  const pc = 480;

  // Due sezioni affiancate: aspersione a sinistra, subirrigazione a destra.
  const mezzo = L / 2;
  base.push(
    linea(mezzo, 150, mezzo, A - 170, { op: 0.18, w: 2, dash: '14 12' }),
    rett(-10, pc, mezzo + 10, A - pc, { riempi: 'url(#terreno)', op: 0, sw: 0 }),
    rett(mezzo, pc, L - mezzo + 10, A - pc, { riempi: 'url(#terreno)', op: 0, sw: 0 }),
    linea(-10, pc, L + 10, pc, { op: 0.5, w: 2.5 }),
  );

  // Aspersione: getto dall'alto, evaporazione, bagnatura superficiale.
  for (let i = 0; i < 7; i += 1) {
    const x = 200 + i * 90;
    base.push(percorso(`M ${x} 250 C ${x + 20} 340, ${x + 26} 400, ${x + 30} ${pc - 10}`, { op: 0.3, w: 2, dash: '8 10' }));
  }
  for (let i = 0; i < 4; i += 1) {
    const x = 250 + i * 130;
    base.push(freccia(x, 300, x - 20, 200, { op: 0.28, w: 2, punta: 11 }));
  }

  // Subirrigazione: ala e bulbo sotto.
  const ay = pc + 190;
  base.push(
    cerchio(1330, ay, 24, { col: CANTIERE, op: 0.85, w: 4 }),
    percorso(
      `M 1150 ${ay - 20} C 1150 ${ay + 150}, 1510 ${ay + 150}, 1510 ${ay - 20} ` +
        `C 1510 ${ay - 130}, 1150 ${ay - 130}, 1150 ${ay - 20} Z`,
      { op: 0.32, w: 2.5, dash: '14 10' },
    ),
  );

  note.push(
    testo(160, 190, 'ASPERSIONE', { size: TITOLO, op: 0.55, ls: 3 }),
    testo(1000, 190, 'SUBIRRIGAZIONE', { size: TITOLO, col: CANTIERE, op: 0.85, ls: 3 }),
    testo(160, 900, 'evapora, bagna le foglie', { size: QUOTA, op: 0.5, mono: true }),
    testo(160, 946, 'e l’interfilare', { size: QUOTA, op: 0.5, mono: true }),
    testo(1000, 900, 'acqua dove stanno le radici,', {
      size: QUOTA,
      col: CANTIERE,
      op: 0.75,
      mono: true,
    }),
    testo(1000, 946, 'niente perdita in superficie', {
      size: QUOTA,
      col: CANTIERE,
      op: 0.75,
      mono: true,
    }),
    cartiglio('Subirrigazione', 'confronto con l’irrigazione per aspersione'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 1000, y: 420, w: 620, s: 'l’acqua alla profondità delle radici' }],
  };
}

/* --- movimento terra --------------------------------------------------- */

function terraBaulatura() {
  const base = [];
  const note = [];
  const pc = 640;

  // Baulatura: il campo è convesso, l'acqua scola verso le scoline.
  const baule =
    `M 120 ${pc + 70} C 320 ${pc + 70}, 380 ${pc - 90}, 640 ${pc - 96} ` +
    `C 900 ${pc - 102}, 960 ${pc + 70}, 1160 ${pc + 70}`;
  const baule2 =
    `M 1160 ${pc + 70} C 1360 ${pc + 70}, 1420 ${pc - 78}, 1680 ${pc - 84}`;

  base.push(
    rett(-10, pc - 100, L + 20, A - pc + 100, { riempi: 'url(#terreno)', op: 0, sw: 0 }),
    percorso(baule, { op: 0.7, w: 3.5 }),
    percorso(baule2, { op: 0.7, w: 3.5 }),
    // scolina fra le due baulature
    percorso(`M 1060 ${pc + 70} L 1160 ${pc + 210} L 1260 ${pc + 70}`, {
      col: CANTIERE,
      op: 0.85,
      w: 4,
    }),
    rett(1090, pc + 150, 140, 60, { riempi: 'url(#acqua)', op: 0, opRiempi: 1 }),
  );

  // Verso di scolo sulla superficie.
  base.push(
    freccia(700, pc - 150, 1020, pc - 96, { op: 0.35, w: 2.5 }),
    freccia(1560, pc - 150, 1300, pc - 96, { op: 0.35, w: 2.5 }),
  );

  note.push(
    quotaV(560, pc - 96, pc + 70, '0,40 m'),
    richiamo(1420, pc + 300, 1180, pc + 190, 'scolina riprofilata', {
      col: CANTIERE,
      op: 0.92,
    }),
    richiamo(300, pc - 260, 520, pc - 60, 'baulatura: la superficie scola da sola', { op: 0.8 }),
    cartiglio('Movimento terra', 'baulatura e scolina, sezione trasversale'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 940, y: 560, w: 600, s: 'la scolina fra due baulature' }],
  };
}

function terraInvaso() {
  const base = [];
  const note = [];
  const pc = 430;

  const sx = 380;
  const dx = 1440;
  const fondo = 930;

  base.push(
    rett(-10, pc, L + 20, A - pc, { riempi: 'url(#terreno)', op: 0, sw: 0 }),
    // scavo con scarpate
    percorso(`M -10 ${pc} L ${sx} ${pc} L ${sx + 240} ${fondo} L ${dx - 240} ${fondo} L ${dx} ${pc} L ${L + 10} ${pc}`, {
      op: 0.65,
      w: 3.5,
    }),
    // argine di rilevato a destra
    percorso(`M ${dx} ${pc} L ${dx + 120} ${pc - 130} L ${dx + 300} ${pc - 130} L ${dx + 420} ${pc}`, {
      op: 0.6,
      w: 3,
    }),
    // acqua invasata
    percorso(`M ${sx + 130} ${pc + 190} L ${sx + 240} ${fondo} L ${dx - 240} ${fondo} L ${dx - 130} ${pc + 190} Z`, {
      riempi: 'url(#acqua)',
      op: 0,
      opRiempi: 1,
    }),
    linea(sx + 130, pc + 190, dx - 130, pc + 190, { col: BONE, op: 0.5, w: 2.5 }),
  );

  note.push(
    testo(sx + 160, pc + 158, 'massimo invaso', { size: QUOTA, op: 0.6, mono: true }),
    quotaV(dx - 60, pc + 190, fondo, '3,20 m'),
    richiamo(1560, pc - 190, 1560, pc - 130, 'argine di rilevato', { ancora: 'middle', op: 0.8 }),
    richiamo(300, 1040, 560, 880, 'scarpata sagomata', { op: 0.78 }),
    testo(120, 250, 'il dimensionamento si fa sul fabbisogno', { size: ETICHETTA, op: 0.72 }),
    testo(120, 296, 'della coltura, non sullo spazio che avanza', {
      size: ETICHETTA,
      op: 0.45,
    }),
    cartiglio('Movimento terra', 'invaso irriguo, sezione'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 1180, y: 300, w: 600, s: 'l’argine e il pelo di massimo invaso' }],
  };
}

function terraCapezzagna() {
  const base = [];
  const note = [];
  const pc = 700;

  base.push(
    rett(-10, pc, L + 20, A - pc, { riempi: 'url(#terreno)', op: 0, sw: 0 }),
    linea(-10, pc, L + 10, pc, { op: 0.45, w: 2.5 }),
  );

  // Riporto e piano transitabile.
  const rx0 = 520;
  const rx1 = 1300;
  base.push(
    percorso(`M ${rx0 - 180} ${pc} L ${rx0} ${pc - 130} L ${rx1} ${pc - 130} L ${rx1 + 180} ${pc}`, {
      op: 0.7,
      w: 3.5,
    }),
    rett(rx0, pc - 130, rx1 - rx0, 130, { riempi: 'url(#risulta)', op: 0, opRiempi: 1 }),
    linea(rx0, pc - 130, rx1, pc - 130, { col: CANTIERE, op: 0.8, w: 4 }),
    // fosso laterale
    percorso(`M ${rx1 + 180} ${pc} L ${rx1 + 300} ${pc + 130} L ${rx1 + 440} ${pc}`, {
      op: 0.55,
      w: 3,
    }),
  );

  note.push(
    quotaV(rx0 - 90, pc - 130, pc, '0,45 m', { lato: 'sinistra' }),
    quotaH(pc - 200, rx0, rx1, '4,00 m'),
    richiamo(rx1 + 480, pc + 200, rx1 + 300, pc + 120, 'fosso di guardia', { op: 0.8 }),
    richiamo(360, 340, 700, pc - 128, 'capezzagna transitabile tutto l’anno', {
      col: CANTIERE,
      op: 0.9,
    }),
    cartiglio('Movimento terra', 'capezzagna e riporto, sezione'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 1160, y: 540, w: 600, s: 'il raccordo fra riporto e fosso' }],
  };
}

/* --- bonifiche --------------------------------------------------------- */

function bonificaSequenza() {
  const base = [];
  const note = [];
  const passi = ['rilievo', 'livellamento', 'drenaggio', 'scoline'];
  const w = 360;
  const gap = 52;
  const x0 = (L - (passi.length * w + (passi.length - 1) * gap)) / 2;
  const y0 = 330;
  const h = 420;

  passi.forEach((p, i) => {
    const x = x0 + i * (w + gap);
    base.push(rett(x, y0, w, h, { op: 0.3, w: 2.5 }));

    // Dentro ogni riquadro, lo stato del terreno a quel passo.
    const py = y0 + h - 120;
    if (i === 0) {
      base.push(
        percorso(`M ${x + 30} ${py} C ${x + 120} ${py - 60}, ${x + 220} ${py + 40}, ${x + w - 30} ${py - 20}`, { op: 0.6, w: 3 }),
      );
      for (let k = 0; k < 5; k += 1) {
        const kx = x + 50 + k * 65;
        base.push(percorso(`M ${kx - 8} ${py - 90} h 16 M ${kx} ${py - 98} v 16`, { op: 0.4, w: 2 }));
      }
    }
    if (i === 1) {
      base.push(
        percorso(`M ${x + 30} ${py} C ${x + 120} ${py - 60}, ${x + 220} ${py + 40}, ${x + w - 30} ${py - 20}`, { op: 0.25, w: 2, dash: '10 8' }),
        linea(x + 30, py - 30, x + w - 30, py - 6, { col: CANTIERE, op: 0.85, w: 3.5 }),
      );
    }
    if (i === 2) {
      base.push(
        linea(x + 30, py - 30, x + w - 30, py - 6, { op: 0.5, w: 3 }),
        cerchio(x + 130, py + 60, 20, { col: CANTIERE, op: 0.85, w: 3.5 }),
        cerchio(x + 250, py + 66, 20, { col: CANTIERE, op: 0.85, w: 3.5 }),
      );
    }
    if (i === 3) {
      base.push(
        linea(x + 30, py - 30, x + w - 30, py - 6, { op: 0.5, w: 3 }),
        percorso(`M ${x + 150} ${py - 22} L ${x + 190} ${py + 60} L ${x + 230} ${py - 14}`, {
          col: CANTIERE,
          op: 0.85,
          w: 3.5,
        }),
      );
    }

    if (i < passi.length - 1) {
      base.push(freccia(x + w + 8, y0 + h / 2, x + w + gap - 8, y0 + h / 2, { op: 0.35, w: 2.5, punta: 12 }));
    }

    note.push(
      testo(x + 22, y0 - 26, `${i + 1}`, { size: QUOTA, col: CANTIERE, op: 0.9, mono: true }),
      testo(x + 56, y0 - 26, p, { size: ETICHETTA, op: 0.8 }),
    );
  });

  note.push(
    testo(x0, 900, 'si parte sempre dall’acqua: livellare un campo', {
      size: ETICHETTA,
      op: 0.72,
    }),
    testo(x0, 946, 'che poi non ha scarico non serve a niente', { size: ETICHETTA, op: 0.45 }),
    cartiglio('Bonifiche', 'sequenza dell’intervento'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 820, y: 280, w: 620, s: 'dal livellamento alla rete di drenaggio' }],
  };
}

function bonificaPrimaDopo() {
  const base = [];
  const note = [];
  const pc = 420;
  const pc2 = 880;

  // Sopra: com'è oggi. Ristagno nella depressione.
  base.push(
    rett(-10, pc, L + 20, 280, { riempi: 'url(#argilla)', op: 0, sw: 0 }),
    percorso(`M -10 ${pc} C 400 ${pc - 30}, 620 ${pc + 70}, 900 ${pc + 66} C 1180 ${pc + 62}, 1400 ${pc - 26}, ${L + 10} ${pc}`, { op: 0.6, w: 3 }),
    percorso(`M 640 ${pc + 42} C 760 ${pc + 76}, 1040 ${pc + 76}, 1160 ${pc + 40}`, {
      col: CANTIERE,
      op: 0.8,
      w: 3.5,
    }),
    rett(650, pc + 42, 500, 30, { riempi: 'url(#acqua)', op: 0, opRiempi: 1 }),
  );

  // Sotto: dopo. Piano regolare, dreni, scolo.
  base.push(
    rett(-10, pc2, L + 20, A - pc2, { riempi: 'url(#terreno)', op: 0, sw: 0 }),
    linea(-10, pc2, L + 10, pc2 - 24, { op: 0.65, w: 3.5 }),
    cerchio(620, pc2 + 130, 22, { col: CANTIERE, op: 0.8, w: 3.5 }),
    cerchio(1080, pc2 + 118, 22, { col: CANTIERE, op: 0.8, w: 3.5 }),
    freccia(1480, pc2 - 100, 1690, pc2 - 84, { col: CANTIERE, op: 0.75, w: 2.5 }),
  );

  note.push(
    testo(120, 300, 'OGGI', { size: TITOLO, op: 0.5, ls: 4 }),
    testo(120, 790, 'DOPO', { size: TITOLO, col: CANTIERE, op: 0.85, ls: 4 }),
    testo(650, pc + 150, 'ristagno cronico: ogni anno si perde', {
      size: QUOTA,
      op: 0.55,
      mono: true,
    }),
    testo(620, pc2 + 220, 'pendenza regolare, dreni, scarico', {
      size: QUOTA,
      col: CANTIERE,
      op: 0.8,
      mono: true,
    }),
    cartiglio('Bonifiche', 'stessa sezione, prima e dopo'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 520, y: 300, w: 640, s: 'la parte di campo che ristagna' }],
  };
}

function bonificaZone() {
  const x0 = 230;
  const y0 = 190;
  const w = 1180;
  const h = 810;
  const base = [];
  const note = [];

  base.push(rett(x0, y0, w, h, { op: 0.38, w: 2.5 }));

  // Zone perse: macchie irregolari.
  const macchie = [
    `M 420 400 C 520 330, 700 350, 720 450 C 740 550, 560 590, 470 540 C 400 500, 360 450, 420 400 Z`,
    `M 900 700 C 1020 640, 1180 690, 1160 780 C 1140 870, 960 890, 900 820 C 860 772, 850 730, 900 700 Z`,
    `M 1140 320 C 1220 280, 1310 310, 1300 370 C 1290 430, 1180 440, 1140 400 C 1110 370, 1110 340, 1140 320 Z`,
  ];
  macchie.forEach((d) =>
    base.push(percorso(d, { col: CANTIERE, op: 0.8, w: 3, riempi: CANTIERE, opRiempi: 0.1 })),
  );

  // Scoline esistenti, disordinate.
  base.push(
    percorso(`M ${x0} 620 C 500 600, 700 660, 900 630 C 1100 600, 1250 660, ${x0 + w} 640`, {
      op: 0.3,
      w: 2.5,
      dash: '14 10',
    }),
  );

  note.push(
    richiamo(1420, 470, 1300, 380, 'zone che ogni anno', { ancora: 'start', col: CANTIERE, op: 0.9 }),
    testo(1420, 514, 'si perdono', { size: ETICHETTA, col: CANTIERE, op: 0.9 }),
    richiamo(300, 1060, 620, 640, 'scoline da riordinare', { op: 0.75 }),
    quotaH(y0 - 46, x0, x0 + w, '6,4 ha'),
    cartiglio('Bonifiche', 'pianta: le superfici da recuperare'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 340, y: 300, w: 600, s: 'una delle zone a ristagno' }],
  };
}

/* --- scavi e demolizioni ----------------------------------------------- */

function scavoSezione() {
  const pc = 340;
  const base = [];
  const note = [];

  base.push(suolo(pc));

  const sx = 640;
  const dx = 1160;
  const fondo = 940;

  base.push(
    percorso(`M ${sx} ${pc} L ${sx + 90} ${fondo} L ${dx - 90} ${fondo} L ${dx} ${pc}`, {
      op: 0.7,
      w: 3.5,
    }),
    // letto di posa e condotta
    rett(sx + 90, fondo - 46, dx - sx - 180, 46, { riempi: 'url(#ghiaietto)', op: 0.4, sw: 2 }),
    cerchio((sx + dx) / 2, fondo - 100, 62, { op: 0.8, w: 4 }),
    cerchio((sx + dx) / 2, fondo - 100, 48, { op: 0.35, w: 2 }),
    // rinfianco e rinterro
    rett(sx + 90, fondo - 190, dx - sx - 180, 90, { riempi: 'url(#ghiaietto)', op: 0, opRiempi: 1 }),
    linea(sx + 46, fondo - 190, dx - 46, fondo - 190, { op: 0.35, w: 2, dash: '12 8' }),
  );

  note.push(
    quotaV(1420, pc, fondo, '2,10 m'),
    quotaH(pc - 70, sx, dx, '1,20 m'),
    richiamo(400, 700, sx + 46, 640, 'scarpata 1:4', { op: 0.78 }),
    richiamo(400, 1010, sx + 130, fondo - 24, 'letto di posa in ghiaietto', { op: 0.78 }),
    richiamo(1330, 820, 960, fondo - 100, 'condotta ⌀ 200', {
      col: CANTIERE,
      op: 0.92,
    }),
    cartiglio('Scavi e demolizioni', 'scavo a sezione obbligata'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 600, y: 640, w: 620, s: 'letto di posa, condotta e rinfianco' }],
  };
}

function scavoSbancamento() {
  const pc = 380;
  const base = [];
  const note = [];

  base.push(
    rett(-10, pc, L + 20, A - pc, { riempi: 'url(#terreno)', op: 0, sw: 0 }),
    linea(-10, pc, 520, pc, { op: 0.5, w: 2.5 }),
  );

  const fondo = 820;
  base.push(
    percorso(`M 520 ${pc} L 800 ${fondo} L 1400 ${fondo} L 1560 ${pc + 120} L ${L + 10} ${pc + 120}`, {
      op: 0.7,
      w: 3.5,
    }),
    // livello di progetto
    linea(760, fondo, 1440, fondo, { col: CANTIERE, op: 0.85, w: 4 }),
    // cumulo di materiale scavato
    percorso(`M 160 ${pc} C 240 ${pc - 150}, 380 ${pc - 160}, 470 ${pc}`, {
      op: 0.55,
      w: 3,
    }),
    percorso(`M 170 ${pc - 10} C 250 ${pc - 140}, 370 ${pc - 150}, 460 ${pc - 10} Z`, {
      riempi: 'url(#risulta)',
      op: 0,
      opRiempi: 1,
    }),
  );

  note.push(
    quotaV(1640, pc + 120, fondo, '1,70 m'),
    richiamo(200, 240, 320, pc - 110, 'materiale accantonato', { op: 0.78 }),
    richiamo(880, 1010, 1000, fondo + 10, 'quota di progetto', {
      col: CANTIERE,
      op: 0.92,
    }),
    cartiglio('Scavi e demolizioni', 'sbancamento, sezione'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 700, y: 560, w: 620, s: 'il fondo scavo alla quota di progetto' }],
  };
}

function demolizioneSelettiva() {
  const base = [];
  const note = [];
  const suoloY = 900;

  base.push(suolo(suoloY));

  // Fabbricato rurale schematico, con la copertura in demolizione.
  const bx = 300;
  const bw = 620;
  base.push(
    rett(bx, 480, bw, suoloY - 480, { op: 0.6, w: 3.5 }),
    percorso(`M ${bx - 40} 480 L ${bx + bw / 2} 320 L ${bx + bw + 40} 480`, { op: 0.5, w: 3, dash: '16 10' }),
    // aperture
    rett(bx + 90, suoloY - 210, 110, 210, { op: 0.35, w: 2.5 }),
    rett(bx + 340, 600, 130, 120, { op: 0.35, w: 2.5 }),
  );

  // I materiali separati, in tre cumuli distinti.
  const cumulo = (x, etichetta, campitura) => {
    const c = [];
    c.push(
      percorso(`M ${x} ${suoloY} C ${x + 50} ${suoloY - 130}, ${x + 170} ${suoloY - 130}, ${x + 220} ${suoloY} Z`, {
        riempi: `url(#${campitura})`,
        op: 0.4,
        w: 2.5,
        opRiempi: 1,
      }),
    );
    return { g: c.join(''), etichetta, x: x + 110 };
  };

  const c1 = cumulo(1050, 'inerti', 'risulta');
  const c2 = cumulo(1300, 'legno', 'terreno');
  const c3 = cumulo(1550, 'metalli', 'ghiaietto');
  base.push(c1.g, c2.g, c3.g);

  note.push(
    testo(c1.x, suoloY + 56, c1.etichetta, { size: QUOTA, op: 0.6, mono: true, ancora: 'middle' }),
    testo(c2.x, suoloY + 56, c2.etichetta, { size: QUOTA, op: 0.6, mono: true, ancora: 'middle' }),
    testo(c3.x, suoloY + 56, c3.etichetta, { size: QUOTA, op: 0.6, mono: true, ancora: 'middle' }),
    richiamo(300, 300, 610, 400, 'demolizione selettiva', { col: CANTIERE, op: 0.92 }),
    testo(1050, 380, 'il materiale si separa', { size: ETICHETTA, op: 0.72 }),
    testo(1050, 426, 'e si conferisce secondo normativa', { size: ETICHETTA, op: 0.45 }),
    cartiglio('Scavi e demolizioni', 'demolizione selettiva di fabbricato rurale'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 980, y: 640, w: 620, s: 'i materiali separati per il conferimento' }],
  };
}

/* --- tubi e materiali --------------------------------------------------- */

function tubiDiametri() {
  const base = [];
  const note = [];
  const diametri = [50, 63, 80, 110, 125, 160];
  const asse = 620;

  // I cerchi sono in scala fra loro: si vede quanto cresce la sezione.
  let x = 300;
  diametri.forEach((d) => {
    const r = d * 1.35;
    base.push(
      cerchio(x + r, asse, r, { op: 0.6, w: 3 }),
      cerchio(x + r, asse, r - 9, { op: 0.25, w: 2 }),
    );
    note.push(
      testo(x + r, asse + r + 66, `⌀ ${d}`, {
        size: QUOTA,
        op: 0.75,
        mono: true,
        ancora: 'middle',
      }),
    );
    x += r * 2 + 46;
  });

  note.push(
    testo(160, 300, 'sbagliare un diametro in adduzione', { size: ETICHETTA, op: 0.75 }),
    testo(160, 346, 'si paga per tutta la vita dell’impianto', {
      size: ETICHETTA,
      op: 0.45,
    }),
    quotaH(940, 300, 300 + 160 * 2.7, 'sezione utile × 10', { sopra: false }),
    cartiglio('Tubi e materiali', 'diametri a confronto, in scala'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 1080, y: 380, w: 620, s: 'i diametri grandi per l’adduzione' }],
  };
}

function tubiDrenante() {
  const base = [];
  const note = [];
  const cy = 560;
  const x0 = 260;
  const x1 = 1540;

  // Tubo corrugato visto di fianco: la corrugazione è la sua rigidezza.
  const r = 150;
  const passo = 64;
  const onde = [];
  for (let x = x0; x <= x1; x += passo) {
    onde.push(`M ${x} ${cy - r} q ${passo / 2} ${r * 0.16} ${passo} 0`);
    onde.push(`M ${x} ${cy + r} q ${passo / 2} ${-r * 0.16} ${passo} 0`);
  }
  base.push(
    percorso(onde.join(' '), { op: 0.5, w: 2.5 }),
    linea(x0, cy - r, x1, cy - r, { op: 0.7, w: 3 }),
    linea(x0, cy + r, x1, cy + r, { op: 0.7, w: 3 }),
  );

  // Fessure: in giallo, sono la parte che fa entrare l'acqua.
  for (let x = x0 + 40; x < x1; x += passo * 2) {
    base.push(
      linea(x, cy - r + 22, x, cy - r + 56, { col: CANTIERE, op: 0.8, w: 4 }),
      linea(x + passo, cy + r - 56, x + passo, cy + r - 22, { col: CANTIERE, op: 0.8, w: 4 }),
    );
  }

  // Sezione in testa.
  base.push(
    percorso(`M ${x1} ${cy - r} a ${r * 0.28} ${r} 0 0 1 0 ${r * 2}`, { op: 0.6, w: 3 }),
    percorso(`M ${x1} ${cy - r} a ${r * 0.28} ${r} 0 0 0 0 ${r * 2}`, { op: 0.3, w: 2, dash: '10 8' }),
  );

  note.push(
    quotaV(200, cy - r, cy + r, '⌀ 80', { lato: 'sinistra' }),
    richiamo(700, 260, 900, cy - r + 30, 'microfessure sulla cresta', {
      col: CANTIERE,
      op: 0.92,
    }),
    richiamo(500, 940, 760, cy + r - 20, 'corrugazione: resiste al carico del terreno', {
      op: 0.78,
    }),
    cartiglio('Tubi e materiali', 'tubo drenante corrugato microfessurato'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 620, y: 330, w: 620, s: 'le microfessure che raccolgono l’acqua' }],
  };
}

function tubiRaccorderia() {
  const base = [];
  const note = [];
  const y = 560;
  const sp = 70;

  // TE
  const tx = 340;
  base.push(
    rett(tx - 170, y - sp / 2, 340, sp, { op: 0.6, w: 3, r: 6 }),
    rett(tx - sp / 2, y + sp / 2 - 2, sp, 160, { op: 0.6, w: 3, r: 6 }),
  );

  // Curva 90°
  const cx = 900;
  base.push(
    percorso(
      `M ${cx - 180} ${y - sp / 2} L ${cx + sp / 2} ${y - sp / 2} L ${cx + sp / 2} ${y + 180} ` +
        `M ${cx - 180} ${y + sp / 2} L ${cx - sp / 2} ${y + sp / 2} L ${cx - sp / 2} ${y + 180}`,
      { op: 0.6, w: 3 },
    ),
    linea(cx - 180, y - sp / 2, cx - 180, y + sp / 2, { op: 0.4, w: 2, dash: '8 8' }),
  );

  // Pozzetto
  const px = 1420;
  base.push(
    rett(px - 150, y - 150, 300, 380, { op: 0.6, w: 3 }),
    rett(px - 170, y - 190, 340, 46, { op: 0.7, w: 3, r: 4 }),
    linea(px - 150, y + 130, px + 150, y + 130, { op: 0.4, w: 2.5 }),
    rett(px - 250, y + 40, 100, sp, { op: 0.5, w: 2.5 }),
    rett(px + 150, y + 40, 100, sp, { op: 0.5, w: 2.5 }),
  );

  note.push(
    testo(tx, y + 300, 'TE', { size: QUOTA, op: 0.6, mono: true, ancora: 'middle' }),
    testo(cx, y + 300, 'curva 90°', { size: QUOTA, op: 0.6, mono: true, ancora: 'middle' }),
    testo(px, y + 300, 'pozzetto d’ispezione', {
      size: QUOTA,
      op: 0.6,
      mono: true,
      ancora: 'middle',
    }),
    testo(180, 260, 'le stesse cose che usiamo nei nostri cantieri', {
      size: ETICHETTA,
      col: CANTIERE,
      op: 0.85,
    }),
    cartiglio('Tubi e materiali', 'raccorderia e pozzetti, schema'),
  );

  return {
    base: base.join(''),
    note: note.join(''),
    ritagli: [{ x: 1180, y: 300, w: 600, s: 'il pozzetto d’ispezione' }],
  };
}

/* ------------------------------------------------------------- catalogo */

/*
  Per ogni lavorazione: tre disegni, e per ognuno la descrizione alternativa.
  L'alt è scritto qui e non generato: è l'unico passaggio che nessuno script
  fa al posto nostro (INTAKE.md §3), e il vecchio sito di TD Group aveva 340
  descrizioni su 583 uguali al nome del file.
*/
const CATALOGO = {
  'rilevazione-altimetrica': [
    {
      f: rilievoPianta,
      slug: 'piano-quotato',
      alt: 'Disegno tecnico: piano quotato di un appezzamento con maglia di punti rilevati, curve di livello e la depressione dove l’acqua ristagna',
    },
    {
      f: rilievoProfilo,
      slug: 'profilo-terreno',
      alt: 'Disegno tecnico: profilo reale del terreno confrontato con il piano di progetto, la differenza fra le due linee è la terra da muovere',
    },
    {
      f: rilievoStrumento,
      slug: 'catena-di-misura',
      alt: 'Disegno tecnico: emettitore laser su treppiede e asta con ricevitore che legge la quota del terreno in due punti diversi',
    },
  ],
  'livellamento-laser': [
    {
      f: livellamentoSezione,
      slug: 'sezione-scavo-riporto',
      alt: 'Disegno tecnico: sezione di un campo prima e dopo il livellamento, con le aree di scavo e di riporto e la pendenza di progetto allo 0,2 per cento',
    },
    {
      f: livellamentoControllo,
      slug: 'controllo-lama',
      alt: 'Disegno tecnico: livellatrice guidata dal piano laser, con il ricevitore sull’asta che corregge la quota della lama',
    },
    {
      f: livellamentoPassate,
      slug: 'pianta-passate',
      alt: 'Disegno tecnico: pianta di un appezzamento con le passate della livellatrice e il verso in cui il campo deve scolare',
    },
  ],
  'drenaggio-tubolare': [
    {
      f: drenaggioTrincea,
      slug: 'sezione-trincea',
      alt: 'Disegno tecnico: sezione della trincea di drenaggio con dreno corrugato microfessurato da 80 millimetri posato a 1,10 metri, ghiaietto di filtro e tessuto non tessuto',
    },
    {
      f: drenaggioPianta,
      slug: 'pianta-rete',
      alt: 'Disegno tecnico: pianta della rete di drenaggio a spina di pesce, con i dreni a interasse di 12 metri, il collettore e lo scarico',
    },
    {
      f: drenaggioProfilo,
      slug: 'profilo-e-scarico',
      alt: 'Disegno tecnico: profilo longitudinale di una linea di dreno con pendenza costante dello 0,3 per cento, pozzetto di ispezione e recapito nel fosso',
    },
  ],
  subirrigazione: [
    {
      f: subSezione,
      slug: 'sezione-ala-interrata',
      alt: 'Disegno tecnico: sezione di un impianto di subirrigazione con l’ala gocciolante interrata a 35 centimetri e il bulbo di umettamento attorno alle radici',
    },
    {
      f: subPianta,
      slug: 'pianta-impianto',
      alt: 'Disegno tecnico: pianta di un impianto di subirrigazione con collettore di testata, valvola, contatore e ali interrate a interasse di 1,60 metri',
    },
    {
      f: subConfronto,
      slug: 'confronto-aspersione',
      alt: 'Disegno tecnico: confronto fra irrigazione per aspersione e subirrigazione, con le perdite per evaporazione da una parte e l’acqua portata alle radici dall’altra',
    },
  ],
  'movimento-terra': [
    {
      f: terraBaulatura,
      slug: 'baulatura-e-scolina',
      alt: 'Disegno tecnico: sezione trasversale di un campo baulato con la scolina riprofilata fra due baulature e il verso in cui l’acqua scola',
    },
    {
      f: terraInvaso,
      slug: 'invaso-irriguo',
      alt: 'Disegno tecnico: sezione di un invaso per l’acqua irrigua con scarpate sagomate, argine di rilevato e quota di massimo invaso a 3,20 metri',
    },
    {
      f: terraCapezzagna,
      slug: 'capezzagna-e-riporto',
      alt: 'Disegno tecnico: sezione di una capezzagna transitabile formata con riporto, larga quattro metri, con il fosso di guardia a lato',
    },
  ],
  bonifiche: [
    {
      f: bonificaSequenza,
      slug: 'sequenza-intervento',
      alt: 'Disegno tecnico: i quattro passi di una bonifica agraria in sequenza, dal rilievo delle quote al livellamento, alla rete di drenaggio, al riordino delle scoline',
    },
    {
      f: bonificaPrimaDopo,
      slug: 'prima-e-dopo',
      alt: 'Disegno tecnico: la stessa sezione di terreno prima e dopo la bonifica, con il ristagno cronico da una parte e la pendenza regolare con i dreni dall’altra',
    },
    {
      f: bonificaZone,
      slug: 'zone-da-recuperare',
      alt: 'Disegno tecnico: pianta di un appezzamento di 6,4 ettari con evidenziate le zone che ogni anno si perdono per ristagno e le scoline da riordinare',
    },
  ],
  'scavi-e-demolizioni': [
    {
      f: scavoSezione,
      slug: 'scavo-sezione-obbligata',
      alt: 'Disegno tecnico: sezione di uno scavo a sezione obbligata profondo 2,10 metri, con scarpata, letto di posa in ghiaietto e condotta da 200 millimetri',
    },
    {
      f: scavoSbancamento,
      slug: 'sbancamento',
      alt: 'Disegno tecnico: sezione di uno sbancamento con il fondo portato alla quota di progetto e il materiale di scavo accantonato a lato',
    },
    {
      f: demolizioneSelettiva,
      slug: 'demolizione-selettiva',
      alt: 'Disegno tecnico: demolizione selettiva di un fabbricato rurale, con inerti, legno e metalli separati in cumuli distinti per il conferimento',
    },
  ],
  'tubi-irrigazione-edilizia': [
    {
      f: tubiDiametri,
      slug: 'diametri-a-confronto',
      alt: 'Disegno tecnico: sezioni di tubo dai 50 ai 160 millimetri messe in scala una accanto all’altra, per vedere quanto cresce la sezione utile',
    },
    {
      f: tubiDrenante,
      slug: 'tubo-drenante',
      alt: 'Disegno tecnico: tubo drenante corrugato da 80 millimetri con le microfessure sulla cresta della corrugazione, viste di fianco e in sezione',
    },
    {
      f: tubiRaccorderia,
      slug: 'raccorderia',
      alt: 'Disegno tecnico: schema della raccorderia per irrigazione e drenaggio, con un TE, una curva a 90 gradi e un pozzetto d’ispezione',
    },
  ],
};

/*
  Quale dei tre disegni fa da copertina, quando non è il primo.

  La copertina deve reggere a tutto schermo sotto un H1: serve un disegno che
  copra la larghezza, non uno schema fatto di riquadri staccati. Per le
  bonifiche il primo disegno è la sequenza dei quattro passi, che senza le
  scritte diventa quattro rettangoli vuoti: fa da copertina il secondo.
*/
const COPERTINA_DA = {
  bonifiche: 1,
};

/* --------------------------------------------------------------- resa */

function svg(contenuto, viewBox = `0 0 ${L} ${A}`) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${A}" viewBox="${viewBox}">` +
      `<defs>${CAMPITURE}</defs>` +
      `<rect x="-4000" y="-4000" width="12000" height="12000" fill="url(#fondo)"/>` +
      contenuto +
      `</svg>`,
  );
}

/**
 * Copertina: solo la geometria, sfumata, senza una scritta.
 *
 * Ci va sopra l'H1 della pagina servizio con un velo al 60%: un disegno
 * quotato la' sotto diventa illeggibile e litiga con il titolo. Qui il
 * disegno fa quello che deve fare una copertina, cioe' dare una texture che
 * ha a che fare con la lavorazione, e tacere.
 */
function copertina(d) {
  return svg(
    reticolo(160) +
      `<g opacity="0.42">${d.base}</g>` +
      `<rect x="-10" y="-10" width="${L + 20}" height="${A + 20}" fill="url(#velo)"/>`,
  );
}

function pieno(d) {
  return svg(reticolo() + d.base + d.note);
}

function dettaglio(d, ritaglio) {
  const h = (ritaglio.w * A) / L;
  return svg(
    reticolo() + d.base + d.note,
    `${ritaglio.x} ${ritaglio.y} ${ritaglio.w} ${h}`,
  );
}

/* ------------------------------------------------------------------ main */

if (!existsSync(INTAKE)) {
  console.error(`\n  Manca src/clienti/${CLIENTE}/intake/foto/. Vedi INTAKE.md.\n`);
  process.exit(1);
}

const cartelle = (await readdir(INTAKE, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const senzaDisegni = cartelle.filter((c) => !CATALOGO[c]);
let scritte = 0;

for (const servizio of cartelle) {
  const voci = CATALOGO[servizio];
  if (!voci) continue;

  const dir = path.join(INTAKE, servizio);

  /*
    Si tolgono solo i segnaposto vecchi e i disegni di un passaggio
    precedente. Un file con un altro nome e' una fotografia vera arrivata
    dal cliente, e sovrascriverla sarebbe un disastro silenzioso.
  */
  const vecchi = (await readdir(dir)).filter((f) =>
    /^(segnaposto-\d+\.jpg|0\d-[a-z0-9-]+\.jpg)$/.test(f),
  );
  for (const f of vecchi) await unlink(path.join(dir, f));

  const disegni = voci.map((v) => ({ ...v, d: v.f() }));
  const alt = {};

  // 00 — copertina, muta.
  const iCop = COPERTINA_DA[servizio] ?? 0;
  const nomeCop = '00-copertina.jpg';
  await sharp(copertina(disegni[iCop].d)).jpeg({ quality: 90 }).toFile(path.join(dir, nomeCop));
  alt[nomeCop] = {
    slug: 'copertina',
    alt: disegni[iCop].alt,
    generata: true,
  };
  scritte += 1;

  // 01..03 — i disegni quotati.
  for (let i = 0; i < disegni.length; i += 1) {
    const v = disegni[i];
    const nome = `${String(i + 1).padStart(2, '0')}-${v.slug}.jpg`;
    await sharp(pieno(v.d)).jpeg({ quality: 92 }).toFile(path.join(dir, nome));
    alt[nome] = { slug: v.slug, alt: v.alt, generata: true };
    scritte += 1;
  }

  // 04..06 — un dettaglio per disegno.
  for (let i = 0; i < disegni.length; i += 1) {
    const v = disegni[i];
    const r = v.d.ritagli[0];
    const nome = `${String(i + 4).padStart(2, '0')}-dettaglio-${v.slug}.jpg`;
    await sharp(dettaglio(v.d, r)).jpeg({ quality: 92 }).toFile(path.join(dir, nome));
    alt[nome] = {
      slug: `dettaglio-${v.slug}`,
      alt: `Dettaglio del disegno tecnico: ${r.s}`,
      generata: true,
    };
    scritte += 1;
  }

  await writeFile(
    path.join(dir, 'alt.json'),
    `${JSON.stringify(alt, null, 1)}\n`,
    'utf8',
  );

  await writeFile(
    path.join(dir, 'GENERATE'),
    'Disegni tecnici, non fotografie di lavori veri.\n' +
      'Il sito lo dichiara in pagina finché questo file esiste.\n' +
      'Sostituire i file con le foto vere e cancellare questo file.\n',
    'utf8',
  );

  console.log(`  ${servizio}: 7 disegni`);
}

console.log(`\n  ${scritte} disegni scritti in src/clienti/${CLIENTE}/intake/foto/`);
if (senzaDisegni.length) {
  console.log(
    `\n  Nessun disegno per: ${senzaDisegni.join(', ')}\n` +
      `  Il catalogo in questo script è scritto a mano, una lavorazione alla\n` +
      `  volta: un disegno tecnico generico non esiste.`,
  );
}
console.log(`\n  Ora: CLIENTE=${CLIENTE} npm run intake:foto\n`);
