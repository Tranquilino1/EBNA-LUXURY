import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, Phone, ShieldCheck, Truck, Sparkles, Check, PackageCheck, 
  PackageX, ShoppingBag, Plus, Minus, Pencil, Trash2, Eye, EyeOff,
  Smartphone, AlertCircle, ZoomIn, ZoomOut, X 
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
import { useModalLock } from '../hooks/useModalLock';
import type { OrderReceiptData } from '../types';
import './productPage.css';

export function ProductPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isPedirAction = searchParams.get('pedir') === 'true';

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isCheckoutDrawerOpen, setIsCheckoutDrawerOpen] = useState(isPedirAction);

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

  // Lock bottom sheet modal
  useModalLock(isCheckoutDrawerOpen, () => setIsCheckoutDrawerOpen(false));

  // Always scroll to top when opening product; if pedir=true open bottom sheet
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (isPedirAction) {
      setIsCheckoutDrawerOpen(true);
    }
  }, [slug, isPedirAction]);

  const isCosmetic = ['COSMETICA_FACIAL', 'HIGIENE_CORPORAL', 'PERFUMERIA'].includes(product?.category || '');
  const isFootwear = product?.category === 'CALZADO';

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
      setIsCheckoutDrawerOpen(true);
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

  // Background isolation, touch lock, and Escape key listener for Lightbox
  useModalLock(isLightboxOpen, () => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
  });

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
    <div className="product-page luxury-container" style={{ paddingTop: 'clamp(5.5rem, 12vw, 8rem)', paddingBottom: '4rem' }}>
      <SEOHead 
        title={`${product.name} — EBNA Luxury`} 
        description={product.description} 
        product={product} 
        ogImage={activeImage} 
        type="product"
      />
      <div className="product-nav-top-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('/catalogo', { state: { restoreScroll: true } });
            }
          }}
          className="luxury-back-nav-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '999px',
            background: 'var(--canvas-elevated)',
            border: '1.5px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
        >
          <ArrowLeft size={16} strokeWidth={2.4} color="var(--brand-accent)" />
          <span>Volver al Catálogo</span>
        </button>

        <nav className="breadcrumb" style={{ display: 'flex', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '100%' }}>
          <Link to="/" style={{ color: 'var(--brand-accent)', textDecoration: 'none' }}>Inicio</Link> &gt; 
          <Link to="/catalogo" style={{ color: 'var(--brand-accent)', textDecoration: 'none' }}>Catálogo</Link> &gt; 
          <span style={{ color: 'var(--text-primary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</span>
        </nav>
      </div>

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

      <div className="product-shein-grid">
        {/* Left Column: Hero Image Gallery (SHEIN / Haute Couture Standard) */}
        <div className="product-hero-image-wrap">
          <div 
            className="product-hero-stage"
            onClick={() => setIsLightboxOpen(true)}
            title="Haz clic para ver la imagen ampliada"
          >
            <img 
              src={activeImage} 
              alt={product.name} 
              className="product-hero-img"
              onError={(e) => {
                e.currentTarget.src = '/icons/ebna-logo-white.png';
              }}
            />
            
            <div className="product-hero-top-badges">
              {product.in_stock ? (
                <span className="hero-stock-pill in-stock">
                  <PackageCheck size={13} /> EN STOCK
                </span>
              ) : (
                <span className="hero-stock-pill out-of-stock">
                  <PackageX size={13} /> AGOTADO
                </span>
              )}
            </div>

            <div className="hero-zoom-hint">
              <ZoomIn size={14} /> Clic para ampliar
            </div>
          </div>

          {galleryImages.length > 1 && (
            <div className="product-thumb-strip">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`product-thumb-btn ${activeImage === img ? 'is-active' : ''}`}
                  title={`Ver fotografía ${i + 1}`}
                >
                  <img src={img} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/ebna-logo-white.png'; }} />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Right Column: Clean Haute Couture Product Info */}
        <div className="product-shein-info">
          <div className="product-meta-header">
            <span className="product-brand-label">
              {product.brand || 'SINDY LUXURY • HAUTE COUTURE'}
            </span>
            <span className="product-authentic-badge">
              <Sparkles size={14} /> 100% Auténtico
            </span>
          </div>

          <h1 className="product-main-name">
            {product.name}
          </h1>

          <div className="product-price-box">
            <span className="product-current-price">
              {formatPrice(priceVal)}
            </span>
            {product.originalPriceFCFA && product.originalPriceFCFA > priceVal && (
              <span className="product-original-price">
                {formatPrice(product.originalPriceFCFA)}
              </span>
            )}
            {product.originalPriceFCFA && product.originalPriceFCFA > priceVal && (
              <span className="product-discount-pill">
                -{Math.round(((product.originalPriceFCFA - priceVal) / product.originalPriceFCFA) * 100)}%
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.90rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
            {product.description}
          </p>

          {/* Sizes / Formats */}
          {availableSizes.length > 0 && (
            <div className="selector-block">
              <div className="selector-label-row">
                <span className="selector-label">
                  {isCosmetic ? 'Presentación:' : isFootwear ? 'Talla de Calzado (EU):' : 'Talla:'}
                </span>
                <span className="selector-value-hint">{currentSize}</span>
              </div>
              <div className="chips-row">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`size-chip-btn ${currentSize === size ? 'is-active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {availableColors.length > 0 && (
            <div className="selector-block">
              <div className="selector-label-row">
                <span className="selector-label">
                  {isCosmetic ? 'Tono:' : 'Color:'}
                </span>
                <span className="selector-value-hint">{currentColor}</span>
              </div>
              <div className="chips-row">
                {availableColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`color-chip-btn ${currentColor === color ? 'is-active' : ''}`}
                  >
                    {currentColor === color && <Check size={14} />}
                    <span>{color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="selector-block">
            <span className="selector-label">Cantidad:</span>
            <div className="quantity-control-row">
              <div className="quantity-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="qty-step-btn"
                  aria-label="Disminuir"
                >
                  <Minus size={15} />
                </button>
                <span className="qty-display-value">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="qty-step-btn"
                  aria-label="Aumentar"
                >
                  <Plus size={15} />
                </button>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Total: <strong style={{ color: 'var(--brand-accent)' }}>{formatPrice(priceVal * quantity)}</strong>
              </span>
            </div>
          </div>

          {/* Reassurance Grid */}
          <div className="reassurance-grid">
            <div className="reassurance-pill">
              <Truck size={16} color="#10B981" />
              <span>Envíos en Malabo & Bata</span>
            </div>
            <div className="reassurance-pill">
              <ShieldCheck size={16} color="#D81B60" />
              <span>Boutique Oficial Verificada</span>
            </div>
          </div>

          {/* Desktop Direct Action Buttons (Mobile uses the Sticky Bottom Bar) */}
          <div className="desktop-actions-block">
            <button
              type="button"
              className="desktop-btn-whatsapp"
              onClick={() => setIsCheckoutDrawerOpen(true)}
              disabled={!product.in_stock}
            >
              <WhatsAppIcon size={18} color="white" />
              <span>Pedir por WhatsApp (Generar Ticket)</span>
            </button>

            <button
              type="button"
              className="desktop-btn-cart"
              onClick={() => {
                addToCart(product, quantity, currentSize, currentColor);
                setJustAddedToCart(true);
                setTimeout(() => setJustAddedToCart(false), 2000);
              }}
              disabled={!product.in_stock}
            >
              {justAddedToCart ? <Check size={18} /> : <ShoppingBag size={18} />}
              <span>{justAddedToCart ? '¡Añadido a tu Cesta!' : `Añadir ${quantity} a la Cesta`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile Conversion */}
      <div className="shein-sticky-bottom-bar">
        <div className="sticky-bar-info">
          <span className="sticky-bar-price">{formatPrice(priceVal * quantity)}</span>
          <span className="sticky-bar-variant">{currentSize || 'Talla Única'} • {quantity} ud.</span>
        </div>
        <div className="sticky-bar-actions">
          <button
            type="button"
            className="sticky-btn-pedir"
            onClick={() => setIsCheckoutDrawerOpen(true)}
            disabled={!product.in_stock}
          >
            <WhatsAppIcon size={16} color="white" />
            <span>Pedir</span>
          </button>
          <button
            type="button"
            className={`sticky-btn-cesta ${justAddedToCart ? 'is-added' : ''}`}
            onClick={() => {
              addToCart(product, quantity, currentSize, currentColor);
              setJustAddedToCart(true);
              setTimeout(() => setJustAddedToCart(false), 2000);
            }}
            disabled={!product.in_stock}
          >
            {justAddedToCart ? <Check size={16} /> : <ShoppingBag size={16} />}
            <span>{justAddedToCart ? '¡Listo!' : 'Cesta'}</span>
          </button>
        </div>
      </div>

      {/* Express Checkout Bottom Sheet Modal */}
      {isCheckoutDrawerOpen && (
        <>
          <div 
            className="bottom-sheet-backdrop" 
            onClick={() => setIsCheckoutDrawerOpen(false)} 
          />
          <div className="bottom-sheet-panel" role="dialog" aria-modal="true" aria-label="Confirmar Pedido Express">
            <div className="bottom-sheet-handle-bar" />
            <div className="bottom-sheet-header">
              <h3 className="bottom-sheet-title">Confirmar Pedido Express</h3>
              <button 
                type="button" 
                className="bottom-sheet-close-btn"
                onClick={() => setIsCheckoutDrawerOpen(false)}
                aria-label="Cerrar formulario"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bottom-sheet-body">
              <div className="sheet-product-summary">
                <img src={activeImage} alt="" className="sheet-thumb-img" />
                <div className="sheet-summary-info">
                  <span className="sheet-summary-title">{product.name}</span>
                  <span className="sheet-summary-meta">{currentSize || 'Talla Única'} • Cantidad: {quantity}</span>
                </div>
                <span className="sheet-summary-price">{formatPrice(priceVal * quantity + shippingCost)}</span>
              </div>

              <div className="sheet-input-group">
                <label className="sheet-input-label">Nombre y Apellidos</label>
                <input
                  type="text"
                  className="sheet-input"
                  placeholder="Tu nombre completo"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    setOrderError('');
                  }}
                  autoComplete="name"
                  enterKeyHint="next"
                />
              </div>

              <div className="sheet-input-group">
                <label className="sheet-input-label">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  inputMode="tel"
                  className="sheet-input"
                  placeholder="Número de WhatsApp en Guinea Ecuatorial"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    setOrderError('');
                  }}
                  autoComplete="tel"
                  enterKeyHint="next"
                />
              </div>

              <div className="sheet-input-group">
                <label className="sheet-input-label">Dirección o Barrio (Malabo / Bata)</label>
                <input
                  type="text"
                  className="sheet-input"
                  placeholder="Barrio o referencia de entrega"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  autoComplete="street-address"
                  enterKeyHint="done"
                />
              </div>

              <div className="sheet-input-group">
                <label className="sheet-input-label">Modalidad de Envío</label>
                <div className="sheet-shipping-grid">
                  <button
                    type="button"
                    className={`sheet-shipping-option ${shippingType === 'normal' ? 'is-selected' : ''}`}
                    onClick={() => setShippingType('normal')}
                  >
                    <span className="sheet-shipping-title">Envío Normal</span>
                    <span className="sheet-shipping-price">Gratis</span>
                    <span className="sheet-shipping-sub">Máx. 1 semana</span>
                  </button>

                  <button
                    type="button"
                    className={`sheet-shipping-option ${shippingType === 'express' ? 'is-selected' : ''}`}
                    onClick={() => setShippingType('express')}
                  >
                    <span className="sheet-shipping-title">⚡ Envío Exprés</span>
                    <span className="sheet-shipping-price" style={{ color: '#D97706' }}>3.000 FCFA</span>
                    <span className="sheet-shipping-sub">Máx. 3 días</span>
                  </button>
                </div>
              </div>

              {orderError && (
                <div style={{ color: '#EF4444', fontSize: '0.80rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={14} />
                  <span>{orderError}</span>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  className="desktop-btn-whatsapp"
                  onClick={() => handleDirectTicketPayment('whatsapp')}
                >
                  <WhatsAppIcon size={18} color="white" />
                  <span>Pedir por WhatsApp (Ticket Oficial)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDirectTicketPayment('muni')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '16px',
                    border: '1.5px solid #002060',
                    background: '#002060',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Smartphone size={16} color="#60A5FA" />
                  <span>Pagar con Muni Dinero (555439904)</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

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
                className="luxury-close-circle-btn"
                style={{
                  width: '42px',
                  height: '42px',
                }}
                title="Cerrar vista completa (ESC)"
                aria-label="Cerrar vista completa (ESC)"
              >
                <X size={20} />
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

