const fs = require('fs');
const path = require('path');

const sheinCsvPath = path.join(__dirname, '../public/products/shein_dataset/Shein-dataset-samples-main/shein-products.csv');

const raw = fs.readFileSync(sheinCsvPath, 'utf8');

// Parse CSV manually line by line
const lines = raw.split('\n');
console.log('Total lines:', lines.length);

const validItems = [];
lines.forEach((line, idx) => {
  if (idx === 0 || !line.trim()) return;
  // Match fields enclosed in quotes or separated by commas
  const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  if (!matches || matches.length < 5) return;

  const title = matches[0] ? matches[0].replace(/^"|"$/g, '').trim() : '';
  const price = matches[2] ? parseFloat(matches[2].replace(/^"|"$/g, '')) : 0;
  let img = '';
  matches.forEach(m => {
    if (m.includes('https://img.ltwebstatic.com/') && !img) {
      img = m.replace(/^"|"$/g, '').trim();
    }
  });

  if (title && img && price > 0) {
    validItems.push({ title, price, img });
  }
});

console.log('Found valid Shein items with images:', validItems.length);
console.log('Sample valid items:', validItems.slice(0, 5));
