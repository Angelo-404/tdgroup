/**
 * Genera src/data/servizi.ts dai testi reali estratti da tdgroupsrls.it.
 *
 * Non riscrive nulla: ripulisce la navigazione, separa titolo, introduzione,
 * corpo e call to action, e corregge gli slug con refuso.
 *
 *   node scripts/build-servizi.mjs
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SCRAPED = path.resolve(ROOT, '..', 'scraped');

// slug scrapato -> slug corretto. I due refusi sono già indicizzati:
// vanno serviti con un redirect 301, non semplicemente rinominati.
const SERVIZI = [
  {
    src: 'ristrutturazioni',
    slug: 'ristrutturazioni',
    nome: 'Ristrutturazioni',
    titolo: 'Ristrutturazioni chiavi in mano',
    ctaWhatsapp: 'Salve, vorrei un preventivo per una ristrutturazione.',
  },
  {
    src: 'isolamento-a-cappotto',
    slug: 'isolamento-a-cappotto',
    nome: 'Isolamento a cappotto',
    titolo: 'Isolamento termico a cappotto',
    ctaWhatsapp: 'Salve, vorrei un preventivo per un cappotto termico.',
  },
  {
    src: 'ristrutturazione-bagni',
    slug: 'ristrutturazione-bagni',
    nome: 'Ristrutturazione bagni',
    titolo: 'Ristrutturazione bagni',
    ctaWhatsapp: 'Salve, vorrei un preventivo per rifare il bagno.',
  },
  {
    src: 'tetti',
    slug: 'tetti',
    nome: 'Tetti',
    titolo: 'Tetti e tettoie',
    ctaWhatsapp: 'Salve, vorrei una verifica del tetto.',
  },
  {
    src: 'pareti-e-soffitti-in-cartongesso',
    slug: 'pareti-e-soffitti-in-cartongesso',
    nome: 'Cartongesso',
    titolo: 'Pareti e soffitti in cartongesso',
    ctaWhatsapp: 'Salve, vorrei un preventivo per un lavoro in cartongesso.',
  },
  {
    src: 'tinteggiatura-interna-ed-esterna',
    slug: 'tinteggiatura-interna-ed-esterna',
    nome: 'Tinteggiatura',
    titolo: 'Tinteggiatura interna ed esterna',
    ctaWhatsapp: 'Salve, vorrei un preventivo per una tinteggiatura.',
  },
  {
    src: 'pitture-di-interior-design',
    slug: 'pitture-di-interior-design',
    nome: 'Pitture decorative',
    titolo: 'Pitture di interior design',
    ctaWhatsapp: 'Salve, vorrei informazioni sulle pitture decorative.',
  },
  {
    src: 'pova-pavimenti-e-rivestimenti', // refuso nel sito attuale: "pova"
    slug: 'posa-pavimenti-e-rivestimenti',
    slugVecchio: 'pova-pavimenti-e-rivestimenti',
    nome: 'Pavimenti e rivestimenti',
    titolo: 'Posa pavimenti e rivestimenti',
    ctaWhatsapp: 'Salve, vorrei un preventivo per la posa di un pavimento.',
  },
  {
    src: 'serrmanenti-infissi-e-porte-interne', // refuso: "serrmanenti"
    slug: 'serramenti-infissi-e-porte-interne',
    slugVecchio: 'serrmanenti-infissi-e-porte-interne',
    nome: 'Serramenti e infissi',
    titolo: 'Serramenti, infissi e porte interne',
    ctaWhatsapp: 'Salve, vorrei un preventivo per nuovi serramenti.',
  },
];

const RUMORE = [
  /- TDGROUP SRLS/i,
  /^SERVIZI OFFERTI/i,
  /^Vai al contenuto$/i,
  /^CONTATTA/i,
  /^HOMEPAGE$/i,
];

const pulisci = (righe) =>
  righe.filter((r) => r.trim() && !RUMORE.some((re) => re.test(r)));

/**
 * Titolo ripetuto in testa al corpo, es. "TETTI e TETTOIE": quasi tutto
 * maiuscolo, poche parole. Va tolto, il titolo lo mette la pagina.
 */
