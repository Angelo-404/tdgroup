/**
 * Dalle foto grezze consegnate dal cliente alle foto pubblicate.
 *
 * Sostituisce prepare-images.mjs, che leggeva dallo scrape del sito di TD
 * Group e aveva l'associazione foto → servizio scritta a mano, un nome di
 * file alla volta. Con dieci clienti quella lista non sta in piedi.
 *
 * Qui l'associazione la fa la cartella:
 *
 *   src/clienti/<cliente>/intake/foto/<slug-servizio>/qualsiasi-nome.jpg
 *
 * Smistare le foto diventa un lavoro da mouse, che può fare anche il cliente.
 * I nomi originali restano quelli che sono: IMG-20240612-WA0031.jpg va bene.
 *
 *   CLIENTE=rossi-edile node scripts/intake-foto.mjs
 *
 * Produce:
 *   public/foto/<cliente>/<slug>-<larghezza>.{avif,webp}
 *   src/clienti/<cliente>/foto.ts
 */

import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const CLIENTE = process.env.CLIENTE || 'tdgroup';
const CARTELLA = path.join(ROOT, 'src', 'clienti', CLIENTE);
const INTAKE = path.join(CARTELLA, 'intake', 'foto');
const USCITA = path.join(ROOT, 'public', 'foto', CLIENTE);

const LARGHEZZE = [480, 960, 1600];
const ESTENSIONI = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

/* ---------------------------------------------------------------- soglie */

// Sotto questa soglia una foto non regge nemmeno la card più piccola.
const LARGHEZZA_MINIMA = 480;

// Sotto questo numero il blocco del servizio si vede vuoto. Non blocca la
// generazione: avvisa, perché è una cosa da chiedere al cliente, non da
// risolvere nel codice. Il minimo osservato che regge è 6 (serramenti, TD).
const FOTO_MINIME_PER_SERVIZIO = 6;

/* ------------------------------------------------------------- anagrafica */

/**
 * Nome leggibile del servizio.
 *
 * Se intake/testi.json c'è, il nome viene da lì ed è quello che il cliente usa
 * davvero. Senza, si ricava dallo slug della cartella: sbagliato non è, ma il
 * nome letto è sempre meglio del nome indovinato.
 */
async function nomiServizi() {
  const f = path.join(CARTELLA, 'intake', 'testi.json');
  if (!existsSync(f)) return {};
  const testi = JSON.parse(await readFile(f, 'utf8'));
  return Object.fromEntries((testi.servizi || []).map((s) => [s.slug, s.nome]));
}

const daSlug = (slug) => {
  const s = slug.replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Nome dell'azienda, per la descrizione alternativa di ripiego.
 *
 * Letto da azienda.ts con una espressione regolare invece che con un import:
 * questo script gira in Node puro e azienda.ts è TypeScript.
 */
async function nomeAzienda() {
  const f = path.join(CARTELLA, 'azienda.ts');
  if (!existsSync(f)) return null;
  const m = (await readFile(f, 'utf8')).match(/nome:\s*'([^']+)'/);
  return m ? m[1] : null;
}

/* ------------------------------------------------------------------ slug */

const pulisci = (s) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* ------------------------------------------------------------------ main */

if (!existsSync(INTAKE)) {
  console.error(
    `\n  Manca src/clienti/${CLIENTE}/intake/foto/\n` +
      `  Serve una sottocartella per servizio, con dentro le foto grezze.\n` +
      `  Vedi INTAKE.md.\n`,
  );
  process.exit(1);
}

const nomi = await nomiServizi();
const azienda = await nomeAzienda();

