import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, Flame, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../contexts/CartContext';
import { useAdminCrud } from '../../contexts/AdminCrudContext';
import { useCustomization } from '../../contexts/CustomizationContext';
import { ChristmasHat } from '../effects/ChristmasHat';
import { WhatsAppButton } from './WhatsAppButton';
import { getProductOrdersCount } from '../../lib/popularityTracker';
import './catalog.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Inline luxury SVG placeholder when image is loading or unavailable
const FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><defs><linearGradient id="bg" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse"><stop stop-color="%23FFF7F9"/><stop offset="1" stop-color="%23FCE4EC"/></linearGradient><linearGradient id="gold" x1="160" y1="140" x2="240" y2="240" gradientUnits="userSpaceOnUse"><stop stop-color="%23D81B60"/><stop offset="1" stop-color="%23C2185B"/></linearGradient></defs><rect width="400" height="400" fill="url(%23bg)"/><circle cx="200" cy="180" r="64" fill="%23D81B60" fill-opacity="0.08"/><path d="M165 205L175 160L200 185L225 160L235 205H165Z" fill="url(%23gold)"/><circle cx="175" cy="155" r="4" fill="%23D81B60"/><circle cx="200" cy="180" r="4" fill="%23D81B60"/><circle cx="225" cy="155" r="4" fill="%23D81B60"/><text x="50%" y="268" text-anchor="middle" fill="%231E293B" font-family="serif" font-size="15" letter-spacing="3" font-weight="600">SINDY LUXURY</text><text x="50%" y="292" text-anchor="middle" fill="%23D81B60" font-family="sans-serif" font-size="11" letter-spacing="2" font-weight="700">HAUTE COUTURE</text></svg>`;

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { 
    isAdmin, 
    openEditModal, 
    openDeleteModal, 
    quickToggleStock,
    selectedIds,
    toggleSelect
  } = useAdminCrud();
  const { settings, isChristmasActive } = useCustomization();
  const isSelected = selectedIds.has(product.id);

  const [imageLoaded, setImageLoaded] = useState(false);
  const resolveInitialImg = () => {
    return product.images?.primary || (Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (typeof product.images === 'string' ? product.images : '/icons/ebna-logo.png'));
  };
  const [imgSrc, setImgSrc] = useState<string>(resolveInitialImg);

  useEffect(() => {
    const nextImg = resolveInitialImg();
    setImgSrc(nextImg || '/icons/ebna-logo.png');
    setImageLoaded(false);
  }, [product.images]);

  const ordersCount = getProductOrdersCount(product);
  const priceVal = product.priceFCFA || product.price || 0;
  const originalPriceVal = product.originalPriceFCFA;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on Admin buttons, checkbox, WhatsApp button, or Cart button
    if (
      (e.target as HTMLElement).closest('.admin-checkbox-container') ||
      (e.target as HTMLElement).closest('.admin-card-actions') || 
      (e.target as HTMLElement).closest('.wa-button-container') || 
      (e.target as HTMLElement).closest('.btn-add-cart-card')
    ) {
      return;
    }
    navigate(`/producto/${product.slug}`);
  };

  // Format category badge for display
  const categoryLabel = (product.category || 'MODA').replace(/_/g, ' ');

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && product.images) {
      const targetSrc = product.images.primary || (Array.isArray(product.images) ? product.images[0] : '');
      if (targetSrc) {
        const preload = new Image();
        preload.src = targetSrc;
      }
    }
  };

  return (
    <div 
      className={`product-card ${isSelected ? 'is-admin-selected' : ''}`} 
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      style={{ 
        animationDuration: `${settings.animationSpeed}s`,
        animationDelay: `${(index % 10) * settings.staggerDelay}s`,
        border: isSelected ? '2px solid #D81B60' : undefined,
        boxShadow: isSelected ? '0 0 20px rgba(216, 27, 96, 0.45)' : undefined
      }}
    >
      <div className="product-card-glow-border"></div>

      <div className="product-image-container">
        {!imageLoaded && <div className="product-image-skeleton shimmer"></div>}
        <img 
          src={imgSrc} 
          alt={product.name} 
          className={`product-image ${imageLoaded ? 'is-loaded' : 'is-loading'}`}
          loading={index < 4 ? 'eager' : 'lazy'}
          fetchPriority={index < 4 ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            const gallery = product.images?.gallery;
            if (Array.isArray(gallery) && gallery.length > 1 && imgSrc !== gallery[1] && gallery[1]) {
              setImgSrc(gallery[1]);
            } else if (imgSrc !== FALLBACK_SVG) {
              setImgSrc(FALLBACK_SVG);
            }
            setImageLoaded(true);
          }}
        />
        
        <div className="product-badge-group">
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="product-category-badge">{categoryLabel}</span>
            {ordersCount >= 25 && (
              <span style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)' }}>
                <Flame size={10} /> {ordersCount}+
              </span>
            )}
          </div>
          {product.inStock || product.in_stock ? (
            <span className="product-stock-badge in-stock">EN STOCK</span>
          ) : (
            <span className="product-stock-badge out-of-stock">AGOTADO</span>
          )}
        </div>

        {/* Admin Checkbox Casilla para selección masiva */}
        {isAdmin && (
          <div
            className="admin-checkbox-container"
            onClick={(e) => {
              e.stopPropagation();
              toggleSelect(product.id);
            }}
            title={isSelected ? 'Desmarcar producto' : 'Marcar casilla para eliminación o CRUD masivo'}
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              zIndex: 20,
              background: isSelected ? '#D81B60' : 'rgba(20, 10, 20, 0.85)',
              border: isSelected ? '2px solid #FFFFFF' : '1.5px solid rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelect(product.id)}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#D81B60',
                cursor: 'pointer'
              }}
            />
          </div>
        )}

        {/* 3D Animated Christmas Hat on Product */}
        {isChristmasActive && settings.christmasHats && (
          <ChristmasHat 
            size={32} 
            style={{ 
              position: 'absolute', 
              top: '-10px', 
              left: isAdmin ? '38px' : '8px', 
              zIndex: 18,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' 
            }} 
          />
        )}

        {/* Admin Inline Actions Overlay */}
        {isAdmin && (
          <div 
            className="admin-card-actions"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 15,
              display: 'flex',
              gap: '4px',
              background: 'rgba(20, 10, 20, 0.88)',
              backdropFilter: 'blur(8px)',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid rgba(216, 27, 96, 0.5)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(product);
              }}
              title="Editar Producto (Admin)"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(216, 27, 96, 0.3)',
                color: '#F48FB1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Pencil size={13} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                quickToggleStock(product.id, product.in_stock);
              }}
              title={product.in_stock ? 'Cambiar a Agotado' : 'Cambiar a En Stock'}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                border: 'none',
                background: product.in_stock ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                color: product.in_stock ? '#4ADE80' : '#F87171',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {product.in_stock ? <Eye size={13} /> : <EyeOff size={13} />}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(product);
              }}
              title="Eliminar Producto (Admin)"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(239, 68, 68, 0.3)',
                color: '#F87171',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}

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
        
        {/* Categorized Attributes: Tallas for Clothing/Shoes vs Formato for Cosmetics */}
        {(() => {
          const isCosmetic = ['COSMETICA_FACIAL', 'HIGIENE_CORPORAL', 'PERFUMERIA'].includes(product.category || '');
          const isFootwear = product.category === 'CALZADO';
          const isAccessory = product.category === 'BOLSOS_ACCESORIOS';

          if (isCosmetic) {
            const formatStr = product.details?.volume || (product.sizes && product.sizes[0] && !['S', 'M', 'L', 'XL', 'XS'].includes(product.sizes[0]) ? product.sizes[0] : null) || (product.details?.size && product.details.size[0]);
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0 6px 0' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#D81B60', textTransform: 'uppercase' }}>Formato:</span>
                <span style={{ background: 'rgba(216, 27, 96, 0.08)', border: '1px solid rgba(216, 27, 96, 0.25)', color: '#D81B60', fontSize: '0.68rem', fontWeight: 800, padding: '1px 8px', borderRadius: '6px' }}>
                  {formatStr || 'Original'}
                </span>
              </div>
            );
          }

          if (isAccessory) {
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '4px 0 6px 0' }}>
                <span style={{ background: 'rgba(197, 168, 128, 0.15)', border: '1px solid rgba(197, 168, 128, 0.4)', color: '#8B6F47', fontSize: '0.66rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                  Talla Única
                </span>
                {product.colors && product.colors.length > 0 && (
                  <span style={{ fontSize: '0.66rem', color: '#9E9298', marginLeft: 'auto', fontWeight: 600 }}>
                    {product.colors.length} {product.colors.length === 1 ? 'color' : 'colores'}
                  </span>
                )}
              </div>
            );
          }

          // Clothing and Footwear
          const rawSizes = (product.sizes || product.details?.size || []).filter(s => !['200g', '100ml', '150g', 'Barra'].includes(s));
          if (rawSizes.length === 0) return null;

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', margin: '4px 0 6px 0' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#888', textTransform: 'uppercase' }}>
                {isFootwear ? 'Tallas EU:' : 'Tallas:'}
              </span>
              {rawSizes.slice(0, 4).map((sz) => (
                <span key={sz} style={{ background: 'rgba(197, 168, 128, 0.15)', border: '1px solid rgba(197, 168, 128, 0.4)', color: '#8B6F47', fontSize: '0.66rem', fontWeight: 800, padding: '1px 6px', borderRadius: '4px' }}>
                  {sz}
                </span>
              ))}
              {product.colors && product.colors.length > 0 && (
                <span style={{ fontSize: '0.66rem', color: '#9E9298', marginLeft: 'auto', fontWeight: 600 }}>
                  {product.colors.length} {product.colors.length === 1 ? 'color' : 'colores'}
                </span>
              )}
            </div>
          );
        })()}

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
