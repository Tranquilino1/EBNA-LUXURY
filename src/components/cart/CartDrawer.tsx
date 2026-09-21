import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import './cart.css';

const PRIMARY_PHONE = '240222633687';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, totalItemsCount, subtotalPrice } = useCart();

  if (!isCartOpen) return null;

  const estimatedShipping = cartItems.length > 0 ? 1500 : 0; // 1,500 FCFA estimated delivery in Malabo/Bata
  const grandTotal = subtotalPrice + estimatedShipping;

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsListText = '';
    cartItems.forEach((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      itemsListText += `\n${index + 1}. *${item.product.name}*
   • Cantidad: ${item.quantity} unidad(es)
   • Talla: ${item.selectedSize} | Color: ${item.selectedColor}
   • Subtotal: ${formatPrice(itemSubtotal)}\n`;
    });

    const message = `¡Hola EBNA Luxury! 👋 Deseo realizar este pedido desde la página web:

${itemsListText}
----------------------------------------
💰 Subtotal Productos: ${formatPrice(subtotalPrice)}
🚚 Envío Estimado: ${formatPrice(estimatedShipping)}
💵 *TOTAL A PAGAR: ${formatPrice(grandTotal)}*

¿Me confirman horario de entrega y método de pago en Guinea Ecuatorial?`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${PRIMARY_PHONE}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="cart-icon-wrapper">
              <ShoppingBag size={20} color="#E05A88" />
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

        {/* Items List */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <ShoppingBag size={48} color="#D4A4B8" />
              </div>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#23191E', marginBottom: '0.4rem' }}>
                Tu carrito está vacío
              </p>
              <p style={{ fontSize: '0.88rem', color: '#6E5B65', maxWidth: '240px', margin: '0 auto 1.5rem auto' }}>
                Explora nuestras colecciones exclusivas de ropa, perfumes y cosmética.
              </p>
              <button className="btn-primary" onClick={() => setIsCartOpen(false)} style={{ borderRadius: '30px', padding: '10px 24px' }}>
                Ver Catálogo EBNA
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div key={item.cartItemId} className="cart-item-card glass-card">
                    <img 
                      src={item.product.images?.[0] || '/icons/ebna-logo.png'} 
                      alt={item.product.name} 
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <h4 className="cart-item-name" title={item.product.name}>{item.product.name}</h4>
                      
                      <div className="cart-item-options">
                        <span>Talla: <strong>{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Color: <strong>{item.selectedColor}</strong></span>
                      </div>

                      <div className="cart-item-price-row">
                        <span className="cart-item-unit-price">{formatPrice(item.product.price)} c/u</span>
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
                <span>Envío Local Estimado</span>
                <span className="summary-value">{formatPrice(estimatedShipping)}</span>
              </div>
              <div className="summary-row grand-total-row">
                <span>Total Estimado</span>
                <span className="grand-total-price">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="cart-value-props">
              <div><Truck size={14} color="#25D366" /> <span>Entrega en Guinea Ecuatorial</span></div>
              <div><ShieldCheck size={14} color="#E05A88" /> <span>Garantía de Autenticidad</span></div>
            </div>

            <button className="wa-checkout-btn" onClick={handleWhatsAppCheckout}>
              <span>Realizar Pedido por WhatsApp</span>
              <ArrowRight size={18} />
            </button>

            <button className="cart-clear-link" onClick={clearCart}>
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
