// Sindy Luxury by EBNA - Ultra-Fast Zero-Perceived-Load Service Worker v12
const CACHE_STATIC = 'ebna-static-v12';
const CACHE_IMAGES = 'ebna-images-v12';

self.addEventListener('install', (event) => {
  // Activate immediately without waiting for old clients to close
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_STATIC && k !== CACHE_IMAGES).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && (event.data.type === 'PURGE_IMAGE_CACHE' || event.data.type === 'CATALOG_UPDATED')) {
    caches.delete(CACHE_IMAGES);
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. Navigation HTML or Live Cloud Database calls -> Network First with offline fallback
  if (
    request.mode === 'navigate' ||
    (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) ||
    url.hostname.includes('turso.io') ||
    url.hostname.includes('supabase.co')
  ) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request) || caches.match('/index.html'))
    );
    return;
  }

  // 2. Product and Brand Images -> CacheFirst (Sub-millisecond instant load from local storage)
  if (url.pathname.startsWith('/products/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(
      caches.open(CACHE_IMAGES).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // If offline and image not cached, fallback gracefully
            return caches.match('/icons/icon-192x192.png');
          });
        });
      })
    );
    return;
  }

  // 3. Static CSS / JS Bundles (Vite fingerprinted assets) -> Stale-While-Revalidate
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(CACHE_STATIC).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Default network pass-through
  event.respondWith(fetch(request));
});
