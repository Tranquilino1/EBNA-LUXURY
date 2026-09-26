import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
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
import { Sparkles, X, Search, ArrowLeft } from 'lucide-react';
import { getSavedZoneScroll } from '../components/ui/SmartInputCentering';

interface CatalogZoneSnapshot {
  activeCategory: FilterCategoryType;
  searchQuery: string;
  sortBy: SortOptionType;
  priceRange: PriceRangeType;
  onlyInStock: boolean;
  scrollY: number;
}

const CATALOG_STATE_STORAGE_KEY = 'ebna_catalog_zone_state_v2';
const CATALOG_HISTORY_STORAGE_KEY = 'ebna_catalog_zone_history_v2';

function loadSavedCatalogState(): Partial<CatalogZoneSnapshot> {
  try {
    const raw = sessionStorage.getItem(CATALOG_STATE_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function loadSavedCatalogHistory(): CatalogZoneSnapshot[] {
  try {
    const raw = sessionStorage.getItem(CATALOG_HISTORY_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function CatalogPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlCat = searchParams.get('cat');
  const savedInitial = useMemo(() => loadSavedCatalogState(), []);

  const [activeCategory, setActiveCategoryState] = useState<FilterCategoryType>(
    savedInitial.activeCategory || 'TODOS'
  );
  const [searchQuery, setSearchQuery] = useState<string>(savedInitial.searchQuery || '');
  const [sortBy, setSortByState] = useState<SortOptionType>(savedInitial.sortBy || 'popularity');
  const [priceRange, setPriceRangeState] = useState<PriceRangeType>(savedInitial.priceRange || 'all');
  const [onlyInStock, setOnlyInStockState] = useState<boolean>(savedInitial.onlyInStock || false);
  const [zoneHistory, setZoneHistory] = useState<CatalogZoneSnapshot[]>(() => loadSavedCatalogHistory());

  // Respond immediately when user clicks a collection from the mobile navigation drawer
  useEffect(() => {
    if (urlCat) {
      let mappedCat: FilterCategoryType = 'TODOS';
      if (urlCat === 'VESTIDOS_GALA' || urlCat === 'MODA_MUJER') {
        mappedCat = 'MODA_MUJER';
      } else if (urlCat === 'COSMETICA_FACIAL') {
        mappedCat = 'COSMETICA_FACIAL';
      } else if (urlCat === 'CALZADO') {
        mappedCat = 'CALZADO';
      } else if (urlCat === 'BOLSOS_ACCESORIOS') {
        mappedCat = 'BOLSOS_ACCESORIOS';
      } else if (urlCat === 'PERFUMERIA') {
        mappedCat = 'PERFUMERIA';
      } else if (urlCat === 'HIGIENE_CORPORAL') {
        mappedCat = 'HIGIENE_CORPORAL';
      } else if (urlCat === 'MODA_INFANTIL') {
        mappedCat = 'MODA_INFANTIL';
      } else if (urlCat === 'MODA_HOMBRE') {
        mappedCat = 'MODA_HOMBRE';
      }
      setActiveCategoryState(mappedCat);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [urlCat]);
  
  // Universal data fetch: load all products once into memory for instant 0ms search
  const { products, loading, error } = useProducts();

  // Save current zone state continuously in sessionStorage so returning from a product restores exact state
  useEffect(() => {
    try {
      const current: CatalogZoneSnapshot = {
        activeCategory,
        searchQuery,
        sortBy,
        priceRange,
        onlyInStock,
        scrollY: window.scrollY,
      };
      sessionStorage.setItem(CATALOG_STATE_STORAGE_KEY, JSON.stringify(current));
    } catch {}
  }, [activeCategory, searchQuery, sortBy, priceRange, onlyInStock]);

  useEffect(() => {
    try {
      sessionStorage.setItem(CATALOG_HISTORY_STORAGE_KEY, JSON.stringify(zoneHistory.slice(-12)));
    } catch {}
  }, [zoneHistory]);

  // Restore saved scrollY when mounting CatalogPage (e.g. returning from a product or page)
  useEffect(() => {
    const savedY = getSavedZoneScroll('/catalogo') ?? savedInitial.scrollY ?? 0;
    if (savedY > 0) {
      const restore = () => window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior });
      restore();
      const t1 = window.setTimeout(restore, 50);
      const t2 = window.setTimeout(restore, 150);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
  }, [savedInitial.scrollY]);

  const pushCurrentSnapshotToHistory = useCallback(() => {
    const snap: CatalogZoneSnapshot = {
      activeCategory,
      searchQuery,
      sortBy,
      priceRange,
      onlyInStock,
      scrollY: Math.round(window.scrollY),
    };
    setZoneHistory(prev => [...prev.slice(-11), snap]);
  }, [activeCategory, searchQuery, sortBy, priceRange, onlyInStock]);

  const setActiveCategory = useCallback((nextCat: FilterCategoryType) => {
    if (nextCat === activeCategory) return;
    pushCurrentSnapshotToHistory();
    setActiveCategoryState(nextCat);
  }, [activeCategory, pushCurrentSnapshotToHistory]);

  const setSortBy = useCallback((nextSort: SortOptionType) => {
    if (nextSort === sortBy) return;
    pushCurrentSnapshotToHistory();
    setSortByState(nextSort);
  }, [sortBy, pushCurrentSnapshotToHistory]);

  const setPriceRange = useCallback((nextRange: PriceRangeType) => {
    if (nextRange === priceRange) return;
    pushCurrentSnapshotToHistory();
    setPriceRangeState(nextRange);
  }, [priceRange, pushCurrentSnapshotToHistory]);

  const setOnlyInStock = useCallback((nextStock: boolean) => {
    if (nextStock === onlyInStock) return;
    pushCurrentSnapshotToHistory();
    setOnlyInStockState(nextStock);
  }, [onlyInStock, pushCurrentSnapshotToHistory]);

  // Step back to the exact previous filter/category zone and exact scrollY
  const handleStepBackZone = useCallback(() => {
    if (zoneHistory.length > 0) {
      const last = zoneHistory[zoneHistory.length - 1];
      setZoneHistory(prev => prev.slice(0, -1));
      setActiveCategoryState(last.activeCategory);
      setSearchQuery(last.searchQuery);
      setSortByState(last.sortBy);
      setPriceRangeState(last.priceRange);
      setOnlyInStockState(last.onlyInStock);
      window.setTimeout(() => {
        window.scrollTo({ top: last.scrollY, behavior: 'smooth' });
      }, 40);
    } else {
      navigate(-1);
    }
  }, [zoneHistory, navigate]);

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

      <header className="catalog-header compact-luxury-header" style={{ textAlign: 'center', marginBottom: '0.8rem', marginTop: '0.4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 12px', borderRadius: '20px', background: 'rgba(216, 27, 96, 0.08)', border: '1px solid rgba(216, 27, 96, 0.2)', color: 'var(--brand-accent)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
          Colección Oficial EBNA
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', color: 'var(--text-primary)', marginBottom: '0.2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Catálogo de Alta Costura
        </h1>
        <p className="desktop-only" style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '0.88rem', lineHeight: 1.4 }}>
          Prendas exclusivas, conjuntos de gala, calzado joya y alta cosmética con entrega en Guinea Ecuatorial.
        </p>
      </header>

      <div className="catalog-controls" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem', overflowAnchor: 'none' }}>
        {zoneHistory.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '720px', width: '100%', margin: '0 auto' }}>
            <button
              type="button"
              onClick={handleStepBackZone}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(216, 27, 96, 0.09)',
                border: '1.5px solid rgba(216, 27, 96, 0.28)',
                color: '#D81B60',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(216, 27, 96, 0.08)'
              }}
              title="Regresar exactamente al ajuste o categoría anterior y su posición en pantalla"
            >
              <ArrowLeft size={15} />
              <span>Volver a la zona anterior ({zoneHistory[zoneHistory.length - 1].activeCategory === 'TODOS' ? 'Todo el Catálogo' : zoneHistory[zoneHistory.length - 1].activeCategory.replace('_', ' ')})</span>
            </button>
          </div>
        )}

        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Buscar cualquier prenda, vestido, gala, color, calzado o cosmética..."
          products={products}
          showAutocompleteDropdown={false}
        />
        
        {/* Universal Search Live Status Bar - Only rendered when searching actively */}
        {isSearchActive && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.09) 0%, rgba(24, 66, 102, 0.05) 100%)',
              border: '1.5px solid rgba(216, 27, 96, 0.28)',
              borderRadius: '14px',
              padding: '6px 16px',
              margin: '0 auto',
              width: '100%',
              maxWidth: '720px',
              fontSize: '0.84rem',
              color: '#1E293B',
              boxShadow: '0 4px 15px rgba(216, 27, 96, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={15} color="#D81B60" />
              <span>
                Filtrando: <strong>{processedProducts.length}</strong> {processedProducts.length === 1 ? 'producto' : 'productos'} para <strong>"{searchQuery}"</strong>
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
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '16px',
                transition: 'all 0.2s ease'
              }}
            >
              <X size={12} /> Limpiar
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

      {/* Stable Min-Height Results Container so page never collapses or jumps while typing */}
      <div style={{ minHeight: '85vh', overflowAnchor: 'none' }}>
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
    </div>
  );
}
