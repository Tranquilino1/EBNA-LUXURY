import { useState, useEffect, useCallback } from 'react';
import { demoGetProducts } from '../lib/demoData';
import { supabase } from '../config/supabase';
import type { Product, FilterCategoryType } from '../types';

export function useProducts(category?: FilterCategoryType, searchQuery?: string) {
  // Start with instant local items for 0ms initial render speed
  const [products, setProducts] = useState<Product[]>(() => {
    let list = demoGetProducts();
    if (category && category !== 'TODOS') {
      list = list.filter((p: Product) => p.category === category);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p: Product) => p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)));
    }
    return list;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      // 1. Instant local render
      let localList = demoGetProducts();

      // 2. Fetch from Supabase in background
      const { data: remoteProducts, error: dbError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!dbError && remoteProducts && remoteProducts.length > 0) {
        // Merge remote products with local list by slug to prevent duplicates
        const map = new Map<string, Product>();
        localList.forEach((p: Product) => map.set(p.slug || p.id, p));
        remoteProducts.forEach((item: any) => {
          const existing = map.get(item.slug || item.id);
          if (existing) {
            map.set(item.slug || item.id, {
              ...existing,
              ...item,
              priceFCFA: item.priceFCFA || item.price || existing.priceFCFA,
              price: item.priceFCFA || item.price || existing.price,
            });
          }
        });
        localList = Array.from(map.values());
      }

      // Filter out hidden items for public view
      localList = localList.filter((p: Product) => !p.is_hidden);

      // Filter by category
      if (category && category !== 'TODOS') {
        localList = localList.filter((p: Product) => p.category === category);
      }

      // Filter by search query
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        localList = localList.filter((p: Product) => 
          p.name.toLowerCase().includes(lowerQuery) || 
          (p.sku && p.sku.toLowerCase().includes(lowerQuery)) ||
          p.description.toLowerCase().includes(lowerQuery)
        );
      }

      setProducts(localList);
    } catch (err: any) {
      console.warn('Fallback to local products cache:', err);
      let localList = demoGetProducts();
      localList = localList.filter((p: Product) => !p.is_hidden);
      if (category && category !== 'TODOS') {
        localList = localList.filter((p: Product) => p.category === category);
      }
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        localList = localList.filter((p: Product) => p.name.toLowerCase().includes(lowerQuery));
      }
      setProducts(localList);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
