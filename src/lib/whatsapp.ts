import type { Product } from '../types';
import { formatPrice } from './utils';

const PRIMARY_PHONE = '240222633687';
const SECONDARY_PHONE = '240222439904';

export const buildWhatsAppUrl = (
  product: Product, 
  phone: 'primary' | 'secondary',
  selectedSize?: string,
  selectedColor?: string
): string => {
  const number = phone === 'primary' ? PRIMARY_PHONE : SECONDARY_PHONE;
  const productUrl = `${window.location.origin}/producto/${product.slug}`;
  
  let optionsText = '';
  if (selectedSize) optionsText += `\n📏 Talla: ${selectedSize}`;
  if (selectedColor) optionsText += `\n🎨 Color: ${selectedColor}`;

  const message = `¡Hola! 👋 Quisiera comprar este producto en EBNA Luxury:

🛍️ *${product.name}*
💰 Precio: ${formatPrice(product.price)}${optionsText}
📌 Estado: ${product.in_stock ? 'Disponible (En Stock)' : 'Consulta Stock'}
🔖 ID: ${product.id}

🔗 Ver en catálogo: ${productUrl}

¿Me confirman disponibilidad y forma de entrega?`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

export const buildGeneralWhatsAppUrl = (phone: 'primary' | 'secondary'): string => {
  const number = phone === 'primary' ? PRIMARY_PHONE : SECONDARY_PHONE;
  
  const message = `¡Hola! 👋 Quisiera información general sobre los productos y envíos en EBNA Luxury.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};
