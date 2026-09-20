import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { demoSignIn, demoSignUp } from '../lib/demoData';
import type { Profile, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.role === 'ADMIN';

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return null;
        }
        return data as Profile;
      } else {
        const storedProfile = localStorage.getItem(`demo_profile_${userId}`);
        if (storedProfile) {
          return JSON.parse(storedProfile) as Profile;
        }
        return {
          id: userId,
          role: 'USER',
          full_name: 'Demo User',
          phone: '',
          created_at: new Date().toISOString(),
          last_seen: new Date().toISOString(),
        } as Profile;
      }
    } catch (err) {
      console.error('Error in fetchProfile:', err);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        if (isSupabaseConfigured() && supabase) {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;

          if (session?.user) {
            if (mounted) setUser(session.user);
            const userProfile = await fetchProfile(session.user.id);
            if (mounted) setProfile(userProfile);
          }
        } else {
          const demoUserId = localStorage.getItem('demo_session');
          if (demoUserId) {
            const mockUser = { id: demoUserId, email: localStorage.getItem('demo_email') || 'demo@ebna.com' };
            if (mounted) setUser(mockUser);
            const userProfile = await fetchProfile(demoUserId);
            if (mounted) setProfile(userProfile);
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    let authListener: any = null;

    if (isSupabaseConfigured() && supabase) {
      const { data } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
        if (session?.user) {
          if (mounted) setUser(session.user);
          const userProfile = await fetchProfile(session.user.id);
          if (mounted) setProfile(userProfile);
        } else {
          if (mounted) {
            setUser(null);
            setProfile(null);
          }
        }
        if (mounted) setLoading(false);
      });
      authListener = data.subscription;
    }

    return () => {
      mounted = false;
      if (authListener) authListener.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: any | null }> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error };
        setUser(data.user);
        const userProfile = await fetchProfile(data.user.id);
        setProfile(userProfile);
        return { error: null };
      } else {
        const result = await demoSignIn(email, password);
        if (result.error) return { error: result.error };
        const demoUser = result.data.user;
        const demoProfile = result.data.profile;
        localStorage.setItem('demo_session', demoUser.id);
        localStorage.setItem('demo_email', email);
        localStorage.setItem(`demo_profile_${demoUser.id}`, JSON.stringify(demoProfile));
        setUser(demoUser);
        setProfile(demoProfile);
        return { error: null };
      }
    } catch (err: any) {
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string): Promise<{ error: any | null }> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, phone },
          },
        });
        if (error) return { error };
        if (data.user) {
          setUser(data.user);
          const userProfile = await fetchProfile(data.user.id);
          setProfile(userProfile);
        }
        return { error: null };
      } else {
        const result = await demoSignUp(email, password, fullName, phone);
        if (result.error) return { error: result.error };
        const demoUser = result.data.user;
        const demoProfile = result.data.profile;
        localStorage.setItem('demo_session', demoUser.id);
        localStorage.setItem('demo_email', email);
        localStorage.setItem(`demo_profile_${demoUser.id}`, JSON.stringify(demoProfile));
        setUser(demoUser);
        setProfile(demoProfile);
        return { error: null };
      }
    } catch (err: any) {
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        await supabase.auth.signOut();
      } else {
        const userId = localStorage.getItem('demo_session');
        if (userId) {
          localStorage.removeItem('demo_session');
          localStorage.removeItem('demo_email');
          localStorage.removeItem(`demo_profile_${userId}`);
        }
      }
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
