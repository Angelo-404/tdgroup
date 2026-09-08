/**
 * Il piano delle fotografie di Arcobaleno: cosa serve, e come chiederlo.
 *
 * Arcobaleno non ha foto. Non ne ha sul sito perché il sito non ce l'ha, e
 * non ne ha su Google né sui social: abbiamo guardato. Finché non si va su un
 * cantiere col telefono (INTAKE.md §3, ed è la risposta giusta) le immagini
 * si generano fuori e si fanno entrare.
 *
 * Questo file è l'unica fonte di tutte e due le cose che servono:
 *
 *   1. i prompt, uno per fotografia, scritti per un generatore di immagini
 *   2. le descrizioni alternative, già pronte, con lo stesso nome di file
 *
 * Il secondo punto è quello che conta. Il vecchio sito di TD Group aveva 340
 * descrizioni su 583 uguali al nome del file: è l'unico passaggio che nessuno
 * script fa al posto nostro, e qui viene fatto prima che le foto esistano.
 * Quando i file arrivano nella cartella col nome giusto, l'alt c'è già.
 *
 *   node scripts/piano-foto.mjs
 *
 * Scrive:
 *   src/clienti/arcobaleno/intake/PROMPT-FOTO.md
 *   src/clienti/arcobaleno/intake/foto/<servizio>/alt.json   (unisce, non sovrascrive)
 *
 * I prompt sono in inglese di proposito. I generatori di immagini seguono
 * molto meglio i termini tecnici in inglese — "corrugated perforated drainage
 * pipe" produce il tubo giusto, "tubo drenante corrugato microfessurato"
 * spesso no. Il titolo sopra ogni prompt resta in italiano per sapere quale è.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CLIENTE = process.env.CLIENTE || 'arcobaleno';
const INTAKE = path.join(ROOT, 'src', 'clienti', CLIENTE, 'intake');

/*
  La coda di stile, identica su ogni prompt.

  Ripeterla per intero in ognuno è voluto: un generatore non ricorda il
  prompt precedente, e senza questa coda escono cinquantasei fotografie di
  cinquantasei archivi diversi — stagioni diverse, luci diverse, colori
  diversi. Messe in griglia si vede subito, ed è il difetto che rende un sito
  "fatto con le immagini prese in giro".

  Pianura, tardo autunno, cielo coperto: è la stagione in cui si drena e si
  livella davvero, a campi liberi, ed è anche la luce più facile da tenere
  uguale su decine di scatti.
*/
const STILE =
  'Photorealistic documentary photograph, no illustration, no 3D render. ' +
  'Lowland farmland of Emilia-Romagna near Medicina, province of Bologna, Italy. ' +
  'Late autumn, overcast diffuse daylight, no direct sun, no long shadows. ' +
  'Muted natural palette: wet brown soil, pale ochre stubble, grey-white sky, ' +
  'dark green hedgerows and poplar rows on the horizon. ' +
  'Full-frame camera, 35 mm lens, f/8, deep focus, natural colour, slight atmospheric haze, ' +
  'no HDR, no heavy vignette, no lens flare, no colour grading. ' +
  'Horizontal 3:2 framing. ' +
  'No visible faces, no readable text, no logos, no brand names, no watermark.';

/*
  Le copertine hanno un vincolo in più: ci va sopra l'H1 della pagina
  servizio, con un velo scuro al 60%. Servono cielo in alto, soggetto in
  basso e niente di importante al centro, o il titolo copre il lavoro.
*/
const CODA_COPERTINA =
  'Wide establishing shot, low horizon line in the lower third, ' +
  'large empty overcast sky filling the upper half of the frame, ' +
  'main subject small and placed low, nothing important in the centre of the frame.';

/* --------------------------------------------------------------- il piano */

