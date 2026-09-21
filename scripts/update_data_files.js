import fs from 'fs';
import path from 'path';

const productsJsonPath = 'c:/Users/RYESA/Documents/sindy luxury/scripts/processed_products.json';
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

console.log(`Loaded ${products.length} processed products.`);

// Generate new demoData.ts content
const demoDataContent = `import type { Product } from '../types';
import { generateSlug } from './utils';

// ============================================================
// Data Layer — LocalStorage & Supabase sync for EBNA Luxury
// ============================================================

export interface UserAccount {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'ADMIN' | 'USER';
  created_at: string;
  last_seen: string;
}

// Storage keys
const PRODUCTS_STORAGE_KEY = 'ebna_crud_products_v4';
const USERS_STORAGE_KEY = 'ebna_crud_users_v1';

// Full 117 analyzed products from IMG PRODUCTOS with rounded +25% prices in FCFA, sizes & colors
export const ANALYZED_PINTEREST_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Product[];
      if (parsed && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error loading products from localStorage:', e);
  }
  // Store initial products to localStorage
  saveProducts(ANALYZED_PINTEREST_PRODUCTS);
  return [...ANALYZED_PINTEREST_PRODUCTS];
}

function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.warn('Error saving products to localStorage:', e);
  }
}

// Mutable in-memory cache synced with localStorage
export let DEMO_PRODUCTS: Product[] = loadProducts();

export function demoGetProducts(): Product[] {
  DEMO_PRODUCTS = loadProducts();
  return [...DEMO_PRODUCTS];
}

export function demoAddProduct(productData: Partial<Product>): Product {
  const now = new Date().toISOString();
  const newProduct: Product = {
    id: 'prod-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    slug: generateSlug(productData.name || 'producto'),
    name: productData.name || 'Nuevo Producto',
    category: (productData.category as any) || 'COSMETICA',
    description: productData.description || '',
    price: productData.price || 0,
    images: productData.images && productData.images.length > 0
      ? productData.images
      : ['/icons/ebna-logo.png'],
    in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
    colors: productData.colors || ['Blanco', 'Negro', 'Rosa'],
    sizes: productData.sizes || ['S', 'M', 'L', 'XL'],
    created_at: now,
    updated_at: now,
  };
  DEMO_PRODUCTS = [newProduct, ...DEMO_PRODUCTS];
  saveProducts(DEMO_PRODUCTS);
  return newProduct;
}

export function demoUpdateProduct(id: string, productData: Partial<Product>): Product | null {
  DEMO_PRODUCTS = loadProducts();
  const index = DEMO_PRODUCTS.findIndex(p => p.id === id);
  if (index === -1) return null;
  const updatedProduct: Product = {
    ...DEMO_PRODUCTS[index],
    ...productData,
    slug: productData.name ? generateSlug(productData.name) : DEMO_PRODUCTS[index].slug,
    updated_at: new Date().toISOString(),
  };
  DEMO_PRODUCTS[index] = updatedProduct;
  saveProducts(DEMO_PRODUCTS);
  return updatedProduct;
}

export function demoDeleteProduct(id: string): boolean {
  DEMO_PRODUCTS = loadProducts();
  const initialLen = DEMO_PRODUCTS.length;
  DEMO_PRODUCTS = DEMO_PRODUCTS.filter(p => p.id !== id);
  saveProducts(DEMO_PRODUCTS);
  return DEMO_PRODUCTS.length < initialLen;
}

// ----------------------------------------------------------
// USERS — persisted in localStorage
// ----------------------------------------------------------

const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'usr-admin-001',
    email: 'Admin@ebna.com',
    full_name: 'Administrador Principal EBNA',
    phone: '+240 222 000 111',
    role: 'ADMIN',
    created_at: '2026-01-01T00:00:00Z',
    last_seen: new Date().toISOString(),
  },
];

function loadUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserAccount[];
      if (parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error loading users from localStorage:', e);
  }
  return [...DEFAULT_USERS];
}

function saveUsers(users: UserAccount[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn('Error saving users to localStorage:', e);
  }
}

export let DEMO_USERS: UserAccount[] = loadUsers();

export function demoGetUsers(): UserAccount[] {
  DEMO_USERS = loadUsers();
  return [...DEMO_USERS];
}

export function demoUpdateUserRole(userId: string, newRole: 'ADMIN' | 'USER'): UserAccount[] {
  DEMO_USERS = loadUsers();
  const user = DEMO_USERS.find(u => u.id === userId);
  if (user) {
    user.role = newRole;
    saveUsers(DEMO_USERS);
  }
  return [...DEMO_USERS];
}

// ----------------------------------------------------------
// AUTH helpers
// ----------------------------------------------------------

export function demoSignIn(email: string, pass: string): { data: { user: any; profile: any }; error: any } {
  DEMO_USERS = loadUsers();
  const cleanEmail = email.toLowerCase().trim();

  if (cleanEmail === 'admin@ebna.com') {
    if (pass === '@sindyluxury2026' || pass === 'Admin123!' || pass === 'admin123' || pass === '123456') {
      const adminUser = DEMO_USERS.find(u => u.email.toLowerCase() === 'admin@ebna.com') || DEFAULT_USERS[0];
      const adminProfile = {
        id: adminUser.id,
        full_name: adminUser.full_name,
        phone: adminUser.phone,
        role: 'ADMIN' as const,
        created_at: adminUser.created_at,
        last_seen: new Date().toISOString(),
      };
      return { data: { user: adminUser, profile: adminProfile }, error: null };
    }
    return { data: { user: null, profile: null }, error: 'Contraseña incorrecta. Usa: @sindyluxury2026' };
  }

  const found = DEMO_USERS.find(u => u.email.toLowerCase() === cleanEmail);
  if (found) {
    const userProfile = {
      id: found.id,
      full_name: found.full_name,
      phone: found.phone,
      role: found.role,
      created_at: found.created_at,
      last_seen: new Date().toISOString(),
    };
    return { data: { user: found, profile: userProfile }, error: null };
  }

  return { data: { user: null, profile: null }, error: 'Credenciales inválidas. Usa Admin@ebna.com / @sindyluxury2026' };
}

export function demoSignUp(email: string, _pass: string, fullName: string, phone: string): { data: { user: any; profile: any }; error: any } {
  DEMO_USERS = loadUsers();
  const cleanEmail = email.toLowerCase().trim();
  const existing = DEMO_USERS.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    const profile = {
      id: existing.id,
      full_name: existing.full_name,
      phone: existing.phone,
      role: existing.role,
      created_at: existing.created_at,
      last_seen: new Date().toISOString(),
    };
    return { data: { user: existing, profile }, error: null };
  }

  const newUser: UserAccount = {
    id: 'usr-' + Date.now(),
    email: cleanEmail,
    full_name: fullName,
    phone,
    role: 'USER',
    created_at: new Date().toISOString(),
    last_seen: new Date().toISOString(),
  };
  DEMO_USERS.push(newUser);
  saveUsers(DEMO_USERS);

  const newProfile = {
    id: newUser.id,
    full_name: newUser.full_name,
    phone: newUser.phone,
    role: newUser.role,
    created_at: newUser.created_at,
    last_seen: new Date().toISOString(),
  };

  return { data: { user: newUser, profile: newProfile }, error: null };
}
`;

