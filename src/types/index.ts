export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
  last_seen: string;
}

export type CategoryType = 'MODA' | 'VESTIDOS' | 'CALZADO' | 'COSMETICA' | 'PERFUMES' | 'ACCESORIOS' | 'VASELINAS' | 'JABONES' | 'NIÑOS' | 'POMADAS' | 'HIGIENE' | 'HOMBRES' | 'MUJERES';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number;
  images: string[];
  in_stock: boolean;
  is_hidden?: boolean;
  colors?: string[];
  sizes?: string[];
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotalPrice: number;
  triggerParticleBurst: (colorType?: 'pink' | 'green' | 'red') => void;
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
  updatePassword?: (newPassword: string) => Promise<{ error: any | null }>;
}

export interface TrafficContextType {
  onlineCount: number;
}
