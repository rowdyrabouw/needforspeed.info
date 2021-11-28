const STATIC_CACHE = "static-v2";
const STATIC_FILES = [
  "/",
  "index.html",
  "/favicon.png",
  "assets/css/style.css",
  "assets/fonts/nfs.woff2",
  "assets/fonts/din_alternate.woff",
  "assets/img/need-for-speed-1.jpg",
  "assets/js/app.js",
  "offline.html",
];

self.addEventListener("install", (event) => {
  console.log("%c[sw.js] Service Worker installed", "color: #FEC233");
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      cache.addAll(STATIC_FILES).then(() => {
        console.log("%c[sw.js] Files added to static cache", "color: #FEC233");
        self.skipWaiting();
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("%c[sw.js] Service Worker activated", "color: #FEC233");
  // ensure that the Service Worker is activated correctly (fail-safe)
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    // look at all caches for a match on the key (= request)
    caches.match(event.request).then((response) => {
      if (response) {
        // return from cache
        return response;
      } else {
        // fetch from the server
        return fetch(event.request).catch(() => {
          return caches.open(STATIC_CACHE).then((cache) => {
            if (event.request.headers.get("accept").includes("text/html")) {
              return cache.match("/offline.html");
            }
          });
        });
      }
    })
  );
});
