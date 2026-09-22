import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { SearchBar } from '../components/ui/SearchBar';
import { CategoryFilter } from '../components/catalog/CategoryFilter';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { Loader } from '../components/ui/Loader';
import type { FilterCategoryType } from '../types';
import { getSortedByPopularity } from '../lib/popularityTracker';
import { SEOHead } from '../components/seo/SEOHead';

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategoryType>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc'>('popularity');
  
  const { products, loading, error } = useProducts(activeCategory, searchQuery);

  let sortedList = [...products];
  if (sortBy === 'popularity') {
    sortedList = getSortedByPopularity(sortedList);
  } else if (sortBy === 'price-asc') {
    sortedList.sort((a, b) => (a.priceFCFA || a.price) - (b.priceFCFA || b.price));
  } else if (sortBy === 'price-desc') {
    sortedList.sort((a, b) => (b.priceFCFA || b.price) - (a.priceFCFA || a.price));
  }

  return (
    <div className="catalog-page">
      <SEOHead 
        title="EBNA Luxury | Moda y Cosmética de Lujo en Guinea Ecuatorial"
        description="Explora nuestro catálogo completo de ropa de mujer y hombre, calzado, bolsos, perfumería de lujo y cosmética con envío directo en FCFA a Malabo y Bata."
      />
      <header className="catalog-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Catálogo de Alta Costura
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.5 }}>
          Prendas de gala exclusivas, conjuntos de pasarela, calzado joya y alta cosmética botánica en Guinea Ecuatorial.
        </p>
      </header>

      <div className="catalog-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      <div className="catalog-results-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem', margin: '1.5rem 0' }}>
        <p className="result-count" style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: 600 }}>
          {loading ? 'Buscando...' : `${sortedList.length} piezas exclusivas`}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Ordenar por:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{ 
              padding: '6px 12px', 
              borderRadius: '12px', 
              border: '1px solid var(--border-subtle)', 
              fontSize: '0.85rem', 
              background: 'var(--canvas-surface)', 
              color: 'var(--text-primary)',
              cursor: 'pointer' 
            }}
          >
            <option value="popularity">🔥 Más Vendidos & Pedidos</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {loading && sortedList.length === 0 ? (
        <Loader />
      ) : error && sortedList.length === 0 ? (
        <div className="error-message">{error.message || 'Error al cargar productos'}</div>
      ) : (
        <ProductGrid products={sortedList} />
      )}
    </div>
  );
}
