import React from 'react';
import type { OrderReceiptData } from '../../../types';
import { formatPrice } from '../../../lib/utils';
import { Zap, ShieldCheck, MapPin, Phone, User, Clock, ShoppingBag } from 'lucide-react';

interface ObsidianGoldTemplateProps {
  order: OrderReceiptData;
}

export const ObsidianGoldTemplate: React.FC<ObsidianGoldTemplateProps> = ({ order }) => {
  const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="receipt-card-obsidian-gold" id="ebna-receipt-card">
      {/* Top Smart Chip & VIP Status */}
      <div className="fintech-chip-row">
        <div className="fintech-emv-chip"></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: '#D4AF37', fontWeight: 800 }}>EBNA VIP BLACK</span>
          <span style={{ background: 'rgba(212, 175, 55, 0.2)', border: '1px solid #D4AF37', width: '8px', height: '8px', borderRadius: '50%' }}></span>
        </div>
      </div>

      {/* Header */}
      <div className="receipt-header" style={{ borderBottomColor: 'rgba(212, 175, 55, 0.4)' }}>
        <h2 className="receipt-brand-title">SINDY LUXURY</h2>
        <p className="receipt-brand-subtitle" style={{ color: '#D4AF37' }}>
          Haute Couture • Digital Order Pass
        </p>

        <div className="receipt-order-badge-row">
          <span className="receipt-folio-tag">
            <Zap size={13} /> FOLIO: #{order.orderNumber}
          </span>
          <span className="receipt-status-pill" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#FBBF24', borderColor: '#F59E0B' }}>
            <span className="status-pulse-dot" style={{ background: '#FBBF24', boxShadow: '0 0 8px #FBBF24' }}></span>
            PENDIENTE DE RECEPCIÓN
          </span>
        </div>

        <div className="receipt-date-text" style={{ color: '#94A3B8' }}>
          <Clock size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
          {order.createdAt} • Malabo / Bata
        </div>
      </div>

      {/* Customer & Shipping Dossier */}
      <div className="receipt-dossier-box">
        <div className="dossier-title" style={{ color: '#ECC874' }}>
          <User size={14} /> Titular y Destino de Entrega
        </div>
        <div className="dossier-grid">
          <div className="dossier-item">
            <span className="dossier-label" style={{ color: '#94A3B8' }}>Cliente VIP</span>
            <span className="dossier-val">{order.customerName}</span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label" style={{ color: '#94A3B8' }}>Línea Móvil</span>
            <span className="dossier-val">
              <Phone size={11} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
              {order.customerPhone || 'Por verificar'}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label" style={{ color: '#94A3B8' }}>Dirección de Despacho</span>
            <span className="dossier-val">
              <MapPin size={11} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
              {order.customerAddress}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label" style={{ color: '#94A3B8' }}>Región y Modalidad</span>
            <span className="dossier-val" style={{ color: '#D4AF37' }}>
              {order.region === 'insular' ? '🏝️ Bioko (Malabo)' : '🌍 Litoral (Bata)'} • {order.shippingType === 'express' ? '⚡ Express 3D' : '📦 Normal'}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label" style={{ color: '#94A3B8' }}>Método de Pago</span>
            <span className="dossier-val">
              {order.paymentMethod === 'muni' ? '📲 Muni Dinero (*423*2*1*555439904#)' : '🟠 Orange Money / WhatsApp (+240 222 633 687)'}
            </span>
          </div>
        </div>
      </div>

      {/* Items Gallery with HD Thumbnails */}
      <div className="receipt-items-section">
        <div className="receipt-items-header">
          <span className="receipt-items-title" style={{ color: '#ECC874' }}>
            <ShoppingBag size={14} color="#D4AF37" /> Prendas en Reserva
          </span>
          <span className="receipt-items-count-badge" style={{ background: 'rgba(255,255,255,0.08)', color: '#CBD5E1' }}>
            {totalUnits} unidades
          </span>
        </div>

        <div className="receipt-items-list">
          {order.items.map((item) => {
            const itemTotal = item.price * item.quantity;
            const itemImgSrc = item.image ? item.image.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo.png';
            return (
              <div key={item.id} className="receipt-item-row">
                <div className="receipt-item-thumb-wrapper" style={{ borderColor: 'rgba(212, 175, 55, 0.4)', background: '#1E293B' }}>
                  <img 
                    src={itemImgSrc} 
                    alt={item.name} 
                    className="receipt-item-thumb-img"
                    onError={(e) => {
                      e.currentTarget.src = '/icons/ebna-logo.png';
                    }} 
                  />
                  <span className="thumb-qty-badge" style={{ background: '#D4AF37', color: '#0F172A' }}>
                    x{item.quantity}
                  </span>
                </div>

                <div className="receipt-item-info">
                  <h4 className="receipt-item-name" title={item.name}>{item.name}</h4>
                  <div className="receipt-item-meta" style={{ color: '#94A3B8' }}>
                    {item.selectedSize && (
                      <span className="receipt-meta-pill" style={{ background: 'rgba(212, 175, 55, 0.15)', borderColor: 'rgba(212, 175, 55, 0.4)', color: '#ECC874' }}>
                        Talla: {item.selectedSize}
                      </span>
                    )}
                    {item.selectedColor && item.selectedColor !== 'Original' && (
                      <span className="receipt-meta-pill" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: '#E2E8F0' }}>
                        Color: {item.selectedColor}
                      </span>
                    )}
                    <span style={{ color: '#94A3B8' }}>{formatPrice(item.price)} c/u</span>
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

      {/* Totals Box */}
      <div className="receipt-totals-box">
        <div className="receipt-total-row" style={{ color: '#94A3B8' }}>
          <span>Subtotal Prendas ({totalUnits} uds)</span>
          <span style={{ fontWeight: 700, color: '#F1F5F9' }}>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="receipt-total-row" style={{ color: '#94A3B8' }}>
          <span>Envío ({order.shippingType === 'express' ? 'Express 3 Días' : 'Estándar'})</span>
          <span style={{ fontWeight: 700, color: order.shippingCost > 0 ? '#ECC874' : '#10B981' }}>
            {order.shippingCost > 0 ? formatPrice(order.shippingCost) : 'Gratis'}
          </span>
        </div>

        <div className="receipt-grand-total-row" style={{ borderTopColor: 'rgba(212, 175, 55, 0.4)' }}>
          <div>
            <div className="grand-total-label">Importe Total</div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Francos CFA (XAF)</div>
          </div>
          <div className="grand-total-amount">{formatPrice(order.total)}</div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="receipt-security-footer" style={{ borderTopColor: 'rgba(212, 175, 55, 0.3)' }}>
        <div className="security-barcode-container">
          <div className="security-barcode-stripes">
            {[3, 2, 5, 2, 4, 7, 2, 4, 2, 6, 2, 3, 6, 2, 7, 4, 2, 5, 6, 2, 4, 2, 7, 4, 2, 5, 4, 2, 5].map((w, idx) => (
              <div 
                key={idx} 
                className="barcode-stripe" 
                style={{ width: `${w}px`, background: '#D4AF37', opacity: idx % 2 === 0 ? 0.8 : 1 }}
              />
            ))}
          </div>
          <div className="security-serial-code" style={{ color: '#ECC874' }}>
            EBNA-PASS-{order.orderNumber}-CIPHER-XAF
          </div>
        </div>

        <div className="security-guarantee-note" style={{ color: '#94A3B8' }}>
          <ShieldCheck size={14} color="#D4AF37" />
          <span>Firma Digital Segura Sindy Luxury • Verificado en Malabo y Bata</span>
        </div>
      </div>
    </div>
  );
};
