// Generato da scripts/usa-cliente.mjs — non modificare a mano.
// Cliente montato: arcobaleno
//
// Cambia cliente con:  CLIENTE=<slug> npm run dev
//
// Tutto ciò che è specifico di un cliente passa da qui. Ciò che è uguale per
// tutti (livelli, offerta, fornitore, stime) resta in src/data/ e si importa
// direttamente.

export * from '@/clienti/arcobaleno/azienda';
export * from '@/clienti/arcobaleno/servizi';
export * from '@/clienti/arcobaleno/contenuti';
export * from '@/clienti/arcobaleno/foto';
export * from '@/clienti/arcobaleno/livelli-testi';
export * from '@/clienti/arcobaleno/hub-testi';

/** Slug del cliente montato in questa build. */
export const CLIENTE = 'arcobaleno';

/**
 * Cartella pubblica delle foto di questo cliente.
 *
 * Le foto stanno in public/foto/<cliente>/ e non in public/foto/: con più
 * clienti nella stessa repo, una cartella piatta farebbe spedire a ognuno
 * anche le foto degli altri.
 */
export const BASE_FOTO = '/foto/arcobaleno';
