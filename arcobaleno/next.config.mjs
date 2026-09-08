import { readFileSync } from 'node:fs';

/**
 * Redirect permanenti dal vecchio sito WordPress.
 *
 * `permanent: true` fa emettere a Next un 308, non un 301: la differenza è
 * che il 308 conserva il metodo HTTP. Google li tratta allo stesso modo e
 * trasferisce il posizionamento in entrambi i casi.
 *
 * L'elenco è generato da scripts/intake-servizi.mjs in
 * src/clienti/<cliente>/redirects.json, perché questo file non può importare
 * TypeScript. Il cliente lo sceglie CLIENTE, come per il resto della build.
 *
 * Un cliente senza sito precedente non ha nulla da redirigere: se il file
 * manca, l'elenco resta vuoto e non è un errore.
 *
 * Servono in Fase 2, quando il progetto sostituisce tdgroupsrls.it. In Fase 1
 * sono innocui: le rotte /servizi/* non esistono ancora.
 *
 * Le pagine demo del tema Astra (/about, /services, /projects, /testimonials,
 * /portfolio, /sample-page, /hello-world, /category/uncategorized) NON vanno
 * redirette: vanno rimosse con un 410. Non hanno un corrispettivo qui e il
 * loro contenuto è inventato. Vedi AUDIT.md §3.3.
 */
const CLIENTE = process.env.CLIENTE || 'tdgroup';

let redirects = [];
try {
  redirects = JSON.parse(
    readFileSync(
      new URL(`./src/clienti/${CLIENTE}/redirects.json`, import.meta.url),
      'utf8',
    ),
  );
} catch {
  // Nessun redirects.json: cliente senza sito precedente. Va bene così.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `next build` e `next dev` scrivono nella stessa cartella: lanciare una
  // build a server acceso gli sfila i chunk da sotto i piedi e il dev risponde
  // 500 finché non si riavvia. `NEXT_DIST_DIR=.next-misura npm run build`
  // permette di misurare il peso delle pagine senza toccare il dev.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  async redirects() {
    return redirects;
  },

  async headers() {
    return [
      {
        // Le foto sono immutabili: il nome cambia se cambia il contenuto.
        source: '/foto/:percorso*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
