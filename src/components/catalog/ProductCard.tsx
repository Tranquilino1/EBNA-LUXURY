import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, Flame, Tag } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../contexts/CartContext';
import { WhatsAppButton } from './WhatsAppButton';
import { getProductOrdersCount } from '../../lib/popularityTracker';
import './catalog.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Inline fallback SVG placeholder when image fails to load
const FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="%23FDF2F4"/><circle cx="200" cy="180" r="60" fill="%23D81B60" opacity="0.15"/><path d="M170 170L230 230M230 170L170 230" stroke="%23D81B60" stroke-width="6" stroke-linecap="round"/><text x="50%" y="310" text-anchor="middle" fill="%23D81B60" font-family="sans-serif" font-size="20" font-weight="bold">EBNA LUXURY</text></svg>`;

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(() => {
    return product.images?.primary || (Array.isArray(product.images) ? product.images[0] : '/icons/ebna-logo.png');
  });

  const ordersCount = getProductOrdersCount(product);
  const priceVal = product.priceFCFA || product.price || 0;
  const originalPriceVal = product.originalPriceFCFA;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on WhatsApp button or Cart button
    if ((e.target as HTMLElement).closest('.wa-button-container') || (e.target as HTMLElement).closest('.btn-add-cart-card')) {
      return;
    }
    navigate(`/producto/${product.slug}`);
  };

  // Format category badge for display
  const categoryLabel = (product.category || 'MODA').replace(/_/g, ' ');

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
          src={imgSrc} 
          alt={product.name} 
          className={`product-image ${imageLoaded ? 'is-loaded' : 'is-loading'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImgSrc(FALLBACK_SVG);
            setImageLoaded(true);
          }}
        />
        
        <div className="product-badge-group">
          <span className="product-category-badge">{categoryLabel}</span>
          {product.sku && (
            <span style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Tag size={9} /> {product.sku}
            </span>
          )}
          {ordersCount >= 25 && (
            <span style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)' }}>
              <Flame size={10} /> {ordersCount}+ Pedidos
            </span>
          )}
          {product.inStock || product.in_stock ? (
            <span className="product-stock-badge in-stock">EN STOCK</span>
          ) : (
            <span className="product-stock-badge out-of-stock">AGOTADO</span>
          )}
        </div>

        <div className="specular-sweep"></div>
      </div>
      
      <div className="product-info">
        {product.brand && (
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#D81B60', fontWeight: 700, marginBottom: '2px', display: 'block' }}>
            {product.brand}
          </span>
        )}
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        
        <p className="product-description-snippet">{product.description}</p>
        
        <div className="product-price-row">
          <span className="product-price-label">Precio</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span className="product-price-value">{formatPrice(priceVal)}</span>
            {originalPriceVal && originalPriceVal > priceVal && (
              <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: '#999' }}>
                {formatPrice(originalPriceVal)}
              </span>
            )}
          </div>
        </div>
        
        <div className="product-actions" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', alignItems: 'center' }}>
          <WhatsAppButton product={product} fullWidth size="sm" />
          <button
            type="button"
            className="btn-add-cart-card"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            title="Agregar al Carrito"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
