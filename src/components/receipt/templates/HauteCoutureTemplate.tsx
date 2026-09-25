import React from 'react';
import type { OrderReceiptData } from '../../../types';
import { formatPrice } from '../../../lib/utils';
import { Sparkles, MapPin, Phone, User, Clock, ShieldCheck, ShoppingBag } from 'lucide-react';

interface HauteCoutureTemplateProps {
  order: OrderReceiptData;
}

export const HauteCoutureTemplate: React.FC<HauteCoutureTemplateProps> = ({ order }) => {
  const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="receipt-card-haute-couture" id="ebna-receipt-card">
      <div className="receipt-watermark-seal"></div>

      {/* Header */}
      <div className="receipt-header">
        <div className="receipt-brand-logo">
          <img 
            src="/icons/ebna-logo-white.png" 
            alt="EBNA Crest" 
            className="receipt-crest-img"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }} 
          />
          <h2 className="receipt-brand-title">SINDY LUXURY</h2>
        </div>
        <p className="receipt-brand-subtitle">Haute Couture & Boutique VIP • Malabo & Bata</p>

        <div className="receipt-order-badge-row">
          <span className="receipt-folio-tag">
            <Sparkles size={13} /> FOLIO: #{order.orderNumber}
          </span>
          <span className="receipt-status-pill">
            <span className="status-pulse-dot"></span>
            PEDIDO PENDIENTE DE RECEPCIÓN
          </span>
        </div>

        <div className="receipt-date-text">
          <Clock size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
          Emitido el {order.createdAt} • Guinea Ecuatorial
        </div>
      </div>

      {/* Customer & Shipping Dossier */}
      <div className="receipt-dossier-box">
        <div className="dossier-title">
          <User size={14} /> Expediente de Entrega y Destinatario
        </div>
        <div className="dossier-grid">
          <div className="dossier-item">
            <span className="dossier-label">Destinatario VIP</span>
            <span className="dossier-val">{order.customerName}</span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Teléfono / WhatsApp</span>
            <span className="dossier-val">
              <Phone size={11} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
              {order.customerPhone || 'Pendiente de confirmación'}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Dirección / Barrio</span>
            <span className="dossier-val">
              <MapPin size={11} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
              {order.customerAddress}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Región y Modalidad</span>
            <span className="dossier-val highlight">
              {order.region === 'insular' ? '🏝️ Bioko (Malabo)' : '🌍 Litoral (Bata)'} • {order.shippingType === 'express' ? '⚡ Express 3D' : '📦 Normal 5-7d'}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Método de Pago</span>
            <span className="dossier-val">
              {order.paymentMethod === 'muni' ? '📲 Muni Dinero (555439904)' : '💬 WhatsApp Oficial (+240 555 633 687)'}
            </span>
          </div>
        </div>
      </div>

      {/* Items Gallery with HD Thumbnails & Quantities */}
      <div className="receipt-items-section">
        <div className="receipt-items-header">
          <span className="receipt-items-title">
            <ShoppingBag size={14} color="#D81B60" /> Prendas y Artículos Reservados
          </span>
          <span className="receipt-items-count-badge">
            {totalUnits} {totalUnits === 1 ? 'artículo' : 'artículos'}
          </span>
        </div>

        <div className="receipt-items-list">
          {order.items.map((item) => {
            const itemTotal = item.price * item.quantity;
            const itemImgSrc = item.image ? item.image.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo-white.png';
            return (
              <div key={item.id} className="receipt-item-row">
                <div className="receipt-item-thumb-wrapper">
                  <img 
                    src={itemImgSrc} 
                    alt={item.name} 
                    className="receipt-item-thumb-img"
                    onError={(e) => {
                      e.currentTarget.src = '/icons/ebna-logo-white.png';
                    }} 
                  />
                  <span className="thumb-qty-badge">x{item.quantity}</span>
                </div>

                <div className="receipt-item-info">
                  <h4 className="receipt-item-name" title={item.name}>{item.name}</h4>
                  <div className="receipt-item-meta">
                    {item.selectedSize && (
                      <span className="receipt-meta-pill">Talla: {item.selectedSize}</span>
                    )}
                    {item.selectedColor && item.selectedColor !== 'Original' && (
                      <span className="receipt-meta-pill">Color: {item.selectedColor}</span>
                    )}
                    <span className="receipt-unit-price">{formatPrice(item.price)} c/u</span>
                  </div>
                </div>

                <div className="receipt-item-price-col">
                  <div className="receipt-line-total">{formatPrice(itemTotal)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Accounting Box */}
      <div className="receipt-totals-box">
        <div className="receipt-total-row">
          <span>Subtotal de Prendas ({totalUnits} uds)</span>
          <span style={{ fontWeight: 700, color: '#1E293B' }}>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="receipt-total-row">
          <span>
            Tarifa de Envío ({order.shippingType === 'express' ? 'Express 3 Días Garantizado' : 'Estándar 5 a 7 Días'})
          </span>
          <span style={{ fontWeight: 700, color: order.shippingCost > 0 ? '#D81B60' : '#10B981' }}>
            {order.shippingCost > 0 ? formatPrice(order.shippingCost) : 'Gratis'}
          </span>
        </div>

        <div className="receipt-grand-total-row">
          <div>
            <div className="grand-total-label">Gran Total a Pagar</div>
            <div style={{ fontSize: '0.72rem', color: '#786670', textTransform: 'uppercase' }}>Moneda Oficial Francos CFA (XAF)</div>
          </div>
          <div className="grand-total-amount">{formatPrice(order.total)}</div>
        </div>
      </div>

      {/* Security Footer & Barcode */}
      <div className="receipt-security-footer">
        <div className="security-barcode-container">
          <div className="security-barcode-stripes">
            {[4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 2, 4, 6, 2, 8, 4, 2, 4, 6, 2, 4, 2, 8, 4, 2, 6, 4, 2, 6].map((w, idx) => (
              <div 
                key={idx} 
                className="barcode-stripe" 
                style={{ width: `${w}px`, opacity: idx % 3 === 0 ? 0.75 : 1 }}
              />
            ))}
          </div>
          <div className="security-serial-code">EBNA-SEC-{order.orderNumber}-XAF</div>
        </div>

        <div className="security-guarantee-note">
          <ShieldCheck size={14} color="#D81B60" />
          <span>Comprobante digital verificado por EBNA Luxury • Garantía de autenticidad en Malabo y Bata</span>
        </div>
      </div>
    </div>
  );
};
