import React from 'react';
import { Sparkles, Shirt, Palette, Gem, Droplet, Sun, Baby, Stethoscope } from 'lucide-react';
import type { ProductCategory } from '../../types';
import './catalog.css';

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'TODOS', label: 'Todos', icon: <Sparkles size={18} /> },
    { id: 'VASELINAS', label: 'Vaselinas', icon: <Droplet size={18} /> },
    { id: 'COSMETICA', label: 'Cosmética & Cremas', icon: <Palette size={18} /> },
    { id: 'JABONES', label: 'Jabones', icon: <Sun size={18} /> },
    { id: 'NIÑOS', label: 'Niños & Bebés', icon: <Baby size={18} /> },
    { id: 'POMADAS', label: 'Pomadas & Salud', icon: <Stethoscope size={18} /> },
    { id: 'MODA', label: 'Moda Zara & Nike', icon: <Shirt size={18} /> },
    { id: 'ACCESORIOS', label: 'Accesorios & Bolsos', icon: <Gem size={18} /> },
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
