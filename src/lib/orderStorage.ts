import type { OrderReceiptData, ReceiptStatus } from '../types';

const STORAGE_KEY = 'ebna_received_orders_v1';
const BROADCAST_NAME = 'ebna_orders_channel';

// Initial preloaded orders so the admin and store owner can immediately see and inspect cards
const INITIAL_DEMO_ORDERS: OrderReceiptData[] = [
  {
    orderId: 'ord-demo-001',
    orderNumber: 'EB-2026-8849',
    createdAt: '23 Sep 2026 • 02:40',
    customerName: 'Montserrat Bindang Nguema',
    customerPhone: '+240 222 555 888',
    customerAddress: 'Caracolas, Frente a Casa Mallo, Malabo',
    region: 'insular',
    shippingType: 'express',
    paymentMethod: 'muni',
    items: [
      {
        id: 'eb-item-1',
        name: 'Vestido Midi Plisado Seda Gold',
        price: 26000,
        quantity: 2,
        selectedSize: 'M',
        selectedColor: 'Dorado Champán',
        image: '/icons/ebna-logo.png'
      },
      {
        id: 'eb-item-2',
        name: 'Jumpsuit Safari Segunda Piel Ébano',
        price: 28500,
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'Estampado Ébano',
        image: '/icons/ebna-logo.png'
      }
    ],
    subtotal: 80500,
    shippingCost: 3000,
    total: 83500,
    status: 'PENDIENTE',
    notes: 'Solicitud recibida desde la tienda online. Pago solicitado vía Muni Dinero.'
  },
  {
    orderId: 'ord-demo-002',
    orderNumber: 'EB-2026-7731',
    createdAt: '22 Sep 2026 • 19:15',
    customerName: 'Doña Teresa Obono',
    customerPhone: '+240 555 439 904',
    customerAddress: 'Paseo Marítimo de Bata, Residencia Miramar',
    region: 'continental',
    shippingType: 'normal',
    paymentMethod: 'whatsapp',
    items: [
      {
        id: 'eb-item-3',
        name: 'Vestido Gala Terciopelo Imperial',
        price: 45000,
        quantity: 1,
        selectedSize: 'S',
        selectedColor: 'Azul Noche',
        image: '/icons/ebna-logo.png'
      }
    ],
    subtotal: 45000,
    shippingCost: 0,
    total: 45000,
    status: 'CONFIRMADO',
    notes: 'Confirmado por WhatsApp. Entrega estándar en Bata.'
  }
];

/**
 * Safely encodes OrderReceiptData into a URL-friendly base64 string
 */
export function encodeOrderData(order: OrderReceiptData): string {
  try {
    const json = JSON.stringify(order);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return encodeURIComponent(btoa(binary));
  } catch (e) {
    return encodeURIComponent(JSON.stringify(order));
  }
}

/**
 * Safely decodes base64 string back into OrderReceiptData
 */
export function decodeOrderData(encoded: string): OrderReceiptData | null {
  try {
    const raw = decodeURIComponent(encoded);
    try {
      const binary = atob(raw);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const json = new TextDecoder().decode(bytes);
      return JSON.parse(json);
    } catch {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error decoding order data:', e);
    return null;
  }
}

/**
 * Retrieves all received order requests
 */
export function getReceivedOrders(): OrderReceiptData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading received orders:', err);
  }

  // Pre-seed demo orders if none exist
  saveOrdersToStorage(INITIAL_DEMO_ORDERS);
  return INITIAL_DEMO_ORDERS;
}

/**
 * Internal storage saver
 */
function saveOrdersToStorage(orders: OrderReceiptData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    notifyOrderChange();
  } catch (err) {
    console.error('Error saving orders to localStorage:', err);
  }
}

/**
 * Saves a new incoming order request
 */
export function saveOrderRequest(newOrder: OrderReceiptData): void {
  try {
    const current = getReceivedOrders();
    // Avoid exact duplicate IDs
    const exists = current.find(o => o.orderId === newOrder.orderId || o.orderNumber === newOrder.orderNumber);
    let updated: OrderReceiptData[];
    if (exists) {
      updated = current.map(o => o.orderId === newOrder.orderId ? newOrder : o);
    } else {
      updated = [newOrder, ...current];
    }
    saveOrdersToStorage(updated);
  } catch (err) {
    console.error('Error recording order request:', err);
  }
}

/**
 * Updates an order's status
 */
export function updateOrderStatus(orderId: string, status: ReceiptStatus): void {
  try {
    const current = getReceivedOrders();
    const updated = current.map(o => o.orderId === orderId ? { ...o, status } : o);
    saveOrdersToStorage(updated);
  } catch (err) {
    console.error('Error updating order status:', err);
  }
}

/**
 * Deletes an order request
 */
export function deleteOrderRequest(orderId: string): void {
  try {
    const current = getReceivedOrders();
    const updated = current.filter(o => o.orderId !== orderId);
    saveOrdersToStorage(updated);
  } catch (err) {
    console.error('Error deleting order:', err);
  }
}

/**
 * Real-time notification across tabs
 */
function notifyOrderChange(): void {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      const channel = new BroadcastChannel(BROADCAST_NAME);
      channel.postMessage({ type: 'ORDER_UPDATED', timestamp: Date.now() });
      channel.close();
    } catch {}
  }
}

/**
 * Subscribes to order updates in real time
 */
export function subscribeToOrders(callback: () => void): () => void {
  let channel: BroadcastChannel | null = null;
  const storageListener = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', storageListener);
    if ('BroadcastChannel' in window) {
      try {
        channel = new BroadcastChannel(BROADCAST_NAME);
        channel.onmessage = () => callback();
      } catch {}
    }
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', storageListener);
    }
    if (channel) {
      channel.close();
    }
  };
}
