import { createClient, type Client } from '@libsql/client/web';
import type { Product, ProductCategory } from '../types';
import { getDeletedProductIds } from './demoData';

let tursoWebClient: Client | null = null;

const DEFAULT_TURSO_URL = 'https://ebna-luxury-aidasolution.aws-us-west-2.turso.io';
const DEFAULT_TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTAyODY0ODcsImlkIjoiMDFhMGQ1NjItYzIwMS03YjY0LTkwYWMtOTk2ZTU1MTk5YjU3Iiwia2lkIjoiQ0N6d1dtY3ZiZjJad2J5TjNSdV9HYXY0LTBYTENQRGpBcEZhUXNPWTlHcyIsInJpZCI6IjE5ODk3ODZlLWY4M2QtNDYyNy05ZDJmLTYxMDQwYmY1NTQ1ZCJ9.q1taQDxj7xmrfBBNmTivkWlXPrRocWdMEiuf0YYSMT6Ez-Tb6QSMkA7IptC4khXx1PlzBVsG3YpTD7Q0OPngBA';

export function getTursoClient(): Client | null {
  if (tursoWebClient) return tursoWebClient;

  const url = import.meta.env.VITE_TURSO_DATABASE_URL || DEFAULT_TURSO_URL;
  const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN || DEFAULT_TURSO_TOKEN;

  if (!url || !authToken) {
    return null;
  }

  try {
    tursoWebClient = createClient({
      url: url.replace('libsql://', 'https://'),
      authToken,
    });
    return tursoWebClient;
  } catch (err) {
    console.warn('Could not initialize Turso web client:', err);
    return null;
  }
}

function mapCategoryIdToCategory(categoryId?: string): ProductCategory {
  if (!categoryId) return 'MODA_MUJER';
  const clean = categoryId.toLowerCase();
  if (clean.includes('bolsos') || clean.includes('accesorios')) return 'BOLSOS_ACCESORIOS';
  if (clean.includes('calzado') || clean.includes('zapato') || clean.includes('sneaker')) return 'CALZADO';
  if (clean.includes('cosmetica') || clean.includes('facial')) return 'COSMETICA_FACIAL';
  if (clean.includes('higiene') || clean.includes('corporal')) return 'HIGIENE_CORPORAL';
  if (clean.includes('perfumeria') || clean.includes('perfume')) return 'PERFUMERIA';
  if (clean.includes('infantil') || clean.includes('bebe')) return 'MODA_INFANTIL';
  if (clean.includes('hombre')) return 'MODA_HOMBRE';
  return 'MODA_MUJER';
}

/**
 * Retrieves the full live catalog from Turso Cloud Database
 */
export async function fetchProductsFromTurso(baseProducts?: Product[]): Promise<Product[]> {
  const client = getTursoClient();
  if (!client) return [];

  try {
    const res = await client.execute('SELECT * FROM products ORDER BY updated_at DESC');
    if (!res.rows || res.rows.length === 0) return [];

    const deletedIds = new Set(getDeletedProductIds());

    const baseMap = new Map<string, Product>();
    if (baseProducts && baseProducts.length > 0) {
      baseProducts.forEach(p => {
        if (p.id) baseMap.set(p.id, p);
        if (p.slug) baseMap.set(p.slug, p);
      });
    }

    const validRows = res.rows.filter((row: any) => {
      const rowId = String(row.id || '');
      const rowSlug = String(row.slug || '');
      if (deletedIds.has(rowId) || deletedIds.has(rowSlug)) {
        // Asynchronously prune from Turso to free cloud database space permanently
        client.execute({
          sql: 'DELETE FROM products WHERE id = ? OR slug = ?',
          args: [rowId, rowSlug]
        }).catch(() => {});
        return false;
      }
      return true;
    });

    return validRows.map((row: any) => {
      const rowId = String(row.id);
      const rowSlug = String(row.slug || row.id);
      const existing = baseMap.get(rowId) || baseMap.get(rowSlug);

      const rawImg = String(row.main_image_url || existing?.images?.primary || '/icons/ebna-logo-white.png');
      const mainImg = rawImg.startsWith('data:image/') ? rawImg : rawImg.replace(/\.jfif$/i, '.jpg');
      let gallery: string[] = [mainImg];
      try {
        if (row.gallery_images) {
          const parsed = typeof row.gallery_images === 'string' ? JSON.parse(row.gallery_images) : row.gallery_images;
          if (Array.isArray(parsed) && parsed.length > 0) {
            gallery = parsed.map((g: any) => {
              if (typeof g !== 'string') return '/icons/ebna-logo-white.png';
              return g.startsWith('data:image/') ? g : g.replace(/\.jfif$/i, '.jpg');
            });
          }
        } else if (existing?.images?.gallery) {
          gallery = existing.images.gallery;
        }
      } catch {
        if (existing?.images?.gallery) {
          gallery = existing.images.gallery;
        }
      }

      const stockNum = Number(row.stock ?? 10);
      const inStock = stockNum > 0;
      const priceNum = Number(row.price || existing?.priceFCFA || existing?.price || 0);
      const resolvedCategory = existing?.category || mapCategoryIdToCategory(row.category_id);

      return {
        ...(existing || {}),
        id: rowId,
        sku: existing?.sku || `SL-${rowId.slice(0, 6).toUpperCase()}`,
        slug: rowSlug,
        name: String(row.title || existing?.name || 'Producto EBNA'),
        brand: existing?.brand || 'Sindy Luxury by EBNA',
        category: resolvedCategory,
        subcategory: existing?.subcategory || 'Colección Oficial',
        description: String(row.description || existing?.description || ''),
        price: priceNum,
        priceFCFA: priceNum,
        inStock,
        in_stock: inStock,
        is_hidden: row.status === 'hidden' || row.status === 'draft',
        images: {
          primary: mainImg,
          gallery,
          0: mainImg
        },
        colors: existing?.colors || ['Original'],
        sizes: existing?.sizes || ['Estándar'],
        created_at: typeof row.created_at === 'number' ? new Date(row.created_at).toISOString() : String(row.created_at || existing?.created_at || new Date().toISOString()),
        updated_at: typeof row.updated_at === 'number' ? new Date(row.updated_at).toISOString() : String(row.updated_at || new Date().toISOString()),
      };
    });
  } catch (err) {
    console.warn('[Turso Cloud Read Notice]:', err);
    return [];
  }
}

