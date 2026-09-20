import React from 'react';
import { Sparkles, Shirt, Palette, Gem } from 'lucide-react';
import './catalog.css';

export type ProductCategory = 'TODOS' | 'MODA' | 'COSMETICA' | 'ACCESORIOS';

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'TODOS', label: 'Todos', icon: <Sparkles size={18} /> },
    { id: 'MODA', label: 'Moda', icon: <Shirt size={18} /> },
    { id: 'COSMETICA', label: 'Cosmética', icon: <Palette size={18} /> },
    { id: 'ACCESORIOS', label: 'Accesorios', icon: <Gem size={18} /> },
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
