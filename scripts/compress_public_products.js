import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.join(__dirname, '..', 'public', 'products');

const files = fs.readdirSync(productsDir);
console.log(`Checking ${files.length} images in public/products for compression...`);

let totalOriginal = 0;
let totalCompressed = 0;

// Simple PowerShell / Node native check or inline image compression if needed
files.forEach(file => {
  const filePath = path.join(productsDir, file);
  const stat = fs.statSync(filePath);
  totalOriginal += stat.size;
});

console.log(`Total size of public/products: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
