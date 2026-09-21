import { useState, useEffect, useCallback } from 'react';
import { demoGetProducts } from '../lib/demoData';
import { supabase } from '../config/supabase';
import type { Product, ProductCategory } from '../types';

export function useProducts(category?: ProductCategory | 'TODOS', searchQuery?: string) {
  // Start with instant local items for 0ms initial render speed
  const [products, setProducts] = useState<Product[]>(() => {
    let list = demoGetProducts();
    if (category && category !== 'TODOS') {
      list = list.filter((p: Product) => p.category === category);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p: Product) => p.name.toLowerCase().includes(q));
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
        // Map Supabase products to Product format
        const mappedRemote: Product[] = remoteProducts.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          description: item.description || '',
          price: item.price,
          images: item.images && item.images.length > 0 ? item.images : ['/icons/ebna-logo.png'],
          in_stock: item.in_stock !== undefined ? item.in_stock : true,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));

        // Merge remote products with local list by slug to prevent duplicates
        const map = new Map<string, Product>();
        localList.forEach((p: Product) => map.set(p.slug, p));
        mappedRemote.forEach((p: Product) => map.set(p.slug, p));
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
        localList = localList.filter((p: Product) => p.name.toLowerCase().includes(lowerQuery));
      }

      // Sort newest first
      localList.sort((a: Product, b: Product) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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
