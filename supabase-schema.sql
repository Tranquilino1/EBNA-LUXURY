-- =====================================================
-- EBNA Moda & Cosmética — Supabase Database Schema
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- =====================================================

-- 1) Tabla de perfiles de usuario (vinculada a auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2) Tabla de productos
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('MODA', 'COSMETICA', 'ACCESORIOS', 'VASELINAS', 'JABONES', 'NIÑOS', 'POMADAS')),
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  images TEXT[] NOT NULL DEFAULT '{}',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3) Tabla de sesiones de tráfico (visitantes en vivo)
CREATE TABLE IF NOT EXISTS public.traffic_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  last_heartbeat TIMESTAMPTZ NOT NULL DEFAULT now(),
  device_type TEXT NOT NULL DEFAULT 'desktop'
);

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_sessions ENABLE ROW LEVEL SECURITY;

-- Perfiles: lectura pública, cada usuario edita el suyo
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Productos: lectura pública, solo admins pueden insertar/actualizar/eliminar
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT USING (true);

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- Tráfico: lectura y escritura públicas (anónimo)
CREATE POLICY "Anyone can view traffic"
  ON public.traffic_sessions FOR SELECT USING (true);

CREATE POLICY "Anyone can insert traffic"
  ON public.traffic_sessions FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update traffic"
  ON public.traffic_sessions FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete traffic"
  ON public.traffic_sessions FOR DELETE USING (true);

-- =====================================================
-- Trigger: crear perfil automáticamente al registrarse
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'USER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- Índices para rendimiento
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_traffic_heartbeat ON public.traffic_sessions(last_heartbeat);

-- =====================================================
-- Insertar los 27 productos del catálogo EBNA
-- =====================================================