// Validation helper for foreign key constraints in Turso Cloud
const VALID_CATEGORY_IDS = new Set([
  'cat-higiene-corporal',
  'cat-cosmetica-facial',
  'cat-perfumeria',
  'cat-bolsos-accesorios',
  'cat-moda-infantil',
  'cat-moda-mujer',
  'cat-calzado'
]);

export function resolveValidCategoryId(cat?: string): string {
  if (!cat) return 'cat-moda-mujer';
  const clean = cat.toLowerCase().replace(/_/g, '-');
  const candidate = clean.startsWith('cat-') ? clean : `cat-${clean}`;
  if (VALID_CATEGORY_IDS.has(candidate)) return candidate;
  if (candidate.includes('bolso') || candidate.includes('accesorio')) return 'cat-bolsos-accesorios';
  if (candidate.includes('calzado') || candidate.includes('zapato')) return 'cat-calzado';
  if (candidate.includes('cosmetica') || candidate.includes('facial')) return 'cat-cosmetica-facial';
  if (candidate.includes('higiene') || candidate.includes('corporal')) return 'cat-higiene-corporal';
  if (candidate.includes('perfum')) return 'cat-perfumeria';
  if (candidate.includes('infantil') || candidate.includes('bebe')) return 'cat-moda-infantil';
  return 'cat-moda-mujer';
}

/**
 * Persists an edited or newly created product directly into Turso Cloud (Universal Source of Truth)
 */
