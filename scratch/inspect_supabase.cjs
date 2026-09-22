const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://epifjpbwbnphlhhfhigm.supabase.co', 'sb_publishable_e1J-2BHSP9bAUT7IlI3o4w_cqUqSTRQ');

async function check() {
  const { data, error } = await supabase.from('products').select('id, slug, name, sku');
  if (error) {
    console.error('Supabase error:', error);
    return;
  }
  console.log('Total in Supabase:', data.length);
  const slugCounts = {};
  data.forEach(p => {
    slugCounts[p.slug] = (slugCounts[p.slug] || 0) + 1;
  });
  const dupes = Object.entries(slugCounts).filter(([k, v]) => v > 1);
  console.log('Duplicate slugs:', dupes.length);
  if (dupes.length > 0) {
    console.log('Sample duplicates:', dupes.slice(0, 5));
  }
}
check();
