const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const supabaseUrl = 'https://epifjpbwbnphlhhfhigm.supabase.co';
const supabaseAnonKey = 'sb_publishable_e1J-2BHSP9bAUT7IlI3o4w_cqUqSTRQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

async function resetAndSeedSupabase() {
  console.log('🧹 Wiping old products from Supabase products table...');
  try {
    const { error: delError } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (delError) console.warn('Delete notice:', delError.message);
    else console.log('✅ Old products wiped successfully!');
  } catch (e) {
    console.warn('Wipe notice:', e.message);
  }

  console.log(`\n🚀 Seeding ${products.length} fresh products to Supabase...`);

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const dbRows = products.map((p, idx) => {
    let prodId = p.id;
    if (!uuidRegex.test(prodId)) {
      const md5 = crypto.createHash('md5').update(`ebna-clean-${p.sku}-${idx}`).digest('hex');
      prodId = `${md5.slice(0,8)}-${md5.slice(8,12)}-4${md5.slice(13,16)}-a${md5.slice(17,20)}-${md5.slice(20,32)}`;
    }
    const primaryImg = p.images?.primary || (Array.isArray(p.images) ? p.images[0] : '/icons/ebna-logo.png');

    return {
      id: prodId,
      slug: p.slug || `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${idx + 1}`,
      name: p.name,
      category: p.category || 'MODA_MUJER',
      description: p.description || '',
      price: p.priceFCFA || p.price || 15000,
      images: [primaryImg],
      in_stock: p.inStock !== false
    };
  });

  for (let i = 0; i < dbRows.length; i += 20) {
    const chunk = dbRows.slice(i, i + 20);
    const { error } = await supabase.from('products').upsert(chunk, { onConflict: 'slug' });
    if (error) {
      console.warn(`Chunk ${i / 20 + 1} notice:`, error.message);
    } else {
      console.log(`✅ Chunk ${i / 20 + 1} (${chunk.length} products) seeded successfully`);
    }
  }

  console.log('\n🎉 Fresh database re-initialization completed!');
}

resetAndSeedSupabase().catch(console.error);
