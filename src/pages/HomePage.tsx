import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Clock } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/catalog/ProductCard';
import { WhatsAppButton } from '../components/catalog/WhatsAppButton';
import { Loader } from '../components/ui/Loader';
import { formatPrice } from '../lib/utils';

export function HomePage() {
  const { products, loading, error } = useProducts();
  
  // Dynamic 30-minute rotator index based on current time
  const [halfHourChunk, setHalfHourChunk] = useState(() => Math.floor(Date.now() / (30 * 60 * 1000)));

  useEffect(() => {
    const timer = setInterval(() => {
      setHalfHourChunk(Math.floor(Date.now() / (30 * 60 * 1000)));
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.slice(0, 8);
  const heroIndex = products.length > 0 ? (halfHourChunk % Math.min(15, products.length)) : 0;
  const tiltProduct = products[heroIndex] || products[0];

  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    
    setStyle({
      '--mouse-x': `${x}px`,
      '--mouse-y': `${y}px`,
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    } as React.CSSProperties);
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease'
    });
  };

  if (loading) return <Loader message="Cargando catálogo de lujo..." fullScreen />;
  if (error) return <div className="error-message">{error.message || 'Error al cargar productos'}</div>;

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="text-label-luxury"><Sparkles size={16} /> NUEVA COLECCIÓN EXCLUSIVA</span>
          <h1 className="text-hero-display">
            Elegancia & Estilo,<br/>
            <i>Hecho para Ti</i>
          </h1>
          <p className="hero-lead">
            Descubre la esencia del lujo con EBNA. Tu boutique exclusiva de alta perfumería, cosmética de tratamiento y moda de marcas internacionales.
          </p>
          <div className="hero-cta-group" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/catalogo" className="btn-primary cta-button">
              Explorar Catálogo <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        
        {tiltProduct && (
          <div className="hero-visual">
            <div 
              className="tilt-perspective-wrapper"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                ref={cardRef}
                className="glass-tilt-card"
                style={style}
              >
                <div className="glare-effect"></div>
                <img src={tiltProduct.images?.[0] || '/icons/ebna-logo.png'} alt={tiltProduct.name} className="tilt-image" />
                <div className="tilt-info">
                  <span className="tilt-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={12} /> {tiltProduct.category} • DESTACADO 30 MIN
                  </span>
                  <h3>{tiltProduct.name}</h3>
                  <p className="price">{formatPrice(tiltProduct.price)}</p>
                  <WhatsAppButton product={tiltProduct} size="sm" />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Feature Value Props Banner */}
      <section className="features-banner glass-panel" style={{ margin: '3rem 0', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(224, 90, 136, 0.12)', padding: '12px', borderRadius: '12px', color: '#E05A88' }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#23191E' }}>Garantía 100% Original</h4>
            <p style={{ fontSize: '0.82rem', color: '#6E5B65' }}>Productos de lujo autenticados</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(37, 211, 102, 0.12)', padding: '12px', borderRadius: '12px', color: '#25D366' }}>
            <Truck size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#23191E' }}>Atención Personalizada</h4>
            <p style={{ fontSize: '0.82rem', color: '#6E5B65' }}>Asesoramiento directo en WhatsApp</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(216, 180, 226, 0.15)', padding: '12px', borderRadius: '12px', color: '#8E5A9F' }}>
            <RefreshCw size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#23191E' }}>Stock Actualizado</h4>
            <p style={{ fontSize: '0.82rem', color: '#6E5B65' }}>Novedades semanales directas</p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>Colección Destacada</h2>
            <p style={{ fontSize: '0.9rem', color: '#6E5B65' }}>Las mejores marcas de perfumería, cosmética y moda</p>
          </div>
          <Link to="/catalogo" className="link-view-all" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E05A88', fontWeight: 600, textDecoration: 'none' }}>
            Ver Catálogo <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
