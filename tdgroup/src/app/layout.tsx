import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import DemoHeader from '@/components/DemoHeader';
import PageTransition from '@/components/PageTransition';
import SmoothScroll from '@/components/SmoothScroll';
import { AZIENDA } from '@/data/cliente';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${AZIENDA.nome} — anteprime del nuovo sito`,
    template: `%s — ${AZIENDA.nome}`,
  },
  description: `Tre proposte per il nuovo sito di ${AZIENDA.nome}, ${AZIENDA.descrizione.toLowerCase()} a ${AZIENDA.comune} (${AZIENDA.provincia}).`,
  // Fase 1: le anteprime non devono finire su Google.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="font-sans">
        {/*
          Le rivelazioni allo scroll partono da opacity 0, scritta da Framer
          direttamente nell'HTML. Senza JavaScript resterebbero invisibili:
          qui le riportiamo visibili e ferme.
        */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SmoothScroll />
        <DemoHeader />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
