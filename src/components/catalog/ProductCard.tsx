import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../contexts/CartContext';
import { WhatsAppButton } from './WhatsAppButton';
import './catalog.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on WhatsApp button or Cart button
    if ((e.target as HTMLElement).closest('.wa-button-container') || (e.target as HTMLElement).closest('.btn-add-cart-card')) {
      return;
    }
    navigate(`/producto/${product.slug}`);
  };

  const primaryImage = product.images?.[0] || '/icons/ebna-logo.png';
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div 
      className="product-card" 
      onClick={handleCardClick}
      style={{ animationDelay: `${(index % 10) * 0.04}s` }}
    >
      <div className="product-card-glow-border"></div>

      <div className="product-image-container">
        {!imageLoaded && <div className="product-image-skeleton shimmer"></div>}
        <img 
          src={primaryImage} 
          alt={product.name} 
          className={`product-image ${imageLoaded ? 'is-loaded' : 'is-loading'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (img.src !== secondaryImage && secondaryImage) {
              img.src = secondaryImage;
            } else {
              img.src = '/icons/ebna-logo.png';
            }
            setImageLoaded(true);
          }}
        />
        
        <div className="product-badge-group">
          <span className="product-category-badge">{product.category}</span>
          {product.in_stock ? (
            <span className="product-stock-badge in-stock">EN STOCK</span>
          ) : (
            <span className="product-stock-badge out-of-stock">AGOTADO</span>
          )}
        </div>

        <div className="specular-sweep"></div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        
        <p className="product-description-snippet">{product.description}</p>
        
        <div className="product-price-row">
          <span className="product-price-label">Precio</span>
          <span className="product-price-value">{formatPrice(product.price)}</span>
        </div>
        
        <div className="product-actions" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
          <WhatsAppButton product={product} fullWidth size="sm" />
          <button
            type="button"
            className="btn-add-cart-card"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            title="Agregar al Carrito"
            style={{
              padding: '8px 12px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #E02868 0%, #D81B60 50%, #B8114E 100%)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(216, 27, 96, 0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
