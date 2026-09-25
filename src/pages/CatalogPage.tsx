import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { SearchBar } from '../components/ui/SearchBar';
import { CategoryFilter } from '../components/catalog/CategoryFilter';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { CatalogSortBar, type SortOptionType, type PriceRangeType } from '../components/catalog/CatalogSortBar';
import { Loader } from '../components/ui/Loader';
import type { FilterCategoryType } from '../types';
import { getSortedByPopularity } from '../lib/popularityTracker';
import { filterProductsBySearch } from '../lib/searchUtils';
import { SEOHead } from '../components/seo/SEOHead';
import { Sparkles, X, Search } from 'lucide-react';

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategoryType>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOptionType>('popularity');
  const [priceRange, setPriceRange] = useState<PriceRangeType>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  
  // Universal data fetch: load all products once into memory for instant 0ms search
  const { products, loading, error } = useProducts();

  const isSearchActive = searchQuery.trim().length > 0;

  // Filter and sort products with ultra-fast 0ms in-memory universal search
  const processedProducts = useMemo(() => {
    let list = [...products];

    // 1. Universal Search (Initials-first professional ecommerce matching)
    if (isSearchActive) {
      list = filterProductsBySearch(list, searchQuery);
    } else {
      // 2. Category Filter (only applies when not actively searching universally)
      if (activeCategory && activeCategory !== 'TODOS') {
        list = list.filter(p => {
          if (activeCategory === 'MODA_INFANTIL') {
            return p.category === 'MODA_INFANTIL' || p.subcategory === 'Moda Infantil';
          }
          if (activeCategory === 'MODA_MUJER') {
            return p.category === 'MODA_MUJER' && p.subcategory !== 'Moda Infantil';
          }
          return p.category === activeCategory;
        });
      }
    }

    // 3. Stock Filter
    if (onlyInStock) {
      list = list.filter(p => p.in_stock || p.inStock);
    }

    // 4. Price Range Filter
    if (priceRange === 'under-25k') {
      list = list.filter(p => (p.priceFCFA || p.price || 0) <= 25000);
    } else if (priceRange === '25k-50k') {
      list = list.filter(p => {
        const pr = p.priceFCFA || p.price || 0;
        return pr > 25000 && pr <= 50000;
      });
    } else if (priceRange === 'over-50k') {
      list = list.filter(p => (p.priceFCFA || p.price || 0) > 50000);
    }

    // 5. Sorting
    if (isSearchActive && sortBy === 'popularity') {
      // Preserve search relevance order: items whose initials match query come first!
    } else if (sortBy === 'popularity') {
      list = getSortedByPopularity(list);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.priceFCFA || a.price || 0) - (b.priceFCFA || b.price || 0));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.priceFCFA || b.price || 0) - (a.priceFCFA || a.price || 0));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === 'in-stock') {
      list.sort((a, b) => {
        const stockA = a.in_stock || a.inStock ? 1 : 0;
        const stockB = b.in_stock || b.inStock ? 1 : 0;
        return stockB - stockA;
      });
    }

    return list;
  }, [products, isSearchActive, searchQuery, activeCategory, onlyInStock, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSortBy('popularity');
    setPriceRange('all');
    setOnlyInStock(false);
  };

  return (
    <div className="catalog-page luxury-container" style={{ paddingBottom: '5rem' }}>
      <SEOHead 
        title="EBNA Luxury | Catálogo Exclusivo de Moda y Alta Cosmética"
        description="Explora nuestro catálogo completo de vestidos de gala, conjuntos de pasarela, calzado joya y alta cosmética botánica con entrega inmediata en FCFA en Guinea Ecuatorial."
      />

      <header className="catalog-header" style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '20px', background: 'rgba(216, 27, 96, 0.08)', border: '1px solid rgba(216, 27, 96, 0.2)', color: 'var(--brand-accent)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
          Colección Oficial EBNA
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Catálogo de Alta Costura
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Prendas de gala exclusivas, conjuntos de pasarela, calzado joya y alta cosmética botánica con entrega directa en Guinea Ecuatorial.
        </p>
      </header>

      <div className="catalog-controls" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Buscar cualquier prenda, vestido, gala, color, calzado o cosmética..."
          products={products}
        />
        
        {/* Universal Search Live Indicator Banner */}
        {isSearchActive && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.08) 0%, rgba(24, 66, 102, 0.05) 100%)',
              border: '1.5px solid rgba(216, 27, 96, 0.25)',
              borderRadius: '16px',
              padding: '10px 18px',
              margin: '0 auto',
              width: '100%',
              maxWidth: '680px',
              fontSize: '0.88rem',
              color: '#1E293B',
              boxShadow: '0 4px 15px rgba(216, 27, 96, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#D81B60" />
              <span>
                Buscador Universal en Todo el Catálogo: <strong>{processedProducts.length}</strong> {processedProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                background: 'rgba(216, 27, 96, 0.1)',
                border: 'none',
                color: '#D81B60',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '20px',
                transition: 'all 0.2s ease'
              }}
            >
              <X size={13} /> Limpiar
            </button>
          </div>
        )}

        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Luxury Catalog Sorting & Filtering Toolbar */}
      <CatalogSortBar
        totalCount={products.length}
        filteredCount={processedProducts.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        onlyInStock={onlyInStock}
        onOnlyInStockChange={setOnlyInStock}
        onResetFilters={handleResetFilters}
      />

      {loading && processedProducts.length === 0 ? (
        <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader message="Consultando piezas de colección..." />
        </div>
      ) : error && processedProducts.length === 0 ? (
        <div className="error-message" style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
          {error.message || 'Error al cargar los productos del catálogo'}
        </div>
      ) : processedProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'var(--canvas-elevated)',
          borderRadius: '24px',
          margin: '2rem auto',
          maxWidth: '600px',
          border: '1px solid var(--border-light)'
        }}>
          <Search size={44} color="#D81B60" style={{ margin: '0 auto 1rem auto', opacity: 0.8 }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            No encontramos productos para "{searchQuery}"
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            Prueba a buscar por nombre de prenda (ej. <em>"vestido"</em>, <em>"soleil"</em>, <em>"safari"</em>), color (<em>"rojo"</em>, <em>"amarillo"</em>) o categoría (<em>"cosmética"</em>, <em>"calzado"</em>).
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setActiveCategory('TODOS'); }}
            style={{
              padding: '10px 22px',
              borderRadius: '25px',
              border: 'none',
              background: 'linear-gradient(135deg, #D81B60, #C2185B)',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(216, 27, 96, 0.3)'
            }}
          >
            Ver Todo el Catálogo
          </button>
        </div>
      ) : (
        <ProductGrid products={processedProducts} />
      )}
    </div>
  );
}
