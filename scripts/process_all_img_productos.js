import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'IMG PRODUCTOS');
const targetDir = path.join(__dirname, '..', 'public', 'products');
const demoDataFile = path.join(__dirname, '..', 'src', 'lib', 'demoData.ts');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Clear existing items in targetDir to avoid stale files
const oldFiles = fs.readdirSync(targetDir);
for (const file of oldFiles) {
  try {
    fs.unlinkSync(path.join(targetDir, file));
  } catch (e) {}
}

const files = fs.readdirSync(sourceDir).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.png', '.jpg', '.jpeg', '.jfif', '.webp'].includes(ext);
});

console.log(`Found ${files.length} product images in IMG PRODUCTOS`);

function cleanTitle(filename) {
  let name = path.parse(filename).name;
  name = name
    .replace(/^(\d{10,20})/, '') // remove long numeric IDs
    .replace(/_[A-Za-z0-9_-]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!name || name.length < 3) {
    name = "Producto Exclusivo EBNA Luxury";
  }

  if (name === name.toLowerCase() || name === name.toUpperCase()) {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return name;
}

function detectCategory(filename, title) {
  const text = (filename + ' ' + title).toLowerCase();

  if (text.includes('perfume') || text.includes('eau de parfum') || text.includes('fragrance') || text.includes('zara red vanilla') || text.includes('zara • red vanilla') || text.includes('pivoine') || text.includes('lavande') || text.includes('parfum')) {
    return 'PERFUMES';
  }
  if (text.includes('dress') || text.includes('vestido') || text.includes('robe') || text.includes('bodycon') || text.includes('midi') || text.includes('maxi skirt') || text.includes('skirt') || text.includes('halter-neck')) {
    return 'VESTIDOS';
  }
  if (text.includes('soap') || text.includes('sabun') || text.includes('sabonete') || text.includes('savon') || text.includes('jabón') || text.includes('jabon') || text.includes('palmolive') || text.includes('kojic') || text.includes('turmeric soap') || text.includes('carowhite') || text.includes('sulfur soap')) {
    return 'JABONES';
  }
  if (text.includes('vaseline') || text.includes('vaselina') || text.includes('lip therapy')) {
    return 'VASELINAS';
  }
  if (text.includes('scrub') || text.includes('pomada') || text.includes('crème') || text.includes('crema') || text.includes('mela') || text.includes('exfoliante') || text.includes('esfoliante') || text.includes('balm') || text.includes('gel de ducha')) {
    return 'POMADAS';
  }
  if (text.includes('shoe') || text.includes('zapatos') || text.includes('sneakers') || text.includes('boots') || text.includes('heels') || text.includes('flats') || text.includes('sandals') || text.includes('crocs') || text.includes('dunk') || text.includes('speedcat') || text.includes('pumps') || text.includes('mary jane')) {
    return 'CALZADO';
  }
  if (text.includes('lipstick') || text.includes('makeup') || text.includes('maquillaje') || text.includes('beauty') || text.includes('shower gel') || text.includes('skincare') || text.includes('lotion') || text.includes('loción') || text.includes('pieles atopicas') || text.includes('instituto español')) {
    return 'COSMETICA';
  }
  if (text.includes('bonnet') || text.includes('touca') || text.includes('passport') || text.includes('pasaporte') || text.includes('glasses') || text.includes('gafas') || text.includes('holder') || text.includes('bag') || text.includes('bolsa')) {
    return 'ACCESORIOS';
  }

  return 'MODA';
}

function generateRichDescription(title, category, color) {
  if (category === 'PERFUMES') {
    return `${title} — Fragancia exclusiva de alta gama. Notas olfativas elegantes y duraderas creadas para destacar sofisticación y presencia distintiva en cualquier ocasión.`;
  }
  if (category === 'VESTIDOS') {
    return `${title} — Vestido de diseño contemporáneo confeccionado con tejidos suaves de acabado drapeado. Ajuste favorecedor de alta costura disponible en tono ${color}.`;
  }
  if (category === 'CALZADO') {
    return `${title} — Calzado ergonómico con plantilla acolchada y acabados de lujo. Diseño versátil para uso diario o eventos con máximo confort.`;
  }
  if (category === 'JABONES') {
    return `${title} — Jabón formulado con extractos naturales purificantes. Limpia suavemente la piel manteniendo su hidratación y luminosidad natural.`;
  }
  if (category === 'VASELINAS') {
    return `${title} — Tratamiento de vaselina enriquecido con vitaminas. Nutrición profunda y barrera protectora de 24 horas para piel y labios.`;
  }
  if (category === 'POMADAS') {
    return `${title} — Pomada y tratamiento exfoliante intensivo. Ayuda a unificar el tono de la piel, renovar textura y proporcionar máxima suavidad.`;
  }
  if (category === 'COSMETICA') {
    return `${title} — Fórmula dermatológica avanzada de absorción rápida. Aporta hidratación profunda, frescura y acabado radiante.`;
  }
  if (category === 'ACCESORIOS') {
    return `${title} — Accesorio de moda imprescindible con acabados de alta calidad. Combina funcionalidad premium y estética de lujo.`;
  }
  return `${title} — Prenda de vestir con corte vanguardista y costuras reforzadas. Estilo cómodo y elegante de la colección EBNA Luxury.`;
}

function detectColor(filename, title) {
  const text = (filename + ' ' + title).toLowerCase();

  if (text.includes('pink') || text.includes('rosa') || text.includes('gül')) return 'Rosa';
  if (text.includes('black') || text.includes('negro') || text.includes('preto') || text.includes('noire')) return 'Negro';
  if (text.includes('white') || text.includes('blanco') || text.includes('branco')) return 'Blanco';
  if (text.includes('red') || text.includes('rojo') || text.includes('wine') || text.includes('bordo')) return 'Rojo';
  if (text.includes('blue') || text.includes('azul') || text.includes('navy')) return 'Azul';
  if (text.includes('yellow') || text.includes('amarillo') || text.includes('turmeric') || text.includes('cúrcuma') || text.includes('turuncu') || text.includes('lemon')) return 'Amarillo';
  if (text.includes('green') || text.includes('verde')) return 'Verde';
  if (text.includes('grey') || text.includes('gris')) return 'Gris';
  if (text.includes('chocolate') || text.includes('marrón') || text.includes('brown')) return 'Marrón';
  if (text.includes('purple') || text.includes('violeta') || text.includes('peony') || text.includes('lavande')) return 'Violeta';
  if (text.includes('gold') || text.includes('dorado')) return 'Dorado';

  const defaultColors = ['Negro', 'Blanco', 'Rosa', 'Azul', 'Dorado', 'Marrón'];
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return defaultColors[hash % defaultColors.length];
}

function calculatePrice(category) {
  let baseFCFA = 10000;

  if (category === 'PERFUMES') baseFCFA = 25000;
  if (category === 'VESTIDOS') baseFCFA = 20000;
  if (category === 'CALZADO') baseFCFA = 25000;
  if (category === 'MODA') baseFCFA = 15000;
  if (category === 'COSMETICA') baseFCFA = 12000;
  if (category === 'ACCESORIOS') baseFCFA = 10000;
  if (category === 'VASELINAS') baseFCFA = 5000;
  if (category === 'JABONES') baseFCFA = 3000;
  if (category === 'POMADAS') baseFCFA = 10000;
  if (category === 'NIÑOS') baseFCFA = 10000;

  return baseFCFA;
}

function getSizesForCategory(category) {
  if (category === 'CALZADO') return ['36', '37', '38', '39', '40', '41', '42'];
  if (category === 'VESTIDOS' || category === 'MODA') return ['S', 'M', 'L', 'XL', 'XXL'];
  if (category === 'JABONES' || category === 'VASELINAS' || category === 'POMADAS') return ['100g', '150g', '250g', '500ml'];
  if (category === 'COSMETICA' || category === 'PERFUMES') return ['50ml', '100ml', '200ml', 'Standard'];
  return ['Estándar', 'Ajustable'];
}

function generateSlug(title, id) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + `-${id}`;
}

