-- ====================================================================
-- EBNA LUXURY - REFACTORIZACIÓN TOTAL Y LIMPIEZA COMPLETA DE BASE DE DATOS
-- PROYECTO: EBNA Moda y Cosmética (Guinea Ecuatorial - Moneda: FCFA / XAF)
-- ====================================================================

-- 1. ELIMINAR CUALQUIER TABLA Y ESTRUCTURA ANTIGUA EN SUPABASE
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;

-- 2. EXTENSIONES DE POSTGRESQL PARA GENERACIÓN DE UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. TABLA MAESTRA DE CONFIGURACIÓN DEL SISTEMA
CREATE TABLE system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO system_settings (key, value, description) VALUES
('express_shipping_cost', '3000'::jsonb, 'Costo del envío express en FCFA'),
('normal_shipping_cost', '0'::jsonb, 'Costo del envío normal en FCFA'),
('whatsapp_phone', '"240222633687"'::jsonb, 'Número oficial de pedidos por WhatsApp'),
('muni_phone', '"240555439904"'::jsonb, 'Número oficial para cobros por Muni Dinero');

-- 4. TABLA MAESTRA DE CATEGORÍAS (RELACIONAL)
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (id, name, description, icon_name) VALUES
('MODA_MUJER', 'Moda Mujer', 'Vestidos de fiesta, monos, conjuntos y ropa femenina de lujo', 'Heart'),
('MODA_HOMBRE', 'Moda Hombre', 'Trajes, chaquetas, camisetas y moda urbana masculina', 'User'),
('CALZADO', 'Calzado & Sneakers', 'Zapatillas deportivas, tacones y calzado elegante', 'Footprints'),
('BOLSOS_ACCESORIOS', 'Bolsos & Accesorios', 'Bolsos de mano, carteras, gafas de sol y complementos', 'ShoppingBag'),
('PERFUMERIA', 'Perfumería de Lujo', 'Fragancias exclusivas, perfumes de autor y eau de parfum', 'Flame'),
('COSMETICA_FACIAL', 'Cosmética Facial', 'Tratamientos faciales, cremas iluminadoras y sueros', 'Sparkle'),
('HIGIENE_CORPORAL', 'Higiene Corporal & Jabones', 'Lociones hidratantes, jabones de tocador y geles aromáticos', 'Droplets');

-- 5. TABLA MAESTRA DE MARCAS (RELACIONAL)
CREATE TABLE brands (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO brands (id, name, country) VALUES
('EBNA', 'EBNA Luxury Collection', 'Guinea Ecuatorial'),
('ZARA', 'Zara', 'España'),
('CHANEL', 'Chanel', 'Francia'),
('DIOR', 'Dior', 'Francia'),
('INSTITUTO_ESPANOL', 'Instituto Español', 'España'),
('PALMOLIVE', 'Palmolive', 'EEUU'),
('DOLE', 'Dole Medicated', 'Reino Unido'),
('YSL', 'Yves Saint Laurent', 'Francia'),
('CAROLINA_HERRERA', 'Carolina Herrera', 'EEUU'),
('VICTORIAS_SECRET', 'Victoria''s Secret', 'EEUU');

-- 6. TABLA PRINCIPAL DE PRODUCTOS (RELACIONAL ATÓMICA CON PRIMARY KEY UUID)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) DEFAULT 'EBNA Luxury Collection',
    category VARCHAR(50) NOT NULL REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    subcategory VARCHAR(100) DEFAULT 'General',
    price NUMERIC(12,2) NOT NULL DEFAULT 15000,
    price_fcfa NUMERIC(12,2) NOT NULL DEFAULT 15000,
    original_price_fcfa NUMERIC(12,2),
    in_stock BOOLEAN DEFAULT TRUE,
    is_hidden BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    order_count INT DEFAULT 0,
    description TEXT NOT NULL,
    images JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ÍNDICES DE ALTO RENDIMIENTO
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_in_stock ON products(in_stock);

-- 7. TABLA RELACIONAL DE IMÁGENES (FOREIGN KEY -> PRODUCTS ON DELETE CASCADE)
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- 8. TABLA RELACIONAL DE VARIANTES (FOREIGN KEY -> PRODUCTS ON DELETE CASCADE)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(20),
    color VARCHAR(50),
    stock_quantity INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);

-- 9. DESACTIVACIÓN DE RLS PARA PERMITIR CRUD TOTAL (LECTURA/ESCRITURA/BORRADO PÚBLICO EN SUPABASE REST API)
ALTER TABLE system_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE brands DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants DISABLE ROW LEVEL SECURITY;

