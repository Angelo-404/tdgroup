/**
 * Dai testi raccolti dal cliente alle pagine servizio.
 *
 * Sostituisce build-servizi.mjs, che leggeva lo scrape di tdgroupsrls.it e
 * aveva l'elenco dei servizi scritto dentro lo script. Qui l'elenco sta in
 * un file di dati del cliente, e lo script non sa nulla di chi lo usa.
 *
 *   src/clienti/<cliente>/intake/testi.json
 *
 * Un cliente che il sito non ce l'ha compila quel file a mano: è il motivo
 * per cui esiste. Uno che ce l'ha lo fa riempire dallo scrape, ma il formato
 * di arrivo resta questo.
 *
 *   CLIENTE=rossi-edile node scripts/intake-servizi.mjs
 *
 * Produce:
 *   src/clienti/<cliente>/servizi.ts
 *   src/clienti/<cliente>/redirects.json   (solo se c'era un sito prima)
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CLIENTE = process.env.CLIENTE || 'tdgroup';
const CARTELLA = path.join(ROOT, 'src', 'clienti', CLIENTE);
const SORGENTE = path.join(CARTELLA, 'intake', 'testi.json');

if (!existsSync(SORGENTE)) {
  console.error(
    `\n  Manca src/clienti/${CLIENTE}/intake/testi.json\n` +
      `  Vedi INTAKE.md per il formato e per cosa chiedere al cliente.\n`,
  );
  process.exit(1);
}

const testi = JSON.parse(await readFile(SORGENTE, 'utf8'));
const servizi = testi.servizi || [];

if (servizi.length === 0) {
  console.error(`\n  testi.json non contiene servizi.\n`);
  process.exit(1);
}

/* ------------------------------------------------------------ validazione */

// Meglio fermarsi qui che scoprire il buco in riunione davanti al cliente.
const OBBLIGATORI = ['slug', 'nome', 'titolo', 'intro'];
const problemi = [];

for (const [i, s] of servizi.entries()) {
  for (const campo of OBBLIGATORI) {
    if (!s[campo]) problemi.push(`  servizio ${i + 1}: manca "${campo}"`);
  }
  if (s.slug && !/^[a-z0-9-]+$/.test(s.slug)) {
    problemi.push(`  servizio ${i + 1}: slug "${s.slug}" non valido (solo a-z, 0-9, trattini)`);
  }
}

const slugVisti = new Set();
for (const s of servizi) {
  if (slugVisti.has(s.slug)) problemi.push(`  slug ripetuto: "${s.slug}"`);
  slugVisti.add(s.slug);
}

if (problemi.length) {
  console.error('\n' + problemi.join('\n') + '\n');
  process.exit(1);
}

/* ------------------------------------------------------------ conversione */

/**
 * Il corpo si scrive come lista di stringhe, che è quello che uno fa
 * naturalmente copiando i paragrafi. I titoli intermedi si segnano con "# ".
 * La forma lunga `{ tipo, testo }` resta accettata: lo scrape la produce già.
 */
const normalizzaCorpo = (corpo) =>
  (corpo || []).map((b) =>
    typeof b === 'string'
      ? b.startsWith('# ')
        ? { tipo: 'h', testo: b.slice(2).trim() }
        : { tipo: 'p', testo: b }
      : b,
  );

const finali = servizi.map((s) => ({
  slug: s.slug,
  slugVecchio: s.slugVecchio ?? null,
  nome: s.nome,
  titolo: s.titolo,
  intro: s.intro,
  corpo: normalizzaCorpo(s.corpo),
  cta: s.cta ?? '',
  ctaWhatsapp: s.ctaWhatsapp ?? `Salve, vorrei un preventivo per ${s.nome.toLowerCase()}.`,
  // Senza indicazione, le foto del servizio stanno nella cartella che porta
  // il suo stesso slug. È l'unico caso che si presenta per un cliente nuovo:
  // chiaveFoto serve solo a chi eredita cartelle con il nome vecchio.
  chiaveFoto: s.chiaveFoto ?? s.slug,
}));

const ts = `// Generato da scripts/intake-servizi.mjs — non modificare a mano.
// Cliente: ${CLIENTE}. Sorgente: src/clienti/${CLIENTE}/intake/testi.json

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

export const SERVIZI: Servizio[] = ${JSON.stringify(finali, null, 1)};

export const servizioBySlug = (slug: string): Servizio | undefined =>
  SERVIZI.find((s) => s.slug === slug);
`;

await writeFile(path.join(CARTELLA, 'servizi.ts'), ts, 'utf8');

/* -------------------------------------------------------------- redirect */

/*
  I redirect esistono solo per chi aveva un sito prima: sono il modo di non
  buttare via il posizionamento già guadagnato dalle vecchie URL.

  Per un cliente nuovo l'elenco è vuoto e il file non viene nemmeno scritto:
  next.config.mjs sa già che l'assenza non è un errore.
*/
const redirect = [];

for (const s of finali) {
  // La vecchia URL era in radice, la nuova sta sotto /servizi/.
  redirect.push({ source: `/${s.slug}`, destination: `/servizi/${s.slug}`, permanent: true });
  if (s.slugVecchio && s.slugVecchio !== s.slug) {
    redirect.push({
      source: `/${s.slugVecchio}`,
      destination: `/servizi/${s.slug}`,
      permanent: true,
    });
  }
}

// Redirect scritti a mano, per le pagine che non sono servizi.
for (const r of testi.redirect || []) {
  redirect.push({ source: r.source, destination: r.destination, permanent: true });
}

if (redirect.length > 0 && testi.sitoPrecedente !== false) {
  await writeFile(
    path.join(CARTELLA, 'redirects.json'),
    JSON.stringify(redirect, null, 1) + '\n',
    'utf8',
  );
}

console.log(`\n  ${finali.length} servizi in src/clienti/${CLIENTE}/servizi.ts`);
if (redirect.length && testi.sitoPrecedente !== false) {
  console.log(`  ${redirect.length} redirect in src/clienti/${CLIENTE}/redirects.json`);
} else {
  console.log('  nessun redirect: cliente senza sito precedente');
}

const senzaCorpo = finali.filter((s) => s.corpo.length === 0).map((s) => s.slug);
if (senzaCorpo.length) {
  console.log(
    `\n  Solo introduzione, nessun corpo: ${senzaCorpo.join(', ')}\n` +
      `  La pagina regge, ma su Google pesa poco. Da chiedere al cliente.`,
  );
}
console.log('');
