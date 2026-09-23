import React, { useState } from 'react';
import type { OrderReceiptData, ReceiptTemplateId } from '../../types';
import { OrderReceiptCard } from './OrderReceiptCard';
import { buildReceiptWhatsAppUrl, downloadReceiptAsPng, copyReceiptSummary } from '../../lib/receiptExporter';
import { X, MessageCircle, Download, Copy, Printer, Check, Sparkles, Layers } from 'lucide-react';
import './receipt.css';

interface OrderReceiptModalProps {
  order: OrderReceiptData | null;
  isOpen: boolean;
  onClose: () => void;
  initialTemplate?: ReceiptTemplateId;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({
  order,
  isOpen,
  onClose,
  initialTemplate = 'haute-couture'
}) => {
  const [activeTemplate, setActiveTemplate] = useState<ReceiptTemplateId>(initialTemplate);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadReceiptAsPng(order, activeTemplate);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyReceiptSummary(order);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = buildReceiptWhatsAppUrl(order);

  return (
    <div className="receipt-modal-overlay" onClick={onClose}>
      <div className="receipt-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Template Selector Bar */}
        <div className="receipt-templates-bar">
          <div className="receipt-templates-tabs">
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#D81B60', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
              <Layers size={13} /> PLANTILLA:
            </span>
            <button
              type="button"
              className={`template-tab-btn ${activeTemplate === 'haute-couture' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('haute-couture')}
            >
              <Sparkles size={12} /> Haute Couture VIP
            </button>
            <button
              type="button"
              className={`template-tab-btn ${activeTemplate === 'obsidian-gold' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('obsidian-gold')}
            >
              🖤 Obsidian Gold
            </button>
            <button
              type="button"
              className={`template-tab-btn ${activeTemplate === 'editorial-vogue' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('editorial-vogue')}
            >
              📰 Editorial Vogue
            </button>
          </div>

          <button 
            type="button" 
            className="receipt-modal-close" 
            onClick={onClose}
            aria-label="Cerrar Comprobante"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Receipt Area */}
        <div className="receipt-scroll-body">
          <OrderReceiptCard order={order} template={activeTemplate} />
        </div>

        {/* Bottom Actions Toolbar */}
        <div className="receipt-actions-toolbar">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="receipt-btn-whatsapp"
            onClick={() => {
              // Keep modal or notify
            }}
          >
            <MessageCircle size={18} />
            <span>Enviar Recibo Oficial a WhatsApp (+240 222 633 687)</span>
          </a>

          <button
            type="button"
            className="receipt-btn-download"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download size={16} />
            <span>{isDownloading ? 'Generando PNG HD...' : 'Descargar Tarjeta (PNG)'}</span>
          </button>

          <button
            type="button"
            className="receipt-btn-secondary"
            onClick={handleCopy}
            title="Copiar texto del comprobante"
          >
            {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
            <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
          </button>

          <button
            type="button"
            className="receipt-btn-secondary"
            onClick={handlePrint}
            title="Imprimir comprobante en papel o guardar en PDF"
          >
            <Printer size={14} />
            <span>Imprimir / PDF</span>
          </button>
        </div>

        {/* Copy Toast */}
        {copied && (
          <div className="receipt-copy-toast">
            ✨ Resumen del comprobante copiado al portapapeles
          </div>
        )}
      </div>
    </div>
  );
};
