import type { Product } from '../types';
import { formatPrice } from './utils';

const PRIMARY_PHONE = '240222633687'; // WhatsApp principal Sindy Luxury by EBNA
const SECONDARY_PHONE = '240555439904'; // Muni Dinero (+240 555 439 904)
const BASE_DOMAIN = 'https://ebna-luxury.vercel.app';

/**
 * Returns a fully qualified absolute public URL for any product image.
 * This triggers WhatsApp's native OpenGraph preview card so the seller & buyer
 * see the exact photograph of the product inside the chat.
 */
export const getAbsoluteImageUrl = (imageSrc?: string): string => {
  if (!imageSrc) return `${BASE_DOMAIN}/icons/ebna-logo.png`;
  if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
    return imageSrc;
  }
  const cleanPath = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
  return `${BASE_DOMAIN}${cleanPath}`;
};

export const generateWhatsAppLink = (
  product: Product, 
  phoneType: 'primary' | 'secondary' = 'primary',
  selectedSize?: string,
  selectedColor?: string,
  quantity: number = 1
): string => {
  const number = phoneType === 'primary' ? PRIMARY_PHONE : SECONDARY_PHONE;
  const priceVal = product.priceFCFA || product.price || 0;
  const totalVal = priceVal * Math.max(1, quantity);
  
  const isCosmetic = ['COSMETICA_FACIAL', 'HIGIENE_CORPORAL', 'PERFUMERIA'].includes(product.category || '');
  const isFootwear = product.category === 'CALZADO';

  const sizeLabel = isCosmetic ? 'Presentación' : isFootwear ? 'Talla de Calzado (EU)' : 'Talla Seleccionada';
  const displaySize = selectedSize && selectedSize !== 'Talla Única' ? selectedSize : (product.sizes?.[0] || 'Estándar');
  const displayColor = selectedColor && selectedColor !== 'Color Original' ? selectedColor : (product.colors?.[0] || 'Original de Pasarela');

  const rawImage = product.images?.primary || (Array.isArray(product.images) ? product.images[0] : (product.images as any)?.[0]);
  const photoUrl = getAbsoluteImageUrl(rawImage);
  const productPageUrl = `${BASE_DOMAIN}/producto/${product.slug}`;

  const message = `✨ *PEDIDO EXCLUSIVO — SINDY LUXURY BY EBNA* ✨
━━━━━━━━━━━━━━━━━━━━━━
👗 *Prenda:* ${product.name}
🏷️ *Ref/SKU:* ${product.sku || 'EBNA-' + product.id.substring(0, 8).toUpperCase()}
💎 *Colección:* ${(product.category || 'ALTA_COSTURA').replace(/_/g, ' ')}
📏 *${sizeLabel}:* ${displaySize}
🎨 *Color/Tono:* ${displayColor}
🔢 *Cantidad:* ${quantity} unidad(es)
💰 *Precio Unitario:* ${formatPrice(priceVal)}
💵 *TOTAL ESTIMADO: ${formatPrice(totalVal)}*

🖼️ *FOTOGRAFÍA OFICIAL DE LA PRENDA:*
${photoUrl}

🔗 *Ver en la Boutique Online:*
${productPageUrl}
━━━━━━━━━━━━━━━━━━━━━━
📍 *Lugar de Entrega:* Malabo / Bata (Guinea Ecuatorial)
💳 *Modalidad:* ${phoneType === 'secondary' ? 'Muni Dinero (555439904)' : 'WhatsApp Concierge / Efectivo contra entrega'}

¿Tienen disponibilidad inmediata para confirmar el despacho?`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const buildWhatsAppUrl = generateWhatsAppLink;

export const buildGeneralWhatsAppUrl = (phoneType: 'primary' | 'secondary' = 'primary'): string => {
  const number = phoneType === 'primary' ? PRIMARY_PHONE : SECONDARY_PHONE;
  const message = `¡Hola Sindy Luxury by EBNA! 👋 Quisiera consultar el catálogo exclusivo y opciones de entrega express en Malabo y Bata:
${BASE_DOMAIN}/catalogo`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
