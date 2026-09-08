'use client';

import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Hammer,
  Image as ImgIcon,
  LayoutDashboard,
  MessageSquare,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Foto from '@/components/Foto';
import { Occhiello } from '@/components/ui';
import { AZIENDA, FOTO } from '@/data/cliente';
import { EASE } from '@/lib/motion';

const AVANZAMENTO = 65;

const FASI = [
  { nome: 'Demolizioni', stato: 'Conclusa' },
  { nome: 'Impianti idraulici ed elettrici', stato: 'Conclusa' },
  { nome: 'Massetti e guaine', stato: 'Conclusa' },
  { nome: 'Posa pavimenti e rivestimenti', stato: 'In corso' },
  { nome: 'Sanitari e finiture', stato: 'Da iniziare' },
  { nome: 'Pulizia e consegna', stato: 'Da iniziare' },
] as const;

const DOCUMENTI = [
  { nome: 'Preventivo firmato.pdf', tipo: 'PDF', peso: '240 KB', icona: FileText },
  { nome: 'Planimetria bagno.pdf', tipo: 'PDF', peso: '1,1 MB', icona: FileText },
  { nome: 'Computo metrico.xlsx', tipo: 'Foglio', peso: '86 KB', icona: FileSpreadsheet },
  { nome: 'Fattura acconto 30%.pdf', tipo: 'PDF', peso: '120 KB', icona: FileText },
  { nome: 'Conformità impianto elettrico.pdf', tipo: 'PDF', peso: '310 KB', icona: FileText },
] as const;

const VOCI = [
  { chiave: 'stato', nome: 'Stato lavori', icona: LayoutDashboard },
  { chiave: 'foto', nome: 'Foto cantiere', icona: ImgIcon },
  { chiave: 'documenti', nome: 'Documenti', icona: FileText },
  { chiave: 'messaggi', nome: 'Messaggi', icona: MessageSquare },
] as const;