INSERT INTO public.products (slug, name, category, description, price, images, in_stock) VALUES
  ('chanel-n-5-eau-de-parfum', 'Chanel N° 5 Eau de Parfum 100ml', 'COSMETICA', 'La esencia misma de la feminidad. Un ramo floral aldehído atemporal sublimado por un frasco icónico con líneas puras.', 135000, ARRAY['https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'], true),
  ('dior-sauvage-elixir-perfume', 'Dior Sauvage Elixir 60ml', 'COSMETICA', 'Una fragancia de concentración extrema donde la frescura del pomelo y las especias se funden con un corazón de lavanda salvaje y maderas raras.', 145000, ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'], true),
  ('victorias-secret-bombshell-eau-de-parfum', 'Victoria''s Secret Bombshell 100ml', 'COSMETICA', 'La fragancia N° 1 de América. Mezcla glamurosa de peonías recién cortadas, orquídea de vainilla y maracuyá morada vibrante.', 65000, ARRAY['https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'], true),
  ('yves-saint-laurent-libre-intense', 'Yves Saint Laurent Libre EDP 90ml', 'COSMETICA', 'El perfume de una mujer fuerte y libre. Una tensión entre la sensualidad ardiente de la flor de azahar de Marruecos y la audacia de la lavanda de Francia.', 110000, ARRAY['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'], true),
  ('carolina-herrera-good-girl-velvet', 'Carolina Herrera Good Girl 80ml', 'COSMETICA', 'Una fragancia audaz y sofisticada en su emblemático frasco con forma de taconazo alto. Notas de nardo dulce, jazmín y haba tonka tostada.', 98000, ARRAY['https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'], true),
  ('creed-aventus-eau-de-parfum', 'Creed Aventus Royal EDP 100ml', 'COSMETICA', 'Fragancia de culto celebrada por su vitalidad y elegancia. Notas vivaces de piña madura, grosella negra, abedul ahumado y pachulí.', 240000, ARRAY['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'], true),
  ('nivea-soft-crema-hidratante-300ml', 'Nivea Soft Crema Hidratante Intensiva 300ml', 'COSMETICA', 'Fórmula refrescante enriquecida con Aceite de Jojoba y Vitamina E. Absorción rápida sin sensación grasa, ideal para rostro, cuerpo y manos.', 8500, ARRAY['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'], true),
  ('cerave-crema-hidratante-facial-52ml', 'CeraVe Loción Hidratante Facial SPF 30', 'COSMETICA', 'Desarrollada con dermatólogos. Contiene 3 ceramidas esenciales, Ácido Hialurónico y Niacinamida para restaurar la barrera protectora de la piel.', 16000, ARRAY['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'], true),
  ('la-roche-posay-pure-vitamin-c10-serum', 'La Roche-Posay Pure Vitamin C10 30ml', 'COSMETICA', 'Sérum antioxidante antiarrugas con 10% de Vitamina C Pura, Ácido Salicílico y Neurosensina. Aporta luminosidad inmediata a la piel sensible.', 28000, ARRAY['https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'], true),
  ('chandal-nike-tech-fleece-full-zip', 'Chándal Nike Tech Fleece Full-Zip', 'MODA', 'Conjunto premium de chaqueta con capucha y pantalón jogger ajustado. Tejido térmico ultra ligero que mantiene el calor sin añadir volumen.', 95000, ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'], true),
  ('chandal-adidas-originals-adicolor-3-stripes', 'Chándal Adidas Originals Adicolor 3-Stripes', 'MODA', 'Icono del estilo deportivo urbano. Chaqueta con cierre de cremallera completa y pantalón de chándal a juego con las míticas 3 bandas laterales.', 82000, ARRAY['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'], true),
  ('vestido-satinado-de-noche-zara-luxe', 'Vestido Satinado de Noche Zara Luxe', 'MODA', 'Vestido largo midi confeccionado en fluido tejido satinado verde esmeralda, escote drapeado tipo cowl y tirantes finos ajustables.', 48000, ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'], true),
  ('abrigo-largo-de-lana-mango-atelier', 'Abrigo Largo de Lana Camel Mango Atelier', 'MODA', 'Abrigo sofisticado cruzado con mezcla de lana noble, solapas muesca anchas y cinturón ajustable del mismo tejido.', 120000, ARRAY['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'], true),
  ('blazer-oversized-de-cuero-sintetico-bershka', 'Blazer Oversized Tailored Edition', 'MODA', 'Chaqueta estilo blazer de corte masculino relajado en tono negro. Botones dorados en contraste y bolsillos de solapa frontales.', 42000, ARRAY['https://images.unsplash.com/photo-1548624149-f1e1f37e44c2?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'], true),
  ('sudadera-oversized-puma-select-pink', 'Sudadera Oversized Puma Select', 'MODA', 'Sudadera de felpa suave en tono rosa pastel con capucha ajustable y bolsillo canguro. Estilo relajado e informal de máxima comodidad.', 38000, ARRAY['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'], true),
  ('chaqueta-bomber-nike-sportswear-essentials', 'Chaqueta Bomber Nike Sportswear', 'MODA', 'Bomber acolchada con acabado brillante resistente al agua. Puños y cuello de canalé con cremallera frontal bidireccional.', 75000, ARRAY['https://images.unsplash.com/photo-1548624149-f1e1f37e44c2?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'], true),
  ('vestido-ajustado-ribbed-victorias-secret', 'Vestido Ajustado Ribbed Victoria''s Secret', 'MODA', 'Vestido tubo de tejido elástico acanalado que moldea la silueta con suavidad. Cuello redondo y largo por encima de la rodilla.', 34000, ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'], true),
  ('jumpsuit-de-noche-strapless-hm-edition', 'Jumpsuit de Noche Strapless HM Edition', 'MODA', 'Mono largo en color negro con escote palabra de honor y pernera recta ancha. Incluye cinturón de hebilla metálica.', 39000, ARRAY['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1548624149-f1e1f37e44c2?auto=format&fit=crop&w=800&q=80'], true),
  ('bolso-gucci-gg-marmont-matelasse', 'Bolso de Mano Gucci GG Marmont', 'ACCESORIOS', 'Elaborado en suave piel acolchada matelassé en tono marfil con el icónico aplique de la doble G en dorado envejecido y correa de cadena.', 185000, ARRAY['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'], true),
  ('tacones-stiletto-christian-louboutin-so-kate', 'Tacones Christian Louboutin So Kate 120mm', 'ACCESORIOS', 'El stiletto por excelencia. Piel de charol negro brillante con puntera afilada y la legendaria suela roja lacada.', 210000, ARRAY['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'], true),
  ('reloj-michael-kors-pyper-rose-gold', 'Reloj Michael Kors Pyper Rose Gold', 'ACCESORIOS', 'Reloj elegante con caja y brazalete de acero inoxidable bañado en oro rosa. Esfera sobria con índices de cristal pavé.', 78000, ARRAY['https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'], true),
  ('gafas-de-sol-ray-ban-aviator-classic', 'Gafas de Sol Ray-Ban Aviator Classic', 'ACCESORIOS', 'Las gafas que definieron el estilo atemporal. Montura metálica dorada de gota de agua con lentes de cristal verde G-15.', 68000, ARRAY['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'], true),
  ('zapatillas-nike-air-force-1-07-triple-white', 'Zapatillas Nike Air Force 1 ''07 Triple White', 'ACCESORIOS', 'La leyenda de las pistas trasladada a la calle. Piel de vacuno premium totalmente blanca con amortiguación de aire encapsulada.', 62000, ARRAY['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'], true),
  ('cinturon-de-cuero-ysl-monogram-cassandre', 'Cinturón de Cuero YSL Monogram Cassandre', 'ACCESORIOS', 'Confeccionado en Italia con suave piel de becerro negra. Hebilla con el distintivo monograma YSL en latón con acabado brillante.', 92000, ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'], true),
  ('pendientes-swarovski-constella-drop', 'Pendientes Swarovski Constella Drop', 'ACCESORIOS', 'Inspirados en el brillo de las constelaciones. Piedras de corte redondo engastadas en garras bañadas en tono oro rosa.', 45000, ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1611591475285-a36adaf961e0?auto=format&fit=crop&w=800&q=80'], true),
  ('bolso-tote-michael-kors-jet-set-saffiano', 'Bolso Tote Michael Kors Jet Set Saffiano', 'ACCESORIOS', 'Espacioso y resistente bolso tote en piel saffiano de alta durabilidad. Compartimentos internos organizados y colgante con logotipo MK.', 115000, ARRAY['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'], true),
  ('gafas-de-sol-cat-eye-ysl-saint-laurent', 'Gafas de Sol Cat-Eye YSL Saint Laurent', 'ACCESORIOS', 'Diseño en acetato negro pulido de silueta mariposa/cat-eye que estiliza las facciones. 100% protección UV con cristales oscuros.', 89000, ARRAY['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'], true)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- Crear usuario admin: admin@ebna.com
-- NOTA: Después de ejecutar este script, ve a 
-- Authentication > Users en Supabase Dashboard y
-- crea el usuario admin@ebna.com / admin123 manualmente.
-- Luego actualiza su rol con:
-- UPDATE public.profiles SET role = 'ADMIN' WHERE id = '<UUID_DEL_USUARIO>';
-- =====================================================
