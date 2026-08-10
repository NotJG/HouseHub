const CACHE = 'house-hub-v2';
const SHELL = ['/', '/index.html', '/manifest.json', '/config.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Never cache Supabase API calls or Google Fonts — always go to network.
  if (url.origin.includes('supabase.co') || url.origin.includes('googleapis') || url.origin.includes('gstatic')) {
    return;
  }
  // Network-first: always prefer the live version so updates show up immediately.
  // Cache is only a fallback for when there's no connection at all.
  e.respondWith(
    fetch(e.request).then(res => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
