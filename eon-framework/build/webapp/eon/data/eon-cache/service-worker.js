
var CACHE = 'eon-cache';

var filesToCache = [
  "../../eon.js"
];

// ** self = service worker

/*
* -- Install service worker
*/
self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');

  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activated');
  self.clients.claim();
});


self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url = new URL(req.url); // ** Not supported on IE

  // Check same origin sources
  if (url.origin === location.origin) {
    console.log('eon CACHE FIRST');
    e.respondWith(cacheFirst(req));
  } else {
    console.log('eon NET AND CACHE');
    e.respondWith(networkAndCache(req));
  }
});

function cacheFirst(req) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(req).then(function (cached) {
      console.log('eon match!', req);
      return cached || fetch(req);
    });
  })
}

function networkAndCache(req) {
  return caches.open(CACHE).then(function (cache) {
    try {
      return fetch(req).then(function (fresh) {
        cache.put(req, fresh.clone());
        return fresh;
      });
    } catch (error) {
      return cache.match(req).then(function (cached) {
        return cached;
      });
    }
  });
}