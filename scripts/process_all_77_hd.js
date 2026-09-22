import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:\\Users\\RYESA\\Documents\\productos a descargar';
const TARGET_DIR = 'C:\\Users\\RYESA\\Documents\\productos_descargados_hd';

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Complete catalog specification for all 77 items
export const CATALOG = [
  {
    index: 1,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.36 (1).jpeg',
    store: 'Pinterest Paula Galez',
    title: 'Vestido largo de fiesta palabra de honor blanco con lazos laterales',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 25000,
    colors: ['Blanco'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.28, leftPercent: 0, rightPercent: 0 },
    hdUrl: 'https://i.pinimg.com/736x/88/5d/bc/885dbc713915bc2f10b7410065985860.jpg'
  },
  {
    index: 2,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.36 (2).jpeg',
    store: 'Catálogo Mayorista',
    title: 'Colección de vestidos cortos drapeados de tirantes en 10 colores',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 15000,
    colors: ['Marrón', 'Blanco', 'Negro', 'Rojo', 'Burdeos', 'Azul Marino', 'Celeste', 'Amarillo', 'Rosa', 'Morado'],
    cropOptions: null
  },
  {
    index: 3,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.36.jpeg',
    store: 'Kylie Jenner Closet',
    title: 'Mono enterizo ajustado manga larga con estampado animal abstracto',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 28000,
    colors: ['Estampado Cebra Blanco y Negro'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.06, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 4,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.37.jpeg',
    store: 'Boutique Collection',
    title: 'Conjunto casual de 2 piezas top corto y pantalón palazzo fluido azul celeste',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 20000,
    colors: ['Azul Celeste'],
    cropOptions: null
  },
  {
    index: 5,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.38 (1).jpeg',
    store: 'Boutique Festival',
    title: 'Conjunto festival lentejuelas estampado leopardo top corto y shorts',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Rosa Leopardo', 'Marrón Leopardo'],
    cropOptions: null
  },
  {
    index: 6,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.38 (2).jpeg',
    store: 'Taobao 1688',
    title: 'Top halter plisado espalda al aire con bajo de volantes y lazada',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 12000,
    colors: ['Blanco', 'Beige', 'Negro', 'Rosa', 'Rojo', 'Azul'],
    cropOptions: { topPercent: 0, bottomPercent: 0.12, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 7,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.38.jpeg',
    store: 'SHEIN',
    title: 'Vestido largo de punto calado bohemio blanco con ribete negro y escote halter',
    category: 'VESTIDOS',
    priceOriginal: '15,65 €',
    priceFCFA: 18000,
    colors: ['Blanco con ribete negro'],
    cropOptions: null,
    hdUrl: 'https://img.ltwebstatic.com/images3_pi/2024/03/09/17/17099631225d1e502ce457171bcf4ab5f51e7113c0.webp'
  },
  {
    index: 8,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.39 (1).jpeg',
    store: 'Boutique Casual',
    title: 'Conjunto homewear 2 piezas camiseta entallada y pantalón ancho burdeos',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 18000,
    colors: ['Burdeos / Vino'],
    cropOptions: null
  },
  {
    index: 9,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.39 (2).jpeg',
    store: 'Boutique La Esono Semu Malabo',
    title: 'Top asimétrico blanco con lazada al hombro y pantalón vaquero',
    category: 'MODA',
    priceOriginal: '10.000 FCFA',
    priceFCFA: 10000,
    colors: ['Blanco'],
    cropOptions: { topPercent: 0.12, bottomPercent: 0.12, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 10,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.39.jpeg',
    store: 'Boutique Cóctel',
    title: 'Vestido corto de fiesta tutú palabra de honor en tul plisado lila con lazo',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Lila', 'Rosa Palo', 'Rojo', 'Negro', 'Fucsia', 'Burdeos', 'Blanco', 'Azul Real'],
    cropOptions: { topPercent: 0, bottomPercent: 0.12, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 11,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.40 (1).jpeg',
    store: 'Loewe Style Cafe Verde',
    title: 'Conjunto verano top canalé Loewe anagrama blanco y falda midi cuadros vichy rojo',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Blanco y Rojo'],
    cropOptions: null
  },
  {
    index: 12,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.40.jpeg',
    store: 'Eyzan Boutique Malabo',
    title: 'Vestido largo de fiesta amarillo con cuello barco y drapeado en cintura',
    category: 'VESTIDOS',
    priceOriginal: '13.000 FCFA',
    priceFCFA: 13000,
    colors: ['Amarillo'],
    cropOptions: { topPercent: 0.10, bottomPercent: 0.10, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 13,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.41 (1).jpeg',
    store: 'Novedades Campeon David Malabo',
    title: 'Mono enterizo ajustado deportivo canalé con cremallera frontal blanco y negro',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 18000,
    colors: ['Blanco', 'Negro'],
    cropOptions: { topPercent: 0.12, bottomPercent: 0.10, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 14,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.41 (2).jpeg',
    store: 'SHEIN',
    title: 'Vestido de punto largo bohemio blanco elegante y de moda para vacaciones',
    category: 'VESTIDOS',
    priceOriginal: '15,65 €',
    priceFCFA: 18000,
    colors: ['Blanco'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.40, leftPercent: 0, rightPercent: 0 },
    hdUrl: 'https://img.ltwebstatic.com/images3_pi/2024/03/09/17/17099631225d1e502ce457171bcf4ab5f51e7113c0.webp'
  },
  {
    index: 15,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.41 (3).jpeg',
    store: 'SHEIN BASICS',
    title: 'Set de 3 piezas body casual de cuello redondo sin mangas blanco celeste negro',
    category: 'MODA',
    priceOriginal: '17,45 €',
    priceFCFA: 20000,
    colors: ['Blanco', 'Celeste', 'Negro'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.32, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 16,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.41.jpeg',
    store: 'TikTok thareal tilda',
    title: 'Vestido maxi peplum y falda con volantes cuadros vichy rojo y blanco',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Rojo y Blanco'],
    cropOptions: null
  },
  {
    index: 17,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.42 (1).jpeg',
    store: 'SHEIN',
    title: 'Vestido casual y elegante para mujer top palabra de honor negro falda leopardo',
    category: 'VESTIDOS',
    priceOriginal: '6,08 €',
    priceFCFA: 12000,
    colors: ['Negro y Leopardo'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.32, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 18,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.42 (2).jpeg',
    store: 'SHEIN INAWLY Solva',
    title: 'INAWLY Solva Vestido Largo Y Sin Espalda De Mujer color óxido marrón',
    category: 'VESTIDOS',
    priceOriginal: '9,15 €',
    priceFCFA: 15000,
    colors: ['Óxido Marrón'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.30, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 19,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.42 (3).jpeg',
    store: 'Boutique Festival',
    title: 'Conjunto festival lentejuelas estampado leopardo rojo top corto y shorts studio',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Rojo Leopardo'],
    cropOptions: null
  },
  {
    index: 20,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.42.jpeg',
    store: 'Pinterest Esperanza Funk',
    title: 'Conjunto corsé escote fruncido manga corta y falda midi marrón chocolate',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 25000,
    colors: ['Marrón Chocolate'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.15, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 21,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.43 (1).jpeg',
    store: 'SHEIN',
    title: 'Set de 2 piezas top ajustado cuello asimétrico y leggings 3/4 rojo',
    category: 'MODA',
    priceOriginal: '13,56 €',
    priceFCFA: 16000,
    colors: ['Rojo'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.30, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 22,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.43 (2).jpeg',
    store: 'SHEIN',
    title: 'Camiseta de tirantes corta acanalada con diseño de diamantes blanco',
    category: 'MODA',
    priceOriginal: '6,57 €',
    priceFCFA: 10000,
    colors: ['Blanco con pedrería'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.28, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 23,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.43 (3).jpeg',
    store: 'SHEIN CURVE',
    title: 'Conjunto informal 2 piezas top sin mangas hombro asimétrico y pantalón con lazo celeste',
    category: 'MODA',
    priceOriginal: '12,67 €',
    priceFCFA: 16000,
    colors: ['Celeste'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.30, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 24,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.43.jpeg',
    store: 'SHEIN MainGRL',
    title: 'MainGRL Set de camisa y pantalones cortos a cuadros vichy tejidos rojo y blanco',
    category: 'MODA',
    priceOriginal: '18,66 €',
    priceFCFA: 22000,
    colors: ['Rojo y Blanco'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.30, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 25,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.44 (1).jpeg',
    store: 'SHEIN SHAPORA',
    title: 'SHAPORA Body moldeador elegante con diseño de copa control de barriga vino',
    category: 'MODA',
    priceOriginal: '8,36 €',
    priceFCFA: 14000,
    colors: ['Vino / Burdeos'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.28, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 26,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.44 (2).jpeg',
    store: 'SHEIN CURVE Soleia',
    title: 'Soleia Conjunto de 3 piezas talla grande top asimétrico pañuelo negro blanco leopardo',
    category: 'MODA',
    priceOriginal: '13,69 €',
    priceFCFA: 18000,
    colors: ['Negro', 'Blanco', 'Leopardo'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.28, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 27,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.44.jpeg',
    store: 'SHEIN SXY',
    title: 'SHEIN SXY Conjunto informal de top asimétrico con nudo y pantalón capri estampado leopardo',
    category: 'MODA',
    priceOriginal: '14,83 €',
    priceFCFA: 18000,
    colors: ['Estampado Leopardo'],
    cropOptions: null,
    hdUrl: 'https://img.ltwebstatic.com/v4/j/pi/2026/03/30/67/1774852600cb1df9d76e05d24b37bace984a601044.jpg'
  },
  {
    index: 28,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.45 (1).jpeg',
    store: 'Taobao 1688',
    title: 'Vestido largo palabra de honor bicolor top negro y falda globo marfil',
    category: 'VESTIDOS',
    priceOriginal: '¥56.66',
    priceFCFA: 16000,
    colors: ['Negro y Marfil'],
    cropOptions: { topPercent: 0, bottomPercent: 0.16, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 29,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.45 (2).jpeg',
    store: 'Pinterest kikirajx0',
    title: 'Conjunto casual 2 piezas top tirantes escote redondo y pantalón palazzo amarillo pastel',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 20000,
    colors: ['Amarillo Pastel'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.15, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 30,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.45 (3).jpeg',
    store: 'Pinterest London',
    title: 'Conjunto estilo corsé con bajo en pico y pantalón pitillo cuadros vichy beige',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Beige y Blanco'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.15, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 31,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.45.jpeg',
    store: 'SHEIN SXY CURVE',
    title: 'SHEIN SXY Blusa de tela de red albaricoque con pliegues cuello halter para mujer',
    category: 'MODA',
    priceOriginal: '6,93 €',
    priceFCFA: 12000,
    colors: ['Albaricoque / Marfil'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.30, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 32,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.46 (1).jpeg',
    store: 'Boutique La Esono Semu Malabo',
    title: 'Vestido blanco largo fluido con capa y cuello alto Tallas M L XL',
    category: 'VESTIDOS',
    priceOriginal: '20.000 FCFA',
    priceFCFA: 20000,
    colors: ['Blanco'],
    cropOptions: { topPercent: 0.12, bottomPercent: 0.12, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 33,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.46.jpeg',
    store: 'TikTok prettykeyti',
    title: 'Top negro cruzado al cuello con hebilla metálica dorada y bolso bandolera',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 12000,
    colors: ['Negro'],
    cropOptions: { topPercent: 0.12, bottomPercent: 0.12, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 34,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.47 (1).jpeg',
    store: 'Pinterest Lancome Event',
    title: 'Vestido largo de gala asimétrico con drapeado en hombro blanco roto',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 28000,
    colors: ['Blanco Roto / Crema'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 35,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.47 (2).jpeg',
    store: 'SHEIN INAWLY',
    title: 'INAWLY Vestido de ballet para mujer con cuello halter y falda de volantes blanco',
    category: 'VESTIDOS',
    priceOriginal: '12,19 €',
    priceFCFA: 16000,
    colors: ['Blanco'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.28, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 36,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.47 (3).jpeg',
    store: 'WeChat Fashion',
    title: 'Vestido largo bodycon palabra de honor con estampado trampantojo de silueta femenina',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Blanco y Negro'],
    cropOptions: { topPercent: 0.12, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 37,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.47.jpeg',
    store: 'Pinterest kkartier0',
    title: 'Vestido mini palabra de honor rosa fucsia con falda de volantes escalonados',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 18000,
    colors: ['Rosa Fucsia'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.15, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 38,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.48 (1).jpeg',
    store: 'SHEIN SXY',
    title: 'SHEIN SXY Conjunto de 2 piezas top halter con lazos frontales y falda blanca',
    category: 'MODA',
    priceOriginal: '15,74 €',
    priceFCFA: 18000,
    colors: ['Blanco'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.30, leftPercent: 0, rightPercent: 0 },
    hdUrl: 'https://img.ltwebstatic.com/images3_pi/2024/10/15/c7/172897673449f5c1bab48e2df941996e418ff6a98e.jpg'
  },
  {
    index: 39,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.48 (2).jpeg',
    store: 'Taobao Pinduoduo',
    title: 'Vestido lencero corto entallado con encaje y estampado floral naranja',
    category: 'VESTIDOS',
    priceOriginal: '¥39.00',
    priceFCFA: 14000,
    colors: ['Naranja Floral'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.18, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 40,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.48.jpeg',
    store: 'Zara sinoteamo',
    title: 'Zara Vestido corto palabra de honor azul cielo con maxi lazada escultural',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Azul Cielo'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.18, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 41,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.49 (1).jpeg',
    store: 'House of CB Style',
    title: 'Vestido midi corsé escote recto y falda de vuelo cuadros vichy rosa y amarillo pastel',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 28000,
    colors: ['Rosa Pastel', 'Amarillo Pastel'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.18, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 42,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.49 (2).jpeg',
    store: 'Taobao Pinduoduo',
    title: 'Conjunto deportivo camiseta entallada y shorts ciclista de tiro alto amarillo pastel',
    category: 'MODA',
    priceOriginal: '¥20.80',
    priceFCFA: 12000,
    colors: ['Amarillo Pastel'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.18, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 43,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.49 (3).jpeg',
    store: 'Boutique Editorial',
    title: 'Editorial moda conjunto acanalado camiseta y pantalón acampanado con cinta pelo pastel',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 20000,
    colors: ['Celeste', 'Verde Menta', 'Rosa Claro'],
    cropOptions: null
  },
  {
    index: 44,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.49.jpeg',
    store: 'Pinterest Glow Goodie',
    title: 'Vestido mini camisero estilo tenista blanco escote halter con cuello y cinturón marrón',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 20000,
    colors: ['Blanco'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.20, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 45,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.50 (1).jpeg',
    store: 'TikTok suriiz',
    title: 'Conjunto deportivo chaqueta corta con cremallera y mallas con diadema amarillo neón',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 18000,
    colors: ['Amarillo Neón'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.10, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 46,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.50 (2).jpeg',
    store: 'Taobao Pinduoduo',
    title: 'Conjunto casual camiseta entallada y pantalón yoga con cintura drapeada rosa pastel',
    category: 'MODA',
    priceOriginal: '¥32.80',
    priceFCFA: 15000,
    colors: ['Rosa Pastel'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.18, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 47,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.50.jpeg',
    store: 'Taobao Pinduoduo',
    title: 'Conjunto yoga térmico de compresión camiseta cuello redondo y leggings morado ciruela',
    category: 'MODA',
    priceOriginal: '¥75.80',
    priceFCFA: 18000,
    colors: ['Morado Ciruela'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.18, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 48,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.51 (1).jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Bolso cilindro baguette con estampado de lunares y charm corazón marrón rojo negro crema',
    category: 'ACCESORIOS',
    priceOriginal: '2.000 FCFA',
    priceFCFA: 2000,
    colors: ['Marrón', 'Rojo', 'Negro', 'Crema'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.06, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 49,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.51 (2).jpeg',
    store: 'Streetstyle Chic',
    title: 'Conjunto 2 piezas top sin mangas y pantalón capri estampado lunares amarillo y negro',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 18000,
    colors: ['Amarillo y Negro'],
    cropOptions: null
  },
  {
    index: 50,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.51 (3).jpeg',
    store: 'Catálogo Moda',
    title: 'Vestido midi verano nido de abeja tirantes cuadros vichy rojo y blanco studio',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 20000,
    colors: ['Rojo y Blanco'],
    cropOptions: null
  },
  {
    index: 51,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.51.jpeg',
    store: 'Boutique Selfie',
    title: 'Conjunto casual top manga larga cuello redondo y minishort amarillo pastel con diadema',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 16000,
    colors: ['Amarillo Pastel'],
    cropOptions: null
  },
  {
    index: 52,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.52 (1).jpeg',
    store: 'Instagram Boutique',
    title: 'Conjunto 2 piezas top nido de abeja y falda maxi cuadros vichy café con leche',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 22000,
    colors: ['Café y Crema'],
    cropOptions: null
  },
  {
    index: 53,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.52 (2).jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Vestido largo playero acuarela escote halter con fajín de ganchillo marrón y abertura',
    category: 'VESTIDOS',
    priceOriginal: '4.500 FCFA',
    priceFCFA: 4500,
    colors: ['Multicolor Acuarela y Marrón'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 54,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.52 (3).jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Vestido corto manga murciélago con escote cowl drapeado y espalda abierta',
    category: 'VESTIDOS',
    priceOriginal: '5.500 FCFA',
    priceFCFA: 5500,
    colors: ['Rojo Lunares', 'Leopardo Marrón'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 55,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.52.jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Vestido midi manga murciélago con cintura drapeada fruncida',
    category: 'VESTIDOS',
    priceOriginal: '6.000 FCFA',
    priceFCFA: 6000,
    colors: ['Blanco', 'Crema', 'Verde Manzana', 'Gris Azulado'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 56,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.53 (1).jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Cartera de mano sobre trenzada con broche dorado de lujo',
    category: 'ACCESORIOS',
    priceOriginal: '2.000 FCFA',
    priceFCFA: 2000,
    colors: ['Negro', 'Blanco', 'Burdeos', 'Camel', 'Marrón'],
    cropOptions: { topPercent: 0.05, bottomPercent: 0.05, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 57,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.53 (2).jpeg',
    store: 'Club L London',
    title: 'Vestido de gala palabra de honor marrón chocolate con fular y abertura en falda',
    category: 'VESTIDOS',
    priceOriginal: 'No especificado',
    priceFCFA: 35000,
    colors: ['Marrón Chocolate'],
    cropOptions: null
  },
  {
    index: 58,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.53 (3).jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Conjunto 2 piezas top asimétrico manga corta y falda midi bajo pañuelo',
    category: 'MODA',
    priceOriginal: '5.500 FCFA',
    priceFCFA: 5500,
    colors: ['Marrón Moka', 'Blanco Marfil', 'Vino Tinto'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 59,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.53.jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Bailarinas de rejilla Mary Jane con tira ajustable y lazo frontal',
    category: 'CALZADO',
    priceOriginal: '3.500 FCFA',
    priceFCFA: 3500,
    colors: ['Rojo', 'Negro', 'Nude Camel'],
    cropOptions: null
  },
  {
    index: 60,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.54 (1).jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Conjunto 2 piezas top bustier corazón y falda larga drapeada abertura asimétrica lunares',
    category: 'MODA',
    priceOriginal: '4.500 FCFA',
    priceFCFA: 4500,
    colors: ['Blanco Lunares Negros', 'Marrón Lunares Blancos'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 61,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.54 (2).jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Vestido largo de tirantes a rayas con escote pronunciado y espalda abierta',
    category: 'VESTIDOS',
    priceOriginal: '4.000 FCFA',
    priceFCFA: 4000,
    colors: ['Negro Rayas', 'Rosa Rayas', 'Celeste Rayas'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 62,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.54 (3).jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Conjunto 2 piezas top tirantes y pantalón culotte fluido azul marino',
    category: 'MODA',
    priceOriginal: '4.000 FCFA',
    priceFCFA: 4000,
    colors: ['Azul Marino'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 63,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.54.jpeg',
    store: 'WhatsApp Status Boutique',
    title: 'Vestido camisero polo de punto a rayas con falda plisada evasé fucsia y gris',
    category: 'VESTIDOS',
    priceOriginal: '4.000 FCFA',
    priceFCFA: 4000,
    colors: ['Fucsia y Blanco', 'Gris y Blanco'],
    cropOptions: null
  },
  {
    index: 64,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.55 (1).jpeg',
    store: 'Catálogo Calzado de Lujo',
    title: 'Sandalias tacón fino verde esmeralda punta cuadrada con tiras joya de cristales',
    category: 'CALZADO',
    priceOriginal: 'No especificado',
    priceFCFA: 25000,
    colors: ['Verde Esmeralda'],
    cropOptions: null
  },
  {
    index: 65,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.55.jpeg',
    store: 'Alice Run Active',
    title: 'Camisetas deportivas running compresión secado rápido Alice Run en 4 colores pastel',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 10000,
    colors: ['Azul Perla', 'Blanco', 'Verde Menta', 'Amarillo Pastel'],
    cropOptions: null
  },
  {
    index: 66,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.56 (1).jpeg',
    store: 'ZARZ Boutique',
    title: 'Vestido corto corte evasé cuello halter con lazada y abertura lágrima',
    category: 'VESTIDOS',
    priceOriginal: '6.500 FCFA',
    priceFCFA: 6500,
    colors: ['Rosa', 'Blanco con Lunares', 'Negro'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 67,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.56 (2).jpeg',
    store: 'SHEIN Girlism',
    title: 'SHEIN Girlism Camiseta corta blanca con estampado floral lirio fucsia',
    category: 'MODA',
    priceOriginal: '5,96 €',
    priceFCFA: 10000,
    colors: ['Blanco'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.30, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 68,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.56.jpeg',
    store: 'MANGO MNG',
    title: 'Sandalias planas de piel negra con tira en el dedo y aplique dorado MNG',
    category: 'CALZADO',
    priceOriginal: 'No especificado',
    priceFCFA: 20000,
    colors: ['Negro'],
    cropOptions: null
  },
  {
    index: 69,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.57.jpeg',
    store: 'Roechic',
    title: 'Conjunto 2 piezas lino blanco roto con topos negros top palabra de honor y pantalón ancho',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 24000,
    colors: ['Blanco Roto con Lunares'],
    cropOptions: null
  },
  {
    index: 70,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.58 (1).jpeg',
    store: 'Diana Cantillo Shoes',
    title: 'Sandalias cuña plataforma alta en piel negra con tiras finas cruzadas Diana Cantillo',
    category: 'CALZADO',
    priceOriginal: 'No especificado',
    priceFCFA: 28000,
    colors: ['Negro'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.08, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 71,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.58 (2).jpeg',
    store: 'Nike',
    title: 'Nike Air Rift zapatillas sandalias tabi con puntera dividida en neopreno rosa',
    category: 'CALZADO',
    priceOriginal: 'No especificado',
    priceFCFA: 35000,
    colors: ['Rosa'],
    cropOptions: null
  },
  {
    index: 72,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.58.jpeg',
    store: 'UGG Australia',
    title: 'Zuecos con plataforma UGG Venture Daze Tazz Platform ante rosa pastel y beige',
    category: 'CALZADO',
    priceOriginal: 'No especificado',
    priceFCFA: 38000,
    colors: ['Rosa Pastel', 'Beige'],
    cropOptions: null
  },
  {
    index: 73,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.59 (1).jpeg',
    store: 'SHEIN',
    title: 'Portapasaporte de material PU con mapa grabado funda pasaporte organizador multicolor',
    category: 'ACCESORIOS',
    priceOriginal: '1,67 €',
    priceFCFA: 5000,
    colors: ['Multicolor', 'Negro', 'Rojo', 'Azul', 'Gris', 'Blanco', 'Lila', 'Menta', 'Rosa'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.32, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 74,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.50.59.jpeg',
    store: 'Adidas Originals',
    title: 'Adidas Originals Samba Jane Taekwondo estilo bailarina de ante rosa con tres bandas blancas',
    category: 'CALZADO',
    priceOriginal: 'No especificado',
    priceFCFA: 35000,
    colors: ['Rosa'],
    cropOptions: null
  },
  {
    index: 75,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.51.00 (1).jpeg',
    store: 'TikTok prettykeyti',
    title: 'Top negro cruzado al cuello con hebilla metálica dorada y bolso bandolera bis',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 12000,
    colors: ['Negro'],
    cropOptions: { topPercent: 0.12, bottomPercent: 0.12, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 76,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.51.00 (2).jpeg',
    store: 'Kylie Jenner Closet',
    title: 'Mono enterizo ajustado manga larga con estampado animal abstracto bis',
    category: 'MODA',
    priceOriginal: 'No especificado',
    priceFCFA: 28000,
    colors: ['Estampado Cebra Blanco y Negro'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.06, leftPercent: 0, rightPercent: 0 }
  },
  {
    index: 77,
    sourceFile: 'WhatsApp Image 2026-09-22 at 15.51.00.jpeg',
    store: 'SHEIN CONFLASS',
    title: 'CONFLASS Gorro de dormir de satén con estampado floral y ala ancha multicolor',
    category: 'ACCESORIOS',
    priceOriginal: '1,28 €',
    priceFCFA: 3500,
    colors: ['Multicolor floral', 'Negro', 'Rosa', 'Dorado', 'Azul', 'Vino'],
    cropOptions: { topPercent: 0.08, bottomPercent: 0.32, leftPercent: 0, rightPercent: 0 }
  }
];

function sanitize(str) {
  return str
    .replace(/[<>:"/\\|?*]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}

export async function processAll() {
  console.log(`Starting processing for all ${CATALOG.length} products...`);
  const results = [];

  // Clean directory first to avoid stale files
  for (const f of fs.readdirSync(TARGET_DIR)) {
    if (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp')) {
      try { fs.unlinkSync(path.join(TARGET_DIR, f)); } catch (e) {}
    }
  }

  for (const item of CATALOG) {
    const paddedIndex = String(item.index).padStart(2, '0');
    const cleanStore = sanitize(item.store);
    const cleanTitle = sanitize(item.title);
    let priceFormatted = item.priceOriginal !== 'No especificado' ? item.priceOriginal.replace(/€/g, 'EUR').replace(/¥/g, 'CNY').trim() : '';
    const cleanPrice = priceFormatted ? ` - ${sanitize(priceFormatted)}` : '';
    const outputFilename = `${paddedIndex} - ${cleanStore} - ${cleanTitle}${cleanPrice}.jpg`;
    const outputPath = path.join(TARGET_DIR, outputFilename);
    const sourcePath = path.join(SOURCE_DIR, item.sourceFile);

    let downloadedFromWeb = false;

    // 1. If HD URL is provided, attempt download first
    if (item.hdUrl) {
      try {
        console.log(`[${paddedIndex}] Downloading HD from: ${item.hdUrl}`);
        const res = await fetch(item.hdUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'
          }
        });
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          // Save and optimize with sharp
          await sharp(buffer)
            .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
            .toFile(outputPath);
          downloadedFromWeb = true;
          console.log(`[${paddedIndex}] Successfully saved HD web image (${buffer.length} bytes)`);
        }
      } catch (err) {
        console.warn(`[${paddedIndex}] Could not download from web: ${err.message}, falling back to source image processing.`);
      }
    }

    // 2. If not downloaded from web, process from sourceFile with sharp
    if (!downloadedFromWeb) {
      if (fs.existsSync(sourcePath)) {
        try {
          const image = sharp(sourcePath);
          const metadata = await image.metadata();
          const { width, height } = metadata;

          if (item.cropOptions && width && height) {
            const top = Math.round(height * (item.cropOptions.topPercent || 0));
            const bottom = Math.round(height * (item.cropOptions.bottomPercent || 0));
            const left = Math.round(width * (item.cropOptions.leftPercent || 0));
            const right = Math.round(width * (item.cropOptions.rightPercent || 0));

            const cropWidth = width - left - right;
            const cropHeight = height - top - bottom;

            if (cropWidth > 50 && cropHeight > 50) {
              await image
                .extract({ left, top, width: cropWidth, height: cropHeight })
                .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
                .toFile(outputPath);
              console.log(`[${paddedIndex}] Cleanly cropped & enhanced screenshot: ${cropWidth}x${cropHeight}`);
            } else {
              await image.jpeg({ quality: 95 }).toFile(outputPath);
            }
          } else {
            // Already clean photo or uncropped
            await image.jpeg({ quality: 95, chromaSubsampling: '4:4:4' }).toFile(outputPath);
            console.log(`[${paddedIndex}] Processed clean photo: ${width}x${height}`);
          }
        } catch (err) {
          console.error(`[${paddedIndex}] Sharp processing error: ${err.message}`);
          fs.copyFileSync(sourcePath, outputPath);
        }
      } else {
        console.error(`[${paddedIndex}] Source file not found: ${sourcePath}`);
      }
    }

    results.push({
      id: `EBNA-${paddedIndex}`,
      filename: outputFilename,
      original_source_file: item.sourceFile,
      store_platform: item.store,
      title: item.title,
      category: item.category,
      detected_price: item.priceOriginal,
      price_fcfa: item.priceFCFA,
      colors: item.colors,
      path: outputPath
    });
  }

  // Write JSON metadata
  const jsonPath = path.join(TARGET_DIR, 'catalogo_productos.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Wrote ${jsonPath}`);

  // Write CSV
  const csvHeaders = 'ID,Nombre_Archivo,Tienda_Origen,Titulo_Producto,Categoria,Precio_Detectado,Precio_FCFA,Colores\n';
  const csvRows = results.map(r => {
    return `"${r.id}","${r.filename}","${r.store_platform}","${r.title.replace(/"/g, '""')}","${r.category}","${r.detected_price}","${r.price_fcfa}","${r.colors.join(', ')}"`;
  }).join('\n');
  const csvPath = path.join(TARGET_DIR, 'catalogo_productos.csv');
  fs.writeFileSync(csvPath, csvHeaders + csvRows, 'utf8');
  console.log(`Wrote ${csvPath}`);

  // Write Readme / Catalog Summary
  const readmePath = path.join(TARGET_DIR, 'README.md');
  let md = `# Catálogo de Productos Procesados en Alta Definición (HD)\n\n`;
  md += `**Total de productos procesados:** ${results.length}\n`;
  md += `**Ubicación de imágenes limpias y HD:** \`${TARGET_DIR}\`\n\n`;
  md += `## Tabla Resumen de Productos\n\n`;
  md += `| ID | Tienda / Origen | Nombre y Descripción | Precio Detectado | Precio FCFA (EBNA) | Categoría |\n`;
  md += `|---|---|---|---|---|---|\n`;
  for (const r of results) {
    md += `| ${r.id} | ${r.store_platform} | ${r.title} | **${r.detected_price}** | ${r.price_fcfa.toLocaleString()} FCFA | ${r.category} |\n`;
  }
  fs.writeFileSync(readmePath, md, 'utf8');
  console.log(`Wrote ${readmePath}`);

  console.log('\nAll 77 products processed, renamed, organized, and cataloged successfully!');
}

processAll();
