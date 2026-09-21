-- ====================================================================
-- EBNA LUXURY - RELATIONAL DATABASE SCHEMA & FULL SEED DATA (SUPABASE)
-- ====================================================================

-- 1. DROP EXISTING TABLES (IF RE-INITIALIZING)
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;

-- 2. CREATE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. SYSTEM SETTINGS TABLE (EXPRESS SHIPPING, PHONES, METADATA)
CREATE TABLE system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Shipping & Operational Settings
INSERT INTO system_settings (key, value, description) VALUES
('express_shipping_cost', '3000'::jsonb, 'Costo de envío express en FCFA'),
('normal_shipping_cost', '0'::jsonb, 'Costo de envío normal en FCFA'),
('whatsapp_phone', '"240222633687"'::jsonb, 'Número principal de WhatsApp'),
('muni_phone', '"240555439904"'::jsonb, 'Número de Muni Dinero');

-- 4. CATEGORIES TABLE (RELATIONAL MASTER TABLE)
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (id, name, description, icon_name) VALUES
('MODA_MUJER', 'Moda Mujer', 'Vestidos, monos, conjuntos y alta costura femenina', 'Heart'),
('MODA_HOMBRE', 'Moda Hombre', 'Trajes, chaquetas, camisas y moda urbana masculina', 'User'),
('CALZADO', 'Calzado & Sneakers', 'Zapatillas deportivas, tacones de aguja y calzado de lujo', 'Footprints'),
('BOLSOS_ACCESORIOS', 'Bolsos & Accesorios', 'Bolsos de piel, joyería, gafas de sol y cinturones', 'ShoppingBag'),
('PERFUMERIA', 'Perfumería de Lujo', 'Fragancias exclusivas, perfumes de autor y eau de parfum', 'Flame'),
('COSMETICA_FACIAL', 'Cosmética Facial', 'Tratamientos antiedad, sueros, cremas iluminadoras y cuidado facial', 'Sparkle'),
('HIGIENE_CORPORAL', 'Higiene Corporal & Jabones', 'Lociones hidratantes, jabones de tocador y geles aromáticos', 'Droplets');

-- 5. BRANDS TABLE (RELATIONAL MASTER TABLE)
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

-- 6. MAIN PRODUCTS TABLE (RELATIONAL PRIMARY KEY & FOREIGN KEYS)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) DEFAULT 'EBNA Luxury Collection',
    category VARCHAR(50) NOT NULL REFERENCES categories(id) ON UPDATE CASCADE,
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
    colors TEXT[],
    sizes TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_in_stock ON products(in_stock);

-- 7. RELATIONAL PRODUCT IMAGES TABLE (FOREIGN KEY -> PRODUCTS)
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- 8. RELATIONAL PRODUCT VARIANTS TABLE (FOREIGN KEY -> PRODUCTS)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(20),
    color VARCHAR(50),
    stock_quantity INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);

-- 9. DISABLE RLS TO ALLOW FULL PUBLIC/ANON READ/WRITE/DELETE ON SUPABASE
ALTER TABLE system_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE brands DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants DISABLE ROW LEVEL SECURITY;

-- 10. INSERT ALL 142 PRODUCTS & RELATIONAL CHILD RECORDS

