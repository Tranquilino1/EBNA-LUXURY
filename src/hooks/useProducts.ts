import { useState, useEffect, useCallback } from 'react';
import { demoGetProducts, getDeletedProductIds } from '../lib/demoData';
import { subscribeToCatalogChanges } from '../lib/broadcast';
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
        const map = new Map<string, Product>();
        // 1. Add remote products
        remoteProducts.forEach((item: any) => {
          const primaryImg = item.images?.primary || (Array.isArray(item.images) ? item.images[0] : '/icons/ebna-logo.png');
          const pKey = item.slug || item.id;
          if (pKey) {
            map.set(pKey, {
              id: item.id || pKey,
              sku: item.sku || 'EB-LUX-00',
              slug: item.slug || pKey,
              name: item.name,
              brand: item.brand || 'EBNA Luxury Collection',
              category: item.category || 'MODA_MUJER',
              subcategory: item.subcategory || 'General',
              priceFCFA: item.price_fcfa || item.priceFCFA || item.price || 15000,
              price: item.price_fcfa || item.priceFCFA || item.price || 15000,
              inStock: item.in_stock !== undefined ? item.in_stock : true,
              in_stock: item.in_stock !== undefined ? item.in_stock : true,
              is_hidden: item.is_hidden || false,
              description: item.description || '',
              images: { primary: primaryImg, gallery: [primaryImg] },
              colors: item.colors || ['Blanco', 'Negro'],
              sizes: item.sizes || ['S', 'M', 'L'],
              created_at: item.created_at || new Date().toISOString(),
              updated_at: item.updated_at || new Date().toISOString(),
            });
          }
        });
        // 2. Put local curated / edited products SECOND so local data takes 100% priority
        localList.forEach((p: Product) => map.set(p.slug || p.id, p));
        localList = Array.from(map.values());
      }

      // Filter out deleted items and hidden items for public view
      const deletedIds = getDeletedProductIds();
      localList = localList.filter((p: Product) => !p.is_hidden && !deletedIds.includes(p.id) && !deletedIds.includes(p.slug));

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
    const unsubscribe = subscribeToCatalogChanges(() => {
      fetchProducts();
    });
    return () => unsubscribe();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
