import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Phone, ShieldCheck, Truck, Sparkles, Check, PackageCheck, PackageX, ShoppingBag, Plus, Minus, Pencil, Trash2, Eye, EyeOff, Ticket } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { useAdminCrud } from '../contexts/AdminCrudContext';
import { SEOHead } from '../components/seo/SEOHead';
import { buildWhatsAppUrl } from '../lib/whatsapp';
import { Loader } from '../components/ui/Loader';
import { formatPrice } from '../lib/utils';
import { recordProductOrder } from '../lib/popularityTracker';
import { OrderReceiptModal } from '../components/receipt/OrderReceiptModal';
import { saveOrderRequest } from '../lib/orderStorage';
import type { OrderReceiptData } from '../types';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const { isAdmin, openEditModal, openDeleteModal, quickToggleStock } = useAdminCrud();
  const productDetailRef = useRef<HTMLDivElement>(null);
  
  const product = useMemo(() => {
    if (!slug) return undefined;
    const clean = slug.trim().toLowerCase();
    return products.find(p => 
      p.slug === slug || 
      p.id === slug || 
      p.sku === slug || 
      p.slug?.toLowerCase() === clean ||
      p.id?.toLowerCase() === clean ||
      p.sku?.toLowerCase() === clean
    );
  }, [products, slug]);

  // Smoothly center the product details and description in the viewport on navigation
  useEffect(() => {
    if (product && productDetailRef.current) {
      const timer = setTimeout(() => {
        productDetailRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [product]);

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

  // Digital Pending Order Receipt State
  const [receiptOrder, setReceiptOrder] = useState<OrderReceiptData | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleGenerateReceipt = () => {
    if (!product) return;
    recordProductOrder(product.id);

    let clientName = '';
    let clientPhone = '';
    let clientAddress = '';
    try {
      clientName = localStorage.getItem('ebna_client_name') || '';
      clientPhone = localStorage.getItem('ebna_client_phone') || '';
      clientAddress = localStorage.getItem('ebna_client_address') || '';
    } catch {}

    const cleanPhone = clientPhone.replace(/\s+/g, '').replace(/[-+()]/g, '');
    const isRealData = clientName && 
      clientName.trim().length >= 3 && 
      !clientName.toLowerCase().includes('cliente vip') && 
      cleanPhone.length >= 6 && 
      clientAddress && 
      clientAddress.trim().length >= 4;

    if (!isRealData) {
      // Direct customer to complete real delivery info via the cart drawer
      addToCart(product, quantity, selectedSize, selectedColor);
      setIsCartOpen(true);
      return;
    }

    const rawImg = product.images?.primary || (Array.isArray(product.images) ? product.images[0] : (product.images as any)?.[0]);
    const priceVal = product.priceFCFA || product.price || 0;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + 
      ' • ' + now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const orderData: OrderReceiptData = {
      orderId: `quick-${Date.now()}`,
      orderNumber: `EB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: formattedDate,
      customerName: clientName.trim(),
      customerPhone: clientPhone.trim(),
      customerAddress: clientAddress.trim(),
      region: 'insular',
      shippingType: 'normal',
      paymentMethod: 'whatsapp',
      items: [{
        id: product.id,
        name: product.name,
        category: product.category,
        price: priceVal,
        quantity,
        selectedSize: selectedSize || availableSizes[0] || 'M',
        selectedColor: selectedColor || availableColors[0] || 'Original',
        image: rawImg || '/icons/ebna-logo.png',
        slug: product.slug
      }],
      subtotal: priceVal * quantity,
      shippingCost: 0,
      total: priceVal * quantity,
      status: 'PENDIENTE'
    };

    saveOrderRequest(orderData);
    setReceiptOrder(orderData);
    setIsReceiptOpen(true);
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

  const defaultMainImg = product?.images?.primary || (Array.isArray(product?.images) ? product.images[0] : '/icons/ebna-logo.png');
  const [activeImage, setActiveImage] = useState<string>(defaultMainImg || '/icons/ebna-logo.png');

  useEffect(() => {
    if (defaultMainImg) {
      setActiveImage(defaultMainImg);
    }
  }, [defaultMainImg]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const list: string[] = [];
    if (product.images?.primary) list.push(product.images.primary);
    if (product.images?.gallery && Array.isArray(product.images.gallery)) {
      product.images.gallery.forEach(img => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    if (Array.isArray(product.images)) {
      product.images.forEach(img => {
        if (typeof img === 'string' && img && !list.includes(img)) list.push(img);
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
              href="https://wa.me/240222633687?text=Hola%20Sindy%20Luxury,%20busco%20informaci%C3%B3n%20sobre%20un%20producto"
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

  const secondaryPhone = '+240 555 439 904';
  const primaryWaUrl = buildWhatsAppUrl(product, 'primary', selectedSize, selectedColor, quantity);
  const secondaryWaUrl = buildWhatsAppUrl(product, 'secondary', selectedSize, selectedColor, quantity);

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
      <nav className="breadcrumb" style={{ display: 'flex', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        <Link to="/" style={{ color: 'var(--brand-accent)', textDecoration: 'none' }}>Inicio</Link> &gt; 
        <Link to="/catalogo" style={{ color: 'var(--brand-accent)', textDecoration: 'none' }}>Catálogo</Link> &gt; 
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      <Link to="/catalogo" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--brand-accent)', fontWeight: 600, textDecoration: 'none', marginBottom: '1.5rem' }}>
        <ArrowLeft size={18} /> Volver al catálogo
      </Link>

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

      <div ref={productDetailRef} className="product-detail-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        <div className="product-image-section glass-panel" style={{ padding: '1.25rem', borderRadius: '24px', background: 'var(--canvas-elevated)', position: 'relative' }}>
          <img 
            src={activeImage} 
            alt={product.name} 
            className="main-image" 
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            onError={(e) => {
              e.currentTarget.src = '/icons/ebna-logo.png';
            }}
          />

          {/* Interactive Thumbnail Gallery Strip */}
          {galleryImages.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', overflowX: 'auto', padding: '4px 0' }}>
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    padding: '2px',
                    border: activeImage === img ? '2px solid var(--brand-accent)' : '1.5px solid var(--border-subtle)',
                    background: 'var(--canvas-surface)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    boxShadow: activeImage === img ? '0 0 12px rgba(216, 27, 96, 0.35)' : 'none',
                  }}
                  title={`Ver fotografía ${i + 1}`}
                >
                  <img 
                    src={img} 
                    alt="" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/ebna-logo.png'; }}
                  />
                </button>
              ))}
            </div>
          )}

          <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '8px' }}>
            {product.inStock || product.in_stock ? (
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
                      border: selectedSize === size ? '2px solid var(--brand-accent)' : '1px solid var(--border-light)',
                      background: selectedSize === size ? 'var(--brand-gold-light)' : 'var(--canvas-surface)',
                      color: selectedSize === size ? 'var(--brand-accent)' : 'var(--text-primary)',
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
                      border: selectedColor === color ? '2px solid var(--brand-accent)' : '1px solid var(--border-light)',
                      background: selectedColor === color ? 'var(--brand-gold-light)' : 'var(--canvas-surface)',
                      color: selectedColor === color ? 'var(--brand-accent)' : 'var(--text-primary)',
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
              onClick={() => recordProductOrder(product.id)}
            >
              <span>Pedir por WhatsApp Directo</span>
            </a>

            <a 
              href={secondaryWaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary full-width"
              style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={() => recordProductOrder(product.id)}
            >
              <Phone size={18} /> Muni Dinero / Contacto ({secondaryPhone})
            </a>

            <button
              type="button"
              onClick={handleGenerateReceipt}
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: '30px',
                border: '1px solid rgba(216, 27, 96, 0.4)',
                background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.08) 0%, rgba(197, 168, 128, 0.15) 100%)',
                color: '#D81B60',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(216, 27, 96, 0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              <Ticket size={18} />
              <span>Generar Tarjeta de Pedido Pendiente (PNG)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Digital Pending Order Receipt Modal */}
      <OrderReceiptModal
        order={receiptOrder}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
}

