import { createClient, type Client } from '@libsql/client/web';
import type { Product } from '../types';

let tursoWebClient: Client | null = null;

export function getTursoClient(): Client | null {
  if (tursoWebClient) return tursoWebClient;

  const url = import.meta.env.VITE_TURSO_DATABASE_URL || 'https://ebna-luxury-aidasolution.aws-us-west-2.turso.io';
  const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN || '';

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

/**
 * Persists an edited or newly created product directly into Turso Cloud
 */
export async function syncProductToTurso(product: Partial<Product>): Promise<boolean> {
  const client = getTursoClient();
  if (!client || !product.id) return false;

  try {
    const rawImg = product.images?.primary || (Array.isArray(product.images) ? product.images[0] : (product.images as any)?.[0]) || '/icons/ebna-logo.png';
    const mainImg = typeof rawImg === 'string' ? rawImg.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo.png';
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
