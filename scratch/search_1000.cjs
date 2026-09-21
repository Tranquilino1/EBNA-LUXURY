const fs = require('fs');
const path = require('path');

function searchDir(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath, pattern);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.css') || file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('1000') || content.includes('1.000') || content.includes('1,000')) {
        console.log(`Found in: ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (line.includes('1000') || line.includes('1.000') || line.includes('1,000')) {
            console.log(`  Line ${idx + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

console.log('Searching src/ and index.html...');
searchDir(path.join(__dirname, '../src'), '1000');
const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
if (indexHtml.includes('1000') || indexHtml.includes('1.000')) {
  console.log('Found in index.html');
}
