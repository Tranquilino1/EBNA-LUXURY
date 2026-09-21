const fs = require('fs');
const path = require('path');

const clothingDir = path.join(__dirname, '../public/products/dataset_clothing/dataset_clothing_images-main');
const sheinCsv = path.join(__dirname, '../public/products/shein_dataset/Shein-dataset-samples-main/shein-products.csv');

console.log('=== CLOTHING DATASET FOLDERS ===');
if (fs.existsSync(clothingDir)) {
  const folders = fs.readdirSync(clothingDir).filter(f => fs.statSync(path.join(clothingDir, f)).isDirectory());
  folders.forEach(f => {
    const files = fs.readdirSync(path.join(clothingDir, f)).filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));
    console.log(`Folder: ${f} -> ${files.length} images`);
  });
} else {
  console.log('Clothing directory not found at:', clothingDir);
}

console.log('\n=== SHEIN DATASET PREVIEW ===');
if (fs.existsSync(sheinCsv)) {
  const lines = fs.readFileSync(sheinCsv, 'utf8').split('\n');
  console.log(`Total CSV lines: ${lines.length}`);
} else {
  console.log('Shein CSV not found at:', sheinCsv);
}