-- Product 1: Sneakers Urbanos Bicolor Sports Men's Edition
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('af800363-4859-4758-a9bc-888905d1e794', 'EB-CALZ-01', 'sneakers-urbanos-bicolor-sports-men-s-edition-ebna-1', 'Sneakers Urbanos Bicolor Sports Men''s Edition', 'EBNA Luxury Collection', 'CALZADO', 'Zapatillas Sneakers', 28000, 28000, 32000, true, true, 'Zapatillas deportivas con paneles de malla transpirable y suela amortiguada. Ideales para combinar con jeans o ropa deportiva urbana.', '{"primary":"/products/product_1.jfif","gallery":["/products/product_1.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('af800363-4859-4758-a9bc-888905d1e794', '/products/product_1.jfif', TRUE, 0);

-- Product 2: Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('8b5f33dd-7731-4f30-a34c-66a8e12e21af', 'EB-ACC-01', 'funda-porta-pasaporte-pu-map-pattern-porta-tarjetas-ebna-2', 'Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas', 'EBNA Luxury Collection', 'BOLSOS_ACCESORIOS', 'Accesorios de Viaje', 12000, 12000, 14000, true, true, 'Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa mundi. Incluye ranuras para tarjetas e ID.', '{"primary":"/products/product_2.jfif","gallery":["/products/product_2.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('8b5f33dd-7731-4f30-a34c-66a8e12e21af', '/products/product_2.jfif', TRUE, 0);

-- Product 3: Conjunto Deportivo Hooded Crop Top & Pantalón Flare
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('adcb73b4-8f4a-495a-a5c0-75bfe21c3b19', 'EB-MODM-01', 'conjunto-deportivo-hooded-crop-top-pantalon-flare-ebna-3', 'Conjunto Deportivo Hooded Crop Top & Pantalón Flare', 'EBNA Luxury Collection', 'MODA_MUJER', 'Conjuntos & Sets', 25000, 25000, 28500, true, true, 'Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.', '{"primary":"/products/product_3.jfif","gallery":["/products/product_3.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('adcb73b4-8f4a-495a-a5c0-75bfe21c3b19', '/products/product_3.jfif', TRUE, 0);

-- Product 4: Prenda Exclusiva EBNA Luxury N°4
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('9daf0ea5-bc06-4b1c-a17b-784d0419356f', 'EB-MODM-02', 'prenda-exclusiva-ebna-luxury-n-4-ebna-4', 'Prenda Exclusiva EBNA Luxury N°4', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_4.jfif","gallery":["/products/product_4.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('9daf0ea5-bc06-4b1c-a17b-784d0419356f', '/products/product_4.jfif', TRUE, 0);

-- Product 5: Prenda Exclusiva EBNA Luxury N°5
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('20c54840-6652-41b4-a631-80554a94c1e5', 'EB-MODM-03', 'prenda-exclusiva-ebna-luxury-n-5-ebna-5', 'Prenda Exclusiva EBNA Luxury N°5', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_5.jfif","gallery":["/products/product_5.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('20c54840-6652-41b4-a631-80554a94c1e5', '/products/product_5.jfif', TRUE, 0);

-- Product 6: Prenda Exclusiva EBNA Luxury N°6
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('8c0a6906-8b3a-4ec1-a073-a64280afa77d', 'EB-MODM-04', 'prenda-exclusiva-ebna-luxury-n-6-ebna-6', 'Prenda Exclusiva EBNA Luxury N°6', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_6.jfif","gallery":["/products/product_6.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('8c0a6906-8b3a-4ec1-a073-a64280afa77d', '/products/product_6.jfif', TRUE, 0);

-- Product 7: Prenda Exclusiva EBNA Luxury N°7
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('cf79105c-fbfc-42b6-a1ae-54721cdd8d00', 'EB-MODM-05', 'prenda-exclusiva-ebna-luxury-n-7-ebna-7', 'Prenda Exclusiva EBNA Luxury N°7', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_7.jfif","gallery":["/products/product_7.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('cf79105c-fbfc-42b6-a1ae-54721cdd8d00', '/products/product_7.jfif', TRUE, 0);

-- Product 8: Prenda Exclusiva EBNA Luxury N°8
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('3958ef22-2dee-4436-abc3-fc8ace0a7f4e', 'EB-MODM-06', 'prenda-exclusiva-ebna-luxury-n-8-ebna-8', 'Prenda Exclusiva EBNA Luxury N°8', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, true, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_8.jfif","gallery":["/products/product_8.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('3958ef22-2dee-4436-abc3-fc8ace0a7f4e', '/products/product_8.jfif', TRUE, 0);

-- Product 9: Prenda Exclusiva EBNA Luxury N°9
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('2e3598d8-b31a-4bb5-a57f-b58bac76e32e', 'EB-MODM-07', 'prenda-exclusiva-ebna-luxury-n-9-ebna-9', 'Prenda Exclusiva EBNA Luxury N°9', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_9.jfif","gallery":["/products/product_9.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('2e3598d8-b31a-4bb5-a57f-b58bac76e32e', '/products/product_9.jfif', TRUE, 0);

-- Product 10: Prenda Exclusiva EBNA Luxury N°10
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('4838ce62-4efd-42ae-ac38-5634dd67c6a1', 'EB-MODM-08', 'prenda-exclusiva-ebna-luxury-n-10-ebna-10', 'Prenda Exclusiva EBNA Luxury N°10', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_10.jfif","gallery":["/products/product_10.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('4838ce62-4efd-42ae-ac38-5634dd67c6a1', '/products/product_10.jfif', TRUE, 0);

-- Product 11: Prenda Exclusiva EBNA Luxury N°11
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d4ef673a-b252-4fcb-a126-86d91f20ab45', 'EB-MODM-09', 'prenda-exclusiva-ebna-luxury-n-11-ebna-11', 'Prenda Exclusiva EBNA Luxury N°11', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_11.jfif","gallery":["/products/product_11.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d4ef673a-b252-4fcb-a126-86d91f20ab45', '/products/product_11.jfif', TRUE, 0);

-- Product 12: Jabón de Tocador Palmolive Naturals Extractos Herbales (Pack 12 x 90g)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('942ba535-862a-43fa-ab01-6fecf2efe9fc', 'EB-HIG-01', 'jabon-de-tocador-palmolive-naturals-extractos-herbales-pack-12-x-90g-ebna-12', 'Jabón de Tocador Palmolive Naturals Extractos Herbales (Pack 12 x 90g)', 'Palmolive', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 8500, 8500, 10000, true, false, 'Pack familiar de jabones enriquecidos con extractos herbales purificantes y aceites vegetales. Aroma fresco y limpieza suave diaria.', '{"primary":"/products/product_12.jfif","gallery":["/products/product_12.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('942ba535-862a-43fa-ab01-6fecf2efe9fc', '/products/product_12.jfif', TRUE, 0);

-- Product 13: Prenda Exclusiva EBNA Luxury N°13
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('40422316-383e-4cd8-a440-1535176a4599', 'EB-MODM-10', 'prenda-exclusiva-ebna-luxury-n-13-ebna-13', 'Prenda Exclusiva EBNA Luxury N°13', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_13.jfif","gallery":["/products/product_13.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('40422316-383e-4cd8-a440-1535176a4599', '/products/product_13.jfif', TRUE, 0);

-- Product 14: Prenda Exclusiva EBNA Luxury N°14
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('13c70137-4434-491a-a79b-6eba486f56c3', 'EB-MODM-11', 'prenda-exclusiva-ebna-luxury-n-14-ebna-14', 'Prenda Exclusiva EBNA Luxury N°14', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_14.jfif","gallery":["/products/product_14.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('13c70137-4434-491a-a79b-6eba486f56c3', '/products/product_14.jfif', TRUE, 0);

-- Product 15: Prenda Exclusiva EBNA Luxury N°15
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('e53fb96b-6e97-4317-a211-92097db6d718', 'EB-MODM-12', 'prenda-exclusiva-ebna-luxury-n-15-ebna-15', 'Prenda Exclusiva EBNA Luxury N°15', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_15.jfif","gallery":["/products/product_15.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('e53fb96b-6e97-4317-a211-92097db6d718', '/products/product_15.jfif', TRUE, 0);

-- Product 16: Prenda Exclusiva EBNA Luxury N°16
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('c9ab44e6-27ef-41a3-af75-3a1e59645c06', 'EB-MODM-13', 'prenda-exclusiva-ebna-luxury-n-16-ebna-16', 'Prenda Exclusiva EBNA Luxury N°16', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_16.jfif","gallery":["/products/product_16.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('c9ab44e6-27ef-41a3-af75-3a1e59645c06', '/products/product_16.jfif', TRUE, 0);

-- Product 17: Prenda Exclusiva EBNA Luxury N°17
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('fd8db26b-0a36-48d2-af06-3d533e5eff80', 'EB-MODM-14', 'prenda-exclusiva-ebna-luxury-n-17-ebna-17', 'Prenda Exclusiva EBNA Luxury N°17', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_17.jfif","gallery":["/products/product_17.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('fd8db26b-0a36-48d2-af06-3d533e5eff80', '/products/product_17.jfif', TRUE, 0);

-- Product 18: Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('325a997a-d52c-4c53-a52d-ccafff4f88f2', 'EB-MODM-15', 'pack-2x-leggings-elasticos-maternidad-confort-ultra-soft-ebna-18', 'Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft', 'EBNA Maternity', 'MODA_MUJER', 'Pantalones & Mallas', 18000, 18000, 20500, true, false, 'Pack de 2 mallas de premamá con pretina alta sobre la barriga en tejido elástico transpirable. Soporte suave sin oprimir.', '{"primary":"/products/product_18.jfif","gallery":["/products/product_18.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('325a997a-d52c-4c53-a52d-ccafff4f88f2', '/products/product_18.jfif', TRUE, 0);

-- Product 19: Prenda Exclusiva EBNA Luxury N°19
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('cec90876-ae60-4204-a89f-d3f4be4c51cb', 'EB-MODM-16', 'prenda-exclusiva-ebna-luxury-n-19-ebna-19', 'Prenda Exclusiva EBNA Luxury N°19', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_19.jfif","gallery":["/products/product_19.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('cec90876-ae60-4204-a89f-d3f4be4c51cb', '/products/product_19.jfif', TRUE, 0);

-- Product 20: Prenda Exclusiva EBNA Luxury N°20
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('5e296700-2fd0-4ae2-a752-7b9bc62a1368', 'EB-MODM-17', 'prenda-exclusiva-ebna-luxury-n-20-ebna-20', 'Prenda Exclusiva EBNA Luxury N°20', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_20.jfif","gallery":["/products/product_20.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('5e296700-2fd0-4ae2-a752-7b9bc62a1368', '/products/product_20.jfif', TRUE, 0);

-- Product 21: Gafas de Sol Classic Square Unisex Filtro Luz Azul (Pack 3x)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d673f31a-3872-436a-a181-49dace26f99f', 'EB-ACC-02', 'gafas-de-sol-classic-square-unisex-filtro-luz-azul-pack-3x-ebna-21', 'Gafas de Sol Classic Square Unisex Filtro Luz Azul (Pack 3x)', 'EBNA Eyewear', 'BOLSOS_ACCESORIOS', 'Gafas de Sol & Monturas', 16000, 16000, 18500, true, false, 'Pack de 3 gafas unisex con montura cuadrada negra ultraligera y lentes con filtro protector de luz azul para ordenadores y móviles.', '{"primary":"/products/product_21.jfif","gallery":["/products/product_21.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d673f31a-3872-436a-a181-49dace26f99f', '/products/product_21.jfif', TRUE, 0);

-- Product 22: Prenda Exclusiva EBNA Luxury N°22
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('89f6c3e9-08fd-4aae-a548-dd836f000c07', 'EB-MODM-18', 'prenda-exclusiva-ebna-luxury-n-22-ebna-22', 'Prenda Exclusiva EBNA Luxury N°22', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_22.jfif","gallery":["/products/product_22.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('89f6c3e9-08fd-4aae-a548-dd836f000c07', '/products/product_22.jfif', TRUE, 0);

-- Product 23: Prenda Exclusiva EBNA Luxury N°23
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('011b3c6e-27d9-4bd8-a687-9c013b8694dd', 'EB-MODM-19', 'prenda-exclusiva-ebna-luxury-n-23-ebna-23', 'Prenda Exclusiva EBNA Luxury N°23', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_23.jfif","gallery":["/products/product_23.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('011b3c6e-27d9-4bd8-a687-9c013b8694dd', '/products/product_23.jfif', TRUE, 0);

-- Product 24: Prenda Exclusiva EBNA Luxury N°24
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('6224fffa-32e4-4de0-a623-baa3861fba5b', 'EB-MODM-20', 'prenda-exclusiva-ebna-luxury-n-24-ebna-24', 'Prenda Exclusiva EBNA Luxury N°24', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_24.jfif","gallery":["/products/product_24.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('6224fffa-32e4-4de0-a623-baa3861fba5b', '/products/product_24.jfif', TRUE, 0);

-- Product 25: Prenda Exclusiva EBNA Luxury N°25
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('273585f5-c622-4e3d-a97b-3a219d75e86c', 'EB-MODM-21', 'prenda-exclusiva-ebna-luxury-n-25-ebna-25', 'Prenda Exclusiva EBNA Luxury N°25', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_25.jfif","gallery":["/products/product_25.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('273585f5-c622-4e3d-a97b-3a219d75e86c', '/products/product_25.jfif', TRUE, 0);

-- Product 26: Chaqueta Blazer Sastre Zara Style New Collection
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('a7dd03cf-c79e-44af-a04f-e48392017dc0', 'EB-MODM-22', 'chaqueta-blazer-sastre-zara-style-new-collection-ebna-26', 'Chaqueta Blazer Sastre Zara Style New Collection', 'Zara', 'MODA_MUJER', 'Chaqueas & Blazers', 32000, 32000, 37000, true, false, 'Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda sastre versátil para elevar cualquier atuendo.', '{"primary":"/products/product_26.jfif","gallery":["/products/product_26.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('a7dd03cf-c79e-44af-a04f-e48392017dc0', '/products/product_26.jfif', TRUE, 0);

-- Product 27: Prenda Exclusiva EBNA Luxury N°27
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('7b2b0dba-2f0c-41b8-a695-adbea34ff957', 'EB-MODM-23', 'prenda-exclusiva-ebna-luxury-n-27-ebna-27', 'Prenda Exclusiva EBNA Luxury N°27', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_27.jfif","gallery":["/products/product_27.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('7b2b0dba-2f0c-41b8-a695-adbea34ff957', '/products/product_27.jfif', TRUE, 0);

-- Product 28: Prenda Exclusiva EBNA Luxury N°28
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('f9bf6d40-2506-4588-ad8f-adddd1d75395', 'EB-MODM-24', 'prenda-exclusiva-ebna-luxury-n-28-ebna-28', 'Prenda Exclusiva EBNA Luxury N°28', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_28.jfif","gallery":["/products/product_28.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('f9bf6d40-2506-4588-ad8f-adddd1d75395', '/products/product_28.jfif', TRUE, 0);

-- Product 29: Prenda Exclusiva EBNA Luxury N°29
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('02aa7187-3a38-4306-aab0-d71926f99a88', 'EB-MODM-25', 'prenda-exclusiva-ebna-luxury-n-29-ebna-29', 'Prenda Exclusiva EBNA Luxury N°29', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_29.jfif","gallery":["/products/product_29.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('02aa7187-3a38-4306-aab0-d71926f99a88', '/products/product_29.jfif', TRUE, 0);

-- Product 30: Prenda Exclusiva EBNA Luxury N°30
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('e78df00b-8a65-4ea0-a474-5ad907e6dda5', 'EB-MODM-26', 'prenda-exclusiva-ebna-luxury-n-30-ebna-30', 'Prenda Exclusiva EBNA Luxury N°30', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_30.jfif","gallery":["/products/product_30.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('e78df00b-8a65-4ea0-a474-5ad907e6dda5', '/products/product_30.jfif', TRUE, 0);

-- Product 31: Prenda Exclusiva EBNA Luxury N°31
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d8518501-c5bf-4218-a45c-d4ddfcb6cd87', 'EB-MODM-27', 'prenda-exclusiva-ebna-luxury-n-31-ebna-31', 'Prenda Exclusiva EBNA Luxury N°31', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_31.jfif","gallery":["/products/product_31.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d8518501-c5bf-4218-a45c-d4ddfcb6cd87', '/products/product_31.jfif', TRUE, 0);

-- Product 32: Prenda Exclusiva EBNA Luxury N°32
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('fa919bbc-73d7-43fb-a874-a5f71ffb2400', 'EB-MODM-28', 'prenda-exclusiva-ebna-luxury-n-32-ebna-32', 'Prenda Exclusiva EBNA Luxury N°32', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_32.jfif","gallery":["/products/product_32.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('fa919bbc-73d7-43fb-a874-a5f71ffb2400', '/products/product_32.jfif', TRUE, 0);

-- Product 33: Prenda Exclusiva EBNA Luxury N°33
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('5095a8e6-0299-4c3f-aae7-3bfb159dad7d', 'EB-MODM-29', 'prenda-exclusiva-ebna-luxury-n-33-ebna-33', 'Prenda Exclusiva EBNA Luxury N°33', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_33.jfif","gallery":["/products/product_33.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('5095a8e6-0299-4c3f-aae7-3bfb159dad7d', '/products/product_33.jfif', TRUE, 0);

-- Product 34: Prenda Exclusiva EBNA Luxury N°34
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('310b8055-3557-46cc-a21f-00587f1abc6e', 'EB-MODM-30', 'prenda-exclusiva-ebna-luxury-n-34-ebna-34', 'Prenda Exclusiva EBNA Luxury N°34', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_34.jfif","gallery":["/products/product_34.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('310b8055-3557-46cc-a21f-00587f1abc6e', '/products/product_34.jfif', TRUE, 0);

-- Product 35: Prenda Exclusiva EBNA Luxury N°35
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('52ffc602-2b84-471d-a2c4-b11235095430', 'EB-MODM-31', 'prenda-exclusiva-ebna-luxury-n-35-ebna-35', 'Prenda Exclusiva EBNA Luxury N°35', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_35.jfif","gallery":["/products/product_35.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('52ffc602-2b84-471d-a2c4-b11235095430', '/products/product_35.jfif', TRUE, 0);

-- Product 36: Prenda Exclusiva EBNA Luxury N°36
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('7c5693e8-f41f-4165-a61b-f5a45d789d05', 'EB-MODM-32', 'prenda-exclusiva-ebna-luxury-n-36-ebna-36', 'Prenda Exclusiva EBNA Luxury N°36', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_36.jfif","gallery":["/products/product_36.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('7c5693e8-f41f-4165-a61b-f5a45d789d05', '/products/product_36.jfif', TRUE, 0);

-- Product 37: Prenda Exclusiva EBNA Luxury N°37
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('688c824b-c4dc-486d-a9f2-0717ad698a84', 'EB-MODM-33', 'prenda-exclusiva-ebna-luxury-n-37-ebna-37', 'Prenda Exclusiva EBNA Luxury N°37', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_37.jfif","gallery":["/products/product_37.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('688c824b-c4dc-486d-a9f2-0717ad698a84', '/products/product_37.jfif', TRUE, 0);

-- Product 38: Prenda Exclusiva EBNA Luxury N°38
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('65491c38-c195-4603-a193-00ea19e197c1', 'EB-MODM-34', 'prenda-exclusiva-ebna-luxury-n-38-ebna-38', 'Prenda Exclusiva EBNA Luxury N°38', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_38.jfif","gallery":["/products/product_38.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('65491c38-c195-4603-a193-00ea19e197c1', '/products/product_38.jfif', TRUE, 0);

-- Product 39: Prenda Exclusiva EBNA Luxury N°39
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('b332f389-e256-497f-af0b-3a571b997138', 'EB-MODM-35', 'prenda-exclusiva-ebna-luxury-n-39-ebna-39', 'Prenda Exclusiva EBNA Luxury N°39', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_39.jfif","gallery":["/products/product_39.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('b332f389-e256-497f-af0b-3a571b997138', '/products/product_39.jfif', TRUE, 0);

-- Product 40: Prenda Exclusiva EBNA Luxury N°40
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('8a813c58-3925-4c1f-a5dd-f2bf894edb63', 'EB-MODM-36', 'prenda-exclusiva-ebna-luxury-n-40-ebna-40', 'Prenda Exclusiva EBNA Luxury N°40', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_40.jfif","gallery":["/products/product_40.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('8a813c58-3925-4c1f-a5dd-f2bf894edb63', '/products/product_40.jfif', TRUE, 0);

-- Product 41: Prenda Exclusiva EBNA Luxury N°41
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('bd06b1b2-2e19-4178-a612-7e15af2633d2', 'EB-MODM-37', 'prenda-exclusiva-ebna-luxury-n-41-ebna-41', 'Prenda Exclusiva EBNA Luxury N°41', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_41.jfif","gallery":["/products/product_41.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('bd06b1b2-2e19-4178-a612-7e15af2633d2', '/products/product_41.jfif', TRUE, 0);

-- Product 42: Prenda Exclusiva EBNA Luxury N°42
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('9c87da13-0cc2-4342-a1fc-b9e33a04e01b', 'EB-MODM-38', 'prenda-exclusiva-ebna-luxury-n-42-ebna-42', 'Prenda Exclusiva EBNA Luxury N°42', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_42.jfif","gallery":["/products/product_42.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('9c87da13-0cc2-4342-a1fc-b9e33a04e01b', '/products/product_42.jfif', TRUE, 0);

-- Product 43: Prenda Exclusiva EBNA Luxury N°43
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('5ca0906a-dc5c-43e3-aa9e-df35d741b6c6', 'EB-MODM-39', 'prenda-exclusiva-ebna-luxury-n-43-ebna-43', 'Prenda Exclusiva EBNA Luxury N°43', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_43.webp","gallery":["/products/product_43.webp"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('5ca0906a-dc5c-43e3-aa9e-df35d741b6c6', '/products/product_43.webp', TRUE, 0);

-- Product 44: Prenda Exclusiva EBNA Luxury N°44
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('f3de07bf-b665-4de3-a94e-c72c0e663fcb', 'EB-MODM-40', 'prenda-exclusiva-ebna-luxury-n-44-ebna-44', 'Prenda Exclusiva EBNA Luxury N°44', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_44.jfif","gallery":["/products/product_44.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('f3de07bf-b665-4de3-a94e-c72c0e663fcb', '/products/product_44.jfif', TRUE, 0);

-- Product 45: Prenda Exclusiva EBNA Luxury N°45
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('0526747b-a71a-4062-aeaa-1d72321e43c8', 'EB-MODM-41', 'prenda-exclusiva-ebna-luxury-n-45-ebna-45', 'Prenda Exclusiva EBNA Luxury N°45', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_45.jfif","gallery":["/products/product_45.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('0526747b-a71a-4062-aeaa-1d72321e43c8', '/products/product_45.jfif', TRUE, 0);

-- Product 46: Prenda Exclusiva EBNA Luxury N°46
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('5d17e8e6-af45-47a3-aa06-438b78f4dbe2', 'EB-MODM-42', 'prenda-exclusiva-ebna-luxury-n-46-ebna-46', 'Prenda Exclusiva EBNA Luxury N°46', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_46.jfif","gallery":["/products/product_46.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('5d17e8e6-af45-47a3-aa06-438b78f4dbe2', '/products/product_46.jfif', TRUE, 0);

-- Product 47: Prenda Exclusiva EBNA Luxury N°47
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('36616118-3a69-4a28-a4b4-9b8ad1f1693e', 'EB-MODM-43', 'prenda-exclusiva-ebna-luxury-n-47-ebna-47', 'Prenda Exclusiva EBNA Luxury N°47', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_47.jfif","gallery":["/products/product_47.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('36616118-3a69-4a28-a4b4-9b8ad1f1693e', '/products/product_47.jfif', TRUE, 0);

-- Product 48: Bailarinas Elegantes Encaje Floral Ollio Paris
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('7d8b950f-74f6-4014-ac60-002bd25a50d4', 'EB-CALZ-02', 'bailarinas-elegantes-encaje-floral-ollio-paris-ebna-48', 'Bailarinas Elegantes Encaje Floral Ollio Paris', 'Ollio Paris', 'CALZADO', 'Bailarinas & Zapatos Planos', 22000, 22000, 25500, true, false, 'Zapatos planos estilo bailarina confeccionados en encaje floral transpirable. Plantilla acolchada suave ideal para eventos y oficina.', '{"primary":"/products/product_48.png","gallery":["/products/product_48.png"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('7d8b950f-74f6-4014-ac60-002bd25a50d4', '/products/product_48.png', TRUE, 0);

-- Product 49: Loción Corporal Hidratante Avena Instituto Español
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('8e45f313-dda7-4c47-a067-5160f6e49765', 'EB-HIG-02', 'locion-corporal-hidratante-avena-instituto-espanol-ebna-49', 'Loción Corporal Hidratante Avena Instituto Español', 'Instituto Español', 'HIGIENE_CORPORAL', 'Lociones Corporales', 9500, 9500, 11000, true, false, 'Loción corporal de formato familiar formulada con extracto de avena 100% natural. 24 horas de hidratación para toda la familia.', '{"primary":"/products/product_49.jfif","gallery":["/products/product_49.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('8e45f313-dda7-4c47-a067-5160f6e49765', '/products/product_49.jfif', TRUE, 0);

-- Product 50: Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('4fbc5cc8-5cc7-480c-adf0-bf24b62198d7', 'EB-COSM-01', 'lapiz-labial-liquido-velvet-matte-waterproof-long-lasting-ebna-50', 'Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Maquillaje de Labios', 9000, 9000, 10500, true, false, 'Pintalabios líquido mate de alta cobertura e intensidad de color. Fórmula intransferible de larga duración hasta 16 horas de fijación.', '{"primary":"/products/product_50.jfif","gallery":["/products/product_50.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('4fbc5cc8-5cc7-480c-adf0-bf24b62198d7', '/products/product_50.jfif', TRUE, 0);

-- Product 51: Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('5c93a0a9-a109-416d-a337-3a55d6d2c301', 'EB-COSM-02', 'set-de-cosmetica-facial-brunch-beauty-glow-serum-50ml-ebna-51', 'Set de Cosmética Facial Brunch Beauty Glow Serum (50ml)', 'Brunch Beauty', 'COSMETICA_FACIAL', 'Serums & Tratamientos', 15000, 15000, 17500, true, false, 'Concentrado iluminador facial con vitamina C estabilizada y ácido hialurónico. Revitaliza la piel y aporta luminosidad natural todo el día.', '{"primary":"/products/product_51.jfif","gallery":["/products/product_51.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('5c93a0a9-a109-416d-a337-3a55d6d2c301', '/products/product_51.jfif', TRUE, 0);

-- Product 52: Jabón de Azufre BioSulfur Grisi Anti-Acné 100g
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('797aa919-f3bc-4045-a1c2-f81f10acb698', 'EB-HIG-03', 'jabon-de-azufre-biosulfur-grisi-anti-acne-100g-ebna-52', 'Jabón de Azufre BioSulfur Grisi Anti-Acné 100g', 'Grisi', 'HIGIENE_CORPORAL', 'Jabones Medicinales', 3500, 3500, 4000, true, false, 'Jabón medicinal con 10% de azufre coloidal formulado para pieles con tendencia acneica. Controla el exceso de grasa y desobstruye poros.', '{"primary":"/products/product_52.jfif","gallery":["/products/product_52.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('797aa919-f3bc-4045-a1c2-f81f10acb698', '/products/product_52.jfif', TRUE, 0);

-- Product 53: Vestido Midi Gingham Smocked Tie-Strap Elegance
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('032fde63-e386-4170-a806-f9d131a8e32c', 'EB-MODM-44', 'vestido-midi-gingham-smocked-tie-strap-elegance-ebna-53', 'Vestido Midi Gingham Smocked Tie-Strap Elegance', 'EBNA Luxury Collection', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 24000, 24000, 27500, true, false, 'Vestido midi de tirantes ajustables con nudo y cuerpo fruncido elástico en estampado de cuadros vichy. Silueta fresca y primaveral.', '{"primary":"/products/product_53.png","gallery":["/products/product_53.png"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('032fde63-e386-4170-a806-f9d131a8e32c', '/products/product_53.png', TRUE, 0);

-- Product 54: Vestido Mini Halter Neck Bodycon Satin Red
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('3cfc9f6d-d59d-48e9-aa23-76718775f2c0', 'EB-MODM-45', 'vestido-mini-halter-neck-bodycon-satin-red-ebna-54', 'Vestido Mini Halter Neck Bodycon Satin Red', 'EBNA Luxury Collection', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 26000, 26000, 30000, true, false, 'Mini vestido entallado con cuello halter y espalda descubierta. Tejido satinado elástico que moldea la silueta con elegancia nocturna.', '{"primary":"/products/product_54.jfif","gallery":["/products/product_54.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('3cfc9f6d-d59d-48e9-aa23-76718775f2c0', '/products/product_54.jfif', TRUE, 0);

-- Product 55: Jabón Aclarante CaroWhite Clarifying Soap 180g
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('8924c512-9fdf-4ab4-a522-55099922d1a4', 'EB-HIG-04', 'jabon-aclarante-carowhite-clarifying-soap-180g-ebna-55', 'Jabón Aclarante CaroWhite Clarifying Soap 180g', 'CaroWhite', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4500, 4500, 5000, true, false, 'Jabón aclarante corporal con aceite de zanahoria y complejo iluminador. Limpieza profunda que elimina impurezas y unifica el tono.', '{"primary":"/products/product_55.jfif","gallery":["/products/product_55.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('8924c512-9fdf-4ab4-a522-55099922d1a4', '/products/product_55.jfif', TRUE, 0);

-- Product 56: Falda Maxi Jersey Cerelina White Couture
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('eaa4d335-6139-4e8e-a20e-de925303ea26', 'EB-MODM-46', 'falda-maxi-jersey-cerelina-white-couture-ebna-56', 'Falda Maxi Jersey Cerelina White Couture', 'EBNA Luxury Collection', 'MODA_MUJER', 'Faldas & Tops', 25000, 25000, 28500, true, false, 'Falda larga de punto jersey suave con cintura elástica alta y drapeado fluido. Caída elegante para combinar con tops y camisas.', '{"primary":"/products/product_56.jfif","gallery":["/products/product_56.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('eaa4d335-6139-4e8e-a20e-de925303ea26', '/products/product_56.jfif', TRUE, 0);

-- Product 57: Prenda Exclusiva EBNA Luxury N°57
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('16a8aa71-6234-46d6-a674-1db47e7c7d90', 'EB-MODM-47', 'prenda-exclusiva-ebna-luxury-n-57-ebna-57', 'Prenda Exclusiva EBNA Luxury N°57', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_57.jfif","gallery":["/products/product_57.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('16a8aa71-6234-46d6-a674-1db47e7c7d90', '/products/product_57.jfif', TRUE, 0);

-- Product 58: Chaqueta Blazer Sastre Zara Style New Collection (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('1470a591-2bc2-40a1-ab9e-179d4929b403', 'EB-MODM-48', 'chaqueta-blazer-sastre-zara-style-new-collection-edition-ebna-58', 'Chaqueta Blazer Sastre Zara Style New Collection (Edition)', 'Zara', 'MODA_MUJER', 'Chaqueas & Blazers', 32000, 32000, 37000, true, false, 'Blazer estructurado con solapa clásica y botones carey de inspiración europea. Prenda sastre versátil para elevar cualquier atuendo.', '{"primary":"/products/product_58.jfif","gallery":["/products/product_58.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('1470a591-2bc2-40a1-ab9e-179d4929b403', '/products/product_58.jfif', TRUE, 0);

-- Product 59: Prenda Exclusiva EBNA Luxury N°59
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d141a004-0ec3-442e-a978-b1a542ceb65d', 'EB-MODM-49', 'prenda-exclusiva-ebna-luxury-n-59-ebna-59', 'Prenda Exclusiva EBNA Luxury N°59', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_59.jfif","gallery":["/products/product_59.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d141a004-0ec3-442e-a978-b1a542ceb65d', '/products/product_59.jfif', TRUE, 0);

-- Product 60: Vestido Satinado de Noche Zara Luxe Red
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('086f9723-65cc-45e9-a84e-427b2740e8eb', 'EB-MODM-50', 'vestido-satinado-de-noche-zara-luxe-red-ebna-60', 'Vestido Satinado de Noche Zara Luxe Red', 'Zara', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 48000, 48000, 55000, true, false, 'Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.', '{"primary":"/products/product_60.jfif","gallery":["/products/product_60.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('086f9723-65cc-45e9-a84e-427b2740e8eb', '/products/product_60.jfif', TRUE, 0);

-- Product 61: Sandalias de Tacón Elegantes Zara Heels Gold Edition
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('0793ceba-7782-4b4c-a249-6de14c72735b', 'EB-CALZ-03', 'sandalias-de-tacon-elegantes-zara-heels-gold-edition-ebna-61', 'Sandalias de Tacón Elegantes Zara Heels Gold Edition', 'Zara', 'CALZADO', 'Zapatos de Tacón', 28000, 28000, 32000, true, false, 'Zapatos de tacón alto con tiras finas cruzadas y cierre de hebilla en el tobillo. Estilo glamuroso para vestidos de fiesta y cóctel.', '{"primary":"/products/product_61.jfif","gallery":["/products/product_61.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('0793ceba-7782-4b4c-a249-6de14c72735b', '/products/product_61.jfif', TRUE, 0);

-- Product 62: Exfoliante Labial Nutritivo de Coco & Frambuesa 30g
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('abf21d9f-2492-4fd5-a681-064f4452700f', 'EB-COSM-03', 'exfoliante-labial-nutritivo-de-coco-frambuesa-30g-ebna-62', 'Exfoliante Labial Nutritivo de Coco & Frambuesa 30g', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Exfoliantes & Bálsamos Labiales', 6500, 6500, 7500, true, false, 'Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.', '{"primary":"/products/product_62.jfif","gallery":["/products/product_62.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('abf21d9f-2492-4fd5-a681-064f4452700f', '/products/product_62.jfif', TRUE, 0);

-- Product 63: Exfoliante Labial Nutritivo de Coco & Frambuesa 30g (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('2a98f320-dd0b-4818-a4b9-4659f41e0c77', 'EB-COSM-04', 'exfoliante-labial-nutritivo-de-coco-frambuesa-30g-edition-ebna-63', 'Exfoliante Labial Nutritivo de Coco & Frambuesa 30g (Edition)', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Exfoliantes & Bálsamos Labiales', 6500, 6500, 7500, true, false, 'Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.', '{"primary":"/products/product_63.jfif","gallery":["/products/product_63.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('2a98f320-dd0b-4818-a4b9-4659f41e0c77', '/products/product_63.jfif', TRUE, 0);

-- Product 64: Exfoliante Labial Nutritivo de Coco & Frambuesa 30g (Luxury)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('33f55a63-2b2d-4fde-a493-49c834e4ceae', 'EB-COSM-05', 'exfoliante-labial-nutritivo-de-coco-frambuesa-30g-luxury-ebna-64', 'Exfoliante Labial Nutritivo de Coco & Frambuesa 30g (Luxury)', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Exfoliantes & Bálsamos Labiales', 6500, 6500, 7500, true, false, 'Bálsamo exfoliante de labios enriquecido con microcristales de azúcar natural y aceite de coco. Elimina pieles muertas dejando labios suaves.', '{"primary":"/products/product_64.jfif","gallery":["/products/product_64.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('33f55a63-2b2d-4fde-a493-49c834e4ceae', '/products/product_64.jfif', TRUE, 0);

-- Product 65: Prenda Exclusiva EBNA Luxury N°65
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('10b06c8a-4533-44a0-aa01-e455116d3ab0', 'EB-MODM-51', 'prenda-exclusiva-ebna-luxury-n-65-ebna-65', 'Prenda Exclusiva EBNA Luxury N°65', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_65.jfif","gallery":["/products/product_65.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('10b06c8a-4533-44a0-aa01-e455116d3ab0', '/products/product_65.jfif', TRUE, 0);

-- Product 66: Prenda Exclusiva EBNA Luxury N°66
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('40e95b53-99b7-4793-a798-1bcc9618f314', 'EB-MODM-52', 'prenda-exclusiva-ebna-luxury-n-66-ebna-66', 'Prenda Exclusiva EBNA Luxury N°66', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_66.jfif","gallery":["/products/product_66.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('40e95b53-99b7-4793-a798-1bcc9618f314', '/products/product_66.jfif', TRUE, 0);

-- Product 67: Pantalón Leggings High Waist Levanta Bumbum Noir
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('c32a7328-4880-4c85-a97c-dfc6f7ddde06', 'EB-MODM-53', 'pantalon-leggings-high-waist-levanta-bumbum-noir-ebna-67', 'Pantalón Leggings High Waist Levanta Bumbum Noir', 'EBNA Luxury Collection', 'MODA_MUJER', 'Pantalones & Mallas', 22000, 22000, 25500, true, false, 'Mallas de tiro alto con tecnología de modelado en glúteos y pretina ancha. Tejido elástico denso no transparente.', '{"primary":"/products/product_67.jfif","gallery":["/products/product_67.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('c32a7328-4880-4c85-a97c-dfc6f7ddde06', '/products/product_67.jfif', TRUE, 0);

-- Product 68: Gel de Ducha Lactoadvance Instituto Español 1250ml
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('ff1cb8bc-96d5-408e-a8ac-93698d6d3fd9', 'EB-HIG-05', 'gel-de-ducha-lactoadvance-instituto-espanol-1250ml-ebna-68', 'Gel de Ducha Lactoadvance Instituto Español 1250ml', 'Instituto Español', 'HIGIENE_CORPORAL', 'Geles de Baño', 7500, 7500, 8500, true, false, 'Gel de baño dermoprotector enriquecido con proteínas de leche e ingredientes hidratantes. Sensación de limpieza y confort diario.', '{"primary":"/products/product_68.jfif","gallery":["/products/product_68.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('ff1cb8bc-96d5-408e-a8ac-93698d6d3fd9', '/products/product_68.jfif', TRUE, 0);

-- Product 69: Pantalón Jeans Wide Leg Streetwear Y2K Vintage Wash
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('52c73cd4-1edd-445d-a5db-3dcd9875e8d6', 'EB-MODM-54', 'pantalon-jeans-wide-leg-streetwear-y2k-vintage-wash-ebna-69', 'Pantalón Jeans Wide Leg Streetwear Y2K Vintage Wash', 'EBNA Streetwear', 'MODA_MUJER', 'Pantalones & Mallas', 28000, 28000, 32000, true, false, 'Vaqueros anchos de corte holgado streetwear estilo Y2K con estampado gráfico sutil. Confeccionados en mezclilla rígida de alta calidad.', '{"primary":"/products/product_69.jfif","gallery":["/products/product_69.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('52c73cd4-1edd-445d-a5db-3dcd9875e8d6', '/products/product_69.jfif', TRUE, 0);

-- Product 70: Sudadera Oversized Thermal Lined Kangaroo Hoodie
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d86904f4-a7db-4954-a6e0-b8ad77f4c1f4', 'EB-MODH-01', 'sudadera-oversized-thermal-lined-kangaroo-hoodie-ebna-70', 'Sudadera Oversized Thermal Lined Kangaroo Hoodie', 'EBNA Men', 'MODA_HOMBRE', 'Sudaderas & Hoodies', 22000, 22000, 25500, true, false, 'Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto y aislamiento térmico suave.', '{"primary":"/products/product_70.jfif","gallery":["/products/product_70.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d86904f4-a7db-4954-a6e0-b8ad77f4c1f4', '/products/product_70.jfif', TRUE, 0);

-- Product 71: Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('ac067ffb-9e4c-4314-a568-e97fc8864a19', 'EB-MODM-55', 'conjunto-deportivo-hooded-crop-top-pantalon-flare-edition-ebna-71', 'Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Edition)', 'EBNA Luxury Collection', 'MODA_MUJER', 'Conjuntos & Sets', 25000, 25000, 28500, true, false, 'Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.', '{"primary":"/products/product_71.jfif","gallery":["/products/product_71.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('ac067ffb-9e4c-4314-a568-e97fc8864a19', '/products/product_71.jfif', TRUE, 0);

-- Product 72: Champú Suave Pieles Atópicas Instituto Español 300ml
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('45511405-c298-4d53-a550-140cc6858119', 'EB-HIG-06', 'champu-suave-pieles-atopicas-instituto-espanol-300ml-ebna-72', 'Champú Suave Pieles Atópicas Instituto Español 300ml', 'Instituto Español', 'HIGIENE_CORPORAL', 'Champús & Cuidado Capilar', 6500, 6500, 7500, true, false, 'Champú dermo-protector especial para cueros cabelludos sensibles o con tendencia atópica. Limpieza ultrasuave sin sulfatos agresivos.', '{"primary":"/products/product_72.jfif","gallery":["/products/product_72.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('45511405-c298-4d53-a550-140cc6858119', '/products/product_72.jfif', TRUE, 0);

-- Product 73: Prenda Exclusiva EBNA Luxury N°73
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('02a645c9-6fb2-40de-a0c0-07306da725ec', 'EB-MODM-56', 'prenda-exclusiva-ebna-luxury-n-73-ebna-73', 'Prenda Exclusiva EBNA Luxury N°73', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_73.jfif","gallery":["/products/product_73.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('02a645c9-6fb2-40de-a0c0-07306da725ec', '/products/product_73.jfif', TRUE, 0);

-- Product 74: Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('c36e1629-b11b-4946-a1a4-9d3e938623a7', 'EB-HIG-07', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-ebna-74', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_74.jfif","gallery":["/products/product_74.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('c36e1629-b11b-4946-a1a4-9d3e938623a7', '/products/product_74.jfif', TRUE, 0);

-- Product 75: Botines Kraasa Chelsea Boots de Cuero Urbano
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('9e53da86-019e-47ab-ab19-9163d3e2b9e1', 'EB-CALZ-04', 'botines-kraasa-chelsea-boots-de-cuero-urbano-ebna-75', 'Botines Kraasa Chelsea Boots de Cuero Urbano', 'Kraasa', 'CALZADO', 'Botines & Botas', 32000, 32000, 37000, true, false, 'Botines estilo Chelsea con paneles elásticos laterales y tirador posterior. Cuero sintético resistente y suela dentada antideslizante.', '{"primary":"/products/product_75.jfif","gallery":["/products/product_75.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('9e53da86-019e-47ab-ab19-9163d3e2b9e1', '/products/product_75.jfif', TRUE, 0);

-- Product 76: Loción Corporal Hidratante Avena Instituto Español (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d234a905-24e0-49d5-adf0-3020c947c83d', 'EB-HIG-08', 'locion-corporal-hidratante-avena-instituto-espanol-edition-ebna-76', 'Loción Corporal Hidratante Avena Instituto Español (Edition)', 'Instituto Español', 'HIGIENE_CORPORAL', 'Lociones Corporales', 9500, 9500, 11000, true, false, 'Loción corporal de formato familiar formulada con extracto de avena 100% natural. 24 horas de hidratación para toda la familia.', '{"primary":"/products/product_76.jfif","gallery":["/products/product_76.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d234a905-24e0-49d5-adf0-3020c947c83d', '/products/product_76.jfif', TRUE, 0);

-- Product 77: Prenda Exclusiva EBNA Luxury N°77
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('72107e16-1bbd-4477-a469-c4b92a87dd6c', 'EB-MODM-57', 'prenda-exclusiva-ebna-luxury-n-77-ebna-77', 'Prenda Exclusiva EBNA Luxury N°77', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_77.jfif","gallery":["/products/product_77.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('72107e16-1bbd-4477-a469-c4b92a87dd6c', '/products/product_77.jfif', TRUE, 0);

-- Product 78: Gorro de Satén Ajustable Largo para Trenzas & Dreads
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('7c66924f-9698-42f0-a5e6-bed3def79bfb', 'EB-ACC-03', 'gorro-de-saten-ajustable-largo-para-trenzas-dreads-ebna-78', 'Gorro de Satén Ajustable Largo para Trenzas & Dreads', 'EBNA Luxury Collection', 'BOLSOS_ACCESORIOS', 'Accesorios de Cabello & Bonnets', 6000, 6000, 7000, true, false, 'Gorro nocturno de satén de seda de doble capa con banda elástica regulable. Protege peinados, evita el encrespamiento y conserva la hidratación.', '{"primary":"/products/product_78.jfif","gallery":["/products/product_78.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('7c66924f-9698-42f0-a5e6-bed3def79bfb', '/products/product_78.jfif', TRUE, 0);

-- Product 79: Prenda Exclusiva EBNA Luxury N°79
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('4d0375df-ba8e-4117-a35f-f57db3118f3b', 'EB-MODM-58', 'prenda-exclusiva-ebna-luxury-n-79-ebna-79', 'Prenda Exclusiva EBNA Luxury N°79', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_79.jfif","gallery":["/products/product_79.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('4d0375df-ba8e-4117-a35f-f57db3118f3b', '/products/product_79.jfif', TRUE, 0);

-- Product 80: Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('7627864d-f659-4b42-a3c7-f6196cdedf33', 'EB-COSM-06', 'crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-ebna-80', 'Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml)', 'Topicrem', 'COSMETICA_FACIAL', 'Cuidado Facial Anti-Manchas', 22000, 22000, 25500, true, false, 'Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.', '{"primary":"/products/product_80.png","gallery":["/products/product_80.png"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('7627864d-f659-4b42-a3c7-f6196cdedf33', '/products/product_80.png', TRUE, 0);

-- Product 81: Desodorante Roll-On Nivea Men Black & White Invisible (Pack 4x)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('a882ea70-3cf1-4c14-add9-f9b5c207d674', 'EB-HIG-09', 'desodorante-roll-on-nivea-men-black-white-invisible-pack-4x-ebna-81', 'Desodorante Roll-On Nivea Men Black & White Invisible (Pack 4x)', 'Nivea Men', 'HIGIENE_CORPORAL', 'Desodorantes', 7500, 7500, 8500, true, false, 'Pack de desodorantes en roll-on con protección antitranspirante 48h. Fórmula antimanchas blancas en ropa negra y antimanchas amarillas en ropa blanca.', '{"primary":"/products/product_81.jfif","gallery":["/products/product_81.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('a882ea70-3cf1-4c14-add9-f9b5c207d674', '/products/product_81.jfif', TRUE, 0);

-- Product 82: Pantalón Corto Bermuda Casual Men's Solid Color
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('c5106a3f-8cd1-4f7b-a720-8d087f5e71bf', 'EB-MODH-02', 'pantalon-corto-bermuda-casual-men-s-solid-color-ebna-82', 'Pantalón Corto Bermuda Casual Men''s Solid Color', 'EBNA Men', 'MODA_HOMBRE', 'Bermudas & Shorts', 15000, 15000, 17500, true, false, 'Bermuda de algodón ligero con cintura elástica y cordón ajustable. Bolsillos laterales para un look relajado de verano.', '{"primary":"/products/product_82.jfif","gallery":["/products/product_82.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('c5106a3f-8cd1-4f7b-a720-8d087f5e71bf', '/products/product_82.jfif', TRUE, 0);

-- Product 83: Prenda Exclusiva EBNA Luxury N°83
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('ac64e264-9da0-44b0-a591-06c6df9c20db', 'EB-MODM-59', 'prenda-exclusiva-ebna-luxury-n-83-ebna-83', 'Prenda Exclusiva EBNA Luxury N°83', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_83.jfif","gallery":["/products/product_83.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('ac64e264-9da0-44b0-a591-06c6df9c20db', '/products/product_83.jfif', TRUE, 0);

-- Product 84: Traje Ejecutivo de Sastrería Navy Blue Stripe 3 Piezas
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('eac6cf62-37ec-45d5-a71b-6fc2128cd667', 'EB-MODH-03', 'traje-ejecutivo-de-sastreria-navy-blue-stripe-3-piezas-ebna-84', 'Traje Ejecutivo de Sastrería Navy Blue Stripe 3 Piezas', 'EBNA Men Tailored', 'MODA_HOMBRE', 'Trajes & Sastrería Masculina', 65000, 65000, 75000, true, false, 'Traje formal de corte sastre compuesto por chaqueta, chaleco y pantalón en tejido estructurado con raya diplomática. Elegancia pura.', '{"primary":"/products/product_84.jfif","gallery":["/products/product_84.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('eac6cf62-37ec-45d5-a71b-6fc2128cd667', '/products/product_84.jfif', TRUE, 0);

-- Product 85: Zapatillas Sneakers Nike Dunk Low Wine Red Edition
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('e36a70fe-ba63-463a-a402-629928e4c877', 'EB-CALZ-05', 'zapatillas-sneakers-nike-dunk-low-wine-red-edition-ebna-85', 'Zapatillas Sneakers Nike Dunk Low Wine Red Edition', 'Nike', 'CALZADO', 'Zapatillas Sneakers', 38000, 38000, 43500, true, false, 'Zapatillas deportivas urbanas icónicas en combinación bicolor rojo vino y blanco. Suela de goma amortiguada y cuero sintético de alta durabilidad.', '{"primary":"/products/product_85.jfif","gallery":["/products/product_85.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('e36a70fe-ba63-463a-a402-629928e4c877', '/products/product_85.jfif', TRUE, 0);

-- Product 86: Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('24c07a66-f580-45b5-a2e0-b3f676bc92b8', 'EB-HIG-10', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-edition-ebna-86', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Edition)', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_86.jfif","gallery":["/products/product_86.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('24c07a66-f580-45b5-a2e0-b3f676bc92b8', '/products/product_86.jfif', TRUE, 0);

-- Product 87: Prenda Exclusiva EBNA Luxury N°87
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('6560591e-095c-458b-a297-f2f9d7d36ee6', 'EB-MODM-60', 'prenda-exclusiva-ebna-luxury-n-87-ebna-87', 'Prenda Exclusiva EBNA Luxury N°87', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_87.jfif","gallery":["/products/product_87.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('6560591e-095c-458b-a297-f2f9d7d36ee6', '/products/product_87.jfif', TRUE, 0);

-- Product 88: Prenda Exclusiva EBNA Luxury N°88
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('8f2257b9-2808-4af8-ae43-e053d67b0418', 'EB-MODM-61', 'prenda-exclusiva-ebna-luxury-n-88-ebna-88', 'Prenda Exclusiva EBNA Luxury N°88', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_88.jfif","gallery":["/products/product_88.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('8f2257b9-2808-4af8-ae43-e053d67b0418', '/products/product_88.jfif', TRUE, 0);

-- Product 89: Prenda Exclusiva EBNA Luxury N°89
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('5a1184a9-1df4-4b34-aac2-2d5a00cbc08b', 'EB-MODM-62', 'prenda-exclusiva-ebna-luxury-n-89-ebna-89', 'Prenda Exclusiva EBNA Luxury N°89', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_89.jfif","gallery":["/products/product_89.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('5a1184a9-1df4-4b34-aac2-2d5a00cbc08b', '/products/product_89.jfif', TRUE, 0);

-- Product 90: Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('9c624473-ae3e-4b8b-a41c-9bea20091cea', 'EB-HIG-11', 'jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-ebna-90', 'Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x)', 'Palmolive', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 3500, 3500, 4000, true, false, 'Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.', '{"primary":"/products/product_90.jfif","gallery":["/products/product_90.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('9c624473-ae3e-4b8b-a41c-9bea20091cea', '/products/product_90.jfif', TRUE, 0);

-- Product 91: Prenda Exclusiva EBNA Luxury N°91
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d290c364-b12e-438f-a0a0-2f747b8f05ae', 'EB-MODM-63', 'prenda-exclusiva-ebna-luxury-n-91-ebna-91', 'Prenda Exclusiva EBNA Luxury N°91', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_91.webp","gallery":["/products/product_91.webp"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d290c364-b12e-438f-a0a0-2f747b8f05ae', '/products/product_91.webp', TRUE, 0);

-- Product 92: Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x) (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d7dab523-1da8-4fa2-a42e-a7f901131875', 'EB-HIG-12', 'jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-edition-ebna-92', 'Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x) (Edition)', 'Palmolive', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 3500, 3500, 4000, true, false, 'Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.', '{"primary":"/products/product_92.jfif","gallery":["/products/product_92.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d7dab523-1da8-4fa2-a42e-a7f901131875', '/products/product_92.jfif', TRUE, 0);

-- Product 93: Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x) (Luxury)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('2e142e06-a586-4e99-abed-11947c3736b4', 'EB-HIG-13', 'jabon-de-tocador-palmolive-naturals-moisture-care-olivo-pack-4x-luxury-ebna-93', 'Jabón de Tocador Palmolive Naturals Moisture Care Olivo (Pack 4x) (Luxury)', 'Palmolive', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 3500, 3500, 4000, true, false, 'Jabón cremoso con extracto natural de oliva e infusiones humectantes. Mantiene la piel suave e hidratada tras cada baño.', '{"primary":"/products/product_93.jfif","gallery":["/products/product_93.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('2e142e06-a586-4e99-abed-11947c3736b4', '/products/product_93.jfif', TRUE, 0);

-- Product 94: Gel de Ducha Lactoadvance Instituto Español 1250ml (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('195bf398-6912-49ef-a5a4-9ea6184bbe63', 'EB-HIG-14', 'gel-de-ducha-lactoadvance-instituto-espanol-1250ml-edition-ebna-94', 'Gel de Ducha Lactoadvance Instituto Español 1250ml (Edition)', 'Instituto Español', 'HIGIENE_CORPORAL', 'Geles de Baño', 7500, 7500, 8500, true, false, 'Gel de baño dermoprotector enriquecido con proteínas de leche e ingredientes hidratantes. Sensación de limpieza y confort diario.', '{"primary":"/products/product_94.jfif","gallery":["/products/product_94.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('195bf398-6912-49ef-a5a4-9ea6184bbe63', '/products/product_94.jfif', TRUE, 0);

-- Product 95: Jabón Artesanal Crystal Egg con Aceites Esenciales 120g
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('40e564e5-5ce3-4200-a395-471ca418376d', 'EB-HIG-15', 'jabon-artesanal-crystal-egg-con-aceites-esenciales-120g-ebna-95', 'Jabón Artesanal Crystal Egg con Aceites Esenciales 120g', 'EBNA Spa', 'HIGIENE_CORPORAL', 'Jabones Artesanales', 5500, 5500, 6500, true, false, 'Jabón de lujo en forma de huevo cristalino elaborado con aceites esenciales relajantes e higienizantes. Suavidad y aroma refinado.', '{"primary":"/products/product_95.jfif","gallery":["/products/product_95.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('40e564e5-5ce3-4200-a395-471ca418376d', '/products/product_95.jfif', TRUE, 0);

-- Product 96: Zuecos Confort Crocs Original Limited Edition
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('1a456d80-5401-4c91-a52b-034a8a42d05b', 'EB-CALZ-06', 'zuecos-confort-crocs-original-limited-edition-ebna-96', 'Zuecos Confort Crocs Original Limited Edition', 'Crocs', 'CALZADO', 'Zuecos & Sandalias', 22000, 22000, 25500, true, false, 'Zuecos ultraligeros de espuma Croslite con correa pivoteada en el talón. Máxima ventilación y comodidad resistente al agua para interiores y exteriores.', '{"primary":"/products/product_96.jfif","gallery":["/products/product_96.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('1a456d80-5401-4c91-a52b-034a8a42d05b', '/products/product_96.jfif', TRUE, 0);

-- Product 97: Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Luxury)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('4f4fd73d-8b5e-408d-a075-8f1e37f56a15', 'EB-MODM-64', 'conjunto-deportivo-hooded-crop-top-pantalon-flare-luxury-ebna-97', 'Conjunto Deportivo Hooded Crop Top & Pantalón Flare (Luxury)', 'EBNA Luxury Collection', 'MODA_MUJER', 'Conjuntos & Sets', 25000, 25000, 28500, true, false, 'Set de 2 piezas compuesto por top corto con capucha ajustables y pantalón acampanado elástico. Confort athleisure de alta calidad.', '{"primary":"/products/product_97.jfif","gallery":["/products/product_97.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('4f4fd73d-8b5e-408d-a075-8f1e37f56a15', '/products/product_97.jfif', TRUE, 0);

-- Product 98: Prenda Exclusiva EBNA Luxury N°98
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('4310eb4b-8309-4551-a11b-dddc9c22afd7', 'EB-MODM-65', 'prenda-exclusiva-ebna-luxury-n-98-ebna-98', 'Prenda Exclusiva EBNA Luxury N°98', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_98.jfif","gallery":["/products/product_98.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('4310eb4b-8309-4551-a11b-dddc9c22afd7', '/products/product_98.jfif', TRUE, 0);

-- Product 99: Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('3f022355-47b8-4511-a5ae-30c2922aba9b', 'EB-ACC-04', 'funda-porta-pasaporte-pu-map-pattern-porta-tarjetas-edition-ebna-99', 'Funda Porta Pasaporte PU Map Pattern & Porta Tarjetas (Edition)', 'EBNA Luxury Collection', 'BOLSOS_ACCESORIOS', 'Accesorios de Viaje', 12000, 12000, 14000, true, false, 'Organizador protector de viaje elaborado en cuero sintético de alta resistencia con grabado de mapa mundi. Incluye ranuras para tarjetas e ID.', '{"primary":"/products/product_99.webp","gallery":["/products/product_99.webp"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('3f022355-47b8-4511-a5ae-30c2922aba9b', '/products/product_99.webp', TRUE, 0);

-- Product 100: Zapatillas Deportivas Puma Speedcat OG Classic
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('62f7f4de-7d36-4ebe-af54-a187898b7d98', 'EB-CALZ-07', 'zapatillas-deportivas-puma-speedcat-og-classic-ebna-100', 'Zapatillas Deportivas Puma Speedcat OG Classic', 'Puma', 'CALZADO', 'Zapatillas Sneakers', 35000, 35000, 40500, true, false, 'Diseño clásico de motorsport en ante suave con la emblemática ola de Puma. Ajuste perfilado y suela de perfil bajo de máximo confort.', '{"primary":"/products/product_100.jfif","gallery":["/products/product_100.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('62f7f4de-7d36-4ebe-af54-a187898b7d98', '/products/product_100.jfif', TRUE, 0);

-- Product 101: Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Luxury)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('a035dd9c-0441-47cf-a412-53654466c079', 'EB-HIG-16', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-luxury-ebna-101', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Luxury)', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_101.jfif","gallery":["/products/product_101.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('a035dd9c-0441-47cf-a412-53654466c079', '/products/product_101.jfif', TRUE, 0);

-- Product 102: Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Selection)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('384a0450-c120-48c4-a1d4-556f4a2fa031', 'EB-HIG-17', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-selection-ebna-102', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Selection)', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_102.jfif","gallery":["/products/product_102.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('384a0450-c120-48c4-a1d4-556f4a2fa031', '/products/product_102.jfif', TRUE, 0);

-- Product 103: Jabón Corporal Hidratante Miel & Avena Nutrición Intensa (100g)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('6773faa2-50b0-40f3-aaa3-714b97119f48', 'EB-HIG-18', 'jabon-corporal-hidratante-miel-avena-nutricion-intensa-100g-ebna-103', 'Jabón Corporal Hidratante Miel & Avena Nutrición Intensa (100g)', 'EBNA Care', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 3500, 3500, 4000, true, false, 'Barra de jabón formulada con miel pura y hojuelas de avena coloidal. Calma pieles sensibles y restaura la barrera cutánea.', '{"primary":"/products/product_103.png","gallery":["/products/product_103.png"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('6773faa2-50b0-40f3-aaa3-714b97119f48', '/products/product_103.png', TRUE, 0);

-- Product 104: Prenda Exclusiva EBNA Luxury N°104
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('ed6fe7b4-f377-4b39-a062-eb0df965ed77', 'EB-MODM-66', 'prenda-exclusiva-ebna-luxury-n-104-ebna-104', 'Prenda Exclusiva EBNA Luxury N°104', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_104.jfif","gallery":["/products/product_104.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('ed6fe7b4-f377-4b39-a062-eb0df965ed77', '/products/product_104.jfif', TRUE, 0);

-- Product 105: Jabón Galong Naranja & Colágeno Aclarante 100g
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('5387e7fa-b67a-4f9f-ad01-382bc7dba5b6', 'EB-HIG-19', 'jabon-galong-naranja-colageno-aclarante-100g-ebna-105', 'Jabón Galong Naranja & Colágeno Aclarante 100g', 'Galong', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 3000, 3000, 3500, true, false, 'Jabón tailandés de extracto concentrado de naranja y colágeno soluble. Aporta vitamina C y elasticidad a la piel durante el baño.', '{"primary":"/products/product_105.png","gallery":["/products/product_105.png"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('5387e7fa-b67a-4f9f-ad01-382bc7dba5b6', '/products/product_105.png', TRUE, 0);

-- Product 106: Prenda Exclusiva EBNA Luxury N°106
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('5bdb7919-e190-42dd-afac-67c385da9f79', 'EB-MODM-67', 'prenda-exclusiva-ebna-luxury-n-106-ebna-106', 'Prenda Exclusiva EBNA Luxury N°106', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_106.jfif","gallery":["/products/product_106.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('5bdb7919-e190-42dd-afac-67c385da9f79', '/products/product_106.jfif', TRUE, 0);

-- Product 107: Pantalón Corto Bermuda Casual Men's Solid Color (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('07948f77-796e-49f3-a84e-d39fe9c2fd33', 'EB-MODH-04', 'pantalon-corto-bermuda-casual-men-s-solid-color-edition-ebna-107', 'Pantalón Corto Bermuda Casual Men''s Solid Color (Edition)', 'EBNA Men', 'MODA_HOMBRE', 'Bermudas & Shorts', 15000, 15000, 17500, true, false, 'Bermuda de algodón ligero con cintura elástica y cordón ajustable. Bolsillos laterales para un look relajado de verano.', '{"primary":"/products/product_107.jfif","gallery":["/products/product_107.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('07948f77-796e-49f3-a84e-d39fe9c2fd33', '/products/product_107.jfif', TRUE, 0);

-- Product 108: Prenda Exclusiva EBNA Luxury N°108
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('79d91517-8d21-4af9-aa84-7d908c102de6', 'EB-MODM-68', 'prenda-exclusiva-ebna-luxury-n-108-ebna-108', 'Prenda Exclusiva EBNA Luxury N°108', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_108.jfif","gallery":["/products/product_108.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('79d91517-8d21-4af9-aa84-7d908c102de6', '/products/product_108.jfif', TRUE, 0);

-- Product 109: Prenda Exclusiva EBNA Luxury N°109
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('99b377ad-4f12-443a-a623-8c529f093c48', 'EB-MODM-69', 'prenda-exclusiva-ebna-luxury-n-109-ebna-109', 'Prenda Exclusiva EBNA Luxury N°109', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_109.jfif","gallery":["/products/product_109.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('99b377ad-4f12-443a-a623-8c529f093c48', '/products/product_109.jfif', TRUE, 0);

-- Product 110: Prenda Exclusiva EBNA Luxury N°110
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('98dafdee-1376-418c-a5e9-cce7d31a34d5', 'EB-MODM-70', 'prenda-exclusiva-ebna-luxury-n-110-ebna-110', 'Prenda Exclusiva EBNA Luxury N°110', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_110.jfif","gallery":["/products/product_110.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('98dafdee-1376-418c-a5e9-cce7d31a34d5', '/products/product_110.jfif', TRUE, 0);

-- Product 111: Crema Facial Aclarante Turmeric Face Cream 50g
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('046fc67d-01c7-4223-a017-85f306707d6e', 'EB-COSM-07', 'crema-facial-aclarante-turmeric-face-cream-50g-ebna-111', 'Crema Facial Aclarante Turmeric Face Cream 50g', 'Oceaura', 'COSMETICA_FACIAL', 'Cremas Faciales', 14000, 14000, 16000, true, false, 'Crema hidratante enriquecida con extracto de cúrcuma orgánica y niacinamida. Atenúa hiperpigmentación y restaura la frescura del rostro.', '{"primary":"/products/product_111.jfif","gallery":["/products/product_111.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('046fc67d-01c7-4223-a017-85f306707d6e', '/products/product_111.jfif', TRUE, 0);

-- Product 112: Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('665946e4-6450-4414-a15f-091cd76e84cc', 'EB-MODM-71', 'chaqueta-active-soft-mid-layer-zip-up-black-oh-polly-style-ebna-112', 'Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style', 'Oh Polly', 'MODA_MUJER', 'Chaqueas & Blazers', 27000, 27000, 31000, true, false, 'Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal completa y capucha. Tejido suave de efecto segunda piel.', '{"primary":"/products/product_112.jfif","gallery":["/products/product_112.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('665946e4-6450-4414-a15f-091cd76e84cc', '/products/product_112.jfif', TRUE, 0);

-- Product 113: Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d352a181-49c1-4ac5-a807-6d1de1bc57b6', 'EB-MODM-72', 'chaqueta-active-soft-mid-layer-zip-up-black-oh-polly-style-edition-ebna-113', 'Chaqueta Active Soft Mid-Layer Zip Up Black Oh Polly Style (Edition)', 'Oh Polly', 'MODA_MUJER', 'Chaqueas & Blazers', 27000, 27000, 31000, true, false, 'Chaqueta ajustada deportiva de microfibra moldeadora con cremallera frontal completa y capucha. Tejido suave de efecto segunda piel.', '{"primary":"/products/product_113.jfif","gallery":["/products/product_113.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d352a181-49c1-4ac5-a807-6d1de1bc57b6', '/products/product_113.jfif', TRUE, 0);

-- Product 114: Prenda Exclusiva EBNA Luxury N°114
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('49c9ff87-e459-452f-afd4-eb00309c73e7', 'EB-MODM-73', 'prenda-exclusiva-ebna-luxury-n-114-ebna-114', 'Prenda Exclusiva EBNA Luxury N°114', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_114.jfif","gallery":["/products/product_114.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('49c9ff87-e459-452f-afd4-eb00309c73e7', '/products/product_114.jfif', TRUE, 0);

-- Product 115: Vestido Veraniego Polka Dot Retro Flared Red
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('fad0dcea-e19c-4d6d-a01d-991fc513d7af', 'EB-MODM-74', 'vestido-veraniego-polka-dot-retro-flared-red-ebna-115', 'Vestido Veraniego Polka Dot Retro Flared Red', 'EBNA Luxury Collection', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 23000, 23000, 26500, true, false, 'Vestido midi de estilo vintage con estampado de lunares y escote con hombros descubiertos. Falda de vuelo ligera y fresca.', '{"primary":"/products/product_115.jfif","gallery":["/products/product_115.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('fad0dcea-e19c-4d6d-a01d-991fc513d7af', '/products/product_115.jfif', TRUE, 0);

-- Product 116: Prenda Exclusiva EBNA Luxury N°116
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('aa3cbc18-0f2b-4010-a318-e471cdb3e5c1', 'EB-MODM-75', 'prenda-exclusiva-ebna-luxury-n-116-ebna-116', 'Prenda Exclusiva EBNA Luxury N°116', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_116.jfif","gallery":["/products/product_116.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('aa3cbc18-0f2b-4010-a318-e471cdb3e5c1', '/products/product_116.jfif', TRUE, 0);

-- Product 117: Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml) (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('7e643313-21cc-48f1-a922-18de9f227200', 'EB-COSM-08', 'crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-edition-ebna-117', 'Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml) (Edition)', 'Topicrem', 'COSMETICA_FACIAL', 'Cuidado Facial Anti-Manchas', 22000, 22000, 25500, true, false, 'Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.', '{"primary":"/products/product_117.jfif","gallery":["/products/product_117.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('7e643313-21cc-48f1-a922-18de9f227200', '/products/product_117.jfif', TRUE, 0);

-- Product 118: Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml) (Luxury)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('0a308dd1-6b87-4778-aa7c-818cf690c5d3', 'EB-COSM-09', 'crema-unificante-anti-manchas-topicrem-mela-day-cream-spf50-40ml-luxury-ebna-118', 'Crema Unificante Anti-Manchas Topicrem Mela Day Cream SPF50+ (40ml) (Luxury)', 'Topicrem', 'COSMETICA_FACIAL', 'Cuidado Facial Anti-Manchas', 22000, 22000, 25500, true, false, 'Tratamiento dermatológico despigmentante de alta eficacia. Aclara manchas oscuras y protege contra la radiación solar con filtro SPF50+.', '{"primary":"/products/product_118.jfif","gallery":["/products/product_118.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('0a308dd1-6b87-4778-aa7c-818cf690c5d3', '/products/product_118.jfif', TRUE, 0);

-- Product 119: Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Gold)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('49ca6c41-95b6-4b71-a7bb-6b2d89317cb5', 'EB-HIG-20', 'jabon-germicida-dole-medicated-lemon-soap-curcuma-kojico-gold-ebna-119', 'Jabón Germicida Dole Medicated Lemon Soap / Cúrcuma & Kójico (Gold)', 'Kojic San', 'HIGIENE_CORPORAL', 'Jabones Aclarantes', 4000, 4000, 4500, true, false, 'Jabón aclarante para rostro y cuerpo con ácido kójico concentrado y cúrcuma. Ayuda a homogeneizar el tono cutáneo y combatir manchas.', '{"primary":"/products/product_119.jfif","gallery":["/products/product_119.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('49ca6c41-95b6-4b71-a7bb-6b2d89317cb5', '/products/product_119.jfif', TRUE, 0);

-- Product 120: Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('733a57bd-52a9-4020-a632-d9647d995ab2', 'EB-HIG-21', 'exfoliante-corporal-curcuma-sal-marina-con-aceite-de-jojoba-250g-ebna-120', 'Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g', 'EBNA Spa', 'HIGIENE_CORPORAL', 'Exfoliantes Corporales', 12000, 12000, 14000, true, false, 'Scrub corporal regenerador con sal marina, extracto de cúrcuma y vitamina E. Remueve células muertas dejando la piel sedosa e hidratada.', '{"primary":"/products/product_120.jfif","gallery":["/products/product_120.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('733a57bd-52a9-4020-a632-d9647d995ab2', '/products/product_120.jfif', TRUE, 0);

-- Product 121: Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('aba0aa68-3639-425a-a12f-d1a21192468d', 'EB-HIG-22', 'jabon-vaseline-healthy-bright-vitamin-b3-pack-4x-75g-ebna-121', 'Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g)', 'Vaseline', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 4500, 4500, 5000, true, false, 'Pastillas de jabón enriquecidas con Niacinamida (Vitamina B3) y microgotas de Vaselina Pura. Aportan brillo y nutrición profunda.', '{"primary":"/products/product_121.jfif","gallery":["/products/product_121.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('aba0aa68-3639-425a-a12f-d1a21192468d', '/products/product_121.jfif', TRUE, 0);

-- Product 122: Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g) (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('ca95fb6f-ff41-4882-a713-b467257f8803', 'EB-HIG-23', 'jabon-vaseline-healthy-bright-vitamin-b3-pack-4x-75g-edition-ebna-122', 'Jabón Vaseline Healthy Bright Vitamin B3 (Pack 4x 75g) (Edition)', 'Vaseline', 'HIGIENE_CORPORAL', 'Jabones de Tocador', 4500, 4500, 5000, true, false, 'Pastillas de jabón enriquecidas con Niacinamida (Vitamina B3) y microgotas de Vaselina Pura. Aportan brillo y nutrición profunda.', '{"primary":"/products/product_122.jfif","gallery":["/products/product_122.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('ca95fb6f-ff41-4882-a713-b467257f8803', '/products/product_122.jfif', TRUE, 0);

-- Product 123: Bálsamo Labial Vaseline Lip Therapy Original 4g
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('2b4be917-46a8-490f-a199-e322077c2733', 'EB-COSM-10', 'balsamo-labial-vaseline-lip-therapy-original-4g-ebna-123', 'Bálsamo Labial Vaseline Lip Therapy Original 4g', 'Vaseline', 'COSMETICA_FACIAL', 'Bálsamos Labiales', 3000, 3000, 3500, true, false, 'Protector labial de vaselina pura no grasa. Alivia labios secos o agrietados proporcionando una barrera humectante inmediata.', '{"primary":"/products/product_123.jfif","gallery":["/products/product_123.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('2b4be917-46a8-490f-a199-e322077c2733', '/products/product_123.jfif', TRUE, 0);

-- Product 124: Prenda Exclusiva EBNA Luxury N°124
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('940b0efb-b63c-49fa-a46f-48f775f60d79', 'EB-MODM-76', 'prenda-exclusiva-ebna-luxury-n-124-ebna-124', 'Prenda Exclusiva EBNA Luxury N°124', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_124.jfif","gallery":["/products/product_124.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('940b0efb-b63c-49fa-a46f-48f775f60d79', '/products/product_124.jfif', TRUE, 0);

-- Product 125: Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('c8548631-8567-465c-a513-97b6c48057a0', 'EB-COSM-11', 'lapiz-labial-liquido-velvet-matte-waterproof-long-lasting-edition-ebna-125', 'Lápiz Labial Líquido Velvet Matte Waterproof Long-Lasting (Edition)', 'EBNA Beauty', 'COSMETICA_FACIAL', 'Maquillaje de Labios', 9000, 9000, 10500, true, false, 'Pintalabios líquido mate de alta cobertura e intensidad de color. Fórmula intransferible de larga duración hasta 16 horas de fijación.', '{"primary":"/products/product_125.png","gallery":["/products/product_125.png"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('c8548631-8567-465c-a513-97b6c48057a0', '/products/product_125.png', TRUE, 0);

-- Product 126: Vestido Satinado de Noche Zara Luxe Red (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('80482c56-7130-4e51-a0f4-d6a136a76060', 'EB-MODM-77', 'vestido-satinado-de-noche-zara-luxe-red-edition-ebna-126', 'Vestido Satinado de Noche Zara Luxe Red (Edition)', 'Zara', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 48000, 48000, 55000, true, false, 'Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.', '{"primary":"/products/product_126.jfif","gallery":["/products/product_126.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('80482c56-7130-4e51-a0f4-d6a136a76060', '/products/product_126.jfif', TRUE, 0);

-- Product 127: Vestido Satinado de Noche Zara Luxe Red (Luxury)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('6f070dcb-0ebe-4dd5-adac-b0d3d2e79784', 'EB-MODM-78', 'vestido-satinado-de-noche-zara-luxe-red-luxury-ebna-127', 'Vestido Satinado de Noche Zara Luxe Red (Luxury)', 'Zara', 'MODA_MUJER', 'Vestidos de Noche & Fiesta', 48000, 48000, 55000, true, false, 'Vestido largo de gala confeccionado en fluido tejido satinado verde esmeralda o rojo pasión. Escote cruzado y vuelo de alta costura.', '{"primary":"/products/product_127.jfif","gallery":["/products/product_127.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('6f070dcb-0ebe-4dd5-adac-b0d3d2e79784', '/products/product_127.jfif', TRUE, 0);

-- Product 128: Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('b929ced0-e619-40bc-ad65-e352c08bc4a1', 'EB-HIG-24', 'exfoliante-corporal-curcuma-sal-marina-con-aceite-de-jojoba-250g-edition-ebna-128', 'Exfoliante Corporal Cúrcuma & Sal Marina con Aceite de Jojoba 250g (Edition)', 'EBNA Spa', 'HIGIENE_CORPORAL', 'Exfoliantes Corporales', 12000, 12000, 14000, true, false, 'Scrub corporal regenerador con sal marina, extracto de cúrcuma y vitamina E. Remueve células muertas dejando la piel sedosa e hidratada.', '{"primary":"/products/product_128.jfif","gallery":["/products/product_128.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('b929ced0-e619-40bc-ad65-e352c08bc4a1', '/products/product_128.jfif', TRUE, 0);

-- Product 129: Prenda Exclusiva EBNA Luxury N°129
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('1f0aa286-bcd2-473c-a33a-bcaef126621f', 'EB-MODM-79', 'prenda-exclusiva-ebna-luxury-n-129-ebna-129', 'Prenda Exclusiva EBNA Luxury N°129', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_129.jfif","gallery":["/products/product_129.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('1f0aa286-bcd2-473c-a33a-bcaef126621f', '/products/product_129.jfif', TRUE, 0);

-- Product 130: Bailarinas Malla Calada Woven Mary Jane Flats
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('b819580d-8489-4f9d-a979-340f92fc8f4f', 'EB-CALZ-08', 'bailarinas-malla-calada-woven-mary-jane-flats-ebna-130', 'Bailarinas Malla Calada Woven Mary Jane Flats', 'EBNA Luxury Collection', 'CALZADO', 'Bailarinas & Zapatos Planos', 24000, 24000, 27500, true, false, 'Calzado plano de malla calada con hebilla ajustable sobre el empeine. Diseño fresco, flexible y transpirable para clima cálido.', '{"primary":"/products/product_130.jfif","gallery":["/products/product_130.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('b819580d-8489-4f9d-a979-340f92fc8f4f', '/products/product_130.jfif', TRUE, 0);

-- Product 131: Bailarinas Elegantes Encaje Floral Ollio Paris (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('d51e6687-f6f6-48bc-a29d-2710fa1275b6', 'EB-CALZ-09', 'bailarinas-elegantes-encaje-floral-ollio-paris-edition-ebna-131', 'Bailarinas Elegantes Encaje Floral Ollio Paris (Edition)', 'Ollio Paris', 'CALZADO', 'Bailarinas & Zapatos Planos', 22000, 22000, 25500, true, false, 'Zapatos planos estilo bailarina confeccionados en encaje floral transpirable. Plantilla acolchada suave ideal para eventos y oficina.', '{"primary":"/products/product_131.jfif","gallery":["/products/product_131.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('d51e6687-f6f6-48bc-a29d-2710fa1275b6', '/products/product_131.jfif', TRUE, 0);

-- Product 132: Prenda Exclusiva EBNA Luxury N°132
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('fe4a6a1e-cdbd-4a45-a6c8-95ebdd0b0f98', 'EB-MODM-80', 'prenda-exclusiva-ebna-luxury-n-132-ebna-132', 'Prenda Exclusiva EBNA Luxury N°132', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_132.jfif","gallery":["/products/product_132.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('fe4a6a1e-cdbd-4a45-a6c8-95ebdd0b0f98', '/products/product_132.jfif', TRUE, 0);

-- Product 133: Bailarinas Malla Calada Woven Mary Jane Flats (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('c45e0119-01ba-4096-a780-bf929a942b23', 'EB-CALZ-10', 'bailarinas-malla-calada-woven-mary-jane-flats-edition-ebna-133', 'Bailarinas Malla Calada Woven Mary Jane Flats (Edition)', 'EBNA Luxury Collection', 'CALZADO', 'Bailarinas & Zapatos Planos', 24000, 24000, 27500, true, false, 'Calzado plano de malla calada con hebilla ajustable sobre el empeine. Diseño fresco, flexible y transpirable para clima cálido.', '{"primary":"/products/product_133.jfif","gallery":["/products/product_133.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('c45e0119-01ba-4096-a780-bf929a942b23', '/products/product_133.jfif', TRUE, 0);

-- Product 134: Sandalias de Tacón Elegantes Zara Heels Gold Edition (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('e45890d0-2902-4f6e-a85a-15a759d849c1', 'EB-CALZ-11', 'sandalias-de-tacon-elegantes-zara-heels-gold-edition-edition-ebna-134', 'Sandalias de Tacón Elegantes Zara Heels Gold Edition (Edition)', 'Zara', 'CALZADO', 'Zapatos de Tacón', 28000, 28000, 32000, true, false, 'Zapatos de tacón alto con tiras finas cruzadas y cierre de hebilla en el tobillo. Estilo glamuroso para vestidos de fiesta y cóctel.', '{"primary":"/products/product_134.jfif","gallery":["/products/product_134.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('e45890d0-2902-4f6e-a85a-15a759d849c1', '/products/product_134.jfif', TRUE, 0);

-- Product 135: Zara Red Vanilla Eau de Toilette
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('10050a12-51f3-44f4-a4c9-c1afe4a8b14b', 'EB-PERF-01', 'zara-red-vanilla-eau-de-toilette-ebna-135', 'Zara Red Vanilla Eau de Toilette', 'Zara', 'PERFUMERIA', 'Perfumes Femeninos', 32000, 32000, 37000, true, false, 'Fragancia femenina icónica de la colección Zara. Notas cálidas de vainilla, flor de peonía y pera dulce. Elegancia sofisticada de larga duración.', '{"primary":"/products/product_135.png","gallery":["/products/product_135.png"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('10050a12-51f3-44f4-a4c9-c1afe4a8b14b', '/products/product_135.png', TRUE, 0);

-- Product 136: Prenda Exclusiva EBNA Luxury N°136
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('34a68c3c-5b4e-4076-a5c1-c7f6f863f8a2', 'EB-MODM-81', 'prenda-exclusiva-ebna-luxury-n-136-ebna-136', 'Prenda Exclusiva EBNA Luxury N°136', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_136.jfif","gallery":["/products/product_136.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('34a68c3c-5b4e-4076-a5c1-c7f6f863f8a2', '/products/product_136.jfif', TRUE, 0);

-- Product 137: Zara Red Vanilla Eau de Toilette (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('ba3c21e3-f08d-4171-ae28-b2a80af30165', 'EB-PERF-02', 'zara-red-vanilla-eau-de-toilette-edition-ebna-137', 'Zara Red Vanilla Eau de Toilette (Edition)', 'Zara', 'PERFUMERIA', 'Perfumes Femeninos', 32000, 32000, 37000, true, false, 'Fragancia femenina icónica de la colección Zara. Notas cálidas de vainilla, flor de peonía y pera dulce. Elegancia sofisticada de larga duración.', '{"primary":"/products/product_137.jfif","gallery":["/products/product_137.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('ba3c21e3-f08d-4171-ae28-b2a80af30165', '/products/product_137.jfif', TRUE, 0);

-- Product 138: Prenda Exclusiva EBNA Luxury N°138
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('e99530d7-eb85-4ea0-a70d-d5725bc3667f', 'EB-MODM-82', 'prenda-exclusiva-ebna-luxury-n-138-ebna-138', 'Prenda Exclusiva EBNA Luxury N°138', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_138.jfif","gallery":["/products/product_138.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('e99530d7-eb85-4ea0-a70d-d5725bc3667f', '/products/product_138.jfif', TRUE, 0);

-- Product 139: Prenda Exclusiva EBNA Luxury N°139
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('b0cfc253-ec54-4a1a-a2c4-d40f5116c89d', 'EB-MODM-83', 'prenda-exclusiva-ebna-luxury-n-139-ebna-139', 'Prenda Exclusiva EBNA Luxury N°139', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_139.jfif","gallery":["/products/product_139.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('b0cfc253-ec54-4a1a-a2c4-d40f5116c89d', '/products/product_139.jfif', TRUE, 0);

-- Product 140: Prenda Exclusiva EBNA Luxury N°140
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('3d107f85-d06a-4568-aa5d-8b3a37ebdf0f', 'EB-MODM-84', 'prenda-exclusiva-ebna-luxury-n-140-ebna-140', 'Prenda Exclusiva EBNA Luxury N°140', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_140.jfif","gallery":["/products/product_140.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('3d107f85-d06a-4568-aa5d-8b3a37ebdf0f', '/products/product_140.jfif', TRUE, 0);

-- Product 141: Sudadera Oversized Thermal Lined Kangaroo Hoodie (Edition)
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('a7922b4e-8d52-4f6c-a51d-f3e6c688d8e9', 'EB-MODH-05', 'sudadera-oversized-thermal-lined-kangaroo-hoodie-edition-ebna-141', 'Sudadera Oversized Thermal Lined Kangaroo Hoodie (Edition)', 'EBNA Men', 'MODA_HOMBRE', 'Sudaderas & Hoodies', 22000, 22000, 25500, true, false, 'Sudadera de franela térmica con bolsillo canguro y capucha ajustable. Confort absoluto y aislamiento térmico suave.', '{"primary":"/products/product_141.jfif","gallery":["/products/product_141.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('a7922b4e-8d52-4f6c-a51d-f3e6c688d8e9', '/products/product_141.jfif', TRUE, 0);

-- Product 142: Prenda Exclusiva EBNA Luxury N°142
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images, colors, sizes)
VALUES ('72368585-2001-4721-a12b-e386bf5d2d74', 'EB-MODM-85', 'prenda-exclusiva-ebna-luxury-n-142-ebna-142', 'Prenda Exclusiva EBNA Luxury N°142', 'EBNA Luxury Collection', 'MODA_MUJER', 'Ropa Femenina', 24000, 24000, 27500, true, false, 'Prenda de diseño exclusivo EBNA Luxury confeccionada en tejido de alta calidad con acabado impecable para lucir sofisticada.', '{"primary":"/products/product_142.jfif","gallery":["/products/product_142.jfif"]}'::jsonb, ARRAY['Blanco','Negro'], ARRAY['S','M','L'])
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
VALUES ('72368585-2001-4721-a12b-e386bf5d2d74', '/products/product_142.jfif', TRUE, 0);
