// Sindy Luxury by EBNA - Universal Service Worker v9 (Instant Multi-Device Sync)
const SW_VERSION = 'ebna-live-v9';

self.addEventListener('install', (event) => {
  // Take control immediately across all tabs and devices
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Wipe out all existing legacy cache buckets permanently
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          return caches.delete(key);
        })
      );
    }).then(() => {
      // Claim all clients immediately so updates apply without requiring manual restart
      return self.clients.claim();
    }).then(() => {
      return self.clients.matchAll({ type: 'window' });
    }).then((clients) => {
      // Notify all active browser tabs/mobile windows of fresh deployment
      clients.forEach((client) => {
        client.postMessage({ type: 'EBNA_VERSION_UPDATED', version: SW_VERSION });
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Never cache HTML documents or API calls: always serve fresh from network
  if (request.mode === 'navigate' || (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' }).catch(() => {
        return fetch(request);
      })
    );
    return;
  }

  // Pass-through network request
  event.respondWith(fetch(request));
});
