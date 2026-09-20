import React from 'react';

interface BadgeProps {
  category?: 'MODA' | 'COSMETICA' | 'ACCESORIOS';
  stock?: boolean;
  children?: React.ReactNode;
}

export function Badge({ category, stock, children }: BadgeProps) {
  if (category) {
    const categoryClass = `badge-${category.toLowerCase()}`;
    return (
      <span className={`badge ${categoryClass}`}>
        {category}
      </span>
    );
  }

  if (stock !== undefined) {
    const stockClass = stock ? 'badge-stock-in' : 'badge-stock-out';
    const text = stock ? 'En Stock' : 'Pausado';
    return (
      <span className={`badge ${stockClass}`}>
        {text}
      </span>
    );
  }

  return <span className="badge">{children}</span>;
}