-- 10. POBLACIÓN DE LOS 142 PRODUCTOS CON VÍNCULOS 1 A 1

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('aec96a3d-b588-4c4d-aed7-c3c5994c6c3e', 'EB-CALZ-01', 'sneakers-urbanos-bicolor-sports-men-s-edition-ebna-1', 'Sneakers Urbanos Bicolor Sports Men''s Edition', 'EBNA Luxury Collection', 'CALZADO', 'Zapatillas Sneakers', 28000, 28000, 32000, true, true, 'Zapatillas deportivas con paneles de malla transpirable y suela amortiguada. Ideales para combinar con jeans o ropa deportiva urbana.', '{"primary":"/products/product_1.jfif","gallery":["/products/product_1.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('aec96a3d-b588-4c4d-aed7-c3c5994c6c3e', '/products/product_1.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('51accc01-f1b1-44cf-a9e3-e222bb102dd5', 'EB-ACC-01', 'funda-porta-pasaporte-pu-map-pattern-porta-tarjetas-ebna-2', 'Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas', 'EBNA Luxury Collection', 'BOLSOS_ACCESORIOS', 'Accesorios de Viaje', 12000, 12000, 14000, true, true, 'Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa mundi. Incluye ranuras para tarjetas e ID.', '{"primary":"/products/product_2.jfif","gallery":["/products/product_2.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('51accc01-f1b1-44cf-a9e3-e222bb102dd5', '/products/product_2.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('df5ff547-a6ca-4214-aa49-f0e7e773f4b2', 'EB-MODM-01', 'conjunto-deportivo-hooded-crop-top-pantalon-flare-ebna-3', 'Conjunto Deportivo Hooded Crop Top & Pantalón Flare', 'EBNA Luxury Collection', 'MODA_MUJER', 'Conjuntos & Sets', 25000, 25000, 28500, true, true, 'Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.', '{"primary":"/products/product_3.jfif","gallery":["/products/product_3.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('df5ff547-a6ca-4214-aa49-f0e7e773f4b2', '/products/product_3.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f7e800a2-673b-4385-ab1d-88858b3ffdb9', 'EB-MODM-02', 'prenda-exclusiva-ebna-luxury-n-4-ebna-4', 'Prenda Exclusiva EBNA Luxury N°4', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_4.jfif","gallery":["/products/product_4.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f7e800a2-673b-4385-ab1d-88858b3ffdb9', '/products/product_4.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('7acbf3e1-ea55-42a5-adb0-fc1e6d7e30f2', 'EB-MODM-03', 'prenda-exclusiva-ebna-luxury-n-5-ebna-5', 'Prenda Exclusiva EBNA Luxury N°5', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_5.jfif","gallery":["/products/product_5.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('7acbf3e1-ea55-42a5-adb0-fc1e6d7e30f2', '/products/product_5.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('56f579dc-64e0-4a7d-a629-ff9ab5da2d7b', 'EB-MODM-04', 'prenda-exclusiva-ebna-luxury-n-6-ebna-6', 'Prenda Exclusiva EBNA Luxury N°6', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_6.jfif","gallery":["/products/product_6.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('56f579dc-64e0-4a7d-a629-ff9ab5da2d7b', '/products/product_6.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('aadc01be-f874-477a-a923-fc1415ee32a5', 'EB-MODM-05', 'prenda-exclusiva-ebna-luxury-n-7-ebna-7', 'Prenda Exclusiva EBNA Luxury N°7', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_7.jfif","gallery":["/products/product_7.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('aadc01be-f874-477a-a923-fc1415ee32a5', '/products/product_7.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('e42ddd00-a1ba-43fc-acab-c6f6048c0c7e', 'EB-MODM-06', 'prenda-exclusiva-ebna-luxury-n-8-ebna-8', 'Prenda Exclusiva EBNA Luxury N°8', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_8.jfif","gallery":["/products/product_8.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('e42ddd00-a1ba-43fc-acab-c6f6048c0c7e', '/products/product_8.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('b484b044-31b3-4af3-a8aa-ecb91f73f74a', 'EB-MODM-07', 'prenda-exclusiva-ebna-luxury-n-9-ebna-9', 'Prenda Exclusiva EBNA Luxury N°9', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_9.jfif","gallery":["/products/product_9.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('b484b044-31b3-4af3-a8aa-ecb91f73f74a', '/products/product_9.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('0fc3ee37-a038-4304-a0e8-9deb0be26759', 'EB-MODM-08', 'prenda-exclusiva-ebna-luxury-n-10-ebna-10', 'Prenda Exclusiva EBNA Luxury N°10', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_10.jfif","gallery":["/products/product_10.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('0fc3ee37-a038-4304-a0e8-9deb0be26759', '/products/product_10.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f4ce33ea-26e3-426d-a586-22e79e4ed717', 'EB-MODM-09', 'prenda-exclusiva-ebna-luxury-n-11-ebna-11', 'Prenda Exclusiva EBNA Luxury N°11', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_11.jfif","gallery":["/products/product_11.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f4ce33ea-26e3-426d-a586-22e79e4ed717', '/products/product_11.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('a1713055-00a0-4e9e-abe4-ee078226dc45', 'EB-HIG-01', 'jabon-de-tocador-palmolive-naturals-extractos-herbales-pack-12-x-90g-ebna-12', 'Jabón de Tocador Palmolive Naturals Extractos Herbales (Pack 12 x 90g)', 'Palmolive', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 8500, 8500, 10000, true, false, 'Pack familiar de jabones enriquecidos con extractos herbales purificantes y aceites vegetales. Aroma fresco y limpieza suave diaria.', '{"primary":"/products/product_12.jfif","gallery":["/products/product_12.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('a1713055-00a0-4e9e-abe4-ee078226dc45', '/products/product_12.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('63d0f771-a4fd-40f3-aac7-8812c544a289', 'EB-MODM-10', 'prenda-exclusiva-ebna-luxury-n-13-ebna-13', 'Prenda Exclusiva EBNA Luxury N°13', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_13.jfif","gallery":["/products/product_13.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('63d0f771-a4fd-40f3-aac7-8812c544a289', '/products/product_13.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('9332700a-c88a-4b6f-af9f-cb2cf82bd518', 'EB-MODM-11', 'prenda-exclusiva-ebna-luxury-n-14-ebna-14', 'Prenda Exclusiva EBNA Luxury N°14', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_14.jfif","gallery":["/products/product_14.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('9332700a-c88a-4b6f-af9f-cb2cf82bd518', '/products/product_14.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('5b6336e9-69e7-4a8e-a982-7b0df00e2a3b', 'EB-MODM-12', 'prenda-exclusiva-ebna-luxury-n-15-ebna-15', 'Prenda Exclusiva EBNA Luxury N°15', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_15.jfif","gallery":["/products/product_15.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('5b6336e9-69e7-4a8e-a982-7b0df00e2a3b', '/products/product_15.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('18ad1e9f-2b35-4695-a0e1-be8f807b49eb', 'EB-MODM-13', 'prenda-exclusiva-ebna-luxury-n-16-ebna-16', 'Prenda Exclusiva EBNA Luxury N°16', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_16.jfif","gallery":["/products/product_16.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('18ad1e9f-2b35-4695-a0e1-be8f807b49eb', '/products/product_16.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('40a1c06d-d079-4ec0-a158-40197e103200', 'EB-MODM-14', 'prenda-exclusiva-ebna-luxury-n-17-ebna-17', 'Prenda Exclusiva EBNA Luxury N°17', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_17.jfif","gallery":["/products/product_17.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('40a1c06d-d079-4ec0-a158-40197e103200', '/products/product_17.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('10e95948-aee0-4024-a1e4-c026acf71859', 'EB-MODM-15', 'pack-2x-leggings-elasticos-maternidad-confort-ultra-soft-ebna-18', 'Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft', 'EBNA Maternity', 'MODA_MUJER', 'Pantalones & Mallas', 18000, 18000, 20500, true, false, 'Pack de 2 mallas de premamá con pretina alta sobre la barriga en tejido elástico transpirable. Soporte suave sin oprimir.', '{"primary":"/products/product_18.jfif","gallery":["/products/product_18.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('10e95948-aee0-4024-a1e4-c026acf71859', '/products/product_18.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('cfdb9a2c-a2dc-47f2-a501-188f107ed8b3', 'EB-MODM-16', 'prenda-exclusiva-ebna-luxury-n-19-ebna-19', 'Prenda Exclusiva EBNA Luxury N°19', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_19.jfif","gallery":["/products/product_19.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('cfdb9a2c-a2dc-47f2-a501-188f107ed8b3', '/products/product_19.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('1efd39e4-3130-42a6-a980-60d474e7f47f', 'EB-MODM-17', 'prenda-exclusiva-ebna-luxury-n-20-ebna-20', 'Prenda Exclusiva EBNA Luxury N°20', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_20.jfif","gallery":["/products/product_20.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('1efd39e4-3130-42a6-a980-60d474e7f47f', '/products/product_20.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('6c1110ed-b212-46ea-a134-e4411231d445', 'EB-ACC-02', 'gafas-de-sol-classic-square-unisex-filtro-luz-azul-pack-3x-ebna-21', 'Gafas de Sol Classic Square Unisex Filtro Luz Azul (Pack 3x)', 'EBNA Eyewear', 'BOLSOS_ACCESORIOS', 'Gafas de Sol & Monturas', 16000, 16000, 18500, true, false, 'Pack de 3 gafas unisex con montura cuadrada negra ultraligera y lentes con filtro protector de luz azul para ordenadores y móviles.', '{"primary":"/products/product_21.jfif","gallery":["/products/product_21.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('6c1110ed-b212-46ea-a134-e4411231d445', '/products/product_21.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('92705442-093d-48a4-ab42-ca6ab5634c8f', 'EB-MODM-18', 'prenda-exclusiva-ebna-luxury-n-22-ebna-22', 'Prenda Exclusiva EBNA Luxury N°22', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_22.jfif","gallery":["/products/product_22.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('92705442-093d-48a4-ab42-ca6ab5634c8f', '/products/product_22.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('6aa06f03-b846-4c28-a0b7-64dbace4f0b5', 'EB-MODM-19', 'prenda-exclusiva-ebna-luxury-n-23-ebna-23', 'Prenda Exclusiva EBNA Luxury N°23', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_23.jfif","gallery":["/products/product_23.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('6aa06f03-b846-4c28-a0b7-64dbace4f0b5', '/products/product_23.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('68cfef14-a5e6-41ee-af99-8d3063b49310', 'EB-MODM-20', 'prenda-exclusiva-ebna-luxury-n-24-ebna-24', 'Prenda Exclusiva EBNA Luxury N°24', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_24.jfif","gallery":["/products/product_24.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('68cfef14-a5e6-41ee-af99-8d3063b49310', '/products/product_24.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('b7bf1c4e-d637-4fa6-a1e4-d42e79829f0f', 'EB-MODM-21', 'prenda-exclusiva-ebna-luxury-n-25-ebna-25', 'Prenda Exclusiva EBNA Luxury N°25', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_25.jfif","gallery":["/products/product_25.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('b7bf1c4e-d637-4fa6-a1e4-d42e79829f0f', '/products/product_25.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('63c9c6e9-1edd-4a65-af89-5a3813185214', 'EB-MODM-22', 'chaqueta-blazer-sastre-zara-style-new-collection-ebna-26', 'Chaqueta Blazer Sastre Zara Style New Collection', 'Zara', 'MODA_MUJER', 'Chaqueas & Blazers', 32000, 32000, 37000, true, false, 'Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda sastre versátil para elevar cualquier atuendo.', '{"primary":"/products/product_26.jfif","gallery":["/products/product_26.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('63c9c6e9-1edd-4a65-af89-5a3813185214', '/products/product_26.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('b8ac52c4-d7d3-4c3b-aec8-9b196241bec1', 'EB-MODM-23', 'prenda-exclusiva-ebna-luxury-n-27-ebna-27', 'Prenda Exclusiva EBNA Luxury N°27', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_27.jfif","gallery":["/products/product_27.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('b8ac52c4-d7d3-4c3b-aec8-9b196241bec1', '/products/product_27.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('e98b1940-1e93-486d-a8b2-8be416339851', 'EB-MODM-24', 'prenda-exclusiva-ebna-luxury-n-28-ebna-28', 'Prenda Exclusiva EBNA Luxury N°28', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_28.jfif","gallery":["/products/product_28.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('e98b1940-1e93-486d-a8b2-8be416339851', '/products/product_28.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('5780a49a-9e66-45fa-ad28-6a37e93244d9', 'EB-MODM-25', 'prenda-exclusiva-ebna-luxury-n-29-ebna-29', 'Prenda Exclusiva EBNA Luxury N°29', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_29.jfif","gallery":["/products/product_29.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('5780a49a-9e66-45fa-ad28-6a37e93244d9', '/products/product_29.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('760bc8b0-fac2-4b98-af68-3f8df0c5311a', 'EB-MODM-26', 'prenda-exclusiva-ebna-luxury-n-30-ebna-30', 'Prenda Exclusiva EBNA Luxury N°30', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_30.jfif","gallery":["/products/product_30.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('760bc8b0-fac2-4b98-af68-3f8df0c5311a', '/products/product_30.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('b1351124-b87d-4f6a-ad7d-069f359fa3d8', 'EB-MODM-27', 'prenda-exclusiva-ebna-luxury-n-31-ebna-31', 'Prenda Exclusiva EBNA Luxury N°31', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_31.jfif","gallery":["/products/product_31.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('b1351124-b87d-4f6a-ad7d-069f359fa3d8', '/products/product_31.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('bdbd6c35-d38e-463c-ae23-b8393e8da915', 'EB-MODM-28', 'prenda-exclusiva-ebna-luxury-n-32-ebna-32', 'Prenda Exclusiva EBNA Luxury N°32', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_32.jfif","gallery":["/products/product_32.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('bdbd6c35-d38e-463c-ae23-b8393e8da915', '/products/product_32.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('1be05d97-3b5b-4938-a079-b2bf14a5eae1', 'EB-MODM-29', 'prenda-exclusiva-ebna-luxury-n-33-ebna-33', 'Prenda Exclusiva EBNA Luxury N°33', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_33.jfif","gallery":["/products/product_33.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('1be05d97-3b5b-4938-a079-b2bf14a5eae1', '/products/product_33.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('1b7aca55-e962-40f2-a91b-8006d87e2c5b', 'EB-MODM-30', 'prenda-exclusiva-ebna-luxury-n-34-ebna-34', 'Prenda Exclusiva EBNA Luxury N°34', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_34.jfif","gallery":["/products/product_34.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('1b7aca55-e962-40f2-a91b-8006d87e2c5b', '/products/product_34.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('772e0238-6636-43e4-af7d-43f5799d0a04', 'EB-MODM-31', 'prenda-exclusiva-ebna-luxury-n-35-ebna-35', 'Prenda Exclusiva EBNA Luxury N°35', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_35.jfif","gallery":["/products/product_35.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('772e0238-6636-43e4-af7d-43f5799d0a04', '/products/product_35.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('2fd02661-0820-40d7-a865-954a772b3918', 'EB-MODM-32', 'prenda-exclusiva-ebna-luxury-n-36-ebna-36', 'Prenda Exclusiva EBNA Luxury N°36', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_36.jfif","gallery":["/products/product_36.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('2fd02661-0820-40d7-a865-954a772b3918', '/products/product_36.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('a032d2b4-ceb2-47a0-af81-7299d89e91de', 'EB-MODM-33', 'prenda-exclusiva-ebna-luxury-n-37-ebna-37', 'Prenda Exclusiva EBNA Luxury N°37', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_37.jfif","gallery":["/products/product_37.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('a032d2b4-ceb2-47a0-af81-7299d89e91de', '/products/product_37.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('2b70664f-fad7-41e7-ae14-3cf5f9e4f537', 'EB-MODM-34', 'prenda-exclusiva-ebna-luxury-n-38-ebna-38', 'Prenda Exclusiva EBNA Luxury N°38', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_38.jfif","gallery":["/products/product_38.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('2b70664f-fad7-41e7-ae14-3cf5f9e4f537', '/products/product_38.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('94049ac8-879e-4434-a0a0-a28e0f6c2d8d', 'EB-MODM-35', 'prenda-exclusiva-ebna-luxury-n-39-ebna-39', 'Prenda Exclusiva EBNA Luxury N°39', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_39.jfif","gallery":["/products/product_39.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('94049ac8-879e-4434-a0a0-a28e0f6c2d8d', '/products/product_39.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('845f8af1-e55e-4271-aac8-a89196d10ab3', 'EB-MODM-36', 'prenda-exclusiva-ebna-luxury-n-40-ebna-40', 'Prenda Exclusiva EBNA Luxury N°40', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_40.jfif","gallery":["/products/product_40.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('845f8af1-e55e-4271-aac8-a89196d10ab3', '/products/product_40.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('b7c4fb8d-5ab6-483c-aeb1-65facd468630', 'EB-MODM-37', 'prenda-exclusiva-ebna-luxury-n-41-ebna-41', 'Prenda Exclusiva EBNA Luxury N°41', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_41.jfif","gallery":["/products/product_41.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('b7c4fb8d-5ab6-483c-aeb1-65facd468630', '/products/product_41.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('1f51921c-663d-4496-a9e4-18795eb46766', 'EB-MODM-38', 'prenda-exclusiva-ebna-luxury-n-42-ebna-42', 'Prenda Exclusiva EBNA Luxury N°42', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_42.jfif","gallery":["/products/product_42.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('1f51921c-663d-4496-a9e4-18795eb46766', '/products/product_42.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('c99b2567-4e18-4fae-a7ca-8e40232a5304', 'EB-MODM-39', 'prenda-exclusiva-ebna-luxury-n-43-ebna-43', 'Prenda Exclusiva EBNA Luxury N°43', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_43.webp","gallery":["/products/product_43.webp"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('c99b2567-4e18-4fae-a7ca-8e40232a5304', '/products/product_43.webp', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('9ce3bea6-4e8b-4492-ad54-3cca95bfe6e8', 'EB-MODM-40', 'prenda-exclusiva-ebna-luxury-n-44-ebna-44', 'Prenda Exclusiva EBNA Luxury N°44', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_44.jfif","gallery":["/products/product_44.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('9ce3bea6-4e8b-4492-ad54-3cca95bfe6e8', '/products/product_44.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('dfd98677-fbd2-4a8b-a69e-d47aad89c9da', 'EB-MODM-41', 'prenda-exclusiva-ebna-luxury-n-45-ebna-45', 'Prenda Exclusiva EBNA Luxury N°45', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_45.jfif","gallery":["/products/product_45.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('dfd98677-fbd2-4a8b-a69e-d47aad89c9da', '/products/product_45.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('93c4e750-2134-48f9-a5be-60eee25719c7', 'EB-MODM-42', 'prenda-exclusiva-ebna-luxury-n-46-ebna-46', 'Prenda Exclusiva EBNA Luxury N°46', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_46.jfif","gallery":["/products/product_46.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('93c4e750-2134-48f9-a5be-60eee25719c7', '/products/product_46.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('7b19649b-fbdb-4e89-a4ad-ad8cd9af15c4', 'EB-MODM-43', 'prenda-exclusiva-ebna-luxury-n-47-ebna-47', 'Prenda Exclusiva EBNA Luxury N°47', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_47.jfif","gallery":["/products/product_47.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('7b19649b-fbdb-4e89-a4ad-ad8cd9af15c4', '/products/product_47.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f84ca625-4d87-4db7-a5d3-da5d49861b6b', 'EB-CALZ-02', 'bailarinas-elegantes-encaje-floral-ollio-paris-ebna-48', 'Bailarinas Elegantes Encaje Floral Ollio Paris', 'Ollio Paris', 'CALZADO', 'Bailarinas & Zapatos Planos', 22000, 22000, 25500, true, false, 'Zapatos planos estilo bailarina confeccionados en encaje floral transpirable. Plantilla acolchada suave ideal para eventos y oficina.', '{"primary":"/products/product_48.png","gallery":["/products/product_48.png"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f84ca625-4d87-4db7-a5d3-da5d49861b6b', '/products/product_48.png', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('5cb59390-fe31-44f4-a8a6-bc2ca7ad0b3f', 'EB-HIG-02', 'locion-corporal-hidratante-avena-instituto-espanol-ebna-49', 'Loción Corporal Hidratante Avena Instituto Español', 'Instituto Español', 'HIGIENE_CORPORAL', 'Lociones Corporales', 9500, 9500, 11000, true, false, 'Loción corporal de formato familiar formulada con extracto de avena 100% natural. 24 horas de hidratación para toda la familia.', '{"primary":"/products/product_49.jfif","gallery":["/products/product_49.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('5cb59390-fe31-44f4-a8a6-bc2ca7ad0b3f', '/products/product_49.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('97d18be0-d2fe-4e89-a5ee-b2f537b6ca8b', 'EB-COSM-01', 'lapiz-labial-liquido-velvet-matte-waterproof-long-lasting-ebna-50', 'Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Maquillaje de Labios', 9000, 9000, 10500, true, false, 'Pintalabios líquido mate de alta cobertura e intensidad de color. Fórmula intransferible de larga duración hasta 16 horas de fijación.', '{"primary":"/products/product_50.jfif","gallery":["/products/product_50.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('97d18be0-d2fe-4e89-a5ee-b2f537b6ca8b', '/products/product_50.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('3434857b-5706-4526-aba5-ae370d118e5e', 'EB-COSM-02', 'set-de-cosmetica-facial-brunch-beauty-glow-serum-50ml-ebna-51', 'Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)', 'Brunch Beauty', 'COSMETICA_FACIAL', 'Serums & Tratamientos', 15000, 15000, 17500, true, false, 'Concentrado iluminador facial con vitamina C estabilizada y ácido hialurónico. Revitaliza la piel y aporta luminosidad natural todo el día.', '{"primary":"/products/product_51.jfif","gallery":["/products/product_51.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('3434857b-5706-4526-aba5-ae370d118e5e', '/products/product_51.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('271429d2-35d4-4406-a23a-44e1aa5d963d', 'EB-HIG-03', 'jabon-de-azufre-biosulfur-grisi-anti-acne-100g-ebna-52', 'Jabón de Azufre BioSulfur Grisi Anti-Acné 100g', 'Grisi', 'HIGIENE_CORPORAL', 'Jabones Medicinales', 3500, 3500, 4000, true, false, 'Jabón medicinal con 10% de azufre coloidal formulado para pieles con tendencia acneica. Controla el exceso de grasa y desobstruye poros.', '{"primary":"/products/product_52.jfif","gallery":["/products/product_52.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('271429d2-35d4-4406-a23a-44e1aa5d963d', '/products/product_52.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('972691d0-7724-4bf6-a04b-caddb6fb5df9', 'EB-MODM-44', 'vestido-midi-gingham-smocked-tie-strap-elegance-ebna-53', 'Vestido Midi Gingham Smocked Tie-Strap Elegance', 'EBNA Luxury Collection', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 24000, 24000, 27500, true, false, 'Vestido midi de tirantes ajustables con nudo y cuerpo fruncido elástico en estampado de cuadros vichy. Silueta fresca y primaveral.', '{"primary":"/products/product_53.png","gallery":["/products/product_53.png"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('972691d0-7724-4bf6-a04b-caddb6fb5df9', '/products/product_53.png', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('6ab118ae-ca33-4a91-a1a2-c8b3bb9293f3', 'EB-MODM-45', 'vestido-mini-halter-neck-bodycon-satin-red-ebna-54', 'Vestido Mini Halter Neck Bodycon Satin Red', 'EBNA Luxury Collection', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 26000, 26000, 30000, true, false, 'Mini vestido entallado con cuello halter y espalda descubierta. Tejido satinado elástico que moldea la silueta con elegancia nocturna.', '{"primary":"/products/product_54.jfif","gallery":["/products/product_54.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('6ab118ae-ca33-4a91-a1a2-c8b3bb9293f3', '/products/product_54.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('dacd9e88-e625-48ce-a8f2-9a5027fedd51', 'EB-HIG-04', 'jabon-aclarante-carowhite-clarifying-soap-180g-ebna-55', 'Jabón Aclarante CaroWhite Clarifying Soap 180g', 'CaroWhite', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4500, 4500, 5000, true, false, 'Jabón aclarante corporal con aceite de zanahoria y complejo iluminador. Limpieza profunda que elimina impurezas y unifica el tono.', '{"primary":"/products/product_55.jfif","gallery":["/products/product_55.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('dacd9e88-e625-48ce-a8f2-9a5027fedd51', '/products/product_55.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('b8037510-a768-49a2-abd8-94794685ae84', 'EB-MODM-46', 'falda-maxi-jersey-cerelina-white-couture-ebna-56', 'Falda Maxi Jersey Cerelina White Couture', 'EBNA Luxury Collection', 'MODA_MUJER', 'Faldas & Tops', 25000, 25000, 28500, true, false, 'Falda larga de punto jersey suave con cintura elástica alta y drapeado fluido. Caída elegante para combinar con tops y camisas.', '{"primary":"/products/product_56.jfif","gallery":["/products/product_56.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('b8037510-a768-49a2-abd8-94794685ae84', '/products/product_56.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('71498cea-2569-4e8b-adf3-ef7e79e977a7', 'EB-MODM-47', 'prenda-exclusiva-ebna-luxury-n-57-ebna-57', 'Prenda Exclusiva EBNA Luxury N°57', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_57.jfif","gallery":["/products/product_57.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('71498cea-2569-4e8b-adf3-ef7e79e977a7', '/products/product_57.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('74eaa277-3ec5-4e87-a47b-09f4730ada33', 'EB-MODM-48', 'chaqueta-blazer-sastre-zara-style-new-collection-edition-ebna-58', 'Chaqueta Blazer Sastre Zara Style New Collection (Edition)', 'Zara', 'MODA_MUJER', 'Chaqueas & Blazers', 32000, 32000, 37000, true, false, 'Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda sastre versátil para elevar cualquier atuendo.', '{"primary":"/products/product_58.jfif","gallery":["/products/product_58.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('74eaa277-3ec5-4e87-a47b-09f4730ada33', '/products/product_58.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('ccce25d7-2c0f-4bf0-a9e1-19365a4a7951', 'EB-MODM-49', 'prenda-exclusiva-ebna-luxury-n-59-ebna-59', 'Prenda Exclusiva EBNA Luxury N°59', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_59.jfif","gallery":["/products/product_59.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('ccce25d7-2c0f-4bf0-a9e1-19365a4a7951', '/products/product_59.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('259612f8-74ae-4e12-ade7-bc54ae03822b', 'EB-MODM-50', 'vestido-satinado-de-noche-zara-luxe-red-ebna-60', 'Vestido Satinado de Noche Zara Luxe Red', 'Zara', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 48000, 48000, 55000, true, false, 'Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.', '{"primary":"/products/product_60.jfif","gallery":["/products/product_60.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('259612f8-74ae-4e12-ade7-bc54ae03822b', '/products/product_60.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('8d8f9257-f205-4855-afa3-9039e2a9aad9', 'EB-CALZ-03', 'sandalias-de-tacon-elegantes-zara-heels-gold-edition-ebna-61', 'Sandalias de Tacón Elegantes Zara Heels Gold Edition', 'Zara', 'CALZADO', 'Zapatos de Tacón', 28000, 28000, 32000, true, false, 'Zapatos de tacón alto con tiras finas cruzadas y cierre de hebilla en el tobillo. Estilo glamuroso para vestidos de fiesta y cóctel.', '{"primary":"/products/product_61.jfif","gallery":["/products/product_61.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('8d8f9257-f205-4855-afa3-9039e2a9aad9', '/products/product_61.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('91f96cff-79bf-4efe-a6f0-667026423302', 'EB-COSM-03', 'exfoliante-labial-nutritivo-de-coco-frambuesa-30g-ebna-62', 'Exfoliante Labial Nutritivo de Coco & Frambuesa 30g', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Exfoliantes & Bálsamos Labiales', 6500, 6500, 7500, true, false, 'Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.', '{"primary":"/products/product_62.jfif","gallery":["/products/product_62.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('91f96cff-79bf-4efe-a6f0-667026423302', '/products/product_62.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('1bb43371-6f84-4f8f-a625-253647ef8300', 'EB-COSM-04', 'exfoliante-labial-nutritivo-de-coco-frambuesa-30g-edition-ebna-63', 'Exfoliante Labial Nutritivo de Coco & Frambuesa 30g (Edition)', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Exfoliantes & Bálsamos Labiales', 6500, 6500, 7500, true, false, 'Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.', '{"primary":"/products/product_63.jfif","gallery":["/products/product_63.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('1bb43371-6f84-4f8f-a625-253647ef8300', '/products/product_63.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('a3a55ad1-e889-4f1b-a908-c6153d8494df', 'EB-COSM-05', 'exfoliante-labial-nutritivo-de-coco-frambuesa-30g-luxury-ebna-64', 'Exfoliante Labial Nutritivo de Coco & Frambuesa 30g (Luxury)', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Exfoliantes & Bálsamos Labiales', 6500, 6500, 7500, true, false, 'Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.', '{"primary":"/products/product_64.jfif","gallery":["/products/product_64.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('a3a55ad1-e889-4f1b-a908-c6153d8494df', '/products/product_64.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('108dca0a-8e0e-4339-a9d1-fd8bb22b1580', 'EB-MODM-51', 'prenda-exclusiva-ebna-luxury-n-65-ebna-65', 'Prenda Exclusiva EBNA Luxury N°65', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_65.jfif","gallery":["/products/product_65.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('108dca0a-8e0e-4339-a9d1-fd8bb22b1580', '/products/product_65.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('9044fa67-e900-48ab-a3de-3baa8a20d74f', 'EB-MODM-52', 'prenda-exclusiva-ebna-luxury-n-66-ebna-66', 'Prenda Exclusiva EBNA Luxury N°66', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_66.jfif","gallery":["/products/product_66.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('9044fa67-e900-48ab-a3de-3baa8a20d74f', '/products/product_66.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('b4a8e097-feb7-42f8-a778-42a22518cadb', 'EB-MODM-53', 'pantalon-leggings-high-waist-levanta-bumbum-noir-ebna-67', 'Pantalón Leggings High Waist Levanta Bumbum Noir', 'EBNA Luxury Collection', 'MODA_MUJER', 'Pantalones & Mallas', 22000, 22000, 25500, true, false, 'Mallas de tiro alto con tecnología de modelado en glúteos y pretina ancha. Tejido elástico denso no transparente.', '{"primary":"/products/product_67.jfif","gallery":["/products/product_67.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('b4a8e097-feb7-42f8-a778-42a22518cadb', '/products/product_67.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('57eb9ae7-cd8d-4cac-af85-9e6a5e14c38b', 'EB-HIG-05', 'gel-de-ducha-lactoadvance-instituto-espanol-1250ml-ebna-68', 'Gel de Ducha Lactoadvance Instituto Español 1250ml', 'Instituto Español', 'HIGIENE_CORPORAL', 'Geles de Baño', 7500, 7500, 8500, true, false, 'Gel de baño dermoprotector enriquecido con proteínas de leche e ingredientes hidratantes. Sensación de limpieza y confort diario.', '{"primary":"/products/product_68.jfif","gallery":["/products/product_68.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('57eb9ae7-cd8d-4cac-af85-9e6a5e14c38b', '/products/product_68.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('734f1e34-154e-432a-a2d0-478fdf72c441', 'EB-MODM-54', 'pantalon-jeans-wide-leg-streetwear-y2k-vintage-wash-ebna-69', 'Pantalón Jeans Wide Leg Streetwear Y2K Vintage Wash', 'EBNA Streetwear', 'MODA_MUJER', 'Pantalones & Mallas', 28000, 28000, 32000, true, false, 'Vaqueros anchos de corte holgado streetwear estilo Y2K con estampado gráfico sutil. Confeccionados en mezclilla rígida de alta calidad.', '{"primary":"/products/product_69.jfif","gallery":["/products/product_69.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('734f1e34-154e-432a-a2d0-478fdf72c441', '/products/product_69.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('faa4cf1d-8df5-4e43-a8e7-cc2cb034134b', 'EB-MODH-01', 'sudadera-oversized-thermal-lined-kangaroo-hoodie-ebna-70', 'Sudadera Oversized Thermal Lined Kangaroo Hoodie', 'EBNA Men', 'MODA_HOMBRE', 'Sudaderas & Hoodies', 22000, 22000, 25500, true, false, 'Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto y aislamiento térmico suave.', '{"primary":"/products/product_70.jfif","gallery":["/products/product_70.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('faa4cf1d-8df5-4e43-a8e7-cc2cb034134b', '/products/product_70.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('6c2d2487-eb42-498c-aafd-4844c4882c0e', 'EB-MODM-55', 'conjunto-deportivo-hooded-crop-top-pantalon-flare-edition-ebna-71', 'Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Edition)', 'EBNA Luxury Collection', 'MODA_MUJER', 'Conjuntos & Sets', 25000, 25000, 28500, true, false, 'Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.', '{"primary":"/products/product_71.jfif","gallery":["/products/product_71.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('6c2d2487-eb42-498c-aafd-4844c4882c0e', '/products/product_71.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('19c1613b-5bce-4a11-af8b-8e2ea3368ac3', 'EB-HIG-06', 'champu-suave-pieles-atopicas-instituto-espanol-300ml-ebna-72', 'Champú Suave Pieles Atópicas Instituto Español 300ml', 'Instituto Español', 'HIGIENE_CORPORAL', 'Champús & Cuidado Capilar', 6500, 6500, 7500, true, false, 'Champú dermo-protector especial para cueros cabelludos sensibles o con tendencia atópica. Limpieza ultrasuave sin sulfatos agresivos.', '{"primary":"/products/product_72.jfif","gallery":["/products/product_72.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('19c1613b-5bce-4a11-af8b-8e2ea3368ac3', '/products/product_72.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('ffccbd9f-b403-45f9-a2e1-5283b85f42f6', 'EB-MODM-56', 'prenda-exclusiva-ebna-luxury-n-73-ebna-73', 'Prenda Exclusiva EBNA Luxury N°73', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_73.jfif","gallery":["/products/product_73.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('ffccbd9f-b403-45f9-a2e1-5283b85f42f6', '/products/product_73.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('2cba2209-16eb-4a2d-a478-d4ffbb71a405', 'EB-HIG-07', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-ebna-74', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_74.jfif","gallery":["/products/product_74.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('2cba2209-16eb-4a2d-a478-d4ffbb71a405', '/products/product_74.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('119bda1d-b65c-43c3-a615-eba1ebca3372', 'EB-CALZ-04', 'botines-kraasa-chelsea-boots-de-cuero-urbano-ebna-75', 'Botines Kraasa Chelsea Boots de Cuero Urbano', 'Kraasa', 'CALZADO', 'Botines & Botas', 32000, 32000, 37000, true, false, 'Botines estilo Chelsea con paneles elásticos laterales y tirador posterior. Cuero sintético resistente y suela dentada antideslizante.', '{"primary":"/products/product_75.jfif","gallery":["/products/product_75.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('119bda1d-b65c-43c3-a615-eba1ebca3372', '/products/product_75.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('4f369495-5e66-4fba-a605-e928afc18c57', 'EB-HIG-08', 'locion-corporal-hidratante-avena-instituto-espanol-edition-ebna-76', 'Loción Corporal Hidratante Avena Instituto Español (Edition)', 'Instituto Español', 'HIGIENE_CORPORAL', 'Lociones Corporales', 9500, 9500, 11000, true, false, 'Loción corporal de formato familiar formulada con extracto de avena 100% natural. 24 horas de hidratación para toda la familia.', '{"primary":"/products/product_76.jfif","gallery":["/products/product_76.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('4f369495-5e66-4fba-a605-e928afc18c57', '/products/product_76.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('9c0e5fbc-4a1a-443b-ae50-a2f707c4fad6', 'EB-MODM-57', 'prenda-exclusiva-ebna-luxury-n-77-ebna-77', 'Prenda Exclusiva EBNA Luxury N°77', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_77.jfif","gallery":["/products/product_77.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('9c0e5fbc-4a1a-443b-ae50-a2f707c4fad6', '/products/product_77.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('6850556b-3d2c-4301-adab-4b84bd09c773', 'EB-ACC-03', 'gorro-de-saten-ajustable-largo-para-trenzas-dreads-ebna-78', 'Gorro de Satén Ajustable Largo para Trenzas & Dreads', 'EBNA Luxury Collection', 'BOLSOS_ACCESORIOS', 'Accesorios de Cabello & Bonnets', 6000, 6000, 7000, true, false, 'Gorro nocturno de satén de seda de doble capa con banda elástica regulable. Protege peinados, evita el encrespamiento y conserva la hidratación.', '{"primary":"/products/product_78.jfif","gallery":["/products/product_78.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('6850556b-3d2c-4301-adab-4b84bd09c773', '/products/product_78.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('977d2fd7-b0fc-4ee5-a763-521f59c9fc9b', 'EB-MODM-58', 'prenda-exclusiva-ebna-luxury-n-79-ebna-79', 'Prenda Exclusiva EBNA Luxury N°79', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_79.jfif","gallery":["/products/product_79.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('977d2fd7-b0fc-4ee5-a763-521f59c9fc9b', '/products/product_79.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('557057e9-0817-4e28-a20b-09f69958bd99', 'EB-COSM-06', 'crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-ebna-80', 'Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)', 'Topicrem', 'COSMETICA_FACIAL', 'Cuidado Facial Anti-Manchas', 22000, 22000, 25500, true, false, 'Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.', '{"primary":"/products/product_80.png","gallery":["/products/product_80.png"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('557057e9-0817-4e28-a20b-09f69958bd99', '/products/product_80.png', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('0c4dda4a-dd22-43ae-a531-83d76021945c', 'EB-HIG-09', 'desodorante-roll-on-nivea-men-black-white-invisible-pack-4x-ebna-81', 'Desodorante Roll-On Nivea Men Black & White Invisible (Pack 4x)', 'Nivea Men', 'HIGIENE_CORPORAL', 'Desodorantes', 7500, 7500, 8500, true, false, 'Pack de desodorantes en roll-on con protección antitranspirante 48h. Fórmula antimanchas blancas en ropa negra y antimanchas amarillas en ropa blanca.', '{"primary":"/products/product_81.jfif","gallery":["/products/product_81.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('0c4dda4a-dd22-43ae-a531-83d76021945c', '/products/product_81.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('e3ca3ecf-6a20-4913-af15-0d183764907a', 'EB-MODH-02', 'pantalon-corto-bermuda-casual-men-s-solid-color-ebna-82', 'Pantalón Corto Bermuda Casual Men''s Solid Color', 'EBNA Men', 'MODA_HOMBRE', 'Bermudas & Shorts', 15000, 15000, 17500, true, false, 'Bermuda de algodón ligero con cintura elástica y cordón ajustable. Bolsillos laterales para un look relajado de verano.', '{"primary":"/products/product_82.jfif","gallery":["/products/product_82.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('e3ca3ecf-6a20-4913-af15-0d183764907a', '/products/product_82.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('c345290e-f30e-427e-a9ad-961516ca1b70', 'EB-MODM-59', 'prenda-exclusiva-ebna-luxury-n-83-ebna-83', 'Prenda Exclusiva EBNA Luxury N°83', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_83.jfif","gallery":["/products/product_83.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('c345290e-f30e-427e-a9ad-961516ca1b70', '/products/product_83.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('113e49b5-f765-4f05-a0c8-f918234f4451', 'EB-MODH-03', 'traje-ejecutivo-de-sastreria-navy-blue-stripe-3-piezas-ebna-84', 'Traje Ejecutivo de Sastrería Navy Blue Stripe 3 Piezas', 'EBNA Men Tailored', 'MODA_HOMBRE', 'Trajes & Sastrería Masculina', 65000, 65000, 75000, true, false, 'Traje formal de corte sastre compuesto por chaqueta, chaleco y pantalón en tejido estructurado con raya diplomática. Elegancia pura.', '{"primary":"/products/product_84.jfif","gallery":["/products/product_84.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('113e49b5-f765-4f05-a0c8-f918234f4451', '/products/product_84.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('c51cd795-1a3b-4d29-a863-f5a41c3c3b17', 'EB-CALZ-05', 'zapatillas-sneakers-nike-dunk-low-wine-red-edition-ebna-85', 'Zapatillas Sneakers Nike Dunk Low Wine Red Edition', 'Nike', 'CALZADO', 'Zapatillas Sneakers', 38000, 38000, 43500, true, false, 'Zapatillas deportivas urbanas icónicas en combinación bicolor rojo vino y blanco. Suela de goma amortiguada y cuero sintético de alta durabilidad.', '{"primary":"/products/product_85.jfif","gallery":["/products/product_85.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('c51cd795-1a3b-4d29-a863-f5a41c3c3b17', '/products/product_85.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('47f991da-37c6-442b-add9-f475ea357fa3', 'EB-HIG-10', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-edition-ebna-86', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Edition)', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_86.jfif","gallery":["/products/product_86.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('47f991da-37c6-442b-add9-f475ea357fa3', '/products/product_86.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f05acb5b-4eb3-4d6b-a6e5-a3791caf83c1', 'EB-MODM-60', 'prenda-exclusiva-ebna-luxury-n-87-ebna-87', 'Prenda Exclusiva EBNA Luxury N°87', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_87.jfif","gallery":["/products/product_87.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f05acb5b-4eb3-4d6b-a6e5-a3791caf83c1', '/products/product_87.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('9da221a8-42ee-4e90-a81b-bfea6ec14a39', 'EB-MODM-61', 'prenda-exclusiva-ebna-luxury-n-88-ebna-88', 'Prenda Exclusiva EBNA Luxury N°88', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_88.jfif","gallery":["/products/product_88.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('9da221a8-42ee-4e90-a81b-bfea6ec14a39', '/products/product_88.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f7f0aeff-090d-4975-a453-852f0baf0f96', 'EB-MODM-62', 'prenda-exclusiva-ebna-luxury-n-89-ebna-89', 'Prenda Exclusiva EBNA Luxury N°89', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_89.jfif","gallery":["/products/product_89.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f7f0aeff-090d-4975-a453-852f0baf0f96', '/products/product_89.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('b7666f00-e00a-4420-a0e2-083931ed58d5', 'EB-HIG-11', 'jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-ebna-90', 'Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x)', 'Palmolive', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 3500, 3500, 4000, true, false, 'Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.', '{"primary":"/products/product_90.jfif","gallery":["/products/product_90.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('b7666f00-e00a-4420-a0e2-083931ed58d5', '/products/product_90.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('0ff4b33d-6416-4b7c-a916-c25e5b08af90', 'EB-MODM-63', 'prenda-exclusiva-ebna-luxury-n-91-ebna-91', 'Prenda Exclusiva EBNA Luxury N°91', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_91.webp","gallery":["/products/product_91.webp"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('0ff4b33d-6416-4b7c-a916-c25e5b08af90', '/products/product_91.webp', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('88997d65-1486-4706-a51b-c74278b868d0', 'EB-HIG-12', 'jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-edition-ebna-92', 'Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x) (Edition)', 'Palmolive', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 3500, 3500, 4000, true, false, 'Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.', '{"primary":"/products/product_92.jfif","gallery":["/products/product_92.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('88997d65-1486-4706-a51b-c74278b868d0', '/products/product_92.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('3f9e7ff6-9749-4d2d-af3c-ec5f10773e3b', 'EB-HIG-13', 'jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-luxury-ebna-93', 'Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x) (Luxury)', 'Palmolive', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 3500, 3500, 4000, true, false, 'Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.', '{"primary":"/products/product_93.jfif","gallery":["/products/product_93.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('3f9e7ff6-9749-4d2d-af3c-ec5f10773e3b', '/products/product_93.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('598d248d-412f-4436-a272-11bc9d08b20d', 'EB-HIG-14', 'gel-de-ducha-lactoadvance-instituto-espanol-1250ml-edition-ebna-94', 'Gel de Ducha Lactoadvance Instituto Español 1250ml (Edition)', 'Instituto Español', 'HIGIENE_CORPORAL', 'Geles de Baño', 7500, 7500, 8500, true, false, 'Gel de baño dermoprotector enriquecido con proteínas de leche e ingredientes hidratantes. Sensación de limpieza y confort diario.', '{"primary":"/products/product_94.jfif","gallery":["/products/product_94.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('598d248d-412f-4436-a272-11bc9d08b20d', '/products/product_94.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('3ebf5a45-019c-477f-a0a6-56743391b305', 'EB-HIG-15', 'jabon-artesanal-crystal-egg-con-aceites-esenciales-120g-ebna-95', 'Jabón Artesanal Crystal Egg con Aceites Esenciales 120g', 'EBNA Spa', 'HIGIENE_CORPORAL', 'Jabones Artesanales', 5500, 5500, 6500, true, false, 'Jabón de lujo en forma de huevo cristalino elaborado con aceites esenciales relajantes e higienizantes. Suavidad y aroma refinado.', '{"primary":"/products/product_95.jfif","gallery":["/products/product_95.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('3ebf5a45-019c-477f-a0a6-56743391b305', '/products/product_95.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('96ce2324-ca90-438e-a453-ece1168ba079', 'EB-CALZ-06', 'zuecos-confort-crocs-original-limited-edition-ebna-96', 'Zuecos Confort Crocs Original Limited Edition', 'Crocs', 'CALZADO', 'Zuecos & Sandalias', 22000, 22000, 25500, true, false, 'Zuecos ultraligeros de espuma Croslite con correa pivoteada en el talón. Máxima ventilación y comodidad resistente al agua para interiores y exteriores.', '{"primary":"/products/product_96.jfif","gallery":["/products/product_96.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('96ce2324-ca90-438e-a453-ece1168ba079', '/products/product_96.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('78180b7d-5d35-4091-a47f-ec995a4fc02a', 'EB-MODM-64', 'conjunto-deportivo-hooded-crop-top-pantalon-flare-luxury-ebna-97', 'Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Luxury)', 'EBNA Luxury Collection', 'MODA_MUJER', 'Conjuntos & Sets', 25000, 25000, 28500, true, false, 'Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.', '{"primary":"/products/product_97.jfif","gallery":["/products/product_97.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('78180b7d-5d35-4091-a47f-ec995a4fc02a', '/products/product_97.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('5a1b809e-2c38-4b9b-aebe-ecd0248a8546', 'EB-MODM-65', 'prenda-exclusiva-ebna-luxury-n-98-ebna-98', 'Prenda Exclusiva EBNA Luxury N°98', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_98.jfif","gallery":["/products/product_98.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('5a1b809e-2c38-4b9b-aebe-ecd0248a8546', '/products/product_98.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('7dc252f4-fc83-4a15-a7c2-3fc016cacd26', 'EB-ACC-04', 'funda-porta-pasaporte-pu-map-pattern-porta-tarjetas-edition-ebna-99', 'Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas (Edition)', 'EBNA Luxury Collection', 'BOLSOS_ACCESORIOS', 'Accesorios de Viaje', 12000, 12000, 14000, true, false, 'Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa mundi. Incluye ranuras para tarjetas e ID.', '{"primary":"/products/product_99.webp","gallery":["/products/product_99.webp"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('7dc252f4-fc83-4a15-a7c2-3fc016cacd26', '/products/product_99.webp', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('bd45970e-b105-475c-aec3-7924ee8b3a17', 'EB-CALZ-07', 'zapatillas-deportivas-puma-speedcat-og-classic-ebna-100', 'Zapatillas Deportivas Puma Speedcat OG Classic', 'Puma', 'CALZADO', 'Zapatillas Sneakers', 35000, 35000, 40500, true, false, 'Diseño clásico de motorsport en ante suave con la emblemática ola de Puma. Ajuste perfilado y suela de perfil bajo de máximo confort.', '{"primary":"/products/product_100.jfif","gallery":["/products/product_100.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('bd45970e-b105-475c-aec3-7924ee8b3a17', '/products/product_100.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('47cd8362-bcb3-4ef7-adc5-71af94ab8984', 'EB-HIG-16', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-luxury-ebna-101', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Luxury)', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_101.jfif","gallery":["/products/product_101.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('47cd8362-bcb3-4ef7-adc5-71af94ab8984', '/products/product_101.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('240430a1-cc12-48a6-a5bd-4c4bf34f1938', 'EB-HIG-17', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-selection-ebna-102', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Selection)', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_102.jfif","gallery":["/products/product_102.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('240430a1-cc12-48a6-a5bd-4c4bf34f1938', '/products/product_102.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('ff1a8e33-292e-441e-a6f2-6f9c15a4caf5', 'EB-HIG-18', 'jabon-corporal-hidratante-miel-avena-nutricion-intensa-100g-ebna-103', 'Jabón Corporal Hidratante Miel & Avena Nutrición Intensa (100g)', 'EBNA Care', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 3500, 3500, 4000, true, false, 'Barra de jabón formulada con miel pura y hojuelas de avena coloidal. Calma pieles sensibles y restaura la barrera cutánea.', '{"primary":"/products/product_103.png","gallery":["/products/product_103.png"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('ff1a8e33-292e-441e-a6f2-6f9c15a4caf5', '/products/product_103.png', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('a3e4ebba-6d11-48c4-a8e2-5156e1d474b0', 'EB-MODM-66', 'prenda-exclusiva-ebna-luxury-n-104-ebna-104', 'Prenda Exclusiva EBNA Luxury N°104', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_104.jfif","gallery":["/products/product_104.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('a3e4ebba-6d11-48c4-a8e2-5156e1d474b0', '/products/product_104.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('1e18631f-7396-4e9f-a462-ffaf2e519b9f', 'EB-HIG-19', 'jabon-galong-naranja-colageno-aclarante-100g-ebna-105', 'Jabón Galong Naranja & Colágeno Aclarante 100g', 'Galong', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 3000, 3000, 3500, true, false, 'Jabón tailandés de extracto concentrado de naranja y colágeno soluble. Aporta vitamina C y elasticidad a la piel durante el baño.', '{"primary":"/products/product_105.png","gallery":["/products/product_105.png"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('1e18631f-7396-4e9f-a462-ffaf2e519b9f', '/products/product_105.png', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f5e5f8e1-e71e-483d-a2e1-6e318a798dc4', 'EB-MODM-67', 'prenda-exclusiva-ebna-luxury-n-106-ebna-106', 'Prenda Exclusiva EBNA Luxury N°106', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_106.jfif","gallery":["/products/product_106.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f5e5f8e1-e71e-483d-a2e1-6e318a798dc4', '/products/product_106.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('e0907862-a7e9-4a36-ad95-9207d25a180c', 'EB-MODH-04', 'pantalon-corto-bermuda-casual-men-s-solid-color-edition-ebna-107', 'Pantalón Corto Bermuda Casual Men''s Solid Color (Edition)', 'EBNA Men', 'MODA_HOMBRE', 'Bermudas & Shorts', 15000, 15000, 17500, true, false, 'Bermuda de algodón ligero con cintura elástica y cordón ajustable. Bolsillos laterales para un look relajado de verano.', '{"primary":"/products/product_107.jfif","gallery":["/products/product_107.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('e0907862-a7e9-4a36-ad95-9207d25a180c', '/products/product_107.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f0302323-df40-4e9b-ad7d-d2516eaf27cd', 'EB-MODM-68', 'prenda-exclusiva-ebna-luxury-n-108-ebna-108', 'Prenda Exclusiva EBNA Luxury N°108', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_108.jfif","gallery":["/products/product_108.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f0302323-df40-4e9b-ad7d-d2516eaf27cd', '/products/product_108.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('396e3e87-097f-49b1-a4cd-cc06ce0d2fba', 'EB-MODM-69', 'prenda-exclusiva-ebna-luxury-n-109-ebna-109', 'Prenda Exclusiva EBNA Luxury N°109', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_109.jfif","gallery":["/products/product_109.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('396e3e87-097f-49b1-a4cd-cc06ce0d2fba', '/products/product_109.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('d062f160-66e3-446f-a28f-401b6559aabb', 'EB-MODM-70', 'prenda-exclusiva-ebna-luxury-n-110-ebna-110', 'Prenda Exclusiva EBNA Luxury N°110', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_110.jfif","gallery":["/products/product_110.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('d062f160-66e3-446f-a28f-401b6559aabb', '/products/product_110.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('03a9ac15-320a-4df1-add8-ffd733e89557', 'EB-COSM-07', 'crema-facial-aclarante-turmeric-face-cream-50g-ebna-111', 'Crema Facial Aclarante Turmeric Face Cream 50g', 'Oceaura', 'COSMETICA_FACIAL', 'Cremas Faciales', 14000, 14000, 16000, true, false, 'Crema hidratante enriquecida con extracto de cúrcuma orgánica y niacinamida. Atenúa hiperpigmentación y restaura la frescura del rostro.', '{"primary":"/products/product_111.jfif","gallery":["/products/product_111.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('03a9ac15-320a-4df1-add8-ffd733e89557', '/products/product_111.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('9aa36a23-5ffe-4dd9-a402-e096723ac0e7', 'EB-MODM-71', 'chaqueta-active-soft-mid-layer-zip-up-black-oh-polly-style-ebna-112', 'Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style', 'Oh Polly', 'MODA_MUJER', 'Chaqueas & Blazers', 27000, 27000, 31000, true, false, 'Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal completa y capucha. Tejido suave de efecto segunda piel.', '{"primary":"/products/product_112.jfif","gallery":["/products/product_112.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('9aa36a23-5ffe-4dd9-a402-e096723ac0e7', '/products/product_112.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('dcc43dcb-50df-406a-ab46-598ad98b2375', 'EB-MODM-72', 'chaqueta-active-soft-mid-layer-zip-up-black-oh-polly-style-edition-ebna-113', 'Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style (Edition)', 'Oh Polly', 'MODA_MUJER', 'Chaqueas & Blazers', 27000, 27000, 31000, true, false, 'Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal completa y capucha. Tejido suave de efecto segunda piel.', '{"primary":"/products/product_113.jfif","gallery":["/products/product_113.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('dcc43dcb-50df-406a-ab46-598ad98b2375', '/products/product_113.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f05e4d5a-e1b1-4de4-aba9-62a0b77d0e53', 'EB-MODM-73', 'prenda-exclusiva-ebna-luxury-n-114-ebna-114', 'Prenda Exclusiva EBNA Luxury N°114', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_114.jfif","gallery":["/products/product_114.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f05e4d5a-e1b1-4de4-aba9-62a0b77d0e53', '/products/product_114.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('444a5bd7-d92e-422a-a24c-1ee3af710bd6', 'EB-MODM-74', 'vestido-veraniego-polka-dot-retro-flared-red-ebna-115', 'Vestido Veraniego Polka Dot Retro Flared Red', 'EBNA Luxury Collection', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 23000, 23000, 26500, true, false, 'Vestido midi de estilo vintage con estampado de lunares y escote con hombros descubiertos. Falda de vuelo ligera y fresca.', '{"primary":"/products/product_115.jfif","gallery":["/products/product_115.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('444a5bd7-d92e-422a-a24c-1ee3af710bd6', '/products/product_115.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('477c66f4-cf67-4ed5-a6cd-4e7d81f9f31c', 'EB-MODM-75', 'prenda-exclusiva-ebna-luxury-n-116-ebna-116', 'Prenda Exclusiva EBNA Luxury N°116', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_116.jfif","gallery":["/products/product_116.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('477c66f4-cf67-4ed5-a6cd-4e7d81f9f31c', '/products/product_116.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('a7e42cbb-0d3e-47e7-a641-bfba4a1a68c5', 'EB-COSM-08', 'crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-edition-ebna-117', 'Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml) (Edition)', 'Topicrem', 'COSMETICA_FACIAL', 'Cuidado Facial Anti-Manchas', 22000, 22000, 25500, true, false, 'Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.', '{"primary":"/products/product_117.jfif","gallery":["/products/product_117.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('a7e42cbb-0d3e-47e7-a641-bfba4a1a68c5', '/products/product_117.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('f5a1c816-c09b-4e6a-a430-0ad1e5c90c97', 'EB-COSM-09', 'crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-luxury-ebna-118', 'Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml) (Luxury)', 'Topicrem', 'COSMETICA_FACIAL', 'Cuidado Facial Anti-Manchas', 22000, 22000, 25500, true, false, 'Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.', '{"primary":"/products/product_118.jfif","gallery":["/products/product_118.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('f5a1c816-c09b-4e6a-a430-0ad1e5c90c97', '/products/product_118.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('327fa153-a0fa-40f1-aebf-9f480d254bbc', 'EB-HIG-20', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-gold-ebna-119', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Gold)', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_119.jfif","gallery":["/products/product_119.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('327fa153-a0fa-40f1-aebf-9f480d254bbc', '/products/product_119.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('be8df515-8a71-4edf-a3e3-6262413a4fbe', 'EB-HIG-21', 'exfoliante-corporal-curcuma-sal-marina-con-aceite-de-jojoba-250g-ebna-120', 'Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g', 'EBNA Spa', 'HIGIENE_CORPORAL', 'Exfoliantes Corporales', 12000, 12000, 14000, true, false, 'Scrub corporal regenerador con sal marina, extracto de cúrcuma y vitamina E. Remueve células muertas dejando la piel sedosa e hidratada.', '{"primary":"/products/product_120.jfif","gallery":["/products/product_120.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('be8df515-8a71-4edf-a3e3-6262413a4fbe', '/products/product_120.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('30ffb68f-a3b5-4ed7-afaa-f6eec9c2e55d', 'EB-HIG-22', 'jabon-vaseline-healthy-bright-vitamin-b3-pack-4x-75g-ebna-121', 'Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g)', 'Vaseline', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 4500, 4500, 5000, true, false, 'Pastillas de jabón enriquecidas con Niacinamida (Vitamina B3) y microgotas de Vaselina Pura. Aportan brillo y nutrición profunda.', '{"primary":"/products/product_121.jfif","gallery":["/products/product_121.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('30ffb68f-a3b5-4ed7-afaa-f6eec9c2e55d', '/products/product_121.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('7bb77390-10ae-441f-a5ea-a4c7451fbc1f', 'EB-HIG-23', 'jabon-vaseline-healthy-bright-vitamin-b3-pack-4x-75g-edition-ebna-122', 'Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g) (Edition)', 'Vaseline', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 4500, 4500, 5000, true, false, 'Pastillas de jabón enriquecidas con Niacinamida (Vitamina B3) y microgotas de Vaselina Pura. Aportan brillo y nutrición profunda.', '{"primary":"/products/product_122.jfif","gallery":["/products/product_122.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('7bb77390-10ae-441f-a5ea-a4c7451fbc1f', '/products/product_122.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('5947cc71-4f0e-4d24-ab61-cbd72ea1dc15', 'EB-COSM-10', 'balsamo-labial-vaseline-lip-therapy-original-4g-ebna-123', 'Bálsamo Labial Vaseline Lip Therapy Original 4g', 'Vaseline', 'COSMETICA_FACIAL', 'Bálsamos Labiales', 3000, 3000, 3500, true, false, 'Protector labial de vaselina pura no grasa. Alivia labios secos o agrietados proporcionando una barrera humectante inmediata.', '{"primary":"/products/product_123.jfif","gallery":["/products/product_123.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('5947cc71-4f0e-4d24-ab61-cbd72ea1dc15', '/products/product_123.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('91673b48-5d0c-4220-ad63-543ce6c35403', 'EB-MODM-76', 'prenda-exclusiva-ebna-luxury-n-124-ebna-124', 'Prenda Exclusiva EBNA Luxury N°124', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_124.jfif","gallery":["/products/product_124.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('91673b48-5d0c-4220-ad63-543ce6c35403', '/products/product_124.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('7da0129a-922a-470c-a184-5b66e2be6382', 'EB-COSM-11', 'lapiz-labial-liquido-velvet-matte-waterproof-long-lasting-edition-ebna-125', 'Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting (Edition)', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Maquillaje de Labios', 9000, 9000, 10500, true, false, 'Pintalabios líquido mate de alta cobertura e intensidad de color. Fórmula intransferible de larga duración hasta 16 horas de fijación.', '{"primary":"/products/product_125.png","gallery":["/products/product_125.png"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('7da0129a-922a-470c-a184-5b66e2be6382', '/products/product_125.png', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('bc7501ac-6d3e-4799-ab1a-9ce119331955', 'EB-MODM-77', 'vestido-satinado-de-noche-zara-luxe-red-edition-ebna-126', 'Vestido Satinado de Noche Zara Luxe Red (Edition)', 'Zara', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 48000, 48000, 55000, true, false, 'Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.', '{"primary":"/products/product_126.jfif","gallery":["/products/product_126.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('bc7501ac-6d3e-4799-ab1a-9ce119331955', '/products/product_126.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('3dc4e106-dabe-42c1-a9e0-d312fad2445d', 'EB-MODM-78', 'vestido-satinado-de-noche-zara-luxe-red-luxury-ebna-127', 'Vestido Satinado de Noche Zara Luxe Red (Luxury)', 'Zara', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 48000, 48000, 55000, true, false, 'Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.', '{"primary":"/products/product_127.jfif","gallery":["/products/product_127.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('3dc4e106-dabe-42c1-a9e0-d312fad2445d', '/products/product_127.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('735e8871-5903-4e32-a24f-7ebc6fd1d5b4', 'EB-HIG-24', 'exfoliante-corporal-curcuma-sal-marina-con-aceite-de-jojoba-250g-edition-ebna-128', 'Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g (Edition)', 'EBNA Spa', 'HIGIENE_CORPORAL', 'Exfoliantes Corporales', 12000, 12000, 14000, true, false, 'Scrub corporal regenerador con sal marina, extracto de cúrcuma y vitamina E. Remueve células muertas dejando la piel sedosa e hidratada.', '{"primary":"/products/product_128.jfif","gallery":["/products/product_128.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('735e8871-5903-4e32-a24f-7ebc6fd1d5b4', '/products/product_128.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('87092c09-bc69-40f4-aa3c-fd0f985948d7', 'EB-MODM-79', 'prenda-exclusiva-ebna-luxury-n-129-ebna-129', 'Prenda Exclusiva EBNA Luxury N°129', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_129.jfif","gallery":["/products/product_129.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('87092c09-bc69-40f4-aa3c-fd0f985948d7', '/products/product_129.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('2ad9430f-f934-4058-a5f8-44493f3d21ba', 'EB-CALZ-08', 'bailarinas-malla-calada-woven-mary-jane-flats-ebna-130', 'Bailarinas Malla Calada Woven Mary Jane Flats', 'EBNA Luxury Collection', 'CALZADO', 'Bailarinas & Zapatos Planos', 24000, 24000, 27500, true, false, 'Calzado plano de malla calada con hebilla ajustable sobre el empeine. Diseño fresco, flexible y transpirable para clima cálido.', '{"primary":"/products/product_130.jfif","gallery":["/products/product_130.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('2ad9430f-f934-4058-a5f8-44493f3d21ba', '/products/product_130.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('aaa5d7fa-fc44-4de1-a717-c8f9009c1eb6', 'EB-CALZ-09', 'bailarinas-elegantes-encaje-floral-ollio-paris-edition-ebna-131', 'Bailarinas Elegantes Encaje Floral Ollio Paris (Edition)', 'Ollio Paris', 'CALZADO', 'Bailarinas & Zapatos Planos', 22000, 22000, 25500, true, false, 'Zapatos planos estilo bailarina confeccionados en encaje floral transpirable. Plantilla acolchada suave ideal para eventos y oficina.', '{"primary":"/products/product_131.jfif","gallery":["/products/product_131.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('aaa5d7fa-fc44-4de1-a717-c8f9009c1eb6', '/products/product_131.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('e9e1017e-8bac-4afc-a6e3-cef13a5a24f0', 'EB-MODM-80', 'prenda-exclusiva-ebna-luxury-n-132-ebna-132', 'Prenda Exclusiva EBNA Luxury N°132', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_132.jfif","gallery":["/products/product_132.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('e9e1017e-8bac-4afc-a6e3-cef13a5a24f0', '/products/product_132.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('73f03d92-e50a-4300-a818-ab8f8f858f3f', 'EB-CALZ-10', 'bailarinas-malla-calada-woven-mary-jane-flats-edition-ebna-133', 'Bailarinas Malla Calada Woven Mary Jane Flats (Edition)', 'EBNA Luxury Collection', 'CALZADO', 'Bailarinas & Zapatos Planos', 24000, 24000, 27500, true, false, 'Calzado plano de malla calada con hebilla ajustable sobre el empeine. Diseño fresco, flexible y transpirable para clima cálido.', '{"primary":"/products/product_133.jfif","gallery":["/products/product_133.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('73f03d92-e50a-4300-a818-ab8f8f858f3f', '/products/product_133.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('7aa495fa-a01e-4314-a57e-6b7b80889218', 'EB-CALZ-11', 'sandalias-de-tacon-elegantes-zara-heels-gold-edition-edition-ebna-134', 'Sandalias de Tacón Elegantes Zara Heels Gold Edition (Edition)', 'Zara', 'CALZADO', 'Zapatos de Tacón', 28000, 28000, 32000, true, false, 'Zapatos de tacón alto con tiras finas cruzadas y cierre de hebilla en el tobillo. Estilo glamuroso para vestidos de fiesta y cóctel.', '{"primary":"/products/product_134.jfif","gallery":["/products/product_134.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('7aa495fa-a01e-4314-a57e-6b7b80889218', '/products/product_134.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('197cd39d-1083-4ae3-a85f-3ba3aa028978', 'EB-PERF-01', 'zara-red-vanilla-eau-de-toilette-ebna-135', 'Zara Red Vanilla Eau de Toilette', 'Zara', 'PERFUMERIA', 'Perfumes Femeninos', 32000, 32000, 37000, true, false, 'Fragancia femenina icónica de la colección Zara. Notas cálidas de vainilla, flor de peonía y pera dulce. Elegancia sofisticada de larga duración.', '{"primary":"/products/product_135.png","gallery":["/products/product_135.png"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('197cd39d-1083-4ae3-a85f-3ba3aa028978', '/products/product_135.png', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('a6b7eeb9-bd18-4334-a7db-bf4ee0c51b73', 'EB-MODM-81', 'prenda-exclusiva-ebna-luxury-n-136-ebna-136', 'Prenda Exclusiva EBNA Luxury N°136', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_136.jfif","gallery":["/products/product_136.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('a6b7eeb9-bd18-4334-a7db-bf4ee0c51b73', '/products/product_136.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('7bf4764b-ad2e-4d66-a55a-6f6ce5f2892d', 'EB-PERF-02', 'zara-red-vanilla-eau-de-toilette-edition-ebna-137', 'Zara Red Vanilla Eau de Toilette (Edition)', 'Zara', 'PERFUMERIA', 'Perfumes Femeninos', 32000, 32000, 37000, true, false, 'Fragancia femenina icónica de la colección Zara. Notas cálidas de vainilla, flor de peonía y pera dulce. Elegancia sofisticada de larga duración.', '{"primary":"/products/product_137.jfif","gallery":["/products/product_137.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('7bf4764b-ad2e-4d66-a55a-6f6ce5f2892d', '/products/product_137.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('7ef81be0-1f8f-4986-a06f-0a2a60a0e41b', 'EB-MODM-82', 'prenda-exclusiva-ebna-luxury-n-138-ebna-138', 'Prenda Exclusiva EBNA Luxury N°138', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_138.jfif","gallery":["/products/product_138.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('7ef81be0-1f8f-4986-a06f-0a2a60a0e41b', '/products/product_138.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('30a3de23-437d-46c7-a17c-e790e8c0eee3', 'EB-MODM-83', 'prenda-exclusiva-ebna-luxury-n-139-ebna-139', 'Prenda Exclusiva EBNA Luxury N°139', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_139.jfif","gallery":["/products/product_139.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('30a3de23-437d-46c7-a17c-e790e8c0eee3', '/products/product_139.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('9793d54d-4b58-490a-a881-095e577aa17e', 'EB-MODM-84', 'prenda-exclusiva-ebna-luxury-n-140-ebna-140', 'Prenda Exclusiva EBNA Luxury N°140', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_140.jfif","gallery":["/products/product_140.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('9793d54d-4b58-490a-a881-095e577aa17e', '/products/product_140.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('5f6a4987-db20-4c56-a143-3f3a0f914620', 'EB-MODH-05', 'sudadera-oversized-thermal-lined-kangaroo-hoodie-edition-ebna-141', 'Sudadera Oversized Thermal Lined Kangaroo Hoodie (Edition)', 'EBNA Men', 'MODA_HOMBRE', 'Sudaderas & Hoodies', 22000, 22000, 25500, true, false, 'Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto y aislamiento térmico suave.', '{"primary":"/products/product_141.jfif","gallery":["/products/product_141.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('5f6a4987-db20-4c56-a143-3f3a0f914620', '/products/product_141.jfif', TRUE, 0);

INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('ea5dfa42-0a7f-4c0c-a7b8-b5bb9f3cb4a2', 'EB-MODM-85', 'prenda-exclusiva-ebna-luxury-n-142-ebna-142', 'Prenda Exclusiva EBNA Luxury N°142', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_142.jfif","gallery":["/products/product_142.jfif"]}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('ea5dfa42-0a7f-4c0c-a7b8-b5bb9f3cb4a2', '/products/product_142.jfif', TRUE, 0);