const servizi = (await readdir(INTAKE, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

if (servizi.length === 0) {
  console.error(`\n  src/clienti/${CLIENTE}/intake/foto/ non ha sottocartelle.\n`);
  process.exit(1);
}

// La cartella di uscita si rifà da zero: una foto tolta dall'intake deve
// sparire anche da public, altrimenti resta pubblicata per sempre.
if (existsSync(USCITA)) await rm(USCITA, { recursive: true });
await mkdir(USCITA, { recursive: true });

const manifest = [];
const avvisi = [];
const altDiRipiego = [];

for (const servizio of servizi) {
  const dir = path.join(INTAKE, servizio);
  const servizioNome = nomi[servizio] || daSlug(servizio);

  // Descrizioni scritte a mano, se ci sono. Chiave: nome del file originale.
  //   { "IMG-20240612-WA0031.jpg": { "alt": "…", "slug": "…" } }
  const fileAlt = path.join(dir, 'alt.json');
  const descrizioni = existsSync(fileAlt)
    ? JSON.parse(await readFile(fileAlt, 'utf8'))
    : {};

  /*
    Immagini generate, non fotografie di lavori veri.

    Un file vuoto chiamato GENERATE dentro la cartella marca tutto il suo
    contenuto; la singola immagine si marca con "generata": true in alt.json.

    Serve perche' una bozza si mostra prima di avere le foto del cliente, ma
    l'hub promette pagine costruite sulle loro foto e non su un template: una
    immagine inventata non etichettata smentisce quella frase davanti a chi
    deve comprare. Il sito le dichiara in pagina, e alla consegna vengono
    sostituite dalle foto vere.
  */
  const cartellaGenerata = existsSync(path.join(dir, 'GENERATE'));

  const file = (await readdir(dir))
    .filter((f) => ESTENSIONI.has(path.extname(f).toLowerCase()))
    .sort();

  let n = 0;
  for (const nomeFile of file) {
    const originale = path.join(dir, nomeFile);
    const img = sharp(originale);
    const meta = await img.metadata();

    if (!meta.width || meta.width < LARGHEZZA_MINIMA) {
      avvisi.push(
        `  scartata ${servizio}/${nomeFile}: ${meta.width || '?'}px di larghezza`,
      );
      continue;
    }

    n += 1;
    const scelta = descrizioni[nomeFile] || {};
    const slug = scelta.slug
      ? `${servizio}-${pulisci(scelta.slug)}`
      : `${servizio}-${String(n).padStart(2, '0')}`;

    let alt = scelta.alt;
    if (!alt) {
      alt = azienda ? `${servizioNome} realizzata da ${azienda}` : servizioNome;
      altDiRipiego.push(`${servizio}/${nomeFile}`);
    }

    // Mai ingrandire: una foto da 900px non diventa da 1600.
    const larghezze = LARGHEZZE.filter((w) => w <= meta.width);
    if (larghezze.length === 0) larghezze.push(meta.width);

    for (const w of larghezze) {
      const ridotta = img.clone().resize({ width: w, withoutEnlargement: true });
      await ridotta
        .clone()
        .avif({ quality: 52 })
        .toFile(path.join(USCITA, `${slug}-${w}.avif`));
      await ridotta
        .clone()
        .webp({ quality: 76 })
        .toFile(path.join(USCITA, `${slug}-${w}.webp`));
    }

    manifest.push({
      slug,
      servizio,
      servizioNome,
      cantiere: scelta.cantiere ?? null,
      generata: scelta.generata ?? cartellaGenerata,
      alt,
      w: meta.width,
      h: meta.height,
      larghezze,
      originale: nomeFile,
    });
  }

  if (n < FOTO_MINIME_PER_SERVIZIO) {
    avvisi.push(
      `  ${servizio}: solo ${n} foto (minimo consigliato ${FOTO_MINIME_PER_SERVIZIO}) — da chiedere al cliente`,
    );
  }
}

const ts = `// Generato da scripts/intake-foto.mjs — non modificare a mano.
// Cliente: ${CLIENTE}. Sorgente: src/clienti/${CLIENTE}/intake/foto/
//
// Le descrizioni alternative si scrivono in intake/foto/<servizio>/alt.json,
// non qui: questo file viene riscritto a ogni passaggio dello script.

export type Foto = {
  slug: string;
  servizio: string;
  servizioNome: string;
  cantiere: string | null;
  /** true se l'immagine e' generata e non una foto di un lavoro vero. */
  generata?: boolean;
  alt: string;
  w: number;
  h: number;
  larghezze: number[];
  originale: string;
};

export const FOTO: Foto[] = ${JSON.stringify(manifest, null, 1)};

/**
 * Quante immagini di questa build sono generate invece che fotografate.
 * Il sito lo dichiara in pagina quando e' maggiore di zero.
 */
export const IMMAGINI_GENERATE: number = ${manifest.filter((f) => f.generata).length};

export const fotoPerServizio = (servizio: string): Foto[] =>
  FOTO.filter((f) => f.servizio === servizio);

/**
 * Foto scelta a mano per slug, con ripiego sulla prima del servizio indicato.
 * Il ripiego evita che una foto rinominata faccia esplodere la pagina.
 */
export function foto(slug: string, ripiegoServizio?: string): Foto {
  const trovata = FOTO.find((f) => f.slug === slug);
  if (trovata) return trovata;
  if (ripiegoServizio) {
    const alternativa = FOTO.find((f) => f.servizio === ripiegoServizio);
    if (alternativa) return alternativa;
  }
  return FOTO[0];
}
`;

await writeFile(path.join(CARTELLA, 'foto.ts'), ts, 'utf8');

console.log(`\n  ${manifest.length} foto pubblicate in public/foto/${CLIENTE}/`);
console.log(`  ${servizi.length} servizi, manifest in src/clienti/${CLIENTE}/foto.ts`);

if (altDiRipiego.length) {
  console.log(
    `\n  ${altDiRipiego.length} foto su ${manifest.length} hanno la descrizione\n` +
      `  alternativa generica. Non è un errore bloccante, ma è esattamente\n` +
      `  l'errore del vecchio sito (340 alt su 583 uguali al nome del file).\n` +
      `  Si correggono in intake/foto/<servizio>/alt.json.`,
  );
}
const generate = manifest.filter((f) => f.generata).length;
if (generate) {
  console.log(
    `
  ${generate} immagini su ${manifest.length} sono marcate come generate.
` +
      `  Il sito lo dichiara in pagina finche' restano. Vanno sostituite con
` +
      `  fotografie vere prima di andare online.`,
  );
}
if (avvisi.length) console.log('\n' + avvisi.join('\n'));
console.log('');
