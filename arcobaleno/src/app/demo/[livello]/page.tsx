import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AvvisoImmagini from '@/components/AvvisoImmagini';
import { WhatsAppFlottante } from '@/components/Contatto';
import Footer from '@/components/Footer';
import Admin from '@/components/sezioni/Admin';
import AreaCliente from '@/components/sezioni/AreaCliente';
import Calcolatore from '@/components/sezioni/Calcolatore';
import Chiusura from '@/components/sezioni/Chiusura';
import ComeLavoriamo from '@/components/sezioni/ComeLavoriamo';
import Faq from '@/components/sezioni/Faq';
import Hero from '@/components/sezioni/Hero';
import Portfolio from '@/components/sezioni/Portfolio';
import Servizi from '@/components/sezioni/Servizi';
import Statistiche from '@/components/sezioni/Statistiche';
import Ticker from '@/components/sezioni/Ticker';
import Zone from '@/components/sezioni/Zone';
import { BLOCCHI_ESCLUSI } from '@/data/cliente';
import { LIVELLI, ORDINE_BLOCCHI, livelloBySlug } from '@/data/livelli';

export function generateStaticParams() {
  return LIVELLI.map((l) => ({ livello: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { livello: string };
}): Metadata {
  const livello = livelloBySlug(params.livello);
  if (!livello) return {};
  return {
    title: `${livello.nome} — anteprima ${livello.numero}`,
    description: livello.perChi,
  };
}

/**
 * Le tre demo sono la stessa pagina montata con blocchi diversi.
 *
 * L'elenco dei blocchi sta in src/data/livelli.ts, che alimenta anche la
 * tabella di confronto sull'hub: pagina e tabella non possono dire cose
 * diverse. I livelli sono cumulativi per costruzione.
 */
export default function Demo({ params }: { params: { livello: string } }) {
  const livello = livelloBySlug(params.livello);
  if (!livello) notFound();

  /*
    Un blocco si monta se il livello lo prevede E se il cliente non lo esclude.
    L'esclusione serve quando il blocco non ha senso per quel mestiere: il
    calcolatore, per dire, parte da fasce dell'edilizia residenziale.
  */
  const ha = (b: (typeof ORDINE_BLOCCHI)[number]) =>
    livello.blocchi.includes(b) && !BLOCCHI_ESCLUSI.includes(b);

  return (
    <main>
      {/* Non rende nulla quando le foto sono vere. Vedi AvvisoImmagini. */}
      <AvvisoImmagini />

      {ha('hero') && (
        // I titoli arrivano dal pacchetto testi del cliente: il merge lo fa
        // src/data/livelli.ts, qui si legge il livello e basta.
        <Hero titolo={livello.titoloHero} accento={livello.titoloHeroAccento} />
      )}
      {ha('ticker') && <Ticker />}
      {ha('statistiche') && <Statistiche />}
      {ha('servizi') && (
        <Servizi livello={livello.pagineServizio ? livello.slug : undefined} />
      )}
      {ha('comeLavoriamo') && <ComeLavoriamo />}
      {ha('portfolio') && <Portfolio />}
      {ha('zone') && <Zone />}
      {ha('faq') && <Faq />}
      {ha('admin') && <Admin caricamento={livello.caricamentoFoto} />}
      {ha('calcolatore') && <Calcolatore />}
      {ha('areaCliente') && <AreaCliente />}
      {ha('chiusura') && <Chiusura />}

      <Footer />
      <WhatsAppFlottante messaggio="Salve, vorrei un preventivo." />
    </main>
  );
}
