import { useState, useEffect, useCallback } from 'react';
import { demoGetProducts, demoAddProduct, demoUpdateProduct, demoDeleteProduct } from '../lib/demoData';
import { supabase } from '../config/supabase';
import type { Product } from '../types';
import { generateSlug } from '../lib/utils';

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let data = demoGetProducts();

      // Try fetching from Supabase
      const { data: dbProducts, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && dbProducts && dbProducts.length > 0) {
        const mappedRemote: Product[] = dbProducts.map((item: any) => ({
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

        const map = new Map<string, Product>();
        data.forEach((p: Product) => map.set(p.slug, p));
        mappedRemote.forEach((p: Product) => map.set(p.slug, p));
        data = Array.from(map.values());
      }

      data.sort((a: Product, b: Product) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setProducts(data);
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData: Partial<Product>, imageFile?: File) => {
    try {
      let imagesList: string[] = productData.images || [];

      if (imageFile) {
        const localUrl = URL.createObjectURL(imageFile);
        imagesList = [localUrl, ...imagesList];
      }

      if (imagesList.length === 0) {
        imagesList = ['/icons/ebna-logo.png'];
      }

      const newSlug = generateSlug(productData.name || 'producto-' + Date.now());
      const newProduct = { 
        ...productData, 
        slug: newSlug,
        images: imagesList 
      };

      // 1. Add locally
      const created = demoAddProduct(newProduct);

      // 2. Add to Supabase
      await supabase.from('products').upsert({
        slug: newSlug,
        name: created.name,
        category: created.category,
        description: created.description,
        price: created.price,
        images: created.images,
        in_stock: created.in_stock
      }, { onConflict: 'slug' });

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
        updatedData.images = [localUrl, ...(updates.images || [])];
      }

      // 1. Update locally
      const updated = demoUpdateProduct(id, updatedData);

      if (updated) {
        // 2. Update in Supabase
        await supabase.from('products').upsert({
          slug: updated.slug,
          name: updated.name,
          category: updated.category,
          description: updated.description,
          price: updated.price,
          images: updated.images,
          in_stock: updated.in_stock
        }, { onConflict: 'slug' });
      }

      await fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const prod = products.find(p => p.id === id);
      // 1. Delete locally
      demoDeleteProduct(id);

      // 2. Delete from Supabase
      if (prod) {
        await supabase.from('products').delete().eq('slug', prod.slug);
      }

      await fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  const toggleStock = async (id: string, currentStockStatus: boolean) => {
    const prod = products.find(p => p.id === id);
    demoUpdateProduct(id, { in_stock: !currentStockStatus });
    if (prod) {
      await supabase.from('products').update({ in_stock: !currentStockStatus }).eq('slug', prod.slug);
    }
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
