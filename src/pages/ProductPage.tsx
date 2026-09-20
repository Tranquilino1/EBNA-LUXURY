import { useParams, Link } from 'react-router';
import { ArrowLeft, Phone, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { WhatsAppButton } from '../components/catalog/WhatsAppButton';
import { Loader } from '../components/ui/Loader';
import { formatPrice } from '../lib/utils';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading, error } = useProducts();
  
  const product = products.find(p => p.slug === slug);

  if (loading) return <Loader fullScreen message="Cargando detalles del producto..." />;
  if (error) return <div className="error-message">{error.message || 'Error al cargar el producto'}</div>;
  if (!product) return <div className="not-found" style={{ padding: '4rem', textAlign: 'center' }}>Producto no encontrado</div>;

  const secondaryPhone = '+240 222 439 904';

  return (
    <div className="product-page luxury-container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <nav className="breadcrumb" style={{ display: 'flex', gap: '8px', fontSize: '0.88rem', color: '#6E5B65', marginBottom: '1rem' }}>
        <Link to="/" style={{ color: '#E05A88', textDecoration: 'none' }}>Inicio</Link> &gt; 
        <Link to="/catalogo" style={{ color: '#E05A88', textDecoration: 'none' }}>Catálogo</Link> &gt; 
        <span style={{ color: '#23191E', fontWeight: 600 }}>{product.name}</span>
      </nav>

      <Link to="/catalogo" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#E05A88', fontWeight: 600, textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Volver al catálogo
      </Link>

      <div className="product-detail-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        <div className="product-image-section glass-panel" style={{ padding: '1.25rem', borderRadius: '24px', background: 'radial-gradient(circle at center, #FFFFFF 40%, #F8F2F5 100%)' }}>
          <img 
            src={product.images?.[0] || '/icons/ebna-logo.png'} 
            alt={product.name} 
            className="main-image" 
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
          />
        </div>
        
        <div className="product-info-section glass-panel" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={`badge badge-${product.category.toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
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
            <span style={{ fontSize: '2rem', fontWeight: 700, color: '#E05A88' }}>
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="product-description" style={{ fontSize: '1rem', lineHeight: 1.6, color: '#555', background: 'rgba(255,255,255,0.6)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)' }}>
            <p>{product.description}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#6E5B65' }}>
              <Truck size={18} style={{ color: '#25D366' }} />
              <span>Entrega inmediata en Malabo y envíos a todo Guinea Ecuatorial</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#6E5B65' }}>
              <ShieldCheck size={18} style={{ color: '#E05A88' }} />
              <span>Atención directa por WhatsApp con confirmación de stock</span>
            </div>
          </div>

          <div className="product-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '1rem' }}>
            <WhatsAppButton product={product} fullWidth size="lg" />
            
            <a href={`tel:${secondaryPhone.replace(/\s+/g, '')}`} className="btn-secondary full-width" style={{ textDecoration: 'none', textAlign: 'center' }}>
              <Phone size={18} /> Llamar Directamente ({secondaryPhone})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
