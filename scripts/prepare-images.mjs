/**
 * Pipeline immagini TD Group.
 *
 * Legge le foto originali scaricate dal sito esistente (../scraped/media),
 * scarta lo stock del tema Astra, assegna a ogni foto un servizio e un nome
 * semantico, genera AVIF + WebP a tre larghezze e scrive il manifest
 * src/data/foto.ts.
 *
 *   node scripts/prepare-images.mjs
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SCRAPED = path.resolve(ROOT, '..', 'scraped');
const SRC_DIR = path.join(SCRAPED, 'media');
const OUT_DIR = path.join(ROOT, 'public', 'foto');
const WIDTHS = [480, 960, 1600];

/* --------------------------------------------------------------- esclusioni */

// Foto stock del tema Astra e logo del designer fittizio "Kyle Mills".
// Non sono lavori di TD Group: non devono finire nel sito.
const STOCK =
  /^(apartment-blinds|architectural-photography|bed-with-white|black-wooden|brown-wooden|business-clean|cozy-modern|flat-screen|gray-dining|kitchen-and-dining|photo-of-bedroom|photo-of-mirrors|rectangular-white|two-chairs|well-dressed|white-bathroom|white-floor-rug|white-wooden-cup|woman-in|woman-wearing|bathtub-rk4|office-table-rk4|white-wall-rk4|km-logo)/i;

const LOGO = /logo-solo-casa/i;
const RASTER = /\.(jpe?g|png|webp)$/i;

/* ------------------------------------------------------- servizi e soggetti */

const SERVIZI = {
  'isolamento-a-cappotto': { corto: 'cappotto', nome: 'Isolamento a cappotto' },
  'pareti-e-soffitti-in-cartongesso': { corto: 'cartongesso', nome: 'Pareti e soffitti in cartongesso' },
  'pitture-di-interior-design': { corto: 'pitture', nome: 'Pitture di interior design' },
  'pova-pavimenti-e-rivestimenti': { corto: 'pavimenti', nome: 'Posa pavimenti e rivestimenti' },
  'ristrutturazione-bagni': { corto: 'bagni', nome: 'Ristrutturazione bagni' },
  ristrutturazioni: { corto: 'ristrutturazioni', nome: 'Ristrutturazioni' },
  'serrmanenti-infissi-e-porte-interne': { corto: 'serramenti', nome: 'Serramenti, infissi e porte interne' },
  tetti: { corto: 'tetti', nome: 'Tetti e tettoie' },
  'tinteggiatura-interna-ed-esterna': { corto: 'tinteggiatura', nome: 'Tinteggiatura interna ed esterna' },
  'chi-siamo': { corto: 'cantiere', nome: 'Lavoro di ristrutturazione' },
};

// Una foto usata su più pagine viene attribuita al servizio più specifico.
// "chi-siamo" e la home sono generiche: perdono sempre.
const PRIORITA = [
  'serrmanenti-infissi-e-porte-interne',
  'isolamento-a-cappotto',
  'ristrutturazione-bagni',
  'tetti',
  'pareti-e-soffitti-in-cartongesso',
  'pova-pavimenti-e-rivestimenti',
  'pitture-di-interior-design',
  'tinteggiatura-interna-ed-esterna',
  'ristrutturazioni',
  'chi-siamo',
];

