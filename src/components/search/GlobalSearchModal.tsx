import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Search, 
  X, 
  ShoppingBag, 
  Check, 
  ArrowRight, 
  SlidersHorizontal, 
  Zap
} from 'lucide-react';
import { useGlobalSearch } from '../../contexts/GlobalSearchContext';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../contexts/CartContext';
import { useModalLock } from '../../hooks/useModalLock';
import { 
  Icon3DAll, 
  Icon3DFacial, 
  Icon3DBody, 
  Icon3DFashion, 
  Icon3DBags, 
  Icon3DShoes, 
  Icon3DPerfume, 
  Icon3DKids 
} from '../ui/Category3DIcons';
import { filterProductsBySearch, highlightMatch } from '../../lib/searchUtils';
import { formatPrice } from '../../lib/utils';
import type { Product, FilterCategoryType } from '../../types';
import './globalSearch.css';

const CATEGORY_TABS: { id: FilterCategoryType; label: string; icon: React.ReactNode }[] = [
  { id: 'TODOS', label: 'Todos', icon: <Icon3DAll size={24} /> },
  { id: 'COSMETICA_FACIAL', label: 'Cosmética Facial', icon: <Icon3DFacial size={24} /> },
  { id: 'HIGIENE_CORPORAL', label: 'Higiene Corporal', icon: <Icon3DBody size={24} /> },
  { id: 'MODA_MUJER', label: 'Moda Mujer', icon: <Icon3DFashion size={24} /> },
  { id: 'BOLSOS_ACCESORIOS', label: 'Bolsos & Accesorios', icon: <Icon3DBags size={24} /> },
  { id: 'CALZADO', label: 'Calzado', icon: <Icon3DShoes size={24} /> },
  { id: 'PERFUMERIA', label: 'Perfumería', icon: <Icon3DPerfume size={24} /> },
  { id: 'MODA_INFANTIL', label: 'Línea Infantil', icon: <Icon3DKids size={24} /> },
];

const POPULAR_SUGGESTIONS = [
  'Caro White',
  'Topicrem Mela',
  'Instituto Español',
  'Palmolive',
  'Bodysuit',
  'Gafas de Sol',
  'Yara',
  'Grisi',
  'Vestido',
  'Asantee'
];

