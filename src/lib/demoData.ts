import type { Product, Profile } from '../types';
import { generateUUID } from './utils';
import { notifyCatalogChange } from './broadcast';
import { HD_PRODUCTS } from '../data/hdProducts';
import { COSMETICS_AND_BABY_PRODUCTS } from '../data/cosmeticsBabyProducts';
import { NEW_PRODUCTS_CATALOG } from '../data/newProductsCatalog';

export interface UserAccount {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
}

export const DUPLICATE_IDS_TO_REMOVE = new Set<string>(["a093b587-d06c-43e5-b7d0-e3dc14fb9472","b8e99ffd-dc0c-43d6-a8ec-049143ebe71e","eaa90b43-cfb7-411d-9a66-06ce6dcee325","cbcef8fb-0724-4578-bec8-29aca73bd399","0dddc0fa-99ec-44eb-b911-92d9d291d87e","1c0a9860-9a59-4510-9060-65555c3714e4","68251977-6f81-4d6d-bc56-8ec06e8989c9","e2df788a-d74d-47ba-a8d4-ac311cea77a8","ebna-99","ebna-71","ebna-97","ebna-58","ebna-131","ebna-76","ebna-125","ebna-126","ebna-127","ebna-134","ebna-63","ebna-64","ebna-94","ebna-141","ebna-101","ebna-102","ebna-119","ebna-86","ebna-117","ebna-118","ebna-107","ebna-92","ebna-93","ebna-113","ebna-128","ebna-122","ebna-133","ebna-137","ebna-1","ebna-2","ebna-3","ebna-12","ebna-18","ebna-21","ebna-26","ebna-48","ebna-49","ebna-50","ebna-51","ebna-52","ebna-53","ebna-54","ebna-55","ebna-56","ebna-60","ebna-61","ebna-62","ebna-67","ebna-68","ebna-69","ebna-70","ebna-72","ebna-74","ebna-75","ebna-78","ebna-80","ebna-81","ebna-82","ebna-84","ebna-85","ebna-90","ebna-95","ebna-96","ebna-100","ebna-103","ebna-105","ebna-111","ebna-112","ebna-115","ebna-120","ebna-121","ebna-123","ebna-130","ebna-135"]);

const RAW_INITIAL_PRODUCTS: Product[] = [
  ...NEW_PRODUCTS_CATALOG,
  ...COSMETICS_AND_BABY_PRODUCTS,
  ...HD_PRODUCTS,
];

export const INITIAL_PRODUCTS: Product[] = RAW_INITIAL_PRODUCTS.filter(p => !DUPLICATE_IDS_TO_REMOVE.has(p.id));

// Fast in-memory lookup maps for hyper-fast 0ms querying
const PRODUCTS_BY_ID = new Map<string, Product>();
const PRODUCTS_BY_SLUG = new Map<string, Product>();

INITIAL_PRODUCTS.forEach(p => {
  PRODUCTS_BY_ID.set(p.id, p);
  PRODUCTS_BY_SLUG.set(p.slug, p);
});

const LOCAL_PRODUCTS_KEY = 'ebna_local_products_v8';
const LOCAL_USERS_KEY = 'ebna_local_users_v4';
const LOCAL_DELETED_KEY = 'ebna_deleted_ids_v8';

export function getDeletedProductIds(): string[] {
  try {
    const saved = localStorage.getItem(LOCAL_DELETED_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function markProductAsDeleted(prodOrId: any): void {
  try {
    const deleted = getDeletedProductIds();
    const toMark: string[] = [];

    if (typeof prodOrId === 'string') {
      toMark.push(prodOrId);
    } else if (prodOrId && typeof prodOrId === 'object') {
      if (prodOrId.id) toMark.push(prodOrId.id);
      if (prodOrId.slug) toMark.push(prodOrId.slug);
      if (prodOrId.sku) toMark.push(prodOrId.sku);
      if (prodOrId.name) {
        const normName = prodOrId.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        toMark.push(normName);
      }
    }

    let modified = false;
    toMark.forEach(str => {
      if (str && !deleted.includes(str)) {
        deleted.push(str);
        modified = true;
      }
    });

    if (modified) {
      localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(deleted));
    }
  } catch (e) {
    console.warn('Error saving deleted product id:', e);
  }
}

export function isProductDeleted(p: Product, deleted: string[]): boolean {
  if (p.id && p.id.startsWith("sindy-")) return true;
  if (p.slug && p.slug.startsWith("sindy-")) return true;
  if (!deleted || deleted.length === 0) return false;
  if (p.id && deleted.includes(p.id)) return true;
  if (p.slug && deleted.includes(p.slug)) return true;
  if (p.sku && deleted.includes(p.sku)) return true;
  if (p.name) {
    const normName = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (deleted.includes(normName)) return true;
  }
  return false;
}

export function demoGetProducts(): Product[] {
  let list: Product[] = [];
  try {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Sincronizar automáticamente cualquier producto nuevo de INITIAL_PRODUCTS priorizando los recién subidos al inicio
        const existingIds = new Set(parsed.map((p: any) => p.id));
        const currentDeleted = getDeletedProductIds();
        const missingFromInitial = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id) && !isProductDeleted(p, currentDeleted));
        list = [...missingFromInitial, ...parsed];
      } else {
        list = INITIAL_PRODUCTS;
      }
    } else {
      list = INITIAL_PRODUCTS;
    }
  } catch (e) {
    console.warn('Error loading products from local cache:', e);
    list = INITIAL_PRODUCTS;
  }

  const deleted = getDeletedProductIds();
  if (deleted.length > 0) {
    list = list.filter(p => !isProductDeleted(p, deleted));
  }

  return list;
}

