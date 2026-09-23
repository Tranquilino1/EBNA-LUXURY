import { useState, useEffect, useCallback } from 'react';
import { demoAddProduct, demoUpdateProduct, demoDeleteProduct, demoGetProducts, demoSaveProducts } from '../lib/demoData';
import { subscribeToCatalogChanges, notifyCatalogChange } from '../lib/broadcast';
import { supabase } from '../config/supabase';
import type { Product, ProductImages } from '../types';
import { generateSlug } from '../lib/utils';

const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      return demoGetProducts();
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (isSilent = true) => {
    if (!isSilent) {
      setLoading(true);
    }
    try {
      // Fetch from Supabase
      const { data: dbProducts, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && dbProducts && dbProducts.length > 0) {
        const mappedRemote: Product[] = dbProducts.map((item: any) => {
          const rawPrimary = item.images?.primary || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : (typeof item.images === 'string' ? item.images : '/icons/ebna-logo.png'));
          const primaryImg = typeof rawPrimary === 'string' ? rawPrimary.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo.png';
          const rawGallery = Array.isArray(item.images) ? item.images : (item.images?.gallery || [primaryImg]);
          const gallery = rawGallery.map((g: any) => typeof g === 'string' ? g.replace(/\.jfif$/i, '.jpg') : g);
          const resolvedCategory = (item.subcategory === 'Moda Infantil' || item.category === 'MODA_INFANTIL')
            ? 'MODA_INFANTIL'
            : (item.category || 'MODA_MUJER');

          return {
            id: item.id,
            sku: item.sku,
            name: item.name,
            category: resolvedCategory as any,
            subcategory: item.subcategory || 'General',
            brand: item.brand || 'EBNA Luxury Collection',
            priceFCFA: item.price_fcfa || item.price,
            price: item.price_fcfa || item.price,
            inStock: item.in_stock !== undefined ? item.in_stock : true,
            in_stock: item.in_stock !== undefined ? item.in_stock : true,
            is_hidden: item.is_hidden || false,
            description: item.description || '',
            images: {
              primary: primaryImg,
              gallery,
              0: primaryImg
            },
            colors: item.colors || ['Blanco', 'Negro'],
            sizes: item.sizes || ['S', 'M', 'L'],
            slug: item.slug,
            created_at: item.created_at,
            updated_at: item.updated_at,
          };
        });
        demoSaveProducts(mappedRemote);
        setProducts(mappedRemote);
      } else {
        setProducts(demoGetProducts());
      }
    } catch (err) {
      console.error('Error fetching admin products, using fallback:', err);
      setProducts(demoGetProducts());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    // 1. Universal Real-Time Subscriber (WebSockets + BroadcastChannel + Postgres CDC)
    const unsubscribe = subscribeToCatalogChanges(() => {
      fetchProducts();
    });

    // 2. Direct Supabase Realtime Channel
    const channel = supabase
      .channel('admin-products-realtime-sync-' + Math.random().toString(36).substring(2, 7))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchProducts();
      })
      .subscribe();

    // 3. Smart 5-Second Real-Time Polling Safety Net (Works on ALL browsers & battery-saver modes)
    const pollInterval = setInterval(() => {
      fetchProducts();
    }, 5000);

    // 4. Focus & Tab Visibility Listeners
    const handleActive = () => fetchProducts();
    window.addEventListener('focus', handleActive);
    document.addEventListener('visibilitychange', handleActive);

    return () => {
      unsubscribe();
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
      window.removeEventListener('focus', handleActive);
      document.removeEventListener('visibilitychange', handleActive);
    };
  }, [fetchProducts]);

  const addProduct = async (productData: Partial<Product>, imageFile?: File) => {
    try {
      let primaryUrl = '/icons/ebna-logo.png';
      if (productData.images?.primary) {
        primaryUrl = productData.images.primary;
      } else if (Array.isArray(productData.images) && productData.images.length > 0) {
        primaryUrl = productData.images[0];
      }

      if (imageFile) {
        try {
          primaryUrl = await fileToDataUrl(imageFile);
        } catch {
          primaryUrl = URL.createObjectURL(imageFile);
        }
      }

      const imagesObj: ProductImages = {
        primary: primaryUrl,
        gallery: [primaryUrl]
      };

      const validId = generateUUID();
      const newSlug = productData.slug || (generateSlug(productData.name || 'producto') + '-' + validId.slice(0, 8));
      const skuVal = productData.sku || `SL-${(productData.category || 'GEN').replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

      const newProduct: Product = {
        id: validId,
        sku: skuVal,
        slug: newSlug,
        name: productData.name || 'Nuevo Producto',
        category: (productData.category || 'MODA_MUJER') as any,
        subcategory: productData.subcategory || 'General',
        brand: productData.brand || 'EBNA Luxury Collection',
        description: productData.description || '',
        price: productData.price || 0,
        priceFCFA: productData.priceFCFA || productData.price || 0,
        images: imagesObj,
        colors: productData.colors || ['Blanco', 'Negro'],
        sizes: productData.sizes || ['S', 'M', 'L'],
        in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
        inStock: productData.in_stock !== undefined ? productData.in_stock : true,
        is_hidden: productData.is_hidden || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // 1. Add locally for instant UI update (0ms)
      demoAddProduct(newProduct);
      setProducts(prev => [newProduct, ...prev.filter(p => p.id !== validId)]);
      notifyCatalogChange('add', newProduct);

      // 2. Insert into Supabase in background (Non-blocking: 0ms UI latency)
      (async () => {
        try {
          const isInfantilAdd = newProduct.category === 'MODA_INFANTIL';
          const dbCategoryAdd = isInfantilAdd ? 'MODA_MUJER' : (newProduct.category || 'MODA_MUJER');
          const dbSubcategoryAdd = isInfantilAdd ? 'Moda Infantil' : (newProduct.subcategory || 'General');

          const supabasePayload: any = {
            id: validId,
            sku: skuVal,
            slug: newSlug,
            name: newProduct.name,
            category: dbCategoryAdd,
            subcategory: dbSubcategoryAdd,
            brand: newProduct.brand,
            description: newProduct.description,
            price: newProduct.price,
            price_fcfa: newProduct.priceFCFA,
            images: imagesObj,
            colors: newProduct.colors,
            sizes: newProduct.sizes,
            in_stock: newProduct.in_stock,
            is_hidden: newProduct.is_hidden,
            created_at: newProduct.created_at,
            updated_at: newProduct.updated_at,
          };

          const { error: insErr } = await supabase.from('products').insert(supabasePayload);
          if (insErr) {
            console.warn('Supabase insert notice:', insErr.message);
          }
        } catch (bgErr) {
          console.error('Background Supabase insert error:', bgErr);
        }
      })();

      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>, imageFile?: File) => {
    try {
      let updatedData = { ...updates };

      if (imageFile) {
        try {
          const dataUrl = await fileToDataUrl(imageFile);
          updatedData.images = {
            primary: dataUrl,
            gallery: [dataUrl]
          };
        } catch {
          const localUrl = URL.createObjectURL(imageFile);
          updatedData.images = {
            primary: localUrl,
            gallery: [localUrl]
          };
        }
      }

      // 1. Update locally in 0ms (OPTIMISTIC INSTANT UPDATE)
      const existing = products.find(p => p.id === id || p.slug === id || p.sku === id);
      const updated: Product = {
        ...(existing || {}),
        ...updatedData,
        id: existing?.id || id,
        in_stock: updatedData.in_stock !== undefined ? updatedData.in_stock : (existing?.in_stock ?? true),
        inStock: updatedData.in_stock !== undefined ? updatedData.in_stock : (existing?.in_stock ?? true),
        updated_at: new Date().toISOString()
      } as Product;

      // Update state immediately without ANY delay
      setProducts(prev => prev.map(p => (p.id === id || p.slug === id || p.sku === id) ? updated : p));
      demoUpdateProduct(id, updated);
      notifyCatalogChange('update', updated);

      // 2. Direct update in Supabase (Non-blocking background sync: 0ms UI latency)
      (async () => {
        try {
          const isInfantilUpd = updated.category === 'MODA_INFANTIL';
          const dbCategoryUpd = isInfantilUpd ? 'MODA_MUJER' : (updated.category || 'MODA_MUJER');
          const dbSubcategoryUpd = isInfantilUpd ? 'Moda Infantil' : (updated.subcategory || 'General');

          const supabasePayload: any = {
            name: updated.name,
            category: dbCategoryUpd,
            subcategory: dbSubcategoryUpd,
            brand: updated.brand || 'EBNA Luxury Collection',
            description: updated.description || '',
            price: updated.price,
            price_fcfa: updated.priceFCFA || updated.price,
            in_stock: updated.in_stock !== undefined ? updated.in_stock : true,
            is_hidden: updated.is_hidden || false,
            updated_at: updated.updated_at
          };

          if (updated.sku) supabasePayload.sku = updated.sku;
          if (updated.slug) supabasePayload.slug = updated.slug;
          if (updated.images) {
            const prim = updated.images.primary || (Array.isArray(updated.images) ? updated.images[0] : (typeof updated.images === 'string' ? updated.images : undefined));
            if (prim) {
              supabasePayload.images = {
                primary: prim,
                gallery: (Array.isArray(updated.images.gallery) && updated.images.gallery.length > 0) ? updated.images.gallery : [prim]
              };
            }
          }
          if (updated.colors) supabasePayload.colors = updated.colors;
          if (updated.sizes) supabasePayload.sizes = updated.sizes;

          // Direct update in Supabase (by ID or Slug)
          const isUUID = (updated.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(updated.id)) ||
                         (id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));
          const targetIdToUse = (updated.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(updated.id)) ? updated.id : id;

          let updateQuery = supabase.from('products').update(supabasePayload);

          if (isUUID) {
            updateQuery = updateQuery.eq('id', targetIdToUse);
          } else if (updated.slug) {
            updateQuery = updateQuery.eq('slug', updated.slug);
          } else {
            updateQuery = updateQuery.eq('id', targetIdToUse);
          }

          const { data: updateRes, error: updateErr } = await updateQuery.select();

          if (updateErr) {
            console.warn('Supabase update notice:', updateErr.message);
          } else if (!updateRes || updateRes.length === 0) {
            if (updated.slug) {
              await supabase.from('products').update(supabasePayload).eq('slug', updated.slug);
            }
          }
        } catch (bgErr) {
          console.error('Background Supabase update error:', bgErr);
        }
      })();

      return updated;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const prod = products.find(p => p.id === id || p.slug === id || p.sku === id);
      const targetSlug = prod?.slug || id;

      // 1. Immediate local state update for instant UI feedback (0ms)
      setProducts(prev => prev.filter(p => p.id !== id && p.slug !== targetSlug && p.sku !== id));
      demoDeleteProduct(id);
      notifyCatalogChange('delete', { id, slug: targetSlug });

      // 2. Delete from Supabase in background
      (async () => {
        try {
          const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
          if (isUUID) {
            await supabase.from('products').delete().eq('id', id);
          }
          if (targetSlug) {
            await supabase.from('products').delete().eq('slug', targetSlug);
          }
        } catch (err) {
          console.warn('Background Supabase delete notice:', err);
        }
      })();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const toggleStock = async (id: string, currentStockStatus: boolean) => {
    const prod = products.find(p => p.id === id);
    const newStock = !currentStockStatus;

    // 1. Immediate local update (0ms)
    demoUpdateProduct(id, { in_stock: newStock, inStock: newStock });
    setProducts(prev => prev.map(p => (p.id === id || p.slug === id || p.sku === id) ? { ...p, in_stock: newStock, inStock: newStock } : p));
    notifyCatalogChange('toggleStock', { id, in_stock: newStock });

    // 2. Supabase update in background
    (async () => {
      try {
        if (prod) {
          await supabase.from('products').update({ in_stock: newStock }).eq('slug', prod.slug);
        } else {
          await supabase.from('products').update({ in_stock: newStock }).eq('id', id);
        }
      } catch (err) {
        console.warn('Background toggleStock notice:', err);
      }
    })();
  };

  const bulkDelete = async (ids: string[]) => {
    try {
      const idSet = new Set(ids);
      setProducts(prev => prev.filter(p => !idSet.has(p.id) && !idSet.has(p.slug) && !idSet.has(p.sku)));
      
      for (const id of ids) {
        demoDeleteProduct(id);
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (isUUID) {
          await supabase.from('products').delete().eq('id', id);
        } else {
          await supabase.from('products').delete().eq('slug', id);
        }
      }
      notifyCatalogChange('bulk_delete', { count: ids.length });
      await fetchProducts();
    } catch (err) {
      console.error('Error in bulkDelete:', err);
    }
  };

  const bulkUpdateStock = async (ids: string[], inStock: boolean) => {
    try {
      const idSet = new Set(ids);
      setProducts(prev => prev.map(p => idSet.has(p.id) ? { ...p, in_stock: inStock, inStock } : p));
      
      for (const id of ids) {
        demoUpdateProduct(id, { in_stock: inStock, inStock });
        const prod = products.find(p => p.id === id);
        if (prod) {
          await supabase.from('products').update({ in_stock: inStock }).eq('slug', prod.slug);
        }
      }
      notifyCatalogChange('bulk_stock', { count: ids.length, inStock });
      await fetchProducts();
    } catch (err) {
      console.error('Error in bulkUpdateStock:', err);
    }
  };

  const bulkUpdateVisibility = async (ids: string[], isHidden: boolean) => {
    try {
      const idSet = new Set(ids);
      setProducts(prev => prev.map(p => idSet.has(p.id) ? { ...p, is_hidden: isHidden } : p));
      
      for (const id of ids) {
        demoUpdateProduct(id, { is_hidden: isHidden });
        const prod = products.find(p => p.id === id);
        if (prod) {
          await supabase.from('products').update({ is_hidden: isHidden }).eq('slug', prod.slug);
        }
      }
      notifyCatalogChange('bulk_visibility', { count: ids.length, isHidden });
      await fetchProducts();
    } catch (err) {
      console.error('Error in bulkUpdateVisibility:', err);
    }
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    bulkDelete,
    bulkUpdateStock,
    bulkUpdateVisibility,
    refetch: fetchProducts,
  };
}

