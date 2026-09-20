import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { demoGetProducts } from '../lib/demoData';
import type { Product, ProductCategory } from '../types';

export function useProducts(category?: ProductCategory | 'TODOS', searchQuery?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured() && supabase) {
        let query = supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (category && category !== 'TODOS') {
          query = query.eq('category', category);
        }

        if (searchQuery) {
          query = query.ilike('name', `%${searchQuery}%`);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setProducts(data as Product[]);
      } else {
        // Fallback to demo data
        let demoProducts = await demoGetProducts();
        
        if (category && category !== 'TODOS') {
          demoProducts = demoProducts.filter(p => p.category === category);
        }
        
        if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          demoProducts = demoProducts.filter(p => p.name.toLowerCase().includes(lowerQuery));
        }

        // Sort by created_at desc (simulation)
        demoProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        setProducts(demoProducts);
      }
    } catch (err: any) {
      console.error('Error fetching products:', err);
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
