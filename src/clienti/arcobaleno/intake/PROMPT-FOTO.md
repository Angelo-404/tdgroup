# Le fotografie di Arcobaleno — prompt e nomi dei file

Generato da `scripts/piano-foto.mjs`. **Non si modifica a mano**: si cambia lo
script e si rigenera, perché da lì escono anche le descrizioni alternative.

## Come si fa

1. Un prompt alla volta, tutto intero, nel generatore di immagini.
2. Scarichi l’immagine e la **rinomini col nome indicato sopra il prompt**.
3. La metti nella cartella della sua lavorazione:
   `src/clienti/arcobaleno/intake/foto/<lavorazione>/`
4. Quando ne hai messe un po’, anche non tutte:
   ```bash
   CLIENTE=arcobaleno npm run intake:foto
   ```

Il nome del file conta: da quello lo script prende la descrizione alternativa
già scritta in `alt.json`, e l’ordine di apertura della pagina. Un nome
diverso funziona lo stesso, ma la foto si prende una descrizione di ripiego
e lo script te lo dice.

## Due cose che il generatore sbaglia spesso

- **Il tubo drenante** deve essere corrugato e microfessurato, nero, non liscio
  e non arancione. Se esce un tubo liscio, rigenera.
- **Il testo**: qualunque scritta, targa o marchio nell’immagine esce
  storpiato e va scartato. I prompt lo escludono già, ma controlla.

I prompt sono in inglese di proposito: i generatori seguono molto meglio i
termini tecnici in inglese. Il titolo sopra ognuno è in italiano.

---

## rilevazione-altimetrica

### 01-campo-da-rilevare.jpg  — copertina, a tutto schermo

```text
An empty harvested lowland field in stubble. On the far left edge, small in the frame, a yellow surveying tripod carrying a rotating laser level. Tractor tracks curve across the bare soil. A drainage ditch and a line of bare poplars close the horizon. Wide establishing shot, low horizon line in the lower third, large empty overcast sky filling the upper half of the frame, main subject small and placed low, nothing important in the centre of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 02-stazione-laser.jpg

```text
Close three-quarter view of a rotating laser level on a heavy yellow surveying tripod, standing on stubble at the edge of a ploughed field. Spirit level and control keypad visible on the instrument body, no readable markings. Shallow depth of field on the far field, sharp on the instrument. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 03-asta-ricevitore.jpg

```text
Seen from behind at middle distance, a worker in a dark waterproof jacket and rubber boots holds a tall telescopic levelling staff upright in a bare field, a laser receiver clamped near the top. The face is not visible. The staff is vertical and dominates the right third of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 04-dettaglio-ricevitore.jpg

```text
Tight detail of a laser receiver clamped to an aluminium levelling staff, held against an out-of-focus brown field and grey sky. Weathered plastic housing, rubber buttons, a small blank indicator strip. Rain droplets on the casing. No readable display, no visible brand. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 05-rilievo-con-quad.jpg

```text
A small utility quad bike with a tall thin GPS antenna mast crossing a wide bare field along a straight line, seen from a low angle at middle distance, throwing up no dust on the damp soil. Parallel wheel tracks from previous passes visible on the ground. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 06-ristagno-dopo-pioggia.jpg

```text
A shallow sheet of standing rainwater lying in a hollow of a bare ploughed field, reflecting the grey sky, with the drowned stubble and clods showing through. The wet patch occupies the lower half of the frame and the dry higher ground rises behind it. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 07-scarico-a-fine-campo.jpg

```text
An open farm drainage ditch running along the edge of a field, freshly reprofiled, with a shallow stream of muddy water at the bottom and grass on the banks. A concrete pipe outlet is visible low in the bank on the right. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

## livellamento-laser

### 01-campo-in-livellamento.jpg  — copertina, a tutto schermo

```text
A very wide bare field being levelled. Small and low on the right, a tractor pulling a land leveller with a long drawbar and a laser mast. The freshly cut surface is smooth and slightly darker than the untouched ground on the left. Wide establishing shot, low horizon line in the lower third, large empty overcast sky filling the upper half of the frame, main subject small and placed low, nothing important in the centre of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 02-livellatrice-al-lavoro.jpg

