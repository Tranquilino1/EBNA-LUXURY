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
        "Standard"
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
      "Standard"
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
    "id": "ebna-4",
    "sku": "EB-MODM-02",
    "name": "Prenda Exclusiva EBNA Luxury N°4",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": true,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_4.jfif",
      "gallery": [
        "/products/product_4.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-4-ebna-4",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-5",
    "sku": "EB-MODM-03",
    "name": "Prenda Exclusiva EBNA Luxury N°5",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": true,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_5.jfif",
      "gallery": [
        "/products/product_5.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-5-ebna-5",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-6",
    "sku": "EB-MODM-04",
    "name": "Prenda Exclusiva EBNA Luxury N°6",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": true,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_6.jfif",
      "gallery": [
        "/products/product_6.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-6-ebna-6",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-7",
    "sku": "EB-MODM-05",
    "name": "Prenda Exclusiva EBNA Luxury N°7",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": true,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_7.jfif",
      "gallery": [
        "/products/product_7.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-7-ebna-7",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-8",
    "sku": "EB-MODM-06",
    "name": "Prenda Exclusiva EBNA Luxury N°8",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": true,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_8.jfif",
      "gallery": [
        "/products/product_8.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-8-ebna-8",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": true,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-9",
    "sku": "EB-MODM-07",
    "name": "Prenda Exclusiva EBNA Luxury N°9",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_9.jfif",
      "gallery": [
        "/products/product_9.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-9-ebna-9",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-10",
    "sku": "EB-MODM-08",
    "name": "Prenda Exclusiva EBNA Luxury N°10",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_10.jfif",
      "gallery": [
        "/products/product_10.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-10-ebna-10",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-11",
    "sku": "EB-MODM-09",
    "name": "Prenda Exclusiva EBNA Luxury N°11",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_11.jfif",
      "gallery": [
        "/products/product_11.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-11-ebna-11",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-13",
    "sku": "EB-MODM-10",
    "name": "Prenda Exclusiva EBNA Luxury N°13",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_13.jfif",
      "gallery": [
        "/products/product_13.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-13-ebna-13",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-14",
    "sku": "EB-MODM-11",
    "name": "Prenda Exclusiva EBNA Luxury N°14",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_14.jfif",
      "gallery": [
        "/products/product_14.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-14-ebna-14",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-15",
    "sku": "EB-MODM-12",
    "name": "Prenda Exclusiva EBNA Luxury N°15",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_15.jfif",
      "gallery": [
        "/products/product_15.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-15-ebna-15",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-16",
    "sku": "EB-MODM-13",
    "name": "Prenda Exclusiva EBNA Luxury N°16",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_16.jfif",
      "gallery": [
        "/products/product_16.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-16-ebna-16",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-17",
    "sku": "EB-MODM-14",
    "name": "Prenda Exclusiva EBNA Luxury N°17",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_17.jfif",
      "gallery": [
        "/products/product_17.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-17-ebna-17",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-19",
    "sku": "EB-MODM-16",
    "name": "Prenda Exclusiva EBNA Luxury N°19",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_19.jfif",
      "gallery": [
        "/products/product_19.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-19-ebna-19",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-20",
    "sku": "EB-MODM-17",
    "name": "Prenda Exclusiva EBNA Luxury N°20",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_20.jfif",
      "gallery": [
        "/products/product_20.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-20-ebna-20",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
        "Standard"
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
      "Standard"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.680Z"
  },
  {
    "id": "ebna-22",
    "sku": "EB-MODM-18",
    "name": "Prenda Exclusiva EBNA Luxury N°22",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_22.jfif",
      "gallery": [
        "/products/product_22.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-22-ebna-22",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-23",
    "sku": "EB-MODM-19",
    "name": "Prenda Exclusiva EBNA Luxury N°23",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_23.jfif",
      "gallery": [
        "/products/product_23.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-23-ebna-23",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-24",
    "sku": "EB-MODM-20",
    "name": "Prenda Exclusiva EBNA Luxury N°24",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_24.jfif",
      "gallery": [
        "/products/product_24.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-24-ebna-24",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-25",
    "sku": "EB-MODM-21",
    "name": "Prenda Exclusiva EBNA Luxury N°25",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_25.jfif",
      "gallery": [
        "/products/product_25.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-25-ebna-25",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-27",
    "sku": "EB-MODM-23",
    "name": "Prenda Exclusiva EBNA Luxury N°27",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_27.jfif",
      "gallery": [
        "/products/product_27.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-27-ebna-27",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-28",
    "sku": "EB-MODM-24",
    "name": "Prenda Exclusiva EBNA Luxury N°28",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_28.jfif",
      "gallery": [
        "/products/product_28.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-28-ebna-28",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-29",
    "sku": "EB-MODM-25",
    "name": "Prenda Exclusiva EBNA Luxury N°29",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_29.jfif",
      "gallery": [
        "/products/product_29.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-29-ebna-29",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-30",
    "sku": "EB-MODM-26",
    "name": "Prenda Exclusiva EBNA Luxury N°30",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_30.jfif",
      "gallery": [
        "/products/product_30.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-30-ebna-30",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-31",
    "sku": "EB-MODM-27",
    "name": "Prenda Exclusiva EBNA Luxury N°31",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_31.jfif",
      "gallery": [
        "/products/product_31.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-31-ebna-31",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-32",
    "sku": "EB-MODM-28",
    "name": "Prenda Exclusiva EBNA Luxury N°32",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_32.jfif",
      "gallery": [
        "/products/product_32.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-32-ebna-32",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-33",
    "sku": "EB-MODM-29",
    "name": "Prenda Exclusiva EBNA Luxury N°33",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_33.jfif",
      "gallery": [
        "/products/product_33.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-33-ebna-33",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-34",
    "sku": "EB-MODM-30",
    "name": "Prenda Exclusiva EBNA Luxury N°34",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_34.jfif",
      "gallery": [
        "/products/product_34.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-34-ebna-34",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-35",
    "sku": "EB-MODM-31",
    "name": "Prenda Exclusiva EBNA Luxury N°35",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_35.jfif",
      "gallery": [
        "/products/product_35.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-35-ebna-35",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-36",
    "sku": "EB-MODM-32",
    "name": "Prenda Exclusiva EBNA Luxury N°36",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_36.jfif",
      "gallery": [
        "/products/product_36.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-36-ebna-36",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-37",
    "sku": "EB-MODM-33",
    "name": "Prenda Exclusiva EBNA Luxury N°37",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_37.jfif",
      "gallery": [
        "/products/product_37.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-37-ebna-37",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-38",
    "sku": "EB-MODM-34",
    "name": "Prenda Exclusiva EBNA Luxury N°38",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_38.jfif",
      "gallery": [
        "/products/product_38.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-38-ebna-38",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-39",
    "sku": "EB-MODM-35",
    "name": "Prenda Exclusiva EBNA Luxury N°39",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_39.jfif",
      "gallery": [
        "/products/product_39.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-39-ebna-39",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-40",
    "sku": "EB-MODM-36",
    "name": "Prenda Exclusiva EBNA Luxury N°40",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_40.jfif",
      "gallery": [
        "/products/product_40.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-40-ebna-40",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-41",
    "sku": "EB-MODM-37",
    "name": "Prenda Exclusiva EBNA Luxury N°41",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_41.jfif",
      "gallery": [
        "/products/product_41.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-41-ebna-41",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-42",
    "sku": "EB-MODM-38",
    "name": "Prenda Exclusiva EBNA Luxury N°42",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_42.jfif",
      "gallery": [
        "/products/product_42.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-42-ebna-42",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-43",
    "sku": "EB-MODM-39",
    "name": "Prenda Exclusiva EBNA Luxury N°43",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_43.webp",
      "gallery": [
        "/products/product_43.webp"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-43-ebna-43",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-44",
    "sku": "EB-MODM-40",
    "name": "Prenda Exclusiva EBNA Luxury N°44",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_44.jfif",
      "gallery": [
        "/products/product_44.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-44-ebna-44",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-45",
    "sku": "EB-MODM-41",
    "name": "Prenda Exclusiva EBNA Luxury N°45",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_45.jfif",
      "gallery": [
        "/products/product_45.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-45-ebna-45",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-46",
    "sku": "EB-MODM-42",
    "name": "Prenda Exclusiva EBNA Luxury N°46",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_46.jfif",
      "gallery": [
        "/products/product_46.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-46-ebna-46",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-47",
    "sku": "EB-MODM-43",
    "name": "Prenda Exclusiva EBNA Luxury N°47",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_47.jfif",
      "gallery": [
        "/products/product_47.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-47-ebna-47",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
    "id": "ebna-57",
    "sku": "EB-MODM-47",
    "name": "Prenda Exclusiva EBNA Luxury N°57",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_57.jfif",
      "gallery": [
        "/products/product_57.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-57-ebna-57",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-59",
    "sku": "EB-MODM-49",
    "name": "Prenda Exclusiva EBNA Luxury N°59",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_59.jfif",
      "gallery": [
        "/products/product_59.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-59-ebna-59",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-65",
    "sku": "EB-MODM-51",
    "name": "Prenda Exclusiva EBNA Luxury N°65",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_65.jfif",
      "gallery": [
        "/products/product_65.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-65-ebna-65",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-66",
    "sku": "EB-MODM-52",
    "name": "Prenda Exclusiva EBNA Luxury N°66",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_66.jfif",
      "gallery": [
        "/products/product_66.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-66-ebna-66",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-73",
    "sku": "EB-MODM-56",
    "name": "Prenda Exclusiva EBNA Luxury N°73",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_73.jfif",
      "gallery": [
        "/products/product_73.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-73-ebna-73",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-77",
    "sku": "EB-MODM-57",
    "name": "Prenda Exclusiva EBNA Luxury N°77",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_77.jfif",
      "gallery": [
        "/products/product_77.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-77-ebna-77",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
        "Standard"
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
      "Standard"
    ],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-79",
    "sku": "EB-MODM-58",
    "name": "Prenda Exclusiva EBNA Luxury N°79",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_79.jfif",
      "gallery": [
        "/products/product_79.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-79-ebna-79",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
    "id": "ebna-83",
    "sku": "EB-MODM-59",
    "name": "Prenda Exclusiva EBNA Luxury N°83",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_83.jfif",
      "gallery": [
        "/products/product_83.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-83-ebna-83",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-87",
    "sku": "EB-MODM-60",
    "name": "Prenda Exclusiva EBNA Luxury N°87",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_87.jfif",
      "gallery": [
        "/products/product_87.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-87-ebna-87",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-88",
    "sku": "EB-MODM-61",
    "name": "Prenda Exclusiva EBNA Luxury N°88",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_88.jfif",
      "gallery": [
        "/products/product_88.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-88-ebna-88",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-89",
    "sku": "EB-MODM-62",
    "name": "Prenda Exclusiva EBNA Luxury N°89",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_89.jfif",
      "gallery": [
        "/products/product_89.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-89-ebna-89",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-91",
    "sku": "EB-MODM-63",
    "name": "Prenda Exclusiva EBNA Luxury N°91",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_91.webp",
      "gallery": [
        "/products/product_91.webp"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-91-ebna-91",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
    "id": "ebna-98",
    "sku": "EB-MODM-65",
    "name": "Prenda Exclusiva EBNA Luxury N°98",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_98.jfif",
      "gallery": [
        "/products/product_98.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-98-ebna-98",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
        "Standard"
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
      "Standard"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-104",
    "sku": "EB-MODM-66",
    "name": "Prenda Exclusiva EBNA Luxury N°104",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_104.jfif",
      "gallery": [
        "/products/product_104.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-104-ebna-104",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-106",
    "sku": "EB-MODM-67",
    "name": "Prenda Exclusiva EBNA Luxury N°106",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_106.jfif",
      "gallery": [
        "/products/product_106.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-106-ebna-106",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-108",
    "sku": "EB-MODM-68",
    "name": "Prenda Exclusiva EBNA Luxury N°108",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_108.jfif",
      "gallery": [
        "/products/product_108.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-108-ebna-108",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-109",
    "sku": "EB-MODM-69",
    "name": "Prenda Exclusiva EBNA Luxury N°109",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_109.jfif",
      "gallery": [
        "/products/product_109.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-109-ebna-109",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-110",
    "sku": "EB-MODM-70",
    "name": "Prenda Exclusiva EBNA Luxury N°110",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_110.jfif",
      "gallery": [
        "/products/product_110.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-110-ebna-110",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
    "id": "ebna-114",
    "sku": "EB-MODM-73",
    "name": "Prenda Exclusiva EBNA Luxury N°114",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_114.jfif",
      "gallery": [
        "/products/product_114.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-114-ebna-114",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-116",
    "sku": "EB-MODM-75",
    "name": "Prenda Exclusiva EBNA Luxury N°116",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_116.jfif",
      "gallery": [
        "/products/product_116.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-116-ebna-116",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.681Z"
  },
  {
    "id": "ebna-124",
    "sku": "EB-MODM-76",
    "name": "Prenda Exclusiva EBNA Luxury N°124",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_124.jfif",
      "gallery": [
        "/products/product_124.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-124-ebna-124",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-129",
    "sku": "EB-MODM-79",
    "name": "Prenda Exclusiva EBNA Luxury N°129",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_129.jfif",
      "gallery": [
        "/products/product_129.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-129-ebna-129",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-132",
    "sku": "EB-MODM-80",
    "name": "Prenda Exclusiva EBNA Luxury N°132",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_132.jfif",
      "gallery": [
        "/products/product_132.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-132-ebna-132",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-136",
    "sku": "EB-MODM-81",
    "name": "Prenda Exclusiva EBNA Luxury N°136",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_136.jfif",
      "gallery": [
        "/products/product_136.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-136-ebna-136",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
      "size": [],
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
    "sizes": [],
    "created_at": "2026-09-20T20:00:00.000Z",
    "updated_at": "2026-09-21T20:24:00.682Z"
  },
  {
    "id": "ebna-138",
    "sku": "EB-MODM-82",
    "name": "Prenda Exclusiva EBNA Luxury N°138",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_138.jfif",
      "gallery": [
        "/products/product_138.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-138-ebna-138",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-139",
    "sku": "EB-MODM-83",
    "name": "Prenda Exclusiva EBNA Luxury N°139",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_139.jfif",
      "gallery": [
        "/products/product_139.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-139-ebna-139",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
    "id": "ebna-140",
    "sku": "EB-MODM-84",
    "name": "Prenda Exclusiva EBNA Luxury N°140",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_140.jfif",
      "gallery": [
        "/products/product_140.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-140-ebna-140",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
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
  },
  {
    "id": "ebna-142",
    "sku": "EB-MODM-85",
    "name": "Prenda Exclusiva EBNA Luxury N°142",
    "brand": "EBNA Luxury Collection",
    "category": "MODA_MUJER",
    "subcategory": "Ropa Femenina",
    "priceFCFA": 24000,
    "originalPriceFCFA": 27500,
    "inStock": true,
    "featured": false,
    "description": "Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.",
    "images": {
      "primary": "/products/product_142.jfif",
      "gallery": [
        "/products/product_142.jfif"
      ]
    },
    "details": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "material": "Algodón & Poliéster de Alta Calidad"
    },
    "slug": "prenda-exclusiva-ebna-luxury-n-142-ebna-142",
    "price": 24000,
    "in_stock": true,
    "is_hidden": false,
    "is_featured": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa",
      "Beige"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
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
