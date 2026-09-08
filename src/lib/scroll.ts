import type Lenis from 'lenis';

/**
 * Riferimento all'istanza Lenis montata dal layout radice.
 *
 * Lenis scorre l'elemento <html>, non <body>: mettere `overflow: hidden` sul
 * body non blocca niente. Chi deve bloccare lo scorrimento — il menu a tutto
 * schermo — deve fermare Lenis, e chi deve portare un elemento in vista deve
 * chiederlo a Lenis invece di usare scrollIntoView, che verrebbe sovrascritto
 * dal ciclo di animazione al frame successivo.
 */
let istanza: Lenis | null = null;

export function registraLenis(l: Lenis | null) {
  istanza = l;
}

export function bloccaScorrimento(bloccato: boolean) {
  if (istanza) {
    if (bloccato) istanza.stop();
    else istanza.start();
  }
  // Senza Lenis (prefers-reduced-motion) il blocco resta quello nativo.
  document.documentElement.classList.toggle('scorrimento-bloccato', bloccato);
}

/** Porta un elemento sotto l'intestazione fissa, con o senza Lenis. */
export function portaInVista(elemento: Element | null, offset = -88) {
  if (!elemento) return;
  if (istanza) {
    istanza.scrollTo(elemento as HTMLElement, { offset });
    return;
  }
  elemento.scrollIntoView({ block: 'start' });
}
