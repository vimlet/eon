
// ** self = service worker
var CACHE;
var filesToCache;
/*
* -- Install service worker
*/
self.addEventListener('install', function(e) {
  // console.log('install', eon.pwa, self._pwa);
  // if(eon.pwa.debug) {
    console.log('[ServiceWorker] Install');
  // }
  
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      // if(eon.pwa.debug) {
        console.log('[ServiceWorker] Caching app shell');
      // }
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('fetch', function(e) {
  console.log('fetch');
});