fs.writeFileSync('c:/Users/RYESA/Documents/sindy luxury/src/lib/demoData.ts', demoDataContent, 'utf-8');
console.log('Updated src/lib/demoData.ts successfully!');

// Also generate updated SQL insert statements for supabase-schema.sql
let sqlInsertValues = products.map(p => {
  const escName = p.name.replace(/'/g, "''");
  const escDesc = p.description.replace(/'/g, "''");
  const imgArray = `ARRAY['${p.images[0]}']`;
  const colorsArray = `ARRAY[${p.colors.map(c => `'${c}'`).join(',')}]`;
  const sizesArray = `ARRAY[${p.sizes.map(s => `'${s}'`).join(',')}]`;
  return `  ('${p.slug}', '${escName}', '${p.category}', '${escDesc}', ${p.price}, ${imgArray}, ${p.in_stock}, ${colorsArray}, ${sizesArray})`;
}).join(',\n');

const sqlSchema = `-- =====================================================
-- EBNA Moda & Cosmética — Supabase Database Schema (117 Productos)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  images TEXT[] NOT NULL DEFAULT '{}',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  colors TEXT[] NOT NULL DEFAULT '{}',
  sizes TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Products full access" ON public.products;
CREATE POLICY "Products full access" ON public.products FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.products (slug, name, category, description, price, images, in_stock, colors, sizes) VALUES
${sqlInsertValues}
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  updated_at = now();
`;

fs.writeFileSync('c:/Users/RYESA/Documents/sindy luxury/supabase-schema.sql', sqlSchema, 'utf-8');
console.log('Updated supabase-schema.sql successfully!');
