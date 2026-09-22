const fs = require('fs');
const content = fs.readFileSync('src/lib/demoData.ts', 'utf8');
const matches = content.match(/"id":\s*"ebna-\d+"/g);
console.log('Matches count:', matches ? matches.length : 0);
if (matches) {
  const ids = matches.map(m => m.match(/\d+/)[0]);
  console.log('Min id:', Math.min(...ids.map(Number)), 'Max id:', Math.max(...ids.map(Number)));
}