const products = [];

files.forEach((file, index) => {
  const ext = path.extname(file).toLowerCase();
  const targetFilename = `product_${index + 1}${ext}`;
  const targetPath = path.join(targetDir, targetFilename);

  // Copy image file to public/products
  fs.copyFileSync(path.join(sourceDir, file), targetPath);

  const rawTitle = cleanTitle(file);
  const category = detectCategory(file, rawTitle);
  const mainColor = detectColor(file, rawTitle);
  const description = generateRichDescription(rawTitle, category, mainColor);
  const price = calculatePrice(category);
  const id = `ebna-${index + 1}`;
  const slug = generateSlug(rawTitle, id);
  const publicImagePath = `/products/${targetFilename}`;

  const colorsList = Array.from(new Set([mainColor, 'Blanco', 'Negro', 'Rosa'])).slice(0, 3);
  const sizesList = getSizesForCategory(category);

  products.push({
    id,
    slug,
    name: rawTitle,
    category,
    description,
    price,
    images: [publicImagePath],
    in_stock: true,
    is_hidden: false,
    colors: colorsList,
    sizes: sizesList,
    created_at: new Date(Date.now() - index * 3600000).toISOString(),
    updated_at: new Date().toISOString(),
  });
});

console.log(`Successfully processed ${products.length} products into /public/products`);

