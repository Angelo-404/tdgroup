/*
  Il logo fornito e' nero + giallo su bianco pieno, senza canale alfa.
  Sulla sezione "Chi siamo", che e' su bg-ink, servirebbe:
    - il bianco via, o si vede il quadrato
    - il nero schiarito, o i tratti spariscono sul fondo scuro
    - il giallo intatto, perche' e' il colore del marchio

  Quindi: alfa ricavata dalla luminanza (bianco -> trasparente, nero -> pieno,
  con i bordi antialiasati che restano morbidi), e colore riassegnato in due
  famiglie. Niente soglia netta: una soglia secca sgranerebbe i bordi delle
  lettere, che qui sono sottili.
*/
const sharp = require('sharp');
const path = require('path');

const SORGENTE = 'C:/Users/angel_g0qxvvv/Desktop/logo td.png';
const USCITA = path.join(process.cwd(), 'public', 'logo-td-chiaro.png');

const BONE = [248, 249, 250];
const CANTIERE = [230, 185, 30];

(async () => {
  const img = sharp(SORGENTE).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const px = info.width * info.height;
  const fuori = Buffer.alloc(px * 4);

  for (let i = 0; i < px; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    const lum = (r * 0.299 + g * 0.587 + b * 0.114);

    // giallo: rosso e verde alti, blu basso, e non e' grigio
    const giallo = r > 150 && g > 100 && b < 140 && (r - b) > 60;

    let colore, alfa;
    if (giallo) {
      colore = CANTIERE;
      // il giallo del marchio e' gia' chiaro: l'alfa la prendo dalla distanza
      // dal bianco sul canale blu, che e' quello che lo separa dal fondo
      alfa = Math.min(255, Math.round((255 - b) * 1.6));
    } else {
      colore = BONE;
      alfa = Math.round(255 - lum);
    }

    fuori[i * 4] = colore[0];
    fuori[i * 4 + 1] = colore[1];
    fuori[i * 4 + 2] = colore[2];
    fuori[i * 4 + 3] = Math.max(0, Math.min(255, alfa));
  }

  // Base comune ai due formati: ritagliata (il PNG di partenza ha molto bordo
  // vuoto) e riportata a una misura sensata per l'uso a schermo.
  const base = sharp(fuori, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true });

  // Solo PNG: provato anche il WebP, viene 33 KB contro 23. Su un marchio a
  // due colori piatti la palette del PNG batte il codec fotografico.
  await base.clone().png({ compressionLevel: 9, palette: true }).toFile(USCITA);

  for (const f of [USCITA]) {
    const m = await sharp(f).metadata();
    console.log(JSON.stringify({ file: path.basename(f), w: m.width, h: m.height, byte: m.size }));
  }
})();
