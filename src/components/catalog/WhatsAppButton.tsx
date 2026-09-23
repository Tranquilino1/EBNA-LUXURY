import React, { useState } from 'react';
import { MessageCircle, ChevronDown, Ticket } from 'lucide-react';
import type { Product, OrderReceiptData } from '../../types';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import { recordProductOrder } from '../../lib/popularityTracker';
import { saveOrderRequest } from '../../lib/orderStorage';
import { useCart } from '../../contexts/CartContext';
import { OrderReceiptModal } from '../receipt/OrderReceiptModal';
import './catalog.css';

interface WhatsAppButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  product, 
  size = 'md', 
  fullWidth = false 
}) => {
  const [showNumbers, setShowNumbers] = useState(false);
  const [singleReceipt, setSingleReceipt] = useState<OrderReceiptData | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  const handleOpenReceipt = () => {
    setShowNumbers(false);
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
      // Must collect real customer details via the cart drawer form
      addToCart(product, 1);
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
        quantity: 1,
        selectedSize: product.sizes?.[0] || 'Original',
        selectedColor: product.colors?.[0] || 'Original',
        image: rawImg || '/icons/ebna-logo.png',
        slug: product.slug
      }],
      subtotal: priceVal,
      shippingCost: 0,
      total: priceVal,
      status: 'PENDIENTE'
    };
    saveOrderRequest(orderData);
    setSingleReceipt(orderData);
    setIsReceiptModalOpen(true);
  };

  const handlePrimaryClick = () => {
    if (!showNumbers) {
      recordProductOrder(product.id);
      window.open(buildWhatsAppUrl(product, 'primary'), '_blank');
    }
  };

  return (
    <div className={`wa-button-container ${fullWidth ? 'full-width' : ''}`} onMouseLeave={() => setShowNumbers(false)}>
      <button 
        className={`wa-btn wa-btn-${size} ${fullWidth ? 'full-width' : ''}`}
        onClick={handlePrimaryClick}
      >
        <MessageCircle size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
        <span>Pedir por WhatsApp</span>
        
        <div 
          className="wa-dropdown-toggle" 
          onClick={(e) => {
            e.stopPropagation();
            setShowNumbers(!showNumbers);
          }}
        >
          <ChevronDown size={16} />
        </div>
      </button>
      
      {showNumbers && (
        <div className="wa-dropdown glass-panel">
          <a 
            href={buildWhatsAppUrl(product, 'primary')} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => recordProductOrder(product.id)}
            className="wa-dropdown-item"
          >
            Línea Principal (+240 222 633 687)
          </a>
          <a 
            href={buildWhatsAppUrl(product, 'secondary')} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => recordProductOrder(product.id)}
            className="wa-dropdown-item"
          >
            Línea Muni Dinero (+240 555 439 904)
          </a>

          <button
            type="button"
            onClick={handleOpenReceipt}
            className="wa-dropdown-item"
            style={{ 
              background: 'none', 
              border: 'none', 
              width: '100%', 
              textAlign: 'left', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              color: '#D81B60',
              fontWeight: 700,
              borderTop: '1px solid rgba(216, 27, 96, 0.15)',
              paddingTop: '8px',
              marginTop: '4px'
            }}
          >
            <Ticket size={14} />
            <span>Ver Tarjeta / Recibo Digital</span>
          </button>
        </div>
      )}

      {/* Single Product Receipt Modal */}
      <OrderReceiptModal
        order={singleReceipt}
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
      />
    </div>
  );
};
