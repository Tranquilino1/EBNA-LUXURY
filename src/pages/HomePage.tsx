import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Clock } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/catalog/ProductCard';
import { WhatsAppButton } from '../components/catalog/WhatsAppButton';
import { Loader } from '../components/ui/Loader';
import { formatPrice } from '../lib/utils';
import { getActiveHeroPromo, PROMO_IMAGES_PUB, type HeroPromoConfig } from '../lib/promoManager';

export function HomePage() {
  const { products, loading, error } = useProducts();
  const [activePromo, setActivePromo] = useState<HeroPromoConfig>(getActiveHeroPromo());
  
  // Dynamic 30-minute rotator index based on current time
  const [halfHourChunk, setHalfHourChunk] = useState(() => Math.floor(Date.now() / (30 * 60 * 1000)));

  useEffect(() => {
    const handlePromoUpdate = () => {
      setActivePromo(getActiveHeroPromo());
    };
    window.addEventListener('ebna_promo_updated', handlePromoUpdate);

    const timer = setInterval(() => {
      setHalfHourChunk(Math.floor(Date.now() / (30 * 60 * 1000)));
    }, 60000); // Check every minute

    return () => {
      window.removeEventListener('ebna_promo_updated', handlePromoUpdate);
      clearInterval(timer);
    };
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
        
        {/* Dual Hero Showcase: Left 30-Min Product Card & Right Animated Promo Billboard */}
        <div className="hero-dual-showcase" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px', margin: '2rem auto 0 auto', alignItems: 'stretch' }}>
          {/* LEFT: 30-Minute Rotating Featured Product Card */}
          {tiltProduct && (
            <div 
              className="tilt-perspective-wrapper"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <div 
                ref={cardRef}
                className="glass-tilt-card"
                style={{ ...style, width: '100%', maxWidth: '440px', minHeight: '380px' }}
              >
                <div className="glare-effect"></div>
                
                {/* Header Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', width: '100%' }}>
                  <span className="tilt-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(216,27,96,0.15)', color: '#D81B60', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                    <Clock size={14} className="animate-spin" style={{ animationDuration: '6s' }} /> ROTATIVO 30 MIN
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-dark)', background: 'rgba(217, 119, 6, 0.12)', padding: '4px 10px', borderRadius: '20px' }}>
                    ⚡ {tiltProduct.category}
                  </span>
                </div>

                <img 
                  src={tiltProduct.images?.[0] || '/icons/ebna-logo.png'} 
                  alt={tiltProduct.name} 
                  className="tilt-image" 
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--color-glass-border)' }}
                />

                <div className="tilt-info" style={{ marginTop: '0.8rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#1E293B' }}>{tiltProduct.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                    <p className="price" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#D81B60', margin: 0 }}>
                      {formatPrice(tiltProduct.price)}
                    </p>
                    <WhatsAppButton product={tiltProduct} size="sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT: Animated Hero Promo Billboard (Spotlight Advertising) */}
          <div className="hero-promo-spotlight-card" style={{ width: '100%', maxWidth: '440px', minHeight: '380px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Promo Header Badge Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
              <span style={{ background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: 'white', padding: '5px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(216,27,96,0.3)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={14} /> {activePromo.badge}
              </span>
              {activePromo.discountBadge && (
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #F59E0B)', color: '#78350F', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 900, boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)' }}>
                  {activePromo.discountBadge}
                </span>
              )}
            </div>

            {/* Promo Showcase Image with Glass Overlay */}
            <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '18px', overflow: 'hidden', margin: '0.6rem 0', border: '1px solid rgba(216, 27, 96, 0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
              <img
                src={activePromo.imageUrl || PROMO_IMAGES_PUB[halfHourChunk % PROMO_IMAGES_PUB.length].url}
                alt={activePromo.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.45) 100%)' }}></div>
              <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '0.72rem', fontWeight: 700, backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '12px' }}>
                  🖼️ Anuncio Publicitario VIP
                </span>
                <span style={{ color: '#FFD700', fontSize: '0.72rem', fontWeight: 800 }}>
                  SYNDY LUXURY
                </span>
              </div>
            </div>

            {/* Video-Like Moving Animated Typography Text */}
            <div style={{ margin: '0.2rem 0' }}>
              <h3 className="text-promo-video-animated" style={{ fontSize: '1.25rem', lineHeight: 1.35, margin: '0 0 0.4rem 0', textTransform: 'uppercase' }}>
                {activePromo.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                {activePromo.description}
              </p>
            </div>

            {/* Interactive Call to Action */}
            <Link 
              to={activePromo.buttonLink || "/catalogo"} 
              className="btn-primary" 
              style={{
                fontSize: '0.9rem',
                padding: '12px 24px',
                width: '100%',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #D81B60, #C2185B)',
                boxShadow: '0 6px 20px rgba(216, 27, 96, 0.35)',
                fontWeight: 700,
                marginTop: '0.6rem'
              }}
            >
              <span>{activePromo.buttonText || "Aprovechar Promoción"}</span> <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Props Banner */}
      <section className="features-banner glass-panel" style={{ margin: '3rem 0', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(224, 90, 136, 0.12)', padding: '12px', borderRadius: '12px', color: '#D81B60' }}>
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
          <Link to="/catalogo" className="link-view-all" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D81B60', fontWeight: 600, textDecoration: 'none' }}>
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
