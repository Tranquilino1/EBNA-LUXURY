import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { demoGetProducts, demoAddProduct, demoUpdateProduct, demoDeleteProduct } from '../lib/demoData';
import type { Product } from '../types';

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } else {
        const data = await demoGetProducts();
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const uploadImage = async (file: File): Promise<string> => {
    if (isSupabaseConfigured() && supabase) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } else {
      // Demo fallback - use a placeholder or local object URL
      return URL.createObjectURL(file);
    }
  };

  const addProduct = async (productData: Partial<Product>, imageFile?: File) => {
    try {
      let imagesList: string[] = productData.images || [];
      
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        imagesList = [uploadedUrl, ...imagesList];
      }

      if (imagesList.length === 0) {
        imagesList = ['/icons/ebna-logo.png'];
      }

      const newProduct = { ...productData, images: imagesList };

      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.from('products').insert([newProduct]);
        if (error) throw error;
      } else {
        await demoAddProduct(newProduct as Omit<Product, 'id' | 'created_at'>);
      }
      
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
        const uploadedUrl = await uploadImage(imageFile);
        updatedData.images = [uploadedUrl, ...(updates.images || [])];
      }

      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase
          .from('products')
          .update(updatedData)
          .eq('id', id);
        if (error) throw error;
      } else {
        await demoUpdateProduct(id, updatedData);
      }
      
      await fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
      } else {
        await demoDeleteProduct(id);
      }
      await fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  const toggleStock = async (id: string, currentStockStatus: boolean) => {
    await updateProduct(id, { in_stock: !currentStockStatus });
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    refetch: fetchProducts,
    uploadImage
  };
}
