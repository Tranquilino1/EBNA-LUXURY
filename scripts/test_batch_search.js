import { searchImagesDuckDuckGo } from './search_helper.js';

const queries = [
  'SHEIN Vestido de punto largo bohemio blanco escote halter',
  'SHEIN BASICS Set de 3 piezas body casual cuello redondo',
  'SHEIN SHAPORA Body elegante y de moda con diseño de copa vino',
  'SHEIN SXY Conjunto de 2 piezas top halter lazos blanco falda',
  'SHEIN INAWLY Vestido de ballet pliegues pastel blanco',
  'SHEIN Camiseta tirantes corta diamantes acanalada blanco',
  'SHEIN CURVE Soleia Conjunto 3 piezas top asimetrico panuelo',
  'SHEIN MainGRL Set camisa pantalones cortos cuadros vichy rojo',
  'SHEIN CONFLASS Gorro de dormir de saten estampado floral',
  'SHEIN Portapasaporte material PU mapa',
  'Nike Air Rift pink split toe tabi',
  'Adidas Taekwondo Samba Jane pink',
  'UGG Venture Daze Platform clogs pink suede',
  'MANGO sandalias tiras dedo aplique dorado negro'
];

for (const q of queries) {
  try {
    const results = await searchImagesDuckDuckGo(q);
    if (results.length > 0) {
      console.log(`[FOUND] ${q} -> ${results[0].title} | ${results[0].image}`);
    } else {
      console.log(`[NOT FOUND] ${q}`);
    }
  } catch (e) {
    console.error(`[ERROR] ${q}:`, e.message);
  }
}
