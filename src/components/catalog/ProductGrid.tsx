import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types';
import './catalog.css';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="product-card skeleton-card glass-panel">
            <div className="skeleton-img skeleton-shimmer"></div>
            <div className="skeleton-info">
              <div className="skeleton-text skeleton-shimmer" style={{ width: '80%' }}></div>
              <div className="skeleton-text skeleton-shimmer" style={{ width: '50%' }}></div>
              <div className="skeleton-btn skeleton-shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state glass-panel">
        <p>No se encontraron productos en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};
