import React from 'react';
import { Sparkles, Footprints, ShoppingBag, Flame, Sparkle, Heart, Droplets, User } from 'lucide-react';
import type { FilterCategoryType } from '../../types';
import './catalog.css';

interface CategoryFilterProps {
  activeCategory: FilterCategoryType;
  onCategoryChange: (category: FilterCategoryType) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  const categories: { id: FilterCategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'TODOS', label: 'Todos los Productos', icon: <Sparkles size={18} /> },
    { id: 'MODA_MUJER', label: 'Moda Mujer', icon: <Heart size={18} /> },
    { id: 'MODA_HOMBRE', label: 'Moda Hombre', icon: <User size={18} /> },
    { id: 'CALZADO', label: 'Calzado & Sneakers', icon: <Footprints size={18} /> },
    { id: 'BOLSOS_ACCESORIOS', label: 'Bolsos & Accesorios', icon: <ShoppingBag size={18} /> },
    { id: 'PERFUMERIA', label: 'Perfumería de Lujo', icon: <Flame size={18} /> },
    { id: 'COSMETICA_FACIAL', label: 'Cosmética Facial', icon: <Sparkle size={18} /> },
    { id: 'HIGIENE_CORPORAL', label: 'Higiene Corporal & Jabones', icon: <Droplets size={18} /> },
  ];

  return (
    <div className="category-filter-container">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-pill ${activeCategory === cat.id ? 'active' : 'glass-panel'}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.icon}
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
};
