import type { Product } from '../types';
import { generateSlug } from './utils';

export let DEMO_PRODUCTS: Product[] = [
  // --- COSMÉTICA & PERFUMES (10 productos) ---
  {
    id: 'demo-1',
    slug: generateSlug('Chanel N° 5 Eau de Parfum'),
    name: 'Chanel N° 5 Eau de Parfum 100ml',
    category: 'COSMETICA',
    description: 'La esencia misma de la feminidad. Un ramo floral aldehído atemporal sublimado por un frasco icónico con líneas puras.',
    price: 135000,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    slug: generateSlug('Dior Sauvage Elixir Perfume'),
    name: 'Dior Sauvage Elixir 60ml',
    category: 'COSMETICA',
    description: 'Una fragancia de concentración extrema donde la frescura del pomelo y las especias se funden con un corazón de lavanda salvaje y maderas raras.',
    price: 145000,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    slug: generateSlug('Victorias Secret Bombshell Eau de Parfum'),
    name: "Victoria's Secret Bombshell 100ml",
    category: 'COSMETICA',
    description: 'La fragancia N° 1 de América. Mezcla glamurosa de peonías recién cortadas, orquídea de vainilla y maracuyá morada vibrante.',
    price: 65000,
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    slug: generateSlug('Yves Saint Laurent Libre Intense'),
    name: 'Yves Saint Laurent Libre EDP 90ml',
    category: 'COSMETICA',
    description: 'El perfume de una mujer fuerte y libre. Una tensión entre la sensualidad ardiente de la flor de azahar de Marruecos y la audacia de la lavanda de Francia.',
    price: 110000,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-5',
    slug: generateSlug('Carolina Herrera Good Girl Velvet'),
    name: 'Carolina Herrera Good Girl 80ml',
    category: 'COSMETICA',
    description: 'Una fragancia audaz y sofisticada en su emblemático frasco con forma de taconazo alto. Notas de nardo dulce, jazmín y haba tonka tostada.',
    price: 98000,
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-6',
    slug: generateSlug('Creed Aventus Eau de Parfum'),
    name: 'Creed Aventus Royal EDP 100ml',
    category: 'COSMETICA',
    description: 'Fragancia de culto celebrada por su vitalidad y elegancia. Notas vivaces de piña madura, grosella negra, abedul ahumado y pachulí.',
    price: 240000,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-7',
    slug: generateSlug('Nivea Soft Crema Hidratante 300ml'),
    name: 'Nivea Soft Crema Hidratante Intensiva 300ml',
    category: 'COSMETICA',
    description: 'Fórmula refrescante enriquecida con Aceite de Jojoba y Vitamina E. Absorción rápida sin sensación grasa, ideal para rostro, cuerpo y manos.',
    price: 8500,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-8',
    slug: generateSlug('CeraVe Crema Hidratante Facial 52ml'),
    name: 'CeraVe Loción Hidratante Facial SPF 30',
    category: 'COSMETICA',
    description: 'Desarrollada con dermatólogos. Contiene 3 ceramidas esenciales, Ácido Hialurónico y Niacinamida para restaurar la barrera protectora de la piel.',
    price: 16000,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-9',
    slug: generateSlug('La Roche-Posay Pure Vitamin C10 Serum'),
    name: 'La Roche-Posay Pure Vitamin C10 30ml',
    category: 'COSMETICA',
    description: 'Sérum antioxidante antiarrugas con 10% de Vitamina C Pura, Ácido Salicílico y Neurosensina. Aporta luminosidad inmediata a la piel sensible.',
    price: 28000,
    images: [
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- MODA (9 productos) ---
  {
    id: 'demo-10',
    slug: generateSlug('Chandal Nike Tech Fleece Full-Zip'),
    name: 'Chándal Nike Tech Fleece Full-Zip',
    category: 'MODA',
    description: 'Conjunto premium de chaqueta con capucha y pantalón jogger ajustado. Tejido térmico ultra ligero que mantiene el calor sin añadir volumen.',
    price: 95000,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-11',
    slug: generateSlug('Chandal Adidas Originals Adicolor 3-Stripes'),
    name: 'Chándal Adidas Originals Adicolor 3-Stripes',
    category: 'MODA',
    description: 'Icono del estilo deportivo urbano. Chaqueta con cierre de cremallera completa y pantalón de chándal a juego con las míticas 3 bandas laterales.',
    price: 82000,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-12',
    slug: generateSlug('Vestido Satinado de Noche Zara Luxe'),
    name: 'Vestido Satinado de Noche Zara Luxe',
    category: 'MODA',
    description: 'Vestido largo midi confeccionado en fluido tejido satinado verde esmeralda, escote drapeado tipo cowl y tirantes finos ajustables.',
    price: 48000,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-13',
    slug: generateSlug('Abrigo Largo de Lana Mango Atelier'),
    name: 'Abrigo Largo de Lana Camel Mango Atelier',
    category: 'MODA',
    description: 'Abrigo sofisticado cruzado con mezcla de lana noble, solapas muesca anchas y cinturón ajustable del mismo tejido.',
    price: 120000,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 13).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-14',
    slug: generateSlug('Blazer Oversized de Cuero Sintetico Bershka'),
    name: 'Blazer Oversized Tailored Edition',
    category: 'MODA',
    description: 'Chaqueta estilo blazer de corte masculino relajado en tono negro. Botones dorados en contraste y bolsillos de solapa frontales.',
    price: 42000,
    images: [
      'https://images.unsplash.com/photo-1548624149-f1e1f37e44c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-15',
    slug: generateSlug('Sudadera Oversized Puma Select Pink'),
    name: 'Sudadera Oversized Puma Select',
    category: 'MODA',
    description: 'Sudadera de felpa suave en tono rosa pastel con capucha ajustable y bolsillo canguro. Estilo relajado e informal de máxima comodidad.',
    price: 38000,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-16',
    slug: generateSlug('Chaqueta Bomber Nike Sportswear Essentials'),
    name: 'Chaqueta Bomber Nike Sportswear',
    category: 'MODA',
    description: 'Bomber acolchada con acabado brillante resistente al agua. Puños y cuello de canalé con cremallera frontal bidireccional.',
    price: 75000,
    images: [
      'https://images.unsplash.com/photo-1548624149-f1e1f37e44c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-17',
    slug: generateSlug('Vestido Ajustado Ribbed Victorias Secret'),
    name: "Vestido Ajustado Ribbed Victoria's Secret",
    category: 'MODA',
    description: 'Vestido tubo de tejido elástico acanalado que moldea la silueta con suavidad. Cuello redondo y largo por encima de la rodilla.',
    price: 34000,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-18',
    slug: generateSlug('Jumpsuit de Noche Strapless HM Edition'),
    name: 'Jumpsuit de Noche Strapless HM Edition',
    category: 'MODA',
    description: 'Mono largo en color negro con escote palabra de honor y pernera recta ancha. Incluye cinturón de hebilla metálica.',
    price: 39000,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548624149-f1e1f37e44c2?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- ACCESORIOS (9 productos) ---
  {
    id: 'demo-19',
    slug: generateSlug('Bolso Gucci GG Marmont Matelasse'),
    name: 'Bolso de Mano Gucci GG Marmont',
    category: 'ACCESORIOS',
    description: 'Elaborado en suave piel acolchada matelassé en tono marfil con el icónico aplique de la doble G en dorado envejecido y correa de cadena.',
    price: 185000,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 19).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-20',
    slug: generateSlug('Tacones Stiletto Christian Louboutin So Kate'),
    name: 'Tacones Christian Louboutin So Kate 120mm',
    category: 'ACCESORIOS',
    description: 'El stiletto por excelencia. Piel de charol negro brillante con puntera afilada y la legendaria suela roja lacada.',
    price: 210000,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-21',
    slug: generateSlug('Reloj Michael Kors Pyper Rose Gold'),
    name: 'Reloj Michael Kors Pyper Rose Gold',
    category: 'ACCESORIOS',
    description: 'Reloj elegante con caja y brazalete de acero inoxidable bañado en oro rosa. Esfera sobria con índices de cristal pavé.',
    price: 78000,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-22',
    slug: generateSlug('Gafas de Sol Ray-Ban Aviator Classic'),
    name: 'Gafas de Sol Ray-Ban Aviator Classic',
    category: 'ACCESORIOS',
    description: 'Las gafas que definieron el estilo atemporal. Montura metálica dorada de gota de agua con lentes de cristal verde G-15.',
    price: 68000,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-23',
    slug: generateSlug('Zapatillas Nike Air Force 1 07 Triple White'),
    name: "Zapatillas Nike Air Force 1 '07 Triple White",
    category: 'ACCESORIOS',
    description: 'La leyenda de las pistas trasladada a la calle. Piel de vacuno premium totalmente blanca con amortiguación de aire encapsulada.',
    price: 62000,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-24',
    slug: generateSlug('Cinturon de Cuero YSL Monogram Cassandre'),
    name: 'Cinturón de Cuero YSL Monogram Cassandre',
    category: 'ACCESORIOS',
    description: 'Confeccionado en Italia con suave piel de becerro negra. Hebilla con el distintivo monograma YSL en latón con acabado brillante.',
    price: 92000,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-25',
    slug: generateSlug('Pendientes Swarovski Constella Drop'),
    name: 'Pendientes Swarovski Constella Drop',
    category: 'ACCESORIOS',
    description: 'Inspirados en el brillo de las constelaciones. Piedras de corte redondo engastadas en garras bañadas en tono oro rosa.',
    price: 45000,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475285-a36adaf961e0?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-26',
    slug: generateSlug('Bolso Tote Michael Kors Jet Set Saffiano'),
    name: 'Bolso Tote Michael Kors Jet Set Saffiano',
    category: 'ACCESORIOS',
    description: 'Espacioso y resistente bolso tote en piel saffiano de alta durabilidad. Compartimentos internos organizados y colgante con logotipo MK.',
    price: 115000,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-27',
    slug: generateSlug('Gafas de Sol Cat-Eye YSL Saint Laurent'),
    name: 'Gafas de Sol Cat-Eye YSL Saint Laurent',
    category: 'ACCESORIOS',
    description: 'Diseño en acetato negro pulido de silueta mariposa/cat-eye que estiliza las facciones. 100% protección UV con cristales oscuros.',
    price: 89000,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    in_stock: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 27).toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const demoSignIn = async (email: string, password: string): Promise<{ error: any | null, data?: any }> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  if (!email || !password) {
    return { error: { message: 'Faltan credenciales' } };
  }

  const role = email === 'admin@ebna.com' && password === 'admin123' ? 'ADMIN' : 'USER';
  
  return {
    error: null,
    data: {
      user: { id: `demo-user-${Date.now()}`, email },
      profile: {
        id: `demo-profile-${Date.now()}`,
        full_name: email.split('@')[0],
        phone: '+240 222 123 456',
        role,
        created_at: new Date().toISOString(),
        last_seen: new Date().toISOString()
      }
    }
  };
};

export const demoSignUp = async (email: string, _password: string, fullName: string, phone: string): Promise<{ error: any | null, data?: any }> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    error: null,
    data: {
      user: { id: `demo-user-${Date.now()}`, email },
      profile: {
        id: `demo-profile-${Date.now()}`,
        full_name: fullName,
        phone,
        role: 'USER',
        created_at: new Date().toISOString(),
        last_seen: new Date().toISOString()
      }
    }
  };
};

export const demoGetProducts = async (category?: string, search?: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  let result = [...DEMO_PRODUCTS];
  
  if (category && category !== 'TODOS') {
    result = result.filter(p => p.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  return result;
};

export const demoAddProduct = async (product: Partial<Product>): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newProduct: Product = {
    id: `demo-${Date.now()}`,
    slug: generateSlug(product.name || 'Nuevo Producto'),
    name: product.name || 'Nuevo Producto',
    category: (product.category as 'MODA' | 'COSMETICA' | 'ACCESORIOS') || 'MODA',
    description: product.description || '',
    price: product.price || 0,
    images: product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'],
    in_stock: product.in_stock !== undefined ? product.in_stock : true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  DEMO_PRODUCTS.unshift(newProduct);
  return newProduct;
};

export const demoUpdateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = DEMO_PRODUCTS.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  const updatedProduct = { 
    ...DEMO_PRODUCTS[index], 
    ...updates,
    updated_at: new Date().toISOString() 
  };
  
  if (updates.name) {
    updatedProduct.slug = generateSlug(updates.name);
  }
  
  DEMO_PRODUCTS[index] = updatedProduct;
  return updatedProduct;
};

export const demoDeleteProduct = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const initialLength = DEMO_PRODUCTS.length;
  DEMO_PRODUCTS = DEMO_PRODUCTS.filter(p => p.id !== id);
  
  return DEMO_PRODUCTS.length < initialLength;
};
