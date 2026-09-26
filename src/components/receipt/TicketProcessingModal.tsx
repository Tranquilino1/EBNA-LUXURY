import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  X, 
  ClipboardCheck, 
  Smartphone 
} from 'lucide-react';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import type { OrderReceiptData } from '../../types';
import { 
  generateAndDownloadReceipt, 
  buildReceiptWhatsAppUrl, 
  type GeneratedTicketResult 
} from '../../lib/receiptExporter';
import { formatPrice } from '../../lib/utils';
import { useModalLock } from '../../hooks/useModalLock';
import './receipt.css';

interface TicketProcessingModalProps {
  isOpen: boolean;
  order: OrderReceiptData | null;
  onClose: () => void;
  onConfirmed: () => void;
}

export const TicketProcessingModal: React.FC<TicketProcessingModalProps> = ({
  isOpen,
  order,
  onClose,
  onConfirmed
}) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [ticketResult, setTicketResult] = useState<GeneratedTicketResult | null>(null);
  const [stepText, setStepText] = useState('Iniciando procesamiento de pedido...');
  const hasTriggeredRef = useRef(false);

  // Background isolation, touch lock, and Escape key listener
  useModalLock(isOpen, onClose);

  useEffect(() => {
    if (!isOpen || !order) {
      setProgress(0);
      setIsCompleted(false);
      setTicketResult(null);
      hasTriggeredRef.current = false;
      return;
    }

    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    let currentProg = 0;
    const intervalTime = 30; // ms
    const totalDuration = 1800; // 1.8 seconds smooth filling
    const increment = (100 / (totalDuration / intervalTime));

    // Start background generation
    const genPromise = generateAndDownloadReceipt(order, 'haute-couture');

    const timer = setInterval(async () => {
      currentProg += increment;
      if (currentProg < 30) {
        setStepText('Generando folio y estructura oficial de boutique...');
      } else if (currentProg < 65) {
        setStepText('Renderizando ticket HD y optimizando imagen...');
      } else if (currentProg < 90) {
        setStepText('Descargando ticket de forma automática y silenciosa...');
      } else {
        setStepText('¡Ticket oficial completado y listo para confirmar!');
      }

      if (currentProg >= 100) {
        clearInterval(timer);
        setProgress(100);
        const res = await genPromise;
        setTicketResult(res);
        setIsCompleted(true);
      } else {
        setProgress(Math.min(99, Math.floor(currentProg)));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const handleConfirmAndSend = () => {
    // If Muni Dinero, copy phone to clipboard as extra convenience
    if (order.paymentMethod === 'muni') {
      try {
        navigator.clipboard.writeText('555439904');
      } catch {}
    }

    const waUrl = buildReceiptWhatsAppUrl(order);
    window.open(waUrl, '_blank');
    onConfirmed();
    onClose();
  };

  return (
    <div 
      className="receipt-modal-overlay" 
      onClick={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 99999
      }}
    >
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(216, 27, 96, 0.25), 0 0 0 1px rgba(216, 27, 96, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Top Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid rgba(216, 27, 96, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.05) 0%, rgba(24, 66, 102, 0.03) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D81B60, #C2185B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 8px rgba(216, 27, 96, 0.35)'
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', fontFamily: 'var(--font-serif)' }}>
                {isCompleted ? 'Ticket Oficial Listo' : 'Procesando tu Ticket...'}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                Folio #{order.orderNumber} • Sindy Luxury by EBNA
              </span>
            </div>
          </div>

          <button
            type="button"
            className="luxury-close-circle-btn"
            onClick={onClose}
            aria-label="Cerrar ventana de ticket (ESC)"
            title="Cerrar ventana de ticket (ESC)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', textAlign: 'center' }}>
          {!isCompleted ? (
            /* STEP 1: PROCESSING WITH ANIMATED PROGRESS BAR */
            <div style={{ padding: '20px 8px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.1) 0%, rgba(216, 27, 96, 0.2) 100%)',
                border: '2px solid rgba(216, 27, 96, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px auto',
                animation: 'pulse 1.8s infinite ease-in-out'
              }}>
                <Sparkles size={30} color="#D81B60" />
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E293B', margin: '0 0 8px 0' }}>
                Generando Ticket Oficial de Compra
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#64748B', margin: '0 0 22px 0' }}>
                {stepText}
              </p>

              {/* Progress Bar Container */}
              <div style={{
                width: '100%',
                height: '10px',
                background: 'rgba(0,0,0,0.06)',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #D81B60 0%, #25D366 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.1s linear',
                  boxShadow: '0 0 12px rgba(216, 27, 96, 0.5)'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>
                <span>Descarga automática en segundo plano</span>
                <span style={{ color: '#D81B60', fontWeight: 800 }}>{progress}%</span>
              </div>
            </div>
          ) : (
            /* STEP 2: COMPLETED & READY TO CONFIRM AND SEND TO WHATSAPP */
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
                boxShadow: '0 8px 20px rgba(37, 211, 102, 0.35)',
                color: 'white'
              }}>
                <CheckCircle2 size={32} />
              </div>

              <h4 style={{ fontSize: '1.22rem', fontWeight: 900, color: '#1E293B', margin: '0 0 6px 0' }}>
                ¡Ticket Generado con Éxito!
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#64748B', margin: '0 auto 16px auto', maxWidth: '420px', lineHeight: 1.45 }}>
                Tu ticket oficial ha sido generado y <strong>descargado automáticamente</strong> en tu dispositivo. Pulsa <strong>Confirmar</strong> para abrir WhatsApp y enviar tu pedido con el ticket.
              </p>

              {/* Ticket Preview Card */}
              {ticketResult?.dataUrl && (
                <div style={{
                  margin: '0 auto 18px auto',
                  maxWidth: '320px',
                  maxHeight: '230px',
                  overflowY: 'auto',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(216, 27, 96, 0.25)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  background: '#FFFFFF',
                  padding: '6px'
                }}>
                  <img 
                    src={ticketResult.dataUrl} 
                    alt="Vista previa del ticket" 
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} 
                  />
                </div>
              )}

              {/* Order Quick Overview */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                background: 'rgba(216, 27, 96, 0.05)',
                border: '1px solid rgba(216, 27, 96, 0.15)',
                borderRadius: '14px',
                padding: '10px 14px',
                marginBottom: '18px',
                fontSize: '0.84rem'
              }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>Modalidad</span>
                  <strong style={{ color: order.shippingType === 'express' ? '#D81B60' : '#16A34A' }}>
                    {order.shippingType === 'express' ? '⚡ Express 3 Días' : '📦 Estándar (5-7d)'}
                  </strong>
                </div>
                <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)' }} />
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>Total a Pagar</span>
                  <strong style={{ color: '#1E293B', fontSize: '1rem' }}>
                    {formatPrice(order.total)}
                  </strong>
                </div>
                <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)' }} />
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>Método</span>
                  <strong style={{ color: '#1E293B' }}>
                    {order.paymentMethod === 'muni' ? 'Muni Dinero' : 'WhatsApp'}
                  </strong>
                </div>
              </div>

              {/* Status Hint */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#16A34A',
                fontWeight: 700,
                marginBottom: '16px'
              }}>
                <ClipboardCheck size={15} />
                <span>Ticket guardado en descargas y listo para adjuntar en WhatsApp</span>
              </div>

              {/* Muni Extra Info Banner */}
              {order.paymentMethod === 'muni' && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 32, 96, 0.08) 0%, rgba(96, 165, 250, 0.1) 100%)',
                  border: '1.5px solid rgba(0, 32, 96, 0.3)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  fontSize: '0.82rem',
                  color: '#002060',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'left'
                }}>
                  <Smartphone size={18} color="#002060" style={{ flexShrink: 0 }} />
                  <span>
                    El número de <strong>Muni Dinero (555439904)</strong> se ha copiado automáticamente para tu transferencia.
                  </span>
                </div>
              )}

              {/* MAIN ACTION: CONFIRM & SEND DIRECTLY TO WHATSAPP */}
              <button
                type="button"
                onClick={handleConfirmAndSend}
                style={{
                  width: '100%',
                  padding: '15px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '1.02rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
                  transition: 'all 0.25s ease'
                }}
              >
                <WhatsAppIcon size={22} color="white" />
                <span>Confirmar y Enviar al WhatsApp</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
