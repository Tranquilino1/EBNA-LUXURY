import React, { useState } from 'react';
import type { OrderReceiptData, ReceiptItem, ReceiptTemplateId } from '../../types';
import { OrderReceiptCard } from '../receipt/OrderReceiptCard';
import { downloadReceiptAsPng, copyReceiptSummary, buildReceiptWhatsAppUrl } from '../../lib/receiptExporter';
import { Sparkles, Download, Copy, MessageCircle, Plus, Trash2 } from 'lucide-react';
import '../receipt/receipt.css';

// Preset orders for instant demonstration
const PRESET_ORDERS: { label: string; data: OrderReceiptData }[] = [
  {
    label: '👗 Pedido Carrito 9 Prendas (Inspirado en la captura)',
    data: {
      orderId: 'eb-cart-9921',
      orderNumber: 'EB-2026-9921',
      createdAt: '23 Sep 2026 • 02:45',
      customerName: 'Sra. Montserrat Bindang Nguema',
      customerPhone: '+240 222 555 888',
      customerAddress: 'Caracolas, Frente a Casa Mallo, Malabo',
      region: 'insular',
      shippingType: 'express',
      paymentMethod: 'muni',
      items: [
        {
          id: 'item-1',
          name: 'Vestido Midi Plisado Seda Gold',
          price: 26000,
          quantity: 2,
          selectedSize: 'M',
          selectedColor: 'Dorado Champán',
          image: '/products/vestido_plisado_seda.png'
        },
        {
          id: 'item-2',
          name: 'Jumpsuit Safari Segunda Piel Ébano',
          price: 28500,
          quantity: 1,
          selectedSize: 'L',
          selectedColor: 'Estampado Ébano',
          image: '/products/jumpsuit_safari.png'
        },
        {
          id: 'item-3',
          name: 'Vestido Halter Noche Escote Espalda',
          price: 32000,
          quantity: 1,
          selectedSize: 'S',
          selectedColor: 'Negro Azabache',
          image: '/products/vestido_halter_noche.png'
        },
        {
          id: 'item-4',
          name: 'Conjunto Top & Falda Tigre Real',
          price: 24500,
          quantity: 2,
          selectedSize: 'M',
          selectedColor: 'Rojo Carmesí',
          image: '/products/conjunto_tigre_rojo.png'
        },
        {
          id: 'item-5',
          name: 'Sandalias Plataforma Cristal Stiletto',
          price: 35000,
          quantity: 1,
          selectedSize: '39 EU',
          selectedColor: 'Cristal Rosé',
          image: '/products/sandalias_cristal.png'
        }
      ],
      subtotal: 196500,
      shippingCost: 3000,
      total: 199500,
      status: 'PENDIENTE',
      notes: 'Entrega prioritaria en Malabo. Pago vía Muni Dinero.'
    }
  },
  {
    label: '✨ Pedido Rápido Single Product (Gala VIP)',
    data: {
      orderId: 'eb-quick-1082',
      orderNumber: 'EB-2026-1082',
      createdAt: '23 Sep 2026 • 03:00',
      customerName: 'Doña Teresa Obono',
      customerPhone: '+240 555 439 904',
      customerAddress: 'Paseo Marítimo de Bata, Residencia Miramar',
      region: 'continental',
      shippingType: 'normal',
      paymentMethod: 'whatsapp',
      items: [
        {
          id: 'item-single',
          name: 'Vestido Gala Terciopelo Imperial',
          price: 45000,
          quantity: 1,
          selectedSize: 'M',
          selectedColor: 'Azul Noche',
          image: '/icons/ebna-logo.png'
        }
      ],
      subtotal: 45000,
      shippingCost: 0,
      total: 45000,
      status: 'PENDIENTE'
    }
  }
];