```text
Side view at middle distance of an agricultural tractor pulling a land plane leveller across a bare field. A tall thin mast rises from the leveller frame with a laser receiver at the top. Soil rolls forward in front of the blade. Mud on the tyres, damp compacted ground behind. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 03-ricevitore-sull-asta.jpg

```text
Low angle looking up at a laser receiver mounted on top of a slim vertical mast on farm machinery, silhouetted against a flat overcast sky. Hydraulic hoses and a cable run down the mast. The machine frame is out of focus at the bottom of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 04-lama-che-taglia.jpg

```text
Close view of the steel cutting edge of a land leveller blade slicing into damp brown soil, a roll of loose earth curling in front of it. Scratched worn metal, wet clods, the flat cut surface left behind visible on the right. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 05-trasmettitore-a-bordo-campo.jpg

```text
A rotating laser transmitter on a tripod standing in the foreground grass at the field margin, sharp and close, with the levelling tractor working small and blurred in the far background of the same field. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 06-superficie-finita.jpg

```text
A perfectly even freshly levelled field surface filling the frame, seen at a low angle, fine tilth with faint parallel machine marks, no hollows and no standing water anywhere. Flat horizon and grey sky along the top edge. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 07-tracce-delle-passate.jpg

```text
Elevated oblique view over a levelled field showing long parallel machine passes running away to the horizon, alternating slightly lighter and darker bands of soil. A drainage ditch crosses the far edge. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

## drenaggio-tubolare

### 01-drenatrice-in-campo.jpg  — copertina, a tutto schermo

```text
Very wide view of a bare field with a tracked drainage trencher working small and low on the left, a long straight line of disturbed soil stretching away behind it toward the horizon. Vast empty overcast sky above. Wide establishing shot, low horizon line in the lower third, large empty overcast sky filling the upper half of the frame, main subject small and placed low, nothing important in the centre of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 02-drenatrice-al-lavoro.jpg

```text
Side view at middle distance of a heavy tracked drainage trencher cutting a narrow deep trench in a field, spoil thrown in a ridge to one side, a coil of black corrugated pipe feeding down through the machine chute, a laser receiver mast rising from the frame. Wet clay clinging to the tracks. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 03-rotolo-di-dreno.jpg

```text
A large coil of black corrugated perforated plastic drainage pipe resting on the bare soil at the edge of a field, the narrow slots between the corrugations clearly visible. Mud on the lower coils, damp grass behind. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 04-trincea-con-dreno-posato.jpg

```text
Looking down along an open narrow trench about one metre deep cut in brown clay soil, a black corrugated perforated drainage pipe lying along the bottom on a bed of clean gravel. The trench runs diagonally away from the camera. Sharp vertical trench walls, spoil heaped alongside. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 05-ghiaietto-sul-dreno.jpg

```text
Close view into a trench where clean washed gravel is being poured over a black corrugated drainage pipe, partly covering it. Grey angular stones against wet brown clay walls. The chute of a gravel hopper enters the top of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 06-innesto-al-collettore.jpg

```text
Several black corrugated drainage pipes converging and connected with plastic fittings into one larger smooth-walled collector pipe at the bottom of a wide excavated pit in a field. Wet clay walls, a shovel leaning at the edge. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 07-pozzetto-e-scarico.jpg

```text
A concrete inspection chamber set flush in the grass at the field margin with its cover lifted to one side, and beyond it a pipe outlet discharging clear water into an open ditch. Reeds and wet grass on the ditch banks. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

## subirrigazione

### 01-campo-con-impianto.jpg  — copertina, a tutto schermo

```text
Very wide view of a flat cultivated field with a black polyethylene header pipe running along the near edge in the lower third of the frame, low and small. Even crop rows recede to a distant treeline. Large empty overcast sky above. Wide establishing shot, low horizon line in the lower third, large empty overcast sky filling the upper half of the frame, main subject small and placed low, nothing important in the centre of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 02-posa-dell-ala.jpg

```text
A tractor moving away from the camera across a field, drawing a narrow injector shoe that buries a thin black driplinehose fed from a large reel mounted on the three-point linkage. A single narrow slit of disturbed soil closes behind the shoe. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 03-ala-interrata-dettaglio.jpg

```text
Tight low view of a thin black dripline lying at the bottom of a narrow freshly opened slit in damp brown soil, about thirty centimetres down, the walls of the slit crumbling slightly. Crop residue at the surface above. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 04-collettore-di-testata.jpg

