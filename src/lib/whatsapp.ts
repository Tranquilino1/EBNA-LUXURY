import type { Product } from '../types';
import { formatPrice } from './utils';

const PRIMARY_PHONE = '240222633687';
const SECONDARY_PHONE = '240555439904'; // Muni Dinero (+240 555 439 904)

export const generateWhatsAppLink = (
  product: Product, 
  phoneType: 'primary' | 'secondary' = 'primary',
  selectedSize?: string,
  selectedColor?: string
): string => {
  const number = phoneType === 'primary' ? PRIMARY_PHONE : SECONDARY_PHONE;
  const priceVal = product.priceFCFA || product.price || 0;
  const skuText = product.sku ? `\n- *Ref/SKU:* ${product.sku}` : '';
  const brandText = product.brand ? `\n- *Marca:* ${product.brand}` : '';
  
  let optionsText = '';
  const isCosmetic = ['COSMETICA_FACIAL', 'HIGIENE_CORPORAL', 'PERFUMERIA'].includes(product.category || '');
  if (selectedSize && selectedSize !== 'Talla Única') {
    optionsText += isCosmetic ? `\n- *Presentación:* ${selectedSize}` : `\n- *Talla:* ${selectedSize}`;
  }
  if (selectedColor && selectedColor !== 'Color Original') {
    optionsText += `\n- *Color:* ${selectedColor}`;
  }

  const message = `¡Hola EBNA Luxury! 👋 Deseo ordenar el siguiente producto:
- *Producto:* ${product.name}${skuText}${brandText}
- *Precio:* ${formatPrice(priceVal)}${optionsText}
- *Estado:* ${product.inStock || product.in_stock ? 'Disponible (En Stock)' : 'Consulta Stock'}

¿Tienen disponibilidad para entrega en Malabo/Bata?`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const buildWhatsAppUrl = generateWhatsAppLink;

export const buildGeneralWhatsAppUrl = (phoneType: 'primary' | 'secondary' = 'primary'): string => {
  const number = phoneType === 'primary' ? PRIMARY_PHONE : SECONDARY_PHONE;
  const message = `¡Hola EBNA Luxury! 👋 Quisiera consultar el catálogo general y las opciones de envío para Malabo/Bata.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
