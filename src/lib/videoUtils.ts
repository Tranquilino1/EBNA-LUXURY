/**
 * Video Advertising & Media Utilities for Sindy Luxury
 * Handles YouTube video parsing, embed URL generation, video type detection, and presets.
 */

export interface YouTubeEmbedOptions {
  autoplay?: boolean;
  mute?: boolean;
  controls?: boolean;
  loop?: boolean;
}

/**
 * Extracts YouTube 11-character video ID from any format of YouTube URL:
 * - https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - https://m.youtube.com/watch?v=dQw4w9WgXcQ
 * - https://youtu.be/dQw4w9WgXcQ
 * - https://www.youtube.com/shorts/dQw4w9WgXcQ
 * - https://www.youtube.com/embed/dQw4w9WgXcQ
 * - Plain ID: dQw4w9WgXcQ
 */
export function extractYouTubeId(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const clean = url.trim();

  // If already an 11-character alphanumeric YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  // Regex patterns for YouTube standard, mobile, youtu.be, shorts, and embed URLs
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/i,
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
    /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/i,
    /^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
    /^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = clean.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }

  return null;
}

/**
 * Builds responsive privacy-friendly YouTube embed URL with autoplay, mute, and controls.
 */
export function getYouTubeEmbedUrl(videoId: string, options: YouTubeEmbedOptions = {}): string {
  const { autoplay = true, mute = false, controls = true, loop = true } = options;
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: mute ? '1' : '0',
    controls: controls ? '1' : '0',
    rel: '0',
    playsinline: '1',
    modestbranding: '1',
    enablejsapi: '1',
    origin: typeof window !== 'undefined' ? window.location.origin : 'https://ebna-luxury.vercel.app',
  });

  if (loop) {
    params.set('loop', '1');
    params.set('playlist', videoId);
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Determines whether a URL or configuration represents a YouTube video, SVG animation, or direct video file.
 */
export function detectVideoType(
  url?: string,
  explicitType?: 'youtube' | 'mp4' | 'svg_animated'
): 'youtube' | 'mp4' | 'svg_animated' {
  if (explicitType) return explicitType;
  if (!url) return 'svg_animated';
  if (extractYouTubeId(url)) return 'youtube';
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) return 'mp4';
  if (url.startsWith('data:video/')) return 'mp4';
  return 'youtube';
}

/**
 * Curated Luxury Runway & Fashion Presets
 */
export interface FashionVideoPreset {
  id: string;
  title: string;
  subtitle: string;
  type: 'youtube' | 'mp4' | 'svg_animated';
  url: string;
  svgPreset?: 'luxury_runway' | 'golden_glamour' | 'haute_couture_neon';
  poster: string;
  badge: string;
}

export const FASHION_VIDEO_PRESETS: FashionVideoPreset[] = [
  {
    id: 'svg-runway',
    title: 'Pasarela Alta Costura París — Malabo',
    subtitle: 'Siluetas dinámicas de alta costura, reflectores de pasarela y elegancia regia en movimiento.',
    type: 'svg_animated',
    url: '',
    svgPreset: 'luxury_runway',
    poster: '/products/sindy_luxury/vestido_amarillo_drapeado.jpg',
    badge: 'ANIMACIÓN VECTORIAL 4K',
  },
  {
    id: 'svg-gold',
    title: 'Brillo Diamante & Oro Imperial',
    subtitle: 'Fantasía geométrica en oro y diamantes reflectantes inspirada en la joyería de lujo.',
    type: 'svg_animated',
    url: '',
    svgPreset: 'golden_glamour',
    poster: '/products/sindy_luxury/vestido_largo_perla_imperial.jpg',
    badge: 'DISEÑO DIAMANTE LUXE',
  },
  {
    id: 'svg-neon',
    title: 'Gala Neón & Noche Chic Internacional',
    subtitle: 'Esplendor de alta noche, contrastes fucsia couture y destellos luminosos.',
    type: 'svg_animated',
    url: '',
    svgPreset: 'haute_couture_neon',
    poster: '/products/sindy_luxury/vestido_corto_fucsia_neon.jpg',
    badge: 'NEÓN COUTURE 2026',
  },
  {
    id: 'yt-couture-1',
    title: 'Desfile de Gala & Alta Costura Internacional',
    subtitle: 'Colección de vestidos de fiesta, caídas de seda y glamour internacional.',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=Fj2F1l_P32E',
    poster: '/products/sindy_luxury/vestido_amarillo_drapeado.jpg',
    badge: 'YOUTUBE CINEMA HD',
  },
  {
    id: 'yt-paris-fashion',
    title: 'Semana de la Moda de París: Siluetas de Lujo',
    subtitle: 'Tendencias contemporáneas en vestidos y conjuntos de noche.',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=kYI9sF_6Noc',
    poster: '/products/sindy_luxury/vestido_azul_noche_gala.jpg',
    badge: 'PARIS FASHION WEEK',
  },
  {
    id: 'mp4-direct',
    title: 'Sindy Luxury: Pasarela Cinematográfica Oficial',
    subtitle: 'Producción de alta definición para boutiques en Guinea Ecuatorial.',
    type: 'mp4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/products/sindy_luxury/vestido_amarillo_drapeado.jpg',
    badge: 'DIRECT STREAM MP4',
  },
];
