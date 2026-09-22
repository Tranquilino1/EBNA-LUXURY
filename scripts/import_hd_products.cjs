const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://epifjpbwbnphlhhfhigm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_e1J-2BHSP9bAUT7IlI3o4w_cqUqSTRQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const srcDir = path.join(__dirname, '..', 'productos_descargados_HD');
const targetDir = path.join(__dirname, '..', 'public', 'products', 'hd');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function generateSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function run() {
  console.log('--- Iniciando Ingesta de Productos HD ---');
  const jsonPath = path.join(srcDir, 'catalogo_productos.json');
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const files = fs.readdirSync(srcDir).filter(f => /\.(jpg|jpeg|png|webp|jfif)$/i.test(f));

  console.log(`Detectadas ${files.length} imágenes en ${srcDir}`);

  // Fetch existing SKUs from Supabase to prevent duplicates
  const { data: existingRows } = await supabase.from('products').select('sku, id, slug');
  const existingSkus = new Set((existingRows || []).map(r => r.sku));
  const existingSlugs = new Set((existingRows || []).map(r => r.slug));

  const productsToUpload = [];

  for (const filename of files) {
    const item = json.find(j => filename.startsWith(j.id.replace('EBNA-', '') + ' ') || filename.includes(j.title.slice(0, 20)));
    const idNum = filename.match(/^(\d+)/)?.[1] || '00';
    const ext = path.extname(filename).toLowerCase();
    const cleanTargetName = 'hd_ebna_' + idNum.padStart(2, '0') + ext;
    const targetPath = path.join(targetDir, cleanTargetName);

    // Copy to public/products/hd/
    fs.copyFileSync(path.join(srcDir, filename), targetPath);

    const webUrl = '/products/hd/' + cleanTargetName;

    const rawTitle = item?.title || filename.replace(/^\d+\s*-\s*/, '').replace(/\.[^.]+$/, '');
    const cleanTitle = rawTitle
      .replace(/\s*-\s*\d+[\.,]?\d*\s*FCFA.*/i, '')
      .replace(/\s*-\s*\d+[\.,]?\d*\s*EUR.*/i, '')
      .replace(/\s*-\s*TALLA.*/i, '')
      .trim();

    const priceNum = item?.price_fcfa || 20000;

    let category = 'MODA_MUJER';
    let subcategory = 'Vestidos de Gala';
    let sizes = ['S', 'M', 'L', 'XL'];
    let brand = 'EBNA Luxury Collection';

    const catUpper = (item?.category || '').toUpperCase();
    const titleLower = cleanTitle.toLowerCase();

    if (catUpper === 'CALZADO' || titleLower.includes('sandalia') || titleLower.includes('bailarina') || titleLower.includes('zapatilla') || titleLower.includes('zueco')) {
      category = 'CALZADO';
      subcategory = titleLower.includes('sandalia') ? 'Sandalias de Lujo' : titleLower.includes('bailarina') ? 'Bailarinas & Flats' : 'Calzado Exclusivo';
      sizes = ['36 EU', '37 EU', '38 EU', '39 EU', '40 EU', '41 EU'];
      brand = 'EBNA Footwear Couture';
    } else if (catUpper === 'ACCESORIOS' || titleLower.includes('bolso') || titleLower.includes('cartera') || titleLower.includes('gorro') || titleLower.includes('pasaporte')) {
      category = 'BOLSOS_ACCESORIOS';
      subcategory = titleLower.includes('bolso') || titleLower.includes('cartera') ? 'Bolsos & Carteras' : 'Accesorios de Lujo';
      sizes = ['Talla Única'];
      brand = 'EBNA Atelier';
    } else if (titleLower.includes('vestido') || catUpper === 'VESTIDOS') {
      category = 'MODA_MUJER';
      subcategory = titleLower.includes('largo') || titleLower.includes('gala') ? 'Vestidos de Gala' : titleLower.includes('corto') || titleLower.includes('mini') ? 'Vestidos de Fiesta & Cóctel' : 'Vestidos Exclusivos';
      brand = 'Sindy Luxury Haute Couture';
    } else if (titleLower.includes('conjunto') || titleLower.includes('set')) {
      category = 'MODA_MUJER';
      subcategory = 'Conjuntos Dos Piezas';
      brand = 'EBNA Fashion Studio';
    } else if (titleLower.includes('mono') || titleLower.includes('enterizo')) {
      category = 'MODA_MUJER';
      subcategory = 'Monos & Enterizos';
      brand = 'EBNA Runway Collection';
    } else {
      category = 'MODA_MUJER';
      subcategory = 'Tops, Corsés & Blusas';
      brand = 'EBNA Luxury Studio';
    }

    const colors = (item?.colors && item.colors.length > 0) ? item.colors : ['Blanco', 'Negro', 'Rojo'];
    const uuid = crypto.randomUUID();
    const sku = 'EB-HD-' + idNum.padStart(2, '0');
    let slug = generateSlug(cleanTitle) + '-hd-' + idNum;
    if (existingSlugs.has(slug)) {
      slug += '-' + uuid.slice(0, 4);
    }

    const desc = `Prenda exclusiva de alta costura de la colección HD ${brand}. Confeccionada con telas premium de textura suave y caída impecable, pensada para lucir distinción y comodidad en cualquier evento de gala o cóctel en Guinea Ecuatorial.`;

    const productPayload = {
      id: uuid,
      sku,
      slug,
      name: cleanTitle,
      brand,
      category,
      subcategory,
      price: priceNum,
      price_fcfa: priceNum,
      in_stock: true,
      is_hidden: false,
      is_featured: false,
      description: desc,
      images: {
        primary: webUrl,
        gallery: [webUrl],
        0: webUrl
      },
      colors,
      sizes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    productsToUpload.push(productPayload);
  }

  console.log(`Generados ${productsToUpload.length} productos listos para insertar.`);

  // Insert in Supabase in batches of 15
  let inserted = 0;
  for (let i = 0; i < productsToUpload.length; i += 15) {
    const chunk = productsToUpload.slice(i, i + 15);
    const { error: insErr } = await supabase.from('products').upsert(chunk, { onConflict: 'sku' });
    if (insErr) {
      console.error(`Error al insertar lote ${i}-${i + chunk.length}:`, insErr.message);
    } else {
      inserted += chunk.length;
      console.log(`Insertados ${inserted}/${productsToUpload.length} productos en Supabase...`);
    }
  }

  // Also save a JSON backup in src/data/hd_products.json
  const outJsonPath = path.join(__dirname, '..', 'src', 'data', 'hd_products.json');
  fs.mkdirSync(path.dirname(outJsonPath), { recursive: true });
  fs.writeFileSync(outJsonPath, JSON.stringify(productsToUpload, null, 2), 'utf8');
  console.log(`Guardada copia local en ${outJsonPath}`);

  // Count total in Supabase
  const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
  console.log(`--- Ingesta completada con éxito. Total productos en Supabase: ${count} ---`);
}

run().catch(console.error);