// Token riconoscibili nei nomi file originali -> soggetto, genere e cantiere.
// Ricavati leggendo i 583 nomi reali della libreria.
// Il genere serve a far concordare il participio nell'alt text:
// m -> realizzato, f -> realizzata, mp -> realizzati, fp -> realizzate.
const TOKEN = [
  [/porta-blindata-ed-interna/i, 'porta blindata e porta interna', 'fp', null],
  [/porta-blindata/i, 'porta blindata', 'f', null],
  [/porta-vetrata/i, 'porta a vetri', 'f', null],
  [/porte-interne|porta-interna/i, 'porte interne', 'fp', null],
  [/porta-bagno/i, 'porta del bagno', 'f', null],
  [/cartongesso-spogliatoio/i, 'controsoffitto in cartongesso di uno spogliatoio', 'm', null],
  [/cartongesso-stuccato/i, 'cartongesso stuccato', 'm', null],
  [/cartongesso/i, 'lavorazione in cartongesso', 'f', null],
  [/kiro-soffitto/i, 'controsoffitto in cartongesso', 'm', 'Kiro'],
  [/parete\d*/i, 'parete in cartongesso', 'f', null],
  [/tetto-bonus-sisma-e-cappotto/i, 'rifacimento del tetto con cappotto termico', 'm', null],
  [/carpenteria/i, 'carpenteria del tetto', 'f', null],
  [/galletti/i, 'rifacimento del tetto', 'm', 'Galletti'],
  [/tetto/i, 'tetto', 'm', null],
  [/terrazza/i, 'terrazza impermeabilizzata', 'f', null],
  [/pietro/i, 'cappotto termico esterno', 'm', 'Pietro'],
  [/cappotto/i, 'cappotto termico', 'm', null],
  [/facciata/i, 'facciata tinteggiata', 'f', null],
  [/esperno-piazza|esterno-casa/i, 'esterno tinteggiato', 'm', null],
  [/interno-casa|intern-finito/i, 'interno finito', 'm', null],
  [/caminetto/i, 'caminetto', 'm', null],
  [/loft-donna|loft-interno/i, 'loft', 'm', null],
  [/pavimento-e-porta/i, 'pavimento e porta', 'mp', null],
  [/pavimento-bagno/i, 'pavimento del bagno', 'm', null],
  [/pavimento/i, 'pavimento', 'm', null],
  [/ottica-bonora|bonora/i, 'allestimento interno', 'm', 'Ottica Bonora'],
  [/impulse/i, 'interno commerciale', 'm', 'Impulse'],
  [/mensa\d*/i, 'mensa aziendale', 'f', null],
  [/ufficio/i, 'ufficio', 'm', null],
  [/argnani/i, 'bagno ristrutturato', 'm', 'Argnani'],
  [/bagno/i, 'bagno ristrutturato', 'm', null],
  [/ofelia/i, 'salone ristrutturato', 'm', 'Ofelia'],
  [/franchi-elisabetta/i, 'interno ristrutturato', 'm', 'Franchi'],
  [/art-e-solving/i, 'interno commerciale', 'm', 'Art e Solving'],
  [/nobili/i, 'interno ristrutturato', 'm', 'Nobili'],
  [/gemini_generated/i, 'visuale di progetto', 'f', null],
];

// Genere del nome usato come ripiego quando nessun token corrisponde:
// è il nome del servizio, quindi lo dichiariamo una volta sola.
const GENERE_SERVIZIO = {
  'isolamento-a-cappotto': 'm',
  'pareti-e-soffitti-in-cartongesso': 'fp',
  'pitture-di-interior-design': 'fp',
  'pova-pavimenti-e-rivestimenti': 'f',
  'ristrutturazione-bagni': 'f',
  ristrutturazioni: 'fp',
  'serrmanenti-infissi-e-porte-interne': 'mp',
  tetti: 'mp',
  'tinteggiatura-interna-ed-esterna': 'f',
  'chi-siamo': 'm',
};

const PARTICIPIO = { m: 'realizzato', f: 'realizzata', mp: 'realizzati', fp: 'realizzate' };

/* ------------------------------------------------------------------ utility */

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function descrivi(file, servizio) {
  for (const [re, soggetto, genere, cantiere] of TOKEN) {
    if (re.test(file)) return { soggetto, genere, cantiere };
  }
  return {
    soggetto: SERVIZI[servizio].nome.toLowerCase(),
    genere: GENERE_SERVIZIO[servizio] ?? 'm',
    cantiere: null,
  };
}

/* --------------------------------------------------------------------- main */