/*
  Sette immagini per lavorazione: una copertina più sei di galleria. La
  pagina servizio usa la prima a tutto schermo e le altre sei sotto
  (servizi/[slug]/page.tsx: copertina = foto[0], galleria = foto.slice(1, 7)).
*/
const PIANO = {
  'rilevazione-altimetrica': [
    {
      slug: 'campo-da-rilevare',
      copertina: true,
      alt: 'Appezzamento di pianura in stoppie prima del rilievo altimetrico, con il treppiede della stazione laser piantato sul bordo del campo',
      scena:
        'An empty harvested lowland field in stubble. On the far left edge, small in the frame, ' +
        'a yellow surveying tripod carrying a rotating laser level. Tractor tracks curve across the bare soil. ' +
        'A drainage ditch and a line of bare poplars close the horizon.',
    },
    {
      slug: 'stazione-laser',
      alt: 'Stazione laser rotante montata su treppiede a bordo campo, usata per rilevare le quote del terreno',
      scena:
        'Close three-quarter view of a rotating laser level on a heavy yellow surveying tripod, ' +
        'standing on stubble at the edge of a ploughed field. Spirit level and control keypad visible on the instrument body, ' +
        'no readable markings. Shallow depth of field on the far field, sharp on the instrument.',
    },
    {
      slug: 'asta-ricevitore',
      alt: 'Operatore che regge l’asta graduata con il ricevitore laser in mezzo al campo durante il rilievo delle quote',
      scena:
        'Seen from behind at middle distance, a worker in a dark waterproof jacket and rubber boots holds a tall ' +
        'telescopic levelling staff upright in a bare field, a laser receiver clamped near the top. ' +
        'The face is not visible. The staff is vertical and dominates the right third of the frame.',
    },
    {
      slug: 'dettaglio-ricevitore',
      alt: 'Dettaglio del ricevitore laser fissato all’asta graduata, con il terreno del campo sullo sfondo',
      scena:
        'Tight detail of a laser receiver clamped to an aluminium levelling staff, held against an out-of-focus ' +
        'brown field and grey sky. Weathered plastic housing, rubber buttons, a small blank indicator strip. ' +
        'Rain droplets on the casing. No readable display, no visible brand.',
    },
    {
      slug: 'rilievo-con-quad',
      alt: 'Quad attrezzato per il rilievo che percorre il campo lungo la maglia dei punti da quotare',
      scena:
        'A small utility quad bike with a tall thin GPS antenna mast crossing a wide bare field along a straight line, ' +
        'seen from a low angle at middle distance, throwing up no dust on the damp soil. ' +
        'Parallel wheel tracks from previous passes visible on the ground.',
    },
    {
      slug: 'ristagno-dopo-pioggia',
      alt: 'Acqua ferma in una depressione del campo dopo la pioggia: il ristagno che il rilievo altimetrico individua',
      scena:
        'A shallow sheet of standing rainwater lying in a hollow of a bare ploughed field, reflecting the grey sky, ' +
        'with the drowned stubble and clods showing through. The wet patch occupies the lower half of the frame ' +
        'and the dry higher ground rises behind it.',
    },
    {
      slug: 'scarico-a-fine-campo',
      alt: 'Fossato di scolo al limite dell’appezzamento, il punto dove l’acqua del campo deve poter uscire',
      scena:
        'An open farm drainage ditch running along the edge of a field, freshly reprofiled, ' +
        'with a shallow stream of muddy water at the bottom and grass on the banks. ' +
        'A concrete pipe outlet is visible low in the bank on the right.',
    },
  ],

  'livellamento-laser': [
    {
      slug: 'campo-in-livellamento',
      copertina: true,
      alt: 'Campo di pianura durante il livellamento, con la livellatrice al lavoro in lontananza sotto un cielo coperto',
      scena:
        'A very wide bare field being levelled. Small and low on the right, a tractor pulling a land leveller ' +
        'with a long drawbar and a laser mast. The freshly cut surface is smooth and slightly darker ' +
        'than the untouched ground on the left.',
    },
    {
      slug: 'livellatrice-al-lavoro',
      alt: 'Trattore con livellatrice a controllo laser che taglia il terreno per dargli una pendenza costante',
      scena:
        'Side view at middle distance of an agricultural tractor pulling a land plane leveller across a bare field. ' +
        'A tall thin mast rises from the leveller frame with a laser receiver at the top. ' +
        'Soil rolls forward in front of the blade. Mud on the tyres, damp compacted ground behind.',
    },
    {
      slug: 'ricevitore-sull-asta',
      alt: 'Ricevitore laser in cima all’asta della livellatrice, che legge il piano di riferimento e corregge la quota della lama',
      scena:
        'Low angle looking up at a laser receiver mounted on top of a slim vertical mast on farm machinery, ' +
        'silhouetted against a flat overcast sky. Hydraulic hoses and a cable run down the mast. ' +
        'The machine frame is out of focus at the bottom of the frame.',
    },
    {
      slug: 'lama-che-taglia',
      alt: 'Dettaglio della lama della livellatrice che incide il terreno e spinge avanti la terra tagliata',
      scena:
        'Close view of the steel cutting edge of a land leveller blade slicing into damp brown soil, ' +
        'a roll of loose earth curling in front of it. Scratched worn metal, wet clods, ' +
        'the flat cut surface left behind visible on the right.',
    },
    {
      slug: 'trasmettitore-a-bordo-campo',
      alt: 'Trasmettitore laser su treppiede a bordo campo, riferimento di quota per la macchina che lavora in lontananza',
      scena:
        'A rotating laser transmitter on a tripod standing in the foreground grass at the field margin, sharp and close, ' +
        'with the levelling tractor working small and blurred in the far background of the same field.',
    },
    {
      slug: 'superficie-finita',
      alt: 'Superficie del campo dopo il livellamento: piano regolare senza avvallamenti, pronto per la semina',
      scena:
        'A perfectly even freshly levelled field surface filling the frame, seen at a low angle, ' +
        'fine tilth with faint parallel machine marks, no hollows and no standing water anywhere. ' +
        'Flat horizon and grey sky along the top edge.',
    },
    {
      slug: 'tracce-delle-passate',
      alt: 'Le passate parallele della livellatrice sul terreno appena lavorato, viste dall’alto del bordo campo',
      scena:
        'Elevated oblique view over a levelled field showing long parallel machine passes ' +
        'running away to the horizon, alternating slightly lighter and darker bands of soil. ' +
        'A drainage ditch crosses the far edge.',
    },
  ],

  'drenaggio-tubolare': [
    {
      slug: 'drenatrice-in-campo',
      copertina: true,
      alt: 'Drenatrice al lavoro in un campo di pianura per la posa di una linea di dreno sotterraneo',
      scena:
        'Very wide view of a bare field with a tracked drainage trencher working small and low on the left, ' +
        'a long straight line of disturbed soil stretching away behind it toward the horizon. ' +
        'Vast empty overcast sky above.',
    },
    {
      slug: 'drenatrice-al-lavoro',
      alt: 'Drenatrice a controllo laser che apre la trincea e posa il tubo drenante mantenendo la pendenza costante',
      scena:
        'Side view at middle distance of a heavy tracked drainage trencher cutting a narrow deep trench in a field, ' +
        'spoil thrown in a ridge to one side, a coil of black corrugated pipe feeding down through the machine chute, ' +
        'a laser receiver mast rising from the frame. Wet clay clinging to the tracks.',
    },
    {
      slug: 'rotolo-di-dreno',
      alt: 'Rotolo di tubo drenante corrugato microfessurato pronto in campo prima della posa',
      scena:
        'A large coil of black corrugated perforated plastic drainage pipe resting on the bare soil at the edge of a field, ' +
        'the narrow slots between the corrugations clearly visible. Mud on the lower coils, damp grass behind.',
    },
    {
      slug: 'trincea-con-dreno-posato',
      alt: 'Trincea aperta con il tubo drenante corrugato posato sul fondo, prima della richiusura',
      scena:
        'Looking down along an open narrow trench about one metre deep cut in brown clay soil, ' +
        'a black corrugated perforated drainage pipe lying along the bottom on a bed of clean gravel. ' +
        'The trench runs diagonally away from the camera. Sharp vertical trench walls, spoil heaped alongside.',
    },
    {
      slug: 'ghiaietto-sul-dreno',
      alt: 'Ghiaietto di filtro versato sopra il tubo drenante nella trincea, prima del rinterro',
      scena:
        'Close view into a trench where clean washed gravel is being poured over a black corrugated drainage pipe, ' +
        'partly covering it. Grey angular stones against wet brown clay walls. ' +
        'The chute of a gravel hopper enters the top of the frame.',
    },
    {
      slug: 'innesto-al-collettore',
      alt: 'Innesto delle linee di dreno nel collettore, dove l’acqua raccolta viene convogliata verso lo scarico',
      scena:
        'Several black corrugated drainage pipes converging and connected with plastic fittings ' +
        'into one larger smooth-walled collector pipe at the bottom of a wide excavated pit in a field. ' +
        'Wet clay walls, a shovel leaning at the edge.',
    },
    {
      slug: 'pozzetto-e-scarico',
      alt: 'Pozzetto di ispezione e bocca di scarico del drenaggio nel fosso a fine campo',
      scena:
        'A concrete inspection chamber set flush in the grass at the field margin with its cover lifted to one side, ' +
        'and beyond it a pipe outlet discharging clear water into an open ditch. ' +
        'Reeds and wet grass on the ditch banks.',
    },
  ],

  subirrigazione: [
    {
      slug: 'campo-con-impianto',
      copertina: true,
      alt: 'Campo servito da un impianto di subirrigazione, con la condotta di testata lungo il bordo',
      scena:
        'Very wide view of a flat cultivated field with a black polyethylene header pipe running along the near edge ' +
        'in the lower third of the frame, low and small. Even crop rows recede to a distant treeline. ' +
        'Large empty overcast sky above.',
    },
    {
      slug: 'posa-dell-ala',
      alt: 'Posa delle ali gocciolanti interrate dietro il trattore, alla profondità delle radici',
      scena:
        'A tractor moving away from the camera across a field, drawing a narrow injector shoe that buries ' +
        'a thin black driplinehose fed from a large reel mounted on the three-point linkage. ' +
        'A single narrow slit of disturbed soil closes behind the shoe.',
    },
    {
      slug: 'ala-interrata-dettaglio',
      alt: 'Dettaglio dell’ala gocciolante nel solco appena aperto, prima che il terreno si richiuda sopra',
      scena:
        'Tight low view of a thin black dripline lying at the bottom of a narrow freshly opened slit in damp brown soil, ' +
        'about thirty centimetres down, the walls of the slit crumbling slightly. Crop residue at the surface above.',
    },
    {
      slug: 'collettore-di-testata',
      alt: 'Collettore di testata dell’impianto di subirrigazione, con gli stacchi delle singole ali',
      scena:
        'A black polyethylene manifold pipe lying along a field headland with a row of plastic take-off fittings ' +
        'and small ball valves along its length, each connecting to a thin dripline running into the field. ' +
        'Grass and mud around the pipe.',
    },
    {
      slug: 'gocciolatore-dettaglio',
      alt: 'Dettaglio del gocciolatore integrato nell’ala, che rilascia l’acqua a portata bassa e continua',
      scena:
        'Macro detail of a short length of drip irrigation line held in a gloved hand against a blurred field background, ' +
        'showing an integrated inline emitter moulded into the tube wall. No face in frame. Damp plastic, ' +
        'a single drop of water forming at the outlet.',
    },
    {
      slug: 'coltura-uniforme',
      alt: 'Coltura uniforme irrigata dal basso: superficie del terreno asciutta e piante regolari lungo le file',
      scena:
        'Even rows of a healthy green field crop photographed at low level between two rows, ' +
        'the soil surface between the plants visibly dry and crusted while the crop is uniformly vigorous. ' +
        'Rows converge toward a flat horizon.',
    },
    {
      slug: 'filtro-e-valvole',
      alt: 'Gruppo di filtraggio e valvole all’avvio dell’impianto di subirrigazione',
      scena:
        'A compact irrigation filter and valve assembly at the head of a field: a cylindrical disc filter, ' +
        'pressure gauges with blank faces, ball valves and galvanised fittings on a simple steel frame, ' +
        'standing on bare ground against grey sky.',
    },
  ],

  'movimento-terra': [
    {
      slug: 'cantiere-in-campo',
      copertina: true,
      alt: 'Cantiere di movimento terra in un appezzamento agricolo, con l’escavatore al lavoro sulla rete di scolo',
      scena:
        'Very wide view of farmland with a tracked excavator working small and low on the right, ' +
        'reshaping a field ditch. A ridge of freshly moved soil runs along the ditch line. ' +
        'Vast empty overcast sky over a flat horizon.',
    },
    {
      slug: 'riprofilatura-scolina',
      alt: 'Escavatore che riprofila una scolina, ripristinando la sezione e la pendenza del fosso',
      scena:
        'A tracked excavator with a wide ditching bucket cutting a clean V-shaped profile into a farm ditch, ' +
        'seen from the opposite bank at middle distance. Fresh wet spoil spread in a strip along the field edge, ' +
        'the finished section of ditch visible in the foreground.',
    },
    {
      slug: 'formazione-capezzagna',
      alt: 'Formazione di una capezzagna transitabile con riporto di materiale e compattazione',
      scena:
        'A bulldozer or grader spreading and compacting a raised farm track along the edge of a field, ' +
        'the track surface of compacted gravelly soil clearly higher than the field beside it, ' +
        'with a shallow drainage ditch on the outer side.',
    },
    {
      slug: 'scavo-dell-invaso',
      alt: 'Scavo di un invaso per l’acqua irrigua, con le sponde in corso di sagomatura',
      scena:
        'A large rectangular earth basin under excavation in flat farmland, seen from the bank, ' +
        'battered side slopes shaped by machine, a tracked excavator working small at the far end, ' +
        'dump trucks on a ramp carrying spoil out.',
    },
    {
      slug: 'invaso-finito',
      alt: 'Invaso irriguo completato e pieno d’acqua, con le sponde inerbite e l’argine perimetrale',
      scena:
        'A finished farm irrigation reservoir holding still water reflecting the grey sky, ' +
        'grassed battered banks and a low perimeter embankment, a simple inlet pipe on the near side. ' +
        'Flat cultivated fields beyond.',
    },
    {
      slug: 'profilo-di-scavo-dettaglio',
      alt: 'Dettaglio del profilo di scavo, con gli strati del terreno messi a nudo dalla benna',
      scena:
        'Close view of a freshly cut vertical earth face in an excavation, showing the darker topsoil layer ' +
        'over lighter clay subsoil, with the parallel marks of the bucket teeth raked down the face. ' +
        'Loose clods at the foot.',
    },
    {
      slug: 'trasporto-terra',
      alt: 'Trasporto del materiale di scavo con dumper lungo la pista di cantiere',
      scena:
        'An articulated site dumper loaded with wet brown soil driving along a muddy haul track across farmland, ' +
        'seen from the side at middle distance, deep tyre ruts filled with rainwater in the track.',
    },
  ],

  bonifiche: [
    {
      slug: 'terreno-da-recuperare',
      copertina: true,
      alt: 'Terreno agricolo da recuperare, con le zone di ristagno che ogni anno si perdono',
      scena:
        'Very wide view of a neglected flat field, patches of standing water lying in hollows in the lower third, ' +
        'rough uneven ground and clumps of coarse weeds. A broken line of scrub marks the far boundary. ' +
        'Vast empty overcast sky above.',
    },
    {
      slug: 'ristagno-prima',
      alt: 'Ristagno cronico in una depressione del campo prima della bonifica, con la coltura persa',
      scena:
        'A waterlogged hollow inside a cultivated field, the crop drowned and yellowed in the wet patch ' +
        'while it stands green and normal on the higher ground around it. Sharp visible boundary between the two.',
    },
    {
      slug: 'appezzamento-abbandonato',
      alt: 'Appezzamento abbandonato invaso da vegetazione spontanea, prima dell’intervento di recupero',
      scena:
        'An abandoned agricultural plot overgrown with tall dry weeds, brambles and self-seeded saplings, ' +
        'an old collapsed ditch running through it, a rusted fence post leaning in the foreground.',
    },
    {
      slug: 'lavori-in-corso',
      alt: 'Lavori di bonifica in corso: livellamento e riordino delle scoline sullo stesso appezzamento',
      scena:
        'A field mid-reclamation with two machines working at different points: a tracked excavator on a ditch line ' +
        'and a tractor with a land leveller further away, half the field already smoothed and half still rough. ' +
        'Seen from an elevated oblique angle.',
    },
    {
      slug: 'nuova-rete-di-scoline',
      alt: 'Nuova rete di scoline aperta e profilata durante la bonifica del terreno',
      scena:
        'Freshly cut open drainage ditches forming clean straight lines across a bare reclaimed field, ' +
        'sharp trapezoidal profiles, bright raw soil on the banks, converging toward a larger channel at the far edge.',
    },
    {
      slug: 'posa-dreni-in-bonifica',
      alt: 'Posa dei dreni durante la bonifica, integrata con il livellamento e il riordino degli scoli',
      scena:
        'A drainage trencher laying black corrugated pipe across a reclaimed field, ' +
        'with the freshly reprofiled ditch network visible in the background of the same field. ' +
        'Long straight lines of disturbed soil converging.',
    },
    {
      slug: 'terreno-recuperato',
      alt: 'Terreno bonificato e tornato lavorabile, arato in modo regolare e senza zone di ristagno',
      scena:
        'The same kind of flat field after reclamation: evenly ploughed, regular straight furrows running to the horizon, ' +
        'no standing water anywhere, a clean profiled ditch along the near edge. Damp brown soil, grey sky.',
    },
  ],

  'scavi-e-demolizioni': [
    {
      slug: 'scavo-in-corso',
      copertina: true,
      alt: 'Scavo in corso con escavatore cingolato in un’area di cantiere in aperta campagna',
      scena:
        'Very wide view of an excavation site in open countryside, a tracked excavator working small and low ' +
        'on the right beside an open trench, a heap of spoil alongside. ' +
        'Vast empty overcast sky over a flat horizon.',
    },
    {
      slug: 'scavo-a-sezione-obbligata',
      alt: 'Scavo a sezione obbligata per la posa di una condotta, con le pareti in sicurezza e il fondo in quota',
      scena:
        'An open trench about two metres deep with battered sloping sides cut in brown soil, ' +
        'running diagonally through the frame, a flat prepared bottom, spoil heaped along one side, ' +
        'a tracked excavator standing at the far end.',
    },
    {
      slug: 'condotta-su-letto-di-posa',
      alt: 'Condotta posata sul letto di ghiaietto nel fondo dello scavo, prima del rinfianco',
      scena:
        'Looking down into a trench where a large smooth-walled plastic pipe rests on a bed of clean gravel, ' +
        'the gravel bedding clearly levelled beneath it. Wet trench walls, a laser level tripod at the trench edge above.',
    },
    {
      slug: 'demolizione-fabbricato',
      alt: 'Demolizione di un fabbricato rurale dismesso con escavatore attrezzato a pinza',
      scena:
        'A tracked excavator fitted with a sorting grapple pulling down the brick wall of a small derelict farm building, ' +
        'roof already removed, broken masonry falling. Dust suppressed by damp weather. ' +
        'Bare fields visible behind the building.',
    },
    {
      slug: 'materiali-separati',
      alt: 'Materiali di risulta separati in cumuli distinti per il conferimento: inerti, legno e metalli',
      scena:
        'Three distinct separated piles of demolition material on a cleared yard: broken brick and concrete rubble, ' +
        'old timber beams and boards, and twisted scrap metal, each in its own heap with clear ground between them.',
    },
    {
      slug: 'benna-e-muratura-dettaglio',
      alt: 'Dettaglio della pinza dell’escavatore che afferra la muratura durante la demolizione selettiva',
      scena:
        'Close view of the steel jaws of a demolition grapple closing on a section of old brick wall, ' +
        'mortar crumbling, individual bricks separating. Scratched hydraulic ram and hoses visible. ' +
        'Overcast sky behind.',
    },
    {
      slug: 'area-ripristinata',
      alt: 'Area ripristinata dopo la demolizione, con il terreno riportato in quota e di nuovo utilizzabile',
      scena:
        'A cleared and levelled plot of ground where a building has been removed, ' +
        'the soil graded flat and clean with no rubble left, faint machine tracks across it, ' +
        'the neighbouring farm buildings and fields around the edges.',
    },
  ],

  'tubi-irrigazione-edilizia': [
    {
      slug: 'deposito-materiali',
      copertina: true,
      alt: 'Deposito dei materiali per irrigazione e drenaggio, con le cataste di tubi all’aperto',
      scena:
        'Very wide view of an outdoor materials yard: stacks and coils of pipe arranged in low rows ' +
        'along the lower third of the frame, gravel ground, a simple open shed on the left. ' +
        'Large empty overcast sky above, nothing important in the centre.',
    },
    {
      slug: 'rotoli-di-dreno-in-deposito',
      alt: 'Rotoli di tubo drenante corrugato accatastati in deposito, pronti per la vendita',
      scena:
        'Several large coils of black corrugated perforated drainage pipe stacked on a pallet in a yard, ' +
        'the slots between corrugations visible on the nearest coil. Damp gravel ground, plain grey sky.',
    },
    {
      slug: 'tubi-per-diametro',
      alt: 'Tubazioni in polietilene e PVC ordinate per diametro nelle rastrelliere del deposito',
      scena:
        'Rows of plastic pipes of clearly different diameters, from small to large, ' +
        'stacked horizontally in steel racks in a covered store, the open cut ends facing the camera ' +
        'so the varying wall thickness and bore are visible. Even diffuse light.',
    },
    {
      slug: 'raccorderia',
      alt: 'Raccorderia per irrigazione e drenaggio: curve, TE, manicotti e giunzioni sugli scaffali',
      scena:
        'Shelves of plastic pipe fittings in a store: elbows, tee pieces, couplers, reducers and compression joints ' +
        'sorted in open bins by size. Plain unlabelled bins, no readable text anywhere.',
    },
    {
      slug: 'pozzetti',
      alt: 'Pozzetti di ispezione in deposito, usati per il controllo e l’innesto delle linee di drenaggio',
      scena:
        'Several plastic and concrete inspection chambers of different sizes standing together in a yard, ' +
        'some with lids on and some open showing the inlet sockets in the walls. Wet gravel underfoot.',
    },
    {
      slug: 'dreno-fessurato-dettaglio',
      alt: 'Dettaglio delle microfessure sul tubo drenante corrugato, le aperture da cui entra l’acqua',
      scena:
        'Macro detail of a short cut length of black corrugated drainage pipe lying on a workbench, ' +
        'showing the narrow slots cut between the corrugation ridges and the open cut end with its ribbed wall. ' +
        'Even soft light, plain background.',
    },
    {
      slug: 'carico-del-materiale',
      alt: 'Carico dei tubi su rimorchio in deposito, per la consegna in cantiere',
      scena:
        'Coils of drainage pipe and bundles of plastic pipe being loaded onto a flatbed trailer in a yard, ' +
        'a telehandler forks under a bundle, seen from the side at middle distance. No faces visible.',
    },
  ],
};

