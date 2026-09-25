import React, { useState } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Trash2, ShieldCheck, Truck, 
  MapPin, Smartphone, User, Phone, AlertCircle 
} from 'lucide-react';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import { recordProductOrder } from '../../lib/popularityTracker';
import { TicketProcessingModal } from '../receipt/TicketProcessingModal';
import { saveOrderRequest } from '../../lib/orderStorage';
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

  // Shipping selection: Estándar (5-7 días, Gratis) vs Express (máx. 3 días, 3.000 FCFA)
  const [shippingType, setShippingType] = useState<'normal' | 'express'>('normal');
  const shippingCost = shippingType === 'express' ? 3000 : 0;
  const grandTotal = subtotalPrice + shippingCost;

  // Automated Ticket Processing State
  const [pendingOrder, setPendingOrder] = useState<OrderReceiptData | null>(null);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);

  if (!isCartOpen) return null;

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

  const handleStartOrderProcess = (method: 'whatsapp' | 'muni') => {
    if (cartItems.length === 0) return;

    const trimmedName = customerName.trim();
    const cleanPhone = customerPhone.trim();
    const trimmedAddress = customerAddress.trim();

    if (!trimmedName || !cleanPhone) {
      setValidationError('Por favor ingresa tu nombre y teléfono móvil para procesar tu pedido oficial.');
      return;
    }

    try {
      localStorage.setItem('ebna_client_name', trimmedName);
      localStorage.setItem('ebna_client_phone', cleanPhone);
      if (trimmedAddress) localStorage.setItem('ebna_client_address', trimmedAddress);
    } catch {}

    const receiptItems: ReceiptItem[] = cartItems.map(item => {
      recordProductOrder(item.product.id);
      const imgCandidate = item.product.images?.primary || (Array.isArray(item.product.images) ? item.product.images[0] : (item.product.images as any)?.[0]);
      const rawImg = typeof imgCandidate === 'string' ? imgCandidate.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo-white.png';
      return {
        id: item.cartItemId,
        name: item.product.name,
        category: item.product.category,
        description: item.product.description,
        price: item.product.priceFCFA || item.product.price || 0,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        image: rawImg || '/icons/ebna-logo-white.png',
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
      customerPhone: cleanPhone,
      customerAddress: trimmedAddress || 'Malabo / Bata',
      region: 'insular',
      shippingType,
      paymentMethod: method,
      items: receiptItems,
      subtotal: subtotalPrice,
      shippingCost,
      total: grandTotal,
      status: 'PENDIENTE'
    };

    saveOrderRequest(orderData);
    setPendingOrder(orderData);
    setIsProcessingModalOpen(true);
  };

  const handleOrderConfirmed = () => {
    clearCart();
    setIsCartOpen(false);
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
          <button 
            type="button" 
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar Carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-cart-icon-circle">
                <ShoppingBag size={42} color="#D81B60" style={{ opacity: 0.6 }} />
              </div>
              <h4 className="empty-cart-title">Tu bolsa está vacía</h4>
              <p className="empty-cart-desc">Explora nuestras colecciones exclusivas de vestidos, moda y calzado de alta costura.</p>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => setIsCartOpen(false)}
                style={{ marginTop: '1.2rem', padding: '12px 24px', borderRadius: '30px' }}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {/* Product Items List */}
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const price = item.product.priceFCFA || item.product.price || 0;
                  const itemSubtotal = price * item.quantity;
                  const rawItemImg = item.product.images?.primary || (Array.isArray(item.product.images) ? item.product.images[0] : '/icons/ebna-logo-white.png');
                  const itemImg = typeof rawItemImg === 'string' ? rawItemImg.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo-white.png';

                  return (
                    <div key={item.cartItemId} className="cart-item-card">
                      <div className="cart-item-img-container">
                        <img 
                          src={itemImg} 
                          alt={item.product.name} 
                          className="cart-item-img"
                          onError={(e) => {
                            e.currentTarget.src = '/icons/ebna-logo-white.png';
                          }}
                        />
                      </div>
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.product.name}</h4>
                        
                        <div className="cart-item-variants">
                          {item.selectedSize && (
                            <span className="cart-variant-tag">Talla: {item.selectedSize}</span>
                          )}
                          {item.selectedColor && (
                            <span className="cart-variant-tag">Color: {item.selectedColor}</span>
                          )}
                        </div>

                        <div className="cart-item-pricing">
                          <span className="cart-item-unit-price">{formatPrice(price)} c/u</span>
                          <span className="cart-item-subtotal">{formatPrice(itemSubtotal)}</span>
                        </div>

                        <div className="cart-item-bottom-controls">
                          <div className="cart-qty-pill">
                            <button 
                              type="button"
                              className="qty-pill-btn"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              title="Restar una unidad"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="qty-pill-count">{item.quantity}</span>
                            <button 
                              type="button"
                              className="qty-pill-btn"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              title="Añadir una unidad"
                            >
                              <Plus size={13} />
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

              {/* SIMPLIFIED ORDER & DELIVERY INFORMATION FORM */}
              <div className="futuristic-checkout-section" style={{ marginTop: '1rem', paddingTop: '1rem' }}>
                <div className="futuristic-card delivery-info-box">
                  <div className="futuristic-card-header">
                    <div className="header-icon-box">
                      <User size={16} color="#D81B60" />
                    </div>
                    <div>
                      <h4 className="futuristic-card-title">Datos para tu Ticket Oficial</h4>
                      <p className="futuristic-card-subtitle">Descarga silenciosa automática y confirmación directa</p>
                    </div>
                  </div>

                  <div className="futuristic-inputs-grid">
                    <div className="futuristic-input-field">
                      <label className="futuristic-label">Nombre y Apellidos</label>
                      <div className="futuristic-input-wrap">
                        <User size={15} className="input-icon" />
                        <input 
                          type="text" 
                          value={customerName} 
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="Tu nombre y apellidos"
                          className="futuristic-input"
                        />
                      </div>
                    </div>

                    <div className="futuristic-input-field">
                      <label className="futuristic-label">Teléfono / WhatsApp</label>
                      <div className="futuristic-input-wrap">
                        <Phone size={15} className="input-icon" />
                        <input 
                          type="tel" 
                          value={customerPhone} 
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="Tu teléfono de contacto"
                          className="futuristic-input"
                        />
                      </div>
                    </div>

                    <div className="futuristic-input-field full-width">
                      <label className="futuristic-label">Dirección / Barrio de Entrega</label>
                      <div className="futuristic-input-wrap">
                        <MapPin size={15} className="input-icon" />
                        <input 
                          type="text" 
                          value={customerAddress} 
                          onChange={(e) => handleAddressChange(e.target.value)}
                          placeholder="Tu barrio o ciudad (ej. Malabo, Bata...)"
                          className="futuristic-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PANEL EXCLUSIVO DE MODALIDAD DE ENVÍO */}
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(216, 27, 96, 0.12)' }}>
                    <label className="futuristic-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Truck size={15} color="#D81B60" />
                      <span>Modalidad de Envío</span>
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {/* Opción 1: Envío Normal - Azul Animado Elegante y Simple */}
                      <button
                        type="button"
                        onClick={() => setShippingType('normal')}
                        className={shippingType === 'normal' ? 'shipping-btn-normal-active' : 'shipping-btn-normal-inactive'}
                        style={{
                          padding: '11px 12px',
                          borderRadius: '16px',
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '-0.01em' }}>
                            Envío Normal
                          </span>
                          <span style={{ 
                            fontSize: '0.72rem', 
                            fontWeight: 900, 
                            color: shippingType === 'normal' ? '#FFFFFF' : '#1D4ED8', 
                            background: shippingType === 'normal' ? 'rgba(255, 255, 255, 0.22)' : 'rgba(37, 99, 235, 0.12)', 
                            padding: '2px 7px', 
                            borderRadius: '10px' 
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
                          padding: '11px 12px',
                          borderRadius: '16px',
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ 
                            fontWeight: 900, 
                            fontSize: '0.85rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '3px',
                            color: shippingType === 'express' ? '#FFFFFF' : '#92400E',
                            textShadow: shippingType === 'express' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                          }}>
                            ⚡ Envío Exprés
                          </span>
                          <span style={{ 
                            fontSize: '0.72rem', 
                            fontWeight: 900, 
                            color: shippingType === 'express' ? '#78350F' : '#B45309', 
                            background: shippingType === 'express' ? '#FDE68A' : 'rgba(245, 158, 11, 0.2)', 
                            padding: '2px 7px', 
                            borderRadius: '10px',
                            boxShadow: shippingType === 'express' ? '0 1px 3px rgba(0,0,0,0.15)' : 'none'
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

                  {validationError && (
                    <div className="futuristic-alert-banner" style={{ marginTop: '12px' }}>
                      <AlertCircle size={15} color="#EF4444" />
                      <span>{validationError}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & THE TWO PAYMENT OPTIONS */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-details">
              <div className="summary-row">
                <span>Subtotal ({totalItemsCount} prendas)</span>
                <span className="summary-value">{formatPrice(subtotalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>Modalidad de Envío</span>
                <span className="summary-value" style={{ color: shippingType === 'express' ? '#D81B60' : '#16a34a', fontWeight: 700 }}>
                  {shippingType === 'express' ? 'Express 3 Días (+3.000 FCFA)' : 'Estándar Gratis (5-7 días)'}
                </span>
              </div>
              <div className="summary-row grand-total-row">
                <span>Total a Pagar</span>
                <span className="grand-total-price">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="cart-value-props">
              <div><Truck size={14} color="#25D366" /> <span>{shippingType === 'express' ? 'Envío Express Prioritario (Máx. 3 Días)' : 'Entrega Estándar en Malabo y Bata'}</span></div>
              <div><ShieldCheck size={14} color="#D81B60" /> <span>Ticket Oficial con Descarga Automática</span></div>
            </div>

            {/* ONLY TWO PAYMENT OPTIONS AS SPECIFIED BY USER */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              {/* Option 1: Pagar por WhatsApp (Genera ticket automático con barra de proceso) */}
              <button 
                type="button" 
                className="wa-checkout-btn" 
                onClick={() => handleStartOrderProcess('whatsapp')}
                style={{ width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <WhatsAppIcon size={20} color="white" />
                <span>Pedir por WhatsApp (Generar Ticket)</span>
              </button>

              {/* Option 2: Pagar con Muni Dinero (555439904) */}
              <button 
                type="button"
                className="btn-muni-navy-3d"
                onClick={() => handleStartOrderProcess('muni')}
                style={{ width: '100%', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <Smartphone size={19} color="#60A5FA" />
                <span>Pagar con Muni Dinero (555439904)</span>
              </button>
            </div>

            <button className="cart-clear-link" onClick={clearCart} style={{ marginTop: '8px' }}>
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>

      {/* Automated Ticket Processing Modal with smooth progress bar & confirmation */}
      <TicketProcessingModal
        isOpen={isProcessingModalOpen}
        order={pendingOrder}
        onClose={() => setIsProcessingModalOpen(false)}
        onConfirmed={handleOrderConfirmed}
      />
    </div>
  );
};
