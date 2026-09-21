import React from 'react';
import { Sparkles, Shirt, Palette, Gem, Droplet, Sun, Baby, UserCheck, HeartHandshake } from 'lucide-react';
import type { ProductCategory } from '../../types';
import './catalog.css';

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'TODOS', label: 'Todos los Productos', icon: <Sparkles size={18} /> },
    { id: 'MODA', label: 'Moda & Calzado', icon: <Shirt size={18} /> },
    { id: 'COSMETICA', label: 'Cosmética & Cuidado', icon: <Palette size={18} /> },
    { id: 'HIGIENE', label: 'Higiene & Baño', icon: <Droplet size={18} /> },
    { id: 'JABONES', label: 'Jabones Artesanales', icon: <Sun size={18} /> },
    { id: 'ACCESORIOS', label: 'Accesorios & Bonnets', icon: <Gem size={18} /> },
    { id: 'HOMBRES', label: 'Colección Hombres', icon: <UserCheck size={18} /> },
    { id: 'MUJERES', label: 'Colección Mujeres', icon: <HeartHandshake size={18} /> },
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
