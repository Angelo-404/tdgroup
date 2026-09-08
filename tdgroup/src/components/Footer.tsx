import { AlertTriangle } from 'lucide-react';
import {
  AZIENDA,
  DA_FORNIRE,
  datiIncompleti,
  datiObbligatoriMancanti,
  mancante,
} from '@/data/cliente';

/*
  Facebook e Instagram disegnate qui: lucide-react non esporta piu' le icone
  dei marchi, e tirarsi dietro un pacchetto intero per due glifi non ha senso.
  `currentColor` le fa seguire il colore del testo del footer, hover compreso.
*/
function IconaFacebook() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5V7c0-.7.3-1 1-1h1.5V3.2A19 19 0 0 0 14.6 3C12.3 3 11 4.3 11 6.7v1.8H8.5V12H11v9h3v-9h2.3l.4-3.5H14Z" />
    </svg>
  );
}

function IconaInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Mostra il valore, oppure un segnaposto giallo se il dato non è ancora arrivato. */
function Dato({ etichetta, valore }: { etichetta: string; valore: string }) {
  if (mancante(valore)) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded bg-cantiere/20 px-2 py-0.5 text-cantiere">
        {etichetta}: da fornire
      </span>
    );
  }
  return (
    <span>
      {etichetta}: {valore}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="dark-section bg-ink px-5 pb-28 pt-20 text-bone sm:px-8 sm:pb-10">
      <div className="mx-auto max-w-7xl">
        <p className="titolo text-4xl sm:text-5xl">{AZIENDA.nome}</p>
        <p className="mt-3 max-w-prosa text-bone/60">
          {AZIENDA.descrizione} — {AZIENDA.comune} ({AZIENDA.provincia}), {AZIENDA.regione}.
        </p>

        <div className="mt-12 grid gap-8 border-t border-bone/10 pt-8 text-sm text-bone/60 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <p className="font-medium text-bone">Contatti</p>
            <p>
              <a href={AZIENDA.telefonoHref} className="hover:text-bone">
                {AZIENDA.telefono}
              </a>
            </p>
            <p>
              <a href={`mailto:${AZIENDA.email}`} className="hover:text-bone">
                {AZIENDA.email}
              </a>
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="font-medium text-bone">Dove siamo</p>
            <p>
              <Dato etichetta="Indirizzo" valore={DA_FORNIRE.indirizzo} />
            </p>
            <p>
              {AZIENDA.cap} {AZIENDA.comune} ({AZIENDA.provincia})
            </p>
          </div>

          {/*
            I social stanno accanto ai recapiti perché sono un recapito: in
            edilizia locale una parte dei contatti arriva da un messaggio su
            Instagram, non dal telefono.
          */}
          <div className="space-y-1.5">
            <p className="font-medium text-bone">Seguiteci</p>
            <p className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
              <a
                href={AZIENDA.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-bone"
              >
                <IconaFacebook />
                Facebook
              </a>
              <a
                href={AZIENDA.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-bone"
              >
                <IconaInstagram />
                Instagram
              </a>
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="font-medium text-bone">Dati societari</p>
            <p>{AZIENDA.ragioneSociale}</p>
            <p>
              <Dato etichetta="P. IVA" valore={DA_FORNIRE.piva} />
            </p>
            <p>
              <Dato etichetta="REA" valore={DA_FORNIRE.rea} />
            </p>
          </div>
        </div>

        {datiObbligatoriMancanti ? (
          <p className="mt-10 flex items-start gap-2.5 rounded-lg border border-cantiere/30 bg-cantiere/10 p-4 text-sm text-cantiere">
            <AlertTriangle size={17} className="mt-0.5 shrink-0" />
            <span>
              Partita IVA, sede legale e numero REA non sono ancora stati
              forniti da {AZIENDA.nome}. Sono obbligatori per legge (art. 2250
              c.c.): il sito non può andare online finché restano segnaposto.
            </span>
          </p>
        ) : (
          datiIncompleti && (
            <p className="mt-10 flex items-start gap-2.5 rounded-lg border border-cantiere/30 bg-cantiere/10 p-4 text-sm text-cantiere">
              <AlertTriangle size={17} className="mt-0.5 shrink-0" />
              <span>
                Restano dei segnaposto: orari di apertura, comuni serviti e
                l’anno di inizio attività. Non bloccano la pubblicazione, ma i
                primi due sono quelli che vi fanno trovare da chi cerca
                un’impresa vicino a casa.
              </span>
            </p>
          )
        )}

        <p className="mt-10 text-xs text-bone/35">
          {AZIENDA.sitoAttuale
            ? `Bozza di lavoro. I contenuti provengono dal sito attuale ${AZIENDA.sitoAttuale}.`
            : 'Bozza di lavoro. I contenuti provengono dai materiali forniti dall’azienda.'}
        </p>
      </div>
    </footer>
  );
}
