import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import type { OrderReceiptData, ReceiptTemplateId } from '../types';
import { decodeOrderData, getReceivedOrders, saveOrderRequest } from '../lib/orderStorage';
import { OrderReceiptCard } from '../components/receipt/OrderReceiptCard';
import { downloadReceiptAsPng, copyReceiptSummary, buildReceiptWhatsAppUrl } from '../lib/receiptExporter';
import { SEOHead } from '../components/seo/SEOHead';
import { Download, Copy, MessageCircle, Printer, Sparkles, Layers, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import '../components/receipt/receipt.css';

export function ReceiptViewerPage() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<OrderReceiptData | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<ReceiptTemplateId>('haute-couture');
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const rawOrderParam = searchParams.get('order');
    const orderIdParam = searchParams.get('id');

    let loadedOrder: OrderReceiptData | null = null;

    if (rawOrderParam) {
      loadedOrder = decodeOrderData(rawOrderParam);
    }

    if (!loadedOrder && orderIdParam) {
      const allOrders = getReceivedOrders();
      loadedOrder = allOrders.find(o => o.orderId === orderIdParam || o.orderNumber === orderIdParam) || null;
    }

    if (loadedOrder) {
      setOrder(loadedOrder);
      // Persist into received orders cache
      saveOrderRequest(loadedOrder);
    }
  }, [searchParams]);

  const handleDownload = async () => {
    if (!order) return;
    setIsDownloading(true);
    try {
      await downloadReceiptAsPng(order, activeTemplate);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    if (!order) return;
    const ok = await copyReceiptSummary(order);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="luxury-container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(216, 27, 96, 0.1)', color: '#D81B60', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem auto' }}>
            <AlertCircle size={30} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
            Comprobante No Encontrado
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.8rem' }}>
            El enlace del comprobante no contiene datos válidos o ha expirado. Puedes volver a la tienda o contactar a atención al cliente por WhatsApp.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/" 
              style={{ padding: '10px 20px', borderRadius: '30px', background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem' }}
            >
              Explorar Catálogo EBNA
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const whatsappUrl = buildReceiptWhatsAppUrl(order);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas-background)', padding: '2rem 1rem 4rem 1rem' }}>
      <SEOHead 
        title={`Comprobante de Pedido #${order.orderNumber} • Sindy Luxury`}
        description={`Tarjeta digital de pedido #${order.orderNumber} con desglose de prendas, fotos en miniatura y expedición oficial.`}
      />

      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Top Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <Link 
            to="/" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#D81B60', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem' }}
          >
            <ArrowLeft size={16} /> Volver a la Tienda
          </Link>

          {/* Template Switcher */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '30px', border: '1px solid rgba(216, 27, 96, 0.2)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#D81B60', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
              <Layers size={12} /> ESTILO:
            </span>
            <button
              type="button"
              className={`template-tab-btn ${activeTemplate === 'haute-couture' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('haute-couture')}
            >
              <Sparkles size={11} /> Haute Couture
            </button>
            <button
              type="button"
              className={`template-tab-btn ${activeTemplate === 'obsidian-gold' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('obsidian-gold')}
            >
              🖤 Obsidian
            </button>
            <button
              type="button"
              className={`template-tab-btn ${activeTemplate === 'editorial-vogue' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('editorial-vogue')}
            >
              📰 Vogue
            </button>
          </div>
        </div>

        {/* Action Header Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.08) 0%, rgba(197, 168, 128, 0.15) 100%)', border: '1px solid rgba(216, 27, 96, 0.25)', borderRadius: '18px', padding: '1rem 1.4rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D81B60', display: 'block' }}>
              Comprobante Oficial Activo
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
              Tarjeta de Pedido #{order.orderNumber}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <Download size={14} />
              <span>{isDownloading ? 'Generando...' : 'Descargar Tarjeta (PNG)'}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.84rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
              }}
            >
              <MessageCircle size={14} />
              <span>Contactar WhatsApp</span>
            </a>
          </div>
        </div>

        {/* The Visual Receipt Card */}
        <div style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.15)', borderRadius: '20px', overflow: 'hidden' }}>
          <OrderReceiptCard order={order} template={activeTemplate} />
        </div>

        {/* Secondary Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '2rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleCopy}
            className="receipt-btn-secondary"
          >
            {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
            <span>{copied ? '¡Copiado!' : 'Copiar Resumen de Pedido'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="receipt-btn-secondary"
          >
            <Printer size={14} />
            <span>Imprimir Comprobante / Guardar en PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
