// Real-time microsecond synchronization across tabs and local storage
const CATALOG_CHANNEL_NAME = 'ebna_catalog_realtime_sync';

let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(CATALOG_CHANNEL_NAME);
  } catch (e) {
    console.warn('BroadcastChannel not supported:', e);
  }
}

export function notifyCatalogChange(action: string, payload?: any) {
  if (typeof window === 'undefined') return;

  // 1. Dispatch custom window event in current tab (0ms execution)
  window.dispatchEvent(new CustomEvent('ebna-catalog-update', { detail: { action, payload } }));

  // 2. Broadcast to all other open tabs in microseconds
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ action, payload, timestamp: Date.now() });
    } catch (e) {
      console.warn('Error posting broadcast message:', e);
    }
  }

  // 3. Fallback localStorage event trigger
  try {
    localStorage.setItem('ebna_last_sync_timestamp', Date.now().toString());
  } catch {}
}

export function subscribeToCatalogChanges(callback: (eventData: { action: string; payload?: any }) => void) {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = (e: Event) => {
    const customEvt = e as CustomEvent;
    callback(customEvt.detail || { action: 'update' });
  };

  const handleBroadcast = (e: MessageEvent) => {
    if (e.data) {
      callback(e.data);
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'ebna_last_sync_timestamp' || e.key === 'ebna_local_products_v4' || e.key === 'ebna_deleted_ids_v4') {
      callback({ action: 'storage_change' });
    }
  };

  window.addEventListener('ebna-catalog-update', handleCustomEvent);
  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcast);
  }
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('ebna-catalog-update', handleCustomEvent);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcast);
    }
    window.removeEventListener('storage', handleStorage);
  };
}
