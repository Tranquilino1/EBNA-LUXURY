import { useNavigate } from 'react-router';
import type { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { WhatsAppButton } from './WhatsAppButton';
import './catalog.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on WhatsApp button
    if ((e.target as HTMLElement).closest('.wa-button-container')) {
      return;
    }
    navigate(`/producto/${product.slug}`);
  };

  return (
    <div 
      className="product-card" 
      onClick={handleCardClick}
      style={{ animationDelay: `${(index % 12) * 0.05}s` }}
    >
      <div className="product-image-container">
        <img 
          src={product.images?.[0] || '/icons/ebna-logo.png'} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />
        <span className="product-category-badge">{product.category}</span>
        {product.in_stock ? (
          <span className="product-stock-badge">DISPONIBLE</span>
        ) : (
          <span className="product-stock-badge" style={{ background: 'rgba(239, 68, 68, 0.9)' }}>AGOTADO</span>
        )}
        <div className="specular-sweep"></div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        <p className="product-price">
          {formatPrice(product.price)}
        </p>
        
        <div className="product-actions">
          <WhatsAppButton product={product} fullWidth size="sm" />
        </div>
      </div>
    </div>
  );
};
