const fs = require('fs');
const path = require('path');

const list = JSON.parse(fs.readFileSync(path.join(__dirname, 'matched_image_map.json'), 'utf8'));

let log = '';
list.forEach(item => {
  log += `${item.id}\t${item.pubFile}\t${item.origFile}\n`;
});

fs.writeFileSync(path.join(__dirname, 'all_142_matches.txt'), log, 'utf8');
console.log('Saved all 142 matches to all_142_matches.txt');