```text
A black polyethylene manifold pipe lying along a field headland with a row of plastic take-off fittings and small ball valves along its length, each connecting to a thin dripline running into the field. Grass and mud around the pipe. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 05-gocciolatore-dettaglio.jpg

```text
Macro detail of a short length of drip irrigation line held in a gloved hand against a blurred field background, showing an integrated inline emitter moulded into the tube wall. No face in frame. Damp plastic, a single drop of water forming at the outlet. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 06-coltura-uniforme.jpg

```text
Even rows of a healthy green field crop photographed at low level between two rows, the soil surface between the plants visibly dry and crusted while the crop is uniformly vigorous. Rows converge toward a flat horizon. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 07-filtro-e-valvole.jpg

```text
A compact irrigation filter and valve assembly at the head of a field: a cylindrical disc filter, pressure gauges with blank faces, ball valves and galvanised fittings on a simple steel frame, standing on bare ground against grey sky. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

## movimento-terra

### 01-cantiere-in-campo.jpg  — copertina, a tutto schermo

```text
Very wide view of farmland with a tracked excavator working small and low on the right, reshaping a field ditch. A ridge of freshly moved soil runs along the ditch line. Vast empty overcast sky over a flat horizon. Wide establishing shot, low horizon line in the lower third, large empty overcast sky filling the upper half of the frame, main subject small and placed low, nothing important in the centre of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 02-riprofilatura-scolina.jpg

```text
A tracked excavator with a wide ditching bucket cutting a clean V-shaped profile into a farm ditch, seen from the opposite bank at middle distance. Fresh wet spoil spread in a strip along the field edge, the finished section of ditch visible in the foreground. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 03-formazione-capezzagna.jpg

```text
A bulldozer or grader spreading and compacting a raised farm track along the edge of a field, the track surface of compacted gravelly soil clearly higher than the field beside it, with a shallow drainage ditch on the outer side. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 04-scavo-dell-invaso.jpg

```text
A large rectangular earth basin under excavation in flat farmland, seen from the bank, battered side slopes shaped by machine, a tracked excavator working small at the far end, dump trucks on a ramp carrying spoil out. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 05-invaso-finito.jpg

```text
A finished farm irrigation reservoir holding still water reflecting the grey sky, grassed battered banks and a low perimeter embankment, a simple inlet pipe on the near side. Flat cultivated fields beyond. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 06-profilo-di-scavo-dettaglio.jpg

```text
Close view of a freshly cut vertical earth face in an excavation, showing the darker topsoil layer over lighter clay subsoil, with the parallel marks of the bucket teeth raked down the face. Loose clods at the foot. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 07-trasporto-terra.jpg

```text
An articulated site dumper loaded with wet brown soil driving along a muddy haul track across farmland, seen from the side at middle distance, deep tyre ruts filled with rainwater in the track. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

## bonifiche

### 01-terreno-da-recuperare.jpg  — copertina, a tutto schermo

```text
Very wide view of a neglected flat field, patches of standing water lying in hollows in the lower third, rough uneven ground and clumps of coarse weeds. A broken line of scrub marks the far boundary. Vast empty overcast sky above. Wide establishing shot, low horizon line in the lower third, large empty overcast sky filling the upper half of the frame, main subject small and placed low, nothing important in the centre of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 02-ristagno-prima.jpg

```text
A waterlogged hollow inside a cultivated field, the crop drowned and yellowed in the wet patch while it stands green and normal on the higher ground around it. Sharp visible boundary between the two. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 03-appezzamento-abbandonato.jpg

```text
An abandoned agricultural plot overgrown with tall dry weeds, brambles and self-seeded saplings, an old collapsed ditch running through it, a rusted fence post leaning in the foreground. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 04-lavori-in-corso.jpg

```text
A field mid-reclamation with two machines working at different points: a tracked excavator on a ditch line and a tractor with a land leveller further away, half the field already smoothed and half still rough. Seen from an elevated oblique angle. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 05-nuova-rete-di-scoline.jpg

```text
Freshly cut open drainage ditches forming clean straight lines across a bare reclaimed field, sharp trapezoidal profiles, bright raw soil on the banks, converging toward a larger channel at the far edge. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 06-posa-dreni-in-bonifica.jpg

