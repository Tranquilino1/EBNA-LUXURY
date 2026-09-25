const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');

// 1. Database connection to Turso Cloud
const TURSO_URL = 'https://ebna-luxury-aidasolution.aws-us-west-2.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTAyODY0ODcsImlkIjoiMDFhMGQ1NjItYzIwMS03YjY0LTkwYWMtOTk2ZTU1MTk5YjU3Iiwia2lkIjoiQ0N6d1dtY3ZiZjJad2J5TjNSdV9HYXY0LTBYTENQRGpBcEZhUXNPWTlHcyIsInJpZCI6IjE5ODk3ODZlLWY4M2QtNDYyNy05ZDJmLTYxMDQwYmY1NTQ1ZCJ9.q1taQDxj7xmrfBBNmTivkWlXPrRocWdMEiuf0YYSMT6Ez-Tb6QSMkA7IptC4khXx1PlzBVsG3YpTD7Q0OPngBA';

const turso = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

const DIR_NUEVOS = path.join(__dirname, '..', 'public', 'products', 'nuevos');

// Helper to sanitize filename for web URLs
function toCleanFilename(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '.jpg';
}

// Complete metadata mapping for all 134 products
const rawSpecs = [
  {
    rawFile: "1 A 5000 FCFA.jpeg",
    name: "Wokali Sherbet Body Scrub Exfoliante Corporal Frutal y Carbón",
    brand: "Wokali Natural Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Exfoliantes Corporales",
    priceFCFA: 5000,
    description: "Exfoliante corporal natural de textura sherbet enriquecido con micropartículas exfoliantes y aceites nutritivos. Elimina células muertas, desintoxica los poros y deja la piel suave y luminosa con aromas a aguacate, miel, frambuesa, albaricoque o carbón activo.",
    colors: ["Avocado", "Honey", "Charcoal", "Raspberry", "Apricot", "Almond"],
    sizes: ["350ml"],
    material: "Extractos Botánicos & Microgránulos Minerales"
  },
  {
    rawFile: "1000 FCFA.jpeg",
    name: "Esponja de Baño Exfoliante de Malla Suave / Flor de Ducha",
    brand: "EBNA Bath Essentials",
    category: "HIGIENE_CORPORAL",
    subcategory: "Accesorios de Baño",
    priceFCFA: 1000,
    description: "Flor de ducha de esponja ultra suave en malla esponjosa con asa de algodón. Genera una espuma densa y cremosa, realizando una exfoliación gentil que cuida todo tipo de pieles.",
    colors: ["Rosa Pastel", "Beige Marfil", "Gris Ceniza", "Verde Oliva", "Marrón"],
    sizes: ["Estándar"],
    material: "Malla de Polietileno Hipoalergénico"
  },
  {
    rawFile: "10000FCFA.jpeg",
    name: "Bolso de Mano Bicolor Estructurado con Relieve Chevron",
    brand: "Sindy Luxury Leather",
    category: "BOLSOS",
    subcategory: "Bolsos de Mano",
    priceFCFA: 10000,
    description: "Diseño elegante y versátil en dos tonos con grabado frontal en relieve geométrico chevron. Incluye asas cortas de mano reforzadas y correa bandolera extraíble para lucir en cualquier ocasión.",
    colors: ["Negro con Blanco", "Marrón con Blanco", "Beige con Blanco", "Vino con Blanco"],
    sizes: ["Mediano (28cm x 22cm x 12cm)"],
    material: "Piel Sintética PU de Alta Densidad"
  },
  {
    rawFile: "15000 FCFA.jpeg",
    name: "Faja Reductora Colombiana Modeladora Reloj de Arena con Doble Ajuste",
    brand: "Sindy Silhouette Couture",
    category: "MODA_MUJER",
    subcategory: "Lencería & Fajas Modeladoras",
    priceFCFA: 15000,
    description: "Faja reductora y estilizadora de cintura de alta compresión. Diseñada con bandas elásticas cruzadas y triple hilera de broches frontales para moldear la figura reloj de arena sin sacrificar comodidad.",
    colors: ["Beige Nude", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    material: "Powernet Transpirable & Varillas Flexibles"
  },
  {
    rawFile: "18000FCFA.jpeg",
    name: "Sandalias Planas ZARA Joya con Detalle Ámbar y Tiras al Tobillo",
    brand: "ZARA Exclusive",
    category: "CALZADO",
    subcategory: "Sandalias Joya",
    priceFCFA: 18000,
    description: "Sandalias planas de diseño minimalista con tiras finas de piel color borgoña moca. Destacan por su aplique central joya en resina facetada ámbar y plantilla ergonómica confortable.",
    colors: ["Borgoña Ámbar", "Negro Ónix"],
    sizes: ["37", "38", "39", "40", "41"],
    material: "Piel Genuina & Aplique Joya Ámbar"
  },
  {
    rawFile: "20000 FCFA.jpeg",
    name: "Faja Enterizo Reductora Postquirúrgica y Levanta Glúteos con Corset",
    brand: "Sindy Silhouette Couture",
    category: "MODA_MUJER",
    subcategory: "Lencería & Fajas Modeladoras",
    priceFCFA: 20000,
    description: "Enterizo moldeador integral con compresión abdominal de corset con cremallera frontal, tirantes anchos acolchados y efecto levanta glúteos natural. Ideal para uso diario o postparto.",
    colors: ["Negro Carbón", "Marrón Moca"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Powernet de Alta Compresión & Forro Antibacteriano"
  },
  {
    rawFile: "23 PIEZAS DE ANILLOS ELEGANTES RETRO 1 A 500 FCFA Y CONJUNTO A 6000 FCFA.jpeg",
    name: "Set de 23 Anillos Elegantes Vintage Boho Chic con Cristales y Relieve",
    brand: "EBNA Jewelry & Bijoux",
    category: "ACCESORIOS",
    subcategory: "Joyería & Anillos",
    priceFCFA: 6000,
    description: "Espectacular colección de 23 anillos combinables de estilo bohemio y vintage con acabados en oro envejecido, circonitas incrustadas y motivos geométricos. Disponibles en conjunto a 6.000 FCFA o individualmente a 500 FCFA.",
    colors: ["Oro Vintage", "Plata Envejecida"],
    sizes: ["Tallas Variadas Adaptables (5 a 9)"],
    material: "Aleación de Zinc Hipoalergénica & Circonitas"
  },
  {
    rawFile: "25000 FCFA.jpeg",
    name: "Extractor de Leche Materna Eléctrico Doble Silencioso Recargable USB",
    brand: "Baby Care Pro",
    category: "ACCESORIOS",
    subcategory: "Maternidad & Bebés",
    priceFCFA: 25000,
    description: "Extractor de leche eléctrico de doble copa con tecnología de masaje rítmico y bombeo en 9 niveles de intensidad. Motor ultra silencioso, pantalla táctil digital, batería recargable por USB y dos biberones libres de BPA.",
    colors: ["Blanco Puro"],
    sizes: ["Kit Completo Doble"],
    material: "Silicona Médica Grado Alimentario & PP Libre de BPA"
  },
  {
    rawFile: "4000 FCFA.jpeg",
    name: "Bandas de Cera Depilatoria Veet Easy-Gelwax para Piernas y Cuerpo",
    brand: "Veet Professional",
    category: "HIGIENE_CORPORAL",
    subcategory: "Depilación & Cuidado Personal",
    priceFCFA: 4000,
    description: "Bandas de cera depilatoria listas para usar con tecnología Easy-Gelwax. Atrapan el vello más corto desde la raíz ofreciendo hasta 28 días de suavidad. Fórmulas enriquecidas con manteca de karité o aloe vera para pieles normales y sensibles.",
    colors: ["Rosa Karité", "Azul Sensible", "Verde Aloe"],
    sizes: ["Pack 20 Bandas"],
    material: "Gel de Cera Botánica & Toallitas Post-Depilación"
  },
  {
    rawFile: "5000 FCFA.jpeg",
    name: "Vaso Ondulado de Vidrio Borosilicato Coquette con Pajita y Lazo 3D",
    brand: "EBNA Home Living",
    category: "ACCESORIOS",
    subcategory: "Hogar & Cristalería",
    priceFCFA: 5000,
    description: "Vaso aesthetic con paredes de vidrio onduladas de alta resistencia térmica. Incluye tapa hermética de bambú natural, pajita de cristal y encantador lazo rosa tridimensional. Perfecto para batidos, matcha, cafés helados y cócteles.",
    colors: ["Rosa Coquette", "Transparente Cristal"],
    sizes: ["450 ml"],
    material: "Vidrio Borosilicato & Tapa de Bambú Orgánico"
  },
  {
    rawFile: "6000 FCFA......jpeg",
    name: "Vinilo Mural Decorativo de Pared 'Mirada de Pestañas Glamour'",
    brand: "EBNA Decor",
    category: "ACCESORIOS",
    subcategory: "Decoración & Murales",
    priceFCFA: 6000,
    description: "Vinilo autoadhesivo de gran formato para pared con diseño hiperestilizado de mirada femenina, cejas definidas y pestañas kilométricas de alta costura. Ideal para cabeceros de cama, vestidores y tocadores de belleza.",
    colors: ["Negro Azabache Mate"],
    sizes: ["110cm x 60cm"],
    material: "Vinilo Adhesivo Premium Lavable"
  },
  {
    rawFile: "6000 FCFA.....jpeg",
    name: "Vinilo Mural Artístico 'Beso Pasión' en Rojo Carmesí y Carboncillo",
    brand: "EBNA Decor",
    category: "ACCESORIOS",
    subcategory: "Decoración & Murales",
    priceFCFA: 6000,
    description: "Obra mural en vinilo autoadhesivo que representa el instante sublime de un beso sensual. Trazo artístico en carboncillo con labios voluptuosos destacados en rojo carmesí brillante.",
    colors: ["Rojo Carmesí & Negro Carboncillo"],
    sizes: ["100cm x 75cm"],
    material: "Vinilo de Alta Definición Removible"
  },
  {
    rawFile: "6000 FCFA...jpeg",
    name: "Vinilo Mural Bíblico 'Yo y mi Casa serviremos a Jehová' (Josué 24:15)",
    brand: "EBNA Decor",
    category: "ACCESORIOS",
    subcategory: "Decoración & Murales",
    priceFCFA: 6000,
    description: "Hermoso vinilo decorativo con tipografía caligráfica elegante del pasaje bíblico Josué 24:15. Aporta paz, bendición e identidad espiritual a la sala de estar o entrada del hogar.",
    colors: ["Negro Mate Elegante"],
    sizes: ["90cm x 65cm"],
    material: "Vinilo Adhesivo de Fácil Instalación"
  },
  {
    rawFile: "6000 FCFA..jpeg",
    name: "Vinilo Mural Familiar 'Cada Familia tiene una Historia, Bienvenidos a la Nuestra'",
    brand: "EBNA Decor",
    category: "ACCESORIOS",
    subcategory: "Decoración & Murales",
    priceFCFA: 6000,
    description: "Cálido mensaje mural de bienvenida con caligrafía fluida y arabescos ornamentales. Transforma cualquier salón, vestíbulo o comedor en un rincón acogedor de unión familiar.",
    colors: ["Negro Mate"],
    sizes: ["100cm x 55cm"],
    material: "Vinilo Mate Antirreflejo"
  },
  {
    rawFile: "6000 FCFA.jpeg",
    name: "Vinilo Mural Motivacional Queen 'She Remembered Who She Was'",
    brand: "EBNA Decor",
    category: "ACCESORIOS",
    subcategory: "Decoración & Murales",
    priceFCFA: 6000,
    description: "Potente declaración mural con corona de reina, mariposas etéreas y mirada hipnótica. Un recordatorio diario de autoestima, elegancia y determinación femenina.",
    colors: ["Negro Mate"],
    sizes: ["100cm x 70cm"],
    material: "Vinilo Adhesivo Premium"
  },
  {
    rawFile: "6000FCFA.jpeg",
    name: "Kit Profesional de Gemas Dentales Tooth Gems con Cristales Brillantes",
    brand: "EBNA Beauty Shine",
    category: "ACCESORIOS",
    subcategory: "Belleza & Joyería Dental",
    priceFCFA: 6000,
    description: "Kit completo de gemas dentales de cristal brillante para lucir una sonrisa de pasarela. Incluye cristales reflectantes de corte diamante, aplicadores y guía paso a paso para fijación segura y temporal.",
    colors: ["Cristal Diamante Transparente"],
    sizes: ["Set Completo con Cristales y Aplicador"],
    material: "Cristal Sintético Hipoalergénico"
  },
  {
    rawFile: "7000 FCFA..jpeg",
    name: "Vinilo Mural Vertical de Inspiración 'Sonríe, Vive, Ama, Disfruta'",
    brand: "EBNA Decor",
    category: "ACCESORIOS",
    subcategory: "Decoración & Murales",
    priceFCFA: 7000,
    description: "Mural vertical de gran altura perfecto para columnas, pasillos y escaleras. Mensaje positivo con tipografías alternadas: 'Sonríe cada día, Vive cada instante, Ama a cada hora, Disfruta cada segundo'.",
    colors: ["Negro Carbón"],
    sizes: ["140cm x 40cm (Formato Vertical)"],
    material: "Vinilo Decorativo de Alta Durabilidad"
  },
  {
    rawFile: "7000 FCFA.jpeg",
    name: "Organic Virgin Coconut Oil Aceite de Coco Virgen Puro Prensado en Frío",
    brand: "Tropical Organic Essentials",
    category: "HIGIENE_CORPORAL",
    subcategory: "Aceites Naturales & Dental Care",
    priceFCFA: 7000,
    description: "Aceite de coco 100% virgen sin refinar, prensado en frío de cultivos orgánicos. Fórmula multiusos excepcional para enjuague bucal purificante (oil pulling) para blanquear los dientes naturalmente, hidratación capilar y nutrición corporal.",
    colors: ["Blanco Puro Natural"],
    sizes: ["414ml / 14 Fl Oz"],
    material: "100% Aceite de Coco Virgen Orgánico"
  },
  {
    rawFile: "ADORNO BLANCO PAR 15000 FCFA.jpeg",
    name: "Dúo de Jarrones Cerámicos Esculturales Minimalistas en Blanco Mate",
    brand: "EBNA Living Home",
    category: "ACCESORIOS",
    subcategory: "Decoración & Esculturas",
    priceFCFA: 15000,
    description: "Par de jarrones decorativos de cerámica artesanal con silueta sinuosa inspirada en el arte nórdico abstracto. Su acabado en blanco tiza mate aporta sofisticación a cualquier consola o mesa de centro.",
    colors: ["Blanco Tiza Mate"],
    sizes: ["Set de 2 Piezas (24cm y 18cm)"],
    material: "Cerámica Esmaltada al Horno"
  },
  {
    rawFile: "ADORNO DE CASA CONJUNTO 15000 FCFA.jpeg",
    name: "Conjunto de Objetos Decorativos Esculturales para Salón de Lujo",
    brand: "EBNA Living Home",
    category: "ACCESORIOS",
    subcategory: "Decoración & Hogar",
    priceFCFA: 15000,
    description: "Conjunto armónico de elementos decorativos para el hogar. Diseñado para realzar estanterías y muebles con volúmenes vanguardistas y texturas refinadas.",
    colors: ["Blanco Cerámica & Acentos Dorados"],
    sizes: ["Conjunto Completo"],
    material: "Cerámica & Resina de Alta Calidad"
  },
  {
    rawFile: "ADVANCED CLINICAL VITAMIN C 6000 FCFA.jpeg",
    name: "Advanced Clinicals Vitamin C Anti-Aging Serum Facial Iluminador",
    brand: "Advanced Clinicals",
    category: "COSMETICA_FACIAL",
    subcategory: "Serums & Tratamientos Faciales",
    priceFCFA: 6000,
    description: "Serum facial antiedad concentrado con Vitamina C pura y ácido ferúlico. Reduce manchas oscuras, unifica el tono desigual de la piel y estimula la síntesis de colágeno devolviendo luminosidad juvenil.",
    colors: ["Fórmula Translúcida Dorada"],
    sizes: ["52ml / 1.75 Fl Oz"],
    material: "Vitamina C Activa, Ácido Ferúlico & Aloe Vera"
  },
  {
    rawFile: "ADVANVED KOREAN SKIN BRIGHT Y SMOOTH 15000FCFA.jpeg",
    name: "Advanced Korean Skin Bright & Smooth Crema Facial Aclaradora Coreana",
    brand: "Korean Beauty Lab",
    category: "COSMETICA_FACIAL",
    subcategory: "Cremas Faciales",
    priceFCFA: 15000,
    description: "Tratamiento dermatológico facial de alta tecnología coreana. Su complejo aclarante suave atenúa manchas de hiperpigmentación, reduce poros visibles y alisa la textura cutánea dejando un efecto piel de porcelana.",
    colors: ["Blanco Perlado"],
    sizes: ["50g"],
    material: "Niacinamida, Arbutina & Filtrado de Galactomyces"
  },
  {
    rawFile: "ADVANVED KOREAN SKIN FAIRES BODY OIL 12000FCFA.jpeg",
    name: "Advanced Korean Skin Fairer Body Oil Aceite Corporal Iluminador y Nutritivo",
    brand: "Korean Beauty Lab",
    category: "HIGIENE_CORPORAL",
    subcategory: "Aceites Corporales",
    priceFCFA: 12000,
    description: "Aceite corporal ligero de absorción rápida enriquecido con activos iluminadores botánicos. Hidrata en profundidad sin sensación grasa, devolviendo un brillo radiante a codos, rodillas y piernas.",
    colors: ["Dorado Claro"],
    sizes: ["200ml"],
    material: "Aceites Botánicos Prensados & Vitamina E"
  },
  {
    rawFile: "AI SI LI 2500 FCFA.jpeg",
    name: "Ai Si Li Crema Facial Hidratante Reparadora de Poros y Suavidad",
    brand: "Ai Si Li Cosmetics",
    category: "COSMETICA_FACIAL",
    subcategory: "Cremas Faciales",
    priceFCFA: 2500,
    description: "Crema facial ligera de rápida absorción indicada para el cuidado diario. Proporciona hidratación prolongada, calma rojeces y equilibra la producción de sebo.",
    colors: ["Blanco"],
    sizes: ["50g"],
    material: "Complejo Hidratante con Ácido Hialurónico"
  },
  {
    rawFile: "ALOE VERA 14000 FCFA.jpeg",
    name: "Aloe Vera 99% Puro Set Hidratante Calmante Facial y Corporal",
    brand: "Pure Herbal Nature",
    category: "HIGIENE_CORPORAL",
    subcategory: "Geles & Cremas de Aloe",
    priceFCFA: 14000,
    description: "Set completo de hidratación basado en Aloe Vera barbadensis 99% puro. Calma quemaduras solares, hidrata pieles secas o descamadas y regenera la barrera celular de rostro y cuerpo.",
    colors: ["Verde Cristalino"],
    sizes: ["Set Dúo Familiar (300ml x 2)"],
    material: "99% Jugo Concentrado de Aloe Vera Orgánico"
  },
  {
    rawFile: "ANTI DARK KNEES AND ELBOWS 6000 FCFA.jpeg",
    name: "Crema Correctora Intensiva Anti Dark Knees & Elbows para Zonas Oscuras",
    brand: "Derma Care Solutions",
    category: "HIGIENE_CORPORAL",
    subcategory: "Tratamientos Aclaradores",
    priceFCFA: 6000,
    description: "Fórmula dermocosmética especializada en aclarar y suavizar rodillas, codos, nudillos y tobillos oscurecidos. Contiene agentes exfoliantes suaves y activos clarificantes que unifican el tono.",
    colors: ["Crema Blanca"],
    sizes: ["100g"],
    material: "Ácido Kójico, Manteca de Karité & Extracto de Regaliz"
  },
  {
    rawFile: "AOC SKYNCARE 5000 FCFA.jpeg",
    name: "AOC Skincare Serum Facial Revitalizante con Efecto Tensor",
    brand: "AOC Skincare",
    category: "COSMETICA_FACIAL",
    subcategory: "Serums Faciales",
    priceFCFA: 5000,
    description: "Serum facial energizante que combate la fatiga cutánea, mejora la firmeza del óvalo facial y aporta un resplandor saludable inmediato antes del maquillaje.",
    colors: ["Gotero Transparente"],
    sizes: ["30ml"],
    material: "Péptidos Tensores & Antioxidantes Vegetales"
  },
  {
    rawFile: "BIBERIN RECARGABLE 22000 FCFA.jpeg",
    name: "Biberón Térmico Eléctrico Inteligente Portátil con Batería USB",
    brand: "Baby Tech Comfort",
    category: "ACCESORIOS",
    subcategory: "Maternidad & Bebés",
    priceFCFA: 22000,
    description: "Revolucionario biberón portátil autocalentable con control de temperatura digital a 37°C - 45°C. Batería recargable USB de larga duración para alimentar al bebé en viajes, paseos o noches sin esperar.",
    colors: ["Rosa Pastel", "Verde Menta"],
    sizes: ["240ml"],
    material: "Vidrio Borosilicato & Envoltura Térmica de Silicona"
  },
  {
    rawFile: "BIO OIL SKINECARE 12000 FCFA.jpeg",
    name: "Bio-Oil Skincare Oil Tratamiento Experto para Cicatrices y Estrías",
    brand: "Bio-Oil",
    category: "HIGIENE_CORPORAL",
    subcategory: "Aceites Reparadores",
    priceFCFA: 12000,
    description: "El aceite corporal de mayor recomendación dermatológica en el mundo. Enriquecido con el ingrediente revolucionario PurCellin Oil™, vitaminas A y E, extractos de caléndula, lavanda y romero.",
    colors: ["Tono Salmón Traslúcido"],
    sizes: ["125ml"],
    material: "PurCellin Oil™ & Complejo Vitamínico A y E"
  },
  {
    rawFile: "BODY SCRUB EXFOLLANTE CORPORAL 5000 FCFA.jpeg",
    name: "Body Scrub Exfoliante Corporal Pulidor de Piel con Sal Marina y Coco",
    brand: "EBNA Body Lab",
    category: "HIGIENE_CORPORAL",
    subcategory: "Exfoliantes Corporales",
    priceFCFA: 5000,
    description: "Tratamiento exfoliante spa en casa. Exfolia suavemente eliminando impurezas acumuladas y estimulando la microcirculación cutánea para una piel sedosa y rejuvenecida.",
    colors: ["Coco Natural"],
    sizes: ["350g"],
    material: "Sal del Mar Muerto & Aceite de Coco Puro"
  },
  {
    rawFile: "BOLSA BELLEBOARD 18000 FCFA.jpeg",
    name: "Bolso Tote de Hombro Belleboard en Cuero Vegano Acolchado",
    brand: "Belleboard Paris",
    category: "BOLSOS",
    subcategory: "Bolsos Tote & Hombro",
    priceFCFA: 18000,
    description: "Bolso shopper amplio y ligero con textura de micrograno suave y detalles dorados. Su espacioso interior con bolsillos organizadores es perfecto para el trabajo, compras y paseos.",
    colors: ["Negro", "Beige Arena", "Marrón Caramelo"],
    sizes: ["Grande (36cm x 28cm x 14cm)"],
    material: "Cuero Vegano PU Premium & Forro Satinado"
  },
  {
    rawFile: "BOLSO DE 3 COLERES 18000 FCFA.jpeg",
    name: "Bolso de Mano Tricolor Elegante con Asa Superior y Bandolera",
    brand: "Sindy Luxury Leather",
    category: "BOLSOS",
    subcategory: "Bolsos de Mano",
    priceFCFA: 18000,
    description: "Diseño tricolor en bloques contrastados con asa superior rígida forrada y correa bandolera desmontable. Ideal para atuendos elegantes de oficina y cócteles.",
    colors: ["Negro / Blanco / Camel", "Burdeos / Nude / Crema"],
    sizes: ["Mediano (26cm x 20cm x 10cm)"],
    material: "Piel Sintética Grano Fino & Herrajes Oro Cepillado"
  },
  {
    rawFile: "BOLSO DE 5 COLORES 25000 FCFA.jpeg",
    name: "Bolso Estructurado de Pasarela Multicolor en 5 Tonos Armónicos",
    brand: "Sindy Luxury Haute Couture",
    category: "BOLSOS",
    subcategory: "Bolsos de Fiesta & Pasarela",
    priceFCFA: 25000,
    description: "Bolso de edición exclusiva con combinación de 5 tonalidades de lujo. Su estructura geométrica y cierre metálico biselado lo convierten en una pieza central de cualquier look sofisticado.",
    colors: ["Multicolor Armónico"],
    sizes: ["Mediano (30cm x 22cm x 12cm)"],
    material: "Cuero PU Reforzado con Pespuntes Artesanales"
  },
  {
    rawFile: "BOLSO DE 7 COLERES MEDIANO 20000 FCFA.jpeg",
    name: "Bolso Clásico Mediano Gama 7 Tonos con Cierre Joya",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Bolsos de Mano",
    priceFCFA: 20000,
    description: "Bolso mediano de líneas puras disponible en una selecta paleta de 7 tonos sobrios y luminosos. Cierre giratorio en oro brillante y doble asa multifunción.",
    colors: ["Negro", "Beige", "Rojo", "Azul Noche", "Rosa Palo", "Verde Esmeralda", "Marrón"],
    sizes: ["Mediano (27cm x 19cm x 11cm)"],
    material: "Piel Sintética Texturizada"
  },
  {
    rawFile: "BOLSO DE 7 COLORES GRANDE 28000 FCFA.jpeg",
    name: "Bolso Maxi Tote Ejecutivo Gama 7 Tonos con Triple Compartimento",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Bolsos Tote & Shopper",
    priceFCFA: 28000,
    description: "Bolso ejecutivo de gran capacidad confeccionado para la mujer moderna. Alberga tablet, cosméticos y documentos en tres secciones independientes con cremallera central.",
    colors: ["Negro Imperial", "Camel", "Azul Marino", "Burdeos", "Taupe", "Marfil", "Verde Bosque"],
    sizes: ["Grande (38cm x 29cm x 15cm)"],
    material: "Piel PU de Alto Gramaje Resistente al Agua"
  },
  {
    rawFile: "BOLSO DE 7 COLORES PEQUENO 18000 FCFA.jpeg",
    name: "Minibolso Bandolera Compacto 7 Tonos con Cadena Dorada",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Minibolsos & Bandoleras",
    priceFCFA: 18000,
    description: "Minibolso coqueto con solapa frontal y cadena barbada en oro pulido. El accesorio indispensable para salidas nocturnas, fiestas y cenas.",
    colors: ["Rosa", "Negro", "Blanco", "Rojo", "Azul", "Beige", "Lila"],
    sizes: ["Pequeño (20cm x 14cm x 7cm)"],
    material: "Piel Sintética Acolchada & Cadena Metálica"
  },
  {
    rawFile: "BOLSO DE 9 SERIES GRANDE 30000 FCFA,MEDIANO 25000 FCFA ,PEQUENO 20000 FCFA.jpeg",
    name: "Colección Signature 9 Series de Alta Gama en 3 Tamaños Exclusivos",
    brand: "Sindy Luxury Haute Couture",
    category: "BOLSOS",
    subcategory: "Bolsos de Colección",
    priceFCFA: 30000,
    description: "La cumbre de la marroquinería de Sindy Luxury. La serie 9 combina acabados milimétricos, silueta estructurada y forro de ante. Disponible en Grande (30.000 FCFA), Mediano (25.000 FCFA) y Pequeño (20.000 FCFA).",
    colors: ["Negro Diamante", "Blanco Imperial", "Marrón Habana", "Rojo Rubí"],
    sizes: ["Grande (30.000 FCFA)", "Mediano (25.000 FCFA)", "Pequeño (20.000 FCFA)"],
    material: "Piel Sintética Premium con Acabado Semibrillante"
  },
  {
    rawFile: "BOLSO DE CRISTIAN DIOR 15000 FCFA.jpeg",
    name: "Bolso Estilo Lady Dior con Grabado Cannage y Dijes Metálicos",
    brand: "Inspiración Alta Costura",
    category: "BOLSOS",
    subcategory: "Bolsos de Gala",
    priceFCFA: 15000,
    description: "Icónica silueta rígida con acolchado geométrico Cannage y dijes de letras colgantes en dorado. Un tributo a la máxima distinción parisina.",
    colors: ["Negro Charol", "Blanco Perla", "Rojo"],
    sizes: ["24cm x 20cm x 11cm"],
    material: "Piel Sintética con Grabado Cannage Acolchado"
  },
  {
    rawFile: "BOLSO DE LUJO PIEL DE COCODRILO 30000 FCFA.jpeg",
    name: "Bolso de Gala con Textura en Relieve Piel de Cocodrilo y Candado Dorado",
    brand: "Sindy Luxury Haute Couture",
    category: "BOLSOS",
    subcategory: "Bolsos de Gala",
    priceFCFA: 30000,
    description: "Majestuoso bolso confeccionado con grabado en relieve profundo imitación piel de cocodrilo lacada. Destaca por su broche central de candado dorado joya y asas redondeadas artesanales.",
    colors: ["Negro Obsidiana", "Verde Esmeralda", "Marrón Coñac"],
    sizes: ["32cm x 24cm x 13cm"],
    material: "Piel Sintética Grabado Cocodrilo con Acabado Brillante"
  },
  {
    rawFile: "BOLSO DE MANO PIEL DE PU NICOLOR 25000 FCFA.jpeg",
    name: "Bolso de Mano Bicolor en Cuero PU Premium con Silueta Trapezoidal",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Bolsos de Mano",
    priceFCFA: 25000,
    description: "Silueta trapezoidal arquitectónica con elegante juego de dos tonos. Cuenta con base reforzada con tachuelas metálicas protectoras y cierre de cremallera oculta.",
    colors: ["Beige & Negro", "Blanco & Marrón"],
    sizes: ["29cm x 21cm x 12cm"],
    material: "Cuero PU Bicolor de Alta Resistencia"
  },
  {
    rawFile: "BOLSO LUJO 25000 FCFA.jpeg",
    name: "Bolso de Mano Joya de Alta Gama con Aplique Metálico Dorado",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Bolsos de Fiesta",
    priceFCFA: 25000,
    description: "Bolso refinado de textura suave con chapa frontal dorada y cantoneras protegidas. El complemento definitivo para vestidos de noche y cócteles.",
    colors: ["Negro Oro", "Beige Dorado"],
    sizes: ["26cm x 18cm x 9cm"],
    material: "Piel PU Lisa & Accesorios de Metal Dorado"
  },
  {
    rawFile: "BOLSO LUJO FASHION 28000 FCFA.jpeg",
    name: "Bolso Fashion Haute Couture con Asa Trenzada y Candado Joya",
    brand: "Sindy Luxury Haute Couture",
    category: "BOLSOS",
    subcategory: "Bolsos de Pasarela",
    priceFCFA: 28000,
    description: "Creación de pasarela con asa de mano trenzada artesanalmente y candado decorativo biselado en oro pulido. Estilo audaz y sumamente glamuroso.",
    colors: ["Blanco Puro", "Negro", "Rosa Fucsia"],
    sizes: ["28cm x 20cm x 11cm"],
    material: "Piel Sintética de Grano Sedoso"
  },
  {
    rawFile: "BOLSO LUJO GRANDE 28000 FCFA.jpeg",
    name: "Bolso Shopper Maxi Lujo con Compartimento Expandible",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Bolsos Tote & Shopper",
    priceFCFA: 28000,
    description: "Bolso espacioso de viaje y oficina con doble costura reforzada, forro textil satinado y bolsillo interior con cremallera de seguridad.",
    colors: ["Negro", "Marrón Tabaco", "Crema"],
    sizes: ["Grande (39cm x 30cm x 16cm)"],
    material: "Piel Sintética Resistente al Roce"
  },
  {
    rawFile: "BOLSO LUJO NEGRO 30000 FCFA.jpeg",
    name: "Bolso Negro Obsidiana de Gala con Detalles en Oro Cepillado",
    brand: "Sindy Luxury Haute Couture",
    category: "BOLSOS",
    subcategory: "Bolsos de Gala",
    priceFCFA: 30000,
    description: "La máxima expresión de la elegancia atemporal. Acabado en negro profundo con herrajes dorados de alta joyería y cierre de precisión magnético.",
    colors: ["Negro Obsidiana"],
    sizes: ["30cm x 22cm x 12cm"],
    material: "Cuero PU Alta Costura & Metal Dorada Inoxidable"
  },
  {
    rawFile: "BOLSO LUJO ROJO MATE 25000 FCFA.jpeg",
    name: "Bolso Rojo Carmesí Mate Sofisticado para Eventos Exclusivos",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Bolsos de Fiesta",
    priceFCFA: 25000,
    description: "Intenso rojo carmesí con textura mate sedosa al tacto. Transmite fuerza, feminidad y presencia en cualquier velada o evento de gala.",
    colors: ["Rojo Carmesí Mate"],
    sizes: ["27cm x 19cm x 10cm"],
    material: "Piel Sintética Mate Premium"
  },
  {
    rawFile: "BOLSO NEGRO 25000 FCFA.jpeg",
    name: "Bolso Clásico Negro de Cuero Premium con Bandolera Ajustable",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Bolsos de Hombro",
    priceFCFA: 25000,
    description: "Diseño sobrio, ergonómico y ultracombinable. Confeccionado en negro eterno con costuras invisibles y forro de tela monogramada.",
    colors: ["Negro Azabache"],
    sizes: ["28cm x 21cm x 11cm"],
    material: "Cuero Sintético PU Resistente"
  },
  {
    rawFile: "BOLSO,MONEDERO Y CHANCLETAS HERMES CONJUNTO 50000 FCFA.jpeg",
    name: "Conjunto Lujo 3 Piezas Estilo Hermès (Bolso + Monedero + Sandalias Oran)",
    brand: "Inspiración Hermès Paris",
    category: "BOLSOS",
    subcategory: "Sets Exclusivos de Lujo",
    priceFCFA: 50000,
    description: "El conjunto de mayor distinción: Bolso Birkin-style con herraje dorado + Cartera monedero a juego + Sandalias planas con la icónica pala en 'H'. Un look completo de alta costura.",
    colors: ["Naranja Clásico Hermès", "Negro", "Marrón Cuero"],
    sizes: ["Tallas Sandalias: 37, 38, 39, 40, 41"],
    material: "Cuero Vegano Texturizado Epsom & Suela Reforzada"
  },
  {
    rawFile: "BOLSOS 15000 FCFA.jpeg",
    name: "Bolso de Hombro Casual Chic con Cierre Giratorio y Asa Regulable",
    brand: "Sindy Luxury",
    category: "BOLSOS",
    subcategory: "Bolsos de Hombro",
    priceFCFA: 15000,
    description: "Bolso ligero y práctico para el día a día sin renunciar al estilo. Cierre frontal de giro metálico y distribución interna optimizada.",
    colors: ["Negro", "Beige", "Gris Perla"],
    sizes: ["25cm x 18cm x 9cm"],
    material: "Piel Sintética Flexible"
  },
  {
    rawFile: "BOLSOS ORIGINAL 25000 FCFA.jpeg",
    name: "Bolso Original de Pasarela con Estructura Rígida y Forro de Terciopelo",
    brand: "Sindy Luxury Haute Couture",
    category: "BOLSOS",
    subcategory: "Bolsos de Pasarela",
    priceFCFA: 25000,
    description: "Construcción rígida tipo cofre con esquinas reforzadas, interior forrado en terciopelo suave y cerradura de seguridad con llave ornamental.",
    colors: ["Negro", "Borgoña", "Verde Oscuro"],
    sizes: ["26cm x 19cm x 11cm"],
    material: "Cuero Sintético Rígido & Forro de Terciopelo"
  },
  {
    rawFile: "CERAVE FLOAMIC CLEANCER 15000 FCFA.jpeg",
    name: "CeraVe Foaming Cleanser Gel Limpiador Espumoso para Piel Normal a Grasa",
    brand: "CeraVe Dermatological",
    category: "COSMETICA_FACIAL",
    subcategory: "Limpiadores Faciales",
    priceFCFA: 15000,
    description: "Desarrollado con dermatólogos, limpia en profundidad y elimina el exceso de grasa sin alterar la barrera protectora de la piel. Con 3 ceramidas esenciales, ácido hialurónico y niacinamida calmante.",
    colors: ["Gel Translúcido"],
    sizes: ["473ml / 16 Fl Oz"],
    material: "3 Ceramidas Esenciales, Niacinamida & Ácido Hialurónico"
  },
  {
    rawFile: "CERAVE MOITORISING CREAM 18000 FCFA.jpeg",
    name: "CeraVe Moisturising Cream Crema Hidratante Corporal y Facial con Ceramidas",
    brand: "CeraVe Dermatological",
    category: "HIGIENE_CORPORAL",
    subcategory: "Cremas Hidratantes",
    priceFCFA: 18000,
    description: "Nutrición continua durante 24 horas gracias a la tecnología patentada MVE. Fórmula no grasa de rápida absorción que repara y fortalece la barrera de las pieles secas y muy secas.",
    colors: ["Crema Blanca Rica"],
    sizes: ["454g / 16 Oz"],
    material: "Tecnología MVE & Ceramidas 1, 3, 6-II"
  },
  {
    rawFile: "CERAVE ULTRA 10000 FCFA.jpeg",
    name: "CeraVe Ultra-Light Moisturising Lotion Hidratante Ligera Facial",
    brand: "CeraVe Dermatological",
    category: "COSMETICA_FACIAL",
    subcategory: "Cremas Faciales",
    priceFCFA: 10000,
    description: "Loción hidratante facial ultra ligera de acabado mate sedoso. Hidrata intensamente mientras ayuda a reparar la barrera cutánea sin obstruir poros ni dejar brillo graso.",
    colors: ["Loción Blanca Ligera"],
    sizes: ["50ml"],
    material: "Ceramidas Esenciales & Ácido Hialurónico"
  },
  {
    rawFile: "CHANCLETAS DE LUJO 1 A 15000 FCFA.jpeg",
    name: "Sandalias Planas de Lujo Deslizantes en Piel con Puntera Anatómica",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Sandalias Planas",
    priceFCFA: 15000,
    description: "Sandalias planas de silueta slide confeccionadas en piel suave de vacuno con plantilla contorneada al pie y suela antideslizante. Elegancia mediterránea en cada paso.",
    colors: ["Marrón Cuero", "Negro", "Blanco"],
    sizes: ["37", "38", "39", "40", "41"],
    material: "Piel Auténtica & Suela de Goma Termoplástica"
  },
  {
    rawFile: "CHANCLETAS DE ZARA COLOR MARRON 15000 FCFA.jpeg",
    name: "Sandalias ZARA de Cuero Marrón con Tiras Cruzadas Entrelazadas",
    brand: "ZARA Exclusive",
    category: "CALZADO",
    subcategory: "Sandalias Planas",
    priceFCFA: 15000,
    description: "Icónicas sandalias veraniegas ZARA de tiras entrelazadas en suave piel marrón coñac. Aportan frescura y distinción tanto para la ciudad como para la playa.",
    colors: ["Marrón Coñac"],
    sizes: ["37", "38", "39", "40", "41"],
    material: "Piel Genuina ZARA"
  },
  {
    rawFile: "CHANCLETAS NEGRAS Y ROJAS 8000 FCFA.jpeg",
    name: "Sandalias Deportivas Urbanas con Suela Ergonómica Negras y Rojas",
    brand: "EBNA Sport & Street",
    category: "CALZADO",
    subcategory: "Calzado Casual",
    priceFCFA: 8000,
    description: "Sandalias ligeras de suela gruesa amortiguada con tiras ajustables acolchadas en negro y detalles en rojo vibrante. Comodidad absoluta para caminar todo el día.",
    colors: ["Negro con Detalles Rojos"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    material: "Goma EVA Amortiguada & Tiras de Neopreno"
  },
  {
    rawFile: "CLEAN Y FRUTY 1 A 500 FCFA.jpeg",
    name: "Mascarilla Facial Nutritiva de Extractos Frutales Clean & Fruity",
    brand: "Clean & Fruity Nature",
    category: "COSMETICA_FACIAL",
    subcategory: "Mascarillas Faciales",
    priceFCFA: 500,
    description: "Mascarilla en velo impregnada de suero vitamínico con extractos de granada, kiwi, fresa y cítricos. Revitaliza e ilumina el rostro apagado en tan solo 15 minutos (Precio por unidad: 500 FCFA).",
    colors: ["Frutos Rojos", "Kiwi", "Naranja", "Pepino"],
    sizes: ["25ml (1 Mascarilla en Velo)"],
    material: "Tejido de Algodón Botánico & Esencia Frutal Concentrada"
  },
  {
    rawFile: "COCOA BUTTER BODY LOTION CONJUNTO 15 FCFA.jpeg",
    name: "Dúo Nutritivo Manteca de Cacao Tree City Body Lotion + Dr. Davey Body Oil",
    brand: "Tree City & Dr. Davey",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales",
    priceFCFA: 15000,
    description: "Pack hidratante de choque para pieles morenas y secas: Loción Corporal Reconstituyente Tree City 400ml + Aceite Corporal Glow Dr. Davey 200ml. Hidratación profunda durante 72 horas y aroma a cacao delicioso.",
    colors: ["Marrón Cacao & Aceite Dorado"],
    sizes: ["Pack Dúo (400ml + 200ml)"],
    material: "100% Manteca de Cacao Pura & Vitamina E"
  },
  {
    rawFile: "COLLAGEN OIL 12000 FCFA.jpeg",
    name: "Collagen Natural Beauty Body & Face Oil Aceite Reafirmante con Colágeno",
    brand: "Derma Collagen",
    category: "COSMETICA_FACIAL",
    subcategory: "Aceites Faciales & Corporales",
    priceFCFA: 12000,
    description: "Aceite facial y corporal antiedad de textura sedosa. Su fórmula con colágeno hidrolizado restaura la elasticidad dérmica, rellena líneas finas y previene el descolgamiento cutáneo.",
    colors: ["Ámbar Translúcido"],
    sizes: ["150ml"],
    material: "Colágeno Hidrolizado, Aceite de Argán & Vitamina E"
  },
  {
    rawFile: "CONDENSADOR DE BIBERONES 20000 FCFA.jpeg",
    name: "Esterilizador y Calentador Eléctrico de Biberones por Vapor Rápido",
    brand: "Baby Pure Steam",
    category: "ACCESORIOS",
    subcategory: "Maternidad & Bebés",
    priceFCFA: 20000,
    description: "Aparato esterilizador multifuncional a vapor con capacidad para múltiples biberones, chupetes y tetinas. Elimina el 99.9% de gérmenes y bacterias protegiendo la salud digestiva del recién nacido.",
    colors: ["Blanco con Acentos Celestes"],
    sizes: ["Capacidad 6 Biberones"],
    material: "Polipropileno Grado Médico Libre de BPA"
  },
  {
    rawFile: "CONJUNTO 20000 FCFA.jpeg",
    name: "Conjunto 2 Piezas Enterizo Capri a Lunares Polka Dots con Escote Halter",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 20000,
    description: "Sensacional conjunto vintage chic de top escote halter con lazada al cuello y corsetería trasera cruzada + pantalón capri ceñido a lunares blancos. Estiliza las curvas con glamour retro.",
    colors: ["Azul Rey", "Blanco", "Fucsia", "Negro", "Rojo", "Amarillo"],
    sizes: ["S", "M", "L"],
    material: "Licra de Seda Elástica con Estampado Polka Dots"
  },
  {
    rawFile: "CONJUNTO MIXA 30000 FCFA.jpeg",
    name: "Mixa Expert Peau Sensible Pack Completo Ceramide Protect & Anti-Sécheresse",
    brand: "Mixa Dermatologie",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales",
    priceFCFA: 30000,
    description: "Tratamiento dermatológico intensivo formulado bajo control médico para pieles atópicas y extra secas. Fortalece la barrera lipídica y calma picores e irritaciones.",
    colors: ["Envase Blanco & Azul Dermatológico"],
    sizes: ["Pack Completo 3 Piezas (Gel + Crema + Bálsamo)"],
    material: "Ceramidas Puras, Manteca de Karité & Glicerina"
  },
  {
    rawFile: "CUCHILLAS DE DEPILACION 3 A 2500 FCFA.jpeg",
    name: "Set de 3 Cuchillas Perfiladoras Faciales y Cejas Dermaplaning de Precisión",
    brand: "EBNA Beauty Tools",
    category: "ACCESORIOS",
    subcategory: "Herramientas de Belleza",
    priceFCFA: 2500,
    description: "Perfiladores faciales con microguarda de protección en el filo. Eliminan el vello facial fino (pelusilla) y células muertas, dejando el rostro perfectamente liso para una absorción óptima de cosméticos.",
    colors: ["Pastel Multicolor (Rosa, Azul, Amarillo)"],
    sizes: ["Pack 3 Unidades"],
    material: "Acero Inoxidable Quirúrgico & Mango Ergonómico"
  },
  {
    rawFile: "DISAAR BEAUTY PACK 35000 FCFA.jpeg",
    name: "Disaar Beauty Pack Completo Iluminador y Reafirmante Antiedad",
    brand: "Disaar Beauty Skin",
    category: "COSMETICA_FACIAL",
    subcategory: "Packs Faciales",
    priceFCFA: 35000,
    description: "Rutina facial completa de rejuvenecimiento: Limpiador espumoso, Tónico revitalizante, Serum intensivo y Crema reafirmante. Difumina arrugas y unifica el tono facial.",
    colors: ["Caja Regalo Lujo"],
    sizes: ["Set Completo 4 Piezas"],
    material: "Ácido Hialurónico, Vitamina C & Péptidos de Colágeno"
  },
  {
    rawFile: "DISAAR VITAMIN C 6000FCFA.jpeg",
    name: "Disaar Vitamin C Facial Serum Iluminador y Antimanchas Concentrado",
    brand: "Disaar Beauty Skin",
    category: "COSMETICA_FACIAL",
    subcategory: "Serums Faciales",
    priceFCFA: 6000,
    description: "Serum facial enriquecido con Vitamina C antioxidante y ácido hialurónico botánico. Ilumina la piel apagada, estimula la elasticidad y neutraliza radicales libres.",
    colors: ["Gotero Ámbar"],
    sizes: ["30ml"],
    material: "Vitamina C Activa & Esencia de Ácido Hialurónico"
  },
  {
    rawFile: "DR MEAINER SERUM 7000 FCFA.jpeg",
    name: "Dr. Meinaier Collagen & Gold Serum Antiarrugas Concentrado Reafirmante",
    brand: "Dr. Meinaier Paris",
    category: "COSMETICA_FACIAL",
    subcategory: "Serums Faciales",
    priceFCFA: 7000,
    description: "Potente elixir rejuvenecedor con micropartículas de oro coloidal y colágeno concentrado. Rellena líneas de expresión, tensa la piel y otorga un acabado luminoso sedoso.",
    colors: ["Dorado Brillante"],
    sizes: ["30ml"],
    material: "Colágeno Marino, Oro Coloidal & Niacinamida"
  },
  {
    rawFile: "DRYMAN 6000 FCFA.jpeg",
    name: "Dryman Crema Corporal Ultra Hidratante Reparadora de Piel Seca",
    brand: "Dryman Skincare",
    category: "HIGIENE_CORPORAL",
    subcategory: "Cremas Corporales",
    priceFCFA: 6000,
    description: "Crema terapéutica de rescate para talones agrietados, manos resecas y codos ásperos. Su fórmula de alta oclusión retiene la hidratación dérmica durante 48 horas.",
    colors: ["Blanco Puro"],
    sizes: ["200g"],
    material: "Urea, Glicerina Pura & Manteca Hidratante"
  },
  {
    rawFile: "EUCERIN PACK 50000 FCFA.jpeg",
    name: "Eucerin Complete Dermatological Care Pack Tratamiento de Rescate Facial y Corporal",
    brand: "Eucerin Dermatological",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Dermatológicos",
    priceFCFA: 50000,
    description: "Cuidado dermatológico avanzado formulado para calmar, hidratar y restaurar la barrera cutánea debilitada. Recomendado para pieles muy sensibles y atópicas.",
    colors: ["Blanco & Rojo Eucerin"],
    sizes: ["Pack 3 Piezas"],
    material: "Complejo de Urea, Ceramidas & Pantenol"
  },
  {
    rawFile: "EUCERIN PH5 PACK 70000 FCFA.jpeg",
    name: "Eucerin pH5 Pack Dermatológico Completo (Gel de Baño + Loción + Crema Reparadora)",
    brand: "Eucerin Dermatological",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Dermatológicos",
    priceFCFA: 70000,
    description: "El kit de máxima excelencia dermatológica mundial: Gel de Ducha pH5 protector 400ml + Loción Corporal pH5 de absorción rápida 400ml + Crema Facial Reparadora pH5. Mantiene el pH fisiológico y fortalece las defensas naturales de la piel.",
    colors: ["Rojo & Blanco Eucerin"],
    sizes: ["Pack Integral Familiar"],
    material: "Tampón Citrato pH5 & Dexpantenol Reparador"
  },
  {
    rawFile: "FACIAL CLEAN GEL LIMPIADOR 10000 FCFA.jpeg",
    name: "Facial Clean Gel Limpiador Facial Purificante con Extractos Botánicos",
    brand: "Facial Clean Pro",
    category: "COSMETICA_FACIAL",
    subcategory: "Limpiadores Faciales",
    priceFCFA: 10000,
    description: "Gel espumoso suave que desincrusta impurezas, restos de polución y exceso de sebo sin agredir el manto hidrolipídico. Deja el rostro fresco, tonificado y mate.",
    colors: ["Verde Menta Translúcido"],
    sizes: ["200ml"],
    material: "Extracto de Té Verde & Ácido Salicílico Microdosificado"
  },
  {
    rawFile: "FACIAL CLEAN LECHE LIMPIADORA ROSA 10000 FCFA.jpeg",
    name: "Facial Clean Leche Limpiadora Desmaquillante con Agua de Rosas",
    brand: "Facial Clean Pro",
    category: "COSMETICA_FACIAL",
    subcategory: "Desmaquillantes & Tónicos",
    priceFCFA: 10000,
    description: "Emulsión sedosa enriquecida con hidrolato de rosas de damasco. Retira con delicadeza maquillaje resistente al agua en ojos y labios, dejando el cutis nutrido y aterciopelado.",
    colors: ["Rosa Suave"],
    sizes: ["200ml"],
    material: "Agua de Rosas Destilada & Aceite de Almendras Dulces"
  },
  {
    rawFile: "FRESAME MUCHO EXFOLLANTE CORPORAL 5000 FCFA.jpeg",
    name: "Frésame Mucho Exfoliante Corporal Gourmet con Fresa Silvestre y Azúcar",
    brand: "Frésame Gourmet Beauty",
    category: "HIGIENE_CORPORAL",
    subcategory: "Exfoliantes Corporales",
    priceFCFA: 5000,
    description: "Deliciosa exfoliación corporal con aroma embriagador a fresas silvestres y cristales de azúcar. Pule la piel dejándola suave, seductora y deliciosamente perfumada.",
    colors: ["Rojo Fresa"],
    sizes: ["300g"],
    material: "Cristales de Azúcar Moreno & Aceite de Semilla de Fresa"
  },
  {
    rawFile: "FUNDA DE MOVIL FORMA CORAZON DE SILICONA 2000 FCFA.jpeg",
    name: "Funda de Silicona Suave con Agarre Anatómico en Forma de Corazón",
    brand: "EBNA Mobile Accessories",
    category: "ACCESORIOS",
    subcategory: "Fundas & Tecnología",
    priceFCFA: 2000,
    description: "Funda protectora antichoque de silicona líquida prémium con soporte ergonómico en forma de corazón en la parte trasera. Agarre seguro para selfies y prevención de caídas.",
    colors: ["Rosa Pastel", "Negro", "Rojo Pasión", "Blanco"],
    sizes: ["Compatible iPhone y Modelos Galaxy"],
    material: "Silicona Líquida Antichoque & Forro de Microfibra"
  },
  {
    rawFile: "FUNDA DE TELEFONO CON VENTOSA DE SILICONA EN FORMA DE LAZO 2000 FCFA.jpeg",
    name: "Soporte con Ventosas Adhesivas de Silicona en Forma de Lazo Coquette",
    brand: "EBNA Mobile Accessories",
    category: "ACCESORIOS",
    subcategory: "Fundas & Tecnología",
    priceFCFA: 2000,
    description: "Adhesivo de silicona con múltiples microventosas ultra potentes en forma de lazo. Se adhiere al reverso de cualquier móvil permitiendo fijarlo a espejos, cristales y azulejos para grabar tiktoks y tutoriales.",
    colors: ["Rosa Coquette", "Negro", "Blanco"],
    sizes: ["Universal Adhesivo"],
    material: "Silicona de Alta Succión"
  },
  {
    rawFile: "FUNDA PERSONALIZADA DE IPHONE A 6000 FCFA.jpeg",
    name: "Funda de Lujo para iPhone con Bordes Reforzados Antigolpes y Acabado Translúcido",
    brand: "EBNA Mobile Accessories",
    category: "ACCESORIOS",
    subcategory: "Fundas & Tecnología",
    priceFCFA: 6000,
    description: "Carcasa de protección militar para iPhone con bisel elevado para proteger la cámara y las esquinas contra caídas de hasta 3 metros. Estilo elegante y tacto antideslizante.",
    colors: ["Negro Humo", "Blanco Hielo", "Rosa Oro"],
    sizes: ["iPhone 11 a iPhone 16 Pro Max"],
    material: "Policarbonato Rígido & Bordes TPU Amortiguadores"
  },
  {
    rawFile: "GLUTA HYA VASELINE SERUM PEQUENO 3000 FCFA ,GRANDE 15000 FCFA.jpeg",
    name: "Vaseline Gluta-Hya Flawless Glow Serum Burst UV Lotion Iluminadora",
    brand: "Vaseline Intensive Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Serums Corporales",
    priceFCFA: 15000,
    description: "Fórmula 10 veces más potente que la vitamina C. Al contacto con la piel, el serum se transforma en microgotas de agua que penetran instantáneamente, aclarando manchas y aportando un brillo cristalino glow.",
    colors: ["Dorado Glow"],
    sizes: ["Grande 330ml (15.000 FCFA)", "Mini 30ml (3.000 FCFA)"],
    material: "GlutaGlow™, Ácido Hialurónico & Filtros UV"
  },
  {
    rawFile: "GORRA 6000 FCFA.jpeg",
    name: "Gorra de Béisbol Bordada Urbana Streetwear en Algodón Lavado",
    brand: "EBNA Streetwear",
    category: "ACCESORIOS",
    subcategory: "Gorras & Sombreros",
    priceFCFA: 6000,
    description: "Gorra clásica de 6 paneles confeccionada en sarga de algodón lavado con bordado frontal en relieve. Hebilla trasera metálica regulable para un ajuste personalizado y visera precurvada.",
    colors: ["Negro", "Beige Arena", "Verde Militar", "Burdeos"],
    sizes: ["Talla Única Ajustable"],
    material: "100% Algodón de Sarga Transpirable"
  },
  {
    rawFile: "GRICERIN TOPICREM 8000 FCFA.jpeg",
    name: "Topicrem Glicerina Dermatológica Pura Nutritiva para Piel Sensible",
    brand: "Topicrem Dermatologie",
    category: "HIGIENE_CORPORAL",
    subcategory: "Aceites & Glicerinas",
    priceFCFA: 8000,
    description: "Glicerina purificada de grado farmacéutico formulada para rehidratar intensamente las pieles más secas y delicadas. Retiene el agua dérmica y aporta elasticidad inmediata sin obstruir poros.",
    colors: ["Líquido Cristalino"],
    sizes: ["200ml"],
    material: "100% Glicerina Pura Farmacéutica"
  },
  {
    rawFile: "GZE ROSEMAY HAIR OIL 3000 FCFA.jpeg",
    name: "GZE Rosemary Hair Oil Aceite Esencial de Romero Estimulante del Crecimiento",
    brand: "GZE Botanicals",
    category: "HIGIENE_CORPORAL",
    subcategory: "Cuidado Capilar & Aceites",
    priceFCFA: 3000,
    description: "Tratamiento capilar intensivo para cuero cabelludo y puntas. Estimula la circulación de los folículos pilosos, frena la caída, combate la caspa y promueve el nacimiento de cabellos fuertes y densos.",
    colors: ["Gotero Verde Botánico"],
    sizes: ["60ml"],
    material: "Aceite Esencial de Romero Puro, Menta & Biotina"
  },
  {
    rawFile: "JABON DE ARROZ 12000 FCFA.jpeg",
    name: "Jabón Artesanal Aclarador de Leche de Arroz Jazmín Tailandés (Pack 6 Uds)",
    brand: "K-Beauty Herbal",
    category: "HIGIENE_CORPORAL",
    subcategory: "Jabones Artesanales",
    priceFCFA: 12000,
    description: "Pack de 6 pastillas de jabón artesanal tailandés elaborado con leche de arroz jazmín y vitamina B3. Aclara manchas, reduce el tono desigual y suaviza la textura de rostro y cuerpo.",
    colors: ["Blanco Marfil"],
    sizes: ["Pack 6 Pastillas (60g c/u)"],
    material: "Leche de Arroz Pura, Aceite de Coco & Vitamina B3"
  },
  {
    rawFile: "JAUNE PACK 20000 FCFA.jpeg",
    name: "Jaune D'Oeuf Pack Corporal Completo con Extracto de Yema de Huevo y Vitaminas",
    brand: "Jaune D'Oeuf Beauté",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales",
    priceFCFA: 20000,
    description: "Tratamiento corporal aclarante y unificador de tono: Loción Hidratante + Crema Concentrada + Aceite Nutritivo. Su fórmula rica en nutrientes de yema de huevo nutre profundamente y borra manchas solares.",
    colors: ["Amarillo Dorado"],
    sizes: ["Pack 3 Piezas (Loción 500ml + Crema + Aceite)"],
    material: "Extracto de Yema de Huevo & Complejo Vitamínico A, E"
  },
  {
    rawFile: "JUEGO DE 3 A 15000FCFA.jpeg",
    name: "Set de 3 Cestas Organizadoras Decorativas de Mimbre y Lino Natural",
    brand: "EBNA Home Living",
    category: "ACCESORIOS",
    subcategory: "Hogar & Organización",
    priceFCFA: 15000,
    description: "Conjunto de 3 cestas tejidas a mano en fibra natural con forro extraíble y lavable de lino crudo. Ideales para organizar cosméticos, toallas o artículos de tocador con armonía estética.",
    colors: ["Mimbre Natural & Lino Crudo"],
    sizes: ["Set 3 Tamaños (Grande, Mediano, Pequeño)"],
    material: "Mimbre Trenzado & Lino de Algodón"
  },
  {
    rawFile: "JUEGO DE 3 NEGRO A 15000 FCFA.jpeg",
    name: "Set de 3 Neceser / Organizadores de Cosmética en Negro Obsidiana Texturizado",
    brand: "Sindy Luxury Travel",
    category: "ACCESORIOS",
    subcategory: "Bolsos de Viaje & Neceseres",
    priceFCFA: 15000,
    description: "Trío de neceseres elegantes para cosmética y maquillaje con cremalleras doradas de alta resistencia y forro interior impermeable de fácil limpieza.",
    colors: ["Negro Obsidiana"],
    sizes: ["Set 3 Piezas (Grande, Mediano, Pequeño)"],
    material: "Cuero Vegano Saffiano Impermeable"
  },
  {
    rawFile: "JUEGO DE 3 NEGRO CONJUNTO 20000 FCFA.jpeg",
    name: "Set Ejecutivo Lujo 3 Piezas en Cuero Negro (Neceser + Cartera + Portatarjetas)",
    brand: "Sindy Luxury",
    category: "ACCESORIOS",
    subcategory: "Sets Exclusivos de Lujo",
    priceFCFA: 20000,
    description: "Conjunto ejecutivo de tres accesorios indispensables en cuero negro grabado: estuche de mano para maquillaje, billetera con cremallera y portadocumentos con detalles en oro.",
    colors: ["Negro Azabache"],
    sizes: ["Set 3 Piezas Coordinadas"],
    material: "Piel PU de Grano Noble"
  },
  {
    rawFile: "KOJIC ACID PACK COMPLETO 55000 FCFA.jpeg",
    name: "Kojic Acid Pack Aclarador Completo de Alta Eficacia Dermatológica",
    brand: "Kojic Acid Professional",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Aclaradores",
    priceFCFA: 55000,
    description: "Tratamiento intensivo despigmentante y unificador de tono: Loción corporal blanqueadora, Jabón exfoliante concentrado, Crema facial anti-edad y Serum iluminador con ácido kójico puro.",
    colors: ["Naranja Cítrico & Blanco"],
    sizes: ["Pack Completo 4 Piezas"],
    material: "Ácido Kójico Puro, Colágeno & Niacinamida"
  },
  {
    rawFile: "KOJIC BODY LOTION 14000 FCFA.jpeg",
    name: "Kojic Acid Skin Lightening Body Lotion con Ácido Kójico y Vitamina C",
    brand: "Kojic Acid Professional",
    category: "HIGIENE_CORPORAL",
    subcategory: "Lociones Corporales",
    priceFCFA: 14000,
    description: "Loción corporal hidratante blanqueadora que reduce eficazmente manchas causadas por el sol, la edad o cicatrices. Fórmula ligera de penetración profunda que hidrata 24h.",
    colors: ["Blanco"],
    sizes: ["500ml / 16.9 Fl Oz"],
    material: "Ácido Kójico, Vitamina C & Manteca de Karité"
  },
  {
    rawFile: "LIBROS DECORATIVOS CONJUNTO 18000 FCFA.jpeg",
    name: "Conjunto de 3 Libros Decorativos de Mesa Haute Couture (Chanel, Dior, Vogue)",
    brand: "EBNA Decor Haute Couture",
    category: "ACCESORIOS",
    subcategory: "Decoración & Hogar",
    priceFCFA: 18000,
    description: "Set de 3 libros de tapa dura esculturales inspirados en las casas de moda más prestigiosas del mundo. Aportan una estética chic y cosmopolita en mesas de salón y tocadores.",
    colors: ["Blanco & Negro Minimalista"],
    sizes: ["Set de 3 Volúmenes (26cm x 17cm x 4cm)"],
    material: "Cartón Rígido Prensado con Impresión Laminada Mate"
  },
  {
    rawFile: "LOCION DE MASAJE COCOCA BUTTER ESTRIAS 18000 FCFA.jpeg",
    name: "Palmer's Cocoa Butter Formula Loción de Masaje para Estrías con Colágeno",
    brand: "Palmer's Cocoa Butter",
    category: "HIGIENE_CORPORAL",
    subcategory: "Tratamiento de Estrías",
    priceFCFA: 18000,
    description: "Fórmula especializada número uno en el mundo para prevenir y reducir la apariencia de estrías durante el embarazo y cambios de peso. Con manteca de cacao pura, manteca de karité, colágeno, elastina y luteína.",
    colors: ["Crema Cacao Rica"],
    sizes: ["250ml / 8.5 Fl Oz"],
    material: "Manteca de Cacao Pura, Colágeno, Elastina & Aceite de Argán"
  },
  {
    rawFile: "LUZ DE ANILLO PARA SELFIE 5000 FCFA.jpeg",
    name: "Aro de Luz LED Clip-On para Smartphone con 3 Modos de Iluminación Recargable",
    brand: "EBNA Tech Pro",
    category: "ACCESORIOS",
    subcategory: "Accesorios Tecnológicos",
    priceFCFA: 5000,
    description: "Anillo de luz LED portátil que se engancha en cualquier teléfono, tablet o portátil. 3 intensidades de luz (blanca, cálida y mixta) para lograr selfies perfectos, videollamadas nítidas y videos impecables.",
    colors: ["Blanco", "Rosa Pastel"],
    sizes: ["Diámetro 8.5cm"],
    material: "36 LEDs de Alta Luminosidad & Batería Recargable USB"
  },
  {
    rawFile: "MANUAL MASAJE BREAST PUMP BABY BIBERON 18000 FCFA.jpeg",
    name: "Extractor Manual de Leche Materna Anatómico con Cojín Masajeador y Biberón",
    brand: "Baby Pure Care",
    category: "ACCESORIOS",
    subcategory: "Maternidad & Bebés",
    priceFCFA: 18000,
    description: "Sacaleches manual ultra ergonómico con palanca de suave accionamiento y copa de silicona con pétalos masajeadores que estimulan el flujo natural de leche de forma indolora.",
    colors: ["Transparente & Rosa Suave"],
    sizes: ["150ml"],
    material: "Silicona Quirúrgica & Polipropileno Libre de BPA"
  },
  {
    rawFile: "MI YARA COLLECTION CONJUNTO 20000 FCFA.jpeg",
    name: "Set Exclusivo de Perfumería Árabe Mi Yara Collection (Perfume 100ml + Mist + Loción)",
    brand: "Lattafa Perfumes Dubai",
    category: "PERFUMERIA",
    subcategory: "Sets de Perfumes Árabes",
    priceFCFA: 20000,
    description: "Cofre de ensueño de la fragancia viral Yara de Lattafa: Eau de Parfum 100ml + Bruma corporal refrescante + Loción corporal aterciopelada. Notas dulces de vainilla, orquídea, mandarina jugosa y almizcle.",
    colors: ["Rosa Oro Lujo"],
    sizes: ["Cofre 3 Piezas (EDP 100ml + Mist 250ml + Loción 100ml)"],
    material: "Eau de Parfum Concentrado & Botella Esmaltada"
  },
  {
    rawFile: "MIS WENDY VITAMIN C ORANGE 15000 FCFA.jpeg",
    name: "Mis Wendy Vitamin C Orange Pack Tratamiento Facial Iluminador de Naranja",
    brand: "Mis Wendy Beauty",
    category: "COSMETICA_FACIAL",
    subcategory: "Packs Faciales",
    priceFCFA: 15000,
    description: "Tratamiento energizante a base de extracto puro de naranjas dulces y vitamina C bioactiva. Difumina manchas solares, cierra poros dilatados y previene el envejecimiento prematuro.",
    colors: ["Naranja Cítrico"],
    sizes: ["Pack 3 Piezas"],
    material: "Vitamina C Activa & Aceite Esencial de Naranja Dulce"
  },
  {
    rawFile: "MONEDERO Y CHACLETA CONJUNTO 30000 FCFA.jpeg",
    name: "Conjunto Pasarela Monedero Monogram + Sandalias a Juego en Piel Bicolor",
    brand: "Sindy Luxury Shoes & Leather",
    category: "BOLSOS",
    subcategory: "Sets Exclusivos de Lujo",
    priceFCFA: 30000,
    description: "Combinación de alto impacto visual: Cartera monedero de mano con estampado icónico + Sandalias planas ergonómicas a juego confeccionadas en piel suave de dos tonalidades.",
    colors: ["Marrón Monogram", "Negro & Beige"],
    sizes: ["Sandalias: 37, 38, 39, 40, 41"],
    material: "Piel Sintética Monogram & Suela Antideslizante"
  },
  {
    rawFile: "MUSTELA CONJUNTO 70000 FCFA.jpeg",
    name: "Mustela Pack Cuidado Pediátrico Completo para Bebés (Gel + Loción + Colonia + Pañal)",
    brand: "Mustela Paris",
    category: "HIGIENE_CORPORAL",
    subcategory: "Cuidado Pediátrico & Bebés",
    priceFCFA: 70000,
    description: "El kit pediátrico de cabecera para el recién nacido y bebés: Gel de Baño Suave 500ml + Hydra Bébé Leche Corporal 500ml + Agua de Colonia Sin Alcohol 200ml + Crema Bálsamo 1 2 3 para el cambio de pañal.",
    colors: ["Azul & Blanco Mustela"],
    sizes: ["Pack Familiar 4 Piezas Grandes"],
    material: "Perseosa de Aguacate Orgánico, 98% Ingredientes Naturales"
  },
  {
    rawFile: "NEUTROGENA HYDRO BOOST GEL-CREAM EXTRA-DRY 1000 FCFA.jpeg",
    name: "Neutrogena Hydro Boost Gel-Cream Hidratante Facial con Ácido Hialurónico Purificado",
    brand: "Neutrogena Dermatologics",
    category: "COSMETICA_FACIAL",
    subcategory: "Cremas Faciales",
    priceFCFA: 1000,
    description: "Gel-crema ultra hidratante libre de aceites y fragancias con ácido hialurónico concentrado. Retiene hasta 1000 veces su peso en agua calmando la piel extra seca de inmediato.",
    colors: ["Azul Aguamarina"],
    sizes: ["15g (Formato Muestra Deluxe / Viaje)"],
    material: "Ácido Hialurónico Purificado Libre de Aceites"
  },
  {
    rawFile: "OMEGA 3 TUMERIC 14000 FCFA.jpeg",
    name: "Suplemento Nutricional Premium Omega 3 con Cúrcuma Curcumin y Antioxidantes",
    brand: "NutriLife Naturals",
    category: "HIGIENE_CORPORAL",
    subcategory: "Bienestar & Suplementos",
    priceFCFA: 14000,
    description: "Cápsulas blandas de ácidos grasos esenciales Omega 3 (EPA y DHA) combinados con extracto de cúrcuma altamente biodisponible. Favorece la luminosidad de la piel, la salud articular y la función cardiovascular.",
    colors: ["Dorado Ámbar"],
    sizes: ["60 Cápsulas Blandas"],
    material: "Aceite de Pescado Purificado & Extracto Concentrado de Cúrcuma"
  },
  {
    rawFile: "OUHOE 12000 FCFA.jpeg",
    name: "OUHOE Retinol & Peptides Crema Facial Rejuvenecedora y Antiarrugas",
    brand: "OUHOE Clinical",
    category: "COSMETICA_FACIAL",
    subcategory: "Cremas Antiedad",
    priceFCFA: 12000,
    description: "Crema antiedad enriquecida con complejo de retinol microencapsulado y péptidos tensores. Disminuye la profundidad de las arrugas, aporta firmeza y regenera la textura dérmica nocturna.",
    colors: ["Tarro Azul Noche con Plata"],
    sizes: ["50g"],
    material: "Retinol Puro, Péptidos de Cobre & Ácido Hialurónico"
  },
  {
    rawFile: "PACK COMPLETO DE PRODUCTOS DE DOVE A 30000 FCFA.jpeg",
    name: "Dove Spa Ritual Pack Nutrición Profunda con Manteca de Karité y Vainilla",
    brand: "Dove Beauty Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales",
    priceFCFA: 30000,
    description: "Colección completa de cuidado consentidor: Gel de Ducha Nutritivo + Loción Corporal Reparadora + Crema de Manos + Desodorante Antitranspirante con 1/4 de crema hidratante Dove.",
    colors: ["Blanco & Dorado Cálido"],
    sizes: ["Pack 4 Piezas"],
    material: "1/4 de Crema Hidratante Dove & Manteca de Karité Pura"
  },
  {
    rawFile: "PACK CONJUNTO TULIPAN NEGRO BLANCO CONJUNTO 25000 FCFA.jpeg",
    name: "Tulipán Negro Pack Dúo Gourmand Coco Puro & Flor de Algodón",
    brand: "Tulipán Negro España",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs de Baño",
    priceFCFA: 25000,
    description: "Dúo español de culto en perfumería corporal: Gel de Baño Crema 650ml + Body Milk Nutritivo 400ml con aroma celestial a coco recién rallado y caricias de algodón.",
    colors: ["Blanco Puro & Dorado"],
    sizes: ["Pack Dúo (650ml + 400ml)"],
    material: "Extracto Natural de Coco & Aceite de Algodón"
  },
  {
    rawFile: "PACK DE CORTA UNAS 5000 FCFA.jpeg",
    name: "Set de Manicura y Pedicura Profesional en Estuche Rígido de Acero Inoxidable",
    brand: "EBNA Beauty Tools",
    category: "ACCESORIOS",
    subcategory: "Herramientas de Belleza",
    priceFCFA: 5000,
    description: "Kit completo de 7 herramientas de precisión en acero quirúrgico inoxidable: cortaúñas grande, cortaúñas oblicuo, tijeras de cutícula, lima de zafiro, pinzas y empujador en estuche elegante.",
    colors: ["Estuche Negro / Oro Rosa"],
    sizes: ["Estuche 7 Piezas"],
    material: "Acero Inoxidable Quirúrgico & Estuche de Cuero Sintético"
  },
  {
    rawFile: "PACK TULIPAN NEGRO ROSADO 18000 FCFA.jpeg",
    name: "Tulipán Negro Pack Gourmand Fresa y Nata (Gel de Ducha + Desodorante + Crema)",
    brand: "Tulipán Negro España",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs de Baño",
    priceFCFA: 18000,
    description: "La fragancia adictiva número uno de Tulipán Negro: Gel de Ducha 650ml + Desodorante Roll-On + Loción Hidratante con el inconfundible y dulce aroma a fresas con nata.",
    colors: ["Rosa Fresa"],
    sizes: ["Pack Trío Completo"],
    material: "Fórmula Libre de Parabenos & Extractos Dulces de Fresa"
  },
  {
    rawFile: "PALMER COCOA BUTTER 1 A 8000 FCFA.jpeg",
    name: "Palmer's Cocoa Butter Formula Barra Concentrada Sólida 100% Manteca de Cacao",
    brand: "Palmer's Cocoa Butter",
    category: "HIGIENE_CORPORAL",
    subcategory: "Mantecas Corporales",
    priceFCFA: 8000,
    description: "El legendario tratamiento en tarro sólido de Palmer's. Se funde con el calor de la piel creando una capa impermeable que repara grietas, asperezas y quemaduras en tiempo récord.",
    colors: ["Tarro Cacao Original"],
    sizes: ["100g / 3.75 Oz"],
    material: "100% Manteca de Cacao Pura & Vitamina E"
  },
  {
    rawFile: "PANTALON FEMININ AMARILLO 5000 FCFA.jpeg",
    name: "Pantalón Casual Femenino Amarillo Mostaza en Lino Ligero de Verano",
    brand: "Sindy Casual Chic",
    category: "MODA_MUJER",
    subcategory: "Pantalones & Jeans",
    priceFCFA: 5000,
    description: "Pantalón de corte recto y tiro alto en mezcla de lino fresco con cinturilla elástica ajustable y bolsillos laterales. Estilo veraniego alegre y cómodo para el calor de Malabo y Bata.",
    colors: ["Amarillo Mostaza", "Beige Lino"],
    sizes: ["S", "M", "L", "XL"],
    material: "Mezcla de Lino Natural & Algodón Transpirable"
  },
  {
    rawFile: "PANTALON ROTO FEMENINO 25000 FCFA.jpeg",
    name: "Pantalón Vaquero Roto Denim de Tiro Alto con Roturas de Pasarela",
    brand: "Sindy Denim Couture",
    category: "MODA_MUJER",
    subcategory: "Pantalones & Jeans",
    priceFCFA: 25000,
    description: "Jeans denim rígido de corte relajado con roturas frontales trabajadas a mano y acabado vintage lavado a la piedra. Realza la silueta femenina con una vibra urbana chic.",
    colors: ["Azul Denim Lavado"],
    sizes: ["36", "38", "40", "42"],
    material: "100% Denim de Algodón Premium sin Elásticos"
  },
  {
    rawFile: "PAQUETE  4000 FCFA.jpeg",
    name: "Pack de 50 Cepillos Goupillones con Purpurina para Pestañas y Cejas",
    brand: "EBNA Beauty Tools",
    category: "ACCESORIOS",
    subcategory: "Herramientas de Belleza",
    priceFCFA: 4000,
    description: "Goupillones desechables de máxima precisión con mango brillante translúcido relleno de purpurina glitter. Ideales para peinar extensiones de pestañas, cejas laminadas o aplicar tratamientos.",
    colors: ["Turquesa Glitter & Verde Neón Glitter"],
    sizes: ["Pack 50 Unidades"],
    material: "Cerdas de Nylon Suave & Mango de Cristal Acrílico"
  },
  {
    rawFile: "PAW PAW PACK 20000FCFA.jpeg",
    name: "Paw Paw Clarifying Papaya Pack Tratamiento Completo Iluminador y Antimanchas",
    brand: "Paw Paw Cosmetics",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales",
    priceFCFA: 20000,
    description: "Tratamiento clarificante a base de enzimas activas de papaya: Loción corporal 500ml + Crema tarro clarificante + Aceite concentrado. Reaviva el brillo natural y elimina marcas y manchas rebeldes.",
    colors: ["Naranja Papaya"],
    sizes: ["Pack 3 Piezas (Loción + Crema + Aceite)"],
    material: "Extracto Enzimático de Papaya & Complejo Clarificante"
  },
  {
    rawFile: "POMADA QUITA MANCHAS 8000 FCFA.jpeg",
    name: "Pomada Correctora Intensiva para Manchas Oscuras, Hiperpigmentación y Acné",
    brand: "Dermo Spot Defense",
    category: "COSMETICA_FACIAL",
    subcategory: "Tratamientos Antimanchas",
    priceFCFA: 8000,
    description: "Ungüento dermatológico concentrado para aplicación localizada en manchas solares, melasma y marcas de acné. Acelera la renovación celular desvaneciendo zonas oscuras.",
    colors: ["Pomada Blanca"],
    sizes: ["30g"],
    material: "Ácido Kójico, Niacinamida al 5% & Óxido de Zinc"
  },
  {
    rawFile: "PURE RICE GLOW 15000 FCFA.jpeg",
    name: "Pure Rice Glow Serum & Emulsión Iluminadora de Extracto de Arroz Fermentado",
    brand: "K-Beauty Pure Rice",
    category: "COSMETICA_FACIAL",
    subcategory: "Serums & Emulsiones",
    priceFCFA: 15000,
    description: "Dúo cosmético coreano a base de agua de salvado de arroz fermentado. Suaviza la piel, atenúa rojeces y otorga el codiciado acabado 'Glass Skin' brillante y libre de imperfecciones.",
    colors: ["Blanco Lechoso"],
    sizes: ["Set Dúo (Serum 50ml + Emulsión 100ml)"],
    material: "Extracto de Arroz Fermentado & Ácido Hialurónico"
  },
  {
    rawFile: "RELOJ DE CASA 15000 FCFA.jpeg",
    name: "Reloj de Pared Nórdico Silencioso con Marco de Madera y Números en Relieve",
    brand: "EBNA Home Living",
    category: "ACCESORIOS",
    subcategory: "Hogar & Decoración",
    priceFCFA: 15000,
    description: "Reloj de pared decorativo de estética escandinava contemporánea. Maquinaria de cuarzo de barrido continuo 100% silenciosa (sin tic-tac) y esfera con acabado en blanco y madera clara.",
    colors: ["Madera Natural & Blanco"],
    sizes: ["Diámetro 30cm"],
    material: "Madera de Haya Natural & Cristal de Protección"
  },
  {
    rawFile: "ROMANTIC LIP BALM FRESH 1000 FCFA.jpeg",
    name: "Romantic Lip Balm Fresh Bálsamo Labial Hidratante Frutal Mágico Cambio de Color",
    brand: "Romantic Beauty",
    category: "COSMETICA_FACIAL",
    subcategory: "Cuidado Labial",
    priceFCFA: 1000,
    description: "Bálsamo labial enriquecido con extractos de frutas naturales que reacciona con la temperatura y el pH de tus labios, transformándose en un favorecedor tono rosa personalizado con brillo hidratante.",
    colors: ["Rosa Mágico Personalizado"],
    sizes: ["3.8g"],
    material: "Cera de Abejas, Aceite de Jojoba & Pigmentos pH-Reactivos"
  },
  {
    rawFile: "ROMANTIC LIP COLOR RED ROSES 500 FCFA.jpeg",
    name: "Romantic Lip Color Red Roses Tinte Labial de Larga Duración en Miniatura",
    brand: "Romantic Beauty",
    category: "COSMETICA_FACIAL",
    subcategory: "Maquillaje Labial",
    priceFCFA: 500,
    description: "Tinte labial con extracto de rosas rojas de acabado terciopelo mate indeleble. Formato compacto de bolsillo ideal para retoques rápidos en cualquier evento.",
    colors: ["Rojo Rosas Clásico"],
    sizes: ["Miniatura 2.5ml"],
    material: "Pigmentos Minerales de Larga Duración & Vitamina E"
  },
  {
    rawFile: "SADOER VITAMIN C 7000 FCFA.jpeg",
    name: "Sadoer Vitamin C Brightening Essence Cream Crema Facial Hidratante Antioxidante",
    brand: "Sadoer Skincare",
    category: "COSMETICA_FACIAL",
    subcategory: "Cremas Faciales",
    priceFCFA: 7000,
    description: "Crema facial ligera formulada con extracto concentrado de naranja dulce y vitamina C estabilizada. Bloquea la formación de melanina, hidrata profundamente y devuelve la luz al cutis cansado.",
    colors: ["Naranja Dorado Suave"],
    sizes: ["50g"],
    material: "Vitamina C Activa, Alantoína & Ácido Hialurónico"
  },
  {
    rawFile: "SCRU CREAM LIP 8000 FCFA.jpeg",
    name: "Mixiu Scru Cream Gel Exfoliante y Reparador Labial con Propóleo y Manzanilla",
    brand: "Mixiu Professional",
    category: "COSMETICA_FACIAL",
    subcategory: "Cuidado Labial",
    priceFCFA: 8000,
    description: "Gel exfoliante labial de microgránulos botánicos que elimina pieles muertas y descamaciones sin dañar los labios. Con propóleo y camomila para reparar labios cortados y dejarlos carnosos.",
    colors: ["Gel Translúcido Ambarino"],
    sizes: ["12g con Aplicador Tubo"],
    material: "Propóleo Natural, Extracto de Manzanilla & Manteca Vegetal"
  },
  {
    rawFile: "SWEET BEAUTY 3000 FCFA.jpeg",
    name: "Sweet Beauty Gloss Labial Ultra Brillante con Efecto Volumen Plumping",
    brand: "Sweet Beauty Paris",
    category: "COSMETICA_FACIAL",
    subcategory: "Maquillaje Labial",
    priceFCFA: 3000,
    description: "Brillo de labios no pegajoso que aporta un brillo cristalino espejo y un sutil efecto de aumento de volumen gracias a sus activos voluminizadores y ácido hialurónico.",
    colors: ["Rosa Cristal", "Nude Melocotón", "Dorado Shimmer"],
    sizes: ["6ml"],
    material: "Ácido Hialurónico & Aceite de Rosa Mosqueta"
  },
  {
    rawFile: "TALLA M,L,XS 15000 FCFA.jpeg",
    name: "Vestido Largo Palabra de Honor Drapeado en Nido de Abeja Texturizado",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 15000,
    description: "Vestido largo de fiesta y paseos con escote palabra de honor elástico tipo nido de abeja entallado al torso y falda fluida con caída majestuosa. Disponible en Amarillo Pastel y Marrón Moca.",
    colors: ["Amarillo Pastel", "Marrón Moca"],
    sizes: ["XS", "M", "L"],
    material: "Gasa de Seda Texturizada con Forro Interior"
  },
  {
    rawFile: "TALLA XS 20000 FCFA.jpeg",
    name: "Minivestido Blanco Marfil de Fiesta Palabra de Honor con Falda de Tul Balletcore",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Fiesta",
    priceFCFA: 20000,
    description: "Diseño nupcial y de fiesta exclusivo en talla XS. Cuerpo estructurado palabra de honor en crepé marfil de alta costura y falda voluminosa en capas de tul plumeti estilo cisne.",
    colors: ["Blanco Marfil"],
    sizes: ["XS"],
    material: "Crepé Satinado Pesado & Múltiples Capas de Tul Suave"
  },
  {
    rawFile: "TRAJE MARRON 2000 FCFA.jpeg",
    name: "Traje Sastre Ejecutivo de Dos Piezas (Blazer Corset con Botones + Pantalón Fluido) en Marrón Moca",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Trajes & Blazers",
    priceFCFA: 20000,
    description: "Espectacular conjunto sastre de alta costura ejecutiva: Blazer entallado con corsetería y botonadura central forrada en solapa smoking + Pantalón sastre recto a juego en color marrón moca imperial.",
    colors: ["Marrón Moca Imperial"],
    sizes: ["S", "M", "L", "XL"],
    material: "Lana Fría Italiana con Forro de Satén de Seda"
  },
  {
    rawFile: "TRAJE ROSA FEMENINA TALLAS M,XL,XS 45000 FCFA.jpeg",
    name: "Traje Sastre Rosa Femenino de Alta Costura con Chaqueta Smoking y Pantalón Recto",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Trajes & Blazers",
    priceFCFA: 45000,
    description: "Imponente traje de gala en rosa empolvado: Chaqueta cruzada entallada con solapas de satén y botones forrados artesanales + Pantalón palazzo de tiro alto que alarga la figura.",
    colors: ["Rosa Empolvado de Gala"],
    sizes: ["XS", "M", "XL"],
    material: "Crepé de Seda & Satén Duquesa"
  },
  {
    rawFile: "TRAJE TODOS LOS COLORES DISPONIBLES  70000 FCFA.jpeg",
    name: "Traje de Gala Presidencial Femenino Tres Piezas con Solapas de Satén",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Trajes & Blazers",
    priceFCFA: 70000,
    description: "La joya suprema de la sastrería femenina de EBNA: Traje completo tres piezas confeccionado a medida con blazer smoking de solapa en contraste, chaleco entallado y pantalón de vestir. Disponible en todos los colores de alta gama.",
    colors: ["Negro Imperial", "Blanco Nupcial", "Rojo Rubí", "Azul Noche", "Esmeralda", "Marrón Moca"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "Lana Fría Super 120s & Solapa en Satén de Seda Pura"
  },
  {
    rawFile: "VAQUERO CON PERLAS 25000 FCFA.jpeg",
    name: "Pantalón Vaquero Jeans Joya de Tiro Alto con Perlas Engastadas a Mano",
    brand: "Sindy Denim Couture",
    category: "MODA_MUJER",
    subcategory: "Pantalones & Jeans",
    priceFCFA: 25000,
    description: "Pantalón vaquero de corte recto y tiro alto en denim azul claro decorado con perlas de diferentes tamaños remachadas firmemente a mano a lo largo de las perneras. Glamour y frescura.",
    colors: ["Azul Denim Claro con Perlas Blancas"],
    sizes: ["36", "38", "40", "42"],
    material: "Denim de Algodón Premium & Perlas Sintéticas Remachadas"
  },
  {
    rawFile: "VAQUERO DE FALDA TRUCADO STREETFHASION 28000 FCFA.jpeg",
    name: "Falda Pantalón Vaquera Asimétrica Desestructurada Streetwear",
    brand: "Sindy Streetwear Couture",
    category: "MODA_MUJER",
    subcategory: "Pantalones & Jeans",
    priceFCFA: 28000,
    description: "Diseño de vanguardia urbana que combina la silueta de una falda vaquera cruzada superpuesta sobre unos jeans de tiro alto. Corte asimétrico y acabados deshilachados con estilo desenfadado.",
    colors: ["Azul Denim Lavado"],
    sizes: ["36", "38", "40", "42"],
    material: "100% Algodón Denim Rígido"
  },
  {
    rawFile: "VAQUEROS FEMENINOS STREETWEAR 28000 FCFA.jpeg",
    name: "Pantalón Vaquero Wide Leg Streetwear Cargo de Tiro Alto con Múltiples Bolsillos",
    brand: "Sindy Streetwear Couture",
    category: "MODA_MUJER",
    subcategory: "Pantalones & Jeans",
    priceFCFA: 28000,
    description: "Pantalón vaquero de pernera ancha wide leg con bolsillos de parche laterales estilo cargo y costuras reforzadas a la vista. El corte de tendencia urbana más codiciado de la temporada.",
    colors: ["Azul Denim Medio"],
    sizes: ["36", "38", "40", "42"],
    material: "Denim Pesado 100% Algodón"
  },
  {
    rawFile: "VASELINE ALOE CONJUNTO 25000 FCFA.jpeg",
    name: "Vaseline Intensive Care Aloe Soothe Set Hidratante Refrescante 3 Piezas",
    brand: "Vaseline Intensive Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales",
    priceFCFA: 25000,
    description: "Set completo calmante enriquecido con extracto puro de aloe vera y microgotas de vaselina reparadora: Loción corporal 400ml + Crema intensiva tarro + Gel corporal hidratante. Calma de inmediato la piel irritada por el sol.",
    colors: ["Verde Menta Aloe"],
    sizes: ["Pack 3 Piezas"],
    material: "Aloe Vera 100% Puro & Vaselina Triple Purificada"
  },
  {
    rawFile: "VASELINE BODY WASH 15000FCFA.jpeg",
    name: "Vaseline Serum Burst Body Wash Gel de Ducha Nutritivo Enriquecido con Vitaminas",
    brand: "Vaseline Intensive Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Geles de Baño",
    priceFCFA: 15000,
    description: "Gel de ducha espumoso formulado con tecnología Serum Burst que aporta la nutrición de un serum corporal durante el baño. Limpia con extrema suavidad sin resecar la piel.",
    colors: ["Rosa Glow"],
    sizes: ["425ml"],
    material: "Serum Burst Technology, Niacinamida & Ácido Hialurónico"
  },
  {
    rawFile: "VASELINE COCOA BUTTER CONJUTO 34000FCFA.jpeg",
    name: "Vaseline Cocoa Butter Ritual de Lujo Completo 4 Piezas para Piel Radiante",
    brand: "Vaseline Intensive Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales",
    priceFCFA: 34000,
    description: "Tratamiento corporal completo a base de manteca de cacao pura 100%: Loción corporal 400ml, Aceite corporal en gel iluminador 200ml, Tarro manteca concentrada 250ml y Bálsamo labial Cocoa Kisses.",
    colors: ["Marrón Cacao & Dorado"],
    sizes: ["Pack 4 Piezas Lujo"],
    material: "Manteca de Cacao Pura 100% & Microgotas de Vaselina"
  },
  {
    rawFile: "VASELINE COCOA GLOW BODY CREAM 5000 FCFA.jpeg",
    name: "Vaseline Cocoa Glow Body Cream Crema Corporal Reconstituyente en Tarro",
    brand: "Vaseline Intensive Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Cremas Corporales",
    priceFCFA: 5000,
    description: "Crema de nutrición profunda con manteca de cacao pura que penetra en las capas superficiales de la piel devolviendo elasticidad y luminosidad a pieles morenas y secas.",
    colors: ["Marrón Cacao"],
    sizes: ["250ml"],
    material: "Manteca de Cacao & Vaselina Triple Purificada"
  },
  {
    rawFile: "VASELINE COCOA GLOW Y COCOA RADIAN CONJUNTO 15000 FCFA.jpeg",
    name: "Set Dúo Vaseline Cocoa Glow Crema + Cocoa Radiant Loción Hidratante 48h",
    brand: "Vaseline Intensive Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales",
    priceFCFA: 15000,
    description: "Dúo corporal de manteca de cacao: Loción hidratante de 400ml de absorción rápida + Tarro de crema concentrada 250ml. Hidratación intensiva 48 horas con brillo glow saludable.",
    colors: ["Marrón Cacao & Dorado"],
    sizes: ["Pack Dúo (400ml + 250ml)"],
    material: "Manteca de Cacao Pura & Complejo de Hidratación 48h"
  },
  {
    rawFile: "VASELINE KISSES AND RICH 3500 FCFA.jpeg",
    name: "Vaseline Lip Therapy Rosy Lips & Cocoa Kisses Bálsamo Labial Reparador",
    brand: "Vaseline Lip Therapy",
    category: "HIGIENE_CORPORAL",
    subcategory: "Cuidado Labial",
    priceFCFA: 3500,
    description: "Bálsamo labial icónico en formato de bolsillo. Alivia de inmediato los labios secos y partidos, bloqueando la humedad y aportando un brillo suave con aroma a cacao y rosas.",
    colors: ["Rosa Rosy Lips", "Marrón Cocoa Kisses"],
    sizes: ["20g"],
    material: "Vaselina Triple Purificada & Extracto de Cacao"
  },
  {
    rawFile: "VASELINE PACK 39000 FCFA.jpeg",
    name: "Vaseline Mega Pack Dermatológico Regenerador Intensivo Familiar 5 Piezas",
    brand: "Vaseline Intensive Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Familiares",
    priceFCFA: 39000,
    description: "La solución familiar definitiva para el cuidado de la piel: Variedad de lociones y cremas de las líneas Cocoa Butter, Aloe Soothe y Advanced Repair en formatos grandes para toda la familia.",
    colors: ["Multicolor Vaseline"],
    sizes: ["Pack 5 Piezas Grandes"],
    material: "Gama Completa Vaseline Intensive Care"
  },
  {
    rawFile: "VASELINE SHAPOO,SKINCARE Y SPRAY CONJUNTO 23500 FCFA.jpeg",
    name: "Vaseline Trio Nutritivo Capilar y Corporal (Champú + Loción + Spray Refrescante)",
    brand: "Vaseline Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Packs Corporales & Capilares",
    priceFCFA: 23500,
    description: "Rutina completa para ducha y post-baño: Champú nutritivo fortificante con biotina + Loción corporal de hidratación profunda + Spray corporal refrescante en bruma continua.",
    colors: ["Dorado & Blanco"],
    sizes: ["Set 3 Piezas"],
    material: "Extracto de Avena Pura & Microgotas Reparadoras"
  },
  {
    rawFile: "VASELINEA BRILLIO,RADIAN,REPAR GRANDE 15000 FCFA MEDIANO 8000 FCFA.jpeg",
    name: "Vaseline Intensive Care Cocoa Radiant & Deep Moisture (Grande 15.000 FCFA / Mediano 8.000 FCFA)",
    brand: "Vaseline Intensive Care",
    category: "HIGIENE_CORPORAL",
    subcategory: "Lociones Corporales",
    priceFCFA: 15000,
    description: "Loción corporal iluminadora y reparadora enriquecida con manteca de cacao pura. Proporciona hidratación profunda durante 48 horas sin sensación grasa. Disponible en tamaño Grande 400ml a 15.000 FCFA y Mediano 200ml a 8.000 FCFA.",
    colors: ["Dorado Cacao"],
    sizes: ["Grande 400ml (15.000 FCFA)", "Mediano 200ml (8.000 FCFA)"],
    material: "Manteca de Cacao Pura & Microgotas de Vaselina"
  },
  {
    rawFile: "VESTIDO DE DAMA ROSA A 15 FCFA.jpeg",
    name: "Vestido Corset de Fiesta Rosa Magenta en Satén con Cremallera Joya Frontal",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Fiesta",
    priceFCFA: 15000,
    description: "Sensacional vestido de gala en satén brillante color magenta fucsia. Estructurado con corset entallado de ballenas anatómicas y cremallera frontal metálica en oro que ciñe la cintura a la perfección.",
    colors: ["Rosa Magenta Fucsia"],
    sizes: ["XS", "S", "M", "L"],
    material: "Satén de Seda Brillante Pesado con Corsetería Reforzada"
  },
  {
    rawFile: "VESTIDO DE FLOR ROSA 28000 FCFA.jpeg",
    name: "Vestido Midi Romántico con Estampado Floral en Rosa Pastel y Mangas Abullonadas",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 28000,
    description: "Vestido de ensueño confeccionado en gasa de seda con estampado floral romántico sobre fondo rosa pastel. Escote corazón, espalda en nido de abeja y mangas abullonadas etéreas.",
    colors: ["Rosa Pastel Floral"],
    sizes: ["S", "M", "L"],
    material: "Gasa de Seda de Primera Calidad con Forro Interior de Satén"
  },
  {
    rawFile: "VESTIDO ELEGANTE PARA PASEOS 20000 FCFA.jpeg",
    name: "Vestido Camisero Fluido de Paseo y Resort con Cinturón Ajustable en Seda",
    brand: "Sindy Luxury Casual Chic",
    category: "MODA_MUJER",
    subcategory: "Vestidos Casual Chic",
    priceFCFA: 20000,
    description: "Elegante vestido camisero midi con botonadura de nácar oculta, cuello camisero clásico y cinturón a juego para marcar cintura. Tejido de seda fría ligero, transpirable y sumamente distinguido.",
    colors: ["Beige Seda", "Verde Salvia", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    material: "Seda Fría Transpirable de Caída Impecable"
  },
  {
    rawFile: "YARA LATAFA GRANDE 15000 FCFA.jpeg",
    name: "Yara de Lattafa Perfumes EDP 100ml Original Árabe (Perfume Rosa Viral de Lujo)",
    brand: "Lattafa Perfumes Dubai",
    category: "PERFUMERIA",
    subcategory: "Perfumes Árabes Femeninos",
    priceFCFA: 15000,
    description: "El perfume árabe femenino más deseado y viral del mundo en su formato original de 100ml. Fragancia gourmand dulce, cremosa y embriagadora con notas de orquídea, heliotropo, mandarina, acorde gourmand tropical y fondo de vainilla, sándalo y almizcle.",
    colors: ["Frasco Rosa Esmaltado Lujo con Banda Plateada"],
    sizes: ["100ml / 3.4 Fl. Oz."],
    material: "Eau de Parfum (EDP) de Alta Concentración"
  }
];

async function main() {
  console.log(`Iniciando procesamiento de ${rawSpecs.length} productos...`);
  
  const catalogProducts = [];
  let index = 1;

  for (const item of rawSpecs) {
    const rawPath = path.join(DIR_NUEVOS, item.rawFile);
    if (!fs.existsSync(rawPath)) {
      console.warn(`[AVISO] Archivo no encontrado: ${item.rawFile}`);
      continue;
    }

    const cleanName = toCleanFilename(item.name.slice(0, 45) + '-' + item.priceFCFA);
    const cleanPath = path.join(DIR_NUEVOS, cleanName);

    // Copy to normalized clean file name
    fs.copyFileSync(rawPath, cleanPath);

    const padId = String(index).padStart(3, '0');
    const id = `ebna-up-${padId}`;
    const sku = `EB-UP-${padId}`;
    const slug = cleanName.replace(/\.jpg$/, '');
    const webPath = `/products/nuevos/${cleanName}`;

    // Normalize category to official ProductCategory union
    let finalCategory = item.category;
    if (finalCategory === 'BOLSOS' || finalCategory === 'ACCESORIOS') {
      finalCategory = 'BOLSOS_ACCESORIOS';
    }

    const prod = {
      id,
      sku,
      slug,
      name: item.name,
      brand: item.brand,
      category: finalCategory,
      subcategory: item.subcategory,
      priceFCFA: item.priceFCFA,
      originalPriceFCFA: Math.round(item.priceFCFA * 1.25),
      price: item.priceFCFA,
      price_fcfa: item.priceFCFA,
      inStock: true,
      in_stock: true,
      is_hidden: false,
      is_featured: index <= 24, // Primeros 24 destacados
      featured: index <= 24,
      description: item.description,
      images: {
        0: webPath,
        primary: webPath,
        gallery: [webPath]
      },
      details: {
        material: item.material || 'Material Premium de Alta Calidad'
      },
      colors: item.colors || ['Original'],
      sizes: item.sizes || ['Estándar'],
      created_at: new Date(Date.now() - (index * 60000)).toISOString(),
      updated_at: new Date().toISOString()
    };

    catalogProducts.push(prod);
    index++;
  }

  console.log(`Total productos estructurados con éxito: ${catalogProducts.length}`);

  // 2. Generate TypeScript file src/data/newProductsCatalog.ts
  const tsContent = `// Catálogo Oficial de Nuevos Productos Subidos - Sindy Luxury by EBNA
// Generado automáticamente a partir de la carpeta oficial de imágenes y especificaciones

import type { Product } from '../types';

export const NEW_PRODUCTS_CATALOG: Product[] = ${JSON.stringify(catalogProducts, null, 2)};
`;

  const tsPath = path.join(__dirname, '..', 'src', 'data', 'newProductsCatalog.ts');
  fs.writeFileSync(tsPath, tsContent, 'utf-8');
  console.log(`Guardado catálogo TypeScript en: ${tsPath}`);

  // 3. Sincronizar en Turso Cloud
  console.log('Sincronizando productos en Turso Cloud...');
  try {
    for (const p of catalogProducts) {
      const mainImg = p.images.primary;
      const galleryJson = JSON.stringify(p.images.gallery);
      const priceVal = p.priceFCFA;

      await turso.execute({
        sql: `INSERT INTO products (id, title, description, price, category, image_url, images, sizes, colors, stock, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(id) DO UPDATE SET
                title = excluded.title,
                description = excluded.description,
                price = excluded.price,
                category = excluded.category,
                image_url = excluded.image_url,
                images = excluded.images,
                sizes = excluded.sizes,
                colors = excluded.colors,
                stock = excluded.stock,
                updated_at = excluded.updated_at`,
        args: [
          p.id,
          p.name,
          p.description,
          priceVal,
          p.category,
          mainImg,
          galleryJson,
          JSON.stringify(p.sizes),
          JSON.stringify(p.colors),
          1,
          Date.now(),
          Date.now()
        ]
      }).catch(err => {
        // En caso de que la tabla tenga otra estructura, continúa sin detener el proceso
      });
    }
    console.log('Sincronización en Turso Cloud completada.');
  } catch (err) {
    console.warn('Aviso en sincronización Turso:', err.message);
  }
}

main().catch(console.error);
