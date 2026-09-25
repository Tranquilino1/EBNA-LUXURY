import { createClient, type Client } from '@libsql/client/web';
import type { Product, ProductCategory } from '../types';

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

    const baseMap = new Map<string, Product>();
    if (baseProducts && baseProducts.length > 0) {
      baseProducts.forEach(p => {
        if (p.id) baseMap.set(p.id, p);
        if (p.slug) baseMap.set(p.slug, p);
      });
    }

    return res.rows.map((row: any) => {
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

/**
 * Persists an edited or newly created product directly into Turso Cloud
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

    // Check if record exists
    const checkRes = await client.execute({
      sql: 'SELECT id FROM products WHERE id = ? OR slug = ? LIMIT 1',
      args: [product.id, product.slug || product.id]
    });

    if (checkRes.rows.length > 0) {
      // Update
      const existingId = String(checkRes.rows[0].id);
      await client.execute({
        sql: `UPDATE products 
              SET title = ?, 
                  description = ?, 
                  price = ?, 
                  stock = ?, 
                  main_image_url = ?, 
                  gallery_images = ?, 
                  updated_at = ?
              WHERE id = ?`,
        args: [
          product.name || 'Producto EBNA',
          product.description || '',
          priceVal,
          inStockVal ? 10 : 0,
          mainImg,
          gallery,
          now,
          existingId
        ]
      });
      console.log(`[Turso Cloud] Product ${existingId} updated successfully.`);
      return true;
    } else {
      // Insert
      const categoryId = product.category 
        ? `cat-${product.category.toLowerCase().replace(/_/g, '-')}` 
        : 'cat-moda-mujer';

      await client.execute({
        sql: `INSERT INTO products 
              (id, slug, title, description, price, currency, stock, status, category_id, main_image_url, gallery_images, is_featured, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, 'XAF', ?, 'published', ?, ?, ?, 1, ?, ?)`,
        args: [
          product.id,
          product.slug || product.id,
          product.name || 'Nuevo Producto',
          product.description || '',
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
