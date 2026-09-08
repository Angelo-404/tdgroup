import { AlertTriangle, MessageCircle, Phone } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { AZIENDA, whatsapp } from '@/data/cliente';
import { FORNITORE } from '@/data/fornitore';
import { PASSI, tempiIncompleti } from '@/data/offerta';

/**
 * Footer dell'hub: il fornitore, non TD Group.
 *
 * Il footer di `src/components/Footer.tsx` porta i dati societari di TD Group
 * ed è giusto dentro le demo, che sono il loro sito. Sull'hub sarebbe il
 * recapito sbagliato: chi legge è TD Group, e deve poter richiamare chi gli ha
 * mandato le anteprime.
 *
 * Volutamente più corto dell'altro: questa è una pagina di presentazione, non
 * un sito aziendale con sede legale e REA da pubblicare.
 *
 * Porta anche i quattro passi, che prima stavano in una sezione loro. La
 * sezione è stata sostituita da `Stato.tsx`, ma i passi non potevano sparire:
 * senza, l'hub dice cosa si compra e non cosa tocca fare per averlo, e nel
 * dubbio non si risponde. Qui stanno anche meglio di prima, attaccati al
 * pulsante che serve a rispondere.
 */
export default function FooterHub() {
  return (
    <footer className="dark-section bg-ink px-5 pb-28 pt-20 text-bone sm:px-8 sm:pb-10">
      <div className="mx-auto max-w-7xl">
        <p className="titolo text-4xl sm:text-5xl">{FORNITORE.nome}</p>
        <p className="mt-3 max-w-prosa text-bone/60">
          {FORNITORE.mestiere}. Queste tre anteprime sono costruite sui contenuti e
          sulle foto di {AZIENDA.nome}, non su un template.
        </p>

        {/*
          I quattro passi in riga stretta: sono una rassicurazione, non un
          argomento di vendita, e non devono pesare quanto le sezioni sopra.
          Il 02 è l'unico che chiede qualcosa a TD Group, e il testo lo dice.
        */}
        <RevealGroup
          className="mt-14 grid gap-x-10 gap-y-9 border-t border-bone/10 pt-12 sm:grid-cols-2 lg:grid-cols-4"
          ritardo={0.08}
        >
          {PASSI.map((passo) => (
            <RevealItem key={passo.n}>
              <span className="font-display text-xs tracking-widest text-cantiere">
                {passo.n}
              </span>
              <h3 className="titolo mt-2 text-xl">{passo.titolo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone/55">
                {passo.testo}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {tempiIncompleti && (
          <p className="mt-10 flex items-start gap-2.5 rounded-lg border border-cantiere/40 bg-cantiere/10 p-4 text-sm text-bone/75">
            <AlertTriangle size={17} className="mt-0.5 shrink-0 text-cantiere" />
            <span>
              Promemoria per me, non per {AZIENDA.nome}: i tempi dei tre livelli sono
              ancora segnaposto in{' '}
              <code className="font-mono">src/data/offerta.ts</code>. Vanno
              decisi prima di mandare il link.
            </span>
          </p>
        )}

        <Reveal className="mt-16 border-t border-bone/10 pt-12">
          <h3 className="titolo max-w-3xl text-3xl sm:text-4xl">
            Ditemi dove volete fermarvi.
          </h3>
          <p className="mt-5 max-w-prosa text-lg leading-relaxed text-bone/60">
            Un messaggio o una telefonata bastano. Sono di {FORNITORE.comune}: se
            preferite parlarne di persona, passo io.
          </p>
        </Reveal>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={whatsapp(
              'Salve, ho visto le anteprime del sito e vorrei parlarne.',
              FORNITORE.whatsapp,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-cantiere px-6 py-3.5 font-medium text-ink transition-transform duration-300 ease-morbida hover:scale-[1.03] active:scale-95"
          >
            <MessageCircle size={18} strokeWidth={2.2} />
            Scrivimi su WhatsApp
          </a>
          <a
            href={FORNITORE.telefonoHref}
            className="inline-flex items-center gap-2.5 rounded-full border border-bone/25 px-6 py-3.5 font-medium text-bone transition-colors duration-300 hover:bg-bone/10"
          >
            <Phone size={18} strokeWidth={2.2} />
            {FORNITORE.telefono}
          </a>
        </div>

        <div className="mt-12 grid gap-8 border-t border-bone/10 pt-8 text-sm text-bone/60 sm:grid-cols-3">
          <div className="space-y-1.5">
            <p className="font-medium text-bone">Contatti</p>
            <p>
              <a href={FORNITORE.telefonoHref} className="hover:text-bone">
                {FORNITORE.telefono}
              </a>
            </p>
            <p>
              <a href={`mailto:${FORNITORE.email}`} className="hover:text-bone">
                {FORNITORE.email}
              </a>
            </p>
            <p>{FORNITORE.comune} (BO)</p>
          </div>

          <div className="space-y-1.5">
            <p className="font-medium text-bone">Inquadramento</p>
            <p>{FORNITORE.inquadramento}</p>
          </div>

          <div className="space-y-1.5">
            <p className="font-medium text-bone">Le anteprime</p>
            <p>Riservate a {AZIENDA.nome}: non compaiono su Google.</p>
            <p>Foto e testi di proprietà di {AZIENDA.nome}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
