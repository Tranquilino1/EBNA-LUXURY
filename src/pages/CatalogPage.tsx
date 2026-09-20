import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { SearchBar } from '../components/ui/SearchBar';
import { CategoryFilter } from '../components/catalog/CategoryFilter';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { Loader } from '../components/ui/Loader';
import type { ProductCategory } from '../types';

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { products, loading, error } = useProducts(activeCategory, searchQuery);

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <h1>Nuestro Catálogo</h1>
        <p>Explora nuestra exclusiva colección de moda, cosmética y accesorios diseñados para ti.</p>
      </header>

      <div className="catalog-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      <div className="catalog-results-info">
        <p className="result-count">
          {loading ? 'Buscando...' : `${products.length} productos encontrados`}
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error.message || 'Error al cargar productos'}</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
