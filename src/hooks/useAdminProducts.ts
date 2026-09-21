import { useState, useEffect, useCallback } from 'react';
import { demoGetProducts, demoAddProduct, demoUpdateProduct, demoDeleteProduct } from '../lib/demoData';
import { supabase } from '../config/supabase';
import type { Product, ProductImages } from '../types';
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
        const mappedRemote: Product[] = dbProducts.map((item: any) => {
          const primaryImg = item.images?.primary || (Array.isArray(item.images) ? item.images[0] : '/icons/ebna-logo.png');
          return {
            id: item.id || 'eb-' + Date.now(),
            sku: item.sku || 'EB-LUX-' + Math.floor(Math.random() * 900 + 100),
            name: item.name,
            category: item.category || 'MODA_MUJER',
            subcategory: item.subcategory || 'General',
            priceFCFA: item.priceFCFA || item.price || 15000,
            inStock: item.inStock !== undefined ? item.inStock : (item.in_stock !== undefined ? item.in_stock : true),
            description: item.description || '',
            images: {
              primary: primaryImg,
              gallery: [primaryImg]
            },
            slug: item.slug,
            price: item.priceFCFA || item.price || 15000,
            in_stock: item.inStock !== undefined ? item.inStock : true,
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString(),
          };
        });

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
        updatedData.images = {
          primary: localUrl,
          gallery: [localUrl]
        };
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
    demoUpdateProduct(id, { in_stock: !currentStockStatus, inStock: !currentStockStatus });
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
