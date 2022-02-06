const CACHE_NAME = "cache-v1";
const OFFLINE_URL = "404.html";

window.self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    window.self.skipWaiting();
  }
});

window.self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
  );
  window.self.skipWaiting();
});

window.self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if ("navigationPreload" in window.self.registration) {
        await window.self.registration.navigationPreload.enable();
      }
    })()
  );

  window.self.clients.claim();
});

window.self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          return await fetch(event.request);
        } catch (error) {
          const cache = await caches.open(CACHE_NAME);
          return cache.match(OFFLINE_URL);
        }
      })()
    );
  }
});