async function main() {
  const idx = JSON.parse(await readFile(path.join(SCRAPED, 'images_index.json'), 'utf8'));

  // nome file originale -> insieme di pagine che lo usano
  const pagine = new Map();
  for (const [url, slugs] of Object.entries(idx)) {
    if (!url.includes('/uploads/')) continue;
    const base = decodeURIComponent(url.split('/').pop()).replace(
      /-\d{2,4}x\d{2,4}(\.[a-z]+)$/i,
      '$1',
    );
    if (!pagine.has(base)) pagine.set(base, new Set());
    for (const s of slugs) pagine.get(base).add(s);
  }

  const tutti = (await readdir(SRC_DIR)).filter(
    (f) => RASTER.test(f) && !STOCK.test(f) && !LOGO.test(f),
  );

  await mkdir(OUT_DIR, { recursive: true });

  const manifest = [];
  const contatori = new Map();
  let saltate = 0;
  let fatte = 0;

  for (const file of tutti) {
    const usata = pagine.get(file) ?? new Set();
    const servizio = PRIORITA.find((s) => usata.has(s)) ?? null;

    // Foto mai referenziata da una pagina servizio: resta disponibile in
    // libreria ma non entra nel manifest di Fase 1.
    if (!servizio) {
      saltate += 1;
      continue;
    }

    const { corto, nome } = SERVIZI[servizio];
    const { soggetto, genere, cantiere } = descrivi(file, servizio);

    const chiave = `${corto}-${slugify(soggetto)}`;
    const n = (contatori.get(chiave) ?? 0) + 1;
    contatori.set(chiave, n);
    const slug = `${chiave}-${String(n).padStart(2, '0')}`;

    const src = path.join(SRC_DIR, file);
    let meta;
    try {
      meta = await sharp(src).metadata();
    } catch (e) {
      console.warn(`  ! illeggibile ${file}: ${e.message}`);
      continue;
    }
    if (!meta.width || !meta.height) continue;

    const varianti = [];
    for (const w of WIDTHS) {
      if (w > meta.width && w !== WIDTHS[0]) continue; // mai ingrandire
      const larghezza = Math.min(w, meta.width);
      for (const [fmt, opts] of [
        ['avif', { quality: 58, effort: 4 }],
        ['webp', { quality: 74 }],
      ]) {
        const out = path.join(OUT_DIR, `${slug}-${larghezza}.${fmt}`);
        if (!existsSync(out)) {
          await sharp(src)
            .rotate()
            .resize({ width: larghezza, withoutEnlargement: true })
            .toFormat(fmt, opts)
            .toFile(out);
        }
        varianti.push({ w: larghezza, fmt });
      }
    }

    const maiusc = `${soggetto.charAt(0).toUpperCase()}${soggetto.slice(1)}`;
    const alt = cantiere
      ? `${maiusc} — cantiere ${cantiere}, TD Group`
      : `${maiusc} ${PARTICIPIO[genere]} da TD Group`;

    manifest.push({
      slug,
      servizio,
      servizioNome: nome,
      cantiere,
      alt,
      w: meta.width,
      h: meta.height,
      larghezze: [...new Set(varianti.map((v) => v.w))].sort((a, b) => a - b),
      originale: file,
    });

    fatte += 1;
    if (fatte % 25 === 0) console.log(`  ${fatte} foto elaborate…`);
  }

  manifest.sort((a, b) => a.slug.localeCompare(b.slug));

  const ts = `// Generato da scripts/prepare-images.mjs — non modificare a mano.
// Foto reali dei cantieri TD Group, scaricate dal sito esistente e ottimizzate.

export type Foto = {
  slug: string;
  servizio: string;
  servizioNome: string;
  cantiere: string | null;
  alt: string;
  w: number;
  h: number;
  larghezze: number[];
  originale: string;
};

export const FOTO: Foto[] = ${JSON.stringify(manifest, null, 1)};

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

  await mkdir(path.join(ROOT, 'src', 'data'), { recursive: true });
  await writeFile(path.join(ROOT, 'src', 'data', 'foto.ts'), ts, 'utf8');

  const perServizio = {};
  for (const f of manifest) perServizio[f.servizio] = (perServizio[f.servizio] ?? 0) + 1;

  console.log(`\nfoto nel manifest : ${manifest.length}`);
  console.log(`non attribuite    : ${saltate} (restano in scraped/media)`);
  console.log('per servizio      :', perServizio);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