export function demoSaveProducts(products: Product[]): void {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.warn('Error saving products to local cache:', e);
    try {
      // Resguardo de seguridad: Si se excede la cuota de 5MB de localStorage, sanitizar Base64 pesados
      const sanitized = products.map(p => {
        const prim = p.images?.primary || '';
        if (typeof prim === 'string' && prim.startsWith('data:') && prim.length > 30000) {
          return {
            ...p,
            images: {
              ...p.images,
              primary: '/icons/ebna-logo-white.png',
              0: '/icons/ebna-logo-white.png',
              gallery: ['/icons/ebna-logo-white.png']
            }
          };
        }
        return p;
      });
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(sanitized));
    } catch {
      // Si el almacenamiento local está saturado por otros datos del navegador
    }
  }
}

export function demoAddProduct(productData: Partial<Product>): Product {
  const list = demoGetProducts();
  const id = (productData.id && productData.id.includes('-') && productData.id.length === 36)
    ? productData.id 
    : generateUUID();
  const slug = (productData.name || 'producto').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + id.slice(0, 8);
  
  const rawImages = productData.images as any;
  const primaryImg = (rawImages && typeof rawImages === 'object' && 'primary' in rawImages)
    ? rawImages.primary
    : (Array.isArray(rawImages) && rawImages[0]) || '/icons/ebna-logo.png';
  const galleryImgs = Array.isArray(rawImages) ? rawImages : [primaryImg];

  const priceVal = productData.priceFCFA || productData.price || 15000;

  const newProduct: Product = {
    id,
    sku: productData.sku || `EB-GEN-${Date.now().toString().slice(-4)}`,
    slug,
    name: productData.name || 'Nuevo Producto EBNA',
    brand: productData.brand || 'EBNA Collection',
    category: (productData.category as any) || 'MODA_MUJER',
    subcategory: productData.subcategory || 'Colección General',
    priceFCFA: priceVal,
    price: priceVal,
    description: productData.description || 'Descripción del producto',
    images: {
      primary: primaryImg,
      gallery: galleryImgs,
      0: primaryImg,
    },
    inStock: productData.inStock !== undefined ? productData.inStock : true,
    in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
    is_hidden: productData.is_hidden !== undefined ? productData.is_hidden : false,
    colors: productData.colors || ['Blanco', 'Negro'],
    sizes: productData.sizes || ['S', 'M', 'L'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const updated = [newProduct, ...list];
  demoSaveProducts(updated);
  notifyCatalogChange('add', newProduct);
  return newProduct;
}

export function demoUpdateProduct(id: string, updates: Partial<Product>): Product | null {
  const list = demoGetProducts();
  const cleanId = (id || '').trim().toLowerCase();
  const index = list.findIndex(p => 
    p.id === id || 
    p.slug === id || 
    (p.sku && p.sku === id) ||
    (p.id && p.id.toLowerCase() === cleanId) ||
    (p.slug && p.slug.toLowerCase() === cleanId) ||
    (updates.id && p.id === updates.id) ||
    (updates.slug && p.slug === updates.slug) ||
    (updates.sku && p.sku && p.sku === updates.sku)
  );

  if (index === -1) {
    const fallbackProduct: Product = {
      id: updates.id || id,
      sku: updates.sku || `SL-MOD-${Date.now().toString().slice(-4)}`,
      slug: updates.slug || (updates.name ? updates.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : id),
      name: updates.name || 'Producto Actualizado',
      category: updates.category || 'MODA_MUJER',
      description: updates.description || '',
      price: updates.price || updates.priceFCFA || 0,
      priceFCFA: updates.priceFCFA || updates.price || 0,
      in_stock: updates.in_stock !== undefined ? updates.in_stock : true,
      inStock: updates.in_stock !== undefined ? updates.in_stock : true,
      is_hidden: updates.is_hidden || false,
      images: updates.images || { primary: '/icons/ebna-logo.png', gallery: ['/icons/ebna-logo.png'] },
      colors: updates.colors || ['Blanco', 'Negro'],
      sizes: updates.sizes || ['S', 'M', 'L'],
      updated_at: new Date().toISOString(),
      ...updates
    } as Product;
    const updatedList = [fallbackProduct, ...list];
    demoSaveProducts(updatedList);
    notifyCatalogChange('update', fallbackProduct);
    return fallbackProduct;
  }

  const updatedProduct = {
    ...list[index],
    ...updates,
    id: list[index].id || updates.id || id,
    in_stock: updates.in_stock !== undefined ? updates.in_stock : (list[index].in_stock ?? true),
    inStock: updates.in_stock !== undefined ? updates.in_stock : (list[index].inStock ?? true),
    updated_at: new Date().toISOString(),
  };

  list[index] = updatedProduct;
  demoSaveProducts(list);
  notifyCatalogChange('update', updatedProduct);
  return updatedProduct;
}

export function demoDeleteProduct(id: string): boolean {
  const list = demoGetProducts();
  const target = list.find(p => p.id === id || p.slug === id || p.sku === id);
  if (target) {
    markProductAsDeleted(target);
  } else {
    markProductAsDeleted(id);
  }

  const deleted = getDeletedProductIds();
  const filtered = list.filter(p => !isProductDeleted(p, deleted));
  demoSaveProducts(filtered);
  notifyCatalogChange('delete', { id });
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