```text
A drainage trencher laying black corrugated pipe across a reclaimed field, with the freshly reprofiled ditch network visible in the background of the same field. Long straight lines of disturbed soil converging. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 07-terreno-recuperato.jpg

```text
The same kind of flat field after reclamation: evenly ploughed, regular straight furrows running to the horizon, no standing water anywhere, a clean profiled ditch along the near edge. Damp brown soil, grey sky. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

## scavi-e-demolizioni

### 01-scavo-in-corso.jpg  — copertina, a tutto schermo

```text
Very wide view of an excavation site in open countryside, a tracked excavator working small and low on the right beside an open trench, a heap of spoil alongside. Vast empty overcast sky over a flat horizon. Wide establishing shot, low horizon line in the lower third, large empty overcast sky filling the upper half of the frame, main subject small and placed low, nothing important in the centre of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 02-scavo-a-sezione-obbligata.jpg

```text
An open trench about two metres deep with battered sloping sides cut in brown soil, running diagonally through the frame, a flat prepared bottom, spoil heaped along one side, a tracked excavator standing at the far end. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 03-condotta-su-letto-di-posa.jpg

```text
Looking down into a trench where a large smooth-walled plastic pipe rests on a bed of clean gravel, the gravel bedding clearly levelled beneath it. Wet trench walls, a laser level tripod at the trench edge above. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 04-demolizione-fabbricato.jpg

```text
A tracked excavator fitted with a sorting grapple pulling down the brick wall of a small derelict farm building, roof already removed, broken masonry falling. Dust suppressed by damp weather. Bare fields visible behind the building. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 05-materiali-separati.jpg

```text
Three distinct separated piles of demolition material on a cleared yard: broken brick and concrete rubble, old timber beams and boards, and twisted scrap metal, each in its own heap with clear ground between them. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 06-benna-e-muratura-dettaglio.jpg

```text
Close view of the steel jaws of a demolition grapple closing on a section of old brick wall, mortar crumbling, individual bricks separating. Scratched hydraulic ram and hoses visible. Overcast sky behind. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 07-area-ripristinata.jpg

```text
A cleared and levelled plot of ground where a building has been removed, the soil graded flat and clean with no rubble left, faint machine tracks across it, the neighbouring farm buildings and fields around the edges. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

## tubi-irrigazione-edilizia

### 01-deposito-materiali.jpg  — copertina, a tutto schermo

```text
Very wide view of an outdoor materials yard: stacks and coils of pipe arranged in low rows along the lower third of the frame, gravel ground, a simple open shed on the left. Large empty overcast sky above, nothing important in the centre. Wide establishing shot, low horizon line in the lower third, large empty overcast sky filling the upper half of the frame, main subject small and placed low, nothing important in the centre of the frame. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 02-rotoli-di-dreno-in-deposito.jpg

```text
Several large coils of black corrugated perforated drainage pipe stacked on a pallet in a yard, the slots between corrugations visible on the nearest coil. Damp gravel ground, plain grey sky. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 03-tubi-per-diametro.jpg

```text
Rows of plastic pipes of clearly different diameters, from small to large, stacked horizontally in steel racks in a covered store, the open cut ends facing the camera so the varying wall thickness and bore are visible. Even diffuse light. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 04-raccorderia.jpg

```text
Shelves of plastic pipe fittings in a store: elbows, tee pieces, couplers, reducers and compression joints sorted in open bins by size. Plain unlabelled bins, no readable text anywhere. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 05-pozzetti.jpg

```text
Several plastic and concrete inspection chambers of different sizes standing together in a yard, some with lids on and some open showing the inlet sockets in the walls. Wet gravel underfoot. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 06-dreno-fessurato-dettaglio.jpg

```text
Macro detail of a short cut length of black corrugated drainage pipe lying on a workbench, showing the narrow slots cut between the corrugation ridges and the open cut end with its ribbed wall. Even soft light, plain background. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

### 07-carico-del-materiale.jpg

```text
Coils of drainage pipe and bundles of plastic pipe being loaded onto a flatbed trailer in a yard, a telehandler forks under a bundle, seen from the side at middle distance. No faces visible. Photorealistic documentary photograph, no illustration, no 3D render. Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. Late autumn, overcast diffuse daylight, no direct sun, no long shadows. Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, dark green hedgerows and poplar rows on the horizon. Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, no HDR, no heavy vignette, no lens flare, no colour grading. Horizontal 3:2 framing. No visible faces, no readable text, no logos, no brand names, no watermark.
```

---

56 fotografie in tutto, 8 lavorazioni.
