const fs = require('fs');
const path = require('path');

const demoDataPath = path.join(__dirname, '..', 'src', 'lib', 'demoData.ts');
let content = fs.readFileSync(demoDataPath, 'utf8');

const jsonStart = content.indexOf('export const INITIAL_PRODUCTS: Product[] = [');
const jsonEnd = content.indexOf('];\n\n// Fast in-memory lookup maps');

if (jsonStart === -1 || jsonEnd === -1) {
  console.error('Could not parse INITIAL_PRODUCTS in demoData.ts');
  process.exit(1);
}

const rawArrayString = content.substring(jsonStart + 'export const INITIAL_PRODUCTS: Product[] = '.length, jsonEnd + 1);
let products = JSON.parse(rawArrayString);

console.log(`Processing ${products.length} products for total perfection...`);

// Specific map for individual Ref EB items
const specificNameOverrides = {
  "ebna-1": "Sneakers Urbanos Bicolor Sports Men's Edition",
  "ebna-3": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare Rose",
  "ebna-17": "Pantalón Jeans Wide Leg Streetwear Y2K Denim Blue",
  "ebna-18": "Pack 2x Leggings Elásticos Maternidad Confort Ultra-Soft",
  "ebna-53": "Vestido Midi Gingham Smocked Tie-Strap Elegance",
  "ebna-54": "Vestido Mini Halter Neck Bodycon Satin Finish Gold",
  "ebna-56": "Falda Maxi Jersey Cerelina White Couture",
  "ebna-60": "Vestido de Gala Silueta Sirena Satin Evening Dress Crimson",
  "ebna-61": "Zapato de Tacón Charol Doble Tira Couture Black",
  "ebna-65": "Camiseta Algodón Boston Athletic Fit Oversized Tee Heather",
  "ebna-69": "Pantalón Jeans Wide Leg Streetwear Y2K Vintage Wash",
  "ebna-70": "Sudadera Oversized Thermal Lined Kangaroo Hoodie Cream",
  "ebna-71": "Sudadera Oversized Thermal Lined Kangaroo Hoodie Onyx",
  "ebna-82": "Pantalón Corto Bermuda Casual Men's Solid Color Beige",
  "ebna-84": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare Sage",
  "ebna-89": "Camiseta Algodón Boston Athletic Fit Oversized Tee Off-White",
  "ebna-96": "Zuecos Confort Crocs Original Limited Edition Lavender",
  "ebna-97": "Conjunto Deportivo Hooded Crop Top & Pantalón Flare Cocoa",
  "ebna-104": "Zuecos Confort Crocs Original Limited Edition Mint",
  "ebna-107": "Pantalón Corto Bermuda Casual Men's Solid Color Navy",
  "ebna-112": "Chaqueta Active Soft Mid-Layer Zip Up Oh Polly Style Black",
  "ebna-113": "Chaqueta Active Soft Mid-Layer Zip Up Oh Polly Style Nude",
  "ebna-115": "Vestido Veraniego Polka Dot Retro Flared Red",
  "ebna-126": "Vestido de Gala Silueta Sirena Satin Evening Dress Emerald",
  "ebna-127": "Vestido de Gala Silueta Sirena Satin Evening Dress Royal Blue",
  "ebna-141": "Sudadera Oversized Thermal Lined Kangaroo Hoodie Mocha",

  // Cosmetic duplicates overrides
  "ebna-62": "Exfoliante Labial Nutritivo de Coco & Frambuesa 30g",
  "ebna-63": "Bálsamo Exfoliante Labial Mantequilla de Cacao & Vainilla 30g",
  "ebna-64": "Scrub Labial Renovador Frutos Rojos & Azúcar Moreno 30g",
  
  "ebna-68": "Gel de Ducha Botánico Flora Peony Pivoine Fresh 500ml",
  "ebna-77": "Gel de Ducha Nutritivo Flor de Cerezo & Aceite de Argán 500ml",

  "ebna-76": "Lápiz Labial Líquido Velvet Matte Waterproof Rose Wood",
  "ebna-78": "Lápiz Labial Líquido Velvet Matte Waterproof Ruby Red",

  "ebna-72": "Exfoliante Corporal de Cúrcuma & Sal Marina con Aceite de Jojoba 250g",
  "ebna-120": "Exfoliante Corporal Despigmentante Cúrcuma, Sal Marina & Karité 250g"
};

products = products.map(p => {
  let name = p.name;
  let desc = p.description;

  if (specificNameOverrides[p.id]) {
    name = specificNameOverrides[p.id];
  }

  // Strip any lingering (Ref. EB-X)
  name = name.replace(/\s*\(Ref\. EB-\d+\)/gi, '').trim();

  // Clean slug
  const cleanSlug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + p.id;

  return {
    ...p,
    name,
    slug: cleanSlug,
    description: desc
  };
});

const updatedJsonString = JSON.stringify(products, null, 2);
const newContent = content.substring(0, jsonStart + 'export const INITIAL_PRODUCTS: Product[] = '.length) + 
  updatedJsonString + ';' +
  content.substring(jsonEnd + 1);

fs.writeFileSync(demoDataPath, newContent, 'utf8');
console.log('Sanitization complete!');
