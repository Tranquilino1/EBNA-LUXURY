import { supabase } from '../config/supabase';

// Real-time microsecond synchronization across tabs, devices, and browsers
const CATALOG_CHANNEL_NAME = 'ebna_catalog_realtime_sync';

let broadcastChannel: BroadcastChannel | null = null;
let supabaseBroadcaster: any = null;

if (typeof window !== 'undefined') {
  if ('BroadcastChannel' in window) {
    try {
      broadcastChannel = new BroadcastChannel(CATALOG_CHANNEL_NAME);
    } catch (e) {
      console.warn('BroadcastChannel not supported:', e);
    }
  }

  try {
    supabaseBroadcaster = supabase.channel('global_ebna_realtime_broadcaster');
    supabaseBroadcaster.subscribe();
  } catch (e) {
    console.warn('Supabase realtime broadcaster init notice:', e);
  }
}

export function notifyCatalogChange(action: string, payload?: any) {
  if (typeof window === 'undefined') return;

  // 1. Dispatch custom window event in current tab (0ms execution)
  window.dispatchEvent(new CustomEvent('ebna-catalog-update', { detail: { action, payload } }));

  // 2. Broadcast to all open tabs on same device
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ action, payload, timestamp: Date.now() });
    } catch (e) {}
  }

  // 3. UNIVERSAL CROSS-DEVICE BROADCAST via Supabase WebSockets (Mobile <-> PC <-> Tablet across ALL BROWSERS)
  if (supabaseBroadcaster) {
    try {
      supabaseBroadcaster.send({
        type: 'broadcast',
        event: 'catalog_change',
        payload: { action, payload, timestamp: Date.now() },
      });
    } catch (e) {}
  }

  // 4. Fallback localStorage event trigger
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

  // Subscribe to Supabase Global Realtime Broadcast Events (ALL Devices Worldwide)
  let subChannel: any = null;
  try {
    subChannel = supabase
      .channel('global_ebna_sub_' + Math.random().toString(36).substring(2, 9))
      .on('broadcast', { event: 'catalog_change' }, (payload) => {
        if (payload?.payload) {
          callback(payload.payload);
        } else {
          callback({ action: 'update' });
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        callback({ action: 'postgres_change' });
      })
      .subscribe();
  } catch (e) {
    console.warn('Supabase realtime subscription notice:', e);
  }

  return () => {
    window.removeEventListener('ebna-catalog-update', handleCustomEvent);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcast);
    }
    window.removeEventListener('storage', handleStorage);
    if (subChannel) {
      supabase.removeChannel(subChannel);
    }
  };
}

