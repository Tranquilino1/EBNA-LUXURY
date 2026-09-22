import { useState, useEffect, useCallback } from 'react';
import { demoAddProduct, demoUpdateProduct, demoDeleteProduct, demoGetProducts } from '../lib/demoData';
import { subscribeToCatalogChanges, notifyCatalogChange } from '../lib/broadcast';
import { supabase } from '../config/supabase';
import type { Product, ProductImages } from '../types';
import { generateSlug } from '../lib/utils';

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
          const primaryImg = item.images?.primary || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '/icons/ebna-logo.png');
          return {
            id: item.id,
            sku: item.sku,
            name: item.name,
            category: item.category,
            subcategory: item.subcategory || 'General',
            brand: item.brand || 'EBNA Luxury Collection',
            priceFCFA: item.price_fcfa || item.price,
            price: item.price,
            inStock: item.in_stock !== undefined ? item.in_stock : true,
            in_stock: item.in_stock !== undefined ? item.in_stock : true,
            is_hidden: item.is_hidden || false,
            description: item.description || '',
            images: {
              primary: primaryImg,
              gallery: Array.isArray(item.images) ? item.images : (item.images?.gallery || [primaryImg])
            },
            colors: item.colors || ['Blanco', 'Negro'],
            sizes: item.sizes || ['S', 'M', 'L'],
            slug: item.slug,
            created_at: item.created_at,
            updated_at: item.updated_at,
          };
        });
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
        primaryUrl = URL.createObjectURL(imageFile);
      }

      const imagesObj: ProductImages = {
        primary: primaryUrl,
        gallery: [primaryUrl]
      };

      const newSlug = generateSlug(productData.name || 'producto-' + Date.now());
      const newProduct: Partial<Product> = { 
        ...productData, 
        slug: newSlug,
        images: imagesObj 
      };

      // 1. Add locally for instant UI update
      const created = demoAddProduct(newProduct);
      setProducts(prev => [created, ...prev.filter(p => p.id !== created.id)]);

      // 2. Build full relational Supabase payload
      const supabasePayload: any = {
        sku: created.sku || `EB-GEN-${Date.now().toString().slice(-4)}`,
        name: created.name,
        category: created.category,
        subcategory: created.subcategory || 'General',
        brand: created.brand || 'EBNA Luxury Collection',
        description: created.description || '',
        price: created.price,
        price_fcfa: created.priceFCFA || created.price,
        images: { primary: created.images.primary, gallery: created.images.gallery || [created.images.primary] },
        colors: created.colors || ['Blanco', 'Negro'],
        sizes: created.sizes || ['S', 'M', 'L'],
        in_stock: created.in_stock !== undefined ? created.in_stock : true,
        is_hidden: created.is_hidden || false,
      };

      if (created.id && created.id.length === 36) {
        supabasePayload.id = created.id;
      }
      if (created.slug) {
        supabasePayload.slug = created.slug;
      }

      const { error } = await supabase.from('products').upsert(supabasePayload, { onConflict: 'slug' });
      if (error) console.warn('Supabase sync notice:', error.message);

      notifyCatalogChange('add', created);
      await fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>, imageFile?: File) => {
    try {
      let updatedData = { ...updates };

      if (imageFile) {
        const localUrl = URL.createObjectURL(imageFile);
        updatedData.images = {
          primary: localUrl,
          gallery: [localUrl]
        };
      }

      // 1. Update locally for instant UI update
      const updated = demoUpdateProduct(id, updatedData);

      if (updated) {
        setProducts(prev => prev.map(p => (p.id === id || p.slug === id) ? updated : p));

        // 2. Build full relational Supabase payload
        const supabasePayload: any = {
          sku: updated.sku || `EB-GEN-${Date.now().toString().slice(-4)}`,
          name: updated.name,
          category: updated.category,
          subcategory: updated.subcategory || 'General',
          brand: updated.brand || 'EBNA Luxury Collection',
          description: updated.description || '',
          price: updated.price,
          price_fcfa: updated.priceFCFA || updated.price,
          images: { primary: updated.images.primary, gallery: updated.images.gallery || [updated.images.primary] },
          colors: updated.colors || ['Blanco', 'Negro'],
          sizes: updated.sizes || ['S', 'M', 'L'],
          in_stock: updated.in_stock !== undefined ? updated.in_stock : true,
          is_hidden: updated.is_hidden || false,
        };

        if (updated.id && updated.id.length === 36) {
          supabasePayload.id = updated.id;
        }
        if (updated.slug) {
          supabasePayload.slug = updated.slug;
        }

        const { error } = await supabase.from('products').upsert(supabasePayload, { onConflict: 'slug' });
        if (error) console.warn('Supabase sync notice:', error.message);

        notifyCatalogChange('update', updated);
        await fetchProducts();
      }
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const prod = products.find(p => p.id === id || p.slug === id || p.sku === id);
      const targetSlug = prod?.slug || id;

      // 1. Immediate local state update for instant UI feedback
      setProducts(prev => prev.filter(p => p.id !== id && p.slug !== targetSlug && p.sku !== id));
      demoDeleteProduct(id);

      // 2. Delete from Supabase safely (only query UUID column if valid UUID format)
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (isUUID) {
        await supabase.from('products').delete().eq('id', id);
      }
      if (targetSlug) {
        await supabase.from('products').delete().eq('slug', targetSlug);
      }

      // 3. Notify all devices and tabs
      notifyCatalogChange('delete', { id, slug: targetSlug });
      await fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      const prod = products.find(p => p.id === id || p.slug === id || p.sku === id);
      const targetSlug = prod?.slug || id;
      setProducts(prev => prev.filter(p => p.id !== id && p.slug !== targetSlug && p.sku !== id));
    }
  };

  const toggleStock = async (id: string, currentStockStatus: boolean) => {
    const prod = products.find(p => p.id === id);
    demoUpdateProduct(id, { in_stock: !currentStockStatus, inStock: !currentStockStatus });
    if (prod) {
      await supabase.from('products').update({ in_stock: !currentStockStatus }).eq('slug', prod.slug);
    }
    notifyCatalogChange('toggleStock', { id, in_stock: !currentStockStatus });
    await fetchProducts();
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    refetch: fetchProducts,
  };
}

