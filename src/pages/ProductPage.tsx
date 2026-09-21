import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Phone, ShieldCheck, Truck, Sparkles, Check, PackageCheck, PackageX, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { SEOHead } from '../components/seo/SEOHead';
import { buildWhatsAppUrl } from '../lib/whatsapp';
import { Loader } from '../components/ui/Loader';
import { formatPrice } from '../lib/utils';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.slug === slug);

  const availableSizes = product?.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
  const availableColors = product?.colors && product.colors.length > 0 ? product.colors : ['Blanco', 'Negro', 'Rosa', 'Dorado'];

  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(availableColors[0] || 'Blanco');
  const [quantity, setQuantity] = useState<number>(1);

  if (loading) return <Loader fullScreen message="Cargando detalles del producto..." />;
  if (error) return <div className="error-message">{error.message || 'Error al cargar el producto'}</div>;
  if (!product) return <div className="not-found" style={{ padding: '4rem', textAlign: 'center' }}>Producto no encontrado</div>;

  const secondaryPhone = '+240 555 439 904';
  const primaryWaUrl = buildWhatsAppUrl(product, 'primary', selectedSize, selectedColor);
  const secondaryWaUrl = buildWhatsAppUrl(product, 'secondary', selectedSize, selectedColor);

  return (
    <div className="product-page luxury-container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <SEOHead 
        title={`${product.name} — EBNA Luxury`} 
        description={product.description} 
        product={product} 
        ogImage={product.images?.[0]} 
        type="product"
      />
      <nav className="breadcrumb" style={{ display: 'flex', gap: '8px', fontSize: '0.88rem', color: '#6E5B65', marginBottom: '1rem' }}>
        <Link to="/" style={{ color: '#D81B60', textDecoration: 'none' }}>Inicio</Link> &gt; 
        <Link to="/catalogo" style={{ color: '#D81B60', textDecoration: 'none' }}>Catálogo</Link> &gt; 
        <span style={{ color: '#23191E', fontWeight: 600 }}>{product.name}</span>
      </nav>

      <Link to="/catalogo" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D81B60', fontWeight: 600, textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Volver al catálogo
      </Link>

      <div className="product-detail-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        <div className="product-image-section glass-panel" style={{ padding: '1.25rem', borderRadius: '24px', background: 'radial-gradient(circle at center, #FFFFFF 40%, #F8F2F5 100%)', position: 'relative' }}>
          <img 
            src={product.images?.[0] || '/icons/ebna-logo.png'} 
            alt={product.name} 
            className="main-image" 
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
          />

          <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '8px' }}>
            {product.in_stock ? (
              <span style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '6px 14px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
                <PackageCheck size={14} /> DISPONIBLE / EN STOCK
              </span>
            ) : (
              <span style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '6px 14px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}>
                <PackageX size={14} /> AGOTADO
              </span>
            )}
          </div>
        </div>
        
        <div className="product-info-section glass-panel" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={`badge badge-${product.category.toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '6px 14px', background: 'rgba(224,90,136,0.12)', color: '#D81B60', borderRadius: '20px', fontWeight: 700 }}>
              {product.category}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#25D366', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> 100% Auténtico
            </span>
          </div>

          <h1 className="product-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', lineHeight: 1.25, color: '#23191E' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#D81B60', letterSpacing: '-0.02em' }}>
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="product-description" style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#555', background: 'rgba(255,255,255,0.7)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(224,90,136,0.15)' }}>
            <p>{product.description}</p>
          </div>

          {/* Sizes Selector */}
          <div className="variant-selector-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#23191E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Seleccionar Talla / Tamaño:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {availableSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: selectedSize === size ? '2px solid #D81B60' : '1px solid rgba(0,0,0,0.15)',
                    background: selectedSize === size ? 'rgba(224,90,136,0.12)' : 'white',
                    color: selectedSize === size ? '#D81B60' : '#333',
                    fontWeight: selectedSize === size ? 800 : 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors Selector */}
          <div className="variant-selector-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#23191E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Seleccionar Color / Tono:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {availableColors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: selectedColor === color ? '2px solid #D81B60' : '1px solid rgba(0,0,0,0.15)',
                    background: selectedColor === color ? 'rgba(224,90,136,0.12)' : 'white',
                    color: selectedColor === color ? '#D81B60' : '#333',
                    fontWeight: selectedColor === color ? 800 : 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  {selectedColor === color && <Check size={14} />}
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="variant-selector-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#23191E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Cantidad (Unidades):
            </label>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: '#F5ECF0', borderRadius: '14px', padding: '4px', width: 'fit-content' }}>
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: 'white', color: '#23191E', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>
              <span style={{ padding: '0 18px', fontWeight: 800, fontSize: '1.05rem', color: '#23191E' }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: 'white', color: '#23191E', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#6E5B65' }}>
              <Truck size={18} style={{ color: '#25D366' }} />
              <span>Entrega inmediata en Malabo y envíos a todo Guinea Ecuatorial</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#6E5B65' }}>
              <ShieldCheck size={18} style={{ color: '#D81B60' }} />
              <span>Atención directa por WhatsApp con confirmación de stock</span>
            </div>
          </div>

          <div className="product-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
              disabled={!product.in_stock}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: '30px',
                border: 'none',
                background: product.in_stock ? 'linear-gradient(135deg, #D81B60 0%, #C43869 100%)' : '#A3999E',
                color: 'white',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: product.in_stock ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: product.in_stock ? '0 8px 20px rgba(224,90,136,0.35)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <ShoppingBag size={20} />
              <span>{product.in_stock ? `Agregar ${quantity} al Carrito` : 'Producto Agotado'}</span>
            </button>

            <a 
              href={primaryWaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="wa-btn wa-btn-lg full-width"
              style={{ textDecoration: 'none' }}
            >
              <span>Pedir por WhatsApp Directo</span>
            </a>

            <a 
              href={secondaryWaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary full-width"
              style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Phone size={18} /> Muni Dinero / Contacto ({secondaryPhone})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

