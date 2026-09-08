import { BASE_FOTO, type Foto as FotoType } from '@/data/cliente';

type Props = {
  foto: FotoType;
  className?: string;
  /** Valore dell'attributo sizes. Sempre esplicito: niente 100vw di default. */
  sizes: string;
  /** Solo per la prima immagine sopra la piega. */
  priority?: boolean;
};

/**
 * Foto reale di cantiere, servita in AVIF con ripiego WebP.
 * I file sono generati da scripts/intake-foto.mjs e stanno in
 * public/foto/<cliente>/: con piu' clienti nella stessa repo una cartella
 * piatta farebbe spedire a ognuno anche le foto degli altri.
 *
 * Non usa next/image: le immagini sono già ottimizzate a build time, quindi
 * l'Image Optimizer non aggiungerebbe nulla e in self-hosting costa CPU.
 */
export default function Foto({ foto, className, sizes, priority = false }: Props) {
  const srcset = (fmt: 'avif' | 'webp') =>
    foto.larghezze.map((w) => `${BASE_FOTO}/${foto.slug}-${w}.${fmt} ${w}w`).join(', ');

  const piuGrande = foto.larghezze[foto.larghezze.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`${BASE_FOTO}/${foto.slug}-${piuGrande}.webp`}
        alt={foto.alt}
        width={foto.w}
        height={foto.h}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
}