export const ReceiptTemplatesStudio: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<ReceiptTemplateId>('haute-couture');
  const [currentOrder, setCurrentOrder] = useState<OrderReceiptData>(PRESET_ORDERS[0].data);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form edit state
  const [customerName, setCustomerName] = useState(currentOrder.customerName);
  const [customerPhone, setCustomerPhone] = useState(currentOrder.customerPhone);
  const [customerAddress, setCustomerAddress] = useState(currentOrder.customerAddress);
  const [region, setRegion] = useState<'insular' | 'continental'>(currentOrder.region);
  const [shippingType, setShippingType] = useState<'normal' | 'express'>(currentOrder.shippingType);
  const [paymentMethod, setPaymentMethod] = useState<'muni' | 'whatsapp'>(currentOrder.paymentMethod);

  // New item form
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(25000);
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemSize, setNewItemSize] = useState('M');
  const [newItemColor, setNewItemColor] = useState('Original');
  const [newItemImg, setNewItemImg] = useState('/icons/ebna-logo.png');

  const recalculateOrder = (
    updatedItems: ReceiptItem[],
    upRegion: 'insular' | 'continental' = region,
    upShipping: 'normal' | 'express' = shippingType,
    upPayment: 'muni' | 'whatsapp' = paymentMethod,
    upName: string = customerName,
    upPhone: string = customerPhone,
    upAddress: string = customerAddress
  ) => {
    const subtotal = updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const shippingCost = upShipping === 'express' ? 3000 : 0;
    const total = subtotal + shippingCost;

    const newOrder: OrderReceiptData = {
      ...currentOrder,
      customerName: upName,
      customerPhone: upPhone,
      customerAddress: upAddress,
      region: upRegion,
      shippingType: upShipping,
      paymentMethod: upPayment,
      items: updatedItems,
      subtotal,
      shippingCost,
      total
    };
    setCurrentOrder(newOrder);
  };

  const handleApplyPreset = (preset: OrderReceiptData) => {
    setCurrentOrder(preset);
    setCustomerName(preset.customerName);
    setCustomerPhone(preset.customerPhone);
    setCustomerAddress(preset.customerAddress);
    setRegion(preset.region);
    setShippingType(preset.shippingType);
    setPaymentMethod(preset.paymentMethod);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ReceiptItem = {
      id: `item-${Date.now()}`,
      name: newItemName.trim(),
      price: Number(newItemPrice) || 20000,
      quantity: Number(newItemQty) || 1,
      selectedSize: newItemSize,
      selectedColor: newItemColor,
      image: newItemImg.trim() || '/icons/ebna-logo.png'
    };

    const updated = [...currentOrder.items, newItem];
    recalculateOrder(updated);
    setNewItemName('');
  };

  const handleRemoveItem = (id: string) => {
    if (currentOrder.items.length <= 1) {
      alert('La plantilla debe conservar al menos 1 producto.');
      return;
    }
    const updated = currentOrder.items.filter(i => i.id !== id);
    recalculateOrder(updated);
  };

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await downloadReceiptAsPng(currentOrder, activeTemplate);
      setToastMessage('✅ Tarjeta PNG de alta resolución generada y descargada.');
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyReceiptSummary(currentOrder);
    if (ok) {
      setToastMessage('📋 Resumen de pedido copiado al portapapeles.');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="receipt-studio-container" style={{ padding: '1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Studio Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={24} color="#D81B60" />
            Estudio y Diseñador de Tarjetas UX de Pedido
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
            Genera, personaliza y prueba plantillas de recibos digitales con miniaturas fotográficas y datos dinámicos insertables.
          </p>
        </div>

        {/* Template Selectors */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--canvas-elevated)', padding: '6px', borderRadius: '30px', border: '1px solid var(--border-light)' }}>
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
      </div>

      {toastMessage && (
        <div style={{ background: '#10B981', color: 'white', padding: '10px 18px', borderRadius: '12px', marginBottom: '1rem', fontWeight: 700, fontSize: '0.85rem' }}>
          {toastMessage}
        </div>
      )}

      {/* Main 2-column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Left Column: Data Editor & Insertable Products */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#D81B60', display: 'block', marginBottom: '8px' }}>
              Cargar Ejemplar Predefinido:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PRESET_ORDERS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset.data)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    background: currentOrder.orderNumber === preset.data.orderNumber ? 'rgba(216, 27, 96, 0.08)' : 'var(--canvas-surface)',
                    color: currentOrder.orderNumber === preset.data.orderNumber ? '#D81B60' : 'var(--text-primary)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

          {/* Customer dossier editor */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Datos del Destinatario:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  recalculateOrder(currentOrder.items, region, shippingType, paymentMethod, e.target.value);
                }}
                placeholder="Nombre del destinatario"
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
              />
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  recalculateOrder(currentOrder.items, region, shippingType, paymentMethod, customerName, e.target.value);
                }}
                placeholder="Teléfono / WhatsApp"
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
              />
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => {
                  setCustomerAddress(e.target.value);
                  recalculateOrder(currentOrder.items, region, shippingType, paymentMethod, customerName, customerPhone, e.target.value);
                }}
                placeholder="Dirección / Barrio"
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <select
                  value={region}
                  onChange={(e) => {
                    const val = e.target.value as 'insular' | 'continental';
                    setRegion(val);
                    recalculateOrder(currentOrder.items, val);
                  }}
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}
                >
                  <option value="insular">🏝️ Bioko (Malabo)</option>
                  <option value="continental">🌍 Litoral (Bata)</option>
                </select>

                <select
                  value={shippingType}
                  onChange={(e) => {
                    const val = e.target.value as 'normal' | 'express';
                    setShippingType(val);
                    recalculateOrder(currentOrder.items, region, val);
                  }}
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}
                >
                  <option value="normal">📦 Normal (Gratis)</option>
                  <option value="express">⚡ Express 3D (+3.000)</option>
                </select>
              </div>

              <select
                value={paymentMethod}
                onChange={(e) => {
                  const val = e.target.value as 'muni' | 'whatsapp';
                  setPaymentMethod(val);
                  recalculateOrder(currentOrder.items, region, shippingType, val);
                }}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}
              >
                <option value="muni">📲 Muni Dinero (+240 555 439 904)</option>
                <option value="whatsapp">💬 WhatsApp / Efectivo</option>
              </select>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

          {/* Insertable Items Manager */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Prendas en la Tarjeta ({currentOrder.items.length}):
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
              {currentOrder.items.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--canvas-surface)', padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/icons/ebna-logo.png'; }} />
                    <div style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                      <strong>{item.name}</strong> <span style={{ color: '#888' }}>(x{item.quantity})</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                    title="Eliminar de la plantilla"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Add Product Form */}
            <form onSubmit={handleAddItem} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#D81B60' }}>+ Insertar Nuevo Producto a la Plantilla:</span>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Nombre de prenda (ej. Vestido Satinado)"
                style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                <input
                  type="number"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(Number(e.target.value))}
                  placeholder="Precio FCFA"
                  style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.78rem' }}
                />
                <input
                  type="number"
                  value={newItemQty}
                  min={1}
                  onChange={(e) => setNewItemQty(Number(e.target.value))}
                  placeholder="Cant"
                  style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.78rem' }}
                />
                <input
                  type="text"
                  value={newItemSize}
                  onChange={(e) => setNewItemSize(e.target.value)}
                  placeholder="Talla"
                  style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.78rem' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <input
                  type="text"
                  value={newItemColor}
                  onChange={(e) => setNewItemColor(e.target.value)}
                  placeholder="Color (ej. Dorado, Negro)"
                  style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.78rem' }}
                />
                <input
                  type="text"
                  value={newItemImg}
                  onChange={(e) => setNewItemImg(e.target.value)}
                  placeholder="URL Imagen o /icons/..."
                  style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.78rem' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #D81B60, #C2185B)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} /> Añadir Producto
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Card Preview & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="receipt-btn-download"
            >
              <Download size={16} />
              <span>{isExporting ? 'Generando PNG...' : 'Descargar Tarjeta en PNG HD'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="receipt-btn-secondary"
            >
              <Copy size={15} />
              <span>Copiar Resumen</span>
            </button>

            <a
              href={buildReceiptWhatsAppUrl(currentOrder)}
              target="_blank"
              rel="noopener noreferrer"
              className="receipt-btn-whatsapp"
              style={{ flex: 'none', padding: '10px 18px' }}
            >
              <MessageCircle size={16} />
              <span>Simular Envío WhatsApp</span>
            </a>
          </div>

          {/* Render Card Live */}
          <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
            <OrderReceiptCard order={currentOrder} template={activeTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
};
