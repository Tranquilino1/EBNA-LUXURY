import { useState, useEffect, useCallback } from 'react';
import { demoGetProducts } from '../lib/demoData';
import { subscribeToCatalogChanges } from '../lib/broadcast';
import { supabase } from '../config/supabase';
import type { Product, FilterCategoryType } from '../types';

export function useProducts(category?: FilterCategoryType, searchQuery?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch from Supabase
      const { data: remoteProducts, error: dbError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      let finalList: Product[] = [];

      if (!dbError && remoteProducts && remoteProducts.length > 0) {
        finalList = remoteProducts.map((item: any) => {
          const primaryImg = item.images?.primary || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '/icons/ebna-logo.png');
          return {
            id: item.id,
            sku: item.sku,
            slug: item.slug,
            name: item.name,
            brand: item.brand || 'EBNA Luxury Collection',
            category: item.category || 'MODA_MUJER',
            subcategory: item.subcategory || 'General',
            priceFCFA: item.price_fcfa || item.price,
            price: item.price,
            inStock: item.in_stock !== undefined ? item.in_stock : true,
            in_stock: item.in_stock !== undefined ? item.in_stock : true,
            is_hidden: item.is_hidden || false,
            description: item.description || '',
            images: { primary: primaryImg, gallery: Array.isArray(item.images) ? item.images : (item.images?.gallery || [primaryImg]) },
            colors: item.colors || ['Blanco', 'Negro'],
            sizes: item.sizes || ['S', 'M', 'L'],
            created_at: item.created_at,
            updated_at: item.updated_at,
          };
        });
      } else {
        // Resilient fallback to 142 catalog products if Supabase table is empty or RLS-restricted
        finalList = demoGetProducts();
      }

      // Filter out hidden items for public view
      finalList = finalList.filter((p: Product) => !p.is_hidden);

      // Filter by category
      if (category && category !== 'TODOS') {
        finalList = finalList.filter((p: Product) => p.category === category);
      }

      // Filter by search query
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        finalList = finalList.filter((p: Product) => 
          p.name.toLowerCase().includes(lowerQuery) || 
          (p.sku && p.sku.toLowerCase().includes(lowerQuery)) ||
          p.description.toLowerCase().includes(lowerQuery)
        );
      }

      setProducts(finalList);
    } catch (err: any) {
      console.warn('Supabase fetch notice, using catalog fallback:', err);
      let list = demoGetProducts();
      if (category && category !== 'TODOS') {
        list = list.filter((p: Product) => p.category === category);
      }
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        list = list.filter((p: Product) => 
          p.name.toLowerCase().includes(lowerQuery) || 
          (p.sku && p.sku.toLowerCase().includes(lowerQuery)) ||
          p.description.toLowerCase().includes(lowerQuery)
        );
      }
      setProducts(list);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]);

  useEffect(() => {
    fetchProducts();

    // 1. Universal Real-Time Subscriber (WebSockets + BroadcastChannel + Postgres CDC)
    const unsubscribe = subscribeToCatalogChanges(() => {
      fetchProducts();
    });

    // 2. Direct Supabase Realtime Channel
    const channel = supabase
      .channel('products-realtime-sync-' + Math.random().toString(36).substring(2, 7))
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

  return { products, loading, error, refetch: fetchProducts };
}
