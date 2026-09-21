const fs = require('fs');
const path = require('path');

const clothingDir = path.join(__dirname, '../public/products/dataset_clothing/dataset_clothing_images-main');
const sheinCsvPath = path.join(__dirname, '../public/products/shein_dataset/Shein-dataset-samples-main/shein-products.csv');
const outputPath = path.join(__dirname, '../src/lib/demoData.ts');

// 1. WhatsApp & Priority User Items (Precios reducidos al 50% en FCFA)
const priorityProducts = [
  {
    id: 'a1111111-1111-4111-8111-111111111101',
    slug: 'instituto-espanol-urea-locion-hidratante-avanzada-500ml',
    name: 'Instituto Español Urea Loción Hidratante Avanzada 500ml',
    category: 'COSMETICA',
    description: 'Fórmula hidratante avanzada con 10% de Urea pura. Equilibra, regenera e hidrata profundamente la piel áspera o seca.',
    price: 4125,
    images: ['/products/user-product-9.jpg', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'a1111111-1111-4111-8111-111111111102',
    slug: 'instituto-espanol-pieles-atopicas-champu-suave-300ml',
    name: 'Instituto Español Pieles Atópicas Champú Suave 300ml',
    category: 'COSMETICA',
    description: 'Champú dermoprotector diseñado especialmente para cuero cabelludo sensible con tendencia atópica. 0% parabenos.',
    price: 3625,
    images: ['/products/user-product-10.jpg', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    in_stock: true,
    created_at: new Date(Date.now() - 60000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'a1111111-1111-4111-8111-111111111103',
    slug: 'collagen-beauty-care-face-out-soap-usa-orange',
    name: 'Collagen Beauty Care Face Out Soap U.S.A. Orange',
    category: 'JABONES',
    description: 'Jabón aclarante concentrado con Colágeno activo y Naranja Vitamina C. Limpieza profunda y brillo radiante inmediato.',
    price: 1875,
    images: ['/products/user-product-7.jpg', 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'],
    in_stock: true,
    created_at: new Date(Date.now() - 120000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'a1111111-1111-4111-8111-111111111104',
    slug: 'n1-effaceur-turmeric-beauty-soap-scrub-200g',
    name: 'N°1 Effaceur Turmeric Beauty Soap Scrub 200g',
    category: 'JABONES',
    description: 'Jabón exfoliante de cúrcuma natural anti-manchas y anti-acné. Elimina células muertas y atenúa marcas oscuras.',
    price: 2125,
    images: ['/products/user-product-8.jpg', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'],
    in_stock: true,
    created_at: new Date(Date.now() - 180000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'a1111111-1111-4111-8111-111111111105',
    slug: 'savon-eclaircissant-terminator-a-la-bave-descargot-200g',
    name: "Savon Éclaircissant Terminator à la Bave d'Escargot 200g",
    category: 'JABONES',
    description: "Jabón de bave d'escargot (baba de caracol) regenerador y aclarante. Suaviza cicatrices, manchas y unifica la piel.",
    price: 2375,
    images: ['/products/user-product-5.jpg', 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'],
    in_stock: true,
    created_at: new Date(Date.now() - 240000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'b2222222-2222-4222-8222-222222222201',
    slug: 'vaseline-petroleum-jelly-original-ebna-250ml',
    name: 'Vaseline Petroleum Jelly Original EBNA 250ml',
    category: 'VASELINAS',
    description: 'Vaselina pura de hidratación profunda importada para EBNA Luxury. Edición especial protectora para piel seca.',
    price: 2375,
    images: ['/products/user-product-1.jpg', '/products/user-product-2.jpg'],
    in_stock: true,
    created_at: new Date(Date.now() - 300000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'b2222222-2222-4222-8222-222222222202',
    slug: 'vaseline-cocoa-butter-rich-jelly-250ml',
    name: 'Vaseline Cocoa Butter Rich Jelly 250ml',
    category: 'VASELINAS',
    description: 'Enriquecida con manteca de cacao pura para dar un brillo radiante y suavidad prolongada a la piel morena.',
    price: 2750,
    images: ['/products/user-product-2.jpg', '/products/user-product-1.jpg'],
    in_stock: true,
    created_at: new Date(Date.now() - 360000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'b2222222-2222-4222-8222-222222222203',
    slug: 'crema-corporal-nutritiva-piel-negra-cocoa-shea',
    name: 'Crema Corporal Nutritiva Piel Negra Cocoa & Shea 400ml',
    category: 'COSMETICA',
    description: 'Crema ultra rica formulada especialmente para nutrir e iluminar la piel morena y oscura con manteca de karité y cacao puro.',
    price: 3250,
    images: ['/products/user-product-3.jpg', '/products/user-product-4.jpg'],
    in_stock: true,
    created_at: new Date(Date.now() - 420000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'b2222222-2222-4222-8222-222222222204',
    slug: 'pomada-reparadora-dermatologica-skin-protect-100g',
    name: 'Pomada Reparadora Dermatológica Skin Protect 100g',
    category: 'POMADAS',
    description: 'Pomada médica curativa con óxido de zinc y provitamina B5. Alivia irritaciones, rozaduras y calma pieles delicadas.',
    price: 1950,
    images: ['/products/user-product-6.jpg', '/products/user-product-5.jpg'],
    in_stock: true,
    created_at: new Date(Date.now() - 480000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'b2222222-2222-4222-8222-222222222205',
    slug: 'set-infantil-crema-y-jabon-suave-ninos-baby-gentle',
    name: 'Set Infantil Crema & Jabón Suave Niños Baby Gentle 250ml',
    category: 'NIÑOS',
    description: 'Fórmula hipoalergénica sin lágrimas para recién nacidos y niños. Hidratación suave con manzanilla y avena orgánica.',
    price: 3800,
    images: ['/products/user-product-9.jpg', '/products/user-product-10.jpg'],
    in_stock: true,
    created_at: new Date(Date.now() - 540000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

// 2. Local Clothing Dataset Products (dataset_clothing_images-main)
const clothingCategoriesMap = {
  dress: {
    category: 'MODA',
    names: [
      'Vestido Elegante de Noche Zara Style Silk',
      'Vestido Midi Satinado Glamour Night',
      'Vestido Bodycon Chic Black Lace',
      'Vestido Floral Summer Breeze Chic',
      'Vestido Plisado Haute Couture EBNA',
      'Vestido Corto Satin Pink Elegance',
      'Vestido de Gala Velvet Emerald',
      'Vestido Casual Algodón Soft Touch',
      'Vestido Maxi Bohemian Sunset',
      'Vestido Ajustado Party Sparkle',
      'Vestido Sastre Executive Woman',
      'Vestido Asimétrico Avant-Garde',
      'Vestido de Coctel Rose Gold',
      'Vestido Minimalist White Linen',
      'Vestido Drapeado Silk Touch'
    ],
    prices: [11500, 14500, 16000, 9500, 19500, 12500, 22000, 8500, 15000, 13500, 17500, 16500, 18000, 10500, 14000]
  },
  hat: {
    category: 'ACCESORIOS',
    names: [
      'Sombrero Fedora Wool Felt Luxury',
      'Gorra Nike Sportswear Dri-FIT Urban',
      'Sombrero de Sol Natural Raffia Wide Brim',
      'Boina Francesa Chic Cashmere',
      'Gorro Tejido Winter Warm Fleece',
      'Gorra Adidas Performance Athletic',
      'Sombrero Vintage Panama Collection',
      'Gorra Streetwear Embroidered Logo',
      'Sombrero Bucket Hat Satin Finish',
      'Gorro Beanie Oversized Knit'
    ],
    prices: [4500, 3500, 5500, 4800, 3200, 3800, 6500, 3000, 4200, 2900]
  },
  longsleeve: {
    category: 'MODA',
    names: [
      'Camisa Manga Larga Silk Touch Zara',
      'Blusa Elegante Satin Executive',
      'Suéter Fino Knitwear Autumn Soft',
      'Top Manga Larga Fitted Ribbed',
      'Camiseta Manga Larga Nike Tech Fleece',
      'Blusa Transparente Evening Glam',
      'Suéter Oversized Cashmere Blend',
      'Camisa Denim Western Luxury',
      'Top Ajustado Cut-Out Silhouette',
      'Blusa de Seda Estampada Floral',
      'Camisa de Lino Casual White',
      'Suéter Cuello Alto Chic Winter',
      'Blusa Manga Larga Lace Accent',
      'Camisa de Viste Slim Fit Premium',
      'Suéter Deportivo Adidas Originals'
    ],
    prices: [7500, 8900, 10500, 6200, 12500, 7800, 14500, 9500, 6800, 11000, 8200, 11800, 7900, 9800, 10200]
  },
  outwear: {
    category: 'MODA',
    names: [
      'Abrigo Blazer Executive Gold Button',
      'Cazadora de Cuero Italian Leather Jacket',
      'Chaqueta Deportiva Nike Windrunner',
      'Chaqueta Bomber Satin Oversized',
      'Abrigo Largo Winter Wool Blend',
      'Chaqueta Denim Vintage Wash Zara',
      'Trench Coat Clasico Double Breasted',
      'Chaqueta Acolchada Puffer Jacket',
      'Blazer Vestir Oversized Fit',
      'Chaqueta Adidas Sport Luxe',
      'Abrigo Corto Faux Fur Elegance',
      'Chaqueta de Gamusa Luxury Touch'
    ],
    prices: [18500, 24500, 15500, 13800, 28000, 14200, 22500, 16900, 17500, 14900, 21000, 19800]
  },
  pants: {
    category: 'MODA',
    names: [
      'Pantalón Vestir Tailored Executive',
      'Jeans High Waist Stretch Zara Denim',
      'Pantalón Palazzo Satin Wave',
      'Pantalón Cargo Streetwear Multi-Pocket',
      'Jogger Fit Nike Tech Fleece',
      'Jeans Wide Leg Vintage Blue',
      'Pantalón de Cuero Skinny Fit Luxury',
      'Pantalón de Lino Casual Summer',
      'Jeans Slim Fit Adidas Originals',
      'Pantalón Ajustado Seamless Ribbed',
      'Pantalón Plisado Fluid Silhouette',
      'Jeans Flare Retro 70s Style'
    ],
    prices: [9500, 11800, 13500, 10500, 12900, 12200, 15800, 8900, 11000, 7800, 12500, 11900]
  },
  shirt: {
    category: 'MODA',
    names: [
      'Camisa Oxford Cotton Classic White',
      'Camisa Estampada Silk Pattern Zara',
      'Camisa Casual Linen Breeze Summer',
      'Blusa Formal Slim Silhouette Executive',
      'Camisa Satinada Night Out Glamour',
      'Camisa Oversized Boyfriend Style',
      'Blusa de Seda V-Neck Elegant',
      'Camisa Denim Light Wash Casual',
      'Camisa Rayada Poplin Modern Fit',
      'Blusa de Encaje Romantic Chic'
    ],
    prices: [8200, 9900, 8500, 9200, 10800, 7900, 11500, 8800, 7500, 9500]
  },
  shoes: {
    category: 'MODA',
    names: [
      'Stilettos Elegantes Glamour Heels Gold',
      'Zapatillas Nike Air Max Streetwear',
      'Mocasines Leather Classic Italian',
      'Sandalias de Tacón High Heel Satin',
      'Botines de Cuero Ankle Boots Black',
      'Zapatillas Adidas Forum Low Chic',
      'Tacones Platform Velvet Party',
      'Zapatillas Running Ultralight Mesh',
      'Sandalias Plana Leather Comfort',
      'Botas Altas Knee-High Elegance'
    ],
    prices: [14500, 16800, 18500, 13900, 21000, 15900, 17200, 12800, 9500, 24000]
  },
  shorts: {
    category: 'MODA',
    names: [
      'Shorts Denim High Waist Vintage Wash',
      'Bermuda Sartorial Lino Tailored',
      'Shorts Deportivos Nike Pro Athletic',
      'Shorts de Cuero Faux Leather Chic',
      'Shorts Casual Cotton Summer Wave',
      'Bermuda Adidas Originals Street',
      'Shorts Plisados Satin Touch',
      'Shorts Cargo Utility Pocket'
    ],
    prices: [5500, 6900, 7800, 8500, 4900, 7200, 6200, 5900]
  },
  skirt: {
    category: 'MODA',
    names: [
      'Falda Midi Plisada Satin Silk Gold',
      'Falda Tubo Executive Pencil Fit',
      'Falda Corta Faux Leather Glam',
      'Falda Larga Boho Chic Floral Print',
      'Falda Asimétrica Avant-Garde Wave',
      'Falda Denim High Waist Vintage'
    ],
    prices: [7900, 8800, 9500, 11200, 8900, 7500]
  },
  't-shirt': {
    category: 'MODA',
    names: [
      'Camiseta Graphic Vintage Rock Print',
      'T-Shirt Oversized Streetwear Nike',
      'Camiseta Básica Pima Cotton Soft',
      'Top Deportivo Breathable Adidas Mesh',
      'Camiseta Logo Luxury Gold Embossed',
      'Top Corto Crop Ribbed Summer',
      'Camiseta Polo Classic Executive',
      'T-Shirt Tie-Dye Modern Pattern',
      'Camiseta V-Neck Organic Cotton',
      'Top Ajustado Longline Seamless'
    ],
    prices: [4500, 5800, 4200, 6500, 7200, 3800, 6900, 4900, 3900, 4800]
  }
};

const localProducts = [];
let localCounter = 1;

Object.keys(clothingCategoriesMap).forEach(folder => {
  const folderPath = path.join(clothingDir, folder);
  if (!fs.existsSync(folderPath)) return;
  const config = clothingCategoriesMap[folder];
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

  const countToTake = Math.min(files.length, config.names.length);
  for (let i = 0; i < countToTake; i++) {
    const file = files[i];
    const name = config.names[i];
    const price = config.prices[i];
    const imgPath = `/products/dataset_clothing/dataset_clothing_images-main/${folder}/${file}`;
    const id = `c3333333-3333-4333-8333-${(localCounter++).toString().padStart(12, '0')}`;

    localProducts.push({
      id,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name,
      category: config.category,
      description: `Prenda de vestir de alta gama de la colección ${folder.toUpperCase()} de EBNA. Confección superior con materiales transpirables y duraderos.`,
      price,
      images: [imgPath],
      in_stock: true,
      created_at: new Date(Date.now() - (localCounter * 30000)).toISOString(),
      updated_at: new Date().toISOString()
    });
  }
});

// 3. Shein Products Curated Selection (Fashion, Kids, Accessories, Soaps, Cosmetics)
const sheinItems = [
  {
    name: 'Conjunto Deportivo Niños Nike Style Cotton Set',
    category: 'NIÑOS',
    description: 'Conjunto infantil de 2 piezas (sudadera y pantalón) en algodón peinado ultra suave para máximo confort.',
    price: 4500,
    img: 'https://img.ltwebstatic.com/images3_spmp/2024/08/24/a0/1724486278d3a03531affbef9db97298916c1aec90.jpg'
  },
  {
    name: 'Vestido Niña Princesa Floral Shein Kids',
    category: 'NIÑOS',
    description: 'Vestido infantil para ocasiones especiales con encaje delicado y falda con volumen.',
    price: 3800,
    img: 'https://img.ltwebstatic.com/images3_pi/2023/03/21/1679371394d7472f3dba597399ac51313b1c4e57e5.jpg'
  },
  {
    name: 'Cinturón de Cuero Italiano Elegante con Hebilla Dorada',
    category: 'ACCESORIOS',
    description: 'Cinturón de piel auténtica con acabado vintage y hebilla maciza pulida.',
    price: 4900,
    img: 'https://img.ltwebstatic.com/images3_spmp/2024/07/30/3f/1722317110de4e3d0d3c2b4adf4271953dba60044d.jpg'
  },
  {
    name: 'Bolso de Mano de Cuero Sintético Premium Luxury',
    category: 'ACCESORIOS',
    description: 'Bolso estructurado de mano y hombro con correa ajustable y múltiples compartimentos internos.',
    price: 8500,
    img: 'https://img.ltwebstatic.com/images3_spmp/2024/08/09/e4/17231883609d35f827fa9cc1016466bcd0d72748bd_square.png'
  },
  {
    name: 'Gafas de Sol Estilo Vintage Oversized UV400 Protection',
    category: 'ACCESORIOS',
    description: 'Gafas de sol de diseño exclusivo con marco resistente y lentes polarizados anti-reflejo.',
    price: 3200,
    img: 'https://img.ltwebstatic.com/images3_spmp/2024/08/05/82/1722849974c78736029978563de3e7924ce962d5b1_square.jpg'
  },
  {
    name: 'Set de Joyería Colgante & Pendientes Gold Crystal',
    category: 'ACCESORIOS',
    description: 'Set refinado con baño de oro de 18k y cristales brillantes de corte biselado.',
    price: 5900,
    img: 'https://img.ltwebstatic.com/images3_spmp/2024/06/26/c6/17193895464cfa63318b5ad090bf4cbb23688177b9.jpg'
  },
  {
    name: 'Jabón Corporal Humectante con Aceite de Argán 150g',
    category: 'JABONES',
    description: 'Jabón enriquecido con aceite puro de argán y vitamina E para una piel sedosa y radiante.',
    price: 1950,
    img: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Crema Facial Anti-Edad Colágeno & Elastina 50ml',
    category: 'COSMETICA',
    description: 'Tratamiento facial intensivo que reafirma, reduce líneas de expresión e ilumina la piel.',
    price: 4800,
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
  }
];

const sheinProducts = sheinItems.map((item, idx) => {
  const id = `d4444444-4444-4444-8444-${(idx + 1).toString().padStart(12, '0')}`;
  return {
    id,
    slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: item.name,
    category: item.category,
    description: item.description,
    price: item.price,
    images: [item.img],
    in_stock: true,
    created_at: new Date(Date.now() - (idx * 50000)).toISOString(),
    updated_at: new Date().toISOString()
  };
});

const ALL_PRODUCTS = [...priorityProducts, ...localProducts, ...sheinProducts];

const fileContent = `import type { Product } from '../types';
import { generateSlug } from './utils';

export interface UserAccount {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'ADMIN' | 'USER';
  created_at: string;
  last_seen: string;
}

export let DEMO_PRODUCTS: Product[] = ${JSON.stringify(ALL_PRODUCTS, null, 2)};

export let DEMO_USERS: UserAccount[] = [
  {
    id: 'usr-admin-001',
    email: 'Admin@ebna.com',
    full_name: 'Administrador Principal EBNA',
    phone: '+240 222 000 111',
    role: 'ADMIN',
    created_at: '2026-01-01T00:00:00Z',
    last_seen: new Date().toISOString()
  },
  {
    id: 'usr-demo-002',
    email: 'cliente@ebna.com',
    full_name: 'Cliente Vip EBNA Luxury',
    phone: '+240 222 999 888',
    role: 'USER',
    created_at: '2026-02-15T10:30:00Z',
    last_seen: new Date(Date.now() - 3600000).toISOString()
  }
];

export function demoGetProducts(): Product[] {
  return [...DEMO_PRODUCTS];
}

export function demoAddProduct(productData: Omit<Product, 'id' | 'slug' | 'created_at' | 'updated_at'>): Product {
  const newProduct: Product = {
    ...productData,
    id: 'prod-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    slug: generateSlug(productData.name),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  DEMO_PRODUCTS = [newProduct, ...DEMO_PRODUCTS];
  return newProduct;
}

export function demoUpdateProduct(id: string, productData: Partial<Product>): Product | null {
  const index = DEMO_PRODUCTS.findIndex(p => p.id === id);
  if (index === -1) return null;
  const updatedProduct = {
    ...DEMO_PRODUCTS[index],
    ...productData,
    slug: productData.name ? generateSlug(productData.name) : DEMO_PRODUCTS[index].slug,
    updated_at: new Date().toISOString()
  };
  DEMO_PRODUCTS[index] = updatedProduct;
  return updatedProduct;
}

export function demoDeleteProduct(id: string): boolean {
  const initialLen = DEMO_PRODUCTS.length;
  DEMO_PRODUCTS = DEMO_PRODUCTS.filter(p => p.id !== id);
  return DEMO_PRODUCTS.length < initialLen;
}

export function demoSignIn(email: string, pass: string): { data: { user: any; profile: any }; error: any } {
  const cleanEmail = email.toLowerCase().trim();
  if (cleanEmail === 'admin@ebna.com') {
    if (pass === '@sindyluxury2026' || pass === 'Admin123!' || pass === 'admin123' || pass === '123456') {
      const adminUser = DEMO_USERS[0];
      const adminProfile = {
        id: adminUser.id,
        full_name: adminUser.full_name,
        phone: adminUser.phone,
        role: 'ADMIN' as const,
        created_at: adminUser.created_at,
        last_seen: new Date().toISOString()
      };
      return { data: { user: adminUser, profile: adminProfile }, error: null };
    }
  }

  const found = DEMO_USERS.find(u => u.email.toLowerCase() === cleanEmail);
  if (found) {
    const userProfile = {
      id: found.id,
      full_name: found.full_name,
      phone: found.phone,
      role: found.role,
      created_at: found.created_at,
      last_seen: new Date().toISOString()
    };
    return { data: { user: found, profile: userProfile }, error: null };
  }

  return { data: { user: null, profile: null }, error: 'Credenciales inválidas. Usa Admin@ebna.com / @sindyluxury2026' };
}

export function demoSignUp(email: string, _pass: string, fullName: string, phone: string): { data: { user: any; profile: any }; error: any } {
  const cleanEmail = email.toLowerCase().trim();
  const existing = DEMO_USERS.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    const profile = {
      id: existing.id,
      full_name: existing.full_name,
      phone: existing.phone,
      role: existing.role,
      created_at: existing.created_at,
      last_seen: new Date().toISOString()
    };
    return { data: { user: existing, profile }, error: null };
  }

  const newUser: UserAccount = {
    id: 'usr-' + Date.now(),
    email: cleanEmail,
    full_name: fullName,
    phone: phone,
    role: 'USER',
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString()
  };
  DEMO_USERS.push(newUser);

  const newProfile = {
    id: newUser.id,
    full_name: newUser.full_name,
    phone: newUser.phone,
    role: newUser.role,
    created_at: newUser.created_at,
    last_seen: new Date().toISOString()
  };

  return { data: { user: newUser, profile: newProfile }, error: null };
}

export function demoGetUsers(): UserAccount[] {
  return [...DEMO_USERS];
}

export function demoUpdateUserRole(userId: string, newRole: 'ADMIN' | 'USER'): UserAccount[] {
  const user = DEMO_USERS.find(u => u.id === userId);
  if (user) {
    user.role = newRole;
  }
  return [...DEMO_USERS];
}
`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully generated demoData.ts with exact return types!`);
