import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BottoniContatto, WhatsAppFlottante } from '@/components/Contatto';
import Footer from '@/components/Footer';
import Foto from '@/components/Foto';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Occhiello } from '@/components/ui';
import { AZIENDA, FOTO, SERVIZI, servizioBySlug } from '@/data/cliente';
import { LIVELLI, livelloBySlug } from '@/data/livelli';

type Params = { livello: string; slug: string };

export function generateStaticParams() {
  return LIVELLI.filter((l) => l.pagineServizio).flatMap((l) =>
    SERVIZI.map((s) => ({ livello: l.slug, slug: s.slug })),
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const servizio = servizioBySlug(params.slug);
  if (!servizio) return {};
  return {
    title: servizio.titolo,
    description: servizio.intro.slice(0, 155),
  };
}

/**
 * Pagina dedicata a una lavorazione.
 *
 * Esiste solo dai livelli con `pagineServizio`. È la differenza che conta per
 * Google: chi cerca "rifacimento tetto Molinella" atterra qui, non sulla home.
 * Il testo è quello già scritto da TD Group, con un solo H1 per pagina.
 */
export default function PaginaServizio({ params }: { params: Params }) {
  const livello = livelloBySlug(params.livello);
  const servizio = servizioBySlug(params.slug);
  if (!livello || !livello.pagineServizio || !servizio) notFound();

  /*
    Il calcolatore non sta in tutti i livelli: la pagina servizio non deve
    mandare a un'ancora che in quel livello non esiste.
  */
  const preventivoHref = livello.blocchi.includes('calcolatore')
    ? `/demo/${livello.slug}#preventivo`
    : undefined;

  const foto = FOTO.filter((f) => f.servizio === servizio.chiaveFoto);
  const copertina = foto[0] ?? FOTO[0];
  const galleria = foto.slice(1, 7);
  const altri = SERVIZI.filter((s) => s.slug !== servizio.slug).slice(0, 4);

  return (
    <main>
      <section className="dark-section relative flex min-h-[72svh] items-end overflow-hidden bg-ink px-5 pb-14 pt-32 text-bone sm:px-8">
        <div className="absolute inset-0">
          <Foto
            foto={copertina}
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />

        <div className="relative mx-auto w-full max-w-7xl">
          <Link
            href={`/demo/${livello.slug}`}
            className="inline-flex items-center gap-2 text-sm text-bone/60 transition-colors hover:text-bone"
          >
            <ArrowLeft size={15} />
            Tutti i servizi
          </Link>
          <h1 className="titolo mt-6 max-w-4xl text-5xl sm:text-7xl">{servizio.titolo}</h1>
          <p className="mt-6 max-w-prosa text-lg leading-relaxed text-bone/70">
            {servizio.intro}
          </p>
        </div>
      </section>

      <section className="bg-bone px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <RevealGroup ritardo={0.06}>
              {servizio.corpo.map((blocco) =>
                blocco.tipo === 'h' ? (
                  <RevealItem key={blocco.testo}>
                    <h2 className="titolo mt-12 text-3xl first:mt-0">{blocco.testo}</h2>
                  </RevealItem>
                ) : (
                  <RevealItem key={blocco.testo}>
                    <p className="mt-5 max-w-prosa text-lg leading-relaxed text-ink/70">
                      {blocco.testo}
                    </p>
                  </RevealItem>
                ),
              )}
            </RevealGroup>

            <Reveal>
              <div className="mt-14 rounded-3xl border border-ink/10 p-7 sm:p-9">
                <p className="titolo text-2xl sm:text-3xl">{servizio.cta}</p>
                <p className="mt-3 text-ink/60">
                  Scriveteci su WhatsApp o chiamate il {AZIENDA.telefono}. Il
                  sopralluogo è gratuito.
                  {preventivoHref && (
                    <>
                      {' '}
                      Se volete prima un ordine di grandezza, il calcolatore
                      online dà una forbice di spesa in cinque domande.
                    </>
                  )}
                </p>
                <BottoniContatto
                  className="mt-7"
                  messaggio={servizio.ctaWhatsapp}
                  preventivoHref={preventivoHref}
                />
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <Occhiello>Altri servizi</Occhiello>
            <ul className="mt-4 space-y-1">
              {altri.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/demo/${livello.slug}/servizi/${s.slug}`}
                    className="block rounded-xl px-3 py-2.5 text-ink/60 transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
                  >
                    {s.titolo}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {galleria.length > 0 && (
        <section className="bg-bone px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-7xl">
            <Occhiello>Lavori</Occhiello>
            <h2 className="titolo mt-4 text-4xl sm:text-5xl">
              Qualche cantiere nostro.
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {galleria.map((f) => (
                <li key={f.slug} className="overflow-hidden rounded-2xl">
                  <Foto
                    foto={f}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppFlottante messaggio={servizio.ctaWhatsapp} />
    </main>
  );
}
