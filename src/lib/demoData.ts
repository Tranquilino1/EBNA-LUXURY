import type { Product } from '../types';
import { generateSlug } from './utils';

export let DEMO_PRODUCTS: Product[] = [
  // ==========================================
  // 1. SECCIÓN VASELINAS (Vaseline Official Line)
  // ==========================================
  {
    id: 'vaseline-1',
    slug: generateSlug('Vaseline Pure Petroleum Jelly Original 250ml'),
    name: 'Vaseline Original Pure Petroleum Jelly 250ml',
    category: 'VASELINAS',
    description: 'La vaselina pura triple purificada icónica. Protege y cura la piel seca, grietas y labios agrietados. Marca oficial importada.',
    price: 9500, // $7 * 600 * 2 = 8,400 -> 9,500 FCFA
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'vaseline-2',
    slug: generateSlug('Vaseline Cocoa Butter Healing Jelly 250ml'),
    name: 'Vaseline Cocoa Butter Rich Conditioning Jelly 250ml',
    category: 'VASELINAS',
    description: 'Enriquecida con manteca de cacao pura. Nutre profundamente la piel, restaura el brillo natural de las pieles morenas y secas.',
    price: 11000, // $8.5 * 600 * 2 = 10,200 -> 11,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'vaseline-3',
    slug: generateSlug('Vaseline Aloe Fresh Hydrating Jelly 250ml'),
    name: 'Vaseline Aloe Fresh Soothing Jelly 250ml',
    category: 'VASELINAS',
    description: 'Fórmula refrescante con extracto de Aloe Vera puro. Calma la piel irritada por el sol y mantiene la humedad sin sensación pesada.',
    price: 10500,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'vaseline-4',
    slug: generateSlug('Vaseline Lip Therapy Rosy Lips 20g'),
    name: 'Vaseline Lip Therapy Rosy Lips 20g',
    category: 'VASELINAS',
    description: 'Bálsamo labial con aceite de rosa y aceite de almendras. Proporciona hidratación profunda con un toque de brillo rosado natural.',
    price: 5500,
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'vaseline-5',
    slug: generateSlug('Vaseline Intensive Care Cocoa Radiant Lotion 400ml'),
    name: 'Vaseline Intensive Care Cocoa Radiant Lotion 400ml',
    category: 'VASELINAS',
    description: 'Loción corporal fluida formulada con microgotas de Vaselina pura y Manteca de Cacao. Absorción rápida sin grasitud.',
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'vaseline-6',
    slug: generateSlug('Vaseline Baby Healing Jelly Gentle Pure 368g'),
    name: 'Vaseline Baby Pure Petroleum Jelly 368g',
    category: 'VASELINAS',
    description: 'Formulada especialmente para la piel sensible de bebés. Previene y trata la irritación del pañal formando una barrera protectora suave.',
    price: 14000,
    images: [
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ==========================================
  // 2. SECCIÓN JABONES
  // ==========================================
  {
    id: 'jabones-1',
    slug: generateSlug('Dudu-Osun Original African Black Soap 150g'),
    name: 'Dudu-Osun Original African Black Soap 150g',
    category: 'JABONES',
    description: 'El legendario jabón negro africano hecho a mano con manteca de karité, aloe vera, jugo de limón y ceniza de vaina de cacao. Limpia impurezas y acné.',
    price: 6500, // $5 * 600 * 2 = 6,000 -> 6,500 FCFA
    images: [
      'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'jabones-2',
    slug: generateSlug('Kojie San Skin Lightening Soap 135g'),
    name: 'Kojie San Skin Lightening Soap 135g',
    category: 'JABONES',
    description: 'Jabón aclarante original formulado con ácido kójico natural y aceite de coco. Reduce manchas oscuras, hiperpigmentación y unifica el tono.',
    price: 8500,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'jabones-3',
    slug: generateSlug('Fair & White Gold Satin Exfoliating Soap 200g'),
    name: 'Fair & White Gold 2 Satin Exfoliating Soap 200g',
    category: 'JABONES',
    description: 'Jabón exfoliante de lujo con microesferas de albaricoque. Elimina células muertas y deja la piel radiante y perfumada.',
    price: 12500,
    images: [
      'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'jabones-4',
    slug: generateSlug('Dove Beauty Cream Bar Pack 4'),
    name: 'Dove Beauty Cream Bar Original (Pack de 4)',
    category: 'JABONES',
    description: 'Contiene 1/4 de crema humectante suave. No reseca la piel como los jabones comunes. Piel tersa, suave y radiante.',
    price: 9800,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ==========================================
  // 3. SECCIÓN CREMAS PARA PIELES NEGRAS & COSMÉTICA
  // ==========================================
  {
    id: 'cremas-1',
    slug: generateSlug('Fair & White Original Body Lotion Dark Spot Corrector 500ml'),
    name: 'Fair & White Original Body Lotion 500ml',
    category: 'COSMETICA',
    description: 'Leche corporal aclarante intensiva con hidroquinona suave y vitamina C. Diseñada para unificar y nutrir melenas oscuras y morenas.',
    price: 32000, // $26 * 600 * 2 = 31,200 -> 32,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'cremas-2',
    slug: generateSlug('Makari De Suisse Extreme Argan & Carrot Oil Lotion 500ml'),
    name: 'Makari De Suisse Extreme Argan & Carrot Oil 500ml',
    category: 'COSMETICA',
    description: 'Fórmula de lujo suiza enriquecida con aceite de argán, zanahoria y Organiclarine. Aporta un brillo dorado espectacular.',
    price: 68000, // $55 * 600 * 2 = 66,000 -> 68,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'cremas-3',
    slug: generateSlug('Caro White Lightening Beauty Cream 300ml'),
    name: 'Caro White Lightening Beauty Cream 300ml',
    category: 'COSMETICA',
    description: 'Crema rica en aceite de zanahoria y vitaminas A y E. Trata hiperpigmentaciones profundas y codos o rodillas oscurecidas.',
    price: 15000,
    images: [
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 13).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'cremas-4',
    slug: generateSlug('Palmers Cocoa Butter Formula Lotion 400ml'),
    name: "Palmer's Cocoa Butter Daily Skin Therapy 400ml",
    category: 'COSMETICA',
    description: 'Crema corporal ultrahidratante con Cacao puro y Vitamina E. Previene estrías y suaviza cicatrices y marcas.',
    price: 16500,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'cremas-5',
    slug: generateSlug('Nivea Rich Nourishing Body Milk 400ml'),
    name: 'Nivea Soft & Rich Nourishing Milk 400ml',
    category: 'COSMETICA',
    description: 'Enriquecida con Suero de Hidratación Profunda y Aceite de Almendras. 48 horas de hidratación continua para pieles muy secas.',
    price: 14500,
    images: [
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ==========================================
  // 4. SECCIÓN NIÑOS & BEBÉS
  // ==========================================
  {
    id: 'ninos-1',
    slug: generateSlug('Johnsons Baby Bedtime Lotion Lavender 500ml'),
    name: "Johnson's Baby Bedtime Lotion Lavender 500ml",
    category: 'NIÑOS',
    description: 'Loción hidratante relajante con esencia de lavanda y manzanilla NaturalCalm. Ayuda a dormir al bebé profundamente.',
    price: 13500,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ninos-2',
    slug: generateSlug('Mustela Baby Gentle Cleansing Gel 500ml'),
    name: 'Mustela Baby Gentle Cleansing Gel 500ml',
    category: 'NIÑOS',
    description: 'Gel de baño suave para piel sensible de bebés y niños con Aguacate Perseose orgánico. Fórmula hipoalergénica sin lágrimas.',
    price: 19500,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ninos-3',
    slug: generateSlug('Aveeno Baby Daily Moisture Lotion Oat Extract 354ml'),
    name: 'Aveeno Baby Daily Moisture Lotion Oat 354ml',
    category: 'NIÑOS',
    description: 'Formulada con Harina de Avena Coloidal natural. Mantiene la hidratación de la piel del bebé durante 24 horas sin fragancias fuertes.',
    price: 17500,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ==========================================
  // 5. SECCIÓN POMADAS & TRATAMIENTOS
  // ==========================================
  {
    id: 'pomadas-1',
    slug: generateSlug('Vicks VapoRub Ointment Relief 100g'),
    name: 'Vicks VapoRub Ointment Relief 100g',
    category: 'POMADAS',
    description: 'Pomada mentolada analgésica y descongestionante. Alivia la tos, dolores musculares y congestión nasal rápidamente.',
    price: 9800,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 19).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'pomadas-2',
    slug: generateSlug('Tiger Balm Red Extra Strength Ointment 30g'),
    name: 'Tiger Balm Red Extra Strength Ointment 30g',
    category: 'POMADAS',
    description: 'La pomada herbal bálsamo de tigre roja concentrada con alcanfor y clavo. Alivia dolores articulares y contracturas musculares.',
    price: 8500,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'pomadas-3',
    slug: generateSlug('Bepanthen Protective Baby Care Ointment 100g'),
    name: 'Bepanthen Protective Care Ointment 100g',
    category: 'POMADAS',
    description: 'Pomada regeneradora con Provitamina B5 (Dexpantenol). Trata quemaduras leves, grietas en la piel y dermatitis.',
    price: 15500,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ==========================================
  // 6. SECCIÓN MODA REAL (Zara, Shein, Nike, Adidas)
  // ==========================================
  {
    id: 'moda-1',
    slug: generateSlug('Vestido Satinado de Noche Zara Luxe Edition'),
    name: 'Vestido Satinado de Noche Zara Luxe Edition',
    category: 'MODA',
    description: 'Confeccionado en tejido satinado fluido verde esmeralda con escote drapeado cowl y espalda descubierta con tirantes finos. Colección Zara Woman.',
    price: 58000, // $48 * 600 * 2 = 57,600 -> 58,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'moda-2',
    slug: generateSlug('Chandal Nike Tech Fleece Full Zip Conjunto'),
    name: 'Chándal Nike Tech Fleece Full-Zip Conjunto',
    category: 'MODA',
    description: 'Conjunto deportivo de chaqueta con capucha y pantalón jogger ajustado. Tejido térmico ultra ligero que retiene el calor sin pesar. 100% Original Nike.',
    price: 132000, // $110 * 600 * 2 = 132,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'moda-3',
    slug: generateSlug('Chandal Adidas Originals Adicolor 3 Stripes'),
    name: 'Chándal Adidas Originals Adicolor 3-Stripes',
    category: 'MODA',
    description: 'Icono del streetwear urbano. Chaqueta clásica con cremallera completa y pantalón con las 3 bandas laterales bordadas. Colección Adidas Originals.',
    price: 114000, // $95 * 600 * 2 = 114,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'moda-4',
    slug: generateSlug('Vestido Cut-Out Estampado Shein Premium'),
    name: 'Vestido Cut-Out Estampado Shein Premium',
    category: 'MODA',
    description: 'Vestido largo playero con aperturas laterales cut-out, falda fluida plisada y estampado tropical rosa y dorado.',
    price: 36000, // $30 * 600 * 2 = 36,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'moda-5',
    slug: generateSlug('Abrigo Largo de Lana Camel Mango Atelier'),
    name: 'Abrigo Largo de Lana Camel Mango Atelier',
    category: 'MODA',
    description: 'Abrigo sofisticado cruzado con mezcla de lana noble, solapas muesca anchas y cinturón ajustable del mismo tejido.',
    price: 144000, // $120 * 600 * 2 = 144,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ==========================================
  // 7. SECCIÓN PERFUMES DE LUJO REALES
  // ==========================================
  {
    id: 'perfumes-1',
    slug: generateSlug('Chanel N° 5 Eau de Parfum 100ml'),
    name: 'Chanel N° 5 Eau de Parfum 100ml',
    category: 'COSMETICA',
    description: 'La esencia misma de la feminidad. Un ramo floral aldehído atemporal sublimado por un frasco icónico con líneas puras.',
    price: 204000, // $170 * 600 * 2 = 204,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 27).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'perfumes-2',
    slug: generateSlug('Dior Sauvage Elixir Perfume 60ml'),
    name: 'Dior Sauvage Elixir 60ml',
    category: 'COSMETICA',
    description: 'Una fragancia de concentración extrema donde la frescura del pomelo y las especias se funden con un corazón de lavanda salvaje.',
    price: 216000, // $180 * 600 * 2 = 216,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'perfumes-3',
    slug: generateSlug('Victorias Secret Bombshell Eau de Parfum 100ml'),
    name: "Victoria's Secret Bombshell 100ml",
    category: 'COSMETICA',
    description: 'La fragancia N° 1 de América. Mezcla glamurosa de peonías recién cortadas, orquídea de vainilla y maracuyá morada vibrante.',
    price: 90000, // $75 * 600 * 2 = 90,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 29).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'perfumes-4',
    slug: generateSlug('Creed Aventus Royal EDP 100ml'),
    name: 'Creed Aventus Royal EDP 100ml',
    category: 'COSMETICA',
    description: 'Fragancia de culto celebrada por su vitalidad y elegancia. Notas vivaces de piña madura, grosella negra, abedul ahumado y pachulí.',
    price: 384000, // $320 * 600 * 2 = 384,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ==========================================
  // 8. SECCIÓN ACCESORIOS & BOLSOS DE LUJO
  // ==========================================
  {
    id: 'accesorios-1',
    slug: generateSlug('Bolso Gucci GG Marmont Matelasse'),
    name: 'Bolso de Mano Gucci GG Marmont Matelassé',
    category: 'ACCESORIOS',
    description: 'Elaborado en Italia con suave piel acolchada matelassé marfil con el icónico aplique de la doble G en dorado envejecido.',
    price: 300000, // $250 * 600 * 2 = 300,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 31).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'accesorios-2',
    slug: generateSlug('Tacones Christian Louboutin So Kate 120mm'),
    name: 'Tacones Christian Louboutin So Kate 120mm',
    category: 'ACCESORIOS',
    description: 'El stiletto por excelencia. Piel de charol negro brillante con puntera afilada y la legendaria suela roja lacada.',
    price: 336000, // $280 * 600 * 2 = 336,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'accesorios-3',
    slug: generateSlug('Gafas de Sol Ray-Ban Aviator Classic Gold'),
    name: 'Gafas de Sol Ray-Ban Aviator Classic',
    category: 'ACCESORIOS',
    description: 'Las gafas que definieron el estilo atemporal. Montura metálica dorada de gota de agua con lentes de cristal verde G-15.',
    price: 108000, // $90 * 600 * 2 = 108,000 FCFA
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 33).toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// Local Storage Helper for Demo Mode
export const getStoredProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem('ebna_products_storage');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading stored products', e);
  }
  return DEMO_PRODUCTS;
};

export const saveStoredProducts = (products: Product[]) => {
  try {
    localStorage.setItem('ebna_products_storage', JSON.stringify(products));
    localStorage.setItem('ebna_offline_products_cache', JSON.stringify(products));
  } catch (e) {
    console.error('Error saving stored products', e);
  }
};

export const demoGetProducts = async (): Promise<Product[]> => {
  return getStoredProducts();
};

export const demoAddProduct = async (productData: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
  const current = getStoredProducts();
  const newProduct: Product = {
    ...productData,
    id: `demo-${Date.now()}`,
    slug: generateSlug(productData.name),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const updated = [newProduct, ...current];
  saveStoredProducts(updated);
  return newProduct;
};

export const demoUpdateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const current = getStoredProducts();
  const index = current.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Product not found');
  
  const updatedProduct = {
    ...current[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  current[index] = updatedProduct;
  saveStoredProducts(current);
  return updatedProduct;
};

export const demoDeleteProduct = async (id: string): Promise<void> => {
  const current = getStoredProducts();
  const filtered = current.filter(p => p.id !== id);
  saveStoredProducts(filtered);
};

export const demoSignIn = async (email: string, _password: string): Promise<{ data: any; error: any }> => {
  const isAdminUser = email.toLowerCase() === 'admin@ebna.com' || email.toLowerCase().includes('admin');
  const user = { id: isAdminUser ? 'admin-user-id' : 'demo-user-id', email };
  const profile: Product extends any ? any : never = {
    id: user.id,
    full_name: isAdminUser ? 'Administrador EBNA' : 'Cliente EBNA',
    phone: '+240 222 633 687',
    role: isAdminUser ? 'ADMIN' : 'USER',
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString()
  };
  localStorage.setItem('demo_user', JSON.stringify(user));
  localStorage.setItem(`demo_profile_${user.id}`, JSON.stringify(profile));
  return { data: { user }, error: null };
};

export const demoSignUp = async (email: string, _password: string, fullName: string, phone: string): Promise<{ data: any; error: any }> => {
  const user = { id: `user-${Date.now()}`, email };
  const profile = {
    id: user.id,
    full_name: fullName || 'Cliente EBNA',
    phone: phone || '',
    role: 'USER',
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString()
  };
  localStorage.setItem('demo_user', JSON.stringify(user));
  localStorage.setItem(`demo_profile_${user.id}`, JSON.stringify(profile));
  return { data: { user }, error: null };
};
