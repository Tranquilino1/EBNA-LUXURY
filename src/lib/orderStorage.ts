import type { OrderReceiptData, ReceiptStatus } from '../types';

const STORAGE_KEY = 'ebna_received_orders_v1';
const BROADCAST_NAME = 'ebna_orders_channel';

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
    const raw = decodeURIComponent(encoded.trim());
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
 * Parses and imports an order from an order link or raw encoded string
 */
export function importOrderFromText(input: string): OrderReceiptData | null {
  if (!input || !input.trim()) return null;
  const trimmed = input.trim();

  let encodedString = trimmed;

  // If full URL was pasted (e.g., https://ebna-luxury.vercel.app/recibo?order=...)
  if (trimmed.includes('order=')) {
    try {
      const url = new URL(trimmed, 'https://ebna-luxury.vercel.app');
      const param = url.searchParams.get('order');
      if (param) encodedString = param;
    } catch {
      const match = trimmed.match(/order=([^&\s]+)/);
      if (match && match[1]) encodedString = match[1];
    }
  }

  const order = decodeOrderData(encodedString);
  if (order && order.orderNumber && Array.isArray(order.items)) {
    saveOrderRequest(order);
    return order;
  }
  return null;
}

/**
 * Retrieves all received order requests
 */
export function getReceivedOrders(): OrderReceiptData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Strict filter to permanently remove old dummy/test orders
        const cleaned = parsed.filter(o => 
          o && 
          o.orderId !== 'ord-demo-001' && 
          o.orderId !== 'ord-demo-002' && 
          o.customerName !== 'Montserrat Bindang Nguema' && 
          o.customerName !== 'Doña Teresa Obono' &&
          o.customerName !== 'Cliente VIP'
        );
        if (cleaned.length !== parsed.length) {
          saveOrdersToStorage(cleaned);
        }
        return cleaned;
      }
    }
  } catch (err) {
    console.error('Error reading received orders:', err);
  }

  return [];
}

/**
 * Clears all orders from storage
 */
export function clearAllOrders(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    notifyOrderChange();
  } catch (err) {
    console.error('Error clearing orders:', err);
  }
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
