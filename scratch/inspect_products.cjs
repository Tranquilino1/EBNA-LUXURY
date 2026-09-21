const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/lib/demoData.ts'), 'utf8');

// Match INITIAL_PRODUCTS array
const match = content.match(/export const INITIAL_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.log("Could not find INITIAL_PRODUCTS");
  process.exit(1);
}

const products = JSON.parse(match[1]);
console.log(`Total products: ${products.length}`);

// Print summary of titles
const titleCounts = {};
products.forEach(p => {
  titleCounts[p.name] = (titleCounts[p.name] || 0) + 1;
});

console.log("\nTitle distribution:");
Object.entries(titleCounts).forEach(([title, count]) => {
  if (count > 1 || title.includes("Producto Exclusivo") || title.length > 50 || /[^\x00-\x7F]/.test(title)) {
    console.log(`${count}x: ${title.slice(0, 80)}`);
  }
});
