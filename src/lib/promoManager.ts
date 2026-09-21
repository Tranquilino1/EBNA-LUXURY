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

export const DEFAULT_PROMO_TEMPLATES: HeroPromoConfig[] = [
  {
    id: 'template-50off',
    badge: '🔥 OFERTA DE LA SEMANA 50% OFF',
    title: 'Elegancia y Estilo Hecho Para Ti - 50% de Descuento',
    description: 'Aprovecha nuestra promoción estelar de la semana en prendas y cosmética seleccionada con 50% OFF cada 30 minutos.',
    image: '/products/product_1.jfif',
    imageUrl: '/products/product_1.jfif',
    discountPercentage: '-50% DESC',
    discountBadge: '-50% DESC',
    buttonText: 'Explorar Ofertas ➔',
    buttonLink: '/#catalogo'
  },
  {
    id: 'template-novedad',
    badge: '✨ EDICIÓN LIMITADA NOVEDAD',
    title: 'NUEVA COLECCIÓN EXCLUSIVA SYNDY LUXURY',
    description: 'Nuevas fragancias y ropa internacional recién llegados a nuestra boutique oficial en Malabo y Bata.',
    image: '/products/product_3.jfif',
    imageUrl: '/products/product_3.jfif',
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
    image: '/products/product_12.jfif',
    imageUrl: '/products/product_12.jfif',
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

