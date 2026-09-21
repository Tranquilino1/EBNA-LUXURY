import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';

interface TrafficContextType {
  onlineCount: number;
}

const TrafficContext = createContext<TrafficContextType | undefined>(undefined);

const getDeviceType = () => {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
  return 'desktop';
};

const getSafeSessionId = () => {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch (e) {}
  return 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};

const MIN_USERS = 6;
const MAX_USERS = 18;

const saveStoredCount = (count: number) => {
  try {
    sessionStorage.setItem('ebna_online_traffic_count', count.toString());
  } catch (e) {}
};

export function TrafficProvider({ children }: { children: ReactNode }) {
  const [onlineCount, setOnlineCount] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem('ebna_online_traffic_count');
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val >= MIN_USERS && val <= MAX_USERS) return val;
      }
    } catch (e) {}
    // Initial dynamic baseline between 7 and 12 online users
    return Math.floor(Math.random() * 6) + 7;
  });

  useEffect(() => {
    const currentSessionId = getSafeSessionId();
    const deviceType = getDeviceType();
    const BASE_ACTIVE_BASELINE = 5;

    // Organic Heartbeat Simulation (Symmetric random walk with idle pauses, EV = 0)
    const heartbeatTimer = setInterval(() => {
      setOnlineCount(prev => {
        const r = Math.random();
        let delta = 0;
        if (r < 0.25) delta = 1;
        else if (r > 0.75) delta = -1;
        
        if (delta === 0) return prev;
        
        const nextVal = Math.min(MAX_USERS, Math.max(MIN_USERS, prev + delta));
        saveStoredCount(nextVal);
        return nextVal;
      });
    }, 10000);

    // Order Boost Listener (Immediate +1 boost when user places an order)
    const handleOrderEvent = () => {
      setOnlineCount(prev => {
        const nextVal = Math.min(MAX_USERS, prev + 1);
        saveStoredCount(nextVal);
        return nextVal;
      });
    };
    window.addEventListener('ebna_product_ordered', handleOrderEvent);

    // Supabase Realtime Channel Presence (if available)
    let channel: ReturnType<typeof supabase.channel> | null = null;

    if (isSupabaseConfigured() && supabase) {
      try {
        channel = supabase.channel('online-traffic', {
          config: {
            presence: {
              key: currentSessionId,
            },
          },
        });

        channel
          .on('presence', { event: 'sync' }, () => {
            if (!channel) return;
            try {
              const newState = channel.presenceState();
              const realSockets = Object.keys(newState).length;
              const totalActive = Math.min(MAX_USERS, Math.max(MIN_USERS, realSockets + BASE_ACTIVE_BASELINE));
              setOnlineCount(totalActive);
              saveStoredCount(totalActive);
            } catch (e) {}
          })
          .subscribe(async (status) => {
            if (status === 'SUBSCRIBED' && channel) {
              await channel.track({
                online_at: new Date().toISOString(),
                device_type: deviceType,
                session_id: currentSessionId,
              }).catch(() => {});
            }
          });
      } catch (e) {
        console.warn('Supabase realtime init failed, using organic heartbeat fallback', e);
      }
    }

    return () => {
      clearInterval(heartbeatTimer);
      window.removeEventListener('ebna_product_ordered', handleOrderEvent);
      if (channel && supabase) {
        try {
          supabase.removeChannel(channel);
        } catch (e) {}
      }
    };
  }, []);

  return (
    <TrafficContext.Provider value={{ onlineCount }}>
      {children}
    </TrafficContext.Provider>
  );
}

export function useTraffic() {
  const context = useContext(TrafficContext);
  if (context === undefined) {
    throw new Error('useTraffic must be used within a TrafficProvider');
  }
  return context;
}

