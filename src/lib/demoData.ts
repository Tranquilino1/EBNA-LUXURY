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
    "slug": "1-pair-men-s-color-blocked-mesh-lace-up-sneakers-daily-casual-fashion-shock-absorbing-sports-shoes-run-small-one-size-suitable-for-jeans-active-wear-ebna-1",
    "name": "1 Pair Men's Color-Blocked Mesh Lace-Up Sneakers, Daily Casual Fashion Shock-Absorbing Sports Shoes (Run Small One Size), Suitable For Jeans Active Wear",
    "category": "CALZADO",
    "description": "1 Pair Men's Color-Blocked Mesh Lace-Up Sneakers, Daily Casual Fashion Shock-Absorbing Sports Shoes (Run Small One Size), Suitable For Jeans Active Wear — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_1.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
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
    "updated_at": "2026-09-20T22:06:31.247Z"
  },
  {
    "id": "ebna-2",
    "slug": "1-pieza-funda-para-pasaporte-de-pu-azul-creativa-con-soporte-para-boletos-estuche-de-pasaporte-de-moda-para-viajes-vacacionales-estuche-protector-para-pasaporte-bolsa-de-almacenamiento-bolsa-de-maquillaje-bol-ebna-2",
    "name": "1 pieza Funda para pasaporte de PU azul creativa con soporte para boletos, estuche de pasaporte de moda para viajes vacacionales, estuche protector para pasaporte, bolsa de almacenamiento, bolsa de maquillaje, bol",
    "category": "COSMETICA",
    "description": "1 pieza Funda para pasaporte de PU azul creativa con soporte para boletos, estuche de pasaporte de moda para viajes vacacionales, estuche protector para pasaporte, bolsa de almacenamiento, bolsa de maquillaje, bol — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_2.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-20T21:06:31.250Z",
    "updated_at": "2026-09-20T22:06:31.250Z"
  },
  {
    "id": "ebna-3",
    "slug": "1-set-fitted-drawstring-hooded-crop-top-flared-pants-sports-suit-ebna-3",
    "name": "1 Set Fitted Drawstring Hooded Crop Top & Flared Pants Sports Suit",
    "category": "MODA",
    "description": "1 Set Fitted Drawstring Hooded Crop Top & Flared Pants Sports Suit — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_3.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rojo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T20:06:31.254Z",
    "updated_at": "2026-09-20T22:06:31.254Z"
  },
  {
    "id": "ebna-4",
    "slug": "producto-exclusivo-ebna-luxury-ebna-4",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_4.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T19:06:31.257Z",
    "updated_at": "2026-09-20T22:06:31.257Z"
  },
  {
    "id": "ebna-5",
    "slug": "producto-exclusivo-ebna-luxury-ebna-5",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_5.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T18:06:31.260Z",
    "updated_at": "2026-09-20T22:06:31.260Z"
  },
  {
    "id": "ebna-6",
    "slug": "producto-exclusivo-ebna-luxury-ebna-6",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_6.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T17:06:31.263Z",
    "updated_at": "2026-09-20T22:06:31.263Z"
  },
  {
    "id": "ebna-7",
    "slug": "producto-exclusivo-ebna-luxury-ebna-7",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_7.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T16:06:31.267Z",
    "updated_at": "2026-09-20T22:06:31.267Z"
  },
  {
    "id": "ebna-8",
    "slug": "producto-exclusivo-ebna-luxury-ebna-8",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_8.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T15:06:31.269Z",
    "updated_at": "2026-09-20T22:06:31.269Z"
  },
  {
    "id": "ebna-9",
    "slug": "producto-exclusivo-ebna-luxury-ebna-9",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_9.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T14:06:31.272Z",
    "updated_at": "2026-09-20T22:06:31.272Z"
  },
  {
    "id": "ebna-10",
    "slug": "producto-exclusivo-ebna-luxury-ebna-10",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_10.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T13:06:31.277Z",
    "updated_at": "2026-09-20T22:06:31.277Z"
  },
  {
    "id": "ebna-11",
    "slug": "producto-exclusivo-ebna-luxury-ebna-11",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_11.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T12:06:31.280Z",
    "updated_at": "2026-09-20T22:06:31.280Z"
  },
  {
    "id": "ebna-12",
    "slug": "12-count-x-palmolive-naturals-herbal-extracts-soap-bars-90g-each-ebna-12",
    "name": "12 Count x Palmolive Naturals Herbal Extracts Soap Bars, 90g Each",
    "category": "JABONES",
    "description": "12 Count x Palmolive Naturals Herbal Extracts Soap Bars, 90g Each — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_12.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-20T11:06:31.283Z",
    "updated_at": "2026-09-20T22:06:31.283Z"
  },
  {
    "id": "ebna-13",
    "slug": "producto-exclusivo-ebna-luxury-ebna-13",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_13.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T10:06:31.285Z",
    "updated_at": "2026-09-20T22:06:31.285Z"
  },
  {
    "id": "ebna-14",
    "slug": "producto-exclusivo-ebna-luxury-ebna-14",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_14.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T09:06:31.288Z",
    "updated_at": "2026-09-20T22:06:31.288Z"
  },
  {
    "id": "ebna-15",
    "slug": "producto-exclusivo-ebna-luxury-ebna-15",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_15.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T08:06:31.292Z",
    "updated_at": "2026-09-20T22:06:31.292Z"
  },
  {
    "id": "ebna-16",
    "slug": "producto-exclusivo-ebna-luxury-ebna-16",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_16.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T07:06:31.295Z",
    "updated_at": "2026-09-20T22:06:31.295Z"
  },
  {
    "id": "ebna-17",
    "slug": "25-streetwear-y2k-boy-outfit-ideas-for-boys-ebna-17",
    "name": "25 Streetwear Y2K Boy Outfit Ideas for Boys",
    "category": "MODA",
    "description": "25 Streetwear Y2K Boy Outfit Ideas for Boys — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_17.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T06:06:31.297Z",
    "updated_at": "2026-09-20T22:06:31.297Z"
  },
  {
    "id": "ebna-18",
    "slug": "2pcs-women-s-maternity-solid-leggings-ebna-18",
    "name": "2pcs Women's Maternity Solid Leggings",
    "category": "MODA",
    "description": "2pcs Women's Maternity Solid Leggings — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_18.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T05:06:31.300Z",
    "updated_at": "2026-09-20T22:06:31.300Z"
  },
  {
    "id": "ebna-19",
    "slug": "producto-exclusivo-ebna-luxury-ebna-19",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_19.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T04:06:31.302Z",
    "updated_at": "2026-09-20T22:06:31.302Z"
  },
  {
    "id": "ebna-20",
    "slug": "producto-exclusivo-ebna-luxury-ebna-20",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_20.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T03:06:31.306Z",
    "updated_at": "2026-09-20T22:06:31.306Z"
  },
  {
    "id": "ebna-21",
    "slug": "3-tv-ebna-21",
    "name": "3개 남성용 클래식 블랙 사각 안경, 투명 렌즈, 컴퓨터, tv, 게임, 스마트폰에 적합",
    "category": "MODA",
    "description": "3개 남성용 클래식 블랙 사각 안경, 투명 렌즈, 컴퓨터, tv, 게임, 스마트폰에 적합 — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_21.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T02:06:31.310Z",
    "updated_at": "2026-09-20T22:06:31.310Z"
  },
  {
    "id": "ebna-22",
    "slug": "producto-exclusivo-ebna-luxury-ebna-22",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_22.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T01:06:31.312Z",
    "updated_at": "2026-09-20T22:06:31.312Z"
  },
  {
    "id": "ebna-23",
    "slug": "producto-exclusivo-ebna-luxury-ebna-23",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_23.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-20T00:06:31.315Z",
    "updated_at": "2026-09-20T22:06:31.315Z"
  },
  {
    "id": "ebna-24",
    "slug": "producto-exclusivo-ebna-luxury-ebna-24",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_24.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T23:06:31.318Z",
    "updated_at": "2026-09-20T22:06:31.318Z"
  },
  {
    "id": "ebna-25",
    "slug": "producto-exclusivo-ebna-luxury-ebna-25",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_25.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T22:06:31.321Z",
    "updated_at": "2026-09-20T22:06:31.321Z"
  },
  {
    "id": "ebna-26",
    "slug": "6-ways-to-style-new-in-zara-comment-links-to-shop-the-looks-in-your-dms-you-can-also-find-the-links-in-my-bio-fashionbloggers-fashioninfluencerstyle-zaranewin-zaradeutschland-highstreetfashion-ebna-26",
    "name": "6 Ways to Style New In Zara😍_Comment “LINKS” to shop the looks in your DMs✨__You can also find the links in my bio🏹__#fashionbloggers #fashioninfluencerstyle #zaranewin #zaradeutschland #highstreetfashion",
    "category": "MODA",
    "description": "6 Ways to Style New In Zara😍_Comment “LINKS” to shop the looks in your DMs✨__You can also find the links in my bio🏹__#fashionbloggers #fashioninfluencerstyle #zaranewin #zaradeutschland #highstreetfashion — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_26.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T21:06:31.325Z",
    "updated_at": "2026-09-20T22:06:31.325Z"
  },
  {
    "id": "ebna-27",
    "slug": "producto-exclusivo-ebna-luxury-ebna-27",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_27.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T20:06:31.328Z",
    "updated_at": "2026-09-20T22:06:31.328Z"
  },
  {
    "id": "ebna-28",
    "slug": "producto-exclusivo-ebna-luxury-ebna-28",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_28.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T19:06:31.331Z",
    "updated_at": "2026-09-20T22:06:31.331Z"
  },
  {
    "id": "ebna-29",
    "slug": "producto-exclusivo-ebna-luxury-ebna-29",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_29.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T18:06:31.334Z",
    "updated_at": "2026-09-20T22:06:31.334Z"
  },
  {
    "id": "ebna-30",
    "slug": "producto-exclusivo-ebna-luxury-ebna-30",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_30.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T17:06:31.337Z",
    "updated_at": "2026-09-20T22:06:31.337Z"
  },
  {
    "id": "ebna-31",
    "slug": "producto-exclusivo-ebna-luxury-ebna-31",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_31.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T16:06:31.340Z",
    "updated_at": "2026-09-20T22:06:31.340Z"
  },
  {
    "id": "ebna-32",
    "slug": "producto-exclusivo-ebna-luxury-ebna-32",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_32.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T15:06:31.343Z",
    "updated_at": "2026-09-20T22:06:31.343Z"
  },
  {
    "id": "ebna-33",
    "slug": "producto-exclusivo-ebna-luxury-ebna-33",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_33.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T14:06:31.346Z",
    "updated_at": "2026-09-20T22:06:31.346Z"
  },
  {
    "id": "ebna-34",
    "slug": "producto-exclusivo-ebna-luxury-ebna-34",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_34.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T13:06:31.348Z",
    "updated_at": "2026-09-20T22:06:31.348Z"
  },
  {
    "id": "ebna-35",
    "slug": "producto-exclusivo-ebna-luxury-ebna-35",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_35.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T12:06:31.350Z",
    "updated_at": "2026-09-20T22:06:31.350Z"
  },
  {
    "id": "ebna-36",
    "slug": "producto-exclusivo-ebna-luxury-ebna-36",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_36.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T11:06:31.353Z",
    "updated_at": "2026-09-20T22:06:31.353Z"
  },
  {
    "id": "ebna-37",
    "slug": "producto-exclusivo-ebna-luxury-ebna-37",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_37.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T10:06:31.356Z",
    "updated_at": "2026-09-20T22:06:31.356Z"
  },
  {
    "id": "ebna-38",
    "slug": "producto-exclusivo-ebna-luxury-ebna-38",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_38.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T09:06:31.359Z",
    "updated_at": "2026-09-20T22:06:31.359Z"
  },
  {
    "id": "ebna-39",
    "slug": "producto-exclusivo-ebna-luxury-ebna-39",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_39.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T08:06:31.362Z",
    "updated_at": "2026-09-20T22:06:31.362Z"
  },
  {
    "id": "ebna-40",
    "slug": "producto-exclusivo-ebna-luxury-ebna-40",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_40.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T07:06:31.364Z",
    "updated_at": "2026-09-20T22:06:31.364Z"
  },
  {
    "id": "ebna-41",
    "slug": "producto-exclusivo-ebna-luxury-ebna-41",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_41.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T06:06:31.368Z",
    "updated_at": "2026-09-20T22:06:31.368Z"
  },
  {
    "id": "ebna-42",
    "slug": "producto-exclusivo-ebna-luxury-ebna-42",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_42.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T05:06:31.370Z",
    "updated_at": "2026-09-20T22:06:31.370Z"
  },
  {
    "id": "ebna-43",
    "slug": "producto-exclusivo-ebna-luxury-ebna-43",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_43.webp"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T04:06:31.374Z",
    "updated_at": "2026-09-20T22:06:31.374Z"
  },
  {
    "id": "ebna-44",
    "slug": "producto-exclusivo-ebna-luxury-ebna-44",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_44.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T03:06:31.377Z",
    "updated_at": "2026-09-20T22:06:31.377Z"
  },
  {
    "id": "ebna-45",
    "slug": "producto-exclusivo-ebna-luxury-ebna-45",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_45.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T02:06:31.380Z",
    "updated_at": "2026-09-20T22:06:31.380Z"
  },
  {
    "id": "ebna-46",
    "slug": "producto-exclusivo-ebna-luxury-ebna-46",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_46.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T01:06:31.382Z",
    "updated_at": "2026-09-20T22:06:31.382Z"
  },
  {
    "id": "ebna-47",
    "slug": "producto-exclusivo-ebna-luxury-ebna-47",
    "name": "Producto Exclusivo EBNA Luxury",
    "category": "MODA",
    "description": "Producto Exclusivo EBNA Luxury — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_47.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-19T00:06:31.384Z",
    "updated_at": "2026-09-20T22:06:31.384Z"
  },
  {
    "id": "ebna-48",
    "slug": "amazon-com-ollio-women-s-ballet-shoe-floral-lace-breathable-flat-flats-ebna-48",
    "name": "Amazon_com _ Ollio Women's Ballet Shoe Floral Lace Breathable Flat _ Flats",
    "category": "CALZADO",
    "description": "Amazon_com _ Ollio Women's Ballet Shoe Floral Lace Breathable Flat _ Flats — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_48.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
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
    "updated_at": "2026-09-20T22:06:31.387Z"
  },
  {
    "id": "ebna-49",
    "slug": "avena-instituto-espanol-ebna-49",
    "name": "Avena instituto español",
    "category": "COSMETICA",
    "description": "Avena instituto español — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_49.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-18T22:06:31.390Z",
    "updated_at": "2026-09-20T22:06:31.390Z"
  },
  {
    "id": "ebna-50",
    "slug": "beautiful-matte-liquid-lipstick-ebna-50",
    "name": "Beautiful Matte Liquid Lipstick",
    "category": "COSMETICA",
    "description": "Beautiful Matte Liquid Lipstick — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_50.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-18T21:06:31.393Z",
    "updated_at": "2026-09-20T22:06:31.393Z"
  },
  {
    "id": "ebna-51",
    "slug": "beauty-products-brunch-beauty-ebna-51",
    "name": "Beauty Products _ Brunch Beauty",
    "category": "COSMETICA",
    "description": "Beauty Products _ Brunch Beauty — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_51.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-18T20:06:31.396Z",
    "updated_at": "2026-09-20T22:06:31.396Z"
  },
  {
    "id": "ebna-52",
    "slug": "biosulfur-grisi-sulfur-soap-acne-excess-oil-care-ebna-52",
    "name": "Biosulfur Grisi Sulfur Soap _ Acne & Excess Oil Care 🫧✨",
    "category": "JABONES",
    "description": "Biosulfur Grisi Sulfur Soap _ Acne & Excess Oil Care 🫧✨ — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_52.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Gris",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-18T19:06:31.399Z",
    "updated_at": "2026-09-20T22:06:31.399Z"
  },
  {
    "id": "ebna-53",
    "slug": "black-white-gingham-smocked-tie-strap-midi-dress-ebna-53",
    "name": "Black & White Gingham Smocked Tie-Strap Midi Dress",
    "category": "VESTIDOS",
    "description": "Black & White Gingham Smocked Tie-Strap Midi Dress — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono Negro.",
    "price": 20000,
    "images": [
      "/products/product_53.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T18:06:31.406Z",
    "updated_at": "2026-09-20T22:06:31.406Z"
  },
  {
    "id": "ebna-54",
    "slug": "bodycon-high-waisted-backless-buttoned-pockets-split-joint-halter-neck-mini-dresses-pink-l-ebna-54",
    "name": "Bodycon High Waisted Backless Buttoned Pockets Split-Joint Halter-Neck Mini Dresses PINK-L",
    "category": "VESTIDOS",
    "description": "Bodycon High Waisted Backless Buttoned Pockets Split-Joint Halter-Neck Mini Dresses PINK-L — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono Rosa.",
    "price": 20000,
    "images": [
      "/products/product_54.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T17:06:31.409Z",
    "updated_at": "2026-09-20T22:06:31.409Z"
  },
  {
    "id": "ebna-55",
    "slug": "carowhite-soap-180g-ebna-55",
    "name": "CaroWhite Soap 180g",
    "category": "JABONES",
    "description": "CaroWhite Soap 180g — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_55.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-18T16:06:31.412Z",
    "updated_at": "2026-09-20T22:06:31.412Z"
  },
  {
    "id": "ebna-56",
    "slug": "cerelina-white-jersey-maxi-skirt-ebna-56",
    "name": "Cerelina White Jersey Maxi Skirt",
    "category": "VESTIDOS",
    "description": "Cerelina White Jersey Maxi Skirt — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono Blanco.",
    "price": 20000,
    "images": [
      "/products/product_56.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T15:06:31.414Z",
    "updated_at": "2026-09-20T22:06:31.414Z"
  },
  {
    "id": "ebna-57",
    "slug": "convocation-look-ebna-57",
    "name": "Convocation look",
    "category": "MODA",
    "description": "Convocation look — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_57.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T14:06:31.417Z",
    "updated_at": "2026-09-20T22:06:31.417Z"
  },
  {
    "id": "ebna-58",
    "slug": "copy-zara-ebna-58",
    "name": "COPY - Zara",
    "category": "MODA",
    "description": "COPY - Zara — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_58.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T13:06:31.420Z",
    "updated_at": "2026-09-20T22:06:31.420Z"
  },
  {
    "id": "ebna-59",
    "slug": "cozy-winter-cottage-living-warm-inviting-decor-ebna-59",
    "name": "Cozy Winter Cottage Living_ Warm, Inviting Decor",
    "category": "MODA",
    "description": "Cozy Winter Cottage Living_ Warm, Inviting Decor — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_59.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T12:06:31.423Z",
    "updated_at": "2026-09-20T22:06:31.423Z"
  },
  {
    "id": "ebna-60",
    "slug": "dresses-for-women-zara-united-states-ebna-60",
    "name": "Dresses for Women _ ZARA United States",
    "category": "VESTIDOS",
    "description": "Dresses for Women _ ZARA United States — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono Azul.",
    "price": 20000,
    "images": [
      "/products/product_60.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T11:06:31.426Z",
    "updated_at": "2026-09-20T22:06:31.426Z"
  },
  {
    "id": "ebna-61",
    "slug": "duxal-shoes-iki-bantl-bordo-rugan-kad-n-topuklu-fiyat-yorumlar-trendyol-ebna-61",
    "name": "DUXAL SHOES İki Bantlı Bordo Rugan Kadın Topuklu Fiyatı, Yorumları - Trendyol",
    "category": "CALZADO",
    "description": "DUXAL SHOES İki Bantlı Bordo Rugan Kadın Topuklu Fiyatı, Yorumları - Trendyol — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_61.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rojo",
      "Blanco",
      "Negro"
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
    "updated_at": "2026-09-20T22:06:31.429Z"
  },
  {
    "id": "ebna-62",
    "slug": "esfoliante-labial-de-coco-30g-removendo-as-peles-mortas-iluminando-a-cor-dos-labios-24h-de-hidratacao-profunda-e-nutricao-da-pele-dos-labios-ebna-62",
    "name": "Esfoliante Labial de Coco 30g, Removendo as Peles Mortas, Iluminando a Cor dos Lábios, 24H de Hidratação Profunda e Nutrição da Pele dos Lábios",
    "category": "POMADAS",
    "description": "Esfoliante Labial de Coco 30g, Removendo as Peles Mortas, Iluminando a Cor dos Lábios, 24H de Hidratação Profunda e Nutrição da Pele dos Lábios — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_62.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-18T09:06:31.432Z",
    "updated_at": "2026-09-20T22:06:31.432Z"
  },
  {
    "id": "ebna-63",
    "slug": "esfoliante-labial-nutritivo-lip-please-8g-ebna-63",
    "name": "Esfoliante Labial Nutritivo Lip, Please! 8g",
    "category": "POMADAS",
    "description": "Esfoliante Labial Nutritivo Lip, Please! 8g — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_63.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-18T08:06:31.434Z",
    "updated_at": "2026-09-20T22:06:31.434Z"
  },
  {
    "id": "ebna-64",
    "slug": "exfoliante-de-labios-de-frambuesa-30g-elimina-piel-muerta-ilumina-el-color-de-los-labios-hidratacion-profunda-24-horas-nutre-la-piel-de-los-labios-ebna-64",
    "name": "Exfoliante de labios de frambuesa 30g, elimina piel muerta, ilumina el color de los labios, hidratación profunda 24 horas, nutre la piel de los labios_",
    "category": "POMADAS",
    "description": "Exfoliante de labios de frambuesa 30g, elimina piel muerta, ilumina el color de los labios, hidratación profunda 24 horas, nutre la piel de los labios_ — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_64.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-18T07:06:31.437Z",
    "updated_at": "2026-09-20T22:06:31.437Z"
  },
  {
    "id": "ebna-65",
    "slug": "floral-print-round-neck-tee-ebna-65",
    "name": "Floral print round neck tee🩷🤍",
    "category": "MODA",
    "description": "Floral print round neck tee🩷🤍 — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_65.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T06:06:31.439Z",
    "updated_at": "2026-09-20T22:06:31.439Z"
  },
  {
    "id": "ebna-66",
    "slug": "full-android-medina-ebna-66",
    "name": "Full Android Medina",
    "category": "MODA",
    "description": "Full Android Medina — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_66.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T05:06:31.442Z",
    "updated_at": "2026-09-20T22:06:31.443Z"
  },
  {
    "id": "ebna-67",
    "slug": "fwh-calca-flare-feminina-casual-minimalista-com-efeito-levanta-bumbum-estilo-street-elegante-vintage-e-emagrecedor-luxo-discreto-alonga-as-pernas-cintura-alta-classica-versatil-design-europeu-que-modela-a-ci-ebna-67",
    "name": "FWH Calça Flare Feminina Casual Minimalista com Efeito Levanta Bumbum, Estilo Street Elegante, Vintage e Emagrecedor, Luxo Discreto, Alonga as Pernas, Cintura Alta Clássica Versátil, Design Europeu que Modela a Ci",
    "category": "MODA",
    "description": "FWH Calça Flare Feminina Casual Minimalista com Efeito Levanta Bumbum, Estilo Street Elegante, Vintage e Emagrecedor, Luxo Discreto, Alonga as Pernas, Cintura Alta Clássica Versátil, Design Europeu que Modela a Ci — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_67.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T04:06:31.446Z",
    "updated_at": "2026-09-20T22:06:31.446Z"
  },
  {
    "id": "ebna-68",
    "slug": "gel-de-ducha-lactoadvance-instituto-espanol-1250ml-ebna-68",
    "name": "Gel De Ducha Lactoadvance Instituto Español 1250Ml",
    "category": "POMADAS",
    "description": "Gel De Ducha Lactoadvance Instituto Español 1250Ml — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_68.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-18T03:06:31.450Z",
    "updated_at": "2026-09-20T22:06:31.450Z"
  },
  {
    "id": "ebna-69",
    "slug": "grunge-aesthetic-jeans-skeater-girl-wide-jeans-with-cat-cat-print-jeans-cat-jeans-kitty-jeans-ebna-69",
    "name": "Grunge aesthetic jeans, skeater girl wide jeans with cat , cat print jeans, cat jeans, kitty jeans",
    "category": "MODA",
    "description": "Grunge aesthetic jeans, skeater girl wide jeans with cat , cat print jeans, cat jeans, kitty jeans — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_69.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T02:06:31.453Z",
    "updated_at": "2026-09-20T22:06:31.453Z"
  },
  {
    "id": "ebna-70",
    "slug": "hoodie-unisex-biif-ind-tebal-hoodie-cowo-cewe-ebna-70",
    "name": "Hoodie Unisex Biif_Ind_Tebal_Hoodie Cowo Cewe",
    "category": "MODA",
    "description": "Hoodie Unisex Biif_Ind_Tebal_Hoodie Cowo Cewe — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_70.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T01:06:31.456Z",
    "updated_at": "2026-09-20T22:06:31.456Z"
  },
  {
    "id": "ebna-71",
    "slug": "hoodies-with-trousers-ebna-71",
    "name": "Hoodies With Trousers",
    "category": "MODA",
    "description": "Hoodies With Trousers — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_71.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-18T00:06:31.459Z",
    "updated_at": "2026-09-20T22:06:31.459Z"
  },
  {
    "id": "ebna-72",
    "slug": "instituto-espanol-pieles-atopicas-champu-suave-300ml-ebna-72",
    "name": "INSTITUTO ESPAÑOL pieles atopicas champu suave 300ml",
    "category": "COSMETICA",
    "description": "INSTITUTO ESPAÑOL pieles atopicas champu suave 300ml — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_72.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-17T23:06:31.462Z",
    "updated_at": "2026-09-20T22:06:31.462Z"
  },
  {
    "id": "ebna-73",
    "slug": "kit-body-feminino-bori-regata-bory-collant-versatil-casual-costas-fechada-segunda-pele-basico-estiloso-varias-cores-ebna-73",
    "name": "Kit Body Feminino Bori Regata Bory Collant Versátil Casual Costas Fechada Segunda Pele Básico Estiloso Várias Cores",
    "category": "MODA",
    "description": "Kit Body Feminino Bori Regata Bory Collant Versátil Casual Costas Fechada Segunda Pele Básico Estiloso Várias Cores — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_73.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T22:06:31.465Z",
    "updated_at": "2026-09-20T22:06:31.465Z"
  },
  {
    "id": "ebna-74",
    "slug": "kojic-san-skin-lightening-acid-soap-bar-ebna-74",
    "name": "Kojic San skin lightening acid soap bar",
    "category": "JABONES",
    "description": "Kojic San skin lightening acid soap bar — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_74.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-17T21:06:31.467Z",
    "updated_at": "2026-09-20T22:06:31.468Z"
  },
  {
    "id": "ebna-75",
    "slug": "kraasa-chelsea-boots-ebna-75",
    "name": "Kraasa Chelsea Boots",
    "category": "CALZADO",
    "description": "Kraasa Chelsea Boots — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_75.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
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
    "updated_at": "2026-09-20T22:06:31.470Z"
  },
  {
    "id": "ebna-76",
    "slug": "locion-hidratante-avena-instituto-espanol-950ml-ebna-76",
    "name": "Loción Hidratante Avena Instituto Español 950Ml",
    "category": "COSMETICA",
    "description": "Loción Hidratante Avena Instituto Español 950Ml — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_76.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-17T19:06:31.472Z",
    "updated_at": "2026-09-20T22:06:31.472Z"
  },
  {
    "id": "ebna-77",
    "slug": "locion-hidratante-urea-instituto-espanol-500-ml-drogueria-paysandu-ebna-77",
    "name": "Loción Hidratante Urea INSTITUTO ESPAÑOL 500 mL — Droguería Paysandú",
    "category": "COSMETICA",
    "description": "Loción Hidratante Urea INSTITUTO ESPAÑOL 500 mL — Droguería Paysandú — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_77.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-17T18:06:31.476Z",
    "updated_at": "2026-09-20T22:06:31.476Z"
  },
  {
    "id": "ebna-78",
    "slug": "long-bonnet-adjustable-long-hair-bonnet-for-braids-satin-bonnets-for-women-soft-silk-large-bonnets-for-sleeping-elastic-hair-bonnet-with-tie-band-ebna-78",
    "name": "Long Bonnet,Adjustable Long Hair Bonnet for Braids Satin Bonnets for Women _ Soft Silk Large Bonnets for Sleeping,Elastic Hair Bonnet with Tie Band,",
    "category": "ACCESORIOS",
    "description": "Long Bonnet,Adjustable Long Hair Bonnet for Braids Satin Bonnets for Women _ Soft Silk Large Bonnets for Sleeping,Elastic Hair Bonnet with Tie Band, — Accesorio de moda imprescindible con acabados de alta calidad. Combina funcionalidad premium y estética de lujo.",
    "price": 10000,
    "images": [
      "/products/product_78.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "Estándar",
      "Ajustable"
    ],
    "created_at": "2026-09-17T17:06:31.479Z",
    "updated_at": "2026-09-20T22:06:31.479Z"
  },
  {
    "id": "ebna-79",
    "slug": "manfinity-dauomo-moletons-masculinos-plus-size-ebna-79",
    "name": "Manfinity Dauomo Moletons masculinos plus size",
    "category": "MODA",
    "description": "Manfinity Dauomo Moletons masculinos plus size — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_79.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T16:06:31.482Z",
    "updated_at": "2026-09-20T22:06:31.482Z"
  },
  {
    "id": "ebna-80",
    "slug": "mela-creme-de-jour-unifiante-anti-taches-spf50-topicrem-tube-de-40ml-ebna-80",
    "name": "Mela crème de jour unifiante anti-taches SPF50+ Topicrem - tube de 40ml",
    "category": "POMADAS",
    "description": "Mela crème de jour unifiante anti-taches SPF50+ Topicrem - tube de 40ml — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_80.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-17T15:06:31.489Z",
    "updated_at": "2026-09-20T22:06:31.489Z"
  },
  {
    "id": "ebna-81",
    "slug": "men-black-and-white-invisible-original-ebna-81",
    "name": "Men Black And White Invisible Original",
    "category": "MODA",
    "description": "Men Black And White Invisible Original — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_81.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T14:06:31.492Z",
    "updated_at": "2026-09-20T22:06:31.492Z"
  },
  {
    "id": "ebna-82",
    "slug": "men-s-solid-color-drawstring-waist-simple-fashionable-casual-shorts-ebna-82",
    "name": "Men's Solid Color Drawstring Waist Simple Fashionable Casual Shorts",
    "category": "MODA",
    "description": "Men's Solid Color Drawstring Waist Simple Fashionable Casual Shorts — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_82.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T13:06:31.496Z",
    "updated_at": "2026-09-20T22:06:31.496Z"
  },
  {
    "id": "ebna-83",
    "slug": "miss-selfridge-clothing-shoes-accessories-asos-ebna-83",
    "name": "Miss Selfridge Clothing, Shoes & Accessories _ ASOS",
    "category": "CALZADO",
    "description": "Miss Selfridge Clothing, Shoes & Accessories _ ASOS — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_83.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
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
    "updated_at": "2026-09-20T22:06:31.498Z"
  },
  {
    "id": "ebna-84",
    "slug": "navy-blue-stripe-suit-men-s-formal-wedding-party-wear-ebna-84",
    "name": "Navy Blue Stripe Suit_ Men's Formal Wedding Party Wear",
    "category": "MODA",
    "description": "Navy Blue Stripe Suit_ Men's Formal Wedding Party Wear — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_84.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T11:06:31.501Z",
    "updated_at": "2026-09-20T22:06:31.501Z"
  },
  {
    "id": "ebna-85",
    "slug": "nike-dunk-sb-low-wine-red-cut-ebna-85",
    "name": "Nike Dunk SB Low Wine Red-Cut",
    "category": "CALZADO",
    "description": "Nike Dunk SB Low Wine Red-Cut — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_85.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rojo",
      "Blanco",
      "Negro"
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
    "updated_at": "2026-09-20T22:06:31.504Z"
  },
  {
    "id": "ebna-86",
    "slug": "oceaura-lemon-turmeric-acid-soap-body-deep-cleansing-moisturizing-refreshing-oil-ebna-86",
    "name": "Oceaura Lemon Turmeric Acid Soap Body Deep Cleansing Moisturizing Refreshing Oil",
    "category": "JABONES",
    "description": "Oceaura Lemon Turmeric Acid Soap Body Deep Cleansing Moisturizing Refreshing Oil — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_86.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Amarillo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-17T09:06:31.507Z",
    "updated_at": "2026-09-20T22:06:31.507Z"
  },
  {
    "id": "ebna-87",
    "slug": "outfit-idea-ebna-87",
    "name": "Outfit idea",
    "category": "MODA",
    "description": "Outfit idea — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_87.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T08:06:31.510Z",
    "updated_at": "2026-09-20T22:06:31.510Z"
  },
  {
    "id": "ebna-88",
    "slug": "ovate-unisex-bath-and-body-ebna-88",
    "name": "Ovate Unisex Bath and body",
    "category": "MODA",
    "description": "Ovate Unisex Bath and body — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_88.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T07:06:31.513Z",
    "updated_at": "2026-09-20T22:06:31.513Z"
  },
  {
    "id": "ebna-89",
    "slug": "oversized-boston-tee-fit-inspo-ebna-89",
    "name": "Oversized Boston Tee Fit Inspo✨",
    "category": "MODA",
    "description": "Oversized Boston Tee Fit Inspo✨ — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_89.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-17T06:06:31.516Z",
    "updated_at": "2026-09-20T22:06:31.516Z"
  },
  {
    "id": "ebna-90",
    "slug": "palmolive-gul-kokulu-sabun-ebna-90",
    "name": "Palmolive Gül Kokulu Sabun",
    "category": "JABONES",
    "description": "Palmolive Gül Kokulu Sabun — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_90.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rosa",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-17T05:06:31.518Z",
    "updated_at": "2026-09-20T22:06:31.518Z"
  },
  {
    "id": "ebna-91",
    "slug": "palmolive-naturals-moisture-care-soap-ebna-91",
    "name": "Palmolive Naturals Moisture Care Soap",
    "category": "JABONES",
    "description": "Palmolive Naturals Moisture Care Soap — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_91.webp"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-17T04:06:31.520Z",
    "updated_at": "2026-09-20T22:06:31.520Z"
  },
  {
    "id": "ebna-92",
    "slug": "palmolive-sabun-ebna-92",
    "name": "Palmolive sabun",
    "category": "JABONES",
    "description": "Palmolive sabun — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_92.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-17T03:06:31.523Z",
    "updated_at": "2026-09-20T22:06:31.523Z"
  },
  {
    "id": "ebna-93",
    "slug": "palmolive-turuncu-sabun-ebna-93",
    "name": "Palmolive turuncu sabun",
    "category": "JABONES",
    "description": "Palmolive turuncu sabun — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_93.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Amarillo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-17T02:06:31.526Z",
    "updated_at": "2026-09-20T22:06:31.526Z"
  },
  {
    "id": "ebna-94",
    "slug": "peony-pivoine-flora-shower-gel-flowery-green-peonies-ebna-94",
    "name": "Peony Pivoine Flora Shower Gel #flowery#green#peonies",
    "category": "PERFUMES",
    "description": "Peony Pivoine Flora Shower Gel #flowery#green#peonies — Fragancia exclusiva de alta gama. Notas olfativas elegantes y duraderas creadas para destacar sofisticación y presencia distintiva en cualquier ocasión.",
    "price": 25000,
    "images": [
      "/products/product_94.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Verde",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-17T01:06:31.529Z",
    "updated_at": "2026-09-20T22:06:31.529Z"
  },
  {
    "id": "ebna-95",
    "slug": "premium-handmade-crystal-egg-soap-natural-ingredients-and-essential-oils-cute-egg-like-beauty-crystal-for-soft-clean-skin-handcrafted-egg-shaped-body-cleanser-scrub-ebna-95",
    "name": "Premium Handmade Crystal Egg Soap - Natural Ingredients and Essential Oils Cute Egg Like Beauty Crystal for Soft, Clean Skin - Handcrafted Egg-Shaped Body Cleanser Scrub",
    "category": "JABONES",
    "description": "Premium Handmade Crystal Egg Soap - Natural Ingredients and Essential Oils Cute Egg Like Beauty Crystal for Soft, Clean Skin - Handcrafted Egg-Shaped Body Cleanser Scrub — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_95.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rojo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-17T00:06:31.532Z",
    "updated_at": "2026-09-20T22:06:31.532Z"
  },
  {
    "id": "ebna-96",
    "slug": "premium-limited-edition-original-crocs-clogs-and-croc-slippers-in-harare-zimbabwe-0776428482-ebna-96",
    "name": "Premium Limited Edition Original Crocs, Clogs And Croc Slippers In Harare Zimbabwe 0776428482",
    "category": "CALZADO",
    "description": "Premium Limited Edition Original Crocs, Clogs And Croc Slippers In Harare Zimbabwe 0776428482 — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_96.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
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
    "updated_at": "2026-09-20T22:06:31.534Z"
  },
  {
    "id": "ebna-97",
    "slug": "premium-streetwear-tracksuit-set-ebna-97",
    "name": "Premium streetwear tracksuit set",
    "category": "MODA",
    "description": "Premium streetwear tracksuit set — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_97.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T22:06:31.537Z",
    "updated_at": "2026-09-20T22:06:31.537Z"
  },
  {
    "id": "ebna-98",
    "slug": "premium-women-s-pants-trousers-shop-ermanaric-ebna-98",
    "name": "Premium Women's Pants & Trousers _ Shop Ermanaric",
    "category": "MODA",
    "description": "Premium Women's Pants & Trousers _ Shop Ermanaric — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_98.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T21:06:31.540Z",
    "updated_at": "2026-09-20T22:06:31.540Z"
  },
  {
    "id": "ebna-99",
    "slug": "pu-passport-holder-map-pattern-ticket-passport-covers-travel-passport-protective-cover-id-credit-ebna-99",
    "name": "PU Passport Holder Map Pattern Ticket Passport Covers Travel Passport Protective Cover ID Credit",
    "category": "ACCESORIOS",
    "description": "PU Passport Holder Map Pattern Ticket Passport Covers Travel Passport Protective Cover ID Credit — Accesorio de moda imprescindible con acabados de alta calidad. Combina funcionalidad premium y estética de lujo.",
    "price": 10000,
    "images": [
      "/products/product_99.webp"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rojo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "Estándar",
      "Ajustable"
    ],
    "created_at": "2026-09-16T20:06:31.544Z",
    "updated_at": "2026-09-20T22:06:31.544Z"
  },
  {
    "id": "ebna-100",
    "slug": "puma-speedcat-og-ebna-100",
    "name": "Puma Speedcat OG",
    "category": "CALZADO",
    "description": "Puma Speedcat OG — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_100.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
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
    "updated_at": "2026-09-20T22:06:31.547Z"
  },
  {
    "id": "ebna-101",
    "slug": "ra-cosmetics-100-natural-turmeric-soap-bar-5oz-ebna-101",
    "name": "RA COSMETICS 100% Natural Turmeric Soap Bar (5oz)",
    "category": "JABONES",
    "description": "RA COSMETICS 100% Natural Turmeric Soap Bar (5oz) — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_101.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Amarillo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-16T18:06:31.549Z",
    "updated_at": "2026-09-20T22:06:31.549Z"
  },
  {
    "id": "ebna-102",
    "slug": "sabonete-artesanal-de-curcuma-sabonete-de-limpeza-facial-e-corporal-remove-oleo-e-sujeira-ebna-102",
    "name": "Sabonete Artesanal de Cúrcuma, Sabonete de Limpeza Facial e Corporal, Remove Óleo e Sujeira",
    "category": "JABONES",
    "description": "Sabonete Artesanal de Cúrcuma, Sabonete de Limpeza Facial e Corporal, Remove Óleo e Sujeira — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_102.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Amarillo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-16T17:06:31.552Z",
    "updated_at": "2026-09-20T22:06:31.552Z"
  },
  {
    "id": "ebna-103",
    "slug": "sabonete-mel-aveia-100g-ebna-103",
    "name": "Sabonete Mel & Aveia – 100g",
    "category": "JABONES",
    "description": "Sabonete Mel & Aveia – 100g — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_103.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-16T16:06:31.554Z",
    "updated_at": "2026-09-20T22:06:31.554Z"
  },
  {
    "id": "ebna-104",
    "slug": "sandals-and-slippers-suitable-for-men-and-women-wanita-ebna-104",
    "name": "Sandals and Slippers Suitable for Men and Women Wanita",
    "category": "CALZADO",
    "description": "Sandals and Slippers Suitable for Men and Women Wanita — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_104.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
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
    "updated_at": "2026-09-20T22:06:31.558Z"
  },
  {
    "id": "ebna-105",
    "slug": "savon-orange-collagene-galong-ebna-105",
    "name": "Savon Orange Collagene - GALONG",
    "category": "JABONES",
    "description": "Savon Orange Collagene - GALONG — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_105.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-16T14:06:31.566Z",
    "updated_at": "2026-09-20T22:06:31.566Z"
  },
  {
    "id": "ebna-106",
    "slug": "shein-1-ebna-106",
    "name": "Shein (1)",
    "category": "MODA",
    "description": "Shein (1) — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_106.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T13:06:31.568Z",
    "updated_at": "2026-09-20T22:06:31.568Z"
  },
  {
    "id": "ebna-107",
    "slug": "shein-men-drawstring-waist-letter-patch-shorts-ebna-107",
    "name": "SHEIN Men Drawstring Waist Letter Patch Shorts",
    "category": "MODA",
    "description": "SHEIN Men Drawstring Waist Letter Patch Shorts — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_107.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T12:06:31.571Z",
    "updated_at": "2026-09-20T22:06:31.571Z"
  },
  {
    "id": "ebna-108",
    "slug": "shein-ebna-108",
    "name": "Shein",
    "category": "MODA",
    "description": "Shein — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_108.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T11:06:31.574Z",
    "updated_at": "2026-09-20T22:06:31.574Z"
  },
  {
    "id": "ebna-109",
    "slug": "shoes-flats-dressy-ebna-109",
    "name": "Shoes flats dressy",
    "category": "VESTIDOS",
    "description": "Shoes flats dressy — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono Marrón.",
    "price": 20000,
    "images": [
      "/products/product_109.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T10:06:31.577Z",
    "updated_at": "2026-09-20T22:06:31.577Z"
  },
  {
    "id": "ebna-110",
    "slug": "skin-brightening-creams-for-sale-ebay-ebna-110",
    "name": "Skin Brightening Creams for Sale - eBay",
    "category": "MODA",
    "description": "Skin Brightening Creams for Sale - eBay — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_110.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T09:06:31.580Z",
    "updated_at": "2026-09-20T22:06:31.580Z"
  },
  {
    "id": "ebna-111",
    "slug": "skincare-ebna-111",
    "name": "SkinCare",
    "category": "COSMETICA",
    "description": "SkinCare — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_111.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-16T08:06:31.582Z",
    "updated_at": "2026-09-20T22:06:31.582Z"
  },
  {
    "id": "ebna-112",
    "slug": "soft-active-hooded-mid-layer-jacket-in-chocolate-oh-polly-ebna-112",
    "name": "Soft Active Hooded Mid-Layer Jacket in Chocolate _ Oh Polly",
    "category": "MODA",
    "description": "Soft Active Hooded Mid-Layer Jacket in Chocolate _ Oh Polly — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_112.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T07:06:31.585Z",
    "updated_at": "2026-09-20T22:06:31.585Z"
  },
  {
    "id": "ebna-113",
    "slug": "soft-active-hooded-zip-up-jacket-in-black-oh-polly-ebna-113",
    "name": "Soft Active Hooded Zip Up Jacket in Black _ Oh Polly",
    "category": "MODA",
    "description": "Soft Active Hooded Zip Up Jacket in Black _ Oh Polly — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_113.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T06:06:31.587Z",
    "updated_at": "2026-09-20T22:06:31.587Z"
  },
  {
    "id": "ebna-114",
    "slug": "summa-fit-ebna-114",
    "name": "Summa fit",
    "category": "MODA",
    "description": "Summa fit — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_114.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T05:06:31.590Z",
    "updated_at": "2026-09-20T22:06:31.590Z"
  },
  {
    "id": "ebna-115",
    "slug": "summer-dress-women-2021-plus-size-casual-beach-polka-dot-sexy-cotton-red-black-white-off-shoulder-midi-dress-robe-femme-vestidos-8022-black-dots-l-ebna-115",
    "name": "Summer Dress Women 2021 Plus Size Casual Beach Polka Dot Sexy Cotton Red Black White Off Shoulder Midi Dress Robe Femme Vestidos 8022 black dots-L",
    "category": "VESTIDOS",
    "description": "Summer Dress Women 2021 Plus Size Casual Beach Polka Dot Sexy Cotton Red Black White Off Shoulder Midi Dress Robe Femme Vestidos 8022 black dots-L — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono Negro.",
    "price": 20000,
    "images": [
      "/products/product_115.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Negro",
      "Blanco",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T04:06:31.593Z",
    "updated_at": "2026-09-20T22:06:31.593Z"
  },
  {
    "id": "ebna-116",
    "slug": "the-outnet-the-outnet-ebna-116",
    "name": "The Outnet _ THE OUTNET",
    "category": "MODA",
    "description": "The Outnet _ THE OUTNET — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_116.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-16T03:06:31.596Z",
    "updated_at": "2026-09-20T22:06:31.596Z"
  },
  {
    "id": "ebna-117",
    "slug": "topicrem-mela-pain-exfoliant-unifiant-visage-et-corps-peaux-sensibles-150g-nettoyant-peau-sensible-ebna-117",
    "name": "Topicrem - Mela - Pain Exfoliant Unifiant - Visage Et Corps - Peaux Sensibles, 150g - Nettoyant Peau Sensible",
    "category": "POMADAS",
    "description": "Topicrem - Mela - Pain Exfoliant Unifiant - Visage Et Corps - Peaux Sensibles, 150g - Nettoyant Peau Sensible — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_117.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-16T02:06:31.599Z",
    "updated_at": "2026-09-20T22:06:31.599Z"
  },
  {
    "id": "ebna-118",
    "slug": "topicrem-mela-pain-exfoliant-unifiant-150g-ebna-118",
    "name": "Topicrem mela pain exfoliant unifiant 150g",
    "category": "POMADAS",
    "description": "Topicrem mela pain exfoliant unifiant 150g — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_118.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-16T01:06:31.601Z",
    "updated_at": "2026-09-20T22:06:31.601Z"
  },
  {
    "id": "ebna-119",
    "slug": "turmeric-and-kojic-acid-bath-body-12pcs-turmeric-kojic-brightening-soap-yellow-color-yellow-size-os-ebna-119",
    "name": "Turmeric And Kojic Acid Bath & Body _ 12pcs Turmeric & Kojic Brightening Soap - Yellow _ Color_ Yellow _ Size_ Os",
    "category": "JABONES",
    "description": "Turmeric And Kojic Acid Bath & Body _ 12pcs Turmeric & Kojic Brightening Soap - Yellow _ Color_ Yellow _ Size_ Os — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_119.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Amarillo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-16T00:06:31.604Z",
    "updated_at": "2026-09-20T22:06:31.604Z"
  },
  {
    "id": "ebna-120",
    "slug": "turmeric-sea-salt-exfoliating-body-scrub-with-simmondsia-chinensis-jojoba-seed-oil-vitamin-e-brightening-smoothing-dead-skin-remover-hydrating-hand-foot-scrub-bikini-area-exfoliator-for-women-men-12-ebna-120",
    "name": "Turmeric Sea Salt Exfoliating Body Scrub With Simmondsia Chinensis (Jojoba) Seed Oil & Vitamin E – Brightening & Smoothing Dead Skin Remover, Hydrating Hand & Foot Scrub, Bikini Area Exfoliator For Women & Men, 12",
    "category": "POMADAS",
    "description": "Turmeric Sea Salt Exfoliating Body Scrub With Simmondsia Chinensis (Jojoba) Seed Oil & Vitamin E – Brightening & Smoothing Dead Skin Remover, Hydrating Hand & Foot Scrub, Bikini Area Exfoliator For Women & Men, 12 — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_120.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Amarillo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-15T23:06:31.607Z",
    "updated_at": "2026-09-20T22:06:31.607Z"
  },
  {
    "id": "ebna-121",
    "slug": "vaseline-healthy-bright-bar-of-soap-with-vitamin-b3-3x75g-pack-of-4-12-bars-ebna-121",
    "name": "Vaseline Healthy Bright Bar Of Soap With Vitamin B3 3x75g (pack Of 4) 12 Bars",
    "category": "JABONES",
    "description": "Vaseline Healthy Bright Bar Of Soap With Vitamin B3 3x75g (pack Of 4) 12 Bars — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_121.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-15T22:06:31.610Z",
    "updated_at": "2026-09-20T22:06:31.610Z"
  },
  {
    "id": "ebna-122",
    "slug": "vaseline-healthy-bright-vitamin-b3-healthy-plus-bar-soap-ebna-122",
    "name": "Vaseline Healthy Bright Vitamin B3 Healthy Plus Bar Soap",
    "category": "JABONES",
    "description": "Vaseline Healthy Bright Vitamin B3 Healthy Plus Bar Soap — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_122.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-15T21:06:31.613Z",
    "updated_at": "2026-09-20T22:06:31.613Z"
  },
  {
    "id": "ebna-123",
    "slug": "vaseline-lip-therapy-original-lip-balm-4g-x-1-ebna-123",
    "name": "Vaseline Lip Therapy Original Lip Balm 4g X 1",
    "category": "VASELINAS",
    "description": "Vaseline Lip Therapy Original Lip Balm 4g X 1 — Tratamiento de vaselina enriquecido con vitaminas. Nutrición profunda y barrera protectora de 24 horas para piel y labios.",
    "price": 5000,
    "images": [
      "/products/product_123.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-15T20:06:31.616Z",
    "updated_at": "2026-09-20T22:06:31.616Z"
  },
  {
    "id": "ebna-124",
    "slug": "veet-gold-tumeric-soap-ebna-124",
    "name": "Veet Gold Tumeric Soap",
    "category": "JABONES",
    "description": "Veet Gold Tumeric Soap — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.",
    "price": 3000,
    "images": [
      "/products/product_124.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Dorado",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-15T19:06:31.618Z",
    "updated_at": "2026-09-20T22:06:31.618Z"
  },
  {
    "id": "ebna-125",
    "slug": "waterproof-matte-liquid-lipstick-long-lasting-flesh-tint-ebna-125",
    "name": "Waterproof matte liquid lipstick - Long-lasting flesh tint_",
    "category": "COSMETICA",
    "description": "Waterproof matte liquid lipstick - Long-lasting flesh tint_ — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_125.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-15T18:06:31.624Z",
    "updated_at": "2026-09-20T22:06:31.624Z"
  },
  {
    "id": "ebna-126",
    "slug": "we-fashion-robe-longue-white-1-ebna-126",
    "name": "WE Fashion Robe longue - white (1)",
    "category": "VESTIDOS",
    "description": "WE Fashion Robe longue - white (1) — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono Blanco.",
    "price": 20000,
    "images": [
      "/products/product_126.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T17:06:31.627Z",
    "updated_at": "2026-09-20T22:06:31.627Z"
  },
  {
    "id": "ebna-127",
    "slug": "we-fashion-robe-longue-white-ebna-127",
    "name": "WE Fashion Robe longue - white",
    "category": "VESTIDOS",
    "description": "WE Fashion Robe longue - white — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono Blanco.",
    "price": 20000,
    "images": [
      "/products/product_127.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T16:06:31.630Z",
    "updated_at": "2026-09-20T22:06:31.630Z"
  },
  {
    "id": "ebna-128",
    "slug": "whitening-exfoliating-sherbet-body-scrub-350g-ebna-128",
    "name": "Whitening Exfoliating Sherbet Body Scrub 350g",
    "category": "POMADAS",
    "description": "Whitening Exfoliating Sherbet Body Scrub 350g — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.",
    "price": 10000,
    "images": [
      "/products/product_128.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "100g",
      "150g",
      "250g",
      "500ml"
    ],
    "created_at": "2026-09-15T15:06:31.633Z",
    "updated_at": "2026-09-20T22:06:31.633Z"
  },
  {
    "id": "ebna-129",
    "slug": "women-makeup-ebna-129",
    "name": "Women makeup",
    "category": "COSMETICA",
    "description": "Women makeup — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.",
    "price": 12000,
    "images": [
      "/products/product_129.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-15T14:06:31.635Z",
    "updated_at": "2026-09-20T22:06:31.635Z"
  },
  {
    "id": "ebna-130",
    "slug": "women-woven-ballet-flats-squared-toe-mary-jane-flats-with-adjustable-buckle-strap-comfortable-spring-summer-flat-sandals-ebna-130",
    "name": "Women Woven Ballet Flats Squared Toe Mary Jane Flats With Adjustable Buckle Strap Comfortable Spring & Summer Flat Sandals",
    "category": "CALZADO",
    "description": "Women Woven Ballet Flats Squared Toe Mary Jane Flats With Adjustable Buckle Strap Comfortable Spring & Summer Flat Sandals — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_130.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rojo",
      "Blanco",
      "Negro"
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
    "updated_at": "2026-09-20T22:06:31.638Z"
  },
  {
    "id": "ebna-131",
    "slug": "women-s-floral-lace-pattern-ballet-flat-shoes-slip-on-style-pointed-toe-mesh-fabric-upper-with-breathable-cutouts-comfortable-soft-sole-elegant-and-graceful-design-low-vamp-black-white-colors-available-w-ebna-131",
    "name": "Women's Floral Lace Pattern Ballet Flat Shoes, Slip-On Style, Pointed Toe, Mesh Fabric Upper With Breathable Cutouts, Comfortable Soft Sole, Elegant And Graceful Design, Low Vamp, Black & White Colors Available, W",
    "category": "CALZADO",
    "description": "Women's Floral Lace Pattern Ballet Flat Shoes, Slip-On Style, Pointed Toe, Mesh Fabric Upper With Breathable Cutouts, Comfortable Soft Sole, Elegant And Graceful Design, Low Vamp, Black & White Colors Available, W — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_131.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
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
      "40",
      "41",
      "42"
    ],
    "created_at": "2026-09-15T12:06:31.641Z",
    "updated_at": "2026-09-20T22:06:31.641Z"
  },
  {
    "id": "ebna-132",
    "slug": "zapatos-de-ballet-planos-blancos-para-mujer-con-decoracion-de-lazo-bordado-floral-para-verano-sandalias-negras-respirables-de-malla-hueca-con-punta-cuadrada-y-decoracion-de-lentejuelas-adecuadas-para-pies-anch-ebna-132",
    "name": "Zapatos de ballet planos blancos para mujer con decoración de lazo, bordado floral, para verano; Sandalias negras respirables de malla hueca con punta cuadrada y decoración de lentejuelas, adecuadas para pies anch",
    "category": "CALZADO",
    "description": "Zapatos de ballet planos blancos para mujer con decoración de lazo, bordado floral, para verano; Sandalias negras respirables de malla hueca con punta cuadrada y decoración de lentejuelas, adecuadas para pies anch — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_132.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
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
    "updated_at": "2026-09-20T22:06:31.645Z"
  },
  {
    "id": "ebna-133",
    "slug": "zapatos-de-malla-negra-hueca-elegantes-de-moda-para-mujer-primavera-otono-zapatos-de-ballet-planos-versatiles-de-oficina-con-correa-de-vamp-bajo-zapatos-mary-jane-de-malla-transpirable-con-punta-cuadrada-zapato-ebna-133",
    "name": "Zapatos de malla negra hueca elegantes de moda para mujer primavera_otoño, zapatos de ballet planos versátiles de oficina con correa de vamp bajo, zapatos Mary Jane de malla transpirable con punta cuadrada, zapato",
    "category": "CALZADO",
    "description": "Zapatos de malla negra hueca elegantes de moda para mujer primavera_otoño, zapatos de ballet planos versátiles de oficina con correa de vamp bajo, zapatos Mary Jane de malla transpirable con punta cuadrada, zapato — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_133.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
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
    "updated_at": "2026-09-20T22:06:31.647Z"
  },
  {
    "id": "ebna-134",
    "slug": "zara-heels-heels-heelsaddict-ebna-134",
    "name": "Zara heels #heels #heelsaddict",
    "category": "CALZADO",
    "description": "Zara heels #heels #heelsaddict — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.",
    "price": 25000,
    "images": [
      "/products/product_134.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
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
    "updated_at": "2026-09-20T22:06:31.650Z"
  },
  {
    "id": "ebna-135",
    "slug": "zara-red-vanilla-eau-de-parfum-ebna-135",
    "name": "ZARA Red Vanilla Eau de Parfum ✨",
    "category": "PERFUMES",
    "description": "ZARA Red Vanilla Eau de Parfum ✨ — Fragancia exclusiva de alta gama. Notas olfativas elegantes y duraderas creadas para destacar sofisticación y presencia distintiva en cualquier ocasión.",
    "price": 25000,
    "images": [
      "/products/product_135.png"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rojo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-15T08:06:31.657Z",
    "updated_at": "2026-09-20T22:06:31.657Z"
  },
  {
    "id": "ebna-136",
    "slug": "zara-9290-follow-chelnokboys-ebna-136",
    "name": "ZARA __ДОСТУПНЫ ДЛЯ ЗАКАЗА _От 9290₽ с учетом доставки по РФ _Размеры уточнять в лс________follow_ @chelnokboys",
    "category": "MODA",
    "description": "ZARA __ДОСТУПНЫ ДЛЯ ЗАКАЗА _От 9290₽ с учетом доставки по РФ _Размеры уточнять в лс________follow_ @chelnokboys — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_136.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T07:06:31.660Z",
    "updated_at": "2026-09-20T22:06:31.660Z"
  },
  {
    "id": "ebna-137",
    "slug": "zara-red-vanilla-ebna-137",
    "name": "Zara • Red Vanilla",
    "category": "PERFUMES",
    "description": "Zara • Red Vanilla — Fragancia exclusiva de alta gama. Notas olfativas elegantes y duraderas creadas para destacar sofisticación y presencia distintiva en cualquier ocasión.",
    "price": 25000,
    "images": [
      "/products/product_137.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Rojo",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "50ml",
      "100ml",
      "200ml",
      "Standard"
    ],
    "created_at": "2026-09-15T06:06:31.663Z",
    "updated_at": "2026-09-20T22:06:31.663Z"
  },
  {
    "id": "ebna-138",
    "slug": "pjsdolz-ebna-138",
    "name": "𖦹 pjsdolz _ _! ୧",
    "category": "MODA",
    "description": "𖦹 pjsdolz _ _! ୧ — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_138.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T05:06:31.666Z",
    "updated_at": "2026-09-20T22:06:31.666Z"
  },
  {
    "id": "ebna-139",
    "slug": "-ebna-139",
    "name": "𝙋𝙞𝙣 𝘽𝙮 𝙏𝙝𝙤𝙢𝙖𝙨 𝙎𝙝𝙚𝙡𝙗𝙮 💝🌈🚩",
    "category": "MODA",
    "description": "𝙋𝙞𝙣 𝘽𝙮 𝙏𝙝𝙤𝙢𝙖𝙨 𝙎𝙝𝙚𝙡𝙗𝙮 💝🌈🚩 — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_139.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T04:06:31.668Z",
    "updated_at": "2026-09-20T22:06:31.668Z"
  },
  {
    "id": "ebna-140",
    "slug": "-ebna-140",
    "name": "💾📚💾📖🇧🇭🇨🇭🇦🇲🇦🇷🇦🇪🇧🇦🇧🇪🇶🇦🇧🇩🇧🇬🇧🇴🇨🇴🇩🇪🇪🇭🇬🇳🇱🇻🇱🇹🇸🇨🇷🇪🇺🇦🇹🇭🇸🇱🇸🇪",
    "category": "MODA",
    "description": "💾📚💾📖🇧🇭🇨🇭🇦🇲🇦🇷🇦🇪🇧🇦🇧🇪🇶🇦🇧🇩🇧🇬🇧🇴🇨🇴🇩🇪🇪🇭🇬🇳🇱🇻🇱🇹🇸🇨🇷🇪🇺🇦🇹🇭🇸🇱🇸🇪 — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_140.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Marrón",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T03:06:31.671Z",
    "updated_at": "2026-09-20T22:06:31.671Z"
  },
  {
    "id": "ebna-141",
    "slug": "mulvari-plus-solid-thermal-lined-kangaroo-pocket-drawstring-hoodie-ebna-141",
    "name": "🛒Mulvari Plus Solid Thermal Lined Kangaroo Pocket Drawstring Hoodie",
    "category": "MODA",
    "description": "🛒Mulvari Plus Solid Thermal Lined Kangaroo Pocket Drawstring Hoodie — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_141.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Blanco",
      "Negro",
      "Rosa"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T02:06:31.674Z",
    "updated_at": "2026-09-20T22:06:31.674Z"
  },
  {
    "id": "ebna-142",
    "slug": "-ebna-142",
    "name": "🥰🥰",
    "category": "MODA",
    "description": "🥰🥰 — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.",
    "price": 15000,
    "images": [
      "/products/product_142.jfif"
    ],
    "in_stock": true,
    "is_hidden": false,
    "colors": [
      "Azul",
      "Blanco",
      "Negro"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": "2026-09-15T01:06:31.678Z",
    "updated_at": "2026-09-20T22:06:31.678Z"
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
