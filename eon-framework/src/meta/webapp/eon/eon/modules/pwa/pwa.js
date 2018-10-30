/**
 * :::::::::::::::::::::
 * Progressive Web App
 * :::::::::::::::::::::
 * > Home screen access - manifest.json
 * > Offline mode - service-worker.js
 * 
 * *** SERVICE WORKERS *** 
 * . Service Worker is an experimental technology. New browsers versions are supporting it
 * by default but its functionality is not guaranteed for now.
 *  
 * . An HTTPS implementation is needed to work with service workers.
 * Localhost is considered a secure origin by browsers as well
 * 
 * ***************************
 * 
 */

eon.pwa = eon.pwa || {};

eon.pwa.debug = true;
eon.pwa.filesToCache = [];

/**
 * 
 * @return {[type]}     [description]
 */
eon.pwa.initWorker = function (cacheName, filesToCache) {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(eon.basePath + '/data/pwa/service-worker.js')
      .then(function (e) {
        if(eon.pwa.debug) {
          console.log('Service Worker Registered');
        }
        // Cache attributes
        eon.pwa.CACHE = cacheName;
        eon.pwa.filesToCache = filesToCache;

      });
  } 
}