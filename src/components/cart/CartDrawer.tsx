import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Copy, Check, CreditCard, MapPin, PhoneCall, Zap, Globe, Smartphone, Package } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import { recordProductOrder } from '../../lib/popularityTracker';
import './cart.css';

const PRIMARY_PHONE = '240222633687'; // WhatsApp principal EBNA
const MUNI_PHONE = '240555439904';    // Número oficial Muni Dinero (+240 555 439 904)

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, totalItemsCount, subtotalPrice } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'muni'>('muni');
  const [region, setRegion] = useState<'insular' | 'continental'>('insular');
  const [shippingType, setShippingType] = useState<'normal' | 'express'>('normal');
  const [copiedMuni, setCopiedMuni] = useState(false);

  if (!isCartOpen) return null;

  // Shipping calculation
  const shippingCost = shippingType === 'express' ? 1000 : 0;
  const grandTotal = subtotalPrice + shippingCost;

  const handleCopyMuni = () => {
    navigator.clipboard.writeText('555439904');
    setCopiedMuni(true);
    setTimeout(() => setCopiedMuni(false), 2500);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsListText = '';
    cartItems.forEach((item, index) => {
      recordProductOrder(item.product.id);
      const itemSubtotal = item.product.price * item.quantity;
      itemsListText += `\n${index + 1}. *${item.product.name}*
   • Cantidad: ${item.quantity} unidad(es)
   • Talla: ${item.selectedSize} | Color: ${item.selectedColor}
   • Subtotal: ${formatPrice(itemSubtotal)}\n`;
    });

    const regionText = region === 'insular' ? 'Región Insular (Malabo / Isla Bioko)' : 'Región Continental (Bata y provincias)';
    const shippingText = shippingType === 'express' 
      ? 'Envío Express (Entrega en 3 días) [+1.000 FCFA]' 
      : 'Envío Normal (Entrega de 5 días a 1 semana) [Gratis]';

    const paymentText = paymentMethod === 'muni' 
      ? 'PAGO CON MUNI DINERO (USSD *423*2*1*555439904# / Giro al 555439904)' 
      : 'PAGO POR WHATSAPP / EFECTIVO CONTRA ENTREGA';

    const message = `¡Hola EBNA Luxury! 👋 Deseo confirmar este pedido desde la boutique web:

${itemsListText}
----------------------------------------
💰 Subtotal Productos: ${formatPrice(subtotalPrice)}
📍 Región: ${regionText}
🚚 Opción de Envío: ${shippingText}
💳 Método de Pago: ${paymentText}
💵 *TOTAL A PAGAR: ${formatPrice(grandTotal)}*
----------------------------------------
${paymentMethod === 'muni' ? '📌 Comprobante/Giro de Muni Dinero (+240 555 439 904).' : ''}
¿Me confirman recepción y horario exacto de entrega?`;

    const targetPhone = paymentMethod === 'muni' ? MUNI_PHONE : PRIMARY_PHONE;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${targetPhone}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="cart-icon-wrapper">
              <ShoppingBag size={20} color="#D81B60" />
            </div>
            <div>
              <h3 className="cart-title">Tu Carrito de Compras</h3>
              <p className="cart-subtitle">{totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'} seleccionados</p>
            </div>
          </div>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)} aria-label="Cerrar Carrito">
            <X size={20} />
          </button>
        </div>

        {/* Items List & Options */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <ShoppingBag size={48} color="#D81B60" />
              </div>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1E293B', marginBottom: '0.4rem' }}>
                Tu carrito está vacío
              </p>
              <p style={{ fontSize: '0.88rem', color: '#64748B', maxWidth: '240px', margin: '0 auto 1.5rem auto' }}>
                Explora nuestras colecciones exclusivas de ropa, perfumería y cosmética.
              </p>
              <button className="btn-primary" onClick={() => setIsCartOpen(false)} style={{ borderRadius: '30px', padding: '10px 24px' }}>
                Ver Catálogo EBNA
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const priceVal = item.product.priceFCFA || item.product.price || 0;
                  const itemTotal = priceVal * item.quantity;
                  const itemImg = item.product.images?.primary || (Array.isArray(item.product.images) ? item.product.images[0] : '/icons/ebna-logo.png');
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
                        
                        <div className="cart-item-options">
                          <span>Talla: <strong>{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span>Color: <strong>{item.selectedColor}</strong></span>
                        </div>

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

              {/* Region & Shipping Options */}
              <div className="checkout-options-section">
                <h4 className="options-section-title"><MapPin size={16} color="#D81B60" /> Región de Entrega</h4>
                <div className="option-pills-row">
                  <button 
                    type="button" 
                    className={`option-pill-btn ${region === 'insular' ? 'active' : ''}`}
                    onClick={() => setRegion('insular')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Globe size={14} /> Región Insular (Malabo)
                  </button>
                  <button 
                    type="button" 
                    className={`option-pill-btn ${region === 'continental' ? 'active' : ''}`}
                    onClick={() => setRegion('continental')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <MapPin size={14} /> Región Continental (Bata)
                  </button>
                </div>

                <h4 className="options-section-title" style={{ marginTop: '1rem' }}><Truck size={16} color="#D81B60" /> Modalidad de Envío</h4>
                <div className="shipping-cards-grid">
                  <div 
                    className={`shipping-card ${shippingType === 'normal' ? 'selected' : ''}`}
                    onClick={() => setShippingType('normal')}
                  >
                    <div className="shipping-card-header">
                      <span className="shipping-badge normal" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Package size={14} /> Envío Normal
                      </span>
                      <span className="shipping-price">Gratis</span>
                    </div>
                    <p className="shipping-desc">Plazo de entrega de <strong>5 días a 1 semana</strong>.</p>
                  </div>

                  <div 
                    className={`shipping-card ${shippingType === 'express' ? 'selected' : ''}`}
                    onClick={() => setShippingType('express')}
                  >
                    <div className="shipping-card-header">
                      <span className="shipping-badge express" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Zap size={14} /> Envío Express
                      </span>
                      <span className="shipping-price">+1.000 FCFA</span>
                    </div>
                    <p className="shipping-desc">Entrega rápida en <strong>3 días</strong>.</p>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <h4 className="options-section-title" style={{ marginTop: '1rem' }}><CreditCard size={16} color="#D81B60" /> Método de Pago</h4>
                <div className="payment-methods-grid">
                  <div 
                    className={`payment-method-card muni-style ${paymentMethod === 'muni' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('muni')}
                  >
                    <div className="payment-card-badge">MUNI DINERO</div>
                    <div className="payment-card-content">
                      <div className="payment-title">Pagar con Muni Dinero</div>
                      <div className="payment-subtitle">+240 555 439 904</div>
                    </div>
                  </div>

                  <div 
                    className={`payment-method-card wa-style ${paymentMethod === 'whatsapp' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('whatsapp')}
                  >
                    <div className="payment-card-badge wa">WHATSAPP / CASH</div>
                    <div className="payment-card-content">
                      <div className="payment-title">WhatsApp / Efectivo</div>
                      <div className="payment-subtitle">+240 222 633 687</div>
                    </div>
                  </div>
                </div>

                {/* Muni Dinero Transfer Box Instructions */}
                {paymentMethod === 'muni' && (
                  <div className="muni-transfer-box glass-panel">
                    <div className="muni-box-header">
                      <Smartphone size={20} color="#002060" />
                      <div>
                        <strong>Transferencia Muni Dinero Directa</strong>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Código USSD rápido: <strong>*423*2*1*555439904#</strong></p>
                      </div>
                    </div>
                    
                    <div className="muni-number-row">
                      <span className="muni-number-text">+240 555 439 904</span>
                      <button 
                        type="button" 
                        className="btn-copy-muni" 
                        onClick={handleCopyMuni}
                        title="Copiar número para Muni Dinero"
                      >
                        {copiedMuni ? <><Check size={14} /> ¡Copiado!</> : <><Copy size={14} /> Copiar 555439904</>}
                      </button>
                    </div>

                    {/* 3D Navy Blue USSD Execution Link */}
                    <a 
                      href="tel:*423*2*1*555439904%23"
                      className="btn-muni-navy-3d"
                      onClick={() => {
                        try { navigator.clipboard.writeText('*423*2*1*555439904#'); } catch(e){}
                      }}
                      style={{ marginTop: '0.8rem', marginBottom: '0.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Ejecutar transferencia directa Muni en tu móvil"
                    >
                      <PhoneCall size={20} />
                      <span>Ejecutar USSD Muni</span>
                      <span className="ussd-code-badge">*423*2*1*555439904#</span>
                    </a>
                    
                    <p className="muni-instructions">
                      Haz clic en el botón Azul Marino para procesar el giro directo al <strong>555439904</strong> por la red Muni.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-details">
              <div className="summary-row">
                <span>Subtotal Productos</span>
                <span className="summary-value">{formatPrice(subtotalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>Envío ({shippingType === 'express' ? 'Express 3 días' : 'Normal 5-7 días'})</span>
                <span className="summary-value">{shippingCost > 0 ? formatPrice(shippingCost) : 'Gratis'}</span>
              </div>
              <div className="summary-row grand-total-row">
                <span>Total Final</span>
                <span className="grand-total-price">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="cart-value-props">
              <div><Truck size={14} color="#25D366" /> <span>{shippingType === 'express' ? 'Entrega en 3 Días' : 'Entrega 5-7 días'}</span></div>
              <div><ShieldCheck size={14} color="#D81B60" /> <span>Garantía EBNA Luxury</span></div>
            </div>

            {paymentMethod === 'muni' ? (
              <a 
                href="tel:*423*2*1*555439904%23"
                className="btn-muni-navy-3d"
                onClick={() => {
                  try { navigator.clipboard.writeText('*423*2*1*555439904#'); } catch(e){}
                  setTimeout(() => handleCheckout(), 1500);
                }}
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <PhoneCall size={20} />
                <span>Pagar con Muni Dinero (*423*2*1*555439904#)</span>
              </a>
            ) : (
              <button 
                className="wa-checkout-btn" 
                onClick={handleCheckout}
              >
                <span>Realizar Pedido por WhatsApp</span>
                <ArrowRight size={18} />
              </button>
            )}

            <button className="cart-clear-link" onClick={clearCart}>
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


