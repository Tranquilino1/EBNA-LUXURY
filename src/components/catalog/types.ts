export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'MODA' | 'COSMETICA' | 'ACCESORIOS';
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-GQ', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(price).replace('XAF', 'FCFA');
};
