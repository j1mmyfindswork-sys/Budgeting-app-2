const CACHE_NAME = "budget-app-v1";
const PRECACHE_URLS = [
  "/",
  "/app_streamlit.py",
  "/static/icon.png",
  "/static/splash.png",
  "/static/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        return caches.open(CACHE_NAME).then((cache) => {
          try { cache.put(event.request, resp.clone()); } catch (e) {}
          return resp;
        });
      }).catch(() => caches.match("/"));
    })
  );
});