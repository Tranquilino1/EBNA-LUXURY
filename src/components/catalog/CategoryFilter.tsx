import React from 'react';
import { Sparkles, Shirt, Palette, Gem, Droplet, Sun, Baby, Stethoscope, Footprints, Crown, Flame } from 'lucide-react';
import type { ProductCategory } from '../../types';
import './catalog.css';

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'TODOS', label: 'Todos', icon: <Sparkles size={18} /> },
    { id: 'PERFUMES', label: 'Perfumes & Fragancias', icon: <Flame size={18} /> },
    { id: 'VESTIDOS', label: 'Vestidos & Robes', icon: <Crown size={18} /> },
    { id: 'CALZADO', label: 'Calzado & Sneakers', icon: <Footprints size={18} /> },
    { id: 'MODA', label: 'Moda & Hoodies', icon: <Shirt size={18} /> },
    { id: 'COSMETICA', label: 'Cosmética & Cremas', icon: <Palette size={18} /> },
    { id: 'JABONES', label: 'Jabones Artesanales', icon: <Sun size={18} /> },
    { id: 'VASELINAS', label: 'Vaselinas & Lip Care', icon: <Droplet size={18} /> },
    { id: 'POMADAS', label: 'Pomadas & Scrubs', icon: <Stethoscope size={18} /> },
    { id: 'ACCESORIOS', label: 'Accesorios & Bonnets', icon: <Gem size={18} /> },
    { id: 'NIÑOS', label: 'Niños & Bebés', icon: <Baby size={18} /> },
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
