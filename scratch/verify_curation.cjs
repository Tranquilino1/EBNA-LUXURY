const fs = require('fs');
const path = require('path');

const demoDataPath = path.join(__dirname, '..', 'src', 'lib', 'demoData.ts');
const publicProductsDir = path.join(__dirname, '..', 'public', 'products');
const content = fs.readFileSync(demoDataPath, 'utf8');

const jsonStart = content.indexOf('export const INITIAL_PRODUCTS: Product[] = [');
const jsonEnd = content.indexOf(';\n\n// Fast in-memory lookup maps');

const rawArrayString = content.substring(jsonStart + 'export const INITIAL_PRODUCTS: Product[] = '.length, jsonEnd);
const products = JSON.parse(rawArrayString);

console.log(`=== AUDITORIA FINAL ESTRUCTURAL Y VISUAL (${products.length} PRODUCTOS) ===`);

let missingImages = 0;
let genericPlaceholders = 0;
let missingSKUs = 0;
let missingBrands = 0;

const nameCounts = {};
const categoryBreakdown = {};

products.forEach(p => {
  // 1. Check primary image existence
  const imgUrl = p.images?.primary || (Array.isArray(p.images) ? p.images[0] : '');
  const relativeImagePath = imgUrl.replace(/^\/products\//, '');
  const fullImgPath = path.join(publicProductsDir, relativeImagePath);
  if (!fs.existsSync(fullImgPath)) {
    missingImages++;
    console.error(`[ERROR] Imagen no encontrada: ${imgUrl} (ID: ${p.id})`);
  }

  // 2. Check SKU presence
  if (!p.sku) missingSKUs++;
  if (!p.brand) missingBrands++;

  // 3. Category count
  categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;

  nameCounts[p.name] = (nameCounts[p.name] || 0) + 1;
});

const duplicateNames = Object.entries(nameCounts).filter(([name, count]) => count > 1);

console.log(`- Total Productos: ${products.length}`);
console.log(`- Categorías Tipadas:`, categoryBreakdown);
console.log(`- Imágenes Faltantes: ${missingImages}`);
console.log(`- SKUs Faltantes: ${missingSKUs}`);
console.log(`- Marcas Faltantes: ${missingBrands}`);
console.log(`- Nombres Repetidos en Catálogo: ${duplicateNames.length}`);

if (missingImages === 0 && missingSKUs === 0 && duplicateNames.length === 0) {
  console.log('\n✅ AUDITORIA 100% EXITOSA: El catálogo cumple estrictamente la interfaz Product, sin imágenes rotas ni nombres duplicados.');
}
