import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FilterCategoryType } from '../../types';
import './catalog.css';

interface CategoryFilterProps {
  activeCategory: FilterCategoryType;
  onCategoryChange: (category: FilterCategoryType) => void;
}

interface CategorySheinItem {
  id: FilterCategoryType;
  label: string;
  image: string;
}

const CATEGORIES: CategorySheinItem[] = [
  { 
    id: 'TODOS', 
    label: 'Todos', 
    image: '/icons/icon-192x192.png'
  },
  { 
    id: 'MODA_MUJER', 
    label: 'Vestidos & Moda', 
    image: '/products/sindy_luxury/conjunto_capa_rojo_carmesi.jpg'
  },
  { 
    id: 'CALZADO', 
    label: 'Calzado Joya', 
    image: '/products/sindy_luxury/bailarinas_mary_jane_rosa.jpg'
  },
  { 
    id: 'BOLSOS_ACCESORIOS', 
    label: 'Bolsos & Lujo', 
    image: '/products/sindy_luxury/bolso_clutch_matelasse.jpg'
  },
  { 
    id: 'PERFUMERIA', 
    label: 'Perfumería', 
    image: '/products/cosmetics_baby/perfume_safir_mujer.jpg'
  },
  { 
    id: 'COSMETICA_FACIAL', 
    label: 'Cosmética', 
    image: '/products/sindy_luxury/crema_terminator_eclaircissante.jpg'
  },
  { 
    id: 'HIGIENE_CORPORAL', 
    label: 'Jabones & Spa', 
    image: '/products/sindy_luxury/jabon_curcuma_felicite.jpg'
  },
  { 
    id: 'MODA_INFANTIL', 
    label: 'Bebé & Niños', 
    image: '/products/cosmetics_baby/chicco_crema_corporal.jpg'
  },
  { 
    id: 'MODA_HOMBRE', 
    label: 'Hombre', 
    image: '/products/cosmetics_baby/perfume_sauvage_hombre.jpg'
  }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);

    const el = containerRef.current;
    if (el) {
      const handleWheel = (e: WheelEvent) => {
        if (el.scrollWidth > el.clientWidth) {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            el.scrollLeft += e.deltaY * 0.9;
            updateScrollState();
          }
        }
      };

      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        window.removeEventListener('resize', handleResize);
        el.removeEventListener('wheel', handleWheel);
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollState]);

  const handleScrollBy = (distance: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: distance, behavior: 'smooth' });
      setTimeout(updateScrollState, 350);
    }
  };

  // Drag-to-scroll implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !containerRef.current) return;
    e.preventDefault();
    const currentX = e.pageX - containerRef.current.offsetLeft;
    const walk = (currentX - startX) * 1.5;
    if (Math.abs(walk) > 6) {
      setHasDragged(true);
    }
    containerRef.current.scrollLeft = startScrollLeft - walk;
    updateScrollState();
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setTimeout(() => setHasDragged(false), 60);
  };

  return (
    <div className="category-filter-wrapper" role="region" aria-label="Filtro por Categorías SHEIN Style">
      {/* Left Navigation Scroll Button */}
      {canScrollLeft && (
        <button
          type="button"
          className="category-nav-arrow left"
          onClick={() => handleScrollBy(-280)}
          title="Ver categorías anteriores"
          aria-label="Ver categorías anteriores"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Left Fade Mask Indicator */}
      <div className={`category-fade-edge category-fade-left ${canScrollLeft ? 'is-visible' : ''}`} />

      {/* Main Draggable Horizontal Scroll Container */}
      <div 
        ref={containerRef}
        className={`category-filter-container ${isMouseDown ? 'is-dragging' : ''}`}
        onScroll={updateScrollState}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              className={`category-shein-item ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                if (!hasDragged) {
                  onCategoryChange(cat.id);
                }
              }}
              title={`Filtrar por ${cat.label}`}
              aria-pressed={isActive}
            >
              <div className="category-shein-circle-wrap">
                <img 
                  src={cat.image} 
                  alt={cat.label} 
                  className="category-shein-img"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/icons/icon-192x192.png';
                  }}
                />
              </div>
              <span className="category-shein-label">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Fade Mask Indicator */}
      <div className={`category-fade-edge category-fade-right ${canScrollRight ? 'is-visible' : ''}`} />

      {/* Right Navigation Scroll Button */}
      {canScrollRight && (
        <button
          type="button"
          className="category-nav-arrow right"
          onClick={() => handleScrollBy(280)}
          title="Ver más categorías"
          aria-label="Ver más categorías"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};
