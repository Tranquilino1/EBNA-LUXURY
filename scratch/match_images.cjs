const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const imgProdDir = path.join(__dirname, '..', 'IMG PRODUCTOS');
const pubProdDir = path.join(__dirname, '..', 'public', 'products');

const hashMap = new Map();
const sizeMap = new Map();

fs.readdirSync(imgProdDir).forEach(file => {
  const fullPath = path.join(imgProdDir, file);
  if (fs.statSync(fullPath).isFile()) {
    const buf = fs.readFileSync(fullPath);
    const hash = crypto.createHash('md5').update(buf).digest('hex');
    hashMap.set(hash, file);
    sizeMap.set(buf.length, file);
  }
});

console.log(`Loaded ${hashMap.size} original images from IMG PRODUCTOS.`);

const results = [];

for (let i = 1; i <= 142; i++) {
  let matchedOrig = null;
  let pubFileName = null;

  for (const ext of ['.jfif', '.png', '.webp']) {
    const pubFile = path.join(pubProdDir, `product_${i}${ext}`);
    if (fs.existsSync(pubFile)) {
      pubFileName = `product_${i}${ext}`;
      const buf = fs.readFileSync(pubFile);
      const hash = crypto.createHash('md5').update(buf).digest('hex');
      matchedOrig = hashMap.get(hash) || sizeMap.get(buf.length) || null;
      break;
    }
  }

  results.push({
    id: `ebna-${i}`,
    pubFile: pubFileName,
    origFile: matchedOrig
  });
}

const matchedCount = results.filter(r => r.origFile).length;
console.log(`Matched ${matchedCount} / 142 products to their original descriptive filename!`);

console.log('\n--- MUESTRA DE MATCHES (1 a 15) ---');
results.slice(0, 15).forEach(r => {
  console.log(`${r.id} (${r.pubFile}) -> ${r.origFile ? r.origFile.substring(0, 70) : 'SIN MATCH DIRECTO'}`);
});

fs.writeFileSync(path.join(__dirname, 'matched_image_map.json'), JSON.stringify(results, null, 2));
