const fs = require('fs');
const path = require('path');

const demoDataPath = path.join(__dirname, '..', 'src', 'lib', 'demoData.ts');
let content = fs.readFileSync(demoDataPath, 'utf8');

const jsonStart = content.indexOf('export const INITIAL_PRODUCTS: Product[] = [');
const jsonEnd = content.indexOf(';\n\n// Fast in-memory lookup maps');

const list = JSON.parse(fs.readFileSync(path.join(__dirname, 'matched_image_map.json'), 'utf8'));

const nameCounts = {};

function buildVisualProduct(item) {
  const id = item.id;
  const pubFile = item.pubFile;
  const origFile = item.origFile || '';
  const text = origFile.toLowerCase();

  let name = '';
  let category = 'MODA';
  let price = 18000;
  let sizes = ['S', 'M', 'L', 'XL'];
  let colors = ['Blanco', 'Negro', 'Rosa', 'Beige'];
  let description = '';

  if (text.includes('zara red vanilla') || text.includes('zara • red vanilla')) {
    category = 'PERFUMERIA';
    name = "Perfume ZARA Red Vanilla Eau de Parfum 90ml";
    price = 32000;
    sizes = ['90ml'];
    colors = ['Rojo', 'Dorado'];
    description = "Fragancia femenina icónica de la colección Zara. Notas cálidas de vainilla, flor de peonía y pera dulce. Elegancia sofisticada de larga duración.";
  } else if (text.includes('nike dunk')) {
    category = 'CALZADO';
    name = "Zapatillas Sneakers Nike Dunk Low Wine Red Edition";
    price = 38000;
    sizes = ['38', '39', '40', '41', '42', '43'];
    colors = ['Rojo', 'Blanco'];
    description = "Zapatillas deportivas urbanas icónicas en combinación bicolor rojo vino y blanco. Suela de goma amortiguada y cuero sintético de alta durabilidad.";
  } else if (text.includes('puma speedcat')) {
    category = 'CALZADO';
    name = "Zapatillas Deportivas Puma Speedcat OG Classic";
    price = 35000;
    sizes = ['37', '38', '39', '40', '41', '42'];
    colors = ['Negro', 'Blanco'];
    description = "Diseño clásico de motorsport en ante suave con la emblemática ola de Puma. Ajuste perfilado y suela de perfil bajo de máximo confort.";
  } else if (text.includes('crocs') || text.includes('clogs')) {
    category = 'CALZADO';
    name = "Zuecos Confort Crocs Original Limited Edition";
    price = 22000;
    sizes = ['36', '37', '38', '39', '40', '41'];
    colors = ['Marrón', 'Beige', 'Verde Olivo'];
    description = "Zuecos ultraligeros de espuma Croslite con correa pivoteada en el talón. Máxima ventilación y comodidad resistente al agua para interiores y exteriores.";
  } else if (text.includes('ollio') || text.includes('ballet shoe floral lace') || text.includes('lace pattern ballet')) {
    category = 'CALZADO';
    name = "Bailarinas Elegantes Encaje Floral Ollio Paris";
    price = 22000;
    sizes = ['36', '37', '38', '39', '40'];
    colors = ['Negro', 'Blanco', 'Rosa'];
    description = "Zapatos planos estilo bailarina confeccionados en encaje floral transpirable. Plantilla acolchada suave ideal para eventos y oficina.";
  } else if (text.includes('kraasa chelsea boots')) {
    category = 'CALZADO';
    name = "Botines Kraasa Chelsea Boots de Cuero Urbano";
    price = 32000;
    sizes = ['39', '40', '41', '42', '43'];
    colors = ['Negro', 'Marrón'];
    description = "Botines estilo Chelsea con paneles elásticos laterales y tirador posterior. Cuero sintético resistente y suela dentada antideslizante.";
  } else if (text.includes('duxal shoes') || text.includes('zara heels')) {
    category = 'CALZADO';
    name = "Sandalias de Tacón Elegantes Zara Heels Gold Edition";
    price = 28000;
    sizes = ['36', '37', '38', '39', '40'];
    colors = ['Dorado', 'Bordo', 'Negro'];
    description = "Zapatos de tacón alto con tiras finas cruzadas y cierre de hebilla en el tobillo. Estilo glamuroso para vestidos de fiesta y cóctel.";
  } else if (text.includes('mary jane') || text.includes('woven ballet flats') || text.includes('zapatos de malla negra')) {
    category = 'CALZADO';
    name = "Bailarinas Malla Calada Woven Mary Jane Flats";
    price = 24000;
    sizes = ['36', '37', '38', '39', '40'];
    colors = ['Negro', 'Beige', 'Blanco'];
    description = "Calzado plano de malla calada con hebilla ajustable sobre el empeine. Diseño fresco, flexible y transpirable para clima cálido.";
  } else if (text.includes('color-blocked mesh lace-up sneakers')) {
    category = 'CALZADO';
    name = "Sneakers Urbanos Bicolor Sports Men's Edition";
    price = 28000;
    sizes = ['39', '40', '41', '42', '43'];
    colors = ['Rojo', 'Negro', 'Blanco'];
    description = "Zapatillas deportivas con paneles de malla transpirable y suela amortiguada. Ideales para combinar con jeans o ropa deportiva urbana.";
  } else if (text.includes('mela crème de jour unifiante') || text.includes('mela pain exfoliant') || text.includes('topicrem')) {
    category = 'COSMETICA';
    name = "Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)";
    price = 22000;
    sizes = ['40ml', '150g'];
    colors = ['Blanco'];
    description = "Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.";
  } else if (text.includes('brunch beauty')) {
    category = 'COSMETICA';
    name = "Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)";
    price = 15000;
    sizes = ['50ml'];
    colors = ['Rosa', 'Transparente'];
    description = "Concentrado iluminador facial con vitamina C estabilizada y ácido hialurónico. Revitaliza la piel y aporta luminosidad natural todo el día.";
  } else if (text.includes('esfoliante labial') || text.includes('exfoliante de labios') || text.includes('lip scrub')) {
    category = 'COSMETICA';
    name = "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g";
    price = 6500;
    sizes = ['30g'];
    colors = ['Rosa', 'Frambuesa'];
    description = "Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.";
  } else if (text.includes('turmeric sea salt exfoliating body scrub') || text.includes('whitening exfoliating sherbet')) {
    category = 'COSMETICA';
    name = "Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g";
    price = 12000;
    sizes = ['250g', '350g'];
    colors = ['Amarillo', 'Rosa'];
    description = "Scrub corporal regenerador con sal marina, extracto de cúrcuma y vitamina E. Remueve células muertas dejando la piel sedosa e hidratada.";
  } else if (text.includes('waterproof matte liquid lipstick') || text.includes('beautiful matte liquid lipstick')) {
    category = 'COSMETICA';
    name = "Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting";
    price = 9000;
    sizes = ['Standard'];
    colors = ['Rojo', 'Rosa Wood', 'Nude'];
    description = "Pintalabios líquido mate de alta cobertura e intensidad de color. Fórmula intransferible de larga duración hasta 16 horas de fijación.";
  } else if (text.includes('turmeric face cream') || text.includes('skincare')) {
    category = 'COSMETICA';
    name = "Crema Facial Aclarante Turmeric Face Cream 50g";
    price = 14000;
    sizes = ['50g'];
    colors = ['Amarillo', 'Dorado'];
    description = "Crema hidratante enriquecida con extracto de cúrcuma orgánica y niacinamida. Atenúa hiperpigmentación y restaura la frescura del rostro.";
  } else if (text.includes('palmolive naturals herbal') || text.includes('12 count x palmolive')) {
    category = 'JABONES';
    name = "Jabón Vegetal Palmolive Naturals Extractos Herbales (Pack 12 x 90g)";
    price = 8500;
    sizes = ['Pack 12x 90g'];
    colors = ['Verde', 'Blanco'];
    description = "Pack familiar de jabones enriquecidos con extractos herbales purificantes y aceites vegetales. Aroma fresco y limpieza suave diaria.";
  } else if (text.includes('palmolive gül') || text.includes('palmolive moisture care') || text.includes('palmolive sabun') || text.includes('palmolive turuncu')) {
    category = 'JABONES';
    name = "Jabón Vegetal Palmolive Naturals Moisture Care Olivo (Pack 4x)";
    price = 3500;
    sizes = ['Pack 4x 90g'];
    colors = ['Verde Olivo', 'Rosa'];
    description = "Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.";
  } else if (text.includes('sabonete mel & aveia')) {
    category = 'JABONES';
    name = "Jabón Corporal Hidratante Miel & Avena Nutrición Intensa (100g)";
    price = 3500;
    sizes = ['100g'];
    colors = ['Blanco', 'Amarillo Soft'];
    description = "Barra de jabón formulada con miel pura y hojuelas de avena coloidal. Calma pieles sensibles y restaura la barrera cutánea.";
  } else if (text.includes('kojic san') || text.includes('sabonete artesanal de cúrcuma') || text.includes('ra cosmetics 100% natural turmeric') || text.includes('turmeric and kojic acid') || text.includes('oceaura lemon turmeric')) {
    category = 'JABONES';
    name = "Jabón Artesanal de Cúrcuma & Ácido Kójico Iluminador 100g";
    price = 4000;
    sizes = ['100g', '135g'];
    colors = ['Naranja', 'Amarillo'];
    description = "Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.";
  } else if (text.includes('carowhite soap')) {
    category = 'JABONES';
    name = "Jabón Aclarante CaroWhite Clarifying Soap 180g";
    price = 4500;
    sizes = ['180g'];
    colors = ['Naranja', 'Blanco'];
    description = "Jabón aclarante corporal con aceite de zanahoria y complejo iluminador. Limpieza profunda que elimina impurezas y unifica el tono.";
  } else if (text.includes('savon orange collagene - galong')) {
    category = 'JABONES';
    name = "Jabón Galong Naranja & Colágeno Aclarante 100g";
    price = 3000;
    sizes = ['100g'];
    colors = ['Naranja'];
    description = "Jabón tailandés de extracto concentrado de naranja y colágeno soluble. Aporta vitamina C y elasticidad a la piel durante el baño.";
  } else if (text.includes('biosulfur grisi sulfur soap')) {
    category = 'JABONES';
    name = "Jabón de Azufre BioSulfur Grisi Anti-Acné 100g";
    price = 3500;
    sizes = ['100g'];
    colors = ['Amarillo'];
    description = "Jabón medicinal con 10% de azufre coloidal formulado para pieles con tendencia acneica. Controla el exceso de grasa y desobstruye poros.";
  } else if (text.includes('vaseline healthy bright bar') || text.includes('vaseline healthy bright vitamin b3')) {
    category = 'JABONES';
    name = "Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g)";
    price = 4500;
    sizes = ['Pack 4x 75g'];
    colors = ['Rosa', 'Blanco'];
    description = "Pastillas de jabón enriquecidas con Niacinamida (Vitamina B3) y microgotas de Vaselina Pura. Aportan brillo y nutrición profunda.";
  } else if (text.includes('vaseline lip therapy')) {
    category = 'COSMETICA';
    name = "Bálsamo Labial Vaseline Lip Therapy Original 4g";
    price = 3000;
    sizes = ['4g'];
    colors = ['Transparente', 'Azul'];
    description = "Protector labial de vaselina pura no grasa. Alivia labios secos o agrietados proporcionando una barrera humectante inmediata.";
  } else if (text.includes('premium handmade crystal egg soap')) {
    category = 'JABONES';
    name = "Jabón Artesanal Crystal Egg con Aceites Esenciales 120g";
    price = 5500;
    sizes = ['120g'];
    colors = ['Amarillo Cristal', 'Dorado'];
    description = "Jabón de lujo en forma de huevo cristalino elaborado con aceites esenciales relajantes e higienizantes. Suavidad y aroma refinado.";
  } else if (text.includes('avena instituto español') || text.includes('loción hidratante avena instituto')) {
    category = 'HIGIENE';
    name = "Loción Corporal Hidratante Avena Instituto Español 950ml";
    price = 9500;
    sizes = ['950ml', '500ml'];
    colors = ['Beige', 'Blanco'];
    description = "Loción corporal de formato familiar formulada con extracto de avena 100% natural. 24 horas de hidratación para toda la familia.";
  } else if (text.includes('gel de ducha lactoadvance instituto') || text.includes('peony pivoine flora shower gel')) {
    category = 'HIGIENE';
    name = "Gel de Ducha Lactoadvance Instituto Español 1250ml";
    price = 7500;
    sizes = ['1250ml', '500ml'];
    colors = ['Blanco', 'Azul'];
    description = "Gel de baño dermoprotector enriquecido con proteínas de leche e ingredientes hidratantes. Sensación de limpieza y confort diario.";
  } else if (text.includes('instituto español pieles atopicas champu')) {
    category = 'HIGIENE';
    name = "Champú Suave Pieles Atópicas Instituto Español 300ml";
    price = 6500;
    sizes = ['300ml'];
    colors = ['Blanco', 'Azul'];
    description = "Champú dermo-protector especial para cueros cabelludos sensibles o con tendencia atópica. Limpieza ultrasuave sin sulfatos agresivos.";
  } else if (text.includes('long bonnet,adjustable long hair bonnet') || text.includes('touca de dormir de cetim')) {
    category = 'HIGIENE';
    name = "Gorro de Satén Ajustable Largo para Trenzas & Dreads";
    price = 6000;
    sizes = ['Standard'];
    colors = ['Negro', 'Rosa', 'Dorado'];
    description = "Gorro nocturno de satén de seda de doble capa con banda elástica regulable. Protege peinados, evita el encrespamiento y conserva la hidratación.";
  } else if (text.includes('men black and white invisible original')) {
    category = 'HIGIENE';
    name = "Desodorante Roll-On Nivea Men Black & White Invisible (Pack 4x)";
    price = 7500;
    sizes = ['Pack 4x 50ml'];
    colors = ['Negro', 'Azul'];
    description = "Pack de desodorantes en roll-on con protección antitranspirante 48h. Fórmula antimanchas blancas en ropa negra y antimanchas amarillas en ropa blanca.";
  } else if (text.includes('pu passport holder') || text.includes('funda para pasaporte')) {
    category = 'ACCESORIOS';
    name = "Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas";
    price = 12000;
    sizes = ['Standard'];
    colors = ['Azul', 'Rosa', 'Negro', 'Dorado', 'Beige'];
    description = "Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa mundi. Incluye ranuras para tarjetas e ID.";
  } else if (text.includes('3개 남성용 클래식 블랙 사각 안경')) {
    category = 'ACCESORIOS';
    name = "Gafas de Sol Classic Square Unisex Filtro Luz Azul (Pack 3x)";
    price = 16000;
    sizes = ['Standard'];
    colors = ['Negro', 'Transparente'];
    description = "Pack de 3 gafas unisex con montura cuadrada negra ultraligera y lentes con filtro protector de luz azul para ordenadores y móviles.";
  } else if (text.includes('black & white gingham smocked tie-strap midi dress')) {
    category = 'VESTIDOS';
    name = "Vestido Midi Gingham Smocked Tie-Strap Elegance";
    price = 24000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Blanco y Negro', 'Gingham'];
    description = "Vestido midi de tirantes ajustables con nudo y cuerpo fruncido elástico en estampado de cuadros vichy. Silueta fresca y primaveral.";
  } else if (text.includes('bodycon high waisted backless buttoned pockets split-joint halter-neck mini dresses')) {
    category = 'VESTIDOS';
    name = "Vestido Mini Halter Neck Bodycon Satin Red";
    price = 26000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Rojo', 'Rosa', 'Negro'];
    description = "Mini vestido entallado con cuello halter y espalda descubierta. Tejido satinado elástico que moldea la silueta con elegancia nocturna.";
  } else if (text.includes('cerelina white jersey maxi skirt')) {
    category = 'MODA';
    name = "Falda Maxi Jersey Cerelina White Couture";
    price = 25000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Blanco', 'Crema'];
    description = "Falda larga de punto jersey suave con cintura elástica alta y drapeado fluido. Caída elegante para combinar con tops y camisas.";
  } else if (text.includes('dresses for women _ zara united states') || text.includes('we fashion robe longue')) {
    category = 'VESTIDOS';
    name = "Vestido Satinado de Noche Zara Luxe Red";
    price = 48000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Rojo', 'Verde Esmeralda', 'Blanco'];
    description = "Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.";
  } else if (text.includes('1 set fitted drawstring hooded crop top & flared pants sports suit') || text.includes('hoodies with trousers') || text.includes('premium streetwear tracksuit set')) {
    category = 'MODA';
    name = "Conjunto Deportivo Hooded Crop Top & Pantalón Flare";
    price = 25000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Beige', 'Gris', 'Negro', 'Rosa'];
    description = "Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.";
  } else if (text.includes('2pcs women\'s maternity solid leggings')) {
    category = 'MODA';
    name = "Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft";
    price = 18000;
    sizes = ['M', 'L', 'XL', 'XXL'];
    colors = ['Negro', 'Gris'];
    description = "Pack de 2 mallas de premamá con pretina alta sobre la barriga en tejido elástico transpirable. Soporte suave sin oprimir.";
  } else if (text.includes('soft active hooded zip up jacket in black') || text.includes('soft active hooded mid-layer jacket in chocolate')) {
    category = 'MODA';
    name = "Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style";
    price = 27000;
    sizes = ['XS', 'S', 'M', 'L'];
    colors = ['Negro', 'Chocolate', 'Nude'];
    description = "Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal completa y capucha. Tejido suave de efecto segunda piel.";
  } else if (text.includes('summer dress women 2021 plus size casual beach polka dot')) {
    category = 'VESTIDOS';
    name = "Vestido Veraniego Polka Dot Retro Flared Red";
    price = 23000;
    sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    colors = ['Rojo con Lunares', 'Negro'];
    description = "Vestido midi de estilo vintage con estampado de lunares y escote con hombros descubiertos. Falda de vuelo ligera y fresca.";
  } else if (text.includes('men\'s solid color drawstring waist simple fashionable casual shorts') || text.includes('shein men drawstring waist letter patch shorts')) {
    category = 'MODA';
    name = "Pantalón Corto Bermuda Casual Men's Solid Color";
    price = 15000;
    sizes = ['M', 'L', 'XL', 'XXL'];
    colors = ['Beige', 'Azul Marino', 'Negro'];
    description = "Bermuda de algodón ligero con cintura elástica y cordón ajustable. Bolsillos laterales para un look relajado de verano.";
  } else if (text.includes('navy blue stripe suit_ men\'s formal wedding party wear')) {
    category = 'MODA';
    name = "Traje Ejecutivo de Sastrería Navy Blue Stripe 3 Piezas";
    price = 65000;
    sizes = ['48', '50', '52', '54', '56'];
    colors = ['Azul Marino con Raya Diplomática'];
    description = "Traje formal de corte sastre compuesto por chaqueta, chaleco y pantalón en tejido estructurado con raya diplomática. Elegancia pura.";
  } else if (text.includes('fwh calça flare feminina casual minimalista com efeito levanta bumbum')) {
    category = 'MODA';
    name = "Pantalón Leggings High Waist Levanta Bumbum Noir";
    price = 22000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Negro', 'Azul Marino'];
    description = "Mallas de tiro alto con tecnología de modelado en glúteos y pretina ancha. Tejido elástico denso no transparente.";
  } else if (text.includes('grunge aesthetic jeans')) {
    category = 'MODA';
    name = "Pantalón Jeans Wide Leg Streetwear Y2K Vintage Wash";
    price = 28000;
    sizes = ['36', '38', '40', '42'];
    colors = ['Azul Denim Vintage', 'Negro Washed'];
    description = "Vaqueros anchos de corte holgado streetwear estilo Y2K con estampado gráfico sutil. Confeccionados en mezclilla rígida de alta calidad.";
  } else if (text.includes('mulvari plus solid thermal lined kangaroo pocket drawstring hoodie') || text.includes('hoodie unisex biif')) {
    category = 'MODA';
    name = "Sudadera Oversized Thermal Lined Kangaroo Hoodie";
    price = 22000;
    sizes = ['M', 'L', 'XL', 'XXL'];
    colors = ['Crema', 'Marrón', 'Verde', 'Negro'];
    description = "Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto y aislamiento térmico suave.";
  } else if (text.includes('6 ways to style new in zara') || text.includes('copy - zara')) {
    category = 'MODA';
    name = "Chaqueta Blazer Sastre Zara Style New Collection";
    price = 32000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Beige', 'Camel', 'Negro'];
    description = "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda sastre versátil para elevar cualquier atuendo.";
  } else {
    name = `Prenda Exclusiva EBNA Luxury N°${id.replace('ebna-', '')}`;
    price = 24000;
    description = "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.";
  }

  // Ensure title uniqueness if repeated
  nameCounts[name] = (nameCounts[name] || 0) + 1;
  if (nameCounts[name] > 1) {
    const num = nameCounts[name];
    const suffixList = ["Edition", "Luxury", "Selection", "Gold", "Couture", "Ref. II"];
    const suffix = suffixList[(num - 2) % suffixList.length];
    name = `${name} (${suffix})`;
  }

  const cleanSlug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + id;

  const imagePath = `/products/${pubFile}`;

  return {
    id,
    slug: cleanSlug,
    name,
    category,
    description,
    price,
    images: [imagePath],
    in_stock: true,
    is_hidden: false,
    colors,
    sizes,
    created_at: "2026-09-20T20:00:00.000Z",
    updated_at: new Date().toISOString()
  };
}

const finalProducts = list.map(item => buildVisualProduct(item));

const updatedJsonString = JSON.stringify(finalProducts, null, 2);
const newContent = content.substring(0, jsonStart + 'export const INITIAL_PRODUCTS: Product[] = '.length) + 
  updatedJsonString + ';' +
  content.substring(jsonEnd + 1);

fs.writeFileSync(demoDataPath, newContent, 'utf8');
console.log('Successfully updated demoData.ts with 100% UNIQUE visually aligned product catalog!');
