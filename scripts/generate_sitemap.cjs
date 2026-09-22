const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://epifjpbwbnphlhhfhigm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_e1J-2BHSP9bAUT7IlI3o4w_cqUqSTRQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: prods, error } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_hidden', false);

  if (error) {
    console.error('Error fetching products for sitemap:', error);
    return;
  }

  const today = new Date().toISOString().split('T')[0];

  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    '    <loc>https://ebna-luxury.vercel.app/</loc>',
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>daily</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '  <url>',
    '    <loc>https://ebna-luxury.vercel.app/catalogo</loc>',
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>daily</changefreq>',
    '    <priority>0.9</priority>',
    '  </url>'
  ];

  for (const p of prods || []) {
    const modDate = p.updated_at ? p.updated_at.split('T')[0] : today;
    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>https://ebna-luxury.vercel.app/producto/${p.slug}</loc>`);
    xmlLines.push(`    <lastmod>${modDate}</lastmod>`);
    xmlLines.push('    <changefreq>weekly</changefreq>');
    xmlLines.push('    <priority>0.8</priority>');
    xmlLines.push('  </url>');
  }

  xmlLines.push('  <url>');
  xmlLines.push('    <loc>https://ebna-luxury.vercel.app/registro</loc>');
  xmlLines.push(`    <lastmod>${today}</lastmod>`);
  xmlLines.push('    <changefreq>monthly</changefreq>');
  xmlLines.push('    <priority>0.5</priority>');
  xmlLines.push('  </url>');
  xmlLines.push('  <url>');
  xmlLines.push('    <loc>https://ebna-luxury.vercel.app/login</loc>');
  xmlLines.push(`    <lastmod>${today}</lastmod>`);
  xmlLines.push('    <changefreq>monthly</changefreq>');
  xmlLines.push('    <priority>0.5</priority>');
  xmlLines.push('  </url>');
  xmlLines.push('</urlset>');
  xmlLines.push('');

  const targetPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(targetPath, xmlLines.join('\n'), 'utf8');
  console.log(`Generated public/sitemap.xml with ${prods.length} products`);
}

run().catch(console.error);
