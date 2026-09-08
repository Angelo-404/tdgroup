/**
 * Sceglie di quale cliente montare il sito e genera src/data/cliente.ts.
 *
 * I componenti non importano mai da src/clienti/<slug>/: importano da
 * '@/data/cliente', che è un semplice ponte verso la cartella del cliente
 * scelto. Cambiare cliente vuol dire riscrivere quel ponte, non toccare
 * ventisette componenti.
 *
 *   CLIENTE=rossi-edile node scripts/usa-cliente.mjs
 *
 * Senza la variabile d'ambiente si monta 'tdgroup'. Lo script gira da solo
 * prima di `npm run dev` e `npm run build` (vedi package.json), quindi in
 * condizioni normali non serve lanciarlo a mano.
 */

import { writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CLIENTE = process.env.CLIENTE || 'tdgroup';
const CARTELLA = path.join(ROOT, 'src', 'clienti', CLIENTE);

// I quattro file che ogni cliente deve avere. Se ne manca uno la build si
// ferma qui, con il nome del file: molto meglio di venti errori di TypeScript
// su import irrisolti.
const RICHIESTI = [
  'azienda.ts',
  'servizi.ts',
  'contenuti.ts',
  'foto.ts',
  'livelli-testi.ts',
  'hub-testi.ts',
];

for (const file of RICHIESTI) {
  try {
    await access(path.join(CARTELLA, file));
  } catch {
    console.error(
      `\n  Cliente "${CLIENTE}": manca src/clienti/${CLIENTE}/${file}\n` +
        `  Vedi INTAKE.md per cosa serve e come si riempie.\n`,
    );
    process.exit(1);
  }
}

const contenuto = `// Generato da scripts/usa-cliente.mjs — non modificare a mano.
// Cliente montato: ${CLIENTE}
//
// Cambia cliente con:  CLIENTE=<slug> npm run dev
//
// Tutto ciò che è specifico di un cliente passa da qui. Ciò che è uguale per
// tutti (livelli, offerta, fornitore, stime) resta in src/data/ e si importa
// direttamente.

export * from '@/clienti/${CLIENTE}/azienda';
export * from '@/clienti/${CLIENTE}/servizi';
export * from '@/clienti/${CLIENTE}/contenuti';
export * from '@/clienti/${CLIENTE}/foto';
export * from '@/clienti/${CLIENTE}/livelli-testi';
export * from '@/clienti/${CLIENTE}/hub-testi';

/** Slug del cliente montato in questa build. */
export const CLIENTE = '${CLIENTE}';

/**
 * Cartella pubblica delle foto di questo cliente.
 *
 * Le foto stanno in public/foto/<cliente>/ e non in public/foto/: con più
 * clienti nella stessa repo, una cartella piatta farebbe spedire a ognuno
 * anche le foto degli altri.
 */
export const BASE_FOTO = '/foto/${CLIENTE}';
`;

await writeFile(path.join(ROOT, 'src', 'data', 'cliente.ts'), contenuto, 'utf8');
console.log(`cliente montato: ${CLIENTE}`);
