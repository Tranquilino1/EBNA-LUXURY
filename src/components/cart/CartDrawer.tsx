import React, { useState } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Trash2, ShieldCheck, Truck, 
  MapPin, Smartphone, User, Phone, AlertCircle, MessageCircle 
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

  const [isProcessing, setIsProcessing] = useState(false);

  // Digital Pending Order Receipt State
  const [receiptOrder, setReceiptOrder] = useState<OrderReceiptData | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  if (!isCartOpen) return null;

  const grandTotal = subtotalPrice;

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

  const handleDirectTicketCheckout = async (method: 'whatsapp' | 'muni') => {
    if (cartItems.length === 0) return;

    const trimmedName = customerName.trim() || 'Cliente VIP';
    const cleanPhone = customerPhone.trim() || '240222633687';
    const trimmedAddress = customerAddress.trim() || 'Malabo / Entrega Directa';

    try {
      if (customerName.trim()) localStorage.setItem('ebna_client_name', customerName.trim());
      if (customerPhone.trim()) localStorage.setItem('ebna_client_phone', customerPhone.trim());
      if (customerAddress.trim()) localStorage.setItem('ebna_client_address', customerAddress.trim());
    } catch {}

    setIsProcessing(true);

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
      customerPhone: cleanPhone,
      customerAddress: trimmedAddress,
      region: 'insular',
      shippingType: 'normal',
      paymentMethod: method,
      items: receiptItems,
      subtotal: subtotalPrice,
      shippingCost: 0,
      total: grandTotal,
      status: 'PENDIENTE'
    };

    saveOrderRequest(orderData);
    setReceiptOrder(orderData);
    setIsReceiptOpen(true);

    // Automatically trigger high-resolution PNG ticket download
    try {
      await downloadReceiptAsPng(orderData, 'haute-couture');
    } catch (err) {
      console.warn('Auto download receipt PNG error:', err);
    } finally {
      setIsProcessing(false);
    }

    if (method === 'muni') {
      try {
        navigator.clipboard.writeText('555439904');
      } catch {}
    }

    const waUrl = buildReceiptWhatsAppUrl(orderData);
    window.open(waUrl, '_blank');
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

              {/* SIMPLIFIED ORDER & DELIVERY INFORMATION FORM */}
              <div className="futuristic-checkout-section" style={{ marginTop: '1rem', paddingTop: '1rem' }}>
                <div className="futuristic-card delivery-info-box">
                  <div className="futuristic-card-header">
                    <div className="header-icon-box">
                      <User size={16} color="#D81B60" />
                    </div>
                    <div>
                      <h4 className="futuristic-card-title">Datos para tu Ticket Oficial</h4>
                      <p className="futuristic-card-subtitle">Descarga inmediata en archivo PNG y envío a WhatsApp</p>
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
                          placeholder="Ej. Sindy Eyenga"
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
                          placeholder="+240 222 633 687"
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
                          placeholder="Ej. Malabo II, Caracolas o Ela Nguema"
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
                <span>Envío Inmediato</span>
                <span className="summary-value" style={{ color: '#16a34a', fontWeight: 700 }}>Gratis</span>
              </div>
              <div className="summary-row grand-total-row">
                <span>Total a Pagar</span>
                <span className="grand-total-price">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="cart-value-props">
              <div><Truck size={14} color="#25D366" /> <span>Entrega Inmediata en Malabo y Bata</span></div>
              <div><ShieldCheck size={14} color="#D81B60" /> <span>Ticket Oficial con Foto y Detalle</span></div>
            </div>

            {/* ONLY TWO PAYMENT OPTIONS AS SPECIFIED BY USER */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              {/* Option 1: Pagar por WhatsApp */}
              <button 
                type="button" 
                className="wa-checkout-btn" 
                onClick={() => handleDirectTicketCheckout('whatsapp')}
                disabled={isProcessing}
                style={{ width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <MessageCircle size={19} />
                <span>{isProcessing ? 'Generando Ticket...' : 'Pagar por WhatsApp (Descargar Ticket PNG)'}</span>
              </button>

              {/* Option 2: Pagar con Muni Dinero (555439904) */}
              <button 
                type="button"
                className="btn-muni-navy-3d"
                onClick={() => handleDirectTicketCheckout('muni')}
                disabled={isProcessing}
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

      {/* Digital Pending Order Receipt Modal */}
      <OrderReceiptModal 
        order={receiptOrder} 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)} 
      />
    </div>
  );
};