/* ---------------------------------------------------------------- uscita */

const nomeFile = (i, slug) => `${String(i + 1).padStart(2, '0')}-${slug}.jpg`;

function prompt(voce, servizio) {
  return [voce.scena, voce.copertina ? CODA_COPERTINA : null, STILE]
    .filter(Boolean)
    .join(' ');
}

/* ------------------------------------------------------------------- md */

const righe = [];
righe.push('# Le fotografie di Arcobaleno — prompt e nomi dei file');
righe.push('');
righe.push(
  'Generato da `scripts/piano-foto.mjs`. **Non si modifica a mano**: si cambia lo\n' +
    'script e si rigenera, perché da lì escono anche le descrizioni alternative.',
);
righe.push('');
righe.push('## Come si fa');
righe.push('');
righe.push(
  '1. Un prompt alla volta, tutto intero, nel generatore di immagini.\n' +
    '2. Scarichi l’immagine e la **rinomini col nome indicato sopra il prompt**.\n' +
    '3. La metti nella cartella della sua lavorazione:\n' +
    '   `src/clienti/arcobaleno/intake/foto/<lavorazione>/`\n' +
    '4. Quando ne hai messe un po’, anche non tutte:\n' +
    '   ```bash\n' +
    '   CLIENTE=arcobaleno npm run intake:foto\n' +
    '   ```',
);
righe.push('');
righe.push(
  'Il nome del file conta: da quello lo script prende la descrizione alternativa\n' +
    'già scritta in `alt.json`, e l’ordine di apertura della pagina. Un nome\n' +
    'diverso funziona lo stesso, ma la foto si prende una descrizione di ripiego\n' +
    'e lo script te lo dice.',
);
righe.push('');
righe.push('## Due cose che il generatore sbaglia spesso');
righe.push('');
righe.push(
  '- **Il tubo drenante** deve essere corrugato e microfessurato, nero, non liscio\n' +
    '  e non arancione. Se esce un tubo liscio, rigenera.\n' +
    '- **Il testo**: qualunque scritta, targa o marchio nell’immagine esce\n' +
    '  storpiato e va scartato. I prompt lo escludono già, ma controlla.',
);
righe.push('');
righe.push(
  'I prompt sono in inglese di proposito: i generatori seguono molto meglio i\n' +
    'termini tecnici in inglese. Il titolo sopra ognuno è in italiano.',
);
righe.push('');
righe.push('---');
righe.push('');