function isTitoloRipetuto(r) {
  if (r.split(/\s+/).length > 8) return false;
  const lettere = r.replace(/[^a-zA-Zàèéìòù]/g, '');
  if (lettere.length < 3) return false;
  const maiuscole = lettere.replace(/[^A-Z]/g, '').length;
  return maiuscole / lettere.length > 0.7;
}

/**
 * Sottotitolo dentro al corpo, es. "Cappotto esterno", "I vantaggi del
 * cappotto termico": riga breve, senza punteggiatura finale. Va reso come
 * intestazione, non come paragrafo.
 */
const isSottotitolo = (r) =>
  r.length < 70 && r.split(/\s+/).length <= 8 && !/[.:;!?]$/.test(r);

async function main() {
  const testi = JSON.parse(
    await readFile(path.join(SCRAPED, 'contenuti_reali.json'), 'utf8'),
  );

  const out = SERVIZI.map((s) => {
    let righe = pulisci(testi[s.src] ?? []);
    while (righe.length && isTitoloRipetuto(righe[0])) righe = righe.slice(1);

    // La CTA originale chiude l'ultimo paragrafo, marcata con 👉.
    let cta = null;
    righe = righe.map((r) => {
      const i = r.indexOf('\u{1F449}');
      if (i === -1) return r;
      cta = r.slice(i + 2).trim();
      return r.slice(0, i).trim();
    });
    righe = righe.filter(Boolean);

    // Se la CTA è un blocco lungo, la prima frase basta come pulsante.
    if (cta && cta.length > 90) {
      const punto = cta.search(/[.:!?]\s/);
      if (punto > 20) cta = cta.slice(0, punto + 1).trim();
    }

    const [intro, ...resto] = righe;
    const corpo = resto.map((testo) => ({
      tipo: isSottotitolo(testo) ? 'h' : 'p',
      testo,
    }));

    return {
      slug: s.slug,
      slugVecchio: s.slugVecchio ?? null,
      nome: s.nome,
      titolo: s.titolo,
      intro,
      corpo,
      cta: cta ?? 'Chiedici un preventivo.',
      ctaWhatsapp: s.ctaWhatsapp,
      // Le foto sono ancora indicizzate con lo slug scrapato.
      chiaveFoto: s.src,
    };
  });

  const ts = `// Generato da scripts/build-servizi.mjs — non modificare a mano.
// Testi presi dal sito esistente tdgroupsrls.it, ripuliti dalla navigazione.
// Gli slug con refuso ("pova", "serrmanenti") sono corretti qui e vanno serviti
// con un redirect 301 dalla vecchia URL: vedi next.config.mjs.

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

export const SERVIZI: Servizio[] = ${JSON.stringify(out, null, 1)};

export const servizioBySlug = (slug: string): Servizio | undefined =>
  SERVIZI.find((s) => s.slug === slug);
`;

  await mkdir(path.join(ROOT, 'src', 'data'), { recursive: true });
  await writeFile(path.join(ROOT, 'src', 'data', 'servizi.ts'), ts, 'utf8');

  // next.config.mjs non puo importare TypeScript: i redirect escono in JSON.
  const redirects = out.flatMap((s) => {
    const regole = [
      { source: `/${s.slug}`, destination: `/servizi/${s.slug}`, permanent: true },
    ];
    if (s.slugVecchio) {
      regole.push({
        source: `/${s.slugVecchio}`,
        destination: `/servizi/${s.slug}`,
        permanent: true,
      });
    }
    return regole;
  });
  redirects.push(
    { source: '/home-prova-1', destination: '/', permanent: true },
    { source: '/contact', destination: '/contatti', permanent: true },
  );
  await writeFile(
    path.join(ROOT, 'src', 'data', 'redirects.json'),
    `${JSON.stringify(redirects, null, 1)}
`,
    'utf8',
  );
  console.log(`${redirects.length} redirect 301 in src/data/redirects.json`);

  for (const s of out) {
    const parole = [s.intro, ...s.corpo.map((b) => b.testo)].join(' ').split(/\s+/).length;
    const h = s.corpo.filter((b) => b.tipo === 'h').length;
    console.log(
      `${s.slug.padEnd(38)} ${String(s.corpo.length + 1).padStart(2)} blocchi (${h} titoli) ${String(parole).padStart(4)} parole | ${s.cta.slice(0, 45)}`,
    );
  }
  console.log(`\n${out.length} servizi scritti in src/data/servizi.ts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
