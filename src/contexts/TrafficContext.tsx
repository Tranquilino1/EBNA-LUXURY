import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';

// Assuming getDeviceType is defined in a util file
// If it doesn't exist yet, we define a simple fallback here
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
  return 'desktop';
};

interface TrafficContextType {
  onlineCount: number;
}

const TrafficContext = createContext<TrafficContextType | undefined>(undefined);

export function TrafficProvider({ children }: { children: ReactNode }) {
  const [onlineCount, setOnlineCount] = useState<number>(1);

  useEffect(() => {
    let currentSessionId = crypto.randomUUID();
    let heartbeatInterval: ReturnType<typeof setInterval>;
    let countInterval: ReturnType<typeof setInterval>;
    const deviceType = getDeviceType();

    const initSession = async () => {
      try {
        if (isSupabaseConfigured() && supabase) {
          const { error } = await supabase.from('traffic_sessions').insert([
            { id: currentSessionId, device_type: deviceType, last_heartbeat: new Date().toISOString() }
          ]);
          if (error) console.error('Error creating traffic session:', error);
        } else {
          // Demo mode local simulation
          sessionStorage.setItem('demo_traffic_session', currentSessionId);
        }
      } catch (err) {
        console.error('Failed to init session:', err);
      }
    };

    const cleanupSession = async () => {
      try {
        if (isSupabaseConfigured() && supabase) {
          await supabase.from('traffic_sessions').delete().eq('id', currentSessionId);
        } else {
          sessionStorage.removeItem('demo_traffic_session');
        }
      } catch (err) {
        console.error('Failed to cleanup session:', err);
      }
    };

    const sendHeartbeat = async () => {
      try {
        if (isSupabaseConfigured() && supabase) {
          await supabase.from('traffic_sessions')
            .update({ last_heartbeat: new Date().toISOString() })
            .eq('id', currentSessionId);
        }
      } catch (err) {
        console.error('Failed to update heartbeat:', err);
      }
    };

    const fetchCount = async () => {
      try {
        if (isSupabaseConfigured() && supabase) {
          const { data, error } = await supabase.rpc('get_active_traffic_sessions_count');
          if (!error && data !== null) {
            setOnlineCount(data);
          }
        } else {
          // Demo fallback: simulate 1-5 active users
          setOnlineCount(Math.floor(Math.random() * 5) + 1);
        }
      } catch (err) {
        console.error('Failed to fetch count:', err);
      }
    };

    initSession();
    fetchCount();

    heartbeatInterval = setInterval(sendHeartbeat, 60000); // every 60 seconds
    countInterval = setInterval(fetchCount, 30000); // every 30 seconds

    window.addEventListener('beforeunload', cleanupSession);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(countInterval);
      cleanupSession();
      window.removeEventListener('beforeunload', cleanupSession);
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
