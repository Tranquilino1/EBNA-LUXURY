import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, Phone, ShieldCheck, Truck, Sparkles, Check, PackageCheck, 
  PackageX, ShoppingBag, Plus, Minus, Pencil, Trash2, Eye, EyeOff,
  Smartphone, User, MapPin, AlertCircle, ZoomIn, ZoomOut, X 
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { useAdminCrud } from '../contexts/AdminCrudContext';
import { SEOHead } from '../components/seo/SEOHead';
import { Loader } from '../components/ui/Loader';
import { formatPrice } from '../lib/utils';
import { recordProductOrder } from '../lib/popularityTracker';
import { TicketProcessingModal } from '../components/receipt/TicketProcessingModal';
import { saveOrderRequest } from '../lib/orderStorage';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import type { OrderReceiptData } from '../types';

export function ProductPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isPedirAction = searchParams.get('pedir') === 'true';
  const orderSectionRef = useRef<HTMLDivElement>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { isAdmin, openEditModal, openDeleteModal, quickToggleStock } = useAdminCrud();
  
  const product = useMemo(() => {
    if (!slug) return undefined;
    const raw = slug.trim().toLowerCase();
    let decoded = raw;
    try {
      decoded = decodeURIComponent(slug).trim().toLowerCase();
    } catch {}

    return products.find(p => 
      p.slug === slug || 
      p.id === slug || 
      p.sku === slug || 
      p.slug?.toLowerCase() === raw ||
      p.id?.toLowerCase() === raw ||
      p.sku?.toLowerCase() === raw ||
      p.slug?.toLowerCase() === decoded ||
      p.id?.toLowerCase() === decoded ||
      p.sku?.toLowerCase() === decoded
    );
  }, [products, slug]);

  // Handle scroll: if pedir=true, scroll directly to order section; otherwise to top
  useEffect(() => {
    if (isPedirAction) {
      const timer = setTimeout(() => {
        if (orderSectionRef.current) {
          orderSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [slug, isPedirAction, product]);

  const isCosmetic = ['COSMETICA_FACIAL', 'HIGIENE_CORPORAL', 'PERFUMERIA'].includes(product?.category || '');
  const isFootwear = product?.category === 'CALZADO';
  const isAccessory = product?.category === 'BOLSOS_ACCESORIOS';

  // Available formats or sizes based on actual product category
  const availableSizes = useMemo(() => {
    if (!product) return [];
    if (isCosmetic) {
      const vol = product.details?.volume;
      if (vol) return [vol];
      return product.sizes && product.sizes.length > 0 ? product.sizes : ['Formato Estándar'];
    }
    if (product.sizes && product.sizes.length > 0) return product.sizes;
    return isFootwear ? ['38', '39', '40', '41'] : ['S', 'M', 'L'];
  }, [product, isCosmetic, isFootwear]);

  const availableColors = useMemo(() => {
    if (!product) return [];
    if (isCosmetic) {
      return product.colors && product.colors.length > 0 ? product.colors : [];
    }
    if (product.colors && product.colors.length > 0) return product.colors;
    return [];
  }, [product, isCosmetic]);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Shipping type state: Express (3000 FCFA max 3 days) vs Normal (Gratis 5-7 days)
  const [shippingType, setShippingType] = useState<'normal' | 'express'>('normal');
  const shippingCost = shippingType === 'express' ? 3000 : 0;

  // Digital Pending Order Receipt & Processing Modal State
  const [pendingOrder, setPendingOrder] = useState<OrderReceiptData | null>(null);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [justAddedToCart, setJustAddedToCart] = useState(false);

  // Customer info state (persisted for convenience)
  const [customerName, setCustomerName] = useState(() => {
    try { return localStorage.getItem('ebna_client_name') || ''; } catch { return ''; }
  });
  const [customerPhone, setCustomerPhone] = useState(() => {
    try { return localStorage.getItem('ebna_client_phone') || ''; } catch { return ''; }
  });
  const [customerAddress, setCustomerAddress] = useState(() => {
    try { return localStorage.getItem('ebna_client_address') || ''; } catch { return ''; }
  });
  const [orderError, setOrderError] = useState('');

  // Directly generates official Ticket with automated progress bar and silent download
  const handleDirectTicketPayment = (method: 'whatsapp' | 'muni') => {
    if (!product) return;

    const cName = (customerName || '').trim();
    const cPhone = (customerPhone || '').trim();
    const cAddress = (customerAddress || '').trim();

    if (!cName || !cPhone) {
      setOrderError('Por favor ingresa tu nombre y número de contacto para generar tu pedido oficial.');
      orderSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setOrderError('');

    try {
      localStorage.setItem('ebna_client_name', cName);
      localStorage.setItem('ebna_client_phone', cPhone);
      if (cAddress) localStorage.setItem('ebna_client_address', cAddress);
    } catch {}

    recordProductOrder(product.id);

    const rawImg = product.images?.primary || (Array.isArray(product.images) ? product.images[0] : (product.images as any)?.[0]);
    const cleanImg = typeof rawImg === 'string' ? rawImg.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo-white.png';
    const priceVal = product.priceFCFA || product.price || 0;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + 
      ' • ' + now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const subtotal = priceVal * quantity;
    const total = subtotal + shippingCost;

    const orderData: OrderReceiptData = {
      orderId: `quick-${Date.now()}`,
      orderNumber: `EB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: formattedDate,
      customerName: cName,
      customerPhone: cPhone,
      customerAddress: cAddress || 'Malabo / Bata',
      region: 'insular',
      shippingType,
      paymentMethod: method,
      items: [{
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        price: priceVal,
        quantity,
        selectedSize: currentSize || '',
        selectedColor: currentColor || '',
        image: cleanImg,
        slug: product.slug
      }],
      subtotal,
      shippingCost,
      total,
      status: 'PENDIENTE'
    };

    saveOrderRequest(orderData);
    setPendingOrder(orderData);
    setIsProcessingModalOpen(true);
  };

  useEffect(() => {
    if (availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    } else {
      setSelectedSize('');
    }
  }, [availableSizes]);

  useEffect(() => {
    if (availableColors.length > 0) {
      setSelectedColor(availableColors[0]);
    } else {
      setSelectedColor('');
    }
  }, [availableColors]);

  const currentSize = selectedSize || availableSizes[0] || '';
  const currentColor = selectedColor || availableColors[0] || '';

  const rawDefaultMainImg = product?.images?.primary || (Array.isArray(product?.images) ? product.images[0] : '/icons/ebna-logo-white.png');
  const defaultMainImg = typeof rawDefaultMainImg === 'string' ? (rawDefaultMainImg.startsWith('data:image/') ? rawDefaultMainImg : rawDefaultMainImg.replace(/\.jfif$/i, '.jpg')) : '/icons/ebna-logo-white.png';
  const [activeImage, setActiveImage] = useState<string>(defaultMainImg || '/icons/ebna-logo-white.png');

  useEffect(() => {
    if (defaultMainImg) {
      setActiveImage(defaultMainImg);
    }
  }, [defaultMainImg]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsZoomed(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const list: string[] = [];
    if (product.images?.primary) {
      const clean = product.images.primary.replace(/\.jfif$/i, '.jpg');
      list.push(clean);
    }
    if (product.images?.gallery && Array.isArray(product.images.gallery)) {
      product.images.gallery.forEach(img => {
        const clean = typeof img === 'string' ? img.replace(/\.jfif$/i, '.jpg') : img;
        if (clean && !list.includes(clean)) list.push(clean);
      });
    }
    if (Array.isArray(product.images)) {
      product.images.forEach(img => {
        const clean = typeof img === 'string' ? img.replace(/\.jfif$/i, '.jpg') : img;
        if (clean && !list.includes(clean)) list.push(clean);
      });
    }
    return list.length > 0 ? list : ['/icons/ebna-logo.png'];
  }, [product]);

  if (!product) {
    if (loading) return <Loader fullScreen message="Cargando detalles del producto..." />;
    return (
      <div className="product-not-found-page luxury-container" style={{ paddingTop: '9rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '560px', margin: '0 auto', padding: '3rem 2rem', borderRadius: '24px', border: '1px solid var(--border-subtle)', background: 'var(--canvas-elevated)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(216, 27, 96, 0.1)', color: 'var(--brand-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <ShoppingBag size={32} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
            Prenda o Artículo No Disponible
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            El producto solicitado no se encuentra en el catálogo activo o su enlace ha sido actualizado. Puedes explorar todas nuestras colecciones de gala o consultarnos directamente.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.85rem 1.8rem',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #D81B60, #C2185B)',
                color: 'white',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(216, 27, 96, 0.3)'
              }}
            >
              <ArrowLeft size={18} /> Volver a la Boutique
            </Link>
            <a 
              href="https://wa.me/240555633687?text=Hola%20Sindy%20Luxury,%20busco%20informaci%C3%B3n%20sobre%20un%20producto"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.85rem 1.6rem',
                borderRadius: '999px',
                background: 'rgba(37, 211, 102, 0.12)',
                color: '#16a34a',
                border: '1.5px solid rgba(37, 211, 102, 0.4)',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Phone size={18} /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  const priceVal = product.priceFCFA || product.price || 0;

  return (
    <div className="product-page luxury-container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <SEOHead 
        title={`${product.name} — EBNA Luxury`} 
        description={product.description} 
        product={product} 
        ogImage={activeImage} 
        type="product"
      />
      <nav className="breadcrumb" style={{ display: 'flex', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--brand-accent)', textDecoration: 'none' }}>Inicio</Link> &gt; 
        <Link to="/catalogo" style={{ color: 'var(--brand-accent)', textDecoration: 'none' }}>Catálogo</Link> &gt; 
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/catalogo', { state: { restoreScroll: true } });
          }
        }}
        className="back-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 18px',
          borderRadius: '999px',
          background: 'rgba(216, 27, 96, 0.09)',
          border: '1.5px solid rgba(216, 27, 96, 0.28)',
          color: '#D81B60',
          fontWeight: 700,
          fontSize: '0.9rem',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 12px rgba(216, 27, 96, 0.08)'
        }}
      >
        <ArrowLeft size={18} /> Volver a la zona anterior
      </button>

      {/* Admin Quick Control Bar on Product Page */}
      {isAdmin && (
        <div 
          className="admin-product-bar glass-panel"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 20px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(216,27,96,0.08), rgba(212,175,55,0.12))',
            border: '1.5px solid var(--border-brand)',
            marginBottom: '1.8rem',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="var(--brand-accent)" />
            <div>
              <span style={{ display: 'block', fontWeight: 800, fontSize: '0.88rem', color: 'var(--brand-accent)' }}>
                Modo Administrador: CRUD Directo
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Edita, alterna stock o elimina este producto sin ir al panel
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => openEditModal(product)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: 'var(--brand-accent)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(216,27,96,0.3)'
              }}
            >
              <Pencil size={15} /> Editar Producto
            </button>

            <button
              type="button"
              onClick={() => quickToggleStock(product.id, product.in_stock)}
              style={{
                padding: '8px 14px',
                borderRadius: '20px',
                border: '1px solid var(--border-subtle)',
                background: product.in_stock ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                color: product.in_stock ? '#15803d' : '#b91c1c',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {product.in_stock ? <EyeOff size={15} /> : <Eye size={15} />}
              {product.in_stock ? 'Marcar Agotado' : 'Marcar En Stock'}
            </button>

            <button
              type="button"
              onClick={() => openDeleteModal(product)}
              style={{
                padding: '8px 14px',
                borderRadius: '20px',
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.08)',
                color: '#ef4444',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Trash2 size={15} /> Eliminar
            </button>
          </div>
        </div>
      )}

      <div className="product-detail-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        <div 
          className="product-image-section glass-panel" 
          style={{ 
            padding: '1.25rem', 
            borderRadius: '24px', 
            background: 'var(--canvas-elevated)', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          {/* Centered Image Stage with Clean Aspect Ratio */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '440px',
              maxHeight: '520px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '20px',
              background: 'radial-gradient(circle at center, rgba(255, 245, 248, 0.8) 0%, rgba(248, 250, 252, 0.96) 100%)',
              border: '1.5px solid rgba(216, 27, 96, 0.15)',
              overflow: 'hidden',
              cursor: 'zoom-in',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}
            title="Haz clic para ver la imagen ampliada en resolución completa"
          >
            <img 
              src={activeImage} 
              alt={product.name} 
              className="main-image" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '480px', 
                width: 'auto',
                height: 'auto',
                objectFit: 'contain', 
                display: 'block',
                margin: '0 auto',
                borderRadius: '14px',
                transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' 
              }}
              onError={(e) => {
                e.currentTarget.src = '/icons/ebna-logo-white.png';
              }}
            />

            {/* Subtle Zoom Badge Hint */}
            <div 
              style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(216, 27, 96, 0.25)',
                borderRadius: '20px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#D81B60',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                pointerEvents: 'none'
              }}
            >
              <ZoomIn size={14} /> Clic para ampliar
            </div>

            {/* Availability Badge */}
            <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px' }}>
              {product.inStock || product.in_stock ? (
                <span style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontWeight: 800, fontSize: '0.72rem', padding: '5px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
                  <PackageCheck size={13} /> EN STOCK
                </span>
              ) : (
                <span style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: 'white', fontWeight: 800, fontSize: '0.72rem', padding: '5px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}>
                  <PackageX size={13} /> AGOTADO
                </span>
              )}
            </div>
          </div>

          {/* Interactive Thumbnail Gallery Strip */}
          {galleryImages.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', width: '100%', justifyContent: 'center', overflowX: 'auto', padding: '4px 0' }}>
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '14px',
                    padding: '3px',
                    border: activeImage === img ? '2.5px solid var(--brand-accent)' : '1.5px solid var(--border-subtle)',
                    background: 'var(--canvas-surface)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    boxShadow: activeImage === img ? '0 0 12px rgba(216, 27, 96, 0.35)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={`Ver fotografía ${i + 1}`}
                >
                  <img 
                    src={img} 
                    alt="" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }} 
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/ebna-logo-white.png'; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="product-info-section glass-panel" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'var(--canvas-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={`badge badge-${(product.category || '').toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '6px 14px', background: 'var(--brand-gold-light)', color: 'var(--brand-accent)', borderRadius: '20px', fontWeight: 700, border: '1px solid var(--border-subtle)' }}>
              {(product.category || '').replace(/_/g, ' ')}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#25D366', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> 100% Auténtico
            </span>
          </div>

          <h1 className="product-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', lineHeight: 1.2, color: 'var(--text-primary)' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--brand-accent)', letterSpacing: '-0.02em' }}>
              {formatPrice(priceVal)}
            </span>
          </div>
          
          <div className="product-description" style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)', background: 'var(--canvas-elevated)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <p>{product.description}</p>
          </div>

          {/* Sizes / Formats Selector */}
          {availableSizes.length > 0 && (
            <div className="variant-selector-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isCosmetic ? 'Presentación / Formato:' : isFootwear ? 'Seleccionar Talla de Calzado (EU):' : isAccessory ? 'Medida:' : 'Seleccionar Talla:'}
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
                      border: currentSize === size ? '2px solid var(--brand-accent)' : '1px solid var(--border-light)',
                      background: currentSize === size ? 'var(--brand-gold-light)' : 'var(--canvas-surface)',
                      color: currentSize === size ? 'var(--brand-accent)' : 'var(--text-primary)',
                      fontWeight: currentSize === size ? 800 : 600,
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
          )}

          {/* Colors Selector */}
          {availableColors.length > 0 && (
            <div className="variant-selector-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isCosmetic ? 'Tono / Variante:' : 'Seleccionar Color:'}
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
                      border: currentColor === color ? '2px solid var(--brand-accent)' : '1px solid var(--border-light)',
                      background: currentColor === color ? 'var(--brand-gold-light)' : 'var(--canvas-surface)',
                      color: currentColor === color ? 'var(--brand-accent)' : 'var(--text-primary)',
                      fontWeight: currentColor === color ? 800 : 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {currentColor === color && <Check size={14} />}
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="variant-selector-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Cantidad (Unidades):
            </label>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--canvas-elevated)', borderRadius: '14px', padding: '4px', width: 'fit-content', border: '1px solid var(--border-light)' }}>
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: 'var(--canvas-surface)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>
              <span style={{ padding: '0 18px', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: 'var(--canvas-surface)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
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

          {/* Compact Customer Info for Instant Ticket */}
          <div 
            ref={orderSectionRef}
            style={{
              background: isPedirAction 
                ? 'linear-gradient(135deg, rgba(255, 245, 248, 0.98) 0%, rgba(254, 235, 243, 0.95) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 245, 248, 0.85) 100%)',
              border: isPedirAction ? '2px solid #D81B60' : '1px solid rgba(216, 27, 96, 0.2)',
              borderRadius: '16px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '0.4rem',
              boxShadow: isPedirAction ? '0 0 20px rgba(216, 27, 96, 0.25)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--brand-accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {isPedirAction ? '⚡ Pedido Inmediato - Generación de Ticket Oficial' : 'Datos para tu Ticket Oficial de Compra'}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                ✓ Descarga Ticket PNG
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                  Nombre y Apellidos:
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Tu nombre y apellidos"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setOrderError('');
                      try { localStorage.setItem('ebna_client_name', e.target.value); } catch {}
                    }}
                    style={{
                      width: '100%',
                      padding: '7px 10px 7px 30px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.84rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                  Teléfono / WhatsApp:
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
                  <input
                    type="tel"
                    placeholder="Tu teléfono de contacto"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      setOrderError('');
                      try { localStorage.setItem('ebna_client_phone', e.target.value); } catch {}
                    }}
                    style={{
                      width: '100%',
                      padding: '7px 10px 7px 30px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.84rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                  Dirección / Barrio de Entrega:
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Tu barrio o ciudad (ej. Malabo, Bata...)"
                    value={customerAddress}
                    onChange={(e) => {
                      setCustomerAddress(e.target.value);
                      try { localStorage.setItem('ebna_client_address', e.target.value); } catch {}
                    }}
                    style={{
                      width: '100%',
                      padding: '7px 10px 7px 30px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.84rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  />
                </div>
              </div>

              {/* Panel Exclusivo de Modalidad de Envío */}
              <div style={{ gridColumn: '1 / -1', marginTop: '2px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '5px' }}>
                  Modalidad de Envío:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {/* Opción 1: Envío Normal - Azul Animado Elegante y Simple */}
                  <button
                    type="button"
                    onClick={() => setShippingType('normal')}
                    className={shippingType === 'normal' ? 'shipping-btn-normal-active' : 'shipping-btn-normal-inactive'}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 800 }}>Envío Normal</span>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 900, 
                        color: shippingType === 'normal' ? '#FFFFFF' : '#1D4ED8', 
                        background: shippingType === 'normal' ? 'rgba(255, 255, 255, 0.22)' : 'rgba(37, 99, 235, 0.12)', 
                        padding: '1px 6px', 
                        borderRadius: '8px' 
                      }}>
                        Gratis
                      </span>
                    </div>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      fontWeight: 600, 
                      color: shippingType === 'normal' ? 'rgba(255, 255, 255, 0.92)' : '#475569' 
                    }}>
                      Duración máxima 1 semana
                    </span>
                  </button>

                  {/* Opción 2: Botón Exclusivo Envío Exprés - Oro Dorado 3D Imperial */}
                  <button
                    type="button"
                    onClick={() => setShippingType('express')}
                    className={shippingType === 'express' ? 'shipping-btn-express-3d-active' : 'shipping-btn-express-3d-inactive'}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '0.84rem', 
                        fontWeight: 900, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '3px',
                        color: shippingType === 'express' ? '#FFFFFF' : '#92400E',
                        textShadow: shippingType === 'express' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                      }}>
                        ⚡ Envío Exprés
                      </span>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 900, 
                        color: shippingType === 'express' ? '#78350F' : '#B45309', 
                        background: shippingType === 'express' ? '#FDE68A' : 'rgba(245, 158, 11, 0.2)', 
                        padding: '1px 6px', 
                        borderRadius: '8px' 
                      }}>
                        3.000 FCFA
                      </span>
                    </div>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      fontWeight: 700, 
                      color: shippingType === 'express' ? '#FFFBEB' : '#78350F' 
                    }}>
                      Duración máx. 3 días
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {orderError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '8px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 600 }}>
                <AlertCircle size={15} color="#EF4444" />
                <span>{orderError}</span>
              </div>
            )}
          </div>

          <div className="product-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '0.6rem' }}>
            {/* 1. PAGAR POR WHATSAPP (Direct Ticket Generator) */}
            <button
              type="button"
              onClick={() => handleDirectTicketPayment('whatsapp')}
              disabled={!product.in_stock}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.98rem',
                cursor: product.in_stock ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <WhatsAppIcon size={20} color="white" />
              <span>Pedir por WhatsApp (Generar Ticket)</span>
            </button>

            {/* 2. PAGAR CON MUNI DINERO (555439904) (Direct Ticket Generator) */}
            <button
              type="button"
              onClick={() => handleDirectTicketPayment('muni')}
              disabled={!product.in_stock}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '30px',
                border: '1.5px solid #002060',
                background: 'linear-gradient(135deg, #002060 0%, #001238 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.98rem',
                cursor: product.in_stock ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 6px 18px rgba(0, 32, 96, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <Smartphone size={20} color="#60A5FA" />
              <span>Pagar con Muni Dinero (555439904)</span>
            </button>

            {/* 3. AGREGAR A LA CESTA (Rosa Lujo EBNA con Feedback) */}
            <button
              type="button"
              onClick={() => {
                addToCart(product, quantity, currentSize, currentColor);
                setJustAddedToCart(true);
                setTimeout(() => setJustAddedToCart(false), 2000);
              }}
              disabled={!product.in_stock}
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: '30px',
                border: 'none',
                background: product.in_stock 
                  ? (justAddedToCart ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #D81B60, #C2185B)') 
                  : '#E2E8F0',
                color: product.in_stock ? '#FFFFFF' : '#94A3B8',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: product.in_stock ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '2px',
                boxShadow: product.in_stock ? '0 4px 14px rgba(216, 27, 96, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {justAddedToCart ? <Check size={18} /> : <ShoppingBag size={18} />}
              <span>
                {!product.in_stock ? 'Producto Agotado' : (justAddedToCart ? '¡Añadido a tu Carrito!' : `Añadir ${quantity} al Carrito`)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Automated Ticket Processing Modal with smooth progress bar & confirmation */}
      <TicketProcessingModal
        isOpen={isProcessingModalOpen}
        order={pendingOrder}
        onClose={() => setIsProcessingModalOpen(false)}
        onConfirmed={() => {}}
      />

      {/* Fullscreen High-Resolution Image Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="product-lightbox-overlay"
          onClick={() => {
            setIsLightboxOpen(false);
            setIsZoomed(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(8, 6, 9, 0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Top Floating Control Bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '20px',
              left: '24px',
              right: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'white',
              zIndex: 10
            }}
          >
            <div>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', fontWeight: 800 }}>
                EBNA Haute Résolution • Vista Completa Detallada
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FFFFFF', margin: '2px 0 0 0', fontWeight: 700 }}>
                {product.name}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                style={{
                  background: isZoomed ? '#D81B60' : 'rgba(255, 255, 255, 0.14)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  borderRadius: '30px',
                  padding: '8px 16px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  boxShadow: isZoomed ? '0 0 15px rgba(216, 27, 96, 0.5)' : 'none'
                }}
              >
                {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                <span>{isZoomed ? 'Ajustar' : 'Zoom 2x'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setIsZoomed(false);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Cerrar vista completa"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Centered Image with Adaptive Zoom */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '82vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: isZoomed ? 'auto' : 'hidden',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
            }}
          >
            <img 
              src={activeImage} 
              alt={product.name}
              style={{
                maxWidth: isZoomed ? '160%' : '90vw',
                maxHeight: isZoomed ? 'none' : '78vh',
                width: isZoomed ? 'auto' : 'auto',
                height: isZoomed ? 'auto' : 'auto',
                objectFit: 'contain',
                borderRadius: '16px',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isZoomed ? 'scale(1.25)' : 'scale(1)',
                background: 'rgba(255, 255, 255, 0.04)'
              }}
              onClick={() => setIsZoomed(!isZoomed)}
              onError={(e) => {
                e.currentTarget.src = '/icons/ebna-logo-white.png';
              }}
            />
          </div>

          {/* Bottom Thumbnail Strip for Multi-Image Gallery */}
          {galleryImages.length > 1 && (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '20px',
                display: 'flex',
                gap: '10px',
                padding: '8px 14px',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                zIndex: 10
              }}
            >
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveImage(img);
                    setIsZoomed(false);
                  }}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: activeImage === img ? '2.5px solid #D81B60' : '1px solid rgba(255, 255, 255, 0.25)',
                    background: '#000',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: activeImage === img ? '0 0 12px rgba(216, 27, 96, 0.5)' : 'none'
                  }}
                  title={`Foto ${i + 1}`}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

