import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { prewarmImages } from './lib/imagePreloader';
import { HD_PRODUCTS } from './data/hdProducts';

// High-Speed Instant Pre-warming: Decodes and keeps top product images warm in GPU memory
if (typeof window !== 'undefined') {
  const topImages = [
    '/products/sindy_luxury/vestido_amarillo_drapeado.jpg',
    '/products/sindy_luxury/vestido_azul_noche_gala.jpg',
    '/products/sindy_luxury/vestido_largo_perla_imperial.jpg',
    '/products/sindy_luxury/vestido_corto_fucsia_neon.jpg',
    ...HD_PRODUCTS.slice(0, 30).map(p => p.images?.primary || (Array.isArray(p.images) ? p.images[0] : '')).filter(Boolean)
  ];
  prewarmImages(topImages, 16);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
