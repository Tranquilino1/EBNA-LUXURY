export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
  last_seen: string;
}

export type CategoryType = 'MODA' | 'COSMETICA' | 'ACCESORIOS' | 'VASELINAS' | 'JABONES' | 'NIÑOS' | 'POMADAS';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number;
  images: string[];
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrafficSession {
  id: string;
  user_id: string | null;
  last_heartbeat: string;
  device_type: string;
}

export type ProductCategory = 'TODOS' | CategoryType;

export interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
}

export interface TrafficContextType {
  onlineCount: number;
}