let totale = 0;
for (const [servizio, voci] of Object.entries(PIANO)) {
  righe.push(`## ${servizio}`);
  righe.push('');
  voci.forEach((v, i) => {
    const nome = nomeFile(i, v.slug);
    righe.push(`### ${nome}${v.copertina ? '  — copertina, a tutto schermo' : ''}`);
    righe.push('');
    righe.push('```text');
    righe.push(prompt(v, servizio));
    righe.push('```');
    righe.push('');
    totale += 1;
  });
}

righe.push('---');
righe.push('');
righe.push(`${totale} fotografie in tutto, ${Object.keys(PIANO).length} lavorazioni.`);
righe.push('');

await writeFile(path.join(INTAKE, 'PROMPT-FOTO.md'), `${righe.join('\n')}`, 'utf8');

/* -------------------------------------------------------------- alt.json */

/*
  Le descrizioni si scrivono adesso, prima che le foto esistano.

  Le voci già presenti non si toccano: nella stessa cartella stanno anche i
  disegni tecnici (zz-schema-*), scritti da un altro script. Unire invece che
  sovrascrivere è l'unico modo perché i due script convivano nella stessa
  cartella senza cancellarsi il lavoro a vicenda.
*/
let scritte = 0;
for (const [servizio, voci] of Object.entries(PIANO)) {
  const f = path.join(INTAKE, 'foto', servizio, 'alt.json');
  const esistente = existsSync(f) ? JSON.parse(await readFile(f, 'utf8')) : {};

  voci.forEach((v, i) => {
    const nome = nomeFile(i, v.slug);
    if (esistente[nome]) return;
    esistente[nome] = { slug: v.slug, alt: v.alt, generata: true };
    scritte += 1;
  });

  await writeFile(f, `${JSON.stringify(esistente, null, 1)}\n`, 'utf8');
}

console.log(`\n  ${totale} prompt in src/clienti/${CLIENTE}/intake/PROMPT-FOTO.md`);
console.log(`  ${scritte} descrizioni alternative preparate in alt.json`);
console.log(
  `\n  Le foto vanno in src/clienti/${CLIENTE}/intake/foto/<lavorazione>/\n` +
    `  col nome scritto sopra il prompt. Poi: CLIENTE=${CLIENTE} npm run intake:foto\n`,
);
