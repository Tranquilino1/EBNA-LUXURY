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
    const existing = sessionStorage.getItem('ebna_presence_sess_id');
    if (existing) return existing;
    let newId = '';
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      newId = crypto.randomUUID();
    } else {
      newId = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    }
    sessionStorage.setItem('ebna_presence_sess_id', newId);
    return newId;
  } catch (e) {
    return 'sess_' + Date.now();
  }
};

export function TrafficProvider({ children }: { children: ReactNode }) {
  // Real presence count starts at 1 (the visitor themselves)
  const [onlineCount, setOnlineCount] = useState<number>(1);

  useEffect(() => {
    const currentSessionId = getSafeSessionId();
    const deviceType = getDeviceType();

    let channel: ReturnType<typeof supabase.channel> | null = null;
    let broadcast: BroadcastChannel | null = null;

    // Local tab synchronization via BroadcastChannel
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        broadcast = new BroadcastChannel('ebna_traffic_channel');
        broadcast.onmessage = (event) => {
          if (event.data && typeof event.data.count === 'number' && event.data.count >= 1) {
            setOnlineCount(event.data.count);
          }
        };
      }
    } catch (e) {
      // BroadcastChannel fallback
    }

    // Authentic Supabase Realtime Presence Channel
    if (isSupabaseConfigured() && supabase) {
      try {
        channel = supabase.channel('online-traffic-real', {
          config: {
            presence: {
              key: currentSessionId,
            },
          },
        });

        const updateRealCount = () => {
          if (!channel) return;
          try {
            const presenceState = channel.presenceState();
            // Count unique active client sessions in the presence channel
            const realSocketsCount = Object.keys(presenceState).length;
            // The true number of online users: at least 1 (the visitor themselves)
            const trueCount = Math.max(1, realSocketsCount);
            setOnlineCount(trueCount);
            if (broadcast) {
              broadcast.postMessage({ count: trueCount });
            }
          } catch (e) {
            console.warn('Error reading realtime presence state:', e);
          }
        };

        channel
          .on('presence', { event: 'sync' }, () => {
            updateRealCount();
          })
          .on('presence', { event: 'join' }, () => {
            updateRealCount();
          })
          .on('presence', { event: 'leave' }, () => {
            updateRealCount();
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
        console.warn('Supabase realtime presence initialization:', e);
      }
    }

    return () => {
      if (broadcast) {
        try {
          broadcast.close();
        } catch (e) {}
      }
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