export const GlobalSearchModal: React.FC = () => {
  const { 
    isOpen, 
    closeSearch, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory 
  } = useGlobalSearch();

  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance');
  const inputRef = useRef<HTMLInputElement>(null);

  // Background isolation, touch lock, and Escape key listener
  useModalLock(isOpen, closeSearch);

  // Focus input automatically whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [isOpen]);

  // Compute live filtered products using EXACT SAME search algorithm
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Search Query filtering via searchUtils (Spanish stemmer, typo tolerance, relevance)
    if (searchQuery.trim().length > 0) {
      list = filterProductsBySearch(list, searchQuery);
    }

    // 2. Category filtering
    if (selectedCategory && selectedCategory !== 'TODOS') {
      list = list.filter(p => {
        if (selectedCategory === 'MODA_INFANTIL') {
          return p.category === 'MODA_INFANTIL' || p.subcategory === 'Moda Infantil';
        }
        if (selectedCategory === 'MODA_MUJER') {
          return p.category === 'MODA_MUJER' && p.subcategory !== 'Moda Infantil';
        }
        return p.category === selectedCategory;
      });
    }

    // 3. Sorting
    if (sortOrder === 'price-asc') {
      list.sort((a, b) => (a.priceFCFA || a.price || 0) - (b.priceFCFA || b.price || 0));
    } else if (sortOrder === 'price-desc') {
      list.sort((a, b) => (b.priceFCFA || b.price || 0) - (a.priceFCFA || a.price || 0));
    }

    return list;
  }, [products, searchQuery, selectedCategory, sortOrder]);

  const handleProductClick = (product: Product, e: React.MouseEvent) => {
    // If clicking quick cart button, don't navigate
    const target = e.target as HTMLElement;
    if (target.closest('.global-search-quick-cart-btn')) return;

    closeSearch();
    navigate(`/producto/${product.slug || product.id}`);
  };

  const handleQuickAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1800);
  };

  const handleApplySuggestion = (sug: string) => {
    setSearchQuery(sug);
    inputRef.current?.focus();
  };

  const handleViewInCatalog = () => {
    closeSearch();
    navigate('/catalogo');
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`global-search-backdrop ${isOpen ? 'is-open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSearch();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Buscador general de productos"
    >
      <div className="global-search-card" onClick={(e) => e.stopPropagation()}>
        {/* Header with Search Input & Prominent Luxury Close button */}
        <div className="global-search-header">
          <div className="global-search-header-row">
            <div className="global-search-input-box">
              <Search size={22} color="#D81B60" style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cualquier prenda, vestido, jabón, crema, calzado, bolso..."
                className="global-search-input"
                aria-label="Escribe para buscar productos"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="global-search-clear-btn"
                  title="Borrar texto"
                >
                  <X size={15} />
                </button>
              )}
              <span className="global-search-esc-badge desktop-only">ESC</span>
            </div>

            <button 
              type="button" 
              onClick={closeSearch}
              className="luxury-close-circle-btn"
              title="Cerrar buscador (ESC)"
              aria-label="Cerrar buscador"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Pills with 3D Icons */}
        <div className="global-search-categories-scroll">
          {CATEGORY_TABS.map(tab => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`global-search-cat-chip ${isActive ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(tab.id)}
              >
                <span className="global-search-3d-icon-wrap">{tab.icon}</span>
                <span className="global-search-cat-label">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results Area */}
        <div className="global-search-results-area">
          <div className="global-search-meta-bar">
            <span>
              {filteredProducts.length === 1 
                ? '1 producto encontrado' 
                : `${filteredProducts.length} productos disponibles`}
              {selectedCategory !== 'TODOS' && ` en ${selectedCategory.replace(/_/g, ' ')}`}
            </span>

            {/* Quick Sort Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <SlidersHorizontal size={14} color="#D81B60" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--brand-accent)',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="global-search-results-grid">
              {filteredProducts.map(product => {
                const isAdded = addedProductId === product.id;
                const mainImg = product.images?.primary || (Array.isArray(product.images) ? product.images[0] : (product.images as any)?.[0]) || '/icons/ebna-logo-white.png';
                const formattedPrice = formatPrice(product.priceFCFA || product.price || 0);

                return (
                  <div
                    key={product.id}
                    onClick={(e) => handleProductClick(product, e)}
                    className="global-search-item-card"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="global-search-item-img-wrap">
                      <img 
                        src={mainImg} 
                        alt={product.name} 
                        className="global-search-item-img"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          if (img.src !== '/icons/ebna-logo-white.png') {
                            img.src = '/icons/ebna-logo-white.png';
                          }
                        }}
                      />
                    </div>

                    <span className="global-search-item-cat">
                      {(product.subcategory || product.category || 'Colección').replace(/_/g, ' ')}
                    </span>

                    <h4 className="global-search-item-title" title={product.name}>
                      {searchQuery.trim() ? (
                        highlightMatch(product.name, searchQuery).map((chunk, idx) => (
                          chunk.isMatch ? (
                            <mark key={idx} className="global-search-highlight">{chunk.text}</mark>
                          ) : (
                            <span key={idx}>{chunk.text}</span>
                          )
                        ))
                      ) : (
                        product.name
                      )}
                    </h4>

                    <div className="global-search-item-bottom">
                      <span className="global-search-item-price">
                        {formattedPrice}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAddToCart(product, e)}
                        className={`global-search-quick-cart-btn ${isAdded ? 'is-added' : ''}`}
                        title="Añadir directamente al carrito"
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} />
                            <span>¡Listo!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={13} />
                            <span>+ Carrito</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="global-search-empty">
              <div className="global-search-empty-icon">
                <Search size={26} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                No encontramos coincidencias para "{searchQuery}"
              </h3>
              <p style={{ fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto 16px auto', lineHeight: 1.5 }}>
                Prueba buscando por marca (ej. <em>Topicrem</em>, <em>Palmolive</em>), tipo de artículo (ej. <em>Vestido</em>, <em>Jabón</em>) o selecciona una categoría.
              </p>

              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Sugerencias populares:
              </div>
              <div className="global-search-suggestions-row">
                {POPULAR_SUGGESTIONS.map(sug => (
                  <button
                    key={sug}
                    type="button"
                    className="global-search-pill-suggest"
                    onClick={() => handleApplySuggestion(sug)}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="global-search-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <Zap size={14} color="#D81B60" />
            <span>Filtro instantáneo 0ms sin recargar la página</span>
          </div>

          <button 
            type="button" 
            onClick={handleViewInCatalog}
            className="global-search-catalog-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            <span>Ver en vista de catálogo completo</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
