import React, { useState, useEffect } from 'react';
import type { OrderReceiptData, ReceiptStatus } from '../../types';
import { getReceivedOrders, updateOrderStatus, deleteOrderRequest, subscribeToOrders, saveOrderRequest, importOrderFromText, clearAllOrders } from '../../lib/orderStorage';
import { downloadReceiptAsPng, copyReceiptSummary } from '../../lib/receiptExporter';
import { OrderReceiptCard } from '../receipt/OrderReceiptCard';
import { formatPrice } from '../../lib/utils';
import { 
  Clock, CheckCircle2, Truck, Sparkles, Phone, MapPin, 
  Download, Eye, EyeOff, Trash2, Search, MessageCircle, 
  ExternalLink, Copy, Check, ShoppingBag, Plus, UploadCloud, AlertCircle
} from 'lucide-react';
import '../receipt/receipt.css';

export const ReceivedOrdersPanel: React.FC = () => {
  const [orders, setOrders] = useState<OrderReceiptData[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importInput, setImportInput] = useState('');
  const [importMessage, setImportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const reloadOrders = () => {
    setOrders(getReceivedOrders());
  };

  useEffect(() => {
    reloadOrders();
    const unsubscribe = subscribeToOrders(() => {
      reloadOrders();
    });
    return () => unsubscribe();
  }, []);

  const handleImportOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setImportMessage(null);
    if (!importInput.trim()) {
      setImportMessage({ type: 'error', text: 'Por favor pega el enlace o código del pedido recibido en WhatsApp.' });
      return;
    }
    const order = importOrderFromText(importInput.trim());
    if (order) {
      reloadOrders();
      setExpandedOrderId(order.orderId);
      setImportInput('');
      setImportMessage({ type: 'success', text: `¡Tarjeta de pedido #${order.orderNumber} (${order.customerName}) registrada con éxito!` });
      setTimeout(() => setImportMessage(null), 4000);
    } else {
      setImportMessage({ type: 'error', text: 'No se pudo leer el pedido. Asegúrate de pegar el enlace de WhatsApp completo o el código de la tarjeta.' });
    }
  };

  const handleClearAll = () => {
    if (confirm('¿Deseas vaciar todas las solicitudes de pedido de este navegador?')) {
      clearAllOrders();
      reloadOrders();
      setExpandedOrderId(null);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: ReceiptStatus) => {
    updateOrderStatus(orderId, newStatus);
    reloadOrders();
  };

  const handleDelete = (orderId: string, orderNumber: string) => {
    if (confirm(`¿Deseas eliminar la solicitud de pedido #${orderNumber}?`)) {
      deleteOrderRequest(orderId);
      reloadOrders();
      if (expandedOrderId === orderId) {
        setExpandedOrderId(null);
      }
    }
  };

  const handleDownload = async (order: OrderReceiptData) => {
    setExportingId(order.orderId);
    try {
      await downloadReceiptAsPng(order, 'haute-couture');
    } finally {
      setExportingId(null);
    }
  };

  const handleCopy = async (order: OrderReceiptData) => {
    const ok = await copyReceiptSummary(order);
    if (ok) {
      setCopiedId(order.orderId);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleCreateTestOrder = () => {
    const testOrder: OrderReceiptData = {
      orderId: `test-${Date.now()}`,
      orderNumber: `EB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + 
        ' • ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      customerName: 'Sindy Eyenga',
      customerPhone: '+240 222 633 687',
      customerAddress: 'Malabo II, Frente a Edificio de Ministerios, Malabo',
      region: 'insular',
      shippingType: 'express',
      paymentMethod: 'whatsapp',
      items: [
        {
          id: `item-test-${Date.now()}`,
          name: 'Vestido Gala Terciopelo Imperial',
          price: 38000,
          quantity: 1,
          selectedSize: 'M',
          selectedColor: 'Dorado Champagne',
          image: '/icons/ebna-logo.png'
        }
      ],
      subtotal: 38000,
      shippingCost: 3000,
      total: 41000,
      status: 'PENDIENTE',
      notes: 'Solicitud con datos reales de Guinea Ecuatorial (+240 222 633 687).'
    };
    saveOrderRequest(testOrder);
    reloadOrders();
    setExpandedOrderId(testOrder.orderId);
  };

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'TODOS' || order.status === filterStatus;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      order.orderNumber.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.toLowerCase().includes(query) ||
      order.customerAddress.toLowerCase().includes(query) ||
      order.items.some(i => i.name.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  const pendingCount = orders.filter(o => o.status === 'PENDIENTE').length;
  const confirmedCount = orders.filter(o => o.status === 'CONFIRMADO').length;
  const inTransitCount = orders.filter(o => o.status === 'EN_CAMINO').length;
  const deliveredCount = orders.filter(o => o.status === 'ENTREGADO').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner / Metrics */}
      <div style={{ background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.08) 0%, rgba(197, 168, 128, 0.12) 100%)', border: '1px solid rgba(216, 27, 96, 0.25)', borderRadius: '20px', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>
              Solicitudes de Pedidos Recibidas
            </h2>
            <span style={{ background: '#D81B60', color: 'white', padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
              {orders.length} pedidos registrados
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
            Visualiza las tarjetas oficiales de pedido generadas desde la página, con miniaturas, cantidades y contacto directo por WhatsApp al <strong>+240 222 633 687</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleCreateTestOrder}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '30px',
              border: '1px solid rgba(216, 27, 96, 0.3)',
              background: 'white',
              color: '#D81B60',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <Plus size={15} /> Generar Pedido de Prueba Real
          </button>
          {orders.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '30px',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                background: 'rgba(239, 68, 68, 0.05)',
                color: '#EF4444',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={14} /> Vaciar Historial
            </button>
          )}
        </div>
      </div>

      {/* Import / Paste WhatsApp Order Card */}
      <form onSubmit={handleImportOrder} style={{ background: 'white', padding: '1.2rem 1.6rem', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.8rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UploadCloud size={18} color="#D81B60" />
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              Cargar o Registrar Pedido desde Enlace de WhatsApp
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            Pega el enlace de la tarjeta (ej. https://ebna-luxury.vercel.app/recibo?order=...)
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={importInput}
            onChange={(e) => setImportInput(e.target.value)}
            placeholder="Pegar enlace recibido en WhatsApp o código de tarjeta..."
            style={{
              flex: 1,
              minWidth: '260px',
              padding: '10px 14px',
              borderRadius: '24px',
              border: '1.5px solid #E2E8F0',
              fontSize: '0.86rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: '24px',
              border: 'none',
              background: 'linear-gradient(135deg, #D81B60, #C2185B)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(216, 27, 96, 0.25)'
            }}
          >
            <Plus size={15} /> Registrar Tarjeta
          </button>
        </div>

        {importMessage && (
          <div style={{
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 600,
            background: importMessage.type === 'success' ? '#ECFDF5' : '#FEF2F2',
            color: importMessage.type === 'success' ? '#065F46' : '#991B1B',
            border: `1px solid ${importMessage.type === 'success' ? '#A7F3D0' : '#FECACA'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {importMessage.type === 'success' ? <Check size={14} color="#10B981" /> : <AlertCircle size={14} color="#EF4444" />}
            <span>{importMessage.text}</span>
          </div>
        )}
      </form>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} /> ⏳ Pendientes
          </span>
          <h3 style={{ fontSize: '1.6rem', margin: '6px 0 0 0', color: '#B45309' }}>{pendingCount}</h3>
        </div>

        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <CheckCircle2 size={14} /> ✅ Confirmados
          </span>
          <h3 style={{ fontSize: '1.6rem', margin: '6px 0 0 0', color: '#059669' }}>{confirmedCount}</h3>
        </div>

        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Truck size={14} /> 🚚 En Camino
          </span>
          <h3 style={{ fontSize: '1.6rem', margin: '6px 0 0 0', color: '#2563EB' }}>{inTransitCount}</h3>
        </div>

        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sparkles size={14} /> ✨ Entregados
          </span>
          <h3 style={{ fontSize: '1.6rem', margin: '6px 0 0 0', color: '#7C3AED' }}>{deliveredCount}</h3>
        </div>

        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.75rem', color: '#D81B60', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
            💵 Total Cartera
          </span>
          <h3 style={{ fontSize: '1.3rem', margin: '6px 0 0 0', color: '#D81B60', fontWeight: 800 }}>{formatPrice(totalRevenue)}</h3>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'white', padding: '1rem 1.4rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
        {/* Status Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(['TODOS', 'PENDIENTE', 'CONFIRMADO', 'EN_CAMINO', 'ENTREGADO'] as const).map(st => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.78rem',
                fontWeight: 700,
                border: filterStatus === st ? '1px solid #D81B60' : '1px solid var(--border-light)',
                background: filterStatus === st ? 'rgba(216, 27, 96, 0.1)' : 'var(--canvas-surface)',
                color: filterStatus === st ? '#D81B60' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {st === 'TODOS' ? 'Todos' : st === 'PENDIENTE' ? '⏳ Pendientes' : st === 'CONFIRMADO' ? '✅ Confirmados' : st === 'EN_CAMINO' ? '🚚 En Camino' : '✨ Entregados'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por cliente, folio o prenda..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              fontSize: '0.84rem'
            }}
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: 'white', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <ShoppingBag size={52} color="#D81B60" style={{ margin: '0 auto 1.2rem auto', opacity: 0.7 }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
            {orders.length === 0 ? 'Bandeja de Solicitudes de Pedidos Lista' : 'No se encontraron solicitudes con este filtro'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '520px', margin: '0.8rem auto 1.8rem auto', lineHeight: 1.6 }}>
            {orders.length === 0 
              ? 'Cuando los clientes realicen un pedido en la tienda web, recibirás la solicitud directamente en tu WhatsApp oficial (+240 222 633 687) con la tarjeta de pedido y fotografías. Al abrir el enlace o pegarlo en el buscador superior, quedará guardado aquí.'
              : 'Intenta cambiar el estado en los filtros o buscar por otro término.'}
          </p>
          <button
            type="button"
            onClick={handleCreateTestOrder}
            style={{ padding: '11px 24px', borderRadius: '30px', background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(216, 27, 96, 0.3)' }}
          >
            Generar Pedido de Demostración con Datos Reales
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredOrders.map(order => {
            const isExpanded = expandedOrderId === order.orderId;
            const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);

            // Clean clean phone number for whatsapp
            let cleanPhone = (order.customerPhone || '').replace(/[^0-9]/g, '');
            if (cleanPhone.length === 9) {
              cleanPhone = `240${cleanPhone}`;
            }
            const customerWaUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${order.customerName}, le contactamos de Sindy Luxury by EBNA con relación a su pedido #${order.orderNumber}.`)}` : '#';

            return (
              <div 
                key={order.orderId}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  border: isExpanded ? '2px solid #D81B60' : '1px solid var(--border-light)',
                  boxShadow: isExpanded ? '0 10px 30px rgba(216, 27, 96, 0.12)' : '0 2px 10px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Order Summary Header Bar */}
                <div style={{ padding: '1.2rem 1.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: isExpanded ? 'rgba(216, 27, 96, 0.02)' : 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(197, 168, 128, 0.18)', border: '1px solid rgba(197, 168, 128, 0.5)', color: '#8B6F47', padding: '4px 12px', borderRadius: '12px', fontWeight: 800, fontSize: '0.86rem' }}>
                      #{order.orderNumber}
                    </span>

                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {order.customerName}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: '#64748B', marginTop: '2px', flexWrap: 'wrap' }}>
                        <span><Clock size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {order.createdAt}</span>
                        <span>•</span>
                        <span><Phone size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {order.customerPhone || 'Sin teléfono'}</span>
                        <span>•</span>
                        <span><MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {order.customerAddress} ({order.region === 'insular' ? 'Bioko' : 'Litoral'})</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {/* Status Select Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Estado:</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value as ReceiptStatus)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          border: order.status === 'PENDIENTE' ? '1px solid #F59E0B' : order.status === 'CONFIRMADO' ? '1px solid #10B981' : order.status === 'EN_CAMINO' ? '1px solid #3B82F6' : '1px solid #8B5CF6',
                          background: order.status === 'PENDIENTE' ? 'rgba(245, 158, 11, 0.1)' : order.status === 'CONFIRMADO' ? 'rgba(16, 185, 129, 0.1)' : order.status === 'EN_CAMINO' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                          color: order.status === 'PENDIENTE' ? '#B45309' : order.status === 'CONFIRMADO' ? '#059669' : order.status === 'EN_CAMINO' ? '#2563EB' : '#7C3AED'
                        }}
                      >
                        <option value="PENDIENTE">⏳ Pendiente</option>
                        <option value="CONFIRMADO">✅ Confirmado</option>
                        <option value="EN_CAMINO">🚚 En Camino</option>
                        <option value="ENTREGADO">✨ Entregado</option>
                      </select>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>{totalUnits} prendas</span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#D81B60' }}>{formatPrice(order.total)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.orderId)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '20px',
                        border: '1px solid var(--border-light)',
                        background: isExpanded ? 'rgba(216, 27, 96, 0.1)' : 'var(--canvas-surface)',
                        color: isExpanded ? '#D81B60' : 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isExpanded ? <><EyeOff size={14} /> Ocultar Tarjeta</> : <><Eye size={14} /> Ver Tarjeta Generada</>}
                    </button>
                  </div>
                </div>

                {/* Items Thumbnails Quick Strip (Always visible for fast scanning) */}
                <div style={{ padding: '0.8rem 1.6rem', background: '#FAFAFA', borderTop: '1px solid #F1F1F1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', maxWidth: '650px', padding: '4px 0' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', flexShrink: 0 }}>
                      Artículos:
                    </span>
                    {order.items.map(item => (
                      <div 
                        key={item.id} 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'white', border: '1px solid #E2E8F0', padding: '3px 8px', borderRadius: '8px', flexShrink: 0 }}
                      >
                        <div style={{ position: 'relative', width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/icons/ebna-logo.png'; }} />
                          <span style={{ position: 'absolute', bottom: 0, right: 0, background: '#D81B60', color: 'white', fontSize: '0.55rem', fontWeight: 800, padding: '0 2px' }}>
                            x{item.quantity}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1E293B', maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#D81B60', fontWeight: 800 }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {cleanPhone && (
                      <a
                        href={customerWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          background: '#25D366',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.76rem',
                          textDecoration: 'none'
                        }}
                      >
                        <MessageCircle size={13} /> WhatsApp
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDownload(order)}
                      disabled={exportingId === order.orderId}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid #CBD5E1',
                        background: 'white',
                        color: '#1E293B',
                        fontWeight: 700,
                        fontSize: '0.76rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Download size={13} /> {exportingId === order.orderId ? 'Generando...' : 'Descargar PNG'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(order)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 10px',
                        borderRadius: '20px',
                        border: '1px solid #CBD5E1',
                        background: 'white',
                        color: '#64748B',
                        fontWeight: 700,
                        fontSize: '0.76rem',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedId === order.orderId ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(order.orderId, order.orderNumber)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '6px'
                      }}
                      title="Eliminar pedido"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Expanded Full Visual Card View */}
                {isExpanded && (
                  <div style={{ padding: '2rem 1.6rem', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
                    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: '#D81B60', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Sparkles size={14} /> Tarjeta Oficial de Pedido (Formato Cliente)
                        </span>
                        <a
                          href={`/recibo?id=${order.orderId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <ExternalLink size={13} /> Abrir Enlace Público
                        </a>
                      </div>

                      <OrderReceiptCard order={order} template="haute-couture" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
