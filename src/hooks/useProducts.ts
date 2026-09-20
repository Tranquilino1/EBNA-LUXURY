import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { demoGetProducts } from '../lib/demoData';
import type { Product, ProductCategory } from '../types';

const OFFLINE_CACHE_KEY = 'ebna_offline_products_cache';

export function useProducts(category?: ProductCategory | 'TODOS', searchQuery?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let fetchedList: Product[] = [];

      if (isSupabaseConfigured() && supabase && navigator.onLine) {
        let query = supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        const { data, error: fetchError } = await query;

        if (!fetchError && data && data.length > 0) {
          fetchedList = data as Product[];
          // Save to local offline cache
          try {
            localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(fetchedList));
          } catch (e) {
            console.warn('Could not save to localStorage:', e);
          }
        } else {
          throw fetchError || new Error('No data from Supabase');
        }
      } else {
        throw new Error('Offline or Supabase not available');
      }

      // Filter locally by category and search
      let filtered = fetchedList;
      if (category && category !== 'TODOS') {
        filtered = filtered.filter(p => p.category === category);
      }
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerQuery));
      }
      setProducts(filtered);

    } catch (err: any) {
      console.warn('Using local offline cache for products:', err);

      // Try reading from offline cache first
      let localCache: Product[] = [];
      try {
        const cached = localStorage.getItem(OFFLINE_CACHE_KEY);
        if (cached) {
          localCache = JSON.parse(cached);
        }
      } catch (e) {
        console.warn('Error reading offline cache:', e);
      }

      // Fallback to pre-loaded catalog if cache is empty
      if (localCache.length === 0) {
        localCache = await demoGetProducts();
        try {
          localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(localCache));
        } catch (e) {}
      }

      let filtered = localCache;
      if (category && category !== 'TODOS') {
        filtered = filtered.filter(p => p.category === category);
      }
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerQuery));
      }

      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setProducts(filtered);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
