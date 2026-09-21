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
    "slug": "sneakers-urbanos-bicolor-sports-men-s-edition-ebna-1",
    "name": "Sneakers Urbanos Bicolor Sports Men's Edition",
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
    "slug": "set-de-cosmetica-facial-brunch-beauty-glow-serum-vitamina-c-50ml-ebna-2",
    "name": "Set de Cosmética Facial Brunch Beauty Glow Serum Vitamina C (50ml)",
    "category": "COSMETICA",
    "description": "Concentrado iluminador facial con vitamina C estabilizada y ácido hialurónico. Aporta frescura instantánea y efecto buena cara.",
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
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-rose-ebna-3",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare Rose",
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
    "slug": "pantalon-palazzo-de-tiro-alto-fluid-touch-satin-noir-ebna-4",
    "name": "Pantalón Palazzo de Tiro Alto Fluid Touch Satin Noir",
    "category": "MODA",
    "description": "Pantalón de corte holgado confeccionado en crepe drapeado de alta densidad. Su tiro alto estiliza la figura mientras la caída fluida brinda comodidad y elegancia en cada movimiento.",
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
    "slug": "chaqueta-tweed-estilo-chanel-couture-blanco-negro-ebna-5",
    "name": "Chaqueta Tweed Estilo Chanel Couture Blanco & Negro",
    "category": "MODA",
    "description": "Chaqueta sastre de tweed estructurado inspirada en los clásicos de la alta costura parisina. Destaca por su entramado de hilos metálicos, botones grabados y forro interno satinado.",
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
    "slug": "mono-jumpsuit-entallado-escote-asimetrico-noir-ebna-6",
    "name": "Mono Jumpsuit Entallado Escote Asimétrico Noir",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
    "slug": "falda-lapiz-midi-con-apertura-posterior-negra-classic-ebna-7",
    "name": "Falda Lápiz Midi con Apertura Posterior Negra Classic",
    "category": "MODA",
    "description": "Falda lápiz de tiro alto confeccionada en tejido estructurado elástico. Presenta abertura posterior estratégica para facilitar el paso manteniendo una línea estilizada y formal.",
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
    "slug": "camisa-de-lino-blanco-pure-luxury-edition-ebna-8",
    "name": "Camisa de Lino Blanco Pure Luxury Edition",
    "category": "MODA",
    "description": "Camisa confeccionada en lino 100% transpirable de fibra larga. Ofrece un tacto fresco, corte clásico atemporal y acabado pulido para vestir con distinción en cualquier ocasión.",
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
    "slug": "top-elegante-drapeado-satin-chic-blanco-nieve-ebna-9",
    "name": "Top Elegante Drapeado Satin Chic Blanco Nieve",
    "category": "MODA",
    "description": "Top de satén seda con pliegues drapeados en el escote que resaltan los hombros y el busto. Un diseño versátil y glamuroso para combinar con faldas o pantalones de vestir.",
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
    "slug": "conjunto-de-punto-fino-primavera-verano-beige-soft-ebna-10",
    "name": "Conjunto de Punto Fino Primavera-Verano Beige Soft",
    "category": "MODA",
    "description": "Set de dos piezas tejido en hilo fino de tacto ultra suave. Ideal para climas cálidos y entretiempo, ofreciendo un ajuste cómodo y refinado para el día a día.",
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
    "slug": "blusa-de-seda-con-lazada-al-cuello-executive-ivory-ebna-11",
    "name": "Blusa de Seda con Lazada al Cuello Executive Ivory",
    "category": "MODA",
    "description": "Blusa femenina confeccionada en seda satinada con caída fluida. Destaca por sus acabados de alta costura, puños abotonados y cuello versátil con lazo adaptable para looks ejecutivos y de gala.",
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
    "description": "Jabón corporal elaborado con aceites vegetales y extractos botánicos naturales. Limpia suavemente la piel dejándola fresca y fragante.",
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
    "slug": "chaqueta-tweed-estilo-chanel-couture-rosa-pastel-dorado-ebna-13",
    "name": "Chaqueta Tweed Estilo Chanel Couture Rosa Pastel & Dorado",
    "category": "MODA",
    "description": "Chaqueta sastre de tweed estructurado inspirada en los clásicos de la alta costura parisina. Destaca por su entramado de hilos metálicos, botones grabados y forro interno satinado.",
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
    "slug": "jumpsuit-elegante-escote-cruzado-rojo-borgona-ebna-14",
    "name": "Jumpsuit Elegante Escote Cruzado Rojo Borgoña",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
    "slug": "falda-tubo-midi-tiro-alto-beige-sastre-ebna-15",
    "name": "Falda Tubo Midi Tiro Alto Beige Sastre",
    "category": "MODA",
    "description": "Falda lápiz de tiro alto confeccionada en tejido estructurado elástico. Presenta abertura posterior estratégica para facilitar el paso manteniendo una línea estilizada y formal.",
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
    "slug": "camisa-de-lino-entallada-beige-arena-natural-ebna-16",
    "name": "Camisa de Lino Entallada Beige Arena Natural",
    "category": "MODA",
    "description": "Camisa confeccionada en lino 100% transpirable de fibra larga. Ofrece un tacto fresco, corte clásico atemporal y acabado pulido para vestir con distinción en cualquier ocasión.",
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
    "slug": "pantalon-jeans-wide-leg-streetwear-y2k-denim-blue-ebna-17",
    "name": "Pantalón Jeans Wide Leg Streetwear Y2K Denim Blue",
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
    "slug": "pack-2x-leggings-elasticos-maternidad-confort-ultra-soft-ebna-18",
    "name": "Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft",
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
    "slug": "blusa-satinada-con-lazada-al-cuello-midnight-blue-ebna-19",
    "name": "Blusa Satinada con Lazada al Cuello Midnight Blue",
    "category": "MODA",
    "description": "Blusa femenina confeccionada en seda satinada con caída fluida. Destaca por sus acabados de alta costura, puños abotonados y cuello versátil con lazo adaptable para looks ejecutivos y de gala.",
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
    "slug": "pantalon-palazzo-plisado-beige-caramel-edition-ebna-20",
    "name": "Pantalón Palazzo Plisado Beige Caramel Edition",
    "category": "MODA",
    "description": "Pantalón de corte holgado confeccionado en crepe drapeado de alta densidad. Su tiro alto estiliza la figura mientras la caída fluida brinda comodidad y elegancia en cada movimiento.",
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
    "slug": "gafas-de-sol-classic-square-unisex-filtro-luz-azul-pack-3x-ebna-21",
    "name": "Gafas de Sol Classic Square Unisex Filtro Luz Azul (Pack 3x)",
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
    "slug": "mono-de-noche-entallado-con-cinturon-dorado-ebna-22",
    "name": "Mono de Noche Entallado con Cinturón Dorado",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
    "slug": "falda-lapiz-con-apertura-posterior-azul-marino-ebna-23",
    "name": "Falda Lápiz con Apertura Posterior Azul Marino",
    "category": "MODA",
    "description": "Falda lápiz de tiro alto confeccionada en tejido estructurado elástico. Presenta abertura posterior estratégica para facilitar el paso manteniendo una línea estilizada y formal.",
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
    "slug": "camisa-de-lino-manga-larga-azul-cielo-soft-ebna-24",
    "name": "Camisa de Lino Manga Larga Azul Cielo Soft",
    "category": "MODA",
    "description": "Camisa confeccionada en lino 100% transpirable de fibra larga. Ofrece un tacto fresco, corte clásico atemporal y acabado pulido para vestir con distinción en cualquier ocasión.",
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
    "slug": "top-drapeado-en-saten-seda-rosa-blush-ebna-25",
    "name": "Top Drapeado en Satén Seda Rosa Blush",
    "category": "MODA",
    "description": "Top de satén seda con pliegues drapeados en el escote que resaltan los hombros y el busto. Un diseño versátil y glamuroso para combinar con faldas o pantalones de vestir.",
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
    "slug": "chaqueta-blazer-sastre-zara-style-noir-executive-ebna-26",
    "name": "Chaqueta Blazer Sastre Zara Style Noir Executive",
    "category": "MODA",
    "description": "Blazer sastre con solapas de muesca y estructuración en hombros. Un básico imprescindible de oficina y eventos informales que eleva al instante cualquier atuendo.",
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
    "slug": "blusa-de-seda-con-lazo-frontal-rosa-empolvado-ebna-27",
    "name": "Blusa de Seda con Lazo Frontal Rosa Empolvado",
    "category": "MODA",
    "description": "Blusa femenina confeccionada en seda satinada con caída fluida. Destaca por sus acabados de alta costura, puños abotonados y cuello versátil con lazo adaptable para looks ejecutivos y de gala.",
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
    "slug": "pantalon-tailored-wide-leg-en-crepe-rosa-pastel-ebna-28",
    "name": "Pantalón Tailored Wide-Leg en Crepe Rosa Pastel",
    "category": "MODA",
    "description": "Pantalón de corte holgado confeccionado en crepe drapeado de alta densidad. Su tiro alto estiliza la figura mientras la caída fluida brinda comodidad y elegancia en cada movimiento.",
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
    "slug": "chaqueta-tweed-corta-chanel-style-azul-navy-ebna-29",
    "name": "Chaqueta Tweed Corta Chanel Style Azul Navy",
    "category": "MODA",
    "description": "Chaqueta sastre de tweed estructurado inspirada en los clásicos de la alta costura parisina. Destaca por su entramado de hilos metálicos, botones grabados y forro interno satinado.",
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
    "slug": "jumpsuit-sastre-asimetrico-verde-olivo-executive-ebna-30",
    "name": "Jumpsuit Sastre Asimétrico Verde Olivo Executive",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
    "slug": "falda-tubo-midi-elegante-borgona-silk-touch-ebna-31",
    "name": "Falda Tubo Midi Elegante Borgoña Silk Touch",
    "category": "MODA",
    "description": "Falda lápiz de tiro alto confeccionada en tejido estructurado elástico. Presenta abertura posterior estratégica para facilitar el paso manteniendo una línea estilizada y formal.",
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
    "slug": "camisa-de-lino-estilo-ejecutivo-verde-salvia-ebna-32",
    "name": "Camisa de Lino Estilo Ejecutivo Verde Salvia",
    "category": "MODA",
    "description": "Camisa confeccionada en lino 100% transpirable de fibra larga. Ofrece un tacto fresco, corte clásico atemporal y acabado pulido para vestir con distinción en cualquier ocasión.",
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
    "slug": "top-elegante-drapeado-satin-chic-champagne-ebna-33",
    "name": "Top Elegante Drapeado Satin Chic Champagne",
    "category": "MODA",
    "description": "Top de satén seda con pliegues drapeados en el escote que resaltan los hombros y el busto. Un diseño versátil y glamuroso para combinar con faldas o pantalones de vestir.",
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
    "slug": "set-de-punto-acanalado-top-falda-midi-sage-green-ebna-34",
    "name": "Set de Punto Acanalado Top & Falda Midi Sage Green",
    "category": "MODA",
    "description": "Set de dos piezas tejido en hilo fino de tacto ultra suave. Ideal para climas cálidos y entretiempo, ofreciendo un ajuste cómodo y refinado para el día a día.",
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
    "slug": "blusa-executive-en-seda-salmon-couture-ebna-35",
    "name": "Blusa Executive en Seda Salmón Couture",
    "category": "MODA",
    "description": "Blusa femenina confeccionada en seda satinada con caída fluida. Destaca por sus acabados de alta costura, puños abotonados y cuello versátil con lazo adaptable para looks ejecutivos y de gala.",
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
    "slug": "pantalon-palazzo-saten-esmeralda-couture-ebna-36",
    "name": "Pantalón Palazzo Satén Esmeralda Couture",
    "category": "MODA",
    "description": "Pantalón de corte holgado confeccionado en crepe drapeado de alta densidad. Su tiro alto estiliza la figura mientras la caída fluida brinda comodidad y elegancia en cada movimiento.",
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
    "slug": "chaqueta-tweed-estilo-chanel-couture-crema-botones-perla-ebna-37",
    "name": "Chaqueta Tweed Estilo Chanel Couture Crema & Botones Perla",
    "category": "MODA",
    "description": "Chaqueta sastre de tweed estructurado inspirada en los clásicos de la alta costura parisina. Destaca por su entramado de hilos metálicos, botones grabados y forro interno satinado.",
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
    "slug": "mono-fluido-de-fiesta-escote-v-blanco-marfil-ebna-38",
    "name": "Mono Fluido de Fiesta Escote V Blanco Marfil",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
    "slug": "falda-lapiz-con-apertura-posterior-camel-chic-ebna-39",
    "name": "Falda Lápiz con Apertura Posterior Camel Chic",
    "category": "MODA",
    "description": "Falda lápiz de tiro alto confeccionada en tejido estructurado elástico. Presenta abertura posterior estratégica para facilitar el paso manteniendo una línea estilizada y formal.",
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
    "slug": "camisa-de-lino-pure-luxury-rosa-pastel-ebna-40",
    "name": "Camisa de Lino Pure Luxury Rosa Pastel",
    "category": "MODA",
    "description": "Camisa confeccionada en lino 100% transpirable de fibra larga. Ofrece un tacto fresco, corte clásico atemporal y acabado pulido para vestir con distinción en cualquier ocasión.",
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
    "slug": "top-drapeado-satinado-verde-esmeralda-ebna-41",
    "name": "Top Drapeado Satinado Verde Esmeralda",
    "category": "MODA",
    "description": "Top de satén seda con pliegues drapeados en el escote que resaltan los hombros y el busto. Un diseño versátil y glamuroso para combinar con faldas o pantalones de vestir.",
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
    "slug": "conjunto-dos-piezas-punto-liviano-terracota-ebna-42",
    "name": "Conjunto Dos Piezas Punto Liviano Terracota",
    "category": "MODA",
    "description": "Set de dos piezas tejido en hilo fino de tacto ultra suave. Ideal para climas cálidos y entretiempo, ofreciendo un ajuste cómodo y refinado para el día a día.",
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
    "slug": "blusa-satinada-con-lazada-cuello-esmeralda-ebna-43",
    "name": "Blusa Satinada con Lazada Cuello Esmeralda",
    "category": "MODA",
    "description": "Blusa femenina confeccionada en seda satinada con caída fluida. Destaca por sus acabados de alta costura, puños abotonados y cuello versátil con lazo adaptable para looks ejecutivos y de gala.",
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
    "slug": "pantalon-fluido-tiro-alto-ivory-silky-blend-ebna-44",
    "name": "Pantalón Fluido Tiro Alto Ivory Silky Blend",
    "category": "MODA",
    "description": "Pantalón de corte holgado confeccionado en crepe drapeado de alta densidad. Su tiro alto estiliza la figura mientras la caída fluida brinda comodidad y elegancia en cada movimiento.",
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
    "slug": "chaqueta-tweed-chanel-style-verde-menta-hilos-dorados-ebna-45",
    "name": "Chaqueta Tweed Chanel Style Verde Menta & Hilos Dorados",
    "category": "MODA",
    "description": "Chaqueta sastre de tweed estructurado inspirada en los clásicos de la alta costura parisina. Destaca por su entramado de hilos metálicos, botones grabados y forro interno satinado.",
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
    "slug": "jumpsuit-de-seda-drapeado-azul-noche-ebna-46",
    "name": "Jumpsuit de Seda Drapeado Azul Noche",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
    "slug": "falda-tubo-de-tiro-alto-verde-botella-couture-ebna-47",
    "name": "Falda Tubo de Tiro Alto Verde Botella Couture",
    "category": "MODA",
    "description": "Falda lápiz de tiro alto confeccionada en tejido estructurado elástico. Presenta abertura posterior estratégica para facilitar el paso manteniendo una línea estilizada y formal.",
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
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-noir-ebna-48",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris Noir",
    "category": "CALZADO",
    "description": "Bailarinas planas confeccionadas en fino encaje floral transparente con ribete sintético reforzado. Plantilla acojinada y suela antideslizante para caminar con gracia y confort.",
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
    "slug": "serum-concentrado-rejuvenecedor-brunch-beauty-acido-hialuronico-50ml-ebna-51",
    "name": "Serum Concentrado Rejuvenecedor Brunch Beauty Ácido Hialurónico (50ml)",
    "category": "COSMETICA",
    "description": "Fórmula hidratante de triple peso molecular que rellena líneas finas y restaura la firmeza cutánea.",
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
    "slug": "vestido-midi-gingham-smocked-tie-strap-elegance-ebna-53",
    "name": "Vestido Midi Gingham Smocked Tie-Strap Elegance",
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
    "slug": "vestido-mini-halter-neck-bodycon-satin-finish-gold-ebna-54",
    "name": "Vestido Mini Halter Neck Bodycon Satin Finish Gold",
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
    "slug": "falda-maxi-jersey-cerelina-white-couture-ebna-56",
    "name": "Falda Maxi Jersey Cerelina White Couture",
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
    "slug": "top-elegante-drapeado-satin-chic-negro-azabache-ebna-57",
    "name": "Top Elegante Drapeado Satin Chic Negro Azabache",
    "category": "MODA",
    "description": "Top de satén seda con pliegues drapeados en el escote que resaltan los hombros y el busto. Un diseño versátil y glamuroso para combinar con faldas o pantalones de vestir.",
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
    "slug": "chaqueta-blazer-sastre-zara-style-camel-warm-ebna-58",
    "name": "Chaqueta Blazer Sastre Zara Style Camel Warm",
    "category": "MODA",
    "description": "Blazer sastre con solapas de muesca y estructuración en hombros. Un básico imprescindible de oficina y eventos informales que eleva al instante cualquier atuendo.",
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
    "slug": "blusa-de-seda-con-lazada-al-cuello-champagne-glow-ebna-59",
    "name": "Blusa de Seda con Lazada al Cuello Champagne Glow",
    "category": "MODA",
    "description": "Blusa femenina confeccionada en seda satinada con caída fluida. Destaca por sus acabados de alta costura, puños abotonados y cuello versátil con lazo adaptable para looks ejecutivos y de gala.",
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
    "slug": "vestido-de-gala-silueta-sirena-satin-evening-dress-crimson-ebna-60",
    "name": "Vestido de Gala Silueta Sirena Satin Evening Dress Crimson",
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
    "slug": "zapato-de-tacon-charol-doble-tira-couture-black-ebna-61",
    "name": "Zapato de Tacón Charol Doble Tira Couture Black",
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
    "slug": "balsamo-exfoliante-labial-mantequilla-de-cacao-vainilla-30g-ebna-63",
    "name": "Bálsamo Exfoliante Labial Mantequilla de Cacao & Vainilla 30g",
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
    "slug": "scrub-labial-renovador-frutos-rojos-azucar-moreno-30g-ebna-64",
    "name": "Scrub Labial Renovador Frutos Rojos & Azúcar Moreno 30g",
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
    "slug": "camiseta-algodon-boston-athletic-fit-oversized-tee-heather-ebna-65",
    "name": "Camiseta Algodón Boston Athletic Fit Oversized Tee Heather",
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
    "slug": "set-de-punto-fino-primavera-verano-off-white-ebna-66",
    "name": "Set de Punto Fino Primavera-Verano Off-White",
    "category": "MODA",
    "description": "Set de dos piezas tejido en hilo fino de tacto ultra suave. Ideal para climas cálidos y entretiempo, ofreciendo un ajuste cómodo y refinado para el día a día.",
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
    "slug": "blusa-silk-touch-executive-blanco-puro-ebna-67",
    "name": "Blusa Silk Touch Executive Blanco Puro",
    "category": "MODA",
    "description": "Blusa femenina confeccionada en seda satinada con caída fluida. Destaca por sus acabados de alta costura, puños abotonados y cuello versátil con lazo adaptable para looks ejecutivos y de gala.",
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
    "slug": "gel-de-ducha-dermoprotector-proteinas-de-leche-miel-500ml-ebna-68",
    "name": "Gel de Ducha Dermoprotector Proteínas de Leche & Miel 500ml",
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
    "slug": "pantalon-jeans-wide-leg-streetwear-y2k-vintage-wash-ebna-69",
    "name": "Pantalón Jeans Wide Leg Streetwear Y2K Vintage Wash",
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
    "slug": "sudadera-oversized-thermal-lined-kangaroo-hoodie-cream-ebna-70",
    "name": "Sudadera Oversized Thermal Lined Kangaroo Hoodie Cream",
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
    "slug": "sudadera-oversized-thermal-lined-kangaroo-hoodie-onyx-ebna-71",
    "name": "Sudadera Oversized Thermal Lined Kangaroo Hoodie Onyx",
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
    "slug": "exfoliante-corporal-de-curcuma-sal-marina-con-aceite-de-jojoba-250g-ebna-72",
    "name": "Exfoliante Corporal de Cúrcuma & Sal Marina con Aceite de Jojoba 250g",
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
    "slug": "top-drapeado-satinado-rojo-rubi-couture-ebna-73",
    "name": "Top Drapeado Satinado Rojo Rubí Couture",
    "category": "MODA",
    "description": "Top de satén seda con pliegues drapeados en el escote que resaltan los hombros y el busto. Un diseño versátil y glamuroso para combinar con faldas o pantalones de vestir.",
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
    "description": "Formulado para unificar el tono facial y corporal, atenuando manchas oscuras y aportando brillo natural.",
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
    "slug": "calzado-femenino-malla-calada-spring-style-transpirable-nude-ebna-75",
    "name": "Calzado Femenino Malla Calada Spring Style Transpirable Nude",
    "category": "CALZADO",
    "description": "Calzado casual femenino de malla tejida transpirable. Suela ligera y flexible diseñada para brindar la máxima frescura y comodidad durante todo el día.",
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
    "slug": "locion-corporal-familiar-avena-miel-100-natural-500ml-ebna-76",
    "name": "Loción Corporal Familiar Avena & Miel 100% Natural 500ml",
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
    "slug": "gel-de-ducha-nutritivo-flor-de-cerezo-aceite-de-argan-500ml-ebna-77",
    "name": "Gel de Ducha Nutritivo Flor de Cerezo & Aceite de Argán 500ml",
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
    "slug": "gorro-de-saten-doble-capa-regulable-anti-encrespamiento-ebna-78",
    "name": "Gorro de Satén Doble Capa Regulable Anti-Encrespamiento",
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
      "Standard"
    ],
    "created_at": "2026-09-17T17:06:31.479Z",
    "updated_at": "2026-09-21T19:24:42.682Z"
  },
  {
    "id": "ebna-79",
    "slug": "falda-lapiz-midi-con-apertura-posterior-gris-marengo-ebna-79",
    "name": "Falda Lápiz Midi con Apertura Posterior Gris Marengo",
    "category": "MODA",
    "description": "Falda lápiz de tiro alto confeccionada en tejido estructurado elástico. Presenta abertura posterior estratégica para facilitar el paso manteniendo una línea estilizada y formal.",
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
    "description": "Tratamiento de día unificante que aclara manchas oscuras existentes y protege contra rayos UVA/UVB.",
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
    "slug": "top-elegante-drapeado-satin-chic-dorado-festivo-ebna-81",
    "name": "Top Elegante Drapeado Satin Chic Dorado Festivo",
    "category": "MODA",
    "description": "Top de satén seda con pliegues drapeados en el escote que resaltan los hombros y el busto. Un diseño versátil y glamuroso para combinar con faldas o pantalones de vestir.",
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
    "slug": "pantalon-corto-bermuda-casual-men-s-solid-color-beige-ebna-82",
    "name": "Pantalón Corto Bermuda Casual Men's Solid Color Beige",
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
    "slug": "calzado-femenino-malla-calada-spring-style-negro-urbano-ebna-83",
    "name": "Calzado Femenino Malla Calada Spring Style Negro Urbano",
    "category": "CALZADO",
    "description": "Calzado casual femenino de malla tejida transpirable. Suela ligera y flexible diseñada para brindar la máxima frescura y comodidad durante todo el día.",
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
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-sage-ebna-84",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare Sage",
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
    "slug": "calzado-femenino-malla-calada-spring-style-blanco-puro-ebna-85",
    "name": "Calzado Femenino Malla Calada Spring Style Blanco Puro",
    "category": "CALZADO",
    "description": "Calzado casual femenino de malla tejida transpirable. Suela ligera y flexible diseñada para brindar la máxima frescura y comodidad durante todo el día.",
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
    "slug": "jabon-facial-anti-manchas-curcuma-kojico-vitamina-c-120g-ebna-86",
    "name": "Jabón Facial Anti-Manchas Cúrcuma, Kójico & Vitamina C 120g",
    "category": "JABONES",
    "description": "Limpiador facial despigmentante con potente acción antioxidante de vitamina C y cúrcuma concentrada.",
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
    "slug": "falda-tubo-elegante-crema-executive-ebna-87",
    "name": "Falda Tubo Elegante Crema Executive",
    "category": "MODA",
    "description": "Falda lápiz de tiro alto confeccionada en tejido estructurado elástico. Presenta abertura posterior estratégica para facilitar el paso manteniendo una línea estilizada y formal.",
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
    "slug": "camisa-de-lino-entallada-marfil-casual-chic-ebna-88",
    "name": "Camisa de Lino Entallada Marfil Casual Chic",
    "category": "MODA",
    "description": "Camisa confeccionada en lino 100% transpirable de fibra larga. Ofrece un tacto fresco, corte clásico atemporal y acabado pulido para vestir con distinción en cualquier ocasión.",
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
    "slug": "camiseta-algodon-boston-athletic-fit-oversized-tee-off-white-ebna-89",
    "name": "Camiseta Algodón Boston Athletic Fit Oversized Tee Off-White",
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
    "slug": "jabon-cremoso-palmolive-naturals-miel-y-proteina-de-leche-pack-12-x-90g-ebna-90",
    "name": "Jabón Cremoso Palmolive Naturals Miel y Proteína de Leche (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Fórmula humectante enriquecida con miel pura y proteína de leche que nutre la epidermis en cada baño.",
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
    "slug": "jabon-nutritivo-palmolive-naturals-aceite-de-oliva-y-aloe-pack-12-x-90g-ebna-91",
    "name": "Jabón Nutritivo Palmolive Naturals Aceite de Oliva y Áloe (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Enriquecido con aceite de oliva mediterráneo y extracto de aloe vera para una piel suave e hidratada.",
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
    "slug": "jabon-hidratante-palmolive-naturals-flor-de-cerezo-leche-pack-12-x-90g-ebna-92",
    "name": "Jabón Hidratante Palmolive Naturals Flor de Cerezo & Leche (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Fragancia delicada de flor de cerezo con infusión de leche humectante para renovar la textura cutánea.",
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
    "slug": "jabon-exfoliante-palmolive-naturals-semillas-de-karite-pack-12-x-90g-ebna-93",
    "name": "Jabón Exfoliante Palmolive Naturals Semillas de Karité (Pack 12 x 90g)",
    "category": "JABONES",
    "description": "Contiene micropartículas exfoliantes de semillas de karité que remueven células muertas revelando piel luminosa.",
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
    "slug": "mono-entallado-con-escote-asimetrico-rose-satin-ebna-94",
    "name": "Mono Entallado con Escote Asimétrico Rosé Satin",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
    "slug": "zuecos-confort-crocs-original-limited-edition-lavender-ebna-96",
    "name": "Zuecos Confort Crocs Original Limited Edition Lavender",
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
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-cocoa-ebna-97",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare Cocoa",
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
    "slug": "conjunto-casual-elegante-punto-acanalado-dusty-rose-ebna-98",
    "name": "Conjunto Casual Elegante Punto Acanalado Dusty Rose",
    "category": "MODA",
    "description": "Set de dos piezas tejido en hilo fino de tacto ultra suave. Ideal para climas cálidos y entretiempo, ofreciendo un ajuste cómodo y refinado para el día a día.",
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
    "slug": "calzado-femenino-malla-calada-spring-style-beige-caramel-ebna-100",
    "name": "Calzado Femenino Malla Calada Spring Style Beige Caramel",
    "category": "CALZADO",
    "description": "Calzado casual femenino de malla tejida transpirable. Suela ligera y flexible diseñada para brindar la máxima frescura y comodidad durante todo el día.",
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
    "slug": "barra-aclarante-corporal-curcuma-kojico-con-aceite-de-argan-ebna-101",
    "name": "Barra Aclarante Corporal Cúrcuma & Kójico con Aceite de Argán",
    "category": "JABONES",
    "description": "Barra aclarante corporal que combate la hiperpigmentación mientras nutre profundamente con aceite de argán.",
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
    "slug": "jabon-exfoliante-curcuma-acido-kojico-papaya-glow-ebna-102",
    "name": "Jabón Exfoliante Cúrcuma, Ácido Kójico & Papaya Glow",
    "category": "JABONES",
    "description": "Combina la enzima papaína con ácido kójico para acelerar la renovación celular y disipar cicatrices de acné.",
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
    "slug": "jabon-corporal-hidratante-miel-avena-nutricion-intensa-200g-ebna-103",
    "name": "Jabón Corporal Hidratante Miel & Avena Nutrición Intensa (200g)",
    "category": "JABONES",
    "description": "Jabón en pastilla enriquecido con miel orgánica y extracto de avena para calmar y reparar la barrera cutánea.",
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
    "slug": "zuecos-confort-crocs-original-limited-edition-mint-ebna-104",
    "name": "Zuecos Confort Crocs Original Limited Edition Mint",
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
    "slug": "jabon-artesanal-miel-de-abeja-organica-copos-de-avena-exfoliante-ebna-105",
    "name": "Jabón Artesanal Miel de Abeja Orgánica & Copos de Avena Exfoliante",
    "category": "JABONES",
    "description": "Elaboración artesanal con hojuelas de avena real que exfolian suavemente y miel pura humectante.",
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
    "slug": "set-knitwear-primavera-verano-taupe-luxury-ebna-106",
    "name": "Set Knitwear Primavera-Verano Taupe Luxury",
    "category": "MODA",
    "description": "Set de dos piezas tejido en hilo fino de tacto ultra suave. Ideal para climas cálidos y entretiempo, ofreciendo un ajuste cómodo y refinado para el día a día.",
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
    "slug": "pantalon-corto-bermuda-casual-men-s-solid-color-navy-ebna-107",
    "name": "Pantalón Corto Bermuda Casual Men's Solid Color Navy",
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
    "slug": "pantalon-sastre-ancho-navy-executive-ebna-108",
    "name": "Pantalón Sastre Ancho Navy Executive",
    "category": "MODA",
    "description": "Pantalón de corte holgado confeccionado en crepe drapeado de alta densidad. Su tiro alto estiliza la figura mientras la caída fluida brinda comodidad y elegancia en cada movimiento.",
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
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-blanc-ebna-109",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris Blanc",
    "category": "CALZADO",
    "description": "Bailarinas planas confeccionadas en fino encaje floral transparente con ribete sintético reforzado. Plantilla acojinada y suela antideslizante para caminar con gracia y confort.",
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
    "slug": "jumpsuit-formal-estilo-minimalista-charcoal-ebna-110",
    "name": "Jumpsuit Formal Estilo Minimalista Charcoal",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
    "slug": "elixir-facial-iluminador-brunch-beauty-niacinamida-rosas-50ml-ebna-111",
    "name": "Elixir Facial Iluminador Brunch Beauty Niacinamida & Rosas (50ml)",
    "category": "COSMETICA",
    "description": "Serum matificante con niacinamida al 10% y agua de rosas que cierra poros y equilibra la grasa facial.",
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
    "slug": "chaqueta-active-soft-mid-layer-zip-up-oh-polly-style-black-ebna-112",
    "name": "Chaqueta Active Soft Mid-Layer Zip Up Oh Polly Style Black",
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
    "slug": "chaqueta-active-soft-mid-layer-zip-up-oh-polly-style-nude-ebna-113",
    "name": "Chaqueta Active Soft Mid-Layer Zip Up Oh Polly Style Nude",
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
    "slug": "conjunto-de-punto-fino-top-pantalon-flare-camel-ebna-114",
    "name": "Conjunto de Punto Fino Top & Pantalón Flare Camel",
    "category": "MODA",
    "description": "Set de dos piezas tejido en hilo fino de tacto ultra suave. Ideal para climas cálidos y entretiempo, ofreciendo un ajuste cómodo y refinado para el día a día.",
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
    "slug": "vestido-veraniego-polka-dot-retro-flared-red-ebna-115",
    "name": "Vestido Veraniego Polka Dot Retro Flared Red",
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
    "slug": "pantalon-palazzo-plisado-chocolate-velvet-touch-ebna-116",
    "name": "Pantalón Palazzo Plisado Chocolate Velvet Touch",
    "category": "MODA",
    "description": "Pantalón de corte holgado confeccionado en crepe drapeado de alta densidad. Su tiro alto estiliza la figura mientras la caída fluida brinda comodidad y elegancia en cada movimiento.",
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
    "slug": "serum-concentrado-despigmentante-topicrem-mela-booster-30ml-ebna-117",
    "name": "Serum Concentrado Despigmentante Topicrem Mela Booster (30ml)",
    "category": "COSMETICA",
    "description": "Serum corrector intensivo que actúa en el corazón de los melanocitos para reducir la pigmentación persistente.",
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
    "slug": "leche-corporal-unificante-anti-manchas-topicrem-mela-ultra-moisturizing-200ml-ebna-118",
    "name": "Leche Corporal Unificante Anti-Manchas Topicrem Mela Ultra-Moisturizing (200ml)",
    "category": "COSMETICA",
    "description": "Loción corporal unificante de rápida absorción que hidrata durante 24 horas y homogeneiza el tono de la piel.",
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
    "slug": "pack-2x-jabones-curcuma-acido-kojico-tratamiento-completo-ebna-119",
    "name": "Pack 2x Jabones Cúrcuma & Ácido Kójico Tratamiento Completo",
    "category": "JABONES",
    "description": "Dúo de jabones aclarantes para uso diario en rostro y zonas sensibles como axilas e ingle.",
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
    "slug": "exfoliante-corporal-despigmentante-curcuma-sal-marina-karite-250g-ebna-120",
    "name": "Exfoliante Corporal Despigmentante Cúrcuma, Sal Marina & Karité 250g",
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
    "slug": "barra-vegetal-miel-avena-aceite-de-almendras-dulces-ebna-121",
    "name": "Barra Vegetal Miel, Avena & Aceite de Almendras Dulces",
    "category": "JABONES",
    "description": "Fórmula dermatológica ultrahidratante con aceite de almendras que previene la sequedad en pieles sensibles.",
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
    "slug": "jabon-cremoso-suavizante-miel-avena-piel-sensible-pack-4x-ebna-122",
    "name": "Jabón Cremoso Suavizante Miel & Avena Piel Sensible (Pack 4x)",
    "category": "JABONES",
    "description": "Pack familiar de 4 jabones cremosos hipoalergénicos con avena coloidal y extracto de miel enriquecida.",
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
    "slug": "jabon-bio-miel-avena-con-manteca-de-karite-pura-ebna-124",
    "name": "Jabón Bio Miel & Avena con Manteca de Karité Pura",
    "category": "JABONES",
    "description": "Tratamiento de limpieza profunda formulado con manteca de karité no refinada y miel nutritiva.",
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
    "slug": "lapiz-labial-liquido-velvet-matte-waterproof-plum-velvet-ebna-125",
    "name": "Lápiz Labial Líquido Velvet Matte Waterproof Plum Velvet",
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
    "slug": "vestido-de-gala-silueta-sirena-satin-evening-dress-emerald-ebna-126",
    "name": "Vestido de Gala Silueta Sirena Satin Evening Dress Emerald",
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
    "slug": "vestido-de-gala-silueta-sirena-satin-evening-dress-royal-blue-ebna-127",
    "name": "Vestido de Gala Silueta Sirena Satin Evening Dress Royal Blue",
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
    "slug": "exfoliante-corporal-nutritivo-manteca-de-karite-azucar-rubio-250g-ebna-128",
    "name": "Exfoliante Corporal Nutritivo Manteca de Karité & Azúcar Rubio 250g",
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
    "slug": "serum-reparador-nocturno-brunch-beauty-retinol-peptidos-50ml-ebna-129",
    "name": "Serum Reparador Nocturno Brunch Beauty Retinol & Péptidos (50ml)",
    "category": "COSMETICA",
    "description": "Tratamiento intensivo de noche con retinol liposomado que estimula la renovación celular mientras duermes.",
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
    "slug": "bailarinas-de-encaje-floral-ollio-paris-nude-rose-ebna-130",
    "name": "Bailarinas de Encaje Floral Ollio Paris Nude Rose",
    "category": "CALZADO",
    "description": "Bailarinas planas confeccionadas en fino encaje floral transparente con ribete sintético reforzado. Plantilla acojinada y suela antideslizante para caminar con gracia y confort.",
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
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-champagne-ebna-131",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris Champagne",
    "category": "CALZADO",
    "description": "Bailarinas planas confeccionadas en fino encaje floral transparente con ribete sintético reforzado. Plantilla acojinada y suela antideslizante para caminar con gracia y confort.",
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
    "slug": "bailarinas-de-encaje-floral-ollio-paris-dorado-chic-ebna-132",
    "name": "Bailarinas de Encaje Floral Ollio Paris Dorado Chic",
    "category": "CALZADO",
    "description": "Bailarinas planas confeccionadas en fino encaje floral transparente con ribete sintético reforzado. Plantilla acojinada y suela antideslizante para caminar con gracia y confort.",
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
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-silver-glow-ebna-133",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris Silver Glow",
    "category": "CALZADO",
    "description": "Bailarinas planas confeccionadas en fino encaje floral transparente con ribete sintético reforzado. Plantilla acojinada y suela antideslizante para caminar con gracia y confort.",
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
    "slug": "calzado-femenino-malla-calada-spring-style-rose-gold-ebna-134",
    "name": "Calzado Femenino Malla Calada Spring Style Rose Gold",
    "category": "CALZADO",
    "description": "Calzado casual femenino de malla tejida transpirable. Suela ligera y flexible diseñada para brindar la máxima frescura y comodidad durante todo el día.",
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
    "slug": "chaqueta-blazer-sastre-zara-style-ivory-elegance-ebna-135",
    "name": "Chaqueta Blazer Sastre Zara Style Ivory Elegance",
    "category": "MODA",
    "description": "Blazer sastre con solapas de muesca y estructuración en hombros. Un básico imprescindible de oficina y eventos informales que eleva al instante cualquier atuendo.",
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
    "slug": "chaqueta-blazer-sastre-zara-style-red-passion-ebna-136",
    "name": "Chaqueta Blazer Sastre Zara Style Red Passion",
    "category": "MODA",
    "description": "Blazer sastre con solapas de muesca y estructuración en hombros. Un básico imprescindible de oficina y eventos informales que eleva al instante cualquier atuendo.",
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
    "slug": "chaqueta-blazer-sastre-zara-style-navy-blue-ebna-137",
    "name": "Chaqueta Blazer Sastre Zara Style Navy Blue",
    "category": "MODA",
    "description": "Blazer sastre con solapas de muesca y estructuración en hombros. Un básico imprescindible de oficina y eventos informales que eleva al instante cualquier atuendo.",
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
    "slug": "set-de-punto-fino-primavera-verano-azul-serenity-ebna-138",
    "name": "Set de Punto Fino Primavera-Verano Azul Serenity",
    "category": "MODA",
    "description": "Set de dos piezas tejido en hilo fino de tacto ultra suave. Ideal para climas cálidos y entretiempo, ofreciendo un ajuste cómodo y refinado para el día a día.",
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
    "slug": "blusa-satinada-con-lazada-al-cuello-borgona-classic-ebna-139",
    "name": "Blusa Satinada con Lazada al Cuello Borgoña Classic",
    "category": "MODA",
    "description": "Blusa femenina confeccionada en seda satinada con caída fluida. Destaca por sus acabados de alta costura, puños abotonados y cuello versátil con lazo adaptable para looks ejecutivos y de gala.",
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
    "slug": "pantalon-drapeado-champagne-satin-deluxe-ebna-140",
    "name": "Pantalón Drapeado Champagne Satin Deluxe",
    "category": "MODA",
    "description": "Pantalón de corte holgado confeccionado en crepe drapeado de alta densidad. Su tiro alto estiliza la figura mientras la caída fluida brinda comodidad y elegancia en cada movimiento.",
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
    "slug": "sudadera-oversized-thermal-lined-kangaroo-hoodie-mocha-ebna-141",
    "name": "Sudadera Oversized Thermal Lined Kangaroo Hoodie Mocha",
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
    "slug": "mono-de-alta-costura-escote-cruzado-champagne-ebna-142",
    "name": "Mono de Alta Costura Escote Cruzado Champagne",
    "category": "MODA",
    "description": "Mono entero entallado con corte de sastrería y escote asimétrico contemporáneo. Confeccionado en tejido estructurado de tacto suave que abraza la silueta con total sofisticación.",
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
