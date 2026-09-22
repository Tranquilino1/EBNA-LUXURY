export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
  last_seen: string;
}

export type ProductCategory = 
  | 'MODA_MUJER'
  | 'MODA_INFANTIL'
  | 'MODA_HOMBRE'
  | 'CALZADO'
  | 'BOLSOS_ACCESORIOS'
  | 'PERFUMERIA'
  | 'COSMETICA_FACIAL'
  | 'HIGIENE_CORPORAL';

export interface ProductImages {
  primary: string;
  gallery?: string[];
  [index: number]: string;
}

export interface ProductDetails {
  size?: string[];
  volume?: string;
  material?: string;
}

export interface Product {
  id: string; // UUID or semantic ID (e.g. 'eb-perf-001')
  sku: string; // Unique SKU code (e.g. 'EB-PERF-01')
  name: string; // Precise commercial title
  brand?: string; // Brand (Zara, Chanel, Instituto Español, Palmolive, EBNA Collection)
  category: ProductCategory;
  subcategory: string; // e.g. 'Perfumes', 'Vestidos de Noche', 'Lociones'
  priceFCFA: number; // Price in FCFA (XAF)
  originalPriceFCFA?: number; // Original price for discounts
  inStock: boolean;
  featured?: boolean;
  description: string;
  images: ProductImages;
  details?: ProductDetails;

  // Backwards compatibility properties for zero regression across UI components
  slug: string;
  price: number;
  in_stock: boolean;
  is_hidden?: boolean;
  is_featured?: boolean;
  order_count?: number;
  sales_count?: number;
  views_count?: number;
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

export type FilterCategoryType = 'TODOS' | ProductCategory;

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

export type AnimationType = 'fade-in' | 'slide-up' | 'scale-in' | 'flip-3d';
export type ChristmasMode = 'auto' | 'enabled' | 'disabled';
export type CardStyleType = 'glass-luxe' | 'editorial-minimal' | 'bordered-gold';

export interface SiteCustomizationSettings {
  // Christmas Holiday Theme
  christmasMode: ChristmasMode;
  christmasSnow: boolean;
  christmasHats: boolean;
  christmasBanner: boolean;
  christmasLights?: boolean;
  christmasFlowers?: boolean;
  christmasBaubles?: boolean;
  christmasFireworks?: boolean;
  
  // Product Animations & Presentation
  animationType: AnimationType;
  animationSpeed: number; // e.g., 0.5s
  staggerDelay: number; // e.g., 0.05s
  hoverScale: number; // e.g., 1.04
  enableSpecularSweep: boolean;
  cardStyle: CardStyleType;
  animationPreset?: string;

  // Fashion Cinema & Promotional Video Settings
  videoUrl?: string;
  videoPoster?: string;
  videoQuality?: '4K' | '1080p' | '720p' | 'auto';
  videoAudioDefault?: boolean;
  videoTitle?: string;
  videoSubtitle?: string;
}
