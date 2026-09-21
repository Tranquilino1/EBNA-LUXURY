import React, { useState } from 'react';
import { MessageCircle, ChevronDown } from 'lucide-react';
import type { Product } from '../../types';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
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

  const handlePrimaryClick = () => {
    if (!showNumbers) {
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
            className="wa-dropdown-item"
          >
            Línea Principal (+240 222 633 687)
          </a>
          <a 
            href={buildWhatsAppUrl(product, 'secondary')} 
            target="_blank" 
            rel="noopener noreferrer"
            className="wa-dropdown-item"
          >
            Línea Muni Dinero (+240 555 439 904)
          </a>
        </div>
      )}
    </div>
  );
};
