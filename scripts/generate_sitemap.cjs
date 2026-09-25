const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');

const TURSO_URL = 'https://ebna-luxury-aidasolution.aws-us-west-2.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTAyODY0ODcsImlkIjoiMDFhMGQ1NjItYzIwMS03YjY0LTkwYWMtOTk2ZTU1MTk5YjU3Iiwia2lkIjoiQ0N6d1dtY3ZiZjJad2J5TjNSdV9HYXY0LTBYTENQRGpBcEZhUXNPWTlHcyIsInJpZCI6IjE5ODk3ODZlLWY4M2QtNDYyNy05ZDJmLTYxMDQwYmY1NTQ1ZCJ9.q1taQDxj7xmrfBBNmTivkWlXPrRocWdMEiuf0YYSMT6Ez-Tb6QSMkA7IptC4khXx1PlzBVsG3YpTD7Q0OPngBA';

const turso = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

async function run() {
  console.log('Fetching products from Turso Cloud for sitemap.xml...');
  const res = await turso.execute('SELECT id, slug, status, updated_at FROM products WHERE slug IS NOT NULL AND LENGTH(slug) > 0 ORDER BY id ASC');
  const prods = res.rows || [];

  const today = new Date().toISOString().split('T')[0];

  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <!-- Main Pages -->',
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
    '  </url>',
    '  <url>',
    '    <loc>https://ebna-luxury.vercel.app/recibo</loc>',
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>0.7</priority>',
    '  </url>',
    '  <!-- 188 Official Boutique Products -->',
  ];

  const seenSlugs = new Set();
  for (const p of prods) {
    if (!p.slug || seenSlugs.has(p.slug)) continue;
    seenSlugs.add(p.slug);

    let modDate = today;
    if (p.updated_at) {
      if (typeof p.updated_at === 'number') {
        modDate = new Date(p.updated_at).toISOString().split('T')[0];
      } else if (typeof p.updated_at === 'string' && p.updated_at.includes('T')) {
        modDate = p.updated_at.split('T')[0];
      }
    }

    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>https://ebna-luxury.vercel.app/producto/${encodeURIComponent(p.slug)}</loc>`);
    xmlLines.push(`    <lastmod>${modDate}</lastmod>`);
    xmlLines.push('    <changefreq>weekly</changefreq>');
    xmlLines.push('    <priority>0.8</priority>');
    xmlLines.push('  </url>');
  }

  xmlLines.push('  <!-- Authentication & User Pages -->');
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
  console.log(`Successfully generated public/sitemap.xml with ${seenSlugs.size} products (Total URLs: ${xmlLines.filter(l => l.includes('<loc>')).length})`);
}

run().catch(console.error);
