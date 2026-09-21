import fs from 'fs';
import path from 'path';

const sourceDir = 'c:/Users/RYESA/Documents/sindy luxury/IMG PRODUCTOS';
const targetDir = 'c:/Users/RYESA/Documents/sindy luxury/public/products';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);
console.log(`Found ${files.length} files in IMG PRODUCTOS`);

function roundPriceClean(rawPriceFcfa) {
  const markedUp = rawPriceFcfa * 1.25;
  if (markedUp > 10000) {
    return Math.ceil(markedUp / 1000) * 1000;
  } else {
    return Math.ceil(markedUp / 500) * 500;
  }
}

const categoriesMap = {
  "soap": "JABONES",
  "savon": "JABONES",
  "jabón": "JABONES",
  "jabon": "JABONES",
  "turmeric": "JABONES",
  "kojic": "JABONES",
  "palmolive": "JABONES",
  "galong": "JABONES",
  "asantee": "JABONES",
  "lotion": "COSMETICA",
  "loción": "COSMETICA",
  "locion": "COSMETICA",
  "cream": "COSMETICA",
  "crema": "COSMETICA",
  "serum": "COSMETICA",
  "sérum": "COSMETICA",
  "perfume": "COSMETICA",
  "parfum": "COSMETICA",
  "zara": "MODA",
  "dress": "MODA",
  "vestido": "MODA",
  "hoodie": "MODA",
  "sudadera": "MODA",
  "pant": "MODA",
  "pantalón": "MODA",
  "pants": "MODA",
  "short": "MODA",
  "shorts": "MODA",
  "tracksuit": "MODA",
  "chándal": "MODA",
  "skirt": "MODA",
  "falda": "MODA",
  "top": "MODA",
  "sneakers": "ACCESORIOS",
  "shoes": "ACCESORIOS",
  "zapatos": "ACCESORIOS",
  "zapatillas": "ACCESORIOS",
  "boots": "ACCESORIOS",
  "botas": "ACCESORIOS",
  "flats": "ACCESORIOS",
  "heels": "ACCESORIOS",
  "tacones": "ACCESORIOS",
  "crocs": "ACCESORIOS",
  "sandals": "ACCESORIOS",
  "sandalias": "ACCESORIOS",
  "bag": "ACCESORIOS",
  "bolso": "ACCESORIOS",
  "passport": "ACCESORIOS",
  "pasaporte": "ACCESORIOS",
  "bonnet": "ACCESORIOS",
  "touca": "ACCESORIOS",
  "glasses": "ACCESORIOS",
  "gafas": "ACCESORIOS",
  "lipstick": "COSMETICA",
  "labial": "COSMETICA",
  "lip": "COSMETICA",
  "scrub": "COSMETICA",
  "exfoliante": "COSMETICA",
  "vaseline": "VASELINAS",
  "vaselina": "VASELINAS",
  "avena": "COSMETICA",
  "topicrem": "COSMETICA"
};

const defaultColorsByCat = {
  "MODA": ["Negro", "Blanco", "Rojo", "Azul Marino", "Verde Esmeralda", "Beige", "Gris Mate"],
  "ACCESORIOS": ["Negro", "Blanco", "Dorado", "Marrón", "Rosa Palo", "Plateado"],
  "JABONES": ["Naranja", "Amarillo Cúrcuma", "Blanco Crema", "Verde Natural"],
  "COSMETICA": ["Transparente", "Rosa", "Blanco Satinado", "Dorado Luxe"],
  "VASELINAS": ["Transparente", "Rosa Suave", "Azul Clásico", "Original"]
};

const defaultSizesByCat = {
  "MODA": ["S", "M", "L", "XL", "XXL"],
  "ACCESORIOS": ["37", "38", "39", "40", "41", "42"],
  "JABONES": ["100g", "150g", "200g", "Pack x3"],
  "COSMETICA": ["30ml", "50ml", "100ml", "200ml", "500ml"],
  "VASELINAS": ["50g", "100g", "250g", "Pack x4"]
};

const products = [];

files.forEach((filename, idx) => {
  const i = idx + 1;
  const srcPath = path.join(sourceDir, filename);
  const stat = fs.statSync(srcPath);
  if (!stat.isFile()) return;

  let ext = path.extname(filename).toLowerCase();
  if (!ext || !['.jpg', '.jpeg', '.png', '.webp', '.jfif'].includes(ext)) {
    ext = '.jpg';
  }

  const cleanTargetName = `catalog-prod-${String(i).padStart(3, '0')}${ext}`;
  const dstPath = path.join(targetDir, cleanTargetName);
  fs.copyFileSync(srcPath, dstPath);

  const rawTitle = path.basename(filename, path.extname(filename));
  let cleanTitle = rawTitle.replace(/^\d+\./, '').replace(/^\d{10,}/, '').replace(/[_]/g, ' ').replace(/[-]/g, ' ').trim();
  if (cleanTitle.length < 5 || /^\d+$/.test(cleanTitle)) {
    cleanTitle = `Producto Exclusivo EBNA Luxury N°${i}`;
  }

  let category = "COSMETICA";
  const titleLower = cleanTitle.toLowerCase();
  for (const [kw, cat] of Object.entries(categoriesMap)) {
    if (titleLower.includes(kw)) {
      category = cat;
      break;
    }
  }

  let basePrice = 4500;
  if (category === "MODA") {
    basePrice = (titleLower.includes("dress") || titleLower.includes("suit") || titleLower.includes("vestido")) ? 28000 : 18000;
  } else if (category === "ACCESORIOS") {
    basePrice = (titleLower.includes("sneakers") || titleLower.includes("boots") || titleLower.includes("heels")) ? 22000 : 12000;
  } else if (category === "VASELINAS") {
    basePrice = 3500;
  } else if (category === "JABONES") {
    basePrice = (titleLower.includes("pack") || titleLower.includes("12")) ? 3000 : 2200;
  } else {
    basePrice = (titleLower.includes("perfum") || titleLower.includes("lotion") || titleLower.includes("serum")) ? 8500 : 4500;
  }

  const finalPrice = roundPriceClean(basePrice);
  const inStock = (i % 8 !== 0); // 88% in stock, 12% out of stock

  const colors = defaultColorsByCat[category] || ["Blanco", "Negro", "Rosa", "Dorado"];
  const sizes = defaultSizesByCat[category] || ["Standard"];

  let slugBase = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (!slugBase) slugBase = `producto-ebna-${i}`;
  const slug = `${slugBase}-${i}`;

  const desc = `${cleanTitle}. Producto original de alta calidad, seleccionado exclusivamente para el catálogo EBNA Luxury en Guinea Ecuatorial. Disponible en varios tonos y modelos con envío directo por WhatsApp.`;

  products.push({
    id: `prod-ebna-${String(i).padStart(3, '0')}`,
    slug: slug,
    name: cleanTitle.substring(0, 80),
    category: category,
    description: desc,
    price: finalPrice,
    images: [`/products/${cleanTargetName}`],
    in_stock: inStock,
    colors: colors.slice(0, 5),
    sizes: sizes.slice(0, 5),
    created_at: "2026-09-20T20:00:00Z",
    updated_at: "2026-09-20T20:00:00Z"
  });
});

console.log(`Processed ${products.length} products successfully.`);

const jsonPath = 'c:/Users/RYESA/Documents/sindy luxury/scripts/processed_products.json';
fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf-8');
console.log('Saved processed_products.json successfully!');
