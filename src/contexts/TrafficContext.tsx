import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';

interface TrafficContextType {
  onlineCount: number;
}

const TrafficContext = createContext<TrafficContextType | undefined>(undefined);

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
  return 'desktop';
};

export function TrafficProvider({ children }: { children: ReactNode }) {
  const [onlineCount, setOnlineCount] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem('ebna_online_traffic_count');
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val >= 3) return val;
      }
    } catch (e) {}
    // Initial dynamic baseline between 5 and 9 online users
    return Math.floor(Math.random() * 5) + 5;
  });

  useEffect(() => {
    const currentSessionId = crypto.randomUUID();
    const deviceType = getDeviceType();

    // Base active baseline to represent live app shoppers
    const BASE_ACTIVE_BASELINE = 4;

    // 1. Supabase Realtime Channel Presence for 0ms Real-Time Sync
    if (isSupabaseConfigured() && supabase) {
      const room = supabase.channel('online-traffic', {
        config: {
          presence: {
            key: currentSessionId,
          },
        },
      });

      room
        .on('presence', { event: 'sync' }, () => {
          const newState = room.presenceState();
          const realSockets = Object.keys(newState).length;
          const totalActive = Math.max(3, realSockets + BASE_ACTIVE_BASELINE);
          setOnlineCount(totalActive);
          try {
            sessionStorage.setItem('ebna_online_traffic_count', totalActive.toString());
          } catch (e) {}
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await room.track({
              online_at: new Date().toISOString(),
              device_type: deviceType,
              session_id: currentSessionId,
            });
          }
        });

      // 2. Real-time Heartbeat Fluctuation (organic user arrival/departure simulation)
      const heartbeatTimer = setInterval(() => {
        setOnlineCount(prev => {
          const delta = Math.random() > 0.52 ? 1 : -1;
          const nextVal = Math.min(18, Math.max(3, prev + delta));
          try {
            sessionStorage.setItem('ebna_online_traffic_count', nextVal.toString());
          } catch (e) {}
          return nextVal;
        });
      }, 10000); // Pulse every 10 seconds

      // 3. Listen to live order events to boost active count
      const handleOrderEvent = () => {
        setOnlineCount(prev => prev + 1);
      };
      window.addEventListener('ebna_product_ordered', handleOrderEvent);

      return () => {
        clearInterval(heartbeatTimer);
        window.removeEventListener('ebna_product_ordered', handleOrderEvent);
        supabase.removeChannel(room);
      };
    } else {
      // Local fallback with natural live heartbeat changes
      const interval = setInterval(() => {
        setOnlineCount(prev => {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const updated = prev + delta;
          return updated < 3 ? 4 : updated > 18 ? 12 : updated;
        });
      }, 10000);

      return () => clearInterval(interval);
    }
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
