import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://epifjpbwbnphlhhfhigm.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_e1J-2BHSP9bAUT7IlI3o4w_cqUqSTRQ';

const supabase = createClient(supabaseUrl, supabaseKey);

const productsJsonPath = 'c:/Users/RYESA/Documents/sindy luxury/scripts/processed_products.json';
const ANALYZED_PRODUCTS = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

async function syncProducts() {
  console.log(`🔄 Sincronizando ${ANALYZED_PRODUCTS.length} productos en Supabase...`);
  
  let successCount = 0;
  for (const prod of ANALYZED_PRODUCTS) {
    const { data, error } = await supabase
      .from('products')
      .upsert({
        slug: prod.slug,
        name: prod.name,
        category: prod.category,
        description: prod.description,
        price: prod.price,
        images: prod.images,
        in_stock: prod.in_stock
      }, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Error insertando ${prod.name}:`, error.message);
    } else {
      successCount++;
    }
  }
  console.log(`🎉 Sincronización completada: ${successCount}/${ANALYZED_PRODUCTS.length} productos insertados en Supabase.`);
}

syncProducts().catch(console.error);
