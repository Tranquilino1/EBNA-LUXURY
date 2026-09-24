import { createClient } from '@libsql/client';
import { INITIAL_PRODUCTS } from '../lib/demoData';

const TURSO_URL = (process.env.TURSO_DATABASE_URL || 'https://ebna-luxury-aidasolution.aws-us-west-2.turso.io').replace('libsql://', 'https://');
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTAyODY0ODcsImlkIjoiMDFhMGQ1NjItYzIwMS03YjY0LTkwYWMtOTk2ZTU1MTk5YjU3Iiwia2lkIjoiQ0N6d1dtY3ZiZjJad2J5TjNSdV9HYXY0LTBYTENQRGpBcEZhUXNPWTlHcyIsInJpZCI6IjE5ODk3ODZlLWY4M2QtNDYyNy05ZDJmLTYxMDQwYmY1NTQ1ZCJ9.q1taQDxj7xmrfBBNmTivkWlXPrRocWdMEiuf0YYSMT6Ez-Tb6QSMkA7IptC4khXx1PlzBVsG3YpTD7Q0OPngBA';

console.log(`🔌 Conectando a Turso Cloud: ${TURSO_URL}...`);
const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

async function runSeed() {
  console.log(`🔍 Comprobando estado actual de la base de datos...`);
  
  const existingRes = await client.execute('SELECT id FROM products');
  const existingIds = new Set(existingRes.rows.map(r => String(r.id)));
  console.log(`📊 Productos ya presentes en Turso Cloud: ${existingIds.size} de ${INITIAL_PRODUCTS.length}`);

  const pending = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
  if (pending.length === 0) {
    console.log(`🎉 ¡Todos los productos (${INITIAL_PRODUCTS.length}) ya están sincronizados en Turso Cloud!`);
    return;
  }

  console.log(`🚀 Sincronizando los ${pending.length} productos restantes en lotes seguros de 10...`);
  const now = Date.now();
  const BATCH_SIZE = 10;

  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const chunk = pending.slice(i, i + BATCH_SIZE);
    const statements = chunk.map(prod => {
      const rawCat = prod.category || 'MODA_MUJER';
      const categoryId = `cat-${rawCat.toLowerCase().replace(/_/g, '-')}`;
      const price = Math.round(prod.priceFCFA || prod.price || 0);
      const rawImg = prod.images?.primary || (Array.isArray(prod.images) ? prod.images[0] : (typeof prod.images === 'string' ? prod.images : ''));
      const mainImageUrl = typeof rawImg === 'string' && rawImg ? rawImg : '/icons/ebna-logo.png';
      const gallery = prod.images?.gallery || (Array.isArray(prod.images) ? prod.images : []);
      const productSlug = prod.slug || `prod-${prod.id}`;

      return {
        sql: `INSERT OR REPLACE INTO products (id, slug, title, description, price, currency, stock, status, category_id, main_image_url, gallery_images, is_featured, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'XAF', ?, 'published', ?, ?, ?, ?, ?, ?)`,
        args: [
          prod.id,
          productSlug,
          prod.name,
          prod.description || `Prenda exclusiva ${prod.name}`,
          price > 0 ? price : 25000,
          prod.in_stock || prod.inStock ? 10 : 0,
          categoryId,
          mainImageUrl,
          JSON.stringify(gallery),
          prod.is_featured || prod.featured ? 1 : 0,
          now,
          now,
        ],
      };
    });

    let success = false;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        await client.batch(statements);
        success = true;
        const totalNow = existingIds.size + Math.min(i + BATCH_SIZE, pending.length);
        console.log(`✅ Progreso: ${totalNow}/${INITIAL_PRODUCTS.length} sincronizados.`);
        break;
      } catch (err) {
        console.warn(`⚠️ Reintento ${attempt}/5 para lote ${Math.floor(i / BATCH_SIZE) + 1}...`);
        await new Promise(r => setTimeout(r, 1500));
      }
    }

    if (!success) {
      console.error(`❌ No se pudo sincronizar el lote en ${i}. Continuando con el siguiente...`);
    }
  }

  // Verificación final
  const res = await client.execute('SELECT COUNT(*) as total FROM products');
  console.log(`🎉 ¡PROCESO FINALIZADO! Total verificado en Turso Cloud: ${res.rows[0]?.total} productos.`);
}

runSeed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error general:', err);
    process.exit(1);
  });
