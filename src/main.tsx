import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Auto-purge old browser caches & obsolete localstorage on version bump
const APP_VERSION = 'v9_hero_side_aligned';
try {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('ebna_app_version') !== APP_VERSION) {
      // Clear old product cache entries
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('ebna_') || key.includes('product') || key.includes('cache') || key.includes('storage')) {
          localStorage.removeItem(key);
        }
      });
      localStorage.setItem('ebna_app_version', APP_VERSION);

      // Delete old PWA ServiceWorker CacheStorage
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
    }
  }
} catch (e) {
  console.warn('Cache purge notice:', e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
