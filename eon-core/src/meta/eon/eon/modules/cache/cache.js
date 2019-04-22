eon.cache = eon.cache || {};

eon.cache.config = eon.cache.config || false;

// Check if eon has any cache strategy
if ("serviceWorker" in navigator && Object.keys(eon.cache.config).length) {
  // Check service worker existence
  (function (proxied) {
    ServiceWorkerContainer.prototype.register = function () {

      this._registered = true;

      return proxied.apply(this, arguments);
    };
  })(ServiceWorkerContainer.prototype.register);

  eon.onReady(function () {
    // Check service worker existence
    if (!navigator.serviceWorker._registered) {

      // Register eon service worker
      navigator.serviceWorker
        .register(eon.basePath + "/modules/cache-sw.js")
        .then(function () {
          console.log("[ServiceWorker] Registered");
        });

    }
  });
}

eon.cache.open = function (cb) {

  eon.cache.config.name = eon.cache.config.name || "eon-cache";

  // Check browser cache storage existence
  if ("caches" in window) {
    // Create cache
    caches.open(eon.cache.config.name).then(function (cache) {
      // Cache config
      cb(null, cache);
    }).catch(function (error) {
      // Handles exceptions that arise from open().
      console.error("Error in cache open:", error);
      throw error;
    });
  }
};

eon.cache.add = function (request, options, cb) {
  var config = eon.cache.config;

  if (config) {
    // Conditions
    var excluded = config.exclude && (options && config.exclude.indexOf(options.name) > -1);
    var requestAll = config.requests && config.requests.indexOf("*") > -1;
    var included = requestAll || !options || (options && config.requests && config.requests.indexOf(options.name) > -1);

    // Check cache config
    if (!excluded && included) {
      // Check eon-cache reference existence
      if (!eon.cache.ref) {
        eon.cache.open(function (error, cache) {
          eon.cache.ref = eon.cache.ref || cache;
          // Check if the file has been cached already
          cache.match(request).then(function (cached) {
            if (!cached) {
              cache.add(request).then(function () {
                if (cb) { cb(null, request); }
              }).catch(function (error) {
                // Handles exceptions that arise from add().
                console.error("Error in add handler:", error);
                throw error;
              });
            }
          }).catch(function (error) {
            // Handles exceptions that arise from match().
            console.error("Error in cache match:", error);
            throw error;
          });
        });
      }
    }
  }
};