const tsContent = `import type { Product, Profile } from '../types';

export interface UserAccount {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
}

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

// Fast in-memory lookup maps for hyper-fast 0ms querying
const PRODUCTS_BY_ID = new Map<string, Product>();
const PRODUCTS_BY_SLUG = new Map<string, Product>();

INITIAL_PRODUCTS.forEach(p => {
  PRODUCTS_BY_ID.set(p.id, p);
  PRODUCTS_BY_SLUG.set(p.slug, p);
});

const LOCAL_PRODUCTS_KEY = 'ebna_local_products_v4';
const LOCAL_USERS_KEY = 'ebna_local_users_v4';

export function demoGetProducts(): Product[] {
  try {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error loading products from local cache:', e);
  }
  return INITIAL_PRODUCTS;
}

export function demoSaveProducts(products: Product[]): void {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.warn('Error saving products to local cache:', e);
  }
}

export function demoAddProduct(productData: Partial<Product>): Product {
  const list = demoGetProducts();
  const id = 'ebna-' + Date.now();
  const slug = (productData.name || 'producto').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + id;
  const newProduct: Product = {
    id,
    slug,
    name: productData.name || 'Nuevo Producto EBNA',
    category: (productData.category as any) || 'MODA',
    description: productData.description || 'Descripción del producto',
    price: productData.price || 15000,
    images: productData.images || ['/icons/ebna-logo.png'],
    in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
    is_hidden: productData.is_hidden !== undefined ? productData.is_hidden : false,
    colors: productData.colors || ['Blanco', 'Negro'],
    sizes: productData.sizes || ['S', 'M', 'L'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const updated = [newProduct, ...list];
  demoSaveProducts(updated);
  return newProduct;
}

export function demoUpdateProduct(id: string, updates: Partial<Product>): Product | null {
  const list = demoGetProducts();
  const index = list.findIndex(p => p.id === id);
  if (index === -1) return null;

  const updatedProduct = {
    ...list[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  list[index] = updatedProduct;
  demoSaveProducts(list);
  return updatedProduct;
}

export function demoDeleteProduct(id: string): boolean {
  const list = demoGetProducts();
  const filtered = list.filter(p => p.id !== id);
  demoSaveProducts(filtered);
  return true;
}

export function demoGetUsers(): UserAccount[] {
  try {
    const saved = localStorage.getItem(LOCAL_USERS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [
    {
      id: 'admin-1',
      email: 'admin@ebna.gq',
      full_name: 'Administrador EBNA Luxury',
      phone: '+240 222 633 687',
      role: 'ADMIN',
      created_at: new Date().toISOString(),
    }
  ];
}

export function demoUpdateUserRole(userId: string, newRole: 'USER' | 'ADMIN'): UserAccount[] {
  const users = demoGetUsers();
  const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

export function demoSignIn(email: string, _pass: string): { data: { user: any; profile: Profile } | null; error: any | null } {
  const clean = email.toLowerCase().trim();
  const isAdmin = clean.includes('admin');
  const userId = isAdmin ? 'admin-1' : 'user-' + Date.now();

  const user = { id: userId, email: clean };
  const profile: Profile = {
    id: userId,
    full_name: isAdmin ? 'Administrador EBNA Luxury' : 'Cliente EBNA Luxury',
    phone: '+240 222 633 687',
    role: isAdmin ? 'ADMIN' : 'USER',
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString(),
  };

  return {
    data: { user, profile },
    error: null,
  };
}

export function demoSignUp(email: string, _pass: string, name: string, phone: string): { data: { user: any; profile: Profile } | null; error: any | null } {
  const users = demoGetUsers();
  const userId = 'user-' + Date.now();
  const newUser: UserAccount = {
    id: userId,
    email,
    full_name: name,
    phone,
    role: 'USER',
    created_at: new Date().toISOString(),
  };
  users.push(newUser);
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (e) {}

  const user = { id: userId, email };
  const profile: Profile = {
    id: userId,
    full_name: name,
    phone,
    role: 'USER',
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString(),
  };

  return { data: { user, profile }, error: null };
}
`;

fs.writeFileSync(demoDataFile, tsContent, 'utf8');
console.log(`Updated ${demoDataFile} with ${products.length} products, rich descriptions, and fast map indexing.`);