export async function syncProductToTurso(product: Partial<Product>): Promise<boolean> {
  const client = getTursoClient();
  if (!client || !product.id) return false;

  try {
    const rawImg = product.images?.primary || (Array.isArray(product.images) ? product.images[0] : (product.images as any)?.[0]) || '/icons/ebna-logo-white.png';
    const mainImg = typeof rawImg === 'string' ? (rawImg.startsWith('data:image/') ? rawImg : rawImg.replace(/\.jfif$/i, '.jpg')) : '/icons/ebna-logo-white.png';
    const gallery = Array.isArray(product.images?.gallery) 
      ? JSON.stringify(product.images.gallery) 
      : JSON.stringify([mainImg]);
    
    const priceVal = Math.round(product.priceFCFA || product.price || 0);
    const inStockVal = product.in_stock !== undefined ? (product.in_stock ? 1 : 0) : 1;
    const now = Date.now();
    const categoryId = resolveValidCategoryId(product.category);
    const descriptionVal = product.description && product.description.trim() ? product.description.trim() : 'Artículo de alta gama de la colección oficial Sindy Luxury by EBNA.';

    // Check if record exists
    const checkRes = await client.execute({
      sql: 'SELECT id FROM products WHERE id = ? OR slug = ? LIMIT 1',
      args: [product.id, product.slug || product.id]
    });

    if (checkRes.rows.length > 0) {
      // Update existing record
      const existingId = String(checkRes.rows[0].id);
      await client.execute({
        sql: `UPDATE products 
              SET title = ?, 
                  description = ?, 
                  price = ?, 
                  stock = ?, 
                  category_id = ?,
                  main_image_url = ?, 
                  gallery_images = ?, 
                  updated_at = ?
              WHERE id = ?`,
        args: [
          product.name || 'Producto EBNA',
          descriptionVal,
          priceVal,
          inStockVal ? 10 : 0,
          categoryId,
          mainImg,
          gallery,
          now,
          existingId
        ]
      });
      console.log(`[Turso Cloud] Product ${existingId} updated successfully.`);
      return true;
    } else {
      // Insert new record
      await client.execute({
        sql: `INSERT INTO products 
              (id, slug, title, description, price, currency, stock, status, category_id, main_image_url, gallery_images, is_featured, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, 'XAF', ?, 'published', ?, ?, ?, 1, ?, ?)`,
        args: [
          product.id,
          product.slug || product.id,
          product.name || 'Nuevo Producto',
          descriptionVal,
          priceVal,
          inStockVal ? 10 : 0,
          categoryId,
          mainImg,
          gallery,
          now,
          now
        ]
      });
      console.log(`[Turso Cloud] Product ${product.id} created successfully.`);
      return true;
    }
  } catch (err) {
    console.error('[Turso Cloud Sync Error]:', err);
    return false;
  }
}

/**
 * Reads global site customization settings from Turso Cloud
 */
export async function fetchSiteSettingsFromTurso(): Promise<Record<string, any> | null> {
  const client = getTursoClient();
  if (!client) return null;
  try {
    const res = await client.execute('SELECT key, value FROM site_settings');
    if (!res.rows || res.rows.length === 0) return null;
    const settings: Record<string, any> = {};
    for (const r of res.rows) {
      try {
        settings[String(r.key)] = JSON.parse(String(r.value));
      } catch {
        settings[String(r.key)] = r.value;
      }
    }
    return settings;
  } catch (err) {
    console.warn('[Turso Settings Read Notice]:', err);
    return null;
  }
}

/**
 * Persists global site customization settings to Turso Cloud (Available across all devices)
 */
export async function saveSiteSettingsToTurso(key: string, value: any): Promise<boolean> {
  const client = getTursoClient();
  if (!client) return false;
  try {
    const valStr = typeof value === 'string' ? value : JSON.stringify(value);
    await client.execute({
      sql: `INSERT INTO site_settings (key, value, updated_at) 
            VALUES (?, ?, ?) 
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
      args: [key, valStr, Date.now()]
    });
    return true;
  } catch (err) {
    console.warn('[Turso Settings Save Notice]:', err);
    return false;
  }
}

/**
 * Deletes a product from Turso Cloud
 */
export async function deleteProductFromTurso(productIdOrSlug: string): Promise<boolean> {
  const client = getTursoClient();
  if (!client || !productIdOrSlug) return false;

  try {
    await client.execute({
      sql: 'DELETE FROM products WHERE id = ? OR slug = ?',
      args: [productIdOrSlug, productIdOrSlug]
    });
    console.log(`[Turso Cloud] Product ${productIdOrSlug} deleted successfully.`);
    return true;
  } catch (err) {
    console.error('[Turso Cloud Delete Error]:', err);
    return false;
  }
}

/**
 * Deletes multiple products from Turso Cloud Database in batch
 */
export async function deleteMultipleProductsFromTurso(idsOrSlugs: string[]): Promise<boolean> {
  const client = getTursoClient();
  if (!client || !idsOrSlugs || idsOrSlugs.length === 0) return false;

  try {
    const cleanList = idsOrSlugs.filter(Boolean);
    if (cleanList.length === 0) return true;

    // Use parameterized batch deletion for speed and clean space liberation
    const placeholders = cleanList.map(() => '?').join(', ');
    await client.execute({
      sql: `DELETE FROM products WHERE id IN (${placeholders}) OR slug IN (${placeholders})`,
      args: [...cleanList, ...cleanList]
    });
    console.log(`[Turso Cloud] Successfully batch deleted ${cleanList.length} products.`);
    return true;
  } catch (err) {
    console.warn('[Turso Cloud Batch Delete Warn - falling back to sequential]:', err);
    for (const item of idsOrSlugs) {
      if (item) {
        try {
          await client.execute({
            sql: 'DELETE FROM products WHERE id = ? OR slug = ?',
            args: [item, item]
          });
        } catch {}
      }
    }
    return true;
  }
}

