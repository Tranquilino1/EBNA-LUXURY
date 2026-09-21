const fs = require('fs');
const path = require('path');

const demoDataPath = path.join(__dirname, '..', 'src', 'lib', 'demoData.ts');
let content = fs.readFileSync(demoDataPath, 'utf8');

const jsonStart = content.indexOf('export const INITIAL_PRODUCTS: Product[] = [');
const jsonEnd = content.indexOf(';\n\n// Fast in-memory lookup maps');

const list = JSON.parse(fs.readFileSync(path.join(__dirname, 'matched_image_map.json'), 'utf8'));

const nameCounts = {};
const skuCounts = {};

function getSkuPrefix(category) {
  switch (category) {
    case 'PERFUMERIA': return 'EB-PERF';
    case 'COSMETICA_FACIAL': return 'EB-COSM';
    case 'HIGIENE_CORPORAL': return 'EB-HIG';
    case 'CALZADO': return 'EB-CALZ';
    case 'BOLSOS_ACCESORIOS': return 'EB-ACC';
    case 'MODA_MUJER': return 'EB-MODM';
    case 'MODA_HOMBRE': return 'EB-MODH';
    default: return 'EB-LUX';
  }
}

function buildStrictProduct(item, idx) {
  const id = item.id;
  const numId = parseInt(id.replace('ebna-', ''), 10);
  const pubFile = item.pubFile;
  const origFile = item.origFile || '';
  const text = origFile.toLowerCase();

  let name = '';
  let brand = 'EBNA Luxury Collection';
  let category = 'MODA_MUJER';
  let subcategory = 'Ropa Femenina';
  let priceFCFA = 18000;
  let sizes = ['S', 'M', 'L', 'XL'];
  let colors = ['Blanco', 'Negro', 'Rosa', 'Beige'];
  let volume = undefined;
  let material = 'Algodón & Poliéster de Alta Calidad';
  let description = '';

  if (text.includes('zara red vanilla') || text.includes('zara • red vanilla')) {
    category = 'PERFUMERIA';
    subcategory = 'Perfumes Femeninos';
    brand = 'Zara';
    name = "Zara Red Vanilla Eau de Toilette";
    priceFCFA = 32000;
    sizes = [];
    volume = '90ml';
    colors = ['Rojo', 'Dorado'];
    material = 'Vidrio & Esencias Florales';
    description = "Fragancia femenina icónica de la colección Zara. Notas cálidas de vainilla, flor de peonía y pera dulce. Elegancia sofisticada de larga duración.";
  } else if (text.includes('nike dunk')) {
    category = 'CALZADO';
    subcategory = 'Zapatillas Sneakers';
    brand = 'Nike';
    name = "Zapatillas Sneakers Nike Dunk Low Wine Red Edition";
    priceFCFA = 38000;
    sizes = ['38', '39', '40', '41', '42', '43'];
    colors = ['Rojo Vino', 'Blanco'];
    material = 'Cuero Sintético & Suela de Goma';
    description = "Zapatillas deportivas urbanas icónicas en combinación bicolor rojo vino y blanco. Suela de goma amortiguada y cuero sintético de alta durabilidad.";
  } else if (text.includes('puma speedcat')) {
    category = 'CALZADO';
    subcategory = 'Zapatillas Sneakers';
    brand = 'Puma';
    name = "Zapatillas Deportivas Puma Speedcat OG Classic";
    priceFCFA = 35000;
    sizes = ['37', '38', '39', '40', '41', '42'];
    colors = ['Negro', 'Blanco'];
    material = 'Ante Suave & Goma Antideslizante';
    description = "Diseño clásico de motorsport en ante suave con la emblemática ola de Puma. Ajuste perfilado y suela de perfil bajo de máximo confort.";
  } else if (text.includes('crocs') || text.includes('clogs')) {
    category = 'CALZADO';
    subcategory = 'Zuecos & Sandalias';
    brand = 'Crocs';
    name = "Zuecos Confort Crocs Original Limited Edition";
    priceFCFA = 22000;
    sizes = ['36', '37', '38', '39', '40', '41'];
    colors = ['Marrón', 'Beige', 'Verde Olivo'];
    material = 'Espuma Croslite™ Moldeada';
    description = "Zuecos ultraligeros de espuma Croslite con correa pivoteada en el talón. Máxima ventilación y comodidad resistente al agua para interiores y exteriores.";
  } else if (text.includes('ollio') || text.includes('ballet shoe floral lace') || text.includes('lace pattern ballet')) {
    category = 'CALZADO';
    subcategory = 'Bailarinas & Zapatos Planos';
    brand = 'Ollio Paris';
    name = "Bailarinas Elegantes Encaje Floral Ollio Paris";
    priceFCFA = 22000;
    sizes = ['36', '37', '38', '39', '40'];
    colors = ['Negro', 'Blanco', 'Rosa'];
    material = 'Encaje Floral Malla & Plantilla Acolchada';
    description = "Zapatos planos estilo bailarina confeccionados en encaje floral transpirable. Plantilla acolchada suave ideal para eventos y oficina.";
  } else if (text.includes('kraasa chelsea boots')) {
    category = 'CALZADO';
    subcategory = 'Botines & Botas';
    brand = 'Kraasa';
    name = "Botines Kraasa Chelsea Boots de Cuero Urbano";
    priceFCFA = 32000;
    sizes = ['39', '40', '41', '42', '43'];
    colors = ['Negro', 'Marrón'];
    material = 'Cuero Sintético & Goma Dentada';
    description = "Botines estilo Chelsea con paneles elásticos laterales y tirador posterior. Cuero sintético resistente y suela dentada antideslizante.";
  } else if (text.includes('duxal shoes') || text.includes('zara heels')) {
    category = 'CALZADO';
    subcategory = 'Zapatos de Tacón';
    brand = 'Zara';
    name = "Sandalias de Tacón Elegantes Zara Heels Gold Edition";
    priceFCFA = 28000;
    sizes = ['36', '37', '38', '39', '40'];
    colors = ['Dorado', 'Bordo', 'Negro'];
    material = 'Charol Sintético & Hebilla Metálica';
    description = "Zapatos de tacón alto con tiras finas cruzadas y cierre de hebilla en el tobillo. Estilo glamuroso para vestidos de fiesta y cóctel.";
  } else if (text.includes('mary jane') || text.includes('woven ballet flats') || text.includes('zapatos de malla negra')) {
    category = 'CALZADO';
    subcategory = 'Bailarinas & Zapatos Planos';
    brand = 'EBNA Luxury Collection';
    name = "Bailarinas Malla Calada Woven Mary Jane Flats";
    priceFCFA = 24000;
    sizes = ['36', '37', '38', '39', '40'];
    colors = ['Negro', 'Beige', 'Blanco'];
    material = 'Malla Calada & Suela Flexible';
    description = "Calzado plano de malla calada con hebilla ajustable sobre el empeine. Diseño fresco, flexible y transpirable para clima cálido.";
  } else if (text.includes('color-blocked mesh lace-up sneakers')) {
    category = 'CALZADO';
    subcategory = 'Zapatillas Sneakers';
    brand = 'EBNA Luxury Collection';
    name = "Sneakers Urbanos Bicolor Sports Men's Edition";
    priceFCFA = 28000;
    sizes = ['39', '40', '41', '42', '43'];
    colors = ['Rojo', 'Negro', 'Blanco'];
    material = 'Malla Transpirable & Suela de Goma';
    description = "Zapatillas deportivas con paneles de malla transpirable y suela amortiguada. Ideales para combinar con jeans o ropa deportiva urbana.";
  } else if (text.includes('mela crème de jour unifiante') || text.includes('mela pain exfoliant') || text.includes('topicrem')) {
    category = 'COSMETICA_FACIAL';
    subcategory = 'Cuidado Facial Anti-Manchas';
    brand = 'Topicrem';
    name = "Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)";
    priceFCFA = 22000;
    sizes = [];
    volume = '40ml';
    colors = ['Blanco'];
    material = 'Fórmula Dermatológica SPF50+';
    description = "Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.";
  } else if (text.includes('brunch beauty')) {
    category = 'COSMETICA_FACIAL';
    subcategory = 'Serums & Tratamientos';
    brand = 'Brunch Beauty';
    name = "Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)";
    priceFCFA = 15000;
    sizes = [];
    volume = '50ml';
    colors = ['Rosa', 'Transparente'];
    material = 'Vitamina C & Ácido Hialurónico';
    description = "Concentrado iluminador facial con vitamina C estabilizada y ácido hialurónico. Revitaliza la piel y aporta luminosidad natural todo el día.";
  } else if (text.includes('esfoliante labial') || text.includes('exfoliante de labios') || text.includes('lip scrub')) {
    category = 'COSMETICA_FACIAL';
    subcategory = 'Exfoliantes & Bálsamos Labiales';
    brand = 'EBNA Beauty';
    name = "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g";
    priceFCFA = 6500;
    sizes = [];
    volume = '30g';
    colors = ['Rosa', 'Frambuesa'];
    material = 'Microcristales de Azúcar & Aceite de Coco';
    description = "Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.";
  } else if (text.includes('turmeric sea salt exfoliating body scrub') || text.includes('whitening exfoliating sherbet')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Exfoliantes Corporales';
    brand = 'EBNA Spa';
    name = "Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g";
    priceFCFA = 12000;
    sizes = [];
    volume = '250g';
    colors = ['Amarillo', 'Rosa'];
    material = 'Sal Marina, Cúrcuma & Aceite de Jojoba';
    description = "Scrub corporal regenerador con sal marina, extracto de cúrcuma y vitamina E. Remueve células muertas dejando la piel sedosa e hidratada.";
  } else if (text.includes('waterproof matte liquid lipstick') || text.includes('beautiful matte liquid lipstick')) {
    category = 'COSMETICA_FACIAL';
    subcategory = 'Maquillaje de Labios';
    brand = 'EBNA Beauty';
    name = "Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting";
    priceFCFA = 9000;
    sizes = [];
    volume = '8g';
    colors = ['Rojo', 'Rosa Wood', 'Nude'];
    material = 'Pigmentos Velvet Matte Intransferibles';
    description = "Pintalabios líquido mate de alta cobertura e intensidad de color. Fórmula intransferible de larga duración hasta 16 horas de fijación.";
  } else if (text.includes('turmeric face cream') || text.includes('skincare')) {
    category = 'COSMETICA_FACIAL';
    subcategory = 'Cremas Faciales';
    brand = 'Oceaura';
    name = "Crema Facial Aclarante Turmeric Face Cream 50g";
    priceFCFA = 14000;
    sizes = [];
    volume = '50g';
    colors = ['Amarillo', 'Dorado'];
    material = 'Extracto de Cúrcuma & Niacinamida';
    description = "Crema hidratante enriquecida con extracto de cúrcuma orgánica y niacinamida. Atenúa hiperpigmentación y restaura la frescura del rostro.";
  } else if (text.includes('palmolive naturals herbal') || text.includes('12 count x palmolive')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones de Tocador';
    brand = 'Palmolive';
    name = "Jabón de Tocador Palmolive Naturals Extractos Herbales (Pack 12 x 90g)";
    priceFCFA = 8500;
    sizes = [];
    volume = 'Pack 12x 90g';
    colors = ['Verde', 'Blanco'];
    material = 'Aceites Vegetales & Extractos Herbales';
    description = "Pack familiar de jabones enriquecidos con extractos herbales purificantes y aceites vegetales. Aroma fresco y limpieza suave diaria.";
  } else if (text.includes('palmolive gül') || text.includes('palmolive moisture care') || text.includes('palmolive sabun') || text.includes('palmolive turuncu')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones de Tocador';
    brand = 'Palmolive';
    name = "Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x)";
    priceFCFA = 3500;
    sizes = [];
    volume = 'Pack 4x 90g';
    colors = ['Verde Olivo', 'Rosa'];
    material = 'Extracto Natural de Oliva & Leche Humectante';
    description = "Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.";
  } else if (text.includes('sabonete mel & aveia')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones de Tocador';
    brand = 'EBNA Care';
    name = "Jabón Corporal Hidratante Miel & Avena Nutrición Intensa (100g)";
    priceFCFA = 3500;
    sizes = [];
    volume = '100g';
    colors = ['Blanco', 'Amarillo Soft'];
    material = 'Miel de Abeja & Avena Coloidal';
    description = "Barra de jabón formulada con miel pura y hojuelas de avena coloidal. Calma pieles sensibles y restaura la barrera cutánea.";
  } else if (text.includes('kojic san') || text.includes('sabonete artesanal de cúrcuma') || text.includes('ra cosmetics 100% natural turmeric') || text.includes('turmeric and kojic acid') || text.includes('oceaura lemon turmeric')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones Aclarantes';
    brand = 'Kojic San';
    name = "Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico";
    priceFCFA = 4000;
    sizes = [];
    volume = '135g';
    colors = ['Naranja', 'Amarillo'];
    material = 'Ácido Kójico Concentrado & Cúrcuma';
    description = "Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.";
  } else if (text.includes('carowhite soap')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones Aclarantes';
    brand = 'CaroWhite';
    name = "Jabón Aclarante CaroWhite Clarifying Soap 180g";
    priceFCFA = 4500;
    sizes = [];
    volume = '180g';
    colors = ['Naranja', 'Blanco'];
    material = 'Aceite de Zanahoria & Hidro-Complejo';
    description = "Jabón aclarante corporal con aceite de zanahoria y complejo iluminador. Limpieza profunda que elimina impurezas y unifica el tono.";
  } else if (text.includes('savon orange collagene - galong')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones Aclarantes';
    brand = 'Galong';
    name = "Jabón Galong Naranja & Colágeno Aclarante 100g";
    priceFCFA = 3000;
    sizes = [];
    volume = '100g';
    colors = ['Naranja'];
    material = 'Vitamina C & Colágeno Soluble';
    description = "Jabón tailandés de extracto concentrado de naranja y colágeno soluble. Aporta vitamina C y elasticidad a la piel durante el baño.";
  } else if (text.includes('biosulfur grisi sulfur soap')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones Medicinales';
    brand = 'Grisi';
    name = "Jabón de Azufre BioSulfur Grisi Anti-Acné 100g";
    priceFCFA = 3500;
    sizes = [];
    volume = '100g';
    colors = ['Amarillo'];
    material = '10% Azufre Coloidal Dermatológico';
    description = "Jabón medicinal con 10% de azufre coloidal formulado para pieles con tendencia acneica. Controla el exceso de grasa y desobstruye poros.";
  } else if (text.includes('vaseline healthy bright bar') || text.includes('vaseline healthy bright vitamin b3')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones de Tocador';
    brand = 'Vaseline';
    name = "Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g)";
    priceFCFA = 4500;
    sizes = [];
    volume = 'Pack 4x 75g';
    colors = ['Rosa', 'Blanco'];
    material = 'Vitamina B3 & Microgotas de Vaselina';
    description = "Pastillas de jabón enriquecidas con Niacinamida (Vitamina B3) y microgotas de Vaselina Pura. Aportan brillo y nutrición profunda.";
  } else if (text.includes('vaseline lip therapy')) {
    category = 'COSMETICA_FACIAL';
    subcategory = 'Bálsamos Labiales';
    brand = 'Vaseline';
    name = "Bálsamo Labial Vaseline Lip Therapy Original 4g";
    priceFCFA = 3000;
    sizes = [];
    volume = '4g';
    colors = ['Transparente', 'Azul'];
    material = 'Vaselina Pura Grado Farmacéutico';
    description = "Protector labial de vaselina pura no grasa. Alivia labios secos o agrietados proporcionando una barrera humectante inmediata.";
  } else if (text.includes('premium handmade crystal egg soap')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Jabones Artesanales';
    brand = 'EBNA Spa';
    name = "Jabón Artesanal Crystal Egg con Aceites Esenciales 120g";
    priceFCFA = 5500;
    sizes = [];
    volume = '120g';
    colors = ['Amarillo Cristal', 'Dorado'];
    material = 'Glicerina Cristalina & Aceites Esenciales';
    description = "Jabón de lujo en forma de huevo cristalino elaborado con aceites esenciales relajantes e higienizantes. Suavidad y aroma refinado.";
  } else if (text.includes('avena instituto español') || text.includes('loción hidratante avena instituto')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Lociones Corporales';
    brand = 'Instituto Español';
    name = "Loción Corporal Hidratante Avena Instituto Español";
    priceFCFA = 9500;
    sizes = [];
    volume = '950ml';
    colors = ['Beige', 'Blanco'];
    material = 'Extracto de Avena 100% Natural';
    description = "Loción corporal de formato familiar formulada con extracto de avena 100% natural. 24 horas de hidratación para toda la familia.";
  } else if (text.includes('gel de ducha lactoadvance instituto') || text.includes('peony pivoine flora shower gel')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Geles de Baño';
    brand = 'Instituto Español';
    name = "Gel de Ducha Lactoadvance Instituto Español 1250ml";
    priceFCFA = 7500;
    sizes = [];
    volume = '1250ml';
    colors = ['Blanco', 'Azul'];
    material = 'Proteínas de Leche & pH Neutro';
    description = "Gel de baño dermoprotector enriquecido con proteínas de leche e ingredientes hidratantes. Sensación de limpieza y confort diario.";
  } else if (text.includes('instituto español pieles atopicas champu')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Champús & Cuidado Capilar';
    brand = 'Instituto Español';
    name = "Champú Suave Pieles Atópicas Instituto Español 300ml";
    priceFCFA = 6500;
    sizes = [];
    volume = '300ml';
    colors = ['Blanco', 'Azul'];
    material = 'Fórmula Hipoalergénica Sin Sulfatos';
    description = "Champú dermo-protector especial para cueros cabelludos sensibles o con tendencia atópica. Limpieza ultrasuave sin sulfatos agresivos.";
  } else if (text.includes('long bonnet,adjustable long hair bonnet') || text.includes('touca de dormir de cetim')) {
    category = 'BOLSOS_ACCESORIOS';
    subcategory = 'Accesorios de Cabello & Bonnets';
    brand = 'EBNA Luxury Collection';
    name = "Gorro de Satén Ajustable Largo para Trenzas & Dreads";
    priceFCFA = 6000;
    sizes = ['Standard'];
    colors = ['Negro', 'Rosa', 'Dorado'];
    material = 'Satén de Seda Doble Capa';
    description = "Gorro nocturno de satén de seda de doble capa con banda elástica regulable. Protege peinados, evita el encrespamiento y conserva la hidratación.";
  } else if (text.includes('men black and white invisible original')) {
    category = 'HIGIENE_CORPORAL';
    subcategory = 'Desodorantes';
    brand = 'Nivea Men';
    name = "Desodorante Roll-On Nivea Men Black & White Invisible (Pack 4x)";
    priceFCFA = 7500;
    sizes = [];
    volume = 'Pack 4x 50ml';
    colors = ['Negro', 'Azul'];
    material = 'Fórmula Antimanchas 48h Protection';
    description = "Pack de desodorantes en roll-on con protección antitranspirante 48h. Fórmula antimanchas blancas en ropa negra y antimanchas amarillas en ropa blanca.";
  } else if (text.includes('pu passport holder') || text.includes('funda para pasaporte')) {
    category = 'BOLSOS_ACCESORIOS';
    subcategory = 'Accesorios de Viaje';
    brand = 'EBNA Luxury Collection';
    name = "Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas";
    priceFCFA = 12000;
    sizes = ['Standard'];
    colors = ['Azul', 'Rosa', 'Negro', 'Dorado', 'Beige'];
    material = 'Cuero Sintético PU & Grabado Mapa';
    description = "Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa mundi. Incluye ranuras para tarjetas e ID.";
  } else if (text.includes('3개 남성용 클래식 블랙 사각 안경')) {
    category = 'BOLSOS_ACCESORIOS';
    subcategory = 'Gafas de Sol & Monturas';
    brand = 'EBNA Eyewear';
    name = "Gafas de Sol Classic Square Unisex Filtro Luz Azul (Pack 3x)";
    priceFCFA = 16000;
    sizes = ['Standard'];
    colors = ['Negro', 'Transparente'];
    material = 'Montura Acetato & Lentes Filtro Azul';
    description = "Pack de 3 gafas unisex con montura cuadrada negra ultraligera y lentes con filtro protector de luz azul para ordenadores y móviles.";
  } else if (text.includes('gucci') || text.includes('marmont')) {
    category = 'BOLSOS_ACCESORIOS';
    subcategory = 'Bolsos de Mano';
    brand = 'Gucci';
    name = "Bolso de Mano Gucci GG Marmont Red Edition";
    priceFCFA = 185000;
    sizes = ['Medium'];
    colors = ['Rojo', 'Dorado'];
    material = 'Cuero Matelassé Piel de Becerro';
    description = "Bolso icónico con solapa en piel matelassé acolchada de tono rojo pasión con el distintivo herraje de doble G dorada.";
  } else if (text.includes('black & white gingham smocked tie-strap midi dress')) {
    category = 'MODA_MUJER';
    subcategory = 'Vestidos de Noche & Fiesta';
    brand = 'EBNA Luxury Collection';
    name = "Vestido Midi Gingham Smocked Tie-Strap Elegance";
    priceFCFA = 24000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Blanco y Negro', 'Gingham'];
    material = 'Algodón Fruncido & Tirantes Ajustables';
    description = "Vestido midi de tirantes ajustables con nudo y cuerpo fruncido elástico en estampado de cuadros vichy. Silueta fresca y primaveral.";
  } else if (text.includes('bodycon high waisted backless buttoned pockets split-joint halter-neck mini dresses')) {
    category = 'MODA_MUJER';
    subcategory = 'Vestidos de Noche & Fiesta';
    brand = 'EBNA Luxury Collection';
    name = "Vestido Mini Halter Neck Bodycon Satin Red";
    priceFCFA = 26000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Rojo', 'Rosa', 'Negro'];
    material = 'Satén Elástico de Alta Densidad';
    description = "Mini vestido entallado con cuello halter y espalda descubierta. Tejido satinado elástico que moldea la silueta con elegancia nocturna.";
  } else if (text.includes('cerelina white jersey maxi skirt')) {
    category = 'MODA_MUJER';
    subcategory = 'Faldas & Tops';
    brand = 'EBNA Luxury Collection';
    name = "Falda Maxi Jersey Cerelina White Couture";
    priceFCFA = 25000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Blanco', 'Crema'];
    material = 'Punto Jersey Suave de Alta Caída';
    description = "Falda larga de punto jersey suave con cintura elástica alta y drapeado fluido. Caída elegante para combinar con tops y camisas.";
  } else if (text.includes('dresses for women _ zara united states') || text.includes('we fashion robe longue')) {
    category = 'MODA_MUJER';
    subcategory = 'Vestidos de Noche & Fiesta';
    brand = 'Zara';
    name = "Vestido Satinado de Noche Zara Luxe Red";
    priceFCFA = 48000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Rojo', 'Verde Esmeralda', 'Blanco'];
    material = 'Raso de Seda Satinado';
    description = "Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.";
  } else if (text.includes('1 set fitted drawstring hooded crop top & flared pants sports suit') || text.includes('hoodies with trousers') || text.includes('premium streetwear tracksuit set')) {
    category = 'MODA_MUJER';
    subcategory = 'Conjuntos & Sets';
    brand = 'EBNA Luxury Collection';
    name = "Conjunto Deportivo Hooded Crop Top & Pantalón Flare";
    priceFCFA = 25000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Beige', 'Gris', 'Negro', 'Rosa'];
    material = 'Algodón Athleisure & Elastano';
    description = "Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.";
  } else if (text.includes('2pcs women\'s maternity solid leggings')) {
    category = 'MODA_MUJER';
    subcategory = 'Pantalones & Mallas';
    brand = 'EBNA Maternity';
    name = "Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft";
    priceFCFA = 18000;
    sizes = ['M', 'L', 'XL', 'XXL'];
    colors = ['Negro', 'Gris'];
    material = 'Microfibra Premamá de Gran Elasticidad';
    description = "Pack de 2 mallas de premamá con pretina alta sobre la barriga en tejido elástico transpirable. Soporte suave sin oprimir.";
  } else if (text.includes('soft active hooded zip up jacket in black') || text.includes('soft active hooded mid-layer jacket in chocolate')) {
    category = 'MODA_MUJER';
    subcategory = 'Chaqueas & Blazers';
    brand = 'Oh Polly';
    name = "Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style";
    priceFCFA = 27000;
    sizes = ['XS', 'S', 'M', 'L'];
    colors = ['Negro', 'Chocolate', 'Nude'];
    material = 'Microfibra Moldeadora Efecto Segunda Piel';
    description = "Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal completa y capucha. Tejido suave de efecto segunda piel.";
  } else if (text.includes('summer dress women 2021 plus size casual beach polka dot')) {
    category = 'MODA_MUJER';
    subcategory = 'Vestidos de Noche & Fiesta';
    brand = 'EBNA Luxury Collection';
    name = "Vestido Veraniego Polka Dot Retro Flared Red";
    priceFCFA = 23000;
    sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    colors = ['Rojo con Lunares', 'Negro'];
    material = 'Algodón Ligero Vuelo Retro';
    description = "Vestido midi de estilo vintage con estampado de lunares y escote con hombros descubiertos. Falda de vuelo ligera y fresca.";
  } else if (text.includes('men\'s solid color drawstring waist simple fashionable casual shorts') || text.includes('shein men drawstring waist letter patch shorts')) {
    category = 'MODA_HOMBRE';
    subcategory = 'Bermudas & Shorts';
    brand = 'EBNA Men';
    name = "Pantalón Corto Bermuda Casual Men's Solid Color";
    priceFCFA = 15000;
    sizes = ['M', 'L', 'XL', 'XXL'];
    colors = ['Beige', 'Azul Marino', 'Negro'];
    material = 'Algodón Transpirable & Cordón Ajustable';
    description = "Bermuda de algodón ligero con cintura elástica y cordón ajustable. Bolsillos laterales para un look relajado de verano.";
  } else if (text.includes('navy blue stripe suit_ men\'s formal wedding party wear')) {
    category = 'MODA_HOMBRE';
    subcategory = 'Trajes & Sastrería Masculina';
    brand = 'EBNA Men Tailored';
    name = "Traje Ejecutivo de Sastrería Navy Blue Stripe 3 Piezas";
    priceFCFA = 65000;
    sizes = ['48', '50', '52', '54', '56'];
    colors = ['Azul Marino con Raya Diplomática'];
    material = 'Lana Fría & Viscosa Estructurada';
    description = "Traje formal de corte sastre compuesto por chaqueta, chaleco y pantalón en tejido estructurado con raya diplomática. Elegancia pura.";
  } else if (text.includes('fwh calça flare feminina casual minimalista com efeito levanta bumbum')) {
    category = 'MODA_MUJER';
    subcategory = 'Pantalones & Mallas';
    brand = 'EBNA Luxury Collection';
    name = "Pantalón Leggings High Waist Levanta Bumbum Noir";
    priceFCFA = 22000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Negro', 'Azul Marino'];
    material = 'Tejido Compresivo de Alta Densidad';
    description = "Mallas de tiro alto con tecnología de modelado en glúteos y pretina ancha. Tejido elástico denso no transparente.";
  } else if (text.includes('grunge aesthetic jeans')) {
    category = 'MODA_MUJER';
    subcategory = 'Pantalones & Mallas';
    brand = 'EBNA Streetwear';
    name = "Pantalón Jeans Wide Leg Streetwear Y2K Vintage Wash";
    priceFCFA = 28000;
    sizes = ['36', '38', '40', '42'];
    colors = ['Azul Denim Vintage', 'Negro Washed'];
    material = 'Mezclilla Rígida 100% Algodón';
    description = "Vaqueros anchos de corte holgado streetwear estilo Y2K con estampado gráfico sutil. Confeccionados en mezclilla rígida de alta calidad.";
  } else if (text.includes('mulvari plus solid thermal lined kangaroo pocket drawstring hoodie') || text.includes('hoodie unisex biif')) {
    category = 'MODA_HOMBRE';
    subcategory = 'Sudaderas & Hoodies';
    brand = 'EBNA Men';
    name = "Sudadera Oversized Thermal Lined Kangaroo Hoodie";
    priceFCFA = 22000;
    sizes = ['M', 'L', 'XL', 'XXL'];
    colors = ['Crema', 'Marrón', 'Verde', 'Negro'];
    material = 'Franela Térmica Afelpada';
    description = "Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto y aislamiento térmico suave.";
  } else if (text.includes('6 ways to style new in zara') || text.includes('copy - zara')) {
    category = 'MODA_MUJER';
    subcategory = 'Chaqueas & Blazers';
    brand = 'Zara';
    name = "Chaqueta Blazer Sastre Zara Style New Collection";
    priceFCFA = 32000;
    sizes = ['S', 'M', 'L', 'XL'];
    colors = ['Beige', 'Camel', 'Negro'];
    material = 'Crepe Estructurado & Botones Carey';
    description = "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda sastre versátil para elevar cualquier atuendo.";
  } else {
    name = `Prenda Exclusiva EBNA Luxury N°${id.replace('ebna-', '')}`;
    priceFCFA = 24000;
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

  // Generate unique SKU
  const skuPrefix = getSkuPrefix(category);
  skuCounts[skuPrefix] = (skuCounts[skuPrefix] || 0) + 1;
  const sku = `${skuPrefix}-${String(skuCounts[skuPrefix]).padStart(2, '0')}`;

  const cleanSlug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + id;

  const primaryImage = `/products/${pubFile}`;

  return {
    id,
    sku,
    name,
    brand,
    category,
    subcategory,
    priceFCFA,
    originalPriceFCFA: Math.round(priceFCFA * 1.15 / 500) * 500, // Show realistic 15% original baseline
    inStock: true,
    featured: numId <= 8, // Mark first 8 items featured for home page
    description,
    images: {
      primary: primaryImage,
      gallery: [primaryImage]
    },
    details: {
      size: sizes,
      volume,
      material
    },

    // Compatibility fields
    slug: cleanSlug,
    price: priceFCFA,
    in_stock: true,
    is_hidden: false,
    is_featured: numId <= 8,
    colors,
    sizes,
    created_at: "2026-09-20T20:00:00.000Z",
    updated_at: new Date().toISOString()
  };
}

const finalProducts = list.map((item, idx) => buildStrictProduct(item, idx));

const updatedJsonString = JSON.stringify(finalProducts, null, 2);
const newContent = content.substring(0, jsonStart + 'export const INITIAL_PRODUCTS: Product[] = '.length) + 
  updatedJsonString + ';' +
  content.substring(jsonEnd + 1);

fs.writeFileSync(demoDataPath, newContent, 'utf8');
console.log('Successfully updated demoData.ts with STRICT PRODUCT ARCHITECTURE!');
