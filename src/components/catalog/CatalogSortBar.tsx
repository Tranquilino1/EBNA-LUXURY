import React from 'react';
import { ArrowUpDown, Flame, Sparkles, CheckCircle2, RotateCcw, SlidersHorizontal, ArrowDown, ArrowUp } from 'lucide-react';
import './catalog.css';

export type SortOptionType = 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'in-stock';
export type PriceRangeType = 'all' | 'under-25k' | '25k-50k' | 'over-50k';

interface CatalogSortBarProps {
  totalCount: number;
  filteredCount: number;
  sortBy: SortOptionType;
  onSortChange: (sort: SortOptionType) => void;
  priceRange: PriceRangeType;
  onPriceRangeChange: (range: PriceRangeType) => void;
  onlyInStock: boolean;
  onOnlyInStockChange: (inStock: boolean) => void;
  onResetFilters: () => void;
}

export const CatalogSortBar: React.FC<CatalogSortBarProps> = ({
  totalCount,
  filteredCount,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onlyInStock,
  onOnlyInStockChange,
  onResetFilters,
}) => {
  const hasActiveFilters = priceRange !== 'all' || onlyInStock || sortBy !== 'popularity';

  const sortButtons: { id: SortOptionType; label: string; icon: React.ReactNode }[] = [
    { id: 'popularity', label: 'Tendencias & Pedidos', icon: <Flame size={15} color="#D81B60" /> },
    { id: 'price-asc', label: 'Precio: Menor a Mayor', icon: <ArrowUp size={15} /> },
    { id: 'price-desc', label: 'Precio: Mayor a Menor', icon: <ArrowDown size={15} /> },
    { id: 'newest', label: 'Nuevas Piezas', icon: <Sparkles size={15} color="#D4AF37" /> },
  ];

  const priceChips: { id: PriceRangeType; label: string }[] = [
    { id: 'all', label: 'Todos los Precios' },
    { id: 'under-25k', label: 'Hasta 25.000 FCFA' },
    { id: '25k-50k', label: '25.000 - 50.000 FCFA' },
    { id: 'over-50k', label: 'Más de 50.000 FCFA' },
  ];

  return (
    <div className="catalog-sort-bar-wrapper glass-panel">
      {/* Top Header Row: Counter & Status */}
      <div className="sort-bar-header">
        <div className="sort-bar-title-group">
          <div className="sort-bar-icon-pill">
            <SlidersHorizontal size={18} color="var(--brand-accent)" />
          </div>
          <div>
            <h3 className="sort-bar-title">Filtrar & Ordenar Catálogo</h3>
            <p className="sort-bar-counter">
              Mostrando <strong style={{ color: 'var(--brand-accent)' }}>{filteredCount}</strong> de {totalCount} creaciones de alta gama
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="sort-bar-reset-btn"
            onClick={onResetFilters}
            title="Restablecer todos los filtros"
          >
            <RotateCcw size={14} />
            <span>Limpiar Filtros</span>
          </button>
        )}
      </div>

      <div className="sort-bar-divider" />

      {/* Main Controls Grid */}
      <div className="sort-bar-controls-grid">
        {/* Sort Section */}
        <div className="sort-section">
          <label className="sort-section-label">
            <ArrowUpDown size={14} /> Ordenar Presentación:
          </label>
          <div className="sort-pills-row">
            {sortButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                className={`sort-pill-btn ${sortBy === btn.id ? 'is-active' : ''}`}
                onClick={() => onSortChange(btn.id)}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Ranges Section */}
        <div className="price-section">
          <label className="sort-section-label">
            <span>Rango de Precio (FCFA):</span>
          </label>
          <div className="price-chips-row">
            {priceChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className={`price-chip-btn ${priceRange === chip.id ? 'is-active' : ''}`}
                onClick={() => onPriceRangeChange(chip.id)}
              >
                {chip.label}
              </button>
            ))}

            {/* Quick Stock Filter Toggle */}
            <button
              type="button"
              className={`stock-toggle-btn ${onlyInStock ? 'is-active' : ''}`}
              onClick={() => onOnlyInStockChange(!onlyInStock)}
              title="Mostrar únicamente productos listos para envío inmediato"
            >
              <CheckCircle2 size={14} color={onlyInStock ? '#10B981' : '#94A3B8'} />
              <span>Solo En Stock</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
