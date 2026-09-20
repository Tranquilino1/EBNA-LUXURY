import type { Product } from '../types';
import { formatPrice } from './utils';

const PRIMARY_PHONE = '240222633687';
const SECONDARY_PHONE = '240222439904';

export const buildWhatsAppUrl = (product: Product, phone: 'primary' | 'secondary'): string => {
  const number = phone === 'primary' ? PRIMARY_PHONE : SECONDARY_PHONE;
  
  // Need to get the current origin to build the product URL.
  const productUrl = `${window.location.origin}/producto/${product.slug}`;
  
  const message = `¡Hola! 👋 Me interesa este producto de EBNA:
  
🛍️ *${product.name}*
💰 Precio: ${formatPrice(product.price)}
🔖 ID: ${product.id}

🔗 Ver en tienda: ${productUrl}

¿Sigue disponible?`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

export const buildGeneralWhatsAppUrl = (phone: 'primary' | 'secondary'): string => {
  const number = phone === 'primary' ? PRIMARY_PHONE : SECONDARY_PHONE;
  
  const message = `¡Hola! 👋 Necesito información sobre los productos de EBNA.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};
