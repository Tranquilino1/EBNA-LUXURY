import { useState, useEffect, useCallback } from 'react';
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
      // Fetch exclusively from Supabase
      const { data: remoteProducts, error: dbError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) {
        throw dbError;
      }

      let finalList: Product[] = [];

      if (remoteProducts && remoteProducts.length > 0) {
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
      console.warn('Supabase fetch failed, showing empty state or fallback:', err);
      // Removed the local demoData fallback to ensure strict Supabase usage as requested by user.
      setProducts([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]);

  useEffect(() => {
    fetchProducts();

    // 1. Local BroadcastChannel for same-device multi-tab sync
    const unsubscribe = subscribeToCatalogChanges(() => {
      fetchProducts();
    });

    // 2. Supabase Realtime WebSockets for Instant Cross-Device Sync (Mobile <-> PC)
    const channel = supabase
      .channel('products-realtime-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    // 3. Window focus listener to re-verify state when user switches back to PC browser
    const handleFocus = () => fetchProducts();
    window.addEventListener('focus', handleFocus);

    return () => {
      unsubscribe();
      supabase.removeChannel(channel);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
