const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const demoDataPath = path.join(__dirname, '../src/lib/demoData.ts');
const demoContent = fs.readFileSync(demoDataPath, 'utf8');

const markerStr = 'export const INITIAL_PRODUCTS: Product[] = ';
const startIdx = demoContent.indexOf(markerStr);
const afterMarker = demoContent.slice(startIdx + markerStr.length);
let bracketCount = 0;
let endIdx = -1;

for (let i = 0; i < afterMarker.length; i++) {
  if (afterMarker[i] === '[') bracketCount++;
  else if (afterMarker[i] === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      endIdx = i;
      break;
    }
  }
}

const products = eval('(' + afterMarker.slice(0, endIdx + 1) + ')');

function escapeSqlStr(str) {
  if (str === undefined || str === null) return "''";
  return "'" + String(str).replace(/'/g, "''") + "'";
}

let sql = `-- ====================================================================
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
`;

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

products.forEach((p, idx) => {
  let prodId = p.id;
  if (!uuidRegex.test(prodId)) {
    const md5 = crypto.createHash('md5').update(`ebna-clean-${p.sku}-${idx}`).digest('hex');
    prodId = `${md5.slice(0,8)}-${md5.slice(8,12)}-4${md5.slice(13,16)}-a${md5.slice(17,20)}-${md5.slice(20,32)}`;
  }

  const sku = escapeSqlStr(p.sku || `EB-LUX-${idx + 1}`);
  const slug = escapeSqlStr(p.slug || `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${idx + 1}`);
  const name = escapeSqlStr(p.name);
  const brand = escapeSqlStr(p.brand || 'EBNA Luxury Collection');
  const category = escapeSqlStr(p.category || 'MODA_MUJER');
  const subcategory = escapeSqlStr(p.subcategory || 'General');
  const price = p.priceFCFA || p.price || 15000;
  const priceFcfa = p.priceFCFA || p.price || 15000;
  const origPrice = p.originalPriceFCFA ? p.originalPriceFCFA : 'NULL';
  const inStock = p.inStock !== false;
  const isFeatured = p.featured ? true : false;
  const description = escapeSqlStr(p.description || '');

  const primaryImg = p.images?.primary || (Array.isArray(p.images) ? p.images[0] : '/icons/ebna-logo.png');
  const gallery = p.images?.gallery || (Array.isArray(p.images) ? p.images : [primaryImg]);
  
  const imagesJson = escapeSqlStr(JSON.stringify({ primary: primaryImg, gallery: gallery }));

  sql += `
INSERT INTO products (id, sku, slug, name, brand, category, subcategory, price, price_fcfa, original_price_fcfa, in_stock, is_featured, description, images)
VALUES ('${prodId}', ${sku}, ${slug}, ${name}, ${brand}, ${category}, ${subcategory}, ${price}, ${priceFcfa}, ${origPrice}, ${inStock}, ${isFeatured}, ${description}, ${imagesJson}::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  price_fcfa = EXCLUDED.price_fcfa,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  updated_at = NOW();

INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES ('${prodId}', ${escapeSqlStr(primaryImg)}, TRUE, 0);
`;
});

fs.writeFileSync(path.join(__dirname, '../supabase_fresh_clean_schema.sql'), sql);
console.log('Successfully generated supabase_fresh_clean_schema.sql!');
