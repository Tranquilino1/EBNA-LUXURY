import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { SearchBar } from '../components/ui/SearchBar';
import { CategoryFilter } from '../components/catalog/CategoryFilter';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { Loader } from '../components/ui/Loader';
import type { ProductCategory } from '../types';
import { getSortedByPopularity } from '../lib/popularityTracker';
import { SEOHead } from '../components/seo/SEOHead';

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc'>('popularity');
  
  const { products, loading, error } = useProducts(activeCategory, searchQuery);

  let sortedList = [...products];
  if (sortBy === 'popularity') {
    sortedList = getSortedByPopularity(sortedList);
  } else if (sortBy === 'price-asc') {
    sortedList.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sortedList.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="catalog-page">
      <SEOHead 
        title="Catálogo de Productos y Cosmética — EBNA Luxury"
        description="Explora nuestro catálogo completo de ropa, fragancias de lujo, vaselinas, serums y cosméticos con envíos directos a Malabo y Bata."
      />
      <header className="catalog-header">
        <h1>Nuestro Catálogo</h1>
        <p>Explora nuestra exclusiva colección de moda, cosmética y accesorios diseñados para ti.</p>
      </header>

      <div className="catalog-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      <div className="catalog-results-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem', margin: '1rem 0' }}>
        <p className="result-count" style={{ margin: 0 }}>
          {loading ? 'Buscando...' : `${sortedList.length} productos encontrados`}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Ordenar por:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{ padding: '4px 10px', borderRadius: '10px', border: '1px solid var(--color-glass-border)', fontSize: '0.82rem', background: 'white', cursor: 'pointer' }}
          >
            <option value="popularity">🔥 Más Vendidos & Pedidos (Prioridad)</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error.message || 'Error al cargar productos'}</div>
      ) : (
        <ProductGrid products={sortedList} />
      )}
    </div>
  );
}
