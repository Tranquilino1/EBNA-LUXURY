import type { Product, Profile } from '../types';

export interface UserAccount {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "ebna-1",
    "slug": "sneakers-urbanos-bicolor-sports-men-s-edition-ref-eb-1-ebna-1",
    "name": "Sneakers Urbanos Bicolor Sports Men's Edition (Ref. EB-1)",
    "category": "CALZADO",
    "description": "Zapatillas deportivas de malla transpirable con suela amortiguadora de impacto. Diseño ergonómico para vestir casual con jeans o ropa deportiva en Malabo y Bata.",
    "price": 28000,
    "images": [
      "/products/product_1.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-20T22:06:31.246Z",
    "updated_at": "2026-09-21T19:24:42.677Z"
  },
  {
    "id": "ebna-2",
    "slug": "set-de-cosmetica-facial-brunch-beauty-glow-serum-50ml-ebna-2",
    "name": "Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)",
    "category": "COSMETICA",
    "description": "Concentrado ilumindor facial con vitamina C estabilizada y ácido hialurónico. Aporta frescura instantánea y efecto buena cara todo el día.",
    "price": 15000,
    "images": [
      "/products/product_2.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-20T21:06:31.250Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-3",
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-ref-eb-3-ebna-3",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Ref. EB-3)",
    "category": "MODA",
    "description": "Set de 2 piezas compuesto por top corto con capucha y pantalón acampanado elástico. Estilo athleisure de corte impecable.",
    "price": 25000,
    "images": [
      "/products/product_3.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T20:06:31.254Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-4",
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-ref-eb-4-ebna-4",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-4)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 22500,
    "images": [
      "/products/product_4.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T19:06:31.257Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-5",
    "slug": "chaqueta-tweed-estilo-chanel-couture-ref-eb-5-ebna-5",
    "name": "Chaqueta Tweed Estilo Chanel Couture (Ref. EB-5)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 24000,
    "images": [
      "/products/product_5.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T18:06:31.260Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-6",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-6-ebna-6",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-6)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 25500,
    "images": [
      "/products/product_6.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T17:06:31.263Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-7",
    "slug": "falda-lapiz-midi-con-apertura-posterior-ref-eb-7-ebna-7",
    "name": "Falda Lápiz Midi con Apertura Posterior (Ref. EB-7)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 27000,
    "images": [
      "/products/product_7.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T16:06:31.267Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-8",
    "slug": "camisa-de-lino-blanco-pure-luxury-edition-ref-eb-8-ebna-8",
    "name": "Camisa de Lino Blanco Pure Luxury Edition (Ref. EB-8)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 28500,
    "images": [
      "/products/product_8.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T15:06:31.269Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-9",
    "slug": "top-elegante-drapeado-satin-chic-ref-eb-9-ebna-9",
    "name": "Top Elegante Drapeado Satin Chic (Ref. EB-9)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 30000,
    "images": [
      "/products/product_9.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T14:06:31.272Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-10",
    "slug": "conjunto-de-punto-fino-primavera-verano-ref-eb-10-ebna-10",
    "name": "Conjunto de Punto Fino Primavera-Verano (Ref. EB-10)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 31500,
    "images": [
      "/products/product_10.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T13:06:31.277Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-11",
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ref-eb-11-ebna-11",
    "name": "Blusa de Seda con Lazada al Cuello Executive (Ref. EB-11)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 18000,
    "images": [
      "/products/product_11.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T12:06:31.280Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-12",
    "slug": "jabon-vegetal-palmolive-naturals-extractos-herbales-pack-12-x-90g-ebna-12",
    "name": "Jabón Vegetal Palmolive Naturals Extractos Herbales (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Pack familiar de jabones enriquecidos con extractos herbales purificantes y aroma botánico. Limpieza profunda respetando el pH natural de la piel.",
    "price": 8500,
    "images": [
      "/products/product_12.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-20T11:06:31.283Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-13",
    "slug": "chaqueta-tweed-estilo-chanel-couture-ref-eb-13-ebna-13",
    "name": "Chaqueta Tweed Estilo Chanel Couture (Ref. EB-13)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 21000,
    "images": [
      "/products/product_13.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T10:06:31.285Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-14",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-14-ebna-14",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-14)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 22500,
    "images": [
      "/products/product_14.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T09:06:31.288Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-15",
    "slug": "falda-lapiz-midi-con-apertura-posterior-ref-eb-15-ebna-15",
    "name": "Falda Lápiz Midi con Apertura Posterior (Ref. EB-15)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 24000,
    "images": [
      "/products/product_15.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T08:06:31.292Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-16",
    "slug": "camisa-de-lino-blanco-pure-luxury-edition-ref-eb-16-ebna-16",
    "name": "Camisa de Lino Blanco Pure Luxury Edition (Ref. EB-16)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 25500,
    "images": [
      "/products/product_16.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T07:06:31.295Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-17",
    "slug": "pantalon-jeans-wide-leg-streetwear-y2k-edition-ref-eb-17-ebna-17",
    "name": "Pantalón Jeans Wide Leg Streetwear Y2K Edition (Ref. EB-17)",
    "category": "MODA",
    "description": "Pantalón vaquero de corte ancho holgado con detalles bordados retro Y2K. Algodón denim resistente de alta calidad.",
    "price": 28000,
    "images": [
      "/products/product_17.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T06:06:31.297Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-18",
    "slug": "pack-2x-leggings-elasticos-maternidad-confort-ultra-soft-ref-eb-18-ebna-18",
    "name": "Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft (Ref. EB-18)",
    "category": "MODA",
    "description": "Set de 2 mallas de soporte premamá de tiro alto con banda anatómica elástica. Tejido transpirable de máxima suavidad.",
    "price": 18000,
    "images": [
      "/products/product_18.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T05:06:31.300Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-19",
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ref-eb-19-ebna-19",
    "name": "Blusa de Seda con Lazada al Cuello Executive (Ref. EB-19)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 30000,
    "images": [
      "/products/product_19.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T04:06:31.302Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-20",
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-ref-eb-20-ebna-20",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-20)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 31500,
    "images": [
      "/products/product_20.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T03:06:31.306Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-21",
    "slug": "gafas-de-sol-classic-square-unisex-filtro-filtro-luz-azul-pack-3x-ebna-21",
    "name": "Gafas de Sol Classic Square Unisex Filtro Filtro Luz Azul (Pack 3x)",
    "category": "ACCESORIOS",
    "description": "Set de 3 gafas cuadradas estilo clásico con lentes protectoras contra pantallas y rayos UV. Montura ligera en acetato negro mate de gran durabilidad.",
    "price": 16000,
    "images": [
      "/products/product_21.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Negro",
      "Marrón",
      "Dorado"
    ],
    "sizes": [
      "Unica",
      "Standard"
    ],
    "created_at": "2026-09-20T02:06:31.310Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-22",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-22-ebna-22",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-22)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 19500,
    "images": [
      "/products/product_22.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T01:06:31.312Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-23",
    "slug": "falda-lapiz-midi-con-apertura-posterior-ref-eb-23-ebna-23",
    "name": "Falda Lápiz Midi con Apertura Posterior (Ref. EB-23)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 21000,
    "images": [
      "/products/product_23.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T00:06:31.315Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-24",
    "slug": "camisa-de-lino-blanco-pure-luxury-edition-ref-eb-24-ebna-24",
    "name": "Camisa de Lino Blanco Pure Luxury Edition (Ref. EB-24)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 22500,
    "images": [
      "/products/product_24.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T23:06:31.318Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-25",
    "slug": "top-elegante-drapeado-satin-chic-ref-eb-25-ebna-25",
    "name": "Top Elegante Drapeado Satin Chic (Ref. EB-25)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 24000,
    "images": [
      "/products/product_25.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T22:06:31.321Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-26",
    "slug": "chaqueta-blazer-sastre-zara-style-new-collection-ref-eb-26-ebna-26",
    "name": "Chaqueta Blazer Sastre Zara Style New Collection (Ref. EB-26)",
    "category": "MODA",
    "description": "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda imprescindible de fondo de armario.",
    "price": 32000,
    "images": [
      "/products/product_26.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T21:06:31.325Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-27",
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ref-eb-27-ebna-27",
    "name": "Blusa de Seda con Lazada al Cuello Executive (Ref. EB-27)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 27000,
    "images": [
      "/products/product_27.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T20:06:31.328Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-28",
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-ref-eb-28-ebna-28",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-28)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 28500,
    "images": [
      "/products/product_28.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T19:06:31.331Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-29",
    "slug": "chaqueta-tweed-estilo-chanel-couture-ref-eb-29-ebna-29",
    "name": "Chaqueta Tweed Estilo Chanel Couture (Ref. EB-29)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 30000,
    "images": [
      "/products/product_29.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T18:06:31.334Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-30",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-30-ebna-30",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-30)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 31500,
    "images": [
      "/products/product_30.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T17:06:31.337Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-31",
    "slug": "falda-lapiz-midi-con-apertura-posterior-ref-eb-31-ebna-31",
    "name": "Falda Lápiz Midi con Apertura Posterior (Ref. EB-31)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 18000,
    "images": [
      "/products/product_31.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T16:06:31.340Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-32",
    "slug": "camisa-de-lino-blanco-pure-luxury-edition-ref-eb-32-ebna-32",
    "name": "Camisa de Lino Blanco Pure Luxury Edition (Ref. EB-32)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 19500,
    "images": [
      "/products/product_32.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T15:06:31.343Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-33",
    "slug": "top-elegante-drapeado-satin-chic-ref-eb-33-ebna-33",
    "name": "Top Elegante Drapeado Satin Chic (Ref. EB-33)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 21000,
    "images": [
      "/products/product_33.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T14:06:31.346Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-34",
    "slug": "conjunto-de-punto-fino-primavera-verano-ref-eb-34-ebna-34",
    "name": "Conjunto de Punto Fino Primavera-Verano (Ref. EB-34)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 22500,
    "images": [
      "/products/product_34.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T13:06:31.348Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-35",
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ref-eb-35-ebna-35",
    "name": "Blusa de Seda con Lazada al Cuello Executive (Ref. EB-35)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 24000,
    "images": [
      "/products/product_35.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T12:06:31.350Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-36",
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-ref-eb-36-ebna-36",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-36)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 25500,
    "images": [
      "/products/product_36.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T11:06:31.353Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-37",
    "slug": "chaqueta-tweed-estilo-chanel-couture-ref-eb-37-ebna-37",
    "name": "Chaqueta Tweed Estilo Chanel Couture (Ref. EB-37)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 27000,
    "images": [
      "/products/product_37.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T10:06:31.356Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-38",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-38-ebna-38",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-38)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 28500,
    "images": [
      "/products/product_38.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T09:06:31.359Z",
    "updated_at": "2026-09-21T19:24:42.681Z"
  },
  {
    "id": "ebna-39",
    "slug": "falda-lapiz-midi-con-apertura-posterior-ref-eb-39-ebna-39",
    "name": "Falda Lápiz Midi con Apertura Posterior (Ref. EB-39)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 30000,
    "images": [
      "/products/product_39.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T08:06:31.362Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-40",
    "slug": "camisa-de-lino-blanco-pure-luxury-edition-ref-eb-40-ebna-40",
    "name": "Camisa de Lino Blanco Pure Luxury Edition (Ref. EB-40)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 31500,
    "images": [
      "/products/product_40.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T07:06:31.364Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-41",
    "slug": "top-elegante-drapeado-satin-chic-ref-eb-41-ebna-41",
    "name": "Top Elegante Drapeado Satin Chic (Ref. EB-41)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 18000,
    "images": [
      "/products/product_41.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T06:06:31.368Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-42",
    "slug": "conjunto-de-punto-fino-primavera-verano-ref-eb-42-ebna-42",
    "name": "Conjunto de Punto Fino Primavera-Verano (Ref. EB-42)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 19500,
    "images": [
      "/products/product_42.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T05:06:31.370Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-43",
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ref-eb-43-ebna-43",
    "name": "Blusa de Seda con Lazada al Cuello Executive (Ref. EB-43)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 21000,
    "images": [
      "/products/product_43.webp"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T04:06:31.374Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-44",
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-ref-eb-44-ebna-44",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-44)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 22500,
    "images": [
      "/products/product_44.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T03:06:31.377Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-45",
    "slug": "chaqueta-tweed-estilo-chanel-couture-ref-eb-45-ebna-45",
    "name": "Chaqueta Tweed Estilo Chanel Couture (Ref. EB-45)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 24000,
    "images": [
      "/products/product_45.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T02:06:31.380Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-46",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-46-ebna-46",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-46)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 25500,
    "images": [
      "/products/product_46.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T01:06:31.382Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-47",
    "slug": "falda-lapiz-midi-con-apertura-posterior-ref-eb-47-ebna-47",
    "name": "Falda Lápiz Midi con Apertura Posterior (Ref. EB-47)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 27000,
    "images": [
      "/products/product_47.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T00:06:31.384Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-48",
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-ref-eb-48-ebna-48",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris (Ref. EB-48)",
    "category": "CALZADO",
    "description": "Zapatos planos tipo bailarina confeccionados en encaje floral transpirable con acabado refinado. Plantilla acolchada para máxima comodidad todo el día.",
    "price": 22000,
    "images": [
      "/products/product_48.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-18T23:06:31.387Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-49",
    "slug": "gel-de-ducha-botanico-flora-peony-pivoine-fresh-500ml-ebna-49",
    "name": "Gel de Ducha Botánico Flora Peony Pivoine Fresh 500ml",
    "category": "HIGIENE",
    "description": "Gel de baño aromático con extracto de peonías frescas y aloe vera. Deja un velo de perfume floral sutil y piel aterciopelada.",
    "price": 7500,
    "images": [
      "/products/product_49.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Crema",
      "Transparente"
    ],
    "sizes": [
      "300ml",
      "500ml",
      "950ml",
      "1250ml"
    ],
    "created_at": "2026-09-18T22:06:31.390Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-50",
    "slug": "lapiz-labial-liquido-velvet-matte-waterproof-long-lasting-ebna-50",
    "name": "Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting",
    "category": "COSMETICA",
    "description": "Pintalabios líquido mate indeleble de alta pigmentación. Textura terciopelo intransferible que dura hasta 16 horas sin resecar los labios.",
    "price": 9000,
    "images": [
      "/products/product_50.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-18T21:06:31.393Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-51",
    "slug": "set-de-cosmetica-facial-brunch-beauty-glow-serum-50ml-ebna-51",
    "name": "Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)",
    "category": "COSMETICA",
    "description": "Concentrado ilumindor facial con vitamina C estabilizada y ácido hialurónico. Aporta frescura instantánea y efecto buena cara todo el día.",
    "price": 15000,
    "images": [
      "/products/product_51.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-18T20:06:31.396Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-52",
    "slug": "jabon-dermatologico-grisi-azufre-bio-purificante-100g-ebna-52",
    "name": "Jabón Dermatológico Grisi Azufre Bio-Purificante 100g",
    "category": "JABONES",
    "description": "Jabón medicinal purificante indicado para control de acné, exceso de grasa e imperfecciones. Formulación dermatológica efectiva de uso diario.",
    "price": 4500,
    "images": [
      "/products/product_52.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-18T19:06:31.399Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-53",
    "slug": "vestido-midi-gingham-smocked-tie-strap-elegance-ref-eb-53-ebna-53",
    "name": "Vestido Midi Gingham Smocked Tie-Strap Elegance (Ref. EB-53)",
    "category": "VESTIDOS",
    "description": "Vestido midi con estampado de cuadros gingham, cuerpo nido de abeja elástico y tirantes ajustables con lazo. Confección fluida ideal para eventos de verano.",
    "price": 24000,
    "images": [
      "/products/product_53.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa",
      "Rojo"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T18:06:31.406Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-54",
    "slug": "vestido-mini-halter-neck-bodycon-satin-finish-ref-eb-54-ebna-54",
    "name": "Vestido Mini Halter Neck Bodycon Satin Finish (Ref. EB-54)",
    "category": "VESTIDOS",
    "description": "Mini vestido entallado escote halter con detalle de botones dorados. Ajuste perfecto que realza la silueta con elegancia nocturna.",
    "price": 26000,
    "images": [
      "/products/product_54.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa",
      "Rojo"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T17:06:31.409Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-55",
    "slug": "jabon-clarificante-nutritivo-carowhite-skin-lightening-180g-ebna-55",
    "name": "Jabón Clarificante Nutritivo CaroWhite Skin Lightening 180g",
    "category": "JABONES",
    "description": "Jabón enriquecido con agentes aclarantes naturales y aceite de zanahoria. Unifica el tono corporal mientras nutre e hidrata profundamente.",
    "price": 5000,
    "images": [
      "/products/product_55.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-18T16:06:31.412Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-56",
    "slug": "falda-maxi-jersey-cerelina-white-couture-ref-eb-56-ebna-56",
    "name": "Falda Maxi Jersey Cerelina White Couture (Ref. EB-56)",
    "category": "VESTIDOS",
    "description": "Falda larga de punto elástico fino drapeada con ajuste de cintura alta. Caída espectacular de inspiración helénica.",
    "price": 20000,
    "images": [
      "/products/product_56.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa",
      "Rojo"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T15:06:31.414Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-57",
    "slug": "top-elegante-drapeado-satin-chic-ref-eb-57-ebna-57",
    "name": "Top Elegante Drapeado Satin Chic (Ref. EB-57)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 27000,
    "images": [
      "/products/product_57.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T14:06:31.417Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-58",
    "slug": "chaqueta-blazer-sastre-zara-style-new-collection-ref-eb-58-ebna-58",
    "name": "Chaqueta Blazer Sastre Zara Style New Collection (Ref. EB-58)",
    "category": "MODA",
    "description": "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda imprescindible de fondo de armario.",
    "price": 32000,
    "images": [
      "/products/product_58.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T13:06:31.420Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-59",
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ref-eb-59-ebna-59",
    "name": "Blusa de Seda con Lazada al Cuello Executive (Ref. EB-59)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 30000,
    "images": [
      "/products/product_59.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T12:06:31.423Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-60",
    "slug": "vestido-de-gala-silueta-sirena-satin-evening-dress-ref-eb-60-ebna-60",
    "name": "Vestido de Gala Silueta Sirena Satin Evening Dress (Ref. EB-60)",
    "category": "VESTIDOS",
    "description": "Vestido de noche drapeado en raso de seda con apertura lateral sutil. Sofisticación pura para celebraciones especiales en Guinea Ecuatorial.",
    "price": 32000,
    "images": [
      "/products/product_60.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa",
      "Rojo"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T11:06:31.426Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-61",
    "slug": "zapato-de-tacon-rugan-doble-tira-couture-ref-eb-61-ebna-61",
    "name": "Zapato de Tacón Rugan Doble Tira Couture (Ref. EB-61)",
    "category": "CALZADO",
    "description": "Zapatos de salón de charol satinado con doble tira y tacón estilizado. Diseño refinado para eventos de gala y noches exclusivas.",
    "price": 35000,
    "images": [
      "/products/product_61.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-18T10:06:31.429Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-62",
    "slug": "exfoliante-labial-nutritivo-de-coco-frambuesa-30g-ebna-62",
    "name": "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g",
    "category": "COSMETICA",
    "description": "Bálsamo exfoliante de labios con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas e ilumina el tono natural de los labios.",
    "price": 6500,
    "images": [
      "/products/product_62.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-18T09:06:31.432Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-63",
    "slug": "exfoliante-labial-nutritivo-de-coco-frambuesa-30g-ebna-63",
    "name": "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g",
    "category": "COSMETICA",
    "description": "Bálsamo exfoliante de labios con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas e ilumina el tono natural de los labios.",
    "price": 6500,
    "images": [
      "/products/product_63.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-18T08:06:31.434Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-64",
    "slug": "exfoliante-labial-nutritivo-de-coco-frambuesa-30g-ebna-64",
    "name": "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g",
    "category": "COSMETICA",
    "description": "Bálsamo exfoliante de labios con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas e ilumina el tono natural de los labios.",
    "price": 6500,
    "images": [
      "/products/product_64.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-18T07:06:31.437Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-65",
    "slug": "camiseta-algodon-boston-athletic-fit-oversized-tee-ref-eb-65-ebna-65",
    "name": "Camiseta Algodón Boston Athletic Fit Oversized Tee (Ref. EB-65)",
    "category": "MODA",
    "description": "Camiseta de cuello redondo de algodón peinado de gramaje superior con tipografía universitaria en el pecho.",
    "price": 14000,
    "images": [
      "/products/product_65.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T06:06:31.439Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-66",
    "slug": "conjunto-de-punto-fino-primavera-verano-ref-eb-66-ebna-66",
    "name": "Conjunto de Punto Fino Primavera-Verano (Ref. EB-66)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 25500,
    "images": [
      "/products/product_66.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T05:06:31.442Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-67",
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ref-eb-67-ebna-67",
    "name": "Blusa de Seda con Lazada al Cuello Executive (Ref. EB-67)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 27000,
    "images": [
      "/products/product_67.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T04:06:31.446Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-68",
    "slug": "gel-de-ducha-lactoadvance-instituto-espanol-1250ml-edicion-familiar-ebna-68",
    "name": "Gel de Ducha Lactoadvance Instituto Español 1250ml (Edición Familiar)",
    "category": "HIGIENE",
    "description": "Gel de baño dermoprotector enriquecido con proteínas de la leche. Aporta suavidad extrema y protección diaria para toda la familia.",
    "price": 11000,
    "images": [
      "/products/product_68.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Crema",
      "Transparente"
    ],
    "sizes": [
      "300ml",
      "500ml",
      "950ml",
      "1250ml"
    ],
    "created_at": "2026-09-18T03:06:31.450Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-69",
    "slug": "pantalon-jeans-wide-leg-streetwear-y2k-edition-ref-eb-69-ebna-69",
    "name": "Pantalón Jeans Wide Leg Streetwear Y2K Edition (Ref. EB-69)",
    "category": "MODA",
    "description": "Pantalón vaquero de corte ancho holgado con detalles bordados retro Y2K. Algodón denim resistente de alta calidad.",
    "price": 28000,
    "images": [
      "/products/product_69.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T02:06:31.453Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-70",
    "slug": "sudadera-oversized-thermal-lined-kangaroo-hoodie-ref-eb-70-ebna-70",
    "name": "Sudadera Oversized Thermal Lined Kangaroo Hoodie (Ref. EB-70)",
    "category": "MODA",
    "description": "Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto para días frescos.",
    "price": 22000,
    "images": [
      "/products/product_70.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T01:06:31.456Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-71",
    "slug": "sudadera-oversized-thermal-lined-kangaroo-hoodie-ref-eb-71-ebna-71",
    "name": "Sudadera Oversized Thermal Lined Kangaroo Hoodie (Ref. EB-71)",
    "category": "MODA",
    "description": "Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto para días frescos.",
    "price": 22000,
    "images": [
      "/products/product_71.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T00:06:31.459Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-72",
    "slug": "gel-de-ducha-botanico-flora-peony-pivoine-fresh-500ml-ebna-72",
    "name": "Gel de Ducha Botánico Flora Peony Pivoine Fresh 500ml",
    "category": "HIGIENE",
    "description": "Gel de baño aromático con extracto de peonías frescas y aloe vera. Deja un velo de perfume floral sutil y piel aterciopelada.",
    "price": 7500,
    "images": [
      "/products/product_72.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Crema",
      "Transparente"
    ],
    "sizes": [
      "300ml",
      "500ml",
      "950ml",
      "1250ml"
    ],
    "created_at": "2026-09-17T23:06:31.462Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-73",
    "slug": "top-elegante-drapeado-satin-chic-ref-eb-73-ebna-73",
    "name": "Top Elegante Drapeado Satin Chic (Ref. EB-73)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 21000,
    "images": [
      "/products/product_73.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T22:06:31.465Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-74",
    "slug": "jabon-artesanal-de-curcuma-acido-kojico-iluminador-100g-ebna-74",
    "name": "Jabón Artesanal de Cúrcuma & Ácido Kójico Iluminador 100g",
    "category": "JABONES",
    "description": "Jabón artesanal enriquecido con cúrcuma orgánica y ácido kójico. Ayuda a atenuar manchas, renovar la textura cutánea y aportar luminosidad natural.",
    "price": 4000,
    "images": [
      "/products/product_74.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-17T21:06:31.467Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-75",
    "slug": "calzado-femenino-malla-calada-spring-style-ref-eb-75-ebna-75",
    "name": "Calzado Femenino Malla Calada Spring Style (Ref. EB-75)",
    "category": "CALZADO",
    "description": "Zapatos planos de diseño calado primaveral con adorno de lazo frontal. Flexibles, elegantes y ultra frescos.",
    "price": 24000,
    "images": [
      "/products/product_75.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-17T20:06:31.470Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-76",
    "slug": "locion-corporal-hidratante-avena-instituto-espanol-950ml-ebna-76",
    "name": "Loción Corporal Hidratante Avena Instituto Español 950ml",
    "category": "HIGIENE",
    "description": "Loción corporal de formato familiar formulada con extracto de avena 100% natural. Proporciona 24 horas de hidratación profunda sin dejar sensación grasa.",
    "price": 9500,
    "images": [
      "/products/product_76.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Crema",
      "Transparente"
    ],
    "sizes": [
      "300ml",
      "500ml",
      "950ml",
      "1250ml"
    ],
    "created_at": "2026-09-17T19:06:31.472Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-77",
    "slug": "locion-corporal-reparadora-urea-10-instituto-espanol-500ml-ebna-77",
    "name": "Loción Corporal Reparadora Urea 10% Instituto Español 500ml",
    "category": "HIGIENE",
    "description": "Tratamiento dermatológico intensivo con 10% de Urea para pieles muy secas o rugosas. Suaviza la piel de inmediato y elimina descamaciones.",
    "price": 8500,
    "images": [
      "/products/product_77.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Crema",
      "Transparente"
    ],
    "sizes": [
      "300ml",
      "500ml",
      "950ml",
      "1250ml"
    ],
    "created_at": "2026-09-17T18:06:31.476Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-78",
    "slug": "gorro-satinado-ajustable-protector-para-trenzas-cabello-largo-ebna-78",
    "name": "Gorro Satinado Ajustable Protector para Trenzas & Cabello Largo",
    "category": "HIGIENE",
    "description": "Gorro de satén de seda doble capa con banda elástica ajustable. Previene el encrespamiento, retiene la hidratación nocturna y protege peinados y trenzas.",
    "price": 6000,
    "images": [
      "/products/product_78.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Crema",
      "Transparente"
    ],
    "sizes": [
      "300ml",
      "500ml",
      "950ml",
      "1250ml"
    ],
    "created_at": "2026-09-17T17:06:31.479Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-79",
    "slug": "falda-lapiz-midi-con-apertura-posterior-ref-eb-79-ebna-79",
    "name": "Falda Lápiz Midi con Apertura Posterior (Ref. EB-79)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 30000,
    "images": [
      "/products/product_79.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T16:06:31.482Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-80",
    "slug": "crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-ebna-80",
    "name": "Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)",
    "category": "COSMETICA",
    "description": "Tratamiento facial despigmentante de alta gama con protección solar muy alta SPF50+. Reduce manchas oscuras y previene su reaparición unificando el tono.",
    "price": 22000,
    "images": [
      "/products/product_80.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-17T15:06:31.489Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-81",
    "slug": "top-elegante-drapeado-satin-chic-ref-eb-81-ebna-81",
    "name": "Top Elegante Drapeado Satin Chic (Ref. EB-81)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 18000,
    "images": [
      "/products/product_81.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T14:06:31.492Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-82",
    "slug": "pantalon-corto-bermuda-casual-men-s-solid-color-ref-eb-82-ebna-82",
    "name": "Pantalón Corto Bermuda Casual Men's Solid Color (Ref. EB-82)",
    "category": "MODA",
    "description": "Bermuda masculina de algodón ligero con cintura elástica y cordón ajustable. Comodidad diaria garantizada.",
    "price": 15000,
    "images": [
      "/products/product_82.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T13:06:31.496Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-83",
    "slug": "calzado-femenino-malla-calada-spring-style-ref-eb-83-ebna-83",
    "name": "Calzado Femenino Malla Calada Spring Style (Ref. EB-83)",
    "category": "CALZADO",
    "description": "Zapatos planos de diseño calado primaveral con adorno de lazo frontal. Flexibles, elegantes y ultra frescos.",
    "price": 24000,
    "images": [
      "/products/product_83.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-17T12:06:31.498Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-84",
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-ref-eb-84-ebna-84",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Ref. EB-84)",
    "category": "MODA",
    "description": "Set de 2 piezas compuesto por top corto con capucha y pantalón acampanado elástico. Estilo athleisure de corte impecable.",
    "price": 25000,
    "images": [
      "/products/product_84.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T11:06:31.501Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-85",
    "slug": "calzado-femenino-malla-calada-spring-style-ref-eb-85-ebna-85",
    "name": "Calzado Femenino Malla Calada Spring Style (Ref. EB-85)",
    "category": "CALZADO",
    "description": "Zapatos planos de diseño calado primaveral con adorno de lazo frontal. Flexibles, elegantes y ultra frescos.",
    "price": 24000,
    "images": [
      "/products/product_85.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-17T10:06:31.504Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-86",
    "slug": "jabon-artesanal-de-curcuma-acido-kojico-iluminador-100g-ebna-86",
    "name": "Jabón Artesanal de Cúrcuma & Ácido Kójico Iluminador 100g",
    "category": "JABONES",
    "description": "Jabón artesanal enriquecido con cúrcuma orgánica y ácido kójico. Ayuda a atenuar manchas, renovar la textura cutánea y aportar luminosidad natural.",
    "price": 4000,
    "images": [
      "/products/product_86.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-17T09:06:31.507Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-87",
    "slug": "falda-lapiz-midi-con-apertura-posterior-ref-eb-87-ebna-87",
    "name": "Falda Lápiz Midi con Apertura Posterior (Ref. EB-87)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 27000,
    "images": [
      "/products/product_87.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T08:06:31.510Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-88",
    "slug": "camisa-de-lino-blanco-pure-luxury-edition-ref-eb-88-ebna-88",
    "name": "Camisa de Lino Blanco Pure Luxury Edition (Ref. EB-88)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 28500,
    "images": [
      "/products/product_88.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T07:06:31.513Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-89",
    "slug": "camiseta-algodon-boston-athletic-fit-oversized-tee-ref-eb-89-ebna-89",
    "name": "Camiseta Algodón Boston Athletic Fit Oversized Tee (Ref. EB-89)",
    "category": "MODA",
    "description": "Camiseta de cuello redondo de algodón peinado de gramaje superior con tipografía universitaria en el pecho.",
    "price": 14000,
    "images": [
      "/products/product_89.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T06:06:31.516Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-90",
    "slug": "jabon-vegetal-palmolive-naturals-extractos-herbales-pack-12-x-90g-ebna-90",
    "name": "Jabón Vegetal Palmolive Naturals Extractos Herbales (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Pack familiar de jabones enriquecidos con extractos herbales purificantes y aroma botánico. Limpieza profunda respetando el pH natural de la piel.",
    "price": 8500,
    "images": [
      "/products/product_90.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-17T05:06:31.518Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-91",
    "slug": "jabon-vegetal-palmolive-naturals-extractos-herbales-pack-12-x-90g-ebna-91",
    "name": "Jabón Vegetal Palmolive Naturals Extractos Herbales (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Pack familiar de jabones enriquecidos con extractos herbales purificantes y aroma botánico. Limpieza profunda respetando el pH natural de la piel.",
    "price": 8500,
    "images": [
      "/products/product_91.webp"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-17T04:06:31.520Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-92",
    "slug": "jabon-vegetal-palmolive-naturals-extractos-herbales-pack-12-x-90g-ebna-92",
    "name": "Jabón Vegetal Palmolive Naturals Extractos Herbales (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Pack familiar de jabones enriquecidos con extractos herbales purificantes y aroma botánico. Limpieza profunda respetando el pH natural de la piel.",
    "price": 8500,
    "images": [
      "/products/product_92.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-17T03:06:31.523Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-93",
    "slug": "jabon-vegetal-palmolive-naturals-extractos-herbales-pack-12-x-90g-ebna-93",
    "name": "Jabón Vegetal Palmolive Naturals Extractos Herbales (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Pack familiar de jabones enriquecidos con extractos herbales purificantes y aroma botánico. Limpieza profunda respetando el pH natural de la piel.",
    "price": 8500,
    "images": [
      "/products/product_93.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-17T02:06:31.526Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-94",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-94-ebna-94",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-94)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 22500,
    "images": [
      "/products/product_94.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T01:06:31.529Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-95",
    "slug": "jabon-artesanal-crystal-egg-con-aceites-esenciales-120g-ebna-95",
    "name": "Jabón Artesanal Crystal Egg con Aceites Esenciales 120g",
    "category": "JABONES",
    "description": "Jabón de lujo en forma de huevo de cristal con aceites esenciales relajantes y glicerina vegetal. Experiencia sensorial única en el baño.",
    "price": 5500,
    "images": [
      "/products/product_95.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-17T00:06:31.532Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-96",
    "slug": "zuecos-confort-crocs-original-limited-edition-ref-eb-96-ebna-96",
    "name": "Zuecos Confort Crocs Original Limited Edition (Ref. EB-96)",
    "category": "CALZADO",
    "description": "Calzado ligero e impermeable con plantilla ortopédica ultra cómoda. Ideal para uso diario y descanso con estilo exclusivo.",
    "price": 18000,
    "images": [
      "/products/product_96.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-16T23:06:31.534Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-97",
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-ref-eb-97-ebna-97",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Ref. EB-97)",
    "category": "MODA",
    "description": "Set de 2 piezas compuesto por top corto con capucha y pantalón acampanado elástico. Estilo athleisure de corte impecable.",
    "price": 25000,
    "images": [
      "/products/product_97.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T22:06:31.537Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-98",
    "slug": "conjunto-de-punto-fino-primavera-verano-ref-eb-98-ebna-98",
    "name": "Conjunto de Punto Fino Primavera-Verano (Ref. EB-98)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 28500,
    "images": [
      "/products/product_98.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T21:06:31.540Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-99",
    "slug": "funda-porta-pasaporte-executive-pu-leather-porta-tarjetas-de-viaje-ebna-99",
    "name": "Funda Porta Pasaporte Executive PU Leather & Porta Tarjetas de Viaje",
    "category": "ACCESORIOS",
    "description": "Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa. Incluye ranuras para pasaporte, pasajes y tarjetas.",
    "price": 12000,
    "images": [
      "/products/product_99.webp"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Negro",
      "Marrón",
      "Dorado"
    ],
    "sizes": [
      "Unica",
      "Standard"
    ],
    "created_at": "2026-09-16T20:06:31.544Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-100",
    "slug": "calzado-femenino-malla-calada-spring-style-ref-eb-100-ebna-100",
    "name": "Calzado Femenino Malla Calada Spring Style (Ref. EB-100)",
    "category": "CALZADO",
    "description": "Zapatos planos de diseño calado primaveral con adorno de lazo frontal. Flexibles, elegantes y ultra frescos.",
    "price": 24000,
    "images": [
      "/products/product_100.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-16T19:06:31.547Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-101",
    "slug": "jabon-artesanal-de-curcuma-acido-kojico-iluminador-100g-ebna-101",
    "name": "Jabón Artesanal de Cúrcuma & Ácido Kójico Iluminador 100g",
    "category": "JABONES",
    "description": "Jabón artesanal enriquecido con cúrcuma orgánica y ácido kójico. Ayuda a atenuar manchas, renovar la textura cutánea y aportar luminosidad natural.",
    "price": 4000,
    "images": [
      "/products/product_101.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-16T18:06:31.549Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-102",
    "slug": "jabon-artesanal-de-curcuma-acido-kojico-iluminador-100g-ebna-102",
    "name": "Jabón Artesanal de Cúrcuma & Ácido Kójico Iluminador 100g",
    "category": "JABONES",
    "description": "Jabón artesanal enriquecido con cúrcuma orgánica y ácido kójico. Ayuda a atenuar manchas, renovar la textura cutánea y aportar luminosidad natural.",
    "price": 4000,
    "images": [
      "/products/product_102.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-16T17:06:31.552Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-103",
    "slug": "jabon-corporal-hidratante-mel-aveia-nutricion-intensa-ebna-103",
    "name": "Jabón Corporal Hidratante Mel & Aveia Nutrición Intensa",
    "category": "JABONES",
    "description": "Jabón cremoso de miel y avena coloidal. Calma pieles sensibles, restaura la barrera cutánea y proporciona una textura ultrasuave.",
    "price": 3500,
    "images": [
      "/products/product_103.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-16T16:06:31.554Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-104",
    "slug": "zuecos-confort-crocs-original-limited-edition-ref-eb-104-ebna-104",
    "name": "Zuecos Confort Crocs Original Limited Edition (Ref. EB-104)",
    "category": "CALZADO",
    "description": "Calzado ligero e impermeable con plantilla ortopédica ultra cómoda. Ideal para uso diario y descanso con estilo exclusivo.",
    "price": 18000,
    "images": [
      "/products/product_104.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-16T15:06:31.558Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-105",
    "slug": "jabon-corporal-hidratante-mel-aveia-nutricion-intensa-ebna-105",
    "name": "Jabón Corporal Hidratante Mel & Aveia Nutrición Intensa",
    "category": "JABONES",
    "description": "Jabón cremoso de miel y avena coloidal. Calma pieles sensibles, restaura la barrera cutánea y proporciona una textura ultrasuave.",
    "price": 3500,
    "images": [
      "/products/product_105.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-16T14:06:31.566Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-106",
    "slug": "conjunto-de-punto-fino-primavera-verano-ref-eb-106-ebna-106",
    "name": "Conjunto de Punto Fino Primavera-Verano (Ref. EB-106)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 25500,
    "images": [
      "/products/product_106.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T13:06:31.568Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-107",
    "slug": "pantalon-corto-bermuda-casual-men-s-solid-color-ref-eb-107-ebna-107",
    "name": "Pantalón Corto Bermuda Casual Men's Solid Color (Ref. EB-107)",
    "category": "MODA",
    "description": "Bermuda masculina de algodón ligero con cintura elástica y cordón ajustable. Comodidad diaria garantizada.",
    "price": 15000,
    "images": [
      "/products/product_107.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T12:06:31.571Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-108",
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-ref-eb-108-ebna-108",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-108)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 28500,
    "images": [
      "/products/product_108.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T11:06:31.574Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-109",
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-ref-eb-109-ebna-109",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris (Ref. EB-109)",
    "category": "CALZADO",
    "description": "Zapatos planos tipo bailarina confeccionados en encaje floral transpirable con acabado refinado. Plantilla acolchada para máxima comodidad todo el día.",
    "price": 22000,
    "images": [
      "/products/product_109.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-16T10:06:31.577Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-110",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-110-ebna-110",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-110)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 31500,
    "images": [
      "/products/product_110.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T09:06:31.580Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-111",
    "slug": "set-de-cosmetica-facial-brunch-beauty-glow-serum-50ml-ebna-111",
    "name": "Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)",
    "category": "COSMETICA",
    "description": "Concentrado ilumindor facial con vitamina C estabilizada y ácido hialurónico. Aporta frescura instantánea y efecto buena cara todo el día.",
    "price": 15000,
    "images": [
      "/products/product_111.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-16T08:06:31.582Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-112",
    "slug": "chaqueta-active-soft-mid-layer-zip-up-oh-polly-style-ref-eb-112-ebna-112",
    "name": "Chaqueta Active Soft Mid-Layer Zip Up Oh Polly Style (Ref. EB-112)",
    "category": "MODA",
    "description": "Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal y cuello alzado. Realza la figura con estilo futurista.",
    "price": 27000,
    "images": [
      "/products/product_112.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T07:06:31.585Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-113",
    "slug": "chaqueta-active-soft-mid-layer-zip-up-oh-polly-style-ref-eb-113-ebna-113",
    "name": "Chaqueta Active Soft Mid-Layer Zip Up Oh Polly Style (Ref. EB-113)",
    "category": "MODA",
    "description": "Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal y cuello alzado. Realza la figura con estilo futurista.",
    "price": 27000,
    "images": [
      "/products/product_113.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T06:06:31.587Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-114",
    "slug": "conjunto-de-punto-fino-primavera-verano-ref-eb-114-ebna-114",
    "name": "Conjunto de Punto Fino Primavera-Verano (Ref. EB-114)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 22500,
    "images": [
      "/products/product_114.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T05:06:31.590Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-115",
    "slug": "vestido-veraniego-polka-dot-retro-flared-ref-eb-115-ebna-115",
    "name": "Vestido Veraniego Polka Dot Retro Flared (Ref. EB-115)",
    "category": "VESTIDOS",
    "description": "Vestido acampanado con estampado de lunares vintage y escote en V. Tejido de algodón transpirable suave y fresco.",
    "price": 22000,
    "images": [
      "/products/product_115.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa",
      "Rojo"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T04:06:31.593Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-116",
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-ref-eb-116-ebna-116",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-116)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 25500,
    "images": [
      "/products/product_116.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T03:06:31.596Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-117",
    "slug": "crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-ebna-117",
    "name": "Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)",
    "category": "COSMETICA",
    "description": "Tratamiento facial despigmentante de alta gama con protección solar muy alta SPF50+. Reduce manchas oscuras y previene su reaparición unificando el tono.",
    "price": 22000,
    "images": [
      "/products/product_117.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-16T02:06:31.599Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-118",
    "slug": "crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-ebna-118",
    "name": "Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)",
    "category": "COSMETICA",
    "description": "Tratamiento facial despigmentante de alta gama con protección solar muy alta SPF50+. Reduce manchas oscuras y previene su reaparición unificando el tono.",
    "price": 22000,
    "images": [
      "/products/product_118.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-16T01:06:31.601Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-119",
    "slug": "jabon-artesanal-de-curcuma-acido-kojico-iluminador-100g-ebna-119",
    "name": "Jabón Artesanal de Cúrcuma & Ácido Kójico Iluminador 100g",
    "category": "JABONES",
    "description": "Jabón artesanal enriquecido con cúrcuma orgánica y ácido kójico. Ayuda a atenuar manchas, renovar la textura cutánea y aportar luminosidad natural.",
    "price": 4000,
    "images": [
      "/products/product_119.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-16T00:06:31.604Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-120",
    "slug": "exfoliante-corporal-de-curcuma-sal-marina-con-aceite-de-jojoba-250g-ebna-120",
    "name": "Exfoliante Corporal de Cúrcuma & Sal Marina con Aceite de Jojoba 250g",
    "category": "COSMETICA",
    "description": "Scrub corporal pulidor con sal marina fina, cúrcuma y aceite de jojoba puro. Remueve células muertas dejando la piel sedosa y radiante.",
    "price": 12000,
    "images": [
      "/products/product_120.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-15T23:06:31.607Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-121",
    "slug": "jabon-corporal-hidratante-mel-aveia-nutricion-intensa-ebna-121",
    "name": "Jabón Corporal Hidratante Mel & Aveia Nutrición Intensa",
    "category": "JABONES",
    "description": "Jabón cremoso de miel y avena coloidal. Calma pieles sensibles, restaura la barrera cutánea y proporciona una textura ultrasuave.",
    "price": 3500,
    "images": [
      "/products/product_121.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-15T22:06:31.610Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-122",
    "slug": "jabon-corporal-hidratante-mel-aveia-nutricion-intensa-ebna-122",
    "name": "Jabón Corporal Hidratante Mel & Aveia Nutrición Intensa",
    "category": "JABONES",
    "description": "Jabón cremoso de miel y avena coloidal. Calma pieles sensibles, restaura la barrera cutánea y proporciona una textura ultrasuave.",
    "price": 3500,
    "images": [
      "/products/product_122.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-15T21:06:31.613Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-123",
    "slug": "vaselina-pura-reparadora-ebna-clinical-care-100g-ebna-123",
    "name": "Vaselina Pura Reparadora EBNA Clinical Care 100g",
    "category": "VASELINAS",
    "description": "Jalea de vaselina purificada al 100%. Crea una barrera oclusiva protectora que sellará la humedad en labios, codos y zonas agrietadas.",
    "price": 4000,
    "images": [
      "/products/product_123.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Transparente",
      "Dorado",
      "Rosado"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "250ml",
      "Pack 4x"
    ],
    "created_at": "2026-09-15T20:06:31.616Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-124",
    "slug": "jabon-corporal-hidratante-mel-aveia-nutricion-intensa-ebna-124",
    "name": "Jabón Corporal Hidratante Mel & Aveia Nutrición Intensa",
    "category": "JABONES",
    "description": "Jabón cremoso de miel y avena coloidal. Calma pieles sensibles, restaura la barrera cutánea y proporciona una textura ultrasuave.",
    "price": 3500,
    "images": [
      "/products/product_124.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Natural",
      "Blanco",
      "Amarillo"
    ],
    "sizes": [
      "100g",
      "150g",
      "180g",
      "Pack 3x",
      "Pack 12x"
    ],
    "created_at": "2026-09-15T19:06:31.618Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-125",
    "slug": "lapiz-labial-liquido-velvet-matte-waterproof-long-lasting-ebna-125",
    "name": "Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting",
    "category": "COSMETICA",
    "description": "Pintalabios líquido mate indeleble de alta pigmentación. Textura terciopelo intransferible que dura hasta 16 horas sin resecar los labios.",
    "price": 9000,
    "images": [
      "/products/product_125.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-15T18:06:31.624Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-126",
    "slug": "vestido-de-gala-silueta-sirena-satin-evening-dress-ref-eb-126-ebna-126",
    "name": "Vestido de Gala Silueta Sirena Satin Evening Dress (Ref. EB-126)",
    "category": "VESTIDOS",
    "description": "Vestido de noche drapeado en raso de seda con apertura lateral sutil. Sofisticación pura para celebraciones especiales en Guinea Ecuatorial.",
    "price": 32000,
    "images": [
      "/products/product_126.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa",
      "Rojo"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T17:06:31.627Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-127",
    "slug": "vestido-de-gala-silueta-sirena-satin-evening-dress-ref-eb-127-ebna-127",
    "name": "Vestido de Gala Silueta Sirena Satin Evening Dress (Ref. EB-127)",
    "category": "VESTIDOS",
    "description": "Vestido de noche drapeado en raso de seda con apertura lateral sutil. Sofisticación pura para celebraciones especiales en Guinea Ecuatorial.",
    "price": 32000,
    "images": [
      "/products/product_127.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa",
      "Rojo"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T16:06:31.630Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-128",
    "slug": "exfoliante-corporal-de-curcuma-sal-marina-con-aceite-de-jojoba-250g-ebna-128",
    "name": "Exfoliante Corporal de Cúrcuma & Sal Marina con Aceite de Jojoba 250g",
    "category": "COSMETICA",
    "description": "Scrub corporal pulidor con sal marina fina, cúrcuma y aceite de jojoba puro. Remueve células muertas dejando la piel sedosa y radiante.",
    "price": 12000,
    "images": [
      "/products/product_128.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-15T15:06:31.633Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-129",
    "slug": "set-de-cosmetica-facial-brunch-beauty-glow-serum-50ml-ebna-129",
    "name": "Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)",
    "category": "COSMETICA",
    "description": "Concentrado ilumindor facial con vitamina C estabilizada y ácido hialurónico. Aporta frescura instantánea y efecto buena cara todo el día.",
    "price": 15000,
    "images": [
      "/products/product_129.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Rojo",
      "Nude",
      "Transparente"
    ],
    "sizes": [
      "30g",
      "50ml",
      "100ml",
      "Standard"
    ],
    "created_at": "2026-09-15T14:06:31.635Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-130",
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-ref-eb-130-ebna-130",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris (Ref. EB-130)",
    "category": "CALZADO",
    "description": "Zapatos planos tipo bailarina confeccionados en encaje floral transpirable con acabado refinado. Plantilla acolchada para máxima comodidad todo el día.",
    "price": 22000,
    "images": [
      "/products/product_130.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-15T13:06:31.638Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-131",
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-ref-eb-131-ebna-131",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris (Ref. EB-131)",
    "category": "CALZADO",
    "description": "Zapatos planos tipo bailarina confeccionados en encaje floral transpirable con acabado refinado. Plantilla acolchada para máxima comodidad todo el día.",
    "price": 22000,
    "images": [
      "/products/product_131.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-15T12:06:31.641Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-132",
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-ref-eb-132-ebna-132",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris (Ref. EB-132)",
    "category": "CALZADO",
    "description": "Zapatos planos tipo bailarina confeccionados en encaje floral transpirable con acabado refinado. Plantilla acolchada para máxima comodidad todo el día.",
    "price": 22000,
    "images": [
      "/products/product_132.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-15T11:06:31.645Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-133",
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-ref-eb-133-ebna-133",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris (Ref. EB-133)",
    "category": "CALZADO",
    "description": "Zapatos planos tipo bailarina confeccionados en encaje floral transpirable con acabado refinado. Plantilla acolchada para máxima comodidad todo el día.",
    "price": 22000,
    "images": [
      "/products/product_133.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-15T10:06:31.647Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-134",
    "slug": "calzado-femenino-malla-calada-spring-style-ref-eb-134-ebna-134",
    "name": "Calzado Femenino Malla Calada Spring Style (Ref. EB-134)",
    "category": "CALZADO",
    "description": "Zapatos planos de diseño calado primaveral con adorno de lazo frontal. Flexibles, elegantes y ultra frescos.",
    "price": 24000,
    "images": [
      "/products/product_134.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Beige",
      "Bordo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-15T09:06:31.650Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-135",
    "slug": "chaqueta-blazer-sastre-zara-style-new-collection-ref-eb-135-ebna-135",
    "name": "Chaqueta Blazer Sastre Zara Style New Collection (Ref. EB-135)",
    "category": "MODA",
    "description": "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda imprescindible de fondo de armario.",
    "price": 32000,
    "images": [
      "/products/product_135.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T08:06:31.657Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-136",
    "slug": "chaqueta-blazer-sastre-zara-style-new-collection-ref-eb-136-ebna-136",
    "name": "Chaqueta Blazer Sastre Zara Style New Collection (Ref. EB-136)",
    "category": "MODA",
    "description": "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda imprescindible de fondo de armario.",
    "price": 32000,
    "images": [
      "/products/product_136.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T07:06:31.660Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-137",
    "slug": "chaqueta-blazer-sastre-zara-style-new-collection-ref-eb-137-ebna-137",
    "name": "Chaqueta Blazer Sastre Zara Style New Collection (Ref. EB-137)",
    "category": "MODA",
    "description": "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda imprescindible de fondo de armario.",
    "price": 32000,
    "images": [
      "/products/product_137.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T06:06:31.663Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-138",
    "slug": "conjunto-de-punto-fino-primavera-verano-ref-eb-138-ebna-138",
    "name": "Conjunto de Punto Fino Primavera-Verano (Ref. EB-138)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 28500,
    "images": [
      "/products/product_138.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T05:06:31.666Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-139",
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ref-eb-139-ebna-139",
    "name": "Blusa de Seda con Lazada al Cuello Executive (Ref. EB-139)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 30000,
    "images": [
      "/products/product_139.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T04:06:31.668Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-140",
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-ref-eb-140-ebna-140",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch (Ref. EB-140)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 31500,
    "images": [
      "/products/product_140.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T03:06:31.671Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-141",
    "slug": "sudadera-oversized-thermal-lined-kangaroo-hoodie-ref-eb-141-ebna-141",
    "name": "Sudadera Oversized Thermal Lined Kangaroo Hoodie (Ref. EB-141)",
    "category": "MODA",
    "description": "Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto para días frescos.",
    "price": 22000,
    "images": [
      "/products/product_141.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T02:06:31.674Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  },
  {
    "id": "ebna-142",
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-ref-eb-142-ebna-142",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico (Ref. EB-142)",
    "category": "MODA",
    "description": "Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables, costuras reforzadas y silueta favorecedora para lucir impecable en cualquier ocasión.",
    "price": 19500,
    "images": [
      "/products/product_142.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Marrón",
      "Rosa",
      "Azul"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T01:06:31.678Z",
    "updated_at": "2026-09-21T19:24:42.683Z"
  }
];

// Fast in-memory lookup maps for hyper-fast 0ms querying
const PRODUCTS_BY_ID = new Map<string, Product>();
const PRODUCTS_BY_SLUG = new Map<string, Product>();

INITIAL_PRODUCTS.forEach(p => {
  PRODUCTS_BY_ID.set(p.id, p);
  PRODUCTS_BY_SLUG.set(p.slug, p);
});

const LOCAL_PRODUCTS_KEY = 'ebna_local_products_v4';
const LOCAL_USERS_KEY = 'ebna_local_users_v4';

export function demoGetProducts(): Product[] {
  try {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error loading products from local cache:', e);
  }
  return INITIAL_PRODUCTS;
}

export function demoSaveProducts(products: Product[]): void {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.warn('Error saving products to local cache:', e);
  }
}

export function demoAddProduct(productData: Partial<Product>): Product {
  const list = demoGetProducts();
  const id = 'ebna-' + Date.now();
  const slug = (productData.name || 'producto').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + id;
  const newProduct: Product = {
    id,
    slug,
    name: productData.name || 'Nuevo Producto EBNA',
    category: (productData.category as any) || 'MODA',
    description: productData.description || 'Descripción del producto',
    price: productData.price || 15000,
    images: productData.images || ['/icons/ebna-logo.png'],
    in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
    is_hidden: productData.is_hidden !== undefined ? productData.is_hidden : false,
    colors: productData.colors || ['Blanco', 'Negro'],
    sizes: productData.sizes || ['S', 'M', 'L'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const updated = [newProduct, ...list];
  demoSaveProducts(updated);
  return newProduct;
}

export function demoUpdateProduct(id: string, updates: Partial<Product>): Product | null {
  const list = demoGetProducts();
  const index = list.findIndex(p => p.id === id);
  if (index === -1) return null;

  const updatedProduct = {
    ...list[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  list[index] = updatedProduct;
  demoSaveProducts(list);
  return updatedProduct;
}

export function demoDeleteProduct(id: string): boolean {
  const list = demoGetProducts();
  const filtered = list.filter(p => p.id !== id);
  demoSaveProducts(filtered);
  return true;
}

export function demoGetUsers(): UserAccount[] {
  try {
    const saved = localStorage.getItem(LOCAL_USERS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [
    {
      id: 'admin-1',
      email: 'admin@ebna.gq',
      full_name: 'Administrador EBNA Luxury',
      phone: '+240 222 633 687',
      role: 'ADMIN',
      created_at: new Date().toISOString(),
    }
  ];
}

export function demoUpdateUserRole(userId: string, newRole: 'USER' | 'ADMIN'): UserAccount[] {
  const users = demoGetUsers();
  const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

export function demoSignIn(email: string, _pass: string): { data: { user: any; profile: Profile } | null; error: any | null } {
  const clean = email.toLowerCase().trim();
  const isAdmin = clean.includes('admin');
  const userId = isAdmin ? 'admin-1' : 'user-' + Date.now();

  const user = { id: userId, email: clean };
  const profile: Profile = {
    id: userId,
    full_name: isAdmin ? 'Administrador EBNA Luxury' : 'Cliente EBNA Luxury',
    phone: '+240 222 633 687',
    role: isAdmin ? 'ADMIN' : 'USER',
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString(),
  };

  return {
    data: { user, profile },
    error: null,
  };
}

export function demoSignUp(email: string, _pass: string, name: string, phone: string): { data: { user: any; profile: Profile } | null; error: any | null } {
  const users = demoGetUsers();
  const userId = 'user-' + Date.now();
  const newUser: UserAccount = {
    id: userId,
    email,
    full_name: name,
    phone,
    role: 'USER',
    created_at: new Date().toISOString(),
  };
  users.push(newUser);
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (e) {}

  const user = { id: userId, email };
  const profile: Profile = {
    id: userId,
    full_name: name,
    phone,
    role: 'USER',
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString(),
  };

  return { data: { user, profile }, error: null };
}
