import type { Product } from '../types';

export const COSMETICS_AND_BABY_PRODUCTS: Product[] = [
  // =========================================================================
  // 1. VASELINAS Y CUIDADO CORPORAL (HIGIENE_CORPORAL)
  // =========================================================================
  {
    id: 'ebna-vas-01',
    sku: 'EB-VAS-01',
    slug: 'vaselina-cocoa-radiant-glow-piel-chocolate-250ml',
    name: 'Vaselina Cocoa Radiant Glow Nutrición Intensa Piel de Chocolate',
    brand: 'Vaseline Intensive Care',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Vaselinas & Mantecas',
    priceFCFA: 3500,
    originalPriceFCFA: 4500,
    price: 3500,
    price_fcfa: 3500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'Fórmula enriquecida con manteca de cacao pura y microgotas de vaselina reparadora. Brinda un brillo radiante y nutrición profunda para pieles morenas y oscuras, eliminando la resequedad y devolviendo un tono luminoso.',
    images: {
      0: '/products/cosmetics_baby/vaselina_cocoa_glow.jpg',
      primary: '/products/cosmetics_baby/vaselina_cocoa_glow.jpg',
      gallery: ['/products/cosmetics_baby/vaselina_cocoa_glow.jpg']
    },
    details: {
      volume: '250 ml / 368g',
      material: 'Manteca de Cacao Pura & Vaselina Filtrada Triple'
    },
    colors: ['Cacao Dorado Glow'],
    sizes: ['250ml', '368g'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-vas-02',
    sku: 'EB-VAS-02',
    slug: 'vaselina-petroleum-jelly-original-pura-multiusos-368g',
    name: 'Vaselina Petroleum Jelly Original Pura 100% Reparadora',
    brand: 'Vaseline Original',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Vaselinas & Mantecas',
    priceFCFA: 3000,
    originalPriceFCFA: 3800,
    price: 3000,
    price_fcfa: 3000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    featured: false,
    description: 'La vaselina de referencia mundial con triple purificación garantizada. Protege, alivia labios resecos, talones agrietados, codos y quemaduras menores, creando una barrera impermeable protectora.',
    images: {
      0: '/products/cosmetics_baby/vaselina_original.jpg',
      primary: '/products/cosmetics_baby/vaselina_original.jpg',
      gallery: ['/products/cosmetics_baby/vaselina_original.jpg']
    },
    details: {
      volume: '368 g',
      material: 'Petrolatum Puro 100% Hipoalergénico'
    },
    colors: ['Fórmula Original'],
    sizes: ['100g', '250g', '368g'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-urea-03',
    sku: 'EB-UREA-03',
    slug: 'instituto-espanol-crema-reparadora-urea-tarro-redondo-400ml',
    name: 'Instituto Español Crema Reparadora Urea 10% Tarro Redondo 400ml',
    brand: 'Instituto Español',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Cremas Corporales',
    priceFCFA: 6500,
    originalPriceFCFA: 8000,
    price: 6500,
    price_fcfa: 6500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'Célebre crema reparadora en formato tarro redondo de gran capacidad. Su concentración de urea al 10% restablece la hidratación natural de pieles secas, asperezas y descamación, dejando una textura aterciopelada inmediata.',
    images: {
      0: '/products/cosmetics_baby/instituto_espanol_urea.jpg',
      primary: '/products/cosmetics_baby/instituto_espanol_urea.jpg',
      gallery: ['/products/cosmetics_baby/instituto_espanol_urea.jpg']
    },
    details: {
      volume: '400 ml',
      material: 'Urea Activa 10% & Emulsión Hipoalergénica'
    },
    colors: ['Tarro Redondo 400ml'],
    sizes: ['400ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-glic-04',
    sku: 'EB-GLIC-04',
    slug: 'glicerina-pura-liquida-vegetal-250ml',
    name: 'Glicerina Pura Líquida Vegetal Hidratante 250ml',
    brand: 'Dermo Botánica Natural',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Aceites & Glicerinas',
    priceFCFA: 2500,
    originalPriceFCFA: 3200,
    price: 2500,
    price_fcfa: 2500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Glicerina 100% vegetal pura de alta densidad. Potente humectante que retiene el agua en la epidermis, ideal para mezclar con tus cremas corporales favoritas o aplicar directamente sobre zonas extra secas.',
    images: {
      0: '/products/cosmetics_baby/glicerina_liquida.jpg',
      primary: '/products/cosmetics_baby/glicerina_liquida.jpg',
      gallery: ['/products/cosmetics_baby/glicerina_liquida.jpg']
    },
    details: {
      volume: '250 ml',
      material: 'Glicerina Vegetal Pura Grado Cosmético'
    },
    colors: ['Transparente Natural'],
    sizes: ['250ml', '500ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-coco-05',
    sku: 'EB-COCO-05',
    slug: 'crema-corporal-coco-pure-white-tulipan-negro-400ml',
    name: 'Crema Corporal Coco Pure White Tulipán Negro 400ml',
    brand: 'Tulipán Negro',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Cremas Corporales',
    priceFCFA: 5000,
    originalPriceFCFA: 6500,
    price: 5000,
    price_fcfa: 5000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Body lotion con un envolvente aroma a coco tropical. Textura ligera de rápida absorción formulada con manteca de karité y aceite de coco para una piel suave, perfumada y profundamente nutrida.',
    images: {
      0: '/products/cosmetics_baby/tulipan_negro_coco.jpg',
      primary: '/products/cosmetics_baby/tulipan_negro_coco.jpg',
      gallery: ['/products/cosmetics_baby/tulipan_negro_coco.jpg']
    },
    details: {
      volume: '400 ml',
      material: 'Aceite de Coco & Manteca de Karité Vegana'
    },
    colors: ['Coco Pure White'],
    sizes: ['400ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-estria-06',
    sku: 'EB-ESTRIA-06',
    slug: 'palmers-crema-antiestrias-masaje-cocoa-butter-250ml',
    name: "Palmer's Cocoa Butter Crema de Masaje Antiestrías 250ml",
    brand: "Palmer's",
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Cuidado Maternal & Firmeza',
    priceFCFA: 7500,
    originalPriceFCFA: 9500,
    price: 7500,
    price_fcfa: 7500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'La loción número 1 recomendada para prevenir y atenuar estrías durante el embarazo y variaciones de peso. Con colágeno, elastina, aceite de argán y manteca de cacao pura para máxima elasticidad dérmica.',
    images: {
      0: '/products/cosmetics_baby/crema_antiestrias.jpg',
      primary: '/products/cosmetics_baby/crema_antiestrias.jpg',
      gallery: ['/products/cosmetics_baby/crema_antiestrias.jpg']
    },
    details: {
      volume: '250 ml',
      material: 'Manteca de Cacao Pura, Colágeno & Elastina'
    },
    colors: ['Loción Antiestrías'],
    sizes: ['250ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-leche-07',
    sku: 'EB-LECHE-07',
    slug: 'gel-de-bano-lactovit-leche-esponja-masaje-pack',
    name: 'Gel de Baño Nutritivo Lactovit Proteínas de Leche & Esponja Spa',
    brand: 'Lactovit Dermo Care',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Geles & Esponjas de Baño',
    priceFCFA: 4500,
    originalPriceFCFA: 5500,
    price: 4500,
    price_fcfa: 4500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Dúo de higiene reconfortante: gel de baño cremoso con lactourea y proteínas activas de la leche junto con esponja exfoliante suave que estimula la circulación y aporta una espuma densa y aromática.',
    images: {
      0: '/products/cosmetics_baby/gel_leche_esponja.jpg',
      primary: '/products/cosmetics_baby/gel_leche_esponja.jpg',
      gallery: ['/products/cosmetics_baby/gel_leche_esponja.jpg']
    },
    details: {
      volume: '600 ml + Esponja',
      material: 'Lactourea & Proteínas de Leche'
    },
    colors: ['Fórmula Nutritiva Leche'],
    sizes: ['Pack Gel 600ml + Esponja'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-depil-08',
    sku: 'EB-DEPIL-08',
    slug: 'veet-pack-completo-crema-depilatoria-espatula-locion',
    name: 'Veet Kit Depilatorio Completo Silk & Fresh (Crema + Espátula + Loción)',
    brand: 'Veet Silk & Fresh',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Depilación',
    priceFCFA: 6000,
    originalPriceFCFA: 7500,
    price: 6000,
    price_fcfa: 6000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Set integral para depilación suave y efectiva en piernas y cuerpo. Actúa desde la raíz eliminando el vello en pocos minutos, dejando la piel hidratada hasta por 24 horas con aroma a flor de loto.',
    images: {
      0: '/products/cosmetics_baby/crema_depilatoria_pack.jpg',
      primary: '/products/cosmetics_baby/crema_depilatoria_pack.jpg',
      gallery: ['/products/cosmetics_baby/crema_depilatoria_pack.jpg']
    },
    details: {
      volume: 'Tubo 200ml + Espátula Anatómica',
      material: 'Aloe Vera & Vitamina E'
    },
    colors: ['Piel Sensible / Normal'],
    sizes: ['Pack Completo'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-depil-09',
    sku: 'EB-DEPIL-09',
    slug: 'veet-pure-crema-depilatoria-tubo-accion-rapida-100ml',
    name: 'Veet Pure Crema Depilatoria Tubo Acción Rápida 100ml',
    brand: 'Veet Pure',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Depilación',
    priceFCFA: 3800,
    originalPriceFCFA: 4800,
    price: 3800,
    price_fcfa: 3800,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Crema depilatoria en tubo individual formulada con el mínimo de ingredientes químicos y sin olor a amoníaco. Eficaz incluso en vello corto, lista para usar en cualquier momento.',
    images: {
      0: '/products/cosmetics_baby/crema_depilatoria_tubo.jpg',
      primary: '/products/cosmetics_baby/crema_depilatoria_tubo.jpg',
      gallery: ['/products/cosmetics_baby/crema_depilatoria_tubo.jpg']
    },
    details: {
      volume: '100 ml',
      material: 'Fórmula Pura Hipoalergénica'
    },
    colors: ['Tubo 100ml'],
    sizes: ['100ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-dove-10',
    sku: 'EB-DOVE-10',
    slug: 'dove-beauty-cream-bar-jabon-crema-pack-2x',
    name: 'Dove Beauty Cream Bar Pastilla de Jabón con 1/4 Crema Hidratante (Pack 2x)',
    brand: 'Dove Original',
    category: 'HIGIENE_CORPORAL',
    subcategory: 'Jabones Corporales',
    priceFCFA: 2500,
    originalPriceFCFA: 3200,
    price: 2500,
    price_fcfa: 2500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'No es un jabón común: es una pastilla de belleza con 1/4 de crema humectante que limpia suavemente sin resecar la barrera cutánea. Deja la piel más suave, tersa y visiblemente saludable.',
    images: {
      0: '/products/cosmetics_baby/jabon_crema_dove.jpg',
      primary: '/products/cosmetics_baby/jabon_crema_dove.jpg',
      gallery: ['/products/cosmetics_baby/jabon_crema_dove.jpg']
    },
    details: {
      volume: '2 x 100 g',
      material: 'Limpiadores Suaves & 1/4 Crema Humectante'
    },
    colors: ['Blanco Puro Dove'],
    sizes: ['Pack 2x100g'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },

  // =========================================================================
  // 2. CÚRCUMA, MANCHAS Y TRATAMIENTO FACIAL (COSMETICA_FACIAL)
  // =========================================================================
  {
    id: 'ebna-curc-11',
    sku: 'EB-CURC-11',
    slug: 'pack-completo-curcuma-glow-jabon-crema-serum-vitaminas',
    name: 'Pack Completo Cúrcuma Glow: Jabón Exfoliante + Crema Facial + Serum Vitamínico',
    brand: 'Turmeric Glow Lab',
    category: 'COSMETICA_FACIAL',
    subcategory: 'Kits & Tratamientos Completos',
    priceFCFA: 18000,
    originalPriceFCFA: 24000,
    price: 18000,
    price_fcfa: 18000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'Tratamiento botánico iluminador de 3 pasos: jabón artesanal de cúrcuma que remueve impurezas, serum concentrado con vitaminas C & E antioxidante, y crema facial unificante que atenúa manchas oscuras e imperfecciones.',
    images: {
      0: '/products/cosmetics_baby/pack_curcuma_completo.jpg',
      primary: '/products/cosmetics_baby/pack_curcuma_completo.jpg',
      gallery: ['/products/cosmetics_baby/pack_curcuma_completo.jpg']
    },
    details: {
      volume: 'Jabón 150g + Crema 50ml + Serum 30ml',
      material: 'Extracto de Cúrcuma Orgánica, Niacinamida & Vitamina C'
    },
    colors: ['Cúrcuma Golden Pack'],
    sizes: ['Kit Completo 3 Piezas'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-curc-12',
    sku: 'EB-CURC-12',
    slug: 'savons-de-beaute-curcuma-jabon-exfoliante-facial-150g',
    name: 'Savons de Beauté Cúrcuma Jabón Exfoliante Facial & Corporal 150g',
    brand: 'Savons de Beauté',
    category: 'COSMETICA_FACIAL',
    subcategory: 'Limpiadores & Jabones Faciales',
    priceFCFA: 3500,
    originalPriceFCFA: 4500,
    price: 3500,
    price_fcfa: 3500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Jabón vegetal artesanal con micropartículas exfoliantes de raíz de cúrcuma. Limpia a fondo los poros, remueve células muertas, regula el exceso de grasa y proporciona un brillo dorado y fresco a la tez.',
    images: {
      0: '/products/cosmetics_baby/savons_beaute_curcuma.jpg',
      primary: '/products/cosmetics_baby/savons_beaute_curcuma.jpg',
      gallery: ['/products/cosmetics_baby/savons_beaute_curcuma.jpg']
    },
    details: {
      volume: '150 g',
      material: 'Aceite de Oliva, Cúrcuma Pura & Miel Botánica'
    },
    colors: ['Amarillo Cúrcuma'],
    sizes: ['150g'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-kojic-13',
    sku: 'EB-KOJIC-13',
    slug: 'kojie-san-jabon-quitamanchas-acido-kojico-original-135g',
    name: 'Kojie San Jabón Quitamanchas & Unificante Ácido Kójico Original 135g',
    brand: 'Kojie San Original',
    category: 'COSMETICA_FACIAL',
    subcategory: 'Limpiadores & Jabones Faciales',
    priceFCFA: 4000,
    originalPriceFCFA: 5000,
    price: 4000,
    price_fcfa: 4000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'El jabón aclarador y antimanchas más reconocido del mercado dermatológico. Su principio activo de ácido kójico natural atenúa manchas solares, marcas de acné y pecas, unificando el tono de la piel.',
    images: {
      0: '/products/cosmetics_baby/jabon_quitamanchas.jpg',
      primary: '/products/cosmetics_baby/jabon_quitamanchas.jpg',
      gallery: ['/products/cosmetics_baby/jabon_quitamanchas.jpg']
    },
    details: {
      volume: '135 g',
      material: 'Ácido Kójico de Arroz Fermentado & Aceite de Coco'
    },
    colors: ['Naranja Ácido Kójico'],
    sizes: ['135g'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-claras-14',
    sku: 'EB-CLARAS-14',
    slug: 'pack-para-las-claras-clarifying-set-locion-crema-jabon',
    name: 'Pack Para Las Claras Clarifying Set (Loción + Crema + Jabón Oro)',
    brand: 'Fair & White Exclusif',
    category: 'COSMETICA_FACIAL',
    subcategory: 'Kits & Tratamientos Completos',
    priceFCFA: 22000,
    originalPriceFCFA: 28000,
    price: 22000,
    price_fcfa: 22000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'Tratamiento intensivo clarifying de alta gama. Formulado específicamente para desvanecer hiperpigmentaciones resistentes y proporcionar un tono homogéneo, luminoso y suave en rostro y cuerpo.',
    images: {
      0: '/products/cosmetics_baby/pack_para_las_claras.jpg',
      primary: '/products/cosmetics_baby/pack_para_las_claras.jpg',
      gallery: ['/products/cosmetics_baby/pack_para_las_claras.jpg']
    },
    details: {
      volume: 'Loción 500ml + Crema 50ml + Jabón 200g',
      material: 'Complejo Clarificante Botánico & Vitamina E'
    },
    colors: ['Gold Edition'],
    sizes: ['Set Completo 3 Piezas'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-cannab-15',
    sku: 'EB-CANNAB-15',
    slug: 'crema-facial-vitamina-c-aceite-cannabis-botanico-50ml',
    name: 'Crema Facial Hidratante Vitamina C & Aceite de Cannabis Botánico 50ml',
    brand: 'Botanical Labs',
    category: 'COSMETICA_FACIAL',
    subcategory: 'Cremas & Serums Faciales',
    priceFCFA: 8500,
    originalPriceFCFA: 11000,
    price: 8500,
    price_fcfa: 8500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Innovadora crema iluminadora con doble acción antifatiga: la Vitamina C pura aporta luminosidad y estimula el colágeno, mientras que el aceite de semillas de cannabis calma rojeces y nutre intensamente.',
    images: {
      0: '/products/cosmetics_baby/crema_cannabis_vitamina_c.jpg',
      primary: '/products/cosmetics_baby/crema_cannabis_vitamina_c.jpg',
      gallery: ['/products/cosmetics_baby/crema_cannabis_vitamina_c.jpg']
    },
    details: {
      volume: '50 ml',
      material: 'Vitamina C Microencapsulada & Aceite de Cáñamo Puro'
    },
    colors: ['Tarro 50ml'],
    sizes: ['50ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-lemon-16',
    sku: 'EB-LEMON-16',
    slug: 'lemonvate-gel-crema-tubo-iluminador-rapido-30g',
    name: 'Lemonvate Gel & Crema en Tubo Iluminador Rápido 30g',
    brand: 'Mitchell Brands',
    category: 'COSMETICA_FACIAL',
    subcategory: 'Tratamientos Localizados',
    priceFCFA: 4500,
    originalPriceFCFA: 5500,
    price: 4500,
    price_fcfa: 4500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Gel y crema concentrada en tubo para tratamiento focalizado de manchas, codos, rodillas y zonas oscuras. Fórmula con arbutina y extractos cítricos de limón que unifica el tono en pocas aplicaciones.',
    images: {
      0: '/products/cosmetics_baby/lemonvate_tubo.jpg',
      primary: '/products/cosmetics_baby/lemonvate_tubo.jpg',
      gallery: ['/products/cosmetics_baby/lemonvate_tubo.jpg']
    },
    details: {
      volume: '30 g',
      material: 'Alfa Arbutina, Vitamina C & Esencia Cítrica de Limón'
    },
    colors: ['Tubo 30g'],
    sizes: ['30g'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },

  // =========================================================================
  // 3. PERFUMERÍA FINA Y ACCESORIOS (PERFUMERIA & BOLSOS_ACCESORIOS)
  // =========================================================================
  {
    id: 'ebna-perf-17',
    sku: 'EB-PERF-17',
    slug: 'parfums-saphir-eau-de-parfum-mujer-prestige-200ml',
    name: 'Parfums Saphir Eau de Parfum Mujer Colección Prestige 200ml',
    brand: 'Parfums Saphir',
    category: 'PERFUMERIA',
    subcategory: 'Perfumes Mujer',
    priceFCFA: 16000,
    originalPriceFCFA: 20000,
    price: 16000,
    price_fcfa: 16000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'Fragancia femenina icónica de la casa española Saphir en formato gigante de 200ml. Notas florales de jazmín y flor de azahar con fondo ambarado y vainilla dulce de fijación prolongada en climas cálidos.',
    images: {
      0: '/products/cosmetics_baby/perfume_safir_mujer.jpg',
      primary: '/products/cosmetics_baby/perfume_safir_mujer.jpg',
      gallery: ['/products/cosmetics_baby/perfume_safir_mujer.jpg']
    },
    details: {
      volume: '200 ml con Vaporizador',
      material: 'Eau de Parfum Alta Concentración'
    },
    colors: ['Prestige Gold Edition'],
    sizes: ['200ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-perf-18',
    sku: 'EB-PERF-18',
    slug: 'perfume-amalfi-citrus-neroli-riviera-collection-100ml',
    name: 'Perfume Amalfi Citrus & Neroli Riviera Collection 100ml',
    brand: 'Couture Riviera',
    category: 'PERFUMERIA',
    subcategory: 'Perfumes Unisex & Nicho',
    priceFCFA: 28000,
    originalPriceFCFA: 35000,
    price: 28000,
    price_fcfa: 28000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'Elegancia y frescura mediterránea encapsuladas. Notas de mandarina jugosa, neroli italiano, menta silvestre y vetiver. Un perfume unisex sofisticado, vibrante y aristocrático para eventos de día y noche.',
    images: {
      0: '/products/cosmetics_baby/perfume_amalfi.jpg',
      primary: '/products/cosmetics_baby/perfume_amalfi.jpg',
      gallery: ['/products/cosmetics_baby/perfume_amalfi.jpg']
    },
    details: {
      volume: '100 ml Frasco Cristal Joya',
      material: 'Esencias Cítricas de la Costa Amalfitana & Vetiver'
    },
    colors: ['Azul Riviera Cristal'],
    sizes: ['100ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-perf-19',
    sku: 'EB-PERF-19',
    slug: 'perfume-masculino-alta-noche-sauvage-edition-100ml',
    name: 'Perfume Masculino Alta Noche Sauvage Edition 100ml',
    brand: 'EBNA Homme Haute',
    category: 'PERFUMERIA',
    subcategory: 'Perfumes Hombre',
    priceFCFA: 26000,
    originalPriceFCFA: 32000,
    price: 26000,
    price_fcfa: 26000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Fragancia masculina magnética y poderosa. Salida cítrica de bergamota de Calabria con un corazón picante de pimienta de Sichuan y fondo amaderado de ambroxan y cedro. Distinción viril duradera.',
    images: {
      0: '/products/cosmetics_baby/perfume_hombre_sauvage.jpg',
      primary: '/products/cosmetics_baby/perfume_hombre_sauvage.jpg',
      gallery: ['/products/cosmetics_baby/perfume_hombre_sauvage.jpg']
    },
    details: {
      volume: '100 ml Vaporisateur Spray',
      material: 'Ambroxan Noble, Cedro & Bergamota'
    },
    colors: ['Negro Obsidiana Gradiente'],
    sizes: ['100ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-acc-20',
    sku: 'EB-ACC-20',
    slug: 'diademas-bandas-terciopelo-para-pelucas-wig-grip-pro',
    name: 'Diademas y Bandas Elásticas de Terciopelo para Pelucas (Wig Grip Pro)',
    brand: 'EBNA Luxury Glam',
    category: 'BOLSOS_ACCESORIOS',
    subcategory: 'Belleza Capilar & Accesorios',
    priceFCFA: 4000,
    originalPriceFCFA: 5500,
    price: 4000,
    price_fcfa: 4000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Banda de sujeción invisible confeccionada en terciopelo antideslizante con ajuste de velcro. Fija firmemente cualquier peluca sin necesidad de pegamentos ni horquillas, protegiendo las líneas del cabello.',
    images: {
      0: '/products/cosmetics_baby/diademas_pelucas.jpg',
      primary: '/products/cosmetics_baby/diademas_pelucas.jpg',
      gallery: ['/products/cosmetics_baby/diademas_pelucas.jpg']
    },
    details: {
      material: 'Terciopelo Doble Cara Transpirable con Cierre Velcro'
    },
    colors: ['Negro Azabache', 'Marrón Piel', 'Beige Nude'],
    sizes: ['Ajustable Universal'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },

  // =========================================================================
  // 4. LÍNEA BEBÉS Y MATERNIDAD (MODA_INFANTIL / CHICCO & NENUCO)
  // =========================================================================
  {
    id: 'ebna-bebe-21',
    sku: 'EB-BEBE-21',
    slug: 'nenuco-agua-de-colonia-clasica-bebes-familiar-600ml',
    name: 'Nenuco Agua de Colonia Clásica para Bebés Frasco Familiar 600ml',
    brand: 'Nenuco Original',
    category: 'MODA_INFANTIL',
    subcategory: 'Colonias & Higiene Infantil',
    priceFCFA: 5500,
    originalPriceFCFA: 7000,
    price: 5500,
    price_fcfa: 5500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'La fragancia más entrañable de la infancia. Aroma limpio, fresco y cítrico con notas de limón y flores suaves. Fórmula hipoalergénica probada dermatológicamente, apta para el cabello y la ropa del bebé.',
    images: {
      0: '/products/cosmetics_baby/nenuco_colonia_familiar.jpg',
      primary: '/products/cosmetics_baby/nenuco_colonia_familiar.jpg',
      gallery: ['/products/cosmetics_baby/nenuco_colonia_familiar.jpg']
    },
    details: {
      volume: '600 ml',
      material: 'Fragancia Suave Hipoalergénica con pH Neutro'
    },
    colors: ['Botella Clásica 600ml'],
    sizes: ['600ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-22',
    sku: 'EB-BEBE-22',
    slug: 'nenuco-colonia-bebe-spray-dosificador-viaje-200ml',
    name: 'Nenuco Colonia Bebé en Spray Viaje 200ml',
    brand: 'Nenuco Original',
    category: 'MODA_INFANTIL',
    subcategory: 'Colonias & Higiene Infantil',
    priceFCFA: 3500,
    originalPriceFCFA: 4500,
    price: 3500,
    price_fcfa: 3500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Práctico formato pulverizador en spray de 200ml para llevar en el bolso maternal. Mantiene la fragancia original fresca de Nenuco con una aplicación uniforme y sin derrames.',
    images: {
      0: '/products/cosmetics_baby/nenuco_colonia_spray.jpg',
      primary: '/products/cosmetics_baby/nenuco_colonia_spray.jpg',
      gallery: ['/products/cosmetics_baby/nenuco_colonia_spray.jpg']
    },
    details: {
      volume: '200 ml con Spray',
      material: 'Fórmula Original Hipoalergénica'
    },
    colors: ['Spray 200ml'],
    sizes: ['200ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-23',
    sku: 'EB-BEBE-23',
    slug: 'chicco-baby-moments-gel-de-bano-champu-suave-500ml',
    name: 'Chicco Baby Moments Gel de Baño y Champú Suave 500ml',
    brand: 'Chicco Baby Moments',
    category: 'MODA_INFANTIL',
    subcategory: 'Baño & Higiene Bebé',
    priceFCFA: 6000,
    originalPriceFCFA: 7500,
    price: 6000,
    price_fcfa: 6000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Fórmula delicada 2 en 1 sin lágrimas enriquecida con extracto de caléndula suavizante. Limpia la piel y el cabello fino del recién nacido manteniendo el pH fisiológico intacto.',
    images: {
      0: '/products/cosmetics_baby/chicco_gel_bano.jpg',
      primary: '/products/cosmetics_baby/chicco_gel_bano.jpg',
      gallery: ['/products/cosmetics_baby/chicco_gel_bano.jpg']
    },
    details: {
      volume: '500 ml con Dosificador',
      material: 'Caléndula Orgánica & 93% Ingredientes Naturales'
    },
    colors: ['Fórmula Sin Lágrimas'],
    sizes: ['500ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-24',
    sku: 'EB-BEBE-24',
    slug: 'chicco-baby-moments-crema-corporal-leche-almendras-500ml',
    name: 'Chicco Baby Moments Crema Corporal Hidratante con Leche de Almendras 500ml',
    brand: 'Chicco Baby Moments',
    category: 'MODA_INFANTIL',
    subcategory: 'Cuidado Cutáneo Bebé',
    priceFCFA: 6500,
    originalPriceFCFA: 8000,
    price: 6500,
    price_fcfa: 6500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'Loción hidratante enriquecida con leche de almendras dulces para un masaje nutritivo después del baño. Se absorbe rápidamente sin dejar residuo graso, previniendo la resequedad en la piel del bebé.',
    images: {
      0: '/products/cosmetics_baby/chicco_crema_corporal.jpg',
      primary: '/products/cosmetics_baby/chicco_crema_corporal.jpg',
      gallery: ['/products/cosmetics_baby/chicco_crema_corporal.jpg']
    },
    details: {
      volume: '500 ml',
      material: 'Leche de Almendras Dulces & Vitamina E'
    },
    colors: ['Botella 500ml con Dosificador'],
    sizes: ['500ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-25',
    sku: 'EB-BEBE-25',
    slug: 'chicco-pasta-balsamica-antirrozaduras-4-en-1-panal-100ml',
    name: 'Chicco Pasta Balsámica Antirrozaduras 4 en 1 para Cambio de Pañal 100ml',
    brand: 'Chicco Natural Sensation',
    category: 'MODA_INFANTIL',
    subcategory: 'Cuidado Cutáneo Bebé',
    priceFCFA: 5000,
    originalPriceFCFA: 6500,
    price: 5000,
    price_fcfa: 5000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Pomada protectora 4 en 1: previene irritaciones, protege contra la humedad del pañal, calma las rojeces desde la primera aplicación y regenera la piel con un 10% de óxido de zinc y pantenol.',
    images: {
      0: '/products/cosmetics_baby/chicco_pomada_panal.jpg',
      primary: '/products/cosmetics_baby/chicco_pomada_panal.jpg',
      gallery: ['/products/cosmetics_baby/chicco_pomada_panal.jpg']
    },
    details: {
      volume: '100 ml',
      material: 'Óxido de Zinc 10%, Pantenol & Manteca de Karité'
    },
    colors: ['Tubo 100ml'],
    sizes: ['100ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-26',
    sku: 'EB-BEBE-26',
    slug: 'chicco-talco-liquido-protector-almidon-tapioca-150ml',
    name: 'Chicco Talco Líquido Protector y Refrescante Baby Moments 150ml',
    brand: 'Chicco Baby Moments',
    category: 'MODA_INFANTIL',
    subcategory: 'Baño & Higiene Bebé',
    priceFCFA: 4800,
    originalPriceFCFA: 6000,
    price: 4800,
    price_fcfa: 4800,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'La seguridad del talco sin el riesgo de inhalación de polvos volátiles. Fórmula fluida con almidón de tapioca que absorbe el sudor en pliegues cutáneos dejando la piel seca, suave y protegida.',
    images: {
      0: '/products/cosmetics_baby/chicco_talco_liquido.jpg',
      primary: '/products/cosmetics_baby/chicco_talco_liquido.jpg',
      gallery: ['/products/cosmetics_baby/chicco_talco_liquido.jpg']
    },
    details: {
      volume: '150 ml',
      material: 'Almidón de Tapioca Natural & Pantenol'
    },
    colors: ['Talco Fluido 150ml'],
    sizes: ['150ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-27',
    sku: 'EB-BEBE-27',
    slug: 'chicco-portachupetes-doble-higienico-esterilizable',
    name: 'Chicco Portachupetes Doble Higiénico de Paseo Esterilizable',
    brand: 'Chicco Puericultura',
    category: 'MODA_INFANTIL',
    subcategory: 'Accesorios & Puericultura',
    priceFCFA: 4500,
    originalPriceFCFA: 5800,
    price: 4500,
    price_fcfa: 4500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Estuche compacto con dos compartimentos independientes para transportar 2 chupetes limpios o separar el usado del limpio. Se desmonta con facilidad y se puede esterilizar en caliente y en frío.',
    images: {
      0: '/products/cosmetics_baby/chicco_portachupetes.jpg',
      primary: '/products/cosmetics_baby/chicco_portachupetes.jpg',
      gallery: ['/products/cosmetics_baby/chicco_portachupetes.jpg']
    },
    details: {
      material: 'Polipropileno Libre de BPA 100% Seguro'
    },
    colors: ['Rosa Pastel', 'Azul Cielo', 'Blanco Perla'],
    sizes: ['Doble Compartimento'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-28',
    sku: 'EB-BEBE-28',
    slug: 'chicco-sujetachupetes-cadena-broche-pinza-seguridad',
    name: 'Chicco Sujetachupetes con Cadena y Broche Pinza de Seguridad',
    brand: 'Chicco Puericultura',
    category: 'MODA_INFANTIL',
    subcategory: 'Accesorios & Puericultura',
    priceFCFA: 3500,
    originalPriceFCFA: 4500,
    price: 3500,
    price_fcfa: 3500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Broche con pinza suave que se sujeta firmemente a la ropa del bebé sin dañar los tejidos. Evita que el chupete caiga al suelo, se ensucie o se pierda durante los paseos.',
    images: {
      0: '/products/cosmetics_baby/chicco_sujetachupetes.jpg',
      primary: '/products/cosmetics_baby/chicco_sujetachupetes.jpg',
      gallery: ['/products/cosmetics_baby/chicco_sujetachupetes.jpg']
    },
    details: {
      material: 'Cadena Flexible y Pinza con Bordes Redondeados Sin BPA'
    },
    colors: ['Rosa Suave', 'Azul Pastel', 'Verde Menta'],
    sizes: ['Medida Estándar'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-29',
    sku: 'EB-BEBE-29',
    slug: 'set-baberos-chicco-impermeables-silicona-algodon-pack-2x',
    name: 'Set de Baberos Chicco Impermeables de Silicona Suave & Algodón (Pack 2x)',
    brand: 'Chicco Baby Essentials',
    category: 'MODA_INFANTIL',
    subcategory: 'Alimentación & Lactancia',
    priceFCFA: 6000,
    originalPriceFCFA: 7800,
    price: 6000,
    price_fcfa: 6000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Dúo de baberos esenciales: uno en silicona grado alimentario con bolsillo recogemigas fácil de lavar con agua, y otro en suave rizo de algodón 100% con forro interior impermeable.',
    images: {
      0: '/products/cosmetics_baby/chicco_baberos.jpg',
      primary: '/products/cosmetics_baby/chicco_baberos.jpg',
      gallery: ['/products/cosmetics_baby/chicco_baberos.jpg']
    },
    details: {
      material: 'Silicona Alimentaria & Rizo de Algodón 100%'
    },
    colors: ['Pack Pastel Mixto', 'Pack Rosa', 'Pack Azul'],
    sizes: ['Pack 2 Unidades'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-30',
    sku: 'EB-BEBE-30',
    slug: 'biberon-chicco-naturalfeeling-250ml-tetina-inclinada-anticolicos',
    name: 'Biberón Chicco NaturalFeeling 250ml Flujo Medio con Tetina Inclinada',
    brand: 'Chicco NaturalFeeling',
    category: 'MODA_INFANTIL',
    subcategory: 'Alimentación & Lactancia',
    priceFCFA: 7500,
    originalPriceFCFA: 9500,
    price: 7500,
    price_fcfa: 7500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    featured: true,
    description: 'Biberón de diseño ergonómico con tetina inclinada de silicona efecto mamá que reproduce la forma natural del seno materno. Cuenta con doble válvula anticólicos para evitar gases y regurgitaciones.',
    images: {
      0: '/products/cosmetics_baby/chicco_biberon_tetinas.jpg',
      primary: '/products/cosmetics_baby/chicco_biberon_tetinas.jpg',
      gallery: ['/products/cosmetics_baby/chicco_biberon_tetinas.jpg']
    },
    details: {
      volume: '250 ml',
      material: 'Silicona Ultra-Suave & Biberón Libre de BPA'
    },
    colors: ['Neutro Transparente'],
    sizes: ['250ml (2m+)'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-31',
    sku: 'EB-BEBE-31',
    slug: 'chicco-cantimplora-termica-infantil-antigoteo-pajita-silicona',
    name: 'Chicco Cantimplora Térmica Infantil Antigoteo con Pajita de Silicona',
    brand: 'Chicco Termos',
    category: 'MODA_INFANTIL',
    subcategory: 'Alimentación & Lactancia',
    priceFCFA: 9000,
    originalPriceFCFA: 12000,
    price: 9000,
    price_fcfa: 9000,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Botella térmica de acero inoxidable con doble pared aislante que conserva la temperatura del agua o zumo fresca durante horas. Tapa abatible higiénica con pajita de silicona suave y cierre a prueba de fugas.',
    images: {
      0: '/products/cosmetics_baby/chicco_cantimplora.jpg',
      primary: '/products/cosmetics_baby/chicco_cantimplora.jpg',
      gallery: ['/products/cosmetics_baby/chicco_cantimplora.jpg']
    },
    details: {
      volume: '350 ml',
      material: 'Acero Inoxidable Grado Alimentario & Pajita de Silicona'
    },
    colors: ['Verde Selva', 'Rosa Aurora', 'Azul Océano'],
    sizes: ['350ml'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  },
  {
    id: 'ebna-bebe-32',
    sku: 'EB-BEBE-32',
    slug: 'chicco-dispensador-guardaleches-dosificador-leche-polvo-3-tomas',
    name: 'Chicco Dispensador y Guardaleches Dosificador de Leche en Polvo 3 Tomas',
    brand: 'Chicco Baby Feeding',
    category: 'MODA_INFANTIL',
    subcategory: 'Alimentación & Lactancia',
    priceFCFA: 5500,
    originalPriceFCFA: 7000,
    price: 5500,
    price_fcfa: 5500,
    inStock: true,
    in_stock: true,
    is_hidden: false,
    is_featured: false,
    description: 'Contenedor hermético apilable con 3 compartimentos medidores independientes para llevar las tomas exactas de leche en polvo o cereales. Boquilla vertedora precisa para rellenar el biberón en cualquier lugar.',
    images: {
      0: '/products/cosmetics_baby/chicco_guardaleches.jpg',
      primary: '/products/cosmetics_baby/chicco_guardaleches.jpg',
      gallery: ['/products/cosmetics_baby/chicco_guardaleches.jpg']
    },
    details: {
      volume: '3 Dosis Independientes (hasta 3 x 260ml)',
      material: 'Polipropileno Libre de BPA Apto Lavavajillas'
    },
    colors: ['Pastel Mint / Coral'],
    sizes: ['3 Tomas Apilables'],
    created_at: '2026-09-23T18:00:00.000Z',
    updated_at: '2026-09-23T18:00:00.000Z'
  }
];
