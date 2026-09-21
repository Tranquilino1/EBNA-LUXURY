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
    // Default initial count between 2 and 6 online devices for active live feel
    return Math.floor(Math.random() * 4) + 2;
  });

  useEffect(() => {
    const currentSessionId = crypto.randomUUID();
    const deviceType = getDeviceType();

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
          const count = Object.keys(newState).length;
          setOnlineCount(Math.max(1, count));
        })
        .on('presence', { event: 'join' }, ({ newPresences }) => {
          setOnlineCount(prev => prev + newPresences.length);
        })
        .on('presence', { event: 'leave' }, ({ leftPresences }) => {
          setOnlineCount(prev => Math.max(1, prev - leftPresences.length));
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

      return () => {
        supabase.removeChannel(room);
      };
    } else {
      // 2. Local Real-Time Simulation with natural live heartbeat changes
      const interval = setInterval(() => {
        setOnlineCount(prev => {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const updated = prev + delta;
          return updated < 2 ? 2 : updated > 12 ? 10 : updated;
        });
      }, 15000);

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