/** Anello che si riempie da 0 al valore quando entra nella vista. */
function AnelloSAL({ valore }: { valore: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visibile = useInView(ref, { once: true, amount: 0.6 });
  const progresso = useMotionValue(0);

  const raggio = 78;
  const circonferenza = 2 * Math.PI * raggio;
  const offset = useTransform(progresso, (v) => circonferenza * (1 - v / 100));
  const [testo, setTesto] = useState(0);

  useEffect(() => {
    if (!visibile) return;
    const controlli = animate(progresso, valore, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setTesto(Math.round(v)),
    });
    return () => controlli.stop();
  }, [visibile, valore, progresso]);

  return (
    <div ref={ref} className="relative h-52 w-52 shrink-0">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle
          cx="90"
          cy="90"
          r={raggio}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-bone/10"
        />
        <motion.circle
          cx="90"
          cy="90"
          r={raggio}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className="text-cantiere"
          strokeDasharray={circonferenza}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="titolo text-5xl tabular-nums">{testo}%</span>
        <span className="mt-1 text-xs uppercase tracking-widest text-bone/40">
          Avanzamento
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [voce, setVoce] = useState<(typeof VOCI)[number]['chiave']>('stato');
  const fotoCantiere = FOTO.filter((f) => f.servizio === 'ristrutturazione-bagni').slice(0, 6);

  return (
    <section className="dark-section bg-ink px-5 py-24 text-bone sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Occhiello scuro>Area cliente</Occhiello>
        <h2 className="titolo mt-4 max-w-3xl text-5xl sm:text-7xl">
          Il cantiere, dal telefono.
        </h2>
        <p className="mt-6 max-w-prosa text-lg leading-relaxed text-bone/60">
          Il cliente entra e vede a che punto siamo, le foto della settimana e i
          documenti da scaricare. Meno telefonate per tutti.
        </p>

        <div className="mt-12 overflow-hidden rounded-3xl border border-bone/10 bg-bone/[0.03]">
          <div className="grid lg:grid-cols-[16rem_1fr]">
            {/*
              `min-w-0`: un figlio di griglia ha `min-width: auto`, quindi la
              colonna si allargava fino ai tab con `whitespace-nowrap` e il
              pannello usciva di 212px dallo schermo, tagliato dal riquadro.
            */}
            <nav className="min-w-0 border-b border-bone/10 p-4 lg:border-b-0 lg:border-r">
              <p className="px-3 pb-3 text-xs uppercase tracking-widest text-bone/35">
                Ristrutturazione bagno
              </p>
              <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
                {VOCI.map((v) => {
                  const Icona = v.icona;
                  const attivo = voce === v.chiave;
                  return (
                    <li key={v.chiave} className="shrink-0 lg:shrink">
                      <button
                        type="button"
                        onClick={() => setVoce(v.chiave)}
                        className={`flex w-full items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm transition-colors duration-300 ${
                          attivo
                            ? 'bg-bone/10 text-bone'
                            : 'text-bone/50 hover:bg-bone/5 hover:text-bone'
                        }`}
                        aria-current={attivo ? 'page' : undefined}
                      >
                        <Icona size={16} />
                        {v.nome}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="min-w-0 p-6 sm:p-8">
              {voce === 'stato' && (
                <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center">
                  <AnelloSAL valore={AVANZAMENTO} />
                  <ol className="w-full space-y-3">
                    {FASI.map((f) => (
                      <li
                        key={f.nome}
                        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
                      >
                        <span
                          className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                            f.stato === 'Conclusa'
                              ? 'bg-cantiere text-ink'
                              : f.stato === 'In corso'
                                ? 'bg-cantiere/20 text-cantiere'
                                : 'bg-bone/10 text-bone/30'
                          }`}
                        >
                          <Hammer size={12} />
                        </span>
                        <span
                          className={`min-w-0 flex-1 ${
                            f.stato === 'Da iniziare' ? 'text-bone/40' : ''
                          }`}
                        >
                          {f.nome}
                        </span>
                        <span className="ml-auto shrink-0 text-xs text-bone/35">
                          {f.stato}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {voce === 'foto' && (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {fotoCantiere.map((f) => (
                    <li key={f.slug} className="overflow-hidden rounded-xl">
                      <Foto
                        foto={f}
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="aspect-[4/3] h-full w-full object-cover"
                      />
                    </li>
                  ))}
                </ul>
              )}

              {voce === 'documenti' && (
                <ul className="divide-y divide-bone/10">
                  {DOCUMENTI.map((d) => {
                    const Icona = d.icona;
                    return (
                      <li key={d.nome} className="flex items-center gap-4 py-3">
                        <Icona size={19} className="shrink-0 text-bone/35" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm">{d.nome}</p>
                          <p className="text-xs text-bone/35">
                            {d.tipo} · {d.peso}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Scarica ${d.nome}`}
                          className="shrink-0 rounded-full p-2 text-bone/40 transition-colors duration-300 hover:bg-bone/10 hover:text-bone"
                        >
                          <Download size={16} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {voce === 'messaggi' && (
                <div className="space-y-4">
                  <div className="max-w-md rounded-2xl rounded-tl-sm bg-bone/10 p-4 text-sm">
                    <p>
                      Buongiorno, domani arriva il gres. Se preferisce un&apos;altra
                      fuga siamo ancora in tempo.
                    </p>
                    <p className="mt-2 text-xs text-bone/35">{AZIENDA.nome} · ieri, 17:42</p>
                  </div>
                  <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-cantiere/20 p-4 text-sm">
                    <p>Va benissimo così, grazie.</p>
                    <p className="mt-2 text-xs text-bone/35">Cliente · ieri, 18:10</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-bone/35">
          Dimostrazione con dati di esempio. I download non scaricano nulla: nel
          sito vero servirebbe un&apos;area riservata con autenticazione.
        </p>
      </div>
    </section>
  );
}
