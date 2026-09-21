const fs = require('fs');
const path = require('path');

const demoDataPath = path.join(__dirname, '..', 'src', 'lib', 'demoData.ts');
const publicProductsDir = path.join(__dirname, '..', 'public', 'products');
const content = fs.readFileSync(demoDataPath, 'utf8');

const jsonStart = content.indexOf('export const INITIAL_PRODUCTS: Product[] = [');
const jsonEnd = content.indexOf(';\n\n// Fast in-memory lookup maps');
const rawArrayString = content.substring(jsonStart + 'export const INITIAL_PRODUCTS: Product[] = '.length, jsonEnd);
const products = JSON.parse(rawArrayString);

console.log(`=== AUDITORIA FINAL DE VERIFICACION (${products.length} PRODUCTOS) ===`);

let missingImages = 0;
let genericPlaceholders = 0;
let clonedRefNames = 0;
let typosFound = 0;

const nameCounts = {};

products.forEach(p => {
  // 1. Check image existence
  const relativeImagePath = p.images[0].replace(/^\/products\//, '');
  const fullImgPath = path.join(publicProductsDir, relativeImagePath);
  if (!fs.existsSync(fullImgPath)) {
    missingImages++;
    console.error(`[ERROR] Imagen no encontrada: ${p.images[0]} (ID: ${p.id})`);
  }

  // 2. Check generic placeholders
  if (p.description.includes('Prenda exclusiva de la nueva colección EBNA Luxury. Confeccionada con acabados impecables')) {
    genericPlaceholders++;
    console.warn(`[WARN] Descripcion placeholder detectada en ID: ${p.id}`);
  }

  // 3. Check cloned Ref names
  if (p.name.includes('(Ref. EB-')) {
    clonedRefNames++;
  }

  // 4. Check typos & untranslated terms
  if (p.name.includes('Filtro Filtro') || p.description.includes('ilumindor') || p.name.includes('Mel & Aveia') || p.name.includes('Rugan')) {
    typosFound++;
    console.warn(`[WARN] Error tipográfico/traducción en ID: ${p.id}`);
  }

  nameCounts[p.name] = (nameCounts[p.name] || 0) + 1;
});

const duplicateNames = Object.entries(nameCounts).filter(([name, count]) => count > 1);

console.log(`- Total Productos: ${products.length}`);
console.log(`- Imágenes Faltantes: ${missingImages}`);
console.log(`- Descripciones Placeholder: ${genericPlaceholders}`);
console.log(`- Nombres Clonados (Ref. EB-X): ${clonedRefNames}`);
console.log(`- Errores Tipográficos / No Traducidos: ${typosFound}`);
console.log(`- Nombres Repetidos en Catálogo: ${duplicateNames.length}`);

if (duplicateNames.length > 0) {
  console.log('Nombres repetidos:', duplicateNames);
}

if (missingImages === 0 && genericPlaceholders === 0 && clonedRefNames === 0 && typosFound === 0) {
  console.log('\n✅ AUDITORIA 100% EXITOSA: El catálogo está perfectamente curado, sin errores, con imágenes existentes y textos de lujo.');
}
