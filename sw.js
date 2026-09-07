const CACHE = 'shelf-v4';
const ASSETS = ['./', 'index.html', 'zxing.min.js', 'manifest.webmanifest'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;              // never cache lookups
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
