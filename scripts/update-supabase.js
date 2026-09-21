import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epifjpbwbnphlhhfhigm.supabase.co';
const supabaseAnonKey = 'sb_publishable_e1J-2BHSP9bAUT7IlI3o4w_cqUqSTRQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const productsToSync = [
  {
    id: 'user-attached-1',
    slug: generateSlug('Instituto Espanol Urea Locion Hidratante Avanzada 500ml'),
    name: 'Instituto Español Urea Loción Hidratante Avanzada 500ml',
    category: 'COSMETICA',
    description: 'Fórmula hidratante avanzada con 10% de Urea pura. Equilibra, regenera e hidrata profundamente la piel áspera o seca.',
    price: 8250,
    images: ['/products/user-product-9.jpg', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'user-attached-2',
    slug: generateSlug('Instituto Espanol Pieles Atopicas Champu Suave 300ml'),
    name: 'Instituto Español Pieles Atópicas Champú Suave 300ml',
    category: 'COSMETICA',
    description: 'Champú dermoprotector diseñado especialmente para cuero cabelludo sensible con tendencia atópica. 0% parabenos.',
    price: 7250,
    images: ['/products/user-product-10.jpg', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'user-attached-3',
    slug: generateSlug('Collagen Beauty Care Face Out Soap USA Orange'),
    name: 'Collagen Beauty Care Face Out Soap U.S.A. Orange',
    category: 'JABONES',
    description: 'Jabón aclarante concentrado con Colágeno activo y Naranja Vitamina C. Limpieza profunda y brillo radiante inmediato.',
    price: 3750,
    images: ['/products/user-product-7.jpg', 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'user-attached-4',
    slug: generateSlug('N1 Effaceur Turmeric Beauty Soap Scrub 200g'),
    name: 'N°1 Effaceur Turmeric Beauty Soap Scrub 200g',
    category: 'JABONES',
    description: 'Jabón exfoliante de cúrcuma natural anti-manchas y anti-acné. Elimina células muertas y atenúa marcas oscuras.',
    price: 4250,
    images: ['/products/user-product-8.jpg', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'user-attached-5',
    slug: generateSlug('Savon Eclaircissant Terminator a la Bave dEscargot 200g'),
    name: "Savon Éclaircissant Terminator à la Bave d'Escargot 200g",
    category: 'JABONES',
    description: "Jabón de bave d'escargot (baba de caracol) regenerador y aclarante. Suaviza cicatrices, manchas y unifica la piel.",
    price: 4750,
    images: ['/products/user-product-5.jpg', 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'user-real-1',
    slug: generateSlug('Vaseline Petroleum Jelly Pure Original EBNA'),
    name: 'Vaseline Petroleum Jelly Original EBNA 250ml',
    category: 'VASELINAS',
    description: 'Vaselina pura de hidratación profunda importada para EBNA Luxury. Edición especial protectora para piel seca.',
    price: 4750,
    images: ['/products/user-product-1.jpg', '/products/user-product-2.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-2',
    slug: generateSlug('Vaseline Cocoa Butter Intensive Care Jelly EBNA'),
    name: 'Vaseline Cocoa Butter Rich Jelly 250ml',
    category: 'VASELINAS',
    description: 'Enriquecida con manteca de cacao pura para dar un brillo radiante y suavidad prolongada a la piel morena.',
    price: 5500,
    images: ['/products/user-product-3.jpg', '/products/user-product-4.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-3',
    slug: generateSlug('Jabon Negro Tradicional Dudu Osun Luxury'),
    name: 'Dudu-Osun Jabón Negro Tradicional Africano 150g',
    category: 'JABONES',
    description: 'Jabón 100% natural con manteca de karité, aloe vera y ceniza de cacao. Tratamiento intensivo contra manchas y acné.',
    price: 3250,
    images: ['/products/user-product-5.jpg', '/products/user-product-6.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-4',
    slug: generateSlug('Kojie San Skin Lightening Soap Premium'),
    name: 'Kojie San Jabón Aclarante Ácido Kójico 135g',
    category: 'JABONES',
    description: 'Jabón aclarante original concentrado. Unifica el tono cutáneo y desvanece la hiperpigmentación corporal.',
    price: 4250,
    images: ['/products/user-product-7.jpg', '/products/user-product-8.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-5',
    slug: generateSlug('Fair and White Leche Corporal Aclaradora 500ml'),
    name: 'Fair & White Original Leche Corporal 500ml',
    category: 'COSMETICA',
    description: 'Fórmula exclusiva aclaradora intensiva enriquecida con Vitamina C para nutrir y suavizar melenas morenas.',
    price: 8000,
    images: ['/products/user-product-9.jpg', '/products/user-product-10.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-6',
    slug: generateSlug('Makari De Suisse Extreme Argan Carrot Lotion'),
    name: 'Makari De Suisse Extreme Loción Corporal 500ml',
    category: 'COSMETICA',
    description: 'Tratamiento de lujo suizo con aceite de argán y zanahoria. Ilumina y revitaliza profundamente la piel seca.',
    price: 17000,
    images: ['/products/user-product-11.jpg', '/products/user-product-12.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-7',
    slug: generateSlug('Johnsons Baby Bedtime Lotion 500ml Soft'),
    name: "Johnson's Baby Loción Relajante Lavanda 500ml",
    category: 'NIÑOS',
    description: 'Loción hidratante ultrasuave para bebés con extracto de lavanda NaturalCalm. Hipoalergénica.',
    price: 6750,
    images: ['/products/user-product-13.jpg', '/products/user-product-14.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-8',
    slug: generateSlug('Vicks VapoRub Pomada Descongestionante 100g'),
    name: 'Vicks VapoRub Pomada Analgésica Relief 100g',
    category: 'POMADAS',
    description: 'Pomada mentolada de alivio inmediato contra dolores musculares, tos y congestión respiratoria.',
    price: 4900,
    images: ['/products/user-product-15.jpg', '/products/user-product-16.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-9',
    slug: generateSlug('Vestido Satinado Zara Luxe Collection'),
    name: 'Vestido Satinado Noche Zara Luxe Edition',
    category: 'MODA',
    description: 'Diseño elegante satinado con corte fluido drapeado. Colección exclusiva Zara Woman traída por Syndy Luxury.',
    price: 14500,
    images: ['/products/user-product-17.jpg', '/products/user-product-18.jpg'],
    in_stock: true
  },
  {
    id: 'user-real-10',
    slug: generateSlug('Chandal Nike Tech Fleece Full Zip Original'),
    name: 'Chándal Nike Tech Fleece Conjunto Completo',
    category: 'MODA',
    description: 'Conjunto deportivo premium Nike Tech Fleece. Aislamiento térmico ultraligero de alta gama 100% Original.',
    price: 33000,
    images: ['/products/user-product-19.jpg', '/products/user-product-20.jpg'],
    in_stock: true
  },
  {
    id: 'vaseline-1',
    slug: generateSlug('Vaseline Original Pure Petroleum Jelly 250ml'),
    name: 'Vaseline Original Pure Petroleum Jelly 250ml',
    category: 'VASELINAS',
    description: 'La vaselina pura triple purificada icónica. Protege y cura la piel seca, grietas y labios agrietados.',
    price: 4750,
    images: ['/products/user-product-1.jpg', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'vaseline-2',
    slug: generateSlug('Vaseline Cocoa Butter Healing Jelly 250ml'),
    name: 'Vaseline Cocoa Butter Rich Conditioning Jelly 250ml',
    category: 'VASELINAS',
    description: 'Enriquecida con manteca de cacao pura. Nutre profundamente la piel, restaura el brillo natural de las pieles morenas.',
    price: 5500,
    images: ['/products/user-product-3.jpg', 'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'vaseline-3',
    slug: generateSlug('Vaseline Aloe Fresh Hydrating Jelly 250ml'),
    name: 'Vaseline Aloe Fresh Soothing Jelly 250ml',
    category: 'VASELINAS',
    description: 'Fórmula refrescante con extracto de Aloe Vera puro. Calma la piel irritada por el sol.',
    price: 5250,
    images: ['/products/user-product-2.jpg', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'vaseline-4',
    slug: generateSlug('Vaseline Lip Therapy Rosy Lips 20g'),
    name: 'Vaseline Lip Therapy Rosy Lips 20g',
    category: 'VASELINAS',
    description: 'Bálsamo labial con aceite de rosa y aceite de almendras. Hidratación profunda con brillo rosado natural.',
    price: 2750,
    images: ['/products/user-product-4.jpg', 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'vaseline-5',
    slug: generateSlug('Vaseline Intensive Care Cocoa Radiant Lotion 400ml'),
    name: 'Vaseline Intensive Care Cocoa Radiant Lotion 400ml',
    category: 'VASELINAS',
    description: 'Loción corporal fluida formulada con microgotas de Vaselina pura y Manteca de Cacao.',
    price: 4500,
    images: ['/products/user-product-3.jpg', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'jabones-1',
    slug: generateSlug('Dudu-Osun Original African Black Soap 150g'),
    name: 'Dudu-Osun Original African Black Soap 150g',
    category: 'JABONES',
    description: 'El legendario jabón negro africano hecho a mano con manteca de karité, aloe vera, jugo de limón y ceniza de cacao.',
    price: 3250,
    images: ['/products/user-product-5.jpg', 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'jabones-2',
    slug: generateSlug('Kojie San Skin Lightening Soap 135g'),
    name: 'Kojie San Skin Lightening Soap 135g',
    category: 'JABONES',
    description: 'Jabón aclarante original formulado con ácido kójico natural y aceite de coco.',
    price: 4250,
    images: ['/products/user-product-7.jpg', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'jabones-3',
    slug: generateSlug('Fair & White Gold Satin Exfoliating Soap 200g'),
    name: 'Fair & White Gold 2 Satin Exfoliating Soap 200g',
    category: 'JABONES',
    description: 'Jabón exfoliante de lujo con microesferas de albaricoque. Elimina células muertas.',
    price: 3125,
    images: ['/products/user-product-6.jpg', 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'cremas-1',
    slug: generateSlug('Fair & White Original Body Lotion Dark Spot Corrector 500ml'),
    name: 'Fair & White Original Body Lotion 500ml',
    category: 'COSMETICA',
    description: 'Leche corporal aclarante intensiva con vitamina C. Diseñada para unificar y nutrir pieles morenas.',
    price: 8000,
    images: ['/products/user-product-9.jpg', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'cremas-2',
    slug: generateSlug('Makari De Suisse Extreme Argan & Carrot Oil Lotion 500ml'),
    name: 'Makari De Suisse Extreme Argan & Carrot Oil 500ml',
    category: 'COSMETICA',
    description: 'Fórmula de lujo suiza enriquecida con aceite de argán, zanahoria y Organiclarine.',
    price: 17000,
    images: ['/products/user-product-11.jpg', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'cremas-3',
    slug: generateSlug('Caro White Lightening Beauty Cream 300ml'),
    name: 'Caro White Lightening Beauty Cream 300ml',
    category: 'COSMETICA',
    description: 'Crema rica en aceite de zanahoria y vitaminas A y E. Trata hiperpigmentaciones profundas.',
    price: 3750,
    images: ['/products/user-product-12.jpg', 'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'ninos-1',
    slug: generateSlug('Johnsons Baby Bedtime Lotion Lavender 500ml'),
    name: "Johnson's Baby Bedtime Lotion Lavender 500ml",
    category: 'NIÑOS',
    description: 'Loción hidratante relajante con esencia de lavanda y manzanilla NaturalCalm. Ayuda a dormir al bebé.',
    price: 6750,
    images: ['/products/user-product-13.jpg', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'ninos-2',
    slug: generateSlug('Mustela Baby Gentle Cleansing Gel 500ml'),
    name: 'Mustela Baby Gentle Cleansing Gel 500ml',
    category: 'NIÑOS',
    description: 'Gel de baño suave para piel sensible de bebés y niños con Aguacate Perseose orgánico. Hipoalergénico.',
    price: 4875,
    images: ['/products/user-product-14.jpg', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'pomadas-1',
    slug: generateSlug('Vicks VapoRub Ointment Relief 100g'),
    name: 'Vicks VapoRub Ointment Relief 100g',
    category: 'POMADAS',
    description: 'Pomada mentolada analgésica y descongestionante. Alivia la tos y dolores musculares.',
    price: 4900,
    images: ['/products/user-product-15.jpg', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'pomadas-2',
    slug: generateSlug('Tiger Balm Red Extra Strength Ointment 30g'),
    name: 'Tiger Balm Red Extra Strength Ointment 30g',
    category: 'POMADAS',
    description: 'La pomada herbal bálsamo de tigre roja concentrada con alcanfor y clavo. Alivia dolores articulares.',
    price: 2125,
    images: ['/products/user-product-16.jpg', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'moda-1',
    slug: generateSlug('Vestido Satinado de Noche Zara Luxe Edition'),
    name: 'Vestido Satinado de Noche Zara Luxe Edition',
    category: 'MODA',
    description: 'Confeccionado en tejido satinado fluido verde esmeralda con escote drapeado cowl. Colección Zara Woman.',
    price: 14500,
    images: ['/products/user-product-17.jpg', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'moda-2',
    slug: generateSlug('Chandal Nike Tech Fleece Full Zip Conjunto'),
    name: 'Chándal Nike Tech Fleece Full-Zip Conjunto',
    category: 'MODA',
    description: 'Conjunto deportivo de chaqueta con capucha y pantalón jogger ajustado. 100% Original Nike.',
    price: 33000,
    images: ['/products/user-product-19.jpg', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'perfumes-1',
    slug: generateSlug('Chanel N° 5 Eau de Parfum 100ml'),
    name: 'Chanel N° 5 Eau de Parfum 100ml',
    category: 'COSMETICA',
    description: 'La esencia misma de la feminidad. Un ramo floral aldehído atemporal sublimado por un frasco icónico.',
    price: 51000,
    images: ['/products/user-product-18.jpg', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'perfumes-2',
    slug: generateSlug('Dior Sauvage Elixir 60ml'),
    name: 'Dior Sauvage Elixir 60ml',
    category: 'COSMETICA',
    description: 'Una fragancia de concentración extrema donde la frescura del pomelo y las especias se funden con lavanda salvaje.',
    price: 54000,
    images: ['/products/user-product-20.jpg', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  },
  {
    id: 'accesorios-1',
    slug: generateSlug('Bolso Gucci GG Marmont Matelasse'),
    name: 'Bolso de Mano Gucci GG Marmont Matelassé',
    category: 'ACCESORIOS',
    description: 'Elaborado en Italia con suave piel acolchada matelassé marfil con el icónico aplique de la doble G.',
    price: 75000,
    images: ['/products/user-product-17.jpg', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'],
    in_stock: true
  }
];

async function sync() {
  console.log('Upserting products to Supabase with halved prices...');
  for (const item of productsToSync) {
    const itemToUpsert = {
      ...item,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const { error } = await supabase.from('products').upsert(itemToUpsert, { onConflict: 'id' });
    if (error) {
      console.error(`Error upserting ${item.id}:`, error);
    } else {
      console.log(`Successfully synced ${item.id} - ${item.name} (${item.price} FCFA)`);
    }
  }

  // Check total items in Supabase
  const { data } = await supabase.from('products').select('id, name, price');
  console.log(`Total products in Supabase now: ${data ? data.length : 0}`);
}

sync().catch(console.error);
