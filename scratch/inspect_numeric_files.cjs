const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const list = JSON.parse(fs.readFileSync(path.join(__dirname, 'matched_image_map.json'), 'utf8'));

console.log('--- REVISANDO LOS 142 PRODUCTOS ---');

const categories = {
  MODA: 0,
  CALZADO: 0,
  ACCESORIOS: 0,
  COSMETICA: 0,
  JABONES: 0,
  HIGIENE: 0,
  PERFUMERIA: 0,
  VESTIDOS: 0
};

const items = [];

list.forEach(item => {
  const file = item.origFile || '';
  const text = file.toLowerCase();

  let category = 'MODA';
  let name = '';

  if (text.includes('perfume') || text.includes('eau de parfum') || text.includes('zara red vanilla') || text.includes('zara • red vanilla') || text.includes('fragrance')) {
    category = 'PERFUMERIA';
  } else if (text.includes('dress') || text.includes('vestido') || text.includes('robe') || text.includes('bodycon') || text.includes('skirt') || text.includes('falda') || text.includes('halter-neck')) {
    category = 'VESTIDOS';
  } else if (text.includes('soap') || text.includes('sabun') || text.includes('sabonete') || text.includes('savon') || text.includes('jabón') || text.includes('jabon') || text.includes('palmolive') || text.includes('kojic') || text.includes('turmeric soap') || text.includes('carowhite') || text.includes('sulfur soap') || text.includes('galong')) {
    category = 'JABONES';
  } else if (text.includes('shoe') || text.includes('zapatos') || text.includes('sneakers') || text.includes('boots') || text.includes('heels') || text.includes('flats') || text.includes('sandals') || text.includes('crocs') || text.includes('dunk') || text.includes('speedcat') || text.includes('mary jane') || text.includes('duxal')) {
    category = 'CALZADO';
  } else if (text.includes('scrub') || text.includes('crème') || text.includes('crema') || text.includes('mela') || text.includes('exfoliante') || text.includes('esfoliante') || text.includes('balm') || text.includes('lipstick') || text.includes('makeup') || text.includes('beauty') || text.includes('skincare') || text.includes('serum') || text.includes('vaseline') || text.includes('lip therapy')) {
    category = 'COSMETICA';
  } else if (text.includes('gel de ducha') || text.includes('lotion') || text.includes('loción') || text.includes('pieles atopicas') || text.includes('instituto español') || text.includes('bonnet') || text.includes('touca') || text.includes('champu') || text.includes('shampoo')) {
    category = 'HIGIENE';
  } else if (text.includes('passport') || text.includes('pasaporte') || text.includes('glasses') || text.includes('gafas') || text.includes('holder') || text.includes('bag') || text.includes('bolsa') || text.includes('gucci') || text.includes('marmont')) {
    category = 'ACCESORIOS';
  }

  categories[category]++;

  items.push({
    id: item.id,
    pubFile: item.pubFile,
    origFile: item.origFile,
    detectedCategory: category
  });
});

console.log('Desglose de Categorías detectadas:', categories);
fs.writeFileSync(path.join(__dirname, 'category_breakdown.json'), JSON.stringify(items, null, 2));
