const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = 'https://epifjpbwbnphlhhfhigm.supabase.co';
const supabaseAnonKey = 'sb_publishable_e1J-2BHSP9bAUT7IlI3o4w_cqUqSTRQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testValidUuid() {
  const validUuid = crypto.randomUUID();
  console.log('Testing Supabase UPSERT with valid UUID:', validUuid);
  const testProd = {
    id: validUuid,
    slug: 'test-uuid-' + Date.now(),
    name: 'Test Product Valid UUID',
    category: 'PERFUMERIA',
    description: 'Test description',
    price: 15000,
    in_stock: true,
  };

  const { data: upsertData, error: upsertError } = await supabase
    .from('products')
    .upsert([testProd]);

  console.log('UPSERT result:', { data: upsertData, error: upsertError });

  console.log('\nTesting Supabase DELETE by slug...');
  const { data: deleteData, error: deleteError } = await supabase
    .from('products')
    .delete()
    .eq('slug', testProd.slug);

  console.log('DELETE result:', { data: deleteData, error: deleteError });
}

testValidUuid().catch(console.error);
