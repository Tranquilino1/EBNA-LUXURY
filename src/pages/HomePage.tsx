import { useState, useRef, useEffect, useMemo, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { 
  ArrowRight, Sparkles, ShieldCheck, Truck, Clock, Flame, 
  Play, Volume2, MessageCircle, CreditCard, Compass
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/catalog/ProductCard';
import { WhatsAppButton } from '../components/catalog/WhatsAppButton';
import { Loader } from '../components/ui/Loader';
import { formatPrice } from '../lib/utils';
import { getSortedByPopularity } from '../lib/popularityTracker';
import { SEOHead } from '../components/seo/SEOHead';

/**
 * Animated Counter Component for Luxury Metrics
 */
function StatCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 1500;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="stat-number">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export function HomePage() {
  const { products, loading, error } = useProducts();
  const [orderTick, setOrderTick] = useState(0);
  
  // Dynamic 30-minute rotator index based on current time
  const [halfHourChunk, setHalfHourChunk] = useState(() => Math.floor(Date.now() / (30 * 60 * 1000)));

  useEffect(() => {
    const handleOrderEvent = () => setOrderTick(t => t + 1);
    window.addEventListener('ebna_product_ordered', handleOrderEvent);

    const timer = setInterval(() => {
      setHalfHourChunk(Math.floor(Date.now() / (30 * 60 * 1000)));
    }, 60000);

    return () => {
      window.removeEventListener('ebna_product_ordered', handleOrderEvent);
      clearInterval(timer);
    };
  }, []);

  // Priority Algorithm: Sort products by sales & order count for featured collections
  const sortedPopularProducts = useMemo(() => {
    if (orderTick >= 0) {
      return getSortedByPopularity(products);
    }
    return products;
  }, [products, orderTick]);

  const featuredProducts = sortedPopularProducts.slice(0, 8);
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
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
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

  if (loading && products.length === 0) return <Loader message="Cargando catálogo de lujo..." fullScreen />;
  if (error && products.length === 0) return <div className="error-message">{error.message || 'Error al cargar productos'}</div>;

  return (
    <div className="home-page">
      <SEOHead 
        title="Sindy Luxury by EBNA — Alta Costura, Vestidos de Gala y Moda en Guinea Ecuatorial"
        description="Boutique exclusiva de alta costura en Malabo y Bata (Guinea Ecuatorial). Vestidos de gala, conjuntos 2 piezas, calzado de fiesta y cosmética de lujo en FCFA con entrega express vía WhatsApp."
      />

      {/* ==========================================================================
          Agency Editorial Hero Section
          ========================================================================== */}
      <section className="hero-section">
        {/* Left Side: 30-Min Rotating Product Showcase Card */}
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
                <img 
                  src={tiltProduct.images?.primary || (Array.isArray(tiltProduct.images) ? tiltProduct.images[0] : '/icons/ebna-logo.png')} 
                  alt={tiltProduct.name} 
                  className="tilt-image" 
                />
                <div className="tilt-info">
                  <span className="tilt-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={12} /> {(tiltProduct.category || '').replace(/_/g, ' ')} • DESTACADO 30 MIN
                  </span>
                  <h3>{tiltProduct.name}</h3>
                  <p className="price">{formatPrice(tiltProduct.priceFCFA || tiltProduct.price)}</p>
                  <WhatsAppButton product={tiltProduct} size="sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: Hero Text Content & CTAs */}
        <div className="hero-content">
          <span className="text-label-luxury">
            <Sparkles size={16} /> SINDY LUXURY • HAUTE COUTURE BY EBNA
          </span>
          <h1 className="text-hero-display">
            Alta Costura & Estilo,<br/>
            <i>Exclusivo en Guinea</i>
          </h1>
          <p className="hero-lead">
            Boutique selecta de vestidos de gala drapeados, conjuntos de pasarela, calzado joya y alta cosmética botánica. Entregas express inmediatas en Malabo y Bata en moneda local FCFA.
          </p>

          <div className="hero-cta-group" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/catalogo" className="btn-primary cta-button">
              <Compass size={18} /> Explorar Colección Privada <ArrowRight size={18} />
            </Link>
            <a 
              href="https://wa.me/240222633687?text=%C2%A1Hola%20Sindy%20Luxury!%20Deseo%20recibir%20asesoramiento%20VIP%20sobre%20su%20colecci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="qr-trigger-btn"
              style={{ fontSize: '0.92rem', padding: '12px 20px', borderRadius: '30px' }}
            >
              <MessageCircle size={18} /> Concierge WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          Live Statistics Counter Section (Animated on Scroll)
          ========================================================================== */}
      <section className="stats-counter-section">
        <div className="stats-grid">
          <div className="stat-card glass-panel">
            <StatCounter target={1850} prefix="+" />
            <div className="stat-label">Clientas Satisfechas</div>
            <div className="stat-sublabel">Atención y fidelidad en Malabo y Bata</div>
          </div>

          <div className="stat-card glass-panel">
            <StatCounter target={100} suffix="%" />
            <div className="stat-label">Autenticidad Garantizada</div>
            <div className="stat-sublabel">Prendas y cosmética de lujo seleccionada</div>
          </div>

          <div className="stat-card glass-panel">
            <StatCounter target={24} suffix="h" />
            <div className="stat-label">Entrega Express Directa</div>
            <div className="stat-sublabel">Despachos prioritarios puerta a puerta</div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-number">3.000 <span style={{ fontSize: '1rem', fontWeight: 600 }}>FCFA</span></div>
            <div className="stat-label">Tarifa Plana Express</div>
            <div className="stat-sublabel">0 FCFA con entrega estándar</div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          Editorial Fashion Film Container (Reserved Showcase)
          ========================================================================== */}
      <section className="editorial-film-section">
        <div className="editorial-film-card glass-panel">
          <div className="film-backdrop-gradient"></div>
          <div className="film-watermark">HAUTE COUTURE</div>
          
          <div className="film-inner-content">
            <div className="film-badge-row">
              <span className="film-badge">
                <Sparkles size={13} /> FASHION FILM • COLECCIÓN 2026
              </span>
              <span className="film-badge-duration">
                <Volume2 size={13} /> 4K CINEMATIC AUDIO
              </span>
            </div>

            <h2 className="film-headline">
              Sindy Luxury: La Esencia de la Pasarela en Guinea Ecuatorial
            </h2>
            <p className="film-subtext">
              Espacio cinematográfico reservado para la campaña audiovisual de alta costura, vestidos de gala y estilo internacional en Malabo y Bata.
            </p>

            {/* Interactive Reserved Play Button */}
            <div className="film-player-placeholder">
              <div className="film-play-ring">
                <button 
                  type="button"
                  className="film-play-btn" 
                  title="Reproducir film cinematográfico Sindy Luxury"
                  onClick={() => alert('Próximamente: Estreno del Fashion Film 2026 de Sindy Luxury by EBNA.')}
                  aria-label="Reproducir video"
                >
                  <Play size={26} fill="currentColor" />
                </button>
              </div>
              <div className="film-soundwaves">
                <span className="wave-bar w-1"></span>
                <span className="wave-bar w-2"></span>
                <span className="wave-bar w-3"></span>
                <span className="wave-bar w-4"></span>
                <span className="wave-bar w-5"></span>
              </div>
            </div>

            <div className="film-footer-meta">
              <span>Producción Editorial • Edición Limitada</span>
              <Link to="/catalogo" className="film-cta-link">
                Explorar el Catálogo de Moda <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          Curated Luxury Value Pillars
          ========================================================================== */}
      <section className="features-banner-luxury glass-panel">
        <div className="feature-item-luxury">
          <div className="feature-icon-wrapper">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4>Garantía 100% Original</h4>
            <p>Piezas exclusivas de alta confección y cosmética botánica original.</p>
          </div>
        </div>

        <div className="feature-item-luxury">
          <div className="feature-icon-wrapper">
            <Truck size={24} />
          </div>
          <div>
            <h4>Envíos en 24h a Malabo y Bata</h4>
            <p>Despachos express locales en Guinea Ecuatorial con confirmación directa.</p>
          </div>
        </div>

        <div className="feature-item-luxury">
          <div className="feature-icon-wrapper">
            <MessageCircle size={24} />
          </div>
          <div>
            <h4>Asesoría VIP en WhatsApp</h4>
            <p>Atención personalizada uno a uno para resolver tallas, tonos y medidas.</p>
          </div>
        </div>

        <div className="feature-item-luxury">
          <div className="feature-icon-wrapper">
            <CreditCard size={24} />
          </div>
          <div>
            <h4>Muni Dinero & Pagos Locales</h4>
            <p>Facilidad de pago en FCFA vía Muni (+240 555 439 904) y contra entrega.</p>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          Featured Collection Grid
          ========================================================================== */}
      <section className="featured-section">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0, color: 'var(--text-primary)' }}>
                Colección Destacada
              </h2>
              <span style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', padding: '4px 12px', borderRadius: '16px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={12} /> MÁS VENDIDOS & MÁS PEDIDOS
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '6px 0 0 0' }}>
              Selección de alta demanda y popularidad en tiempo real por nuestras clientas.
            </p>
          </div>
          <Link to="/catalogo" className="link-view-all" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--brand-accent)', fontWeight: 700, textDecoration: 'none' }}>
            Ver Catálogo Completo <ArrowRight size={16} />
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
