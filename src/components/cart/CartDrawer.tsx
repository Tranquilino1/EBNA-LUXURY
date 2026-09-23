import React, { useState } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Copy, 
  Check, CreditCard, MapPin, PhoneCall, Zap, Globe, Smartphone, Package, 
  User, Phone, AlertCircle 
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import { recordProductOrder } from '../../lib/popularityTracker';
import { OrderReceiptModal } from '../receipt/OrderReceiptModal';
import { saveOrderRequest } from '../../lib/orderStorage';
import { buildReceiptWhatsAppUrl, downloadReceiptAsPng } from '../../lib/receiptExporter';
import type { OrderReceiptData, ReceiptItem } from '../../types';
import './cart.css';

export const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItemsCount, 
    subtotalPrice 
  } = useCart();

  // Delivery & Customer Form State (persisted in localStorage for convenience)
  const [customerName, setCustomerName] = useState(() => {
    try { return localStorage.getItem('ebna_client_name') || ''; } catch { return ''; }
  });
  const [customerPhone, setCustomerPhone] = useState(() => {
    try { return localStorage.getItem('ebna_client_phone') || ''; } catch { return ''; }
  });
  const [customerAddress, setCustomerAddress] = useState(() => {
    try { return localStorage.getItem('ebna_client_address') || ''; } catch { return ''; }
  });
  const [validationError, setValidationError] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'muni'>('whatsapp');
  const [region, setRegion] = useState<'insular' | 'continental'>('insular');
  const [shippingType, setShippingType] = useState<'normal' | 'express'>('normal');
  const [copiedMuni, setCopiedMuni] = useState(false);

  // Digital Pending Order Receipt State
  const [receiptOrder, setReceiptOrder] = useState<OrderReceiptData | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  if (!isCartOpen) return null;

  // Shipping calculation
  const shippingCost = shippingType === 'express' ? 3000 : 0;
  const grandTotal = subtotalPrice + shippingCost;

  const handleNameChange = (val: string) => {
    setCustomerName(val);
    setValidationError('');
    try { localStorage.setItem('ebna_client_name', val); } catch {}
  };

  const handlePhoneChange = (val: string) => {
    setCustomerPhone(val);
    setValidationError('');
    try { localStorage.setItem('ebna_client_phone', val); } catch {}
  };

  const handleAddressChange = (val: string) => {
    setCustomerAddress(val);
    setValidationError('');
    try { localStorage.setItem('ebna_client_address', val); } catch {}
  };

  const handleCopyMuni = () => {
    navigator.clipboard.writeText('555439904');
    setCopiedMuni(true);
    setTimeout(() => setCopiedMuni(false), 2500);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const trimmedName = customerName.trim();
    if (!trimmedName || trimmedName.length < 3) {
      setValidationError('Por favor ingresa tu Nombre y Apellidos reales para emitir tu comprobante oficial.');
      return;
    }
    const lowerName = trimmedName.toLowerCase();
    if (lowerName.includes('cliente vip') || lowerName.includes('prueba') || lowerName === 'test' || lowerName === 'anonimo') {
      setValidationError('Por favor ingresa tu Nombre y Apellidos reales (no nombres de prueba o placeholder).');
      return;
    }

    const cleanPhone = customerPhone.replace(/\s+/g, '').replace(/[-+()]/g, '');
    if (!cleanPhone || cleanPhone.length < 6) {
      setValidationError('Por favor ingresa tu número de Teléfono / WhatsApp real (ej. 222 633 687 o 555 439 904) para coordinar la entrega.');
      return;
    }

    const trimmedAddress = customerAddress.trim();
    if (!trimmedAddress || trimmedAddress.length < 4) {
      setValidationError('Por favor ingresa tu Dirección, Barrio o Referencia de entrega real (ej. Ela Nguema, Malabo II, Caracolas).');
      return;
    }

    setValidationError('');

    const receiptItems: ReceiptItem[] = cartItems.map(item => {
      recordProductOrder(item.product.id);
      const imgCandidate = item.product.images?.primary || (Array.isArray(item.product.images) ? item.product.images[0] : (item.product.images as any)?.[0]);
      const rawImg = typeof imgCandidate === 'string' ? imgCandidate.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo.png';
      return {
        id: item.cartItemId,
        name: item.product.name,
        category: item.product.category,
        description: item.product.description,
        price: item.product.priceFCFA || item.product.price || 0,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        image: rawImg || '/icons/ebna-logo.png',
        slug: item.product.slug
      };
    });

    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + 
      ' • ' + now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const orderData: OrderReceiptData = {
      orderId: `ord-${Date.now()}`,
      orderNumber: `EB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: formattedDate,
      customerName: trimmedName,
      customerPhone: customerPhone.trim(),
      customerAddress: trimmedAddress,
      region,
      shippingType,
      paymentMethod,
      items: receiptItems,
      subtotal: subtotalPrice,
      shippingCost,
      total: grandTotal,
      status: 'PENDIENTE'
    };

    saveOrderRequest(orderData);
    setReceiptOrder(orderData);
    setIsReceiptOpen(true);

    // Automatically trigger high-resolution PNG invoice download
    downloadReceiptAsPng(orderData, 'haute-couture').catch(err => {
      console.warn('Auto download receipt PNG error:', err);
    });

    // Direct routing per customer payment method selection
    if (paymentMethod === 'whatsapp') {
      const waUrl = buildReceiptWhatsAppUrl(orderData);
      window.open(waUrl, '_blank');
    } else if (paymentMethod === 'muni') {
      try {
        navigator.clipboard.writeText('555439904');
      } catch {}
      const waUrl = buildReceiptWhatsAppUrl(orderData);
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="cart-icon-wrapper">
              <ShoppingBag size={20} color="#D81B60" />
            </div>
            <div>
              <h3 className="cart-title">Tu Carrito de Lujo</h3>
              <p className="cart-subtitle">{totalItemsCount} {totalItemsCount === 1 ? 'artículo exclusivo' : 'artículos exclusivos'}</p>
            </div>
          </div>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)} aria-label="Cerrar Carrito">
            <X size={20} />
          </button>
        </div>

        {/* Items List & Delivery Form */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <ShoppingBag size={48} color="#D81B60" />
              </div>
              <p style={{ fontWeight: 700, fontSize: '1.15rem', color: '#1E293B', marginBottom: '0.4rem' }}>
                Tu carrito está vacío
              </p>
              <p style={{ fontSize: '0.88rem', color: '#64748B', maxWidth: '250px', margin: '0 auto 1.5rem auto' }}>
                Explora las nuevas colecciones en alta definición de vestidos, calzado y moda exclusiva.
              </p>
              <button className="btn-primary" onClick={() => setIsCartOpen(false)} style={{ borderRadius: '30px', padding: '10px 24px' }}>
                Explorar Catálogo EBNA
              </button>
            </div>
          ) : (
            <>
              {/* Product Items List */}
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const priceVal = item.product.priceFCFA || item.product.price || 0;
                  const itemTotal = priceVal * item.quantity;
                  const rawItemImg = item.product.images?.primary || (Array.isArray(item.product.images) ? item.product.images[0] : '/icons/ebna-logo.png');
                  const itemImg = typeof rawItemImg === 'string' ? rawItemImg.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo.png';
                  return (
                    <div key={item.cartItemId} className="cart-item-card glass-card">
                      <img 
                        src={itemImg} 
                        alt={item.product.name} 
                        className="cart-item-img"
                        onError={(e) => {
                          e.currentTarget.src = '/icons/ebna-logo.png';
                        }}
                      />
                      <div className="cart-item-details">
                        <h4 className="cart-item-name" title={item.product.name}>{item.product.name}</h4>
                        
                        {(() => {
                          const isCosmetic = ['COSMETICA_FACIAL', 'HIGIENE_CORPORAL', 'PERFUMERIA'].includes(item.product.category || '');
                          const isFootwear = item.product.category === 'CALZADO';
                          const sizeLabel = isCosmetic ? 'Formato' : isFootwear ? 'Talla EU' : 'Talla';
                          return (
                            <div className="cart-item-options">
                              <span>{sizeLabel}: <strong>{item.selectedSize}</strong></span>
                              {!isCosmetic && item.selectedColor && item.selectedColor !== 'Original' && (
                                <>
                                  <span>•</span>
                                  <span>Color: <strong>{item.selectedColor}</strong></span>
                                </>
                              )}
                            </div>
                          );
                        })()}

                        <div className="cart-item-price-row">
                          <span className="cart-item-unit-price">{formatPrice(priceVal)} c/u</span>
                          <span className="cart-item-total">{formatPrice(itemTotal)}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="cart-item-actions">
                          <div className="quantity-controls">
                            <button 
                              type="button" 
                              className="qty-btn"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              aria-label="Disminuir cantidad"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button 
                              type="button" 
                              className="qty-btn"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              aria-label="Aumentar cantidad"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button 
                            type="button" 
                            className="cart-remove-btn"
                            onClick={() => removeFromCart(item.cartItemId)}
                            title="Eliminar del carrito"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FUTURISTIC ORDER & DELIVERY INFORMATION FORM */}
              <div className="futuristic-checkout-section">
                
                {/* 1. Datos del Destinatario Card */}
                <div className="futuristic-card delivery-info-box">
                  <div className="futuristic-card-header">
                    <div className="header-icon-box">
                      <User size={16} color="#D81B60" />
                    </div>
                    <div>
                      <h4 className="futuristic-card-title">Información de Entrega</h4>
                      <p className="futuristic-card-subtitle">Datos del destinatario para entrega oficial</p>
                    </div>
                  </div>

                  <div className="futuristic-inputs-grid">
                    <div className="futuristic-input-field">
                      <label className="futuristic-label">Nombre y Apellidos *</label>
                      <div className="futuristic-input-wrap">
                        <User size={15} className="input-icon" />
                        <input 
                          type="text" 
                          value={customerName} 
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="Ej. Sindy Eyenga"
                          className="futuristic-input"
                        />
                      </div>
                    </div>

                    <div className="futuristic-input-field">
                      <label className="futuristic-label">Teléfono / WhatsApp *</label>
                      <div className="futuristic-input-wrap">
                        <Phone size={15} className="input-icon" />
                        <input 
                          type="tel" 
                          value={customerPhone} 
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="+240 222 633 687"
                          className="futuristic-input"
                        />
                      </div>
                    </div>

                    <div className="futuristic-input-field full-width">
                      <label className="futuristic-label">Dirección / Barrio / Referencia *</label>
                      <div className="futuristic-input-wrap">
                        <MapPin size={15} className="input-icon" />
                        <input 
                          type="text" 
                          value={customerAddress} 
                          onChange={(e) => handleAddressChange(e.target.value)}
                          placeholder="Ej. Malabo II, frente a los Ministerios / Ela Nguema"
                          className="futuristic-input"
                        />
                      </div>
                    </div>
                  </div>

                  {validationError && (
                    <div className="futuristic-alert-banner">
                      <AlertCircle size={15} color="#EF4444" />
                      <span>{validationError}</span>
                    </div>
                  )}
                </div>

                {/* 2. Región de Entrega Cards */}
                <div className="futuristic-group">
                  <div className="futuristic-group-title">
                    <Globe size={15} color="#D81B60" />
                    <span>Región de Entrega</span>
                  </div>

                  <div className="futuristic-cards-2col">
                    <div 
                      className={`futuristic-interactive-card ${region === 'insular' ? 'active-border' : ''}`}
                      onClick={() => setRegion('insular')}
                    >
                      <div className="interactive-card-top">
                        <span className="card-badge-glow">Bioko</span>
                        {region === 'insular' && <Check size={14} className="check-glow" />}
                      </div>
                      <div className="interactive-card-title">Región Insular</div>
                      <div className="interactive-card-detail">Malabo y alrededores</div>
                    </div>

                    <div 
                      className={`futuristic-interactive-card ${region === 'continental' ? 'active-border' : ''}`}
                      onClick={() => setRegion('continental')}
                    >
                      <div className="interactive-card-top">
                        <span className="card-badge-glow">Litoral</span>
                        {region === 'continental' && <Check size={14} className="check-glow" />}
                      </div>
                      <div className="interactive-card-title">Región Continental</div>
                      <div className="interactive-card-detail">Bata y provincias</div>
                    </div>
                  </div>
                </div>

                {/* 3. Modalidad de Envío Cards */}
                <div className="futuristic-group">
                  <div className="futuristic-group-title">
                    <Truck size={15} color="#D81B60" />
                    <span>Modalidad de Envío</span>
                  </div>

                  <div className="futuristic-cards-2col">
                    <div 
                      className={`futuristic-interactive-card ${shippingType === 'normal' ? 'active-border' : ''}`}
                      onClick={() => setShippingType('normal')}
                    >
                      <div className="interactive-card-top">
                        <span className="shipping-type-badge normal">
                          <Package size={13} /> Estándar
                        </span>
                        <span className="shipping-tag-price gratis">Gratis</span>
                      </div>
                      <div className="interactive-card-title">Envío Normal</div>
                      <div className="interactive-card-detail">Plazo: 5 a 7 días hábiles</div>
                    </div>

                    <div 
                      className={`futuristic-interactive-card ${shippingType === 'express' ? 'active-border-gold' : ''}`}
                      onClick={() => setShippingType('express')}
                    >
                      <div className="interactive-card-top">
                        <span className="shipping-type-badge express">
                          <Zap size={13} /> Express 3D
                        </span>
                        <span className="shipping-tag-price express">+3.000 FCFA</span>
                      </div>
                      <div className="interactive-card-title">Envío Express</div>
                      <div className="interactive-card-detail">Entrega en 3 días garantizada</div>
                    </div>
                  </div>
                </div>

                {/* 4. Método de Pago Cards */}
                <div className="futuristic-group">
                  <div className="futuristic-group-title">
                    <CreditCard size={15} color="#D81B60" />
                    <span>Método de Pago</span>
                  </div>

                  <div className="futuristic-cards-2col">
                    <div 
                      className={`futuristic-interactive-card muni-card ${paymentMethod === 'muni' ? 'active-border-muni' : ''}`}
                      onClick={() => setPaymentMethod('muni')}
                    >
                      <div className="interactive-card-top">
                        <span className="payment-brand-badge muni">MUNI DINERO</span>
                        {paymentMethod === 'muni' && <Check size={14} className="check-glow" />}
                      </div>
                      <div className="interactive-card-title">Muni Dinero</div>
                      <div className="interactive-card-detail">555439904</div>
                    </div>

                    <div 
                      className={`futuristic-interactive-card wa-card ${paymentMethod === 'whatsapp' ? 'active-border-wa' : ''}`}
                      onClick={() => setPaymentMethod('whatsapp')}
                    >
                      <div className="interactive-card-top">
                        <span className="payment-brand-badge wa">WHATSAPP OFICIAL</span>
                        {paymentMethod === 'whatsapp' && <Check size={14} className="check-glow" />}
                      </div>
                      <div className="interactive-card-title">WhatsApp / Pedido Directo</div>
                      <div className="interactive-card-detail">+240 222 633 687</div>
                    </div>
                  </div>
                </div>

                {/* Muni Dinero Direct Number Panel */}
                {paymentMethod === 'muni' && (
                  <div className="futuristic-muni-card glass-panel">
                    <div className="muni-header-row">
                      <Smartphone size={18} color="#002060" />
                      <div>
                        <strong style={{ fontSize: '0.86rem', color: '#002060' }}>Pago Muni Dinero</strong>
                        <p style={{ margin: 0, fontSize: '0.76rem', color: '#64748B' }}>Número de abono: <strong>555439904</strong></p>
                      </div>
                    </div>

                    <div className="muni-number-box">
                      <span className="muni-number-val">555439904</span>
                      <button 
                        type="button" 
                        className="btn-copy-muni"
                        onClick={handleCopyMuni}
                      >
                        {copiedMuni ? <><Check size={13} /> ¡Copiado!</> : <><Copy size={13} /> Copiar 555439904</>}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-details">
              <div className="summary-row">
                <span>Subtotal ({totalItemsCount} prendas)</span>
                <span className="summary-value">{formatPrice(subtotalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>Envío ({shippingType === 'express' ? 'Express 3 días' : 'Estándar 5-7 días'})</span>
                <span className="summary-value">{shippingCost > 0 ? formatPrice(shippingCost) : 'Gratis'}</span>
              </div>
              <div className="summary-row grand-total-row">
                <span>Total a Pagar</span>
                <span className="grand-total-price">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="cart-value-props">
              <div><Truck size={14} color="#25D366" /> <span>{shippingType === 'express' ? 'Entrega Garantizada en 3 Días' : 'Entrega en 5-7 días'}</span></div>
              <div><ShieldCheck size={14} color="#D81B60" /> <span>Garantía de Calidad EBNA</span></div>
            </div>

            {paymentMethod === 'muni' ? (
              <button 
                type="button"
                className="btn-muni-navy-3d"
                onClick={handleCheckout}
                style={{ width: '100%', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <PhoneCall size={20} />
                <span>Pagar con Muni Dinero (555439904) • {formatPrice(grandTotal)}</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="wa-checkout-btn" 
                onClick={handleCheckout}
              >
                <span>Pagar por WhatsApp (+240 222 633 687)</span>
                <ArrowRight size={18} />
              </button>
            )}

            <button className="cart-clear-link" onClick={clearCart}>
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>

      {/* Digital Pending Order Receipt Modal */}
      <OrderReceiptModal 
        order={receiptOrder} 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)} 
      />
    </div>
  );
};
