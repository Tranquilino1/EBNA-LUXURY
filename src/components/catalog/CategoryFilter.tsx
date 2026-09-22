import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, Footprints, ShoppingBag, Flame, Sparkle, Heart, 
  Droplets, User, Baby, ChevronLeft, ChevronRight 
} from 'lucide-react';
import type { FilterCategoryType } from '../../types';
import './catalog.css';

interface CategoryFilterProps {
  activeCategory: FilterCategoryType;
  onCategoryChange: (category: FilterCategoryType) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const categories: { id: FilterCategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'TODOS', label: 'Todas las Categorías', icon: <Sparkles size={18} /> },
    { id: 'MODA_MUJER', label: 'Moda Femenina & Vestidos', icon: <Heart size={18} /> },
    { id: 'MODA_INFANTIL', label: 'Moda Infantil & Bebés', icon: <Baby size={18} /> },
    { id: 'MODA_HOMBRE', label: 'Moda Masculina', icon: <User size={18} /> },
    { id: 'CALZADO', label: 'Calzado & Sneakers', icon: <Footprints size={18} /> },
    { id: 'BOLSOS_ACCESORIOS', label: 'Bolsos & Accesorios', icon: <ShoppingBag size={18} /> },
    { id: 'PERFUMERIA', label: 'Perfumería de Lujo', icon: <Flame size={18} /> },
    { id: 'COSMETICA_FACIAL', label: 'Cosmética Facial', icon: <Sparkle size={18} /> },
    { id: 'HIGIENE_CORPORAL', label: 'Higiene Corporal & Jabones', icon: <Droplets size={18} /> },
  ];

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
      // Convert vertical mouse wheel deltaY to horizontal scroll smoothly
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

  // Mouse drag-to-scroll implementation
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
    <div className="category-filter-wrapper" role="region" aria-label="Filtro por Categorías">
      {/* Left Navigation Scroll Button */}
      {canScrollLeft && (
        <button
          type="button"
          className="category-nav-arrow left"
          onClick={() => handleScrollBy(-320)}
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
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-pill ${activeCategory === cat.id ? 'active' : 'glass-panel'}`}
            onClick={() => {
              if (!hasDragged) {
                onCategoryChange(cat.id);
              }
            }}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Right Fade Mask Indicator */}
      <div className={`category-fade-edge category-fade-right ${canScrollRight ? 'is-visible' : ''}`} />

      {/* Right Navigation Scroll Button */}
      {canScrollRight && (
        <button
          type="button"
          className="category-nav-arrow right"
          onClick={() => handleScrollBy(320)}
          title="Ver más categorías"
          aria-label="Ver más categorías"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};
