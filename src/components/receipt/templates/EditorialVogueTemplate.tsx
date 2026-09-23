import React from 'react';
import type { OrderReceiptData } from '../../../types';
import { formatPrice } from '../../../lib/utils';
import { Clock, ShieldCheck, MapPin, Phone, User, ShoppingBag } from 'lucide-react';

interface EditorialVogueTemplateProps {
  order: OrderReceiptData;
}

export const EditorialVogueTemplate: React.FC<EditorialVogueTemplateProps> = ({ order }) => {
  const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="receipt-card-editorial-vogue" id="ebna-receipt-card">
      {/* Header */}
      <div className="receipt-header" style={{ borderBottom: '2px solid #000000', paddingBottom: '24px' }}>
        <h2 className="receipt-brand-title">SINDY LUXURY</h2>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', margin: '4px 0 16px 0', color: '#555555' }}>
          PARIS • MALABO • BATA — ATELIER DE COMMANDE
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid #E5E5E5', paddingTop: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em' }}>
            Nº DE COMMANDE: #{order.orderNumber}
          </span>
          <span style={{ background: '#000000', color: '#FFFFFF', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            EN ATTENTE DE CONFIRMATION
          </span>
        </div>

        <div style={{ fontSize: '0.75rem', color: '#666666', marginTop: '8px', textAlign: 'left' }}>
          <Clock size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
          Date de validation: {order.createdAt}
        </div>
      </div>

      {/* Customer & Shipping Dossier */}
      <div className="receipt-dossier-box" style={{ margin: '20px 0', padding: '18px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <User size={13} /> Dossier de Livraison & Client
        </div>
        <div className="dossier-grid">
          <div className="dossier-item">
            <span className="dossier-label">Client</span>
            <span className="dossier-val" style={{ fontFamily: 'Georgia, serif', fontSize: '1rem' }}>{order.customerName}</span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Contact WhatsApp</span>
            <span className="dossier-val">
              <Phone size={11} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
              {order.customerPhone || 'À préciser'}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Adresse de Réception</span>
            <span className="dossier-val">
              <MapPin size={11} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
              {order.customerAddress}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Région & Expédition</span>
            <span className="dossier-val" style={{ fontWeight: 800 }}>
              {order.region === 'insular' ? 'Région Insulaire (Bioko)' : 'Région Continentale (Litoral)'} — {order.shippingType === 'express' ? 'Livraison Express 3 Jours' : 'Standard 5-7 Jours'}
            </span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Règlement Choisi</span>
            <span className="dossier-val">
              {order.paymentMethod === 'muni' ? 'Muni Dinero (555439904)' : 'WhatsApp Oficial (+240 222 633 687)'}
            </span>
          </div>
        </div>
      </div>

      {/* Items Gallery */}
      <div className="receipt-items-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #000000', paddingBottom: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShoppingBag size={14} /> Pièces Sélectionnées
          </span>
          <span style={{ fontSize: '0.75rem', color: '#666666' }}>
            Total: {totalUnits} pièces
          </span>
        </div>

        <div className="receipt-items-list">
          {order.items.map((item) => {
            const itemTotal = item.price * item.quantity;
            const itemImgSrc = item.image ? item.image.replace(/\.jfif$/i, '.jpg') : '/icons/ebna-logo.png';
            return (
              <div key={item.id} className="receipt-item-row" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0, border: '1px solid #000000', overflow: 'hidden' }}>
                  <img 
                    src={itemImgSrc} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = '/icons/ebna-logo.png';
                    }} 
                  />
                  <span style={{ position: 'absolute', bottom: 0, right: 0, background: '#000000', color: '#FFFFFF', fontSize: '0.62rem', fontWeight: 800, padding: '1px 5px' }}>
                    x{item.quantity}
                  </span>
                </div>

                <div className="receipt-item-info" style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px 0' }}>
                    {item.name}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#666666', display: 'flex', gap: '10px' }}>
                    {item.selectedSize && <span>Taille: <strong>{item.selectedSize}</strong></span>}
                    {item.selectedColor && item.selectedColor !== 'Original' && <span>Couleur: <strong>{item.selectedColor}</strong></span>}
                    <span>Prix: {formatPrice(item.price)}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', fontWeight: 800 }}>
                    {formatPrice(itemTotal)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Totals Box */}
      <div className="receipt-totals-box" style={{ margin: '20px 0', padding: '18px' }}>
        <div className="receipt-total-row">
          <span>Sous-total Pièces</span>
          <span style={{ fontWeight: 700 }}>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="receipt-total-row">
          <span>Frais d'Expédition ({order.shippingType === 'express' ? 'Express' : 'Standard'})</span>
          <span style={{ fontWeight: 700 }}>{order.shippingCost > 0 ? formatPrice(order.shippingCost) : 'Offert'}</span>
        </div>

        <div className="receipt-grand-total-row" style={{ borderTop: '2px solid #000000', marginTop: '12px', paddingTop: '12px' }}>
          <div>
            <div className="grand-total-label" style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem' }}>TOTAL À RÉGLER</div>
            <div style={{ fontSize: '0.72rem', color: '#666666' }}>Devise Officielle Francs CFA</div>
          </div>
          <div className="grand-total-amount" style={{ fontSize: '1.6rem', color: '#000000' }}>
            {formatPrice(order.total)}
          </div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="receipt-security-footer" style={{ borderTop: '1px solid #E5E5E5', paddingTop: '18px' }}>
        <div className="security-barcode-container">
          <div className="security-barcode-stripes">
            {[4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 2, 4, 6, 2, 8, 4, 2, 4, 6, 2, 4, 2, 8, 4, 2, 6, 4, 2, 6].map((w, idx) => (
              <div 
                key={idx} 
                className="barcode-stripe" 
                style={{ width: `${w}px`, background: '#000000' }}
              />
            ))}
          </div>
          <div className="security-serial-code" style={{ color: '#000000' }}>
            EBNA-VOGUE-{order.orderNumber}-PARIS-MALABO
          </div>
        </div>

        <div className="security-guarantee-note" style={{ color: '#666666' }}>
          <ShieldCheck size={14} color="#000000" />
          <span>Certification d'Authenticité Officielle Sindy Luxury • Guinée Équatoriale</span>
        </div>
      </div>
    </div>
  );
};
