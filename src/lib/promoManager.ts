export interface HeroPromoConfig {
  id: string;
  badge: string;
  title: string;
  description: string;
  image?: string;
  imageUrl?: string;
  discountPercentage?: string;
  discountBadge?: string;
  buttonText?: string;
  buttonLink?: string;
  targetSlug?: string;
}

export const PROMO_IMAGES_PUB = [
  { id: 'pub-1', title: 'Alta Costura & Estilo', url: '/promos/promo_1.jfif' },
  { id: 'pub-2', title: 'Cosmética Estelar', url: '/promos/promo_2.jfif' },
  { id: 'pub-3', title: 'Moda Africana y Global', url: '/promos/promo_3.jfif' },
  { id: 'pub-4', title: 'Colección de Lujo VIP', url: '/promos/promo_4.jfif' },
  { id: 'pub-5', title: 'Fragancias Exclusivas', url: '/promos/promo_5.jfif' },
  { id: 'pub-6', title: 'Boutique de Gala', url: '/promos/promo_6.jfif' },
  { id: 'pub-7', title: 'Diseños de Vanguardia', url: '/promos/promo_7.jfif' },
  { id: 'pub-8', title: 'Ilustración Moda AI Selar 1', url: '/promos/promo_8.jfif' },
  { id: 'pub-9', title: 'Guía Creativa de Estilo', url: '/promos/promo_9.jfif' },
  { id: 'pub-10', title: 'Modern African Power Fashion', url: '/promos/promo_10.jfif' },
  { id: 'pub-11', title: 'Arte de Lujo Místico', url: '/promos/promo_11.jfif' },
];

export const DEFAULT_PROMO_TEMPLATES: HeroPromoConfig[] = [
  {
    id: 'template-50off',
    badge: '🔥 OFERTA DE LA SEMANA 50% OFF',
    title: 'Elegancia y Estilo Hecho Para Ti - 50% de Descuento',
    description: 'Aprovecha nuestra promoción estelar de la semana en prendas y cosmética seleccionada con 50% OFF cada 30 minutos.',
    image: '/promos/promo_1.jfif',
    imageUrl: '/promos/promo_1.jfif',
    discountPercentage: '-50% DESC',
    discountBadge: '-50% DESC',
    buttonText: 'Explorar Ofertas ➔',
    buttonLink: '/#catalogo'
  },
  {
    id: 'template-novedad',
    badge: '✨ EDICIÓN LIMITADA NOVEDAD',
    title: 'NUEVA COLECCIÓN EXCLUSIVA SYNDY LUXURY',
    description: 'Modern African Power Fashion y vestimenta internacional recién llegados a nuestra boutique oficial.',
    image: '/promos/promo_10.jfif',
    imageUrl: '/promos/promo_10.jfif',
    discountPercentage: 'NUEVO VIP',
    discountBadge: 'NUEVO VIP',
    buttonText: 'Ver Colección ➔',
    buttonLink: '/#catalogo'
  },
  {
    id: 'template-envio',
    badge: '🚚 ENVÍO EXPRESS PREFERENCIAL',
    title: 'ENTREGA RÁPIDA EN MALABO Y BATA EN 24 HORAS',
    description: 'Realiza tu pedido por WhatsApp o Muni Dinero hoy y recibe envío preferencial sin costo adicional.',
    image: '/promos/promo_3.jfif',
    imageUrl: '/promos/promo_3.jfif',
    discountPercentage: 'ENVÍO GRATIS',
    discountBadge: 'ENVÍO GRATIS',
    buttonText: 'Comprar Ahora ➔',
    buttonLink: '/#catalogo'
  }
];

const LOCAL_STORAGE_KEY = 'ebna_hero_active_promo';

export function getActiveHeroPromo(): HeroPromoConfig {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_PROMO_TEMPLATES[0],
        ...parsed,
        imageUrl: parsed.imageUrl || parsed.image || DEFAULT_PROMO_TEMPLATES[0].imageUrl,
        discountBadge: parsed.discountBadge || parsed.discountPercentage || DEFAULT_PROMO_TEMPLATES[0].discountBadge,
        buttonText: parsed.buttonText || DEFAULT_PROMO_TEMPLATES[0].buttonText,
        buttonLink: parsed.buttonLink || DEFAULT_PROMO_TEMPLATES[0].buttonLink,
      };
    }
  } catch (e) {
    console.warn('Error reading active promo:', e);
  }
  return DEFAULT_PROMO_TEMPLATES[0];
}

export function setActiveHeroPromo(promo: HeroPromoConfig): void {
  try {
    const normalized: HeroPromoConfig = {
      ...promo,
      image: promo.imageUrl || promo.image,
      imageUrl: promo.imageUrl || promo.image,
      discountPercentage: promo.discountBadge || promo.discountPercentage,
      discountBadge: promo.discountBadge || promo.discountPercentage
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new Event('ebna_promo_updated'));
  } catch (e) {
    console.warn('Error saving active promo:', e);
  }
}

