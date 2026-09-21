const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/lib/demoData.ts'), 'utf8');

const match = content.match(/export const INITIAL_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.log("Could not find INITIAL_PRODUCTS");
  process.exit(1);
}

const rawProducts = JSON.parse(match[1]);

// Cleaning helper
function cleanProduct(p, index) {
  const num = index + 1;
  const nameLower = (p.name || '').toLowerCase();
  const descLower = (p.description || '').toLowerCase();
  const rawCat = p.category || 'MODA';
  
  let name = p.name || '';
  let category = rawCat;
  let price = p.price || 15000;
  let description = p.description || '';
  let sizes = p.sizes || ['S', 'M', 'L', 'XL'];
  let colors = p.colors || ['Blanco', 'Negro', 'Rosa'];

  // Categorization & Name refinement logic based on image/raw text
  if (nameLower.includes('sneakers') || nameLower.includes('shoes') || nameLower.includes('zapatos') || nameLower.includes('ballet') || nameLower.includes('flats') || nameLower.includes('sandals') || nameLower.includes('crocs') || nameLower.includes('topuklu') || rawCat === 'CALZADO') {
    category = 'CALZADO';
    sizes = ['36', '37', '38', '39', '40', '41', '42'];
    colors = ['Negro', 'Blanco', 'Beige', 'Bordo'];
    price = 25000;

    if (nameLower.includes('sneakers') || nameLower.includes('sports')) {
      name = `Sneakers Urbanos Bicolor Sports Men's Edition (Ref. EB-${num})`;
      description = `Zapatillas deportivas de malla transpirable con suela amortiguadora de impacto. Diseño ergonómico para vestir casual con jeans o ropa deportiva en Malabo y Bata.`;
      price = 28000;
    } else if (nameLower.includes('ballet') || nameLower.includes('flats') || nameLower.includes('ollio')) {
      name = `Bailarinas Elegantes Encaje Floral Ollio Paris (Ref. EB-${num})`;
      description = `Zapatos planos tipo bailarina confeccionados en encaje floral transpirable con acabado refinado. Plantilla acolchada para máxima comodidad todo el día.`;
      price = 22000;
    } else if (nameLower.includes('topuklu') || nameLower.includes('duxal') || nameLower.includes('rugan')) {
      name = `Zapato de Tacón Rugan Doble Tira Couture (Ref. EB-${num})`;
      description = `Zapatos de salón de charol satinado con doble tira y tacón estilizado. Diseño refinado para eventos de gala y noches exclusivas.`;
      price = 35000;
    } else if (nameLower.includes('crocs') || nameLower.includes('slippers')) {
      name = `Zuecos Confort Crocs Original Limited Edition (Ref. EB-${num})`;
      description = `Calzado ligero e impermeable con plantilla ortopédica ultra cómoda. Ideal para uso diario y descanso con estilo exclusivo.`;
      price = 18000;
    } else {
      name = `Calzado Femenino Malla Calada Spring Style (Ref. EB-${num})`;
      description = `Zapatos planos de diseño calado primaveral con adorno de lazo frontal. Flexibles, elegantes y ultra frescos.`;
      price = 24000;
    }

  } else if (nameLower.includes('soap') || nameLower.includes('sabun') || nameLower.includes('sabonete') || nameLower.includes('palmolive') || nameLower.includes('grisi') || nameLower.includes('carowhite') || rawCat === 'JABONES') {
    category = 'JABONES';
    sizes = ['100g', '150g', '180g', 'Pack 3x', 'Pack 12x'];
    colors = ['Natural', 'Blanco', 'Amarillo'];
    price = 3500;

    if (nameLower.includes('palmolive')) {
      name = `Jabón Vegetal Palmolive Naturals Extractos Herbales (Pack 12 x 90g)`;
      description = `Pack familiar de jabones enriquecidos con extractos herbales purificantes y aroma botánico. Limpieza profunda respetando el pH natural de la piel.`;
      price = 8500;
    } else if (nameLower.includes('grisi') || nameLower.includes('sulfur') || nameLower.includes('azufre')) {
      name = `Jabón Dermatológico Grisi Azufre Bio-Purificante 100g`;
      description = `Jabón medicinal purificante indicado para control de acné, exceso de grasa e imperfecciones. Formulación dermatológica efectiva de uso diario.`;
      price = 4500;
    } else if (nameLower.includes('carowhite')) {
      name = `Jabón Clarificante Nutritivo CaroWhite Skin Lightening 180g`;
      description = `Jabón enriquecido con agentes aclarantes naturales y aceite de zanahoria. Unifica el tono corporal mientras nutre e hidrata profundamente.`;
      price = 5000;
    } else if (nameLower.includes('turmeric') || nameLower.includes('cúrcuma') || nameLower.includes('kojic')) {
      name = `Jabón Artesanal de Cúrcuma & Ácido Kójico Iluminador 100g`;
      description = `Jabón artesanal enriquecido con cúrcuma orgánica y ácido kójico. Ayuda a atenuar manchas, renovar la textura cutánea y aportar luminosidad natural.`;
      price = 4000;
    } else if (nameLower.includes('egg') || nameLower.includes('crystal')) {
      name = `Jabón Artesanal Crystal Egg con Aceites Esenciales 120g`;
      description = `Jabón de lujo en forma de huevo de cristal con aceites esenciales relajantes y glicerina vegetal. Experiencia sensorial única en el baño.`;
      price = 5500;
    } else {
      name = `Jabón Corporal Hidratante Mel & Aveia Nutrición Intensa`;
      description = `Jabón cremoso de miel y avena coloidal. Calma pieles sensibles, restaura la barrera cutánea y proporciona una textura ultrasuave.`;
      price = 3500;
    }

  } else if (nameLower.includes('vaseline') || nameLower.includes('vaselina') || nameLower.includes('bálsa') || nameLower.includes('balm') || rawCat === 'VASELINAS') {
    category = 'VASELINAS';
    sizes = ['50ml', '100ml', '250ml', 'Pack 4x'];
    colors = ['Transparente', 'Dorado', 'Rosado'];
    price = 4000;

    if (nameLower.includes('healthy bright') || nameLower.includes('b3')) {
      name = `Vaselina Pura Vaseline Healthy Bright Vitamina B3 (Pack 4x75g)`;
      description = `Barra protectora hidratante infundida con Niacinamida (Vitamina B3). Restaura los labios secos, restaura la luminosidad y combate la resequedad del clima tropical.`;
      price = 7500;
    } else {
      name = `Vaselina Pura Reparadora EBNA Clinical Care 100g`;
      description = `Jalea de vaselina purificada al 100%. Crea una barrera oclusiva protectora que sellará la humedad en labios, codos y zonas agrietadas.`;
      price = 4000;
    }

  } else if (nameLower.includes('loción') || nameLower.includes('gel de ducha') || nameLower.includes('instituto español') || nameLower.includes('avena') || nameLower.includes('urea') || nameLower.includes('champú') || nameLower.includes('shampoo') || nameLower.includes('bonnet') || rawCat === 'HIGIENE') {
    category = 'HIGIENE';
    sizes = ['300ml', '500ml', '950ml', '1250ml'];
    colors = ['Blanco', 'Crema', 'Transparente'];
    price = 8000;

    if (nameLower.includes('avena') && nameLower.includes('loción')) {
      name = `Loción Corporal Hidratante Avena Instituto Español 950ml`;
      description = `Loción corporal de formato familiar formulada con extracto de avena 100% natural. Proporciona 24 horas de hidratación profunda sin dejar sensación grasa.`;
      price = 9500;
    } else if (nameLower.includes('urea')) {
      name = `Loción Corporal Reparadora Urea 10% Instituto Español 500ml`;
      description = `Tratamiento dermatológico intensivo con 10% de Urea para pieles muy secas o rugosas. Suaviza la piel de inmediato y elimina descamaciones.`;
      price = 8500;
    } else if (nameLower.includes('lactoadvance') || nameLower.includes('gel de ducha')) {
      name = `Gel de Ducha Lactoadvance Instituto Español 1250ml (Edición Familiar)`;
      description = `Gel de baño dermoprotector enriquecido con proteínas de la leche. Aporta suavidad extrema y protección diaria para toda la familia.`;
      price = 11000;
    } else if (nameLower.includes('champú') || nameLower.includes('atópicas')) {
      name = `Champú Suave Pieles Atópicas Instituto Español 300ml`;
      description = `Champú sin sulfatos agresivos diseñado para cuero cabelludo sensible o con tendencia atópica. Limpia con máxima delicadeza y calma el picor.`;
      price = 7000;
    } else if (nameLower.includes('bonnet') || nameLower.includes('satin')) {
      name = `Gorro Satinado Ajustable Protector para Trenzas & Cabello Largo`;
      description = `Gorro de satén de seda doble capa con banda elástica ajustable. Previene el encrespamiento, retiene la hidratación nocturna y protege peinados y trenzas.`;
      price = 6000;
    } else {
      name = `Gel de Ducha Botánico Flora Peony Pivoine Fresh 500ml`;
      description = `Gel de baño aromático con extracto de peonías frescas y aloe vera. Deja un velo de perfume floral sutil y piel aterciopelada.`;
      price = 7500;
    }

  } else if (nameLower.includes('lipstick') || nameLower.includes('esfoliante') || nameLower.includes('exfoliante') || nameLower.includes('crème') || nameLower.includes('topicrem') || nameLower.includes('scrub') || nameLower.includes('mela') || nameLower.includes('brunch') || rawCat === 'COSMETICA') {
    category = 'COSMETICA';
    sizes = ['30g', '50ml', '100ml', 'Standard'];
    colors = ['Rosa', 'Rojo', 'Nude', 'Transparente'];
    price = 12000;

    if (nameLower.includes('topicrem') || nameLower.includes('mela') || nameLower.includes('spf50')) {
      name = `Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)`;
      description = `Tratamiento facial despigmentante de alta gama con protección solar muy alta SPF50+. Reduce manchas oscuras y previene su reaparición unificando el tono.`;
      price = 22000;
    } else if (nameLower.includes('lipstick') || nameLower.includes('matte') || nameLower.includes('liquid')) {
      name = `Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting`;
      description = `Pintalabios líquido mate indeleble de alta pigmentación. Textura terciopelo intransferible que dura hasta 16 horas sin resecar los labios.`;
      price = 9000;
    } else if (nameLower.includes('esfoliante labial') || nameLower.includes('exfoliante de labios')) {
      name = `Exfoliante Labial Nutritivo de Coco & Frambuesa 30g`;
      description = `Bálsamo exfoliante de labios con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas e ilumina el tono natural de los labios.`;
      price = 6500;
    } else if (nameLower.includes('scrub') || nameLower.includes('sea salt') || nameLower.includes('jojoba')) {
      name = `Exfoliante Corporal de Cúrcuma & Sal Marina con Aceite de Jojoba 250g`;
      description = `Scrub corporal pulidor con sal marina fina, cúrcuma y aceite de jojoba puro. Remueve células muertas dejando la piel sedosa y radiante.`;
      price = 12000;
    } else {
      name = `Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)`;
      description = `Concentrado ilumindor facial con vitamina C estabilizada y ácido hialurónico. Aporta frescura instantánea y efecto buena cara todo el día.`;
      price = 15000;
    }

  } else if (nameLower.includes('passport') || nameLower.includes('pasaporte') || nameLower.includes('glasses') || nameLower.includes('안경') || nameLower.includes('bag') || rawCat === 'ACCESORIOS') {
    category = 'ACCESORIOS';
    sizes = ['Unica', 'Standard'];
    colors = ['Azul', 'Negro', 'Marrón', 'Dorado'];
    price = 14000;

    if (nameLower.includes('passport') || nameLower.includes('pasaporte')) {
      name = `Funda Porta Pasaporte Executive PU Leather & Porta Tarjetas de Viaje`;
      description = `Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa. Incluye ranuras para pasaporte, pasajes y tarjetas.`;
      price = 12000;
    } else if (nameLower.includes('glasses') || nameLower.includes('안경') || nameLower.includes('tv')) {
      name = `Gafas de Sol Classic Square Unisex Filtro Filtro Luz Azul (Pack 3x)`;
      description = `Set de 3 gafas cuadradas estilo clásico con lentes protectoras contra pantallas y rayos UV. Montura ligera en acetato negro mate de gran durabilidad.`;
      price = 16000;
    } else {
      name = `Bolso de Mano Chic Executive Leather EBNA Luxury`;
      description = `Bolso rígido de mano con herrajes dorados refinados y bandolera ajustable. Elegancia absoluta para reuniones y paseos de fin de semana.`;
      price = 28000;
    }

  } else if (nameLower.includes('dress') || nameLower.includes('vestido') || nameLower.includes('maxi skirt') || nameLower.includes('gingham') || nameLower.includes('bodycon') || rawCat === 'VESTIDOS') {
    category = 'VESTIDOS';
    sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    colors = ['Negro', 'Blanco', 'Rosa', 'Rojo'];
    price = 22000;

    if (nameLower.includes('gingham') || nameLower.includes('smocked')) {
      name = `Vestido Midi Gingham Smocked Tie-Strap Elegance (Ref. EB-${num})`;
      description = `Vestido midi con estampado de cuadros gingham, cuerpo nido de abeja elástico y tirantes ajustables con lazo. Confección fluida ideal para eventos de verano.`;
      price = 24000;
    } else if (nameLower.includes('bodycon') || nameLower.includes('halter')) {
      name = `Vestido Mini Halter Neck Bodycon Satin Finish (Ref. EB-${num})`;
      description = `Mini vestido entallado escote halter con detalle de botones dorados. Ajuste perfecto que realza la silueta con elegancia nocturna.`;
      price = 26000;
    } else if (nameLower.includes('maxi skirt') || nameLower.includes('cerelina')) {
      name = `Falda Maxi Jersey Cerelina White Couture (Ref. EB-${num})`;
      description = `Falda larga de punto elástico fino drapeada con ajuste de cintura alta. Caída espectacular de inspiración helénica.`;
      price = 20000;
    } else if (nameLower.includes('polka dot') || nameLower.includes('beach')) {
      name = `Vestido Veraniego Polka Dot Retro Flared (Ref. EB-${num})`;
      description = `Vestido acampanado con estampado de lunares vintage y escote en V. Tejido de algodón transpirable suave y fresco.`;
      price = 22000;
    } else {
      name = `Vestido de Gala Silueta Sirena Satin Evening Dress (Ref. EB-${num})`;
      description = `Vestido de noche drapeado en raso de seda con apertura lateral sutil. Sofisticación pura para celebraciones especiales en Guinea Ecuatorial.`;
      price = 32000;
    }

  } else {
    // General MODA
    category = 'MODA';
    sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    colors = ['Blanco', 'Negro', 'Marrón', 'Rosa', 'Azul'];
    price = 18000;

    if (nameLower.includes('crop top') || nameLower.includes('flared pants') || nameLower.includes('suit')) {
      name = `Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Ref. EB-${num})`;
      description = `Set de 2 piezas compuesto por top corto con capucha y pantalón acampanado elástico. Estilo athleisure de corte impecable.`;
      price = 25000;
    } else if (nameLower.includes('y2k') || nameLower.includes('streetwear') || nameLower.includes('jeans')) {
      name = `Pantalón Jeans Wide Leg Streetwear Y2K Edition (Ref. EB-${num})`;
      description = `Pantalón vaquero de corte ancho holgado con detalles bordados retro Y2K. Algodón denim resistente de alta calidad.`;
      price = 28000;
    } else if (nameLower.includes('maternity') || nameLower.includes('leggings')) {
      name = `Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft (Ref. EB-${num})`;
      description = `Set de 2 mallas de soporte premamá de tiro alto con banda anatómica elástica. Tejido transpirable de máxima suavidad.`;
      price = 18000;
    } else if (nameLower.includes('zara') || nameLower.includes('highstreet')) {
      name = `Chaqueta Blazer Sastre Zara Style New Collection (Ref. EB-${num})`;
      description = `Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda imprescindible de fondo de armario.`;
      price = 32000;
    } else if (nameLower.includes('perfume') || nameLower.includes('red vanilla')) {
      category = 'COSMETICA';
      name = `Perfume Zara Red Vanilla Eau de Parfum (100ml)`;
      description = `Fragancia femenina sofisticada con notas cálidas de vainilla dulce, flor de iris y frambuesa negra. Estela duradera e irresistible.`;
      price = 19500;
      sizes = ['50ml', '100ml'];
    } else if (nameLower.includes('hoodie') || nameLower.includes('mulvari')) {
      name = `Sudadera Oversized Thermal Lined Kangaroo Hoodie (Ref. EB-${num})`;
      description = `Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto para días frescos.`;
      price = 22000;
    } else if (nameLower.includes('jacket') || nameLower.includes('oh polly')) {
      name = `Chaqueta Active Soft Mid-Layer Zip Up Oh Polly Style (Ref. EB-${num})`;
      description = `Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal y cuello alzado. Realza la figura con estilo futurista.`;
      price = 27000;
    } else if (nameLower.includes('shorts') || nameLower.includes('drawstring waist')) {
      name = `Pantalón Corto Bermuda Casual Men's Solid Color (Ref. EB-${num})`;
      description = `Bermuda masculina de algodón ligero con cintura elástica y cordón ajustable. Comodidad diaria garantizada.`;
      price = 15000;
    } else if (nameLower.includes('stripe suit') || nameLower.includes('wedding')) {
      name = `Traje de Chaqueta Formal Men's Navy Blue Stripe Suit (Ref. EB-${num})`;
      description = `Traje masculino sastre de 2 piezas en lana fría con fino estriado diplomático. Impecable para bodas, actos oficiales y negocios.`;
      price = 45000;
    } else if (nameLower.includes('tee') || nameLower.includes('t-shirt') || nameLower.includes('boston')) {
      name = `Camiseta Algodón Boston Athletic Fit Oversized Tee (Ref. EB-${num})`;
      description = `Camiseta de cuello redondo de algodón peinado de gramaje superior con tipografía universitaria en el pecho.`;
      price = 14000;
    } else {
      // General elegant catalog names
      const modaNames = [
        `Top Elegante Drapeado Satin Chic (Ref. EB-${num})`,
        `Conjunto de Punto Fino Primavera-Verano (Ref. EB-${num})`,
        `Blusa de Seda con Lazada al Cuello Executive (Ref. EB-${num})`,
        `Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-${num})`,
        `Chaqueta Tweed Estilo Chanel Couture (Ref. EB-${num})`,
        `Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-${num})`,
        `Falda Lápiz Midi con Apertura Posterior (Ref. EB-${num})`,
        `Camisa de Lino Blanco Pure Luxury Edition (Ref. EB-${num})`
      ];
      name = modaNames[index % modaNames.length];
      description = `Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.`;
      price = 18000 + ((index * 1500) % 15000);
    }
  }

  // Create clean slug
  const cleanSlug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + `-ebna-${num}`;

  return {
    ...p,
    id: `ebna-${num}`,
    slug: cleanSlug,
    name,
    category,
    description,
    price,
    images: p.images && p.images.length > 0 ? p.images : [`/products/product_${num}.jfif`],
    in_stock: p.in_stock !== undefined ? p.in_stock : true,
    is_hidden: false,
    colors,
    sizes,
    created_at: p.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

const cleanedProducts = rawProducts.map((p, i) => cleanProduct(p, i));

console.log(`Cleaned ${cleanedProducts.length} products successfully.`);
console.log("Sample product 1:", cleanedProducts[0].name, "|", cleanedProducts[0].category, "|", cleanedProducts[0].price);
console.log("Sample product 21:", cleanedProducts[20].name, "|", cleanedProducts[20].category, "|", cleanedProducts[20].price);
console.log("Sample product 52:", cleanedProducts[51].name, "|", cleanedProducts[51].category, "|", cleanedProducts[51].price);

// Replace INITIAL_PRODUCTS in demoData.ts
const newArrayString = JSON.stringify(cleanedProducts, null, 2);
const updatedCode = content.replace(/export const INITIAL_PRODUCTS: Product\[\] = \[[\s\S]*?\];\n\n\/\/ Fast in-memory/, `export const INITIAL_PRODUCTS: Product[] = ${newArrayString};\n\n// Fast in-memory`);

fs.writeFileSync(path.join(__dirname, '../src/lib/demoData.ts'), updatedCode, 'utf8');
console.log("Updated demoData.ts successfully!");
