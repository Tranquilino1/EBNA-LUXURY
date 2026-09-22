import type { Product, Profile } from '../types';
import { generateUUID } from './utils';
import { notifyCatalogChange } from './broadcast';
import { HD_PRODUCTS } from '../data/hdProducts';

export interface UserAccount {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  ...HD_PRODUCTS,
  {
    "id": "sindy-vest-01",
    "sku": "SL-VEST-01",
    "name": "Vestido Largo Drapeado Soleil Escultural",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Gala",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Espectacular vestido largo de noche en satén de seda drapeado artesanalmente. Escote halter fluido y silueta escultural que realza el movimiento con elegancia regia.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_amarillo_drapeado.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_amarillo_drapeado.jpg"
      ]
    },
    "details": {
      "size": [
        "XS",
        "M",
        "XL"
      ],
      "material": "Satén de Seda Pesado & Forro Elástico"
    },
    "slug": "vestido-largo-drapeado-soleil-escultural-sindy-1",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Amarillo",
      "Marrón",
      "Rojo",
      "Rosa"
    ],
    "sizes": [
      "XS",
      "M",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-02",
    "sku": "SL-VEST-02",
    "name": "Vestido Túnica Caftán Imperial Blanco con Mangas Capa",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Gala",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Majestuoso caftán de gala con mangas capa fluidas y detalles dorados en el escote. Confección en gasa de seda ligera con caída escultural para eventos de alta sociedad.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_tunica_caftan_blanco.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_tunica_caftan_blanco.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Gasa de Seda Pura & Satén Crepé"
    },
    "slug": "vestido-tunica-caftan-imperial-blanco-sindy-6",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco Puro"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-03",
    "sku": "SL-VEST-03",
    "name": "Vestido Sirena Marrón Chocolate Asimétrico",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Gala",
    "priceFCFA": 25000,
    "originalPriceFCFA": 28000,
    "inStock": true,
    "featured": true,
    "description": "Vestido largo de noche corte sirena en punto crepé stretch color chocolate oscuro. Escote asimétrico de un solo hombro con fruncido lateral moldeador.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_sirena_chocolate.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_sirena_chocolate.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Punto Crepé Stretch & Spandex"
    },
    "slug": "vestido-sirena-marron-chocolate-asimetrico-sindy-9",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Marrón Chocolate",
      "Rojo",
      "Negro"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-04",
    "sku": "SL-VEST-04",
    "name": "Vestido Azul Noche Gala Satinado con Abertura",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Gala",
    "priceFCFA": 21000,
    "originalPriceFCFA": 25000,
    "inStock": true,
    "featured": true,
    "description": "Vestido de fiesta en satén azul noche de alta densidad con abertura lateral pronunciada. Tirantes joya entrecruzados en la espalda descubierta.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_azul_noche_gala.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_azul_noche_gala.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Satén de Seda Pesado & Spandex"
    },
    "slug": "vestido-azul-noche-gala-satinado-abertura-sindy-10",
    "price": 21000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Azul Noche"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-05",
    "sku": "SL-VEST-05",
    "name": "Vestido Corto Fiesta Tul Violeta con Vuelo",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Cóctel",
    "priceFCFA": 27000,
    "originalPriceFCFA": 32000,
    "inStock": true,
    "featured": true,
    "description": "Mini vestido de cóctel en capas superpuestas de tul violeta couture palabra de honor con corsé interior entallado y falda con volumen vaporoso.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_violeta_tul_couture.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_violeta_tul_couture.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Tul Ilusión Francés & Raso de Seda"
    },
    "slug": "vestido-corto-fiesta-tul-violeta-vuelo-sindy-11",
    "price": 27000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Violeta",
      "Rojo",
      "Rosa",
      "Azul",
      "Negro",
      "Marrón"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-06",
    "sku": "SL-VEST-06",
    "name": "Vestido Tubo Midi Marfil Escultural",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Gala",
    "priceFCFA": 23000,
    "originalPriceFCFA": 27000,
    "inStock": true,
    "featured": true,
    "description": "Vestido tubo midi en tejido crepé premium color marfil. Cuello cisne refinado, costuras arquitectónicas que estilizan la figura y abertura posterior para caminar con gracia.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_tubo_midi_marfil.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_tubo_midi_marfil.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Crepé Sastre Premium & Forro Elástico"
    },
    "slug": "vestido-tubo-midi-marfil-escultural-sindy-27",
    "price": 23000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Marfil",
      "Nude",
      "Negro"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-07",
    "sku": "SL-VEST-07",
    "name": "Vestido Corto Fiesta Fucsia Neón con Volantes",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Cóctel",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Vestido de pasarela en fucsia neón brillante con hombreras estructuradas y volantes dramáticos en cascada. Cinturón joya a juego y corte entallado de alta costura.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_corto_fucsia_neon.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_corto_fucsia_neon.jpg"
      ]
    },
    "details": {
      "size": [
        "XS",
        "M"
      ],
      "material": "Tafetán de Seda & Organza Estructurada"
    },
    "slug": "vestido-corto-fiesta-fucsia-neon-volantes-sindy-28",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Fucsia Neón",
      "Rojo",
      "Negro"
    ],
    "sizes": [
      "XS",
      "M"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-08",
    "sku": "SL-VEST-08",
    "name": "Vestido Corto Cut-Out Blanco Halter",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Cóctel",
    "priceFCFA": 22000,
    "originalPriceFCFA": 26000,
    "inStock": true,
    "featured": true,
    "description": "Minivestido halter blanco inmaculado con cortes cut-out laterales estratégicos que resaltan la cintura. Tejido de piqué estructurado con forro invisible.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_corto_cutout_blanco.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_corto_cutout_blanco.jpg"
      ]
    },
    "details": {
      "size": [
        "XS",
        "M"
      ],
      "material": "Piqué Elástico & Doble Forro Satinado"
    },
    "slug": "vestido-corto-cut-out-blanco-halter-sindy-29",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco Puro"
    ],
    "sizes": [
      "XS",
      "M"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-09",
    "sku": "SL-VEST-09",
    "name": "Vestido Celeste Volante Palabra de Honor",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Gala",
    "priceFCFA": 28000,
    "originalPriceFCFA": 34000,
    "inStock": true,
    "featured": true,
    "description": "Vestido de ensueño palabra de honor en gasa celeste pastel con falda voluminosa en volantes asimétricos estilo alta costura europea.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_celeste_volante_honor.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_celeste_volante_honor.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Gasa de Seda & Muselina Pastel"
    },
    "slug": "vestido-celeste-volante-palabra-honor-sindy-30",
    "price": 28000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Celeste Cielo"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-10",
    "sku": "SL-VEST-10",
    "name": "Vestido Mini Fruncido Satinado Blanco Tirantes",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Cóctel",
    "priceFCFA": 18000,
    "originalPriceFCFA": 22000,
    "inStock": true,
    "featured": true,
    "description": "Minivestido ajustado en satén elástico blanco con fruncido drapeado en todo el contorno y escote drapeado cowl. Perfecto para cócteles y salidas exclusivas.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_mini_fruncido_blanco.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_mini_fruncido_blanco.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Satén Elástico Líquido"
    },
    "slug": "vestido-mini-fruncido-satinado-blanco-sindy-31",
    "price": 18000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco",
      "Rosa",
      "Rojo"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-11",
    "sku": "SL-VEST-11",
    "name": "Vestido Largo Bohemio Estampado Safari",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Gala",
    "priceFCFA": 22000,
    "originalPriceFCFA": 26000,
    "inStock": true,
    "featured": true,
    "description": "Vestido largo bohemio con estampado safari en tonos tierra dorados. Mangas abullonadas, cinturón de cordón trenzado con borlas y abertura central fluida.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_largo_safari_print.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_largo_safari_print.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "L",
        "XL"
      ],
      "material": "Chiffon Seda Transpirable"
    },
    "slug": "vestido-largo-bohemio-estampado-safari-sindy-32",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Safari Print"
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-vest-12",
    "sku": "SL-VEST-12",
    "name": "Vestido Mini Escote Halter Noche",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Cóctel",
    "priceFCFA": 18000,
    "originalPriceFCFA": 22000,
    "inStock": true,
    "featured": true,
    "description": "Vestido mini satinado con escote halter alto y espalda descubierta profunda. Caída sedosa fluida ideal para veladas en terrazas y eventos VIP.",
    "images": {
      "primary": "/products/sindy_luxury/vestido_mini_halter_noche.jpg",
      "gallery": [
        "/products/sindy_luxury/vestido_mini_halter_noche.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Satén de Seda Crepé"
    },
    "slug": "vestido-mini-escote-halter-noche-sindy-33",
    "price": 18000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rosa",
      "Beige",
      "Negro"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-mono-01",
    "sku": "SL-MONO-01",
    "name": "Jumpsuit Silueta Felina Leopardo Kylie Luxe",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Monos & Jumpsuits",
    "priceFCFA": 25000,
    "originalPriceFCFA": 28000,
    "inStock": true,
    "featured": true,
    "description": "Mono ceñido con estampado animal print leopardo estilo Kylie Jenner. Microfibra modeladora de compresión ligera, cuello perkins y cierre invisible.",
    "images": {
      "primary": "/products/sindy_luxury/jumpsuit_leopardo_luxe.jpg",
      "gallery": [
        "/products/sindy_luxury/jumpsuit_leopardo_luxe.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Spandex & Microfibra Modeladora"
    },
    "slug": "jumpsuit-silueta-felina-leopardo-kylie-luxe-sindy-2",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Leopardo Clásico"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-mono-02",
    "sku": "SL-MONO-02",
    "name": "Jumpsuit Felino Safari Tigre",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Monos & Jumpsuits",
    "priceFCFA": 22000,
    "originalPriceFCFA": 26000,
    "inStock": true,
    "featured": true,
    "description": "Catsuit entallado de cuerpo entero en estampado de tigre safari. Cuello alto, manga larga y tejido stretch que estiliza y potencia las curvas.",
    "images": {
      "primary": "/products/sindy_luxury/jumpsuit_felino_safari_tigre.jpg",
      "gallery": [
        "/products/sindy_luxury/jumpsuit_felino_safari_tigre.jpg"
      ]
    },
    "details": {
      "size": [
        "M"
      ],
      "material": "Lycra Brillante & Elastano de Alta Densidad"
    },
    "slug": "jumpsuit-felino-safari-tigre-sindy-34",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Tigre Dorado"
    ],
    "sizes": [
      "M"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-mono-03",
    "sku": "SL-MONO-03",
    "name": "Jumpsuit Segunda Piel Modelador Manga Larga",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Monos & Jumpsuits",
    "priceFCFA": 18000,
    "originalPriceFCFA": 22000,
    "inStock": true,
    "featured": true,
    "description": "Jumpsuit de corte seamless segunda piel en burdeos / carmesí de compresión moderada. Diseño versátil tanto para outfits athleisure de lujo como para noche con tacones.",
    "images": {
      "primary": "/products/sindy_luxury/jumpsuit_segunda_piel_modelador.jpg",
      "gallery": [
        "/products/sindy_luxury/jumpsuit_segunda_piel_modelador.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Microfibra Seamless Térmica"
    },
    "slug": "jumpsuit-segunda-piel-modelador-manga-larga-sindy-35",
    "price": 18000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rojo",
      "Blanco",
      "Marrón"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-01",
    "sku": "SL-SET-01",
    "name": "Conjunto Peplum Vichy Rosa & Shorts Couture",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto dos piezas exclusivo compuesto por top peplum estructurado con cuello cisne y shorts de talle alto a juego en estampado de cuadros vichy rosa pastel.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_vichy_rosa_peplum.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_vichy_rosa_peplum.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Algodón Jacquard & Punto Doble"
    },
    "slug": "conjunto-peplum-vichy-rosa-shorts-couture-sindy-3",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rosa Vichy"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-02",
    "sku": "SL-SET-02",
    "name": "Conjunto Palazzo Celeste Top Asimétrico",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 20000,
    "originalPriceFCFA": 25000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto de top palabra de honor asimétrico con lazo lateral drapeado y pantalón palazzo fluido de tiro extra alto en suave tejido crepé celeste.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_palazzo_celeste.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_palazzo_celeste.jpg"
      ]
    },
    "details": {
      "size": [
        "XS",
        "M"
      ],
      "material": "Crepé Georgette Liviano"
    },
    "slug": "conjunto-palazzo-celeste-top-asimetrico-sindy-14",
    "price": 20000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Celeste",
      "Amarillo"
    ],
    "sizes": [
      "XS",
      "M"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-03",
    "sku": "SL-SET-03",
    "name": "Conjunto Capa Asimétrica Carmesí Luxe",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 20000,
    "originalPriceFCFA": 24000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto vanguardista formado por blusa fluida con manga capa en un hombro y pantalón recto de pinzas a juego en rojo carmesí intenso.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_capa_rojo_carmesi.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_capa_rojo_carmesi.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Satén Crepé Mate & Seda Artificial"
    },
    "slug": "conjunto-capa-asimetrica-carmesi-luxe-sindy-15",
    "price": 20000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rojo Carmesí",
      "Blanco",
      "Marrón",
      "Negro"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-04",
    "sku": "SL-SET-04",
    "name": "Conjunto Flúor Soleil Cárdigan + Falda Tubo",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto knitwear de punto fino elástico en amarillo flúor vibrante con micro-cárdigan abotonado al frente y falda midi tubo de tiro alto.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_fluor_soleil.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_fluor_soleil.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Punto Canalé Elástico Premium"
    },
    "slug": "conjunto-fluor-soleil-cardigan-falda-tubo-sindy-8",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Amarillo Flúor",
      "Rosa",
      "Negro"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-05",
    "sku": "SL-SET-05",
    "name": "Conjunto Corset Morado Berenjena & Falda Midi",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 24000,
    "originalPriceFCFA": 28000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto sofisticado compuesto por top corsetero estructurado con ballenas y falda midi lápiz en satén de seda morado berenjena.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_corset_falda_purple.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_corset_falda_purple.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Satén Nupcial Pesado"
    },
    "slug": "conjunto-corset-morado-berenjena-falda-midi-sindy-16",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Morado Berenjena"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-06",
    "sku": "SL-SET-06",
    "name": "Conjunto Top + Shorts Tigre Leopardo Rojo",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 23000,
    "originalPriceFCFA": 27000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto safari urbano con top cropped de escote cuadrado y shorts sastre estructurados de tiro alto en estampado exótico rojo y negro.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_top_shorts_tigre_rojo.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_top_shorts_tigre_rojo.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Lino & Jacquard Safari"
    },
    "slug": "conjunto-top-shorts-tigre-leopardo-rojo-sindy-36",
    "price": 23000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rojo Tigre"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-07",
    "sku": "SL-SET-07",
    "name": "Conjunto Palazzo Pure White Satinado",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 20000,
    "originalPriceFCFA": 25000,
    "inStock": true,
    "featured": true,
    "description": "Elegante conjunto monocromático blanco puro con top drapeado sin mangas y pantalón palazzo de caída impecable en satén de seda.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_palazzo_pure_white.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_palazzo_pure_white.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XL",
        "XS"
      ],
      "material": "Satén de Seda Blanco Nácar"
    },
    "slug": "conjunto-palazzo-pure-white-satinado-sindy-22",
    "price": 20000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco Puro"
    ],
    "sizes": [
      "M",
      "XL",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-08",
    "sku": "SL-SET-08",
    "name": "Conjunto Top Crop + Falda Larga Fucsia Gala",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto dos piezas de gala con crop top minimalista ajustado y falda maxi con vuelo espectacular en tafetán fucsia brillante.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_crop_falda_fucsia.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_crop_falda_fucsia.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XL",
        "XS"
      ],
      "material": "Tafetán Fucsia & Forro Raso"
    },
    "slug": "conjunto-top-crop-falda-larga-fucsia-gala-sindy-37",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Fucsia Neón"
    ],
    "sizes": [
      "M",
      "XL",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-09",
    "sku": "SL-SET-09",
    "name": "Conjunto Pantalón Flare Rosa & Top Crop",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 20000,
    "originalPriceFCFA": 24000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto casual chic en punto acanalado rosa empolvado con top cropped ceñido y pantalón campana flare de tiro alto.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_pantalon_flare_rosa.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_pantalon_flare_rosa.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Punto Acanalado Soft Touch"
    },
    "slug": "conjunto-pantalon-flare-rosa-top-crop-sindy-38",
    "price": 20000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rosa Pastel"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-10",
    "sku": "SL-SET-10",
    "name": "Conjunto Azul Marino Falda Plisada + Top",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Distinguido dos piezas de alta costura con top entallado y falda evasé con micro-plisados en crepe satén azul marino.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_azul_marino_plisada.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_azul_marino_plisada.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Crepé Plisado Azul Marino"
    },
    "slug": "conjunto-azul-marino-falda-plisada-top-sindy-39",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Azul Marino"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-set-11",
    "sku": "SL-SET-11",
    "name": "Conjunto Casual Top + Shorts Básico",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos 2 Piezas",
    "priceFCFA": 8000,
    "originalPriceFCFA": 10000,
    "inStock": true,
    "featured": true,
    "description": "Conjunto básico veraniego de algodón elástico ultracómodo con crop top sin mangas y shorts elásticos ajustados.",
    "images": {
      "primary": "/products/sindy_luxury/conjunto_casual_top_shorts.jpg",
      "gallery": [
        "/products/sindy_luxury/conjunto_casual_top_shorts.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Algodón Stretch Transpirable"
    },
    "slug": "conjunto-casual-top-shorts-basico-sindy-40",
    "price": 8000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Tigre",
      "Rojo",
      "Negro",
      "Rosa",
      "Marrón",
      "Azul",
      "Amarillo"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-top-01",
    "sku": "SL-TOP-01",
    "name": "Top Corset Joya Strass & Perlas Blanco",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Tops & Corsets",
    "priceFCFA": 15000,
    "originalPriceFCFA": 18000,
    "inStock": true,
    "featured": true,
    "description": "Corset joya bordado a mano con perlas naturales y cristales de strass centelleantes. Cierre posterior con lazos de satén regulables.",
    "images": {
      "primary": "/products/sindy_luxury/corset_strass_perlas_blanco.jpg",
      "gallery": [
        "/products/sindy_luxury/corset_strass_perlas_blanco.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Malla Rígida, Strass Cristal & Perlas"
    },
    "slug": "top-corset-joya-strass-perlas-blanco-sindy-5",
    "price": 15000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco Perla",
      "Rojo",
      "Negro",
      "Gris"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-top-02",
    "sku": "SL-TOP-02",
    "name": "Top Escultural Off-Shoulder con Volante",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Tops & Corsets",
    "priceFCFA": 10000,
    "originalPriceFCFA": 12000,
    "inStock": true,
    "featured": true,
    "description": "Top de hombros descubiertos con gran volante arquitectónico en el escote. Confeccionado en otomán elástico que estiliza el busto.",
    "images": {
      "primary": "/products/sindy_luxury/top_escultural_offshoulder.jpg",
      "gallery": [
        "/products/sindy_luxury/top_escultural_offshoulder.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Otomán Elástico Estructurado"
    },
    "slug": "top-escultural-off-shoulder-volante-sindy-17",
    "price": 10000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rojo",
      "Marrón",
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-top-03",
    "sku": "SL-TOP-03",
    "name": "Top Halter Plisado Crema Peplum",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Tops & Corsets",
    "priceFCFA": 12000,
    "originalPriceFCFA": 15000,
    "inStock": true,
    "featured": true,
    "description": "Blusa halter sin mangas con microplisados verticales que se abren en bajo peplum vaporoso. Color crema nacarado con cierre al cuello.",
    "images": {
      "primary": "/products/sindy_luxury/top_halter_plisado_crema.jpg",
      "gallery": [
        "/products/sindy_luxury/top_halter_plisado_crema.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Chiffon Plisado Nácar"
    },
    "slug": "top-halter-plisado-crema-peplum-sindy-41",
    "price": 12000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Crema",
      "Negro",
      "Blanco"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-top-04",
    "sku": "SL-TOP-04",
    "name": "Top Palabra de Honor Minimalista",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Tops & Corsets",
    "priceFCFA": 10000,
    "originalPriceFCFA": 12000,
    "inStock": true,
    "featured": true,
    "description": "Top palabra de honor estilo bandeau en tejido punto milano doble capa. Banda de silicona interior antideslizante para sujeción total.",
    "images": {
      "primary": "/products/sindy_luxury/top_palabra_honor_minimal.jpg",
      "gallery": [
        "/products/sindy_luxury/top_palabra_honor_minimal.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Punto Milano & Spandex Antideslizante"
    },
    "slug": "top-palabra-de-honor-minimalista-sindy-42",
    "price": 10000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Gris",
      "Negro",
      "Blanco",
      "Rojo",
      "Marrón",
      "Amarillo",
      "Verde"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-top-05",
    "sku": "SL-TOP-05",
    "name": "Body Moldeador Segunda Piel Halter",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Tops & Corsets",
    "priceFCFA": 10000,
    "originalPriceFCFA": 14000,
    "inStock": true,
    "featured": true,
    "description": "Body reductor y estilizador de cuello halter con cierre en la entrepierna. Tejido stretch transpirable de alta compresión.",
    "images": {
      "primary": "/products/sindy_luxury/body_moldeador_halter.jpg",
      "gallery": [
        "/products/sindy_luxury/body_moldeador_halter.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Poliamida 85% & Elastano 15%"
    },
    "slug": "body-moldeador-segunda-piel-halter-sindy-43",
    "price": 10000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco",
      "Azul",
      "Marrón",
      "Negro"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-fald-01",
    "sku": "SL-FALD-01",
    "name": "Falda Plisada Larga Satén Blanco Puro",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Faldas",
    "priceFCFA": 20000,
    "originalPriceFCFA": 24000,
    "inStock": true,
    "featured": true,
    "description": "Falda maxi plisada de corte evasé confeccionada en satén blanco reflectante. Cinturilla elástica oculta y caída aristocrática.",
    "images": {
      "primary": "/products/sindy_luxury/falda_plisada_saten_blanco.jpg",
      "gallery": [
        "/products/sindy_luxury/falda_plisada_saten_blanco.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS",
        "XL"
      ],
      "material": "Satén de Seda Blanco Nácar Plisado"
    },
    "slug": "falda-plisada-larga-saten-blanco-puro-sindy-44",
    "price": 20000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco Puro"
    ],
    "sizes": [
      "M",
      "XS",
      "XL"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-fald-02",
    "sku": "SL-FALD-02",
    "name": "Falda Tul Rosa Gala con Vuelo",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Faldas",
    "priceFCFA": 15000,
    "originalPriceFCFA": 18000,
    "inStock": true,
    "featured": true,
    "description": "Espectacular falda de cóctel en múltiples capas de tul ilusión rosa empolvado con forro suave y cintura entallada de satén.",
    "images": {
      "primary": "/products/sindy_luxury/falda_tul_rosa_gala.jpg",
      "gallery": [
        "/products/sindy_luxury/falda_tul_rosa_gala.jpg"
      ]
    },
    "details": {
      "size": [
        "XL",
        "M",
        "XS"
      ],
      "material": "Tul Ilusión & Satén Rosa"
    },
    "slug": "falda-tul-rosa-gala-con-vuelo-sindy-45",
    "price": 15000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rosa Pastel"
    ],
    "sizes": [
      "XL",
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-fald-03",
    "sku": "SL-FALD-03",
    "name": "Minifalda Animal Print con Vuelo",
    "brand": "Sindy Luxury Haute Couture",
    "category": "MODA_MUJER",
    "subcategory": "Faldas",
    "priceFCFA": 15000,
    "originalPriceFCFA": 18000,
    "inStock": true,
    "featured": true,
    "description": "Minifalda evasé con vuelo coqueto en estampado leopardo de alta definición. Forro interior de pantalón corto incorporado para total confort.",
    "images": {
      "primary": "/products/sindy_luxury/minifalda_animal_print_safari.jpg",
      "gallery": [
        "/products/sindy_luxury/minifalda_animal_print_safari.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Seda Twill Estampada"
    },
    "slug": "minifalda-animal-print-con-vuelo-sindy-46",
    "price": 15000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Leopardo Safari"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-calz-01",
    "sku": "SL-CALZ-01",
    "name": "Sandalias Tacón Joya Esmeralda con Strass",
    "brand": "Sindy Luxury Shoes",
    "category": "CALZADO",
    "subcategory": "Sandalias de Fiesta",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Sandalias de tacón de aguja de 10 cm con pulsera al tobillo y tiras sinuosas recubiertas de cristales strass en tono verde esmeralda deslumbrante.",
    "images": {
      "primary": "/products/sindy_luxury/sandalias_joya_esmeralda.jpg",
      "gallery": [
        "/products/sindy_luxury/sandalias_joya_esmeralda.jpg"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Raso Esmeralda, Strass de Vidrio & Suela de Piel"
    },
    "slug": "sandalias-tacon-joya-esmeralda-strass-sindy-4",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Verde Esmeralda"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-calz-02",
    "sku": "SL-CALZ-02",
    "name": "Stilettos Degradé Charol Haute Elegance",
    "brand": "Sindy Luxury Shoes",
    "category": "CALZADO",
    "subcategory": "Zapatos de Salón",
    "priceFCFA": 24000,
    "originalPriceFCFA": 28000,
    "inStock": true,
    "featured": true,
    "description": "Zapatos de salón stiletto con puntera afilada en charol de lujo con efecto degradado de negro a nude. Tacón lacado de 11 cm y plantilla acolchada.",
    "images": {
      "primary": "/products/sindy_luxury/stilettos_charol_degrade.jpg",
      "gallery": [
        "/products/sindy_luxury/stilettos_charol_degrade.jpg"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Charol Degradado Premium & Forro Interior Cuero"
    },
    "slug": "stilettos-degrade-charol-haute-elegance-sindy-7",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Nude Degradé",
      "Chocolate",
      "Negro"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-calz-03",
    "sku": "SL-CALZ-03",
    "name": "Stilettos Metalizados Mirror Silver & White",
    "brand": "Sindy Luxury Shoes",
    "category": "CALZADO",
    "subcategory": "Zapatos de Salón",
    "priceFCFA": 23000,
    "originalPriceFCFA": 27000,
    "inStock": true,
    "featured": true,
    "description": "Stilettos de acabado plateado efecto espejo con interior en piel blanca nacarada. Tacón metálico de impacto para veladas y alfombras rojas.",
    "images": {
      "primary": "/products/sindy_luxury/stilettos_mirror_silver_white.jpg",
      "gallery": [
        "/products/sindy_luxury/stilettos_mirror_silver_white.jpg"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Piel Metalizada Mirror Effect"
    },
    "slug": "stilettos-metalizados-mirror-silver-white-sindy-47",
    "price": 23000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Plateado Espejo",
      "Blanco Nácar"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-calz-04",
    "sku": "SL-CALZ-04",
    "name": "Sandalias Tacón Plataforma Noir Velvet",
    "brand": "Sindy Luxury Shoes",
    "category": "CALZADO",
    "subcategory": "Sandalias de Fiesta",
    "priceFCFA": 20000,
    "originalPriceFCFA": 25000,
    "inStock": true,
    "featured": true,
    "description": "Sandalias de plataforma delantera y tacón en bloque de 12 cm en terciopelo negro profundo. Máxima estabilidad, elegancia y confort toda la noche.",
    "images": {
      "primary": "/products/sindy_luxury/sandalias_plataforma_noir.jpg",
      "gallery": [
        "/products/sindy_luxury/sandalias_plataforma_noir.jpg"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Terciopelo Negro & Plataforma de Piel"
    },
    "slug": "sandalias-tacon-plataforma-noir-velvet-sindy-19",
    "price": 20000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Negro Noir"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-calz-05",
    "sku": "SL-CALZ-05",
    "name": "Bailarinas Mary Jane Terciopelo con Hebilla Joya",
    "brand": "Sindy Luxury Shoes",
    "category": "CALZADO",
    "subcategory": "Bailarinas & Planos",
    "priceFCFA": 18000,
    "originalPriceFCFA": 22000,
    "inStock": true,
    "featured": true,
    "description": "Bailarinas planas estilo Mary Jane en terciopelo de seda suave con correa al empeine adornada con una hebilla de perlas y cristales brillantes.",
    "images": {
      "primary": "/products/sindy_luxury/bailarinas_mary_jane_rosa.jpg",
      "gallery": [
        "/products/sindy_luxury/bailarinas_mary_jane_rosa.jpg"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Terciopelo de Seda & Hebilla de Cristal"
    },
    "slug": "bailarinas-mary-jane-terciopelo-hebilla-joya-sindy-18",
    "price": 18000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rojo Carmesí",
      "Negro",
      "Beige"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-calz-06",
    "sku": "SL-CALZ-06",
    "name": "Merceditas Charol Rosa Pastel con Correa",
    "brand": "Sindy Luxury Shoes",
    "category": "CALZADO",
    "subcategory": "Bailarinas & Planos",
    "priceFCFA": 20000,
    "originalPriceFCFA": 24000,
    "inStock": true,
    "featured": true,
    "description": "Zapatos merceditas de tacón bajo ancho en charol brillante rosa pastel con tira al empeine y botón nacarado. Estilo chic parisino irresistible.",
    "images": {
      "primary": "/products/sindy_luxury/merceditas_charol_rosa_pastel.jpg",
      "gallery": [
        "/products/sindy_luxury/merceditas_charol_rosa_pastel.jpg"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Charol Rosa Suave & Tacón Midi Cómodo"
    },
    "slug": "merceditas-charol-rosa-pastel-correa-sindy-48",
    "price": 20000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rosa Pastel"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-calz-07",
    "sku": "SL-CALZ-07",
    "name": "Sneakers Plataforma Rosa Glamour",
    "brand": "Sindy Luxury Shoes",
    "category": "CALZADO",
    "subcategory": "Zapatillas Urbanas",
    "priceFCFA": 25000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": true,
    "description": "Zapatillas de diseño con suela gruesa plataforma de 5 cm en piel rosa empolvado con inserciones metalizadas doradas y cordones de satén.",
    "images": {
      "primary": "/products/sindy_luxury/sneakers_plataforma_rosa_glam.jpg",
      "gallery": [
        "/products/sindy_luxury/sneakers_plataforma_rosa_glam.jpg"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Piel Vacuna, Satén & Suela Eva Ultraligera"
    },
    "slug": "sneakers-plataforma-rosa-glamour-sindy-49",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rosa Glam"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-calz-08",
    "sku": "SL-CALZ-08",
    "name": "Slippers Plataforma Borrego / Piel de Peluche",
    "brand": "Sindy Luxury Shoes",
    "category": "CALZADO",
    "subcategory": "Bailarinas & Planos",
    "priceFCFA": 23000,
    "originalPriceFCFA": 27000,
    "inStock": true,
    "featured": true,
    "description": "Zapatillas mules con plataforma acolchada recubiertas de suave pelo de borrego sintético color beige crema. Confort ultra mullido y estilo casual de lujo.",
    "images": {
      "primary": "/products/sindy_luxury/slippers_plataforma_borrego.jpg",
      "gallery": [
        "/products/sindy_luxury/slippers_plataforma_borrego.jpg"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Borrego Sherpa Ultrasuave & Suela Antideslizante"
    },
    "slug": "slippers-plataforma-borrego-peluche-sindy-50",
    "price": 23000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rosa Nude",
      "Beige Crema"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-acc-01",
    "sku": "SL-ACC-01",
    "name": "Bolso Acolchado Clutch Matelassé Noir & Gold",
    "brand": "Sindy Luxury Accessories",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Bolsos de Mano",
    "priceFCFA": 10000,
    "originalPriceFCFA": 14000,
    "inStock": true,
    "featured": true,
    "description": "Bolso bandolera de mano en suave piel vegana con patrón acolchado matelassé de rombos y cadena dorada convertible de hombro a mano.",
    "images": {
      "primary": "/products/sindy_luxury/bolso_clutch_matelasse.jpg",
      "gallery": [
        "/products/sindy_luxury/bolso_clutch_matelasse.jpg"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Piel Sintética Grano Fino & Herrajes Bañados en Oro"
    },
    "slug": "bolso-acolchado-clutch-matelasse-noir-gold-sindy-12",
    "price": 10000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Negro Noir",
      "Blanco Nácar",
      "Rojo Escarlata"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-acc-02",
    "sku": "SL-ACC-02",
    "name": "Bolso Baguette Tachuelas & Polka Dots",
    "brand": "Sindy Luxury Accessories",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Bolsos de Hombro",
    "priceFCFA": 10000,
    "originalPriceFCFA": 14000,
    "inStock": true,
    "featured": true,
    "description": "Bolso baguette de tendencia con aplicación de mini tachuelas metálicas doradas y asa ergonómica de hombro. Espacio optimizado para smartphone y cosméticos.",
    "images": {
      "primary": "/products/sindy_luxury/bolso_baguette_tachuelas.jpg",
      "gallery": [
        "/products/sindy_luxury/bolso_baguette_tachuelas.jpg"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Ecopiel Lisa & Microtachuelas Cónicas"
    },
    "slug": "bolso-baguette-tachuelas-polka-dots-sindy-13",
    "price": 10000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Marrón Chocolate",
      "Rojo Cereza",
      "Rafia Natural"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-acc-03",
    "sku": "SL-ACC-03",
    "name": "Gafas de Sol Cuadradas Oversize Carey & Crystal",
    "brand": "Sindy Luxury Eyewear",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Gafas de Sol",
    "priceFCFA": 2500,
    "originalPriceFCFA": 4000,
    "inStock": true,
    "featured": true,
    "description": "Gafas de sol de montura cuadrada extragrande en acetato de carey pulido con cristales degradados de protección UV400 completa.",
    "images": {
      "primary": "/products/sindy_luxury/gafas_sol_monturas_luxe.jpg",
      "gallery": [
        "/products/sindy_luxury/gafas_sol_monturas_luxe.jpg"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Acetato Pulido & Lentes Policarbonato UV400"
    },
    "slug": "gafas-sol-cuadradas-oversize-carey-crystal-sindy-20",
    "price": 2500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Carey Clásico",
      "Negro Azabache",
      "Transparente"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-acc-04",
    "sku": "SL-ACC-04",
    "name": "Faja Reductora Body Silueta Perfecta",
    "brand": "Sindy Luxury Shapewear",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Ropa Moldeadora",
    "priceFCFA": 10000,
    "originalPriceFCFA": 15000,
    "inStock": true,
    "featured": true,
    "description": "Body faja moldeadora de alta compresión que redefine cintura, aplana abdomen y eleva glúteos de forma invisible bajo vestidos de gala.",
    "images": {
      "primary": "/products/sindy_luxury/faja_body_silueta_perfecta.jpg",
      "gallery": [
        "/products/sindy_luxury/faja_body_silueta_perfecta.jpg"
      ]
    },
    "details": {
      "size": [
        "M",
        "XS"
      ],
      "material": "Powernet de Compresión & Forro Antibacteriano"
    },
    "slug": "faja-reductora-body-silueta-perfecta-sindy-21",
    "price": 10000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rojo/Burdeos",
      "Negro"
    ],
    "sizes": [
      "M",
      "XS"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-acc-05",
    "sku": "SL-ACC-05",
    "name": "Medias Térmicas Translúcidas Efecto Piel",
    "brand": "Sindy Luxury Accessories",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Accesorios Térmicos",
    "priceFCFA": 12000,
    "originalPriceFCFA": 16000,
    "inStock": true,
    "featured": true,
    "description": "Medias con forro polar interior invisible que abrigan y moldean las piernas manteniendo un efecto translúcido sedoso impecable.",
    "images": {
      "primary": "/products/sindy_luxury/medias_termicas_translucidas.jpg",
      "gallery": [
        "/products/sindy_luxury/medias_termicas_translucidas.jpg"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Nylon Elástico con Interior Polar Falso Translúcido"
    },
    "slug": "medias-termicas-translucidas-efecto-piel-sindy-51",
    "price": 12000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Efecto Piel Natural",
      "Negro Translúcido"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-acc-06",
    "sku": "SL-ACC-06",
    "name": "Gorro de Satén Ajustable Anti-Frizz para Cabello Afro",
    "brand": "Sindy Luxury Haircare",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Cuidado Capilar & Accesorios",
    "priceFCFA": 3000,
    "originalPriceFCFA": 5000,
    "inStock": true,
    "featured": true,
    "description": "Gorro protector de satén de seda de doble capa con banda elástica ancha regulable. Mantiene la hidratación capilar, protege peinados, trenzas y rizos del encrespamiento nocturno.",
    "images": {
      "primary": "/products/sindy_luxury/gorro_saten_antifrizz_afro.jpg",
      "gallery": [
        "/products/sindy_luxury/gorro_saten_antifrizz_afro.jpg"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Satén de Seda Pura Doble Capa"
    },
    "slug": "gorro-saten-ajustable-antifrizz-cabello-afro-sindy-52",
    "price": 3000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Negro",
      "Rosa Dorado",
      "Púrpura Imperial"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-acc-07",
    "sku": "SL-ACC-07",
    "name": "Funda de Almohada de Satén de Seda Anti-Frizz",
    "brand": "Sindy Luxury Living",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Cuidado Capilar & Hogar",
    "priceFCFA": 5000,
    "originalPriceFCFA": 7500,
    "inStock": true,
    "featured": true,
    "description": "Funda de almohada confeccionada en satén de seda de alta densidad 100% hipoalergénico. Previene la rotura del cabello, retiene la humedad de la piel y evita arrugas faciales.",
    "images": {
      "primary": "/products/sindy_luxury/funda_almohada_saten_seda.jpg",
      "gallery": [
        "/products/sindy_luxury/funda_almohada_saten_seda.jpg"
      ]
    },
    "details": {
      "size": [
        "Estándar 50x75 cm"
      ],
      "material": "Satén de Seda 100% Hipoalergénico con Cierre Invisible"
    },
    "slug": "funda-almohada-saten-seda-antifrizz-sindy-53",
    "price": 5000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rosa Pastel",
      "Blanco Perla",
      "Gris Plata",
      "Champán"
    ],
    "sizes": [
      "Estándar 50x75 cm"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-acc-08",
    "sku": "SL-ACC-08",
    "name": "Extensiones Trenzas de Cabello Premium",
    "brand": "Sindy Luxury Haircare",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Posticería & Belleza",
    "priceFCFA": 5000,
    "originalPriceFCFA": 7000,
    "inStock": true,
    "featured": true,
    "description": "Paquete de extensiones de fibra sintética de alta temperatura Kanekalon ultra sedosa. Textura perfecta para trenzas africanas, twists y peinados protectores duraderos.",
    "images": {
      "primary": "/products/sindy_luxury/extensiones_trenzas_cabello_premium.jpg",
      "gallery": [
        "/products/sindy_luxury/extensiones_trenzas_cabello_premium.jpg"
      ]
    },
    "details": {
      "size": [
        "Pack 100g"
      ],
      "material": "Fibra Kanekalon de Alta Calidad Termorresistente"
    },
    "slug": "extensiones-trenzas-cabello-premium-sindy-54",
    "price": 5000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Castaño",
      "Negro Natural"
    ],
    "sizes": [
      "Pack 100g"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-cosm-01",
    "sku": "SL-COSM-01",
    "name": "Scrub Cúrcuma Effaceur N°1 Anti-Taches 200g",
    "brand": "N°1 Effaceur Paris",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Exfoliantes & Mascarillas",
    "priceFCFA": 4000,
    "originalPriceFCFA": 5000,
    "inStock": true,
    "featured": true,
    "description": "Potente exfoliante corporal y facial formulado con cúrcuma biológica purificada y microgránulos minerales. Unifica el tono, difumina manchas oscuras e hiperpigmentación.",
    "images": {
      "primary": "/products/sindy_luxury/scrub_curcuma_effaceur.jpg",
      "gallery": [
        "/products/sindy_luxury/scrub_curcuma_effaceur.jpg"
      ]
    },
    "details": {
      "volume": "Tarro 200g",
      "material": "Cúrcuma Orgánica, Aceite de Argán & Vitamina E"
    },
    "slug": "scrub-curcuma-effaceur-no1-anti-taches-sindy-24",
    "price": 4000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Cúrcuma Golden Glow"
    ],
    "sizes": [
      "Tarro 200g"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-cosm-02",
    "sku": "SL-COSM-02",
    "name": "Crema Éclaircissante Terminator Soin Intensif 50ml",
    "brand": "Terminator Dermacare",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Cremas de Tratamiento",
    "priceFCFA": 4000,
    "originalPriceFCFA": 6000,
    "inStock": true,
    "featured": true,
    "description": "Tratamiento intensivo anti-manchas rebeldes para codos, rodillas, manos y rostro. Acelera la renovación celular proporcionando luminosidad radiante y uniforme.",
    "images": {
      "primary": "/products/sindy_luxury/crema_terminator_eclaircissante.jpg",
      "gallery": [
        "/products/sindy_luxury/crema_terminator_eclaircissante.jpg"
      ]
    },
    "details": {
      "volume": "Frasco 50ml",
      "material": "Complejo AHA/BHA, Niacinamida & Filtro UV"
    },
    "slug": "crema-eclaircissante-terminator-soin-intensif-sindy-25",
    "price": 4000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Fórmula Concentrada"
    ],
    "sizes": [
      "Frasco 50ml"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-cosm-03",
    "sku": "SL-COSM-03",
    "name": "Jabón Tónico Cúrcuma & Félicité Artisanal 150g",
    "brand": "Félicité Herbal",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Botánicos",
    "priceFCFA": 2000,
    "originalPriceFCFA": 3000,
    "inStock": true,
    "featured": true,
    "description": "Barra de jabón botánico artesanal enriquecida con aceite de cúrcuma virgen y manteca de karité. Limpieza profunda, desinflama poros y previene brotes de acné.",
    "images": {
      "primary": "/products/sindy_luxury/jabon_curcuma_felicite.jpg",
      "gallery": [
        "/products/sindy_luxury/jabon_curcuma_felicite.jpg"
      ]
    },
    "details": {
      "volume": "Barra 150g",
      "material": "Aceite de Palma Sostenible, Cúrcuma & Karité Puro"
    },
    "slug": "jabon-tonico-curcuma-felicite-artisanal-sindy-26",
    "price": 2000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Extracto Cúrcuma Natural"
    ],
    "sizes": [
      "Barra 150g"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "sindy-cosm-04",
    "sku": "SL-COSM-04",
    "name": "Jabón Aclarante Kojic Acid & Papaya Collagen 100g",
    "brand": "Kojic Papaya Luxe",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Botánicos",
    "priceFCFA": 2000,
    "originalPriceFCFA": 3500,
    "inStock": true,
    "featured": true,
    "description": "Jabón facial y corporal concentrado en ácido kójico y enzimas de papaya con colágeno reafirmante. Reduce la producción excesiva de melanina y suaviza la piel áspera.",
    "images": {
      "primary": "/products/sindy_luxury/jabon_kojic_acid_papaya.jpg",
      "gallery": [
        "/products/sindy_luxury/jabon_kojic_acid_papaya.jpg"
      ]
    },
    "details": {
      "volume": "Barra 100g",
      "material": "Ácido Kójico Puro, Extracto de Papaya & Colágeno Hidrolizado"
    },
    "slug": "jabon-aclarante-kojic-acid-papaya-collagen-sindy-55",
    "price": 2000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Kójico & Papaya"
    ],
    "sizes": [
      "Barra 100g"
    ],
    "created_at": "2026-09-22T08:00:00.000Z",
    "updated_at": "2026-09-22T08:00:00.000Z"
  },
  {
    "id": "ebna-1",
    "sku": "EB-CALZ-01",
    "name": "Sneakers Urbanos Bicolor Sports Men's Edition",
    "brand": "EBNA Luxury Collection",
    "category": "CALZADO",
    "subcategory": "Zapatillas Sneakers",
    "priceFCFA": 28000,
    "originalPriceFCFA": 32000,
    "inStock": true,
    "featured": true,
    "description": "Zapatillas deportivas con paneles de malla transpirable y suela amortiguada. Ideales para combinar con jeans o ropa deportiva urbana.",
    "images": {
      "primary": "/products/product_1.jfif",
      "gallery": [
        "/products/product_1.jfif"
      ]
    },
    "details": {
      "size": [
        "39",
        "40",
        "41",
        "42",
        "43"
      ],
      "material": "Malla Transpirable & Suela de Goma"
    },
    "slug": "sneakers-urbanos-bicolor-sports-men-s-edition-ebna-1",
    "price": 28000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Rojo",
      "Negro",
      "Blanco"
    ],
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.678Z"
  },
  {
    "id": "ebna-2",
    "sku": "EB-ACC-01",
    "name": "Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas",
    "brand": "EBNA Luxury Collection",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Accesorios de Viaje",
    "priceFCFA": 12000,
    "originalPriceFCFA": 14000,
    "inStock": true,
    "featured": true,
    "description": "Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa mundi. Incluye ranuras para tarjetas e ID.",
    "images": {
      "primary": "/products/product_2.jfif",
      "gallery": [
        "/products/product_2.jfif"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Cuero Sintético PU & Grabado Mapa"
    },
    "slug": "funda-porta-pasaporte-pu-map-pattern-porta-tarjetas-ebna-2",
    "price": 12000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Azul",
      "Rosa",
      "Negro",
      "Dorado",
      "Beige"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.679Z"
  },
  {
    "id": "ebna-3",
    "sku": "EB-MODM-01",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos & Sets",
    "priceFCFA": 25000,
    "originalPriceFCFA": 28500,
    "inStock": true,
    "featured": true,
    "description": "Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.",
    "images": {
      "primary": "/products/product_3.jfif",
      "gallery": [
        "/products/product_3.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón Athleisure & Elastano"
    },
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-ebna-3",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Beige",
      "Gris",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.679Z"
  },
  {
    "id": "ebna-12",
    "sku": "EB-HIG-01",
    "name": "Jabón de Tocador Palmolive Naturals Extractos Herbales (Pack 12 x 90g)",
    "brand": "Palmolive",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones de Tocador",
    "priceFCFA": 8500,
    "originalPriceFCFA": 10000,
    "inStock": true,
    "featured": false,
    "description": "Pack familiar de jabones enriquecidos con extractos herbales purificantes y aceites vegetales. Aroma fresco y limpieza suave diaria.",
    "images": {
      "primary": "/products/product_12.jfif",
      "gallery": [
        "/products/product_12.jfif"
      ]
    },
    "details": {
      "size": [
        "Pack 12x 90g"
      ],
      "volume": "Pack 12x 90g",
      "material": "Aceites Vegetales & Extractos Herbales"
    },
    "slug": "jabon-de-tocador-palmolive-naturals-extractos-herbales-pack-12-x-90g-ebna-12",
    "price": 8500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Verde",
      "Blanco"
    ],
    "sizes": [
      "Pack 12x 90g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-18",
    "sku": "EB-MODM-15",
    "name": "Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft",
    "brand": "EBNA Maternity",
    "category": "MODA_MUJER",
    "subcategory": "Pantalones & Mallas",
    "priceFCFA": 18000,
    "originalPriceFCFA": 20500,
    "inStock": true,
    "featured": false,
    "description": "Pack de 2 mallas de premamá con pretina alta sobre la barriga en tejido elástico transpirable. Soporte suave sin oprimir.",
    "images": {
      "primary": "/products/product_18.jfif",
      "gallery": [
        "/products/product_18.jfif"
      ]
    },
    "details": {
      "size": [
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "material": "Microfibra Premamá de Gran Elasticidad"
    },
    "slug": "pack-2x-leggings-elasticos-maternidad-confort-ultra-soft-ebna-18",
    "price": 18000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Gris"
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-21",
    "sku": "EB-ACC-02",
    "name": "Gafas de Sol Classic Square Unisex Filtro Luz Azul (Pack 3x)",
    "brand": "EBNA Eyewear",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Gafas de Sol & Monturas",
    "priceFCFA": 16000,
    "originalPriceFCFA": 18500,
    "inStock": true,
    "featured": false,
    "description": "Pack de 3 gafas unisex con montura cuadrada negra ultraligera y lentes con filtro protector de luz azul para ordenadores y móviles.",
    "images": {
      "primary": "/products/product_21.jfif",
      "gallery": [
        "/products/product_21.jfif"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Montura Acetato & Lentes Filtro Azul"
    },
    "slug": "gafas-de-sol-classic-square-unisex-filtro-luz-azul-pack-3x-ebna-21",
    "price": 16000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Transparente"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-26",
    "sku": "EB-MODM-22",
    "name": "Chaqueta Blazer Sastre Zara Style New Collection",
    "brand": "Zara",
    "category": "MODA_MUJER",
    "subcategory": "Chaqueas & Blazers",
    "priceFCFA": 32000,
    "originalPriceFCFA": 37000,
    "inStock": true,
    "featured": false,
    "description": "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda sastre versátil para elevar cualquier atuendo.",
    "images": {
      "primary": "/products/product_26.jfif",
      "gallery": [
        "/products/product_26.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Crepe Estructurado & Botones Carey"
    },
    "slug": "chaqueta-blazer-sastre-zara-style-new-collection-ebna-26",
    "price": 32000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Beige",
      "Camel",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-48",
    "sku": "EB-CALZ-02",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris",
    "brand": "Ollio Paris",
    "category": "CALZADO",
    "subcategory": "Bailarinas & Zapatos Planos",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Zapatos planos estilo bailarina confeccionados en encaje floral transpirable. Plantilla acolchada suave ideal para eventos y oficina.",
    "images": {
      "primary": "/products/product_48.png",
      "gallery": [
        "/products/product_48.png"
      ]
    },
    "details": {
      "size": [
        "36",
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Encaje Floral Malla & Plantilla Acolchada"
    },
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-ebna-48",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-49",
    "sku": "EB-HIG-02",
    "name": "Loción Corporal Hidratante Avena Instituto Español",
    "brand": "Instituto Español",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Lociones Corporales",
    "priceFCFA": 9500,
    "originalPriceFCFA": 11000,
    "inStock": true,
    "featured": false,
    "description": "Loción corporal de formato familiar formulada con extracto de avena 100% natural. 24 horas de hidratación para toda la familia.",
    "images": {
      "primary": "/products/product_49.jfif",
      "gallery": [
        "/products/product_49.jfif"
      ]
    },
    "details": {
      "size": [
        "950ml"
      ],
      "volume": "950ml",
      "material": "Extracto de Avena 100% Natural"
    },
    "slug": "locion-corporal-hidratante-avena-instituto-espanol-ebna-49",
    "price": 9500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Beige",
      "Blanco"
    ],
    "sizes": [
      "950ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-50",
    "sku": "EB-COSM-01",
    "name": "Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting",
    "brand": "EBNA Beauty",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Maquillaje de Labios",
    "priceFCFA": 9000,
    "originalPriceFCFA": 10500,
    "inStock": true,
    "featured": false,
    "description": "Pintalabios líquido mate de alta cobertura e intensidad de color. Fórmula intransferible de larga duración hasta 16 horas de fijación.",
    "images": {
      "primary": "/products/product_50.jfif",
      "gallery": [
        "/products/product_50.jfif"
      ]
    },
    "details": {
      "size": [
        "8g"
      ],
      "volume": "8g",
      "material": "Pigmentos Velvet Matte Intransferibles"
    },
    "slug": "lapiz-labial-liquido-velvet-matte-waterproof-long-lasting-ebna-50",
    "price": 9000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo",
      "Rosa Wood",
      "Nude"
    ],
    "sizes": [
      "8g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-51",
    "sku": "EB-COSM-02",
    "name": "Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)",
    "brand": "Brunch Beauty",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Serums & Tratamientos",
    "priceFCFA": 15000,
    "originalPriceFCFA": 17500,
    "inStock": true,
    "featured": false,
    "description": "Concentrado iluminador facial con vitamina C estabilizada y ácido hialurónico. Revitaliza la piel y aporta luminosidad natural todo el día.",
    "images": {
      "primary": "/products/product_51.jfif",
      "gallery": [
        "/products/product_51.jfif"
      ]
    },
    "details": {
      "size": [
        "50ml"
      ],
      "volume": "50ml",
      "material": "Vitamina C & Ácido Hialurónico"
    },
    "slug": "set-de-cosmetica-facial-brunch-beauty-glow-serum-50ml-ebna-51",
    "price": 15000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rosa",
      "Transparente"
    ],
    "sizes": [
      "50ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-52",
    "sku": "EB-HIG-03",
    "name": "Jabón de Azufre BioSulfur Grisi Anti-Acné 100g",
    "brand": "Grisi",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Medicinales",
    "priceFCFA": 3500,
    "originalPriceFCFA": 4000,
    "inStock": true,
    "featured": false,
    "description": "Jabón medicinal con 10% de azufre coloidal formulado para pieles con tendencia acneica. Controla el exceso de grasa y desobstruye poros.",
    "images": {
      "primary": "/products/product_52.jfif",
      "gallery": [
        "/products/product_52.jfif"
      ]
    },
    "details": {
      "size": [
        "100g"
      ],
      "volume": "100g",
      "material": "10% Azufre Coloidal Dermatológico"
    },
    "slug": "jabon-de-azufre-biosulfur-grisi-anti-acne-100g-ebna-52",
    "price": 3500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Amarillo"
    ],
    "sizes": [
      "100g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-53",
    "sku": "EB-MODM-44",
    "name": "Vestido Midi Gingham Smocked Tie-Strap Elegance",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Fiesta",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Vestido midi de tirantes ajustables con nudo y cuerpo fruncido elástico en estampado de cuadros vichy. Silueta fresca y primaveral.",
    "images": {
      "primary": "/products/product_53.png",
      "gallery": [
        "/products/product_53.png"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón Fruncido & Tirantes Ajustables"
    },
    "slug": "vestido-midi-gingham-smocked-tie-strap-elegance-ebna-53",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco y Negro",
      "Gingham"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-54",
    "sku": "EB-MODM-45",
    "name": "Vestido Mini Halter Neck Bodycon Satin Red",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Fiesta",
    "priceFCFA": 26000,
    "originalPriceFCFA": 30000,
    "inStock": true,
    "featured": false,
    "description": "Mini vestido entallado con cuello halter y espalda descubierta. Tejido satinado elástico que moldea la silueta con elegancia nocturna.",
    "images": {
      "primary": "/products/product_54.jfif",
      "gallery": [
        "/products/product_54.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Satén Elástico de Alta Densidad"
    },
    "slug": "vestido-mini-halter-neck-bodycon-satin-red-ebna-54",
    "price": 26000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo",
      "Rosa",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-55",
    "sku": "EB-HIG-04",
    "name": "Jabón Aclarante CaroWhite Clarifying Soap 180g",
    "brand": "CaroWhite",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Aclarantes",
    "priceFCFA": 4500,
    "originalPriceFCFA": 5000,
    "inStock": true,
    "featured": false,
    "description": "Jabón aclarante corporal con aceite de zanahoria y complejo iluminador. Limpieza profunda que elimina impurezas y unifica el tono.",
    "images": {
      "primary": "/products/product_55.jfif",
      "gallery": [
        "/products/product_55.jfif"
      ]
    },
    "details": {
      "size": [
        "180g"
      ],
      "volume": "180g",
      "material": "Aceite de Zanahoria & Hidro-Complejo"
    },
    "slug": "jabon-aclarante-carowhite-clarifying-soap-180g-ebna-55",
    "price": 4500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Naranja",
      "Blanco"
    ],
    "sizes": [
      "180g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-56",
    "sku": "EB-MODM-46",
    "name": "Falda Maxi Jersey Cerelina White Couture",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Faldas & Tops",
    "priceFCFA": 25000,
    "originalPriceFCFA": 28500,
    "inStock": true,
    "featured": false,
    "description": "Falda larga de punto jersey suave con cintura elástica alta y drapeado fluido. Caída elegante para combinar con tops y camisas.",
    "images": {
      "primary": "/products/product_56.jfif",
      "gallery": [
        "/products/product_56.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Punto Jersey Suave de Alta Caída"
    },
    "slug": "falda-maxi-jersey-cerelina-white-couture-ebna-56",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Crema"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-58",
    "sku": "EB-MODM-48",
    "name": "Chaqueta Blazer Sastre Zara Style New Collection (Edition)",
    "brand": "Zara",
    "category": "MODA_MUJER",
    "subcategory": "Chaqueas & Blazers",
    "priceFCFA": 32000,
    "originalPriceFCFA": 37000,
    "inStock": true,
    "featured": false,
    "description": "Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda sastre versátil para elevar cualquier atuendo.",
    "images": {
      "primary": "/products/product_58.jfif",
      "gallery": [
        "/products/product_58.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Crepe Estructurado & Botones Carey"
    },
    "slug": "chaqueta-blazer-sastre-zara-style-new-collection-edition-ebna-58",
    "price": 32000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Beige",
      "Camel",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-60",
    "sku": "EB-MODM-50",
    "name": "Vestido Satinado de Noche Zara Luxe Red",
    "brand": "Zara",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Fiesta",
    "priceFCFA": 48000,
    "originalPriceFCFA": 55000,
    "inStock": true,
    "featured": false,
    "description": "Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.",
    "images": {
      "primary": "/products/product_60.jfif",
      "gallery": [
        "/products/product_60.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Raso de Seda Satinado"
    },
    "slug": "vestido-satinado-de-noche-zara-luxe-red-ebna-60",
    "price": 48000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo",
      "Verde Esmeralda",
      "Blanco"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-61",
    "sku": "EB-CALZ-03",
    "name": "Sandalias de Tacón Elegantes Zara Heels Gold Edition",
    "brand": "Zara",
    "category": "CALZADO",
    "subcategory": "Zapatos de Tacón",
    "priceFCFA": 28000,
    "originalPriceFCFA": 32000,
    "inStock": true,
    "featured": false,
    "description": "Zapatos de tacón alto con tiras finas cruzadas y cierre de hebilla en el tobillo. Estilo glamuroso para vestidos de fiesta y cóctel.",
    "images": {
      "primary": "/products/product_61.jfif",
      "gallery": [
        "/products/product_61.jfif"
      ]
    },
    "details": {
      "size": [
        "36",
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Charol Sintético & Hebilla Metálica"
    },
    "slug": "sandalias-de-tacon-elegantes-zara-heels-gold-edition-ebna-61",
    "price": 28000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Dorado",
      "Bordo",
      "Negro"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-62",
    "sku": "EB-COSM-03",
    "name": "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g",
    "brand": "EBNA Beauty",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Exfoliantes & Bálsamos Labiales",
    "priceFCFA": 6500,
    "originalPriceFCFA": 7500,
    "inStock": true,
    "featured": false,
    "description": "Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.",
    "images": {
      "primary": "/products/product_62.jfif",
      "gallery": [
        "/products/product_62.jfif"
      ]
    },
    "details": {
      "size": [
        "30g"
      ],
      "volume": "30g",
      "material": "Microcristales de Azúcar & Aceite de Coco"
    },
    "slug": "exfoliante-labial-nutritivo-de-coco-frambuesa-30g-ebna-62",
    "price": 6500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rosa",
      "Frambuesa"
    ],
    "sizes": [
      "30g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-63",
    "sku": "EB-COSM-04",
    "name": "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g (Edition)",
    "brand": "EBNA Beauty",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Exfoliantes & Bálsamos Labiales",
    "priceFCFA": 6500,
    "originalPriceFCFA": 7500,
    "inStock": true,
    "featured": false,
    "description": "Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.",
    "images": {
      "primary": "/products/product_63.jfif",
      "gallery": [
        "/products/product_63.jfif"
      ]
    },
    "details": {
      "size": [
        "30g"
      ],
      "volume": "30g",
      "material": "Microcristales de Azúcar & Aceite de Coco"
    },
    "slug": "exfoliante-labial-nutritivo-de-coco-frambuesa-30g-edition-ebna-63",
    "price": 6500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rosa",
      "Frambuesa"
    ],
    "sizes": [
      "30g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-64",
    "sku": "EB-COSM-05",
    "name": "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g (Luxury)",
    "brand": "EBNA Beauty",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Exfoliantes & Bálsamos Labiales",
    "priceFCFA": 6500,
    "originalPriceFCFA": 7500,
    "inStock": true,
    "featured": false,
    "description": "Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.",
    "images": {
      "primary": "/products/product_64.jfif",
      "gallery": [
        "/products/product_64.jfif"
      ]
    },
    "details": {
      "size": [
        "30g"
      ],
      "volume": "30g",
      "material": "Microcristales de Azúcar & Aceite de Coco"
    },
    "slug": "exfoliante-labial-nutritivo-de-coco-frambuesa-30g-luxury-ebna-64",
    "price": 6500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rosa",
      "Frambuesa"
    ],
    "sizes": [
      "30g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-67",
    "sku": "EB-MODM-53",
    "name": "Pantalón Leggings High Waist Levanta Bumbum Noir",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Pantalones & Mallas",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Mallas de tiro alto con tecnología de modelado en glúteos y pretina ancha. Tejido elástico denso no transparente.",
    "images": {
      "primary": "/products/product_67.jfif",
      "gallery": [
        "/products/product_67.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Tejido Compresivo de Alta Densidad"
    },
    "slug": "pantalon-leggings-high-waist-levanta-bumbum-noir-ebna-67",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Azul Marino"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-68",
    "sku": "EB-HIG-05",
    "name": "Gel de Ducha Lactoadvance Instituto Español 1250ml",
    "brand": "Instituto Español",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Geles de Baño",
    "priceFCFA": 7500,
    "originalPriceFCFA": 8500,
    "inStock": true,
    "featured": false,
    "description": "Gel de baño dermoprotector enriquecido con proteínas de leche e ingredientes hidratantes. Sensación de limpieza y confort diario.",
    "images": {
      "primary": "/products/product_68.jfif",
      "gallery": [
        "/products/product_68.jfif"
      ]
    },
    "details": {
      "size": [
        "1250ml"
      ],
      "volume": "1250ml",
      "material": "Proteínas de Leche & pH Neutro"
    },
    "slug": "gel-de-ducha-lactoadvance-instituto-espanol-1250ml-ebna-68",
    "price": 7500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Azul"
    ],
    "sizes": [
      "1250ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-69",
    "sku": "EB-MODM-54",
    "name": "Pantalón Jeans Wide Leg Streetwear Y2K Vintage Wash",
    "brand": "EBNA Streetwear",
    "category": "MODA_MUJER",
    "subcategory": "Pantalones & Mallas",
    "priceFCFA": 28000,
    "originalPriceFCFA": 32000,
    "inStock": true,
    "featured": false,
    "description": "Vaqueros anchos de corte holgado streetwear estilo Y2K con estampado gráfico sutil. Confeccionados en mezclilla rígida de alta calidad.",
    "images": {
      "primary": "/products/product_69.jfif",
      "gallery": [
        "/products/product_69.jfif"
      ]
    },
    "details": {
      "size": [
        "36",
        "38",
        "40",
        "42"
      ],
      "material": "Mezclilla Rígida 100% Algodón"
    },
    "slug": "pantalon-jeans-wide-leg-streetwear-y2k-vintage-wash-ebna-69",
    "price": 28000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Azul Denim Vintage",
      "Negro Washed"
    ],
    "sizes": [
      "36",
      "38",
      "40",
      "42"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-70",
    "sku": "EB-MODH-01",
    "name": "Sudadera Oversized Thermal Lined Kangaroo Hoodie",
    "brand": "EBNA Men",
    "category": "MODA_HOMBRE",
    "subcategory": "Sudaderas & Hoodies",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto y aislamiento térmico suave.",
    "images": {
      "primary": "/products/product_70.jfif",
      "gallery": [
        "/products/product_70.jfif"
      ]
    },
    "details": {
      "size": [
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "material": "Franela Térmica Afelpada"
    },
    "slug": "sudadera-oversized-thermal-lined-kangaroo-hoodie-ebna-70",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Crema",
      "Marrón",
      "Verde",
      "Negro"
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-71",
    "sku": "EB-MODM-55",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Edition)",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos & Sets",
    "priceFCFA": 25000,
    "originalPriceFCFA": 28500,
    "inStock": true,
    "featured": false,
    "description": "Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.",
    "images": {
      "primary": "/products/product_71.jfif",
      "gallery": [
        "/products/product_71.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón Athleisure & Elastano"
    },
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-edition-ebna-71",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Beige",
      "Gris",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-72",
    "sku": "EB-HIG-06",
    "name": "Champú Suave Pieles Atópicas Instituto Español 300ml",
    "brand": "Instituto Español",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Champús & Cuidado Capilar",
    "priceFCFA": 6500,
    "originalPriceFCFA": 7500,
    "inStock": true,
    "featured": false,
    "description": "Champú dermo-protector especial para cueros cabelludos sensibles o con tendencia atópica. Limpieza ultrasuave sin sulfatos agresivos.",
    "images": {
      "primary": "/products/product_72.jfif",
      "gallery": [
        "/products/product_72.jfif"
      ]
    },
    "details": {
      "size": [
        "300ml"
      ],
      "volume": "300ml",
      "material": "Fórmula Hipoalergénica Sin Sulfatos"
    },
    "slug": "champu-suave-pieles-atopicas-instituto-espanol-300ml-ebna-72",
    "price": 6500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Azul"
    ],
    "sizes": [
      "300ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-74",
    "sku": "EB-HIG-07",
    "name": "Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico",
    "brand": "Kojic San",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Aclarantes",
    "priceFCFA": 4000,
    "originalPriceFCFA": 4500,
    "inStock": true,
    "featured": false,
    "description": "Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.",
    "images": {
      "primary": "/products/product_74.jfif",
      "gallery": [
        "/products/product_74.jfif"
      ]
    },
    "details": {
      "size": [
        "135g"
      ],
      "volume": "135g",
      "material": "Ácido Kójico Concentrado & Cúrcuma"
    },
    "slug": "jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-ebna-74",
    "price": 4000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Naranja",
      "Amarillo"
    ],
    "sizes": [
      "135g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-75",
    "sku": "EB-CALZ-04",
    "name": "Botines Kraasa Chelsea Boots de Cuero Urbano",
    "brand": "Kraasa",
    "category": "CALZADO",
    "subcategory": "Botines & Botas",
    "priceFCFA": 32000,
    "originalPriceFCFA": 37000,
    "inStock": true,
    "featured": false,
    "description": "Botines estilo Chelsea con paneles elásticos laterales y tirador posterior. Cuero sintético resistente y suela dentada antideslizante.",
    "images": {
      "primary": "/products/product_75.jfif",
      "gallery": [
        "/products/product_75.jfif"
      ]
    },
    "details": {
      "size": [
        "39",
        "40",
        "41",
        "42",
        "43"
      ],
      "material": "Cuero Sintético & Goma Dentada"
    },
    "slug": "botines-kraasa-chelsea-boots-de-cuero-urbano-ebna-75",
    "price": 32000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Marrón"
    ],
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-76",
    "sku": "EB-HIG-08",
    "name": "Loción Corporal Hidratante Avena Instituto Español (Edition)",
    "brand": "Instituto Español",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Lociones Corporales",
    "priceFCFA": 9500,
    "originalPriceFCFA": 11000,
    "inStock": true,
    "featured": false,
    "description": "Loción corporal de formato familiar formulada con extracto de avena 100% natural. 24 horas de hidratación para toda la familia.",
    "images": {
      "primary": "/products/product_76.jfif",
      "gallery": [
        "/products/product_76.jfif"
      ]
    },
    "details": {
      "size": [
        "950ml"
      ],
      "volume": "950ml",
      "material": "Extracto de Avena 100% Natural"
    },
    "slug": "locion-corporal-hidratante-avena-instituto-espanol-edition-ebna-76",
    "price": 9500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Beige",
      "Blanco"
    ],
    "sizes": [
      "950ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-78",
    "sku": "EB-ACC-03",
    "name": "Gorro de Satén Ajustable Largo para Trenzas & Dreads",
    "brand": "EBNA Luxury Collection",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Accesorios de Cabello & Bonnets",
    "priceFCFA": 6000,
    "originalPriceFCFA": 7000,
    "inStock": true,
    "featured": false,
    "description": "Gorro nocturno de satén de seda de doble capa con banda elástica regulable. Protege peinados, evita el encrespamiento y conserva la hidratación.",
    "images": {
      "primary": "/products/product_78.jfif",
      "gallery": [
        "/products/product_78.jfif"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Satén de Seda Doble Capa"
    },
    "slug": "gorro-de-saten-ajustable-largo-para-trenzas-dreads-ebna-78",
    "price": 6000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Rosa",
      "Dorado"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-80",
    "sku": "EB-COSM-06",
    "name": "Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)",
    "brand": "Topicrem",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Cuidado Facial Anti-Manchas",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.",
    "images": {
      "primary": "/products/product_80.png",
      "gallery": [
        "/products/product_80.png"
      ]
    },
    "details": {
      "size": [
        "40ml"
      ],
      "volume": "40ml",
      "material": "Fórmula Dermatológica SPF50+"
    },
    "slug": "crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-ebna-80",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco"
    ],
    "sizes": [
      "40ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-81",
    "sku": "EB-HIG-09",
    "name": "Desodorante Roll-On Nivea Men Black & White Invisible (Pack 4x)",
    "brand": "Nivea Men",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Desodorantes",
    "priceFCFA": 7500,
    "originalPriceFCFA": 8500,
    "inStock": true,
    "featured": false,
    "description": "Pack de desodorantes en roll-on con protección antitranspirante 48h. Fórmula antimanchas blancas en ropa negra y antimanchas amarillas en ropa blanca.",
    "images": {
      "primary": "/products/product_81.jfif",
      "gallery": [
        "/products/product_81.jfif"
      ]
    },
    "details": {
      "size": [
        "Pack 4x 50ml"
      ],
      "volume": "Pack 4x 50ml",
      "material": "Fórmula Antimanchas 48h Protection"
    },
    "slug": "desodorante-roll-on-nivea-men-black-white-invisible-pack-4x-ebna-81",
    "price": 7500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Azul"
    ],
    "sizes": [
      "Pack 4x 50ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-82",
    "sku": "EB-MODH-02",
    "name": "Pantalón Corto Bermuda Casual Men's Solid Color",
    "brand": "EBNA Men",
    "category": "MODA_HOMBRE",
    "subcategory": "Bermudas & Shorts",
    "priceFCFA": 15000,
    "originalPriceFCFA": 17500,
    "inStock": true,
    "featured": false,
    "description": "Bermuda de algodón ligero con cintura elástica y cordón ajustable. Bolsillos laterales para un look relajado de verano.",
    "images": {
      "primary": "/products/product_82.jfif",
      "gallery": [
        "/products/product_82.jfif"
      ]
    },
    "details": {
      "size": [
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "material": "Algodón Transpirable & Cordón Ajustable"
    },
    "slug": "pantalon-corto-bermuda-casual-men-s-solid-color-ebna-82",
    "price": 15000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Beige",
      "Azul Marino",
      "Negro"
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-84",
    "sku": "EB-MODH-03",
    "name": "Traje Ejecutivo de Sastrería Navy Blue Stripe 3 Piezas",
    "brand": "EBNA Men Tailored",
    "category": "MODA_HOMBRE",
    "subcategory": "Trajes & Sastrería Masculina",
    "priceFCFA": 65000,
    "originalPriceFCFA": 75000,
    "inStock": true,
    "featured": false,
    "description": "Traje formal de corte sastre compuesto por chaqueta, chaleco y pantalón en tejido estructurado con raya diplomática. Elegancia pura.",
    "images": {
      "primary": "/products/product_84.jfif",
      "gallery": [
        "/products/product_84.jfif"
      ]
    },
    "details": {
      "size": [
        "48",
        "50",
        "52",
        "54",
        "56"
      ],
      "material": "Lana Fría & Viscosa Estructurada"
    },
    "slug": "traje-ejecutivo-de-sastreria-navy-blue-stripe-3-piezas-ebna-84",
    "price": 65000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Azul Marino con Raya Diplomática"
    ],
    "sizes": [
      "48",
      "50",
      "52",
      "54",
      "56"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-85",
    "sku": "EB-CALZ-05",
    "name": "Zapatillas Sneakers Nike Dunk Low Wine Red Edition",
    "brand": "Nike",
    "category": "CALZADO",
    "subcategory": "Zapatillas Sneakers",
    "priceFCFA": 38000,
    "originalPriceFCFA": 43500,
    "inStock": true,
    "featured": false,
    "description": "Zapatillas deportivas urbanas icónicas en combinación bicolor rojo vino y blanco. Suela de goma amortiguada y cuero sintético de alta durabilidad.",
    "images": {
      "primary": "/products/product_85.jfif",
      "gallery": [
        "/products/product_85.jfif"
      ]
    },
    "details": {
      "size": [
        "38",
        "39",
        "40",
        "41",
        "42",
        "43"
      ],
      "material": "Cuero Sintético & Suela de Goma"
    },
    "slug": "zapatillas-sneakers-nike-dunk-low-wine-red-edition-ebna-85",
    "price": 38000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo Vino",
      "Blanco"
    ],
    "sizes": [
      "38",
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-86",
    "sku": "EB-HIG-10",
    "name": "Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Edition)",
    "brand": "Kojic San",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Aclarantes",
    "priceFCFA": 4000,
    "originalPriceFCFA": 4500,
    "inStock": true,
    "featured": false,
    "description": "Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.",
    "images": {
      "primary": "/products/product_86.jfif",
      "gallery": [
        "/products/product_86.jfif"
      ]
    },
    "details": {
      "size": [
        "135g"
      ],
      "volume": "135g",
      "material": "Ácido Kójico Concentrado & Cúrcuma"
    },
    "slug": "jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-edition-ebna-86",
    "price": 4000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Naranja",
      "Amarillo"
    ],
    "sizes": [
      "135g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-90",
    "sku": "EB-HIG-11",
    "name": "Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x)",
    "brand": "Palmolive",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones de Tocador",
    "priceFCFA": 3500,
    "originalPriceFCFA": 4000,
    "inStock": true,
    "featured": false,
    "description": "Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.",
    "images": {
      "primary": "/products/product_90.jfif",
      "gallery": [
        "/products/product_90.jfif"
      ]
    },
    "details": {
      "size": [
        "Pack 4x 90g"
      ],
      "volume": "Pack 4x 90g",
      "material": "Extracto Natural de Oliva & Leche Humectante"
    },
    "slug": "jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-ebna-90",
    "price": 3500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Verde Olivo",
      "Rosa"
    ],
    "sizes": [
      "Pack 4x 90g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-92",
    "sku": "EB-HIG-12",
    "name": "Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x) (Edition)",
    "brand": "Palmolive",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones de Tocador",
    "priceFCFA": 3500,
    "originalPriceFCFA": 4000,
    "inStock": true,
    "featured": false,
    "description": "Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.",
    "images": {
      "primary": "/products/product_92.jfif",
      "gallery": [
        "/products/product_92.jfif"
      ]
    },
    "details": {
      "size": [
        "Pack 4x 90g"
      ],
      "volume": "Pack 4x 90g",
      "material": "Extracto Natural de Oliva & Leche Humectante"
    },
    "slug": "jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-edition-ebna-92",
    "price": 3500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Verde Olivo",
      "Rosa"
    ],
    "sizes": [
      "Pack 4x 90g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-93",
    "sku": "EB-HIG-13",
    "name": "Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x) (Luxury)",
    "brand": "Palmolive",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones de Tocador",
    "priceFCFA": 3500,
    "originalPriceFCFA": 4000,
    "inStock": true,
    "featured": false,
    "description": "Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.",
    "images": {
      "primary": "/products/product_93.jfif",
      "gallery": [
        "/products/product_93.jfif"
      ]
    },
    "details": {
      "size": [
        "Pack 4x 90g"
      ],
      "volume": "Pack 4x 90g",
      "material": "Extracto Natural de Oliva & Leche Humectante"
    },
    "slug": "jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-luxury-ebna-93",
    "price": 3500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Verde Olivo",
      "Rosa"
    ],
    "sizes": [
      "Pack 4x 90g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-94",
    "sku": "EB-HIG-14",
    "name": "Gel de Ducha Lactoadvance Instituto Español 1250ml (Edition)",
    "brand": "Instituto Español",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Geles de Baño",
    "priceFCFA": 7500,
    "originalPriceFCFA": 8500,
    "inStock": true,
    "featured": false,
    "description": "Gel de baño dermoprotector enriquecido con proteínas de leche e ingredientes hidratantes. Sensación de limpieza y confort diario.",
    "images": {
      "primary": "/products/product_94.jfif",
      "gallery": [
        "/products/product_94.jfif"
      ]
    },
    "details": {
      "size": [
        "1250ml"
      ],
      "volume": "1250ml",
      "material": "Proteínas de Leche & pH Neutro"
    },
    "slug": "gel-de-ducha-lactoadvance-instituto-espanol-1250ml-edition-ebna-94",
    "price": 7500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Azul"
    ],
    "sizes": [
      "1250ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-95",
    "sku": "EB-HIG-15",
    "name": "Jabón Artesanal Crystal Egg con Aceites Esenciales 120g",
    "brand": "EBNA Spa",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Artesanales",
    "priceFCFA": 5500,
    "originalPriceFCFA": 6500,
    "inStock": true,
    "featured": false,
    "description": "Jabón de lujo en forma de huevo cristalino elaborado con aceites esenciales relajantes e higienizantes. Suavidad y aroma refinado.",
    "images": {
      "primary": "/products/product_95.jfif",
      "gallery": [
        "/products/product_95.jfif"
      ]
    },
    "details": {
      "size": [
        "120g"
      ],
      "volume": "120g",
      "material": "Glicerina Cristalina & Aceites Esenciales"
    },
    "slug": "jabon-artesanal-crystal-egg-con-aceites-esenciales-120g-ebna-95",
    "price": 5500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Amarillo Cristal",
      "Dorado"
    ],
    "sizes": [
      "120g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-96",
    "sku": "EB-CALZ-06",
    "name": "Zuecos Confort Crocs Original Limited Edition",
    "brand": "Crocs",
    "category": "CALZADO",
    "subcategory": "Zuecos & Sandalias",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Zuecos ultraligeros de espuma Croslite con correa pivoteada en el talón. Máxima ventilación y comodidad resistente al agua para interiores y exteriores.",
    "images": {
      "primary": "/products/product_96.jfif",
      "gallery": [
        "/products/product_96.jfif"
      ]
    },
    "details": {
      "size": [
        "36",
        "37",
        "38",
        "39",
        "40",
        "41"
      ],
      "material": "Espuma Croslite™ Moldeada"
    },
    "slug": "zuecos-confort-crocs-original-limited-edition-ebna-96",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Marrón",
      "Beige",
      "Verde Olivo"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-97",
    "sku": "EB-MODM-64",
    "name": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Luxury)",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Conjuntos & Sets",
    "priceFCFA": 25000,
    "originalPriceFCFA": 28500,
    "inStock": true,
    "featured": false,
    "description": "Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.",
    "images": {
      "primary": "/products/product_97.jfif",
      "gallery": [
        "/products/product_97.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón Athleisure & Elastano"
    },
    "slug": "conjunto-deportivo-hooded-crop-top-pantalon-flare-luxury-ebna-97",
    "price": 25000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Beige",
      "Gris",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-99",
    "sku": "EB-ACC-04",
    "name": "Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas (Edition)",
    "brand": "EBNA Luxury Collection",
    "category": "BOLSOS_ACCESORIOS",
    "subcategory": "Accesorios de Viaje",
    "priceFCFA": 12000,
    "originalPriceFCFA": 14000,
    "inStock": true,
    "featured": false,
    "description": "Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa mundi. Incluye ranuras para tarjetas e ID.",
    "images": {
      "primary": "/products/product_99.webp",
      "gallery": [
        "/products/product_99.webp"
      ]
    },
    "details": {
      "size": [
        "Talla Única"
      ],
      "material": "Cuero Sintético PU & Grabado Mapa"
    },
    "slug": "funda-porta-pasaporte-pu-map-pattern-porta-tarjetas-edition-ebna-99",
    "price": 12000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Azul",
      "Rosa",
      "Negro",
      "Dorado",
      "Beige"
    ],
    "sizes": [
      "Talla Única"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-100",
    "sku": "EB-CALZ-07",
    "name": "Zapatillas Deportivas Puma Speedcat OG Classic",
    "brand": "Puma",
    "category": "CALZADO",
    "subcategory": "Zapatillas Sneakers",
    "priceFCFA": 35000,
    "originalPriceFCFA": 40500,
    "inStock": true,
    "featured": false,
    "description": "Diseño clásico de motorsport en ante suave con la emblemática ola de Puma. Ajuste perfilado y suela de perfil bajo de máximo confort.",
    "images": {
      "primary": "/products/product_100.jfif",
      "gallery": [
        "/products/product_100.jfif"
      ]
    },
    "details": {
      "size": [
        "37",
        "38",
        "39",
        "40",
        "41",
        "42"
      ],
      "material": "Ante Suave & Goma Antideslizante"
    },
    "slug": "zapatillas-deportivas-puma-speedcat-og-classic-ebna-100",
    "price": 35000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Blanco"
    ],
    "sizes": [
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-101",
    "sku": "EB-HIG-16",
    "name": "Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Luxury)",
    "brand": "Kojic San",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Aclarantes",
    "priceFCFA": 4000,
    "originalPriceFCFA": 4500,
    "inStock": true,
    "featured": false,
    "description": "Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.",
    "images": {
      "primary": "/products/product_101.jfif",
      "gallery": [
        "/products/product_101.jfif"
      ]
    },
    "details": {
      "size": [
        "135g"
      ],
      "volume": "135g",
      "material": "Ácido Kójico Concentrado & Cúrcuma"
    },
    "slug": "jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-luxury-ebna-101",
    "price": 4000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Naranja",
      "Amarillo"
    ],
    "sizes": [
      "135g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-102",
    "sku": "EB-HIG-17",
    "name": "Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Selection)",
    "brand": "Kojic San",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Aclarantes",
    "priceFCFA": 4000,
    "originalPriceFCFA": 4500,
    "inStock": true,
    "featured": false,
    "description": "Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.",
    "images": {
      "primary": "/products/product_102.jfif",
      "gallery": [
        "/products/product_102.jfif"
      ]
    },
    "details": {
      "size": [
        "135g"
      ],
      "volume": "135g",
      "material": "Ácido Kójico Concentrado & Cúrcuma"
    },
    "slug": "jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-selection-ebna-102",
    "price": 4000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Naranja",
      "Amarillo"
    ],
    "sizes": [
      "135g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-103",
    "sku": "EB-HIG-18",
    "name": "Jabón Corporal Hidratante Miel & Avena Nutrición Intensa (100g)",
    "brand": "EBNA Care",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones de Tocador",
    "priceFCFA": 3500,
    "originalPriceFCFA": 4000,
    "inStock": true,
    "featured": false,
    "description": "Barra de jabón formulada con miel pura y hojuelas de avena coloidal. Calma pieles sensibles y restaura la barrera cutánea.",
    "images": {
      "primary": "/products/product_103.png",
      "gallery": [
        "/products/product_103.png"
      ]
    },
    "details": {
      "size": [
        "100g"
      ],
      "volume": "100g",
      "material": "Miel de Abeja & Avena Coloidal"
    },
    "slug": "jabon-corporal-hidratante-miel-avena-nutricion-intensa-100g-ebna-103",
    "price": 3500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Amarillo Soft"
    ],
    "sizes": [
      "100g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-105",
    "sku": "EB-HIG-19",
    "name": "Jabón Galong Naranja & Colágeno Aclarante 100g",
    "brand": "Galong",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Aclarantes",
    "priceFCFA": 3000,
    "originalPriceFCFA": 3500,
    "inStock": true,
    "featured": false,
    "description": "Jabón tailandés de extracto concentrado de naranja y colágeno soluble. Aporta vitamina C y elasticidad a la piel durante el baño.",
    "images": {
      "primary": "/products/product_105.png",
      "gallery": [
        "/products/product_105.png"
      ]
    },
    "details": {
      "size": [
        "100g"
      ],
      "volume": "100g",
      "material": "Vitamina C & Colágeno Soluble"
    },
    "slug": "jabon-galong-naranja-colageno-aclarante-100g-ebna-105",
    "price": 3000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Naranja"
    ],
    "sizes": [
      "100g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-107",
    "sku": "EB-MODH-04",
    "name": "Pantalón Corto Bermuda Casual Men's Solid Color (Edition)",
    "brand": "EBNA Men",
    "category": "MODA_HOMBRE",
    "subcategory": "Bermudas & Shorts",
    "priceFCFA": 15000,
    "originalPriceFCFA": 17500,
    "inStock": true,
    "featured": false,
    "description": "Bermuda de algodón ligero con cintura elástica y cordón ajustable. Bolsillos laterales para un look relajado de verano.",
    "images": {
      "primary": "/products/product_107.jfif",
      "gallery": [
        "/products/product_107.jfif"
      ]
    },
    "details": {
      "size": [
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "material": "Algodón Transpirable & Cordón Ajustable"
    },
    "slug": "pantalon-corto-bermuda-casual-men-s-solid-color-edition-ebna-107",
    "price": 15000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Beige",
      "Azul Marino",
      "Negro"
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-111",
    "sku": "EB-COSM-07",
    "name": "Crema Facial Aclarante Turmeric Face Cream 50g",
    "brand": "Oceaura",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Cremas Faciales",
    "priceFCFA": 14000,
    "originalPriceFCFA": 16000,
    "inStock": true,
    "featured": false,
    "description": "Crema hidratante enriquecida con extracto de cúrcuma orgánica y niacinamida. Atenúa hiperpigmentación y restaura la frescura del rostro.",
    "images": {
      "primary": "/products/product_111.jfif",
      "gallery": [
        "/products/product_111.jfif"
      ]
    },
    "details": {
      "size": [
        "50g"
      ],
      "volume": "50g",
      "material": "Extracto de Cúrcuma & Niacinamida"
    },
    "slug": "crema-facial-aclarante-turmeric-face-cream-50g-ebna-111",
    "price": 14000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Amarillo",
      "Dorado"
    ],
    "sizes": [
      "50g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-112",
    "sku": "EB-MODM-71",
    "name": "Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style",
    "brand": "Oh Polly",
    "category": "MODA_MUJER",
    "subcategory": "Chaqueas & Blazers",
    "priceFCFA": 27000,
    "originalPriceFCFA": 31000,
    "inStock": true,
    "featured": false,
    "description": "Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal completa y capucha. Tejido suave de efecto segunda piel.",
    "images": {
      "primary": "/products/product_112.jfif",
      "gallery": [
        "/products/product_112.jfif"
      ]
    },
    "details": {
      "size": [
        "XS",
        "S",
        "M",
        "L"
      ],
      "material": "Microfibra Moldeadora Efecto Segunda Piel"
    },
    "slug": "chaqueta-active-soft-mid-layer-zip-up-black-oh-polly-style-ebna-112",
    "price": 27000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Chocolate",
      "Nude"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-113",
    "sku": "EB-MODM-72",
    "name": "Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style (Edition)",
    "brand": "Oh Polly",
    "category": "MODA_MUJER",
    "subcategory": "Chaqueas & Blazers",
    "priceFCFA": 27000,
    "originalPriceFCFA": 31000,
    "inStock": true,
    "featured": false,
    "description": "Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal completa y capucha. Tejido suave de efecto segunda piel.",
    "images": {
      "primary": "/products/product_113.jfif",
      "gallery": [
        "/products/product_113.jfif"
      ]
    },
    "details": {
      "size": [
        "XS",
        "S",
        "M",
        "L"
      ],
      "material": "Microfibra Moldeadora Efecto Segunda Piel"
    },
    "slug": "chaqueta-active-soft-mid-layer-zip-up-black-oh-polly-style-edition-ebna-113",
    "price": 27000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Chocolate",
      "Nude"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-115",
    "sku": "EB-MODM-74",
    "name": "Vestido Veraniego Polka Dot Retro Flared Red",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Fiesta",
    "priceFCFA": 23000,
    "originalPriceFCFA": 26500,
    "inStock": true,
    "featured": false,
    "description": "Vestido midi de estilo vintage con estampado de lunares y escote con hombros descubiertos. Falda de vuelo ligera y fresca.",
    "images": {
      "primary": "/products/product_115.jfif",
      "gallery": [
        "/products/product_115.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "material": "Algodón Ligero Vuelo Retro"
    },
    "slug": "vestido-veraniego-polka-dot-retro-flared-red-ebna-115",
    "price": 23000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo con Lunares",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-117",
    "sku": "EB-COSM-08",
    "name": "Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml) (Edition)",
    "brand": "Topicrem",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Cuidado Facial Anti-Manchas",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.",
    "images": {
      "primary": "/products/product_117.jfif",
      "gallery": [
        "/products/product_117.jfif"
      ]
    },
    "details": {
      "size": [
        "40ml"
      ],
      "volume": "40ml",
      "material": "Fórmula Dermatológica SPF50+"
    },
    "slug": "crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-edition-ebna-117",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco"
    ],
    "sizes": [
      "40ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-118",
    "sku": "EB-COSM-09",
    "name": "Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml) (Luxury)",
    "brand": "Topicrem",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Cuidado Facial Anti-Manchas",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.",
    "images": {
      "primary": "/products/product_118.jfif",
      "gallery": [
        "/products/product_118.jfif"
      ]
    },
    "details": {
      "size": [
        "40ml"
      ],
      "volume": "40ml",
      "material": "Fórmula Dermatológica SPF50+"
    },
    "slug": "crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-luxury-ebna-118",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco"
    ],
    "sizes": [
      "40ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-119",
    "sku": "EB-HIG-20",
    "name": "Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Gold)",
    "brand": "Kojic San",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones Aclarantes",
    "priceFCFA": 4000,
    "originalPriceFCFA": 4500,
    "inStock": true,
    "featured": false,
    "description": "Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.",
    "images": {
      "primary": "/products/product_119.jfif",
      "gallery": [
        "/products/product_119.jfif"
      ]
    },
    "details": {
      "size": [
        "135g"
      ],
      "volume": "135g",
      "material": "Ácido Kójico Concentrado & Cúrcuma"
    },
    "slug": "jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-gold-ebna-119",
    "price": 4000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Naranja",
      "Amarillo"
    ],
    "sizes": [
      "135g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-120",
    "sku": "EB-HIG-21",
    "name": "Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g",
    "brand": "EBNA Spa",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Exfoliantes Corporales",
    "priceFCFA": 12000,
    "originalPriceFCFA": 14000,
    "inStock": true,
    "featured": false,
    "description": "Scrub corporal regenerador con sal marina, extracto de cúrcuma y vitamina E. Remueve células muertas dejando la piel sedosa e hidratada.",
    "images": {
      "primary": "/products/product_120.jfif",
      "gallery": [
        "/products/product_120.jfif"
      ]
    },
    "details": {
      "size": [
        "250g"
      ],
      "volume": "250g",
      "material": "Sal Marina, Cúrcuma & Aceite de Jojoba"
    },
    "slug": "exfoliante-corporal-curcuma-sal-marina-con-aceite-de-jojoba-250g-ebna-120",
    "price": 12000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Amarillo",
      "Rosa"
    ],
    "sizes": [
      "250g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-121",
    "sku": "EB-HIG-22",
    "name": "Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g)",
    "brand": "Vaseline",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones de Tocador",
    "priceFCFA": 4500,
    "originalPriceFCFA": 5000,
    "inStock": true,
    "featured": false,
    "description": "Pastillas de jabón enriquecidas con Niacinamida (Vitamina B3) y microgotas de Vaselina Pura. Aportan brillo y nutrición profunda.",
    "images": {
      "primary": "/products/product_121.jfif",
      "gallery": [
        "/products/product_121.jfif"
      ]
    },
    "details": {
      "size": [
        "Pack 4x 75g"
      ],
      "volume": "Pack 4x 75g",
      "material": "Vitamina B3 & Microgotas de Vaselina"
    },
    "slug": "jabon-vaseline-healthy-bright-vitamin-b3-pack-4x-75g-ebna-121",
    "price": 4500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rosa",
      "Blanco"
    ],
    "sizes": [
      "Pack 4x 75g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-122",
    "sku": "EB-HIG-23",
    "name": "Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g) (Edition)",
    "brand": "Vaseline",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Jabones de Tocador",
    "priceFCFA": 4500,
    "originalPriceFCFA": 5000,
    "inStock": true,
    "featured": false,
    "description": "Pastillas de jabón enriquecidas con Niacinamida (Vitamina B3) y microgotas de Vaselina Pura. Aportan brillo y nutrición profunda.",
    "images": {
      "primary": "/products/product_122.jfif",
      "gallery": [
        "/products/product_122.jfif"
      ]
    },
    "details": {
      "size": [
        "Pack 4x 75g"
      ],
      "volume": "Pack 4x 75g",
      "material": "Vitamina B3 & Microgotas de Vaselina"
    },
    "slug": "jabon-vaseline-healthy-bright-vitamin-b3-pack-4x-75g-edition-ebna-122",
    "price": 4500,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rosa",
      "Blanco"
    ],
    "sizes": [
      "Pack 4x 75g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-123",
    "sku": "EB-COSM-10",
    "name": "Bálsamo Labial Vaseline Lip Therapy Original 4g",
    "brand": "Vaseline",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Bálsamos Labiales",
    "priceFCFA": 3000,
    "originalPriceFCFA": 3500,
    "inStock": true,
    "featured": false,
    "description": "Protector labial de vaselina pura no grasa. Alivia labios secos o agrietados proporcionando una barrera humectante inmediata.",
    "images": {
      "primary": "/products/product_123.jfif",
      "gallery": [
        "/products/product_123.jfif"
      ]
    },
    "details": {
      "size": [
        "4g"
      ],
      "volume": "4g",
      "material": "Vaselina Pura Grado Farmacéutico"
    },
    "slug": "balsamo-labial-vaseline-lip-therapy-original-4g-ebna-123",
    "price": 3000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Transparente",
      "Azul"
    ],
    "sizes": [
      "4g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-125",
    "sku": "EB-COSM-11",
    "name": "Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting (Edition)",
    "brand": "EBNA Beauty",
    "category": "COSMETICA_FACIAL",
    "subcategory": "Maquillaje de Labios",
    "priceFCFA": 9000,
    "originalPriceFCFA": 10500,
    "inStock": true,
    "featured": false,
    "description": "Pintalabios líquido mate de alta cobertura e intensidad de color. Fórmula intransferible de larga duración hasta 16 horas de fijación.",
    "images": {
      "primary": "/products/product_125.png",
      "gallery": [
        "/products/product_125.png"
      ]
    },
    "details": {
      "size": [
        "8g"
      ],
      "volume": "8g",
      "material": "Pigmentos Velvet Matte Intransferibles"
    },
    "slug": "lapiz-labial-liquido-velvet-matte-waterproof-long-lasting-edition-ebna-125",
    "price": 9000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo",
      "Rosa Wood",
      "Nude"
    ],
    "sizes": [
      "8g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-126",
    "sku": "EB-MODM-77",
    "name": "Vestido Satinado de Noche Zara Luxe Red (Edition)",
    "brand": "Zara",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Fiesta",
    "priceFCFA": 48000,
    "originalPriceFCFA": 55000,
    "inStock": true,
    "featured": false,
    "description": "Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.",
    "images": {
      "primary": "/products/product_126.jfif",
      "gallery": [
        "/products/product_126.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Raso de Seda Satinado"
    },
    "slug": "vestido-satinado-de-noche-zara-luxe-red-edition-ebna-126",
    "price": 48000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo",
      "Verde Esmeralda",
      "Blanco"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-127",
    "sku": "EB-MODM-78",
    "name": "Vestido Satinado de Noche Zara Luxe Red (Luxury)",
    "brand": "Zara",
    "category": "MODA_MUJER",
    "subcategory": "Vestidos de Noche & Fiesta",
    "priceFCFA": 48000,
    "originalPriceFCFA": 55000,
    "inStock": true,
    "featured": false,
    "description": "Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.",
    "images": {
      "primary": "/products/product_127.jfif",
      "gallery": [
        "/products/product_127.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Raso de Seda Satinado"
    },
    "slug": "vestido-satinado-de-noche-zara-luxe-red-luxury-ebna-127",
    "price": 48000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo",
      "Verde Esmeralda",
      "Blanco"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-128",
    "sku": "EB-HIG-24",
    "name": "Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g (Edition)",
    "brand": "EBNA Spa",
    "category": "HIGIENE_CORPORAL",
    "subcategory": "Exfoliantes Corporales",
    "priceFCFA": 12000,
    "originalPriceFCFA": 14000,
    "inStock": true,
    "featured": false,
    "description": "Scrub corporal regenerador con sal marina, extracto de cúrcuma y vitamina E. Remueve células muertas dejando la piel sedosa e hidratada.",
    "images": {
      "primary": "/products/product_128.jfif",
      "gallery": [
        "/products/product_128.jfif"
      ]
    },
    "details": {
      "size": [
        "250g"
      ],
      "volume": "250g",
      "material": "Sal Marina, Cúrcuma & Aceite de Jojoba"
    },
    "slug": "exfoliante-corporal-curcuma-sal-marina-con-aceite-de-jojoba-250g-edition-ebna-128",
    "price": 12000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Amarillo",
      "Rosa"
    ],
    "sizes": [
      "250g"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-130",
    "sku": "EB-CALZ-08",
    "name": "Bailarinas Malla Calada Woven Mary Jane Flats",
    "brand": "EBNA Luxury Collection",
    "category": "CALZADO",
    "subcategory": "Bailarinas & Zapatos Planos",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Calzado plano de malla calada con hebilla ajustable sobre el empeine. Diseño fresco, flexible y transpirable para clima cálido.",
    "images": {
      "primary": "/products/product_130.jfif",
      "gallery": [
        "/products/product_130.jfif"
      ]
    },
    "details": {
      "size": [
        "36",
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Malla Calada & Suela Flexible"
    },
    "slug": "bailarinas-malla-calada-woven-mary-jane-flats-ebna-130",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Beige",
      "Blanco"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-131",
    "sku": "EB-CALZ-09",
    "name": "Bailarinas Elegantes Encaje Floral Ollio Paris (Edition)",
    "brand": "Ollio Paris",
    "category": "CALZADO",
    "subcategory": "Bailarinas & Zapatos Planos",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Zapatos planos estilo bailarina confeccionados en encaje floral transpirable. Plantilla acolchada suave ideal para eventos y oficina.",
    "images": {
      "primary": "/products/product_131.jfif",
      "gallery": [
        "/products/product_131.jfif"
      ]
    },
    "details": {
      "size": [
        "36",
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Encaje Floral Malla & Plantilla Acolchada"
    },
    "slug": "bailarinas-elegantes-encaje-floral-ollio-paris-edition-ebna-131",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-133",
    "sku": "EB-CALZ-10",
    "name": "Bailarinas Malla Calada Woven Mary Jane Flats (Edition)",
    "brand": "EBNA Luxury Collection",
    "category": "CALZADO",
    "subcategory": "Bailarinas & Zapatos Planos",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Calzado plano de malla calada con hebilla ajustable sobre el empeine. Diseño fresco, flexible y transpirable para clima cálido.",
    "images": {
      "primary": "/products/product_133.jfif",
      "gallery": [
        "/products/product_133.jfif"
      ]
    },
    "details": {
      "size": [
        "36",
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Malla Calada & Suela Flexible"
    },
    "slug": "bailarinas-malla-calada-woven-mary-jane-flats-edition-ebna-133",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Negro",
      "Beige",
      "Blanco"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-134",
    "sku": "EB-CALZ-11",
    "name": "Sandalias de Tacón Elegantes Zara Heels Gold Edition (Edition)",
    "brand": "Zara",
    "category": "CALZADO",
    "subcategory": "Zapatos de Tacón",
    "priceFCFA": 28000,
    "originalPriceFCFA": 32000,
    "inStock": true,
    "featured": false,
    "description": "Zapatos de tacón alto con tiras finas cruzadas y cierre de hebilla en el tobillo. Estilo glamuroso para vestidos de fiesta y cóctel.",
    "images": {
      "primary": "/products/product_134.jfif",
      "gallery": [
        "/products/product_134.jfif"
      ]
    },
    "details": {
      "size": [
        "36",
        "37",
        "38",
        "39",
        "40"
      ],
      "material": "Charol Sintético & Hebilla Metálica"
    },
    "slug": "sandalias-de-tacon-elegantes-zara-heels-gold-edition-edition-ebna-134",
    "price": 28000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Dorado",
      "Bordo",
      "Negro"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-135",
    "sku": "EB-PERF-01",
    "name": "Zara Red Vanilla Eau de Toilette",
    "brand": "Zara",
    "category": "PERFUMERIA",
    "subcategory": "Perfumes Femeninos",
    "priceFCFA": 32000,
    "originalPriceFCFA": 37000,
    "inStock": true,
    "featured": false,
    "description": "Fragancia femenina icónica de la colección Zara. Notas cálidas de vainilla, flor de peonía y pera dulce. Elegancia sofisticada de larga duración.",
    "images": {
      "primary": "/products/product_135.png",
      "gallery": [
        "/products/product_135.png"
      ]
    },
    "details": {
      "size": [
        "90ml"
      ],
      "volume": "90ml",
      "material": "Vidrio & Esencias Florales"
    },
    "slug": "zara-red-vanilla-eau-de-toilette-ebna-135",
    "price": 32000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo",
      "Dorado"
    ],
    "sizes": [
      "90ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-137",
    "sku": "EB-PERF-02",
    "name": "Zara Red Vanilla Eau de Toilette (Edition)",
    "brand": "Zara",
    "category": "PERFUMERIA",
    "subcategory": "Perfumes Femeninos",
    "priceFCFA": 32000,
    "originalPriceFCFA": 37000,
    "inStock": true,
    "featured": false,
    "description": "Fragancia femenina icónica de la colección Zara. Notas cálidas de vainilla, flor de peonía y pera dulce. Elegancia sofisticada de larga duración.",
    "images": {
      "primary": "/products/product_137.jfif",
      "gallery": [
        "/products/product_137.jfif"
      ]
    },
    "details": {
      "size": [
        "90ml"
      ],
      "volume": "90ml",
      "material": "Vidrio & Esencias Florales"
    },
    "slug": "zara-red-vanilla-eau-de-toilette-edition-ebna-137",
    "price": 32000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Rojo",
      "Dorado"
    ],
    "sizes": [
      "90ml"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-141",
    "sku": "EB-MODH-05",
    "name": "Sudadera Oversized Thermal Lined Kangaroo Hoodie (Edition)",
    "brand": "EBNA Men",
    "category": "MODA_HOMBRE",
    "subcategory": "Sudaderas & Hoodies",
    "priceFCFA": 22000,
    "originalPriceFCFA": 25500,
    "inStock": true,
    "featured": false,
    "description": "Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto y aislamiento térmico suave.",
    "images": {
      "primary": "/products/product_141.jfif",
      "gallery": [
        "/products/product_141.jfif"
      ]
    },
    "details": {
      "size": [
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "material": "Franela Térmica Afelpada"
    },
    "slug": "sudadera-oversized-thermal-lined-kangaroo-hoodie-edition-ebna-141",
    "price": 22000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Crema",
      "Marrón",
      "Verde",
      "Negro"
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
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
const LOCAL_DELETED_KEY = 'ebna_deleted_ids_v4';

export function getDeletedProductIds(): string[] {
  try {
    const saved = localStorage.getItem(LOCAL_DELETED_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function markProductAsDeleted(prodOrId: any): void {
  try {
    const deleted = getDeletedProductIds();
    const toMark: string[] = [];

    if (typeof prodOrId === 'string') {
      toMark.push(prodOrId);
    } else if (prodOrId && typeof prodOrId === 'object') {
      if (prodOrId.id) toMark.push(prodOrId.id);
      if (prodOrId.slug) toMark.push(prodOrId.slug);
      if (prodOrId.sku) toMark.push(prodOrId.sku);
      if (prodOrId.name) {
        const normName = prodOrId.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        toMark.push(normName);
      }
    }

    let modified = false;
    toMark.forEach(str => {
      if (str && !deleted.includes(str)) {
        deleted.push(str);
        modified = true;
      }
    });

    if (modified) {
      localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(deleted));
    }
  } catch (e) {
    console.warn('Error saving deleted product id:', e);
  }
}

export function isProductDeleted(p: Product, deleted: string[]): boolean {
  if (!deleted || deleted.length === 0) return false;
  if (p.id && deleted.includes(p.id)) return true;
  if (p.slug && deleted.includes(p.slug)) return true;
  if (p.sku && deleted.includes(p.sku)) return true;
  if (p.name) {
    const normName = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (deleted.includes(normName)) return true;
  }
  return false;
}

export function demoGetProducts(): Product[] {
  let list: Product[] = [];
  try {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        list = parsed;
      } else {
        list = INITIAL_PRODUCTS;
      }
    } else {
      list = INITIAL_PRODUCTS;
    }
  } catch (e) {
    console.warn('Error loading products from local cache:', e);
    list = INITIAL_PRODUCTS;
  }

  const deleted = getDeletedProductIds();
  if (deleted.length > 0) {
    list = list.filter(p => !isProductDeleted(p, deleted));
  }

  return list;
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
  const id = (productData.id && productData.id.includes('-') && productData.id.length === 36)
    ? productData.id 
    : generateUUID();
  const slug = (productData.name || 'producto').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + id.slice(0, 8);
  
  const rawImages = productData.images as any;
  const primaryImg = (rawImages && typeof rawImages === 'object' && 'primary' in rawImages)
    ? rawImages.primary
    : (Array.isArray(rawImages) && rawImages[0]) || '/icons/ebna-logo.png';
  const galleryImgs = Array.isArray(rawImages) ? rawImages : [primaryImg];

  const priceVal = productData.priceFCFA || productData.price || 15000;

  const newProduct: Product = {
    id,
    sku: productData.sku || `EB-GEN-${Date.now().toString().slice(-4)}`,
    slug,
    name: productData.name || 'Nuevo Producto EBNA',
    brand: productData.brand || 'EBNA Collection',
    category: (productData.category as any) || 'MODA_MUJER',
    subcategory: productData.subcategory || 'Colección General',
    priceFCFA: priceVal,
    price: priceVal,
    description: productData.description || 'Descripción del producto',
    images: {
      primary: primaryImg,
      gallery: galleryImgs,
      0: primaryImg,
    },
    inStock: productData.inStock !== undefined ? productData.inStock : true,
    in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
    is_hidden: productData.is_hidden !== undefined ? productData.is_hidden : false,
    colors: productData.colors || ['Blanco', 'Negro'],
    sizes: productData.sizes || ['S', 'M', 'L'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const updated = [newProduct, ...list];
  demoSaveProducts(updated);
  notifyCatalogChange('add', newProduct);
  return newProduct;
}

export function demoUpdateProduct(id: string, updates: Partial<Product>): Product | null {
  const list = demoGetProducts();
  const index = list.findIndex(p => p.id === id || p.slug === id);
  if (index === -1) return null;

  const updatedProduct = {
    ...list[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  list[index] = updatedProduct;
  demoSaveProducts(list);
  notifyCatalogChange('update', updatedProduct);
  return updatedProduct;
}

export function demoDeleteProduct(id: string): boolean {
  const list = demoGetProducts();
  const target = list.find(p => p.id === id || p.slug === id || p.sku === id);
  if (target) {
    markProductAsDeleted(target);
  } else {
    markProductAsDeleted(id);
  }

  const deleted = getDeletedProductIds();
  const filtered = list.filter(p => !isProductDeleted(p, deleted));
  demoSaveProducts(filtered);
  notifyCatalogChange('delete', { id });
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
