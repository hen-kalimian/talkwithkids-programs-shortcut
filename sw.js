// Service Worker מינימלי. נדרש רק כדי שהדפדפן יסכים להציע "התקנה" (PWA installability) -
// אין כאן שום שמירת תוכן אופליין, רק מעבר שקוף של כל בקשה.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
