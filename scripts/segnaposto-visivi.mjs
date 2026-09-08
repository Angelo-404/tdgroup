/**
 * Segnaposto visivi per un cliente di cui non abbiamo ancora le foto.
 *
 * È il componente che CLAUDE.md §5 chiamava ArchVisual e che non era mai
 * stato scritto. Qui è uno script invece che un componente React, perché così
 * il risultato entra nell'intake come qualsiasi altra immagine e attraversa
 * la stessa pipeline: nessun percorso speciale nel codice del sito.
 *
 * Sono composizioni **dichiaratamente astratte** — curve di livello, linee di
 * drenaggio, reticoli. Non assomigliano a fotografie e non devono: una
 * immagine che finge di essere un cantiere vero è esattamente l'errore delle
 * 25 foto stock del tema Astra, e questo progetto esiste anche per non
 * ripeterlo. Servono a far vedere come si comporta la pagina — proporzioni,
 * ritagli, contrasto del testo sopra l'immagine — mentre si aspettano le foto.
 *
 * Ogni cartella generata riceve un file GENERATE, che marca le immagini come
 * non fotografiche: il sito lo dichiara in pagina da solo.
 *
 *   CLIENTE=arcobaleno node scripts/segnaposto-visivi.mjs
 *
 * Per sostituirle basta cancellare i file e mettere le immagini vere nella
 * stessa cartella. Togliendo anche GENERATE sparisce l'avviso in pagina.
 */

import { writeFile, readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const CLIENTE = process.env.CLIENTE || 'tdgroup';
const CARTELLA = path.join(ROOT, 'src', 'clienti', CLIENTE);
const INTAKE = path.join(CARTELLA, 'intake', 'foto');

// Quante immagini per lavorazione. Sotto 6 lo script delle foto avvisa che il
// blocco si vede vuoto, quindi 6 è il numero giusto: il minimo che regge.
const PER_SERVIZIO = 6;

const LARGO = 1800;
const ALTO = 1200;

const INK = '#0f1115';
const CANTIERE = '#E6B91E';

/* ------------------------------------------------------------- generatore */

// Numeri pseudocasuali ma ripetibili: rigenerare due volte deve dare lo
// stesso risultato, altrimenti ogni passaggio sporca il confronto fra bozze.
function seme(stringa) {
  let h = 2166136261;
  for (let i = 0; i < stringa.length; i += 1) {
    h ^= stringa.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Una composizione astratta: curve di livello sopra un orizzonte basso.
 *
 * Le curve di livello sono la cosa giusta da disegnare per un'impresa che
 * vive di quote e pendenze — dicono il mestiere senza fingere un cantiere.
 */
function disegno(chiave, indice) {
  const r = seme(`${chiave}-${indice}`);
  const orizzonte = ALTO * (0.55 + r() * 0.2);
  const curve = [];

  const quante = 7 + Math.floor(r() * 5);
  for (let i = 0; i < quante; i += 1) {
    const y = orizzonte + (i - quante / 2) * (ALTO / (quante * 1.6));
    const a1 = 40 + r() * 120;
    const a2 = 40 + r() * 120;
    const opacita = (0.10 + r() * 0.22).toFixed(3);
    const spessore = (1 + r() * 2).toFixed(2);
    curve.push(
      `<path d="M -50 ${y.toFixed(1)} C ${LARGO * 0.3} ${(y - a1).toFixed(1)}, ` +
        `${LARGO * 0.7} ${(y + a2).toFixed(1)}, ${LARGO + 50} ${(y - a1 / 2).toFixed(1)}" ` +
        `fill="none" stroke="#f8f9fa" stroke-opacity="${opacita}" stroke-width="${spessore}"/>`,
    );
  }

  // Una sola linea gialla, e non sempre: l'accento va usato con parsimonia.
  if (r() > 0.45) {
    const y = orizzonte + (r() - 0.5) * 260;
    curve.push(
      `<path d="M -50 ${y.toFixed(1)} C ${LARGO * 0.35} ${(y - 90).toFixed(1)}, ` +
        `${LARGO * 0.65} ${(y + 70).toFixed(1)}, ${LARGO + 50} ${(y - 30).toFixed(1)}" ` +
        `fill="none" stroke="${CANTIERE}" stroke-opacity="0.55" stroke-width="2.5"/>`,
    );
  }

  // Reticolo del rilievo: verticali rade, molto tenui.
  const verticali = [];
  const passo = LARGO / (9 + Math.floor(r() * 6));
  for (let x = passo; x < LARGO; x += passo) {
    verticali.push(
      `<line x1="${x.toFixed(1)}" y1="0" x2="${x.toFixed(1)}" y2="${ALTO}" ` +
        `stroke="#f8f9fa" stroke-opacity="0.05" stroke-width="1"/>`,
    );
  }

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGO}" height="${ALTO}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#161a20"/>
          <stop offset="100%" stop-color="${INK}"/>
        </linearGradient>
      </defs>
      <rect width="${LARGO}" height="${ALTO}" fill="url(#g)"/>
      ${verticali.join('')}
      ${curve.join('')}
    </svg>`,
  );
}

/* ------------------------------------------------------------------ main */

if (!existsSync(INTAKE)) {
  console.error(`\n  Manca src/clienti/${CLIENTE}/intake/foto/. Vedi INTAKE.md.\n`);
  process.exit(1);
}

// I nomi delle lavorazioni servono solo per il messaggio a schermo.
const fileTesti = path.join(CARTELLA, 'intake', 'testi.json');
const nomi = existsSync(fileTesti)
  ? Object.fromEntries(
      (JSON.parse(await readFile(fileTesti, 'utf8')).servizi || []).map((s) => [
        s.slug,
        s.nome,
      ]),
    )
  : {};

const servizi = (await readdir(INTAKE, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

let totale = 0;
let saltate = 0;

for (const servizio of servizi) {
  const dir = path.join(INTAKE, servizio);

  // Mai sovrascrivere quello che c'è: se in una cartella sono già arrivate
  // immagini — generate altrove o fotografie vere — questo script la lascia
  // stare. Sostituire una foto vera con un segnaposto sarebbe un disastro
  // silenzioso.
  const presenti = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
  if (presenti.length > 0) {
    saltate += 1;
    console.log(`  ${servizio}: ${presenti.length} immagini già presenti, non tocco nulla`);
    continue;
  }

  for (let i = 1; i <= PER_SERVIZIO; i += 1) {
    await sharp(disegno(servizio, i))
      .jpeg({ quality: 88 })
      .toFile(path.join(dir, `segnaposto-${String(i).padStart(2, '0')}.jpg`));
    totale += 1;
  }

  await writeFile(
    path.join(dir, 'GENERATE'),
    'Immagini generate, non fotografie di lavori veri.\n' +
      'Il sito lo dichiara in pagina finché questo file esiste.\n' +
      'Sostituire i file con le foto vere e cancellare questo file.\n',
    'utf8',
  );

  console.log(`  ${servizio}: ${PER_SERVIZIO} segnaposto — ${nomi[servizio] || servizio}`);
}

console.log(
  `\n  ${totale} segnaposto generati, ${saltate} cartelle lasciate come stavano.\n` +
    `  Ora: CLIENTE=${CLIENTE} npm run intake:foto\n`,
);
