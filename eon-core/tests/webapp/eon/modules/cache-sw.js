
var CACHE = 'eon-cache';

var debug = false;

var filesToCache = [
  "../../eon.js"
];

// ** self = service worker

/*
* -- Install
*/
self.addEventListener('install', function (e) {
  if(debug) { console.log('[ServiceWorker] Install'); }
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      if(debug) { console.log('[ServiceWorker] Caching app shell'); }
      return cache.addAll(filesToCache);
    })
  );
});

/*
* -- Activate
*/
self.addEventListener('activate', function (e) {
  if(debug) { console.log('[ServiceWorker] Activated'); }
  self.clients.claim();
});

/*
* -- Fetch
*/
self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url = new URL(req.url); // ** Not supported on IE
  // Check same origin sources
  if (url.origin === location.origin) {
    if(debug) { console.log('eon cache first'); }
    e.respondWith(cacheFirst(req));
  } else {
    if(debug) { console.log('eon net and cache'); }
    e.respondWith(networkAndCache(req));
  }
});

/*
* -- Network fallback to cache
*/
function cacheFirst(req) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(req).then(function (cached) {
      return cached || fetch(req);
    });
  })
}

/*
* -- Network and cache
*/
function networkAndCache(req) {
  return caches.open(CACHE).then(function (cache) {
    try {
      // Request fresh data
      return fetch(req).then(function (fresh) {
        cache.put(req, fresh.clone());
        return fresh;
      });
    } catch (error) {
      // Returned previously cached
      return cache.match(req).then(function (cached) {
        return cached;
      });
    }
  });
}